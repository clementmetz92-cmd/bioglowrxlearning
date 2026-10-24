/* BioglowRX diagram "assess" — nutrition assessment in primary care.
   item.spot = [scene, detail]:
     ["scale"] · ["scale","loss"] · ["scale","ibw"]         bathroom scale and height rod
     ["bmi","under"|"normal"|"over"|"obese"|"all"]           BMI chart band
     ["waist"] · ["waist","hip"]                             tape measure at the waist / hips
     ["tube", "<label>"]  (item.ref = reference range)       blood tube and result card
     ["body","hair"|"mouth"|"nails"|"muscle"|"oedema"]       physical-exam clues
     ["recall"] · ["ffq"] · ["diary"]                        diet history methods
     ["abcd","A"|"B"|"C"|"D"]                                the ABCD panel (overview: null)
     ["screen","MUST"|"MNA"] · ["rd"]                        screening tools and dietitian referral */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const M = (x, y, s, c, txt, a) => `<text x="${x}" y="${y}" font-family="'Chivo Mono', monospace" font-size="${s}" font-weight="700" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUTED = "#55616e";
  const H = on => on ? ' class="dg-hl"' : "";

  const S = {
    /* ---------- scale and height rod ---------- */
    scale: (it, sub) => {
      const rod = `<rect x="18" y="22" width="7" height="112" rx="2" fill="#dfe6ec" stroke="#a9b6c2"/>
        ${Array.from({ length: 11 }, (_, i) => `<path d="M25 ${30 + i * 10} h${i % 2 ? 4 : 7}" stroke="${MUTED}" stroke-width="1"/>`).join("")}
        <rect x="12" y="18" width="30" height="6" rx="2" fill="#5f6b78"/>${T(30, 14, 7, 700, MUTED, "height")}`;
      const sc = `<rect x="48" y="112" width="96" height="30" rx="9" fill="#eef2f5" stroke="#9fb3c4"/>
        <rect x="74" y="117" width="44" height="15" rx="3" fill="#13202b"${H(!sub)}/>${M(96, 128, 8.5, "#7CFFB2", sub === "loss" ? "61.2 kg" : "68.0 kg")}
        ${T(96, 152, 7, 700, MUTED, "shoes off, light clothes")}`;
      let top;
      if (sub === "loss") {
        const pts = [[56, 40], [76, 44], [96, 56], [116, 70], [136, 82]];
        top = `<path d="M52 30 V96 H146" stroke="#a9b6c2" stroke-width="1.2" fill="none"/>
          <path d="M${pts.map(p => p.join(" ")).join(" L")}" stroke="${HL}" stroke-width="3" fill="none" stroke-linecap="round" class="dg-hl"/>
          ${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${HL}"/>`).join("")}
          ${T(100, 26, 8, 800, INK, "weight over 6 months")}${T(110, 108, 7, 700, MUTED, "month 0 → 6")}
          ${dg.tag(118, 46, "−10%")}`;
      } else if (sub === "ibw") {
        top = `<g class="dg-hl"><rect x="56" y="34" width="84" height="44" rx="10" fill="${HL}"/>
          ${T(98, 52, 9, 800, "#fff", "Hamwi rule")}${T(98, 68, 7.5, 700, "#fff", "100 lb + 5 lb/inch")}</g>
          ${T(98, 92, 7, 700, MUTED, "women; men 106 + 6 lb/inch")}${T(98, 102, 7, 700, MUTED, "over 5 ft (60 in)")}`;
      } else {
        top = `<circle cx="96" cy="38" r="11" fill="#f2c7a5"/><path d="M80 98 Q80 56 96 54 Q112 56 112 98Z" fill="#7cc4b0"/>
          <path d="M88 98 V110 M104 98 V110" stroke="#2f6fb8" stroke-width="7" stroke-linecap="round"/>
          <path d="M42 27 H86" stroke="${MUTED}" stroke-width="1" stroke-dasharray="2 2"/>`;
      }
      return rod + top + sc;
    },

    /* ---------- BMI chart band ---------- */
    bmi: (it, sub) => {
      const x = b => (12 + (b - 16) * 136 / 26).toFixed(1);
      const seg = [["under", 16, 18.5, "#8fb7e0"], ["normal", 18.5, 25, "#7cc4b0"], ["over", 25, 30, "#f2c76b"], ["obese", 30, 42, "#f08a7a"]];
      const bar = seg.map(([id, a, b, c]) => { const on = sub === id || sub === "all";
        return `<rect x="${x(a)}" y="58" width="${(x(b) - x(a)).toFixed(1)}" height="22" fill="${sub === id ? HL : c}"${H(sub === id)}${on && sub === "all" ? ' stroke="#1B2430" stroke-width="1.2"' : ""}/>`; }).join("");
      const ticks = [18.5, 25, 30, 35, 40].map(b => `<path d="M${x(b)} 80 v5" stroke="${INK}" stroke-width="1"/>${M(x(b), 94, 7.5, INK, String(b))}`).join("");
      const cls = sub === "obese" ? [["I", 32.5], ["II", 37.5], ["III", 41]].map(([t, b]) => `${T(x(b), 52, 8, 800, HL, t)}`).join("") + `<path d="M${x(35)} 58 v22 M${x(40)} 58 v22" stroke="#fff" stroke-width="1.4"/>` : `<path d="M${x(35)} 58 v22 M${x(40)} 58 v22" stroke="#fff" stroke-width="1" opacity=".7"/>`;
      const leg = [["#8fb7e0", "Under <18.5", 14, 112], ["#7cc4b0", "Healthy 18.5–24.9", 82, 112], ["#f2c76b", "Over 25–29.9", 14, 128], ["#f08a7a", "Obesity ≥30", 82, 128]]
        .map(([c, t, lx, ly]) => `<rect x="${lx}" y="${ly - 7}" width="8" height="8" rx="2" fill="${c}"/>${T(lx + 11, ly, 7.5, 700, INK, t, "start")}`).join("");
      return `${T(80, 28, 12, 900, INK, "BMI = kg ÷ m²")}${T(80, 42, 7.5, 600, MUTED, "adults, kg/m²")}${bar}<rect x="12" y="58" width="136" height="22" fill="none" stroke="#9fb3c4"/>${cls}${ticks}${leg}
        ${T(80, 148, 7, 600, MUTED, "obesity classes: I 30 · II 35 · III 40+")}`;
    },

    /* ---------- tape measure ---------- */
    waist: (it, sub) => {
      const hip = sub === "hip";
      const torso = `<path d="M52 18 Q80 12 108 18 L112 46 Q104 66 106 80 Q118 98 116 118 L112 146 H48 L44 118 Q42 98 54 80 Q56 66 48 46Z" fill="#ffe2cf" stroke="#d9a98c"/>
        <path d="M80 92 v3" stroke="#d9a98c" stroke-width="2" stroke-linecap="round"/>
        <path d="M58 100 Q62 94 66 98 M102 98 Q98 94 94 100" stroke="#c9967a" stroke-width="1.2" fill="none"/>`;
      const tape = (y, rx, on) => `<g${H(on)}><ellipse cx="80" cy="${y}" rx="${rx}" ry="6" fill="none" stroke="${on ? HL : "#e8c34a"}" stroke-width="${on ? 4 : 3}"/>
        ${Array.from({ length: 9 }, (_, i) => `<path d="M${80 - rx + 8 + i * (rx * 2 - 16) / 8} ${y + 4} v3" stroke="${on ? "#fff" : "#8a6d10"}" stroke-width="1"/>`).join("")}</g>`;
      return `${torso}${tape(80, 27, !hip)}${tape(112, 37, hip)}
        ${T(140, 76, 7.5, 800, hip ? MUTED : HL, "waist")}${T(144, 116, 7.5, 800, hip ? HL : MUTED, "hips")}
        <rect x="8" y="128" width="144" height="26" rx="8" fill="#fff" opacity=".92"/>
        ${hip ? T(80, 139, 8, 800, INK, "ratio = waist ÷ hips") + T(80, 150, 7, 700, MUTED, "high: ≥0.90 men · ≥0.85 women")
              : T(80, 139, 8, 800, INK, "at the top of the hip bones") + T(80, 150, 7, 700, MUTED, "high: >102 cm men · >88 cm women")}`;
    },

    /* ---------- blood tube ---------- */
    tube: (it, sub) => `
      <defs><linearGradient id="${it._u}bl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9e1b24"/><stop offset=".5" stop-color="#d63a44"/><stop offset="1" stop-color="#8a1820"/></linearGradient></defs>
      <rect x="22" y="22" width="26" height="16" rx="3" fill="#7a3fb0"/>
      <path d="M24 38 H46 V128 Q46 138 35 138 Q24 138 24 128Z" fill="#eef4f8" stroke="#9fb3c4"/>
      <path d="M25.5 70 H44.5 V128 Q44.5 136.5 35 136.5 Q25.5 136.5 25.5 128Z" fill="${sub ? `url(#${it._u}bl)` : "#d63a44"}"${H(!!sub)}/>
      <rect x="24" y="50" width="22" height="14" fill="#fff" stroke="#c9d2da"/>${T(35, 59.5, 5.5, 800, INK, "SERUM")}
      <rect x="58" y="34" width="94" height="72" rx="10" fill="#fff" stroke="#a9b6c2"/>
      ${T(105, 56, sub && sub.length > 9 ? 9.5 : 12, 900, INK, sub || "Blood test")}
      <path d="M68 66 H142" stroke="#dfe6ec"/>
      ${T(105, 80, 7.5, 700, MUTED, "reference range")}${M(105, 94, (it.ref || "").length > 14 ? 6.6 : 8, HL, it.ref || "lab-specific")}
      ${T(104, 126, 7, 700, MUTED, "read with the whole picture:")}${T(104, 137, 7, 700, MUTED, "inflammation, fluids, drugs")}`,

    /* ---------- physical exam ---------- */
    body: (it, sub) => {
      const on = id => sub === id;
      const sk = "#ffe2cf", ln = "#d9a98c";
      const names = { hair: "Hair", mouth: "Mouth", nails: "Nails", muscle: "Muscle", oedema: "Oedema" };
      return `<path d="M50 70 Q50 60 66 58 H94 Q110 60 110 70 L112 112 H48Z" fill="#9cc7e8" stroke="#6d9cc2"/>
        <path d="M58 112 L56 140 M102 112 L104 140" stroke="#5f7da0" stroke-width="12" stroke-linecap="round"/>
        <g${H(on("oedema"))}><ellipse cx="56" cy="144" rx="${on("oedema") ? 10 : 7}" ry="${on("oedema") ? 7 : 5}" fill="${on("oedema") ? HL : sk}" stroke="${ln}"/><ellipse cx="104" cy="144" rx="${on("oedema") ? 10 : 7}" ry="${on("oedema") ? 7 : 5}" fill="${on("oedema") ? HL : sk}" stroke="${ln}"/></g>
        <path d="M110 70 Q124 76 124 96 L128 108" stroke="${on("muscle") ? HL : "#9cc7e8"}" stroke-width="10" fill="none" stroke-linecap="round"${H(on("muscle"))}/>
        <g transform="translate(130 114)"><circle r="7" fill="${sk}" stroke="${ln}"/>${[-5, -1.5, 2, 5.5].map(dx => `<rect x="${dx - 1.4}" y="5" width="2.8" height="7" rx="1.4" fill="${sk}" stroke="${ln}" stroke-width=".6"/><ellipse cx="${dx}" cy="11" rx="1.6" ry="1.2" fill="${on("nails") ? HL : "#f6d2c4"}"${H(on("nails"))}/>`).join("")}</g>
        <circle cx="80" cy="36" r="20" fill="${sk}" stroke="${ln}"/>
        <path d="M60 32 Q62 12 80 12 Q98 12 100 32 Q94 20 80 20 Q66 20 60 32Z" fill="${on("hair") ? HL : "#6b4226"}"${H(on("hair"))}/>
        ${on("muscle") ? `<path d="M63 34 q2 4 0 8 M97 34 q-2 4 0 8" stroke="${HL}" stroke-width="2.4" fill="none" class="dg-hl"/>` : ""}
        <circle cx="73" cy="36" r="1.8" fill="${INK}"/><circle cx="87" cy="36" r="1.8" fill="${INK}"/>
        <path d="M73 46 Q80 ${on("mouth") ? 52 : 50} 87 46" stroke="${on("mouth") ? HL : "#b5534a"}" stroke-width="${on("mouth") ? 3 : 1.8}" fill="none" stroke-linecap="round"${H(on("mouth"))}/>
        ${sub && names[sub] ? dg.tag(132, 20, names[sub]) : ""}`;
    },

    /* ---------- diet history ---------- */
    recall: () => `<ellipse cx="66" cy="96" rx="44" ry="34" fill="#fff" stroke="#c9d2da"/><ellipse cx="66" cy="96" rx="32" ry="24" fill="none" stroke="#e3e8ec"/>
      ${BGX.FOOD ? BGX.FOOD("bread", 54, 92, .6, "rc") + BGX.FOOD("egg", 76, 100, .6, "rc") + BGX.FOOD("broccoli", 66, 112, .5, "rc") : ""}
      <g class="dg-hl"><circle cx="122" cy="46" r="24" fill="#fff" stroke="${HL}" stroke-width="3"/>
        <path d="M122 46 V30 M122 46 L132 52" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>${T(122, 66, 7.5, 900, HL, "24 h")}</g>
      ${T(48, 30, 8, 800, INK, "\"Since you woke")}${T(48, 41, 8, 800, INK, "up yesterday…\"")}
      ${T(80, 148, 7.5, 700, MUTED, "interviewer asks, one day only")}`,
    ffq: () => {
      const rows = ["Milk", "Fruit", "Fried food", "Soda"], cols = ["day", "wk", "mo"];
      return `<rect x="14" y="20" width="132" height="116" rx="8" fill="#fff" stroke="#a9b6c2"/>${T(80, 36, 9, 900, INK, "How often do you eat…?")}
        ${cols.map((c, j) => T(84 + j * 22, 52, 7, 800, MUTED, c)).join("")}
        ${rows.map((r, i) => `${T(22, 70 + i * 18, 8, 700, INK, r, "start")}${cols.map((c, j) => { const tick = (i + j) % 3 === 0;
          return `<rect x="${78 + j * 22}" y="${62 + i * 18}" width="11" height="11" rx="2" fill="${tick ? HL : "#fff"}" stroke="#9fb3c4"${H(tick)}/>${tick ? `<path d="M${80.5 + j * 22} ${68 + i * 18} l2.5 2.5 l4.5 -5" stroke="#fff" stroke-width="1.6" fill="none"/>` : ""}`; }).join("")}`).join("")}
        ${T(80, 150, 7.5, 700, MUTED, "usual intake over months")}`;
    },
    diary: () => `<rect x="20" y="22" width="120" height="110" rx="6" fill="#fff8e6" stroke="#c9a46a"/><path d="M80 22 V132" stroke="#c9a46a" stroke-width="1.4"/>
      ${["Mon", "Tue", "Wed"].map((d, i) => `${T(28, 42 + i * 30, 8, 900, i === 0 ? HL : INK, d, "start")}<path d="M28 ${48 + i * 30} H74 M28 ${56 + i * 30} H66" stroke="#d9c49a" stroke-width="1.2"/>`).join("")}
      ${["8:00 oats", "13:00 soup", "16:00 apple", "19:30 pasta"].map((t, i) => T(86, 44 + i * 18, 7.5, 700, INK, t, "start")).join("")}
      <g class="dg-hl"><path d="M112 126 L132 106 L138 112 L118 132 L110 134Z" fill="${HL}"/></g>
      ${T(80, 148, 7.5, 700, MUTED, "written as eaten, 3–7 days")}`,

    /* ---------- ABCD panel ---------- */
    abcd: (it, sub) => {
      const P = [["A", "Anthropometric", "height, weight, waist", 12, 16, "#cfe3f7"], ["B", "Biochemical", "blood tests", 82, 16, "#f9d4d0"],
        ["C", "Clinical", "history, exam", 12, 86, "#d6efd9"], ["D", "Dietary", "what they eat", 82, 86, "#fbe6bf"]];
      return P.map(([L, n, d, x, y, c]) => { const on = sub === L;
        return `<g${H(on)}><rect x="${x}" y="${y}" width="66" height="60" rx="10" fill="${on ? HL : c}"/>
          ${T(x + 33, y + 28, 22, 900, on ? "#fff" : INK, L)}${T(x + 33, y + 42, 7.5, 800, on ? "#fff" : INK, n)}${T(x + 33, y + 53, 7, 600, on ? "#fff" : MUTED, d)}</g>`; }).join("");
    },

    /* ---------- screening and referral ---------- */
    screen: (it, sub) => {
      const lines = sub === "MNA" ? ["Eating less?", "Weight loss?", "Mobility", "Stress or illness", "Memory / mood", "BMI or calf"] : ["1  BMI score", "2  Weight-loss score", "3  Acute illness", "4  Add up", "5  Act on it"];
      return `<rect x="26" y="18" width="108" height="130" rx="8" fill="#c9a46a"/><rect x="32" y="28" width="96" height="114" rx="4" fill="#fff"/>
        <rect x="62" y="12" width="36" height="12" rx="4" fill="#5f6b78"/>
        <g class="dg-hl"><rect x="44" y="34" width="72" height="17" rx="8" fill="${HL}"/>${T(80, 46.5, 10, 900, "#fff", sub || "Screen")}</g>
        ${lines.map((l, i) => T(40, 64 + i * 13, 7.5, 700, INK, l, "start")).join("")}
        ${T(80, 140, 7, 700, MUTED, sub === "MNA" ? "for age 65+" : "adults, any setting")}`;
    },
    rd: () => `<circle cx="52" cy="58" r="16" fill="#f2c7a5"/><path d="M38 52 Q40 38 54 40 Q66 42 66 54 Q60 46 52 46 Q44 46 38 52Z" fill="#3b2a1e"/>
      <path d="M26 128 Q26 82 52 80 Q78 82 78 128Z" fill="#fff" stroke="#a9b6c2"/><path d="M52 80 V128" stroke="#dfe6ec"/>
      <rect x="40" y="96" width="24" height="30" rx="3" fill="#c9a46a"/><rect x="43" y="100" width="18" height="23" fill="#fff"/>
      <g class="dg-hl"><path d="M86 26 H146 Q152 26 152 32 V62 Q152 68 146 68 H102 L92 78 L94 68 H86 Q80 68 80 62 V32 Q80 26 86 26Z" fill="${HL}"/>
        ${T(116, 45, 10, 900, "#fff", "MNT")}${T(116, 58, 7, 700, "#fff", "diet as treatment")}</g>
      ${BGX.FOOD ? BGX.FOOD("orange", 118, 104, .8, "rd") : ""}
      ${T(80, 148, 7.5, 700, MUTED, "registered dietitian (RDN)")}`
  };
  const LABEL = { scale: "Measuring height and weight", bmi: "BMI chart: kg divided by height in metres squared", waist: "Measuring waist and hips with a tape",
    tube: "A blood test result", body: "Physical-exam clues to malnutrition", recall: "24-hour recall", ffq: "Food frequency questionnaire",
    diary: "Food record or diary", abcd: "ABCD of nutrition assessment", screen: "A malnutrition screening tool", rd: "Referral to a registered dietitian" };

  BGX.DIAGRAMS.assess = item => {
    const sp = dg.spots(item), scene = sp[0], sub = sp[1];
    if (!item || !S[scene]) return dg.frame(S.abcd({}, null), "ABCD of nutrition assessment: anthropometric, biochemical, clinical, dietary", ["#F4F8FA", "#DDE8EE"]);
    const ctx = Object.assign({ _u: dg.uid() }, item);
    return dg.frame(S[scene](ctx, sub), LABEL[scene] + (sub && scene !== "abcd" ? ": " + sub : ""));
  };
})();
