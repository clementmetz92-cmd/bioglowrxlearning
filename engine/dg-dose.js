/* BioglowRX diagram "dose" — what a dose calculation is about.
   spot: tablets · liquid · vial · convert · scale · clock · pump · drip. Overview (null): four mini scenes. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const M = (x, y, s, c, txt, a) => `<text x="${x}" y="${y}" font-family="'Chivo Mono', monospace" font-size="${s}" font-weight="700" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const HL = dg.HL;

  /* each scene draws in a 160×160 box */
  const S = {
    tablets: p => `
      <rect x="22" y="30" width="116" height="62" rx="10" fill="#d9e1e8" stroke="#a9b6c2"/>
      ${[0, 1, 2, 3].map(i => `<g transform="translate(${40 + i * 27} 61)"><ellipse rx="11" ry="11" fill="#fff" stroke="#b9c5cf"/>${i < 2 ? `<ellipse rx="9" ry="9" fill="${i === 0 ? HL : "#fff"}" stroke="${i === 0 ? "#fff" : "#c9d2da"}"${i === 0 ? ' class="dg-hl"' : ""}/><path d="M-9 0 H9" stroke="${i === 0 ? "#fff" : "#c9d2da"}" stroke-width="1.4"/>` : `<path d="M-6-6 L6 6 M6-6 L-6 6" stroke="#c9d2da" stroke-width="1.2"/>`}</g>`).join("")}
      ${T(80, 112, 13, 800, "#1B2430", "D ÷ H")}${T(80, 128, 9, 600, "#55616e", "dose wanted ÷ dose in one tablet")}
      ${T(80, 144, 8.5, 600, "#55616e", "scored line = can be halved")}`,
    liquid: p => `
      <defs><linearGradient id="${p}lq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc56b"/><stop offset="1" stop-color="#f08d1a"/></linearGradient></defs>
      <rect x="18" y="46" width="44" height="82" rx="8" fill="#8a4b1c" opacity=".88"/><rect x="26" y="34" width="28" height="14" rx="3" fill="#fff" stroke="#a9b6c2"/>
      <rect x="22" y="70" width="36" height="34" rx="3" fill="#fff"/>${T(40, 84, 7.5, 800, "#1B2430", "250 mg")}${T(40, 96, 7.5, 800, "#1B2430", "in 5 mL")}
      <g transform="translate(78 30)"><rect x="18" y="0" width="14" height="10" rx="2" fill="#5f6b78"/><rect x="10" y="10" width="30" height="80" rx="5" fill="#eef4f8" stroke="#a9b6c2"/>
        <rect x="11.5" y="48" width="27" height="40.5" rx="3" fill="url(#${p}lq)" class="dg-hl"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M40 ${22 + i * 8.5} h-${i % 2 ? 5 : 9}" stroke="#55616e" stroke-width="1"/>`).join("")}
        ${M(55, 51, 8, HL, "7.5 mL", "start")}<path d="M25 90 v12" stroke="#a9b6c2" stroke-width="4" stroke-linecap="round"/></g>
      ${T(80, 148, 12, 800, "#1B2430", "D ÷ H × V")}`,
    vial: p => `
      <defs><linearGradient id="${p}gl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfe3ee"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#b8d2e0"/></linearGradient></defs>
      <rect x="24" y="30" width="22" height="9" rx="2" fill="#2f6fb8"/><rect x="27" y="39" width="16" height="7" fill="#c9d2da"/>
      <path d="M22 50 Q22 46 27 46 H43 Q48 46 48 50 V118 Q48 124 42 124 H28 Q22 124 22 118Z" fill="url(#${p}gl)" stroke="#9fb3c4"/>
      <rect x="23" y="82" width="24" height="41" rx="2" fill="#d7ecf7" stroke="#9fb3c4" stroke-width=".5"/>
      <rect x="23" y="60" width="24" height="18" fill="#fff" stroke="#c9d2da" stroke-width=".6"/>${T(35, 71.5, 6.5, 800, "#1B2430", "10 mg/mL")}
      <g transform="rotate(-28 108 80)"><rect x="70" y="72" width="72" height="16" rx="3" fill="#f6f9fb" stroke="#9fb3c4"/>
        <rect x="71" y="73" width="22" height="14" fill="${HL}" opacity=".85" class="dg-hl"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<path d="M${73 + i * 6.6} 72 v${i % 5 ? 4 : 7}" stroke="#55616e" stroke-width=".9"/>`).join("")}
        <rect x="93" y="74.5" width="4" height="11" fill="#3b4652"/><path d="M97 80 H150" stroke="#3b4652" stroke-width="3"/><rect x="148" y="72" width="5" height="16" rx="1.5" fill="#3b4652"/>
        <path d="M70 80 H56" stroke="#9fb3c4" stroke-width="1.6"/></g>
      ${T(104, 132, 12, 800, "#1B2430", "D ÷ H × V")}${T(100, 146, 8, 600, "#55616e", "under 1 mL: to 0.01 mL")}`,
    convert: p => `
      ${[["g", "gram", 14, "#7a8b9c"], ["mg", "milligram", 54, "#2f6fb8"], ["mcg", "microgram", 94, "#1f8f8a"]].map(([u, n, y, c]) => `
        <rect x="14" y="${y}" width="78" height="26" rx="7" fill="${c}"/>${M(36, y + 17.5, 12, "#fff", u)}${T(72, y + 16.5, 7, 700, "#fff", n)}`).join("")}
      ${[40, 80].map(y => `<g class="dg-hl"><path d="M53 ${y + 1} V${y + 12}" stroke="${HL}" stroke-width="2.6"/><path d="M48 ${y + 8} L53 ${y + 13} L58 ${y + 8}" stroke="${HL}" stroke-width="2.6" fill="none"/></g>${T(62, y + 10, 9, 800, HL, "× 1,000", "start")}`).join("")}
      ${T(80, 136, 9, 700, "#1B2430", "Down a step: × 1,000")}${T(80, 149, 9, 700, "#1B2430", "Up a step: ÷ 1,000")}`,
    scale: p => `
      <ellipse cx="80" cy="44" rx="13" ry="13" fill="#f2c7a5"/><path d="M68 40 Q70 28 82 30 Q92 31 93 42 Q88 36 80 37 Q72 36 68 40Z" fill="#6b4226"/>
      <path d="M62 86 Q62 60 80 60 Q98 60 98 86 L95 104 H65Z" fill="#7cc4b0"/><path d="M68 104 L70 116 M92 104 L90 116" stroke="#2f6fb8" stroke-width="9" stroke-linecap="round"/>
      <rect x="42" y="118" width="76" height="12" rx="4" fill="#dfe6ec" stroke="#a9b6c2"/><rect x="62" y="132" width="36" height="16" rx="4" fill="#1B2430"/>
      ${M(80, 144, 10, "#7CFFB2", "20 kg")}
      <g class="dg-hl"><rect x="104" y="58" width="48" height="20" rx="10" fill="${HL}"/>${T(128, 71.5, 8.5, 800, "#fff", "mg × kg")}</g>
      <rect x="6" y="58" width="44" height="20" rx="10" fill="#fff" stroke="#a9b6c2"/>${T(28, 71.5, 8, 700, "#1B2430", "lb ÷ 2.2")}`,
    clock: p => `
      <circle cx="80" cy="66" r="42" fill="#fff" stroke="#a9b6c2" stroke-width="2"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M${(80 + Math.sin(a) * 36).toFixed(1)} ${(66 - Math.cos(a) * 36).toFixed(1)} L${(80 + Math.sin(a) * 40).toFixed(1)} ${(66 - Math.cos(a) * 40).toFixed(1)}" stroke="#55616e" stroke-width="${i % 3 ? 1 : 2}"/>`; }).join("")}
      <path d="M80 66 L80 24 A42 42 0 0 1 116.4 87 Z" fill="${HL}" opacity=".25" class="dg-hl"/>
      <path d="M80 66 L80 38 M80 66 L100 76" stroke="#1B2430" stroke-width="3" stroke-linecap="round"/><circle cx="80" cy="66" r="3" fill="#1B2430"/>
      ${T(80, 128, 11, 800, "#1B2430", "every 8 h = 3 a day")}${T(80, 143, 8.5, 600, "#55616e", "every 12 h = 2 · every 6 h = 4")}`,
    pump: p => `
      <rect x="10" y="10" width="34" height="46" rx="6" fill="#eaf4fb" stroke="#9fb3c4"/><rect x="13" y="22" width="28" height="31" rx="4" fill="#cde7f5"/>${T(27, 34, 6.5, 800, "#2f6fb8", "1,000")}${T(27, 42, 6.5, 800, "#2f6fb8", "mL")}
      <path d="M27 56 C27 74 40 78 56 80" stroke="#9fb3c4" stroke-width="2.4" fill="none"/>
      <rect x="54" y="52" width="96" height="76" rx="10" fill="#e4e9ee" stroke="#9fb3c4"/>
      <rect x="62" y="60" width="80" height="34" rx="5" fill="#13202b"/>
      <g class="dg-hl"><rect x="64" y="62" width="76" height="30" rx="4" fill="none" stroke="${HL}" stroke-width="2"/>${M(98, 82, 15, "#7CFFB2", "125", "end")}${M(102, 82, 8, "#7CFFB2", "mL/h", "start")}</g>
      ${["▲", "▼", "▶"].map((c, i) => `<circle cx="${78 + i * 24}" cy="110" r="8" fill="#fff" stroke="#9fb3c4"/>${T(78 + i * 24, 113.5, 8, 800, "#55616e", c)}`).join("")}
      <path d="M150 90 C158 100 156 130 130 140 H70" stroke="#9fb3c4" stroke-width="2.4" fill="none"/>
      ${T(60, 152, 9.5, 800, "#1B2430", "mL ÷ hours")}`,
    drip: p => `
      <path d="M58 10 H102 V44 Q102 52 94 54 H66 Q58 52 58 44Z" fill="#eaf4fb" stroke="#9fb3c4"/>${T(80, 30, 7, 800, "#2f6fb8", "500 mL")}
      <path d="M80 54 V62" stroke="#9fb3c4" stroke-width="3"/>
      <rect x="68" y="62" width="24" height="42" rx="6" fill="#f6fbff" stroke="#9fb3c4" stroke-width="1.4"/>
      <rect x="69" y="92" width="22" height="11" rx="4" fill="#cde7f5"/>
      <g class="dg-hl"><path d="M80 68 q-4 6 0 9 q4 -3 0 -9Z" fill="${HL}"/><path d="M80 80 q-3.4 5 0 7.6 q3.4 -2.6 0 -7.6Z" fill="${HL}" opacity=".75"/></g>
      <path d="M80 104 V150" stroke="#9fb3c4" stroke-width="2.4"/><rect x="72" y="120" width="16" height="10" rx="3" fill="#5f6b78"/>
      <rect x="104" y="66" width="50" height="20" rx="10" fill="#fff" stroke="#a9b6c2"/>${T(129, 79.5, 8, 800, "#1B2430", "15 gtt/mL")}
      <rect x="4" y="66" width="58" height="20" rx="10" fill="${HL}"/>${T(33, 79.5, 7.5, 800, "#fff", "drops ÷ min")}
      ${T(124, 112, 8, 600, "#55616e", "count drops")}${T(124, 122, 8, 600, "#55616e", "for 1 minute")}`
  };
  const NAMES = { tablets: "Tablets: D ÷ H", liquid: "Oral liquid: D ÷ H × V", vial: "Vial and syringe: D ÷ H × V", convert: "Unit ladder g → mg → mcg",
    scale: "Weight in kg × dose per kg", clock: "Daily dose shared between doses", pump: "Pump rate in mL/h", drip: "Gravity drip: drops per minute" };

  BGX.DIAGRAMS.dose = item => {
    const p = dg.uid(), sp = dg.spots(item)[0];
    if (!item || !S[sp]) return dg.frame(S.vial(p).replace(/ class="dg-hl"/g, ""), "Dose calculations: what you want, what you have, and the volume it comes in");
    return dg.frame(S[sp](p), NAMES[sp]);
  };
})();
