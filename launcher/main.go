package main

import (
	"bytes"
	"compress/zlib"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"syscall"
	"time"
	"unsafe"
)

// Windows API
var (
	kernel32 = syscall.NewLazyDLL("kernel32.dll")
	user32   = syscall.NewLazyDLL("user32.dll")
	shell32  = syscall.NewLazyDLL("shell32.dll")
	comdlg32 = syscall.NewLazyDLL("comdlg32.dll")

	procCreateProcess        = kernel32.NewProc("CreateProcessW")
	procOpenProcess          = kernel32.NewProc("OpenProcess")
	procCloseHandle          = kernel32.NewProc("CloseHandle")
	procReadProcessMemory    = kernel32.NewProc("ReadProcessMemory")
	procWriteProcessMemory   = kernel32.NewProc("WriteProcessMemory")
	procVirtualQueryEx       = kernel32.NewProc("VirtualQueryEx")
	procVirtualProtectEx     = kernel32.NewProc("VirtualProtectEx")
	procGetExitCodeProcess   = kernel32.NewProc("GetExitCodeProcess")
	procWaitForSingleObject  = kernel32.NewProc("WaitForSingleObject")
	procGetModuleFileName    = kernel32.NewProc("GetModuleFileNameW")

	procCreateWindowEx  = user32.NewProc("CreateWindowExW")
	procDefWindowProc   = user32.NewProc("DefWindowProcW")
	procRegisterClassEx = user32.NewProc("RegisterClassExW")
	procGetMessage      = user32.NewProc("GetMessageW")
	procTranslateMessage = user32.NewProc("TranslateMessage")
	procDispatchMessage = user32.NewProc("DispatchMessageW")
	procPostQuitMessage = user32.NewProc("PostQuitMessage")
	procSendMessage     = user32.NewProc("SendMessageW")
	procShowWindow      = user32.NewProc("ShowWindow")
	procUpdateWindow    = user32.NewProc("UpdateWindow")
	procDestroyWindow   = user32.NewProc("DestroyWindow")
	procSetWindowText   = user32.NewProc("SetWindowTextW")
	procGetDlgItem      = user32.NewProc("GetDlgItem")
	procMessageBox      = user32.NewProc("MessageBoxW")
	procLoadIcon        = user32.NewProc("LoadIconW")
	procLoadCursor      = user32.NewProc("LoadCursorW")
	gdi32              = syscall.NewLazyDLL("gdi32.dll")
	procGetStockObject = gdi32.NewProc("GetStockObject")
	procEnableWindow    = user32.NewProc("EnableWindow")
	procSetTimer        = user32.NewProc("SetTimer")
	procKillTimer       = user32.NewProc("KillTimer")
	procPostMessage     = user32.NewProc("PostMessageW")

	procGetOpenFileName = comdlg32.NewProc("GetOpenFileNameW")
)

// Constants
const (
	WS_OVERLAPPEDWINDOW = 0x00CF0000
	WS_VISIBLE          = 0x10000000
	WS_CHILD            = 0x40000000
	WS_VSCROLL          = 0x00200000
	WS_BORDER           = 0x00800000
	WS_EX_CLIENTEDGE    = 0x00000200

	BS_PUSHBUTTON = 0x00000000
	BS_DEFPUSHBUTTON = 0x00000001
	ES_MULTILINE  = 0x0004
	ES_AUTOVSCROLL = 0x0040
	ES_READONLY   = 0x0800

	SW_SHOW    = 5
	WM_CREATE  = 0x0001
	WM_DESTROY = 0x0002
	WM_COMMAND = 0x0111
	WM_CLOSE   = 0x0010
	WM_TIMER   = 0x0113
	WM_SETFONT = 0x0030
	EM_REPLACESEL = 0x00C2
	EM_SETSEL     = 0x00B1
	BN_CLICKED = 0

	cwUSEDEFAULT = uintptr(0x80000000)
	IDC_ARROW     = 32512
	IDI_APPLICATION = 32512
	COLOR_BTNFACE = 15

	// Custom messages for thread-safe UI updates
	WM_USER           = 0x0400
	WM_APP_SETSTATUS  = WM_USER + 1  // wParam: 0=ready, 1=launching, 2=patched, 3=running, 4=exited
	WM_APP_ENABLEBTN  = WM_USER + 2  // wParam: 0=disable, 1=enable

	PROCESS_VM_READ      = 0x0010
	PROCESS_VM_WRITE     = 0x0020
	PROCESS_VM_OPERATION = 0x0008
	PROCESS_QUERY_INFORMATION = 0x0400

	MEM_COMMIT  = 0x1000
	PAGE_READWRITE         = 0x04
	PAGE_EXECUTE_READWRITE = 0x40
	PAGE_NOACCESS          = 0x01
	PAGE_GUARD             = 0x100

	STILL_ACTIVE = 259
	WAIT_TIMEOUT = 258
	INFINITE     = 0xFFFFFFFF

	IDC_BTN_LAUNCH = 101
	IDC_BTN_BROWSE = 102
	IDC_LOG        = 103
	IDC_STATUS     = 104
	TIMER_SCAN     = 1
	TIMER_LOG      = 2
)

