/* BioglowRX diagram "molecule" — ball-and-stick model drawn from each item's formula
   (CPK colours: H white, C dark grey, O red, N blue, Cl green, Na purple, S yellow, Ca dark green).
   Ionic compounds show separate ions; NaCl shows its crystal lattice. Coordinates are hand-placed. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  // element: [light, base, dark, radius]
  const EL = {
    H: ["#ffffff", "#e6eaee", "#9aa3ad", 7.5], C: ["#8a929c", "#3e444c", "#15181d", 11],
    N: ["#9cbaff", "#2f62d8", "#14306f", 11], O: ["#ff9a9a", "#e0323a", "#7d0f16", 11],
    Cl: ["#b8f5b0", "#3cc14a", "#16641f", 14.5], Na: ["#dcc2ff", "#8a4fd0", "#43207a", 12],
    S: ["#fff3a6", "#f0c21b", "#8a6a00", 13.5], Ca: ["#b6e3b0", "#3e8f4a", "#17451f", 14]
  };
  // molecules: a = [element, x, y, z(depth: + is nearer)], b = [i, j, order], s = atom scale, ions = [[x, y, text]]
  const M = {
    "H₂O": { a: [["O", 80, 70, 0], ["H", 52, 91.5, 0], ["H", 108, 91.5, 0]], b: [[0, 1, 1], [0, 2, 1]], note: "bent, 104.5°" },
    "CO₂": { a: [["O", 38, 80, 0], ["C", 80, 80, 0], ["O", 122, 80, 0]], b: [[0, 1, 2], [1, 2, 2]], note: "straight line" },
    "CO": { a: [["C", 62, 80, 0], ["O", 100, 80, 0]], b: [[0, 1, 3]] },
    "NH₃": { a: [["H", 50, 92, -.6], ["H", 110, 92, -.6], ["N", 80, 66, 0], ["H", 82, 108, 1]], b: [[2, 0, 1], [2, 1, 1], [2, 3, 1]], note: "pyramid" },
    "H₂O₂": { a: [["H", 42, 56, 0], ["O", 64, 82, 0], ["O", 98, 76, 0], ["H", 118, 102, 0]], b: [[0, 1, 1], [1, 2, 1], [2, 3, 1]] },
    "O₂": { a: [["O", 61, 80, 0], ["O", 99, 80, 0]], b: [[0, 1, 2]] },
    "N₂": { a: [["N", 61, 80, 0], ["N", 99, 80, 0]], b: [[0, 1, 3]] },
    "O₃": { a: [["O", 80, 62, 0], ["O", 46, 84, 0], ["O", 114, 84, 0]], b: [[0, 1, 2], [0, 2, 1]], note: "bent, 117°" },
    "NaHCO₃": { a: [["Na", 30, 52, 0], ["C", 90, 86, 0], ["O", 90, 52, 0], ["O", 61, 103, 0], ["O", 119, 103, 0], ["H", 140, 90, 0]],
      b: [[1, 2, 2], [1, 3, 1], [1, 4, 1], [4, 5, 1]], ions: [[30, 32, "Na⁺"], [62, 128, "HCO₃⁻"]] },
    "CaCO₃": { a: [["Ca", 32, 54, 0], ["C", 94, 86, 0], ["O", 94, 52, 0], ["O", 65, 103, 0], ["O", 123, 103, 0]],
      b: [[1, 2, 2], [1, 3, 1], [1, 4, 1]], ions: [[32, 32, "Ca²⁺"], [94, 128, "CO₃²⁻"]] },
    "HCl": { a: [["H", 58, 80, 0], ["Cl", 98, 80, 0]], b: [[0, 1, 1]] },
    "H₂SO₄": { a: [["H", 28, 64, 0], ["H", 132, 96, 0], ["O", 80, 45, -.3], ["O", 80, 115, -.3], ["S", 80, 80, 0], ["O", 46, 80, .3], ["O", 114, 80, .3]],
      b: [[4, 2, 2], [4, 3, 2], [4, 5, 1], [4, 6, 1], [5, 0, 1], [6, 1, 1]] },
    "HNO₃": { a: [["N", 78, 84, 0], ["O", 78, 49, 0], ["O", 48, 102, 0], ["O", 108, 102, 0], ["H", 132, 88, 0]],
      b: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [3, 4, 1]] },
    "NaOH": { a: [["Na", 44, 82, 0], ["O", 98, 82, 0], ["H", 124, 72, 0]], b: [[1, 2, 1]], ions: [[44, 58, "Na⁺"], [106, 58, "OH⁻"]] },
    "CH₄": { a: [["H", 118, 95, -.6], ["H", 80, 42, 0], ["C", 80, 82, 0], ["H", 42, 97, .2], ["H", 90, 118, 1]],
      b: [[2, 0, 1], [2, 1, 1], [2, 3, 1], [2, 4, 1]], note: "tetrahedron" },
    "C₂H₅OH": { s: .9, a: [["H", 62, 114, -.6], ["H", 98, 46, -.6], ["C", 48, 88, 0], ["C", 82, 70, 0], ["O", 116, 88, 0], ["H", 26, 76, 0], ["H", 38, 114, .6], ["H", 70, 44, .6], ["H", 138, 76, 0]],
      b: [[2, 3, 1], [3, 4, 1], [2, 5, 1], [2, 6, 1], [2, 0, 1], [3, 7, 1], [3, 1, 1], [4, 8, 1]] },
    // β-D-glucose ring (Haworth view): ring C1–C5 + ring O, OH groups and H on each carbon
    "C₆H₁₂O₆": { s: .6, a: [
      ["C", 54, 58, -.4], ["O", 104, 58, -.4], ["C", 130, 80, 0], ["C", 108, 102, .5], ["C", 52, 102, .5], ["C", 28, 80, 0], // 0 C5, 1 ring O, 2 C1, 3 C2, 4 C3, 5 C4
      ["O", 130, 56, 0], ["H", 144, 48, 0], ["H", 130, 98, 0],     // C1: OH up, H down
      ["O", 108, 124, .5], ["H", 122, 130, .5], ["H", 108, 86, .5], // C2: OH down, H up
      ["O", 52, 82, .5], ["H", 40, 74, .5], ["H", 52, 122, .5],     // C3: OH up, H down
      ["O", 28, 104, 0], ["H", 16, 112, 0], ["H", 28, 62, 0],       // C4: OH down, H up
      ["C", 54, 34, -.4], ["H", 62, 70, -.6], ["O", 80, 24, -.4], ["H", 94, 30, -.4], ["H", 40, 24, -.4], ["H", 60, 14, -.6] // C6, C5-H, O6, H, C6 H's
    ], b: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 0, 1], [2, 6, 1], [6, 7, 1], [2, 8, 1], [3, 9, 1], [9, 10, 1], [3, 11, 1],
      [4, 12, 1], [12, 13, 1], [4, 14, 1], [5, 15, 1], [15, 16, 1], [5, 17, 1], [0, 18, 1], [0, 19, 1], [18, 20, 1], [20, 21, 1], [18, 22, 1], [18, 23, 1]], note: "ring" }
  };

  function grads(p, els) {
    return els.map(e => { const c = EL[e]; return `<radialGradient id="${p}${e}" cx=".36" cy=".32" r=".72"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient>`; }).join("");
  }
  const atom = (p, e, x, y, r) => `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="url(#${p}${e})" stroke="${EL[e][2]}" stroke-opacity=".55" stroke-width=".8"/>`;
  function bond(A, B, order, w) {
    const dx = B[1] - A[1], dy = B[2] - A[2], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, gap = order === 3 ? 4 * w : 3.4 * w;
    const offs = order === 1 ? [0] : order === 2 ? [-gap / 2, gap / 2] : [-gap, 0, gap];
    return offs.map(o => { const x1 = (A[1] + nx * o).toFixed(1), y1 = (A[2] + ny * o).toFixed(1), x2 = (B[1] + nx * o).toFixed(1), y2 = (B[2] + ny * o).toFixed(1);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#5f6770" stroke-width="${(order > 1 ? 3.4 : 5) * w}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d6dbe0" stroke-width="${(order > 1 ? 1.6 : 2.6) * w}" stroke-linecap="round"/>`; }).join("");
  }
  function mol(p, m) {
    const s = m.s || 1;
    let o = m.b.map(([i, j, k]) => bond(m.a[i], m.a[j], k, s)).join("");
    m.a.map((a, i) => [a, i]).sort((u, v) => u[0][3] - v[0][3]).forEach(([a]) => { o += atom(p, a[0], a[1], a[2], EL[a[0]][3] * s * (1 + .12 * a[3])); });
    return o;
  }
  function lattice(p) {
    let lines = "", balls = [];
    const P = (i, j, k) => [80 + (i - 1) * 30 + (k - 1) * 14, 82 + (j - 1) * 30 - (k - 1) * 14];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) {
      const a = P(i, j, k);
      [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach(([u, v, w]) => { if (i + u < 3 && j + v < 3 && k + w < 3) { const b = P(i + u, j + v, k + w); lines += `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`; } });
      balls.push([k, (i + j + k) % 2 ? "Cl" : "Na", a]);
    }
    balls.sort((u, v) => v[0] - u[0]);
    return `<path d="${lines}" stroke="#8a929c" stroke-width="1.2" opacity=".7"/>` + balls.map(([k, e, a]) => atom(p, e, a[0], a[1], (e === "Na" ? 7.5 : 12) * (1 - k * .07))).join("");
  }
  const ELS = s => Object.keys(EL).filter(e => new RegExp(e + "(?![a-z])").test(s));

  BGX.DIAGRAMS.molecule = item => {
    const p = dg.uid();
    if (!item) {
      const parts = [["H₂O", "translate(-14 -2) scale(.7)"], ["CO₂", "translate(68 6) scale(.6)"], ["CH₄", "translate(20 42) scale(.75)"]];
      const inner = `<defs>${grads(p, ["H", "C", "O"])}</defs>` + parts.map(([f, t]) => `<g transform="${t}">${mol(p, M[f])}</g>`).join("") +
        dg.tag(42, 24, "H₂O") + dg.tag(116, 24, "CO₂") + dg.tag(80, 146, "CH₄");
      return dg.frame(inner, "Ball-and-stick models of water, carbon dioxide and methane");
    }
    const f = item.formula, m = M[f];
    let inner;
    if (f === "NaCl") inner = `<defs>${grads(p, ["Na", "Cl"])}</defs>${lattice(p)}` + dg.tag(30, 26, "Na⁺") + dg.tag(130, 26, "Cl⁻");
    else if (m) inner = `<defs>${grads(p, ELS(f))}</defs>${mol(p, m)}` + (m.ions || []).map(([x, y, t]) => dg.tag(x, y, t)).join("");
    else return "";
    inner += dg.tag(80, 146, f + (m && m.note ? " · " + m.note : ""));
    return dg.frame(inner, `Model of ${item.name} (${f})`);
  };
})();
