/* BioglowRX diagram "energy" — energy balance and obesity management.
   item.spot = [scene, detail]:
     ["scale","balance"|"in"|"out"|"gain"|"loss"]        balance scale: energy in vs energy out
     ["macro","carb"|"protein"|"fat"|"alcohol"|"all"]     kcal-per-gram blocks
     ["pie","bmr"|"tef"|"pa"|"all"|"adapt"]               pie chart of daily energy expenditure
     ["formula","msj"|"hb"|"factor"|"tdee"]               equation cards
     ["act","aerobic"|"strength"|"vigorous"|"keep"]       activity icons with weekly targets
     ["label"] · ["label","density"]                      nutrition-facts snippet
     ["ladder","life"|"behav"|"meds"|"surgery"]           obesity treatment ladder        Overview (null): balance scale. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const M = (x, y, s, c, txt, a) => `<text x="${x}" y="${y}" font-family="'Chivo Mono', monospace" font-size="${s}" font-weight="700" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUTED = "#55616e";
  const H = on => on ? ' class="dg-hl"' : "";
  const F = (k, x, y, s, u) => BGX.FOOD ? BGX.FOOD(k, x, y, s, u) : "";

  const S = {
    scale: (u, sub) => {
      const tilt = sub === "gain" ? -9 : sub === "loss" ? 9 : 0;
      const onIn = sub === "in" || sub === "gain", onOut = sub === "out" || sub === "loss";
      const pan = (x, on, lab) => `<g transform="translate(${x} 0)"><path d="M-22 0 L0 -26 L22 0" stroke="#8a96a2" stroke-width="1" fill="none"/>
        <path d="M-26 0 H26 Q22 12 0 12 Q-22 12 -26 0Z" fill="${on ? HL : "#c9d2da"}"${H(on)}/>${T(0, 24, 7.5, 900, on ? HL : INK, lab)}</g>`;
      return `<path d="M80 50 L66 128 H94Z" fill="#a9b6c2"/><rect x="52" y="126" width="56" height="10" rx="4" fill="#7a8794"/>
        <g transform="rotate(${tilt} 80 50)"><rect x="18" y="47" width="124" height="5" rx="2.5" fill="#5f6b78"/>
          <g transform="translate(0 76)">${pan(36, onIn, "ENERGY IN")}${pan(124, onOut, "ENERGY OUT")}</g>
          ${F("bread", 30, 64, .45, u)}${F("cheese", 44, 64, .4, u)}
          <g transform="translate(124 60)"><circle cx="0" cy="-6" r="3.5" fill="${INK}"/><path d="M0-2 L-2 6 L-7 12 M-2 6 L3 12 M0 0 L6 3 M0 0 L-6 -1" stroke="${INK}" stroke-width="2" stroke-linecap="round" fill="none"/></g></g>
        <circle cx="80" cy="50" r="5" fill="#3b4652"/>
        ${T(80, 22, 10, 900, INK, sub === "gain" ? "in > out: weight gain" : sub === "loss" ? "out > in: weight loss" : "in = out: stable weight")}
        ${T(80, 152, 7.5, 700, MUTED, "kcal from food vs kcal burned")}`;
    },
    macro: (u, sub) => {
      const B = [["carb", "Carbohydrate", 4, "#f2c76b"], ["protein", "Protein", 4, "#e08a8a"], ["fat", "Fat", 9, "#f5d95a"], ["alcohol", "Alcohol", 7, "#b9a0e0"]];
      return `${T(80, 20, 9.5, 900, INK, "kcal in 1 gram")}` + B.map(([id, n, k, c], i) => {
        const on = sub === id || sub === "all", y = 30 + i * 30;
        return `<g${H(sub === id)}>${T(10, y + 15, 8, 800, on ? (sub === id ? HL : INK) : MUTED, n, "start")}
          ${Array.from({ length: k }, (_, j) => `<rect x="${68 + j * 7.5}" y="${y + 4}" width="6" height="16" rx="1.5" fill="${sub === id ? HL : c}" opacity="${on ? 1 : .55}"/>`).join("")}
          ${M(150, y + 16, 10, sub === id ? HL : INK, String(k), "end")}</g>`;
      }).join("") + T(80, 152, 7, 700, MUTED, "each block = 1 kcal");
    },
    pie: (u, sub) => {
      const parts = [["bmr", .65, "#7cc4b0", "Resting (BMR) ~60–70%"], ["tef", .10, "#f2c76b", "Food (TEF) ~10%"], ["pa", .25, "#8fb7e0", "Activity ~15–30%"]];
      let a0 = -Math.PI / 2, o = "";
      parts.forEach(([id, f, c]) => { const a1 = a0 + f * Math.PI * 2, on = sub === id, R = on ? 42 : 38, cx = 56, cy = 72;
        const p = (a, r) => `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
        o += `<path d="M${cx} ${cy} L${p(a0, R)} A${R} ${R} 0 ${f > .5 ? 1 : 0} 1 ${p(a1, R)}Z" fill="${on ? HL : c}" stroke="#fff" stroke-width="1.5"${H(on)}/>`; a0 = a1; });
      const leg = parts.map(([id, f, c, t], i) => `<rect x="104" y="${44 + i * 22}" width="9" height="9" rx="2" fill="${sub === id ? HL : c}"/>${T(104, 64 + i * 22, 6.8, 700, sub === id ? HL : INK, t.split(" ")[0], "start")}${T(116, 52 + i * 22, 7, 800, sub === id ? HL : MUTED, t.split(" ").slice(-1)[0], "start")}`).join("");
      return `${T(80, 20, 9.5, 900, INK, sub === "adapt" ? "After weight loss, burn falls" : "Where daily energy goes")}${o}${leg}
        ${sub === "adapt" ? `<g class="dg-hl"><path d="M100 130 H146 M140 124 L146 130 L140 136" stroke="${HL}" stroke-width="2.4" fill="none"/>${T(80, 134, 8, 800, HL, "smaller body", "end")}</g>` : ""}
        ${T(80, 152, 7, 700, MUTED, "total = TDEE (total daily energy expenditure)")}`;
    },
    formula: (u, sub) => {
      const cards = {
        msj: ["Mifflin–St Jeor", ["10 × kg + 6.25 × cm", "− 5 × age", "+ 5 men  /  − 161 women"], "recommended for adults"],
        hb: ["Harris–Benedict", ["1919 equation", "separate formulas", "for men and women"], "older: tends to overestimate"],
        factor: ["Activity factor", ["1.2 sedentary", "1.375 light · 1.55 moderate", "1.725 very · 1.9 extra"], "multiplies the BMR"],
        tdee: ["TDEE", ["BMR × activity factor", "= kcal to keep", "weight steady"], "then − 500 to lose ~0.5 kg/wk"]
      };
      const [t, lines, foot] = cards[sub] || cards.msj;
      return `<g class="dg-hl"><rect x="14" y="16" width="132" height="26" rx="13" fill="${HL}"/>${T(80, 33.5, 11, 900, "#fff", t)}</g>
        <rect x="14" y="50" width="132" height="70" rx="10" fill="#fff" stroke="#a9b6c2"/>
        ${lines.map((l, i) => M(80, 72 + i * 18, l.length > 22 ? 7 : 8.5, INK, l)).join("")}
        ${T(80, 140, 8, 700, MUTED, foot)}`;
    },
    act: (u, sub) => {
      const fig = (x, y, on, pose) => { const c = on ? HL : INK;
        const body = pose === "run" ? `<path d="M0-4 L-3 8 L-10 16 M-3 8 L5 13 L4 20 M0 0 L8 2 L12-4 M0 0 L-8 4" />`
          : pose === "lift" ? `<path d="M0-4 V8 L-6 20 M0 8 L6 20 M0 0 L-10-8 M0 0 L10-8"/><path d="M-16-8 H16" stroke-width="2.6"/><rect x="-19" y="-13" width="4" height="10" fill="${c}"/><rect x="15" y="-13" width="4" height="10" fill="${c}"/>`
          : `<path d="M0-4 L0 8 L-5 20 M0 8 L4 20 M0 0 L6 6 M0 0 L-5 6"/>`;
        return `<g transform="translate(${x} ${y})"${H(on)} stroke="${c}" stroke-width="2.2" stroke-linecap="round" fill="none"><circle cx="0" cy="-10" r="4.5" fill="${c}" stroke="none"/>${body}</g>`; };
      const R = [["aerobic", "walk", "150–300 min", "moderate / week"], ["vigorous", "run", "75–150 min", "vigorous / week"], ["strength", "lift", "2+ days", "muscle-strengthening"]];
      return R.map(([id, pose, a, b], i) => { const on = sub === id || (sub === "keep" && id === "aerobic"), y = 34 + i * 40;
        return `${fig(28, y, on, pose)}<rect x="50" y="${y - 16}" width="98" height="32" rx="8" fill="${on ? "#ffe3ec" : "#fff"}" stroke="${on ? HL : "#c9d2da"}"/>
          ${T(99, y - 2, 9.5, 900, on ? HL : INK, a)}${T(99, y + 10, 7, 700, MUTED, b)}`; }).join("")
        + (sub === "keep" ? T(80, 154, 7.5, 800, HL, "keeping weight off: often 200–300 min/wk") : T(80, 154, 7, 700, MUTED, "US guidelines for adults"));
    },
    label: (u, sub) => {
      const rows = [["Total Fat", "10 g"], ["Total Carbohydrate", "30 g"], ["Protein", "8 g"]];
      return `<rect x="22" y="12" width="116" height="140" rx="3" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
        ${T(28, 30, 12, 900, INK, "Nutrition Facts", "start")}<path d="M28 36 H132" stroke="${INK}" stroke-width="5"/>
        ${T(28, 48, 7.5, 700, INK, "Serving size 1 bar (50 g)", "start")}<path d="M28 54 H132" stroke="${INK}" stroke-width="2.5"/>
        <g${H(sub !== "density")}>${T(28, 72, 11, 900, sub === "density" ? INK : HL, "Calories", "start")}${M(132, 73, 15, sub === "density" ? INK : HL, "242", "end")}</g>
        <path d="M28 80 H132" stroke="${INK}" stroke-width="3"/>
        ${rows.map(([n, g], i) => `${T(28, 96 + i * 16, 8, 800, INK, n, "start")}${M(132, 96 + i * 16, 8, INK, g, "end")}<path d="M28 ${101 + i * 16} H132" stroke="#c9d2da"/>`).join("")}
        ${sub === "density" ? `<g class="dg-hl"><rect x="26" y="135" width="108" height="15" rx="7.5" fill="${HL}"/>${T(80, 145.5, 7, 900, "#fff", "242 kcal ÷ 50 g = 4.8 kcal/g")}</g>`
          : T(80, 146, 7, 700, MUTED, "10×9 + 30×4 + 8×4 = 242")}`;
    },
    ladder: (u, sub) => {
      const R = [["surgery", "Bariatric surgery", "BMI ≥40, or ≥35 + condition"], ["meds", "Medicines", "BMI ≥30, or ≥27 + condition"], ["behav", "Behaviour support", "self-monitoring, goals"], ["life", "Lifestyle", "diet + activity: for everyone"]];
      return R.map(([id, t, s], i) => { const on = sub === id, y = 16 + i * 34, w = 118 + i * 10;
        return `<g${H(on)}><rect x="${80 - w / 2}" y="${y}" width="${w}" height="30" rx="6" fill="${on ? HL : ["#f08a7a", "#f2c76b", "#8fb7e0", "#7cc4b0"][i]}"/>
          ${T(80, y + 13, 8.5, 900, on ? "#fff" : INK, t)}${T(80, y + 24, 6.8, 700, on ? "#fff" : INK, s)}</g>`; }).join("")
        + T(80, 154, 7, 700, MUTED, "each step adds to the ones below");
    }
  };
  const LABEL = { scale: "Energy balance: energy in versus energy out", macro: "Calories per gram: carbohydrate 4, protein 4, fat 9, alcohol 7",
    pie: "Parts of daily energy expenditure", formula: "Estimating energy needs", act: "Physical activity guidelines", label: "Nutrition facts label", ladder: "Obesity treatment ladder" };

  BGX.DIAGRAMS.energy = item => {
    const sp = dg.spots(item), scene = sp[0], sub = sp[1], u = dg.uid();
    if (!item || !S[scene]) return dg.frame(S.scale(u, "balance"), LABEL.scale, ["#FBF6EC", "#F1E4CC"]);
    return dg.frame(S[scene](u, sub), LABEL[scene] + (sub ? ": " + sub : ""));
  };
})();
