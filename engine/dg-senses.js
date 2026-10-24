/* BioglowRX diagram "senses" — the sense organs.
   Eye (side cross-section, front on the left): cornea sclera iris pupil lens ciliary retina fovea disc aqueous vitreous
     rods cones (retina close-up), d-myopia d-hyperopia (focus diagrams)
   Ear (cross-section, outside on the left): auricle canal tympanic ossicles tube cochlea corti semicircular vestibule
   Receptor types: r-mechano r-thermo r-chemo r-photo r-noci     Taste and smell: taste smell
   Overview (null): eye above, ear below. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  let it = null;
  const on = id => dg.is(it, id), col = (id, base) => on(id) ? HL : base, c = id => dg.cls(it, id);
  const NAMES = { cornea: "Cornea", sclera: "Sclera", iris: "Iris", pupil: "Pupil", lens: "Lens", ciliary: "Ciliary body", retina: "Retina",
    fovea: "Fovea", disc: "Optic disc (blind spot)", aqueous: "Aqueous humour", vitreous: "Vitreous body", rods: "Rods", cones: "Cones",
    "d-myopia": "Myopia: focus in front", "d-hyperopia": "Hyperopia: focus behind", auricle: "Auricle", canal: "Ear canal",
    tympanic: "Tympanic membrane", ossicles: "Ossicles", tube: "Auditory tube", cochlea: "Cochlea", corti: "Organ of Corti",
    semicircular: "Semicircular canals", vestibule: "Vestibule", taste: "Taste buds", smell: "Olfactory epithelium" };
  const EYE = ["cornea", "sclera", "iris", "pupil", "lens", "ciliary", "retina", "fovea", "disc", "aqueous", "vitreous", "d-myopia", "d-hyperopia"];
  const EAR = ["auricle", "canal", "tympanic", "ossicles", "tube", "cochlea", "corti", "semicircular", "vestibule"];

  /* ---------- eye: centre (88,76), front (cornea) on the left ---------- */
  function eye(len) {
    const cx = 88, cy = 76, rx = 50 + (len || 0), ry = 48, back = cx + rx;
    const scl = `M44 52 A${rx} ${ry} 0 1 1 44 100`;
    let s = "";
    // vitreous + aqueous fills
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 5}" ry="${ry - 5}" fill="${col("vitreous", "#EEF5FA")}"${c("vitreous")}/>`;
    s += `<path d="M44 54 Q26 76 44 98 L52 98 L52 54Z" fill="${col("aqueous", "#D6ECF8")}"${c("aqueous")}/>`;
    // retina (inner) and choroid, sclera (outer)
    s += `<path d="M58 40 A${rx - 5} ${ry - 5} 0 1 1 58 112" fill="none" stroke="#9B5E6E" stroke-width="2.4"/>`;
    s += `<path d="M60 44 A${rx - 8} ${ry - 8} 0 1 1 60 108" fill="none" stroke="${col("retina", "#E79AA6")}" stroke-width="${on("retina") ? 4 : 2.6}"${c("retina")}/>`;
    s += `<path d="${scl}" fill="none" stroke="${col("sclera", "#F7F4EE")}" stroke-width="5"${c("sclera")}/><path d="${scl}" fill="none" stroke="#B8AE9E" stroke-width=".7"/>`;
    s += `<path d="M44 52 Q22 76 44 100" fill="none" stroke="${col("cornea", "#9CC9E6")}" stroke-width="${on("cornea") ? 4 : 2.6}"${c("cornea")}/>`;
    // fovea, optic disc and nerve
    s += `<path d="M${back - 2} 92 Q${back + 6} 98 ${back + 14} 114 L${back + 6} 118 Q${back - 2} 104 ${back - 6} 96Z" fill="#E1B45C"/>`;
    s += `<rect x="${back - 8}" y="90" width="8" height="9" rx="2" fill="${col("disc", "#F4D58A")}"${c("disc")}/>`;
    s += on("fovea") ? `<circle cx="${back - 6}" cy="${cy}" r="4.5" fill="${HL}" class="dg-hl"/>` : `<circle cx="${back - 6}" cy="${cy}" r="2" fill="#B05A6E"/>`;
    // ciliary body + suspensory ligaments, lens, iris
    s += `<g stroke="#B8A0A0" stroke-width=".6"><path d="M52 60 L58 51 M52 92 L58 101"/></g>`;
    s += `<path d="M54 46 Q62 50 60 56 Q56 54 54 46Z M54 106 Q62 102 60 96 Q56 98 54 106Z" fill="${col("ciliary", "#B5727F")}"${c("ciliary")}/>`;
    s += `<ellipse cx="54" cy="76" rx="7" ry="17" fill="${col("lens", "#FFF6D8")}" stroke="#D6C38A" stroke-width=".8"${c("lens")}/>`;
    s += `<path d="M46 54 V67 M46 85 V98" stroke="${col("iris", "#5E8C5A")}" stroke-width="3.4" stroke-linecap="round"${c("iris")}/>`;
    if (on("pupil")) s += `<path d="M46 68 V84" stroke="${HL}" stroke-width="3" stroke-dasharray="2 1.5" class="dg-hl"/>`;
    return s;
  }
  function eyeLabels() {
    return T(26, 26, 7, 700, "#3F6F98", "cornea", "start") + T(74, 22, 7, 700, "#7A6A5A", "sclera") + T(120, 22, 7, 700, "#A0505E", "retina") +
      T(54, 132, 7, 700, "#7A6A3A", "lens") + T(146, 132, 7, 700, "#8A6A20", "optic nerve", "end") + T(96, 80, 7, 600, "#6A8AA0", "vitreous body");
  }
  function focus(myo) {
    // light rays from a distant object, focused in front (myopia: long eye) or behind (hyperopia: short eye) the retina
    const len = myo ? 6 : -8, f = myo ? 120 : 150, back = 88 + 50 + len;
    let s = eye(len);
    s += `<g stroke="#F2A33A" stroke-width="1.2" fill="none"><path d="M8 62 H52 L${f} 76 M8 90 H52 L${f} 76"/></g>`;
    s += `<circle cx="${f}" cy="76" r="3.2" fill="${HL}" class="dg-hl"/>`;
    s += `<path d="M${back - 8} 64 V88" stroke="#7A2F44" stroke-width="1" stroke-dasharray="2 1.5"/>`;
    s += T(80, 136, 7.5, 700, "#55616E", myo ? "eyeball too long: concave lens fixes" : "eyeball too short: convex lens fixes");
    return s;
  }
  function retinaCells() {
    let s = `<rect x="10" y="20" width="140" height="10" fill="#9B5E6E"/>${T(80, 18, 7, 700, "#7A4A55", "back of the eye")}`;
    for (let i = 0; i < 9; i++) {
      const x = 20 + i * 15, cone = i % 3 === 1;
      if (cone) s += `<path d="M${x - 4} 34 H${x + 4} L${x + 5} 60 L${x} 74 L${x - 5} 60Z" fill="${col("cones", "#F2B84B")}"${on("cones") && i === 1 ? ' class="dg-hl"' : ""}/>`;
      else s += `<rect x="${x - 3}" y="32" width="6" height="42" rx="3" fill="${col("rods", "#7FA6D6")}"${on("rods") && i === 0 ? ' class="dg-hl"' : ""}/>`;
      s += `<path d="M${x} 74 V96" stroke="#B0A0B0" stroke-width="1.2"/><circle cx="${x}" cy="98" r="2.5" fill="#B0A0B0"/>`;
    }
    s += `<path d="M10 112 H150" stroke="#E1B45C" stroke-width="3"/>${T(80, 124, 7, 600, "#7A6A3A", "ganglion axons → optic nerve")}`;
    s += T(80, 136, 7.5, 700, "#55616E", "light enters from below ↑");
    return s;
  }

  /* ---------- ear ---------- */
  function ear() {
    let s = `<rect x="70" y="46" width="30" height="54" rx="8" fill="#F3ECE2"/>`;  // middle ear cavity
    s += `<path d="M24 22 Q4 28 6 60 Q8 92 22 112 Q30 120 34 108 Q30 96 30 84 L30 62 Q36 50 34 34 Q32 22 24 22Z" fill="${col("auricle", "#F2C6A8")}" stroke="#C9967A" stroke-width=".8"${c("auricle")}/>`;
    s += `<path d="M30 64 H70 V80 H30Z" fill="${col("canal", "#F7DCC6")}" stroke="#C9967A" stroke-width=".8"${c("canal")}/>`;
    s += `<path d="M70 58 L73 88" stroke="${col("tympanic", "#C9A0A0")}" stroke-width="${on("tympanic") ? 3.4 : 2.2}" stroke-linecap="round"${c("tympanic")}/>`;
    const ob = col("ossicles", "#E8DCC0"), oe = on("ossicles") ? HL : "#A08A60";
    s += `<g fill="${ob}" stroke="${oe}" stroke-width=".7"${c("ossicles")}><path d="M72 72 L76 58 Q78 52 83 54 L80 62Z"/><path d="M82 54 Q90 52 90 58 L88 66 L84 62Z"/><path d="M88 66 L96 66 L98 62 L98 74 L96 70 L88 70Z"/></g>`;
    s += `<path d="M86 98 Q96 120 124 140" fill="none" stroke="${col("tube", "#D9B8A8")}" stroke-width="${on("tube") ? 6 : 5}" stroke-linecap="round"${c("tube")}/>`;
    // inner ear: vestibule, semicircular canals, cochlea
    const sc = col("semicircular", "#B9D3E8"), sw = on("semicircular") ? 4 : 3.2;
    s += `<g fill="none" stroke="${sc}" stroke-width="${sw}"${c("semicircular")}><path d="M104 60 Q100 30 116 28 Q132 28 124 54"/><path d="M110 58 Q126 40 140 50 Q148 62 128 66"/><ellipse cx="114" cy="44" rx="7" ry="5"/></g>`;
    s += `<ellipse cx="108" cy="68" rx="10" ry="8" fill="${col("vestibule", "#C6DDEE")}" stroke="#86A8C4" stroke-width=".8"${c("vestibule")}/>`;
    const cc = col("cochlea", "#C6DDEE");
    s += `<g${c("cochlea")}><path d="M114 76 Q126 72 136 80 Q146 92 134 102 Q122 108 118 96 Q116 86 126 86 Q134 88 130 96" fill="none" stroke="${cc}" stroke-width="7" stroke-linecap="round"/></g>`;
    s += `<path d="M114 76 Q126 72 136 80 Q146 92 134 102 Q122 108 118 96 Q116 86 126 86 Q134 88 130 96" fill="none" stroke="${on("corti") ? HL : "#86A8C4"}" stroke-width="${on("corti") ? 2 : .6}" stroke-linecap="round"${c("corti")}/>`;
    s += `<path d="M140 74 Q148 70 154 64" stroke="#E1B45C" stroke-width="2.4" fill="none"/>`;
    return s;
  }
  function earLabels() {
    return T(80, 30, 7, 700, "#7A6A5A", "middle ear") + T(44, 96, 7, 700, "#9A6A50", "outer") + T(132, 122, 7, 700, "#4A7A9A", "inner ear") + T(118, 148, 7, 600, "#9A7A6A", "auditory tube");
  }
  function cortiInset() {
    return `<circle cx="34" cy="132" r="18" fill="#fff" stroke="${HL}" stroke-width="1.2"/><path d="M20 140 H48" stroke="#86A8C4" stroke-width="2.4"/>` +
      [24, 30, 36, 42].map(x => `<rect x="${x - 2}" y="128" width="4" height="10" rx="2" fill="${HL}"/><path d="M${x - 1} 128 v-4 M${x + 1} 128 v-4" stroke="${HL}"/>`).join("") +
      `<path d="M20 122 H48" stroke="#B9A0C0" stroke-width="2"/><path d="M50 124 L118 98" stroke="${HL}" stroke-width=".8" stroke-dasharray="2 2"/>`;
  }

  /* ---------- receptor types ---------- */
  function receptors() {
    const R = [["r-mechano", "Mechano", "press", 32, 46], ["r-thermo", "Thermo", "heat", 80, 46], ["r-chemo", "Chemo", "chem", 128, 46], ["r-photo", "Photo", "light", 56, 104], ["r-noci", "Noci", "pain", 104, 104]];
    return R.map(([id, nm, k, x, y]) => {
      const h = on(id), f = h ? HL : "#fff", st = h ? "#fff" : "#55616E";
      let g = `<circle cx="${x}" cy="${y}" r="20" fill="${f}" stroke="${h ? HL : "#B8C2CC"}" stroke-width="1.2"${h ? ' class="dg-hl"' : ""}/>`;
      if (k === "press") g += `<path d="M${x - 9} ${y - 12} V${y - 2} M${x - 3} ${y - 14} V${y - 2} M${x + 3} ${y - 14} V${y - 2} M${x + 9} ${y - 12} V${y - 2}" stroke="${st}" stroke-width="2.4" stroke-linecap="round"/><path d="M${x - 12} ${y + 2} H${x + 12}" stroke="${st}" stroke-width="1.4"/><path d="M${x - 6} ${y + 6} Q${x} ${y + 10} ${x + 6} ${y + 6}" stroke="${st}" fill="none"/>`;
      if (k === "heat") g += `<path d="M${x} ${y - 13} Q${x + 10} ${y - 2} ${x + 6} ${y + 6} Q${x} ${y + 12} ${x - 6} ${y + 6} Q${x - 10} ${y - 2} ${x} ${y - 13}Z" fill="none" stroke="${st}" stroke-width="1.8"/>`;
      if (k === "chem") g += `<circle cx="${x - 6}" cy="${y - 2}" r="4" fill="none" stroke="${st}" stroke-width="1.6"/><circle cx="${x + 6}" cy="${y - 6}" r="3" fill="none" stroke="${st}" stroke-width="1.6"/><circle cx="${x + 4}" cy="${y + 6}" r="3" fill="none" stroke="${st}" stroke-width="1.6"/><path d="M${x - 2} ${y - 3} L${x + 3} ${y - 5} M${x - 3} ${y + 1} L${x + 2} ${y + 4}" stroke="${st}" stroke-width="1.4"/>`;
      if (k === "light") g += `<circle cx="${x}" cy="${y - 2}" r="5" fill="none" stroke="${st}" stroke-width="1.8"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<path d="M${(x + Math.cos(a) * 8).toFixed(1)} ${(y - 2 + Math.sin(a) * 8).toFixed(1)} L${(x + Math.cos(a) * 11).toFixed(1)} ${(y - 2 + Math.sin(a) * 11).toFixed(1)}" stroke="${st}" stroke-width="1.4"/>`; }).join("");
      if (k === "pain") g += `<path d="M${x + 3} ${y - 13} L${x - 5} ${y} H${x + 3} L${x - 3} ${y + 12}" fill="none" stroke="${st}" stroke-width="2" stroke-linejoin="round"/>`;
      return g + T(x, y + 30, 7.5, 800, h ? HL : "#55616E", nm);
    }).join("");
  }

  /* ---------- taste and smell ---------- */
  function taste() {
    let s = `<path d="M40 30 Q80 20 120 30 Q132 70 112 108 Q96 130 80 130 Q64 130 48 108 Q28 70 40 30Z" fill="#F0A0A8" stroke="#C9707A"/><path d="M80 34 V110" stroke="#D9808A" stroke-width="1"/>`;
    [[56, 48], [70, 60], [92, 50], [104, 66], [62, 80], [96, 88], [80, 98], [74, 44]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="2.4" fill="${on("taste") ? HL : "#E07A88"}"/>`);
    if (on("taste")) s += `<g class="dg-hl"><circle cx="134" cy="112" r="16" fill="#fff" stroke="${HL}"/><ellipse cx="134" cy="114" rx="8" ry="10" fill="${HL}"/><path d="M134 104 V98" stroke="${HL}"/></g><path d="M118 108 L98 90" stroke="${HL}" stroke-width=".8" stroke-dasharray="2 2"/>`;
    return s + T(80, 22, 7.5, 700, "#9A4A55", "tongue: sweet, salty, sour, bitter, umami");
  }
  function smell() {
    let s = `<path d="M30 140 V70 Q30 30 70 22 Q110 18 130 40 L130 70 Q150 92 140 104 L130 104 L128 140Z" fill="#F2C6A8" stroke="#C9967A"/>`;
    s += `<path d="M60 70 Q80 60 118 66 Q128 80 124 96 L66 98 Q56 86 60 70Z" fill="#F7DCC6" stroke="#C9967A" stroke-width=".8"/>`;
    s += `<path d="M64 44 Q90 36 112 46" stroke="#D9C2AE" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M70 64 Q90 56 112 62" stroke="${on("smell") ? HL : "#E1B45C"}" stroke-width="${on("smell") ? 4 : 2.6}" fill="none"${c("smell")}/>`;
    s += `<ellipse cx="88" cy="52" rx="14" ry="4" fill="#E1B45C"/>`;
    s += [[136, 82], [146, 88], [140, 96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#8A5A3A"/>`).join("");
    return s + T(88, 46, 7, 700, "#8A6A3A", "olfactory bulb") + T(92, 112, 7, 600, "#9A6A50", "nasal cavity") ;
  }

  BGX.DIAGRAMS.senses = item => {
    it = item || null;
    const sp = dg.spots(it)[0];
    let inner, bg = ["#F2F7FB", "#DCE7F0"], tag = "";
    if (!sp) {
      inner = `<g transform="translate(-6 -4) scale(.62)">${eye()}</g><g transform="translate(58 62) scale(.6)">${ear()}</g>` +
        T(112, 40, 9, 800, "#3F6F98", "Eye", "start") + T(24, 120, 9, 800, "#7A5A9A", "Ear", "start");
    } else if (sp === "rods" || sp === "cones") { inner = retinaCells(); tag = dg.tag(80, 150, NAMES[sp]); }
    else if (sp === "d-myopia" || sp === "d-hyperopia") { inner = focus(sp === "d-myopia"); tag = dg.tag(80, 150, NAMES[sp]); }
    else if (EYE.indexOf(sp) >= 0) { inner = eye() + (on("sclera") || on("retina") ? "" : ""); tag = dg.tag(80, 146, NAMES[sp]); }
    else if (EAR.indexOf(sp) >= 0) { inner = ear() + (sp === "corti" ? cortiInset() : ""); tag = dg.tag(80, 12, NAMES[sp]); bg = ["#F7F3FA", "#E6DEEE"]; }
    else if (sp === "taste") { inner = taste(); tag = dg.tag(80, 150, NAMES[sp]); bg = ["#FBF3F2", "#EEDDDA"]; }
    else if (sp === "smell") { inner = smell(); tag = dg.tag(80, 150, NAMES[sp]); bg = ["#FBF3F2", "#EEDDDA"]; }
    else { inner = receptors(); bg = ["#FBF7EE", "#EFE6D2"]; }
    const label = sp ? (NAMES[sp] || (it && it.name) || "Senses") : "Cross-sections of the eye and the ear";
    it = null;
    return dg.frame(inner + tag, label, bg);
  };
})();