// Patch patterns for decompressed QML text (equal length replacements)
var patches = []struct {
	old []byte
	new []byte
}{
	{[]byte("Ams.isNeedVerifyDevice()"), []byte("(false                 )")},
	{[]byte("Ams.isVerifyPass()"), []byte("(true            )")},
	{[]byte("Ams.setVerifyPass(false)"), []byte("Ams.setVerifyPass(true )")},
	{[]byte("Ams.isNeedReportDevice()"), []byte("(false                 )")},
}

// Zlib header signature for the verify_qml compressed block (first 8 bytes)
// 78 DA = zlib best compression, followed by unique content bytes
var zlibSignatures = [][]byte{
	{0x78, 0xda, 0xec, 0xbd, 0x7d, 0x77, 0x13, 0x47}, // verify_qml
}

type MEMORY_BASIC_INFORMATION struct {
	BaseAddress       uintptr
	AllocationBase    uintptr
	AllocationProtect uint32
	RegionSize        uintptr
	State             uint32
	Protect           uint32
	Type              uint32
}

type STARTUPINFO struct {
	Cb            uint32
	_             *uint16
	_             *uint16
	_             *uint16
	X, Y, XSize, YSize uint32
	XCountChars, YCountChars uint32
	FillAttribute uint32
	Flags         uint32
	ShowWindow    uint16
	_             uint16
	_             *byte
	StdInput, StdOutput, StdError syscall.Handle
}

type PROCESS_INFORMATION struct {
	Process   syscall.Handle
	Thread    syscall.Handle
	ProcessId uint32
	ThreadId  uint32
}

type WNDCLASSEX struct {
	Size       uint32
	Style      uint32
	WndProc    uintptr
	ClsExtra   int32
	WndExtra   int32
	Instance   syscall.Handle
	Icon       syscall.Handle
	Cursor     syscall.Handle
	Background syscall.Handle
	MenuName   *uint16
	ClassName  *uint16
	IconSm     syscall.Handle
}

type MSG struct {
	Hwnd    syscall.Handle
	Message uint32
	WParam  uintptr
	LParam  uintptr
	Time    uint32
	Pt      struct{ X, Y int32 }
}

type OPENFILENAME struct {
	StructSize    uint32
	Owner         syscall.Handle
	Instance      syscall.Handle
	Filter        *uint16
	CustomFilter  *uint16
	MaxCustFilter uint32
	FilterIndex   uint32
	File          *uint16
	MaxFile       uint32
	FileTitle     *uint16
	MaxFileTitle  uint32
	InitialDir    *uint16
	Title         *uint16
	Flags         uint32
	FileOffset    uint16
	FileExtension uint16
	DefExt        *uint16
	CustData      uintptr
	FnHook        uintptr
	TemplateName  *uint16
}

