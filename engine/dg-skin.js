/* BioglowRX diagram "skin" — the integumentary system.
   Cross-section (spot): papillary reticular hypodermis follicle arrector sebaceous eccrine apocrine (null = overview).
   Epidermis close-up: basale spinosum granulosum lucidum corneum keratinocyte melanocyte tactile dendritic bcc scc.
   Other scenes: burn1 burn2 burn3 (burn depth), nines (rule of nines), melanoma abcde (moles), nail, vitd, thermo,
   cyanosis jaundice (face), ulcer (pressure points). */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#2A3440", MUTED = "#55616e";
  const EPI = "#f2c9a8", EPID = "#d99d78", DER = "#f6d5cc", DERD = "#e3a99b", FAT = "#fbe6a6", FATD = "#e5c66a";
  const hc = (on, base) => on ? HL : base;
  const hcls = on => on ? ' class="dg-hl"' : "";

  /* ---------- whole-skin cross-section ---------- */
  function section(sp) {
    const on = id => sp === id;
    const pap = "M12 50 Q19 58 26 50 T40 50 T54 50 T68 50 T82 50 T96 50 T110 50 T124 50 T138 50 Q143 46 148 50";
    let s = "";
    // hypodermis with fat cells
    s += `<rect x="12" y="112" width="136" height="36" fill="${FAT}"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) s += `<circle cx="${18 + c * 15 + (r % 2) * 7}" cy="${119 + r * 11}" r="5.4" fill="#fff3c9" stroke="${FATD}" stroke-width=".7"/>`;
    if (on("hypodermis")) s += `<rect x="12" y="112" width="136" height="36" fill="${HL}" fill-opacity=".35" stroke="${HL}" stroke-width="2" class="dg-hl"/>`;
    // dermis
    s += `<path d="${pap} V112 H12Z" fill="${DER}"/>`;
    s += `<path d="M12 66 H148" stroke="${DERD}" stroke-width=".8" stroke-dasharray="3 2"/>`;
    for (let i = 0; i < 6; i++) s += `<path d="M${22 + i * 22} 104 q4 -3 8 0 q4 3 8 0" stroke="#c9b9a0" stroke-width=".7" fill="none"/>`;
    if (on("papillary")) s += `<path d="${pap} V66 H12Z" fill="${HL}" fill-opacity=".35" stroke="${HL}" stroke-width="2" class="dg-hl"/>`;
    if (on("reticular")) s += `<rect x="12" y="66" width="136" height="46" fill="${HL}" fill-opacity=".3" stroke="${HL}" stroke-width="2" class="dg-hl"/>`;
    // blood vessels: a deep plexus with capillary loops into the papillae
    s += `<path d="M12 98 H148" stroke="#c4413f" stroke-width="2"/><path d="M12 102 H148" stroke="#4f6fc0" stroke-width="2"/>`;
    s += [33, 75, 117].map(x => `<path d="M${x} 98 V60 q3 -6 6 0 V102" stroke="#c4413f" stroke-width=".9" fill="none"/>`).join("");
    // epidermis
    s += `<path d="M12 32 H148 V50 Q143 46 138 50 T124 50 T110 50 T96 50 T82 50 T68 50 T54 50 T40 50 T26 50 Q19 58 12 50Z" fill="${EPI}" stroke="${EPID}" stroke-width=".8"/>`;
    s += `<rect x="12" y="32" width="136" height="3.5" fill="#e8b08a"/>`;
    // apocrine gland (left) — duct opens into the follicle
    const apo = on("apocrine");
    s += `<path d="M38 106 Q44 92 50 74 L55 66" stroke="${hc(apo, "#8e7cc3")}" stroke-width="${apo ? 2.6 : 1.8}" fill="none"/>`;
    s += [[30, 108], [37, 104], [36, 112], [43, 109], [29, 116], [42, 116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${hc(apo, "#b7a8e0")}" stroke="${apo ? "#fff" : "#8e7cc3"}" stroke-width=".8"/>`).join("");
    if (apo) s += `<circle cx="37" cy="110" r="13" fill="none" stroke="${HL}" stroke-width="1.6" class="dg-hl"/>`;
    // hair follicle and hair
    const fol = on("follicle");
    s += `<path d="M66 118 L54 34" stroke="${hc(fol, "#c98c74")}" stroke-width="${fol ? 9 : 8}" stroke-linecap="round"${hcls(fol)}/>`;
    s += `<circle cx="66" cy="119" r="5.5" fill="${hc(fol, "#b56f55")}"/><circle cx="66" cy="121" r="2.2" fill="#f6d5cc"/>`;
    s += `<path d="M65 116 L52 30 Q49 14 40 6" stroke="#3b2a20" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    // sebaceous gland (right of follicle)
    const seb = on("sebaceous");
    s += `<path d="M61 72 Q74 62 80 70 Q86 78 76 82 Q68 86 62 80Z" fill="${hc(seb, "#f2d27a")}" stroke="${seb ? "#fff" : "#c9a43c"}" stroke-width="1"${hcls(seb)}/>`;
    // arrector pili muscle
    const arr = on("arrector");
    s += `<path d="M62 92 Q78 80 92 54" stroke="${hc(arr, "#c0504d")}" stroke-width="${arr ? 3.4 : 2.4}" fill="none" stroke-linecap="round"${hcls(arr)}/>`;
    // eccrine gland (right) — duct opens on the surface at a pore
    const ecc = on("eccrine");
    s += `<path d="M112 104 Q106 90 114 80 Q120 70 112 60 Q106 50 114 34" stroke="${hc(ecc, "#5aa7c9")}" stroke-width="${ecc ? 2.6 : 1.8}" fill="none"/>`;
    s += [[108, 108], [115, 106], [112, 113], [119, 111], [106, 115]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="${hc(ecc, "#a9d6ea")}" stroke="${ecc ? "#fff" : "#5aa7c9"}" stroke-width=".8"/>`).join("");
    s += `<ellipse cx="114" cy="32.5" rx="2.6" ry="1.4" fill="#7a4f3a"/>`;
    if (ecc) s += `<circle cx="113" cy="110" r="11" fill="none" stroke="${HL}" stroke-width="1.6" class="dg-hl"/>`;
    const names = { papillary: "Papillary layer", reticular: "Reticular layer", hypodermis: "Hypodermis", follicle: "Hair follicle", arrector: "Arrector pili",
      sebaceous: "Sebaceous gland", eccrine: "Eccrine sweat gland", apocrine: "Apocrine sweat gland" };
    if (!sp) {
      const pill = (y, w, txt, c) => `<rect x="${146 - w}" y="${y - 8}" width="${w}" height="11" rx="5.5" fill="#fff" fill-opacity=".9"/>` + T(146 - w / 2, y, 7.5, 800, c, txt);
      s += pill(44, 42, "Epidermis", "#8a4a2a") + pill(88, 32, "Dermis", "#8a3a3a") + pill(144, 48, "Hypodermis", "#7a5a10");
      return dg.frame(s, "Skin in cross-section: epidermis, dermis and hypodermis", ["#FBF5F1", "#EFE2DA"]);
    }
    return dg.frame(s + dg.tag(80, 150, names[sp] || sp), names[sp] || "Skin", ["#FBF5F1", "#EFE2DA"]);
  }

  /* ---------- epidermis close-up ---------- */
  const BANDS = [["corneum", 16, 40, "#efd9c4", "Corneum"], ["lucidum", 40, 48, "#fbf3ea", "Lucidum"], ["granulosum", 48, 62, "#e6c3a6", "Granulosum"],
    ["spinosum", 62, 94, "#f1cfb4", "Spinosum"], ["basale", 94, 108, "#e2ae8c", "Basale"]];
  function epidermis(sp) {
    const layerOn = id => sp === id || (sp === "bcc" && id === "basale") || (sp === "scc" && id === "spinosum");
    let s = "";
    // dermis below
    s += `<rect x="12" y="108" width="86" height="30" fill="${DER}"/>` + `<path d="M24 136 V118 q4 -6 8 0 V136 M60 136 V118 q4 -6 8 0 V136" stroke="#c4413f" stroke-width="1" fill="none"/>`;
    BANDS.forEach(([id, y1, y2, col]) => { s += `<rect x="12" y="${y1}" width="86" height="${y2 - y1}" fill="${col}"/>`; });
    // corneum: flat dead scales
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) s += `<rect x="${13 + c * 21 + (r % 2) * 10}" y="${18 + r * 4.4}" width="${r % 2 && c === 3 ? 11 : 20}" height="3.2" rx="1.5" fill="#e3c3a6" stroke="#c9a283" stroke-width=".4"/>`;
    // lucidum: clear band
    s += `<path d="M14 44 H96" stroke="#e8d8c8" stroke-width=".6" stroke-dasharray="2 2"/>`;
    // granulosum: flattened cells with dark granules
    for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) {
      const x = 20 + c * 17 + r * 8, y = 52 + r * 6;
      s += `<ellipse cx="${x}" cy="${y}" rx="8" ry="2.8" fill="#dcb393" stroke="#b98a68" stroke-width=".5"/><circle cx="${x - 3}" cy="${y}" r=".9" fill="#5b3a2a"/><circle cx="${x + 2}" cy="${y - .5}" r=".9" fill="#5b3a2a"/><circle cx="${x + 4.5}" cy="${y + .6}" r=".8" fill="#5b3a2a"/>`;
    }
    // spinosum: polygonal cells
    const kOn = sp === "keratinocyte";
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
      const x = 19 + c * 14 + (r % 2) * 7, y = 69 + r * 10;
      if (x > 94) continue;
      const hl = kOn && ((r === 1 && c === 2) || (r === 0 && c === 4));
      s += `<rect x="${x - 6}" y="${y - 4.4}" width="12" height="8.8" rx="2.5" fill="${hl ? HL : "#ecc3a3"}" stroke="${hl ? "#fff" : "#c99a78"}" stroke-width=".6"${hl ? ' class="dg-hl"' : ""}/><circle cx="${x}" cy="${y}" r="1.8" fill="#8a5a46"/>`;
    }
    // basale: one row of cuboidal stem cells
    for (let c = 0; c < 10; c++) {
      const x = 16 + c * 8.4, hl = kOn && c === 6;
      s += `<rect x="${x - 3.8}" y="96" width="7.6" height="11" rx="2" fill="${hl ? HL : "#d79c78"}" stroke="${hl ? "#fff" : "#b07856"}" stroke-width=".5"${hl ? ' class="dg-hl"' : ""}/><circle cx="${x}" cy="101.5" r="1.9" fill="#6b3f2e"/>`;
    }
    if (kOn) s += `<path d="M104 104 V24" stroke="${HL}" stroke-width="1.6"/><path d="M100 30 L104 22 L108 30" fill="none" stroke="${HL}" stroke-width="1.6"/>`;
    // melanocyte with branches and melanin
    const mOn = sp === "melanocyte";
    s += `<path d="M56 100 L50 78 M56 100 L62 74 M56 100 L70 84" stroke="${hc(mOn, "#5b3a2a")}" stroke-width="1.6" stroke-linecap="round"/>`;
    s += `<ellipse cx="56" cy="101.5" rx="5" ry="5.5" fill="${hc(mOn, "#4a2a1c")}" stroke="#fff" stroke-width=".7"${hcls(mOn)}/>`;
    s += [[50, 80], [61, 77], [68, 85], [48, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#3a2016"/>`).join("");
    // tactile (Merkel) cell with its nerve disc
    const tOn = sp === "tactile";
    s += `<path d="M28 110 Q26 122 30 136" stroke="${hc(tOn, "#d9a61e")}" stroke-width="1.6" fill="none"/><path d="M23 108.5 H33" stroke="${hc(tOn, "#d9a61e")}" stroke-width="2.4" stroke-linecap="round"/>`;
    s += `<rect x="24" y="96" width="8" height="11" rx="3" fill="${hc(tOn, "#f3d46b")}" stroke="#fff" stroke-width=".7"${hcls(tOn)}/>`;
    // dendritic (Langerhans) cell in the spinosum
    const dOn = sp === "dendritic";
    s += `<g${hcls(dOn)}><path d="M80 78 L72 70 M80 78 L90 70 M80 78 L92 84 M80 78 L74 88 M80 78 L82 66" stroke="${hc(dOn, "#9a6fc4")}" stroke-width="2" stroke-linecap="round"/><circle cx="80" cy="78" r="4" fill="${hc(dOn, "#b994dd")}" stroke="#fff" stroke-width=".7"/></g>`;
    // cancers
    if (sp === "bcc") s += `<path d="M38 107 Q34 126 48 130 Q62 132 60 108Z" fill="#c26a8a" stroke="#fff" stroke-width=".8"/>`;
    if (sp === "scc") s += `<path d="M40 16 Q44 8 56 10 Q66 8 70 16 L66 92 L44 92Z" fill="#c26a8a" fill-opacity=".75" stroke="#fff" stroke-width=".8"/>`;
    // band highlight and labels
    BANDS.forEach(([id, y1, y2, , label]) => {
      const lo = layerOn(id);
      if (lo) s += `<rect x="12" y="${y1}" width="86" height="${y2 - y1}" fill="${HL}" fill-opacity=".28" stroke="${HL}" stroke-width="1.6" class="dg-hl"/>`;
      const ly = id === "lucidum" ? 46.5 : (y1 + y2) / 2 + 2.5;
      if (!kOn) s += T(102, ly, 7.5, lo ? 900 : 700, lo ? HL : MUTED, label, "start");
    });
    if (kOn) s += T(110, 70, 7.5, 800, HL, "rise,", "start") + T(110, 79, 7.5, 800, HL, "fill with", "start") + T(110, 88, 7.5, 800, HL, "keratin,", "start") + T(110, 97, 7.5, 800, HL, "die", "start");
    s += T(102, 126, 7.5, 700, MUTED, "Dermis", "start");
    const names = { basale: "Stratum basale", spinosum: "Stratum spinosum", granulosum: "Stratum granulosum", lucidum: "Stratum lucidum", corneum: "Stratum corneum",
      keratinocyte: "Keratinocytes", melanocyte: "Melanocyte", tactile: "Tactile (Merkel) cell", dendritic: "Dendritic cell", bcc: "Basal cell carcinoma", scc: "Squamous cell carcinoma" };
    return dg.frame(s + dg.tag(80, 150, names[sp]), names[sp], ["#FBF5F1", "#EFE2DA"]);
  }

  /* ---------- burn depth ---------- */
  function burns(sp) {
    const cols = [["burn1", 34, 46, "1st", "epidermis"], ["burn2", 80, 74, "2nd", "part dermis"], ["burn3", 126, 106, "3rd", "all dermis"]];
    let s = "";
    cols.forEach(([id, cx, depth, lab, sub]) => {
      const on = sp === id, fade = sp && !on ? ' opacity=".45"' : "";
      const x = cx - 19;
      s += `<g${fade}><rect x="${x}" y="32" width="38" height="14" fill="${EPI}"/><rect x="${x}" y="46" width="38" height="56" fill="${DER}"/><rect x="${x}" y="102" width="38" height="28" fill="${FAT}"/>`;
      s += `<path d="M${x} 46 H${x + 38}" stroke="${EPID}" stroke-width=".6"/><path d="M${x} 102 H${x + 38}" stroke="${FATD}" stroke-width=".6"/>`;
      s += `<rect x="${x}" y="32" width="38" height="${depth - 32}" fill="${id === "burn3" ? "#5a3b33" : "#e0473f"}" fill-opacity="${id === "burn3" ? .8 : .55}"/>`;
      if (id === "burn2") s += `<path d="M${x + 6} 32 Q${x + 14} 18 ${x + 22} 32Z" fill="#fff" fill-opacity=".85" stroke="#e0a090"/>`;
      s += `</g>`;
      if (on) s += `<rect x="${x - 3}" y="14" width="44" height="120" rx="6" fill="none" stroke="${HL}" stroke-width="2" class="dg-hl"/>`;
      s += T(cx, 26, 9, 900, on ? HL : INK, lab) + T(cx, 144, 7, 700, on ? HL : MUTED, sub);
    });
    const names = { burn1: "First-degree burn", burn2: "Second-degree burn", burn3: "Third-degree burn" };
    return dg.frame(s, names[sp] || "Burn depth", ["#FFF7F0", "#F4E3D6"]);
  }

  /* ---------- rule of nines ---------- */
  function nines() {
    const R = (x, y, w, h, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${f}" stroke="#fff" stroke-width="1"/>`;
    let s = `<g class="dg-hl">` + `<circle cx="66" cy="24" r="11" fill="#f7b267" stroke="#fff"/>` + R(50, 37, 32, 52, "#f79d84") + R(34, 38, 14, 54, "#9fd3c7") + R(84, 38, 14, 54, "#9fd3c7") +
      R(51, 91, 14, 58, "#a8c5f0") + R(67, 91, 14, 58, "#a8c5f0") + `</g>`;
    s += T(66, 27.5, 9, 900, INK, "9") + T(66, 60, 10, 900, INK, "18") + T(66, 70, 6.5, 700, INK, "front") + T(66, 80, 6.5, 700, INK, "+18 back") +
      T(41, 68, 9, 900, INK, "9") + T(91, 68, 9, 900, INK, "9") + T(58, 124, 9, 900, INK, "18") + T(74, 124, 9, 900, INK, "18");
    s += `<circle cx="66" cy="93" r="4.5" fill="#fff" stroke="${HL}"/>` + T(66, 95.5, 6.5, 900, HL, "1");
    s += T(106, 30, 7.5, 800, INK, "Head 9%", "start") + T(106, 44, 7.5, 800, INK, "Arm 9% each", "start") + T(106, 58, 7.5, 800, INK, "Trunk 36%", "start") +
      T(106, 72, 7.5, 800, INK, "Leg 18% each", "start") + T(106, 86, 7.5, 800, INK, "Perineum 1%", "start") + T(106, 104, 8, 900, HL, "= 100%", "start");
    return dg.frame(s, "Rule of nines (adult)", ["#F6F8FC", "#E2E8F2"]);
  }

  /* ---------- moles ---------- */
  const goodMole = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="#7a5235"/>`;
  const badMole = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k || 1})"><path d="M-14 -4 Q-12 -16 0 -14 Q8 -18 14 -8 Q20 2 12 10 Q4 18 -6 13 Q-18 10 -14 -4Z" fill="#6a3f26"/>
    <path d="M-2 -10 Q8 -12 12 -4 Q14 6 6 8 Q-2 4 -2 -10Z" fill="#241510"/><circle cx="-7" cy="4" r="3.6" fill="#b5524a"/><circle cx="4" cy="10" r="2" fill="#8aa0c8"/></g>`;
  function moles(sp) {
    let s = "";
    if (sp === "melanoma") {
      s += `<rect x="12" y="26" width="136" height="90" rx="12" fill="#f2c9a8"/>` + goodMole(48, 70) + badMole(112, 70, 1.5);
      s += `<circle cx="112" cy="70" r="31" fill="none" stroke="${HL}" stroke-width="2.2" class="dg-hl"/>`;
      s += T(48, 104, 7.5, 800, INK, "ordinary mole") + T(48, 20, 7.5, 700, MUTED, "even, round") + T(112, 20, 7.5, 800, HL, "uneven, changing");
      return dg.frame(s + dg.tag(80, 140, "Melanoma"), "Melanoma compared with an ordinary mole", ["#FBF5F1", "#EFE2DA"]);
    }
    const cells = [[32, 32, "A", "Asymmetry"], [80, 32, "B", "Border"], [128, 32, "C", "Colour"], [52, 96, "D", "Diameter"], [108, 96, "E", "Evolving"]];
    const art = {
      A: (x, y) => `<path d="M${x - 10} ${y} Q${x - 10} ${y - 11} ${x} ${y - 11} Q${x + 14} ${y - 6} ${x + 12} ${y + 3} Q${x + 6} ${y + 9} ${x} ${y + 10} Q${x - 10} ${y + 10} ${x - 10} ${y}Z" fill="#6a3f26"/><path d="M${x} ${y - 14} V${y + 13}" stroke="#fff" stroke-dasharray="2 2"/>`,
      B: (x, y) => `<path d="M${x - 11} ${y} l3 -5 l2 -6 l5 2 l4 -3 l3 4 l5 1 l-1 5 l2 5 l-4 3 l-1 5 l-6 -1 l-4 3 l-3 -4 l-5 -2Z" fill="#6a3f26"/>`,
      C: (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="#6a3f26"/><circle cx="${x - 4}" cy="${y - 3}" r="5" fill="#1d120c"/><circle cx="${x + 5}" cy="${y + 3}" r="4" fill="#b5524a"/><circle cx="${x + 2}" cy="${y - 6}" r="2.2" fill="#8aa0c8"/>`,
      D: (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="#6a3f26"/><path d="M${x - 10} ${y - 14} H${x + 10} M${x - 10} ${y - 17} v6 M${x + 10} ${y - 17} v6" stroke="${INK}"/>` + T(x + 13, y + 3, 6.5, 800, INK, ">6 mm", "start"),
      E: (x, y) => `<circle cx="${x - 9}" cy="${y}" r="5" fill="#6a3f26"/><path d="M${x - 2} ${y} h5 m-2 -3 l3 3 -3 3" stroke="${INK}" fill="none"/>` + badMole(x + 12, y, .65)
    };
    cells.forEach(([x, y, k, w]) => {
      s += `<circle cx="${x}" cy="${y}" r="18" fill="#f2c9a8"/>` + art[k](x, y) + T(x, y + 28, 9, 900, HL, k) + T(x, y + 37, 7, 700, INK, w);
    });
    s = `<g class="dg-hl">${s}</g>`;
    return dg.frame(s, "The ABCDE rule for moles", ["#FBF5F1", "#EFE2DA"]);
  }

  /* ---------- nail ---------- */
  function nail() {
    let s = `<path d="M10 70 H112 Q148 70 148 98 Q148 124 112 124 H10Z" fill="#f2c9a8" stroke="#d99d78"/>`;
    s += `<path d="M10 108 H96 Q124 108 128 98" stroke="#efe6d0" stroke-width="10" fill="none" stroke-linecap="round"/>` + T(50, 111, 7, 700, "#7d6c50", "bone (distal phalanx)");
    s += `<path d="M58 67 H118 Q140 67 146 82" stroke="#c9a283" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M58 67 H118 Q140 67 146 82" stroke="#fbe9e4" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M44 74 Q50 66 58 68" stroke="${HL}" stroke-width="7" fill="none" stroke-linecap="round" class="dg-hl"/>`;
    s += `<path d="M58 68 Q66 63 72 68" stroke="#fff" stroke-width="5" fill="none"/>`;
    s += `<path d="M30 70 Q42 60 56 66" stroke="#e8b08a" stroke-width="4" fill="none"/>`;
    s += T(104, 48, 7.5, 800, INK, "nail plate") + `<path d="M104 51 V62" stroke="${INK}"/>` + T(68, 30, 7.5, 800, MUTED, "lunula") + `<path d="M66 33 V62" stroke="${MUTED}"/>`;
    s += T(26, 40, 7.5, 800, MUTED, "nail fold") + `<path d="M28 43 L38 62" stroke="${MUTED}"/>` + T(48, 94, 7.5, 900, HL, "matrix (growth zone)") + `<path d="M48 85 L50 77" stroke="${HL}"/>`;
    return dg.frame(s + dg.tag(80, 146, "Nail"), "Nail in side view", ["#FBF5F1", "#EFE2DA"]);
  }

  /* ---------- vitamin D ---------- */
  function vitd() {
    let s = `<circle cx="22" cy="24" r="8" fill="#f7c948"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<path d="M${(22 + Math.cos(a) * 10).toFixed(1)} ${(24 + Math.sin(a) * 10).toFixed(1)} L${(22 + Math.cos(a) * 14).toFixed(1)} ${(24 + Math.sin(a) * 14).toFixed(1)}" stroke="#f7c948" stroke-width="1.6"/>`; }).join("");
    s += `<path d="M30 30 L42 38" stroke="#f0a020" stroke-width="1.6"/>` + T(14, 50, 7, 800, "#b07a10", "UV", "start");
    const box = (y, t1, t2, on) => `<rect x="44" y="${y}" width="96" height="24" rx="7" fill="${on ? HL : "#fff"}" stroke="${on ? "#fff" : "#9fb3c4"}"${on ? ' class="dg-hl"' : ""}/>` + T(92, y + 10, 7.5, 900, on ? "#fff" : INK, t1) + T(92, y + 19.5, 7, 600, on ? "#fff" : MUTED, t2);
    s += box(30, "Skin", "makes vitamin D₃", true) + box(64, "Liver", "→ calcidiol", false) + box(98, "Kidney", "→ calcitriol (active)", false);
    s += [54, 88].map(y => `<path d="M92 ${y} v8 m-3 -3 l3 3 3 -3" stroke="${INK}" fill="none"/>`).join("");
    s += `<path d="M92 122 v6 m-3 -3 l3 3 3 -3" stroke="${INK}" fill="none"/>` + T(92, 140, 7.5, 800, INK, "gut absorbs more Ca²⁺");
    return dg.frame(s, "Vitamin D synthesis", ["#FFFBEF", "#F3EBD2"]);
  }

  /* ---------- thermoregulation ---------- */
  function thermo() {
    const panel = (x, hot) => {
      let s = `<rect x="${x}" y="30" width="64" height="18" fill="${EPI}"/><rect x="${x}" y="48" width="64" height="60" fill="${DER}"/>`;
      s += `<path d="M${x} 80 H${x + 64}" stroke="#c4413f" stroke-width="${hot ? 12 : 3}"${hot ? ' class="dg-hl"' : ""}/>`;
      if (hot) s += [10, 30, 50].map(d => `<path d="M${x + d} 22 q-4 6 0 8 q4 -2 0 -8Z" fill="#5aa7c9"/>`).join("");
      s += T(x + 32, 18 - (hot ? 4 : 0), 8, 900, hot ? "#c4413f" : "#3a6ab0", hot ? "Too hot" : "Too cold");
      s += T(x + 32, 122, 7, 800, INK, hot ? "vasodilation" : "vasoconstriction") + T(x + 32, 132, 7, 600, MUTED, hot ? "+ sweating" : "heat kept in core");
      return s;
    };
    return dg.frame(panel(10, true) + panel(86, false), "Thermoregulation by the skin", ["#F4F8FA", "#DDE8EE"]);
  }

  /* ---------- face (skin colour) ---------- */
  function face(sp) {
    const jd = sp === "jaundice", cy = sp === "cyanosis";
    const skin = jd ? "#f0d27a" : cy ? "#e9cfc6" : "#f2c9a8";
    const sclera = jd ? "#f2d34a" : "#fff";
    let s = `<ellipse cx="80" cy="72" rx="40" ry="48" fill="${skin}" stroke="#c9a283"/>`;
    s += [62, 98].map(x => `<ellipse cx="${x}" cy="64" rx="9" ry="5.5" fill="${sclera}" stroke="#a88a70"/><circle cx="${x}" cy="64" r="3.4" fill="#5a3a2a"/>`).join("");
    s += `<path d="M80 70 Q76 84 80 88" stroke="#c9a283" fill="none"/>`;
    s += `<path d="M66 100 Q80 94 94 100 Q80 110 66 100Z" fill="${cy ? "#6f86c8" : "#d27a7a"}"/>`;
    if (cy) s += `<ellipse cx="80" cy="101" rx="20" ry="11" fill="none" stroke="${HL}" stroke-width="2" class="dg-hl"/>`;
    if (jd) s += `<ellipse cx="80" cy="64" rx="34" ry="11" fill="none" stroke="${HL}" stroke-width="2" class="dg-hl"/>`;
    const lab = cy ? "Cyanosis: blue lips" : "Jaundice: yellow eyes";
    return dg.frame(s + dg.tag(80, 142, lab), lab, ["#F6F4FB", "#E4E0F0"]);
  }

  /* ---------- pressure ulcer ---------- */
  function ulcer() {
    let s = `<rect x="8" y="104" width="144" height="12" rx="4" fill="#cfd8e3"/>`;
    s += `<circle cx="24" cy="88" r="12" fill="#f2c9a8" stroke="#c9a283"/>`;
    s += `<path d="M34 84 Q60 74 92 84 L144 88 Q150 92 144 98 L92 100 Q60 104 34 98Z" fill="#a8c5f0" stroke="#7a9ac8"/>`;
    s += `<path d="M142 80 Q150 80 150 92" stroke="#f2c9a8" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    const pts = [[24, 101, "head"], [52, 101, "shoulder"], [88, 101, "sacrum"], [140, 101, "heel"]];
    pts.forEach(([x, y, t]) => {
      const on = t === "sacrum";
      s += `<circle cx="${x}" cy="${y}" r="${on ? 6 : 4}" fill="${on ? HL : "#e0a050"}"${on ? ' class="dg-hl"' : ""}/>`;
      s += T(x, y + 26, 7, on ? 900 : 700, on ? HL : MUTED, t);
    });
    s += T(80, 30, 8, 800, INK, "Bony points pressed") + T(80, 41, 8, 800, INK, "against the bed");
    s += [24, 52, 88, 140].map(x => `<path d="M${x} 52 v12 m-3 -3 l3 3 3 -3" stroke="${MUTED}" fill="none"/>`).join("");
    return dg.frame(s, "Pressure ulcer sites", ["#F4F8FA", "#DDE8EE"]);
  }

  const EPI_SPOTS = ["basale", "spinosum", "granulosum", "lucidum", "corneum", "keratinocyte", "melanocyte", "tactile", "dendritic", "bcc", "scc"];
  BGX.DIAGRAMS.skin = item => {
    const sp = item ? dg.spots(item)[0] : null;
    if (EPI_SPOTS.indexOf(sp) >= 0) return epidermis(sp);
    if (sp === "burn1" || sp === "burn2" || sp === "burn3" || sp === "burns") return burns(sp === "burns" ? null : sp);
    if (sp === "nines") return nines();
    if (sp === "melanoma" || sp === "abcde") return moles(sp);
    if (sp === "nail") return nail();
    if (sp === "vitd") return vitd();
    if (sp === "thermo") return thermo();
    if (sp === "cyanosis" || sp === "jaundice") return face(sp);
    if (sp === "ulcer") return ulcer();
    return section(sp);
  };
})();
