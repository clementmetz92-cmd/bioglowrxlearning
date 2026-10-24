/* BioglowRX diagram "kinetics" — reaction rates and equilibrium (chemistry chapters 14–15).
   spot ids: hot · cold · conc · dilute · surface · lump · catalyst · enzyme · inhibitor · denature ·
   right · left · noshift · collide · ea · complex · equil · kbig · qk · lech.
   Overview (null): energy profile with activation energy and the lower catalysed path. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUT = "#55616e", A = "#e07a3c", B = "#2f6fb8";
  const arrow = (x1, y1, x2, y2, c, w) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 5;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${w || 2}" stroke-linecap="round"/><path d="M${(x2 - L * Math.cos(a - .5)).toFixed(1)} ${(y2 - L * Math.sin(a - .5)).toFixed(1)} L${x2} ${y2} L${(x2 - L * Math.cos(a + .5)).toFixed(1)} ${(y2 - L * Math.sin(a + .5)).toFixed(1)}" stroke="${c}" stroke-width="${w || 2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const pts = (n, x0, y0, x1, y1, seed) => {
    let s = seed || 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280, out = [];
    const cols = Math.ceil(Math.sqrt(n * (x1 - x0) / (y1 - y0))), rows = Math.ceil(n / cols), cw = (x1 - x0) / cols, rh = (y1 - y0) / rows;
    for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); out.push([+(x0 + (c + .2 + rnd() * .6) * cw).toFixed(1), +(y0 + (r + .2 + rnd() * .6) * rh).toFixed(1)]); }
    return out;
  };
  /* particles with motion trails: speed = trail length */
  const movers = (P, len, seed) => P.map(([x, y], i) => { const a = ((i * 137 + (seed || 0) * 51) % 360) * Math.PI / 180, c = i % 2 ? A : B;
    return `<path d="M${x} ${y} L${(x - Math.cos(a) * len).toFixed(1)} ${(y - Math.sin(a) * len).toFixed(1)}" stroke="${c}" stroke-width="1.4" opacity=".45" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="3.6" fill="${c}"/>`; }).join("");
  const box = (x, y, w, h, on) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fff" stroke="${on ? HL : "#a9b6c2"}" stroke-width="${on ? 2.4 : 1.4}"${on ? ' class="dg-hl"' : ""}/>`;
  const spark = (x, y) => `<g class="dg-hl"><path d="M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2}Z" fill="${HL}"/></g>`;

  /* energy profile. opts: { hl: "ea"|"complex"|"cat"|"dh", cat: bool } */
  const profile = o => {
    const on = k => o.hl === k;
    const main = "M14 96 H40 C58 96 62 34 80 34 C98 34 102 118 120 118 H148";
    const cat = "M40 96 C58 96 64 66 80 66 C96 66 102 118 120 118";
    return `<path d="M12 18 V140 H150" stroke="${INK}" stroke-width="1.4" fill="none"/>${T(8, 80, 7.5, 700, MUT, "energy").replace("<text", '<text transform="rotate(-90 8 80)"')}${T(82, 151, 7.5, 700, MUT, "reaction progress →")}
      <path d="${main}" stroke="${INK}" stroke-width="2.4" fill="none"/>
      ${o.cat !== false ? `<path d="${cat}" stroke="${on("cat") ? HL : "#2f9e6e"}" stroke-width="${on("cat") ? 3 : 2}" stroke-dasharray="4 3" fill="none"${on("cat") ? ' class="dg-hl"' : ""}/>${T(104, 56, 7.5, 800, on("cat") ? HL : "#2f9e6e", "with catalyst", "start")}${T(104, 66, 7.5, 800, on("cat") ? HL : "#2f9e6e", "(lower Eₐ)", "start")}` : ""}
      <path d="M30 34 H70" stroke="${MUT}" stroke-dasharray="2 2"/>
      <g${on("ea") ? ' class="dg-hl"' : ""}><path d="M30 94 V37" stroke="${on("ea") ? HL : MUT}" stroke-width="${on("ea") ? 2.6 : 1.6}"/><path d="M26 40 L30 34 L34 40" stroke="${on("ea") ? HL : MUT}" stroke-width="${on("ea") ? 2.6 : 1.6}" fill="none"/>${T(22, 62, 9, 900, on("ea") ? HL : INK, "Eₐ", "end")}</g>
      ${on("complex") ? `<circle cx="80" cy="34" r="7" fill="none" stroke="${HL}" stroke-width="2.4" class="dg-hl"/>${T(80, 22, 8, 800, HL, "activated complex")}` : ""}
      <g${on("dh") ? ' class="dg-hl"' : ""}><path d="M136 96 V114" stroke="${on("dh") ? HL : MUT}" stroke-width="1.6"/><path d="M132 110 L136 116 L140 110" stroke="${on("dh") ? HL : MUT}" stroke-width="1.6" fill="none"/><path d="M120 96 H146" stroke="${MUT}" stroke-dasharray="2 2"/>${T(146, 108, 8, 800, on("dh") ? HL : MUT, "ΔH", "start").replace('x="146"', 'x="141"')}</g>
      ${T(36, 106, 7.5, 700, MUT, "reactants")}${T(120, 130, 7.5, 700, MUT, "products")}`;
  };

  /* equilibrium seesaw: dir = "right" | "left" | "none" */
  const seesaw = (dir, label, sub) => {
    const ang = dir === "right" ? 12 : dir === "left" ? -12 : 0;
    const l = n => Array.from({ length: n }, (_, i) => `<circle cx="${-48 + (i % 3) * 9}" cy="${-8 - Math.floor(i / 3) * 9}" r="4" fill="${A}"/>`).join("");
    const r = n => Array.from({ length: n }, (_, i) => `<circle cx="${30 + (i % 3) * 9}" cy="${-8 - Math.floor(i / 3) * 9}" r="4" fill="${B}"/>`).join("");
    const nl = dir === "right" ? 3 : dir === "left" ? 7 : 5, nr = dir === "right" ? 7 : dir === "left" ? 3 : 5;
    const big = dir === "right" ? arrow(46, 34, 114, 34, HL, 3.4) : dir === "left" ? arrow(114, 34, 46, 34, HL, 3.4) : `<path d="M50 30 H110 M50 38 H110" stroke="${HL}" stroke-width="2.6"/>`;
    return `${T(80, 20, 9, 900, INK, label)}<g class="dg-hl">${big}</g>${T(34, 54, 7.5, 800, A, "reactants")}${T(126, 54, 7.5, 800, B, "products")}
      <g transform="translate(80 92) rotate(${ang})"><rect x="-62" y="-3" width="124" height="6" rx="3" fill="#7f8c99"/>${l(nl)}${r(nr)}</g>
      <path d="M80 95 L68 118 H92Z" fill="#a9b6c2"/>${T(80, 136, 8, 700, MUT, sub[0])}${T(80, 147, 8, 700, MUT, sub[1])}`;
  };

  const S = {
    hot: () => `${box(14, 26, 132, 92, true)}${movers(pts(10, 22, 34, 138, 110, 3), 16, 1)}${spark(84, 66)}${T(80, 18, 9, 900, HL, "Hot: fast, hard collisions")}${T(80, 134, 8, 700, MUT, "many more collisions reach Eₐ")}${T(80, 146, 8, 700, MUT, "→ faster")}`,
    cold: () => `${box(14, 26, 132, 92, true)}${movers(pts(10, 22, 34, 138, 110, 3), 5, 1)}${T(80, 18, 9, 900, HL, "Cold: slow, gentle collisions")}${T(80, 134, 8, 700, MUT, "few collisions reach Eₐ")}${T(80, 146, 8, 700, MUT, "→ slower")}`,
    conc: () => `${box(14, 26, 132, 92, true)}${movers(pts(22, 22, 34, 138, 110, 5), 8, 2)}${T(80, 18, 9, 900, HL, "Crowded: more collisions")}${T(80, 140, 8, 700, MUT, "concentrated (or gas squeezed)")}`,
    dilute: () => `${box(14, 26, 132, 92, true)}${movers(pts(6, 22, 34, 138, 110, 5), 8, 2)}${T(80, 18, 9, 900, HL, "Spread out: fewer collisions")}${T(80, 140, 8, 700, MUT, "dilute solution")}`,
    surface: () => `${T(80, 18, 9, 900, INK, "Same mass, more surface")}<rect x="14" y="44" width="40" height="40" rx="3" fill="#c9b79a"/>${arrow(60, 64, 80, 64, MUT)}
      <g class="dg-hl">${Array.from({ length: 16 }, (_, i) => `<rect x="${88 + (i % 4) * 15}" y="${36 + Math.floor(i / 4) * 15}" width="10" height="10" rx="2" fill="#c9b79a" stroke="${HL}" stroke-width="1.6"/>`).join("")}</g>
      ${T(34, 100, 8, 700, MUT, "lump")}${T(112, 108, 8, 800, HL, "powder")}${T(80, 132, 8, 700, MUT, "more particles exposed")}${T(80, 144, 8, 700, MUT, "→ faster")}`,
    lump: () => `${T(80, 18, 9, 900, INK, "Same mass, less surface")}<rect x="14" y="44" width="40" height="40" rx="3" fill="#c9b79a" stroke="${HL}" stroke-width="2.4" class="dg-hl"/>
      ${Array.from({ length: 16 }, (_, i) => `<rect x="${88 + (i % 4) * 15}" y="${36 + Math.floor(i / 4) * 15}" width="10" height="10" rx="2" fill="#c9b79a"/>`).join("")}
      ${T(34, 100, 8, 800, HL, "lump")}${T(112, 108, 8, 700, MUT, "powder")}${T(80, 132, 8, 700, MUT, "only the outside can react")}${T(80, 144, 8, 700, MUT, "→ slower")}`,
    catalyst: () => profile({ hl: "cat" }), ea: () => profile({ hl: "ea", cat: false }), complex: () => profile({ hl: "complex", cat: false }),
    enzyme: () => enzymeSVG("fit"), inhibitor: () => enzymeSVG("block"), denature: () => enzymeSVG("denature"),
    collide: () => `${T(80, 18, 9, 900, INK, "A successful collision")}<circle cx="44" cy="60" r="12" fill="${A}"/><circle cx="62" cy="60" r="8" fill="#f4b183"/>${arrow(20, 60, 30, 60, MUT)}
      <circle cx="110" cy="60" r="12" fill="${B}"/>${arrow(140, 60, 126, 60, MUT)}${spark(80, 60)}
      ${["right partners meet", "enough energy (≥ Eₐ)", "correct orientation"].map((t, i) => `<circle cx="28" cy="${98 + i * 16}" r="5" fill="#2f9e6e"/><path d="M25.5 ${98 + i * 16} l2 2 3.5 -4" stroke="#fff" stroke-width="1.4" fill="none"/>${T(38, 101 + i * 16, 8, 700, INK, t, "start")}`).join("")}`,
    rate: () => profile({}),
    equil: () => `${T(80, 20, 9, 900, INK, "Dynamic equilibrium")}<g class="dg-hl">${arrow(36, 52, 124, 52, HL, 3)}${arrow(124, 66, 36, 66, HL, 3)}</g>
      ${T(80, 46, 8, 800, HL, "forward rate")}${T(80, 80, 8, 800, HL, "reverse rate (equal)")}
      ${pts(6, 18, 96, 70, 126, 2).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${A}"/>`).join("")}${pts(6, 90, 96, 142, 126, 4).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${B}"/>`).join("")}
      ${T(80, 146, 8, 700, MUT, "both run; amounts stay constant")}`,
    kbig: () => `${T(80, 20, 9, 900, INK, "K = [products] ÷ [reactants]")}
      <rect x="18" y="40" width="58" height="66" rx="6" fill="#fff" stroke="#a9b6c2"/>${pts(2, 26, 48, 68, 96, 2).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${A}"/>`).join("")}${pts(12, 26, 48, 68, 96, 3).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${B}"/>`).join("")}
      <rect x="84" y="40" width="58" height="66" rx="6" fill="#fff" stroke="#a9b6c2"/>${pts(12, 92, 48, 134, 96, 4).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${A}"/>`).join("")}${pts(2, 92, 48, 134, 96, 5).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${B}"/>`).join("")}
      <g class="dg-hl">${T(47, 122, 9, 900, HL, "K ≫ 1")}</g>${T(113, 122, 9, 900, INK, "K ≪ 1")}${T(47, 136, 7.5, 700, MUT, "mostly products")}${T(113, 136, 7.5, 700, MUT, "mostly reactants")}${T(80, 151, 7.5, 700, MUT, "only temperature changes K")}`,
    qk: () => `${T(80, 20, 9, 900, INK, "Compare Q with K")}${[["Q < K", "shifts right →", 50], ["Q = K", "at equilibrium", 84], ["Q > K", "← shifts left", 118]].map(([a, b, y], i) =>
      `<rect x="18" y="${y - 14}" width="124" height="24" rx="12" fill="${i === 0 ? "#dff1e6" : i === 1 ? "#eef1f4" : "#ece4f6"}"/>${T(48, y + 2, 10, 900, i === 0 ? HL : INK, a)}${T(108, y + 2, 8.5, 800, MUT, b)}`).join("")}
      <g class="dg-hl"><rect x="18" y="36" width="124" height="24" rx="12" fill="none" stroke="${HL}" stroke-width="2"/></g>${T(80, 148, 7.5, 700, MUT, "Q uses concentrations right now")}`,
    lech: () => seesaw("right", "Le Châtelier: push back", ["add reactant → the system", "uses it up (shifts right)"]),
    right: () => seesaw("right", "Shifts right", ["more products form", "(forward reaction favoured)"]),
    left: () => seesaw("left", "Shifts left", ["more reactants re-form", "(reverse reaction favoured)"]),
    noshift: () => seesaw("none", "No shift", ["position stays the same", "(K unchanged)"])
  };
  function enzymeSVG(kind) {
    const body = `<path d="M24 120 Q16 70 46 54 Q70 42 76 62 L76 74 Q80 82 88 74 L88 62 Q94 42 118 54 Q148 70 138 120Z" fill="${kind === "denature" ? "#d9c4e6" : "#b9a4e6"}" stroke="#7b5fb0" stroke-width="1.6"/>`;
    const melted = `<path d="M18 124 Q30 96 50 104 Q64 70 84 98 Q100 76 116 100 Q140 92 142 124Z" fill="#d9c4e6" stroke="${HL}" stroke-width="2.4" class="dg-hl"/>`;
    const sub = (x, y, c) => `<path d="M${x - 6} ${y} V${y - 12} H${x + 6} V${y}Z" fill="${c}"/>`;
    if (kind === "fit") return `${T(80, 20, 9, 900, INK, "Enzyme: substrate fits")}${body}<g class="dg-hl">${sub(82, 72, HL)}</g>${arrow(82, 36, 82, 52, MUT)}${T(80, 98, 8, 800, "#fff", "active site")}${T(80, 140, 8, 700, MUT, "lowers Eₐ, not used up")}`;
    if (kind === "block") return `${T(80, 20, 9, 900, INK, "Inhibitor blocks the site")}${body}<g class="dg-hl"><path d="M76 72 V60 H88 V72 Q82 66 76 72Z" fill="${HL}"/></g>${sub(126, 40, "#e9b44c")}<path d="M116 30 L136 50 M136 30 L116 50" stroke="${INK}" stroke-width="2"/>${T(80, 98, 8, 800, "#fff", "site blocked")}${T(80, 140, 8, 700, MUT, "substrate can't get in → slower")}`;
    return `${T(80, 20, 9, 900, INK, "Too hot: enzyme denatures")}${melted}<path d="M126 34 q4 -6 0 -12 M136 34 q4 -6 0 -12" stroke="#e0453c" stroke-width="2" fill="none"/>${sub(52, 52, "#e9b44c")}${T(80, 140, 8, 700, MUT, "shape lost: substrate no longer fits")}`;
  }
  const NAMES = { hot: "Hot particles", cold: "Cold particles", conc: "Concentrated", dilute: "Dilute", surface: "Surface area", lump: "One lump", catalyst: "Catalysed pathway",
    ea: "Activation energy", complex: "Activated complex", enzyme: "Enzyme and substrate", inhibitor: "Inhibitor", denature: "Denatured enzyme", collide: "Collision theory",
    rate: "Energy profile", equil: "Dynamic equilibrium", kbig: "Equilibrium constant K", qk: "Q compared with K", lech: "Le Châtelier's principle",
    right: "Equilibrium shifts right", left: "Equilibrium shifts left", noshift: "No shift" };

  BGX.DIAGRAMS.kinetics = item => {
    const sp = dg.spots(item)[0];
    if (!item || !S[sp]) return dg.frame(profile({}), "Energy profile: activation energy and the lower catalysed path", ["#FBF6EF", "#F0E4D2"]);
    return dg.frame(S[sp](), NAMES[sp], ["#FBF6EF", "#F0E4D2"]);
  };
})();
