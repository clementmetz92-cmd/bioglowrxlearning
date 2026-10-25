"""Cache-busting: stamp every local .js/.css link in the HTML pages with ?v=<timestamp>,
so browsers fetch the new files right after an update instead of a copy saved up to 10 minutes earlier.
Run before every push:  python3 tools-bump-version.py"""
import re, pathlib, time
v = time.strftime("%Y%m%d%H%M")
n = 0
for f in pathlib.Path(__file__).parent.rglob("*.html"):
    s = f.read_text()
    t = re.sub(r'((?:src|href)="(?!https?:)[^"?]+\.(?:js|css))(\?v=\d+)?"', lambda m: f'{m.group(1)}?v={v}"', s)
    if t != s: f.write_text(t); n += 1
print(f"stamped {n} pages with v={v}")

# keep the progress map (scored modes per game) in step with the games
import subprocess, sys
try:
    subprocess.run([sys.executable, str(pathlib.Path(__file__).parent / "tools-progress-map.py")], check=True)
except Exception as e:
    print("progress map not rebuilt:", e)
