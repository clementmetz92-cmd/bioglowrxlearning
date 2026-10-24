/* BioglowRX diagram "thermo" — energy changes in chemical reactions.
   Everyday changes (item.spot): flame · cell · beaker · freeze · condense · warmer · frost (heat out)
                                 melt · sweat · leaf · coldpack · oven · dryice (heat in)
   Terms: system · surr · dh · ea · state · eqn · spec · cap · qmc · cup · bomb · hess · joule
   Overview (null): exothermic and endothermic energy profiles side by side. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const INK = "#1B2430", MUT = "#55616e", HOT = "#e8663c", COLD = "#3a86d1";
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const arrow = (x1, y1, x2, y2, c, w, cls) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 4 + w;
    const p1 = [x2 - h * Math.cos(a - .5), y2 - h * Math.sin(a - .5)], p2 = [x2 - h * Math.cos(a + .5), y2 - h * Math.sin(a + .5)];
    return `<g${cls ? ' class="dg-hl"' : ""}><path d="M${x1} ${y1} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  /* heat arrows around a centre: out = exothermic, in = endothermic */
  const heat = (out, cx, cy) => {
    let s = "";
    [-150, -30, 30, 150, 0, 180].forEach(d => {
      const a = d * Math.PI / 180, r1 = out ? 36 : 56, r2 = out ? 54 : 38;
      s += arrow(+(cx + Math.cos(a) * r1).toFixed(1), +(cy + Math.sin(a) * r1).toFixed(1), cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, HL, 2.6, true);
    });
    return s;
  };

  /* ---------- everyday objects, each centred on (80, 74), radius about 30 ---------- */
  const flake = (cx, cy, r, c, w) => [0, 60, 120].map(d => { const a = d * Math.PI / 180, dx = Math.cos(a) * r, dy = Math.sin(a) * r;
    return `<path d="M${(cx - dx).toFixed(1)} ${(cy - dy).toFixed(1)} L${(cx + dx).toFixed(1)} ${(cy + dy).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`; }).join("");
  const cube = (x, y, s, op) => `<g opacity="${op || 1}"><path d="M${x} ${y + s * .3} L${x + s * .5} ${y} L${x + s * 1.2} ${y} L${x + s * .7} ${y + s * .3}Z" fill="#eaf6ff" stroke="#8fbfe0"/><rect x="${x}" y="${y + s * .3}" width="${s * .7}" height="${s * .7}" fill="#cfe9fb" stroke="#8fbfe0"/><path d="M${x + s * .7} ${y + s * .3} L${x + s * 1.2} ${y} V${y + s * .7} L${x + s * .7} ${y + s}Z" fill="#b6dcf5" stroke="#8fbfe0"/></g>`;
  const drop = (x, y, s, c) => `<path d="M${x} ${y - 6 * s} Q${x + 5 * s} ${y + 1 * s} ${x} ${y + 3 * s} Q${x - 5 * s} ${y + 1 * s} ${x} ${y - 6 * s}Z" fill="${c || "#7cc0ef"}"/>`;
  const OBJ = {
    flame: () => `<rect x="60" y="92" width="40" height="8" rx="3" fill="#5f6b78"/><rect x="74" y="84" width="12" height="9" fill="#8a96a3"/>
      <path d="M80 46 C94 62 96 72 90 82 C86 88 74 88 70 82 C64 72 68 60 80 46Z" fill="#ff9a3c"/><path d="M80 60 C87 70 87 76 84 81 C82 84 78 84 76 81 C73 76 74 70 80 60Z" fill="#4f8ef7"/>`,
    cell: () => `<ellipse cx="80" cy="74" rx="30" ry="18" fill="#f9d7b8" stroke="#d98a5a" stroke-width="2"/>
      <path d="M56 74 q6 -10 12 0 t12 0 t12 0 t12 0" fill="none" stroke="#d98a5a" stroke-width="2"/>${T(80, 104, 7.5, 700, MUT, "glucose + O₂")}`,
    beaker: () => `<path d="M60 50 V96 Q60 100 64 100 H96 Q100 100 100 96 V50" fill="#eef6fb" stroke="#8fa6b8" stroke-width="2"/><rect x="61" y="70" width="38" height="29" fill="#bfe3d9"/>
      <rect x="90" y="40" width="5" height="50" rx="2.5" fill="#fff" stroke="#8fa6b8"/><rect x="91" y="62" width="3" height="27" fill="#e2453c"/>${T(73, 88, 7, 800, INK, "H⁺+OH⁻")}`,
    freeze: () => drop(62, 78, 2, "#7cc0ef") + `<path d="M74 76 h10" stroke="${MUT}" stroke-width="2"/><path d="M82 72 l4 4 l-4 4" fill="none" stroke="${MUT}" stroke-width="2"/>` + cube(88, 62, 24) + T(80, 104, 8, 800, INK, "0 °C"),
    melt: () => cube(54, 56, 30) + `<ellipse cx="78" cy="94" rx="26" ry="5" fill="#9fd2f2"/>` + drop(102, 84, 1.2) + T(80, 108, 8, 800, INK, "0 °C"),
    condense: () => `<rect x="54" y="46" width="52" height="56" rx="4" fill="#e6f1f8" stroke="#8fa6b8" stroke-width="2"/>` +
      [[64, 58], [80, 66], [96, 56], [70, 80], [92, 84], [80, 94]].map(([x, y]) => drop(x, y, .9, "#5aa9e0")).join(""),
    warmer: () => `<rect x="56" y="52" width="48" height="44" rx="10" fill="#f4e2c8" stroke="#c99a5a" stroke-width="2"/>` + T(80, 72, 9, 900, "#8a5a1c", "Fe") + T(80, 85, 7, 700, "#8a5a1c", "+ O₂ → rust"),
    frost: () => flake(80, 74, 22, "#8fc6ef", 3) + flake(80, 74, 10, "#cfe9fb", 2),
    sweat: () => `<path d="M48 96 Q80 86 112 96 V104 H48Z" fill="#f4c9ae" stroke="#d9a98c"/>` + [[62, 88], [80, 84], [98, 88]].map(([x, y]) => drop(x, y, 1, "#7cc0ef")).join("") +
      [64, 82, 100].map(x => `<path d="M${x} 74 q-4 -6 0 -12 q4 -6 0 -12" fill="none" stroke="#9fb3c4" stroke-width="1.6"/>`).join(""),
    leaf: () => `<path d="M58 96 C56 66 76 50 104 52 C104 80 88 98 58 96Z" fill="#6fbf5a" stroke="#3f8a2a" stroke-width="2"/><path d="M58 96 L96 60" stroke="#3f8a2a" stroke-width="1.6"/>`,
    coldpack: () => `<rect x="54" y="50" width="52" height="46" rx="8" fill="#e3f1fb" stroke="#6aa6d6" stroke-width="2"/>` + flake(80, 66, 9, COLD, 2) + T(80, 89, 7.5, 800, INK, "NH₄NO₃"),
    oven: () => `<rect x="52" y="48" width="56" height="52" rx="5" fill="#d9dfe5" stroke="#8a96a3" stroke-width="2"/><rect x="58" y="58" width="44" height="34" rx="3" fill="#3b2a1e"/>
      <path d="M66 86 h28 v-8 q-14 -10 -28 0Z" fill="#e8b46a"/>${T(80, 56, 7, 700, INK, "NaHCO₃")}`,
    dryice: () => `<rect x="58" y="78" width="44" height="20" rx="3" fill="#f4f8fb" stroke="#9fb3c4" stroke-width="2"/>` +
      [64, 80, 96].map(x => `<path d="M${x} 76 q-6 -8 0 -14 q6 -6 0 -14" fill="none" stroke="#b9c9d6" stroke-width="2.4"/>`).join("") + T(80, 92, 7.5, 800, INK, "CO₂(s)")
  };
  const NAMES = { flame: "Combustion", cell: "Respiration", beaker: "Neutralisation", freeze: "Freezing", condense: "Condensation", warmer: "Hand warmer", frost: "Deposition",
    melt: "Melting", sweat: "Evaporation", leaf: "Photosynthesis", coldpack: "Cold pack", oven: "Decomposition", dryice: "Sublimation" };
  const OUT = { flame: 1, cell: 1, beaker: 1, freeze: 1, condense: 1, warmer: 1, frost: 1 };
  const LEAF_SUN = `<circle cx="128" cy="34" r="9" fill="#ffd34d"/>`;
  function objectScene(sp) {
    const out = !!OUT[sp];
    const inner = (sp === "leaf" ? LEAF_SUN : "") + OBJ[sp]() + heat(out, 80, 74) +
      dg.tag(80, 18, NAMES[sp]) + dg.tag(80, 146, out ? "Heat out · ΔH < 0" : "Heat in · ΔH > 0");
    return dg.frame(inner, `${NAMES[sp]}: ${out ? "exothermic, releases heat" : "endothermic, absorbs heat"}`, out ? ["#FFF6F0", "#FBE1D3"] : ["#F2F8FD", "#DAEAF7"]);
  }

  /* ---------- energy profile diagram ---------- */
  function profile(exo, hl) {
    const R = exo ? 66 : 106, P = exo ? 106 : 66, PK = 38;
    const curve = `M24 ${R} H54 C66 ${R} 70 ${PK} 80 ${PK} C90 ${PK} 92 ${P} 104 ${P} H132`;
    const hDH = hl === "dh", hEA = hl === "ea";
    return `<path d="M18 132 V26" stroke="${MUT}" stroke-width="1.4"/><path d="M15 30 L18 24 L21 30" fill="none" stroke="${MUT}" stroke-width="1.4"/>
      <path d="M18 132 H146" stroke="${MUT}" stroke-width="1.4"/><path d="M142 129 L148 132 L142 135" fill="none" stroke="${MUT}" stroke-width="1.4"/>
      <text x="12" y="80" font-family="Chivo, sans-serif" font-size="7.5" font-weight="700" fill="${MUT}" text-anchor="middle" transform="rotate(-90 12 80)">Energy</text>
      ${T(84, 143, 7.5, 700, MUT, "Reaction progress")}
      <path d="${curve}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M54 ${R} H146" stroke="${MUT}" stroke-width="1" stroke-dasharray="3 3"/><path d="M46 ${PK} H76" stroke="${MUT}" stroke-width="1" stroke-dasharray="3 3"/>
      ${T(40, R + 12, 7.5, 700, INK, "Reactants")}${T(118, P + 12, 7.5, 700, INK, "Products")}
      ${arrow(140, R, 140, P, hDH ? HL : (exo ? HOT : COLD), hDH ? 2.6 : 1.8, hDH)}${T(127, (R + P) / 2 + 3, 8.5, 800, hDH ? HL : INK, "ΔH")}
      ${arrow(50, R, 50, PK + 1, hEA ? HL : MUT, hEA ? 2.6 : 1.4, hEA)}${T(37, (R + PK) / 2 + 3, 8.5, 800, hEA ? HL : INK, "Ea")}`;
  }
  /* mini profile (no text) for the overview */
  const mini = (x, exo) => { const R = exo ? 54 : 94, P = exo ? 94 : 54;
    return `<path d="M${x} 112 V36 M${x} 112 H${x + 64}" stroke="${MUT}" stroke-width="1.2"/>
      <path d="M${x + 4} ${R} H${x + 18} C${x + 26} ${R} ${x + 27} 40 ${x + 33} 40 C${x + 39} 40 ${x + 40} ${P} ${x + 48} ${P} H${x + 62}" fill="none" stroke="${INK}" stroke-width="2.2"/>
      ${arrow(x + 58, R, x + 58, P, exo ? HOT : COLD, 2.2)}`; };

  /* ---------- calorimeters and measuring ---------- */
  const thermo = (x, y, h, lvl, hl) => `<rect x="${x - 3}" y="${y}" width="6" height="${h}" rx="3" fill="#fff" stroke="#8fa6b8"/><circle cx="${x}" cy="${y + h + 3}" r="5" fill="${hl ? HL : "#e2453c"}"${hl ? ' class="dg-hl"' : ""}/><rect x="${x - 1.4}" y="${y + h - lvl}" width="2.8" height="${lvl + 2}" fill="${hl ? HL : "#e2453c"}"/>`;
  const SC = {
    system: hl => `<rect x="14" y="30" width="132" height="100" rx="10" fill="${hl === "surr" ? "#ffd1e1" : "#eef3f6"}" stroke="${hl === "surr" ? HL : "#9fb3c4"}" stroke-width="${hl === "surr" ? 2.4 : 1.2}" stroke-dasharray="5 3"${hl === "surr" ? ' class="dg-hl"' : ""}/>
      ${T(80, 44, 8, 800, hl === "surr" ? HL : MUT, "Surroundings")}
      <path d="M58 58 V110 Q58 114 62 114 H98 Q102 114 102 110 V58" fill="#fff" stroke="#8fa6b8" stroke-width="2"/>
      <rect x="59.5" y="78" width="41" height="34.5" fill="${hl === "system" ? HL : "#bfe3d9"}"${hl === "system" ? ' class="dg-hl"' : ""}/>${T(80, 99, 8, 800, hl === "system" ? "#fff" : INK, "System")}
      ${arrow(104, 90, 132, 90, HOT, 2)}${T(122, 82, 7, 700, HOT, "heat")}${T(80, 126, 7.5, 700, MUT, "system + surroundings = universe")}`,
    dh: () => profile(true, "dh"),
    ea: () => profile(true, "ea"),
    state: () => `<path d="M14 124 L54 60 L74 82 L100 36 L146 124Z" fill="#cfe0d0" stroke="#7fa884"/>
      <circle cx="30" cy="112" r="5" fill="${INK}"/>${T(30, 134, 8, 800, INK, "Start")}<circle cx="122" cy="80" r="5" fill="${INK}"/>${T(132, 70, 8, 800, INK, "End")}
      <path d="M30 112 Q60 40 98 42 Q118 46 122 80" fill="none" stroke="${MUT}" stroke-width="1.8" stroke-dasharray="4 3"/>
      <path d="M30 112 Q76 104 122 80" fill="none" stroke="${HL}" stroke-width="2.6" class="dg-hl"/>
      ${T(80, 146, 8, 700, INK, "Any route: same change in height")}`,
    eqn: () => `${T(80, 46, 8, 800, INK, "2H₂(g) + O₂(g) → 2H₂O(l)")}<g class="dg-hl"><rect x="40" y="54" width="80" height="18" rx="9" fill="${HL}"/>${T(80, 66.5, 9, 800, "#fff", "ΔH = −572 kJ")}</g>
      ${T(80, 92, 7.5, 700, MUT, "Reverse it: ΔH = +572 kJ")}${T(80, 106, 7.5, 700, MUT, "Halve it: ΔH = −286 kJ")}${T(80, 120, 7.5, 700, MUT, "Make H₂O(g) instead: less heat")}`,
    spec: () => `${[["Water", 4.184, "#7cc0ef"], ["Aluminium", 0.897, "#b9c5cf"], ["Iron", 0.449, "#9a8f86"], ["Copper", 0.385, "#d9895a"]].map(([n, c, col], i) => {
        const y = 40 + i * 24, w = c / 4.184 * 62;
        return `<rect x="56" y="${y}" width="${Math.max(w, 3).toFixed(1)}" height="14" rx="3" fill="${i === 0 ? HL : col}"${i === 0 ? ' class="dg-hl"' : ""}/>${T(52, y + 10, 7.5, 700, INK, n, "end")}${T(60 + Math.max(w, 3), y + 10, 7.5, 800, INK, String(c), "start")}`; }).join("")}
      ${T(80, 26, 8, 800, INK, "c in J/(g·°C)")}`,
    cap: () => `<path d="M30 80 V112 Q30 116 34 116 H54 Q58 116 58 112 V80" fill="#fff" stroke="#8fa6b8" stroke-width="2"/><rect x="31.5" y="92" width="25" height="22.5" fill="#9fd2f2"/>
      <path d="M72 60 V112 Q72 118 78 118 H136 Q142 118 142 112 V60" fill="#fff" stroke="#8fa6b8" stroke-width="2"/><rect x="73.5" y="70" width="67" height="46.5" fill="${HL}" opacity=".85" class="dg-hl"/>
      ${T(44, 74, 7.5, 700, INK, "cup")}${T(107, 96, 8, 800, "#fff", "bath")}${T(80, 136, 8, 800, INK, "C = m × c: more mass,")}${T(80, 147, 8, 800, INK, "bigger heat capacity")}`,
    qmc: () => `<rect x="44" y="114" width="56" height="10" rx="3" fill="#5f6b78"/><path d="M50 60 V108 Q50 112 54 112 H90 Q94 112 94 108 V60" fill="#fff" stroke="#8fa6b8" stroke-width="2"/>
      <rect x="51.5" y="76" width="41" height="34.5" fill="#9fd2f2"/>${thermo(84, 36, 60, 34, true)}${T(66, 98, 8, 800, INK, "m g")}
      ${[56, 70].map(x => `<path d="M${x} 130 q-3 4 0 8 q3 4 0 8" fill="none" stroke="${HOT}" stroke-width="1.6"/>`).join("")}
      ${T(122, 58, 8, 800, INK, "ΔT =")}${T(122, 70, 7.5, 700, INK, "T(final)")}${T(122, 81, 7.5, 700, INK, "− T(initial)")}
      ${dg.tag(80, 22, "q = m·c·ΔT")}`,
    cup: () => `<path d="M46 52 L54 122 H106 L114 52Z" fill="#fbfbf8" stroke="#b9b39a" stroke-width="2"/><path d="M52 58 L59 116 H101 L108 58Z" fill="#fff" stroke="#d6d0b8" stroke-width="1.4"/>
      <path d="M54 76 L58 114 H102 L106 76Z" fill="#bfe3d9"/><rect x="42" y="46" width="76" height="8" rx="3" fill="#d6d0b8"/>
      ${thermo(98, 22, 78, 50, true)}<path d="M62 30 V104 M57 104 H67" stroke="#5f6b78" stroke-width="2"/>
      ${T(80, 96, 7, 800, INK, "solution")}${T(80, 140, 7.5, 700, INK, "foam cups, open to air:")}${T(80, 150, 7.5, 700, INK, "constant pressure → ΔH")}`,
    bomb: () => `<rect x="24" y="40" width="112" height="84" rx="8" fill="#e8edf1" stroke="#8a96a3" stroke-width="2"/><rect x="32" y="56" width="96" height="62" rx="4" fill="#bfe0f2"/>
      <rect x="62" y="70" width="36" height="42" rx="6" fill="${HL}" class="dg-hl"/>${T(80, 95, 7.5, 800, "#fff", "steel")}
      <path d="M72 70 V30 M88 70 V30" stroke="#5f6b78" stroke-width="1.6"/>${thermo(116, 24, 70, 40, false)}<path d="M44 30 V104 M38 104 H50" stroke="#5f6b78" stroke-width="2"/>
      ${T(80, 138, 7.5, 700, INK, "sealed bomb in water:")}${T(80, 148, 7.5, 700, INK, "constant volume")}`,
    hess: () => `<path d="M30 30 H70 M30 70 H130 M90 120 H130" stroke="${INK}" stroke-width="2.2"/>
      ${T(50, 25, 8, 800, INK, "C + O₂")}${T(112, 64, 8, 800, INK, "CO + ½O₂")}${T(110, 134, 8, 800, INK, "CO₂")}
      ${arrow(40, 32, 40, 118, HL, 2.6, true)}<path d="M40 120 H90" stroke="${MUT}" stroke-width="1" stroke-dasharray="3 3"/>${T(44, 98, 8, 800, HL, "−393.5", "start")}
      ${arrow(58, 34, 80, 66, MUT, 1.6)}${T(72, 46, 7.5, 700, MUT, "−110.5", "start")}
      ${arrow(110, 72, 110, 118, MUT, 1.6)}${T(114, 100, 7.5, 700, MUT, "−283.0", "start")}
      ${T(80, 150, 7.5, 700, INK, "−110.5 + (−283.0) = −393.5 kJ")}`,
    joule: () => `<path d="M80 52 C96 40 120 48 118 76 C116 104 96 116 80 108 C64 116 44 104 42 76 C40 48 64 40 80 52Z" fill="#e2453c"/><path d="M80 52 Q82 40 90 34" stroke="#6b4226" stroke-width="2.4" fill="none"/>
      <path d="M86 40 Q98 30 106 38 Q96 46 86 40Z" fill="#6fbf5a"/>
      <g class="dg-hl"><rect x="30" y="120" width="100" height="18" rx="9" fill="${HL}"/>${T(80, 132.5, 9, 800, "#fff", "1 cal = 4.184 J")}</g>
      ${T(80, 82, 8, 800, "#fff", "1 kcal")}${T(80, 94, 8, 800, "#fff", "= 4.184 kJ")}`
  };
  const SNAMES = { system: "The system", surr: "The surroundings", dh: "Enthalpy change ΔH", ea: "Activation energy", state: "State function", eqn: "Thermochemical equation",
    spec: "Specific heat", cap: "Heat capacity", qmc: "q = m·c·ΔT", cup: "Coffee-cup calorimeter", bomb: "Bomb calorimeter", hess: "Hess's law", joule: "Joules and calories" };

  BGX.DIAGRAMS.thermo = item => {
    const sp = dg.spots(item)[0];
    if (item && OBJ[sp]) return objectScene(sp);
    if (item && sp === "surr") return dg.frame(SC.system("surr"), SNAMES.surr);
    if (item && SC[sp]) return dg.frame(SC[sp](sp), SNAMES[sp]);
    /* overview: both profiles */
    const inner = mini(12, true) + mini(88, false) +
      `<rect x="10" y="12" width="68" height="18" rx="9" fill="${HOT}"/>${T(44, 24.5, 8, 800, "#fff", "Exothermic")}` +
      `<rect x="84" y="12" width="70" height="18" rx="9" fill="${COLD}"/>${T(119, 24.5, 8, 800, "#fff", "Endothermic")}` +
      T(44, 128, 8, 800, INK, "ΔH < 0") + T(44, 140, 7.5, 600, MUT, "heat out") + T(119, 128, 8, 800, INK, "ΔH > 0") + T(119, 140, 7.5, 600, MUT, "heat in");
    return dg.frame(inner, "Energy profiles: exothermic products end lower, endothermic products end higher");
  };
})();
