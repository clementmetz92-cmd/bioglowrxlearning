/* BioglowRX diagram "coach" — behaviour-change counselling.
   spot: stages cycle  pre · con · prep · act · main · relapse
         OARS cards     open · affirm · reflect · summary
         consult scene  change · roll · epe · interp · teach
         5 A's ladder   a1 · a2 · a3 · a4 · a5     SMART checklist  smart     diary  selfmon
         food access    foodsec · snap · wic
         culture plate  halal · kosher · ramadan · hindu · lent
   Overview (null): the stages-of-change cycle. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUTED = "#55616e";

  /* ---------- stages of change cycle ---------- */
  const STAGES = [["pre", "Precontemplation", "#e8a0a0"], ["con", "Contemplation", "#f2c27a"], ["prep", "Preparation", "#e9dc7a"], ["act", "Action", "#9fd39a"], ["main", "Maintenance", "#8cc7e8"]];
  function cycle(it) {
    const on = id => dg.is(it, id), cx = 80, cy = 72, R = 44;
    let o = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#b9c5cf" stroke-width="2" stroke-dasharray="4 4"/>`;
    const pos = STAGES.map((s, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R]; });
    /* arrows between stages */
    pos.forEach((p, i) => { if (i === 4) return; const q = pos[i + 1], f = [0.5, 0.68, 0.5, 0.32][i], mx = p[0] + (q[0] - p[0]) * f, my = p[1] + (q[1] - p[1]) * f, ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 57.3;
      o += `<g transform="translate(${mx.toFixed(1)} ${my.toFixed(1)}) rotate(${ang.toFixed(0)})"><path d="M-4 -4 L3 0 L-4 4" fill="none" stroke="${MUTED}" stroke-width="1.6"/></g>`; });
    /* relapse arrow: maintenance/action back to contemplation, through the middle */
    const rl = on("relapse");
    o += `<path d="M${pos[3][0] - 6} ${pos[3][1] - 8} Q${cx} ${cy + 4} ${pos[1][0] - 10} ${pos[1][1] + 6}" fill="none" stroke="${rl ? HL : "#c9a0b0"}" stroke-width="${rl ? 3 : 1.6}" stroke-dasharray="${rl ? "" : "3 3"}"${rl ? ' class="dg-hl"' : ""}/>
      <path d="M${pos[1][0] - 10} ${pos[1][1] + 6} l1 -7 M${pos[1][0] - 10} ${pos[1][1] + 6} l6 3" stroke="${rl ? HL : "#c9a0b0"}" stroke-width="${rl ? 3 : 1.6}" stroke-linecap="round"/>
      ${T(cx - 8, cy - 8, 7.5, 800, rl ? HL : "#a07080", "relapse")}`;
    STAGES.forEach(([id, name, col], i) => { const [x, y] = pos[i], h = on(id);
      o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${h ? 13 : 10.5}" fill="${h ? HL : col}" stroke="#fff" stroke-width="2"${h ? ' class="dg-hl"' : ""}/>${T(x.toFixed(1), (y + 3.5).toFixed(1), h ? 10 : 9, 900, h ? "#fff" : INK, String(i + 1))}`; });
    /* stage names placed next to their circles */
    const short = ["Precontemplation", "Contemplation", "Preparation", "Action", "Maintenance"];
    const lab = [[80, 12, "middle"], [122, 82, "middle"], [107, 132, "middle"], [53, 132, "middle"], [38, 82, "middle"]];
    const sel = STAGES.findIndex(s => on(s[0]));
    lab.forEach(([x, y, a], i) => { const w = short[i].length * 4.1 + 6; o += `<rect x="${x - w / 2}" y="${y - 7.5}" width="${w}" height="10" rx="5" fill="#FBF6F0" opacity=".92"/>` + T(x, y, 7.5, sel === i ? 900 : 700, sel === i ? HL : MUTED, short[i], a); });
    const tag = sel >= 0 ? dg.tag(80, 150, STAGES[sel][1]) : rl ? dg.tag(80, 150, "Relapse: go round again") : T(80, 152, 8, 700, MUTED, "Stages of change");
    return o + tag;
  }

  /* ---------- OARS cards ---------- */
  const OARS = [["open", "O", "Open", "questions"], ["affirm", "A", "Affirm-", "ations"], ["reflect", "R", "Reflect-", "ions"], ["summary", "S", "Summar-", "ies"]];
  function oars(it) {
    let o = T(80, 22, 10, 900, INK, "OARS");
    OARS.forEach(([id, L, a, b], i) => { const x = 9 + i * 36, h = dg.is(it, id);
      o += `<rect x="${x}" y="${h ? 34 : 40}" width="33" height="${h ? 84 : 74}" rx="7" fill="${h ? HL : "#fff"}" stroke="${h ? HL : "#9fb3c4"}" stroke-width="1.5"${h ? ' class="dg-hl"' : ""}/>
        ${T(x + 16.5, h ? 66 : 70, 20, 900, h ? "#fff" : "#2f6fb8", L)}${T(x + 16.5, h ? 88 : 90, 6.5, 800, h ? "#fff" : MUTED, a)}${T(x + 16.5, h ? 98 : 100, 6.5, 800, h ? "#fff" : MUTED, b)}`; });
    const n = OARS.find(x => dg.is(it, x[0]));
    return o + (n ? dg.tag(80, 142, { open: "Open questions", affirm: "Affirmations", reflect: "Reflective listening", summary: "Summaries" }[n[0]]) : T(80, 142, 8, 700, MUTED, "core skills of MI"));
  }

  /* ---------- consult scene with speech bubbles ---------- */
  const person = (x, y, skin, top, coat) => `<circle cx="${x}" cy="${y}" r="11" fill="${skin}"/><path d="M${x - 11} ${y - 2} Q${x - 10} ${y - 15} ${x} ${y - 14} Q${x + 11} ${y - 14} ${x + 11} ${y - 2} Q${x + 4} ${y - 8} ${x - 11} ${y - 2}Z" fill="${top}"/>
    <path d="M${x - 18} ${y + 42} Q${x - 18} ${y + 14} ${x} ${y + 14} Q${x + 18} ${y + 14} ${x + 18} ${y + 42}Z" fill="${coat}"/>`;
  const bubble = (x, y, w, lines, h, tail) => {
    const hh = 8 + lines.length * 10, f = h ? HL : "#fff", tc = h ? "#fff" : INK;
    return `<g${h ? ' class="dg-hl"' : ""}><rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="8" fill="${f}" stroke="${h ? HL : "#9fb3c4"}" stroke-width="1.3"/>
      <path d="M${tail[0]} ${y + hh - 1} L${tail[1]} ${y + hh + 8} L${tail[0] + 8} ${y + hh - 1}Z" fill="${f}" stroke="${h ? HL : "#9fb3c4"}" stroke-width="1.3"/><rect x="${tail[0] - 1}" y="${y + hh - 3}" width="10" height="3" fill="${f}"/>
      ${lines.map((l, i) => T(x + w / 2, y + 14 + i * 10, 7.5, 700, tc, l)).join("")}</g>`;
  };
  const SCENES = {
    change: { p: ["I want to see my", "grandkids grow up"], c: ["That really", "matters to you."], hp: true, tag: "Change talk" },
    roll: { p: ["Everyone tells", "me to lose weight!"], c: ["You're tired of", "the same advice."], hc: true, tag: "Rolling with resistance" },
    epe: { p: ["Not much, really."], c: ["What do you know", "about salt? May I", "share something?"], hc: true, tag: "Elicit–provide–elicit" },
    teach: { p: ["Half the plate is", "vegetables…"], c: ["Can you show me", "how you'll do it?"], hc: true, tag: "Teach-back" },
    interp: { p: ["¿Cómo dice?"], c: ["How do you cook", "your beans?"], hc: true, tag: "Trained interpreter", interp: true }
  };
  function consult(it, key) {
    const S = SCENES[key];
    let o = `<rect x="10" y="118" width="140" height="6" rx="3" fill="#c9b49a"/>` + person(36, 84, "#d9a07a", "#4a3020", "#7cc4b0") + person(124, 84, "#f2c7a5", "#6b4226", "#fff") +
      `<path d="M118 100 v12 M130 100 v12" stroke="#2f6fb8" stroke-width="1.5"/><circle cx="124" cy="113" r="3" fill="none" stroke="#2f6fb8" stroke-width="1.5"/>`;
    if (S.interp) o += person(80, 96, "#c98f6a", "#222", "#b9a0d8").replace(/r="11"/, 'r="9"');
    o += bubble(6, 14, 78, S.p, S.hp, [26, 32]) + bubble(76, S.p.length > 1 && S.c.length > 2 ? 34 : 40, 78, S.c, S.hc, [120, 124]);
    return o + dg.tag(80, 146, S.tag);
  }

  /* ---------- 5 A's ladder, SMART checklist, diary ---------- */
  const AS = [["a1", "Assess", "risk, readiness"], ["a2", "Advise", "clear, personal"], ["a3", "Agree", "goals together"], ["a4", "Assist", "tools, barriers"], ["a5", "Arrange", "follow-up"]];
  function fiveA(it) {
    const all = AS.every(a => dg.is(it, a[0]));
    let o = T(80, 18, 9.5, 900, INK, "The 5 A's");
    AS.forEach(([id, n, d], i) => { const y = 24 + i * 22, h = dg.is(it, id) && !all;
      o += `<rect x="16" y="${y}" width="128" height="18" rx="9" fill="${h ? HL : "#fff"}" stroke="${h || all ? HL : "#9fb3c4"}" stroke-width="1.4"${h ? ' class="dg-hl"' : ""}/>
        <circle cx="28" cy="${y + 9}" r="6.5" fill="${h ? "#fff" : "#f2c27a"}"/>${T(28, y + 12.5, 8.5, 900, h ? HL : INK, String(i + 1))}
        ${T(40, y + 12.5, 8.5, 900, h ? "#fff" : INK, n, "start")}${T(138, y + 12.5, 7, 600, h ? "#fff" : MUTED, d, "end")}`; });
    return o + (all ? dg.tag(80, 150, "All five, in order") : "");
  }
  function smart(it) {
    const L = [["S", "Specific"], ["M", "Measurable"], ["A", "Achievable"], ["R", "Relevant"], ["T", "Time-bound"]];
    let o = `<rect x="22" y="12" width="116" height="136" rx="8" fill="#fff" stroke="#9fb3c4" stroke-width="1.5"/><rect x="62" y="7" width="36" height="10" rx="3" fill="#9fb3c4"/>
      ${T(80, 32, 9, 900, INK, "SMART goal")}`;
    L.forEach(([k, w], i) => { const y = 42 + i * 18;
      o += `<rect x="32" y="${y}" width="12" height="12" rx="2" fill="#eaf7ee" stroke="#4f8a5a"/><path d="M34.5 ${y + 6} l3 3 l5 -7" stroke="${HL}" stroke-width="2.2" fill="none" stroke-linecap="round" class="dg-hl"/>
        ${T(52, y + 10, 10, 900, "#2f6fb8", k, "start")}${T(64, y + 10, 8, 700, MUTED, w, "start")}`; });
    return o + T(80, 140, 7, 700, MUTED, "walk 20 min, 3×/week, 4 weeks");
  }
  function diary(it) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], tick = [1, 1, 0, 1, 1, 1, 0];
    let o = `<rect x="20" y="14" width="120" height="122" rx="6" fill="#fffdf4" stroke="#c9b49a" stroke-width="1.5"/>${T(80, 30, 9, 900, INK, "My food diary")}`;
    days.forEach((d, i) => { const y = 40 + i * 13;
      o += `<path d="M28 ${y + 10} H132" stroke="#e6dcc8"/>${T(32, y + 8, 7, 700, MUTED, d, "start")}<rect x="56" y="${y}" width="${30 + (i * 13) % 40}" height="6" rx="3" fill="#cfe3ee"/>
        ${tick[i] ? `<path d="M118 ${y + 4} l3 3 l6 -7" stroke="${HL}" stroke-width="2" fill="none" class="dg-hl"/>` : `<path d="M118 ${y} l7 7 M125 ${y} l-7 7" stroke="#b9c5cf" stroke-width="1.6"/>`}`; });
    return o + dg.tag(80, 148, "Self-monitoring");
  }

  /* ---------- food access ---------- */
  function access(it, key) {
    let o = `<path d="M30 60 H130 L122 112 H40Z" fill="#fff" stroke="#9fb3c4" stroke-width="2"/><path d="M30 60 L22 40 H12" stroke="#9fb3c4" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="122" r="6" fill="#5f6b78"/><circle cx="112" cy="122" r="6" fill="#5f6b78"/>
      <circle cx="58" cy="52" r="10" fill="#e8584a"/><path d="M58 42 q2 -5 6 -6" stroke="#4f8a2a" stroke-width="2" fill="none"/>
      <rect x="72" y="36" width="16" height="24" rx="3" fill="#8cc7e8"/><path d="M96 58 Q100 34 112 36 Q114 50 104 60Z" fill="#7bbf4a"/>`;
    if (key === "snap") o += `<g class="dg-hl" transform="rotate(-8 80 86)"><rect x="50" y="70" width="60" height="36" rx="5" fill="${HL}"/><rect x="56" y="78" width="14" height="10" rx="2" fill="#ffd27a"/>${T(98, 90, 9, 900, "#fff", "EBT")}${T(80, 101, 6.5, 700, "#fff", "monthly benefit")}</g>`;
    else if (key === "wic") o += `<g class="dg-hl"><rect x="36" y="66" width="88" height="40" rx="8" fill="${HL}"/>${T(80, 84, 10, 900, "#fff", "WIC")}${T(80, 97, 6.5, 700, "#fff", "women · infants · under 5")}</g>`;
    else o += `<g class="dg-hl"><rect x="16" y="70" width="128" height="34" rx="8" fill="${HL}"/>${T(80, 84, 7.5, 800, "#fff", "Food runs out before")}${T(80, 95, 7.5, 800, "#fff", "money to buy more?")}</g>`;
    return o + dg.tag(80, 146, { snap: "SNAP", wic: "WIC", foodsec: "Hunger Vital Sign" }[key]);
  }

  /* ---------- culture: plate with a faith/feast marker ---------- */
  function culture(it, key) {
    let o = `<ellipse cx="80" cy="84" rx="52" ry="40" fill="#fff" stroke="#c9d2da" stroke-width="2"/><ellipse cx="80" cy="84" rx="38" ry="28" fill="#f6f9fb" stroke="#e1e7ec"/>`;
    const ban = (x, y, label) => `<g><circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="${HL}" stroke-width="2.4"/><path d="M${x - 9} ${y - 9} L${x + 9} ${y + 9}" stroke="${HL}" stroke-width="2.4"/>${T(x, y + 3, 6.5, 900, INK, label)}</g>`;
    if (key === "halal") o += ban(60, 80, "pork") + ban(100, 80, "alcohol");
    else if (key === "kosher") o += ban(50, 82, "pork") + ban(84, 66, "shellfish").replace('r="13"', 'r="15"') + `<g><rect x="78" y="90" width="34" height="16" rx="8" fill="#fff" stroke="${HL}" stroke-width="2"/>${T(95, 101, 6.5, 900, INK, "meat | milk")}</g>`;
    else if (key === "ramadan") o += `<path d="M66 44 A22 22 0 1 0 92 76 A17 17 0 1 1 66 44Z" fill="#f2c27a" class="dg-hl"/><circle cx="104" cy="56" r="2" fill="#f2c27a"/><circle cx="58" cy="104" r="2" fill="#f2c27a"/>`
      + `<rect x="10" y="12" width="56" height="16" rx="8" fill="#1B2430"/>${T(38, 23, 7, 800, "#fff", "suhoor: dawn")}<rect x="94" y="12" width="56" height="16" rx="8" fill="#1B2430"/>${T(122, 23, 7, 800, "#fff", "iftar: sunset")}`;
    else if (key === "hindu") o += `<ellipse cx="66" cy="84" rx="16" ry="12" fill="#f2c27a"/>${T(66, 87, 7, 800, INK, "dal")}<ellipse cx="96" cy="78" rx="14" ry="10" fill="#fff" stroke="#c9d2da"/>${T(96, 81, 6.5, 800, INK, "paneer")}<path d="M86 96 Q98 88 110 96" stroke="#4f8a2a" stroke-width="5" fill="none"/>` + ban(126, 44, "beef");
    else if (key === "lent") o += `<path d="M54 84 Q80 64 106 84 Q80 104 54 84Z" fill="#8cc7e8"/><path d="M106 84 l12 -9 v18Z" fill="#8cc7e8"/><circle cx="66" cy="81" r="2" fill="${INK}"/>` + `<rect x="10" y="12" width="60" height="16" rx="8" fill="${HL}" class="dg-hl"/>${T(40, 23, 7, 800, "#fff", "Friday: no meat")}`;
    return o + dg.tag(80, 146, { halal: "Halal", kosher: "Kosher", ramadan: "Ramadan fast", hindu: "Lacto-vegetarian", lent: "Lent" }[key]);
  }

  const NAMES = { open: "Open questions", affirm: "Affirmations", reflect: "Reflective listening", summary: "Summaries", smart: "SMART goal checklist", selfmon: "A food diary" };
  BGX.DIAGRAMS.coach = item => {
    const sp = dg.spots(item), k = sp[0];
    if (!item || !k) return dg.frame(cycle(null), "The stages of change cycle", ["#FBF6F0", "#F0E4D6"]);
    if (STAGES.some(s => s[0] === k) || k === "relapse") return dg.frame(cycle(item), "Stages of change: " + k, ["#FBF6F0", "#F0E4D6"]);
    if (OARS.some(o => o[0] === k)) return dg.frame(oars(item), NAMES[k], ["#F2F7FC", "#DCE8F4"]);
    if (SCENES[k]) return dg.frame(consult(item, k), SCENES[k].tag, ["#F2F7FC", "#DCE8F4"]);
    if (AS.some(a => a[0] === k)) return dg.frame(fiveA(item), "The 5 A's", ["#FCF8EE", "#F2E7CC"]);
    if (k === "smart") return dg.frame(smart(item), NAMES[k], ["#FCF8EE", "#F2E7CC"]);
    if (k === "selfmon") return dg.frame(diary(item), NAMES[k], ["#FCF8EE", "#F2E7CC"]);
    if (["foodsec", "snap", "wic"].indexOf(k) >= 0) return dg.frame(access(item, k), "Food access", ["#F2FAF6", "#D9EEE4"]);
    if (["halal", "kosher", "ramadan", "hindu", "lent"].indexOf(k) >= 0) return dg.frame(culture(item, k), "Faith and food", ["#F6F4FB", "#E4E0F0"]);
    return dg.frame(cycle(null), "The stages of change cycle", ["#FBF6F0", "#F0E4D6"]);
  };
})();
