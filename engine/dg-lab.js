/* BioglowRX diagram "lab" — lab equipment, safety kit, SI units, the prefix ladder and measuring ideas.
   spot: beaker · erlenmeyer · volflask · cylinder · pipette · burette · testtube · balance · bunsen · thermometer ·
         goggles · hood · eyewash · gloves · ghs · si-kg · si-m · si-K · si-mol · litre ·
         p-kilo · p-centi · p-milli · p-micro · p-nano · accuracy · precision · sigfigs · meniscus · density.
   Overview (null): a bench of glassware. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const M = (x, y, s, c, txt, a) => `<text x="${x}" y="${y}" font-family="'Chivo Mono', monospace" font-size="${s}" font-weight="700" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUTE = "#55616e", GLASS = "#eef6fa", EDGE = "#8fa6b8", LIQ = "#9fd3ec";
  const hl = on => on ? ' class="dg-hl"' : "";
  const lf = on => on ? HL : LIQ;          // liquid colour: highlight when this is the item
  const ticks = (x, y0, n, step, len) => Array.from({ length: n }, (_, i) => `<path d="M${x} ${y0 + i * step} h${i % 5 ? len : len * 1.8}" stroke="${MUTE}" stroke-width=".8"/>`).join("");

  /* ---------- glassware (each draws at a given origin so the overview can reuse them) ---------- */
  const G = {
    beaker: (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-24 -30 V26 Q-24 32 -18 32 H18 Q24 32 24 26 V-30" fill="${GLASS}" stroke="${EDGE}" stroke-width="2"/>
      <path d="M-22.5 0 V26 Q-22.5 30.5 -18 30.5 H18 Q22.5 30.5 22.5 26 V0Z" fill="${lf(on)}"${hl(on)}/>
      <path d="M-24 -30 Q-29 -33 -30 -36 M24 -30 H26" stroke="${EDGE}" stroke-width="2" fill="none"/>
      ${[-18, -8, 2, 12].map(t => `<path d="M10 ${t} h10" stroke="${MUTE}" stroke-width=".9"/>`).join("")}</g>`,
    erlenmeyer: (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-7 -34 V-12 L-28 26 Q-30 32 -24 32 H24 Q30 32 28 26 L7 -12 V-34" fill="${GLASS}" stroke="${EDGE}" stroke-width="2"/>
      <path d="M-17.6 8 L-26.5 25.5 Q-28 30.5 -23 30.5 H23 Q28 30.5 26.5 25.5 L17.6 8Z" fill="${lf(on)}"${hl(on)}/>
      <path d="M-9 -34 H9" stroke="${EDGE}" stroke-width="2.4"/></g>`,
    volflask: (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-4 -40 V-4 Q-24 0 -24 16 Q-24 32 0 32 Q24 32 24 16 Q24 0 4 -4 V-40" fill="${GLASS}" stroke="${EDGE}" stroke-width="2"/>
      <path d="M-2.6 -22 V-3 Q-22.5 1 -22.5 16 Q-22.5 30.5 0 30.5 Q22.5 30.5 22.5 16 Q22.5 1 2.6 -3 V-22Z" fill="${lf(on)}"${hl(on)}/>
      <path d="M-7 -22 H7" stroke="${on ? INK : "#d0453b"}" stroke-width="1.6"/><rect x="-5" y="-46" width="10" height="6" rx="2" fill="#5f6b78"/></g>`,
    cylinder: (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-9" y="-44" width="18" height="78" rx="2" fill="${GLASS}" stroke="${EDGE}" stroke-width="2"/>
      <rect x="-7.6" y="-8" width="15.2" height="40.5" fill="${lf(on)}"${hl(on)}/>
      ${ticks(-9, -38, 15, 4.8, 4)}<path d="M-20 34 H20" stroke="${EDGE}" stroke-width="4" stroke-linecap="round"/><path d="M-9 -44 l-4 -3" stroke="${EDGE}" stroke-width="2"/></g>`,
    pipette: (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-2 -50 V-14 M2 -50 V-14" stroke="${EDGE}" stroke-width="1.6"/>
      <ellipse cx="0" cy="0" rx="8" ry="15" fill="${lf(on)}" stroke="${EDGE}" stroke-width="2"${hl(on)}/>
      <path d="M-2 15 V44 L0 50 L2 44 V15" fill="${lf(on)}" stroke="${EDGE}" stroke-width="1.6"/>
      <path d="M-6 -34 H6" stroke="#d0453b" stroke-width="1.6"/><rect x="-2" y="-34" width="4" height="20" fill="${lf(on)}"/></g>`,
    burette: (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-5" y="-56" width="10" height="94" rx="1.5" fill="${GLASS}" stroke="${EDGE}" stroke-width="1.8"/>
      <rect x="-3.6" y="-40" width="7.2" height="77" fill="${lf(on)}"${hl(on)}/>${ticks(-5, -52, 18, 5, 3)}
      <rect x="-9" y="38" width="18" height="6" rx="2" fill="#5f6b78"/><path d="M9 41 h6" stroke="#5f6b78" stroke-width="3" stroke-linecap="round"/>
      <path d="M-1.6 44 V54 L0 57 L1.6 54 V44" fill="${GLASS}" stroke="${EDGE}" stroke-width="1.2"/></g>`,
    testtube: (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-8 -40 V24 A8 8 0 0 0 8 24 V-40" fill="${GLASS}" stroke="${EDGE}" stroke-width="2"/>
      <path d="M-6.6 4 V24 A6.6 6.6 0 0 0 6.6 24 V4Z" fill="${lf(on)}"${hl(on)}/><path d="M-10 -40 H10" stroke="${EDGE}" stroke-width="2.4"/></g>`
  };

  /* ---------- whole scenes, 160×160 ---------- */
  const glassScene = (k, note, note2) => G[k](80, 72, 1.25, true) + T(80, 140, 8.5, 700, INK, note) + (note2 ? T(80, 151, 7.5, 600, MUTE, note2) : "");
  const S = {
    beaker: () => glassScene("beaker", "rough volume marks", "hold · mix · heat"),
    erlenmeyer: () => glassScene("erlenmeyer", "cone: swirl without spills", "sits under the burette"),
    volflask: () => glassScene("volflask", "one line = one exact volume", "e.g. 250.0 mL"),
    cylinder: () => glassScene("cylinder", "scale up the side", "medium accuracy"),
    pipette: () => G.pipette(80, 66, 1.05, true) + T(80, 140, 8.5, 700, INK, "delivers one fixed volume") + T(80, 151, 7.5, 600, MUTE, "always use a filler"),
    burette: () => `<path d="M40 18 V128 M28 128 H70" stroke="#7a8794" stroke-width="3" stroke-linecap="round"/><path d="M40 40 H74" stroke="#7a8794" stroke-width="2.4"/>
      ${G.burette(80, 70, 1, true)}${G.erlenmeyer(80, 136, .42, false)}
      ${T(122, 24, 8, 800, INK, "0 at top")}${T(122, 34, 7.5, 600, MUTE, "reads down")}${T(124, 112, 7.5, 700, MUTE, "tap")}<path d="M114 110 H98" stroke="${MUTE}" stroke-width=".8"/>
      ${T(124, 140, 7.5, 700, INK, "volume =")}${T(124, 150, 7.5, 600, MUTE, "final − initial")}`,
    testtube: () => `${G.testtube(64, 70, 1.2, true)}<rect x="94" y="54" width="44" height="56" rx="6" fill="#fff" stroke="${EDGE}"/>
      ${T(116, 72, 7.5, 800, INK, "≤ 1/3 full")}${T(116, 84, 7.5, 600, MUTE, "if heating;")}${T(116, 96, 7.5, 600, MUTE, "point away")}
      ${T(80, 146, 8.5, 700, INK, "small-scale tests")}`,
    balance: () => `<rect x="30" y="76" width="100" height="44" rx="8" fill="#dfe6ec" stroke="${EDGE}" stroke-width="1.6"/>
      <rect x="44" y="66" width="72" height="8" rx="3" fill="#b9c5cf"/><rect x="40" y="62" width="80" height="5" rx="2" fill="#cfd8df" stroke="${EDGE}"/>
      ${G.beaker(80, 46, .42, false)}
      <g class="dg-hl"><rect x="46" y="86" width="68" height="20" rx="4" fill="#13202b" stroke="${HL}" stroke-width="2"/>${M(80, 100.5, 11, "#7CFFB2", "12.08 g")}</g>
      <rect x="98" y="110" width="22" height="7" rx="3" fill="#fff" stroke="${EDGE}"/>${T(109, 116, 5.8, 800, INK, "TARE")}
      ${T(80, 140, 8.5, 700, INK, "measures mass")}${T(80, 151, 7.5, 600, MUTE, "tare (zero) first")}`,
    bunsen: () => `<path d="M60 128 H100 L96 120 H64Z" fill="#7a8794"/><rect x="74" y="72" width="12" height="50" rx="2" fill="#a9b6c2" stroke="#7a8794"/>
      <rect x="72" y="104" width="16" height="8" rx="2" fill="#5f6b78"/><path d="M60 124 Q40 124 30 132" stroke="#c0392b" stroke-width="3" fill="none"/>
      <path d="M80 70 Q66 52 74 34 Q78 42 80 30 Q84 44 88 36 Q94 54 80 70Z" fill="#8fb8ff" class="dg-hl"/><path d="M80 68 Q73 56 80 44 Q87 56 80 68Z" fill="#3a6fe0"/>
      ${T(120, 46, 8, 800, "#3a6fe0", "air hole open")}${T(120, 56, 7.5, 600, MUTE, "blue = hot")}
      <path d="M22 44 Q14 30 20 18 Q26 30 28 22 Q32 32 22 44Z" fill="#f6c23e" opacity=".9"/>${T(26, 58, 7.5, 600, MUTE, "closed:")}${T(26, 67, 7.5, 600, MUTE, "yellow")}
      ${T(80, 148, 8.5, 700, INK, "gas flame for heating")}`,
    thermometer: () => `<rect x="72" y="18" width="16" height="100" rx="8" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
      <rect x="77" y="54" width="6" height="66" fill="${HL}" class="dg-hl"/><circle cx="80" cy="124" r="12" fill="${HL}"/>
      ${ticks(88, 28, 18, 5, 3)}${M(118, 58, 11, INK, "37 °C")}${T(118, 70, 7.5, 600, MUTE, "= 310.15 K")}
      ${T(36, 60, 7.5, 600, MUTE, "read at")}${T(36, 70, 7.5, 600, MUTE, "eye level")}${T(80, 150, 8.5, 700, INK, "measures temperature")}`,
    goggles: () => `<path d="M24 66 Q24 50 44 50 H116 Q136 50 136 66 V80 Q136 96 116 96 Q100 96 92 84 Q80 76 68 84 Q60 96 44 96 Q24 96 24 80Z" fill="${HL}" class="dg-hl"/>
      <ellipse cx="50" cy="74" rx="20" ry="15" fill="#e8f6ff"/><ellipse cx="110" cy="74" rx="20" ry="15" fill="#e8f6ff"/>
      <path d="M24 70 Q10 70 8 78 M136 70 Q150 70 152 78" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${T(80, 122, 8.5, 700, INK, "seal around the eyes")}${T(80, 134, 7.5, 600, MUTE, "on whenever chemicals are out")}`,
    hood: () => `<rect x="22" y="18" width="116" height="110" rx="6" fill="#dfe6ec" stroke="${EDGE}" stroke-width="2"/>
      <rect x="32" y="40" width="96" height="62" fill="#f6fbff" stroke="${EDGE}"/>
      <rect x="32" y="40" width="96" height="30" fill="${HL}" opacity=".35" stroke="${HL}" stroke-width="2" class="dg-hl"/>${T(80, 58, 7.5, 800, INK, "sash: keep low")}
      ${[50, 80, 110].map(x => `<path d="M${x} 96 Q${x - 6} 86 ${x} 78 Q${x + 6} 70 ${x} 62" stroke="${HL}" stroke-width="1.6" fill="none"/>`).join("")}
      <path d="M80 18 V6" stroke="${EDGE}" stroke-width="10"/><path d="M74 12 L80 4 L86 12" stroke="${INK}" stroke-width="1.6" fill="none"/>
      ${G.beaker(80, 96, .22, false)}${T(80, 146, 8.5, 700, INK, "pulls fumes up and away")}`,
    eyewash: () => `<path d="M80 128 V86" stroke="#7a8794" stroke-width="6"/><path d="M50 86 H110" stroke="#7a8794" stroke-width="6" stroke-linecap="round"/>
      <rect x="44" y="72" width="16" height="12" rx="3" fill="#2e9e5b"/><rect x="100" y="72" width="16" height="12" rx="3" fill="#2e9e5b"/>
      <g class="dg-hl"><path d="M52 72 Q50 52 60 40" stroke="${HL}" stroke-width="3" fill="none"/><path d="M108 72 Q110 52 100 40" stroke="${HL}" stroke-width="3" fill="none"/></g>
      <ellipse cx="80" cy="34" rx="22" ry="16" fill="#f2c7a5"/><ellipse cx="72" cy="34" rx="4" ry="2.4" fill="#fff"/><ellipse cx="88" cy="34" rx="4" ry="2.4" fill="#fff"/>
      ${T(80, 146, 8.5, 700, INK, "rinse 15 minutes or more")}`,
    gloves: () => `<path d="M50 120 V80 Q50 74 54 74 Q58 74 58 80 V60 Q58 54 62 54 Q66 54 66 60 V54 Q66 48 70 48 Q74 48 74 54 V58 Q74 52 78 52 Q82 52 82 58 V90 L88 82 Q93 77 97 82 Q99 85 96 90 L84 112 Q80 120 70 120Z" fill="${HL}" class="dg-hl"/>
      <path d="M100 40 L116 46 L118 120 H140 L138 46 L150 40" fill="#fff" stroke="${EDGE}" stroke-width="2"/><path d="M128 50 V118" stroke="${EDGE}"/>
      ${[64, 82, 100].map(y => `<circle cx="125" cy="${y}" r="1.6" fill="${MUTE}"/>`).join("")}${T(80, 146, 8.5, 700, INK, "barrier for skin and clothes")}`,
    ghs: () => {
      const d = (x, y, inner, on) => `<g transform="translate(${x} ${y})"><path d="M0 -22 L22 0 L0 22 L-22 0Z" fill="#fff" stroke="${on ? HL : "#e0323a"}" stroke-width="${on ? 4 : 3}"${hl(on)}/>${inner}</g>`;
      return d(48, 46, `<path d="M0 10 Q-9 2 -3 -10 Q-1 -2 2 -6 Q8 2 0 10Z" fill="${INK}"/>`, true) +
        d(112, 46, `<circle cx="0" cy="-3" r="7" fill="${INK}"/><path d="M-8 8 L8 14 M8 8 L-8 14" stroke="${INK}" stroke-width="2"/>`, true) +
        d(48, 104, `<path d="M-10 -6 h6 v6 M4 -6 h6 v6" stroke="${INK}" stroke-width="2" fill="none"/><path d="M-12 8 H12" stroke="${INK}" stroke-width="3"/>`, true) +
        d(112, 104, `<path d="M0 -10 V3" stroke="${INK}" stroke-width="3.4"/><circle cx="0" cy="9" r="2" fill="${INK}"/>`, true) +
        T(48, 80, 7.5, 700, MUTE, "flammable") + T(112, 80, 7.5, 700, MUTE, "toxic") + T(48, 138, 7.5, 700, MUTE, "corrosive") + T(112, 138, 7.5, 700, MUTE, "irritant") +
        T(80, 153, 7.5, 600, MUTE, "GHS hazard pictograms");
    },
    litre: () => `<g transform="translate(40 26)"><path d="M0 24 L24 0 H96 L72 24Z" fill="#cde7f5" stroke="${EDGE}"/><path d="M72 24 L96 0 V72 L72 96Z" fill="#a9d4ec" stroke="${EDGE}"/>
      <rect x="0" y="24" width="72" height="72" fill="#e5f3fb" stroke="${EDGE}"/>
      <rect x="0" y="84" width="12" height="12" fill="${HL}" class="dg-hl"/></g>
      ${T(76, 82, 10, 800, INK, "1 L = 1 dm³")}${T(76, 95, 8, 700, MUTE, "10 cm each side")}
      ${T(62, 142, 8.5, 800, HL, "1 cm³ = 1 mL", "start")}<path d="M58 139 L48 124" stroke="${HL}" stroke-width="1.2"/>
      ${T(80, 154, 7.5, 600, MUTE, "1 L = 1,000 mL = 1,000 cm³")}`,
    meniscus: () => `<rect x="44" y="14" width="40" height="124" fill="${GLASS}" stroke="${EDGE}" stroke-width="2"/>
      <path d="M45.5 62 Q64 82 82.5 62 V136.5 H45.5Z" fill="${LIQ}"/>
      ${[40, 52, 64, 76, 88, 100].map((y, i) => `<path d="M84 ${y} h${i % 2 ? 6 : 10}" stroke="${MUTE}"/>`).join("")}
      <path d="M30 71.8 H120" stroke="${HL}" stroke-width="1.6" stroke-dasharray="4 3" class="dg-hl"/>
      <g transform="translate(130 72)"><path d="M-12 0 Q0 -10 12 0 Q0 10 -12 0Z" fill="#fff" stroke="${INK}" stroke-width="1.4"/><circle r="4" fill="${INK}"/></g>
      ${T(124, 96, 7.5, 700, INK, "eye level")}${T(124, 52, 7.5, 600, MUTE, "read the")}${T(124, 61, 7.5, 600, MUTE, "bottom")}
      ${T(80, 152, 8.5, 700, INK, "bottom of the curve")}`,
    density: () => `<path d="M80 18 L136 116 H24Z" fill="#fff4d6" stroke="#c9902a" stroke-width="2"/><path d="M42 84 H118 M80 84 V116" stroke="#c9902a" stroke-width="2"/>
      <g class="dg-hl">${T(80, 70, 22, 900, HL, "m")}</g>${T(61, 108, 18, 900, INK, "d")}${T(99, 108, 18, 900, INK, "V")}
      ${T(80, 136, 9, 800, INK, "d = m ÷ V")}${T(80, 149, 7.5, 600, MUTE, "m = d × V · V = m ÷ d")}`,
    sigfigs: () => `${["0", ".", "0", "2", "5", "0"].map((c, i) => { const sig = i >= 3; return `<rect x="${20 + i * 21}" y="40" width="18" height="30" rx="4" fill="${sig ? HL : "#fff"}" stroke="${sig ? HL : EDGE}"${hl(sig && i === 3)}/>` + M(29 + i * 21, 62, 16, sig ? "#fff" : MUTE, c); }).join("")}
      ${T(80, 92, 9, 800, INK, "0.0250 → 3 significant figures")}${T(80, 112, 7.5, 600, MUTE, "leading zeros: never count")}${T(80, 123, 7.5, 600, MUTE, "zeros between digits: count")}
      ${T(80, 134, 7.5, 600, MUTE, "trailing zeros after a point: count")}`
  };

  /* SI base unit cards */
  const SI = [["kg", "mass"], ["m", "length"], ["s", "time"], ["K", "temp."], ["mol", "amount"], ["A", "current"], ["cd", "light"]];
  const siScene = sym => SI.map(([u, q], i) => { const on = u === sym, x = 14 + (i % 4) * 34 + (i >= 4 ? 17 : 0), y = i < 4 ? 30 : 82;
    return `<rect x="${x}" y="${y}" width="30" height="40" rx="6" fill="${on ? HL : "#fff"}" stroke="${on ? HL : EDGE}"${hl(on)}/>` + M(x + 15, y + 21, u.length > 2 ? 10 : 13, on ? "#fff" : INK, u) + T(x + 15, y + 33, 7, 700, on ? "#fff" : MUTE, q); }).join("")
    + T(80, 144, 8.5, 700, INK, "the seven SI base units");

  /* prefix ladder */
  const LAD = [["p-kilo", "kilo", "k", "10³"], [null, "base", "g · m · L", "1"], ["p-centi", "centi", "c", "10⁻²"], ["p-milli", "milli", "m", "10⁻³"], ["p-micro", "micro", "µ", "10⁻⁶"], ["p-nano", "nano", "n", "10⁻⁹"]];
  const ladder = sp => LAD.map(([id, n, s, f], i) => { const on = id && id === sp, y = 12 + i * 22;
    return `<rect x="22" y="${y}" width="116" height="18" rx="5" fill="${on ? HL : i === 1 ? "#dfe6ec" : "#fff"}" stroke="${on ? HL : EDGE}"${hl(on)}/>` +
      T(32, y + 12.5, 8.5, 800, on ? "#fff" : INK, n, "start") + M(92, y + 12.5, 8.5, on ? "#fff" : "#2f6fb8", s) + M(130, y + 12.5, 8.5, on ? "#fff" : MUTE, f, "end"); }).join("")
    + T(80, 150, 7.5, 600, MUTE, "down a rung: smaller unit, bigger number");

  /* targets for accuracy / precision */
  const target = (cx, cy, pts, on, lab) => `<g><circle cx="${cx}" cy="${cy}" r="24" fill="#fff" stroke="${on ? HL : EDGE}" stroke-width="${on ? 3 : 1.2}"${hl(on)}/><circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${EDGE}"/><circle cx="${cx}" cy="${cy}" r="6" fill="#ffd1e1"/>
    ${pts.map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="2.4" fill="${INK}"/>`).join("")}</g>` + T(cx, cy + 34, 7, 700, MUTE, lab);
  const targets = sp => target(44, 38, [[0, 1], [2, -1], [-1, -2], [1, 2]], true, "accurate + precise") +
    target(116, 38, [[11, -11], [13, -9], [10, -13], [14, -12]], sp === "precision", "precise only") +
    target(44, 106, [[-12, 6], [10, -12], [4, 14], [-6, -10]], sp === "accuracy", "accurate on average") +
    target(116, 106, [[-14, 8], [12, 10], [-4, -16], [16, -4]], false, "neither");

  const NAMES = { beaker: "Beaker", erlenmeyer: "Erlenmeyer (conical) flask", volflask: "Volumetric flask", cylinder: "Graduated cylinder", pipette: "Volumetric pipette",
    burette: "Burette on a stand", testtube: "Test tube", balance: "Electronic balance", bunsen: "Bunsen burner", thermometer: "Thermometer", goggles: "Safety goggles",
    hood: "Fume hood", eyewash: "Eyewash station", gloves: "Gloves and lab coat", ghs: "Hazard pictograms", litre: "Litre and cubic centimetre", meniscus: "Reading a meniscus",
    density: "Density triangle", sigfigs: "Significant figures", accuracy: "Accuracy and precision", precision: "Accuracy and precision" };

  BGX.DIAGRAMS.lab = item => {
    const sp = dg.spots(item)[0];
    if (!item || !sp) {
      const bench = `<rect x="8" y="122" width="144" height="8" rx="3" fill="#c9b79c"/>` +
        G.beaker(30, 102, .55, false) + G.erlenmeyer(64, 102, .55, false) + G.volflask(98, 100, .58, false) + G.cylinder(130, 99, .55, false) +
        T(80, 146, 8.5, 700, INK, "rough ← → exact");
      return dg.frame(bench.replace(/ class="dg-hl"/g, ""), "Lab glassware: beaker, conical flask, volumetric flask, graduated cylinder");
    }
    if (S[sp]) return dg.frame(S[sp](), NAMES[sp]);
    if (sp.indexOf("si-") === 0) return dg.frame(siScene(sp.slice(3)), "SI base units");
    if (sp.indexOf("p-") === 0) return dg.frame(ladder(sp), "Metric prefix ladder");
    if (sp === "accuracy" || sp === "precision") return dg.frame(targets(sp), NAMES[sp]);
    return dg.frame("", item.name);
  };
})();
