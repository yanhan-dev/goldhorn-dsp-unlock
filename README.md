# GOLDHORN DSP Region Lock Bypass

GOLDHORN DSP 调音软件区域锁绕过工具与逆向分析全记录。

## 背景

GOLDHORN（歌航）DSP 调音软件在用户连接 DSP 设备后，会联网连接 `china-gehang.com.cn` 服务器，通过 IP 地理位置检测 + 路由追踪 + 设备序列号校验来判断用户是否在"指定销售区域"，如果不在则**阻止调音**。

消费者已经花钱购买了硬件，却面临区域锁限制。本项目记录了完整的逆向分析过程，并提供了两种绕过方案。

> **声明**：本项目仅供安全研究和学习交流，请勿用于商业用途。

## 验证机制分析

软件使用 5 步联网验证流程：

```
连接 DSP 设备
    |
    v
1. queryURL.php -----> 获取外部 URL 用于 IP 检测
    |
    v
2. 访问外部 URL -----> 检测用户真实 IP 地址
    |
    v
3. getIPV2.php ------> 上报 IP 检测结果
    |
    v
4. 本地 tracert -----> 路由追踪验证网络位置
    |
    v
5. verifyV2.php -----> 发送 设备SN + IP + tracert 做最终验证
    |
    +---> VALIDATE_OK     -> 允许调音
    +---> WrongAddress    -> 经销商地址与 IP 不匹配（区域锁）
    +---> WrongSeller     -> 设备不在经销商销售列表
    +---> BLACKLIST       -> 黑名单
    +---> nonExist        -> 设备未注册
```

所有通信使用 AES 加密（`QAESEncryption`），验证逻辑实现在 zlib 压缩的 QML/JavaScript 资源中。

### 关键代码（QML/JS）

```javascript
// 验证总开关
if (Ams.isNeedVerifyDevice()) {
    if (Ams.isVerifyPass()) {
        hidIO.syncData();           // 验证通过 -> 完整功能
    } else {
        Ams.loadConfigModeReq(hidIO); // 验证失败 -> 有限模式
    }
}
```

### 区域配置

软件内置 5 个市场配置：`for International`、`for Indonesia`、`for CDT`、`for Colombia`、`for factory test`，通过 `softCurCode` 变量在运行时决定。

## 逆向流程

### 1. UPX 魔改壳脱壳

软件使用修改版 UPX 壳（节名清空、pack header 修改），标准 `upx -d` 无法脱壳。

**脱壳步骤：**

1. `diec` 识别 → `Packer: UPX[modified]`
2. IDA 静态分析 UPX stub → 定位 OEP jmp 指令（`0x1A84BCF → jmp OEP`）
3. x32dbg 动态调试 → 断在 jmp → 单步进入 OEP
4. **Scylla** 重建 IAT → 478 个导入函数正确恢复
5. 修复 ASLR 标志 → 可稳定运行的脱壳 exe

**遇到的坑：**
- ASLR 导致运行时基址不是 0x400000，需要重新计算所有地址
- apphelp.dll 的 DPI shim 劫持了 GetDC/BitBlt/Direct3DCreate9，导致 dump 中包含 shim 地址
- OEP 的 RVA 计算错误（误将 IDA 的绝对 VA 当作 RVA）

### 2. Qt/QML 资源分析

程序使用 Qt5 + QML 构建 GUI，验证逻辑在 zlib 压缩的 QML/JS 资源中：

1. 扫描 exe 中的 zlib 压缩块
2. 解压后搜索 `isNeedVerifyDevice`、`china-gehang` 等关键字
3. 找到完整的验证流程代码（689KB QML/JS）
4. 分析 API 端点、请求参数、响应处理逻辑

## 绕过方案

### 方案一：直接 Patch exe（一劳永逸）

在 zlib 压缩的 QML/JS 中进行等长字符串替换：

| 原始代码 | 替换为 | 数量 |
|---------|-------|------|
| `Ams.isNeedVerifyDevice()` | `(false)`                  | 37 处 |
| `Ams.isVerifyPass()`       | `(true)`                   | 4 处 |
| `Ams.setVerifyPass(false)` | `Ams.setVerifyPass(true)` | 3 处 |
| `Ams.isNeedReportDevice()` | `(false)`                  | 1 处 |

替换后重新 zlib 压缩写回 exe，新压缩体比原始小 1111 字节，完美原地覆盖。

**使用方法：**

```bash
# 需要 Python 3 + pefile
pip install pefile
python scripts/patch_verify.py
```

或直接使用预编译的 `patched/GOLDHORN_patched.exe`。

### 方案二：Go 运行时 Hook（跨版本通用）

1.9MB 单文件 Go 程序，无需运行时依赖，启动后自动：

1. 正常启动 GOLDHORN DSP（无 DEBUG_PROCESS，不触发反调试）
2. 通过 `OpenProcess` + `ReadProcessMemory` 外部扫描进程内存
3. 等待 Qt 解压 QML 资源后，搜索 `Ams.isNeedVerifyDevice()` 字符串
4. 用 `WriteProcessMemory` 等长替换为 `(false)`
5. 不修改磁盘文件，只修改进程内存

**优势：**
- 适用于原版带壳 exe（UPX 解压后 Qt 再解压 QML，hook 在第二层生效）
- 软件更新后只要函数名不变，hook 依然有效
- 不触发任何反调试检测
- 单文件绿色运行，1.9MB

**使用方法：**

将 `GOLDHORN_Launcher.exe` 放到 GOLDHORN DSP 同目录，双击启动即可。

**编译：**

```bash
cd launcher
go build -ldflags="-s -w -H windowsgui" -o GOLDHORN_Launcher.exe .
```

## 文件说明

```
original/           原版 GOLDHORN DSP 1.9.3 (build 12656) 带 UPX 魔改壳
unpacked/           脱壳版（Scylla IAT 重建 + ASLR 修复），可用于 IDA 静态分析
patched/            patch 版（45 处验证代码已禁用），可直接运行
launcher/           Go 运行时 Hook 启动器源码 + 编译产物
  main.go           启动器完整源码（Win32 GUI + 内存扫描 + 等长替换）
  go.mod            Go module 定义
scripts/            Python 辅助脚本
  patch_verify.py   自动 patch 脚本（解压 → 替换 → 重压缩 → 写回）
analysis/           逆向分析文档
  Reverse_Report_CN.md   UPX 脱壳分析报告
  qml_extracted/    从 exe 解压的完整 QML/JS 源码（验证逻辑、区域配置等）
```

## 技术栈

- **逆向工具**：IDA Pro + x32dbg (Scylla) + DIE + Claude Code (x64dbg MCP)
- **分析语言**：Python (pefile, zlib)
- **Hook 工具**：Go 1.26 (Win32 API, 纯 syscall)
- **目标平台**：Windows x86 (PE32)

## 致谢

本项目使用 [Claude Code](https://claude.ai/code) + [x64dbg MCP](https://github.com/Wasdubya/x64dbgMCP) + [IDA Pro MCP](https://github.com/HexRaysSA/ida-claude-plugins) 协作完成逆向分析与工具开发。
