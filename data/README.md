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
| `calculator` | Calculator Challenge: type a number, new numbers every time | uses `problems` (below); `rounds` (default 8), `only` (category ids), `help: true` ("Show me how"), `formula: true` (show the formula) |

Every mode also takes `id`, `title`, `desc`, `icon` (a short glyph) and `color` (a `cat-*` token).
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
Answers off by 10, 100 or 1,000 get an automatic "check the decimal point / unit conversion" nudge. Commas are accepted as decimal points.