// Global state
var (
	hwndMain   syscall.Handle
	hwndLog    syscall.Handle
	hwndBtn    syscall.Handle
	hwndBrowse syscall.Handle
	hwndStatus syscall.Handle
	exePath    string
	mu         sync.Mutex
	scanning   bool
	hProcess   syscall.Handle
	pid        uint32
	logChan    = make(chan string, 100)
)

func utf16Ptr(s string) *uint16 {
	p, _ := syscall.UTF16PtrFromString(s)
	return p
}

func appendLog(text string) {
	ts := time.Now().Format("15:04:05")
	line := fmt.Sprintf("[%s] %s\r\n", ts, text)
	select {
	case logChan <- line:
	default:
	}
}

func flushLogs() {
	if hwndLog == 0 {
		return
	}
	var buf strings.Builder
	for {
		select {
		case line := <-logChan:
			buf.WriteString(line)
		default:
			if buf.Len() > 0 {
				procSendMessage.Call(uintptr(hwndLog), EM_SETSEL, ^uintptr(0), ^uintptr(0))
				procSendMessage.Call(uintptr(hwndLog), EM_REPLACESEL, 0, uintptr(unsafe.Pointer(utf16Ptr(buf.String()))))
			}
			return
		}
	}
}

func setStatus(text string) {
	if hwndStatus == 0 { return }
	procSetWindowText.Call(uintptr(hwndStatus), uintptr(unsafe.Pointer(utf16Ptr(text))))
}

func browseExe() string {
	buf := make([]uint16, 260)
	filter := utf16Ptr("GOLDHORN DSP (*.exe)\x00*.exe\x00All Files (*.*)\x00*.*\x00\x00")
	ofn := OPENFILENAME{
		Owner:   hwndMain,
		Filter:  filter,
		File:    &buf[0],
		MaxFile: 260,
		Title:   utf16Ptr("Select GOLDHORN DSP Executable"),
		Flags:   0x00001000 | 0x00000800, // OFN_FILEMUSTEXIST | OFN_PATHMUSTEXIST
	}
	ofn.StructSize = uint32(unsafe.Sizeof(ofn))
	ret, _, _ := procGetOpenFileName.Call(uintptr(unsafe.Pointer(&ofn)))
	if ret != 0 {
		return syscall.UTF16ToString(buf[:])
	}
	return ""
}

func launchProcess(exePath string) (syscall.Handle, uint32, error) {
	si := STARTUPINFO{}
	si.Cb = uint32(unsafe.Sizeof(si))
	pi := PROCESS_INFORMATION{}

	cmdLine := utf16Ptr(exePath)
	dir := utf16Ptr(filepath.Dir(exePath))

	ret, _, err := procCreateProcess.Call(
		0,
		uintptr(unsafe.Pointer(cmdLine)),
		0, 0, 0,
		0, // No special flags - normal process
		0,
		uintptr(unsafe.Pointer(dir)),
		uintptr(unsafe.Pointer(&si)),
		uintptr(unsafe.Pointer(&pi)),
	)
	if ret == 0 {
		return 0, 0, fmt.Errorf("CreateProcess failed: %v", err)
	}
	procCloseHandle.Call(uintptr(pi.Thread))
	return pi.Process, pi.ProcessId, nil
}

