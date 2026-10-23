/* BioglowRX diagram: "skeleton" — front view of the whole skeleton (anatomical position).
   Small or hidden bones (skull, spine, hand, foot, hip bone) also get a zoomed inset.
   Spot ids: frontal parietal occipital temporal mandible maxilla zygomatic nasal
   cervical thoracic lumbar sacrum coccyx sternum ribs clavicle scapula humerus radius ulna
   carpals metacarpals phalanges-hand ilium ischium pubis femur patella tibia fibula
   calcaneus talus metatarsals phalanges-foot */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const BONE = "#EFE6D0", EDGE = "#7D6C50", HE = "#9E1040", DARK = "#2A3440";
  const GROUPS = {
    skull: ["frontal", "parietal", "occipital", "temporal", "mandible", "maxilla", "zygomatic", "nasal"],
    spine: ["cervical", "thoracic", "lumbar", "sacrum", "coccyx"],
    hand: ["carpals", "metacarpals", "phalanges-hand"],
    foot: ["calcaneus", "talus", "metatarsals", "phalanges-foot"],
    pelvis: ["ilium", "ischium", "pubis"]
  };
  let it = null;
  const f = id => dg.is(it, id) ? dg.HL : BONE, c = id => dg.cls(it, id);
  const r1 = v => +v.toFixed(1);
  /* bones are drawn as round-capped strokes; one SVG filter adds the brown outline to the whole group */
  const seg = a => a.map(p => `M${p[0]} ${p[1]}L${p[2]} ${p[3]}`).join("");
  const sb = (id, d, w) => `<path d="${d}" stroke="${f(id)}" stroke-width="${w}"${c(id)}/>`;
  /* long bones: list of [x1,y1,x2,y2]; k = knob radius at both ends */
  const lb = (id, a, w, k) => `<g stroke="${f(id)}"${c(id)}><path d="${seg(a)}" stroke-width="${w}"/>${k ? `<path d="${a.map(p => `M${p[0]} ${p[1]}h0M${p[2]} ${p[3]}h0`).join("")}" stroke-width="${2 * k}"/>` : ""}</g>`;
    const P = (id, d) => `<path d="${d}" fill="${f(id)}" stroke="${EDGE}" stroke-width=".5"${c(id)}/>`;
  let U = "", mn = 0;   // mirrored copies reuse the drawing with <use> to keep the svg small
  const mir = (s, cx) => { const id = U + "m" + (++mn); return `<g id="${id}">${s}</g><use href="#${id}" transform="matrix(-1 0 0 1 ${2 * cx} 0)"/>`; };
  const OUT = u => `<filter id="${u}o" x="-10%" y="-10%" width="120%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius=".5" result="d"/><feFlood flood-color="${EDGE}"/><feComposite in2="d" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  const G = (u, s, tr) => `<g filter="url(#${u}o)" fill="none" stroke-linecap="round" stroke-linejoin="round"${tr ? ` transform="${tr}"` : ""}>${s}</g>`;

  /* ---- reusable parts, in their own local coordinates ---- */
  function hand() {            // body's left hand, palm forward: thumb on +x side
    return lb("ulna", [[18, -6, 18, 7]], 4.5) + lb("radius", [[31, -6, 31, 7]], 6.5) +
      sb("carpals", [15.5, 21.5, 27.5, 33.5].map(x => `M${x} 12.5h0M${x} 19h0`).join(""), 6) +
      lb("metacarpals", [[15, 23, 11, 40], [20.5, 24, 18.5, 42], [26.5, 24, 26, 43], [32.5, 24, 34, 41], [36.5, 22, 43, 33]], 2.7, 1.8) +
      lb("phalanges-hand", [[10.5, 43, 8.5, 51], [8.3, 53, 7.2, 58], [7, 60, 6.5, 64], [18.3, 45, 17.6, 55], [17.5, 57, 17.2, 63], [17.1, 65, 17, 69],
        [26, 46, 26, 57], [26, 59, 26, 66], [26, 68, 26, 72], [34.3, 44, 35.6, 54], [35.8, 56, 36.5, 62], [36.6, 64, 37, 68],
        [44, 36, 46.5, 43], [47, 45, 48.5, 50]], 2.2, 1.4);
  }
  function pelvis(withSacrum) {  // front view, local 0..64 × 0..46
    const side = P("ilium", "M26 9Q14 -1 3 9Q1 18 7 23L12 27Q16 24 19 22Q23 20 25 22Z") +
      P("ischium", "M8 31Q6 41 13 46L21 44L21 40L15 36Z") +
      P("pubis", "M14 29L31 33L31.5 39.5L22 38.5L21 44L21 40L15 35Z") +
      `<circle cx="11.5" cy="30" r="4.6" fill="#C9BB9C" stroke="${EDGE}" stroke-width=".5"/><ellipse cx="18" cy="38" rx="3.6" ry="2.6" fill="${DARK}"/>`;
    return mir(side, 32) + (withSacrum ? P("sacrum", "M25.5 9L38.5 9L35 27L32 31L29 27Z") : "");
  }
  function skullSide() {         // lateral view facing left, local ≈ 4..60 × 3..59
    return `<ellipse cx="36" cy="24" rx="24" ry="21" fill="${BONE}"/>` +
      P("frontal", "M34 3A24 21 0 0 0 12.5 28.3L26 29Z") +
      P("parietal", "M34 3A24 21 0 0 1 54 10.1L52 28Q40 15 26 29Z") +
      P("occipital", "M54 10.1A24 21 0 0 1 56 35.6Q55 42 48 42L50 32L52 28Z") +
      P("temporal", "M26 29Q40 15 52 28L50 32L48 42Q46 46 44 44L36 38L22 37.5L22 34Z") +
      `<circle cx="41" cy="33.5" r="2" fill="${DARK}"/>` +
      `<ellipse cx="17.5" cy="31" rx="4.2" ry="3.8" fill="${DARK}"/>` +
      P("maxilla", "M6 36L9 37.5L14 36L13 40L16 43L28 43.5L28 48L8 50Q4 46 6 40Z") +
      P("nasal", "M12.5 28.3L6 36L9 37.5L14.5 30Z") +
      P("zygomatic", "M14 36Q19 32.5 24 34L24 38Q20 42 16 43L13 40Z") +
      P("mandible", "M8 52L30 51.5Q34 51 35 47.5L38.5 37.5L41.5 38L40 46Q38 58 30 58L10 59Q6 58 6 55Z") +
      `<path d="M9 49.4H28M9 52.6H28" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 .6" stroke-linecap="butt"/>`;
  }
  /* vertebrae as filled boxes; xf gives the centre x of box i */
  const vert = (id, n, y0, dy, w, h, xf, sp) => {
    let d = "", q = "";
    for (let i = 0; i < n; i++) {
      const y = y0 + i * dy, x = xf(i);
      d += `M${r1(x - w / 2)} ${r1(y)}h${w}v${h}h${-w}z`;
      if (sp) q += `M${r1(x + w / 2)} ${r1(y + h / 2)}l${r1(w * .5)} ${r1(h * .5)}`;
    }
    return `<g${c(id)}><path d="${d}" fill="${f(id)}" stroke="${EDGE}" stroke-width=".4"/>${sp ? `<path d="${q}" stroke="${f(id)}" stroke-width="${r1(h * .6)}"/>` : ""}</g>`;
  };
  function spineSide() {         // lateral view, anterior to the left, local ≈ 16..42 × 3..110
    return vert("cervical", 7, 4, 2.7, 6, 2.1, i => 27 - 3 * Math.sin(Math.PI * i / 6), 1) +
      vert("thoracic", 12, 23, 3.3, 8, 2.7, i => 27 + 5 * Math.sin(Math.PI * i / 11), 1) +
      vert("lumbar", 5, 63, 4.4, 11, 3.6, i => 27 - 4 * Math.sin(Math.PI * i / 4), 1) +
      P("sacrum", "M22 84L34 85Q36 94 40 101L34 103Q28 94 22 84Z") + P("coccyx", "M35.5 103.5L40 102.5Q40.5 107 36.5 110Z");
  }
  function footSide() {          // side view, toes to the right, local ≈ 2..73 × -12..31
    return lb("tibia", [[21, -12, 21, 6]], 8) + lb("fibula", [[28, -12, 28.5, 8]], 3.6) +
      P("calcaneus", "M3 22Q1 13 12 13.5L28 16L30 22Q24 26.5 14 25.5Q5 28 3 22Z") +
      P("talus", "M13 10Q22 2 32 8.5L34.5 14L16 16Z") +
      P("tarsals", "M32 8.5L41 11L45 20L30 22L28 16L34.5 14Z") +
      lb("metatarsals", [[44, 13.5, 60, 23], [43, 18, 59, 26.5]], 4, 2.4) +
      lb("phalanges-foot", [[63, 24.5, 67.5, 26.3], [70, 27, 73, 28], [62.5, 28, 67, 29.8], [69.5, 30.4, 72.5, 31.2]], 2.8, 1.6);
  }

  /* ---- the whole skeleton, front view, centred on x = 80 ---- */
  function body() {
    let s = vert("cervical", 7, 23.8, 1.15, 3.6, .9, () => 80) + vert("thoracic", 12, 32.2, 2.5, 4.2, 2, () => 80) + vert("lumbar", 5, 62.4, 2.7, 5.4, 2.3, () => 80);
    // one side (body's right = viewer's left), mirrored
    const W = [11, 14, 16, 17.5, 18, 18, 17.5, 16.5, 15, 13];
    let ribs = "";
    W.forEach((w, i) => { const y = 34.5 + i * 2.9; ribs += `M79 ${r1(y)}C${r1(80 - w * .6)} ${r1(y - 1.5)} ${80 - w} ${r1(y + 1)} ${81 - w} ${r1(y + 6)}`; });
    const scap = "M58.5 30.5L70 32L61.5 52Z";
    let mt = [], ph = [];
    for (let k = 0; k < 5; k++) { const x0 = 70.2 + k * 1.4, x1 = r1(67.6 + k * 2.3); mt.push([r1(x0), 149.2, x1, 153.4]); ph.push([x1, 155, r1(x1 - .2), 156.6]); }
    let side = P("scapula", scap) + sb("ribs", ribs, 1.2) +
      (dg.is(it, "scapula") ? `<path d="${scap}" fill="${dg.HL}" opacity=".6"/>` : "") +
      sb("clavicle", "M78.5 31.5Q70 28.6 61.5 30.8", 1.8) +
      lb("humerus", [[61.3, 34, 56, 60]], 2.8, 2.5) +
      lb("ulna", [[57.8, 62, 54, 85.5]], 1.5, 1.3) + lb("radius", [[55, 63, 50.6, 85]], 1.7, 1.4) +
      `<g transform="translate(59 85) scale(-.27 .27)">${hand()}</g>` +
      lb("femur", [[69, 85.3, 64.5, 87.2]], 2.6) + lb("femur", [[65, 87.5, 71, 112.5]], 3, 2.6) + sb("femur", "M69 85.3h0", 5.4) +
      lb("fibula", [[67.4, 117, 68.6, 146]], 1.3, 1.2) + lb("tibia", [[72.6, 116.4, 73, 145]], 3, 2.6) +
      (dg.is(it, "patella") ? `<circle cx="71" cy="113" r="6.5" fill="${dg.HL}" opacity=".35"/>` : "") +
      sb("patella", "M71 113h0", 4.8) +
      P("calcaneus", "M69.2 150.6Q69 148.2 71 148.4L74 149.4L73.6 152Q71 152.6 69.2 150.6Z") +
      P("talus", "M70.5 146.4Q73 145.2 75 146.6L75 149.2L70.6 149Z") +
      lb("metatarsals", mt, .9) + lb("phalanges-foot", ph, .9);
    s += mir(side, 80);
    s += `<g transform="translate(62 68) scale(.5625)">${pelvis(false)}</g>`;
    s += P("sacrum", "M75 76L85 76L80.9 87.5L79.1 87.5Z") + P("coccyx", "M79.2 88.2L80.8 88.2L80 91.2Z") +
      P("sternum", "M78.6 32.6L81.4 32.6L81.2 52L80 55.5L78.8 52Z");
    // skull, front view
    s += `<ellipse cx="80" cy="13" rx="9.5" ry="10.5" fill="${f("parietal")}"${c("parietal")}/>` +
      mir(P("temporal", "M70.7 13.5L72.6 17L72.6 22.5L71 19.5Z") + P("zygomatic", "M71.6 21.7Q73 19.6 75.8 21.4L75.4 23.6Q73 24.4 71.8 23Z"), 80) +
      P("frontal", "M71 12Q80 3.2 89 12L88.4 17Q80 15.3 71.6 17Z") +
      P("mandible", "M73.5 20.5L74.6 27.6Q80 31.6 85.4 27.6L86.5 20.5L85.3 21L84.6 26Q80 28.4 75.4 26L74.7 21Z") +
      P("maxilla", "M75.2 21.4L78.4 20.6L80 23.6L81.6 20.6L84.8 21.4L84.8 25.6L75.2 25.6Z") +
      `<g fill="${DARK}"><ellipse cx="76.4" cy="19.2" rx="2.2" ry="2"/><ellipse cx="83.6" cy="19.2" rx="2.2" ry="2"/><path d="M78.5 20.6L81.5 20.6L80 23.4Z"/></g>` +
      P("nasal", "M79.1 17.2L80.9 17.2L81.3 20.4L78.7 20.4Z") +
      `<path d="M76 25.2H84" stroke="#fff" stroke-dasharray="1 .3" stroke-linecap="butt"/>`;
    return s;
  }

  const INSET = {      // region box on the main figure (viewer's right side), caption, drawing
    skull: { box: [69, 1.5, 22, 31], cap: "Skull, side view", tr: "translate(88 48) scale(1.05)", g: skullSide },
    spine: { box: [74, 22.5, 12, 70], cap: "Spine, side view", tr: "translate(95 30)", g: spineSide },
    hand: { box: [99.5, 83, 15, 25], cap: "Left hand", tr: "translate(92 41) scale(1.13)", g: hand },
    foot: { box: [81, 144, 15, 14], cap: "Left foot, side view", tr: "translate(85 74) scale(.96)", g: footSide },
    pelvis: { box: [60.5, 66.5, 39, 29], cap: "Hip bones", tr: "translate(87 58)", g: () => pelvis(true) }
  };

  BGX.DIAGRAMS.skeleton = item => {
    it = item || null;
    const u = U = dg.uid(), sp = dg.spots(it), grp = Object.keys(GROUPS).find(k => sp.some(s => GROUPS[k].indexOf(s) >= 0));
    let inner = `<defs>${OUT(u)}</defs>`;
    if (!grp) inner += G(u, body());
    else {
      const I = INSET[grp], [bx, by, bw, bh] = I.box, X = bx - 34;
      inner += G(u, body(), "translate(-34 0)") +
        `<rect x="${X}" y="${by}" width="${bw}" height="${bh}" rx="3" fill="none" stroke="#FFD1E1" stroke-dasharray="2.5 1.5"/>` +
        `<path d="M${X + bw} ${by}L84 18M${X + bw} ${by + bh}L84 142" stroke="#FFD1E1" stroke-width=".7" opacity=".7"/>` +
        `<rect x="84" y="18" width="70" height="124" rx="10" fill="#0F1822" fill-opacity=".6" stroke="#9FB3C8" stroke-width=".8"/>` +
        `<text x="119" y="28" font-family="Chivo, sans-serif" font-size="6.6" fill="#C9D6E2" text-anchor="middle">${I.cap}</text>` + G(u, I.g(), I.tr);
    }
    it = null;
    return dg.frame(inner, item ? "Skeleton: " + item.name : "The human skeleton, front view", ["#34495E", "#1C2733"]);
  };
})();
