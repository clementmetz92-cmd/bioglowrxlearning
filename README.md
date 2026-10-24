# BioglowRX Sciences Learning — website (Phase 1)

A plain static website: no login, no database, no build step. Upload the whole folder as it is.

## What's inside

```
index.html                    Hub home page (5 subjects, featured game, "continue where you left off")
subjects/<subject>/index.html Chemistry, Anatomy & Physiology, Pharmacology, Nutrition, Health & Wellness
games/element-rush/           Element Rush (runs on the shared engine)
engine/                       Shared code: game formats, rewards, sounds, illustrations, hub pages
data/catalog.js               Subjects, chapters, games and their status (Live / Up next / Soon)
data/element-rush.js          All Element Rush content (118 elements)
data/README.md                How to write a new game
assets/                       Design tokens, component styles, favicon
```

## Putting it online

1. Upload everything in this folder to your host, keeping the folder structure.
   It works at the root of a domain (bioglowrx.com) or in a sub-folder (gafferiq.com/learn): all links are relative.
2. Open the address of `index.html` in a browser. That's the hub.
3. No server settings are needed. HTTPS is recommended (most hosts do this automatically).

You can also preview it before uploading: double-click `index.html` on your computer.
Note: "continue where you left off" and best scores are saved per browser and per device.

## Changing content

- **Fix a fact or an everyday example:** edit the text in `data/element-rush.js`.
- **Change a chapter's status or title:** edit `data/catalog.js`.
- **Add a game:** follow `data/README.md`. You need one data file, one copied page and one line in the catalog.

## Not in Phase 1 (by plan)

- Ads, consent banner and privacy page: Phase 3.
- New game content (Bone Rush, Drug Class Sort, Nutrient Rush, pH Patrol): Phase 2.
- All game formats are now built: Study notes, Card Explorer, Quick Quiz, Find It, Sort It, Match Pairs, Sequence, True or Myth, Build It, Case Files and Calculator Challenge (see `data/README.md`).

## XP and levels

Every game and lab shares one XP total (saved per browser, `bgx_xp`). 20 levels from Lab Trainee to Doctor Researcher;
the table, XP rules and level-up pop-up live in `engine/core.js` (`BGX.LEVELS`, `BGX.xp`). Change a level's name,
line or XP threshold there. The header chip and the hub card open the full list of levels.
