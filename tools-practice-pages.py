"""Builds the search landing pages in practice/<slug>/index.html and the practice/index.html list,
and adds them to sitemap.xml. Each page targets one thing students search for and opens straight
into the matching game (games accept ?mode=<id>). Sample rows are read from the game's data file,
so they stay in step with the games. Run:  python3 tools-practice-pages.py  (needs node)."""
import json, pathlib, subprocess, html, re, datetime

ROOT = pathlib.Path(__file__).parent
SITE = "https://bioglowrx.netlify.app/"
TODAY = datetime.date.today().isoformat()
esc = html.escape

def game_data(gid):
    js = "const fs=require('fs');let G;global.BGX={registerGame:g=>G=g};eval(fs.readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(G));"
    return json.loads(subprocess.check_output(["node", "-e", js, str(ROOT / "data" / f"{gid}.js")]))

# ---------- the pages ----------
# rows(G) returns (column headings, list of rows) for the "a taste of what's inside" table.
PAGES = [
  dict(slug="dosage-calculation-practice", short="Tablets, liquids, mg/kg and IV rates with worked answers", game="dose-calc", mode="challenge", subject="Pharmacology",
    title="Free Dosage Calculation Practice (with Worked Answers)",
    h1="Free dosage calculation practice",
    desc="Practise nursing dosage calculations free: tablets, liquids, mg/kg doses, IV pump rates and drip rates, with new numbers every round and a worked answer for each.",
    intro=["Dosage calculations come down to a handful of formulas: tablets (D ÷ H), liquids (D ÷ H × V), unit conversions, weight-based doses, pump rates in mL/h and drip rates in drops per minute. The hard part is applying them quickly and without slips.",
           "Dose Calc gives you new numbers every round, accepts your typed answer, and shows the full worked method after every question. If your answer is out by 10, 100 or 1,000 it tells you to check the decimal point or the unit conversion, the two most common mistakes."],
    rows=lambda G: (["Formula", "Use it when"], [[i["name"], i["formula"], i["use"]] for i in G["items"]]),
    cols3=True, heads=["What it works out", "Formula", "Example"],
    how=["Start with <b>Learn the method</b>: the \"Show me how\" button walks you through each step.",
         "Move on to <b>Tablets and liquids</b>, <b>Weight-based doses</b> and <b>IV rates and drips</b> one at a time.",
         "Finish with the <b>Challenge round</b>: 10 mixed problems. Aim for 70% or more to pass."],
    faq=[("Which formula does it use for liquids?", "Desired dose ÷ dose on hand × volume (D ÷ H × V), after converting both doses to the same unit."),
         ("Is it safe to use for real patients?", "No. It is practice for students. Always follow your programme's teaching and local policy for real medication.")],
    related=["virtual-titration-lab", "nursing-pharmacology-drug-classes", "abg-practice"]),

  dict(slug="periodic-table-game", short="Names, symbols, families and where each element sits", game="element-rush", mode="sym", subject="Chemistry",
    title="Periodic Table Game: Learn All 118 Elements Free",
    h1="Periodic table game",
    desc="Learn the periodic table with a free game: element names and symbols, find it on the table, atomic numbers and element families. Start with the first 54, then all 118.",
    intro=["Learning the periodic table is easier in short bursts. Element Rush turns it into quick rounds: see the name and pick the symbol, see the symbol and pick the name, tap where an element sits on the table, or name its family.",
           "Every element has an Explore card with what it looks like, where you meet it in everyday life, its electron arrangement and how it got its name. Start with the first 54 elements, then unlock all 118."],
    rows=lambda G: (None, [[i["symbol"], i["name"], str(i["num"]), G["_cat"][i["cat"]]] for i in G["items"] if i["num"] in (1, 6, 8, 11, 17, 26, 29, 79)]),
    heads=["Symbol", "Element", "Atomic number", "Family"],
    how=["Open <b>Explore the table</b> and tap a few elements to get a feel for the families.",
         "Play <b>Name → Symbol</b> and <b>Symbol → Name</b> until you score 70% or more.",
         "Then try <b>Find it on the table</b> and <b>Which family?</b> to learn where each element sits."],
    faq=[("Can I learn just the first part of the table?", "Yes. Pick \"First 54\" for elements 1 to 54, then switch to \"All 118\" when you're ready.")],
    related=["balancing-chemical-equations-practice", "virtual-titration-lab", "vitamins-and-minerals-quiz"]),

  dict(slug="cranial-nerves-quiz", short="All 12 nerves: number, name and job", game="neuron-relay", mode="cranial", subject="Anatomy & Physiology",
    title="Cranial Nerves Quiz: All 12 Nerves, Free Practice",
    h1="Cranial nerves quiz",
    desc="Free cranial nerves quiz: practise all 12 cranial nerves, their numbers and their jobs, with match pairs, study notes and neuro case files.",
    intro=["There are 12 pairs of cranial nerves, numbered I to XII from front to back of the brain. You need to know each one's name, number and job, and whether it carries sensation, movement or both.",
           "This quiz is part of Neuron Relay, our nervous-system game. Read the study notes, quiz yourself on what each nerve does, then match each nerve to its job in Match Pairs. The full game also covers neurons, synapses, the spinal cord and the brain."],
    rows=lambda G: (None, [[i["name"], i["job"]] for i in G["items"] if i["cat"] == "cranial"]),
    heads=["Cranial nerve", "What it does"],
    how=["Read the <b>Study notes</b> on cranial nerves first.",
         "Play <b>Cranial nerve check</b>: you see the job and pick the nerve.",
         "Then play <b>Cranial nerve pairs</b> to lock in all 12."],
    faq=[("Does it cover the whole nervous system?", "Yes. Neuron Relay has 49 cards on neurons, glial cells, nerve signals, the spinal cord, the brain and all 12 cranial nerves.")],
    related=["bones-of-the-skeleton-quiz", "blood-flow-through-the-heart", "abg-practice"]),

  dict(slug="bones-of-the-skeleton-quiz", short="Name and place 34 bones, with a skeleton diagram", game="bone-rush", mode="where", subject="Anatomy & Physiology",
    title="Bones of the Skeleton Quiz: Name and Place 34 Bones",
    h1="Bones of the skeleton quiz",
    desc="Free skeleton quiz: name the main bones of the body, say where each one sits and sort them by region, with a skeleton diagram after every answer.",
    intro=["The adult skeleton has about 206 bones. Bone Rush covers the 34 main bones and groups you need to name and place first: skull and face, spine, chest, shoulder and arm, wrist and hand, pelvis, leg, and ankle and foot.",
           "After every answer you see the bone highlighted on a skeleton diagram, so you learn where it sits, not just its name."],
    rows=lambda G: (None, [[i["name"], i["where"]] for i in G["items"]][:12]),
    heads=["Bone", "Where it is"],
    how=["Open <b>Explore the skeleton</b> and tap each region.",
         "Play <b>Where is it?</b> (see the bone, pick where it sits) and <b>Which bone?</b> (see the place, name the bone).",
         "Finish with <b>Which region?</b> and <b>Match Pairs</b>."],
    faq=[("Does it cover every bone?", "It covers the 34 main bones and groups students learn first; small bones are grouped, for example the carpals and tarsals.")],
    related=["cranial-nerves-quiz", "blood-flow-through-the-heart", "periodic-table-game"]),

  dict(slug="nursing-pharmacology-drug-classes", short="25 common medicines: class, system and use", game="drug-class-sort", mode="class", subject="Pharmacology",
    title="Nursing Pharmacology Practice: Drug Classes Quiz",
    h1="Nursing pharmacology: drug classes quiz",
    desc="Free drug classes quiz for nursing and pharmacology students: 25 common medicines, their class, body system and main use, with name endings like -pril and -olol.",
    intro=["Knowing the drug class is the shortcut in pharmacology: medicines in the same class work the same way, so the class tells you what a drug treats and its classic side effects. Many generic names even carry a family ending, such as -pril, -sartan, -olol, -statin and -prazole.",
           "Drug Class Sort covers 25 common medicines across the heart and blood vessels, breathing and allergy, digestion, brain and nerves, and hormones and diabetes."],
    rows=lambda G: (None, [[i["name"], i["cls"], i["use"]] for i in G["items"]][:10]),
    heads=["Medicine", "Class", "Main use"],
    how=["Open <b>Explore medicines</b> and look for the name endings.",
         "Play <b>Name the class</b> and <b>What is it for?</b>.",
         "Then sort by <b>Which body system?</b> and finish with <b>Match Pairs</b>."],
    faq=[("Which drug names does it use?", "US generic names, matching the Open RN Nursing Pharmacology textbook.")],
    related=["dosage-calculation-practice", "abg-practice", "vitamins-and-minerals-quiz"]),

  dict(slug="abg-practice", short="Read pH, CO₂ and bicarbonate in patient cases", game="kidney-quest", mode="gases", subject="Anatomy & Physiology",
    title="ABG Practice: Free Blood Gas Interpretation Cases",
    h1="ABG practice: blood gas cases",
    desc="Free arterial blood gas practice: read pH, CO₂ and bicarbonate step by step to spot acidosis or alkalosis, respiratory or metabolic, in short patient cases.",
    intro=["Reading an arterial blood gas comes down to three questions in order: is the pH acidic or alkaline, is the cause respiratory (CO₂) or metabolic (bicarbonate), and is the body compensating?",
           "Blood gas detective, part of Kidney Quest, walks you through short patient cases one step at a time. Each answer builds up the case file, and the case closes with a one-line takeaway."],
    rows=lambda G: (None, [[i["name"], i["job"]] for i in G["items"] if i["cat"] == "acid"]),
    heads=["Key idea", "What to know"],
    how=["Read the <b>Study notes</b> section on acid–base balance.",
         "Open <b>Blood gas detective</b> and work through the cases step by step.",
         "Then try the general <b>Case Files</b> for kidney and fluid problems."],
    faq=[("What is the normal blood pH range?", "7.35 to 7.45. Below 7.35 is acidosis; above 7.45 is alkalosis.")],
    related=["dosage-calculation-practice", "cranial-nerves-quiz", "nursing-pharmacology-drug-classes"]),

  dict(slug="balancing-chemical-equations-practice", short="Set the coefficients, name the reaction type", game="balance-it", mode="balance", subject="Chemistry",
    title="Balancing Chemical Equations Practice (Free, Interactive)",
    h1="Balancing chemical equations practice",
    desc="Practise balancing chemical equations free: set the coefficients with + and − buttons, see the atom count update, then name the reaction type and work out moles.",
    intro=["Atoms are never created or destroyed in a reaction, so both sides of an equation need the same number of each kind of atom. You balance it by changing only the coefficients, the big numbers in front of each formula.",
           "In Balance It you set each coefficient with + and − buttons and check your answer. The game also asks you to name the reaction type and includes a mole calculator with worked answers."],
    rows=lambda G: (None, [[i["eq"], i["balanced"]] for i in G["items"] if i.get("balanced")][:8]),
    heads=["Unbalanced", "Balanced"],
    how=["Read the <b>Study notes</b> on balancing and reaction types.",
         "Play <b>Balance the equation</b> until each one feels quick.",
         "Then try <b>Which reaction type?</b> and the <b>Mole calculator</b>."],
    faq=[("Can I change the small numbers in a formula?", "No. Subscripts are part of the formula; changing them makes a different substance. Only change the coefficients.")],
    related=["periodic-table-game", "virtual-titration-lab", "dosage-calculation-practice"]),

  dict(slug="blood-flow-through-the-heart", short="Chambers, valves and vessels in the right order", game="heart-flow", mode="flow", subject="Anatomy & Physiology",
    title="Blood Flow Through the Heart: Order Quiz and Diagram",
    h1="Blood flow through the heart",
    desc="Learn the order of blood flow through the heart: chambers, valves and vessels, step by step, with a labelled heart diagram and a put-it-in-order game.",
    intro=["The heart is two pumps side by side. The right side sends oxygen-poor blood to the lungs; the left side sends oxygen-rich blood to the whole body. Valves between the chambers keep the blood moving one way.",
           "Heart Flow has you put each journey in the right order, chamber by chamber and valve by valve, with a labelled diagram on every card. It also covers the heart's electrical system."],
    rows=lambda G: (None, [[s["title"], " → ".join(s["steps"])] for s in G["sequences"][:2]]),
    heads=["Journey", "Order"],
    how=["Read the <b>Study notes</b>: chambers, valves, big vessels and the electrical system.",
         "Play <b>Put it in order</b> for each journey.",
         "Finish with <b>Who does this job?</b> and <b>Match Pairs</b>."],
    faq=[("Which side of the heart pumps to the body?", "The left side. The left ventricle pumps oxygen-rich blood into the aorta and out to the body.")],
    related=["bones-of-the-skeleton-quiz", "cranial-nerves-quiz", "abg-practice"]),

  dict(slug="virtual-titration-lab", short="Pour, swirl and stop at the pink endpoint", game="titration-lab", mode=None, subject="Chemistry", lab=True,
    title="Virtual Titration Lab: Free Online Simulation",
    h1="Virtual titration lab",
    desc="Free virtual titration simulation: hold to pour NaOH from a burette into HCl with phenolphthalein, swirl, and stop at the first lasting pale pink. Three levels.",
    intro=["A titration finds the concentration of an acid by adding a base of known concentration until the indicator just changes colour. With phenolphthalein, that endpoint is the first pale pink that lasts after swirling.",
           "In this simulation you hold to pour sodium hydroxide from the burette into 25.0 mL of hydrochloric acid, slow down near the endpoint, add single drops and swirl. Level 1 guides you with a pH meter and a \"slow down\" band; levels 2 and 3 take the help away and add the concentration calculation."],
    table_override=(["Level", "What you do"], [["1 · First titration", "Guided: pH meter, slow-down band and step tracker"],
                                                ["2 · On your own", "No meter: read the burette and stop at the pink endpoint"],
                                                ["3 · Work it out", "Find the endpoint, then calculate the acid's concentration"]]),
    how=["Start with <b>Level 1</b> and follow the steps on screen.",
         "Try <b>Level 2</b> without the pH meter. Using a hint caps the run at 2 stars.",
         "Finish with <b>Level 3</b> and the concentration calculation."],
    faq=[("What indicator does it use?", "Phenolphthalein: colourless in acid, pink once the solution turns slightly basic.")],
    related=["balancing-chemical-equations-practice", "periodic-table-game", "dosage-calculation-practice"]),

  dict(slug="vitamins-and-minerals-quiz", short="What each does, where to find it, what happens without it", game="nutrient-rush", mode="lack", subject="Nutrition",
    title="Vitamins and Minerals Quiz: Deficiencies and Food Sources",
    h1="Vitamins and minerals quiz",
    desc="Free vitamins and minerals quiz: what each nutrient does, which foods have it and what happens without enough, from vitamin A to zinc.",
    intro=["Vitamins and minerals are needed in small amounts, but each has a job no other nutrient can do. For exams you usually need three things for each one: what it does, where you find it, and what a deficiency looks like.",
           "Nutrient Rush quizzes you on all three for 17 vitamins and minerals, split into fat-soluble vitamins, water-soluble vitamins, major minerals and trace minerals."],
    rows=lambda G: (None, [[i["name"], i["lack"], i["foods"]] for i in G["items"]][:8]),
    heads=["Nutrient", "Not enough causes", "Found in"],
    how=["Read the <b>Study notes</b> on each nutrient group.",
         "Play <b>Not enough causes…</b> and <b>Find it in food</b>.",
         "Then sort them in <b>Vitamin or mineral?</b> and finish with <b>Match Pairs</b>."],
    faq=[("Which vitamins are fat-soluble?", "Vitamins A, D, E and K. They are stored in body fat, so large amounts can build up.")],
    related=["nursing-pharmacology-drug-classes", "dosage-calculation-practice", "periodic-table-game"]),
]

