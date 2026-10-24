/* BioglowRX diagram "biomol" — simplified drawings of the molecules of life.
   Spot ids: glucose fructose galactose sucrose lactose maltose glycogen starch cellulose
             triglyceride phospholipid cholesterol eicosanoid
             aminoacid peptide enzyme primary secondary tertiary quaternary
             nucleotide dna rna atp
             water ph buffer hbond dehydration hydrolysis
   Overview (null): one icon per family. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const INK = "#1B2430", MUT = "#55616e";
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const C = { glu: "#F2B544", fru: "#E98A4F", gal: "#9ACB6B", lip: "#E9C84A", aa: ["#E66A6A", "#5FA8D3", "#9B7FD1", "#62B58F", "#F0A04B", "#D97BB0"], p: "#F28C38", rib: "#B7A0E0", A: "#E66A6A", T: "#F2B544", G: "#62B58F", C: "#5FA8D3", U: "#D97BB0" };
  const poly = (cx, cy, r, n, rot) => { cx = +cx; cy = +cy; return Array.from({ length: n }, (_, i) => { const a = (rot || -90) * Math.PI / 180 + i * 2 * Math.PI / n; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(" "); };
  const ring = (cx, cy, r, n, fill, hl, label) => `<polygon points="${poly(cx, cy, r, n, n === 6 ? -90 : -90)}" fill="${hl ? HL : fill}" stroke="${hl ? "#fff" : "#8a6a2a"}" stroke-width="${hl ? 1.6 : 1.2}"${hl ? ' class="dg-hl"' : ""}/>${label ? T(cx, cy + 3, Math.min(9, r * .6), 800, hl ? "#fff" : INK, label) : ""}`;
  const hex = (cx, cy, r, fill, hl, label) => ring(cx, cy, r, 6, fill, hl, label);
  const pent = (cx, cy, r, fill, hl, label) => ring(cx, cy, r, 5, fill, hl, label);
  const bond = (x1, y1, x2, y2, col) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col || "#8a6a2a"}" stroke-width="2.2" stroke-linecap="round"/>`;
  const caption = t => dg.tag(80, 148, t);

  const zig = (x, y, len, dy, col, kink) => { let d = `M${x} ${y}`; for (let i = 1; i <= len; i++) { const yy = y + i * 9; const xx = x + (i % 2 ? dy : 0) + (kink && i > len / 2 ? (i - len / 2) * 2.4 : 0); d += ` L${xx.toFixed(1)} ${yy}`; } return `<path d="${d}" stroke="${col}" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`; };
  const bead = (x, y, r, col, hl) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hl ? HL : col}" stroke="${hl ? "#fff" : "rgba(0,0,0,.25)"}" stroke-width="1"${hl ? ' class="dg-hl"' : ""}/>`;
  const base = (x, y, w, h, col, letter, hl) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${hl ? HL : col}"${hl ? ' class="dg-hl"' : ""}/>${letter ? T(x + w / 2, y + h / 2 + 3, 7.5, 900, hl ? "#fff" : INK, letter) : ""}`;

  const S = {
    glucose: () => hex(80, 66, 34, C.glu, true, "Glucose") + T(80, 118, 9, 800, MUT, "C₆H₁₂O₆ · six-cornered ring") + caption("Monosaccharide"),
    fructose: () => pent(80, 66, 34, C.fru, true, "Fructose") + T(80, 118, 9, 800, MUT, "C₆H₁₂O₆ · five-cornered ring") + caption("Monosaccharide"),
    galactose: () => hex(80, 66, 34, C.gal, true, "Galactose") + T(80, 118, 9, 800, MUT, "C₆H₁₂O₆ · an isomer of glucose") + caption("Monosaccharide"),
    sucrose: () => hex(50, 66, 24, C.glu, false, "Glu") + bond(74, 66, 84, 66) + pent(106, 66, 24, C.fru, false, "Fru") + `<rect x="18" y="34" width="124" height="64" rx="12" fill="none" stroke="${HL}" stroke-width="2.4" class="dg-hl"/>` + T(80, 116, 9, 800, MUT, "glucose + fructose") + caption("Sucrose: disaccharide"),
    lactose: () => hex(50, 66, 24, C.glu, false, "Glu") + bond(74, 66, 86, 66) + hex(110, 66, 24, C.gal, false, "Gal") + `<rect x="18" y="34" width="124" height="64" rx="12" fill="none" stroke="${HL}" stroke-width="2.4" class="dg-hl"/>` + T(80, 116, 9, 800, MUT, "glucose + galactose") + caption("Lactose: disaccharide"),
    maltose: () => hex(50, 66, 24, C.glu, false, "Glu") + bond(74, 66, 86, 66) + hex(110, 66, 24, C.glu, false, "Glu") + `<rect x="18" y="34" width="124" height="64" rx="12" fill="none" stroke="${HL}" stroke-width="2.4" class="dg-hl"/>` + T(80, 116, 9, 800, MUT, "glucose + glucose") + caption("Maltose: disaccharide"),
    glycogen: () => {
      const pts = [], add = (x, y, d, n, ang) => { for (let i = 0; i < n; i++) { x += Math.cos(ang) * 13; y += Math.sin(ang) * 13; pts.push([x, y]); if (d > 0 && i === 1) add(x, y, d - 1, 3, ang - .9); if (d > 0 && i === 3) add(x, y, d - 1, 3, ang + .9); } };
      add(80, 132, 2, 6, -Math.PI / 2);
      return pts.filter(([x, y]) => x > 14 && x < 146 && y > 12 && y < 134).map(([x, y]) => hex(+x.toFixed(1), +y.toFixed(1), 5.6, C.glu, true)).join("") + caption("Glycogen: highly branched");
    },
    starch: () => Array.from({ length: 9 }, (_, i) => hex(18 + i * 15.5, 62 + Math.sin(i * .8) * 12, 7, C.glu, true)).join("") + Array.from({ length: 4 }, (_, i) => hex(80 + i * 15.5, 98 + Math.sin(i) * 3, 7, C.glu, false)).join("") + bond(80, 90, 80, 72, "#8a6a2a") + T(80, 124, 8.5, 800, MUT, "glucose chains, few branches") + caption("Starch: plant store"),
    cellulose: () => [0, 1, 2, 3].map(r => Array.from({ length: 8 }, (_, i) => hex(24 + i * 16, 34 + r * 20, 7, C.glu, r === 1 || r === 2)).join("")).join("") + [44, 64, 84].map(y => `<path d="M20 ${y} H140" stroke="#5FA8D3" stroke-width="1" stroke-dasharray="2 3"/>`).join("") + T(80, 124, 8.5, 800, MUT, "straight chains, tightly packed") + caption("Cellulose: plant fibre"),
    triglyceride: () => `<rect x="24" y="30" width="18" height="80" rx="5" fill="#8DB7E8" stroke="#4F7FB5"/>${T(33, 74, 8, 800, INK, "G", "middle")}` +
      [40, 70, 100].map(y => bond(42, y, 52, y) + `<g class="dg-hl">${zig(52, y, 0, 0, HL)}<path d="M52 ${y} ${Array.from({ length: 9 }, (_, i) => `L${56 + i * 9} ${y + (i % 2 ? -5 : 0)}`).join(" ")}" stroke="${HL}" stroke-width="3" fill="none" stroke-linejoin="round"/></g>`).join("") +
      T(33, 122, 7.5, 700, MUT, "glycerol") + T(100, 122, 7.5, 700, MUT, "3 fatty acids") + caption("Triglyceride: E-shape"),
    phospholipid: () => {
      const one = (x, y, flip, hl) => `<circle cx="${x}" cy="${y}" r="7" fill="${hl ? HL : "#5FA8D3"}"${hl ? ' class="dg-hl"' : ""}/><path d="M${x - 2.5} ${y + (flip ? -7 : 7)} V${y + (flip ? -30 : 30)} M${x + 2.5} ${y + (flip ? -7 : 7)} V${y + (flip ? -30 : 30)}" stroke="${hl ? HL : C.lip}" stroke-width="2.2"/>`;
      return Array.from({ length: 7 }, (_, i) => one(24 + i * 15, 32, false, i === 3) + one(24 + i * 15, 112, true, false)).join("") +
        T(150, 35, 7, 700, MUT, "head", "end") + T(150, 76, 7, 700, MUT, "tails", "end") + caption("Phospholipid bilayer");
    },
    cholesterol: () => hex(42, 76, 15, C.lip, true) + hex(68, 76, 15, C.lip, true) + hex(81, 53.5, 15, C.lip, true) + pent(107, 53.5, 13, C.lip, true) + `<path d="M115 43 L130 32 L144 38" stroke="${INK}" stroke-width="2" fill="none"/><path d="M29 84 L18 92" stroke="#5FA8D3" stroke-width="2"/>${T(16, 102, 8, 800, "#2f6fb8", "OH")}` + T(80, 118, 8.5, 800, MUT, "four fused rings") + caption("Cholesterol: a steroid"),
    eicosanoid: () => `<g class="dg-hl"><path d="M24 70 ${Array.from({ length: 12 }, (_, i) => `L${32 + i * 9} ${70 + (i % 2 ? -6 : 0)}`).join(" ")}" stroke="${HL}" stroke-width="3" fill="none" stroke-linejoin="round"/></g>` + T(80, 50, 8.5, 800, INK, "20-carbon fatty acid") + `<path d="M50 90 Q80 112 110 90" stroke="${MUT}" stroke-width="1.4" fill="none"/>` + T(80, 120, 8, 700, MUT, "→ prostaglandins, leukotrienes") + caption("Eicosanoids"),
    aminoacid: () => `<circle cx="80" cy="66" r="10" fill="#555" />${T(80, 69.5, 9, 900, "#fff", "C")}` +
      `<rect x="16" y="56" width="40" height="20" rx="8" fill="#5FA8D3"/>${T(36, 70, 9, 900, "#fff", "H₂N")}${bond(56, 66, 70, 66, INK)}` +
      `<rect x="104" y="56" width="44" height="20" rx="8" fill="#E66A6A"/>${T(126, 70, 9, 900, "#fff", "COOH")}${bond(90, 66, 104, 66, INK)}` +
      `${bond(80, 76, 80, 92, INK)}<g class="dg-hl"><rect x="62" y="92" width="36" height="20" rx="8" fill="${HL}"/>${T(80, 106, 9, 900, "#fff", "R")}</g>${bond(80, 56, 80, 44, INK)}${T(80, 40, 9, 800, INK, "H")}` +
      T(36, 92, 7.5, 700, MUT, "amino") + T(126, 92, 7.5, 700, MUT, "carboxyl") + T(80, 126, 7.5, 700, MUT, "side chain varies") + caption("Amino acid"),
    peptide: () => bead(40, 64, 16, C.aa[0]) + bead(120, 64, 16, C.aa[1]) + `<g class="dg-hl"><path d="M56 64 H104" stroke="${HL}" stroke-width="5"/></g>${T(80, 38, 8.5, 800, HL, "peptide bond")}` +
      `<g transform="translate(80 98)"><circle r="9" fill="#cde7f5" stroke="#6fa8cf"/>${T(0, 3, 7.5, 800, "#2f6fb8", "H₂O")}</g>${T(80, 122, 8, 700, MUT, "water released")}` + caption("Peptide bond"),
    enzyme: () => `<path d="M30 40 Q30 20 60 22 L100 22 Q130 20 130 40 L130 92 Q130 118 100 118 L60 118 Q30 118 30 92 L30 76 L58 76 L58 58 L30 58 Z" fill="#E66A6A" opacity=".9"/>` +
      `<g class="dg-hl"><path d="M30 58 L58 58 L58 76 L30 76" fill="none" stroke="${HL}" stroke-width="3"/></g><rect x="8" y="60" width="44" height="14" rx="4" fill="${C.glu}" stroke="#8a6a2a"/>` +
      T(84, 74, 9, 800, "#fff", "enzyme") + T(30, 52, 7.5, 800, INK, "substrate") + T(80, 132, 7.5, 700, MUT, "fits the active site") + caption("Enzyme"),
    primary: () => Array.from({ length: 8 }, (_, i) => bead(20 + i * 17, 70, 8, C.aa[i % 6], i === 3)).join("") + T(80, 100, 9, 800, MUT, "Met · Ala · Gly · Val · …") + caption("1° Primary: sequence"),
    secondary: () => `<path d="M14 ${74} ${Array.from({ length: 64 }, (_, i) => `L${(14 + i * 1.3).toFixed(1)} ${(74 + Math.sin(i * .55) * 18).toFixed(1)}`).join(" ")}" stroke="${HL}" stroke-width="3.4" fill="none" class="dg-hl"/>` +
      `<path d="M98 50 L146 50 L98 66 L146 66 L98 82 L146 82 L98 98" stroke="#5FA8D3" stroke-width="3" fill="none" stroke-linejoin="round"/>` + T(50, 112, 8, 800, MUT, "α-helix") + T(122, 112, 8, 800, MUT, "β-sheet") + caption("2° Secondary"),
    tertiary: () => `<path d="M30 110 C10 80 40 40 70 50 C100 60 70 90 90 100 C120 115 140 80 120 50 C108 30 80 26 60 32 C40 38 60 70 80 70" stroke="${HL}" stroke-width="5" fill="none" stroke-linecap="round" class="dg-hl"/>` + `<path d="M58 44 L66 58" stroke="${C.glu}" stroke-width="2" stroke-dasharray="2 2"/>` + T(80, 128, 8, 700, MUT, "one chain folded in 3-D") + caption("3° Tertiary"),
    quaternary: () => [[56, 56, "#E66A6A"], [104, 56, "#5FA8D3"], [56, 98, "#5FA8D3"], [104, 98, "#E66A6A"]].map(([x, y, c], i) => `<circle cx="${x}" cy="${y}" r="22" fill="${i === 0 ? HL : c}"${i === 0 ? ' class="dg-hl"' : ""} opacity=".9"/><circle cx="${x}" cy="${y}" r="5" fill="#fff" opacity=".8"/>`).join("") + T(80, 132, 8, 700, MUT, "haemoglobin: 4 chains") + caption("4° Quaternary"),
    nucleotide: () => `<g class="dg-hl"><circle cx="34" cy="70" r="14" fill="${HL}"/>${T(34, 74, 10, 900, "#fff", "P")}</g>${bond(48, 70, 62, 70, INK)}` +
      pent(80, 70, 18, C.rib, false, "sugar") + bond(98, 70, 110, 70, INK) + base(110, 58, 34, 24, C.A, "base") +
      T(34, 100, 7.5, 700, MUT, "phosphate") + T(80, 100, 7.5, 700, MUT, "5-C sugar") + T(127, 100, 7.5, 700, MUT, "A·T·C·G·U") + caption("Nucleotide"),
    dna: () => {
      const pr = [["A", "T"], ["C", "G"], ["G", "C"], ["T", "A"], ["A", "T"], ["G", "C"]];
      let o = `<path d="M46 16 V122 M114 16 V122" stroke="${INK}" stroke-width="3"/>`;
      pr.forEach(([a, b], i) => { const y = 22 + i * 18, h = i === 2; o += base(47, y - 5, 32, 11, C[a], a, h) + base(81, y - 5, 32, 11, C[b], b, h); });
      return o + T(42, 68, 7, 700, MUT, "rail:", "end") + T(42, 77, 7, 700, MUT, "sugar +", "end") + T(42, 86, 7, 700, MUT, "phos-", "end") + T(42, 95, 7, 700, MUT, "phate", "end") + T(80, 136, 8, 700, MUT, "A–T · C–G (twists into a helix)") + caption("DNA: double strand");
    },
    rna: () => { let o = `<path d="M20 50 H140" stroke="${INK}" stroke-width="2.4"/>`; ["A", "U", "G", "C", "U", "A", "G"].forEach((b, i) => o += base(24 + i * 17.5, 52, 13, 26, C[b], b, b === "U")); return o + T(80, 98, 8.5, 800, MUT, "one strand · ribose · U not T") + caption("RNA"); },
    atp: () => `${base(14, 58, 30, 24, C.A, "A", false)}${bond(44, 70, 52, 70, INK)}${pent(66, 70, 13, C.rib, false, "")}${bond(79, 70, 86, 70, INK)}` +
      [94, 116].map(x => `<circle cx="${x}" cy="70" r="9" fill="${C.p}"/>${T(x, 73.5, 8, 900, "#fff", "P")}`).join("") + `<path d="M103 70 H107" stroke="${INK}" stroke-width="2"/>` +
      `<g class="dg-hl"><path d="M125 70 H131" stroke="${HL}" stroke-width="3" stroke-dasharray="2 1.5"/><circle cx="140" cy="70" r="9" fill="${HL}"/>${T(140, 73.5, 8, 900, "#fff", "P")}</g>` +
      T(132, 50, 8, 800, HL, "energy!") + T(30, 100, 7.5, 700, MUT, "adenine") + T(66, 100, 7.5, 700, MUT, "ribose") + T(117, 100, 7.5, 700, MUT, "3 phosphates") + caption("ATP → ADP + P"),
    water: () => `<g class="dg-hl"><circle cx="80" cy="64" r="22" fill="${HL}"/>${T(80, 69, 13, 900, "#fff", "O")}</g><circle cx="52" cy="90" r="13" fill="#fff" stroke="#9fb3c4" stroke-width="1.5"/>${T(52, 94, 10, 900, INK, "H")}<circle cx="108" cy="90" r="13" fill="#fff" stroke="#9fb3c4" stroke-width="1.5"/>${T(108, 94, 10, 900, INK, "H")}` +
      T(80, 34, 9, 800, "#2f6fb8", "δ−") + T(30, 112, 9, 800, "#E66A6A", "δ+") + T(130, 112, 9, 800, "#E66A6A", "δ+") + caption("Water: polar"),
    ph: () => { const cols = ["#E8483B", "#EF6B3A", "#F49A3A", "#F6C342", "#E6DB4A", "#B6D65A", "#7BC86C", "#4FB98A", "#40A7A8", "#3D8FC1", "#4A74C9", "#5B5DC4", "#6E49B8", "#7A3BA6", "#6A2E8F"];
      return cols.map((c, i) => `<rect x="${8 + i * 9.6}" y="54" width="9.6" height="22" fill="${c}"/>`).join("") + [0, 7, 14].map(n => T(12.8 + n * 9.6, 90, 8, 800, INK, String(n))).join("") +
        `<g class="dg-hl"><rect x="${8 + 7.35 * 9.6}" y="46" width="${.1 * 9.6 + 2}" height="38" fill="${HL}"/></g>${T(80, 38, 8.5, 800, HL, "blood 7.35–7.45")}` + T(28, 108, 7.5, 700, MUT, "acid") + T(132, 108, 7.5, 700, MUT, "base") + caption("pH scale"); },
    buffer: () => `<rect x="20" y="52" width="46" height="26" rx="8" fill="#E66A6A"/>${T(43, 69, 9, 900, "#fff", "H₂CO₃")}<rect x="94" y="52" width="46" height="26" rx="8" fill="#5FA8D3"/>${T(117, 69, 9, 900, "#fff", "HCO₃⁻")}` +
      `<g class="dg-hl"><path d="M68 60 H90 M88 56 L92 60 L88 64" stroke="${HL}" stroke-width="2.4" fill="none"/><path d="M92 72 H70 M72 68 L68 72 L72 76" stroke="${HL}" stroke-width="2.4" fill="none"/></g>` +
      T(80, 100, 8.5, 800, INK, "+ H⁺") + T(80, 118, 7.5, 700, MUT, "soaks up or releases H⁺") + caption("Bicarbonate buffer"),
    hbond: () => { const w = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="#E66A6A"/>${T(x, y + 3.5, 9, 900, "#fff", "O")}<circle cx="${x - 12}" cy="${y + 12}" r="6" fill="#fff" stroke="#9fb3c4"/><circle cx="${x + 12}" cy="${y + 12}" r="6" fill="#fff" stroke="#9fb3c4"/>`;
      return w(44, 52) + w(112, 52) + w(78, 102) + `<g class="dg-hl"><path d="M56 64 L100 52" stroke="${HL}" stroke-width="2.4" stroke-dasharray="3 3"/><path d="M90 102 L124 64" stroke="${HL}" stroke-width="2.4" stroke-dasharray="3 3"/></g>` + caption("Hydrogen bonds (dashed)"); },
    dehydration: () => hex(34, 54, 16, C.glu) + T(54, 58, 9, 800, INK, "+", "middle") + hex(74, 54, 16, C.glu) + T(102, 58, 10, 900, INK, "→") + hex(122, 46, 11, C.glu) + bond(133, 46, 139, 46) + hex(146, 46, 8, C.glu) +
      `<g class="dg-hl"><circle cx="128" cy="78" r="12" fill="${HL}"/>${T(128, 81.5, 8, 900, "#fff", "H₂O")}</g>${T(128, 100, 7.5, 700, MUT, "water out")}` + T(56, 100, 7.5, 700, MUT, "monomers") + caption("Dehydration synthesis"),
    hydrolysis: () => hex(26, 54, 11, C.glu) + bond(37, 54, 45, 54) + hex(56, 54, 11, C.glu) + `<g class="dg-hl"><circle cx="41" cy="88" r="12" fill="${HL}"/>${T(41, 91.5, 8, 900, "#fff", "H₂O")}</g>${T(41, 112, 7.5, 700, MUT, "water in")}` +
      T(86, 58, 10, 900, INK, "→") + hex(112, 54, 13, C.glu) + hex(142, 54, 13, C.glu) + T(127, 90, 7.5, 700, MUT, "bond broken") + caption("Hydrolysis")
  };
  function overview() {
    return hex(42, 42, 16, C.glu) + T(42, 72, 8, 800, INK, "Carbohydrates") +
      `<rect x="96" y="28" width="9" height="30" rx="3" fill="#8DB7E8"/>${[33, 43, 53].map(y => `<path d="M105 ${y} l6 -3 l6 3 l6 -3 l6 3 l6 -3" stroke="${C.lip}" stroke-width="2.2" fill="none"/>`).join("")}` + T(118, 72, 8, 800, INK, "Lipids") +
      Array.from({ length: 5 }, (_, i) => bead(20 + i * 11, 104, 5.4, C.aa[i])).join("") + T(42, 128, 8, 800, INK, "Proteins") +
      [0, 1, 2, 3].map(i => base(100 + i * 9, 92, 7, 22, [C.A, C.G, C.C, C.T][i])).join("") + `<path d="M98 92 H136 M98 114 H136" stroke="${INK}" stroke-width="2"/>` + T(118, 128, 8, 800, INK, "Nucleic acids");
  }
  BGX.DIAGRAMS.biomol = item => {
    const sp = dg.spots(item)[0], fn = S[sp];
    return dg.frame(fn ? fn() : overview(), fn ? item.name : "The four families of biological molecules", ["#FBF8F1", "#EFE7D6"]);
  };
})();
