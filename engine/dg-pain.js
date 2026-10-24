/* BioglowRX diagram "pain" — pain, analgesics, muscle relaxants and gout (Pain Ladder).
   WHO ladder:      ladder step1 step2 step3            (overview = the ladder)
   Pain pathway:    acute noci neuro neuro2 lido cord alpha descend brainstem brain chronic
   Organs at risk:  liver cyp stomach kidney heart lungs blood
   Scales:          scale (0–10 + faces)   poss (sedation scale)
   Routes:          pill patch nasal
   Gout:            toe (flare)   uric (purines → uric acid)   excrete (kidney tubule)
   Muscle:          muscle (calcium release inside a fibre) */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  let it = null;
  const on = (...ids) => ids.some(id => dg.is(it, id));
  const hc = (...ids) => on(...ids) ? ' class="dg-hl"' : "";
  const INK = "#1B2430", SOFT = "#55616E";
  const NAMES = { ladder: "WHO analgesic ladder", step1: "Step 1: non-opioid", step2: "Step 2: weak opioid", step3: "Step 3: strong opioid",
    acute: "Acute: tissue injury", noci: "Nociceptors in tissue", neuro: "Damaged nerve", neuro2: "Calms overactive nerves", lido: "Blocks nerve signals",
    cord: "GABA-B in spinal cord", alpha: "α₂ agonist: spinal cord", descend: "Boosts descending block", brainstem: "Acts at the brainstem",
    brain: "Brain reward system", chronic: "Signals keep firing", liver: "Liver: toxic in overdose", cyp: "Liver CYP2D6 → morphine",
    stomach: "Stomach: ulcer, bleed", kidney: "Kidneys: watch function", heart: "Heart and stroke risk", lungs: "Breathing slows",
    blood: "Platelets off 7–10 days", scale: "Pain score 0–10", poss: "POSS 3–4: unsafe", pill: "Swallow whole", patch: "72-hour skin patch",
    nasal: "Nasal spray reverses", toe: "Big toe: gout flare", uric: "Blocks xanthine oxidase", excrete: "More uric acid in urine", muscle: "Stops Ca²⁺ release" };

  /* ---------- WHO ladder ---------- */
  function ladder() {
    const S = [
      { id: "step1", x: 8, top: 104, fill: "#9FD3B5", lab: "STEP 1", lines: ["non-opioid", "± adjuvant"], pain: "mild 1–3" },
      { id: "step2", x: 56, top: 72, fill: "#F2C46B", lab: "STEP 2", lines: ["weak", "opioid", "", "codeine", "tramadol"], pain: "moderate 4–6" },
      { id: "step3", x: 104, top: 40, fill: "#E98A7A", lab: "STEP 3", lines: ["strong", "opioid", "", "morphine", "oxycodone", "fentanyl"], pain: "severe 7–10" }];
    let s = T(8, 18, 8.5, 900, INK, "WHO analgesic ladder", "start");
    s += `<path d="M20 94 V34 M15 40 l5 -6 5 6" stroke="${SOFT}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + T(26, 64, 7, 700, SOFT, "pain", "start");
    S.forEach(st => {
      const h = on(st.id, "ladder"), tc = h ? "#fff" : INK;
      s += `<rect x="${st.x}" y="${st.top}" width="48" height="${138 - st.top}" rx="4" fill="${h ? HL : st.fill}" stroke="#fff" stroke-width="1.2"${hc(st.id, "ladder")}/>`;
      s += T(st.x + 24, st.top + 11, 7.5, 900, tc, st.lab);
      st.lines.forEach((l, i) => { if (l) s += T(st.x + 24, st.top + 21 + i * 9.5, 7, i < 2 ? 800 : 600, tc, l); });
      s += T(st.x + 23, st.top - 5, 7, 700, h ? HL : SOFT, st.pain);
    });
    return s;
  }

  /* ---------- pain pathway: tissue → nerve → spinal cord → brain ---------- */
  function pathway() {
    const brainH = on("brain", "chronic"), stemH = on("brainstem"), cordH = on("cord", "alpha", "descend", "chronic"),
      nerveH = on("neuro", "neuro2", "chronic"), tissueH = on("acute"), endH = on("noci");
    let s = `<path d="M14 32 C14 16 28 12 40 12 C54 12 68 16 68 32 C68 44 58 50 40 50 C24 50 14 44 14 32Z" fill="${brainH ? HL : "#F2B8C6"}" stroke="#C77A8C" stroke-width="1.2"${hc("brain", "chronic")}/>`;
    s += `<path d="M24 26 q6 -6 12 0 q6 6 12 0 M28 38 q6 -5 12 0 q6 5 12 0" stroke="${brainH ? "#fff" : "#C77A8C"}" stroke-width="1.1" fill="none"/>`;
    s += `<path d="M34 49 H48 L46 62 H37Z" fill="${stemH ? HL : "#E7A0B2"}" stroke="#C77A8C"${hc("brainstem")}/>`;
    s += `<rect x="37" y="61" width="9" height="74" rx="4.5" fill="${cordH ? HL : "#F3D9A4"}" stroke="#C9A35A"${hc("cord", "alpha", "descend", "chronic")}/>`;
    s += `<ellipse cx="41.5" cy="100" rx="2.6" ry="4" fill="${cordH ? "#fff" : "#C9A35A"}"/>`;
    if (on("descend")) s += `<path d="M29 66 V126 M25 120 l4 6 4 -6" stroke="${HL}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="dg-hl"/>`;
    s += `<path d="M46 100 C70 100 82 112 112 112" stroke="${nerveH ? HL : "#E5C04A"}" stroke-width="${nerveH ? 3.6 : 2.6}" fill="none" stroke-linecap="round"${hc("neuro", "neuro2", "chronic")}/>`;
    if (on("neuro")) s += `<path d="M86 99 l4 -6 3 7 4 -7 3 6" stroke="${HL}" stroke-width="1.6" fill="none" stroke-linejoin="round"/>`;
    if (on("lido")) s += `<rect x="86" y="97" width="7" height="22" rx="2" fill="${HL}" class="dg-hl"/>`;
    s += `<rect x="112" y="98" width="38" height="28" rx="8" fill="${tissueH ? HL : "#F6C9A8"}" stroke="#D9966B"${hc("acute")}/>`;
    s += `<path d="M112 112 l7 -6 M112 112 h8 M112 112 l7 6" stroke="${endH ? HL : "#B8862A"}" stroke-width="${endH ? 2.4 : 1.6}" stroke-linecap="round"${hc("noci")}/>`;
    s += `<path d="M135 105 l1.6 4 4.2 .3 -3.2 2.7 1 4.1 -3.6 -2.3 -3.6 2.3 1 -4.1 -3.2 -2.7 4.2 -.3Z" fill="${endH || tissueH ? "#fff" : "#D9534F"}"/>`;
    s += T(74, 26, 7.5, 800, "#9B4A5E", "brain", "start") + T(52, 59, 7, 700, "#9B4A5E", "brainstem", "start") +
      T(52, 78, 7, 700, "#8A6A20", "spinal cord", "start") + T(54, 93, 7, 600, "#8A6A20", "dorsal horn", "start") +
      T(84, 128, 7, 700, "#8A6A20", "nerve fibres") + T(131, 137, 7, 700, "#A0623A", "tissue");
    return s;
  }

  /* ---------- organs where analgesics do harm ---------- */
  function organs() {
    let s = `<path d="M50 10 Q80 4 110 10 Q128 16 130 40 L128 138 L32 138 L30 40 Q32 16 50 10Z" fill="#FBE6D8" stroke="#E2BFA8"/>`;
    s += `<path d="M80 12 V28" stroke="#D9A0A0" stroke-width="3" stroke-linecap="round"/>`;
    const lungs = on("lungs");
    [[63, 46], [97, 46]].forEach(([x, y]) => s += `<ellipse cx="${x}" cy="${y}" rx="14" ry="21" fill="${lungs ? HL : "#F4B6B6"}" opacity="${lungs ? 1 : .9}"${hc("lungs")}/>`);
    s += `<path d="M88 70 C80 65 75 61 75 56 A5.5 5.5 0 0 1 88 52 A5.5 5.5 0 0 1 101 56 C101 61 96 65 88 70Z" fill="${on("heart") ? HL : "#E07070"}" stroke="#B84A4A"${hc("heart")}/>`;
    const liv = on("liver", "cyp");
    s += `<path d="M36 76 Q60 68 84 74 Q80 90 62 94 Q42 96 36 86Z" fill="${liv ? HL : "#B8664E"}"${hc("liver", "cyp")}/>`;
    s += `<path d="M92 76 Q112 72 116 84 Q118 98 104 100 Q94 100 92 92 Q98 88 96 82Z" fill="${on("stomach") ? HL : "#F2C1A0"}" stroke="#D49A74"${hc("stomach")}/>`;
    [[56, 110], [104, 110]].forEach(([x, y]) => s += `<ellipse cx="${x}" cy="${y}" rx="7" ry="10" fill="${on("kidney") ? HL : "#D98C6F"}"${hc("kidney")}/>`);
    const bl = on("blood");
    s += `<rect x="40" y="124" width="80" height="10" rx="5" fill="#F3C7C7" stroke="${bl ? HL : "#E2A8A8"}" stroke-width="${bl ? 1.8 : 1}"/>`;
    [50, 70, 92, 110].forEach(x => s += `<ellipse cx="${x}" cy="129" rx="4" ry="3" fill="#D64545"/>`);
    [60, 81, 101].forEach(x => s += `<circle cx="${x}" cy="129" r="1.8" fill="${bl ? HL : "#B48ACB"}"${bl && x === 81 ? ' class="dg-hl"' : ""}/>`);
    return s;
  }

  /* ---------- 0–10 scale with faces ---------- */
  function scale() {
    const cols = ["#5DBB73", "#9CCB5E", "#E2C94B", "#F0A04B", "#E8733F", "#D94A3F"];
    let s = T(80, 22, 8.5, 900, INK, "How much does it hurt?");
    for (let i = 0; i < 6; i++) {
      const x = 17 + i * 25.2, y = 50, m = 6 - i * 2.4;
      s += `<circle cx="${x}" cy="${y}" r="10.5" fill="${cols[i]}" stroke="#fff" stroke-width="1"/>`;
      s += `<circle cx="${x - 3.5}" cy="${y - 2.5}" r="1.2" fill="${INK}"/><circle cx="${x + 3.5}" cy="${y - 2.5}" r="1.2" fill="${INK}"/>`;
      s += `<path d="M${x - 4.5} ${y + 4} Q${x} ${y + 4 + m * .6} ${x + 4.5} ${y + 4}" stroke="${INK}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
      s += T(x, 73, 7.5, 800, SOFT, String(i * 2));
    }
    const hl = on("scale");
    s += `<defs><linearGradient id="${it ? "s" : "o"}pg" x1="0" x2="1"><stop offset="0" stop-color="#5DBB73"/><stop offset=".5" stop-color="#E2C94B"/><stop offset="1" stop-color="#D94A3F"/></linearGradient></defs>`;
    s += `<rect x="10" y="84" width="140" height="12" rx="6" fill="url(#${it ? "s" : "o"}pg)" stroke="${hl ? HL : "none"}" stroke-width="2.2"${hc("scale")}/>`;
    for (let i = 0; i <= 10; i++) s += `<path d="M${16 + i * 12.8} 98 v4" stroke="${SOFT}" stroke-width="1"/>`;
    s += T(35, 114, 7.5, 800, "#3F8A52", "1–3 mild") + T(80, 114, 7.5, 800, "#9A7A12", "4–6 moderate") + T(129, 114, 7.5, 800, "#B03A30", "7–10 severe");
    s += T(80, 130, 7, 600, SOFT, "the patient's own report is best");
    return s;
  }

  /* ---------- POSS sedation scale ---------- */
  function poss() {
    const R = [["S", "asleep, easy to rouse", 0], ["1", "awake and alert", 0], ["2", "slightly drowsy", 0], ["3", "drifts off mid-talk", 1], ["4", "hard to rouse", 1]];
    let s = T(80, 18, 8.5, 900, INK, "Sedation scale (POSS)");
    R.forEach(([k, txt, bad], i) => {
      const y = 26 + i * 20, h = bad && on("poss");
      s += `<rect x="12" y="${y}" width="136" height="16" rx="4" fill="${h ? HL : bad ? "#F6D3CC" : "#D6EEDC"}"${h && i === 3 ? ' class="dg-hl"' : ""}/>`;
      s += `<rect x="12" y="${y}" width="18" height="16" rx="4" fill="${h ? "#B8164F" : bad ? "#D9534F" : "#4E9A63"}"/>`;
      s += T(21, y + 11.5, 8, 900, "#fff", k) + T(36, y + 11.5, 7.5, 700, h ? "#fff" : INK, txt, "start");
    });
    s += T(80, 136, 7, 700, "#B03A30", "3 or 4: hold the opioid, check breathing");
    return s;
  }

  /* ---------- routes: tablet, patch, nasal spray ---------- */
  function routes() {
    const P = on("pill"), F = on("patch"), N = on("nasal");
    let s = `<ellipse cx="30" cy="70" rx="17" ry="11" fill="${P ? HL : "#F5F1E8"}" stroke="#B9B2A2" stroke-width="1.2"${hc("pill")}/><path d="M13 70 H47" stroke="${P ? "#fff" : "#B9B2A2"}" stroke-width="1.2"/>`;
    s += `<rect x="62" y="52" width="36" height="36" rx="7" fill="${F ? HL : "#F2DCC4"}" stroke="#C9A27A" stroke-width="1.2"${hc("patch")}/><circle cx="80" cy="70" r="9" fill="none" stroke="${F ? "#fff" : "#C9A27A"}" stroke-width="1.4"/><path d="M80 64 V70 l4 3" stroke="${F ? "#fff" : "#C9A27A"}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
    s += `<rect x="126" y="44" width="8" height="18" rx="2" fill="${N ? HL : "#9CC4E4"}"/><rect x="120" y="62" width="20" height="36" rx="4" fill="${N ? HL : "#5B8FC9"}"${hc("nasal")}/>`;
    s += `<path d="M124 40 l-4 -5 M130 38 v-6 M136 40 l4 -5" stroke="${N ? HL : "#9CC4E4"}" stroke-width="1.4" stroke-linecap="round"/>`;
    s += T(30, 112, 7.5, 800, INK, "tablet") + T(80, 112, 7.5, 800, INK, "patch") + T(130, 112, 7.5, 800, INK, "nasal spray");
    s += T(30, 124, 7, 600, SOFT, "swallow whole") + T(80, 124, 7, 600, SOFT, "72 hours") + T(130, 124, 7, 600, SOFT, "4 mg");
    return s;
  }

  /* ---------- gout: the big toe ---------- */
  function foot() {
    const h = on("toe");
    let s = `<path d="M52 44 C70 38 108 42 114 60 C118 78 104 98 100 118 C97 134 84 144 70 142 C54 140 48 124 50 104 C52 84 44 62 52 44Z" fill="#F6D2B8" stroke="#D9A07A" stroke-width="1.2"/>`;
    s += `<ellipse cx="62" cy="30" rx="10" ry="13" fill="#F6D2B8" stroke="#D9A07A" stroke-width="1.2"/>`;
    [[82, 33, 6], [96, 37, 5], [107, 44, 4.5], [115, 53, 4]].forEach(([x, y, r]) => s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#F6D2B8" stroke="#D9A07A" stroke-width="1.2"/>`);
    s += `<circle cx="62" cy="48" r="${h ? 12 : 9}" fill="${h ? HL : "#EBB79A"}" opacity="${h ? .9 : 1}"${hc("toe")}/>`;
    s += `<path d="M57 44 l6 3 M60 50 l7 -2 M58 52 l3 -6 M64 43 l2 7" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>`;
    s += `<path d="M40 50 H48" stroke="${SOFT}" stroke-width="1"/>` + T(8, 47, 7.5, 800, INK, "big toe", "start") + T(8, 56, 7, 600, SOFT, "joint", "start");
    s += T(8, 112, 7, 700, "#B03A30", "red, hot,", "start") + T(8, 121, 7, 700, "#B03A30", "swollen", "start");
    s += T(150, 100, 7, 600, SOFT, "urate", "end") + T(150, 109, 7, 600, SOFT, "crystals", "end");
    return s;
  }

  /* ---------- gout: purines → uric acid ---------- */
  function uric() {
    const h = on("uric"), B = ["purines", "hypoxanthine", "xanthine", "uric acid"];
    let s = "";
    B.forEach((b, i) => {
      const y = 16 + i * 30;
      s += `<rect x="14" y="${y}" width="84" height="18" rx="9" fill="${i === 3 ? "#F2C46B" : "#FFFFFF"}" stroke="#C9B48A"/>` + T(56, y + 12, 8, 800, INK, b);
      if (i < 3) s += `<path d="M56 ${y + 19} V${y + 29} M52.5 ${y + 25} l3.5 4 3.5 -4" stroke="${SOFT}" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    });
    s += `<path d="M66 70 H104 V112 H66" stroke="${h ? HL : "#8A7A5A"}" stroke-width="1.4" fill="none"/>`;
    s += T(112, 84, 7.5, 800, h ? HL : "#6A5A3A", "xanthine", "start") + T(112, 94, 7.5, 800, h ? HL : "#6A5A3A", "oxidase", "start");
    if (h) s += `<g class="dg-hl"><path d="M98 102 l12 12 M110 102 l-12 12" stroke="${HL}" stroke-width="3" stroke-linecap="round"/></g>` + T(112, 128, 7.5, 900, HL, "allopurinol", "start");
    s += T(56, 138, 7, 600, SOFT, "crystals in joints → gout");
    return s;
  }

  /* ---------- gout: kidney tubule and probenecid ---------- */
  function excrete() {
    const h = on("excrete");
    let s = T(80, 18, 8, 900, INK, "Kidney tubule");
    s += `<rect x="14" y="56" width="132" height="16" rx="8" fill="#F7E7A6" stroke="#D2B85A"/>` + T(18, 50, 7, 700, "#8A6A20", "tubule fluid", "start");
    s += `<rect x="14" y="98" width="132" height="14" rx="7" fill="#F4B6B6" stroke="#D98080"/>` + T(18, 124, 7, 700, "#B04040", "blood", "start");
    [30, 50, 74, 98, 120].forEach(x => s += `<circle cx="${x}" cy="64" r="3" fill="${h ? HL : "#C08A2A"}"/>`);
    [62, 96].forEach(x => {
      s += `<path d="M${x} 74 V94 M${x - 3.5} 89 l3.5 5 3.5 -5" stroke="#8A6A20" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      if (h) s += `<path d="M${x - 6} 78 l12 12 M${x + 6} 78 l-12 12" stroke="${HL}" stroke-width="2.6" stroke-linecap="round" class="dg-hl"/>`;
    });
    s += `<path d="M126 64 H152 M147 60 l5 4 -5 4" stroke="${h ? HL : "#8A6A20"}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += T(146, 50, 7, 800, h ? HL : "#8A6A20", "to urine", "end") + T(108, 88, 7, 600, SOFT, "reabsorbed", "start");
    s += T(80, 136, 7, 600, SOFT, "uric acid (dots) stays in the urine");
    return s;
  }

  /* ---------- skeletal muscle fibre: dantrolene ---------- */
  function muscle() {
    const h = on("muscle");
    let s = T(80, 30, 8, 900, INK, "Skeletal muscle fibre");
    s += `<rect x="12" y="44" width="136" height="64" rx="30" fill="#E9A0A0" stroke="#C26A6A" stroke-width="1.2"/>`;
    for (let x = 30; x <= 130; x += 12) s += `<path d="M${x} 50 V102" stroke="#D27C7C" stroke-width="1"/>`;
    s += `<path d="M22 62 Q40 54 58 62 T94 62 T130 62 M22 90 Q40 82 58 90 T94 90 T130 90" stroke="#F3D9A4" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    [[44, 72], [70, 76], [96, 72], [120, 76], [56, 80], [108, 80]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="2.4" fill="${h ? "#fff" : "#4E74C8"}"/>`);
    if (h) [[50, 63], [104, 63], [76, 89]].forEach(([x, y]) => s += `<path d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" stroke="${HL}" stroke-width="2.8" stroke-linecap="round" class="dg-hl"/>`);
    s += T(80, 122, 7, 700, "#8A6A20", "sarcoplasmic reticulum (yellow)") + T(80, 132, 7, 700, "#3A5AA8", "Ca²⁺ (blue) triggers contraction");
    return s;
  }

  const SC = [
    [["ladder", "step1", "step2", "step3"], ladder, ["#F6F8F2", "#E4EBDD"]],
    [["acute", "noci", "neuro", "neuro2", "lido", "cord", "alpha", "descend", "brainstem", "brain", "chronic"], pathway, ["#F6F4FA", "#E6E1EF"]],
    [["liver", "cyp", "stomach", "kidney", "heart", "lungs", "blood"], organs, ["#FBF4F0", "#EEDDD4"]],
    [["scale"], scale, ["#F4F8FA", "#DDE8EE"]],
    [["poss"], poss, ["#F4F8FA", "#DDE8EE"]],
    [["pill", "patch", "nasal"], routes, ["#F4F7FA", "#E0E8EF"]],
    [["toe"], foot, ["#FBF6F0", "#EFE3D6"]],
    [["uric"], uric, ["#FBF8EE", "#EFE8D2"]],
    [["excrete"], excrete, ["#FBF8EE", "#EFE8D2"]],
    [["muscle"], muscle, ["#FBF2F2", "#F0DADA"]]
  ];
  BGX.DIAGRAMS.pain = item => {
    it = item || null;
    const sp = dg.spots(it)[0];
    const sc = (sp && SC.find(x => x[0].indexOf(sp) >= 0)) || SC[0];
    const inner = sc[1]();
    const label = sp ? (NAMES[sp] || it.name) : "The WHO analgesic ladder: non-opioid, weak opioid, strong opioid";
    const tag = sp ? dg.tag(80, 150, NAMES[sp] || it.name) : "";
    it = null;
    return dg.frame(inner + tag, label, sc[2]);
  };
})();