COMMON_FAQ = [("Is it free?", "Yes. Everything is free, with no ads and nothing to buy."),
              ("Do I need an account?", "No. There is no login. Your scores, streaks and certificates are saved on your device."),
              ("Does it work on a phone?", "Yes. It works in any modern browser on phones, tablets, Chromebooks and computers.")]

COLOR = {"Chemistry": "var(--cat-sky)", "Anatomy & Physiology": "var(--cat-peach)", "Pharmacology": "var(--cat-lilac)",
         "Nutrition": "var(--cat-sage)", "Health & Wellness": "var(--cat-mint)"}

def card(p, href, art):
    return (f'<a class="pr-card" href="{href}" style="--c:{COLOR[p["subject"]]}">'
            f'<span class="pr-art"><img src="{art}" alt="" width="396" height="396" loading="lazy"></span>'
            f'<span class="pr-body"><span class="pr-chip">{esc(p["subject"])}</span><b>{esc(p["h1"])}</b>'
            f'<em>{esc(p["short"])}</em><span class="pr-go">Play free <span aria-hidden="true">→</span></span></span></a>')

# ---------- template ----------
HEAD = """<!doctype html>
<html lang="en" data-root="{root}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:site_name" content="BioglowRX Sciences Learning">
<meta name="twitter:card" content="summary_large_image">
{ogimg}<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-title" content="BioglowRX">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#0E6B66">
<link rel="icon" href="{root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;600;800;900&family=Chivo+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="{root}assets/tokens.css">
<link rel="stylesheet" href="{root}assets/bundle.css">
<link rel="stylesheet" href="{root}engine/engine.css">
<script type="application/ld+json">{ld}</script>
</head>
<body class="br-root" data-page="practice">
<div class="br-wrap is-wide">
  <header class="br-header" id="br-header"></header>
  <main id="br-view" class="br-card"><article class="br-practice">
"""
FOOT = """</article></main>
  <footer class="br-foot" id="br-foot"></footer>
</div>
<script src="{root}engine/core.js"></script>
<script src="{root}engine/icons.js"></script>
<script src="{root}engine/icons-more.js"></script>
<script src="{root}data/catalog.js"></script>
<script src="{root}data/progress-map.js"></script>
<script src="{root}engine/progress.js"></script>
<script src="{root}engine/config.js"></script>
<script src="{root}engine/community.js"></script>
<script>BGX.shell && BGX.shell();</script>
</body>
</html>
"""

