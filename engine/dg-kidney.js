/* BioglowRX diagram "kidney" — urinary system, nephron, fluids and pH.
   Kidney section:  cortex pyramid pelvis epo
   Urinary tract (front view with adrenals and heart): tract ureter bladder urethra excretion aldo anp
   Nephron:         glom capsule pct loop dct cd jga filtration gfr reabsorption secretion adh raas
   Fluid compartments: icf ecf na k ca      pH scale: ph acid alk buffer
   Overview (null): kidney section beside a nephron. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  let it = null;
  const on = id => dg.is(it, id), col = (id, base) => on(id) ? HL : base, c = id => dg.cls(it, id);
  const NAMES = { cortex: "Renal cortex", pyramid: "Renal pyramid", pelvis: "Renal pelvis", epo: "EPO: made in the cortex", ureter: "Ureters",
    bladder: "Urinary bladder", urethra: "Urethra", excretion: "Urine leaves the body", aldo: "Aldosterone: adrenal cortex", anp: "ANP: heart atria",
    glom: "Glomerulus", capsule: "Glomerular capsule", pct: "Proximal convoluted tubule", loop: "Nephron loop", dct: "Distal convoluted tubule",
    cd: "Collecting duct", jga: "Juxtaglomerular apparatus", filtration: "Filtration: blood → capsule", gfr: "GFR ≈ 125 mL/min",
    reabsorption: "Reabsorption: tubule → blood", secretion: "Secretion: blood → tubule", adh: "ADH acts on the collecting duct",
    raas: "Renin from JG cells", icf: "Intracellular fluid", ecf: "Extracellular fluid", na: "Na⁺: main ECF cation", k: "K⁺: main ICF cation",
    ca: "Ca²⁺: 99% in bone", ph: "Normal pH 7.35–7.45", acid: "Acidosis: pH < 7.35", alk: "Alkalosis: pH > 7.45", buffer: "Bicarbonate buffer" };

  /* ---------- kidney cut in half (hilum on the right) ---------- */
  function kidney(p, sx, sy, k) {
    const sc = k || 1, tr = `translate(${sx || 0} ${sy || 0}) scale(${sc})`;
    const OUT = "M70 14 C38 14 22 44 22 76 C22 110 40 138 70 138 C92 138 102 124 100 110 C98 100 92 96 92 86 L92 66 C92 56 98 52 100 42 C102 26 90 14 70 14Z";
    let s = `<g transform="${tr}"><path d="${OUT}" fill="${col("cortex", on("epo") ? HL : "#D98C6F")}" stroke="#9E5640" stroke-width="1.2"${c("cortex")}${c("epo")}/>`;
    const PY = [[42, 34, 62, 50, 74, 58], [30, 66, 56, 70, 74, 72], [32, 104, 58, 98, 74, 88], [52, 124, 66, 110, 78, 96], [56, 22, 70, 40, 80, 52]];
    PY.forEach(([x1, y1, x2, y2, tx, ty], i) => {
      const f = on("pyramid") ? HL : "#B85C55";
      s += `<path d="M${x1} ${y1} Q${(x1 + x2) / 2 - 6} ${(y1 + y2) / 2 + 8} ${x2 + 4} ${y2 + 10} L${tx} ${ty} Z" fill="${f}" opacity="${on("pyramid") ? 1 : .9}"${on("pyramid") && i === 1 ? ' class="dg-hl"' : ""}/>`;
      s += `<path d="M${(x1 + tx) / 2} ${(y1 + ty) / 2} L${tx} ${ty}" stroke="#E7A79A" stroke-width=".6"/>`;
    });
    s += `<path d="M74 58 Q84 60 84 66 M74 72 H84 M74 88 Q84 86 84 82 M78 96 Q86 92 86 86 M80 52 Q86 56 86 62" stroke="#F3E2C6" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M82 60 Q94 64 96 76 Q94 90 82 92 Q78 76 82 60Z" fill="${col("pelvis", "#F3E2C6")}" stroke="#C9A97A" stroke-width=".8"${c("pelvis")}/>`;
    s += `<path d="M94 82 Q106 92 104 124 L104 150" stroke="${col("ureter", "#F3E2C6")}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M92 70 H120" stroke="#D64545" stroke-width="5" stroke-linecap="round"/><path d="M92 77 H120" stroke="#4F74C8" stroke-width="5" stroke-linecap="round"/>`;
    return s + `</g>`;
  }
  function kidneyLabels() {
    return T(150, 30, 7.5, 800, "#9E5640", "cortex", "end") + T(150, 40, 7, 600, "#9E5640", "(outer)", "end") +
      T(30, 150, 7.5, 800, "#8A3E38", "pyramids", "start") + T(150, 104, 7.5, 800, "#8A6A3A", "pelvis", "end") + T(150, 144, 7.5, 800, "#8A6A3A", "ureter", "end") +
      T(150, 64, 7, 700, "#B03A3A", "artery", "end") + T(150, 86, 7, 700, "#3A5AA8", "vein", "end");
  }

  /* ---------- whole urinary tract ---------- */
  function tract() {
    let s = `<path d="M80 6 C92 6 98 14 96 26 C108 30 124 36 126 60 L126 150 L34 150 L34 60 C36 36 52 30 64 26 C62 14 68 6 80 6Z" fill="#FBE6D8" stroke="#E2BFA8"/>`;
    s += `<path d="M74 34 Q66 30 64 38 Q66 48 76 46 Q84 46 86 40 Q82 32 74 34Z" fill="${col("anp", "#E07070")}" transform="translate(4 4)"${c("anp")}/>`;
    s += `<path d="M78 50 V150 M82 50 V150" stroke="#E7B4B4" stroke-width="2"/>`;
    [[54, 72, -1], [106, 72, 1]].forEach(([x, y, d]) => {
      s += `<ellipse cx="${x}" cy="${y}" rx="11" ry="17" fill="#D98C6F" stroke="#9E5640"/>`;
      s += `<path d="M${x - 8 * d} ${y - 20} Q${x} ${y - 30} ${x + 8 * d} ${y - 20} Q${x} ${y - 14} ${x - 8 * d} ${y - 20}Z" fill="${col("aldo", "#F2C14E")}"${on("aldo") && d < 0 ? ' class="dg-hl"' : ""}/>`;
      s += `<path d="M${x - 4 * d} ${y + 8} Q${x - 2 * d} ${y + 40} ${80 - 10 * d} 120" stroke="${col("ureter", "#E1B45C")}" stroke-width="${on("ureter") ? 3.4 : 2.4}" fill="none"${on("ureter") && d < 0 ? ' class="dg-hl"' : ""}/>`;
    });
    s += `<path d="M64 118 Q80 108 96 118 Q100 134 80 138 Q60 134 64 118Z" fill="${col("bladder", "#F2D27A")}" stroke="#C9A040"${c("bladder")}/>`;
    s += `<path d="M80 138 V150" stroke="${col("urethra", on("excretion") ? HL : "#E1B45C")}" stroke-width="${on("urethra") || on("excretion") ? 4 : 2.6}"${c("urethra")}${c("excretion")}/>`;
    if (on("excretion")) s += `<circle cx="80" cy="154" r="2.4" fill="${HL}"/>`;
    if (!on("aldo") && !on("anp")) s += T(6, 72, 7, 700, "#9E5640", "kidney", "start") + T(130, 112, 7, 700, "#8A6A3A", "ureter", "end");
    else s += T(6, 50, 7, 700, "#8A6A20", "adrenal", "start") + T(98, 30, 7, 700, "#B04040", "heart", "start");
    return s;
  }

  /* ---------- nephron ---------- */
  function nephron(mini) {
    let s = `<rect x="6" y="6" width="148" height="62" rx="10" fill="#F6E2D6"/><rect x="6" y="68" width="148" height="84" rx="10" fill="#EBCFC6"/>`;
    if (!mini) s += T(150, 16, 7, 800, "#9E5640", "CORTEX", "end") + T(12, 80, 7, 800, "#8A3E38", "MEDULLA", "start");
    // arterioles
    s += `<path d="M6 30 H24" stroke="#D64545" stroke-width="4"/><path d="M24 44 H8" stroke="#B04060" stroke-width="3"/>`;
    if (!mini) s += T(8, 22, 7, 700, "#B03A3A", "afferent", "start") + T(8, 58, 7, 700, "#8A3050", "efferent", "start");
    // capsule + glomerulus
    s += `<path d="M44 22 A16 16 0 1 0 44 52" fill="none" stroke="${col("capsule", "#7A9CC0")}" stroke-width="${on("capsule") ? 4 : 2.6}"${c("capsule")}/>`;
    s += `<circle cx="38" cy="37" r="9" fill="${col("glom", on("filtration") || on("gfr") ? HL : "#D64545")}"${c("glom")}${c("filtration")}${c("gfr")}/>`;
    s += `<path d="M32 32 q4 -4 8 0 q4 4 0 8 q-4 4 -8 0" stroke="#fff" stroke-opacity=".6" fill="none"/>`;
    if (on("filtration") || on("gfr")) s += `<g stroke="${HL}" stroke-width="1.4"><path d="M48 30 l5 -3 M48 37 h6 M48 44 l5 3"/></g>`;
    // tubule pieces
    const w = id => on(id) ? 4.2 : 3;
    s += `<path d="M44 52 Q58 56 56 44 Q54 30 66 32 Q78 34 72 46 Q68 56 80 58" fill="none" stroke="${col("pct", "#E8A23A")}" stroke-width="${w("pct")}" stroke-linecap="round"${c("pct")}/>`;
    s += `<path d="M80 58 V132 Q86 142 92 132 V64" fill="none" stroke="${col("loop", "#D9C25A")}" stroke-width="${w("loop")}" stroke-linecap="round"${c("loop")}/>`;
    s += `<path d="M92 64 Q92 50 76 44 Q62 40 30 46 M30 46 Q60 18 96 26 Q114 30 114 44 Q114 54 124 52" fill="none" stroke="${col("dct", "#6FB07A")}" stroke-width="${w("dct")}" stroke-linecap="round"${c("dct")}/>`;
    const cdc = col("cd", on("adh") ? HL : "#5A8FC8");
    s += `<path d="M124 52 Q132 52 132 60 V148" fill="none" stroke="${cdc}" stroke-width="${on("cd") || on("adh") ? 5 : 3.6}" stroke-linecap="round"${c("cd")}${c("adh")}/>`;
    s += `<path d="M146 30 Q138 36 136 48 Q134 54 132 60" stroke="#5A8FC8" stroke-width="2" fill="none" opacity=".6"/>`;
    // juxtaglomerular apparatus where DCT touches arterioles
    if (on("jga") || on("raas")) s += `<circle cx="27" cy="44" r="7" fill="${HL}" fill-opacity=".35" stroke="${HL}" stroke-width="1.4" class="dg-hl"/>`;
    // peritubular capillary (for reabsorption / secretion)
    if (on("reabsorption") || on("secretion")) {
      s += `<path d="M58 62 Q64 70 76 66" stroke="#D64545" stroke-width="2.4" fill="none"/>`;
      const up = on("reabsorption");
      s += `<g stroke="${HL}" stroke-width="2" class="dg-hl" fill="${HL}"><path d="M${up ? 64 : 70} ${up ? 50 : 66} L${up ? 66 : 68} ${up ? 62 : 54}"/><path d="${up ? "M63 59 L66 64 L69 59Z" : "M65 56 L68 51 L71 56Z"}"/></g>`;
      s += T(68, 82, 6.5, 700, "#B03A3A", "capillary");
    }
    if (!it && !mini) s += T(60, 120, 7, 700, "#8A5A50", "loop", "end") + T(136, 120, 7, 700, "#3A6FA8", "duct", "start");
    if (on("adh")) s += T(126, 100, 7, 700, HL, "water out", "end");
    return s;
  }

  /* ---------- fluid compartments ---------- */
  function fluids() {
    const icfH = on("icf") || on("k"), ecfH = on("ecf") || on("na");
    let s = T(80, 18, 7.5, 800, "#3F5F6A", "Total body water ≈ 40 L");
    s += `<rect x="14" y="26" width="86" height="92" rx="6" fill="${icfH ? HL : "#8FC7B8"}"${icfH ? ' class="dg-hl"' : ""}/>`;
    s += `<rect x="104" y="26" width="42" height="74" rx="6" fill="${ecfH ? HL : "#9CC4E4"}"${ecfH ? ' class="dg-hl"' : ""}/><rect x="104" y="102" width="42" height="16" rx="4" fill="${ecfH ? HL : "#D98C8C"}" opacity="${ecfH ? .75 : 1}"/>`;
    s += T(57, 60, 9, 900, "#fff", "ICF") + T(57, 72, 7.5, 700, "#fff", "≈ 2/3 · 25 L") + T(57, 96, 11, 900, "#fff", "K⁺");
    s += T(125, 52, 9, 900, "#fff", "ECF") + T(125, 63, 7, 700, "#fff", "≈ 1/3 · 15 L") + T(125, 84, 10, 900, "#fff", "Na⁺") + T(125, 113, 6.5, 800, "#fff", "plasma 8%");
    s += T(57, 130, 7, 700, "#3F5F6A", "inside cells") + T(125, 130, 7, 700, "#3F5F6A", "tissue fluid 25%");
    if (on("ca")) s += `<g class="dg-hl"><rect x="10" y="22" width="140" height="112" rx="8" fill="#fff" opacity=".88"/><path d="M50 60 h60 M50 60 q-8 -8 -12 0 q4 8 12 0 M110 60 q8 -8 12 0 q-4 8 -12 0" stroke="${HL}" stroke-width="7" fill="none" stroke-linecap="round"/></g>` +
      T(80, 92, 9, 900, HL, "99% of Ca²⁺ is in bone") + T(80, 106, 7.5, 700, "#55616E", "blood 2.2–2.6 mmol/L");
    return s;
  }

  /* ---------- pH scale ---------- */
  function phScale() {
    const x = v => 14 + (v - 7.0) / 0.8 * 132;
    let s = `<defs><linearGradient id="${it ? "k" : "o"}phg" x1="0" x2="1"><stop offset="0" stop-color="#E5735A"/><stop offset=".5" stop-color="#8CC37A"/><stop offset="1" stop-color="#6A8FD6"/></linearGradient></defs>`;
    s += `<rect x="14" y="40" width="132" height="22" rx="6" fill="url(#${it ? "k" : "o"}phg)"/>`;
    if (on("acid")) s += `<rect x="14" y="36" width="${x(7.35) - 14}" height="30" rx="6" fill="${HL}" opacity=".75" class="dg-hl"/>`;
    if (on("alk")) s += `<rect x="${x(7.45)}" y="36" width="${146 - x(7.45)}" height="30" rx="6" fill="${HL}" opacity=".75" class="dg-hl"/>`;
    s += `<rect x="${x(7.35)}" y="34" width="${x(7.45) - x(7.35)}" height="34" rx="2" fill="none" stroke="${on("ph") ? HL : "#1B2430"}" stroke-width="${on("ph") ? 2.6 : 1.4}"${c("ph")}/>`;
    [7.0, 7.2, 7.4, 7.6, 7.8].forEach(v => s += T(x(v), 78, 7, 700, "#55616E", v.toFixed(1)));
    s += T(x(7.15), 30, 7.5, 800, "#B04A30", "acidosis") + T(x(7.65), 30, 7.5, 800, "#3A5AA8", "alkalosis");
    s += T(80, 100, 8, 800, on("buffer") ? HL : "#3F4A56", "CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻");
    s += T(40, 114, 7, 700, "#55616E", "lungs set CO₂") + T(122, 114, 7, 700, "#55616E", "kidneys set HCO₃⁻");
    if (on("buffer")) s += `<rect x="8" y="88" width="144" height="32" rx="8" fill="none" stroke="${HL}" stroke-width="1.4" class="dg-hl"/>`;
    return s;
  }

  const KID = ["cortex", "pyramid", "pelvis", "epo"], TR = ["tract", "ureter", "bladder", "urethra", "excretion", "aldo", "anp"],
    NEPH = ["glom", "capsule", "pct", "loop", "dct", "cd", "jga", "filtration", "gfr", "reabsorption", "secretion", "adh", "raas"],
    FL = ["icf", "ecf", "na", "k", "ca"], PH = ["ph", "acid", "alk", "buffer"];
  BGX.DIAGRAMS.kidney = item => {
    it = item || null;
    const p = dg.uid(), sp = dg.spots(it)[0];
    let inner, bg = ["#FBF4F0", "#EEDDD4"], tagY = 150;
    if (!sp) inner = kidney(p, -6, 10, .62) + `<g transform="translate(58 6) scale(.64)">${nephron(true)}</g>` + T(36, 116, 7.5, 800, "#9E5640", "kidney") + T(108, 116, 7.5, 800, "#8A3E38", "nephron");
    else if (KID.indexOf(sp) >= 0) { inner = kidney(p, 0, 0, 1) + kidneyLabels(); tagY = 12; }
    else if (TR.indexOf(sp) >= 0) { inner = tract(); tagY = 12; bg = ["#FBF6F0", "#EFE3D6"]; }
    else if (NEPH.indexOf(sp) >= 0) { it = item; inner = nephron(); tagY = 150; }
    else if (FL.indexOf(sp) >= 0) { inner = fluids(); bg = ["#F2F8F6", "#DCEDE7"]; }
    else if (PH.indexOf(sp) >= 0) { inner = phScale(); bg = ["#F6F6F2", "#E6E6DC"]; }
    else inner = kidney(p, 0, 0, 1);
    const label = sp ? (NAMES[sp] || (it && it.name) || "Kidney") : "A kidney cut in half beside one nephron";
    const tag = sp ? dg.tag(80, tagY, NAMES[sp] || it.name) : "";
    it = null;
    return dg.frame(inner + tag, label, bg);
  };
})();
