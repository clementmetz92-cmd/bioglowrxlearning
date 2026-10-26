"""Checks to run before every push (the git pre-push hook in .githooks runs this):
  1. every engine and data script parses (node --check)
  2. content checks on every game (tools-validate.js): errors stop the push, warnings are listed
  3. every page: local links and scripts exist, no inline scripts or on…= handlers (the site's
     Content-Security-Policy would block them), study.js loads straight after core.js
  4. optional: python3 tools-check.py --smoke  opens every page and one round of every game in a
     headless browser (needs Playwright and a local server on port 8765)
Exit code 1 when something must be fixed."""
import pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).parent
bad, warn = [], []

# 1. syntax
for f in sorted(list((ROOT / "engine").glob("*.js")) + list((ROOT / "data").glob("*.js"))):
    r = subprocess.run(["node", "--check", str(f)], capture_output=True, text=True)
    if r.returncode: bad.append(f"syntax: {f.relative_to(ROOT)}: {r.stderr.strip().splitlines()[-1] if r.stderr.strip() else 'error'}")

# 2. content
r = subprocess.run(["node", str(ROOT / "tools-validate.js")], capture_output=True, text=True)
for line in r.stdout.splitlines():
    if not line.strip() or line.startswith("TOTAL"): continue
    soft = "identical answer" in line or "duplicate clues" in line or "duplicate item name" in line
    (warn if soft else bad).append("content: " + line)
if r.returncode: bad.append("content: validator crashed: " + r.stderr.strip()[-200:])

# 3. pages
for f in sorted(ROOT.rglob("*.html")):
    rel = f.relative_to(ROOT).as_posix()
    if rel.startswith("google"): continue
    t = f.read_text()
    for m in re.finditer(r'<script(?![^>]*\bsrc=)(?![^>]*application/ld\+json)[^>]*>', t): bad.append(f"page: {rel}: inline <script> (blocked by the CSP)")
    if re.search(r'\son(click|load|error|change|input|submit)="', t): bad.append(f"page: {rel}: inline on…= handler (blocked by the CSP)")
    for m in re.finditer(r'(?:src|href)="([^"#:]+?)(?:\?[^"]*)?"', t):
        u = m.group(1)
        if not u or u.startswith(("http", "mailto", "//", "{")): continue
        p = (ROOT / u.lstrip("/")) if u.startswith("/") else (f.parent / u)
        if p.is_dir(): p = p / "index.html"
        if not p.exists(): bad.append(f"page: {rel}: missing {u}")
    if "engine/core.js" in t and not re.search(r'engine/core\.js[^"]*"></script>\s*<script src="[^"]*engine/study\.js', t):
        bad.append(f"page: {rel}: study.js must load straight after core.js")

# 4. smoke test in a browser
if "--smoke" in sys.argv:
    r = subprocess.run([sys.executable, str(ROOT / "tools-smoke.py")])
    if r.returncode: bad.append("smoke: the browser test found problems (see above)")

for w in warn: print("warning ·", w)
for b in bad: print("PROBLEM ·", b)
print(f"\n{len(bad)} problem(s), {len(warn)} warning(s)")
sys.exit(1 if bad else 0)