def page_html(p, by_slug):
    G = None if p.get("lab") else game_data(p["game"])
    if G: G["_cat"] = {c["id"]: c["name"] for c in G.get("categories", [])}
    url = f"{SITE}practice/{p['slug']}/"
    root = "../../"
    play = f"{root}games/{p['game']}/index.html" + (f"?mode={p['mode']}&ref=practice" if p.get("mode") else "?ref=practice")
    notes = f"{root}games/{p['game']}/index.html?mode=notes&ref=practice"
    title = G["title"] if G else "Titration Lab"
    # sample table
    if p.get("table_override"):
        heads, rows = p["table_override"]
    else:
        _, rows = p["rows"](G); heads = p["heads"]
    table = "<div class=\"pr-table\"><table><thead><tr>" + "".join(f"<th>{esc(h)}</th>" for h in heads) + "</tr></thead><tbody>" + \
            "".join("<tr>" + "".join(f"<td>{esc(str(c))}</td>" for c in r) + "</tr>" for r in rows) + "</tbody></table></div>"
    # modes
    if G:
        modes = [m for m in G["modes"]]
        if G.get("notes") and not any(m["id"] == "notes" for m in modes):
            modes = [{"id": "notes", "title": "Study notes", "desc": "Read the key ideas first: everything the games ask is in here."}] + modes
        mlist = "".join(f"<li><a href=\"{root}games/{p['game']}/index.html?mode={esc(m['id'])}&amp;ref=practice\"><b>{esc(m['title'])}</b></a>{(' · ' + esc(m['desc'])) if m.get('desc') else ''}</li>" for m in modes)
        counts = f"{len(G['items'])} cards"
        extra = []
        if G.get("cases"): extra.append(f"{len(G['cases'])} case files")
        if G.get("problems"): extra.append(f"{len(G['problems'])} calculator problem types")
        if G.get("sequences"): extra.append(f"{len(G['sequences'])} put-it-in-order challenges")
        counts = " · ".join([counts] + extra)
    else:
        mlist = "".join(f"<li><b>{esc(a)}</b> · {esc(b)}</li>" for a, b in p["table_override"][1])
        counts = "3 levels · randomised runs"
    faq = p["faq"] + COMMON_FAQ
    faq_html = "".join(f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q, a in faq)
    rel = "".join(card(by_slug[r], f"../{r}/index.html", f"../img/art-{r}.webp") for r in p["related"])
    img = f"practice/img/{p['slug']}.webp"
    has_img = (ROOT / img).exists()
    shot = f"<figure class=\"pr-shot\"><img src=\"../img/{p['slug']}.webp\" alt=\"{esc(title)} on BioglowRX: {esc(p['h1'].lower())}\" width=\"1200\" height=\"750\" loading=\"eager\"></figure>" if has_img else ""
    ld = [{"@context": "https://schema.org", "@type": "LearningResource", "name": p["h1"], "description": p["desc"], "url": url,
           "isAccessibleForFree": True, "inLanguage": "en", "learningResourceType": "Simulation" if p.get("lab") else "Game",
           "educationalLevel": ["High school", "College"], "about": p["subject"],
           "provider": {"@type": "Organization", "name": "BioglowRX Sciences Learning", "url": SITE}},
          {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]},
          {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "BioglowRX", "item": SITE},
              {"@type": "ListItem", "position": 2, "name": "Practice topics", "item": SITE + "practice/"},
              {"@type": "ListItem", "position": 3, "name": p["h1"], "item": url}]}]
    ogimg = f'<meta property="og:image" content="{SITE}{img}">\n' if has_img else ""
    out = HEAD.format(root=root, title=esc(p["title"]) + " · BioglowRX", desc=esc(p["desc"]), url=url, ogimg=ogimg,
                      ld=json.dumps(ld, ensure_ascii=False).replace("</", "<\\/"))
    out += f"""<nav class="br-backrow" aria-label="Back"><a class="br-crumb" href="../index.html"><span aria-hidden="true">←</span> All practice topics</a></nav>
<div class="pr-hero" style="--c:{COLOR[p['subject']]}"><div class="pr-herotext"><p class="br-label pr-eyebrow">{esc(p['subject'])} · free · no login</p>
<h1>{esc(p['h1'])}</h1></div><span class="pr-heroart"><img src="../img/art-{p['slug']}.webp" alt="" width="396" height="396"></span></div>
<p class="pr-lead">{p['intro'][0]}</p>
<div class="pr-cta"><a class="br-next" href="{play}">Start practising now</a>{'' if p.get('lab') else f'<a class="br-ghost pr-ghost" href="{notes}">Read the study notes first</a>'}</div>
<p class="pr-meta">{esc(title)} · {esc(counts)}</p>
{shot}
<p>{p['intro'][1]}</p>
<h2>A taste of what's inside</h2>
{table}
<h2>{'Levels' if p.get('lab') else 'Ways to practise'}</h2>
<ul class="pr-modes">{mlist}</ul>
<h2>How to study with it</h2>
<ol class="pr-how">{''.join(f'<li>{h}</li>' for h in p['how'])}</ol>
<div class="pr-cta"><a class="br-next" href="{play}">Play {esc(title)}</a></div>
<h2>Questions</h2>
<div class="pr-faq">{faq_html}</div>
<h2>More free practice</h2>
<div class="pr-cards is-3">{rel}</div>
<p class="pr-small">BioglowRX Sciences Learning turns university science textbooks into free games, chapter by chapter: chemistry, anatomy &amp; physiology, pharmacology, nutrition, and health &amp; wellness. <a href="{root}index.html">See all subjects</a>.</p>
"""
    out += FOOT.format(root=root)
    return out

