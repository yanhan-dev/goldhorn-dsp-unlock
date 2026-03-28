"""
GOLDHORN DSP - Patch verification logic in compressed QML/JS resources.
Replaces isNeedVerifyDevice()->false, isVerifyPass()->true in-place.
"""
import zlib, struct, shutil, os, subprocess, time

SRC = 'D:/ida/GOLDHORN_unpacked_final.exe'
DST = 'D:/ida/GOLDHORN_patched.exe'
BASE = 0x5d0000

# Compressed block locations (file offsets and compressed sizes)
BLOCKS = [
    ('verify_qml', 0xdc79f8, 99124),   # VA 0x13979f8
    ('main_qml',   0xd7ac37, 109002),   # VA 0x134ac37
]

# Equal-length replacements (old -> new, must be same byte count)
REPLACEMENTS = [
    # isNeedVerifyDevice() -> always false (24 chars each)
    (b'Ams.isNeedVerifyDevice()', b'(false                 )'),
    # isVerifyPass() -> always true (18 chars each)
    (b'Ams.isVerifyPass()',       b'(true            )'),
    # setVerifyPass(false) -> setVerifyPass(true) (keep length)
    (b'Ams.setVerifyPass(false)', b'Ams.setVerifyPass(true )'),
    # isNeedReportDevice() -> false (24 chars)
    (b'Ams.isNeedReportDevice()', b'(false                 )'),
]

print('[*] Copying %s -> %s' % (os.path.basename(SRC), os.path.basename(DST)))
shutil.copy2(SRC, DST)

with open(DST, 'rb') as f:
    data = bytearray(f.read())

for block_name, block_off, comp_size in BLOCKS:
    print('\n[*] Processing %s (offset 0x%x, %d bytes compressed)' % (block_name, block_off, comp_size))

    # Decompress
    compressed_orig = bytes(data[block_off:block_off + comp_size])
    js = zlib.decompress(compressed_orig)
    print('    Decompressed: %d bytes' % len(js))

    # Apply replacements
    total = 0
    for old, new in REPLACEMENTS:
        assert len(old) == len(new), 'Length mismatch: %s (%d) vs %s (%d)' % (old, len(old), new, len(new))
        count = js.count(old)
        if count > 0:
            js = js.replace(old, new)
            total += count
            print('    %s -> %s : %d' % (old.decode(), new.decode(), count))

    print('    Total replacements: %d' % total)

    if total == 0:
        print('    No changes needed, skipping')
        continue

    # Recompress
    compressed_new = zlib.compress(js, 9)  # Max compression
    print('    Recompressed: %d bytes (orig: %d, diff: %+d)' % (
        len(compressed_new), comp_size, len(compressed_new) - comp_size))

    if len(compressed_new) <= comp_size:
        # Fits in original space - write in place, pad with zeros
        data[block_off:block_off + comp_size] = compressed_new + b'\x00' * (comp_size - len(compressed_new))
        print('    Written in-place (padded %d zero bytes)' % (comp_size - len(compressed_new)))
    else:
        # Doesn't fit - append to end of file
        new_off = len(data)
        data += compressed_new
        # Pad to alignment
        data += b'\x00' * ((-len(data)) % 0x200)
        print('    Appended at file offset 0x%x (original space too small)' % new_off)
        # Note: Qt resource system uses its own offset table, not PE sections
        # The zlib data is referenced by an offset stored elsewhere
        # For now, in-place should work since compression ratio is similar

# Verify the patches took effect
print('\n[*] Verifying patches...')
for block_name, block_off, comp_size in BLOCKS:
    compressed = bytes(data[block_off:block_off + comp_size])
    # Find actual compressed data (might have trailing zeros from padding)
    try:
        js = zlib.decompress(compressed)
    except:
        # Try without trailing zeros
        for end in range(comp_size, 0, -1):
            try:
                js = zlib.decompress(bytes(data[block_off:block_off + end]))
                break
            except:
                pass

    text = js.decode('utf-8', 'replace')
    remaining_verify = text.count('Ams.isNeedVerifyDevice()')
    remaining_pass = text.count('Ams.isVerifyPass()')
    patched_false = text.count('(false                 )')
    patched_true = text.count('(true            )')
    print('  %s: remaining verify=%d pass=%d | patched false=%d true=%d' % (
        block_name, remaining_verify, remaining_pass, patched_false, patched_true))

with open(DST, 'wb') as f:
    f.write(data)

print('\n[+] Saved: %s (%d bytes)' % (DST, len(data)))

# Test launch
print('\n[*] Testing launch...')
p = subprocess.Popen([DST])
time.sleep(8)
if p.poll() is None:
    print('[+] SUCCESS! Patched program running, PID=%d' % p.pid)
    p.terminate()
else:
    print('[!] Exit: 0x%x' % (p.returncode & 0xFFFFFFFF))
