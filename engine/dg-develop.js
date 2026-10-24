/* BioglowRX diagram "develop" — human development and ageing (simplified textbook schematics).
   Stage pictures — spots: zygote, cleavage, morula, blastocyst, implant, embryo, fetus (a strip of 5 stages on top, big picture below)
   Germ-layer disc — spots: gastrulation, ecto, meso, endo
   Membranes and placenta — spots: amnion, chorion, yolk, allantois, placenta, cord
   Fetal circulation — spots: fo (foramen ovale), da (ductus arteriosus), dv (ductus venosus), route (whole fetal route)
   Labour — spots: labour, stage1, stage2, stage3.  Apgar — spot: apgar.  Lactation — spot: lactation.
   Teratogen sensitivity chart — spot: teratogen.
   Life-stage timeline — spots: infancy, childhood, adolescence, adulthood, senescence.
   Overview (null): the stage strip, the germ disc and the life timeline. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const H = ' class="dg-hl"', INK = "#55616e";

  /* ---------- stage drawings, centred on (0,0), about 40 px across at scale 1 ---------- */
  const zona = (r, hl) => `<circle r="${r}" fill="none" stroke="${hl ? HL : "#d9b8c8"}" stroke-width="${hl ? 3 : 2.4}"/>`;
  const blob = (x, y, r, hl) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hl ? "#ffd0de" : "#fbe3ec"}" stroke="${hl ? HL : "#c98aa0"}" stroke-width="1"/>`;
  const STAGE = {
    zygote: hl => zona(20, hl) + blob(0, 0, 16, hl) + `<circle cx="-4" cy="-1" r="3.4" fill="#a0587a"/><circle cx="5" cy="2" r="3.4" fill="#5a7aa8"/>`,
    cleavage: hl => zona(20, hl) + [[-7, -7], [7, -7], [-7, 7], [7, 7]].map(([x, y]) => blob(x, y, 8, hl)).join(""),
    morula: hl => zona(20, hl) + [[-10, -6], [0, -11], [10, -6], [-10, 6], [0, 0], [10, 6], [-4, 11], [6, 12], [-5, -1], [5, -1]].map(([x, y]) => blob(x, y, 5.6, hl)).join(""),
    blastocyst: hl => `<circle r="20" fill="#fff8f2" stroke="${hl ? HL : "#c98aa0"}" stroke-width="3"/>` + Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return `<circle cx="${(Math.cos(a) * 18).toFixed(1)}" cy="${(Math.sin(a) * 18).toFixed(1)}" r="2.6" fill="${hl ? HL : "#e3a9bd"}"/>`; }).join("") +
      [[-8, -10], [-2, -12], [4, -11], [-5, -6], [1, -7]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#a0587a"/>`).join(""),
    embryo: hl => `<path d="M6 -16 C18 -14 20 2 12 12 C6 18 -4 18 -10 12 C-14 8 -10 2 -4 4 C2 6 2 -2 -2 -6 C-6 -10 -4 -17 6 -16Z" fill="${hl ? HL : "#f4b8c4"}" stroke="#c7798d"/>
      <circle cx="6" cy="-8" r="2" fill="#7a3d55"/>${[[-2, 12], [-6, 9], [-10, 6]].map(([x, y]) => `<path d="M${x} ${y} l-3 1" stroke="#c7798d" stroke-width="1.4"/>`).join("")}
      <path d="M12 2 l5 2 M8 12 l4 4" stroke="#c7798d" stroke-width="2" stroke-linecap="round"/>`,
    fetus: hl => `<ellipse cx="2" cy="4" rx="13" ry="16" fill="${hl ? HL : "#f6c3a8"}" stroke="#d29676"/><circle cx="-3" cy="-14" r="10" fill="${hl ? HL : "#f6c3a8"}" stroke="#d29676"/>
      <path d="M-6 0 Q4 4 10 -2 M-4 12 Q8 16 12 8" stroke="#d29676" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M-8 -14 a2 2 0 0 0 4 0" stroke="#a06a4e" fill="none"/>`
  };
  STAGE.implant = STAGE.blastocyst;
  const STRIP = ["zygote", "cleavage", "morula", "blastocyst", "embryo", "fetus"];
  const SNAME = { zygote: "zygote", cleavage: "cleavage", morula: "morula", blastocyst: "blastocyst", embryo: "embryo", fetus: "fetus" };
  function strip(sel, y, labels) {
    return STRIP.map((k, i) => {
      const x = 17 + i * 25.2, on = sel === k || (sel === "implant" && k === "blastocyst");
      return `<g transform="translate(${x} ${y}) scale(.42)"${on ? H : ""}>${on ? `<circle r="27" fill="#fff" stroke="${HL}" stroke-width="3"/>` : ""}${STAGE[k](on)}</g>` +
        (labels && on ? T(Math.min(140, Math.max(20, x)), y + 18, 7, 900, HL, SNAME[k]) : "") + (i < STRIP.length - 1 ? `<path d="M${x + 10} ${y} h4" stroke="#b9a5b0" stroke-width="1"/>` : "");
    }).join("");
  }
  const DAYTXT = { zygote: "day 0: the fertilised egg (2n)", cleavage: "days 1–3: 2 → 4 → 8 cells", morula: "day 3–4: solid ball of 16+ cells",
    blastocyst: "days 4–5: hollow ball, inner cell mass", embryo: "day 16 to week 8: organs form", fetus: "week 9 to birth: growth" };
  function stageView(sp) {
    if (sp === "implant") return strip("blastocyst", 22, false) + `
      <rect x="10" y="98" width="140" height="40" fill="#f2c3c3"/><path d="M10 98 H150" stroke="#d99a9a" stroke-width="2"/>
      ${[24, 44, 116, 136].map(x => `<path d="M${x} 100 q4 16 0 34" stroke="#e78f9b" stroke-width="3" fill="none"/>`).join("")}
      <g transform="translate(80 92) scale(1.25)">${STAGE.blastocyst(true)}</g>
      <path d="M62 100 Q80 120 98 100" fill="${HL}" opacity=".55"${H}/>${T(80, 132, 7.5, 800, "#8a3a4e", "endometrium")}
      ${T(80, 52, 7.5, 700, INK, "day 6–7: blastocyst burrows into")}${T(80, 61, 7.5, 700, INK, "the endometrium; trophoblast → hCG")}`;
    return strip(sp, 22, true) + `<g transform="translate(80 92) scale(1.7)">${STAGE[sp](true)}</g>${T(80, 136, 7.5, 700, INK, DAYTXT[sp])}`;
  }

  /* ---------- germ-layer disc ---------- */
  function disc(sp, y0) {
    const L = [["ecto", "Ectoderm", "skin, nervous system", "#7fb0e6"], ["meso", "Mesoderm", "muscle, bone, blood, kidneys", "#e88a8a"], ["endo", "Endoderm", "gut and airway lining, liver", "#f2c64a"]];
    let o = "";
    L.forEach(([k, n, d, c], i) => {
      const on = sp === k, y = y0 + i * 26;
      o += `<rect x="12" y="${y}" width="136" height="22" rx="11" fill="${on ? HL : c}"${on ? H : ""}/>` + T(20, y + 9.5, 7.5, 900, on ? "#fff" : "#1B2430", n, "start") + T(20, y + 18.5, 6.8, 600, on ? "#fff" : "#1B2430", d, "start");
    });
    if (sp === "gastrulation") o += `<g${H}><path d="M128 ${y0 - 6} V${y0 + 74}" stroke="${HL}" stroke-width="3" stroke-dasharray="4 3"/><path d="M122 ${y0 + 2} L128 ${y0 + 10} L134 ${y0 + 2}" stroke="${HL}" stroke-width="2.4" fill="none"/></g>` + T(126, y0 - 9, 7, 800, HL, "primitive streak", "end");
    return o;
  }

  /* ---------- membranes and placenta ---------- */
  function membranes(sp) {
    const on = k => sp === k, c = (k, b) => on(k) ? HL : b, h = k => on(k) ? H : "";
    return `<path d="M80 8 C134 8 152 48 148 86 C144 124 116 150 80 150 C44 150 16 124 12 86 C8 48 26 8 80 8Z" fill="#f2c3c3" stroke="#d99a9a" stroke-width="2"/>
      <path d="M40 22 C58 12 102 12 120 22 L114 36 C96 28 64 28 46 36Z" fill="${c("placenta", "#b85a6a")}"${h("placenta")}/>
      <circle cx="80" cy="88" r="52" fill="#fdf1f0" stroke="${c("chorion", "#d99aa8")}" stroke-width="${on("chorion") ? 4 : 2}"${h("chorion")}/>
      <circle cx="80" cy="92" r="40" fill="#e3f1fb" stroke="${c("amnion", "#7fb0e6")}" stroke-width="${on("amnion") ? 4 : 2}"${h("amnion")}/>
      ${T(80, 124, 7, 700, "#3e7cc4", "amniotic fluid")}
      <path d="M80 34 C72 44 90 52 82 62 C76 70 84 76 82 80" stroke="${c("cord", "#c9a0b5")}" stroke-width="${on("cord") ? 6 : 5}" fill="none" stroke-linecap="round"${h("cord")}/>
      <path d="M80 34 C72 44 90 52 82 62 C76 70 84 76 82 80" stroke="${on("cord") ? "#fff" : "#8a5a7a"}" stroke-width="1" fill="none" stroke-dasharray="3 2"/>
      <g transform="translate(84 96) scale(1.15)">${STAGE.fetus(false)}</g>
      <circle cx="50" cy="66" r="${on("yolk") ? 7 : 5}" fill="${c("yolk", "#f2c64a")}"${h("yolk")}/><path d="M55 66 L76 72" stroke="${c("yolk", "#d9a520")}" stroke-width="1.2"/>
      <path d="M86 70 C96 64 104 64 110 70" stroke="${c("allantois", "#9fcf9f")}" stroke-width="${on("allantois") ? 4 : 2.4}" fill="none" stroke-linecap="round"${h("allantois")}/>
      ${T(80, 21, 7, 800, on("placenta") ? "#fff" : "#fff", "placenta")}`;
  }

  /* ---------- fetal circulation shortcuts ---------- */
  function circ(sp) {
    const on = k => sp === k || sp === "route", h = k => on(k) ? H : "";
    const box = (x, y, w, t, f) => `<rect x="${x}" y="${y}" width="${w}" height="20" rx="5" fill="${f || "#fff"}" stroke="#9fb3c4"/>${T(x + w / 2, y + 13, 7.5, 800, "#1B2430", t)}`;
    const sh = (d, k, lab, lx, ly, a) => `<path d="${d}" stroke="${on(k) ? HL : "#7a8b9c"}" stroke-width="${on(k) ? 3.4 : 1.8}" fill="none" stroke-linecap="round"${h(k)}/>${T(lx, ly, 7.5, 900, on(k) ? HL : INK, lab, a)}`;
    return `${box(8, 10, 64, "Pulmonary trunk")}${box(88, 10, 64, "Aorta")}
      ${box(16, 58, 46, "R atrium", "#e3ecf7")}${box(98, 58, 46, "L atrium", "#fbe3e3")}
      ${box(16, 108, 46, "Liver", "#f0d8c0")}${box(98, 108, 46, "Placenta", "#f2c3c3")}
      ${sh("M72 20 H88", "da", "ductus arteriosus", 80, 42)}
      ${sh("M62 68 H98", "fo", "foramen ovale", 80, 90)}
      ${sh("M98 116 C78 116 74 92 48 90 L39 79", "dv", "ductus venosus", 148, 102, "end")}
      ${T(121, 140, 7, 700, INK, "umbilical vein")}${T(39, 140, 7, 600, INK, "(mostly bypassed)")}
      ${T(80, 154, 7, 700, INK, "the fetal lungs and liver are bypassed")}`;
  }

  /* ---------- labour ---------- */
  function labour(sp) {
    const panel = (x, k, n, d1, d2, draw) => { const on = sp === k || sp === "labour";
      return `<rect x="${x}" y="16" width="46" height="96" rx="8" fill="${on ? "#fff" : "#f6f0f0"}" stroke="${on ? HL : "#d6c6c6"}" stroke-width="${on ? 2.4 : 1}"${on && sp !== "labour" ? H : ""}/>${draw(x + 23)}${T(x + 23, 124, 7.5, 900, on ? HL : INK, n)}${T(x + 23, 134, 6.8, 600, INK, d1)}${T(x + 23, 143, 6.8, 600, INK, d2)}`; };
    const ut = cx => `<path d="M${cx - 16} 30 C${cx - 18} 70 ${cx - 12} 88 ${cx - 5} 96 L${cx + 5} 96 C${cx + 12} 88 ${cx + 18} 70 ${cx + 16} 30 C${cx + 10} 22 ${cx - 10} 22 ${cx - 16} 30Z" fill="#f2c3c3" stroke="#d99a9a"/>`;
    const head = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="8" fill="#f6c3a8" stroke="#d29676"/>`;
    return panel(6, "stage1", "Stage 1", "dilation", "cervix → 10 cm", cx => ut(cx) + `<ellipse cx="${cx}" cy="58" rx="10" ry="16" fill="#f6c3a8" stroke="#d29676"/>` + head(cx, 84) + `<path d="M${cx - 9} 98 L${cx - 13} 104 M${cx + 9} 98 L${cx + 13} 104" stroke="${HL}" stroke-width="2"/>`) +
      panel(57, "stage2", "Stage 2", "expulsion", "baby is born", cx => ut(cx) + head(cx, 102) + `<path d="M${cx} 82 V94" stroke="${HL}" stroke-width="2.4"/><path d="M${cx - 4} 90 L${cx} 95 L${cx + 4} 90" stroke="${HL}" stroke-width="2" fill="none"/>`) +
      panel(108, "stage3", "Stage 3", "placental", "afterbirth out", cx => ut(cx) + `<ellipse cx="${cx}" cy="102" rx="12" ry="5" fill="#b85a6a"/><path d="M${cx} 102 q4 6 -2 8" stroke="#c9a0b5" stroke-width="2" fill="none"/>`);
  }

  /* ---------- Apgar ---------- */
  function apgar() {
    const R = [["A", "Appearance", "skin colour"], ["P", "Pulse", "heart rate"], ["G", "Grimace", "reflex response"], ["A", "Activity", "muscle tone"], ["R", "Respiration", "breathing effort"]];
    return R.map(([l, n, d], i) => { const y = 14 + i * 22;
      return `<rect x="12" y="${y}" width="136" height="18" rx="6" fill="#fff" stroke="#c9d2da"/><rect x="12" y="${y}" width="18" height="18" rx="6" fill="${HL}"${H}/>${T(21, y + 13, 9, 900, "#fff", l)}${T(36, y + 12.5, 7.5, 800, "#1B2430", n, "start")}${T(92, y + 12.5, 6.8, 600, INK, d, "start")}`; }).join("") +
      T(80, 134, 8, 800, "#1B2430", "each 0, 1 or 2 → total out of 10") + T(80, 146, 7, 600, INK, "scored at 1 and 5 minutes; 7–10 is normal");
  }

  /* ---------- lactation ---------- */
  function lactation() {
    const L = [[60, 40], [50, 60], [52, 84], [62, 104]];
    return `<path d="M30 22 V128" stroke="#c9a59a" stroke-width="3"/><path d="M30 24 C70 24 104 46 108 74 C104 102 70 124 30 124Z" fill="#fde2d2" stroke="#e0b49c" stroke-width="1.5"/>
      <g${H}>${L.map(([x, y]) => `<path d="M${x} ${y} Q${(x + 106) / 2} ${(y + 74) / 2} 104 74" stroke="${HL}" stroke-width="1.6" fill="none"/><circle cx="${x}" cy="${y}" r="6" fill="${HL}" stroke="#fff"/>`).join("")}</g>
      <ellipse cx="107" cy="74" rx="4" ry="8" fill="#c97e6a"/>
      ${[0, 1, 2].map(i => `<circle cx="${116 + i * 7}" cy="${70 + (i % 2) * 6}" r="2" fill="#fff" stroke="#c9d2da"/>`).join("")}
      ${T(118, 30, 7.5, 800, "#3e7cc4", "prolactin:", "start")}${T(118, 39, 7, 600, INK, "makes milk", "start")}
      ${T(118, 110, 7.5, 800, "#2e9a6a", "oxytocin:", "start")}${T(118, 119, 7, 600, INK, "let-down", "start")}
      `;
  }

  /* ---------- teratogen sensitivity ---------- */
  function terat() {
    const seg = [[12, 34, "wk 1–2", "all or", "nothing", "#dfe6ec", INK, 0], [46, 52, "wk 3–8", "major", "malformations", HL, HL, 1], [98, 50, "wk 9–38", "growth and", "brain effects", "#f7c9d8", INK, 0]];
    return T(80, 20, 8, 800, "#1B2430", "When is the unborn child most at risk?") + seg.map(([x, w, a, b, c, f, tc, hl]) =>
      `<rect x="${x}" y="54" width="${w - 2}" height="20" rx="4" fill="${f}"${hl ? H : ""}/>` + T(x + w / 2 - 1, 46, 7.5, hl ? 900 : 700, tc, a) + T(x + w / 2 - 1, 88, 7, hl ? 800 : 600, tc, b) + T(x + w / 2 - 1, 97, 7, hl ? 800 : 600, tc, c)).join("") +
      T(80, 112, 6.8, 600, INK, "(not to scale)") + T(80, 128, 7.5, 700, "#1B2430", "alcohol · smoking · some drugs · rubella");
  }

  /* ---------- life timeline ---------- */
  const LIFE = [["infancy", "Infancy", "0–2", "#bfe3f5"], ["childhood", "Childhood", "2–puberty", "#c9ecd2"], ["adolescence", "Adolescence", "puberty–adult", "#fde3b0"], ["adulthood", "Adulthood", "~20–65", "#f7d2c4"], ["senescence", "Senescence", "later life", "#e2d7f2"]];
  function timeline(sp, y0, big) {
    const W = [16, 20, 22, 44, 34], h = big ? 22 : 14;
    let x = 12, o = "";
    LIFE.forEach(([k, n, a, c], i) => {
      const w = W[i] * 136 / 136, on = sp === k;
      o += `<rect x="${x}" y="${y0}" width="${w - 1}" height="${h}" rx="3" fill="${on ? HL : c}"${on ? H : ""}/>`;
      if (big) o += T(x + w / 2, y0 + (i % 2 ? h + 20 : -12), 7.2, on ? 900 : 700, on ? HL : "#1B2430", n) + T(x + w / 2, y0 + (i % 2 ? h + 29 : -3), 6.8, 600, INK, a) + `<path d="M${x + w / 2} ${i % 2 ? y0 + h : y0} v${i % 2 ? 9 : -1}" stroke="#b9c3cc"/>`;
      x += w;
    });
    return o;
  }
  const AGE = { infancy: "fastest growth; brain doubles in size", childhood: "steady growth; motor and language skills", adolescence: "puberty: growth spurt, sexual maturity",
    adulthood: "peak function, then a slow decline", senescence: "gradual decline in every organ system" };

  const NAMES = { zygote: "Zygote", cleavage: "Cleavage", morula: "Morula", blastocyst: "Blastocyst", implant: "Implantation", embryo: "Embryo", fetus: "Fetus",
    gastrulation: "Gastrulation", ecto: "Ectoderm", meso: "Mesoderm", endo: "Endoderm", amnion: "Amnion", chorion: "Chorion", yolk: "Yolk sac", allantois: "Allantois",
    placenta: "Placenta", cord: "Umbilical cord", fo: "Foramen ovale", da: "Ductus arteriosus", dv: "Ductus venosus", route: "Fetal circulation",
    labour: "Labour", stage1: "Stage 1: dilation", stage2: "Stage 2: expulsion", stage3: "Stage 3: placental", apgar: "Apgar score", lactation: "Lactation",
    teratogen: "Teratogens", infancy: "Infancy", childhood: "Childhood", adolescence: "Adolescence", adulthood: "Adulthood", senescence: "Senescence" };
  const BG = { stage: ["#FBF4F6", "#F0E0E6"], disc: ["#F4F8FA", "#DDE8EE"], mem: ["#FBF3F4", "#F1DDE0"], circ: ["#F3F6FB", "#DDE5F0"], life: ["#F6F4FB", "#E4E0F0"] };

  BGX.DIAGRAMS.develop = item => {
    const sp = dg.spots(item)[0];
    let inner, bg, tag = true;
    if (STAGE[sp]) { inner = stageView(sp); bg = BG.stage; }
    else if (["gastrulation", "ecto", "meso", "endo"].indexOf(sp) >= 0) { inner = T(80, 22, 8, 800, "#1B2430", "The three germ layers (from day 16)") + disc(sp, 40); bg = BG.disc; }
    else if (["amnion", "chorion", "yolk", "allantois", "placenta", "cord"].indexOf(sp) >= 0) { inner = membranes(sp); bg = BG.mem; }
    else if (["fo", "da", "dv", "route"].indexOf(sp) >= 0) { inner = circ(sp); bg = BG.circ; tag = false; }
    else if (["labour", "stage1", "stage2", "stage3"].indexOf(sp) >= 0) { inner = labour(sp); bg = BG.mem; tag = false; }
    else if (sp === "apgar") { inner = apgar(); bg = BG.circ; tag = false; }
    else if (sp === "lactation") { inner = lactation(); bg = BG.mem; }
    else if (sp === "teratogen") { inner = terat(); bg = BG.disc; }
    else if (AGE[sp]) { inner = T(80, 22, 8, 800, "#1B2430", "The human lifespan") + timeline(sp, 62, true) + T(80, 126, 7.5, 700, INK, AGE[sp]); bg = BG.life; }
    else {
      const o = strip(null, 22, true) + disc(null, 50).replace(/<rect x="12" y="(\d+)" width="136" height="22"/g, (m, y) => `<rect x="12" y="${y}" width="136" height="22"`) + timeline(null, 132, false) + T(12, 156, 6.8, 600, INK, "birth", "start") + T(148, 156, 6.8, 600, INK, "old age", "end");
      return dg.frame(o, "Human development: early stages, the three germ layers and the life stages", BG.stage);
    }
    return dg.frame(inner + (tag ? dg.tag(80, 150, NAMES[sp]) : ""), NAMES[sp] || item.name, bg);
  };
})();
