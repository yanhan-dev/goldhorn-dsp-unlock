"""
Generate patched_block.bin for Go embed.

This script takes the unpacked GOLDHORN exe, extracts the compressed QML
resource block containing verification logic, applies patches to the
decompressed QML source, recompresses with Python's zlib (which produces
smaller output than Go's zlib), and saves the result padded to the
original compressed size.

Usage:
    python gen_patch.py [path_to_unpacked_exe]

Output:
    patched_block.bin (99124 bytes, ready for go:embed)
"""
import zlib
import sys
import os

# Known offset and size of the verify_qml compressed block
# These are for GOLDHORN DSP 1.9.3 (build 12656)
BLOCK_OFFSET = 0xdc79f8
BLOCK_SIZE = 99124

# Equal-length QML source text replacements
PATCHES = [
    (b"Ams.isNeedVerifyDevice()", b"(false                 )"),
    (b"Ams.isVerifyPass()",       b"(true            )"),
    (b"Ams.setVerifyPass(false)", b"Ams.setVerifyPass(true )"),
    (b"Ams.isNeedReportDevice()", b"(false                 )"),
]

def main():
    exe_path = sys.argv[1] if len(sys.argv) > 1 else "../unpacked/GOLDHORN_unpacked.exe"

    if not os.path.exists(exe_path):
        print("File not found:", exe_path)
        sys.exit(1)

    with open(exe_path, "rb") as f:
        data = f.read()

    compressed = data[BLOCK_OFFSET:BLOCK_OFFSET + BLOCK_SIZE]
    js = zlib.decompress(compressed)
    print("Decompressed: %d bytes" % len(js))

    total = 0
    for old, new in PATCHES:
        assert len(old) == len(new), "%s (%d) != %s (%d)" % (old, len(old), new, len(new))
        count = js.count(old)
        if count:
            js = js.replace(old, new)
            total += count
            print("  %s -> %s : %d" % (old.decode(), new.decode(), count))

    print("Total patches: %d" % total)

    patched = zlib.compress(js, 9)
    print("Recompressed: %d bytes (original: %d, diff: %+d)" % (
        len(patched), BLOCK_SIZE, len(patched) - BLOCK_SIZE))

    if len(patched) > BLOCK_SIZE:
        print("ERROR: recompressed data too large!")
        sys.exit(1)

    padded = patched + b"\x00" * (BLOCK_SIZE - len(patched))
    with open("patched_block.bin", "wb") as f:
        f.write(padded)
    print("Saved: patched_block.bin (%d bytes)" % len(padded))

if __name__ == "__main__":
    main()
