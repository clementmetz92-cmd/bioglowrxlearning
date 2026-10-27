# Writing a new game: the data file

Every game is one data file in this folder plus a two-line page in `games/<game-id>/`.
You never touch the engine to add content.

## Steps to add a game

1. Copy `data/element-rush.js` to `data/<game-id>.js` and replace its content (schema below).
2. Copy the folder `games/element-rush/` to `games/<game-id>/`, and in its `index.html` change:
   - the `<title>` and description,
   - `element-rush.js` → `<game-id>.js` on the last script line.
3. In `data/catalog.js`, find the game's chapter and set
   `status: "live", url: "games/<game-id>/index.html"` (add `tiles:` for the 3 mini tiles on the live card).

Why `.js` and not `.json`: the file wraps the same JSON in `BGX.registerGame({...});`, so the site works on any host **and** when you open the files directly on your computer, with no server.

## Schema

```js
BGX.registerGame({
  id: "bone-rush",                 // same as the folder name in games/
  title: "Bone Rush",
  subject: "anatomy",              // chemistry | anatomy | pharmacology | nutrition | wellness
  tagline: "Learn the skeleton, one bone at a time",
  itemNoun: "bone",                // used in labels: "Tap any bone"
  categories: [                    // up to 10, coloured in this order: cat-coral, cat-amber, cat-lemon,
    { id: "skull", name: "Skull", color: "cat-coral" },   // cat-sage, cat-mint, cat-sky, cat-lilac,
    { id: "leg",   name: "Leg",   color: "cat-amber" }    // cat-orchid, cat-peach, cat-sand
  ],
  categoryLabel: "Region",
  sets: [{ size: 10, label: "First 10" }, { size: 30, label: "All 30" }],   // optional
  defaultSet: 10,
  hint: "One line shown under the set picker.",
  tile:  { big: "symbol", corner: "num", label: "name" },   // which item fields go on a tile
  factLine: ["name", "{category}"],  // the line shown after every answer ({field} or field names)
  detail: [ { label: "Region", field: "{category}" } ],      // rows on the Explore card
  explore: { pictures: ["object"], start: 1 },               // sample | object | shells
  milestone: { text: "You've matched {name}!" },              // optional extra line on streak milestones
  map: { cols: 18, gapAfterRow: 7, placeholders: [] },        // only for games with a position map (Find It)
  modes: [ /* see Formats */ ],
  items: [ /* see Items */ ]
});
```

### Items

| Field | What it is | Used by |
| --- | --- | --- |
| `name` | Plain name ("Femur") | everything |
| `symbol` | Short code shown big on the tile ("Fm") | tiles, quizzes |
| `num` | Number in the tile corner (auto-numbered if left out) | tiles |
| `cat` | A category `id` | colours, Sort It |
| `summary` | One or two plain sentences: what it is | Explore |
| `life` | The everyday-life example | Explore, after every answer |
| `discovered`, `nameFrom` | Optional extra facts | Explore |
| `link` | Optional "read more" link | Explore |
| `row`, `col` | Position on the map | Find It, Explore map |
| `look` | `[kind, colour]` sample drawing. kind: `m` metal, `c` crystals, `p` powder, `g` glowing gas, `l` liquid, `r` too rare to see | "What it looks like" picture |
| `obj` | `[objectKey, caption]` everyday-object drawing (keys: see `BGX.OBJ` in engine/illus.js) | "Where you meet it" picture |
| any other field | e.g. `where`, `use`, `lack` | quiz answers, Match Pairs clues |

Write everything in our own words, never copied from the textbook.

### Formats (modes)

