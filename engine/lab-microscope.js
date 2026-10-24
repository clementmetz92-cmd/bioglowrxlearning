/* BioglowRX — Microscope Lab (Anatomy & Physiology, Saladin chapters 3–5: cells and tissues).
   A hands-on mini game: put a slide on the stage, clip it, start on 4×, focus with the coarse knob,
   set the light with the iris diaphragm, go up to 10× and 40× using only the fine knob, then identify
   the tissue. Specimens are drawn at true scale in micrometres, so the field of view is real:
   4× ≈ 4.5 mm, 10× ≈ 1.8 mm, 40× ≈ 0.45 mm (eyepiece field number 18 mm).
   Loads after core.js, icons.js and lab-kit.js. */
(function () {
  "use strict";
  const BGX = window.BGX, esc = BGX.esc;
  const view = document.getElementById("br-view");
  const $ = s => view.querySelector(s);
  const ID = "microscope-lab";

  /* ---------------- optics ---------------- */
  const FN = 18000;                                   // eyepiece field number in µm (18 mm)
  const FOV = { 4: FN / 4, 10: FN / 10, 40: FN / 40 }; // field diameter in µm
  const DOF = { 4: 40, 10: 7, 40: 1.8 };              // depth of field (µm): sharp when within ±half of it
  const GAIN = { 4: 1, 10: 0.7, 40: 0.45 };           // higher power = dimmer image for the same iris opening
  const LIGHT_OK = [22, 48];                          // comfortable image brightness range
  const COARSE = 4, FINE = 0.2;                       // µm of stage travel per degree of knob turn
  const OBJ_COL = { 4: "#D9473B", 10: "#E8B923", 40: "#3A8FD6" };   // standard objective colour bands
  const LENS_LEN = { 4: 38, 10: 48, 40: 57 };          // drawn length in the side view (longer = closer to the slide)

  const LEVELS = [
    { n: 1, title: "First focus", desc: "Guided: one easy slide, 4× then 10×, with live tips and focus/light meters.", target: 10, count: 1, pool: "easy", calc: false },
    { n: 2, title: "On your own", desc: "Three slides. Start each one at low power and reach 40× sharp before you identify it.", target: 40, count: 3, pool: "all", calc: false },
    { n: 3, title: "Measure it", desc: "Two slides at 40×, then work out the total magnification and the cell size from the field of view.", target: 40, count: 2, pool: "measure", calc: true }
  ];
  const K = BGX.labKit({ id: ID, title: "Microscope Lab", subject: "anatomy", subjectName: "Anatomy & Physiology", tagline: "Hands-on lab: focus a microscope and identify tissues" });
  const STEPS = [
    "<b>Drag the slide</b> from the tray onto the stage, then tap the stage to <b>clip it</b> in place.",
    "Turn the nosepiece to the <b>4×</b> objective (red band). Always start on the lowest power.",
    "Turn the big <b>coarse focus</b> knob (drag around it) until the image is roughly sharp.",
    "Set the <b>light</b> with the iris diaphragm lever: not too dark, not washed out.",
    "Switch to <b>10×</b> (levels 2–3: then <b>40×</b>). At high power use <b>only the small fine focus</b> knob.",
    "<b>Identify</b> the tissue from its clues. Level 3: then work out the magnification and cell size."
  ];

  /* ---------------- small helpers ---------------- */
  const mul = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const hsh = (a, b, s) => { let h = Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263) + Math.imul(s | 0, 1442695041) | 0; h = Math.imul(h ^ h >>> 13, 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
  const U = (r, a, b) => a + r() * (b - a);
  const f = n => (Math.round(n * 10) / 10).toString();
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let UID = 0;
  function smooth(p) {
    const n = p.length; let d = `M${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + "Z";
  }
  function blob(cx, cy, rx, ry, irr, n, r, rot = 0) {
    const p = [];
    for (let i = 0; i < n; i++) { const a = i / n * 2 * Math.PI, k = 1 + (r() * 2 - 1) * irr, x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k; p.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]); }
    return smooth(p);
  }
  /* emit something inside a repeating tile, adding copies across the edges so the tile joins seamlessly */
  function wrap(x, y, m, W, H, fn, wy = true) {
    const xs = [0], ys = [0]; if (x - m < 0) xs.push(W); if (x + m > W) xs.push(-W);
    if (wy) { if (y - m < 0) ys.push(H); if (y + m > H) ys.push(-H); }
    let o = ""; for (const ox of xs) for (const oy of ys) o += fn(x + ox, y + oy); return o;
  }
  const pat = (id, W, H, body, extra = "") => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${f(W)}" height="${f(H)}" ${extra}>${body}</pattern>`;
  /* pointy-top hexagon lattice with shared, jittered corners: tiles a plane with irregular polygons (fat cells, epidermal cells) */
  function hexCells(cols, rows, r, jit, seed, wrapY) {
    const w = Math.sqrt(3) * r, X = 2 * cols, Y = 3 * rows, out = [];
    const v = (a, b) => { const ka = ((a % X) + X) % X, kb = wrapY ? ((b % Y) + Y) % Y : b; return [a * w / 2 + (hsh(ka, kb, seed) - .5) * 2 * jit * r, b * r / 2 + (hsh(ka, kb, seed + 7) - .5) * 2 * jit * r]; };
    for (let j = -1; j <= rows; j++) for (let i = -1; i <= cols; i++) {
      const cx = 2 * i + (j & 1), cy = 3 * j;
      const pts = [[cx, cy - 2], [cx + 1, cy - 1], [cx + 1, cy + 1], [cx, cy + 2], [cx - 1, cy + 1], [cx - 1, cy - 1]].map(q => v(q[0], q[1]));
      const ci = ((i % cols) + cols) % cols, cj = wrapY ? ((j % rows) + rows) % rows : j;
      out.push({ pts, x: pts.reduce((s, q) => s + q[0], 0) / 6, y: pts.reduce((s, q) => s + q[1], 0) / 6, h: hsh(ci, cj, seed + 13), h2: hsh(ci, cj, seed + 29) });
    }
    return { cells: out, W: cols * w, H: rows * 1.5 * r };
  }
  const polyD = pts => "M" + pts.map(q => f(q[0]) + " " + f(q[1])).join("L") + "Z";
  const shrink = (c, k) => c.pts.map(q => [c.x + (q[0] - c.x) * k, c.y + (q[1] - c.y) * k]);
  /* smooth muscle tile: spindle cells with one cigar-shaped central nucleus, no stripes */
  function smoothTile(id, r) {
    const W = 220, H = 110; let b = `<rect width="${W}" height="${H}" fill="#EDA4C0"/>`;
    for (let i = 0; i < 46; i++) {
      const x = U(r, 0, W), y = U(r, 0, H), L = U(r, 70, 110), w = U(r, 4.2, 6.2), a = U(r, -5, 5), shade = r() < .5 ? "#E996B6" : "#E48DB0", nl = U(r, 6.5, 9), dn = U(r, -.6, .6);
      b += wrap(x, y, L / 2 + 4, W, H, (X, Y) => `<g transform="translate(${f(X)} ${f(Y)}) rotate(${f(a)})"><path d="M${f(-L / 2)} 0Q0 ${f(-w)} ${f(L / 2)} 0Q0 ${f(w)} ${f(-L / 2)} 0Z" fill="${shade}" stroke="#D27BA0" stroke-width=".5"/><rect x="${f(-nl)}" y="${f(-1.5 + dn)}" width="${f(2 * nl)}" height="3" rx="1.5" fill="#4E2D80"/></g>`);
    }
    return pat(id, W, H, b);
  }
  const stripes = (id, op) => pat(id, 2.5, 20, `<rect width="1.4" height="20" fill="#B04B7C" opacity="${op}"/>`);

  /* ---------------- specimens (all coordinates in µm, centred on the slide's middle) ---------------- */
  const SPECS = {
    cheek: {
      name: "Squamous epithelial cells (cheek smear)", short: "cheek cells", easy: true,
      clue: "Separate, flat, irregular cells lying on their own, each with <b>one small dark nucleus in the middle</b> = squamous epithelial cells scraped from the inside of the cheek (the surface cells of its non-keratinized stratified squamous lining). This smear is stained with methylene blue.",
      confuse: ["strat", "columnar", "adipose", "cartilage", "smooth"],
      measure: { N: [7, 8], q: n => `One cheek cell is about <b>1/${n}</b> of the field diameter wide`, what: "one cheek cell" },
      build(P, obj, u) {
        const r = mul(P.seed), d = P.size; let b = "";
        const cells = [[U(r, -12, 12), U(r, -12, 12)]];
        for (let c = 0; c < 9; c++) { const a = U(r, 0, 6.28), rr = U(r, 150, 1300), cx = Math.cos(a) * rr, cy = Math.sin(a) * rr, n = 5 + (r() * 9 | 0); for (let i = 0; i < n; i++) cells.push([cx + U(r, -1, 1) * 140, cy + U(r, -1, 1) * 140]); }
        for (let i = 0; i < 26; i++) { const a = U(r, 0, 6.28), rr = Math.sqrt(r()) * 1450; cells.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
        cells.forEach(([x, y], i) => {
          const rad = d / 2 * U(r, .88, 1.12), path = blob(x, y, rad, rad * U(r, .82, 1), .16, 7, r, U(r, 0, 3)), nx = x + U(r, -.1, .1) * d, ny = y + U(r, -.1, .1) * d, nrx = U(r, 4, 5.2), nry = U(r, 3.4, 4.4), fa = U(r, 0, 6.28), fl = U(r, .3, .7) * rad;
          b += `<path d="${path}" fill="#BCD3EE" fill-opacity=".62" stroke="#7B9BD0" stroke-width="1.3"/>`;
          if (obj >= 10) b += `<path d="M${f(x + Math.cos(fa) * fl)} ${f(y + Math.sin(fa) * fl)}Q${f(x + Math.cos(fa + 1) * fl * .5)} ${f(y + Math.sin(fa + 1) * fl * .5)} ${f(x + Math.cos(fa + 2.2) * fl)} ${f(y + Math.sin(fa + 2.2) * fl)}" fill="none" stroke="#97B0DA" stroke-width="1.1"/>`;
          b += `<ellipse cx="${f(nx)}" cy="${f(ny)}" rx="${f(nrx)}" ry="${f(nry)}" fill="#34508F"/>`;
          if (obj === 40 && i < 60) b += `<circle cx="${f(nx - 1)}" cy="${f(ny - 1)}" r="1" fill="#5C78B8"/>`;
        });
        const bac = []; for (let i = 0; i < 260; i++) { const a = U(r, 0, 6.28), rr = Math.sqrt(r()) * 650; bac.push([Math.cos(a) * rr, Math.sin(a) * rr, U(r, 0, 180)]); }
        if (obj === 40) b += bac.map(([x, y, a]) => `<rect x="${f(x)}" y="${f(y)}" width="2" height="1" rx=".5" fill="#3E5C9C" transform="rotate(${f(a)} ${f(x)} ${f(y)})"/>`).join("");
        return { defs: "", body: b };
      }
    },
    columnar: {
      name: "Simple columnar epithelium", short: "simple columnar epithelium",
      clue: "<b>One single row of tall cells</b> standing side by side on a basement membrane, nuclei lined up near their base, with pale <b>goblet cells</b> between them = simple columnar epithelium (for example the lining of the small intestine).",
      confuse: ["strat", "cheek", "smooth", "cardiac"],
      build(P, obj, u) {
        const r = mul(P.seed), W = 100;
        let e = `<rect width="${W}" height="40" fill="#F1B6CB"/>`;
        const gob = [1 + (r() * 3 | 0), 6 + (r() * 3 | 0)];
        for (let i = 0; i < 10; i++) {
          const x0 = i * 10, cx = x0 + 5 + U(r, -.8, .8), ny = U(r, 25, 30);
          if (gob.includes(i)) e += `<path d="M${f(x0 + 1.5)} 2Q${f(x0 - 1)} 16 ${f(x0 + 3.5)} 24L${f(x0 + 6.5)} 24Q${f(x0 + 11)} 16 ${f(x0 + 8.5)} 2Z" fill="#F2E8F3" stroke="#C7A9D6" stroke-width=".7"/><ellipse cx="${f(cx)}" cy="${f(31)}" rx="3" ry="2" fill="#4A2C7A"/>`;
          else e += `<ellipse cx="${f(cx)}" cy="${f(ny)}" rx="2.3" ry="${f(U(r, 4.5, 5.5))}" fill="#4A2C7A"/>`;
          e += `<line x1="${x0}" x2="${x0}" y1="1.6" y2="39" stroke="#D58AAA" stroke-width=".6"/>`;
        }
        e += `<rect width="${W}" height="1.8" fill="#DD78A3"/><rect y="38.6" width="${W}" height="1.4" fill="#C75D8F"/>`;
        let lp = `<rect width="160" height="160" fill="#F7D0DE"/>`;
        for (let i = 0; i < 12; i++) { const x = U(r, 0, 160), y = U(r, 0, 160), a = U(r, 0, 6.28); lp += wrap(x, y, 40, 160, 160, (X, Y) => `<path d="M${f(X - 35 * Math.cos(a))} ${f(Y - 35 * Math.sin(a))}Q${f(X + 10)} ${f(Y - 10)} ${f(X + 35 * Math.cos(a))} ${f(Y + 35 * Math.sin(a))}" fill="none" stroke="#EAA6C2" stroke-width="1.4" opacity=".75"/>`); }
        for (let i = 0; i < 20; i++) { const x = U(r, 0, 160), y = U(r, 0, 160), a = U(r, 0, 180); lp += wrap(x, y, 4, 160, 160, (X, Y) => `<ellipse cx="${f(X)}" cy="${f(Y)}" rx="2.7" ry="1.8" fill="#5B3A8C" transform="rotate(${f(a)} ${f(X)} ${f(Y)})"/>`); }
        const cx = U(r, 20, 140), cy = U(r, 20, 140);
        lp += wrap(cx, cy, 8, 160, 160, (X, Y) => `<circle cx="${f(X)}" cy="${f(Y)}" r="5" fill="none" stroke="#D9779C" stroke-width="1.2"/><circle cx="${f(X)}" cy="${f(Y)}" r="3" fill="#D8475F"/>`);
        let mucus = ""; for (let i = 0; i < 10; i++) { const x = U(r, -1800, 1800), y = U(r, -90, -60); mucus += `<path d="M${f(x)} ${f(y)}q${f(U(r, 20, 60))} ${f(U(r, -30, 10))} ${f(U(r, 60, 140))} ${f(U(r, -20, 20))}" fill="none" stroke="#D9C4E0" stroke-width="2" opacity=".6"/>`; }
        const clip = blob(0, 500, 2300, 1100, .08, 12, r);
        const defs = pat(u + "e", W, 40, e, 'y="-40"') + pat(u + "l", 160, 160, lp) + smoothTile(u + "m", r) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`;
        return { defs, body: `<g transform="rotate(${f(P.angle)}) translate(0 -70)"><g clip-path="url(#${u}c)"><rect x="-2600" y="-40" width="5200" height="40" fill="url(#${u}e)"/><rect x="-2600" y="0" width="5200" height="380" fill="url(#${u}l)"/><rect x="-2600" y="384" width="5200" height="1400" fill="url(#${u}m)"/></g>${mucus}</g>` };
      }
    },
    strat: {
      name: "Stratified squamous epithelium (skin)", short: "stratified squamous epithelium",
      clue: "<b>Many layers of cells</b>: small, dark, cube-like cells at the bottom, flatter and flatter towards the surface, topped by a <b>pink layer of dead keratin</b> = keratinized stratified squamous epithelium (the epidermis of the skin).",
      confuse: ["columnar", "cheek", "cartilage", "smooth"],
      build(P, obj, u) {
        const r = mul(P.seed);
        let co = `<rect width="90" height="16" fill="#F4B5CC"/>`;
        for (let row = 0; row < 5; row++) for (let x = U(r, -20, 0); x < 90;) { const L = U(r, 14, 38), y = 2 + row * 3.1 + U(r, -.6, .6); co += wrap(x + L / 2, y, L / 2, 90, 16, (X, Y) => `<path d="M${f(X - L / 2)} ${f(Y)}q${f(L / 2)} ${f(U(r, -1.4, 1.4))} ${f(L)} 0" fill="none" stroke="#E08AAE" stroke-width=".9"/>`, false); x += L + U(r, 3, 8); }
        let gr = `<rect width="48" height="10" fill="#ECC0D2"/>`;
        for (let i = 0; i < 3; i++) { const x = 8 + i * 16 + U(r, -2, 2), y = 5 + U(r, -1, 1); gr += wrap(x, y, 9, 48, 10, (X, Y) => `<ellipse cx="${f(X)}" cy="${f(Y)}" rx="8.5" ry="3.2" fill="#E2A8C3" stroke="#B57DA6" stroke-width=".5"/><ellipse cx="${f(X)}" cy="${f(Y)}" rx="2.6" ry="1.4" fill="#4B2A7C"/>`, false); if (obj === 40) for (let g = 0; g < 9; g++) { const gx = x + U(r, -7, 7), gy = y + U(r, -2, 2); gr += wrap(gx, gy, 1, 48, 10, (X, Y) => `<circle cx="${f(X)}" cy="${f(Y)}" r=".7" fill="#3D1F5C"/>`, false); } else for (let g = 0; g < 18; g++) r(); }
        const hx = hexCells(8, 6, 7, .22, P.seed & 1023, false);
        let sp = `<rect width="${f(hx.W)}" height="63" fill="#E4AFC6"/>`;
        hx.cells.forEach(c => { sp += `<path d="${polyD(shrink(c, .93))}" fill="#F0C4D5" stroke="#D79AB7" stroke-width=".7"/><circle cx="${f(c.x + (c.h - .5) * 2)}" cy="${f(c.y + (c.h2 - .5) * 2)}" r="2.6" fill="#5B3A8C"/>`; if (obj === 40) sp += `<circle cx="${f(c.x + (c.h - .5) * 2 + .6)}" cy="${f(c.y + (c.h2 - .5) * 2 - .5)}" r=".7" fill="#2E1450"/>`; });
        let ba = `<rect width="36" height="10" fill="#E3A7C0"/>`;
        for (let i = 0; i < 4; i++) { const x = 4.5 + i * 9; ba += `<ellipse cx="${f(x)}" cy="5.6" rx="2.7" ry="3.7" fill="#3F2370"/><line x1="${f(x + 4.5)}" x2="${f(x + 4.5)}" y1="0" y2="10" stroke="#C98BAA" stroke-width=".5"/>`; if (hsh(i, 1, P.seed) < .5) ba += `<circle cx="${f(x - 1.5)}" cy="1.6" r="1" fill="#7A4A2A" opacity=".8"/>`; }
        ba += `<rect y="9.3" width="36" height=".9" fill="#C75D8F"/>`;
        let de = `<rect width="220" height="220" fill="#F6CFDC"/>`;
        for (let i = 0; i < 15; i++) { const x = U(r, 0, 220), y = U(r, 0, 220), a = U(r, -.5, .5), L = U(r, 60, 120), w = U(r, 4, 9); de += wrap(x, y, L / 2 + 10, 220, 220, (X, Y) => `<path d="M${f(X - L / 2 * Math.cos(a))} ${f(Y - L / 2 * Math.sin(a))}q${f(L / 3)} ${f(U(r, -14, 14))} ${f(L * Math.cos(a))} ${f(L * Math.sin(a))}" fill="none" stroke="#EAA0BF" stroke-width="${f(w)}" stroke-linecap="round" opacity=".8"/>`); }
        for (let i = 0; i < 14; i++) { const x = U(r, 0, 220), y = U(r, 0, 220), a = U(r, -30, 30); de += wrap(x, y, 6, 220, 220, (X, Y) => `<ellipse cx="${f(X)}" cy="${f(Y)}" rx="5" ry="1.4" fill="#5B3A8C" transform="rotate(${f(a)} ${f(X)} ${f(Y)})"/>`); }
        const clip = blob(0, 400, 2300, 900, .08, 12, r);
        const defs = pat(u + "a", 90, 16, co) + pat(u + "b", 48, 10, gr, 'y="16"') + pat(u + "s", hx.W, 63, sp, 'y="26"') + pat(u + "k", 36, 10, ba, 'y="89"') + pat(u + "d", 220, 220, de) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`;
        return { defs, body: `<g transform="rotate(${f(P.angle)}) translate(0 -110)"><g clip-path="url(#${u}c)"><rect x="-2600" y="0" width="5200" height="16" fill="url(#${u}a)"/><rect x="-2600" y="16" width="5200" height="10" fill="url(#${u}b)"/><rect x="-2600" y="26" width="5200" height="63" fill="url(#${u}s)"/><rect x="-2600" y="89" width="5200" height="10" fill="url(#${u}k)"/><rect x="-2600" y="99" width="5200" height="1400" fill="url(#${u}d)"/></g></g>` };
      }
    },
    skeletal: {
      name: "Skeletal muscle", short: "skeletal muscle",
      clue: "Long, <b>unbranched</b>, parallel fibres with <b>stripes (striations)</b> and <b>many nuclei pushed to the edge</b> of each fibre = skeletal muscle.",
      confuse: ["cardiac", "smooth", "bone", "columnar"],
      measure: { N: [7, 8, 9], q: n => `About <b>${n}</b> muscle fibres lying side by side fit across the field diameter`, what: "one muscle fibre (its width)", across: true },
      build(P, obj, u) {
        const r = mul(P.seed), W = 300, ws = [0, 1, 2].map(() => P.size * U(r, .92, 1.08) - 3.5), H = ws.reduce((a, b) => a + b + 3.5, 0);
        let t = `<rect width="${W}" height="${f(H)}" fill="#F7DDE6"/>`, y = 0;
        ws.forEach(w => {
          t += `<rect x="0" y="${f(y)}" width="${W}" height="${f(w)}" fill="#E48AAE"/>`;
          if (obj >= 10) for (let k = 1; k < 5; k++) t += `<line x1="0" x2="${W}" y1="${f(y + w * k / 5)}" y2="${f(y + w * k / 5)}" stroke="#D97AA0" stroke-width=".35" opacity=".7"/>`;
          if (obj === 40) t += `<rect x="0" y="${f(y)}" width="${W}" height="${f(w)}" fill="url(#${u}z)"/>`;
          let top = true; for (let x = U(r, 0, 30); x < W; x += U(r, 22, 42)) { const yy = top ? y + 2.1 : y + w - 2.1, rx = U(r, 5, 7); t += wrap(x, yy, rx, W, H, (X, Y) => `<ellipse cx="${f(X)}" cy="${f(Y)}" rx="${f(rx)}" ry="1.6" fill="#4B2A7C"/>`, false); top = r() < .5; }
          y += w + 3.5;
        });
        const clip = blob(0, 0, 2100, 1500, .1, 12, r);
        return { defs: stripes(u + "z", .55) + pat(u + "f", W, H, t) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`, body: `<g clip-path="url(#${u}c)"><rect x="-3000" y="-3000" width="6000" height="6000" fill="url(#${u}f)" transform="rotate(${f(P.angle)})"/></g>` };
      }
    },
    cardiac: {
      name: "Cardiac muscle", short: "cardiac muscle",
      clue: "Striated fibres that <b>branch</b> and join up, <b>one central nucleus</b> per cell, and dark cross-lines called <b>intercalated discs</b> where cells join end to end = cardiac muscle.",
      confuse: ["skeletal", "smooth", "neuron", "columnar"],
      build(P, obj, u) {
        const r = mul(P.seed), W = 240, H = 72; let t = `<rect width="${W}" height="${H}" fill="#F7DDE6"/>`, top = "";
        for (let k = 0; k < 4; k++) {
          const y0 = k * 18 + 2, ph = U(r, 0, 6.28), wav = x => 1.3 * Math.sin(2 * Math.PI * x / 120 + ph);
          let d = "M0 " + f(y0 + wav(0)); for (let x = 10; x <= W; x += 10) d += "L" + x + " " + f(y0 + wav(x)); for (let x = W; x >= 0; x -= 10) d += "L" + x + " " + f(y0 + 14 + wav(x)); d += "Z";
          t += `<path d="${d}" fill="#E48AAE"/>`;
          const xb = U(r, 0, W - 40); t += wrap(xb, y0 + 17, 40, W, H, (X, Y) => `<path d="M${f(X)} ${f(Y - 3)}L${f(X + 13)} ${f(Y - 3)}L${f(X + 32)} ${f(Y + 3.5)}L${f(X + 19)} ${f(Y + 3.5)}Z" fill="#E48AAE"/>`);
          for (let x = U(r, 10, 40); x < W; x += U(r, 48, 62)) top += wrap(x, y0 + 7, 9, W, H, (X, Y) => `<ellipse cx="${f(X)}" cy="${f(Y + wav(X))}" rx="8" ry="3.4" fill="#F1BBD0"/><ellipse cx="${f(X)}" cy="${f(Y + wav(X))}" rx="4.4" ry="2.2" fill="#4B2A7C"/>`, false);
          for (let x = U(r, 30, 70); x < W; x += U(r, 62, 95)) top += wrap(x, y0, 4, W, H, (X, Y) => `<path d="M${f(X)} ${f(Y + wav(X))}v4.5h2v4h-2.6v5.5" fill="none" stroke="#3D1F5C" stroke-width="1.9" opacity=".9"/>`, false);
        }
        if (obj === 40) t += `<rect width="${W}" height="${H}" fill="url(#${u}z)" opacity=".7"/>`;
        const clip = blob(0, 0, 2000, 1400, .1, 12, r);
        return { defs: stripes(u + "z", .35) + pat(u + "f", W, H, t + top) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`, body: `<g clip-path="url(#${u}c)"><rect x="-3000" y="-3000" width="6000" height="6000" fill="url(#${u}f)" transform="rotate(${f(P.angle)})"/></g>` };
      }
    },
    smooth: {
      name: "Smooth muscle", short: "smooth muscle",
      clue: "Spindle-shaped cells, thick in the middle and tapered at both ends, <b>no stripes</b>, and <b>one cigar-shaped nucleus in the centre</b> of each cell = smooth muscle (as in the walls of the gut and blood vessels).",
      confuse: ["skeletal", "cardiac", "columnar", "neuron"],
      build(P, obj, u) {
        const r = mul(P.seed), clip = blob(0, 0, 2000, 1300, .12, 12, r);
        return { defs: smoothTile(u + "f", r) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`, body: `<g clip-path="url(#${u}c)"><rect x="-3000" y="-3000" width="6000" height="6000" fill="url(#${u}f)" transform="rotate(${f(P.angle)})"/></g>` };
      }
    },
    bone: {
      name: "Compact bone", short: "compact bone", easy: true,
      clue: "<b>Rings within rings</b> (osteons): layers of matrix called lamellae around a <b>dark central canal</b>, with tiny dark <b>lacunae</b> (where bone cells live) linked by hair-thin canaliculi = compact bone. This is a ground section, so it is unstained.",
      confuse: ["cartilage", "adipose", "cheek", "smooth"],
      measure: { N: [2, 3], q: n => `About <b>${n}</b> osteons fit across the field diameter`, what: "one osteon" },
      build(P, obj, u) {
        const r = mul(P.seed), W = 500, H = 440, Rm = P.size / 2;
        let t = `<rect width="${W}" height="${H}" fill="#E9DCC0"/>`;
        for (let i = 0; i < 14; i++) { const x = U(r, 0, W), y = U(r, 0, H), rr = U(r, 60, 160), a = U(r, 0, 6.28); t += wrap(x, y, rr, W, H, (X, Y) => `<path d="M${f(X + rr * Math.cos(a))} ${f(Y + rr * Math.sin(a))}A${f(rr)} ${f(rr)} 0 0 1 ${f(X + rr * Math.cos(a + .8))} ${f(Y + rr * Math.sin(a + .8))}" fill="none" stroke="#D3C3A0" stroke-width="1.2"/>`); }
        [[125, 110], [375, 110], [0, 330], [250, 330]].forEach(([cx, cy]) => {
          const x = cx + U(r, -14, 14), y = cy + U(r, -14, 14), R = Rm * U(r, .9, 1.08), cr = R * U(r, .14, .2);
          let o = `<circle r="${f(R)}" fill="#EFE5CE" stroke="#A8936C" stroke-width="2.4"/>`;
          for (let rr = cr + 6; rr < R - 3; rr += U(r, 6.5, 9)) o += `<ellipse rx="${f(rr * U(r, .98, 1.02))}" ry="${f(rr * U(r, .96, 1))}" fill="none" stroke="#CDBB95" stroke-width="1.1"/>`;
          o += `<circle r="${f(cr)}" fill="#3B2D1D"/><circle r="${f(cr * .55)}" cx="${f(cr * .2)}" cy="${f(-cr * .2)}" fill="#5A4630" opacity=".6"/>`;
          [.42, .66, .88].forEach(k => { const rr = R * k, n = Math.floor(2 * Math.PI * rr / 22), off = U(r, 0, 6.28); for (let i = 0; i < n; i++) { const a = off + i / n * 6.283 + U(r, -.08, .08), lx = Math.cos(a) * rr, ly = Math.sin(a) * rr, deg = a * 57.3 + 90; o += `<ellipse cx="${f(lx)}" cy="${f(ly)}" rx="4.2" ry="1.9" fill="#2F2416" transform="rotate(${f(deg)} ${f(lx)} ${f(ly)})"/>`; const cl = [U(r, 6, 10), U(r, 6, 10)]; if (obj === 40) o += `<path d="M${f(lx * (1 - 3 / rr))} ${f(ly * (1 - 3 / rr))}L${f(lx * (1 - (3 + cl[0]) / rr))} ${f(ly * (1 - (3 + cl[0]) / rr))}M${f(lx * (1 + 3 / rr))} ${f(ly * (1 + 3 / rr))}L${f(lx * (1 + (3 + cl[1]) / rr))} ${f(ly * (1 + (3 + cl[1]) / rr))}" stroke="#4A3A28" stroke-width=".5"/>`; } });
          t += wrap(x, y, R + 3, W, H, (X, Y) => `<g transform="translate(${f(X)} ${f(Y)})">${o}</g>`);
        });
        const clip = blob(0, 0, 2000, 1400, .1, 12, r);
        return { defs: pat(u + "f", W, H, t) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`, body: `<g clip-path="url(#${u}c)"><rect x="-3000" y="-3000" width="6000" height="6000" fill="url(#${u}f)" transform="rotate(${f(P.angle)})"/></g>` };
      }
    },
    cartilage: {
      name: "Hyaline cartilage", short: "hyaline cartilage", easy: true,
      clue: "A smooth, <b>glassy purple-grey matrix</b> with no visible fibres, and cells sitting in little holes (<b>lacunae</b>), often in <b>groups of 2–4</b> = hyaline cartilage (as at the ends of bones and in the trachea).",
      confuse: ["bone", "adipose", "strat", "cheek"],
      build(P, obj, u) {
        const r = mul(P.seed), W = 280, H = 280; let t = `<rect width="${W}" height="${H}" fill="#CCB7DC"/>`;
        for (let gy = 0; gy < 5; gy++) for (let gx = 0; gx < 5; gx++) {
          const x = (gx + .5) * W / 5 + U(r, -16, 16), y = (gy + .5) * H / 5 + U(r, -16, 16), q = r(), n = q < .25 ? 1 : q < .6 ? 2 : q < .85 ? 3 : 4, a = U(r, 0, 3.14), sp = U(r, 14, 18);
          const pts = n === 1 ? [[0, 0]] : n === 2 ? [[-sp / 2, 0], [sp / 2, 0]] : n === 3 ? [[-sp, 0], [0, 0], [sp, 0]] : [[-sp / 2, -sp / 2], [sp / 2, -sp / 2], [-sp / 2, sp / 2], [sp / 2, sp / 2]];
          let g = `<ellipse rx="${f(n === 3 ? sp * 1.6 + 10 : sp * (n > 1 ? 1 : .5) + 13)}" ry="${f(n === 4 ? sp + 13 : 15)}" fill="#AF92C8" opacity=".45"/>`;
          pts.forEach(([px, py]) => { const lx = U(r, 6, 8.5), ly = U(r, 5, 7); g += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(lx)}" ry="${f(ly)}" fill="#F6F0F8"/><ellipse cx="${f(px - .8)}" cy="${f(py + .5)}" rx="${f(lx * .72)}" ry="${f(ly * .7)}" fill="#B597CC"/><circle cx="${f(px - 1)}" cy="${f(py + .6)}" r="2.4" fill="#4B2A7C"/>`; });
          t += wrap(x, y, 40, W, H, (X, Y) => `<g transform="translate(${f(X)} ${f(Y)}) rotate(${f(a * 57.3)})">${g}</g>`);
        }
        let pc = `<rect width="60" height="60" fill="#EAA9C3"/>`;
        for (let i = 0; i < 8; i++) { const x = U(r, 0, 60), y = U(r, 0, 60); pc += wrap(x, y, 6, 60, 60, (X, Y) => `<ellipse cx="${f(X)}" cy="${f(Y)}" rx="5" ry="1.3" fill="#5B3A8C"/>`); }
        const outline = blob(0, 0, 1900, 1200, .1, 12, r);
        return { defs: pat(u + "f", W, H, t) + pat(u + "p", 60, 60, pc) + `<clipPath id="${u}c"><path d="${outline}"/></clipPath>`, body: `<g transform="rotate(${f(P.angle)})"><g clip-path="url(#${u}c)"><rect x="-2500" y="-2500" width="5000" height="5000" fill="url(#${u}f)"/></g><path d="${outline}" fill="none" stroke="url(#${u}p)" stroke-width="70"/></g>` };
      }
    },
    neuron: {
      name: "Nervous tissue (neurons)", short: "neurons",
      clue: "Big, <b>star-shaped cell bodies</b> with several long processes, a <b>large pale nucleus with one dark nucleolus</b> (like an eye), sitting among lots of tiny glial cell nuclei = nervous tissue (multipolar motor neurons, as in the spinal cord).",
      confuse: ["cartilage", "smooth", "cardiac", "cheek"],
      measure: { N: [6, 7, 8], q: n => `One neuron cell body is about <b>1/${n}</b> of the field diameter wide`, what: "one neuron cell body" },
      build(P, obj, u) {
        const r = mul(P.seed), T = 180; let np = `<rect width="${T}" height="${T}" fill="#EED5E2"/>`;
        for (let i = 0; i < 12; i++) { const x = U(r, 0, T), y = U(r, 0, T), a = U(r, 0, 6.28); np += wrap(x, y, 50, T, T, (X, Y) => `<path d="M${f(X - 45 * Math.cos(a))} ${f(Y - 45 * Math.sin(a))}q${f(U(r, 20, 50))} ${f(U(r, -25, 25))} ${f(90 * Math.cos(a))} ${f(90 * Math.sin(a))}" fill="none" stroke="#DDB5CC" stroke-width=".9"/>`); }
        for (let i = 0; i < 24; i++) { const x = U(r, 0, T), y = U(r, 0, T), rr = U(r, 2.2, 3.6); np += wrap(x, y, 4, T, T, (X, Y) => `<circle cx="${f(X)}" cy="${f(Y)}" r="${f(rr)}" fill="#59378A"/>`); }
        const pos = [[U(r, -10, 10), U(r, -10, 10)]];
        for (let tries = 0; tries < 400 && pos.length < 26; tries++) { const a = U(r, 0, 6.28), rr = Math.sqrt(r()) * 1700, p = [Math.cos(a) * rr, Math.sin(a) * rr]; if (pos.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > 230)) pos.push(p); }
        let b = "";
        pos.forEach(([x, y]) => {
          const rb = P.size / 2 * U(r, .88, 1.12), k = 3 + (r() * 3 | 0), a0 = U(r, 0, 6.28); let pr = "";
          const pts = []; for (let i = 0; i < 18; i++) { const a = i / 18 * 6.283; pts.push([x + Math.cos(a) * rb * U(r, .82, 1), y + Math.sin(a) * rb * U(r, .82, 1)]); }
          for (let i = 0; i < k; i++) {
            const a = a0 + i / k * 6.283 + U(r, -.4, .4), L = U(r, 90, 240), bw = rb * U(r, .22, .32), bend = U(r, -.5, .5) * L * .45;
            const bx = x + Math.cos(a) * rb * .8, by = y + Math.sin(a) * rb * .8, nx = -Math.sin(a), ny = Math.cos(a), tx = x + Math.cos(a) * (rb + L) + nx * bend * .6, ty = y + Math.sin(a) * (rb + L) + ny * bend * .6, mx = x + Math.cos(a) * (rb + L * .45) + nx * bend, my = y + Math.sin(a) * (rb + L * .45) + ny * bend;
            pr += `<path d="M${f(bx + nx * bw)} ${f(by + ny * bw)}Q${f(mx + nx * bw * .25)} ${f(my + ny * bw * .25)} ${f(tx)} ${f(ty)}Q${f(mx - nx * bw * .25)} ${f(my - ny * bw * .25)} ${f(bx - nx * bw)} ${f(by - ny * bw)}Z" fill="#C48AC0"/>`;
          }
          const nr = rb * .34, nxo = U(r, -.12, .12) * rb, nyo = U(r, -.12, .12) * rb;
          b += pr + `<path d="${smooth(pts)}" fill="#C48AC0" stroke="#9C5D9E" stroke-width=".8"/>`;
          const gran = []; for (let i = 0; i < 34; i++) { const a = U(r, 0, 6.28), rr = U(r, nr + 2, rb * .85); gran.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr, U(r, .8, 1.7)]); }
          if (obj === 40) b += gran.map(g => `<circle cx="${f(g[0])}" cy="${f(g[1])}" r="${f(g[2])}" fill="#7D3F88" opacity=".8"/>`).join("");
          b += `<circle cx="${f(x + nxo)}" cy="${f(y + nyo)}" r="${f(nr)}" fill="#F1E3F0" stroke="#8A5A9A" stroke-width="1"/><circle cx="${f(x + nxo + 1)}" cy="${f(y + nyo - 1)}" r="${f(rb * .09)}" fill="#3B1D5A"/>`;
        });
        const clip = blob(0, 0, 2100, 1500, .1, 12, r);
        return { defs: pat(u + "n", T, T, np) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`, body: `<g clip-path="url(#${u}c)"><rect x="-2500" y="-2500" width="5000" height="5000" fill="url(#${u}n)"/>${b}</g>` };
      }
    },
    adipose: {
      name: "Adipose tissue", short: "adipose tissue", easy: true,
      clue: "Big, <b>empty-looking</b> rounded cells with <b>thin pink rims</b>, and the nucleus squashed flat against the edge (a 'signet ring'). The fat itself dissolved while the slide was made = adipose tissue.",
      confuse: ["cartilage", "cheek", "bone", "columnar"],
      measure: { N: [4, 5], q: n => `About <b>${n}</b> fat cells fit across the field diameter`, what: "one fat cell" },
      build(P, obj, u) {
        const r = mul(P.seed), rr = P.size / Math.sqrt(3), hx = hexCells(4, 4, rr, .2, P.seed & 1023, true);
        let t = `<rect width="${f(hx.W)}" height="${f(hx.H)}" fill="#E7A0BD"/>`;
        hx.cells.forEach(c => {
          t += `<path d="${polyD(shrink(c, .965))}" fill="#FCF7F8" stroke="#DE93B3" stroke-width="1.6"/>`;
          if (c.h < .24) { const e = c.h2 * 6 | 0, p = c.pts[e], q = c.pts[(e + 1) % 6], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, nx = mx + (c.x - mx) * .06, ny = my + (c.y - my) * .06, a = Math.atan2(q[1] - p[1], q[0] - p[0]) * 57.3; t += `<ellipse cx="${f(nx)}" cy="${f(ny)}" rx="6.5" ry="2.4" fill="#5B3A8C" transform="rotate(${f(a)} ${f(nx)} ${f(ny)})"/>`; }
          if (c.h2 < .07) t += `<circle cx="${f(c.pts[0][0])}" cy="${f(c.pts[0][1])}" r="3.6" fill="#D8475F" opacity=".85"/>`;
        });
        const clip = blob(0, 0, 2000, 1500, .12, 12, r);
        return { defs: pat(u + "f", hx.W, hx.H, t) + `<clipPath id="${u}c"><path d="${clip}"/></clipPath>`, body: `<g clip-path="url(#${u}c)"><rect x="-3000" y="-3000" width="6000" height="6000" fill="url(#${u}f)" transform="rotate(${f(P.angle)})"/></g>` };
      }
    }
  };
  const SPEC_IDS = Object.keys(SPECS);

  /* ---------------- menu ---------------- */
  let L = null, st = null, raf = 0;
  function menu() {
    st = null; clearTimeout(warnT);
    K.menu({
      hero: "Hands-on histology: handle a real light microscope, focus it properly and name the tissue",
      introHTML: `<p>You're at a <b>compound light microscope</b> with a box of stained slides (pink and purple H&amp;E stains, like the ones in Saladin chapters 3–5). Your job: get a sharp picture the way a lab instructor expects, then recognise the tissue from its clues.</p>
        <p><b>The golden rules:</b> start on the <b>lowest power (4×)</b>, where the view is widest and the lens is far from the slide. Focus with the big <b>coarse knob</b> there. When you switch up, the image stays almost in focus (the lenses are <i>parfocal</i>), so at <b>10× and 40×</b> you only touch the small <b>fine knob</b>. The coarse knob at 40× can drive the lens into the slide and crack it.</p>
        <p class="lab-eq">total magnification = eyepiece (10×) × objective</p>`,
      lifeHTML: `<p>Pathologists and lab scientists do exactly this every day: a biopsy is cut thin, stained, and read under the microscope to spot changes such as cancer or inflammation. Note that the real image is flipped upside down and left–right; here we keep it the right way round to make it easier.</p>`,
      steps: STEPS, levels: LEVELS, onStart: start,
      controls: "drag the slide onto the stage; drag around a knob to turn it (or use its arrow buttons, or the mouse wheel); slide the light lever; tap 4× / 10× / 40×; drag inside the eyepiece view to move the slide. Keyboard: 1/2/3 objectives, Q/A coarse, W/S fine, [ and ] light, arrow keys move the slide, Enter identify.",
      safety: "In a real lab: carry a microscope with two hands (arm and base), never touch the lenses with your fingers, and always finish on the lowest power with the stage lowered."
    });
  }

  /* ---------------- a run ---------------- */
  function makeSlide(id) {
    const S = SPECS[id], N = S.measure ? BGX.pick(S.measure.N) : 0;
    const size = N ? FOV[40] / N : { strat: 0, columnar: 0, cardiac: 0, smooth: 0, cartilage: 0, cheek: 60, adipose: 100, skeletal: 60, neuron: 65, bone: 220 }[id] || 0;
    return { id, seed: (Math.random() * 1e9) | 0, angle: id === "skeletal" || id === "cardiac" || id === "smooth" ? U(Math.random, -25, 25) : U(Math.random, -40, 40), size, N, choices: null };
  }
  function start(level) {
    L = level; cancelAnimationFrame(raf); clearTimeout(warnT);
    const pool = L.pool === "easy" ? SPEC_IDS.filter(i => SPECS[i].easy) : L.pool === "measure" ? SPEC_IDS.filter(i => SPECS[i].measure) : SPEC_IDS;
    const slides = BGX.shuffle(pool).slice(0, L.count).map(makeSlide);
    st = {
      level: L.n, target: L.target, slides, idx: 0, P: slides[0], placed: false, clipped: false,
      obj: L.n === 1 ? 10 : 40, s: U(Math.random, 1500, 2400), f: null, light: Math.random() < .5 ? U(Math.random, 6, 14) : U(Math.random, 92, 100),
      pan: [0, 0], focused4: false, cracked: false, phase: "scope", coarseDeg: 0, fineDeg: 0, lastCrash: -1e9, gest: null,
      miss: null, results: [], spin: 0, measure: false
    };
    newSlideState();
    K.begin(L, L.n === 1 ? [
      "Work from the bottom up: slide on and clipped → <b>4×</b> → big <b>coarse</b> knob until sharp → <b>light</b> → <b>10×</b> → small <b>fine</b> knob only.",
      () => "Exactly what to do now: " + whatToDo(true)
    ] : [
      "Every new slide starts at <b>4×</b> with the coarse knob. The microscope may still be on 40× from the last slide: switch down <b>before</b> you touch a focus knob, or the coarse knob will crash the lens into the slide.",
      "After each switch up the picture is only a little blurred (the lenses are parfocal). Use the <b>fine</b> knob a few degrees each way and stop where it's crispest. 40× lets in less light, so <b>open the iris</b> more.",
      () => "Exactly what to do now: " + whatToDo(true)
    ]);
    render();
  }
  function newSlideState() {
    const P = st.P, f10 = (Math.random() < .5 ? -1 : 1) * U(Math.random, 4, 9);
    st.f = { 4: 0, 10: f10, 40: f10 + (Math.random() < .5 ? -1 : 1) * U(Math.random, 2, 4) };
    st.placed = false; st.clipped = false; st.focused4 = false; st.cracked = false; st.phase = "scope"; st.measure = false;
    st.pan = [U(Math.random, -150, 150), U(Math.random, -150, 150)];
    if (P.id === "cheek" || P.id === "neuron") st.pan = [U(Math.random, -60, 60), U(Math.random, -60, 60)];
    st.miss = { crash: 0, low: false, light: false, wrong: false, calc: 0, choice: null, lightWord: "" };
    if (!P.choices) P.choices = BGX.shuffle([P.id, ...BGX.shuffle(SPECS[P.id].confuse).slice(0, 3)]);
  }

  /* derived optics */
  const dz = () => st.s - st.f[st.obj];
  const xFocus = () => Math.abs(dz()) / DOF[st.obj];
  const sharp = () => st.placed && xFocus() <= .5;
  const bright = () => st.light * GAIN[st.obj];
  const lightOk = () => { const b = bright(); return b >= LIGHT_OK[0] && b <= LIGHT_OK[1]; };
  const ready = () => st.clipped && sharp() && (L.n === 1 ? st.obj >= 10 && lightOk() : st.obj === 40);
  const turnsText = deg => { const t = deg / 360; return t >= .75 ? `about ${Math.round(t * 2) / 2} turn${t >= 1.25 ? "s" : ""}` : `about ${Math.max(5, Math.round(deg / 5) * 5)}°`; };
  function dirText(knob, amount) {
    const d = dz(), rate = knob === "coarse" ? COARSE : FINE, deg = Math.abs(d) / rate;
    const name = knob === "coarse" ? "big <b>COARSE</b> knob" : "small <b>FINE</b> knob";
    return d > 0 ? `Turn the ${name} <b>clockwise ↻</b> to raise the stage${amount ? ` (${turnsText(deg)} more)` : ""}. The picture gets sharper as you get close.`
      : `You went past the sharp point: turn the ${name} back <b>anticlockwise ↺</b>${amount ? ` (${turnsText(deg)})` : ""}.`;
  }
  function lightText() {
    const b = bright(); return b < LIGHT_OK[0] ? `Too dark: slide the <b>light lever right</b> to open the iris diaphragm.${st.obj > 4 ? " Higher-power lenses let in less light, so you need to open it more." : ""}` : "Too bright and washed out: slide the <b>light lever left</b> to close the iris a little.";
  }
  function whatToDo(amount) {
    if (!st.placed) return "Drag the glass slide from the tray onto the stage (or just tap it).";
    if (!st.clipped) return "Tap the stage to swing the two <b>clips</b> down over the slide.";
    if (!st.focused4 && st.obj !== 4) return "Tap <b>4×</b> on the nosepiece first. Low power has the widest view and the most room under the lens.";
    if (st.obj === 4 && !sharp()) return dirText("coarse", amount);
    if (!lightOk()) return lightText();
    if (st.obj < st.target) return `Sharp at ${st.obj}×. Now tap <b>${st.obj === 4 ? 10 : 40}×</b> on the nosepiece.`;
    if (!sharp()) return dirText("fine", amount);
    return "Sharp! Tap <b>Identify the tissue</b>.";
  }
  function stepIndex() {
    if (!st.clipped) return 0;
    if (!st.focused4 && st.obj !== 4) return 1;
    if (!st.focused4) return 2;
    if (!lightOk() && (st.obj === 4 || sharp())) return 3;
    if (!ready()) return 4;
    return 5;
  }

  /* ---------------- the side view of the microscope ---------------- */
  function sceneSVG() {
    return `<svg viewBox="0 0 300 330" class="mic-scene" id="mic-scene" role="img" aria-label="Side view of a light microscope with a slide tray">
      <defs>
        <linearGradient id="mcBody" x1="0" x2="1"><stop offset="0" stop-color="#F4F7F8"/><stop offset=".55" stop-color="#DCE4E8"/><stop offset="1" stop-color="#B9C6CD"/></linearGradient>
        <linearGradient id="mcDark" x1="0" x2="1"><stop offset="0" stop-color="#5A6670"/><stop offset=".5" stop-color="#2E363D"/><stop offset="1" stop-color="#1D2328"/></linearGradient>
        <linearGradient id="mcChrome" x1="0" x2="1"><stop offset="0" stop-color="#8F9AA3"/><stop offset=".35" stop-color="#F2F5F7"/><stop offset=".7" stop-color="#B4BEC6"/><stop offset="1" stop-color="#7D8891"/></linearGradient>
        <linearGradient id="mcBeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF4C2" stop-opacity=".9"/><stop offset="1" stop-color="#FFF4C2" stop-opacity=".15"/></linearGradient>
        <radialGradient id="mcGlow"><stop offset="0" stop-color="#FFF6CF"/><stop offset=".5" stop-color="#FFE38A" stop-opacity=".7"/><stop offset="1" stop-color="#FFE38A" stop-opacity="0"/></radialGradient>
      </defs>
      <rect x="0" y="318" width="300" height="12" fill="var(--line)" opacity=".6"/>
      <!-- slide tray -->
      <rect x="4" y="304" width="70" height="14" rx="3" fill="#C9D3D8" stroke="#9AA8B0"/><text x="39" y="315" text-anchor="middle" font-size="7" font-family="var(--font-mono)" fill="#56636B">SLIDES</text>
      <!-- base and lamp -->
      <path d="M58 318 L242 318 L236 296 Q232 290 224 290 L78 290 Q70 290 66 296 Z" fill="url(#mcBody)" stroke="#8C9AA2"/>
      <ellipse id="mic-glow" cx="140" cy="288" rx="26" ry="14" fill="url(#mcGlow)" opacity=".6"/>
      <ellipse cx="140" cy="290" rx="11" ry="4" fill="#FFF3C4" stroke="#B49B4C"/>
      <path id="mic-beam" d="M131 288 L149 288 L152 186 L128 186 Z" fill="url(#mcBeam)" opacity=".4"/>
      <!-- arm -->
      <path d="M204 296 L240 296 Q252 210 236 130 Q228 96 200 76 L180 96 Q208 122 214 172 Q218 232 204 296 Z" fill="url(#mcBody)" stroke="#8C9AA2"/>
      <!-- head + eyepiece tube -->
      <path d="M150 76 L206 66 L214 96 L158 108 Z" fill="url(#mcBody)" stroke="#8C9AA2"/>
      <g transform="rotate(-32 160 74)"><rect x="150" y="18" width="20" height="58" fill="url(#mcBody)" stroke="#8C9AA2"/><rect x="147" y="6" width="26" height="15" rx="3" fill="url(#mcDark)"/><text x="160" y="16.5" text-anchor="middle" font-size="7" font-weight="700" fill="#fff" font-family="var(--font-mono)">10×</text></g>
      <!-- nosepiece + objectives -->
      <g transform="translate(140 104)"><g id="mic-turret"></g></g>
      <!-- stage group (moves with focus) -->
      <g id="mic-stage">
        <rect x="76" y="163" width="134" height="9" rx="2" fill="url(#mcDark)"/>
        <rect x="204" y="165" width="20" height="12" fill="url(#mcDark)"/>
        <rect x="124" y="172" width="32" height="13" rx="2" fill="url(#mcChrome)" stroke="#6E7A83"/>
        <line id="mic-lever" x1="124" y1="180" x2="104" y2="186" stroke="#2E363D" stroke-width="3.2" stroke-linecap="round"/>
        <circle id="mic-leverknob" cx="104" cy="186" r="3.4" fill="#2E363D"/>
        <g id="mic-onstage" opacity="0"><rect x="104" y="160" width="76" height="3" fill="#CFE6EE" stroke="#8FB4C2" stroke-width=".6"/><rect x="164" y="160" width="16" height="3" fill="#F3F3EF"/><ellipse id="mic-stain" cx="134" cy="161.5" rx="10" ry="1.4" fill="#D97AA6"/><g id="mic-scratch"></g></g>
        <g id="mic-clipL" style="transform-origin:90px 160px;transition:transform .25s"><rect x="86" y="157.5" width="30" height="3" rx="1.5" fill="url(#mcChrome)" stroke="#6E7A83" stroke-width=".5"/><circle cx="90" cy="159" r="3" fill="#6E7A83"/></g>
        <g id="mic-clipR" style="transform-origin:196px 160px;transition:transform .25s"><rect x="170" y="157.5" width="30" height="3" rx="1.5" fill="url(#mcChrome)" stroke="#6E7A83" stroke-width=".5"/><circle cx="196" cy="159" r="3" fill="#6E7A83"/></g>
        <rect id="mic-stagehit" x="70" y="140" width="150" height="48" fill="transparent" style="cursor:pointer"/>
      </g>
      <!-- focus knobs (big coarse, small fine on the same axis) -->
      <g transform="translate(226 236)"><circle r="17" fill="url(#mcDark)"/><g id="mic-kc">${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="-17" x2="0" y2="-12" stroke="#8B969E" stroke-width="1.6" transform="rotate(${i * 30})"/>`).join("")}<circle cy="-8" r="2" fill="#E8B923"/></g>
        <circle r="8.5" fill="url(#mcChrome)" stroke="#5A6670"/><g id="mic-kf">${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="-8.5" x2="0" y2="-5.5" stroke="#5A6670" stroke-width="1.1" transform="rotate(${i * 45})"/>`).join("")}<circle cy="-3.5" r="1.3" fill="#D9473B"/></g></g>
      <text x="226" y="266" text-anchor="middle" font-size="7" font-family="var(--font-mono)" fill="var(--muted)">focus</text>
      <!-- slide in the tray (draggable) -->
      <g id="mic-trayslide" style="cursor:grab;touch-action:none"><rect x="-6" y="-16" width="88" height="34" fill="transparent"/><rect x="0" y="0" width="76" height="3.4" fill="#CFE6EE" stroke="#8FB4C2" stroke-width=".7"/><rect x="60" y="0" width="16" height="3.4" fill="#F3F3EF"/><ellipse id="mic-stain2" cx="30" cy="1.7" rx="10" ry="1.4" fill="#D97AA6"/></g>
      <g id="mic-crashfx" opacity="0"><path d="M150 152 l-8 -6 M150 152 l9 -5 M150 152 l-3 9 M150 152 l7 7" stroke="#D93B3B" stroke-width="2" stroke-linecap="round"/><text x="150" y="138" text-anchor="middle" font-size="13" font-weight="900" fill="#D93B3B">CRACK!</text></g>
      <g id="mic-callout" opacity="0"><rect id="mic-callrect" x="0" y="0" width="0" height="18" rx="9" fill="var(--accent)"/><text id="mic-calltext" x="0" y="0" font-size="10" font-weight="800" fill="var(--accent-ink)" text-anchor="middle"></text></g>
    </svg>`;
  }
  function turretSVG(active) {
    const order = [4, 10, 40], i = order.indexOf(active), side = [order[(i + 1) % 3], order[(i + 2) % 3]];
    const lens = (m, rot, op) => { const Ln = LENS_LEN[m]; return `<g transform="rotate(${rot})" opacity="${op}"><rect x="-8" y="2" width="16" height="${Ln - 12}" rx="2" fill="url(#mcChrome)" stroke="#6E7A83" stroke-width=".7"/><rect x="-8" y="${f((Ln - 12) * .45)}" width="16" height="4" fill="${OBJ_COL[m]}"/><path d="M-6 ${Ln - 10} L6 ${Ln - 10} L3.5 ${Ln} L-3.5 ${Ln} Z" fill="url(#mcChrome)" stroke="#6E7A83" stroke-width=".7"/><text x="0" y="${f((Ln - 12) * .45 - 3)}" text-anchor="middle" font-size="6.5" font-weight="800" font-family="var(--font-mono)" fill="#2E363D">${m}×</text></g>`; };
    return lens(side[0], 38, .75) + lens(side[1], -38, .75) + `<path d="M-26 -2 Q0 -14 26 -2 L22 6 Q0 -2 -22 6 Z" fill="url(#mcDark)"/>` + lens(active, 0, 1);
  }

  /* ---------------- run screen ---------------- */
  function render() {
    const P = st.P, many = st.slides.length > 1;
    view.innerHTML = K.topHTML(L) + `
      <div class="lab-run mic-run">
        <p class="mic-slidecount">${many ? `Slide ${st.idx + 1} of ${st.slides.length}` : "One slide"} · Eyepiece 10× · field number 18 mm</p>
        <p class="lab-hint mic-tip" id="lab-hint" aria-live="polite"></p>
        <div class="mic-grid">
          <div class="mic-scenebox">${sceneSVG()}</div>
          <div class="mic-eyebox">
            <div class="mic-eye" id="mic-eye" aria-label="View through the eyepiece. Drag to move the slide.">
              <div class="mic-blur" id="mic-blur"><svg id="mic-spec" preserveAspectRatio="xMidYMid slice" aria-hidden="true"></svg></div>
              <svg class="mic-over" viewBox="-100 -100 200 200" aria-hidden="true">
                <defs><radialGradient id="mcVig"><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient></defs>
                <circle r="100" fill="url(#mcVig)"/>
                <g id="mic-crack" opacity="0" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round"><path d="M-8 -6 L-30 -40 L-34 -70 M-30 -40 L-58 -48 M-8 -6 L22 -30 L48 -34 L80 -58 M22 -30 L30 -60 M-8 -6 L10 28 L6 62 L18 92 M10 28 L44 40 M-8 -6 L-44 14 L-80 10 M-44 14 L-60 46"/><path d="M-8 -6 L-30 -40 L-34 -70 M-8 -6 L22 -30 L48 -34 L80 -58 M-8 -6 L10 28 L6 62 L18 92 M-8 -6 L-44 14 L-80 10" stroke="#333" stroke-width=".5" transform="translate(.8 .8)"/></g>
                <g id="mic-ruler" opacity="0"></g>
              </svg>
              <div class="mic-warn" id="mic-warn" role="alert"></div>
            </div>
            <p class="mic-readout" id="mic-readout"></p>
            <div class="mic-chips" id="mic-chips"${L.n === 1 ? "" : " hidden"}><span id="mic-chipf"></span><span id="mic-chipl"></span></div>
          </div>
        </div>
        <div class="mic-panel">
          <div class="mic-box mic-nose"><p class="br-label">Nosepiece (objective)</p><div class="mic-objs">${[4, 10, 40].map(m => `<button class="mic-obj" data-o="${m}" type="button" style="--oc:${OBJ_COL[m]}"><b>${m}×</b><small>${m === 4 ? "scanning" : m === 10 ? "low power" : "high power"}</small></button>`).join("")}</div></div>
          <div class="mic-box mic-knob"><p class="br-label">Coarse focus</p>${dialHTML("coarse")}<small class="mic-kn">big steps · low power only</small></div>
          <div class="mic-box mic-knob"><p class="br-label">Fine focus</p>${dialHTML("fine")}<small class="mic-kn">tiny steps · any power</small></div>
          <div class="mic-box mic-light"><p class="br-label"><label for="mic-lightin">Light: iris diaphragm</label></p><input type="range" id="mic-lightin" min="0" max="100" step="1" value="${Math.round(st.light)}"><div class="mic-lightends"><span>closed · dark</span><span>open · bright</span></div></div>
        </div>
        <div class="lab-controls"><button class="br-next lab-end" id="mic-id" type="button">Identify the tissue</button></div>
        <div class="mic-q" id="mic-q" aria-live="polite"></div>
        ${K.hintHTML()}
        <details class="lab-howrun"${L.n === 1 ? " open" : ""}><summary>How to do it</summary>${K.stepsHTML(STEPS)}</details>
        <div class="br-feedback" id="lab-fb" aria-live="polite"></div>
      </div>`;
    $("#lab-quit").onclick = menu;
    K.bindHints(() => draw());
    $("#mic-turret").innerHTML = turretSVG(st.obj);
    // slide: drag from the tray to the stage (a tap also works)
    const scene = $("#mic-scene"), tray = $("#mic-trayslide");
    const toSvg = e => { const pt = scene.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(scene.getScreenCTM().inverse()); };
    let drag = null;
    tray.addEventListener("pointerdown", e => { if (st.placed) return; e.preventDefault(); tray.setPointerCapture(e.pointerId); const p = toSvg(e); drag = { x0: p.x, y0: p.y, moved: 0 }; BGX.sfx.tap(); });
    tray.addEventListener("pointermove", e => { if (!drag) return; const p = toSvg(e); drag.dx = p.x - drag.x0; drag.dy = p.y - drag.y0; drag.moved = Math.max(drag.moved, Math.hypot(drag.dx, drag.dy)); drag.p = p; drawTray(); });
    const drop = () => { if (!drag) return; const d = drag; drag = null; tray.style.cursor = ""; const p = d.p; if (d.moved < 6 || (p && p.x > 70 && p.x < 225 && p.y > 120 && p.y < 230)) placeSlide(); else drawTray(); };
    tray.addEventListener("pointerup", drop); tray.addEventListener("pointercancel", () => { drag = null; drawTray(); });
    const drawTray = () => { const x = 10 + (drag ? drag.dx : 0), y = 300.5 + (drag ? drag.dy : 0); tray.setAttribute("transform", `translate(${f(x)} ${f(y)})`); tray.style.display = st.placed ? "none" : ""; };
    drawTray(); st._drawTray = drawTray;
    $("#mic-stagehit").addEventListener("click", () => { if (st.placed && !st.clipped) clipSlide(); else if (!st.placed) placeSlide(); });
    view.querySelectorAll(".mic-obj").forEach(b => b.onclick = () => setObjective(+b.dataset.o));
    bindDial($("#mic-dial-coarse"), d => turn("coarse", d), 10);
    bindDial($("#mic-dial-fine"), d => turn("fine", d), 3);
    view.querySelectorAll("[data-nudge]").forEach(b => b.onclick = () => { const [k, sgn] = b.dataset.nudge.split(":"); turn(k, (k === "coarse" ? 10 : 3) * +sgn, "nudge"); });
    const li = $("#mic-lightin"); li.addEventListener("input", () => { st.light = +li.value; draw(); });
    $("#mic-id").onclick = identify;
    // drag inside the eyepiece to move the slide
    const eye = $("#mic-eye"); let pd = null;
    eye.addEventListener("pointerdown", e => { if (!st.clipped || st.phase === "done") return; e.preventDefault(); eye.setPointerCapture(e.pointerId); pd = { x: e.clientX, y: e.clientY }; eye.classList.add("is-grab"); });
    eye.addEventListener("pointermove", e => { if (!pd) return; const w = eye.getBoundingClientRect().width, k = FOV[st.obj] / w; movePan(-(e.clientX - pd.x) * k, -(e.clientY - pd.y) * k); pd = { x: e.clientX, y: e.clientY }; });
    const pup = () => { pd = null; eye.classList.remove("is-grab"); }; eye.addEventListener("pointerup", pup); eye.addEventListener("pointercancel", pup);
    buildSpec(); draw();
    const top = view.getBoundingClientRect().top + scrollY - 8; if (scrollY > top) scrollTo({ top, behavior: "auto" });
  }
  function dialHTML(k) {
    const big = k === "coarse", n = big ? 18 : 24;
    return `<div class="mic-dialrow"><button class="mic-nudge" type="button" data-nudge="${k}:-1" aria-label="${k} focus anticlockwise (lower the stage)">↺</button>
      <div class="mic-dial${big ? "" : " is-fine"}" id="mic-dial-${k}" role="slider" tabindex="0" aria-label="${big ? "Coarse" : "Fine"} focus knob: drag around it to turn">
        <svg viewBox="-50 -50 100 100"><defs><radialGradient id="dg-${k}" cx=".4" cy=".35"><stop offset="0" stop-color="${big ? "#6B7780" : "#F4F6F7"}"/><stop offset="1" stop-color="${big ? "#1F262B" : "#8F9AA3"}"/></radialGradient></defs>
        <circle r="47" fill="${big ? "#2A3137" : "#7D8891"}"/><g class="mic-rot">${Array.from({ length: n }, (_, i) => `<rect x="-2.2" y="-47" width="4.4" height="9" rx="1.5" fill="${big ? "#56626B" : "#B9C3CA"}" transform="rotate(${i * 360 / n})"/>`).join("")}<circle r="37" fill="url(#dg-${k})"/><circle cy="-28" r="4.5" fill="${big ? "#E8B923" : "#D9473B"}"/></g>
        <text y="5" text-anchor="middle" font-size="15" font-weight="800" fill="${big ? "#fff" : "#2E363D"}" style="pointer-events:none">↻</text></svg></div>
      <button class="mic-nudge" type="button" data-nudge="${k}:1" aria-label="${k} focus clockwise (raise the stage)">↻</button></div>`;
  }
  function bindDial(el, onTurn, step) {
    let last = null, on = false;
    const ang = e => { const r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2); return Math.hypot(x, y) < 8 ? null : Math.atan2(y, x) * 57.2958; };
    el.addEventListener("pointerdown", e => { e.preventDefault(); el.setPointerCapture(e.pointerId); on = true; last = ang(e); el.classList.add("is-grab"); if (st) st.gest = { crashed: false }; });
    el.addEventListener("pointermove", e => { if (!on) return; const a = ang(e); if (a == null) return; if (last == null) { last = a; return; } let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; if (d) onTurn(d); });
    const up = () => { on = false; last = null; el.classList.remove("is-grab"); if (st) st.gest = null; };
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", e => { e.preventDefault(); onTurn(e.deltaY < 0 ? step : -step); }, { passive: false });
    el.addEventListener("keydown", e => { if (e.key === "ArrowUp" || e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); onTurn(step); } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); onTurn(-step); } });
  }

  /* ---------------- actions ---------------- */
  function placeSlide() {
    if (!st || st.placed || st.phase === "done") return;
    st.placed = true; st.s = U(Math.random, 1500, 2400); BGX.sfx.tap(); BGX.tone([300], .05, "triangle", 0, .05);
    buildSpec(); draw();
  }
  function clipSlide() {
    if (!st || !st.placed || st.clipped) return;
    st.clipped = true; BGX.tone([1400, 900], .03, "square", .04, .03); draw();
  }
  function setObjective(m) {
    if (!st || st.phase === "done" || m === st.obj) return;
    st.obj = m; st.spin++; if (m === 4 && st.clipped && sharp()) st.focused4 = true; BGX.tone([520, 760], .05, "triangle", .05, .05);
    const t = $("#mic-turret"); t.innerHTML = turretSVG(m);
    if (!BGX.RM) { t.classList.remove("is-spin"); void t.getBoundingClientRect(); t.classList.add("is-spin"); }
    buildSpec(); draw();
  }
  function turn(k, d, src) {
    if (!st || st.phase === "done") return;
    if (k === "coarse") st.coarseDeg += d; else st.fineDeg += d;
    if (st.clipped) {
      if (k === "coarse" && st.obj === 40 && d > 0) return crash(src === undefined && st.gest ? "dial" : "tap");
      if (st.obj !== 4 && !st.focused4 && !st.miss.low) { st.miss.low = true; warn(`Start at low power! You focused at ${st.obj}× before finding the specimen at 4×. (−1 star)`); }
    }
    st.s = clamp(st.s - d * (k === "coarse" ? COARSE : FINE), -2500, 5000);
    if (st.clipped && st.obj === 40 && dz() < -150) { st.s = st.f[40] - 150; return crash("tap"); }
    if (st.clipped && st.obj === 4 && sharp()) st.focused4 = true;
    if (Math.random() < .5) BGX.tone([k === "coarse" ? 180 : 260], .015, "square", 0, .012);
    draw();
  }
  function crash(src) {
    const now = performance.now();
    if (src === "dial" ? st.gest && st.gest.crashed : now - st.lastCrash < 1500) return;
    if (st.gest) st.gest.crashed = true; st.lastCrash = now;
    st.miss.crash++; st.cracked = true; st.s += U(Math.random, 8, 14);
    BGX.tone([140, 90], .25, "sawtooth", .08, .09); BGX.flash($("#mic-eye"));
    warn("CRACK! Never use the coarse knob at 40×: the lens hits the slide. Use the fine knob, or go back to a lower power. (−1 star)", true);
    const fx = $("#mic-crashfx"); fx.setAttribute("opacity", "1"); setTimeout(() => { const g = view.querySelector("#mic-crashfx"); if (g) g.setAttribute("opacity", "0"); }, 1400);
    const sc = $("#mic-scene"); sc.classList.remove("is-shake"); void sc.getBoundingClientRect(); if (!BGX.RM) sc.classList.add("is-shake");
    draw();
  }
  function movePan(dx, dy) { st.pan = [clamp(st.pan[0] + dx, -400, 400), clamp(st.pan[1] + dy, -400, 400)]; drawEye(); }
  let warnT = 0;
  function warn(msg, bad) {
    const w = $("#mic-warn"); if (!w) return; w.innerHTML = msg; w.className = "mic-warn is-on" + (bad ? " is-bad" : "");
    clearTimeout(warnT); warnT = setTimeout(() => { const x = view.querySelector("#mic-warn"); if (x) x.className = "mic-warn"; }, 3800);
  }

  /* ---------------- drawing ---------------- */
  function buildSpec() {
    const svg = $("#mic-spec"); if (!svg) return;
    if (!st.placed) { svg.innerHTML = ""; return; }
    const u = "m" + (++UID) + "_", sp = SPECS[st.P.id].build(st.P, st.obj, u);
    svg.innerHTML = `<defs>${sp.defs}</defs>${sp.body}`;
  }
  function blurPx() { if (!st.placed) return 0; const x = xFocus(); return x <= .5 ? 0 : 18 * (1 - Math.exp(-(x - .5) / 8)); }
  function drawEye() {
    const svg = $("#mic-spec"), eye = $("#mic-eye"); if (!svg || !eye) return;
    const F = FOV[st.obj] * 1.16, w = eye.getBoundingClientRect().width || 320;
    svg.setAttribute("viewBox", `${f(st.pan[0] - F / 2)} ${f(st.pan[1] - F / 2)} ${f(F)} ${f(F)}`);
    const b = bright(); let fl = `blur(${f(blurPx() * w / 340)}px)`;
    if (b < LIGHT_OK[0]) fl += ` brightness(${(.1 + .9 * Math.pow(b / LIGHT_OK[0], 1.3)).toFixed(3)})`;
    else if (b > LIGHT_OK[1]) { const k = (b - LIGHT_OK[1]) / (100 - LIGHT_OK[1]); fl += ` brightness(${(1 + .9 * k).toFixed(3)}) contrast(${(1 - .6 * k).toFixed(3)}) saturate(${(1 - .5 * k).toFixed(3)})`; }
    $("#mic-blur").style.filter = fl;
  }
  function draw() {
    if (!st || !$("#mic-scene")) return;
    const dy = clamp(st.s / 45, -8, 50);
    const stg = $("#mic-stage"); stg.setAttribute("transform", `translate(0 ${f(dy)})`);
    $("#mic-onstage").setAttribute("opacity", st.placed ? 1 : 0);
    ["#mic-stain", "#mic-stain2"].forEach(s => $(s).setAttribute("fill", { cheek: "#8FB0E0", bone: "#C9B48A", cartilage: "#B49ACB", adipose: "#EBB3C9" }[st.P.id] || "#D97AA6"));
    $("#mic-scratch").innerHTML = st.cracked ? `<path d="M136 160 l-6 3 M136 160 l7 3 M136 160 l1 3" stroke="#D93B3B" stroke-width=".8"/>` : "";
    $("#mic-clipL").style.transform = st.clipped ? "rotate(0deg)" : "rotate(-35deg)";
    $("#mic-clipR").style.transform = st.clipped ? "rotate(0deg)" : "rotate(35deg)";
    if (st._drawTray) st._drawTray();
    $("#mic-kc").setAttribute("transform", `rotate(${f(st.coarseDeg % 360)})`);
    $("#mic-kf").setAttribute("transform", `rotate(${f(st.fineDeg % 360)})`);
    view.querySelectorAll(".mic-dial").forEach(d => { const k = d.id.endsWith("coarse") ? st.coarseDeg : st.fineDeg; d.querySelector(".mic-rot").setAttribute("transform", `rotate(${f(k % 360)})`); });
    const a = (-25 + st.light * .5) * Math.PI / 180;
    $("#mic-lever").setAttribute("x2", f(124 - 22 * Math.cos(a))); $("#mic-lever").setAttribute("y2", f(180 + 22 * Math.sin(a)));
    $("#mic-leverknob").setAttribute("cx", f(124 - 22 * Math.cos(a))); $("#mic-leverknob").setAttribute("cy", f(180 + 22 * Math.sin(a)));
    $("#mic-beam").setAttribute("d", `M131 288 L149 288 L${f(140 + 4 + st.light * .08)} ${f(186 + dy)} L${f(140 - 4 - st.light * .08)} ${f(186 + dy)} Z`);
    $("#mic-beam").setAttribute("opacity", (.1 + st.light / 100 * .55).toFixed(2));
    $("#mic-glow").setAttribute("opacity", (.25 + st.light / 100 * .7).toFixed(2));
    // callout bubble in the scene on level 1
    const co = $("#mic-callout"), say = L.n === 1 && !st.placed ? ["Drag me onto the stage", 62, 288] : L.n === 1 && !st.clipped ? ["Tap the stage to clip", 150, 136 + dy] : null;
    if (say) { const w = say[0].length * 5.4 + 16; co.setAttribute("opacity", 1); $("#mic-callrect").setAttribute("x", f(say[1] - w / 2)); $("#mic-callrect").setAttribute("y", f(say[2] - 13)); $("#mic-callrect").setAttribute("width", f(w)); $("#mic-calltext").setAttribute("x", f(say[1])); $("#mic-calltext").setAttribute("y", f(say[2])); $("#mic-calltext").textContent = say[0]; }
    else co.setAttribute("opacity", 0);
    // objectives
    view.querySelectorAll(".mic-obj").forEach(b => { const on = +b.dataset.o === st.obj; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
    $("#mic-crack").setAttribute("opacity", st.cracked ? .9 : 0);
    drawEye();
    // readouts
    $("#mic-readout").innerHTML = `Objective <b>${st.obj}×</b> · eyepiece 10× · total <b>${L.calc ? "?" : st.obj * 10 + "×"}</b> · field ≈ <b>${FOV[st.obj] >= 1000 ? (FOV[st.obj] / 1000).toFixed(1) + " mm" : FOV[st.obj] + " µm"}</b>`;
    if (L.n === 1) {
      const x = st.placed ? xFocus() : 99, b = bright();
      $("#mic-chipf").className = "mic-chip " + (x <= .5 ? "is-ok" : x <= 3 ? "is-mid" : "is-bad"); $("#mic-chipf").textContent = !st.placed ? "Focus: no slide" : x <= .5 ? "Focus: sharp ✓" : x <= 3 ? "Focus: almost" : "Focus: blurry";
      $("#mic-chipl").className = "mic-chip " + (lightOk() ? "is-ok" : "is-bad"); $("#mic-chipl").textContent = b < LIGHT_OK[0] ? "Light: too dark" : b > LIGHT_OK[1] ? "Light: too bright" : "Light: good ✓";
    }
    // steps + tip
    if (st.phase === "scope") {
      K.setStep(stepIndex());
      const hint = $("#lab-hint");
      if (L.n === 1) hint.innerHTML = `<b>Step ${stepIndex() + 1}.</b> ` + whatToDo(false);
      else hint.innerHTML = !st.placed ? (st.idx ? "New slide: put it on the stage and clip it. Remember where the nosepiece is!" : "Put the slide on the stage and clip it. The last student left the microscope on 40×…")
        : !st.clipped ? "Clip the slide so it can't slide around." : st.obj === 40 ? "At 40×: fine focus only. Identify when the cells are crisp." : "On your own: low power first, then work up to 40× and identify.";
    }
    $("#mic-id").disabled = !st.clipped || st.phase !== "scope";
  }

  /* ---------------- identify ---------------- */
  function identify() {
    if (!st || st.phase !== "scope" || !st.clipped) return;
    if (!ready()) {
      const why = !sharp() ? "The image isn't sharp yet." : L.n > 1 && st.obj !== 40 ? "Go up to 40× and focus there first (fine knob only)." : L.n === 1 && st.obj === 4 ? "Switch to 10× first: 4× is only for finding the specimen." : "Fix the light first: it's too " + (bright() < LIGHT_OK[0] ? "dark." : "bright.");
      warn("Not ready: " + why); BGX.sfx.no(); return;
    }
    if (L.n > 1 && !lightOk()) { st.miss.light = true; st.miss.lightWord = bright() < LIGHT_OK[0] ? "too dark" : "too bright"; }
    st.phase = "id"; K.setStep(5); BGX.sfx.tap();
    $("#lab-hint").innerHTML = "Look closely at the shapes, layers and nuclei. Which tissue is it?";
    $("#mic-id").disabled = true;
    const q = $("#mic-q");
    q.innerHTML = `<p class="br-label">What tissue is on this slide?</p><div class="br-answers">${st.P.choices.map(c => `<button class="br-ans is-small" data-c="${c}">${esc(SPECS[c].name)}</button>`).join("")}</div>`;
    q.querySelectorAll("[data-c]").forEach(b => b.onclick = () => answerId(b));
    // (shown in the docked task panel: no page scrolling)
  }
  function answerId(b) {
    const ok = b.dataset.c === st.P.id, q = $("#mic-q");
    q.querySelectorAll("[data-c]").forEach(x => { x.disabled = true; if (x.dataset.c === st.P.id) x.classList.add("is-correct"); });
    if (!ok) { b.classList.add("is-wrong"); st.miss.wrong = true; st.miss.choice = b.dataset.c; }
    BGX.reward(ok, b, { flash: view });
    q.insertAdjacentHTML("beforeend", `<div class="mic-clue ${ok ? "is-ok" : "is-no"}"><b>${ok ? "Correct!" : "Not quite: it's " + esc(SPECS[st.P.id].name.toLowerCase()) + "."}</b> ${SPECS[st.P.id].clue}</div>`);
    if (L.calc) { st.phase = "calc"; return st.idx === 0 ? magQuestion() : sizeQuestion(); }
    afterSlide();
  }
  function choiceQ(title, html, opts, correct, explain, then) {
    const q = $("#mic-q");
    q.insertAdjacentHTML("beforeend", `<div class="lab-calc mic-calc"><p class="br-label">${title}</p>${html}<div class="br-answers">${opts.map(o => `<button class="br-ans is-small" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`);
    const box = q.lastElementChild;
    box.querySelectorAll("[data-v]").forEach(b => b.onclick = () => {
      const ok = b.dataset.v === correct;
      box.querySelectorAll("[data-v]").forEach(x => { x.disabled = true; if (x.dataset.v === correct) x.classList.add("is-correct"); });
      if (!ok) { b.classList.add("is-wrong"); st.miss.calc++; }
      BGX.reward(ok, b, { flash: view });
      box.insertAdjacentHTML("beforeend", `<p class="mic-clue ${ok ? "is-ok" : "is-no"}"><b>${ok ? "Right." : "Not quite."}</b> ${explain}</p>`);
      then();
    });
    // (shown in the docked task panel: no page scrolling)
  }
  function magQuestion() {
    choiceQ("Calculate: total magnification", `<p>The eyepiece is <b>10×</b> and you are on the <b>40×</b> objective. How many times bigger than life does the tissue look?</p>`,
      BGX.shuffle(["400×", "50×", "40×", "4000×"]), "400×", "Total magnification = eyepiece × objective = 10 × 40 = <b>400×</b>. (At 4× it's 40×, at 10× it's 100×.)", sizeQuestion);
  }
  function sizeQuestion() {
    const P = st.P, S = SPECS[P.id], n = P.N, size = Math.round(FOV[40] / n);
    st.measure = true; drawRuler(n);
    const opts = BGX.shuffle([...new Set([size + " µm", Math.round(FOV[40] * n) + " µm", Math.round(FOV[4] / n) + " µm", Math.round(45 / n) + " µm"])]);
    choiceQ("Estimate: how big is it?", `<p>Field of view at 40× = field number ÷ objective = 18 mm ÷ 40 = <b>0.45 mm = 450 µm</b> across. ${S.measure.q(n)} (see the ruler drawn across the eyepiece view). About how big is ${S.measure.what}?</p>
      <details class="lab-howcalc"><summary>💡 Show me how (beginner)</summary><ol><li>The whole circle you see at 40× is 450 µm wide.</li><li>If ${n} of them fit across, one is 450 ÷ ${n}.</li><li>Use the 40× field, not the 4× one (4.5 mm = 4500 µm).</li></ol></details>`,
      opts, size + " µm", `${n} across a 450 µm field, so one is 450 ÷ ${n} ≈ <b>${size} µm</b> (1 µm = one thousandth of a millimetre). Real ${S.short} are in this range.`, afterSlide);
  }
  function drawRuler(n) {
    const g = $("#mic-ruler"); if (!g) return;
    const a = SPECS[st.P.id].measure.across ? st.P.angle + 90 : 0;
    let t = `<line x1="-100" x2="100" y1="0" y2="0" stroke="#0E6B66" stroke-width="1.6" stroke-dasharray="5 3"/>`;
    for (let i = 0; i <= n; i++) { const x = -100 + i * 200 / n; t += `<line x1="${f(x)}" x2="${f(x)}" y1="-6" y2="6" stroke="#0E6B66" stroke-width="1.6"/>`; }
    t += `<rect x="-36" y="9" width="72" height="16" rx="8" fill="#0E6B66" transform="rotate(${-a})"/><text y="21" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" transform="rotate(${-a})">450 µm</text>`;
    g.innerHTML = `<g transform="rotate(${f(a)})">${t}</g>`; g.setAttribute("opacity", 1);
  }
  function afterSlide() {
    st.results.push({ P: st.P, miss: st.miss, obj: st.obj });
    st.phase = "between";
    if (st.idx < st.slides.length - 1) {
      $("#mic-q").insertAdjacentHTML("beforeend", `<button class="br-next mic-nextslide" id="mic-nextslide" type="button">Next slide →</button>`);
      $("#mic-nextslide").onclick = () => {
        st.idx++; st.P = st.slides[st.idx]; newSlideState(); st.s = U(Math.random, 1500, 2400);
        render(); BGX.sfx.tap();
        warn("Old slide off, stage lowered. The nosepiece is still on " + st.obj + "×.");
      };
      // (shown in the docked task panel: no page scrolling)
    } else finish();
  }

  /* ---------------- result ---------------- */
  function thumb(P) {
    const u = "t" + (++UID) + "_", sp = SPECS[P.id].build(P, 40, u);
    return `<svg viewBox="-225 -225 450 450" class="mic-thumb" role="img" aria-label="${esc(SPECS[P.id].name)} at 400×"><defs>${sp.defs}<clipPath id="${u}ring"><circle r="225"/></clipPath></defs><g clip-path="url(#${u}ring)"><rect x="-225" y="-225" width="450" height="450" fill="#F3EEE8"/>${sp.body}</g><circle r="223" fill="none" stroke="#2E363D" stroke-width="5"/></svg>`;
  }
  function finish() {
    st.phase = "done";
    let pen = 0; const lines = [];
    st.results.forEach((R, i) => {
      const m = R.miss, tag = st.results.length > 1 ? `Slide ${i + 1}: ` : "";
      pen += m.crash + (m.low ? 1 : 0) + (m.light ? 1 : 0) + (m.wrong ? 1 : 0) + m.calc;
      if (m.crash) lines.push(`${tag}coarse knob at 40× cracked the slide${m.crash > 1 ? " " + m.crash + " times" : ""} (−${m.crash}). At high power use only the fine knob.`);
      if (m.low) lines.push(`${tag}you started focusing at high power (−1). Always find and focus the specimen at 4× first.`);
      if (m.light) lines.push(`${tag}the light was ${m.lightWord} when you identified it (−1). 40× needs the iris opened wider.`);
      if (m.wrong) lines.push(`${tag}identified as ${esc(SPECS[m.choice].name.toLowerCase())}, but it was ${esc(SPECS[R.P.id].name.toLowerCase())} (−1).`);
      if (m.calc) lines.push(`${tag}${m.calc} calculation${m.calc > 1 ? "s" : ""} wrong (−${m.calc}).`);
    });
    const n0 = Math.max(0, 3 - pen), n = K.capStars(n0);
    const verdict = n0 === 3 ? "Textbook microscope technique!" : n0 === 2 ? "Good work, one slip." : n0 === 1 ? "You got there, with a few slips." : "Lots of slips this time.";
    const why = (lines.length ? `<span class="mic-lines">${lines.map(x => `<span>• ${x}</span>`).join("")}</span>` : "You started at low power, focused with the coarse knob only at low power, used just the fine knob higher up, set the light and named every tissue correctly.") + esc(K.capNote(n0));
    const cards = st.results.map(R => `<figure class="mic-card">${thumb(R.P)}<figcaption><b>${esc(SPECS[R.P.id].name)}</b> <span class="mic-cardmeta">at 400×${R.P.N ? ` · about ${Math.round(FOV[40] / R.P.N)} µm` : ""}</span><br>${SPECS[R.P.id].clue}</figcaption></figure>`).join("");
    const rules = `<div class="mic-rules"><p class="br-label">The microscope routine to remember</p><ol><li>Lowest power (4×) first, stage lowered, slide clipped.</li><li>Coarse knob to find focus at 4× only.</li><li>Switch up: lenses are parfocal, so only the fine knob is needed.</li><li>Open the iris more as magnification goes up.</li><li>Total magnification = 10 × objective; field width = 18 mm ÷ objective.</li></ol></div>`;
    view.querySelectorAll(".mic-panel button, .mic-panel input, #mic-id, #lab-hintbtn").forEach(b => b.disabled = true);
    K.result({ n, verdict, why, extraHTML: `<div class="mic-cards">${cards}</div>${rules}`, levels: LEVELS, onLevel: start, onMenu: menu });
  }

  /* ---------------- keyboard ---------------- */
  document.addEventListener("keydown", e => {
    if (!st || st.phase !== "scope" || document.querySelector(".br-milestone")) return;
    const t = e.target; if (t && t.tagName === "INPUT" && /Arrow/.test(e.key)) return;
    const k = e.key;
    if (k === "1" || k === "2" || k === "3") setObjective([4, 10, 40][+k - 1]);
    else if (k === "q" || k === "Q") turn("coarse", 10, "key"); else if (k === "a" || k === "A") turn("coarse", -10, "key");
    else if (k === "w" || k === "W") turn("fine", 3, "key"); else if (k === "s" || k === "S") turn("fine", -3, "key");
    else if (k === "]" || k === "[") { st.light = clamp(st.light + (k === "]" ? 4 : -4), 0, 100); const li = $("#mic-lightin"); if (li) li.value = Math.round(st.light); draw(); }
    else if (/^Arrow/.test(k) && st.clipped) { e.preventDefault(); const s = FOV[st.obj] * .04; movePan(k === "ArrowLeft" ? -s : k === "ArrowRight" ? s : 0, k === "ArrowUp" ? -s : k === "ArrowDown" ? s : 0); }
    else if (k === "Enter" && t && t.tagName !== "BUTTON") { e.preventDefault(); identify(); }
    else if ((k === "c" || k === "C")) { if (!st.placed) placeSlide(); else clipSlide(); }
  });
  addEventListener("resize", () => { if (st) drawEye(); });

  /* test hook: exposes the hidden focus point and actions so automated checks can play perfectly */
  BGX.lab = {
    state: () => st,
    slide: id => { st.P = st.slides[st.idx] = makeSlide(id); newSlideState(); },
    info: () => st && { dz: dz(), sharp: sharp(), bright: bright(), lightOk: lightOk(), ready: ready(), fine: FINE, coarse: COARSE, okRange: LIGHT_OK, gain: GAIN, f: st.f, fov: FOV },
    act: { place: placeSlide, clip: clipSlide, obj: setObjective, turn: (k, d) => turn(k, d, "test"), light: v => { st.light = v; const li = $("#mic-lightin"); if (li) li.value = v; draw(); } }
  };
  menu();
})();
