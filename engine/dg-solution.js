/* BioglowRX diagram "solution" — solutions and their properties (chemistry chapter 13).
   spot ids: solute · solvent · unsat · sat · supersat · miscible · like · henry · tempsolid · tempgas ·
   molarity · molality · masspct · ppm · molefrac · dilution · colligative · vp · bp · fp · osmotic · vanthoff ·
   utube · isotonic · hypotonic · hypertonic · iviso · ivd5w · ivhypo · ivhyper.
   Overview (null): a red blood cell in isotonic, hypotonic and hypertonic solutions. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUT = "#55616e", GLASS = "#8fa6b8", WATER = "#cfe8f6", SOL = "#2f6fb8";
  const H = on => on ? ' class="dg-hl"' : "";

  /* deterministic scatter of n points inside a box */
  const pts = (n, x0, y0, x1, y1, seed) => {
    let s = seed || 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280, out = [];
    const cols = Math.ceil(Math.sqrt(n * (x1 - x0) / (y1 - y0))), rows = Math.ceil(n / cols), cw = (x1 - x0) / cols, rh = (y1 - y0) / rows;
    for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); out.push([+(x0 + (c + .2 + rnd() * .6) * cw).toFixed(1), +(y0 + (r + .2 + rnd() * .6) * rh).toFixed(1)]); }
    return out;
  };
  const dots = (P, r, c, on) => `<g${H(on)}>${P.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${on ? HL : c}"/>`).join("")}</g>`;
  /* open-topped beaker: x,y = top-left, w,h size, lv = liquid top y */
  const beaker = (x, y, w, h, lv, liq, onLiq) => `
    <path d="M${x + 1} ${lv} H${x + w - 1} V${y + h - 4} Q${x + w - 1} ${y + h - 1} ${x + w - 4} ${y + h - 1} H${x + 4} Q${x + 1} ${y + h - 1} ${x + 1} ${y + h - 4}Z" fill="${onLiq ? HL : liq}" opacity="${onLiq ? .55 : 1}"${H(onLiq)}/>
    <path d="M${x - 3} ${y} H${x} V${y + h - 4} Q${x} ${y + h} ${x + 4} ${y + h} H${x + w - 4} Q${x + w} ${y + h} ${x + w} ${y + h - 4} V${y} H${x + w + 3}" fill="none" stroke="${GLASS}" stroke-width="1.8" stroke-linejoin="round"/>`;
  const arrow = (x1, y1, x2, y2, c, w) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 5;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${w || 2}" stroke-linecap="round"/><path d="M${(x2 - L * Math.cos(a - .5)).toFixed(1)} ${(y2 - L * Math.sin(a - .5)).toFixed(1)} L${x2} ${y2} L${(x2 - L * Math.cos(a + .5)).toFixed(1)} ${(y2 - L * Math.sin(a + .5)).toFixed(1)}" stroke="${c}" stroke-width="${w || 2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };

  /* red blood cell: normal disc, swollen sphere or crenated (spiky) */
  const rbc = (cx, cy, s, kind, on) => {
    const st = on ? ` stroke="${HL}" stroke-width="2.4"` : ` stroke="#a8322e" stroke-width="1"`;
    if (kind === "swollen") return `<g${H(on)}><circle cx="${cx}" cy="${cy}" r="${15 * s}" fill="#ec8a84"${st}/><path d="M${cx + 9 * s} ${cy - 11 * s} l${3 * s} ${-3 * s} M${cx + 12 * s} ${cy - 6 * s} l${4 * s} ${-1 * s}" stroke="#a8322e" stroke-width="1"/></g>`;
    if (kind === "crenated") { let d = ""; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, rr = (i % 2 ? 7.2 : 10) * s; d += (i ? "L" : "M") + (cx + Math.cos(a) * rr).toFixed(1) + " " + (cy + Math.sin(a) * rr).toFixed(1); }
      return `<g${H(on)}><path d="${d}Z" fill="#b8322e"${st} stroke-linejoin="round"/></g>`; }
    return `<g${H(on)}><circle cx="${cx}" cy="${cy}" r="${12 * s}" fill="#d9443f"${st}/><circle cx="${cx}" cy="${cy}" r="${5.5 * s}" fill="#ee8c86"/></g>`;
  };

  /* ---------- scenes ---------- */
  const TON = {
    isotonic: { name: "Isotonic", n: 9, cell: "normal", flow: "both", cap: ["equal flow in and out:", "cell keeps its shape"] },
    hypotonic: { name: "Hypotonic", n: 2, cell: "swollen", flow: "in", cap: ["water rushes in: cell swells", "and can burst (haemolysis)"] },
    hypertonic: { name: "Hypertonic", n: 22, cell: "crenated", flow: "out", cap: ["water moves out: cell", "shrivels (crenation)"] }
  };
  const tonicity = (k, on) => { const t = TON[k];
    const P = pts(t.n + 6, 26, 40, 134, 112, 11).filter(([x, y]) => Math.hypot(x - 80, y - 76) > 30).slice(0, t.n);
    const ar = [];
    [[-1, 0], [1, 0]].forEach(([sx]) => {
      const xo = 80 + sx * 44, xi = 80 + sx * 26;
      if (t.flow === "in" || t.flow === "both") ar.push(arrow(xo, t.flow === "both" ? 70 : 76, xi, t.flow === "both" ? 70 : 76, "#2f8fd8"));
      if (t.flow === "out" || t.flow === "both") ar.push(arrow(xi, t.flow === "both" ? 84 : 76, xo, t.flow === "both" ? 84 : 76, "#2f8fd8"));
    });
    return `${T(80, 20, 11, 900, on ? HL : INK, t.name)}${beaker(16, 28, 128, 92, 36, WATER)}${dots(P, 2.2, SOL)}${rbc(80, 76, 1.5, t.cell, on)}${ar.join("")}
      ${T(80, 136, 8.5, 700, MUT, t.cap[0])}${T(80, 147, 8.5, 700, MUT, t.cap[1])}`; };

  const trio = hl => [["isotonic", "normal", 7], ["hypotonic", "swollen", 2], ["hypertonic", "crenated", 16]].map(([k, c, n], i) => {
    const x = 8 + i * 49;
    return `${beaker(x, 44, 44, 58, 52, WATER)}${dots(pts(n + 4, x + 4, 56, x + 40, 98, 3 + i).filter(([px, py]) => Math.hypot(px - x - 22, py - 77) > 15).slice(0, n), 1.6, SOL)}${rbc(x + 22, 77, .95, c, hl === k)}
      ${T(x + 22, 116, 7.5, 800, hl === k ? HL : INK, TON[k].name)}${T(x + 22, 127, 7, 600, MUT, ["no change", "swells", "shrivels"][i])}`;
  }).join("") + T(80, 26, 9, 800, INK, "Red blood cells") + T(80, 146, 8, 700, MUT, "water moves to the saltier side");

  /* three beakers: unsaturated, saturated, supersaturated */
  const saturation = hl => [["unsat", "Unsaturated", 5, 0], ["sat", "Saturated", 14, 1], ["supersat", "Supersat.", 24, 2]].map(([k, nm, n, kind], i) => {
    const x = 8 + i * 49, on = hl === k;
    return `${beaker(x, 40, 44, 66, 50, WATER)}${dots(pts(n, x + 4, 54, x + 40, kind === 1 ? 92 : 100, 5 + i), 1.8, SOL, on && kind !== 1)}
      ${kind === 1 ? `<path d="M${x + 6} 104 Q${x + 12} 94 ${x + 22} 96 Q${x + 32} 94 ${x + 38} 104Z" fill="${on ? HL : "#9bb4c8"}"${H(on)}/>` : ""}
      ${kind === 2 ? `<path d="M${x + 22} 60 l3 -5 3 5 -3 5z" fill="#fff" stroke="${INK}" stroke-width=".8"/>` : ""}
      ${T(x + 22, 120, 7.5, 800, on ? HL : INK, nm)}${T(x + 22, 131, 7, 600, MUT, ["room for more", "at the limit", "past the limit"][i])}`;
  }).join("") + T(80, 26, 9, 800, INK, "How much is dissolved?") + T(80, 148, 7.5, 600, MUT, ["", "extra solid stays at the bottom", "a seed crystal sets it off"][hl === "sat" ? 1 : hl === "supersat" ? 2 : 0] || "dissolve more and it disappears");

  const thermo = which => { const ybp = 40, yfp = 104, on = k => which === k, col = k => on(k) ? HL : "#2f6fb8";
    return `<rect x="40" y="20" width="16" height="104" rx="8" fill="#fff" stroke="${GLASS}" stroke-width="1.6"/><circle cx="48" cy="130" r="12" fill="#e0453c"/><rect x="44.5" y="${on("bp") ? 34 : 70}" width="7" height="${on("bp") ? 96 : 60}" fill="#e0453c"/>
      <path d="M30 ${ybp} H40 M30 ${yfp} H40" stroke="${MUT}" stroke-width="1.6"/>${T(28, ybp + 3, 7, 700, MUT, "100°", "end")}${T(28, yfp + 3, 7, 700, MUT, "0°", "end")}
      <g${H(on("bp"))}><path d="M58 ${ybp - 8} H70" stroke="${col("bp")}" stroke-width="1.8"/>${on("bp") ? arrow(64, ybp, 64, ybp - 7, HL, 2) : ""}${T(74, ybp - 5, 8, 800, col("bp"), "solution boils", "start")}${T(74, ybp + 5, 8, 800, col("bp"), "above 100 °C", "start")}</g>
      <g${H(on("fp"))}><path d="M58 ${yfp + 8} H70" stroke="${col("fp")}" stroke-width="1.8"/>${on("fp") ? arrow(64, yfp, 64, yfp + 7, HL, 2) : ""}${T(74, yfp + 5, 8, 800, col("fp"), "solution freezes", "start")}${T(74, yfp + 15, 8, 800, col("fp"), "below 0 °C", "start")}</g>
      ${T(112, 72, 10, 900, INK, on("bp") ? "ΔTb = i·Kb·m" : "ΔTf = i·Kf·m")}${T(112, 84, 7.5, 700, MUT, on("bp") ? "water: Kb = 0.512" : "water: Kf = 1.86")}`; };

  const utube = which => {
    const tube = "M30 30 V112 Q30 140 58 140 H102 Q130 140 130 112 V30";
    const left = 70, right = 50;   // liquid tops (y): solution side (right) higher
    const P = pts(8, 124, right + 6, 136, 128, 9);
    return `<path d="${tube}" fill="none" stroke="${GLASS}" stroke-width="22" stroke-linecap="butt"/>
      <path d="${tube}" fill="none" stroke="#f4f8fa" stroke-width="18"/>
      <path d="M30 ${left} V112 Q30 140 58 140 H80 V122" fill="none" stroke="${WATER}" stroke-width="18"/>
      <path d="M80 122 V140 H102 Q130 140 130 112 V${right}" fill="none" stroke="#b9d8ef" stroke-width="18"/>
      ${dots(P, 1.8, SOL)}${dots([[92, 136], [100, 134], [96, 143]], 1.8, SOL)}
      <path d="M80 129 V151" stroke="${INK}" stroke-width="2" stroke-dasharray="2 2"/>
      ${which === "osmotic" ? `<g class="dg-hl"><path d="M146 ${left} V${right}" stroke="${HL}" stroke-width="2"/><path d="M142 ${left} H150 M142 ${right} H150" stroke="${HL}" stroke-width="2"/></g>${T(150, right - 8, 10, 900, HL, "Π", "end")}`
        : `<g class="dg-hl">${arrow(66, 140, 92, 140, HL, 2.6)}</g>`}
      ${T(30, 24, 8, 800, "#2f6fb8", "water")}${T(130, 24, 8, 800, "#2f6fb8", "solution")}
      ${T(80, 100, 7.5, 700, MUT, "membrane")}${T(80, 110, 7.5, 700, MUT, "lets water through")}
      ${T(80, 76, 8, 800, which === "osmotic" ? HL : INK, which === "osmotic" ? "Π = iMRT" : "water moves in")}`;
  };

  const ivbag = k => {
    const F = { iviso: ["0.9% NaCl", "isotonic", "normal", "#d7ecf7", "replaces lost volume"], ivd5w: ["D5W", "5% glucose", "normal", "#fff6d6", "acts as free water"],
      ivhypo: ["0.45% NaCl", "hypotonic", "swollen", "#e8f4fb", "water into cells"], ivhyper: ["3% NaCl", "hypertonic", "crenated", "#d3e6f3", "water out of cells"] }[k];
    return `<rect x="66" y="6" width="12" height="6" rx="2" fill="${GLASS}"/>
      <path d="M22 14 H122 Q128 14 128 20 V96 Q128 110 114 112 H30 Q16 110 16 96 V20 Q16 14 22 14Z" fill="${F[3]}" stroke="${GLASS}" stroke-width="1.6"/>
      <rect x="28" y="30" width="88" height="44" rx="5" fill="#fff" stroke="#c9d6e0"/>${T(72, 50, 12, 900, INK, F[0])}${T(72, 65, 9, 800, HL, F[1])}
      <path d="M72 112 V124" stroke="${GLASS}" stroke-width="3"/><path d="M72 124 Q72 140 60 146 H20" stroke="${GLASS}" stroke-width="2" fill="none"/>
      ${T(72, 92, 8, 700, MUT, F[4])}${rbc(122, 134, 1, F[2], true)}${T(100, 156, 7, 600, MUT, "red cell", "end")}`;
  };

  const S = {
    solute: () => `${beaker(30, 34, 100, 92, 50, WATER)}${dots(pts(16, 36, 58, 124, 120, 4), 3, SOL, true)}${T(80, 22, 10, 900, HL, "Solute particles")}${T(80, 144, 8.5, 700, MUT, "what gets dissolved, e.g. NaCl")}`,
    solvent: () => `${beaker(30, 34, 100, 92, 50, WATER, true)}${dots(pts(16, 36, 58, 124, 120, 4), 3, SOL)}${T(80, 22, 10, 900, HL, "Solvent")}${T(80, 144, 8.5, 700, MUT, "does the dissolving: water (aq)")}`,
    unsat: () => saturation("unsat"), sat: () => saturation("sat"), supersat: () => saturation("supersat"),
    miscible: () => `${beaker(22, 36, 44, 80, 50, "#d5ecd9", true)}${beaker(94, 36, 44, 80, 50, "#cfe8f6")}<rect x="95" y="50" width="42" height="22" fill="#f4d36b"/>
      ${T(44, 26, 8, 800, HL, "ethanol + water")}${T(116, 26, 8, 800, INK, "oil + water")}${T(116, 64, 7, 700, "#7a5a00", "oil")}${T(116, 98, 7, 700, "#2f6fb8", "water")}
      ${T(44, 132, 8, 800, HL, "miscible")}${T(44, 142, 7, 600, MUT, "one layer")}${T(116, 132, 8, 800, INK, "immiscible")}${T(116, 142, 7, 600, MUT, "two layers")}`,
    like: () => `${beaker(14, 40, 58, 70, 54, WATER)}${dots(pts(10, 18, 60, 68, 106, 2), 2, "#7b4fc4", true)}${beaker(88, 40, 58, 70, 54, WATER)}
      ${[[100, 60], [116, 58], [132, 61], [108, 66], [124, 66]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.5" fill="#f4d36b" stroke="#c9a12a"/>`).join("")}
      ${T(43, 28, 8, 800, HL, "salt in water")}${T(117, 28, 8, 800, INK, "oil on water")}${T(43, 124, 8, 800, HL, "polar + polar ✓")}${T(117, 124, 8, 800, INK, "nonpolar + polar ✕")}
      ${T(80, 146, 8.5, 700, MUT, "like dissolves like")}`,
    henry: () => [0, 1].map(i => { const x = 14 + i * 74, py = i ? 56 : 42, n = i ? 14 : 5, on = i === 1;
        return `<rect x="${x}" y="${py - 6}" width="58" height="6" rx="2" fill="${MUT}"/><path d="M${x + 29} ${py - 6} V${py - 12}" stroke="${MUT}" stroke-width="3"/>
          ${dots(pts(i ? 8 : 4, x + 6, py + 3, x + 52, 70, 6 + i), 2, "#7f8c99")}${beaker(x, 30, 58, 90, 74, WATER)}${dots(pts(n, x + 5, 80, x + 53, 116, 8 + i), 2, on ? HL : "#7f8c99", on)}
          ${T(x + 29, 134, 8, 800, on ? HL : INK, i ? "high pressure" : "low pressure")}${T(x + 29, 145, 7, 600, MUT, i ? "more gas dissolves" : "less gas dissolves")}`; }).join("") + T(80, 20, 9, 900, INK, "Henry's law: C = k·P"),
    tempsolid: () => graph("solid"), tempgas: () => graph("gas"),
    molarity: () => `<path d="M70 18 H90 V62 Q122 72 122 104 Q122 136 80 136 Q38 136 38 104 Q38 72 70 62Z" fill="#fff" stroke="${GLASS}" stroke-width="1.8"/>
      <path d="M41 96 Q42 132 80 133 Q118 132 119 96Z" fill="${WATER}"/><path d="M70 38 H90" stroke="${HL}" stroke-width="2"/>${dots(pts(12, 50, 100, 110, 128, 3), 2.2, SOL, true)}
      ${T(96, 41, 7.5, 800, HL, "fill to 1 L mark", "start")}${T(80, 152, 9, 900, INK, "M = mol ÷ L of solution")}`,
    molality: () => `<path d="M30 116 H130 L120 128 H40Z" fill="#a9b6c2"/><rect x="74" y="128" width="12" height="12" fill="#a9b6c2"/><rect x="58" y="140" width="44" height="6" rx="2" fill="#7f8c99"/>
      ${beaker(48, 52, 64, 62, 66, WATER, true)}${dots(pts(6, 54, 74, 106, 108, 5), 2.2, SOL)}${T(80, 28, 9, 900, INK, "m = mol ÷ kg of solvent")}${T(80, 42, 8, 700, HL, "weigh the solvent: 1 kg water")}`,
    masspct: () => `<rect x="20" y="58" width="120" height="26" rx="5" fill="${WATER}" stroke="${GLASS}"/><rect x="20" y="58" width="30" height="26" rx="5" fill="${HL}" class="dg-hl"/>
      ${T(35, 75, 8, 900, "#fff", "solute")}${T(95, 75, 8, 800, "#2f6fb8", "solvent")}
      <path d="M20 94 H140" stroke="${MUT}"/><path d="M20 90 V98 M140 90 V98" stroke="${MUT}"/>${T(80, 108, 7.5, 700, MUT, "whole solution (solute + solvent)")}
      ${T(80, 34, 9, 900, INK, "mass %")}${T(80, 46, 8, 700, INK, "= g solute ÷ g solution × 100")}${T(80, 132, 8, 700, MUT, "IV fluids use w/v:")}${T(80, 143, 8, 700, MUT, "g per 100 mL")}`,
    ppm: () => `${Array.from({ length: 100 }, (_, i) => { const x = 30 + (i % 10) * 10, y = 30 + Math.floor(i / 10) * 9; return `<circle cx="${x}" cy="${y}" r="3" fill="${i === 57 ? HL : "#cfe0ec"}"${i === 57 ? ' class="dg-hl"' : ""}/>`; }).join("")}
      ${T(80, 132, 8.5, 800, INK, "a trace among many")}${T(80, 145, 8, 700, MUT, "ppm ≈ mg per litre of water")}`,
    molefrac: () => `${Array.from({ length: 10 }, (_, i) => { const x = 28 + (i % 5) * 26, y = 52 + Math.floor(i / 5) * 28, on = i === 2 || i === 7; return `<circle cx="${x}" cy="${y}" r="9" fill="${on ? HL : "#9cc3e0"}"${on ? ' class="dg-hl"' : ""}/>`; }).join("")}
      ${T(80, 26, 9, 900, INK, "Mole fraction χ")}${T(80, 118, 9, 800, HL, "χ = 2 ÷ 10 = 0.2")}${T(80, 134, 8, 700, MUT, "mol of one ÷ total mol")}${T(80, 145, 8, 700, MUT, "no units; all add to 1")}`,
    dilution: () => `${beaker(14, 64, 40, 54, 80, "#7fb6e0")}${dots(pts(8, 18, 84, 50, 114, 2), 2, "#14467a", true)}
      ${arrow(60, 92, 88, 92, MUT)}${T(74, 84, 7, 700, MUT, "+ water")}
      ${beaker(96, 36, 52, 82, 48, "#d6eaf7")}${dots(pts(8, 100, 54, 144, 114, 5), 2, "#14467a", true)}
      ${T(34, 132, 8, 800, INK, "M₁, V₁")}${T(122, 132, 8, 800, INK, "M₂, V₂")}${T(80, 22, 9, 900, INK, "M₁V₁ = M₂V₂")}${T(80, 148, 8, 700, HL, "same moles, more volume")}`,
    colligative: () => `${beaker(44, 46, 72, 70, 60, WATER)}${dots(pts(12, 50, 66, 110, 112, 4), 2.4, SOL, true)}
      ${T(80, 24, 9, 900, INK, "Count the particles")}${T(26, 62, 7.5, 800, INK, "VP ↓")}${T(134, 62, 7.5, 800, INK, "BP ↑")}${T(26, 100, 7.5, 800, INK, "FP ↓")}${T(134, 100, 7.5, 800, INK, "Π")}
      ${T(80, 136, 8, 700, MUT, "same count, same effect,")}${T(80, 147, 8, 700, MUT, "whatever the particle is")}`,
    vp: () => [0, 1].map(i => { const x = 14 + i * 74, on = i === 1;
        return `<rect x="${x}" y="30" width="58" height="88" rx="4" fill="#f4f8fa" stroke="${GLASS}" stroke-width="1.6"/><rect x="${x + 1}" y="78" width="56" height="39" rx="3" fill="${WATER}"/>
          ${dots(pts(i ? 4 : 9, x + 6, 36, x + 52, 72, 3 + i), 2, "#5b8fc0", on)}${i ? dots(pts(8, x + 5, 84, x + 53, 114, 2), 2.2, "#7b4fc4") : ""}
          ${T(x + 29, 132, 8, 800, on ? HL : INK, i ? "solution" : "pure water")}${T(x + 29, 143, 7, 600, MUT, i ? "fewer escape" : "more escape")}`; }).join("") + T(80, 20, 9, 900, INK, "Raoult: P = χ·P°"),
    bp: () => thermo("bp"), fp: () => thermo("fp"),
    osmotic: () => utube("osmotic"), utube: () => utube("utube"),
    vanthoff: () => [["glucose", 1, 30], ["NaCl", 2, 72], ["CaCl₂", 3, 114]].map(([n, i, y]) => `${T(14, y + 3, 8.5, 800, INK, n, "start")}${arrow(56, y, 72, y, MUT, 1.6)}
        ${Array.from({ length: i }, (_, j) => `<circle cx="${86 + j * 18}" cy="${y}" r="${j === 0 && i > 1 ? 6.5 : 5}" fill="${HL}" class="dg-hl"/>`).join("")}${T(150, y + 3, 9, 900, HL, "i = " + i, "end")}`).join("")
      + T(80, 146, 8, 700, MUT, "particles per formula unit"),
    isotonic: () => tonicity("isotonic", true), hypotonic: () => tonicity("hypotonic", true), hypertonic: () => tonicity("hypertonic", true),
    iviso: () => ivbag("iviso"), ivd5w: () => ivbag("ivd5w"), ivhypo: () => ivbag("ivhypo"), ivhyper: () => ivbag("ivhyper")
  };
  function graph(which) {
    const ax = `<path d="M30 20 V124 H146" stroke="${INK}" stroke-width="1.6" fill="none"/>${T(88, 140, 8, 700, MUT, "temperature →")}`;
    const solid = `<path d="M34 104 Q90 92 140 36" stroke="${which === "solid" ? HL : "#9bb4c8"}" stroke-width="${which === "solid" ? 3 : 2}" fill="none"${H(which === "solid")}/>`;
    const gas = `<path d="M34 46 Q80 96 140 112" stroke="${which === "gas" ? HL : "#9bb4c8"}" stroke-width="${which === "gas" ? 3 : 2}" fill="none"${H(which === "gas")}/>`;
    return `${ax}${solid}${gas}${T(24, 72, 8, 700, MUT, "solubility", "middle").replace("<text", '<text transform="rotate(-90 24 72)"')}
      ${T(136, 30, 8, 800, which === "solid" ? HL : MUT, "most solids", "end")}${T(140, 106, 8, 800, which === "gas" ? HL : MUT, "gases", "end")}${T(88, 153, 8, 700, which === "solid" ? HL : INK, which === "solid" ? "hotter: more solid dissolves" : "hotter: less gas dissolves")}`;
  }
  const NAMES = { solute: "Solute", solvent: "Solvent", unsat: "Unsaturated", sat: "Saturated", supersat: "Supersaturated", miscible: "Miscible liquids", like: "Like dissolves like",
    henry: "Henry's law", tempsolid: "Solubility of solids rises with temperature", tempgas: "Solubility of gases falls with temperature", molarity: "Molarity", molality: "Molality",
    masspct: "Mass percent", ppm: "Parts per million", molefrac: "Mole fraction", dilution: "Dilution", colligative: "Colligative properties", vp: "Vapour-pressure lowering",
    bp: "Boiling-point elevation", fp: "Freezing-point depression", osmotic: "Osmotic pressure", vanthoff: "van 't Hoff factor", utube: "Osmosis in a U-tube",
    isotonic: "Red cell in an isotonic solution", hypotonic: "Red cell in a hypotonic solution", hypertonic: "Red cell in a hypertonic solution",
    iviso: "0.9% saline bag", ivd5w: "D5W bag", ivhypo: "0.45% saline bag", ivhyper: "3% saline bag" };

  BGX.DIAGRAMS.solution = item => {
    const sp = dg.spots(item)[0];
    if (!item || !S[sp]) return dg.frame(trio(null), "Red blood cells in isotonic, hypotonic and hypertonic solutions", ["#F3F9FC", "#DCEBF3"]);
    return dg.frame(S[sp](), NAMES[sp], ["#F3F9FC", "#DCEBF3"]);
  };
})();