| `format` | Plays as | Extra settings |
| --- | --- | --- |
| `explorer` | Card Explorer: tap a tile to study it | uses `map` if given, otherwise a card grid |
| `quiz` | Quick Quiz: 4 choices, rounds of 10 | `prompt`, `show` (field), `showAs` (`big` / `tile` / `mono`), `answer` (field), `answerAs: "symbol"` for big text |
| `findit` | Find It: tap the right spot on the map | `prompt`; needs `map` and `row`/`col` on items |
| `sortit` | Sort It: pick the item's category | `prompt` |
| `matchpairs` | Match Pairs: flip cards to pair item and clue | `pairs` (default 8), `clue` (field), `clueLabel` ("Where", "Lack of") |
| `sequence` | Put it in order: tap steps into slots | uses `sequences` (below); `rounds`, `only` (sequence ids) |
| `truemyth` | True or Myth: two big buttons | items need `claim`, `verdict` (true/false); `labels` to rename the buttons |
| `buildit` | Build It with +/− steppers | `parts: [{ label, field, max }]`, `draw: "atom"` |
| `cases` | Case Files: a patient story worked through in steps | uses `cases` (below); `rounds` (cases per round, default 3), `only` (category ids) |
| `exam` | Exam-style questions: select all that apply, and what to do first | uses `exam` (below); `rounds` (default 8), `kind` (`sata` or `first`), `only` (category ids) |
| `calculator` | Calculator Challenge: type a number, new numbers every time | uses `problems` (below); `rounds` (default 8), `only` (category ids), `help: true` ("Show me how"), `formula: true` (show the formula) |

Every mode also takes `id`, `title`, `desc`, `icon` (a short glyph) and `color` (a `cat-*` token), and `extra: true` to keep it as optional extra practice that never counts toward the certificate.
About four scored modes per chapter are its **core activities** (they count toward the certificate). The engine picks them (one cases or calculator mode first, then quizzes and sorting); a game can name them with `"core": ["mode-id", …]`.
Quiz, Sort It, True or Myth, Find It and Match Pairs modes can take `only: [category ids]` to play one group (Sort It then offers only those groups).
Build It items can carry their own steppers: `parts: [{ label, value, start, max }]` (e.g. coefficients when balancing equations).
Streaks, confetti, sounds, milestones and the review screen are automatic.

### Case Files (`cases`)

```js
"cases": [{
  "id": "h1", "cat": "heart", "icon": "heart", "title": "Salt and pressure",
  "who": "Robert, 54, office manager",
  "story": "What the patient says and what you see.",
  "data": [["Blood pressure", "152/96 mmHg"]],       // small chips under the story
  "spot": "heart",                                     // optional: diagram highlight on the last step
  "steps": [                                           // give every case the same number of steps (3)
    { "q": "Question", "options": ["Right answer", "Wrong", "Wrong", "Wrong"], "answer": 0, "why": "Shown after answering." }
  ],
  "takeaway": "One line shown when the case is closed."
}]
```
Options are shuffled when played, so the right one can always be written first. Each answered step is added to the case file.

### Exam-style questions (`exam`)

```js
"exam": [
  { "id": "pl-x1", "cat": "opioid", "kind": "sata", "stem": "Optional patient context.",
    "q": "Which actions should the nurse take? Select all that apply.",
    "options": ["…", "…", "…", "…", "…"], "answer": [0, 2, 3], "why": "Why each is right or wrong." },
  { "id": "pl-x2", "cat": "opioid", "kind": "first", "q": "What should the nurse do first?",
    "options": ["…", "…", "…", "…"], "answer": 1, "why": "The priority principle." }
]
```
Select all that apply scores only when every right option and no wrong one is picked. "First" items have exactly four options and one answer.

### Calculator Challenge (`problems`)

Data files are JavaScript, so a problem can pick its own numbers:

```js
"problems": [{
  "id": "tab", "cat": "tablets", "title": "Tablets to give", "spot": "tablets",
  "unit": "tablets", "dp": 1,                 // decimals expected; answers are compared after rounding to dp
  "make": () => ({ drug: "metoprolol", h: 25, d: pick([12.5, 25, 50]) }),   // or  "vars": { "g": [0.5, 1, 2] }
  "ok": (v, answer) => true,                  // optional: reject number combinations
  "text": "Order: {drug} {d} mg. Tablets: {h} mg. How many tablets?",
  "answer": v => v.d / v.h,
  "formula": "D ÷ H",                         // optional; otherwise the category's item formula is shown
  "steps": ["Tablets = D ÷ H", "= {d} mg ÷ {h} mg", "= {answer}"],   // last step is hidden in "Show me how"
  "hint": (v, given) => "",                   // optional: a nudge for a typical wrong answer
  "tip": "Optional extra line."
}]
```
Negative answers: add `"signed": true` to the problem (type the minus sign). The out-by-1,000 nudge names `g ↔ mg ↔ mcg, L ↔ mL` unless the problem or game sets `"thousand": "J ↔ kJ"`.
Answers off by 10, 100 or 1,000 get an automatic "check the decimal point / unit conversion" nudge. Commas are accepted as decimal points.