def index_html():
    root = "../"
    url = SITE + "practice/"
    title = "Free Science Practice Topics · BioglowRX"
    desc = "Free practice for science and nursing students: dosage calculations, the periodic table, cranial nerves, bones, drug classes, ABGs, balancing equations and more."
    ld = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Free science practice topics", "url": url, "description": desc}
    out = HEAD.format(root=root, title=title, desc=desc, url=url, ogimg=f'<meta property="og:image" content="{SITE}assets/og/site.jpg">\n', ld=json.dumps(ld, ensure_ascii=False))
    cards = "".join(card(p, f"{p['slug']}/index.html", f"img/art-{p['slug']}.webp") for p in PAGES)
    out += f"""<nav class="br-backrow" aria-label="Back"><a class="br-crumb" href="../index.html"><span aria-hidden="true">←</span> All subjects</a></nav>
<p class="br-label pr-eyebrow">Free · no login</p>
<h1>Practice topics</h1>
<p class="pr-lead">Jump straight into the topics students search for most. Each one opens a free game built from a university textbook chapter, with study notes first and a worked explanation after every answer.</p>
<div id="br-search" style="margin-top:20px"></div>
<div class="pr-cards">{cards}</div>
<p class="pr-small">Looking for something else? <a href="../index.html">Browse all 53 games and 5 labs by subject</a>.</p>
"""
    out = out.replace('<article class="br-practice">', '<article class="br-practice is-index">')
    foot = FOOT.format(root=root).replace('<script>BGX.shell && BGX.shell();</script>',
        '<script src="../engine/search.js"></script>\n<script>BGX.shell && BGX.shell(); BGX.searchMount(document.getElementById("br-search"), { placeholder: "Search every topic, game and card: try femur, pH or dose" });</script>')
    return out + foot

def main():
    by_slug = {p["slug"]: p for p in PAGES}
    for p in PAGES:
        d = ROOT / "practice" / p["slug"]; d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(page_html(p, by_slug))
    (ROOT / "practice" / "index.html").write_text(index_html())
    # sitemap
    sm = ROOT / "sitemap.xml"; s = sm.read_text()
    s = re.sub(r"\s*<url><loc>[^<]*/practice/[^<]*</loc>.*?</url>", "", s)
    add = "".join(f"\n  <url><loc>{SITE}practice/{slug}</loc><lastmod>{TODAY}</lastmod><priority>{pr}</priority></url>"
                  for slug, pr in [("", "0.8")] + [(p["slug"] + "/", "0.9") for p in PAGES])
    s = s.replace("</urlset>", add + "\n</urlset>")
    sm.write_text(s)
    print(f"built {len(PAGES)} practice pages + index; sitemap now {s.count('<url>')} URLs")

if __name__ == "__main__":
    main()