// patchCompressedBlock: read Qt resource header to get exact size, decompress, patch, recompress, write back
func patchCompressedBlock(hProc syscall.Handle, zlibAddr uintptr, maxReadSize int) (int, error) {
	// Qt resource format: [4B total_size BE] [4B decomp_size BE] [zlib_data...]
	// The zlib signature is at zlibAddr. Read 8 bytes BEFORE it for the Qt header.
	var hdr [8]byte
	var n uintptr
	ret, _, _ := procReadProcessMemory.Call(
		uintptr(hProc), zlibAddr-8,
		uintptr(unsafe.Pointer(&hdr[0])), 8,
		uintptr(unsafe.Pointer(&n)),
	)
	if ret == 0 || n < 8 {
		return 0, fmt.Errorf("cannot read Qt resource header")
	}

	// Parse big-endian header
	totalSize := int(hdr[0])<<24 | int(hdr[1])<<16 | int(hdr[2])<<8 | int(hdr[3])
	// decompSize := int(hdr[4])<<24 | int(hdr[5])<<16 | int(hdr[6])<<8 | int(hdr[7])
	compressedSize := totalSize - 4 // subtract the 4-byte decomp_size field

	if compressedSize < 100 || compressedSize > 500000 {
		return 0, fmt.Errorf("invalid compressed size: %d", compressedSize)
	}

	// Read exactly the compressed block
	buf := make([]byte, compressedSize)
	ret, _, _ = procReadProcessMemory.Call(
		uintptr(hProc), zlibAddr,
		uintptr(unsafe.Pointer(&buf[0])),
		uintptr(compressedSize),
		uintptr(unsafe.Pointer(&n)),
	)
	if ret == 0 || int(n) < compressedSize {
		return 0, fmt.Errorf("read failed: got %d, want %d", n, compressedSize)
	}

	// Decompress
	r, err := zlib.NewReader(bytes.NewReader(buf))
	if err != nil {
		return 0, err
	}
	decompressed, err := io.ReadAll(r)
	r.Close()
	if err != nil {
		return 0, err
	}

	if !bytes.Contains(decompressed, []byte("isNeedVerifyDevice")) {
		return 0, nil
	}

	// Apply patches
	count := 0
	for _, p := range patches {
		c := bytes.Count(decompressed, p.old)
		if c > 0 {
			decompressed = bytes.ReplaceAll(decompressed, p.old, p.new)
			count += c
		}
	}
	if count == 0 {
		return 0, nil
	}

	// Recompress
	var compressed bytes.Buffer
	w, _ := zlib.NewWriterLevel(&compressed, zlib.BestCompression)
	w.Write(decompressed)
	w.Close()

	newData := compressed.Bytes()
	if len(newData) > compressedSize {
		return 0, fmt.Errorf("recompressed too large: %d > %d", len(newData), compressedSize)
	}

	// Pad to exact original compressed size
	padded := make([]byte, compressedSize)
	copy(padded, newData)

	// Write back ONLY the compressed data area
	var oldProtect uint32
	procVirtualProtectEx.Call(
		uintptr(hProc), zlibAddr, uintptr(compressedSize),
		PAGE_EXECUTE_READWRITE, uintptr(unsafe.Pointer(&oldProtect)),
	)
	var written uintptr
	procWriteProcessMemory.Call(
		uintptr(hProc), zlibAddr,
		uintptr(unsafe.Pointer(&padded[0])),
		uintptr(compressedSize),
		uintptr(unsafe.Pointer(&written)),
	)
	procVirtualProtectEx.Call(
		uintptr(hProc), zlibAddr, uintptr(compressedSize),
		uintptr(oldProtect), uintptr(unsafe.Pointer(&oldProtect)),
	)

	return count, nil
}

// scanForCompressedBlocks: search process memory for zlib signatures and patch them
func scanForCompressedBlocks(hProc syscall.Handle) (int, error) {
	totalPatched := 0
	var addr uintptr
	var mbi MEMORY_BASIC_INFORMATION
	mbiSize := unsafe.Sizeof(mbi)

	for {
		ret, _, _ := procVirtualQueryEx.Call(
			uintptr(hProc), addr,
			uintptr(unsafe.Pointer(&mbi)), mbiSize,
		)
		if ret == 0 { break }

		if mbi.State == MEM_COMMIT &&
			mbi.Protect != PAGE_NOACCESS &&
			mbi.Protect&PAGE_GUARD == 0 &&
			mbi.RegionSize > 0 && mbi.RegionSize < 100*1024*1024 {

			buf := make([]byte, mbi.RegionSize)
			var bytesRead uintptr
			procReadProcessMemory.Call(
				uintptr(hProc), mbi.BaseAddress,
				uintptr(unsafe.Pointer(&buf[0])),
				mbi.RegionSize,
				uintptr(unsafe.Pointer(&bytesRead)),
			)
			if bytesRead > 0 {
				data := buf[:bytesRead]
				for _, sig := range zlibSignatures {
					offset := 0
					for {
						idx := bytes.Index(data[offset:], sig)
						if idx == -1 { break }
						blockAddr := mbi.BaseAddress + uintptr(offset+idx)
						// Try to patch this compressed block (scan up to 150KB)
						remaining := int(bytesRead) - (offset + idx)
						scanSize := 150 * 1024
						if remaining < scanSize {
							scanSize = remaining
						}
						count, err := patchCompressedBlock(hProc, blockAddr, scanSize)
						if err == nil && count > 0 {
							totalPatched += count
						}
						offset += idx + len(sig)
					}
				}
			}
		}

		addr = mbi.BaseAddress + mbi.RegionSize
		if addr < mbi.BaseAddress { break }
	}
	return totalPatched, nil
}

