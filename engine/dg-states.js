/* BioglowRX diagram "states" — states of matter, phase changes, intermolecular forces, gas laws, types of solid.
   spot: solid · liquid · gas (particle boxes) · melt · freeze · vap · cond · sub · dep (phase triangle, one arrow lit)
         london · dipole · hbond · iondipole (force close-ups) · boyle · charles · gaylussac · avogadro · combined · ideal (piston / cylinder)
         ionicsolid · molsolid · network · metallic (solid lattices). Overview (null): three particle boxes. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL, INK = "#1B2430", MUT = "#55616e";
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const f1 = n => (+n).toFixed(1);
  const arrow = (x1, y1, x2, y2, c, w, hl) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 4 + w;
    return `<g${hl ? ' class="dg-hl"' : ""}><path d="M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${f1(x2 - h * Math.cos(a - .5))} ${f1(y2 - h * Math.sin(a - .5))} L${f1(x2)} ${f1(y2)} L${f1(x2 - h * Math.cos(a + .5))} ${f1(y2 - h * Math.sin(a + .5))}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  /* seeded jitter so pictures are stable */
  const rnd = s => () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const P = (x, y, r, c) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${c || "#3a86d1"}" stroke="#1d4f86" stroke-width=".7"/>`;

  /* ---------- particle boxes ---------- */
  function box(kind, x, y, w, h, hl) {
    const r = rnd(kind.length * 7 + 3), dots = [];
    const pr = Math.min(w, h) / 13;
    if (kind === "solid") {
      const n = 5, s = (w - 8) / n;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) dots.push(P(x + 4 + s * (i + .5), y + h - 4 - s * (j + .5), pr.toFixed(1)));
    } else if (kind === "liquid") {
      const cols = 5, s = (w - 8) / cols;
      for (let j = 0; j < 4; j++) for (let i = 0; i < cols; i++) { if (j === 3 && i % 2) continue; dots.push(P(x + 4 + s * (i + .5) + (r() - .5) * 4, y + h - 4 - s * (j + .5) + (r() - .5) * 3, pr.toFixed(1))); }
    } else {
      const pts = [[.22, .22], [.72, .2], [.46, .48], [.2, .74], [.78, .6], [.58, .8]];
      pts.forEach(([u, v], i) => { const cx = x + u * w, cy = y + v * h; dots.push(P(cx, cy, pr.toFixed(1)));
        const a = i * 1.7; dots.push(`<path d="M${f1(cx + Math.cos(a) * (pr + 2))} ${f1(cy + Math.sin(a) * (pr + 2))} L${f1(cx + Math.cos(a) * (pr * 2.4))} ${f1(cy + Math.sin(a) * (pr * 2.4))}" stroke="${MUT}" stroke-width="1" stroke-linecap="round"/>`); });
    }
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#fff" stroke="${hl ? HL : "#9fb3c4"}" stroke-width="${hl ? 2.6 : 1.4}"${hl ? ' class="dg-hl"' : ""}/>` + dots.join("");
  }
  const BOXT = { solid: "Solid", liquid: "Liquid", gas: "Gas" };
  const BOXN = { solid: "fixed positions, vibrate", liquid: "close, slide past", gas: "far apart, fast" };
  function overview(hl) {
    return ["solid", "liquid", "gas"].map((k, i) => box(k, 8 + i * 50, 48, 44, 60, hl === k) + T(30 + i * 50, 124, 8.5, 800, hl === k ? HL : INK, BOXT[k])).join("") +
      T(80, 32, 8, 800, INK, "particle spacing and energy rise →") + arrow(30, 38, 132, 38, MUT, 1.2);
  }
  function single(k) {
    return box(k, 34, 22, 92, 96, true) + dg.tag(80, 134, BOXT[k]) + T(80, 150, 7.5, 700, MUT, BOXN[k]);
  }

  /* ---------- phase-change triangle ---------- */
  const NODE = { s: [80, 30], l: [32, 112], g: [128, 112] };
  const CH = { melt: ["s", "l", "Melting"], freeze: ["l", "s", "Freezing"], vap: ["l", "g", "Vaporisation"], cond: ["g", "l", "Condensation"], sub: ["s", "g", "Sublimation"], dep: ["g", "s", "Deposition"] };
  const ENDO = { melt: 1, vap: 1, sub: 1 };
  function triangle(hl) {
    let o = "";
    Object.keys(CH).forEach(k => {
      const [a, b] = CH[k], A = NODE[a], B = NODE[b];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy * 5, ny = ux * 5;
      const on = hl === k, col = on ? HL : (ENDO[k] ? "#e8663c" : "#3a86d1");
      o += arrow(A[0] + ux * 18 + nx, A[1] + uy * 18 + ny, B[0] - ux * 18 + nx, B[1] - uy * 18 + ny, col, on ? 3 : 1.6, on);
    });
    const node = (id, t) => { const [x, y] = NODE[id]; return `<circle cx="${x}" cy="${y}" r="15" fill="#fff" stroke="#9fb3c4" stroke-width="1.6"/>${T(x, y + 3.5, 9, 900, INK, t)}`; };
    o += node("s", "S") + node("l", "L") + node("g", "G");
    if (hl && CH[hl]) o += dg.tag(80, 142, `${CH[hl][2]}: ${ENDO[hl] ? "heat in" : "heat out"}`);
    else o += T(80, 140, 8, 800, "#e8663c", "orange: heat in") + T(80, 151, 8, 800, "#3a86d1", "blue: heat out");
    return o;
  }

  /* ---------- intermolecular forces ---------- */
  const mol = (x, y, rx, ry, rot, l, r, fill) => `<g transform="translate(${x} ${y}) rotate(${rot || 0})"><ellipse rx="${rx}" ry="${ry}" fill="${fill || "#e8eef4"}" stroke="#9fb3c4"/>${l ? T(-rx * .55, 3, 9, 900, l === "δ+" ? "#3a86d1" : "#e2453c", l) : ""}${r ? T(rx * .55, 3, 9, 900, r === "δ+" ? "#3a86d1" : "#e2453c", r) : ""}</g>`;
  const dash = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${HL}" stroke-width="2.2" stroke-dasharray="3 3" class="dg-hl"/>`;
  const IMF = {
    london: () => mol(48, 64, 26, 18, 0, "δ−", "δ+", "#eef2f6") + mol(112, 64, 26, 18, 0, "δ−", "δ+", "#eef2f6") + dash(70, 64, 90, 64) +
      T(80, 104, 8, 800, INK, "brief, shifting dipoles") + T(80, 118, 7.5, 700, MUT, "every molecule · grows with size") + dg.tag(80, 142, "e.g. CH₄, O₂, I₂"),
    dipole: () => mol(48, 50, 26, 16, 0, "δ+", "δ−") + mol(112, 50, 26, 16, 0, "δ+", "δ−") + mol(48, 92, 26, 16, 0, "δ−", "δ+") + mol(112, 92, 26, 16, 0, "δ−", "δ+") +
      dash(70, 50, 90, 50) + dash(70, 92, 90, 92) + T(80, 122, 7.5, 700, MUT, "permanent δ+ attracts δ−") + dg.tag(80, 142, "e.g. HCl, acetone"),
    hbond: () => {
      const w = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><circle r="11" fill="#e0323a"/>${T(0, 3.5, 9, 900, "#fff", "O")}<circle cx="-10" cy="10" r="6.5" fill="#fff" stroke="#9aa3ad"/><circle cx="10" cy="10" r="6.5" fill="#fff" stroke="#9aa3ad"/>${T(-10, 13, 7, 800, INK, "H")}${T(10, 13, 7, 800, INK, "H")}</g>`;
      return w(46, 52, 0) + w(112, 88, -40) + dash(58, 64, 97, 82) + T(80, 66, 8, 900, HL, "H-bond", "start") +
        T(80, 124, 7.5, 700, MUT, "H on N, O or F → lone pair") + dg.tag(80, 142, "water, DNA, proteins");
    },
    iondipole: () => {
      let o = `<circle cx="80" cy="70" r="16" fill="#8a4fd0"/>${T(80, 74, 10, 900, "#fff", "Na⁺")}`;
      [0, 72, 144, 216, 288].forEach(d => { const a = (d - 90) * Math.PI / 180, x = 80 + Math.cos(a) * 42, y = 70 + Math.sin(a) * 42;
        o += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(d + 90)})"><circle r="8" fill="#e0323a"/><circle cx="-7" cy="8" r="4.5" fill="#fff" stroke="#9aa3ad"/><circle cx="7" cy="8" r="4.5" fill="#fff" stroke="#9aa3ad"/></g>`;
        o += dash(f1(80 + Math.cos(a) * 18), f1(70 + Math.sin(a) * 18), f1(80 + Math.cos(a) * 33), f1(70 + Math.sin(a) * 33)); });
      return o + T(80, 132, 7.5, 700, MUT, "water's δ− O faces the cation") + dg.tag(80, 148, "salt dissolving");
    }
  };

  /* ---------- gas laws: piston / cylinder ---------- */
  const gasDots = (x, y, w, h, n, s) => { const r = rnd(s); let o = ""; for (let i = 0; i < n; i++) o += P(x + 5 + r() * (w - 10), y + 5 + r() * (h - 10), 2.6); return o; };
  function cyl(x, top, bottom, n, seed, heat) {
    return `<rect x="${x}" y="22" width="40" height="${bottom - 22}" rx="3" fill="#f4f8fb" stroke="#8a96a3" stroke-width="1.6"/>
      <rect x="${x + 2}" y="${top - 6}" width="36" height="6" fill="#5f6b78"/><rect x="${x + 17}" y="14" width="6" height="${top - 20}" fill="#8a96a3"/>` +
      gasDots(x + 2, top, 36, bottom - top - 2, n, seed) + (heat ? [x + 10, x + 20, x + 30].map(hx => `<path d="M${hx} ${bottom + 12} q-3 -4 0 -8 q3 -4 0 -8" stroke="#e8663c" stroke-width="1.6" fill="none"/>`).join("") : "");
  }
  const GAS = {
    boyle: () => cyl(22, 40, 110, 8, 5) + cyl(98, 76, 110, 8, 5) + arrow(68, 66, 92, 66, HL, 2.6, true) +
      T(42, 124, 8, 800, INK, "low P") + T(118, 124, 8, 800, INK, "high P") + dg.tag(80, 144, "P₁V₁ = P₂V₂"),
    charles: () => cyl(22, 70, 110, 8, 9) + cyl(98, 40, 110, 8, 9, true) + arrow(68, 66, 92, 66, HL, 2.6, true) +
      T(42, 124, 8, 800, INK, "cool") + T(118, 136, 8, 800, "#e8663c", "hot") + dg.tag(80, 150, "V₁/T₁ = V₂/T₂"),
    gaylussac: () => `<rect x="44" y="28" width="72" height="82" rx="20" fill="#e3f1fb" stroke="#6aa6d6" stroke-width="2"/><rect x="70" y="14" width="20" height="14" rx="3" fill="#5f6b78"/>` +
      gasDots(48, 34, 64, 70, 12, 3) + `<circle cx="80" cy="69" r="13" fill="#fff" stroke="${HL}" stroke-width="2.4" class="dg-hl"/><path d="M80 69 L88 61" stroke="${HL}" stroke-width="2"/>` +
      [64, 80, 96].map(hx => `<path d="M${hx} 126 q-3 -4 0 -8 q3 -4 0 -8" stroke="#e8663c" stroke-width="1.6" fill="none"/>`).join("") + dg.tag(80, 146, "P₁/T₁ = P₂/T₂"),
    avogadro: () => cyl(22, 76, 110, 4, 11) + cyl(98, 46, 110, 9, 11) + arrow(68, 66, 92, 66, HL, 2.6, true) +
      T(42, 124, 8, 800, INK, "n") + T(118, 124, 8, 800, INK, "2n") + dg.tag(80, 144, "V ∝ n"),
    combined: () => cyl(22, 50, 110, 8, 13) + cyl(98, 70, 110, 8, 13, true) + arrow(68, 66, 92, 66, HL, 2.6, true) +
      T(42, 124, 8, 700, INK, "P₁ V₁ T₁") + T(118, 136, 8, 700, INK, "P₂ V₂ T₂") + dg.tag(80, 150, "P₁V₁/T₁ = P₂V₂/T₂"),
    ideal: () => `<rect x="54" y="30" width="52" height="88" rx="20" fill="#e6f4ea" stroke="#3f8a5a" stroke-width="2"/><rect x="70" y="16" width="20" height="14" rx="3" fill="#5f6b78"/>` +
      `<rect x="62" y="56" width="36" height="22" rx="3" fill="#fff"/>${T(80, 71, 10, 900, "#3f8a5a", "O₂")}` +
      `<g class="dg-hl"><rect x="34" y="124" width="92" height="18" rx="9" fill="${HL}"/>${T(80, 136.5, 10, 900, "#fff", "PV = nRT")}</g>` + T(80, 154, 7, 700, MUT, "R = 0.08206 L·atm/(mol·K)")
  };
  const GASN = { boyle: "Boyle's law: squeeze it, pressure rises", charles: "Charles's law: heat it, it expands", gaylussac: "Gay-Lussac's law: heat a rigid cylinder, pressure rises",
    avogadro: "Avogadro's law: more moles, more volume", combined: "Combined gas law", ideal: "Ideal gas law" };

  /* ---------- types of solid ---------- */
  const SOL = {
    ionicsolid: () => { let o = ""; for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) { const na = (i + j) % 2, x = 32 + i * 24, y = 36 + j * 22;
        o += `<circle cx="${x}" cy="${y}" r="${na ? 6 : 9}" fill="${na ? "#8a4fd0" : "#3cc14a"}"/>${T(x, y + 3, 7, 900, "#fff", na ? "+" : "−")}`; }
      return `<rect x="18" y="22" width="124" height="96" rx="6" fill="none" stroke="${HL}" stroke-width="2" class="dg-hl"/>` + o + dg.tag(80, 140, "NaCl: ions in a lattice"); },
    molsolid: () => { let o = ""; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const x = 40 + i * 40, y = 40 + j * 30;
        o += `<g transform="translate(${x} ${y})"><circle r="8" fill="#e0323a"/><circle cx="-8" cy="7" r="4.5" fill="#fff" stroke="#9aa3ad"/><circle cx="8" cy="7" r="4.5" fill="#fff" stroke="#9aa3ad"/></g>`;
        if (i < 2) o += dash(x + 13, y, x + 27, y); }
      return o + dg.tag(80, 140, "Ice: molecules + IMFs"); },
    network: () => { let o = "", lines = ""; const pts = [];
      for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) pts.push([30 + i * 25 + (j % 2) * 12, 34 + j * 24]);
      pts.forEach(([x, y], k) => pts.forEach(([x2, y2], m) => { if (m > k && Math.hypot(x - x2, y - y2) < 28) lines += `M${x} ${y}L${x2} ${y2}`; }));
      pts.forEach(([x, y]) => o += `<circle cx="${x}" cy="${y}" r="5.5" fill="#3e444c"/>`);
      return `<path d="${lines}" stroke="${HL}" stroke-width="2.4" class="dg-hl"/>` + o + dg.tag(80, 140, "Diamond: covalent web"); },
    metallic: () => { let o = "", e = ""; const r = rnd(17);
      for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) { const x = 32 + i * 24, y = 36 + j * 22; o += `<circle cx="${x}" cy="${y}" r="8" fill="#b9c5cf" stroke="#8a96a3"/>${T(x, y + 3, 7, 900, INK, "+")}`; }
      for (let k = 0; k < 22; k++) e += `<circle cx="${f1(22 + r() * 116)}" cy="${f1(26 + r() * 90)}" r="1.9" fill="${HL}"/>`;
      return o + `<g class="dg-hl">${e}</g>` + dg.tag(80, 140, "Cations in a sea of e⁻"); }
  };

  function curve() {
    const pts = [[26, 120], [44, 100], [62, 100], [92, 52], [128, 52], [142, 30]];
    return `<path d="M20 128 V18 M20 128 H148" stroke="${MUT}" stroke-width="1.3"/>` +
      `<text x="12" y="74" font-family="Chivo, sans-serif" font-size="7.5" font-weight="700" fill="${MUT}" text-anchor="middle" transform="rotate(-90 12 74)">Temperature</text>` +
      T(84, 140, 7.5, 700, MUT, "Heat added →") +
      `<path d="M${pts.map(p => p.join(" ")).join(" L")}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<g class="dg-hl"><path d="M44 100 H62 M92 52 H128" stroke="${HL}" stroke-width="4" stroke-linecap="round"/></g>` +
      `<path d="M20 100 H44 M20 52 H92" stroke="${MUT}" stroke-dasharray="3 3"/>` + T(23, 98, 7, 800, INK, "0 °C", "start") + T(23, 50, 7, 800, INK, "100 °C", "start") +
      T(53, 94, 7.5, 800, HL, "melt") + T(110, 66, 7.5, 800, HL, "boil") + T(38, 122, 7, 700, MUT, "ice", "start") + T(80, 92, 7, 700, MUT, "water", "start") + T(132, 38, 7, 700, MUT, "steam", "end");
  }

  BGX.DIAGRAMS.states = item => {
    const sp = dg.spots(item)[0];
    if (item && BOXT[sp]) return dg.frame(single(sp), `${BOXT[sp]}: ${BOXN[sp]}`);
    if (item && CH[sp]) return dg.frame(triangle(sp), `${CH[sp][2]}: ${ENDO[sp] ? "absorbs heat" : "releases heat"}`, ENDO[sp] ? ["#FFF6F0", "#FBE1D3"] : ["#F2F8FD", "#DAEAF7"]);
    if (item && IMF[sp]) return dg.frame(IMF[sp](), item.name, ["#FBF3F9", "#F0DDEB"]);
    if (item && GAS[sp]) return dg.frame(GAS[sp](), GASN[sp], ["#FFF9EF", "#F7E6C8"]);
    if (item && SOL[sp]) return dg.frame(SOL[sp](), item.name, ["#F4FAF2", "#DDEDD8"]);
    if (item && item.seq) {   // sequences: a heating curve for the heating/cooling ones, the triangle otherwise
      const id = item.seq.id;
      if (id === "heat" || id === "cool") return dg.frame(curve(), "Heating curve of water: flat steps are phase changes");
      if (id === "space") return dg.frame(overview(null), "Particles in a solid, a liquid and a gas");
      if (id === "breathe") return dg.frame(GAS.boyle(), GASN.boyle, ["#FFF9EF", "#F7E6C8"]);
      if (id === "imf" || id === "bp") return dg.frame(IMF.hbond(), "Hydrogen bonding in water", ["#FBF3F9", "#F0DDEB"]);
      return dg.frame(triangle(null), "The six phase changes");
    }
    return dg.frame(overview(null) + T(80, 146, 7.5, 700, MUT, "solid → liquid → gas"), "Particles in a solid, a liquid and a gas");
  };
})();
