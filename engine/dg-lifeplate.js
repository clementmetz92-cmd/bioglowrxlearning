/* BioglowRX diagram "lifeplate" — nutrition across the life cycle.
   item.spot = [scene, detail]:
     ["plate","preg"|"lact"|"infant"|"child"|"teen"|"older"]   a plate for that life stage, with its key nutrient badge (item.badge)
     ["gain","under"|"normal"|"over"|"obese"]                  IOM pregnancy weight-gain ranges by pre-pregnancy BMI
     ["growth","normal"|"85"|"95"|"under"]                     BMI-for-age percentile curves
     ["timeline","birth"|"vitd"|"iron"|"solids"|"allergen"|"honey"|"milk"]   infant feeding timeline, 0–24 months
   Overview (null): four small plates, one per life stage. Needs dg-foods.js (BGX.FOOD) for food drawings. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUTED = "#55616e";
  const H = on => on ? ' class="dg-hl"' : "";
  const F = (k, x, y, s, u) => BGX.FOOD ? BGX.FOOD(k, x, y, s, u) : "";

  const FOODS = {
    preg: ["greens", "lentils", "milk", "orange"], lact: ["fish", "bread", "milk", "orange"], infant: ["banana", "sweetpotato", "egg", "avocado"],
    child: ["milk", "broccoli", "bread", "strawberry"], teen: ["milk", "cheese", "steak", "beans"], older: ["fish", "milk", "egg", "greens"]
  };
  const STAGE = { preg: "Pregnancy", lact: "Breastfeeding", infant: "Infant", child: "Child", teen: "Teen", older: "Older adult" };

  function plate(u, stage, cx, cy, R, on) {
    const f = FOODS[stage] || FOODS.child, s = R / 62;
    const pos = [[-.42, -.32], [.38, -.34], [-.36, .4], [.4, .36]];
    return `<circle cx="${cx}" cy="${cy + 3 * s}" r="${R}" fill="#000" opacity=".08"/>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${on ? HL : "#c9d2da"}" stroke-width="${on ? 3 : 1.4}"${H(on)}/>
      <circle cx="${cx}" cy="${cy}" r="${R * .76}" fill="none" stroke="#e6ebef"/>
      ${f.map((k, i) => F(k, (cx + pos[i][0] * R).toFixed(1), (cy + pos[i][1] * R).toFixed(1), (s * .78).toFixed(2), u)).join("")}`;
  }

  const S = {
    plate: (u, sub, it) => {
      const badge = (it && it.badge) || "";
      return `${plate(u, sub, 80, 76, 54, true)}
        ${T(80, 18, 10, 900, INK, STAGE[sub] || "")}
        ${badge ? `<g class="dg-hl"><rect x="${80 - Math.max(30, badge.length * 3.3 + 10)}" y="134" width="${2 * Math.max(30, badge.length * 3.3 + 10)}" height="17" rx="8.5" fill="${HL}"/>${T(80, 145.5, 8, 900, "#fff", badge)}</g>` : ""}`;
    },
    gain: (u, sub) => {
      const R = [["under", "BMI <18.5", 12.5, 18], ["normal", "18.5–24.9", 11.5, 16], ["over", "25–29.9", 7, 11.5], ["obese", "≥30", 5, 9]];
      const x = kg => (58 + kg * 3.4).toFixed(1);
      return `${T(80, 18, 9, 900, INK, "Pregnancy weight gain (kg)")}
        ${[0, 5, 10, 15, 20].map(k => `<path d="M${x(k)} 30 V126" stroke="#dfe6ec"/>${T(x(k), 136, 7, 700, MUTED, String(k))}`).join("")}
        ${R.map(([id, l, a, b], i) => { const on = sub === id, y = 34 + i * 23;
          return `${T(54, y + 11, 7.2, 800, on ? HL : INK, l, "end")}<rect x="${x(a)}" y="${y}" width="${(x(b) - x(a)).toFixed(1)}" height="15" rx="4" fill="${on ? HL : "#8fb7e0"}"${H(on)}/>
            ${T((+x(b) + 3).toFixed(1), y + 10.5, 7.5, 800, on ? HL : INK, `${a}–${b}`, "start")}`; }).join("")}
        ${T(80, 151, 7, 700, MUTED, "IOM 2009, single baby, by pre-pregnancy BMI")}`;
    },
    growth: (u, sub) => {
      const X0 = 22, X1 = 130, Y = (p, t) => { const base = { 5: 118, 50: 100, 85: 86, 95: 68 }[p]; return (base - t * 14 + Math.sin(t * 3) * 3).toFixed(1); };
      const curve = p => { let d = ""; for (let i = 0; i <= 20; i++) { const t = i / 20; d += (i ? " L" : "M") + (X0 + t * (X1 - X0)).toFixed(1) + " " + Y(p, t); } return d; };
      const zone = (lo, hi, c, on) => { let d = ""; for (let i = 0; i <= 20; i++) { const t = i / 20; d += (i ? " L" : "M") + (X0 + t * (X1 - X0)).toFixed(1) + " " + Y(hi, t); }
        for (let i = 20; i >= 0; i--) { const t = i / 20; d += " L" + (X0 + t * (X1 - X0)).toFixed(1) + " " + (lo ? Y(lo, t) : 126); } return `<path d="${d}Z" fill="${on ? HL : c}" opacity="${on ? .55 : .5}"${H(on)}/>`; };
      return `${T(80, 18, 9, 900, INK, "BMI-for-age percentiles (2–20 y)")}
        <path d="M${X0} 30 V126 H${X1}" stroke="#7a8794" fill="none"/>
        ${zone(85, 95, "#f2c76b", sub === "85")}${zone(5, 85, "#7cc4b0", sub === "normal")}${zone(0, 5, "#8fb7e0", sub === "under")}
        ${(() => { let d = `M${X0} 30 H${X1}`; for (let i = 20; i >= 0; i--) { const t = i / 20; d += " L" + (X0 + t * (X1 - X0)).toFixed(1) + " " + Y(95, t); } return `<path d="${d}Z" fill="${sub === "95" ? HL : "#f08a7a"}" opacity=".5"${H(sub === "95")}/>`; })()}
        ${[95, 85, 5].map(p => `<path d="${curve(p)}" stroke="${INK}" stroke-width="1" fill="none"/>${T(X1 + 2, (+Y(p, 1) + 3).toFixed(1), 7, 800, INK, p + "th", "start")}`).join("")}
        ${T(60, 44, 7, 800, INK, "obesity ≥95th")}${T(64, ((+Y(85, .25) + +Y(95, .25)) / 2 + 3).toFixed(1), 7, 800, INK, "overweight 85–94th")}${T(70, (+Y(50, .4) + 4).toFixed(1), 7, 800, INK, "healthy 5th–84th")}
        ${T(76, 138, 7, 700, MUTED, "age →")}${T(80, 152, 7, 700, MUTED, "vs children of the same age and sex")}`;
    },
    timeline: (u, sub) => {
      const x = m => (16 + m * 5.6).toFixed(1);
      const bars = [["birth", "Breast milk or formula as main drink", 0, 12, "#f6c1d0"], ["vitd", "Vitamin D 400 IU if breastfed", 0, 12, "#f2c76b"],
        ["iron", "Iron-rich foods", 6, 24, "#e08a8a"], ["solids", "Solid foods from about 6 m", 6, 24, "#7cc4b0"],
        ["honey", "No honey before 12 m", 0, 12, "#aab4be"], ["milk", "Cow's milk as a drink from 12 m", 12, 24, "#8fb7e0"]];
      return `${T(80, 17, 9, 900, INK, "Infant feeding: 0–24 months")}
        ${[0, 6, 12, 24].map(m => `<path d="M${x(m)} 24 V130" stroke="#c9d2da" stroke-dasharray="${m ? "2 2" : ""}"/>${T(x(m), 140, 7.5, 800, INK, m + " m")}`).join("")}
        ${bars.map(([id, l, a, b, c], i) => { const on = sub === id || (sub === "allergen" && id === "solids"), y = 32 + i * 17;
          return `${T(16, y, 7, 800, on ? HL : INK, l, "start")}<rect x="${x(a)}" y="${y + 3}" width="${(x(b) - x(a)).toFixed(1)}" height="6" rx="3" fill="${on ? HL : c}"${H(on)}/>`; }).join("")}
        ${sub === "allergen" ? T(80, 153, 7.5, 900, HL, "peanut and egg early, with first foods") : T(80, 153, 7, 700, MUTED, "exclusive breastfeeding about 6 months")}`;
    }
  };
  const LABEL = { plate: "A plate for this life stage", gain: "Recommended weight gain in pregnancy", growth: "Growth chart: BMI-for-age percentiles", timeline: "Infant feeding timeline" };

  BGX.DIAGRAMS.lifeplate = item => {
    const sp = dg.spots(item), scene = sp[0], sub = sp[1], u = dg.uid();
    if (!item || !S[scene]) {
      const P = [["preg", 44, 46], ["infant", 116, 46], ["teen", 44, 116], ["older", 116, 116]];
      return dg.frame(P.map(([s, x, y]) => plate(u, s, x, y, 28, false) + T(x, y + 39, 7.5, 900, INK, STAGE[s])).join(""), "A plate for every life stage: pregnancy, infancy, adolescence, older age", ["#F3F8EE", "#DCEBD2"]);
    }
    return dg.frame(S[scene](u, sub, item), LABEL[scene] + (sub ? ": " + sub : ""), scene === "plate" ? ["#F3F8EE", "#DCEBD2"] : null);
  };
})();