## Progress, certificates and the trophy cabinet (engine/progress.js)
- A game's **scored modes** (any format with `scored: true`) each need **70%** or more (best score counts). All passed = game completed.
- Chapter = its game(s) from catalog.js (`url`, or a `games: [url, …]` list). All games completed → **certificate**.
- Subject = its live chapters. All completed → **diploma** (Pass 70%+, Merit 80%+, Distinction 90%+). All five diplomas → the Golden Flask.
- Labs earn medals from their stars in the cabinet (cabinet/index.html); they don't count towards completion.
- After adding a game or changing its modes, rebuild data/progress-map.js: `python3 tools-progress-map.py` (tools-bump-version.py runs it too).
- Saved per device: bgx_prog_<game> (best % per mode), bgx_awards, bgx_name.

## Pre-exam simulator (data/exams/<subject>.js)
Timed mock exams that work like a course's online quiz (one question per page, countdown to a fixed end time, navigator, flags, autosave, review-before-submit, no feedback until submit, full review after). **Mock exams never count toward certificates or chapter progress**; they give a little XP (5 per right question + 50 for passing, once per attempt).

Files: `engine/exam-core.js` (pool, papers, scoring; also run by tools-validate.js), `engine/exam.js` + `engine/exam.css` (pages), `data/exams/<subject>.js` (one bank per subject), pages in `exams/` built by `python3 tools-exam-pages.py` (run it after adding a source game to a bank; tools-check.py reports stale pages). Links on subject pages and the hub appear only when `examsLive: true` in engine/config.js, or with `?exams=1`. Exam pages carry `noindex` and stay out of sitemap.xml until launch. Test hook: `BGX.examTest` (`expire()`, `endsIn(ms)`, `correct(i)`, `set(i, v)`, `submit()`…).

```js
BGX.registerExamBank({
  subject: "chemistry", title: "Chemistry",
  groups: { "A": "Ch 1–3 · Measurement, formulas, moles" },      // optional names for topic groups (units)
  rules: "Optional extra line on the start screen.",
  sheets: { "mysheet": { title: "Pharmacokinetics formulas", rows: [["Half-life", "t½ = 0.693 × Vd ÷ CL"]] } },   // optional custom sheets
  topics: [ { id: "stoich", label: "Equations and moles", game: "balance-it", mode: "calc", ch: "3", group: "A" } ],
  items:   [ /* questions written for the exam, see below */ ],
  sources: [ /* content reused from the games, see below */ ],
  formats: [ /* papers, see below */ ]
});
```
- **topics**: every topic names a `game` (results link "Practise in <game>" to `games/<game>/`, with `?mode=<mode>` if given). `group` lets formats and blueprints address several topics at once.

### Items (written questions)
Every item: `id` (stable, unique in the bank, never reused: `ch-sol-1`), `topic`, `kind`, `stem`, `why` (overall rationale), `difficulty` 1–3, optional `src` (textbook chapter), optional `whyOpt` (one rationale per option, same order as `options`), optional `lead` (a line above the question). Write options with the right answer anywhere: they are shuffled per attempt (numbers are sorted ascending instead; `fixedOrder: true` keeps the written order, e.g. ordered scales). `{{us:…|uk:…}}` tokens work in any text.

| kind | fields | scoring |
| --- | --- | --- |
| `single` | `options` (3–5), `answer` (index) | 1 point |
| `first` | `options` (exactly 4), `answer` (index): "what should the nurse do first?" | 1 point |
| `sata` | `options` (4–7), `answer` ([indices], 2+ and not all) | 1 point, all-or-nothing; the review shows "3 of 4 right options" |
| `numeric` | `answer` (number), `unit` (shown beside the box), `dp` (decimals expected), `tol` (`{abs: 0.5}` or `{pct: 1}`; without it the answer must match after rounding to `dp`), `steps` (worked solution lines), `traps` ([{value, why}] review notes for typical wrong numbers), `noTrail: true` (medication style) — or `problem: { game, id }` to take fresh numbers from a game's calculator problem (its text, unit, dp and steps; `stem` may override the text with `{var}` placeholders) | 1 point |
| `match` | `pairs` ([[left, right], …], 3+), optional `extra` (spare right-hand options), `whyPair`, `allOrNothing: true` | 1 point per pair, or 1 point when all are right |
| `order` | `steps` (in the right order, 3+); shown shuffled, the student moves them up/down | 1 point, all-or-nothing |
| `case` | shared `stem` (+ optional `title`, `who`, `data: [[label, value]]`) and `parts`: 2–4 sub-items of any kind above | each part scores separately |
| `diagram` | `diagram` (an engine diagram id: `heart`, `skeleton`, `nerve`…), `spot` (the part to highlight), `options`, `answer`. The diagram is drawn with its name label hidden | 1 point |

