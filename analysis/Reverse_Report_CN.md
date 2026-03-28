# Reverse Report

## 目标

- 样本: `D:\ida\GOLDHORN_DSP_1.9.3(12656).exe`
- 目标: 判断为什么 `upx -d` 失败，并给出最短可行脱壳路径

## FACTS

- `diec` 识别结果为 `Packer: UPX[modified]`。
- IDA 当前打开的输入为 `D:\ida\GOLDHORN_DSP_1.9.3(12656).exe`，`ImageBase = 0x400000`，`PE32`。
- 样本节表在文件偏移 `0x248` 开始，共 3 节：
- 第 0 节: 名称为空，`VA=0x00001000`，`VSz=0x00C58000`，`RawPtr=0x00000400`，`RawSz=0x00000000`，`Chars=0xE0000080`
- 第 1 节: 名称为空，`VA=0x00C59000`，`VSz=0x00A2C000`，`RawPtr=0x00000400`，`RawSz=0x00A2BE00`，`Chars=0xE0000040`
- 第 2 节: `.rsrc`，`VA=0x01685000`，`VSz=0x00011000`，`RawPtr=0x00A2C200`，`RawSz=0x00011000`，`Chars=0xC0000040`
- 入口 stub 位于 `VA 0x1A849E0`。关键指令：
- `0x1A849E1: mov esi, 0x1059000`
- `0x1A849E6: lea edi, [esi-0xC58000]`，解压目标落到 `0x401000`
- `0x1A84B23 / 0x1A84B41 / 0x1A84B52`: 通过已解析 API 处理 imports
- `0x1A84BC1: popa`
- `0x1A84BCF: jmp 0x1115B83`
- 仅恢复第 0/1 节名称为 `UPX0/UPX1` 后，再对副本执行 `upx -l/-t/-d`，仍然报 `CantUnpackException`。

## INFERENCES

- 第 0/1 节的几何形态和属性非常像标准 `UPX0/UPX1`，因此它确实是 UPX 家族壳，而不是误报。
- 由于补回节名后 `upx` 仍然无法识别，问题不只在 section name，更可能是 UPX 内部 pack header / 校验字段 / stub 元数据被改过。
- `0x1A84BCF -> 0x1115B83` 是高可信候选 OEP 跳转点，但文件静态字节在 `0x1115B83` 处仍是未解压状态，所以需要运行时抓取。

## UNKNOWNS

- 是否额外存在反调试、TLS 回调或自校验逻辑。
- 运行到 OEP 后是否还会有二次 unpack / 二次 loader。

## 建议路径

1. 用 `x64dbg` 在 `0x1A84BCF` 下断，运行到 stub 末尾。
2. 单步执行这条 `jmp 0x1115B83`，落到 OEP 后再 dump 模块。
3. 用 `Scylla` 执行 `IAT Autosearch -> Get Imports -> Fix Dump`。
4. 如果 OEP 后仍不稳定，改用 `PE-sieve` 从进程内存抓取重建后的映像。

## 备注

- 该样本最省时间的路线是动态脱壳，不建议继续花时间修 `upx -d` 的静态兼容。
