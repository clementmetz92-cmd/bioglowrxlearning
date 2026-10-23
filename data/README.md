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
| `sequence`, `cases`, `truemyth`, `buildit`, `calculator` | Planned, shown as "Coming soon" | to be built |

Every mode also takes `id`, `title`, `desc`, `icon` (a short glyph) and `color` (a `cat-*` token).
Streaks, confetti, sounds, milestones and the review screen are automatic.