Numeric answers accept `1,050`, `1050.0`, `0,5` and `2.19e-3`; out-by-1,000 / power-of-ten / wrong-sign answers get a note in the review.

### Sources (reuse game content instead of copying it)
`{ game, use, topic, mode?, only?, pairs?, prompt? }` — `topic` is a topic id, or a map from the game's category ids to topic ids (`{ "cardio": "cardio", "resp": "resp" }`), with optional `topicDefault`.

| use | becomes | from the game |
| --- | --- | --- |
| `problems` | numeric (new numbers every attempt, worked steps in the review) | `problems` (`only`: categories) |
| `sequences` | order | `sequences` (`only`: sequence ids) |
| `cases` | case (one question per step) | `cases` (`only`: categories) |
| `pairs` | match (`pairs`: how many, default 5) | the Match Pairs mode (`mode`, else the first one) |
| `exam` | sata / first | `exam` items (`only`: categories) |
| `diagram` | diagram: name the highlighted structure (distractors from the same diagram and category) | items with `spot`, when the label-free drawing doesn't show the name |
| `quiz` | single (recall) | a Quick Quiz mode (`mode`), distractors from the same category |
| `sortit` | single (which group?) (recall) | the Sort It mode |
| `truemyth` | single (True / Myth) (recall) | the True or Myth mode |

Recall questions (`quiz`, `sortit`, `truemyth`) can be capped per format with `recallMax` (share of the paper, e.g. `0.4`; `0` leaves them out). The cap is soft: when a choice has too few other questions to fill the paper, recall questions top it up. The ids of reused questions are `<game>:<type>:<id>`, so they stay stable when the game's content changes order.

### Formats
`{ id, label, desc, n (questions), minutes | secondsEach, pass (%), topics?, kinds?, blueprint?, choose?, units?, calculator?, sheet?, navigation?, recallMax? }`
- `topics`: topic ids or group ids the paper may use. `kinds`: allowed kinds only (e.g. `["diagram"]` for a lab practical).
- `blueprint: { topics: { id-or-group: weight }, kinds: { kind: weight } }`: the paper is split by these weights (largest remainder). Without it, questions are drawn at random from the scope.
- `choose: "topic" | "group" | "unit"`: the student picks one topic, one group, or one of `units: [{ id, label, topics: [...] }]` on the start screen.
- `calculator: "basic" | "scientific"` (four functions, √, x², brackets; scientific adds log, ln, 10ˣ, eˣ, xʸ, EE). `sheet`: list of `"ptable"`, `"constants"`, `"dosecalc"`, `"stats"` or keys of the bank's `sheets`.
- `navigation: "forward"` forces one-way (no going back, no flags); `"choose"` or leaving it out lets the student pick Free or One-way. `secondsEach` (lab practical) gives a per-station timer that moves on automatically.
- When the bank has fewer questions than `n`, the paper uses what there is (never repeating a question) and the page says "Practice bank: N questions"; the time is scaled to the number of questions.
- Papers are fresh each attempt (questions on the last paper are avoided when the bank allows). "Retake only what I missed" builds a paper from the missed questions.
- **Size every format to its supply.** Each subject offers 2–5 formats. A choice (topic, group or unit) must hold enough non-recall questions that two consecutive papers ("Retake with a new paper") share at most 20% of questions on average and 30% at worst, and the recall share stays within `recallMax` without the soft top-up. When a choice can't, merge it with its neighbours into a larger unit (`choose: "unit"`) or shrink `n`, rather than writing a second batch of questions. Keep about the course's time per question when `n` changes. Every written item must stay reachable by at least one format. Format ids that are removed are simply ignored: saved attempts and history under an old id stay in storage but are no longer listed, and an old `?f=` link opens the format list.

Saved per device: `bgx_exam_<subject>_<format>` (the attempt: paper, answers, flags, `endsAt`, settings, result), `bgx_examhist_<subject>_<format>` (last 30 attempts), `bgx_examlast_<subject>_<format>`.
