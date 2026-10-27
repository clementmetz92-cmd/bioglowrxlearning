"""Builds the pre-exam simulator pages from the question banks:
  exams/index.html            every subject and its formats
  exams/<subject>/index.html  one page per data/exams/<subject>.js
A subject page loads the data file of every game its bank reuses ("sources"), the diagram scripts of games used
for diagram questions, and Element Rush when a format offers the periodic table. Run it after adding a source
to a bank:  python3 tools-exam-pages.py   (tools-check.py reports a page that is out of date).
The pages stay out of sitemap.xml and carry noindex until exams launch."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).parent
def stamp():
    m = re.search(r'engine/core\.js\?v=(\d+)', (ROOT / "index.html").read_text())
    return "?v=" + m.group(1) if m else ""
V = stamp()
TITLES = {"chemistry": "Chemistry", "anatomy": "Anatomy & Physiology", "pharmacology": "Pharmacology", "nutrition": "Nutrition", "wellness": "Health & Wellness"}
CORE = ["engine/core.js", "engine/study.js", "engine/icons.js", "engine/icons-more.js", "data/catalog.js", "data/progress-map.js", "engine/progress.js", "engine/config.js", "engine/community.js"]

def head(title, desc, root, page, subject=""):
    css = "".join(f'<link rel="stylesheet" href="{root}{c}{V}">\n' for c in ["assets/fonts/fonts.css", "assets/tokens.css", "assets/bundle.css", "engine/engine.css", "engine/exam.css"])
    return f"""<!doctype html>
<html lang="en" data-root="{root}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="noindex">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-title" content="BioglowRX">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#0E6B66">
<link rel="icon" href="{root}assets/favicon.svg" type="image/svg+xml">
{css}</head>
<body class="br-root" data-page="{page}"{f' data-subject="{subject}"' if subject else ""}>
<div class="br-wrap">
  <header class="br-header" id="br-header"></header>
  <main id="br-view" class="ex-view"><p class="br-hint">Loading the exam…</p></main>
  <footer class="br-foot" id="br-foot"></footer>
</div>
"""

def scripts(root, files):
    return "".join(f'<script src="{root}{f}{V}"></script>\n' for f in files) + "</body>\n</html>\n"

def page_for(subject):
    bank = (ROOT / "data" / "exams" / f"{subject}.js").read_text()
    src = re.search(r'"sources"\s*:\s*\[(.*?)\n\]', bank, re.S)
    entries = re.findall(r'\{[^{}]*"game"\s*:\s*"([a-z0-9-]+)"[^{}]*?"use"\s*:\s*"([a-z]+)"', src.group(1) if src else "")
    games, dg = [], ["engine/diagrams.js"]
    for g, use in entries:
        if g not in games: games.append(g)
        if use == "diagram":
            gp = (ROOT / "games" / g / "index.html").read_text()
            for s in re.findall(r'src="\.\./\.\./(engine/(?:illus|dg-[a-z-]+)\.js)', gp):
                if s not in dg: dg.append(s)
    # diagrams drawn by the bank's own diagram questions: engine/dg-<name>.js (or whichever file defines it)
    for d in dict.fromkeys(re.findall(r'"diagram"\s*:\s*"([a-z0-9-]+)"', bank)):
        f = next((x for x in sorted((ROOT / "engine").glob("*.js")) if re.search(r'DIAGRAMS(\.%s\b|\["%s"\])\s*=' % (d, d), x.read_text())), None)
        if f is None: sys.exit(f"exam pages: no engine file draws diagram {d!r} ({subject} bank)")
        s = "engine/" + f.name
        if s not in dg: dg.append(s)
    if '"ptable"' in bank and "element-rush" not in games: games.append("element-rush")
    files = CORE + dg + ["engine/exam-core.js"] + [f"data/{g}.js" for g in games] + [f"data/exams/{subject}.js", "engine/exam.js"]
    t = TITLES.get(subject, subject.title())
    return head(f"Pre-exam simulator · {t} · BioglowRX Sciences Learning", f"{t} mock exams: timed, LMS-style practice papers with review. Practice only.", "../../", "exam", subject) + scripts("../../", files)

def build():
    out = {}
    subs = sorted(p.stem for p in (ROOT / "data" / "exams").glob("*.js"))
    for s in subs: out[ROOT / "exams" / s / "index.html"] = page_for(s)
    out[ROOT / "exams" / "index.html"] = head("Pre-exam simulator · BioglowRX Sciences Learning", "Timed mock exams for every subject. Practice only.", "../", "exams") + \
        scripts("../", CORE + ["engine/exam-core.js"] + [f"data/exams/{s}.js" for s in subs] + ["engine/exam.js"])
    return out

if __name__ == "__main__":
    pages, check = build(), "--check" in sys.argv
    stale = []
    for p, t in pages.items():
        norm = lambda s: re.sub(r'\?v=\d+', '', s)
        if p.exists() and norm(p.read_text()) == norm(t): continue
        if check: stale.append(p.relative_to(ROOT).as_posix()); continue
        p.parent.mkdir(parents=True, exist_ok=True); p.write_text(t)
    if check:
        for s in stale: print("stale:", s)
        sys.exit(1 if stale else 0)
    print(f"exam pages: {len(pages)} built")