func doLaunchAndPatch() {
	mu.Lock()
	if scanning {
		mu.Unlock()
		return
	}
	scanning = true
	mu.Unlock()

	procPostMessage.Call(uintptr(hwndMain), WM_APP_ENABLEBTN, 0, 0)

	go func() {
		resetAndEnable := func() {
			mu.Lock()
			scanning = false
			mu.Unlock()
			procPostMessage.Call(uintptr(hwndMain), WM_APP_SETSTATUS, 4, 0)
			procPostMessage.Call(uintptr(hwndMain), WM_APP_ENABLEBTN, 1, 0)
		}

		if exePath == "" {
			appendLog("ERROR: Please select GOLDHORN DSP exe first")
			resetAndEnable()
			return
		}

		appendLog("Launching: " + filepath.Base(exePath))
		procPostMessage.Call(uintptr(hwndMain), WM_APP_SETSTATUS, 1, 0)

		h, processId, err := launchProcess(exePath)
		if err != nil {
			appendLog("ERROR: " + err.Error())
			resetAndEnable()
			return
		}
		hProcess = h
		pid = processId
		appendLog(fmt.Sprintf("Process started, PID=%d", pid))

		hMem, _, _ := procOpenProcess.Call(
			PROCESS_VM_READ|PROCESS_VM_WRITE|PROCESS_VM_OPERATION|PROCESS_QUERY_INFORMATION,
			0, uintptr(pid),
		)
		if hMem == 0 {
			appendLog("ERROR: Cannot open process for memory access")
			procCloseHandle.Call(uintptr(hProcess))
			resetAndEnable()
			return
		}

		appendLog("Patching compressed QML resources...")
		appendLog("This patches BEFORE Qt compiles QML.")
		procPostMessage.Call(uintptr(hwndMain), WM_APP_SETSTATUS, 3, 0)

		totalPatched := 0
		scanCount := 0
		for {
			var exitCode uint32
			procGetExitCodeProcess.Call(hMem, uintptr(unsafe.Pointer(&exitCode)))
			if exitCode != STILL_ACTIVE {
				break
			}

			count, _ := scanForCompressedBlocks(syscall.Handle(hMem))
			scanCount++
			if count > 0 {
				totalPatched += count
				appendLog(fmt.Sprintf("Patched %d items in compressed QML (total: %d)", count, totalPatched))
				procPostMessage.Call(uintptr(hwndMain), WM_APP_SETSTATUS, 2, uintptr(totalPatched))
			}

			// First 15 seconds: scan every 1s (wait for UPX + Qt init)
			// After first patch: scan every 3s (catch reloads)
			if totalPatched == 0 && scanCount < 15 {
				time.Sleep(1 * time.Second)
			} else {
				time.Sleep(3 * time.Second)
			}
		}

		procCloseHandle.Call(hMem)
		procCloseHandle.Call(uintptr(hProcess))
		hProcess = 0
		pid = 0

		appendLog("DSP process exited")
		resetAndEnable()
	}()
}

