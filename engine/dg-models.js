/* BioglowRX diagram "models" — health behaviour models. The item's cat picks the model:
   ttm  Stages of Change staircase   spots: pre, con, prep, act, maint
   hbm  Health Belief Model boxes    spots: susc, sev, ben, bar, cue, eff (+ act = likely to act)
   sct  Social Cognitive Theory triangle  spots: person, beh, env, and arrows pb, pe, be
   Overview: three small icons of the models. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const T = (x, y, t, sz, col, w) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Chivo, sans-serif" font-weight="${w || 800}" font-size="${sz}" fill="${col}">${BGX.esc(t)}</text>`;
  const grad = (id, c) => `<linearGradient id="${id}" x2="0" y2="1"><stop offset="0" stop-color="${BGX.shade(c, .25)}"/><stop offset="1" stop-color="${BGX.shade(c, -.12)}"/></linearGradient>`;

  /* ---- Stages of Change: a staircase ---- */
  const STAGES = [["pre", "Precon.", "Precontemplation"], ["con", "Contem.", "Contemplation"], ["prep", "Prepare", "Preparation"], ["act", "Action", "Action"], ["maint", "Maintain", "Maintenance"]];
  const SCOL = ["#7fb8d8", "#6aa9cf", "#4f95c2", "#3b80b0", "#2a6a98"];
  function ttm(it, u, mini) {
    let g = "";
    STAGES.forEach(([id, short], i) => {
      const x = 12 + i * 27.5, h = 30 + i * 16, y = 140 - h, hl = dg.is(it, id), c = hl ? dg.HL : SCOL[i];
      g += `${grad(u + "s" + i, c)}<g${dg.cls(it, id)}><rect x="${x}" y="${y}" width="27" height="${h}" rx="2.5" fill="url(#${u}s${i})"/><rect x="${x}" y="${y}" width="27" height="5" rx="2" fill="#fff" opacity=".35"/></g>`;
      if (!mini) g += T(x + 13.5, y + 15, String(i + 1), 11, "#fff", 900) + T(x + 13.5, y + 25, short, 6, "#fff", 700);
    });
    /* climber on the highlighted step (or the first) */
    const k = Math.max(0, STAGES.findIndex(s => dg.is(it, s[0]))), cx = 12 + k * 27.5 + 13.5, top = 140 - (30 + k * 16);
    g += `<g transform="translate(${cx} ${top})"><circle cy="-21" r="4.2" fill="#f2c9a0"/><path d="M0-16 V-7 M0-14 L-5-9 M0-14 L5-10 M0-7 L-4 0 M0-7 L4 0" stroke="#1b2430" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>`;
    if (!mini) {
      g += `<path d="M132 34 Q66 30 26 100" stroke="#8a96a2" stroke-width="1.6" stroke-dasharray="3 3" fill="none" marker-end="url(#${u}ar)"/><defs><marker id="${u}ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#8a96a2"/></marker></defs>` + T(108, 46, "relapse", 7, "#6a7682", 600);
      const s = STAGES.find(s => dg.is(it, s[0]));
      if (s) g += dg.tag(Math.max(48, s[2].length * 2.8 + 12), 17, s[2]);
    }
    return g;
  }

  /* ---- Health Belief Model: belief boxes feeding "likely to act" ---- */
  const BOX = [["susc", "Perceived", "susceptibility", "#9cc7ea"], ["sev", "Perceived", "severity", "#a9b8ec"], ["ben", "Perceived", "benefits", "#a8dcc0"], ["bar", "Perceived", "barriers", "#f2c09a"], ["cue", "Cues to", "action", "#f2dc8a"], ["eff", "Self-", "efficacy", "#d2b8ec"]];
  function hbm(it, u, mini) {
    let g = `<path d="M43 112 L72 122 M117 112 L88 122" stroke="#6a7682" stroke-width="2"/><path d="M80 104 V118" stroke="#6a7682" stroke-width="2"/>`;
    BOX.forEach(([id, a, b, c], i) => {
      const x = i % 2 ? 82 : 10, y = 10 + Math.floor(i / 2) * 33, hl = dg.is(it, id), col = hl ? dg.HL : c;
      g += `${grad(u + "b" + i, col)}<g${dg.cls(it, id)}><rect x="${x}" y="${y}" width="68" height="28" rx="7" fill="url(#${u}b${i})" stroke="${BGX.shade(col, -.3)}" stroke-width="1"/></g>`;
      if (!mini) g += T(x + 34, y + 12, a, 7, hl ? "#fff" : "#1b2430", 600) + T(x + 34, y + 22, b, 7.6, hl ? "#fff" : "#1b2430", 800);
    });
    const hl = dg.is(it, "act"), col = hl ? dg.HL : "#3b8a6a";
    g += `${grad(u + "act", col)}<g${dg.cls(it, "act")}><rect x="38" y="120" width="84" height="28" rx="14" fill="url(#${u}act)"/></g>`;
    if (!mini) g += T(80, 138, "Likely to act", 9, "#fff", 900);
    return g;
  }

  /* ---- Social Cognitive Theory: person, behaviour, environment ---- */
  const NODES = { person: [80, 36, "Person", "#f2b38a"], beh: [32, 116, "Behaviour", "#8fd0a8"], env: [128, 116, "Environment", "#9cc7ea"] };
  const EDGES = { pb: ["person", "beh"], pe: ["person", "env"], be: ["beh", "env"] };
  const SCT_TAG = { "Self-efficacy": "Confidence", "Outcome expectations": "Expected results", "Observational learning": "Watching others", "Reinforcement": "Rewards", "Reciprocal determinism": "All influence each other" };
  function sct(it, u, mini) {
    let g = `<defs><marker id="${u}m" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="context-stroke"/></marker></defs>`;
    Object.keys(EDGES).forEach(id => {
      const [a, b] = EDGES[id].map(n => NODES[n]), dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), r = 27;
      const x1 = a[0] + dx / L * r, y1 = a[1] + dy / L * r, x2 = b[0] - dx / L * r, y2 = b[1] - dy / L * r, hl = dg.is(it, id);
      g += `<g${dg.cls(it, id)}><path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${hl ? dg.HL : "#8a96a2"}" stroke-width="${hl ? 5 : 3}" marker-start="url(#${u}m)" marker-end="url(#${u}m)" stroke-linecap="round"/></g>`;
    });
    Object.keys(NODES).forEach(id => {
      const [x, y, lab, c] = NODES[id], hl = dg.is(it, id), col = hl ? dg.HL : c;
      g += `<radialGradient id="${u}n${id}" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="${BGX.shade(col, .4)}"/><stop offset="1" stop-color="${BGX.shade(col, -.15)}"/></radialGradient><g${dg.cls(it, id)}><circle cx="${x}" cy="${y}" r="24" fill="url(#${u}n${id})" stroke="${BGX.shade(col, -.3)}" stroke-width="1.2"/></g>`;
      const ic = hl ? "#fff" : "#1b2430";
      if (id === "person") g += `<circle cx="${x}" cy="${y - 8}" r="6.5" fill="${ic}"/><path d="M${x - 11} ${y + 9} Q${x - 11} ${y - 1} ${x} ${y - 1} Q${x + 11} ${y - 1} ${x + 11} ${y + 9}Z" fill="${ic}"/>`;
      if (id === "beh") g += `<g transform="translate(${x} ${y - 4})" stroke="${ic}" stroke-width="2.8" stroke-linecap="round" fill="none"><circle cx="3" cy="-10" r="3.6" fill="${ic}" stroke="none"/><path d="M1-5 L-2 4 L4 9 M-2 4 L-8 10 M0-3 L-7 0 M1-4 L7-1"/></g>`;
      if (id === "env") g += `<g transform="translate(${x} ${y - 4})"><path d="M-13 9 V-2 L-5-9 L3-2 V9Z" fill="${ic}"/><rect x="-7" y="2" width="4" height="7" fill="${hl ? dg.HL : c}"/><path d="M9 9 V0" stroke="${ic}" stroke-width="2"/><circle cx="9" cy="-4" r="6" fill="${ic}"/></g>`;
      if (!mini) g += T(x, y + 17, lab, lab.length > 8 ? 6.2 : 7, hl ? "#fff" : "#1b2430", 800);
    });
    if (!mini && it && SCT_TAG[it.name]) g += dg.tag(80, 92, SCT_TAG[it.name]);
    return g;
  }

  BGX.DIAGRAMS.models = item => {
    const u = dg.uid();
    if (!item) {
      const box = (x, y, inner) => `<rect x="${x}" y="${y}" width="68" height="68" rx="12" fill="#fff" opacity=".75"/><g transform="translate(${x + 4} ${y + 4}) scale(.375)">${inner}</g>`;
      const inner = box(8, 8, ttm(null, u + "a", true)) + box(84, 8, hbm(null, u + "b", true)) + box(46, 84, sct(null, u + "c", true));
      return dg.frame(inner, "Three health behaviour models: Stages of Change, Health Belief Model, Social Cognitive Theory", ["#F2F8F6", "#D9EAE4"]);
    }
    const inner = item.cat === "ttm" ? ttm(item, u) : item.cat === "hbm" ? hbm(item, u) : sct(item, u);
    return dg.frame(inner, item.name, ["#F2F8F6", "#D9EAE4"]);
  };
})();
