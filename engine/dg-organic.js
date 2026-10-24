/* BioglowRX diagram "organic" — functional groups drawn as skeletal structures (Functional Group Hunt, chapter 24).
   Each corner or line end without a letter is a carbon with enough H to make four bonds.
   Spot ids: alkane alkene alkyne benzene alcohol ether aldehyde ketone acid ester phenol amine amide halo thiol
   chain (uses item.n and item.name) isomer cistrans. Overview (null): aspirin with its groups labelled. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUT = "#55616e", BACK = "#F8EEEA";
  const ATOM = { O: "#d0392b", N: "#2f6fb8", S: "#b8860b", Cl: "#2e8f4a", H: INK };
  /* bond: [x1, y1, x2, y2, order, hl] */
  function bond(b) {
    const [x1, y1, x2, y2, o, h] = b, col = h ? HL : INK, w = h ? 2.6 : 1.8;
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * 3.2, ny = dx / L * 3.2;
    const line = (ox, oy) => `<path d="M${(x1 + ox).toFixed(1)} ${(y1 + oy).toFixed(1)} L${(x2 + ox).toFixed(1)} ${(y2 + oy).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    if (o === 2) return line(nx / 1.6, ny / 1.6) + line(-nx / 1.6, -ny / 1.6);
    if (o === 3) return line(0, 0) + line(nx * 1.1, ny * 1.1) + line(-nx * 1.1, -ny * 1.1);
    return line(0, 0);
  }
  /* atom label with a small backing so bonds stop at the letters */
  function atom(x, y, lab, h) {
    const w = lab.length * 6 + 6, el = lab.replace(/[^A-Z][a-z]?/g, "").slice(0, 1), c = h ? HL : (ATOM[lab.slice(0, 2)] || ATOM[el] || INK);
    return `<rect x="${x - w / 2}" y="${y - 7}" width="${w}" height="14" rx="5" fill="${BACK}"/>` + T(x, y + 4, 11, 900, c, lab);
  }
  const halo = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${HL}" fill-opacity=".14" stroke="${HL}" stroke-width="1.4" stroke-dasharray="4 2" class="dg-hl"/>`;
  const caption = (name, end) => T(80, 132, 8.5, 800, INK, name) + (end ? `<rect x="${80 - Math.max(30, end.length * 3.4 + 12)}" y="139" width="${2 * Math.max(30, end.length * 3.4 + 12)}" height="15" rx="7.5" fill="${HL}"/>` + T(80, 149.5, 8, 800, "#fff", end) : "");
  const Z = [[30, 88], [54, 74], [78, 88], [102, 74], [126, 88]];
  const zig = (n, hlFrom, hlTo) => { let s = ""; for (let i = 0; i < n - 1; i++) s += bond([...Z[i], ...Z[i + 1], 1, hlFrom != null && i >= hlFrom && i < hlTo]); return s; };
  function hexPts(cx, cy, r) { return [-90, -30, 30, 90, 150, 210].map(a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)]); }
  function ring(cx, cy, r, h) {
    const p = hexPts(cx, cy, r); let s = "";
    for (let i = 0; i < 6; i++) s += bond([...p[i], ...p[(i + 1) % 6], 1, h]);
    return s + `<circle cx="${cx}" cy="${cy}" r="${r * .55}" fill="none" stroke="${h ? HL : INK}" stroke-width="${h ? 2.2 : 1.6}"/>`;
  }

  const S = {
    alkane: () => halo(20, 62, 116, 38) + zig(5, 0, 4) + caption("pentane, C₅H₁₂: single bonds only", "-ane"),
    alkene: () => halo(46, 64, 40, 32) + bond([...Z[0], ...Z[1], 1]) + bond([...Z[1], ...Z[2], 2, 1]) + bond([...Z[2], ...Z[3], 1]) + caption("but-2-ene: a C=C double bond", "-ene"),
    alkyne: () => halo(52, 68, 56, 24) + bond([24, 80, 56, 80, 1]) + bond([56, 80, 104, 80, 3, 1]) + bond([104, 80, 136, 80, 1]) + caption("but-2-yne: a C≡C triple bond, in a line", "-yne"),
    benzene: () => halo(46, 40, 68, 72) + ring(80, 76, 30, 1) + caption("benzene, C₆H₆: a flat ring of 6 C", "benzene / phenyl-"),
    alcohol: () => halo(76, 74, 32, 28) + bond([...Z[0], ...Z[1], 1]) + bond([...Z[1], ...Z[2], 1, 1]) + atom(...Z[2], "OH", 1) + T(126, 70, 7.5, 700, MUT, "on a chain C", "middle") + caption("ethanol, CH₃CH₂OH", "-ol"),
    ether: () => halo(66, 74, 24, 28) + bond([...Z[0], ...Z[1], 1]) + bond([...Z[1], ...Z[2], 1, 1]) + bond([...Z[2], ...Z[3], 1, 1]) + bond([...Z[3], ...Z[4], 1]) + atom(...Z[2], "O", 1) + caption("diethyl ether: C–O–C", "alkoxy- / ether"),
    aldehyde: () => halo(60, 30, 52, 72) + bond([38, 90, 72, 76, 1]) + bond([72, 76, 72, 42, 2, 1]) + bond([72, 76, 102, 90, 1, 1]) + atom(72, 40, "O", 1) + atom(104, 90, "H", 1) + T(34, 56, 7.5, 700, MUT, "C=O at") + T(34, 66, 7.5, 700, MUT, "the end") + caption("ethanal (acetaldehyde), CH₃CHO", "-al"),
    ketone: () => halo(66, 30, 28, 58) + bond([40, 90, 80, 76, 1]) + bond([80, 76, 120, 90, 1]) + bond([80, 76, 80, 42, 2, 1]) + atom(80, 40, "O", 1) + T(128, 52, 7.5, 700, MUT, "C=O in") + T(128, 62, 7.5, 700, MUT, "the middle") + caption("propanone (acetone), CH₃COCH₃", "-one"),
    acid: () => halo(62, 30, 66, 72) + bond([38, 90, 76, 76, 1]) + bond([76, 76, 76, 42, 2, 1]) + bond([76, 76, 106, 90, 1, 1]) + atom(76, 40, "O", 1) + atom(110, 90, "OH", 1) + caption("ethanoic (acetic) acid, CH₃COOH", "-oic acid"),
    ester: () => halo(46, 30, 58, 72) + bond([26, 90, 60, 76, 1]) + bond([60, 76, 60, 42, 2, 1]) + bond([60, 76, 90, 90, 1, 1]) + atom(60, 40, "O", 1) + bond([90, 90, 124, 76, 1]) + atom(90, 90, "O", 1) + caption("methyl ethanoate, CH₃COOCH₃", "-oate"),
    phenol: () => halo(52, 18, 32, 30) + ring(68, 84, 26) + bond([68, 58, 68, 34, 1, 1]) + atom(68, 32, "OH", 1) + T(122, 70, 7.5, 700, MUT, "–OH right on") + T(122, 80, 7.5, 700, MUT, "the ring") + caption("phenol, C₆H₅OH", "phenol / hydroxy-"),
    amine: () => halo(68, 74, 40, 28) + bond([...Z[0], ...Z[1], 1]) + bond([...Z[1], ...Z[2], 1, 1]) + atom(Z[2][0] + 4, Z[2][1], "NH₂", 1) + T(126, 66, 7.5, 700, MUT, "no C=O") + caption("ethylamine, CH₃CH₂NH₂", "-amine / amino-"),
    amide: () => halo(62, 30, 68, 72) + bond([38, 90, 76, 76, 1]) + bond([76, 76, 76, 42, 2, 1]) + bond([76, 76, 106, 90, 1, 1]) + atom(76, 40, "O", 1) + atom(112, 90, "NH₂", 1) + caption("ethanamide, CH₃CONH₂", "-amide"),
    halo: () => halo(76, 74, 26, 28) + bond([...Z[0], ...Z[1], 1]) + bond([...Z[1], ...Z[2], 1, 1]) + atom(...Z[2], "Cl", 1) + caption("chloroethane, CH₃CH₂Cl", "chloro-, bromo-…"),
    thiol: () => halo(76, 74, 32, 28) + bond([...Z[0], ...Z[1], 1]) + bond([...Z[1], ...Z[2], 1, 1]) + atom(...Z[2], "SH", 1) + caption("ethanethiol, CH₃CH₂SH", "-thiol"),
    chain: it => {
      const n = (it && it.n) || 4; let s = "";
      if (n === 1) s += halo(56, 58, 48, 34) + T(80, 82, 18, 900, HL, "CH₄");
      else {
        const x0 = 18, dx = 124 / (n - 1), P = Array.from({ length: n }, (_, i) => [x0 + i * dx, i % 2 ? 66 : 84]);
        for (let i = 0; i < n - 1; i++) s += bond([...P[i], ...P[i + 1], 1, 1]);
        P.forEach(([x, y], i) => s += `<circle cx="${x}" cy="${y}" r="2.6" fill="${HL}"/>` + T(x, i % 2 ? y - 8 : y + 15, 7.5, 800, MUT, String(i + 1)));
      }
      s += T(80, 34, 16, 900, INK, (it && it.name) || "but-");
      return s + caption(n === 1 ? "1 carbon: methane" : `${n} carbons in the main chain`, "");
    },
    isomer: () => {
      let s = T(42, 26, 8, 800, INK, "butane") + T(118, 26, 8, 800, INK, "2-methylpropane");
      s += bond([14, 70, 30, 60, 1]) + bond([30, 60, 46, 70, 1]) + bond([46, 70, 62, 60, 1]);
      s += halo(92, 38, 52, 54) + bond([98, 74, 118, 62, 1, 1]) + bond([118, 62, 138, 74, 1, 1]) + bond([118, 62, 118, 42, 1, 1]);
      return s + `<path d="M80 34 V100" stroke="#c9d2da" stroke-dasharray="3 3"/>` + caption("both C₄H₁₀, joined differently", "");
    },
    cistrans: () => {
      let s = T(40, 26, 8.5, 800, INK, "cis") + T(120, 26, 8.5, 800, INK, "trans");
      s += bond([28, 80, 52, 80, 2]) + bond([28, 80, 16, 60, 1, 1]) + bond([52, 80, 64, 60, 1, 1]) + T(40, 54, 7, 700, MUT, "same side");
      s += bond([108, 80, 132, 80, 2]) + bond([108, 80, 96, 60, 1, 1]) + bond([132, 80, 144, 100, 1, 1]) + T(120, 112, 7, 700, MUT, "opposite sides");
      return s + `<path d="M80 34 V108" stroke="#c9d2da" stroke-dasharray="3 3"/>` + caption("the C=C cannot rotate", "");
    }
  };
  /* overview: aspirin with its three groups labelled */
  function aspirin() {
    const p = hexPts(56, 98, 22);
    let s = ring(56, 98, 22);
    // carboxylic acid on the top vertex
    s += `<rect x="18" y="20" width="60" height="44" rx="9" fill="#f6b3a6" fill-opacity=".35" stroke="#d0392b" stroke-dasharray="3 2"/>`;
    s += bond([...p[0], 56, 58, 1]) + bond([56, 58, 38, 46, 2]) + bond([56, 58, 72, 46, 1]) + atom(36, 44, "O") + atom(74, 44, "OH");
    // ester on the upper-right vertex
    s += `<rect x="84" y="60" width="70" height="56" rx="9" fill="#a9d3f2" fill-opacity=".35" stroke="#2f6fb8" stroke-dasharray="3 2"/>`;
    s += bond([...p[1], 96, 76, 1]) + atom(96, 76, "O") + bond([96, 76, 116, 88, 1]) + bond([116, 88, 116, 108, 2]) + atom(116, 109, "O") + bond([116, 88, 136, 76, 1]);
    s += T(48, 16, 7.5, 800, "#d0392b", "carboxylic acid") + T(120, 56, 7.5, 800, "#2f6fb8", "ester") + T(56, 134, 7.5, 800, "#6a4aa0", "benzene ring");
    s += T(80, 152, 8.5, 900, INK, "Aspirin: three groups in one drug");
    return s;
  }
  const NAMES = { alkane: "Alkane", alkene: "Alkene", alkyne: "Alkyne", benzene: "Benzene ring", alcohol: "Alcohol", ether: "Ether", aldehyde: "Aldehyde",
    ketone: "Ketone", acid: "Carboxylic acid", ester: "Ester", phenol: "Phenol", amine: "Amine", amide: "Amide", halo: "Haloalkane", thiol: "Thiol",
    chain: "Carbon chain", isomer: "Structural isomers", cistrans: "Cis and trans isomers" };
  const BG = ["#FBF5F2", "#F1E4DE"];
  BGX.DIAGRAMS.organic = item => {
    const k = dg.spots(item)[0];
    if (!item || !S[k]) return dg.frame(aspirin(), "Aspirin with its carboxylic acid, ester and benzene ring labelled", BG);
    return dg.frame(S[k](item), k === "chain" ? item.name + " stem" : NAMES[k], BG);
  };
})();
