/* BioglowRX diagram "galvanic" — electrochemical cells (Battery Lab, chapter 19).
   Spot ids on the Zn–Cu galvanic cell: anode cathode whole bridge solution voltmeter half notation.
   Other scenes: oxnum power plating electrolysis sacrificial rust ladder (item.rungs) she battery (item.cellParts) tooth.
   Overview (null): the Daniell cell with all parts labelled. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUT = "#55616e", GLASS = "#9fb3c4";
  const arrow = (x1, y, x2, col, cls) => { const d = x2 > x1 ? 1 : -1; return `<g${cls || ""}><path d="M${x1} ${y} H${x2 - d * 4}" stroke="${col}" stroke-width="2.2"/><path d="M${x2 - d * 6} ${y - 4} L${x2} ${y} L${x2 - d * 6} ${y + 4}Z" fill="${col}"/></g>`; };
  const varrow = (x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; return `<path d="M${x} ${y1} V${y2 - d * 4}" stroke="${col}" stroke-width="2"/><path d="M${x - 4} ${y2 - d * 6} L${x} ${y2} L${x + 4} ${y2 - d * 6}Z" fill="${col}"/>`; };
  const beaker = (x, w, sol, solOn) => `<path d="M${x} 70 V136 Q${x} 142 ${x + 6} 142 H${x + w - 6} Q${x + w} 142 ${x + w} 136 V70" fill="#fff" fill-opacity=".55" stroke="${GLASS}" stroke-width="1.6"/>
    <rect x="${x + 1.5}" y="86" width="${w - 3}" height="54.5" rx="4" fill="${solOn ? HL : sol}" fill-opacity="${solOn ? .45 : .8}"${solOn ? ' class="dg-hl"' : ""}/>`;

  /* ---------- the Zn–Cu galvanic cell ---------- */
  function cell(sp, opts) {
    const o = opts || {}, on = id => sp.indexOf(id) >= 0;
    const left = o.left || { m: "Zn", ion: "Zn²⁺", metal: "#a9b3bd", sol: "#e6ebef" };
    const right = o.right || { m: "Cu", ion: "Cu²⁺", metal: "#c9753d", sol: "#9fd0f0" };
    let s = beaker(12, 58, left.sol, on("solution")) + beaker(90, 58, right.sol, on("solution"));
    // salt bridge
    const bOn = on("bridge");
    s += `<path d="M56 112 V62 Q56 54 64 54 H96 Q104 54 104 62 V112" fill="none" stroke="${bOn ? HL : "#e9dcc0"}" stroke-width="9"${bOn ? ' class="dg-hl"' : ""}/>
      <path d="M56 112 V62 Q56 54 64 54 H96 Q104 54 104 62 V112" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>`;
    s += T(80, 66, 7, 800, bOn ? HL : "#9a7b3a", "salt bridge");
    // electrodes
    const elec = (x, id, m, col) => { const h = on(id); return `<rect x="${x}" y="40" width="11" height="90" rx="2" fill="${h ? HL : col}" stroke="${BGX.shade(h ? HL : col, -.3)}"${h ? ' class="dg-hl"' : ""}/>` + T(x + 5.5, 124, 7.5, 900, "#fff", m); };
    s += elec(30, "anode", left.m, left.metal) + elec(119, "cathode", right.m, right.metal);
    // wire + meter or power supply
    s += `<path d="M35.5 40 V26 H66 M94 26 H124.5 V40" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
    if (o.power) {
      const pOn = on("power");
      s += `<g${pOn ? ' class="dg-hl"' : ""}><rect x="64" y="14" width="32" height="24" rx="4" fill="${pOn ? HL : "#f4d36a"}" stroke="${INK}"/></g>` + T(73, 30, 10, 900, INK, "+") + T(87, 30, 10, 900, INK, "−");
    } else {
      const vOn = on("voltmeter");
      s += `<circle cx="80" cy="26" r="13" fill="${vOn ? HL : "#fff"}" stroke="${INK}" stroke-width="1.4"${vOn ? ' class="dg-hl"' : ""}/>` + T(80, 25, 7, 900, vOn ? "#fff" : INK, o.volts || "1.10") + T(80, 33, 6.5, 800, vOn ? "#fff" : MUT, "V");
    }
    // electron flow
    const eOn = on("whole") || on("anode") || on("cathode");
    const eCol = eOn ? HL : "#2f6fb8";
    s += o.power ? arrow(36, 10, 60, eCol) + T(32, 13, 8, 900, eCol, "e⁻", "end") + arrow(100, 10, 124, eCol) : arrow(46, 12, 66, eCol, eOn ? ' class="dg-hl"' : "") + T(42, 15, 8, 900, eCol, "e⁻", "end") + arrow(96, 12, 116, eCol);
    // ions in solution
    s += T(18, 104, 7, 800, MUT, left.ion, "start") + T(142, 104, 7, 800, "#1f5f8f", right.ion, "end");
    if (on("anode")) s += varrow(46, 112, 132, HL);
    if (on("cathode")) s += varrow(114, 132, 112, HL);
    // bottom labels
    if (on("half")) {
      s += `<g class="dg-hl"><rect x="6" y="143" width="72" height="13" rx="6.5" fill="${HL}"/><rect x="82" y="143" width="72" height="13" rx="6.5" fill="${HL}"/></g>`
        + T(42, 152.5, 6.6, 800, "#fff", o.h1 || "Zn → Zn²⁺ + 2e⁻") + T(118, 152.5, 6.6, 800, "#fff", o.h2 || "Cu²⁺ + 2e⁻ → Cu");
    } else if (on("notation")) {
      s += `<g class="dg-hl"><rect x="20" y="143" width="120" height="14" rx="7" fill="${HL}"/></g>` + T(80, 153, 7.6, 800, "#fff", "Zn | Zn²⁺ || Cu²⁺ | Cu");
    } else {
      const aOn = on("anode"), cOn = on("cathode");
      const lab = (x, txt, h) => h ? `<rect x="${x - 34}" y="143" width="68" height="14" rx="7" fill="${HL}" class="dg-hl"/>` + T(x, 153, 8, 800, "#fff", txt) : T(x, 153, 8, 800, INK, txt);
      s += lab(41, o.power ? "Anode (+)" : "Anode (−)", aOn) + lab(119, o.power ? "Cathode (−)" : "Cathode (+)", cOn);
    }
    return s;
  }

  /* ---------- other scenes ---------- */
  const S = {
    oxnum: () => `${T(80, 22, 9, 800, INK, "Oxidation numbers")}
      <rect x="14" y="34" width="132" height="44" rx="10" fill="#fde3d9"/><rect x="14" y="88" width="132" height="44" rx="10" fill="#dceefb"/>
      ${T(38, 61, 13, 900, INK, "Zn")}${T(38, 72, 7.5, 800, MUT, "0")}${arrow(54, 57, 86, INK)}${T(108, 61, 13, 900, INK, "Zn²⁺")}${T(108, 72, 7.5, 800, MUT, "+2")}
      <g class="dg-hl"><rect x="124" y="40" width="18" height="18" rx="4" fill="${HL}"/></g>${T(133, 53, 11, 900, "#fff", "↑")}
      ${T(38, 115, 13, 900, INK, "Cu²⁺")}${T(38, 126, 7.5, 800, MUT, "+2")}${arrow(58, 111, 86, INK)}${T(108, 115, 13, 900, INK, "Cu")}${T(108, 126, 7.5, 800, MUT, "0")}
      <rect x="124" y="94" width="18" height="18" rx="4" fill="#2f6fb8"/>${T(133, 107, 11, 900, "#fff", "↓")}
      ${T(80, 145, 8, 800, HL, "up = oxidised")}${T(80, 155, 8, 800, "#2f6fb8", "down = reduced")}`,
    plating: () => {
      let s = beaker(30, 100, "#cfe1ee", false);
      s += `<path d="M58 40 V26 H70 M90 26 H112 V40" stroke="${INK}" stroke-width="1.6" fill="none"/><rect x="66" y="14" width="28" height="22" rx="4" fill="#f4d36a" stroke="${INK}"/>${T(73, 29, 10, 900, INK, "+")}${T(87, 29, 10, 900, INK, "−")}`;
      s += `<rect x="50" y="40" width="14" height="88" rx="2" fill="#d6dbe0" stroke="#8a96a2"/>${T(57, 120, 7, 900, MUT, "Ag")}`;
      s += `<g class="dg-hl"><path d="M112 40 V84" stroke="${HL}" stroke-width="5" stroke-linecap="round"/><ellipse cx="112" cy="104" rx="11" ry="20" fill="${HL}"/></g><ellipse cx="112" cy="104" rx="7" ry="15" fill="#fff" fill-opacity=".35"/>`;
      s += T(84, 104, 8, 800, "#2f6fb8", "Ag⁺") + arrow(88, 112, 98, "#2f6fb8");
      s += T(50, 153, 8, 800, INK, "Anode (+)") + T(116, 153, 8, 800, HL, "Object: cathode (−)");
      return s;
    },
    electrolysis: () => {
      let s = beaker(20, 120, "#d7ecf7", false);
      s += `<path d="M50 50 V30 H68 M92 30 H110 V50" stroke="${INK}" stroke-width="1.6" fill="none"/><rect x="66" y="18" width="28" height="22" rx="4" fill="#f4d36a" stroke="${INK}"/>${T(73, 33, 10, 900, INK, "+")}${T(87, 33, 10, 900, INK, "−")}`;
      // anode (left, +): O2 small; cathode (right, -): H2 twice the volume
      s += `<rect x="36" y="50" width="28" height="80" rx="4" fill="#fff" fill-opacity=".6" stroke="${GLASS}"/><rect x="37" y="51" width="26" height="22" fill="#eaf4fb"/>`;
      s += `<g class="dg-hl"><rect x="96" y="50" width="28" height="80" rx="4" fill="#fff" fill-opacity=".6" stroke="${GLASS}"/><rect x="97" y="51" width="26" height="44" fill="${HL}" fill-opacity=".35"/></g>`;
      s += T(50, 66, 8, 900, INK, "O₂") + T(110, 76, 8, 900, HL, "H₂");
      [[48, 110], [52, 96], [47, 84]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="2" fill="#fff" stroke="${GLASS}"/>`);
      [[108, 118], [113, 108], [107, 100], [112, 120]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="2" fill="#fff" stroke="${GLASS}"/>`);
      s += T(50, 153, 8, 800, INK, "Anode (+)") + T(110, 153, 8, 800, INK, "Cathode (−)");
      return s;
    },
    sacrificial: () => `<rect x="10" y="74" width="140" height="70" fill="#d8c3a0"/>${T(80, 140, 7, 700, "#8a6a3a", "damp soil")}
      <rect x="14" y="88" width="132" height="18" rx="9" fill="#8a96a2" stroke="#5f6b78"/>${T(80, 100, 8, 800, "#fff", "steel pipe = cathode")}
      <path d="M118 88 V60 H138 V112" stroke="${INK}" stroke-width="1.6" fill="none"/>
      <g class="dg-hl"><rect x="128" y="112" width="20" height="24" rx="3" fill="${HL}"/></g>${T(138, 128, 8, 900, "#fff", "Mg")}
      ${T(80, 26, 9, 800, INK, "Sacrificial anode")}${T(80, 40, 7.5, 700, MUT, "Mg (E° −2.37 V) is oxidised")}${T(80, 50, 7.5, 700, MUT, "instead of iron (E° −0.44 V)")}
      ${T(118, 70, 7.5, 900, "#2f6fb8", "e⁻", "end")}${varrow(122, 70, 84, "#2f6fb8")}`,
    rust: () => `<rect x="10" y="104" width="140" height="30" rx="4" fill="#8a96a2"/>${T(80, 124, 8, 800, "#fff", "iron")}
      <path d="M30 104 Q34 60 80 58 Q126 60 130 104Z" fill="#cde7f5" stroke="#6fa8cf"/>${T(80, 74, 8, 800, "#2f6fb8", "water drop")}
      <g class="dg-hl"><ellipse cx="80" cy="104" rx="18" ry="5" fill="${HL}"/></g>${T(80, 96, 7.5, 800, HL, "Fe → Fe²⁺ + 2e⁻")}
      ${T(42, 52, 7.5, 800, INK, "O₂ reduced")}${T(118, 52, 7.5, 800, INK, "O₂ reduced")}${varrow(42, 56, 86, "#2f6fb8")}${varrow(118, 56, 86, "#2f6fb8")}
      <ellipse cx="38" cy="104" rx="8" ry="3" fill="#b5651d"/><ellipse cx="122" cy="104" rx="8" ry="3" fill="#b5651d"/>
      ${T(80, 148, 8, 800, "#b5651d", "rust forms at the edges")}${T(80, 26, 9, 800, INK, "Corrosion = a tiny cell")}`,
    she: () => `${beaker(40, 80, "#eef4f8", false)}
      <rect x="66" y="22" width="20" height="96" rx="4" fill="#fff" fill-opacity=".6" stroke="${GLASS}"/>${T(76, 34, 8, 900, INK, "H₂")}
      ${varrow(96, 18, 32, "#2f6fb8")}${T(100, 24, 7, 800, "#2f6fb8", "1 atm", "start")}
      <g class="dg-hl"><rect x="70" y="100" width="12" height="18" fill="${HL}"/></g>${T(76, 128, 7, 900, INK, "Pt")}
      ${[[72, 92], [80, 86], [74, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff" stroke="${GLASS}"/>`).join("")}
      ${T(106, 110, 7.5, 800, MUT, "1 M H⁺")}${T(80, 153, 8.5, 900, HL, "E° = 0.00 V by definition")}`,
    tooth: () => `<path d="M48 30 Q80 18 112 30 Q124 52 116 78 Q112 100 106 136 Q102 146 96 136 L88 104 Q80 96 72 104 L64 136 Q58 146 54 136 Q48 100 44 78 Q36 52 48 30Z" fill="#fffaf0" stroke="#d6c7a6" stroke-width="1.6"/>
      <path d="M80 70 V120" stroke="#e07b7b" stroke-width="2" stroke-dasharray="3 2"/>${T(92, 118, 7, 800, "#c0504d", "nerve", "start")}
      <ellipse cx="80" cy="40" rx="18" ry="8" fill="#8a96a2"/>${T(80, 43, 7, 900, "#fff", "amalgam")}
      <g class="dg-hl"><path d="M40 20 L120 20 L114 28 L46 28Z" fill="${HL}"/></g>${T(80, 15, 8, 800, HL, "aluminium foil (anode)")}
      ${T(80, 62, 7.5, 800, "#2f6fb8", "saliva = electrolyte")}${T(80, 154, 8, 800, INK, "filling = cathode → zap!")}`
  };

  /* E° ladder */
  const RUNGS = [["F", "F₂/F⁻", 2.87], ["Ag", "Ag⁺/Ag", 0.80], ["Cu", "Cu²⁺/Cu", 0.34], ["H", "2H⁺/H₂", 0], ["Fe", "Fe²⁺/Fe", -0.44], ["Zn", "Zn²⁺/Zn", -0.76], ["Mg", "Mg²⁺/Mg", -2.37], ["Li", "Li⁺/Li", -3.04]];
  function ladder(it) {
    const want = (it && it.rungs) || [];
    let s = `<rect x="58" y="14" width="8" height="132" rx="4" fill="#dfe6ec"/>` + T(30, 22, 7, 800, "#c0504d", "easier to") + T(30, 31, 7, 800, "#c0504d", "reduce") + T(30, 136, 7, 800, "#2f6fb8", "easier to") + T(30, 145, 7, 800, "#2f6fb8", "oxidise");
    s += varrow(30, 120, 40, MUT);
    RUNGS.forEach(([k, lab, E], i) => {
      const y = 22 + i * 17, on = want.indexOf(k) >= 0;
      s += (on ? `<rect x="70" y="${y - 8}" width="84" height="14" rx="7" fill="${HL}" class="dg-hl"/>` : "") + `<circle cx="62" cy="${y - 1}" r="3" fill="${on ? HL : MUT}"/>`
        + T(74, y + 2, 7.5, 800, on ? "#fff" : INK, lab, "start") + T(150, y + 2, 7.5, 800, on ? "#fff" : MUT, (E > 0 ? "+" : E < 0 ? "−" : "") + Math.abs(E).toFixed(2), "end");
    });
    return s;
  }

  /* battery cut-away */
  function battery(it) {
    const p = (it && it.cellParts) || ["Anode", "Cathode", "Electrolyte", "Voltage"];
    return `<rect x="22" y="26" width="52" height="112" rx="10" fill="#c9d2da" stroke="#8a96a2"/><rect x="38" y="18" width="20" height="10" rx="2" fill="#8a96a2"/>
      <rect x="28" y="34" width="40" height="98" rx="6" fill="#3b4652"/><rect x="34" y="40" width="28" height="86" rx="4" fill="#e9dcc0"/>
      <g class="dg-hl"><rect x="42" y="46" width="12" height="74" rx="3" fill="${HL}"/></g>
      ${T(48, 16, 8, 900, INK, "+")}${T(48, 150, 8, 900, INK, "−")}
      ${[["anode", p[0], 50, HL], ["cathode", p[1], 80, "#3b4652"], ["electrolyte", p[2], 110, "#9a7b3a"]].map(([k, v, y, c]) =>
        `<path d="M${k === "anode" ? 54 : k === "cathode" ? 66 : 60} ${y - 3} H82" stroke="${MUT}" stroke-width=".8"/>` + T(84, y - 5, 6.8, 700, MUT, k, "start") + T(84, y + 5, v.length > 18 ? 6.6 : 7.6, 800, c, v, "start")).join("")}
      <rect x="84" y="128" width="62" height="16" rx="8" fill="${INK}"/>${T(115, 139, 8, 900, "#7CFFB2", p[3])}`;
  }

  const NAMES = { anode: "Anode: oxidation", cathode: "Cathode: reduction", whole: "Galvanic cell", bridge: "Salt bridge", solution: "Electrolyte solutions",
    voltmeter: "Voltmeter reads E°cell", half: "Half-reactions", notation: "Cell notation", oxnum: "Oxidation numbers", power: "Electrolytic cell",
    plating: "Electroplating", electrolysis: "Electrolysis of water", sacrificial: "Sacrificial anode", rust: "Rusting", ladder: "Standard reduction potentials",
    she: "Standard hydrogen electrode", battery: "Battery", tooth: "Filling and foil" };

  BGX.DIAGRAMS.galvanic = item => {
    const sp = dg.spots(item), k = sp[0];
    if (!item || !k) return dg.frame(cell([]), "A zinc–copper galvanic cell: zinc anode, copper cathode, salt bridge, voltmeter and electron flow", ["#F4F8FA", "#DDE8EE"]);
    if (k === "power") return dg.frame(cell(sp, { power: true }), NAMES.power);
    if (k === "ladder") return dg.frame(ladder(item), NAMES.ladder, ["#FBF7EE", "#EFE6D2"]);
    if (k === "battery") return dg.frame(battery(item), item.name || NAMES.battery, ["#F4F8FA", "#DDE8EE"]);
    if (S[k]) return dg.frame(S[k](item), NAMES[k], ["#F4F8FA", "#DDE8EE"]);
    return dg.frame(cell(sp), NAMES[k] || item.name);
  };
})();