func wndProc(hwnd syscall.Handle, msg uint32, wParam, lParam uintptr) uintptr {
	switch msg {
	case WM_CREATE:
		hwndMain = hwnd // Set early so PostMessage works
		procSetTimer.Call(uintptr(hwnd), TIMER_LOG, 100, 0) // Flush logs every 100ms

		hInst, _, _ := kernel32.NewProc("GetModuleHandleW").Call(0)
		font, _, _ := procGetStockObject.Call(17) // DEFAULT_GUI_FONT

		// Title label
		h, _, _ := procCreateWindowEx.Call(0,
			uintptr(unsafe.Pointer(utf16Ptr("STATIC"))),
			uintptr(unsafe.Pointer(utf16Ptr("GOLDHORN DSP Launcher - Verification Bypass"))),
			WS_CHILD|WS_VISIBLE|0x0001, // SS_CENTER
			10, 8, 460, 20, uintptr(hwnd), 0, hInst, 0)
		procSendMessage.Call(h, WM_SETFONT, font, 1)

		// Browse button
		hb, _, _ := procCreateWindowEx.Call(0,
			uintptr(unsafe.Pointer(utf16Ptr("BUTTON"))),
			uintptr(unsafe.Pointer(utf16Ptr("Browse..."))),
			WS_CHILD|WS_VISIBLE|BS_PUSHBUTTON,
			10, 36, 80, 28, uintptr(hwnd), IDC_BTN_BROWSE, hInst, 0)
		hwndBrowse = syscall.Handle(hb)
		procSendMessage.Call(uintptr(hwndBrowse), WM_SETFONT, font, 1)

		// Status label (shows selected file)
		hs, _, _ := procCreateWindowEx.Call(0,
			uintptr(unsafe.Pointer(utf16Ptr("STATIC"))),
			uintptr(unsafe.Pointer(utf16Ptr("No file selected"))),
			WS_CHILD|WS_VISIBLE|0x2000, // SS_PATHELLIPSIS
			96, 42, 284, 18, uintptr(hwnd), IDC_STATUS, hInst, 0)
		hwndStatus = syscall.Handle(hs)
		procSendMessage.Call(uintptr(hwndStatus), WM_SETFONT, font, 1)

		// Launch button
		hBtn, _, _ := procCreateWindowEx.Call(0,
			uintptr(unsafe.Pointer(utf16Ptr("BUTTON"))),
			uintptr(unsafe.Pointer(utf16Ptr("Launch DSP"))),
			WS_CHILD|WS_VISIBLE|BS_DEFPUSHBUTTON,
			386, 36, 90, 28, uintptr(hwnd), IDC_BTN_LAUNCH, hInst, 0)
		hwndBtn = syscall.Handle(hBtn)
		procSendMessage.Call(uintptr(hwndBtn), WM_SETFONT, font, 1)

		// Log area
		hLog, _, _ := procCreateWindowEx.Call(WS_EX_CLIENTEDGE,
			uintptr(unsafe.Pointer(utf16Ptr("EDIT"))),
			0,
			WS_CHILD|WS_VISIBLE|WS_VSCROLL|ES_MULTILINE|ES_AUTOVSCROLL|ES_READONLY,
			10, 72, 466, 210, uintptr(hwnd), IDC_LOG, hInst, 0)
		hwndLog = syscall.Handle(hLog)
		procSendMessage.Call(uintptr(hwndLog), WM_SETFONT, font, 1)

		appendLog("Ready. Select GOLDHORN DSP exe and click Launch.")
		appendLog("This tool patches verification in memory (no file modification).")

		// Auto-detect exe in current directory
		selfPath, _ := os.Executable()
		selfDir := filepath.Dir(selfPath)
		candidates := []string{
			filepath.Join(selfDir, "GOLDHORN_DSP_1.9.3(12656).exe"),
			filepath.Join(selfDir, "GOLDHORN_patched.exe"),
			filepath.Join(selfDir, "GOLDHORN_unpacked_final.exe"),
		}
		for _, c := range candidates {
			if _, err := os.Stat(c); err == nil {
				exePath = c
				setStatus(exePath)
				appendLog("Auto-detected: " + filepath.Base(c))
				break
			}
		}

		// Also check common pattern
		if exePath == "" {
			matches, _ := filepath.Glob(filepath.Join(selfDir, "GOLDHORN*.exe"))
			for _, m := range matches {
				base := strings.ToLower(filepath.Base(m))
				if base != strings.ToLower(filepath.Base(selfPath)) && !strings.Contains(base, "launcher") {
					exePath = m
					setStatus(exePath)
					appendLog("Auto-detected: " + filepath.Base(m))
					break
				}
			}
		}

		return 0

	case WM_COMMAND:
		id := int(wParam & 0xFFFF)
		notify := int((wParam >> 16) & 0xFFFF)
		if notify == BN_CLICKED {
			switch id {
			case IDC_BTN_BROWSE:
				path := browseExe()
				if path != "" {
					exePath = path
					setStatus(exePath)
					appendLog("Selected: " + path)
				}
			case IDC_BTN_LAUNCH:
				doLaunchAndPatch()
			}
		}
		return 0

	case WM_TIMER:
		if wParam == TIMER_LOG {
			flushLogs()
		}
		return 0

	case WM_APP_ENABLEBTN:
		procEnableWindow.Call(uintptr(hwndBtn), wParam)
		if wParam == 1 {
			procSetWindowText.Call(uintptr(hwndBtn), uintptr(unsafe.Pointer(utf16Ptr("Launch DSP"))))
		}
		return 0

	case WM_APP_SETSTATUS:
		switch wParam {
		case 0: setStatus("Ready")
		case 1: setStatus("Launching...")
		case 2: setStatus(fmt.Sprintf("Patched! (%d modifications)", lParam))
		case 3: procSetWindowText.Call(uintptr(hwndBtn), uintptr(unsafe.Pointer(utf16Ptr("Running..."))))
		case 4: setStatus("Ready")
		}
		return 0

	case WM_CLOSE:
		procDestroyWindow.Call(uintptr(hwnd))
		return 0

	case WM_DESTROY:
		procKillTimer.Call(uintptr(hwnd), TIMER_LOG)
		procPostQuitMessage.Call(0)
		return 0
	}

	ret, _, _ := procDefWindowProc.Call(uintptr(hwnd), uintptr(msg), wParam, lParam)
	return ret
}

