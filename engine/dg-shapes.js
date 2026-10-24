/* BioglowRX diagram "shapes" — chemical bonds and VSEPR molecular shapes.
   3D ball-and-stick shapes (item.spot): linear · bent · trigplanar · trigpyr · tetra · tbp · seesaw · tshape · octa · sqplanar
   (the central and outer elements come from item.atoms = [centre, outer]).
   Bonds: ionic (item.ions) · polar · nonpolar (item.atoms = [less electronegative, more electronegative]).
   Ideas: en · lewis · octet · lonepair · vsepr · dipole. Overview (null): methane with its 109.5° angle. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL, INK = "#1B2430", MUT = "#55616e";
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const f1 = n => n.toFixed(1);
  // element: [light, base, dark, radius]
  const EL = {
    H: ["#ffffff", "#e6eaee", "#9aa3ad", 7], C: ["#8a929c", "#3e444c", "#15181d", 10], N: ["#9cbaff", "#2f62d8", "#14306f", 10],
    O: ["#ff9a9a", "#e0323a", "#7d0f16", 10], F: ["#e6ffb0", "#9ad43a", "#4e7a10", 8.5], Cl: ["#b8f5b0", "#3cc14a", "#16641f", 10],
    B: ["#ffd6c4", "#f08a64", "#8a3a1c", 9.5], P: ["#ffd09a", "#f08a1a", "#7a4100", 11.5], S: ["#fff3a6", "#f0c21b", "#8a6a00", 11.5],
    Xe: ["#a8f0f0", "#2fb3b8", "#0f5a5e", 12.5], Na: ["#dcc2ff", "#8a4fd0", "#43207a", 11], K: ["#e6c8ff", "#9b5de0", "#4a1f80", 12.5],
    Mg: ["#c8f0b8", "#5aa84a", "#24561a", 10], Ca: ["#b6e3b0", "#3e8f4a", "#17451f", 12]
  };
  const grads = (p, els) => `<defs>${els.filter((e, i) => EL[e] && els.indexOf(e) === i).map(e => { const c = EL[e];
    return `<radialGradient id="${p}${e}" cx=".36" cy=".32" r=".72"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient>`; }).join("")}</defs>`;
  const ball = (p, e, x, y, r) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="url(#${p}${e})" stroke="${EL[e][2]}" stroke-opacity=".55" stroke-width=".8"/>`;
  const stick = (x1, y1, x2, y2, w) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#5f6770" stroke-width="${w || 4.6}" stroke-linecap="round"/><line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#d6dbe0" stroke-width="${(w || 4.6) * .5}" stroke-linecap="round"/>`;

  /* ---------- VSEPR geometry: unit vectors, "L" = lone pair ---------- */
  const deg = Math.PI / 180;
  const v = (a, b, c) => { const n = Math.hypot(a, b, c); return [a / n, b / n, c / n]; };
  const tetUp = [0, 1, 0], tetLow = k => { const az = (k * 120 + 30) * deg, r = Math.sqrt(8) / 3; return [r * Math.cos(az), -1 / 3, r * Math.sin(az)]; };
  const eq = k => { const az = (k * 120 + 90) * deg; return [Math.cos(az), 0, Math.sin(az)]; };
  const halfB = 104.5 / 2 * deg;
  const S = {
    linear:     { name: "Linear", angle: "180°", view: [0, 18], b: [[-1, 0, 0], [1, 0, 0]], lp: [], arc: [0, 1] },
    bent:       { name: "Bent (V-shaped)", short: "Bent", angle: "104.5°", view: [0, 8], b: [[-Math.sin(halfB), -Math.cos(halfB), 0], [Math.sin(halfB), -Math.cos(halfB), 0]], lp: [v(-.4, .6, .7), v(.4, .6, -.7)], arc: [0, 1] },
    trigplanar: { name: "Trigonal planar", angle: "120°", view: [0, 62], b: [[0, 0, 1], v(Math.cos(-30 * deg), 0, Math.sin(-30 * deg)), v(-Math.cos(-30 * deg), 0, Math.sin(-30 * deg))].map(x => [x[0], x[1], -x[2]]), lp: [], arc: [1, 2] },
    trigpyr:    { name: "Trigonal pyramidal", angle: "107°", view: [-10, 14], b: [0, 1, 2].map(k => { const t = tetLow(k); return v(t[0], t[1] - .06, t[2]); }), lp: [tetUp], arc: [0, 1] },
    tetra:      { name: "Tetrahedral", angle: "109.5°", view: [-10, 14], b: [tetUp, tetLow(0), tetLow(1), tetLow(2)], lp: [], arc: [0, 1] },
    tbp:        { name: "Trigonal bipyramidal", short: "Trig. bipyramidal", angle: "90° · 120°", view: [-18, 14], b: [[0, 1, 0], [0, -1, 0], eq(0), eq(1), eq(2)], lp: [], arc: [0, 3] },
    seesaw:     { name: "Seesaw", angle: "≈102°", view: [55, 22], b: [v(0, 1, -.06), v(0, -1, -.06), eq(1), eq(2)], lp: [eq(0)], arc: [2, 3] },
    tshape:     { name: "T-shaped", angle: "≈87.5°", view: [35, 14], b: [v(-.05, 1, 0), v(-.05, -1, 0), [-1, 0, 0]], lp: [[.5, 0, .87], [.5, 0, -.87]], arc: [0, 2] },
    octa:       { name: "Octahedral", angle: "90°", view: [-22, 16], b: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], lp: [], arc: [0, 2] },
    sqplanar:   { name: "Square planar", angle: "90°", view: [-20, 18], b: [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]], lp: [[0, 1, 0], [0, -1, 0]], arc: [0, 2] }
  };
  function project(u, view, cx, cy, L) {
    const ya = view[0] * deg, pa = view[1] * deg;
    let x = u[0] * Math.cos(ya) + u[2] * Math.sin(ya), z = -u[0] * Math.sin(ya) + u[2] * Math.cos(ya), y = u[1];
    const y2 = y * Math.cos(pa) - z * Math.sin(pa), z2 = y * Math.sin(pa) + z * Math.cos(pa);
    return { x: cx + x * L, y: cy - y2 * L, z: z2 };
  }
  const lobe = (c, q, L, hl) => {
    const dx = q.x - c.x, dy = q.y - c.y, ang = Math.atan2(dy, dx) / deg, len = Math.hypot(dx, dy) * .5 + 6;
    const mx = c.x + dx * .62, my = c.y + dy * .62;
    return `<g transform="translate(${f1(mx)} ${f1(my)}) rotate(${f1(ang)})"${hl ? ' class="dg-hl"' : ""}><ellipse rx="${f1(Math.max(len * .5, 8))}" ry="7.5" fill="${hl ? HL : "#b9c7f0"}" fill-opacity="${hl ? .55 : .6}" stroke="${hl ? HL : "#7f93cf"}" stroke-width=".8"/>
      <circle cx="${f1(Math.max(len * .2, 3))}" cy="-2.6" r="1.6" fill="${INK}"/><circle cx="${f1(Math.max(len * .2, 3))}" cy="2.6" r="1.6" fill="${INK}"/></g>`;
  };
  /* arc between two outer atoms, drawn around the centre */
  function arcLabel(c, a, b, label, r) {
    let a1 = Math.atan2(a.y - c.y, a.x - c.x), a2 = Math.atan2(b.y - c.y, b.x - c.x);
    let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    if (Math.abs(Math.abs(d) - Math.PI) < .05) d = Math.sin(a1) > 0 ? -Math.PI : Math.PI;   // 180°: arc over the top
    if (Math.abs(Math.abs(d) - Math.PI) < .05 && Math.sin(a1 + d / 2) > 0) d = -d;
    const pts = []; for (let i = 0; i <= 14; i++) { const t = a1 + d * i / 14; pts.push(`${f1(c.x + Math.cos(t) * r)} ${f1(c.y + Math.sin(t) * r)}`); }
    const m = a1 + d / 2, lx = c.x + Math.cos(m) * (r + 13), ly = c.y + Math.sin(m) * (r + 13) + 3;
    return `<path d="M${pts.join(" L")}" fill="none" stroke="${HL}" stroke-width="1.8" class="dg-hl"/>` +
      `<rect x="${f1(lx - label.length * 2.6 - 3)}" y="${f1(ly - 9)}" width="${f1(label.length * 5.2 + 6)}" height="12" rx="6" fill="#fff" opacity=".9"/>` + T(f1(lx), f1(ly), 8, 800, HL, label);
  }
  function shape3D(p, key, ce, oe, opts) {
    const g = S[key], o = opts || {}, cx = o.cx || 80, cy = o.cy || 76, L = o.L || (g.b.length + g.lp.length >= 6 ? 42 : 46), sc = o.scale || 1;
    const c = project([0, 0, 0], g.view, cx, cy, L);
    const parts = [];
    g.b.forEach((u, i) => { const q = project(u, g.view, cx, cy, L); parts.push({ z: q.z / 2, d: stick(c.x, c.y, q.x, q.y, 4.6 * sc) }); parts.push({ z: q.z, q, i, d: ball(p, oe, q.x, q.y, EL[oe][3] * sc * (1 + .14 * q.z)) }); });
    g.lp.forEach(u => { const q = project(u, g.view, cx, cy, L * .9); parts.push({ z: q.z + .01, d: lobe(c, q, L, o.hlLone) }); });
    parts.push({ z: 0.001, d: ball(p, ce, c.x, c.y, EL[ce][3] * sc * 1.12) });
    parts.sort((a, b) => a.z - b.z);
    let out = parts.map(x => x.d).join("");
    if (o.arc !== false) {
      const pa = project(g.b[g.arc[0]], g.view, cx, cy, L), pb = project(g.b[g.arc[1]], g.view, cx, cy, L);
      out += arcLabel(c, pa, pb, o.arcText || g.angle, o.arcR || 17);
    }
    return out;
  }

  /* ---------- bond pictures ---------- */
  function ionic(p, it) {
    const [m, n] = it.atoms, [ci, ai] = it.ions || ["+", "−"];
    return grads(p, [m, n]) + `<path d="M50 62 Q80 30 110 62" fill="none" stroke="${HL}" stroke-width="2.2" stroke-dasharray="4 3" class="dg-hl"/><path d="M104 56 L111 63 L102 65" fill="none" stroke="${HL}" stroke-width="2.2"/>
      <circle cx="80" cy="40" r="5" fill="${HL}"/>${T(80, 30, 8, 800, HL, "e⁻ moves")}
      ${ball(p, m, 46, 86, 16)}${ball(p, n, 114, 86, 22)}
${dg.tag(46, 122, ci)}${dg.tag(114, 122, ai)}
      ${T(80, 90, 14, 900, MUT, "+ −")}${T(80, 146, 8, 700, INK, "Electron transferred: ions attract")}`;
  }
  function covalent(p, it, polar) {
    const [a, b] = it.atoms, dbl = /=/.test(it.name), r1 = Math.max(EL[a][3] * 1.6, 13), r2 = Math.max(EL[b][3] * 1.6, 13);
    const x1 = 52, x2 = 108, y = 76;
    const cloud = polar
      ? `<radialGradient id="${p}cl" cx=".72" cy=".5" r=".7"><stop offset="0" stop-color="${HL}" stop-opacity=".55"/><stop offset="1" stop-color="${HL}" stop-opacity=".06"/></radialGradient><ellipse cx="86" cy="${y}" rx="56" ry="30" fill="url(#${p}cl)" class="dg-hl"/>`
      : `<ellipse cx="80" cy="${y}" rx="56" ry="28" fill="${HL}" fill-opacity=".22" stroke="${HL}" stroke-opacity=".5" class="dg-hl"/>`;
    const sticks = dbl ? stick(x1, y - 4, x2, y - 4, 3.6) + stick(x1, y + 4, x2, y + 4, 3.6) : stick(x1, y, x2, y, 5);
    const pr = `<circle cx="${polar ? 92 : 80}" cy="${y - 3}" r="2" fill="${INK}"/><circle cx="${polar ? 92 : 80}" cy="${y + 3}" r="2" fill="${INK}"/>`;
    const lab = polar
      ? T(x1, y - 26, 11, 900, INK, "δ+") + T(x2, y - 30, 11, 900, HL, "δ−") +
        `<path d="M58 118 H104" stroke="${INK}" stroke-width="2"/><path d="M98 113 L105 118 L98 123" fill="none" stroke="${INK}" stroke-width="2"/><path d="M63 113 V123" stroke="${INK}" stroke-width="2"/>` + T(80, 134, 7.5, 700, MUT, "dipole points to δ−")
      : T(80, 124, 8, 800, INK, it.atoms[0] === it.atoms[1] ? "Shared equally" : "Shared almost equally");
    const defs = polar ? `<defs><radialGradient id="${p}cl" cx=".72" cy=".5" r=".7"><stop offset="0" stop-color="${HL}" stop-opacity=".55"/><stop offset="1" stop-color="${HL}" stop-opacity=".06"/></radialGradient></defs>` : "";
    return grads(p, [a, b]) + defs + cloud.replace(/<radialGradient[\s\S]*?<\/radialGradient>/, "") + sticks + ball(p, a, x1, y, r1) + ball(p, b, x2, y, r2) + pr + lab +
      T(80, 150, 7.5, 700, MUT, it.en ? it.en.split(" · ").pop() : "");
  }

  /* ---------- idea pictures ---------- */
  const lewisAtom = (x, y, sym, pairs, hl) => {   // pairs: list of sides "t","b","l","r" with lone-pair dots
    const d = { t: [[-3, -11], [3, -11]], b: [[-3, 12], [3, 12]], l: [[-11, -3], [-11, 3]], r: [[11, -3], [11, 3]] };
    return T(x, y + 4.5, 13, 900, INK, sym) + pairs.map(s => d[s].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="1.9" fill="${hl ? HL : INK}"/>`).join("")).join("");
  };
  const IDEA = {
    en: () => {
      const cells = [];
      const syms = [["H", "", "", "", ""], ["Li", "C", "N", "O", "F"], ["Na", "Si", "P", "S", "Cl"], ["K", "", "", "Se", "Br"]];
      syms.forEach((row, r) => row.forEach((s, c) => { if (!s) return; const x = 26 + c * 24, y = 30 + r * 24, hl = s === "F";
        cells.push(`<rect x="${x}" y="${y}" width="22" height="22" rx="4" fill="${hl ? HL : "#fff"}" stroke="#9fb3c4"${hl ? ' class="dg-hl"' : ""}/>${T(x + 11, y + 15, 8.5, 800, hl ? "#fff" : INK, s)}`); }));
      return cells.join("") + `<path d="M30 132 H128" stroke="${HL}" stroke-width="2.4"/><path d="M122 127 L129 132 L122 137" fill="none" stroke="${HL}" stroke-width="2.4"/>
        <path d="M144 124 V36" stroke="${HL}" stroke-width="2.4"/><path d="M139 42 L144 35 L149 42" fill="none" stroke="${HL}" stroke-width="2.4"/>
        ${T(80, 148, 8, 800, INK, "pull rises towards F (3.98)")}`;
    },
    lewis: () => `${lewisAtom(80, 66, "O", ["t", "b"])}${T(42, 70.5, 13, 900, INK, "H")}${T(118, 70.5, 13, 900, INK, "H")}
      <path d="M50 66 H70 M90 66 H110" stroke="${INK}" stroke-width="2.4"/>
      <g class="dg-hl"><rect x="50" y="96" width="60" height="16" rx="8" fill="${HL}"/>${T(80, 107.5, 8, 800, "#fff", "8 valence e⁻")}</g>
      ${T(80, 128, 7.5, 700, MUT, "line = shared pair (bond)")}${T(80, 140, 7.5, 700, MUT, "dots = lone pair")}${T(80, 28, 8, 800, INK, "Water, H₂O")}`,
    octet: () => `<circle cx="56" cy="72" r="24" fill="${HL}" fill-opacity=".14" stroke="${HL}" stroke-width="2" stroke-dasharray="4 3" class="dg-hl"/><circle cx="104" cy="72" r="24" fill="none" stroke="${MUT}" stroke-width="1.4" stroke-dasharray="4 3"/>
      ${lewisAtom(50, 72, "Cl", ["t", "b", "l"])}${lewisAtom(110, 72, "Cl", ["t", "b", "r"])}<path d="M64 72 H96" stroke="${INK}" stroke-width="2.4"/>
      ${T(80, 120, 8, 800, INK, "each Cl: 6 + 2 shared = 8")}${T(80, 134, 7.5, 700, MUT, "H needs only 2")}${T(80, 30, 8, 800, INK, "Cl₂")}`,
    vsepr: () => [["2", "linear", "180°"], ["3", "trigonal planar", "120°"], ["4", "tetrahedral", "109.5°"], ["5", "trig. bipyramidal", "90°/120°"], ["6", "octahedral", "90°"]].map(([n, s, a], i) => {
        const y = 28 + i * 24;
        return `<circle cx="22" cy="${y}" r="9" fill="${i === 2 ? HL : "#2f62d8"}"${i === 2 ? ' class="dg-hl"' : ""}/>${T(22, y + 3.5, 9, 900, "#fff", n)}${T(36, y + 3, 8, 800, INK, s, "start")}${T(146, y + 3, 8, 800, MUT, a, "end")}`; }).join("") +
      T(80, 150, 7.5, 700, MUT, "electron groups → arrangement"),
  };

  const NAMES = { linear: "Linear", bent: "Bent", trigplanar: "Trigonal planar", trigpyr: "Trigonal pyramidal", tetra: "Tetrahedral", tbp: "Trigonal bipyramidal",
    seesaw: "Seesaw", tshape: "T-shaped", octa: "Octahedral", sqplanar: "Square planar" };

  BGX.DIAGRAMS.shapes = item => {
    const p = dg.uid(), sp = dg.spots(item)[0];
    if (item && S[sp]) {
      const [ce, oe] = item.atoms || ["C", "H"], g = S[sp];
      return dg.frame(grads(p, [ce, oe]) + shape3D(p, sp, ce, oe) + dg.tag(80, 146, `${item.formula || ""} · ${g.short || g.name}`), `${item.formula || ""}: ${g.name}, ${g.angle}`, ["#F2F6FD", "#DCE6F6"]);
    }
    if (item && sp === "ionic") return dg.frame(ionic(p, item), `Ionic bond in ${item.name}`, ["#FFF4F1", "#FADDD5"]);
    if (item && (sp === "polar" || sp === "nonpolar")) return dg.frame(covalent(p, item, sp === "polar"), `${sp === "polar" ? "Polar" : "Non-polar"} covalent bond: ${item.name}`, ["#F7FAF3", "#E2EDD8"]);
    if (item && sp === "lonepair") return dg.frame(grads(p, ["N", "H"]) + shape3D(p, "trigpyr", "N", "H", { hlLone: true, arc: false }) + dg.tag(80, 146, "NH₃: 1 lone pair on N"), "A lone pair on nitrogen in ammonia");
    if (item && sp === "dipole") return dg.frame(grads(p, ["O", "H"]) + shape3D(p, "bent", "O", "H", { arc: false, cy: 66 }) +
      T(40, 112, 11, 900, INK, "δ+") + T(120, 112, 11, 900, INK, "δ+") + T(108, 72, 11, 900, HL, "δ−") +
      `<g class="dg-hl"><path d="M80 120 V92" stroke="${HL}" stroke-width="2.6"/><path d="M75 98 L80 91 L85 98" fill="none" stroke="${HL}" stroke-width="2.6"/><path d="M75 114 H85" stroke="${HL}" stroke-width="2.6"/></g>` +
      dg.tag(80, 146, "H₂O dipole ≈ 1.85 D"), "Water's dipole points towards oxygen");
    if (item && IDEA[sp]) return dg.frame(IDEA[sp](p), item.name);
    /* overview */
    return dg.frame(grads(p, ["C", "H"]) + shape3D(p, "tetra", "C", "H") + dg.tag(80, 146, "CH₄ · tetrahedral"), "VSEPR: methane is a tetrahedron with 109.5° bond angles", ["#F2F6FD", "#DCE6F6"]);
  };
})();
