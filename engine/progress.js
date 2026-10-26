/* BioglowRX — progress, completion, certificates, diplomas and the trophy cabinet.
   Loads after core.js, icons.js, data/catalog.js and data/progress-map.js.

   Scores (saved per browser/device):
   - Mode: best % ever reached in that scored mode (localStorage bgx_prog_<game>  {modeId: pct}).
   - Game: average of its scored modes (a mode not played yet counts 0). Completed when EVERY scored mode is at 70% or more.
   - Chapter: average of its games. Completed when every game is completed → a Certificate.
   - Subject: average of its live chapters. Completed when every live chapter is completed → a Diploma
     (Pass 70%+, Merit 80%+, Distinction 90%+ on the subject score; it upgrades if the score rises).
   - All five diplomas → the Golden Flask. Labs earn medals from their stars (shown in the cabinet, not needed for completion).
   Awards are kept in bgx_awards and never taken away, even if a chapter gains a new game later. */
(function () {
  "use strict";
  const BGX = window.BGX, C = window.BGX_CATALOG, MAP = window.BGX_PROGRESS_MAP || {}, esc = BGX.esc;
  if (!C) return;
  const R = BGX.root, PASS = 70;
  const gidOf = url => ((url || "").match(/games\/([^/]+)\//) || [])[1];
  const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
  const fmtPct = n => Math.round(n) + "%";
  const CODE = { chemistry: "CH", anatomy: "AP", pharmacology: "PH", nutrition: "NU", wellness: "HW" };
  const DIPLOMA = {
    chemistry: "Chemical Sciences", anatomy: "Human Anatomy & Physiology", pharmacology: "Pharmacology & Medication Safety",
    nutrition: "Clinical Nutrition", wellness: "Health & Wellness Sciences"
  };
  const HEX = { "cat-coral": "#f7a8a0", "cat-amber": "#fbd08a", "cat-lemon": "#f6e7a1", "cat-sage": "#b9ddb0", "cat-mint": "#9fd8cb", "cat-sky": "#a9cbef", "cat-lilac": "#c7b8ec", "cat-orchid": "#e9b6da", "cat-peach": "#f9c3a8", "cat-sand": "#e3c4a2" };
  const classOf = pct => pct >= 90 ? "Distinction" : pct >= 80 ? "Merit" : "Pass";
  const TIER = { Pass: "Bronze", Merit: "Silver", Distinction: "Gold" };   // stored class → what people see (no academic grades)
  const tier = cls => TIER[cls] || cls;
  const NOTQUAL = "A record of self-study practice, not an academic qualification or course credit.";
  const CLS_RANK = { Pass: 1, Merit: 2, Distinction: 3 };
  if (BGX.icons && !BGX.icons.trophy) BGX.icons.trophy = "M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4.5v1.5A3 3 0 0 0 7.6 10.5M17 6h2.5v1.5a3 3 0 0 1-3.1 3M12 13v4M8.5 20h7M9.5 17h5v3h-5z";

  /* ---------- catalog lookups ---------- */
  const liveChapters = s => s.chapters.filter(c => c.status === "live" && (c.url || c.games));
  const gamesOf = c => (c.games || [c.url]).map(gidOf).filter(Boolean);
  const chapKey = (s, c) => s.id + "|" + c.ch;
  function findChapter(gid) {
    for (const s of C.subjects) for (const c of s.chapters) if (c.status === "live" && gamesOf(c).indexOf(gid) >= 0) return { s, c };
    return null;
  }

  /* ---------- mode scores (with a one-off read of best scores saved before progress existed) ---------- */
  function modePcts(gid) {
    let p = BGX.store.get("prog_" + gid, null);
    if (p) return p;
    const best = BGX.store.get("best_" + gid, null), g = MAP[gid];
    if (!best || !g) return {};
    p = {};
    g.modes.forEach(m => Object.keys(m.tot).forEach(sz => {
      const sc = best[m.id + sz], t = m.tot[sz];
      if (sc != null && t > 0) p[m.id] = Math.max(p[m.id] || 0, Math.min(100, Math.round(sc / t * 1000) / 10));
    }));
    BGX.store.set("prog_" + gid, p);
    return p;
  }
  const modePct = (gid, mid) => { const v = modePcts(gid)[mid]; return v == null ? null : v; };

  function gameState(gid) {
    const g = MAP[gid], p = modePcts(gid);
    if (!g) return { id: gid, title: gid, modes: [], pct: 0, passed: 0, total: 0, done: false, started: false };
    const modes = g.modes.map(m => ({ id: m.id, title: m.t, pct: p[m.id] == null ? null : p[m.id], ok: p[m.id] != null && p[m.id] >= PASS }));
    const passed = modes.filter(m => m.ok).length;
    return { id: gid, title: g.title, modes, pct: avg(modes.map(m => m.pct || 0)), passed, total: modes.length,
      done: modes.length > 0 && passed === modes.length, started: modes.some(m => m.pct != null) };
  }
  /* questions answered in a game (a certificate needs real practice, not one lucky round) */
  const MINQ = 30;
  const qCount = g => { const n = BGX.store.get("qn_" + g.id, null); return typeof n === "number" && n >= 0 ? n : g.passed * 10; };
  function chapterState(s, c) {
    const games = gamesOf(c).map(gameState);
    const passed = games.reduce((n, g) => n + g.passed, 0), total = games.reduce((n, g) => n + g.total, 0);
    const answered = games.reduce((n, g) => n + qCount(g), 0);
    return { s, c, key: chapKey(s, c), games, pct: avg(games.map(g => g.pct)), passed, total, answered, minQ: MINQ,
      done: games.length > 0 && games.every(g => g.done) && answered >= MINQ, started: games.some(g => g.started) };
  }
  function subjectState(s) {
    const chaps = liveChapters(s).map(c => chapterState(s, c));
    return { s, chaps, pct: avg(chaps.map(c => c.pct)), done: chaps.length > 0 && chaps.every(c => c.done), doneCount: chaps.filter(c => c.done).length, started: chaps.some(c => c.started) };
  }
  const allSubjects = () => C.subjects.map(subjectState);

  /* ---------- awards ---------- */
  const today = () => new Date().toISOString().slice(0, 10);
  const loadAwards = () => { const a = BGX.store.get("awards", null) || {}; a.c = a.c || {}; a.d = a.d || {}; a.seq = a.seq || 0; return a; };
  /* returns what is new since last time: certificates, diplomas, diploma upgrades, the Golden Flask */
  function checkAwards() {
    const a = loadAwards(), news = [];
    allSubjects().forEach(ss => {
      ss.chaps.forEach(cs => {
        const have = a.c[cs.key];
        if (cs.done && !have) { a.c[cs.key] = { d: today(), pct: Math.round(cs.pct), n: ++a.seq }; news.push({ kind: "cert", key: cs.key }); }
        else if (have && cs.done && Math.round(cs.pct) > have.pct) have.pct = Math.round(cs.pct);
      });
      const sid = ss.s.id, have = a.d[sid], pct = Math.round(ss.pct);
      if (ss.done && !have) { a.d[sid] = { d: today(), pct, n: ++a.seq, cls: classOf(pct) }; news.push({ kind: "diploma", sid }); }
      else if (have && ss.done && pct > have.pct) {
        const cls = classOf(pct), up = CLS_RANK[cls] > CLS_RANK[have.cls];
        have.pct = pct; if (up) { have.cls = cls; have.up = today(); news.push({ kind: "upgrade", sid }); }
      }
    });
    if (!a.flask && C.subjects.every(s => a.d[s.id])) { a.flask = { d: today(), n: ++a.seq }; news.push({ kind: "flask" }); }
    BGX.store.set("awards", a);
    return news;
  }
  const certInfo = key => {
    const [sid, ch] = key.split("|"), s = C.subjects.find(x => x.id === sid), c = s && s.chapters.find(x => x.ch === ch);
    return s && c ? { s, c } : null;
  };

  /* record a finished round; returns what changed for the end screen and pop-ups */
  function record(gid, mid, score, total) {
    const pct = Math.min(100, Math.round(score / total * 1000) / 10);
    const p = modePcts(gid), before = p[mid];
    const qn = BGX.store.get("qn_" + gid, null); BGX.store.set("qn_" + gid, (typeof qn === "number" && qn >= 0 ? qn : 0) + Math.max(0, +total || 0));
    if (before == null || pct > before) { p[mid] = pct; BGX.store.set("prog_" + gid, p); }
    const g = gameState(gid);
    return { gid, mid, pct, before, newPass: pct >= PASS && (before == null || before < PASS), game: g, news: checkAwards() };
  }

  /* ---------- shared bits ---------- */
  const bar = (pct, cls = "") => `<i class="br-pbar ${cls}" aria-hidden="true"><i style="width:${Math.max(0, Math.min(100, pct)).toFixed(1)}%"></i></i>`;
  const ring = (pct, size = 44, done = false) => {
    const r = 16, L = 2 * Math.PI * r, f = Math.max(0, Math.min(100, pct)) / 100 * L;
    return `<svg class="br-ring${done ? " is-done" : ""}" viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true"><circle cx="20" cy="20" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="4"/>
      <circle cx="20" cy="20" r="${r}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="${f.toFixed(2)} ${L.toFixed(2)}" transform="rotate(-90 20 20)"/>
      ${done ? `<path d="M13.5 20.5l4.2 4.2 8.5-9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : `<text x="20" y="24" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor" font-family="Chivo,sans-serif">${Math.round(pct)}</text>`}</svg>`;
  };
  const statusChip = st => st.done ? `<span class="br-chip is-done">✓ Completed</span>` : st.started ? `<span class="br-chip is-prog">In progress</span>` : `<span class="br-chip">Not started</span>`;
  const getName = () => (BGX.store.get("name", "") || "").trim();
  const longDate = d => { try { return new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return d; } };
  const certNo = (sid, n, pre) => `BGX-${pre}-${CODE[sid] || "XX"}-${String(n).padStart(4, "0")}`;

  /* ---------- certificate and diploma drawings (SVG, 1000 × 700) ---------- */
  let uid = 0;
  const wrap = (txt, max) => { const out = []; let line = ""; String(txt).split(/\s+/).forEach(w => { if ((line + " " + w).trim().length > max && line) { out.push(line); line = w; } else line = (line + " " + w).trim(); }); if (line) out.push(line); return out; };
  const tspans = (lines, x, dy) => lines.map((l, i) => `<tspan x="${x}" dy="${i ? dy : 0}">${esc(l)}</tspan>`).join("");
  const iconAt = (name, x, y, size, color, sw = 1.7) => `<g transform="translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})"><path d="${(BGX.icons || {})[name] || (BGX.icons || {}).lab || ""}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const scallop = (cx, cy, r1, r2, n) => { let d = ""; for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n, r = i % 2 ? r2 : r1; d += (i ? "L" : "M") + (cx + r * Math.sin(a)).toFixed(1) + " " + (cy - r * Math.cos(a)).toFixed(1); } return d + "Z"; };
  const logoAt = (x, y, h) => BGX.logo("").replace("<svg ", `<svg x="${x}" y="${y}" height="${h}" width="${h * 52 / 56}" `);
  const corner = (x, y, sx, sy, col) => `<g transform="translate(${x} ${y}) scale(${sx} ${sy})" fill="none" stroke="${col}" stroke-width="2"><path d="M0 60V18A18 18 0 0 1 18 0h42"/><path d="M10 60V26a16 16 0 0 1 16-16h34" stroke-opacity=".6"/><circle cx="22" cy="22" r="5" fill="${col}" stroke="none"/></g>`;
  const SERIF = "Georgia,'Times New Roman',serif", SANS = "Chivo,-apple-system,Segoe UI,sans-serif", MONO = "'Chivo Mono',ui-monospace,monospace";

  function certSVG(key, opts = {}) {
    const info = certInfo(key); if (!info) return "";
    const { s, c } = info, a = loadAwards().c[key] || { d: today(), pct: Math.round(chapterState(s, c).pct), n: 0 };
    const id = "ct" + (++uid), col = HEX[s.color] || "#9fd8cb", deep = "#0E6B66", gold = "#B8902A", ink = "#1d2a33";
    const name = getName() || "Your name here", nameSize = name.length > 26 ? 38 : 50;
    const title = wrap(c.title, 44), tSize = title.length > 1 ? 30 : 34;
    return `<svg class="br-certsvg" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Progress certificate: ${esc(s.name)}, chapter ${esc(c.ch)}, ${esc(c.title)}">
      <defs><linearGradient id="${id}p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#f5efe2"/></linearGradient>
        <pattern id="${id}g" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M0 11h22M11 0v22" stroke="${deep}" stroke-opacity=".035" stroke-width="1"/></pattern>
        <radialGradient id="${id}s" cx=".35" cy=".3"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <rect width="1000" height="700" fill="url(#${id}p)"/><rect width="1000" height="700" fill="url(#${id}g)"/>
      <rect x="16" y="16" width="968" height="668" fill="none" stroke="${deep}" stroke-width="10"/>
      <rect x="34" y="34" width="932" height="632" fill="none" stroke="${gold}" stroke-width="2"/>
      <rect x="42" y="42" width="916" height="616" fill="none" stroke="${gold}" stroke-width="1" stroke-opacity=".6"/>
      ${corner(52, 52, 1, 1, gold)}${corner(948, 52, -1, 1, gold)}${corner(52, 648, 1, -1, gold)}${corner(948, 648, -1, -1, gold)}
      <rect x="42" y="42" width="14" height="616" fill="${col}"/><rect x="944" y="42" width="14" height="616" fill="${col}"/>
      ${logoAt(470, 66, 64)}
      <text x="500" y="160" text-anchor="middle" font-family="${MONO}" font-size="15" letter-spacing="5" fill="${deep}">BIOGLOWRX SCIENCES LEARNING</text>
      <text x="500" y="222" text-anchor="middle" font-family="${SERIF}" font-size="54" fill="${ink}">Progress Certificate</text>
      <text x="500" y="266" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="20" fill="#5b6676">Awarded to</text>
      <text x="500" y="${328}" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="${nameSize}" fill="${deep}">${esc(name)}</text>
      <line x1="260" y1="346" x2="740" y2="346" stroke="${gold}" stroke-width="1.5"/>
      <text x="500" y="382" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="19" fill="#5b6676">for passing every activity in this chapter at 70% or more</text>
      <text x="500" y="${title.length > 1 ? 420 : 428}" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="${tSize}" fill="${ink}">${tspans(title, 500, 36)}</text>
      <text x="500" y="${title.length > 1 ? 490 : 470}" text-anchor="middle" font-family="${MONO}" font-size="16" letter-spacing="2" fill="${deep}">CHAPTER ${esc(String(c.ch).toUpperCase())} · ${esc(s.name.toUpperCase())}</text>
      <text x="500" y="${title.length > 1 ? 522 : 504}" text-anchor="middle" font-family="${SERIF}" font-size="19" fill="${ink}">Chapter score <tspan font-weight="700">${a.pct}%</tspan></text>
      <g transform="translate(500 568)">
        <path d="M-34 10l-12 50 20-10 11 17 9-48z" fill="${deep}"/><path d="M34 10l12 50-20-10-11 17-9-48z" fill="${deep}"/>
        <path d="${scallop(0, 0, 56, 50, 24)}" fill="${gold}"/><circle r="44" fill="${col}" stroke="#fff" stroke-width="2"/><circle r="44" fill="url(#${id}s)"/>
        <circle r="36" fill="none" stroke="${ink}" stroke-opacity=".35" stroke-dasharray="2 3"/>${iconAt(c.icon || s.icon, 0, -2, 40, ink, 1.6)}</g>
      <line x1="120" y1="606" x2="340" y2="606" stroke="${ink}" stroke-opacity=".5"/>
      <text x="230" y="596" text-anchor="middle" font-family="${SERIF}" font-size="20" fill="${ink}">${esc(longDate(a.d))}</text>
      <text x="230" y="628" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="1.5" fill="#5b6676">DATE AWARDED</text>
      <text x="770" y="596" text-anchor="middle" font-family="${SERIF}" font-size="20" fill="${ink}">bioglowrx.netlify.app</text>
      <line x1="660" y1="606" x2="880" y2="606" stroke="${ink}" stroke-opacity=".5"/>
      <text x="770" y="628" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="1.5" fill="#5b6676">BIOGLOWRX SCIENCES LEARNING</text>
      <text x="500" y="650" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="13" fill="#6b7280">${NOTQUAL}</text>
    </svg>`;
  }

  /* a laurel branch on each side of the seal: leaves placed along an arc from the bottom up to the top */
  function laurel(r, col) {
    let g = "";
    for (let i = 0; i < 9; i++) {
      const th = 78 - i * 15, rad = th * Math.PI / 180, x = r * Math.cos(rad), y = r * Math.sin(rad), rot = th - 90 + 28;
      g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="13" ry="5.2" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${col}"/>`;
      g += `<ellipse cx="${(-x).toFixed(1)}" cy="${y.toFixed(1)}" rx="13" ry="5.2" transform="rotate(${(-rot).toFixed(1)} ${(-x).toFixed(1)} ${y.toFixed(1)})" fill="${col}"/>`;
    }
    return g;
  }

  function diplomaSVG(sid) {
    const s = C.subjects.find(x => x.id === sid); if (!s) return "";
    const ss = subjectState(s), a = loadAwards().d[sid] || { d: today(), pct: Math.round(ss.pct), n: 0, cls: classOf(ss.pct) };
    const id = "dp" + (++uid), col = HEX[s.color] || "#9fd8cb", deep = "#0b4a46", gold = "#C9A227", gold2 = "#E8CF7A", ink = "#1d2a33";
    const name = getName() || "Your name here", nameSize = name.length > 26 ? 40 : 54;
    const field = DIPLOMA[sid] || s.name, fSize = field.length > 28 ? 30 : 36;
    const n = liveChapters(s).length;
    return `<svg class="br-certsvg is-diploma" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Subject award: ${esc(s.name)}">
      <defs><linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0E6B66"/><stop offset="1" stop-color="#083532"/></linearGradient>
        <linearGradient id="${id}p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffcf2"/><stop offset="1" stop-color="#f3ead4"/></linearGradient>
        <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${gold2}"/><stop offset=".5" stop-color="${gold}"/><stop offset="1" stop-color="#9c7a17"/></linearGradient>
        <pattern id="${id}w" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="14" fill="none" stroke="${deep}" stroke-opacity=".04"/><circle cx="0" cy="0" r="14" fill="none" stroke="${deep}" stroke-opacity=".04"/><circle cx="40" cy="40" r="14" fill="none" stroke="${deep}" stroke-opacity=".04"/></pattern></defs>
      <rect width="1000" height="700" fill="url(#${id}f)"/>
      <rect x="28" y="28" width="944" height="644" fill="url(#${id}p)"/><rect x="28" y="28" width="944" height="644" fill="url(#${id}w)"/>
      <rect x="40" y="40" width="920" height="620" fill="none" stroke="url(#${id}g)" stroke-width="4"/>
      <rect x="50" y="50" width="900" height="600" fill="none" stroke="url(#${id}g)" stroke-width="1.2"/>
      ${corner(60, 60, 1.2, 1.2, gold)}${corner(940, 60, -1.2, 1.2, gold)}${corner(60, 640, 1.2, -1.2, gold)}${corner(940, 640, -1.2, -1.2, gold)}
      <text x="500" y="104" text-anchor="middle" font-family="${MONO}" font-size="14" letter-spacing="6" fill="${deep}">BIOGLOWRX SCIENCES LEARNING</text>
      <text x="500" y="128" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="15" fill="#8a7a50">Learn it, then play it</text>
      <text x="500" y="200" text-anchor="middle" font-family="${SERIF}" font-size="66" letter-spacing="3" fill="${ink}">Subject Award</text>
      <text x="500" y="${246}" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="${fSize}" fill="${deep}">${esc(s.name)}</text>
      <text x="500" y="290" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="19" fill="#5b6676">awarded to</text>
      <text x="500" y="350" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="${nameSize}" fill="${ink}">${esc(name)}</text>
      <line x1="230" y1="370" x2="770" y2="370" stroke="url(#${id}g)" stroke-width="2"/>
      <text x="500" y="404" text-anchor="middle" font-family="${SERIF}" font-size="18" fill="${ink}">for completing all ${n} chapters of ${esc(s.name)}, every activity passed at 70% or more,</text>
      <text x="500" y="430" text-anchor="middle" font-family="${SERIF}" font-size="18" fill="${ink}">with a subject score of <tspan font-weight="700">${a.pct}%</tspan></text>
      <g transform="translate(500 446)"><path d="M-120 0h240l-14 18 14 18h-240l14-18z" fill="${deep}"/>
        <text y="24" text-anchor="middle" font-family="${MONO}" font-size="15" letter-spacing="4" fill="${gold2}">${esc(tier(a.cls).toUpperCase())} LEVEL</text></g>
      <g transform="translate(500 552)">
        <path d="M-30 20l-12 44 18-10 11 16 10-46z" fill="${col}" stroke="${deep}" stroke-width="1.5"/><path d="M30 20l12 44-18-10-11 16-10-46z" fill="${col}" stroke="${deep}" stroke-width="1.5"/>
        ${laurel(68, "#6f9a57")}
        <path d="${scallop(0, 0, 54, 48, 28)}" fill="url(#${id}g)"/><circle r="42" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>
        <circle r="34" fill="${deep}"/>${iconAt(s.icon, 0, 0, 38, gold2, 1.6)}</g>
      <text x="245" y="582" text-anchor="middle" font-family="${SERIF}" font-size="17" fill="${ink}">Awarded ${esc(longDate(a.d))}</text>
      <line x1="150" y1="592" x2="340" y2="592" stroke="${ink}" stroke-opacity=".5"/>
      <text x="245" y="612" text-anchor="middle" font-family="${MONO}" font-size="11" letter-spacing="1.4" fill="#5b6676">DATE</text>
      <text x="755" y="582" text-anchor="middle" font-family="${SERIF}" font-size="17" fill="${ink}">bioglowrx.netlify.app</text>
      <line x1="660" y1="592" x2="850" y2="592" stroke="${ink}" stroke-opacity=".5"/>
      <text x="755" y="612" text-anchor="middle" font-family="${MONO}" font-size="11" letter-spacing="1.4" fill="#5b6676">BIOGLOWRX SCIENCES LEARNING</text>
      <text x="500" y="640" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="14" fill="#6b7280">${NOTQUAL}</text>
    </svg>`;
  }

  /* the Golden Flask: all five diplomas */
  function flaskSVG(won) {
    const id = "fl" + (++uid), g1 = won ? "#F3DC8A" : "#cfd5dd", g2 = won ? "#C9A227" : "#9aa3ae", g3 = won ? "#8d6c12" : "#6b7480";
    return `<svg class="br-flask" viewBox="0 0 120 150" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${g3}"/><stop offset=".35" stop-color="${g1}"/><stop offset=".6" stop-color="${g2}"/><stop offset="1" stop-color="${g3}"/></linearGradient></defs>
      <rect x="22" y="126" width="76" height="16" rx="3" fill="${won ? "#3a2c10" : "#4b5563"}"/><rect x="32" y="116" width="56" height="12" rx="2" fill="url(#${id})"/>
      <path d="M50 14h20v30l26 52c4 9-2 18-12 18H36c-10 0-16-9-12-18l26-52z" fill="url(#${id})" stroke="${g3}" stroke-width="2"/>
      <path d="M46 12h28" stroke="${g3}" stroke-width="5" stroke-linecap="round"/>
      <path d="M33 88h54l7 14c2 5-1 8-6 8H32c-5 0-8-3-6-8z" fill="${won ? "#2fb67c" : "#aab3bd"}" fill-opacity=".85"/>
      <circle cx="52" cy="98" r="3" fill="#fff" fill-opacity=".7"/><circle cx="66" cy="94" r="2" fill="#fff" fill-opacity=".7"/>
      <path d="M60 52l4 8 9 1-6 6 2 9-9-5-8 5 2-9-7-6 9-1z" fill="#fff" fill-opacity="${won ? ".9" : ".5"}"/>
      ${won ? `<path d="M56 18v22" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>` : ""}</svg>`;
  }

  /* lab medals: best stars per level from bgx_lab_<id> */
  function labState(l) {
    const st = BGX.store.get("lab_" + l.id, {}) || {}, stars = [1, 2, 3].reduce((n, k) => n + (st[k] || 0), 0);
    const tier = stars >= 9 ? "gold" : stars >= 6 ? "silver" : stars >= 3 ? "bronze" : "";
    return { l, stars, tier, levels: [1, 2, 3].map(k => st[k] || 0) };
  }
  function medalSVG(ls, s) {
    const T = { gold: ["#F3DC8A", "#C9A227", "#8d6c12"], silver: ["#f4f6f8", "#b9c2cc", "#7b8794"], bronze: ["#f2c69b", "#c27c3e", "#7a4719"], "": ["#e5e9ee", "#c5ccd5", "#9aa3ae"] }[ls.tier];
    const id = "md" + (++uid), col = HEX[s.color] || "#9fd8cb";
    return `<svg class="br-medal" viewBox="0 0 100 130" aria-hidden="true"><defs><radialGradient id="${id}" cx=".35" cy=".3"><stop offset="0" stop-color="${T[0]}"/><stop offset=".7" stop-color="${T[1]}"/><stop offset="1" stop-color="${T[2]}"/></radialGradient></defs>
      <path d="M30 0h16l10 40H40zM70 0H54L44 40h16z" fill="${ls.tier ? col : "#c5ccd5"}" stroke="#0E6B66" stroke-opacity=".5"/>
      <circle cx="50" cy="82" r="38" fill="url(#${id})" stroke="${T[2]}" stroke-width="2"/><circle cx="50" cy="82" r="29" fill="none" stroke="${T[2]}" stroke-opacity=".5" stroke-dasharray="2 3"/>
      ${iconAt(ls.l.icon || "lab", 50, 82, 34, T[2], 2)}</svg>`;
  }

  /* ---------- printing ---------- */
  function printCert(svg) {
    let box = document.getElementById("br-printcert");
    if (!box) { box = document.createElement("div"); box.id = "br-printcert"; document.body.appendChild(box); }
    box.innerHTML = svg; document.body.classList.add("br-printing");
    const done = () => { document.body.classList.remove("br-printing"); box.innerHTML = ""; window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    setTimeout(() => { try { window.print(); } catch (e) {} setTimeout(() => { if (!matchMedia || !matchMedia("print").matches) done(); }, 1500); }, 60);
  }
  function openAward(kind, ref) {
    const svg = kind === "diploma" ? diplomaSVG(ref) : certSVG(ref);
    const a = loadAwards(), info = kind === "cert" ? certInfo(ref) : null, s = kind === "diploma" ? C.subjects.find(x => x.id === ref) : info && info.s;
    const title = kind === "diploma" ? "Subject award · " + s.name : `Progress certificate · Ch. ${info.c.ch}`;
    BGX.sheet({ label: title, title, wide: true,
      html: `<div class="br-certframe${kind === "diploma" ? " is-diploma" : ""}">${svg}</div>
        ${getName() ? "" : `<p class="br-hint" style="margin:10px 0 0">Add your name in the <a href="${R}cabinet/index.html">trophy cabinet</a> and it appears on every certificate.</p>`}
        <div class="br-btns" style="margin-top:14px;justify-content:flex-start"><button class="br-next" type="button" data-print>Print or save as PDF</button>${BGX.shareSvg ? `<button class="br-ghost" type="button" data-sharecert>Share as image</button>` : ""}
        ${info ? `<a class="br-ghost" href="${R}${info.c.url}">Play ${esc(info.c.game)} again</a>` : `<a class="br-ghost" href="${R}subjects/${ref}/index.html">Open ${esc(s.name)}</a>`}</div>
        ${kind === "diploma" && a.d[ref] && a.d[ref].cls !== "Distinction" ? `<p class="br-hint" style="margin:12px 0 0">Raise your ${esc(s.name)} score to ${a.d[ref].cls === "Pass" ? "80% for Silver or " : ""}90% for Gold and this award upgrades itself.</p>` : ""}`,
      onOpen: body => { const b = body.querySelector("[data-print]"); if (b) b.onclick = () => printCert(svg);
        const sh = body.querySelector("[data-sharecert]"); if (sh) sh.onclick = () => BGX.shareSvg(svg, kind === "diploma" ? "BioglowRX-subject-award-" + ref : "BioglowRX-certificate-" + ref.replace(/[^a-z0-9]+/gi, "-")); } });
  }

  /* ---------- pop-ups when something is earned ---------- */
  function celebrate(prog) {
    const news = prog && prog.news ? prog.news : prog;
    (news || []).forEach(n => {
      if (n.kind === "cert") {
        const { s, c } = certInfo(n.key);
        BGX.sfx.big(); BGX.rain(260);
        BGX.popup("Progress certificate earned", `<div class="br-awardpop">${certSVG(n.key)}</div>
          <p class="br-label" style="margin:8px 0 0">Chapter complete · ${esc(s.name)}</p><h2>Progress certificate earned!</h2>
          <p>Every game in <b>Ch. ${esc(c.ch)} · ${esc(c.title)}</b> passed at 70% or more. It's now in your trophy cabinet.</p>
          <div class="br-btns" style="margin-top:6px"><button class="br-next" data-close>Keep going</button><a class="br-ghost" href="${R}cabinet/index.html">Trophy cabinet</a></div>`, { cls: "is-award", noEnter: false });
      } else if (n.kind === "diploma" || n.kind === "upgrade") {
        const s = C.subjects.find(x => x.id === n.sid), a = loadAwards().d[n.sid];
        BGX.sfx.big(); BGX.rain(320);
        BGX.popup("Subject award", `<div class="br-awardpop">${diplomaSVG(n.sid)}</div>
          <p class="br-label" style="margin:8px 0 0">${n.kind === "upgrade" ? "Award upgraded" : "Subject complete"} · ${esc(s.name)}</p>
          <h2>${n.kind === "upgrade" ? `Now ${esc(tier(a.cls))} level!` : "Subject award earned!"}</h2>
          <p>${n.kind === "upgrade" ? `Your ${esc(s.name)} score reached ${a.pct}%.` : `Every chapter of ${esc(s.name)} is complete: your ${esc(s.name)} subject award, ${esc(tier(a.cls))} level.`}</p>
          <div class="br-btns" style="margin-top:6px"><button class="br-next" data-close>Celebrate</button><a class="br-ghost" href="${R}cabinet/index.html">Trophy cabinet</a></div>`, { cls: "is-award" });
      } else if (n.kind === "flask") {
        BGX.popup("The Golden Flask", `<div style="width:120px;margin:0 auto">${flaskSVG(true)}</div><p class="br-label" style="margin:8px 0 0">All five subject awards</p><h2>The Golden Flask!</h2>
          <p>Every subject, every chapter, every activity. The rarest trophy on BioglowRX.</p>
          <div class="br-btns" style="margin-top:6px"><button class="br-next" data-close>Take a bow</button><a class="br-ghost" href="${R}cabinet/index.html">Trophy cabinet</a></div>`, { cls: "is-award" });
      }
    });
  }

  /* ---------- pieces used by the game menu, end screen, hub and subject pages ---------- */
  function gameCard(gid) {
    const f = findChapter(gid), g = gameState(gid); if (!g.total) return "";
    const awarded = f && loadAwards().c[chapKey(f.s, f.c)];
    const cs = f ? chapterState(f.s, f.c) : null;
    const left = g.total - g.passed;
    return `<div class="br-gprog${g.done ? " is-done" : ""}">
      ${ring(g.pct, 52, g.done)}
      <div class="t"><p class="br-label" style="margin:0">${f ? `Ch. ${esc(f.c.ch)} · ${esc(f.s.name)}` : "Your progress"}</p>
        <b>${cs && cs.done ? "Chapter completed" : g.started ? `${g.passed} of ${g.total} activities passed` : `${g.total} activities to pass`}</b>
        ${bar(g.pct)}<small>${fmtPct(g.pct)} chapter score · ${cs && cs.done ? "every activity passed at 70%+" : g.done && cs ? `answer ${cs.minQ - cs.answered} more questions in this chapter to earn the certificate` : `pass ${left === 1 ? "the last activity" : `all ${g.total} activities`} with 70% or more to earn the certificate`}</small></div>
      ${awarded ? `<button class="br-certbtn" type="button" id="br-viewcert">${BGX.icon("trophy")} View certificate</button>` : ""}</div>`;
  }
  function endLine(gid, mid, pct) {
    const g = gameState(gid), m = g.modes.find(x => x.id === mid), ok = pct >= PASS, f = findChapter(gid);
    return `<button class="br-progline${g.done ? " is-done" : ""}" id="br-progline" type="button">${ring(g.pct, 46, g.done)}
      <span><b>${ok ? "✓ Passed" : `${PASS}% needed to pass`}${m && m.pct > pct ? ` · best ${Math.round(m.pct)}%` : ""}</b>
      <small>${f ? `Ch. ${esc(f.c.ch)}: ` : ""}${g.passed} of ${g.total} activities passed · ${fmtPct(g.pct)} chapter score${g.done ? " · completed" : ""}</small></span></button>`;
  }
  function openChapterFor(gid) {
    const f = findChapter(gid), g = gameState(gid);
    BGX.sheet({ label: "Chapter progress", title: f ? `Ch. ${f.c.ch} · ${f.c.title}` : g.title,
      html: `<p class="br-hint" style="margin:0 0 12px">Pass every activity with at least 70%, and answer at least 30 questions in the chapter, to earn its progress certificate. Your best score in each activity counts.</p>
        <ul class="br-modelist">${g.modes.map(m => `<li class="${m.ok ? "is-ok" : m.pct != null ? "is-low" : ""}"><span class="mk">${m.ok ? "✓" : m.pct != null ? "!" : "·"}</span><span class="nm">${esc(m.title)}</span>${bar(m.pct || 0, m.ok ? "is-ok" : "")}<span class="pc">${m.pct == null ? "—" : Math.round(m.pct) + "%"}</span></li>`).join("")}</ul>
        <p style="margin:14px 0 0"><a class="br-crumb" href="${R}cabinet/index.html">${BGX.icon("trophy")} Trophy cabinet</a></p>` });
  }
  function bindGameCard(gid) {
    const b = document.getElementById("br-viewcert"), f = findChapter(gid);
    if (b && f) b.onclick = () => { BGX.sfx.tap(); openAward("cert", chapKey(f.s, f.c)); };
  }

  function headerLink() {
    const a = loadAwards(), n = Object.keys(a.c).length + Object.keys(a.d).length;
    return `<a class="br-cab" href="${R}cabinet/index.html" aria-label="Trophy cabinet: ${n} award${n === 1 ? "" : "s"}">${BGX.icon("trophy")}<b>${n}</b></a>`;
  }

  function hubCard() {
    const A = allSubjects(), a = loadAwards(), certs = Object.keys(a.c).length, dips = Object.keys(a.d).length;
    const totalCh = A.reduce((n, x) => n + x.chaps.length, 0), overall = avg(A.map(x => x.pct));
    return `<a class="br-cabcard" href="${R}cabinet/index.html">
      <span class="cabart" aria-hidden="true">${flaskSVG(!!a.flask)}</span>
      <span class="t"><span class="br-label" style="margin:0">Trophy cabinet</span><b>${certs} of ${totalCh} certificates · ${dips} of ${C.subjects.length} subject awards</b>
        ${bar(overall)}<small>${fmtPct(overall)} of the whole course · finish a chapter (every activity at 70%+, 30 questions answered) to earn its certificate</small></span>
      <span class="go">Open →</span></a>`;
  }
  function subjectTile(s) {
    const ss = subjectState(s), a = loadAwards();
    return `<span class="br-subjprog">${bar(ss.pct)}<small>${fmtPct(ss.pct)} · ${ss.doneCount}/${ss.chaps.length} ✓${a.d[s.id] ? " · Award" : ""}</small></span>`;
  }
  function subjectPanel(s) {
    const ss = subjectState(s), a = loadAwards(), d = a.d[s.id];
    return `<section class="br-subprog${ss.done ? " is-done" : ""}">${ring(ss.pct, 58, ss.done)}
      <div class="t"><p class="br-label" style="margin:0">Subject progress</p><b>${ss.doneCount} of ${ss.chaps.length} chapters completed</b>${bar(ss.pct)}
        <small>${fmtPct(ss.pct)} subject score · ${d ? `Subject award earned, ${esc(tier(d.cls))} level` : "complete every chapter to earn the subject award"}</small></div>
      <a class="br-certbtn" href="${R}cabinet/index.html">${BGX.icon("trophy")} ${d ? "View subject award" : "Trophy cabinet"}</a></section>`;
  }
  function chapterRow(s, c) {
    const cs = chapterState(s, c);
    return `<div class="br-chprog">${bar(cs.pct, cs.done ? "is-ok" : "")}<span class="pc">${fmtPct(cs.pct)}</span><span class="n">${cs.passed}/${cs.total} activities</span>${statusChip(cs)}</div>`;
  }

  /* ---------- the trophy cabinet page (cabinet/index.html) ---------- */
  function cabinet(view) {
    document.title = "Trophy cabinet · BioglowRX Sciences Learning";
    const draw = () => {
      const A = allSubjects(), a = loadAwards(), certs = Object.keys(a.c).length, dips = Object.keys(a.d).length;
      const totalCh = A.reduce((n, x) => n + x.chaps.length, 0), overall = avg(A.map(x => x.pct));
      const labs = C.subjects.reduce((L, s) => L.concat((s.labs || []).filter(l => l.status === "live").map(l => ({ s, ls: labState(l) }))), []);
      const medals = labs.filter(x => x.ls.tier).length;
      const dipTile = ss => {
        const s = ss.s, d = a.d[s.id];
        if (d) return `<button class="br-frame is-diploma is-won" type="button" data-dip="${s.id}" aria-label="${esc(s.name)} subject award, ${esc(tier(d.cls))} level">${diplomaSVG(s.id)}<span class="cap"><b>${esc(s.name)}</b><small>${esc(d.cls)} · ${d.pct}%</small></span></button>`;
        return `<a class="br-frame is-diploma is-locked" href="${R}subjects/${s.id}/index.html" aria-label="${esc(s.name)} subject award, locked: ${ss.doneCount} of ${ss.chaps.length} chapters">
          <span class="lock" style="--c:var(--${s.color})">${ring(ss.pct, 64)}<em>${ss.doneCount}/${ss.chaps.length} chapters</em></span>
          <span class="cap"><b>${esc(s.name)}</b><small>Subject award · locked</small></span></a>`;
      };
      const certTile = (cs) => {
        const { s, c } = cs, w = a.c[cs.key];
        if (w) return `<button class="br-frame is-won" type="button" data-cert="${esc(cs.key)}" aria-label="Certificate, chapter ${esc(c.ch)}: ${esc(c.title)}">${certSVG(cs.key)}<span class="cap"><b>Ch. ${esc(c.ch)}</b><small>${esc(c.game)} · ${w.pct}%</small></span></button>`;
        return `<a class="br-frame is-locked" href="${R}${c.url}" aria-label="Chapter ${esc(c.ch)} certificate, locked: ${Math.round(cs.pct)}%, ${cs.passed} of ${cs.total} activities passed">
          <span class="lock" style="--c:var(--${s.color})">${ring(cs.pct, 46)}<em>${cs.passed}/${cs.total} games</em></span>
          <span class="cap"><b>Ch. ${esc(c.ch)}</b><small>${esc(c.game)}</small></span></a>`;
      };
      view.innerHTML = `
        <nav class="br-backrow" aria-label="Back"><a class="br-crumb" href="${R}index.html"><span aria-hidden="true">←</span> All subjects</a></nav>
        <section class="br-cabhero">
          <div><p class="br-label" style="margin:0">Your practice record</p><h1>Trophy cabinet</h1>
            <p>Every chapter you complete earns a progress certificate; every subject you complete earns a subject award. A chapter is complete when each of its activities is passed with at least 70%. These are fun records of your practice, not academic qualifications.</p></div>
          <div class="br-cabstats">
            <span><b>${certs}<small>/${totalCh}</small></b>Certificates</span><span><b>${dips}<small>/${C.subjects.length}</small></b>Subject awards</span>
            <span><b>${medals}<small>/${labs.length}</small></b>Lab medals</span><span><b>${Math.round(overall)}<small>%</small></b>Whole course</span></div>
        </section>
        <form class="br-namebox" id="br-nameform"><label for="br-name">Name on your certificates</label>
          <input id="br-name" maxlength="40" autocomplete="name" placeholder="Type your name" value="${esc(getName())}"><button class="br-next" type="submit">Save</button><span class="ok" id="br-nameok" aria-live="polite"></span></form>
        <div class="br-cabinet">
          <div class="br-cabcrest"><span>${BGX.logo("")}</span><b>Hall of fame</b></div>
          <section class="br-shelf is-top" aria-label="Subject awards">
            <h2 class="br-shelfhead"><span>Subject awards</span><small>${dips}/${C.subjects.length}</small></h2>
            <div class="br-shelfrow is-dips">
              <div class="br-frame is-flask${a.flask ? " is-won" : " is-locked"}" title="The Golden Flask: earn all five subject awards">${flaskSVG(!!a.flask)}<span class="cap"><b>The Golden Flask</b><small>${a.flask ? "Awarded " + esc(longDate(a.flask.d)) : `All five subject awards · ${dips}/5`}</small></span></div>
              ${BGX.community ? BGX.community.cabinetShelfItem() : ""}
              ${A.map(dipTile).join("")}</div>
            <i class="plank" aria-hidden="true"></i></section>
          ${A.map(ss => `<section class="br-shelf" aria-label="${esc(ss.s.name)} certificates">
            <h2 class="br-shelfhead"><span class="dot" style="background:var(--${ss.s.color})"></span><span>${esc(ss.s.name)}</span><small>${ss.doneCount}/${ss.chaps.length} certificates · ${fmtPct(ss.pct)}</small>${bar(ss.pct)}</h2>
            <div class="br-shelfrow">${ss.chaps.map(certTile).join("")}</div><i class="plank" aria-hidden="true"></i></section>`).join("")}
          <section class="br-shelf" aria-label="Lab medals">
            <h2 class="br-shelfhead"><span>Lab bench medals</span><small>bronze 3★ · silver 6★ · gold all 9★</small></h2>
            <div class="br-shelfrow is-medals">${labs.map(({ s, ls }) => `<a class="br-frame is-medal${ls.tier ? " is-won" : " is-locked"}" href="${R}${ls.l.url}" aria-label="${esc(ls.l.title)}: ${ls.stars} of 9 stars${ls.tier ? ", " + ls.tier + " medal" : ""}">
              ${medalSVG(ls, s)}<span class="cap"><b>${esc(ls.l.title)}</b><small>${ls.tier ? ls.tier[0].toUpperCase() + ls.tier.slice(1) + " · " : ""}${"★".repeat(ls.stars)}${"☆".repeat(9 - ls.stars)}</small></span></a>`).join("")}</div>
            <i class="plank" aria-hidden="true"></i></section>
        </div>
        <p class="br-hint">Certificates, subject awards and medals are saved in this browser on this device. Tap one to see it full size and print it or save it as a PDF.</p>`;
      view.querySelectorAll("[data-cert]").forEach(b => b.onclick = () => { BGX.sfx.tap(); openAward("cert", b.dataset.cert); });
      view.querySelectorAll("[data-dip]").forEach(b => b.onclick = () => { BGX.sfx.tap(); openAward("diploma", b.dataset.dip); });
      const form = document.getElementById("br-nameform");
      form.onsubmit = ev => { ev.preventDefault(); BGX.store.set("name", document.getElementById("br-name").value.trim().slice(0, 40)); BGX.sfx.tap(); draw(); const ok = document.getElementById("br-nameok"); if (ok) ok.textContent = "Saved: shown on every certificate."; };
    };
    draw();
  }

  BGX.progress = { PASS, modePct, modePcts, gameState, chapterState, subjectState, findChapter, record, checkAwards, celebrate,
    gameCard, bindGameCard, endLine, openChapterFor, headerLink, hubCard, subjectTile, subjectPanel, chapterRow, cabinet, openAward,
    certSVG, diplomaSVG, awards: loadAwards, gamesOf };

  /* pages without a game: award anything earned from older scores, then draw the cabinet if this is the cabinet page */
  const early = checkAwards();          // before any page draws, so counts and shelves are already up to date
  const boot = () => {
    const page = document.body && document.body.dataset.page;
    if (page === "cabinet") { BGX.shell(); cabinet(document.getElementById("br-view")); }
    if (page === "privacy" || page === "about") BGX.shell();
    if (early.length && (page === "hub" || page === "subject" || page === "cabinet")) setTimeout(() => celebrate(early), 600);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
