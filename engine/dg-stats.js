/* BioglowRX diagram "stats" — introductory statistics for health sciences.
   Variables:   qual (bar chart) discrete (dot plot) continuous (histogram) iv dv (scatter axes)
   Levels:      nominal ordinal interval ratio (ladder)
   Sampling:    srs strat cluster system conv (population grid)   Design: obs rct blind
   Centre:      mean median mode skew (skewed histogram)
   Spread:      range iqr (box plot)   sd normal z (bell curve)
   Probability: scale comp add mult
   Overview (null): bell curve with the 68–95–99.7 bands. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#3F4A56", MUTED = "#6B7682", BAR = "#7FB3C9", BAR2 = "#A9CBD9";
  let it = null;
  const on = id => dg.is(it, id), c = id => dg.cls(it, id);
  const has = (...ids) => ids.some(on);
  const pill = (x, y, txt, w) => { const ww = w || Math.max(30, txt.length * 4.6 + 10); return `<rect x="${x - ww / 2}" y="${y - 7}" width="${ww}" height="12" rx="6" fill="#fff" opacity=".92"/>` + T(x, y + 2, 7, 800, INK, txt); };

  /* ---------- bell curve ---------- */
  const BX = v => 80 + v * 20, BASE = 100, BY = v => BASE - 70 * Math.exp(-v * v / 2);
  const curve = (a, b) => { let p = `M${BX(a).toFixed(1)} ${BASE}`; for (let v = a; v <= b + 1e-9; v += 0.1) p += ` L${BX(v).toFixed(1)} ${BY(v).toFixed(1)}`; return p + ` L${BX(b).toFixed(1)} ${BASE} Z`; };
  const line = () => { let p = ""; for (let v = -3.4; v <= 3.4 + 1e-9; v += 0.1) p += (p ? " L" : "M") + `${BX(v).toFixed(1)} ${BY(v).toFixed(1)}`; return p; };
  const bracket = (k, y, txt, hl) => {
    const col = hl ? HL : INK, w = txt.length * 4.4 + 8;
    return `<path d="M${BX(-k)} ${y - 3} V${y} H${80 - w / 2} M${80 + w / 2} ${y} H${BX(k)} V${y - 3}" fill="none" stroke="${col}" stroke-width="${hl ? 1.8 : 1.1}"/>` + T(80, y + 2.5, 7.5, 800, col, txt);
  };
  function bell() {
    const z = on("z"), sd = on("sd"), nm = on("normal") || !it;
    let s = T(80, 16, 8, 800, INK, z ? "z = (x − μ) ÷ σ" : sd ? "Standard deviation (σ)" : "Normal curve");
    s += `<path d="${curve(-3.3, 3.3)}" fill="#D5E6EE"/><path d="${curve(-2, 2)}" fill="#B3D3E2"/>`;
    s += `<path d="${curve(-1, 1)}" fill="${nm || sd ? HL : "#8DBDD3"}" opacity="${nm || sd ? .85 : 1}"${nm ? c("normal") : c("sd")}/>`;
    if (z) s += `<path d="${curve(2, 3.3)}" fill="${HL}" class="dg-hl"/>`;
    s += `<path d="${line()}" fill="none" stroke="#2F6F8C" stroke-width="1.6"/><path d="M12 ${BASE} H148" stroke="${INK}" stroke-width="1"/>`;
    ["−3", "−2", "−1", "μ", "+1", "+2", "+3"].forEach((t, i) => { const x = BX(i - 3); s += `<path d="M${x} ${BASE} v3" stroke="${INK}"/>` + T(x, BASE + 10, 7, 700, MUTED, t); });
    if (nm) s += T(80, 80, 9, 900, "#fff", "68%") + bracket(2, 124, "95%") + bracket(3, 138, "99.7%") + T(80, 151, 7, 700, MUTED, "within 1, 2 and 3 SD of the mean");
    if (sd) s += `<path d="M${BX(0)} 58 H${BX(1) - 2}" stroke="#1B2430" stroke-width="1.4"/><path d="M${BX(1) - 5} 55 L${BX(1)} 58 L${BX(1) - 5} 61" fill="none" stroke="#1B2430" stroke-width="1.4"/>` +
      pill(BX(0.5), 48, "1 SD", 30) + T(80, 126, 7.5, 800, HL, "68% within ±1 SD") + T(80, 140, 7, 700, MUTED, "bigger SD = wider, flatter curve");
    if (z) s += `<path d="M${BX(2)} ${BY(2) - 18} V${BASE}" stroke="${HL}" stroke-width="2"/>` + pill(BX(2), BY(2) - 24, "z = +2", 36) +
      T(80, 126, 7.5, 800, HL, "2 SD above the mean") + T(80, 140, 7, 700, MUTED, "only about 2.5% lie beyond");
    return s;
  }

  /* ---------- box plot ---------- */
  function box() {
    const X = v => 16 + (v - 100) * 2.1, r = on("range"), q = on("iqr");
    let s = T(80, 16, 8, 800, INK, "Systolic BP (mmHg): box plot");
    s += `<path d="M${X(100)} 116 H${X(160)}" stroke="${INK}"/>`;
    [100, 110, 120, 130, 140, 150, 160].forEach(v => s += `<path d="M${X(v)} 116 v3" stroke="${INK}"/>` + T(X(v), 127, 7, 700, MUTED, String(v)));
    s += `<path d="M${X(106)} 80 H${X(118)} M${X(134)} 80 H${X(152)} M${X(106)} 72 V88 M${X(152)} 72 V88" stroke="${r ? HL : "#2F6F8C"}" stroke-width="${r ? 2.2 : 1.6}"${c("range")}/>`;
    s += `<rect x="${X(118)}" y="64" width="${X(134) - X(118)}" height="32" rx="3" fill="${q ? HL : BAR}" stroke="#2F6F8C" stroke-width="1.2"${c("iqr")}/>`;
    s += `<path d="M${X(126)} 64 V96" stroke="${q ? "#fff" : "#1B2430"}" stroke-width="2"/>`;
    s += T(X(118), 107, 7, 800, INK, "Q1") + T(X(126), 60, 7, 800, INK, "median") + T(X(134), 107, 7, 800, INK, "Q3");
    s += T(X(106), 104, 7, 700, MUTED, "min") + T(X(152), 104, 7, 700, MUTED, "max");
    if (r) s += `<path d="M${X(106)} 46 H${X(152)}" stroke="${HL}" stroke-width="1.6"/><path d="M${X(106) + 4} 43 L${X(106)} 46 L${X(106) + 4} 49 M${X(152) - 4} 43 L${X(152)} 46 L${X(152) - 4} 49" stroke="${HL}" fill="none" stroke-width="1.6"/>` +
      pill(80, 36, "range = 152 − 106 = 46", 100) + T(80, 146, 7.5, 700, MUTED, "only the two extremes count");
    else if (q) s += `<path d="M${X(118)} 50 H${X(134)}" stroke="${HL}" stroke-width="1.6"/>` + pill(80, 38, "IQR = 134 − 118 = 16", 92) + T(80, 146, 7.5, 700, MUTED, "the middle 50% of readings");
    else s += T(80, 146, 7.5, 700, MUTED, "median, quartiles and extremes");
    return s;
  }

  /* ---------- skewed histogram (centre) ---------- */
  function skewHist() {
    const H = [14, 40, 54, 42, 26, 15, 9, 5], X0 = 18, W = 15, B = 120;
    const xs = v => X0 + v * W;   // v in bins from the left edge
    const tail = on("skew");
    let s = T(80, 14, 8, 800, INK, "Hospital stay: skewed right");
    H.forEach((h, i) => { const hl = tail && i >= 5; s += `<rect x="${xs(i)}" y="${B - h * 1.2}" width="${W}" height="${h * 1.2}" fill="${hl ? HL : i % 2 ? BAR2 : BAR}" stroke="#fff" stroke-width=".8"${hl && i === 5 ? ' class="dg-hl"' : ""}/>`; });
    s += `<path d="M14 ${B} H146" stroke="${INK}"/>` + T(80, B + 11, 7, 700, MUTED, "days in hospital →");
    const marks = [["mode", 2.5, 34], ["median", 3.3, 26], ["mean", 4.1, 18]];
    if (tail || !has("mode", "median", "mean")) {
      marks.forEach(([n, v]) => s += `<path d="M${xs(v)} 50 V${B}" stroke="#1B2430" stroke-width="1.2" stroke-dasharray="3 2"/>`);
      s += T(xs(2.5) - 2, 44, 7, 800, INK, "mode", "end") + T(xs(3.3), 34, 7, 800, INK, "median") + T(xs(4.1) + 2, 44, 7, 800, INK, "mean", "start");
      s += T(130, 80, 7, 800, tail ? HL : MUTED, "long tail", "middle") + `<path d="M118 86 H142 M138 83 L142 86 L138 89" stroke="${tail ? HL : MUTED}" fill="none" stroke-width="1.4"/>`;
      s += T(80, 146, 7.5, 800, tail ? HL : MUTED, "mean > median > mode");
    } else {
      const m = marks.find(([n]) => on(n));
      marks.forEach(([n, v]) => { const hl = n === m[0]; s += `<path d="M${xs(v)} 40 V${B}" stroke="${hl ? HL : "#1B2430"}" stroke-width="${hl ? 2.6 : 1}" stroke-dasharray="${hl ? "" : "3 2"}"${hl ? ' class="dg-hl"' : ""} opacity="${hl ? 1 : .45}"/>`; });
      s += pill(xs(m[1]), 32, m[0], 40);
      s += T(80, 146, 7.5, 700, MUTED, { mode: "the tallest bar: most common", median: "half the stays below, half above", mean: "pulled right by the long stays" }[m[0]]);
    }
    return s;
  }

  /* ---------- variables ---------- */
  function barChart() {
    const D = [["O", 45], ["A", 40], ["B", 11], ["AB", 4]];
    let s = T(80, 16, 8, 800, INK, "Blood type: categories");
    D.forEach(([k, v], i) => { const x = 24 + i * 30, h = v * 1.7; s += `<rect x="${x}" y="${116 - h}" width="22" height="${h}" rx="2" fill="${HL}"${i === 0 ? ' class="dg-hl"' : ""}/>` + T(x + 11, 112 - h, 7, 800, INK, v + "%") + T(x + 11, 127, 8, 800, INK, k); });
    s += `<path d="M16 116 H144" stroke="${INK}"/>` + T(80, 146, 7.5, 700, MUTED, "count each group: gaps between bars");
    return s;
  }
  function dotPlot() {
    const N = [5, 7, 4, 2, 1];
    let s = T(80, 16, 8, 800, INK, "ER visits per patient: counts");
    N.forEach((n, v) => { for (let k = 0; k < n; k++) s += `<circle cx="${30 + v * 25}" cy="${108 - k * 10}" r="4.2" fill="${HL}"${v === 0 && k === 0 ? ' class="dg-hl"' : ""}/>`; s += T(30 + v * 25, 127, 8, 800, INK, String(v)); });
    s += `<path d="M16 115 H144" stroke="${INK}"/>` + T(80, 146, 7.5, 700, MUTED, "whole numbers only: 0, 1, 2…");
    return s;
  }
  function histo() {
    const H = [6, 16, 30, 40, 32, 18, 8];
    let s = T(80, 16, 8, 800, INK, "Fasting glucose (mmol/L)");
    H.forEach((h, i) => s += `<rect x="${24 + i * 16}" y="${116 - h * 1.8}" width="16" height="${h * 1.8}" fill="${HL}" stroke="#fff" stroke-width=".8"${i === 3 ? ' class="dg-hl"' : ""}/>`);
    s += `<path d="M16 116 H144" stroke="${INK}"/>`;
    ["4", "5", "6", "7"].forEach((t, i) => s += T(24 + i * 37.3, 127, 7.5, 700, MUTED, t));
    s += T(80, 146, 7.5, 700, MUTED, "bars touch: any value, e.g. 5.43");
    return s;
  }
  function axes() {
    const iv = on("iv"), dv = on("dv");
    let s = T(84, 16, 8, 800, INK, "Cause → effect");
    s += `<path d="M30 26 V118 H146" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
    s += `<path d="M30 118 H146" stroke="${iv ? HL : INK}" stroke-width="${iv ? 3 : 1.2}"${c("iv")}/><path d="M30 26 V118" stroke="${dv ? HL : INK}" stroke-width="${dv ? 3 : 1.2}"${c("dv")}/>`;
    [[44, 100], [60, 96], [74, 86], [90, 80], [104, 68], [120, 60], [134, 50]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="3.4" fill="#2F6F8C"/>`);
    s += `<path d="M40 104 L138 46" stroke="#2F6F8C" stroke-width="1" stroke-dasharray="3 2"/>`;
    s += T(88, 131, 7.5, 800, iv ? HL : INK, "Dose (mg): independent, x-axis");
    s += `<text transform="translate(20 72) rotate(-90)" font-family="Chivo, sans-serif" font-size="7.5" font-weight="800" fill="${dv ? HL : INK}" text-anchor="middle">BP fall: dependent, y-axis</text>`;
    s += T(88, 146, 7, 700, MUTED, iv ? "the one you set or compare" : dv ? "the outcome you measure" : "x causes, y responds");
    return s;
  }

  /* ---------- levels ladder ---------- */
  function ladder() {
    const L = [["ratio", "Ratio", "+ true zero", "kg, bpm, K"], ["interval", "Interval", "+ equal gaps", "°C, °F, year"], ["ordinal", "Ordinal", "+ order", "pain: mild → severe"], ["nominal", "Nominal", "names only", "blood type"]];
    let s = T(80, 15, 8, 800, INK, "Levels of measurement");
    L.forEach(([id, n, p, e], i) => {
      const y = 24 + i * 30, hl = on(id), w = 132 - (3 - i) * 0;
      s += `<rect x="14" y="${y}" width="${w}" height="26" rx="6" fill="${hl ? HL : ["#7FB3C9", "#99C3D5", "#B5D4E1", "#D0E3EC"][i]}"${c(id)}/>`;
      s += T(22, y + 11, 8.5, 900, hl ? "#fff" : "#1B2430", n, "start") + T(22, y + 21, 7, 700, hl ? "#fff" : INK, e, "start") + T(140, y + 15, 7.5, 800, hl ? "#fff" : INK, p, "end");
    });
    s += T(80, 150, 7, 700, MUTED, "each level adds one property");
    return s;
  }

  /* ---------- sampling grid: 6 columns × 4 rows of people ---------- */
  function sampleGrid() {
    const pick = { srs: [2, 7, 11, 16, 19, 22], strat: [1, 4, 8, 9, 14, 21], cluster: [2, 3, 8, 9, 16, 17, 22, 23], system: [1, 5, 9, 13, 17, 21], conv: [12, 13, 18, 19, 20] };
    const key = Object.keys(pick).find(on) || "srs", sel = pick[key];
    const title = { srs: "Simple random sample", strat: "Stratified: some from each row", cluster: "Cluster: whole blocks", system: "Systematic: every 4th", conv: "Convenience: nearest people" }[key];
    const note = { srs: "chosen by chance alone", strat: "random picks inside every stratum", cluster: "pick blocks, take everyone", system: "random start, then every kth", conv: "people by the café door: likely biased" }[key];
    const RC = ["#E9C46A", "#8CC7A1", "#9CC4E4", "#D6A2C8"];
    let s = T(80, 15, 8, 800, INK, title);
    s += `<rect x="12" y="22" width="136" height="108" rx="8" fill="#fff" opacity=".55"/>`;
    if (key === "strat") RC.forEach((col, r) => s += `<rect x="16" y="${27 + r * 25}" width="128" height="22" rx="5" fill="${col}" opacity=".45"/>`);
    if (key === "cluster") for (let b = 0; b < 6; b++) { const bx = b % 3, by = Math.floor(b / 3); s += `<rect x="${17 + bx * 42}" y="${26 + by * 50}" width="40" height="46" rx="6" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/>`; }
    for (let i = 0; i < 24; i++) {
      const col = i % 6, row = Math.floor(i / 6), x = 30 + col * 20 + (col >= 2 ? 2 : 0) + (col >= 4 ? 2 : 0), y = 38 + row * 25;
      const hl = sel.indexOf(i) >= 0, f = hl ? HL : "#9AA6B2";
      s += `<g${hl && i === sel[0] ? ' class="dg-hl"' : ""}><circle cx="${x}" cy="${y - 4}" r="3.4" fill="${f}"/><path d="M${x - 5} ${y + 8} q0 -8 5 -8 q5 0 5 8 z" fill="${f}"/></g>`;
      if (key === "system") s += T(x + 7, y - 6, 6.5, 700, MUTED, String(i + 1), "start");
    }
    s += T(80, 145, 7.5, 700, MUTED, note);
    return s;
  }

  /* ---------- study designs ---------- */
  const person = (x, y, f) => `<circle cx="${x}" cy="${y - 5}" r="3.6" fill="${f}"/><path d="M${x - 5.5} ${y + 8} q0 -9 5.5 -9 q5.5 0 5.5 9 z" fill="${f}"/>`;
  function observe() {
    let s = T(80, 15, 8, 800, INK, "Observational study");
    s += `<rect x="14" y="58" width="60" height="50" rx="8" fill="#E9D9C6"/><rect x="86" y="58" width="60" height="50" rx="8" fill="#D4E5EE"/>`;
    [28, 44, 60].forEach(x => s += person(x, 84, "#8A6A4A"));
    [100, 116, 132].forEach(x => s += person(x, 84, "#4F7C96"));
    s += T(44, 102, 7, 800, INK, "coffee") + T(116, 102, 7, 800, INK, "no coffee");
    s += `<g class="dg-hl"><circle cx="80" cy="36" r="10" fill="none" stroke="${HL}" stroke-width="2.4"/><path d="M87 43 L96 52" stroke="${HL}" stroke-width="3" stroke-linecap="round"/></g>`;
    s += T(80, 124, 7.5, 800, HL, "just watch: nobody is assigned");
    s += T(80, 138, 7.5, 700, MUTED, "shows a link (correlation),");
    s += T(80, 149, 7.5, 700, MUTED, "not cause: lurking variables");
    return s;
  }
  function trial() {
    const bl = on("blind"), rc = !bl;
    let s = T(80, 15, 8, 800, INK, bl ? "Double-blind trial" : "Randomised controlled trial");
    s += `<rect x="50" y="22" width="60" height="26" rx="7" fill="#E6ECF0"/>`;
    [64, 80, 96].forEach(x => s += person(x, 34, "#6B7682"));
    s += `<path d="M70 50 L40 70 M90 50 L120 70" stroke="${rc ? HL : INK}" stroke-width="${rc ? 2.2 : 1.2}"${rc ? ' class="dg-hl"' : ""}/>` + pill(80, 62, "random", 36);
    s += `<rect x="12" y="72" width="60" height="44" rx="8" fill="#D4E5EE"/><rect x="88" y="72" width="60" height="44" rx="8" fill="${rc ? "#F7D6E2" : "#D4E5EE"}" stroke="${rc ? HL : "none"}" stroke-width="1.6"/>`;
    const pillIc = (x, y, f) => `<g transform="translate(${x} ${y}) rotate(-30)"><rect x="-10" y="-4.5" width="20" height="9" rx="4.5" fill="${f}" stroke="#1B2430" stroke-width=".8"/><path d="M0 -4.5 V4.5" stroke="#1B2430" stroke-width=".8"/></g>`;
    const f = bl ? HL : "#F2C14E";
    s += pillIc(42, 90, f) + pillIc(118, 90, bl ? HL : "#FFFFFF");
    s += T(42, 110, 7.5, 800, INK, bl ? "group A ?" : "treatment") + T(118, 110, 7.5, 800, rc ? HL : INK, bl ? "group B ?" : "control");
    s += bl ? T(80, 132, 7.5, 800, HL, "pills look identical") + T(80, 145, 7.5, 700, MUTED, "patients and assessors don't know")
            : T(80, 132, 7.5, 800, INK, "only the treatment differs") + T(80, 145, 7.5, 700, MUTED, "so it can show cause and effect");
    return s;
  }

  /* ---------- probability ---------- */
  function probScale() {
    const X = p => 18 + p * 124;
    let s = T(80, 16, 8, 800, INK, "Probability scale");
    s += `<defs><linearGradient id="${it ? "s" : "o"}pg" x1="0" x2="1"><stop offset="0" stop-color="#C9D6DE"/><stop offset="1" stop-color="#5E9AB8"/></linearGradient></defs>`;
    s += `<rect x="${X(0)}" y="70" width="${X(1) - X(0)}" height="12" rx="6" fill="url(#${it ? "s" : "o"}pg)"/>`;
    [[0, "0"], [0.25, "0.25"], [0.5, "0.5"], [0.75, "0.75"], [1, "1"]].forEach(([p, t]) => s += `<path d="M${X(p)} 84 v4" stroke="${INK}"/>` + T(X(p), 97, 7.5, 700, INK, t));
    s += T(X(0), 112, 7, 700, MUTED, "impossible", "start") + T(X(0.5), 112, 7, 700, MUTED, "even") + T(X(1), 112, 7, 700, MUTED, "certain", "end");
    s += `<g class="dg-hl"><path d="M${X(0.15)} 46 V68" stroke="${HL}" stroke-width="2.2"/><path d="M${X(0.15) - 4} 62 L${X(0.15)} 68 L${X(0.15) + 4} 62" fill="none" stroke="${HL}" stroke-width="2.2"/></g>`;
    s += pill(X(0.15) + 22, 38, "side effect 0.15", 70);
    s += T(80, 134, 7.5, 800, INK, "0.15 = 15% = 3 in 20");
    s += T(80, 147, 7, 700, MUTED, "never below 0, never above 1");
    return s;
  }
  function venn(kind) {
    let s = T(80, 15, 8, 800, INK, kind === "comp" ? "Complement: not A" : "Mutually exclusive: A or B");
    if (kind === "comp") {
      s += `<rect x="16" y="24" width="128" height="92" rx="6" fill="${HL}" class="dg-hl"/><circle cx="62" cy="70" r="28" fill="#F4F8FA" stroke="#1B2430"/>`;
      s += T(62, 68, 9, 900, INK, "A") + T(62, 80, 7, 700, INK, "0.2") + T(116, 66, 8, 900, "#fff", "not A") + T(116, 78, 7.5, 700, "#fff", "0.8");
      s += T(80, 134, 7.5, 800, INK, "P(not A) = 1 − P(A)") + T(80, 147, 7, 700, MUTED, "the two always add up to 1");
    } else {
      s += `<rect x="16" y="24" width="128" height="92" rx="6" fill="#F4F8FA" stroke="${MUTED}"/>`;
      s += `<circle cx="52" cy="70" r="25" fill="${HL}" opacity=".9" class="dg-hl"/><circle cx="110" cy="70" r="18" fill="${HL}" opacity=".9"/>`;
      s += T(52, 68, 9, 900, "#fff", "A") + T(52, 80, 7, 700, "#fff", "0.40") + T(110, 68, 9, 900, "#fff", "B") + T(110, 80, 7, 700, "#fff", "0.11");
      s += T(80, 134, 7.5, 800, INK, "no overlap: P(A or B) = P(A) + P(B)") + T(80, 147, 7, 700, MUTED, "0.40 + 0.11 = 0.51");
    }
    return s;
  }
  function tree() {
    let s = T(80, 15, 8, 800, INK, "Independent: multiply");
    const node = (x, y, t, hl) => `<circle cx="${x}" cy="${y}" r="9" fill="${hl ? HL : "#fff"}" stroke="#1B2430"/>` + T(x, y + 3, 8, 900, hl ? "#fff" : INK, t);
    const edge = (x1, y1, x2, y2, hl) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${hl ? HL : MUTED}" stroke-width="${hl ? 2.6 : 1.2}"${hl ? ' class="dg-hl"' : ""}/>`;
    s += edge(22, 72, 62, 44, true) + edge(22, 72, 62, 100) + edge(62, 44, 108, 30, true) + edge(62, 44, 108, 58) + edge(62, 100, 108, 86) + edge(62, 100, 108, 114);
    s += `<circle cx="22" cy="72" r="3" fill="#1B2430"/>`;
    s += node(62, 44, "H", true) + node(62, 100, "T") + node(108, 30, "H", true) + node(108, 58, "T") + node(108, 86, "H") + node(108, 114, "T");
    s += T(36, 52, 7, 700, MUTED, "0.5") + T(36, 96, 7, 700, MUTED, "0.5");
    s += T(122, 33, 7.5, 800, HL, "0.25", "start") + T(122, 61, 7, 700, MUTED, "0.25", "start") + T(122, 89, 7, 700, MUTED, "0.25", "start") + T(122, 117, 7, 700, MUTED, "0.25", "start");
    s += T(80, 136, 7.5, 800, INK, "P(H and H) = 0.5 × 0.5 = 0.25") + T(80, 149, 7, 700, MUTED, "the coin has no memory");
    return s;
  }

  BGX.DIAGRAMS["stats"] = item => {
    it = item;
    let s, label;
    if (has("qual")) { s = barChart(); label = "Bar chart of blood types, a qualitative variable"; }
    else if (has("discrete")) { s = dotPlot(); label = "Dot plot of counts, a discrete variable"; }
    else if (has("continuous")) { s = histo(); label = "Histogram of glucose, a continuous variable"; }
    else if (has("iv", "dv")) { s = axes(); label = "Graph with the independent variable on the x-axis and the dependent variable on the y-axis"; }
    else if (has("nominal", "ordinal", "interval", "ratio")) { s = ladder(); label = "Ladder of the four levels of measurement"; }
    else if (has("srs", "strat", "cluster", "system", "conv")) { s = sampleGrid(); label = "Population grid showing who a sampling method picks"; }
    else if (has("obs")) { s = observe(); label = "Observational study: researchers only watch two groups"; }
    else if (has("rct", "blind")) { s = trial(); label = "Randomised controlled trial with treatment and control groups"; }
    else if (has("mean", "median", "mode", "skew")) { s = skewHist(); label = "Right-skewed histogram with the mode, median and mean marked"; }
    else if (has("range", "iqr")) { s = box(); label = "Box plot of systolic blood pressure"; }
    else if (has("scale")) { s = probScale(); label = "Probability scale from 0 to 1"; }
    else if (has("comp")) { s = venn("comp"); label = "Venn diagram of an event and its complement"; }
    else if (has("add")) { s = venn("add"); label = "Venn diagram of two mutually exclusive events"; }
    else if (has("mult")) { s = tree(); label = "Tree diagram for two coin tosses"; }
    else { s = bell(); label = item ? "Normal curve" : "Normal curve with the 68–95–99.7 bands"; }
    return dg.frame(s, label, ["#F4F8FA", "#DCE9F0"]);
  };
})();
