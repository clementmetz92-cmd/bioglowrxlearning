"""Link previews and canonical URLs for every page (run by tools-bump-version.py).
Writes a block between <!--seo--> and <!--/seo--> in each page's <head>: canonical, Open Graph and Twitter tags.
Preview images live in assets/og/ (one per game and lab, one per subject, site.jpg for everything else).
Practice pages build their own tags in tools-practice-pages.py and are skipped here."""
import pathlib, re, html

ROOT = pathlib.Path(__file__).parent
SITE = "https://bioglowrx.netlify.app/"
n = 0
for f in sorted(ROOT.rglob("index.html")):
    rel = f.relative_to(ROOT).as_posix()
    if rel.startswith(("practice/", "exams/")):   # exam pages: noindex until launch, built by tools-exam-pages.py
        continue
    t = f.read_text()
    path = rel[: -len("index.html")]                      # "" for the hub, "games/bone-rush/" …
    url = SITE + path
    title = re.search(r"<title>(.*?)</title>", t, re.S)
    desc = re.search(r'<meta name="description" content="(.*?)">', t, re.S)
    title = html.unescape(title.group(1).strip()) if title else "BioglowRX Sciences Learning"
    desc = html.unescape(desc.group(1).strip()) if desc else "Free science games built from real university textbooks."
    parts = path.strip("/").split("/")
    img = "site"
    if parts[0] == "games" and len(parts) > 1 and (ROOT / "assets" / "og" / f"{parts[1]}.jpg").exists():
        img = parts[1]
    elif parts[0] == "subjects" and len(parts) > 1 and (ROOT / "assets" / "og" / f"subject-{parts[1]}.jpg").exists():
        img = "subject-" + parts[1]
    e = lambda s: html.escape(s, quote=True)
    block = ("<!--seo-->\n"
             f'<link rel="canonical" href="{url}">\n'
             '<meta property="og:type" content="website">\n'
             '<meta property="og:site_name" content="BioglowRX Sciences Learning">\n'
             f'<meta property="og:title" content="{e(title)}">\n'
             f'<meta property="og:description" content="{e(desc)}">\n'
             f'<meta property="og:url" content="{url}">\n'
             f'<meta property="og:image" content="{SITE}assets/og/{img}.jpg">\n'
             '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
             '<meta name="twitter:card" content="summary_large_image">\n'
             f'<meta name="twitter:image" content="{SITE}assets/og/{img}.jpg">\n'
             "<!--/seo-->\n")
    if "<!--seo-->" in t:
        t2 = re.sub(r"<!--seo-->.*?<!--/seo-->\n", block, t, flags=re.S)
    else:
        t2 = t.replace('<meta name="theme-color"', block + '<meta name="theme-color"', 1)
    if t2 != t:
        f.write_text(t2); n += 1
print(f"seo tags: {n} pages updated")
