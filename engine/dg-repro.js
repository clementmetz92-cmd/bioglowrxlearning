/* BioglowRX diagram "repro" — the male and female reproductive systems (simplified textbook schematics).
   Male tract, side (sagittal) view, front of the body on the left — spots: testes, tubules*, leydig*, sertoli*, epididymis,
     ductus, vesicles, prostate, bulbo, penis   (* = seminiferous tubule cross-section close-up)
   Female tract, front view — spots: ovaries, tubes, uterus, cervix, vagina, fert (ampulla of the uterine tube)
   Ovary close-up — spots: follicles, cl, ovulation.  Meiosis trees — spots: sperm (spermatogenesis), oogen (oogenesis)
   Breast — spot: breast.  28-day cycle chart — spots: fsh, lh, oest, prog, cycle.
   Hormone axis (hypothalamus → pituitary → testis) — spots: gnrh, testo, inhibin.  Pregnancy signal — spot: hcg.
   Overview (null): both tracts plus a mini cycle chart. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const H = ' class="dg-hl"';
  const INK = "#55616e";

  /* ---------- male tract, sagittal ---------- */
  function male(it) {
    const on = id => dg.is(it, id), f = (id, b) => on(id) ? HL : b, c = id => on(id) ? H : "";
    return `
      <path d="M122 18 C128 50 130 82 120 116" stroke="#eadbd4" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="66" rx="7" ry="11" fill="#ece5da" stroke="#cbbfae"/>
      <ellipse cx="84" cy="40" rx="20" ry="17" fill="#f5ecd2" stroke="#d6c08a"/>
      <ellipse cx="106" cy="50" rx="5" ry="13" transform="rotate(-22 106 50)" fill="${f("vesicles", "#e7c98f")}" stroke="#c9a65e"${c("vesicles")}/>
      <path d="M103 61 L89 68" stroke="${f("vesicles", "#c9a65e")}" stroke-width="1.6"/>
      <path d="M78 92 L43 111" stroke="${f("penis", "#f1c4ac")}" stroke-width="13" stroke-linecap="round"${c("penis")}/>
      <ellipse cx="38" cy="114" rx="7.5" ry="6.5" fill="${f("penis", "#eaae98")}"${c("penis")}/>
      <ellipse cx="78" cy="124" rx="15" ry="15" fill="#f7dccb" stroke="#e0b49c"/>
      <ellipse cx="75" cy="124" rx="8" ry="10.5" fill="${f("testes", "#f3e1e8")}" stroke="#c99aab"${c("testes")}/>
      <path d="M83 114 C91 116 91 132 83 134" stroke="${f("epididymis", "#b98aa0")}" stroke-width="${on("epididymis") ? 5 : 4}" fill="none" stroke-linecap="round"${c("epididymis")}/>
      <ellipse cx="84" cy="68" rx="11" ry="8" fill="${f("prostate", "#d9a6b5")}" stroke="#b97d90"${c("prostate")}/>
      <circle cx="93" cy="82" r="3.2" fill="${f("bulbo", "#c9a65e")}"${c("bulbo")}/>
      <path d="M84 57 V84 C84 90 80 92 76 93 L42 112" stroke="${on("penis") ? "#fff" : "#c7a24a"}" stroke-width="1.6" fill="none"/>
      <path d="M85 134 C96 132 96 112 90 104 C80 94 58 90 46 80 C38 70 42 48 56 36 C64 20 94 14 104 26 C110 34 108 48 104 58" stroke="${f("ductus", "#8a6fb5")}" stroke-width="${on("ductus") ? 3 : 1.8}" fill="none" stroke-linecap="round"${c("ductus")}/>`;
  }

  /* ---------- female tract, front view ---------- */
  function female(it) {
    const on = id => dg.is(it, id), f = (id, b) => on(id) ? HL : b, c = id => on(id) ? H : "";
    const tube = (d, fim) => `<path d="${d}" stroke="${f("tubes", "#d99a9a")}" stroke-width="${on("tubes") ? 4.5 : 3.5}" fill="none" stroke-linecap="round"${c("tubes")}/>
      <path d="${fim}" stroke="${f("tubes", "#d99a9a")}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    return `
      <path d="M43 70 L60 58 M117 70 L100 58" stroke="#d9b3a8" stroke-width="1.4"/>
      ${tube("M60 46 C48 39 40 37 32 41 C24 45 22 53 24 60", "M24 60 l-4 4 M24 60 l0 6 M24 60 l4 5")}
      ${tube("M100 46 C112 39 120 37 128 41 C136 45 138 53 136 60", "M136 60 l4 4 M136 60 l0 6 M136 60 l-4 5")}
      ${on("fert") ? `<path d="M44 38.5 C38 38 34 39.5 29 43" stroke="${HL}" stroke-width="6" fill="none" stroke-linecap="round"${H}/><circle cx="36" cy="40" r="3" fill="#fff" stroke="${HL}"/>` : ""}
      <ellipse cx="34" cy="72" rx="9" ry="6" fill="${f("ovaries", "#f0c8a8")}" stroke="#d29c78"${c("ovaries")}/>
      <ellipse cx="126" cy="72" rx="9" ry="6" fill="${f("ovaries", "#f0c8a8")}" stroke="#d29c78"${c("ovaries")}/>
      <path d="M72 102 L70 136 L90 136 L88 102Z" fill="${f("vagina", "#f6d0cf")}" stroke="#d99a9a"${c("vagina")}/>
      <path d="M80 104 V134" stroke="${on("vagina") ? "#fff" : "#d99a9a"}" stroke-width="1"/>
      <path d="M80 34 C98 34 104 44 102 58 C100 72 92 82 88 90 L72 90 C68 82 60 72 58 58 C56 44 62 34 80 34Z" fill="${f("uterus", "#f2c3c3")}" stroke="#d99a9a"${c("uterus")}/>
      <path d="M80 44 C90 44 92 50 90 60 C88 70 84 78 82 86 L78 86 C76 78 72 70 70 60 C68 50 70 44 80 44Z" fill="${on("uterus") ? "#ffd0de" : "#e78f9b"}"/>
      <path d="M75 52 L85 52 L80 80Z" fill="#fbe9ea"/>
      <path d="M72 89 L88 89 L88 103 L72 103Z" fill="${f("cervix", "#e9b0b0")}" stroke="#d99a9a"${c("cervix")}/>
      <path d="M80 86 V103" stroke="${on("cervix") ? "#fff" : "#c47f86"}" stroke-width="1.2"/>`;
  }

  /* ---------- seminiferous tubule cross-section ---------- */
  function tubule(it) {
    const on = id => dg.is(it, id), cx = 80, cy = 70;
    const P = (r, a) => [(cx + Math.cos(a) * r).toFixed(1), (cy + Math.sin(a) * r).toFixed(1)];
    let o = `<circle cx="${cx}" cy="${cy}" r="47" fill="#f6eadf" stroke="${on("tubules") ? HL : "#c9a37a"}" stroke-width="${on("tubules") ? 4 : 2}"${on("tubules") ? H : ""}/>`;
    for (let i = 0; i < 7; i++) {
      const a = i / 7 * Math.PI * 2, [x1, y1] = P(46, a - .12), [x2, y2] = P(46, a + .12), [x3, y3] = P(16, a);
      o += `<path d="M${x1} ${y1} L${x3} ${y3} L${x2} ${y2}Z" fill="${on("sertoli") ? HL : "#eedcc8"}" opacity="${on("sertoli") ? .9 : 1}"${on("sertoli") ? H : ""}/>`;
    }
    const ring = (r, n, rad, col, off) => Array.from({ length: n }, (_, i) => { const [x, y] = P(r, i / n * Math.PI * 2 + (off || 0)); return `<circle cx="${x}" cy="${y}" r="${rad}" fill="${col}"/>`; }).join("");
    const g = on("sperm");
    o += `<g${g ? H : ""}>${ring(41, 14, 3.4, g ? HL : "#b86f8a", .22)}${ring(32, 14, 3, g ? "#ff7aa6" : "#c98aa0", .45)}${ring(23, 14, 2.2, g ? "#ffb3cb" : "#d9a8b8", .22)}</g>`;
    o += `<circle cx="${cx}" cy="${cy}" r="14" fill="#fffaf4"/>` + Array.from({ length: 6 }, (_, i) => { const a = i / 6 * Math.PI * 2, [x, y] = P(15, a), [x2, y2] = P(5, a + .5); return `<path d="M${x} ${y} Q${cx} ${cy} ${x2} ${y2}" stroke="#a07a5a" stroke-width=".8" fill="none"/>`; }).join("");
    [[18, 20], [142, 20], [16, 124], [144, 124], [80, 132]].forEach(([x, y]) => {
      o += `<g${on("leydig") ? H : ""}>${[[-4, 0], [4, 0], [0, -5], [0, 5]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="3.4" fill="${on("leydig") ? HL : "#e0b46a"}" stroke="#fff" stroke-width=".6"/>`).join("")}</g>`;
    });
    return o;
  }

  /* ---------- meiosis trees ---------- */
  const cellC = (x, y, r, fill, dot) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="#a97a8f" stroke-width="1"/>${dot ? `<circle cx="${x}" cy="${y}" r="${r * .4}" fill="#8a4f6a"/>` : ""}`;
  function spermTree() {
    const tail = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="3.4" fill="${HL}"/><path d="M${x} ${y + 3.4} q2.5 4 0 8 q-2.5 4 0 8" stroke="${HL}" stroke-width="1.1" fill="none"/>`;
    const L = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#b9a5b0" stroke-width="1"/>`;
    const X4 = [112, 124, 136, 148];
    return `${L(130, 23, 130, 33)}${L(130, 43, 118, 59)}${L(130, 43, 142, 59)}${L(118, 69, 112, 85)}${L(118, 69, 124, 85)}${L(142, 69, 136, 85)}${L(142, 69, 148, 85)}
      ${X4.map(x => L(x, 94, x, 102)).join("")}
      ${cellC(130, 18, 5, "#f3d9e3", 1)}${cellC(130, 38, 6, "#f3d9e3", 1)}${cellC(118, 64, 4.6, "#f8e4ec", 1)}${cellC(142, 64, 4.6, "#f8e4ec", 1)}
      ${X4.map(x => cellC(x, 90, 3.4, "#fbeef3", 1)).join("")}
      <g${H}>${X4.map(x => tail(x, 106)).join("")}</g>
      ${T(10, 21, 7, 700, INK, "spermatogonium (2n)", "start")}${T(10, 41, 7, 700, INK, "primary spermatocyte (2n)", "start")}
      ${T(10, 53, 7, 700, "#8a4f6a", "meiosis I", "start")}${T(10, 67, 7, 700, INK, "secondary spermatocytes (n)", "start")}
      ${T(10, 79, 7, 700, "#8a4f6a", "meiosis II", "start")}${T(10, 93, 7, 700, INK, "spermatids (n)", "start")}
      ${T(10, 113, 7, 700, INK, "sperm (spermiogenesis)", "start")}${T(80, 138, 7.5, 800, "#1B2430", "4 sperm from 1 spermatocyte")}`;
  }
  function oogenTree() {
    const L = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#b9a5b0" stroke-width="1"/>`;
    return `${L(24, 34, 24, 54)}${L(24, 74, 24, 92)}${L(34, 66, 62, 70)}${L(34, 102, 62, 106)}
      ${cellC(24, 24, 10, "#fbe3c8", 1)}${cellC(24, 64, 10, "#fbe3c8", 1)}${cellC(66, 70, 3.5, "#fbe3c8", 0)}
      <g${H}>${cellC(24, 102, 10, HL, 1)}</g>${cellC(66, 106, 3.5, "#fbe3c8", 0)}
      ${T(40, 22, 7, 700, INK, "primary oocyte (2n)", "start")}${T(40, 31, 7, 600, INK, "made before birth", "start")}
      ${T(32, 46, 7, 700, "#8a4f6a", "meiosis I (before ovulation)", "start")}
      ${T(40, 61, 7, 700, INK, "secondary oocyte (n)", "start")}${T(74, 73, 7, 600, INK, "polar body", "start")}
      ${T(32, 84, 7, 700, "#8a4f6a", "meiosis II, only if fertilised", "start")}
      ${T(40, 120, 7, 700, INK, "ovum (n)", "start")}${T(74, 109, 7, 600, INK, "polar body", "start")}
      ${T(80, 138, 7.5, 800, "#1B2430", "1 egg from 1 oocyte")}`;
  }

  /* ---------- ovary close-up: follicles, ovulation, corpus luteum ---------- */
  function ovary(it) {
    const on = id => dg.is(it, id);
    const fol = (x, y, r, stage) => {
      const hl = on("follicles");
      const wall = hl ? HL : "#e0a98f";
      let s = `<circle cx="${x}" cy="${y}" r="${r}" fill="${hl ? "#ffd6e3" : "#fbe6d8"}" stroke="${wall}" stroke-width="${stage > 1 ? 2 : 1}"/>`;
      if (stage >= 3) s += `<path d="M${x - r * .7} ${y + r * .1} A${r * .72} ${r * .72} 0 0 0 ${x + r * .7} ${y + r * .1} Z" fill="#fff8ef"/>`;
      s += `<circle cx="${x}" cy="${y - (stage >= 3 ? r * .35 : 0)}" r="${Math.max(1.6, r * (stage >= 3 ? .26 : .45))}" fill="#c47a5a"/>`;
      return s;
    };
    const fs = `<g${on("follicles") ? H : ""}>${fol(40, 56, 3, 0)}${fol(46, 47, 3, 0)}${fol(36, 66, 3, 0)}${fol(60, 40, 6, 1)}${fol(90, 38, 9, 2)}${fol(120, 54, 13, 3)}</g>`;
    const mature = `<g${on("ovulation") ? H : ""}><circle cx="126" cy="94" r="16" fill="${on("ovulation") ? "#ffd6e3" : "#fbe6d8"}" stroke="${on("ovulation") ? HL : "#e0a98f"}" stroke-width="2"/>
      <path d="M113 95 A13 13 0 0 0 139 95 Z" fill="#fff8ef"/><path d="M140 104 L148 112" stroke="${on("ovulation") ? HL : "#e0a98f"}" stroke-width="2"/>
      <circle cx="148" cy="118" r="4" fill="${on("ovulation") ? HL : "#c47a5a"}" stroke="#fff"/></g>`;
    const cl = `<circle cx="80" cy="102" r="13" fill="${on("cl") ? HL : "#f2c64a"}" stroke="#d9a520"${on("cl") ? H : ""}/>
      ${[0, 1, 2, 3, 4].map(i => `<path d="M${74 + i * 3} 95 v14" stroke="${on("cl") ? "#fff" : "#e0ac2a"}" stroke-width=".7"/>`).join("")}`;
    const ca = `<circle cx="42" cy="94" r="7" fill="#f4f1ea" stroke="#c9c1b0"/>`;
    return `<ellipse cx="80" cy="74" rx="64" ry="48" fill="#f6dcd4" stroke="#d9a18f" stroke-width="2"/>${fs}${mature}${cl}${ca}
      ${T(44, 110, 7, 700, INK, "corpus albicans")}`;
  }

  /* ---------- breast ---------- */
  function breast(it) {
    const on = dg.is(it, "breast");
    const lob = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="${on ? HL : "#f2b8a8"}" stroke="#fff" stroke-width=".6"/>`;
    const L = [[66, 34], [56, 52], [52, 74], [56, 96], [66, 114], [84, 40], [80, 74], [84, 108]];
    return `<path d="M40 20 V128" stroke="#c9a59a" stroke-width="3"/>
      <path d="M40 22 C80 22 118 44 122 74 C118 104 80 126 40 126Z" fill="#fde2d2" stroke="#e0b49c" stroke-width="1.5"/>
      <g${on ? H : ""}>${L.map(([x, y]) => `<path d="M${x} ${y} Q${(x + 120) / 2} ${(y + 74) / 2} 118 74" stroke="${on ? HL : "#d9917e"}" stroke-width="1.4" fill="none"/>${lob(x, y)}${lob(x - 5, y + 4)}`).join("")}</g>
      <ellipse cx="121" cy="74" rx="4" ry="8" fill="#c97e6a"/>
      ${T(132, 40, 7, 700, INK, "lobules", "start")}${T(126, 108, 7, 700, INK, "ducts to", "start")}${T(126, 117, 7, 700, INK, "nipple", "start")}`;
  }

  /* ---------- 28-day cycle chart ---------- */
  const DAYS = [0, 2, 4, 6, 8, 10, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28];
  const CURVES = {
    fsh:  ["FSH", "#3e7cc4", [.35, .45, .42, .35, .3, .28, .35, .5, .45, .25, .2, .18, .15, .15, .17, .25, .35]],
    lh:   ["LH", "#7a4fbf", [.15, .15, .15, .16, .18, .2, .35, .95, .7, .25, .15, .12, .12, .12, .12, .13, .15]],
    oest: ["Oestrogen", "#e08a1e", [.12, .13, .15, .2, .3, .5, .8, .75, .45, .3, .32, .4, .48, .5, .4, .22, .12]],
    prog: ["Progesterone", "#2e9a6a", [.05, .05, .05, .05, .05, .05, .06, .07, .1, .2, .35, .6, .8, .82, .65, .3, .06]]
  };
  function chart(it, x0, y0, w, h, bands) {
    const sp = dg.spots(it)[0], X = d => (x0 + d / 28 * w).toFixed(1), Y = v => (y0 + h - v * h).toFixed(1);
    let o = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#fff" opacity=".6" rx="3"/>
      <path d="M${X(14)} ${y0} V${y0 + h}" stroke="${sp === "ovulation" || sp === "cycle" ? HL : "#c9d2da"}" stroke-dasharray="2 2" stroke-width="1"/>`;
    Object.keys(CURVES).forEach(k => {
      const [, col, v] = CURVES[k], hl = sp === k, dim = sp && CURVES[sp] && !hl;
      o += `<polyline points="${DAYS.map((d, i) => X(d) + "," + Y(v[i])).join(" ")}" fill="none" stroke="${hl ? HL : col}" stroke-width="${hl ? 3 : 1.6}" stroke-linejoin="round" stroke-linecap="round" opacity="${dim ? .35 : 1}"${hl ? H : ""}/>`;
    });
    if (!bands) return o;
    const keys = Object.keys(CURVES), lx = [16, 36, 54, 100];
    keys.forEach((k, i) => o += T(lx[i], 16, 7, 800, sp === k ? HL : CURVES[k][1], CURVES[k][0], "start"));
    [[1, "start"], [14, "middle"], [28, "end"]].forEach(([d, a]) => o += T(d === 1 ? x0 : d === 28 ? x0 + w : X(d), y0 + h + 8, 7, 600, INK, "day " + d, a));
    const band = (y, parts) => parts.map(([a, b, t, col]) => `<rect x="${X(a)}" y="${y}" width="${(X(b) - X(a) - .6).toFixed(1)}" height="11" rx="2" fill="${col}"/>` + T(((+X(a) + +X(b)) / 2).toFixed(1), y + 8, 7, 700, "#1B2430", t)).join("");
    o += band(y0 + h + 12, [[0, 14, "Follicular phase", "#dbe8f7"], [14, 28, "Luteal phase", "#d8f0e3"]]);
    o += band(y0 + h + 25, [[0, 5, "Mens.", "#f6c9cf"], [5, 14, "Proliferative", "#fde3c6"], [14, 28, "Secretory", "#e3f2d8"]]);
    return o;
  }

  /* ---------- hormone axis (male) ---------- */
  function axis(it) {
    const on = id => dg.is(it, id);
    const box = (x, y, w, t, t2) => `<rect x="${x}" y="${y}" width="${w}" height="${t2 ? 22 : 15}" rx="5" fill="#fff" stroke="#9fb3c4"/>${T(x + w / 2, y + 10, 7.5, 800, "#1B2430", t)}${t2 ? T(x + w / 2, y + 19, 7, 600, INK, t2) : ""}`;
    const arr = (d, id, lab, lx, ly, dash) => `<path d="${d}" stroke="${on(id) ? HL : "#7a8b9c"}" stroke-width="${on(id) ? 2.6 : 1.4}" fill="none"${dash ? ' stroke-dasharray="3 2"' : ""}${on(id) ? H : ""}/>${T(lx, ly, 7.5, 800, on(id) ? HL : INK, lab, "start")}`;
    return `${box(40, 14, 80, "Hypothalamus")}${box(40, 46, 80, "Anterior pituitary")}
      ${box(10, 92, 66, "Interstitial cells", "(Leydig)")}${box(84, 92, 66, "Sertoli cells", "(nurse cells)")}
      ${arr("M80 29 V45", "gnrh", "GnRH", 84, 40)}
      ${arr("M64 61 L44 91", "lh", "LH", 38, 78)}${arr("M96 61 L116 91", "fsh", "FSH", 110, 78)}
      ${arr("M76 103 H83", "testo", "", 0, 0)}
      ${arr("M43 114 V128", "testo", "testosterone", 47, 126)}
      ${arr("M138 92 C148 70 140 58 127 54", "inhibin", "inhibin", 126, 44, true)}
      <circle cx="124" cy="54" r="4.5" fill="#fff" stroke="${on("inhibin") ? HL : "#7a8b9c"}"/>${T(124, 56.5, 7, 900, on("inhibin") ? HL : INK, "−")}
      ${T(80, 138, 7, 600, INK, "→ sperm production in the tubules")}`;
  }

  /* ---------- hCG: the embryo keeps the corpus luteum going ---------- */
  function hcg(it) {
    const on = dg.is(it, "hcg");
    return `<path d="M10 20 C24 50 24 96 10 128 L44 128 C56 96 56 50 44 20Z" fill="#f2c3c3" stroke="#d99a9a"/>
      <path d="M44 20 C56 50 56 96 44 128" stroke="#e78f9b" stroke-width="6" fill="none"/>
      <circle cx="54" cy="72" r="10" fill="#fff6ea" stroke="#e3a07a" stroke-width="3"/><circle cx="50" cy="68" r="3.5" fill="#c86b8a"/>
      <path d="M66 70 C86 58 98 52 112 50" stroke="${on ? HL : "#7a8b9c"}" stroke-width="${on ? 3 : 1.6}" fill="none"${on ? H : ""}/>
      <path d="M108 46 L114 50 L108 55" stroke="${on ? HL : "#7a8b9c"}" stroke-width="${on ? 3 : 1.6}" fill="none"/>
      ${T(84, 50, 9, 900, on ? HL : INK, "hCG")}
      <circle cx="128" cy="48" r="12" fill="#f2c64a" stroke="#d9a520"/>${T(128, 70, 7, 700, INK, "corpus luteum")}
      ${T(128, 79, 7, 600, INK, "keeps making")}${T(128, 88, 7, 600, INK, "progesterone")}
      <rect x="76" y="104" width="70" height="16" rx="8" fill="#fff" stroke="#9fb3c4"/>
      <rect x="100" y="108" width="24" height="8" rx="2" fill="#eef2f5"/><path d="M106 108 v8 M116 108 v8" stroke="${on ? HL : "#c0507a"}" stroke-width="2"/>
      ${T(111, 132, 7, 700, INK, "test detects hCG in urine")}${T(28, 140, 7, 700, INK, "endometrium")}`;
  }

  const NAMES = { testes: "Testis (in the scrotum)", tubules: "Seminiferous tubule", leydig: "Interstitial (Leydig) cells", sertoli: "Sertoli cells",
    epididymis: "Epididymis", ductus: "Ductus deferens", vesicles: "Seminal vesicle", prostate: "Prostate", bulbo: "Bulbourethral gland",
    penis: "Penis and urethra", ovaries: "Ovaries", tubes: "Uterine tubes", uterus: "Uterus", cervix: "Cervix", vagina: "Vagina",
    fert: "Ampulla of the tube", follicles: "Ovarian follicles", cl: "Corpus luteum", ovulation: "Ovulation", sperm: "Spermatogenesis",
    oogen: "Oogenesis", breast: "Mammary gland", fsh: "FSH", lh: "LH surge", oest: "Oestrogen", prog: "Progesterone", cycle: "The 28-day cycle",
    gnrh: "GnRH", testo: "Testosterone", inhibin: "Inhibin", hcg: "hCG" };
  const VIEW = { testes: male, epididymis: male, ductus: male, vesicles: male, prostate: male, bulbo: male, penis: male,
    tubules: tubule, leydig: tubule, sertoli: tubule, sperm: it => spermTree(it),
    ovaries: female, tubes: female, uterus: female, cervix: female, vagina: female, fert: female,
    follicles: ovary, cl: ovary, ovulation: ovary, oogen: it => oogenTree(it), breast: breast,
    fsh: it => chart(it, 12, 22, 136, 78, true), lh: it => chart(it, 12, 22, 136, 78, true), oest: it => chart(it, 12, 22, 136, 78, true),
    prog: it => chart(it, 12, 22, 136, 78, true), cycle: it => chart(it, 12, 22, 136, 78, true),
    gnrh: axis, testo: axis, inhibin: axis, hcg: hcg };
  const BG = { male: ["#F3F6FB", "#DDE5F0"], female: ["#FBF3F4", "#F1DDE0"] };

  BGX.DIAGRAMS.repro = item => {
    const sp = dg.spots(item)[0], v = VIEW[sp];
    if (!item || !v) {
      const o = `<g transform="translate(0 2) scale(.5)">${male(null)}</g><g transform="translate(80 2) scale(.5)">${female(null)}</g>
        <path d="M80 10 V74" stroke="#d6dde4" stroke-dasharray="2 3"/>${chart(null, 14, 84, 132, 46, false)}
        ${T(40, 80, 7, 700, INK, "male, side view")}${T(120, 80, 7, 700, INK, "female, front view")}${T(80, 142, 7, 700, INK, "hormones over a 28-day cycle")}`;
      return dg.frame(o, "The male and female reproductive tracts and the 28-day hormone cycle", ["#F6F4FA", "#E6E2EF"]);
    }
    const bg = v === male || v === tubule || v === axis || sp === "sperm" ? BG.male : BG.female;
    const tagged = [male, female, ovary, tubule, breast, axis].indexOf(v) >= 0;
    const body = v(item) + (tagged ? dg.tag(80, 150, NAMES[sp]) : "");
    return dg.frame(body, NAMES[sp] || item.name, bg);
  };
})();