func main() {
	runtime.LockOSThread() // UI message loop must stay on main OS thread

	hInst, _, _ := kernel32.NewProc("GetModuleHandleW").Call(0)

	className := utf16Ptr("GoldhornLauncherClass")
	cursor, _, _ := procLoadCursor.Call(0, IDC_ARROW)
	icon, _, _ := procLoadIcon.Call(0, IDI_APPLICATION)
	bgBrush := uintptr(COLOR_BTNFACE + 1)

	wc := WNDCLASSEX{
		Style:      3, // CS_HREDRAW | CS_VREDRAW
		WndProc:    syscall.NewCallback(wndProc),
		Instance:   syscall.Handle(hInst),
		Icon:       syscall.Handle(icon),
		Cursor:     syscall.Handle(cursor),
		Background: syscall.Handle(bgBrush),
		ClassName:  className,
		IconSm:     syscall.Handle(icon),
	}
	wc.Size = uint32(unsafe.Sizeof(wc))

	procRegisterClassEx.Call(uintptr(unsafe.Pointer(&wc)))

	h, _, _ := procCreateWindowEx.Call(
		0,
		uintptr(unsafe.Pointer(className)),
		uintptr(unsafe.Pointer(utf16Ptr("GOLDHORN DSP Launcher"))),
		WS_OVERLAPPEDWINDOW & ^uintptr(0x00040000), // no thickframe (fixed size)
		cwUSEDEFAULT, cwUSEDEFAULT,
		500, 330,
		0, 0, hInst, 0,
	)
	hwndMain = syscall.Handle(h)

	procShowWindow.Call(h, SW_SHOW)
	procUpdateWindow.Call(h)

	var msg MSG
	for {
		ret, _, _ := procGetMessage.Call(uintptr(unsafe.Pointer(&msg)), 0, 0, 0)
		if ret == 0 || ret == ^uintptr(0) { break }
		procTranslateMessage.Call(uintptr(unsafe.Pointer(&msg)))
		procDispatchMessage.Call(uintptr(unsafe.Pointer(&msg)))
	}
}
