/* BioglowRX diagram "nuclear" — nuclear chemistry (Half-Life Hunt, chapter 20).
   Spot ids: alpha beta positron ec gamma (nucleus emitting) · shield ionise (shielding) · curve (decay curve; uses item.hl) ·
   isotope nucleon symbol band fission chain fusion binding dose distance. Overview (null): the shielding picture. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUT = "#55616e", PR = "#e2574c", NE = "#9aa7b4";
  const arrow = (x1, y1, x2, y2, col, w) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 6;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col}" stroke-width="${w || 2}"/><path d="M${x2} ${y2} L${(x2 - h * Math.cos(a - .45)).toFixed(1)} ${(y2 - h * Math.sin(a - .45)).toFixed(1)} L${(x2 - h * Math.cos(a + .45)).toFixed(1)} ${(y2 - h * Math.sin(a + .45)).toFixed(1)}Z" fill="${col}"/>`; };
  /* a cluster of nucleons */
  function nucleus(cx, cy, n, r, seed) {
    let s = "", k = seed || 1;
    for (let i = 0; i < n; i++) { const a = i * 2.39996, rr = r * Math.sqrt((i + .5) / n); k = (k * 9301 + 49297) % 233280;
      s += `<circle cx="${(cx + Math.cos(a) * rr).toFixed(1)}" cy="${(cy + Math.sin(a) * rr).toFixed(1)}" r="4.2" fill="${k % 2 ? PR : NE}" stroke="#fff" stroke-width=".6"/>`; }
    return s;
  }
  const alphaP = (x, y, col) => `<g class="dg-hl"><circle cx="${x - 3}" cy="${y - 3}" r="3.6" fill="${col || PR}" stroke="#fff" stroke-width=".6"/><circle cx="${x + 3}" cy="${y - 3}" r="3.6" fill="${NE}" stroke="#fff" stroke-width=".6"/><circle cx="${x - 3}" cy="${y + 3}" r="3.6" fill="${NE}" stroke="#fff" stroke-width=".6"/><circle cx="${x + 3}" cy="${y + 3}" r="3.6" fill="${col || PR}" stroke="#fff" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="9" fill="none" stroke="${HL}" stroke-width="1.6"/></g>`;
  const wavy = (x1, y, x2, col) => { let d = `M${x1} ${y}`; for (let x = x1; x < x2 - 6; x += 6) d += ` q1.5 -5 3 0 q1.5 5 3 0`; return `<path d="${d}" stroke="${col}" stroke-width="2" fill="none"/>` + arrow(x2 - 6, y, x2, y, col); };

  /* nucleus emitting each particle type */
  const EMIT = {
    alpha: { lab: "Alpha decay", eq: "A − 4, Z − 2", p: () => alphaP(128, 48) + T(128, 70, 8, 900, HL, "⁴₂He") },
    beta: { lab: "Beta-minus decay", eq: "A same, Z + 1", p: () => `<g class="dg-hl"><circle cx="130" cy="46" r="5" fill="${HL}"/></g>` + T(130, 48.5, 7, 900, "#fff", "−") + T(130, 66, 8, 900, HL, "⁰₋₁e") + T(52, 140, 7.5, 700, MUT, "n → p + e⁻") },
    positron: { lab: "Positron emission", eq: "A same, Z − 1", p: () => `<g class="dg-hl"><circle cx="130" cy="46" r="5" fill="${HL}"/></g>` + T(130, 48.5, 7, 900, "#fff", "+") + T(130, 66, 8, 900, HL, "⁰₊₁e") + T(52, 140, 7.5, 700, MUT, "p → n + e⁺") },
    gamma: { lab: "Gamma emission", eq: "A same, Z same", p: () => `<g class="dg-hl">${wavy(96, 50, 146, HL)}</g>` + T(126, 66, 9, 900, HL, "γ") }
  };
  function emitter(kind) {
    const e = EMIT[kind];
    let s = `<circle cx="64" cy="82" r="34" fill="#fde9e4" opacity=".7"/>` + nucleus(64, 82, 34, 26, kind.length);
    if (kind === "gamma") s += `<circle cx="64" cy="82" r="32" fill="none" stroke="#f4b740" stroke-width="2" stroke-dasharray="3 3"/>` + T(64, 30, 7.5, 800, "#b27a00", "excited nucleus *");
    s += kind === "gamma" ? "" : arrow(92, 68, 116, 54, MUT);
    s += e.p();
    s += `<rect x="18" y="128" width="124" height="0" fill="none"/>`;
    s += `<rect x="88" y="104" width="66" height="18" rx="9" fill="${INK}"/>` + T(121, 116.5, 7.5, 800, "#fff", e.eq);
    s += T(80, 153, 9, 800, INK, e.lab);
    return s;
  }
  function capture() {
    let s = `<circle cx="80" cy="76" r="54" fill="none" stroke="#c9d2da" stroke-dasharray="3 3"/><circle cx="80" cy="76" r="36" fill="none" stroke="#c9d2da"/>`;
    s += nucleus(80, 76, 30, 20, 3);
    s += `<g class="dg-hl"><circle cx="80" cy="40" r="5" fill="${HL}"/></g>` + T(80, 42.5, 7, 900, "#fff", "−") + arrow(80, 46, 80, 54, HL);
    s += T(80, 28, 7.5, 800, HL, "inner electron pulled in");
    s += `<circle cx="127" cy="49" r="4" fill="#2f6fb8"/>` + arrow(124, 54, 110, 66, "#2f6fb8", 1.4) + T(140, 70, 7, 800, "#2f6fb8", "X-ray");
    s += `<rect x="47" y="128" width="66" height="16" rx="8" fill="${INK}"/>` + T(80, 139.5, 7.5, 800, "#fff", "A same, Z − 1");
    s += T(80, 155, 8, 800, INK, "p + e⁻ → n");
    return s;
  }

  /* shielding picture */
  function shielding(hlOn) {
    const rows = [["α", 40, 42, PR], ["β", 74, 82, "#2f6fb8"], ["γ", 108, 124, "#7a4fa0"]];
    let s = `<circle cx="18" cy="74" r="9" fill="#f4d36a" stroke="#b27a00"/>` + T(18, 77, 8, 900, INK, "☢");
    const walls = [["paper", 46, 4, "#f2ece0"], ["aluminium", 86, 6, "#c9d2da"], ["lead", 126, 12, "#6c7a89"]];
    walls.forEach(([n, x, w, c]) => { s += `<rect x="${x}" y="24" width="${w}" height="116" rx="1.5" fill="${hlOn ? HL : c}" fill-opacity="${hlOn ? .55 : 1}" stroke="${BGX.shade(c, -.3)}"${hlOn ? ' class="dg-hl"' : ""}/>` + T(x + w / 2, 150, 7, 800, MUT, n); });
    rows.forEach(([g, y, stop, c], i) => {
      s += T(30, y - 4, 8.5, 900, c, g);
      if (i < 2) s += `<path d="M26 ${y} H${stop}" stroke="${c}" stroke-width="2.2"/><circle cx="${stop}" cy="${y}" r="2.2" fill="${c}"/>`;
      else s += `<path d="M26 ${y} H${stop}" stroke="${c}" stroke-width="2.2"/><path d="M138 ${y} H148" stroke="${c}" stroke-width="1.6" stroke-dasharray="2 2"/>`;
    });
    s += T(80, 16, 8, 800, INK, "What stops each radiation?");
    return s;
  }
  function ionise() {
    let s = T(80, 18, 8, 800, INK, "Ionising: knocks electrons off");
    s += `<path d="M14 80 Q40 74 60 80 T110 80 T150 80" stroke="${PR}" stroke-width="2.4" fill="none"/>` + T(16, 72, 8, 900, PR, "α", "start");
    [[44, 60], [76, 102], [104, 58], [132, 100]].forEach(([x, y], i) => {
      s += `<circle cx="${x}" cy="${y}" r="9" fill="#dceefb" stroke="#2f6fb8"/>` + T(x, y + 3, 8, 900, INK, "+");
      s += `<g class="dg-hl"><circle cx="${x + (i % 2 ? 12 : -12)}" cy="${y + (i % 2 ? 14 : -14)}" r="3.4" fill="${HL}"/></g>`;
    });
    s += `<rect x="14" y="126" width="132" height="26" rx="9" fill="${INK}"/>` + T(80, 137, 7.5, 800, "#fff", "ions + free radicals") + T(80, 147, 7.5, 800, "#fff", "can damage DNA");
    return s;
  }

  /* decay curve */
  function curve(it) {
    const x0 = 28, y0 = 126, W = 120, H = 96, hlTxt = it && it.hl;
    let d = `M${x0} ${y0 - H}`;
    for (let i = 1; i <= 60; i++) { const t = i / 60 * 4; d += ` L${(x0 + i / 60 * W).toFixed(1)} ${(y0 - H * Math.pow(.5, t)).toFixed(1)}`; }
    let s = `<path d="M${x0} ${y0 - H - 6} V${y0} H${x0 + W + 4}" stroke="${INK}" stroke-width="1.4" fill="none"/>`;
    [1, 2, 3, 4].forEach(n => { const x = x0 + n * W / 4, y = y0 - H * Math.pow(.5, n);
      s += `<path d="M${x} ${y0} V${y} M${x0} ${y} H${x}" stroke="${n === 1 ? HL : "#b9c5cf"}" stroke-width="${n === 1 ? 1.4 : 1}" stroke-dasharray="3 2"${n === 1 ? ' class="dg-hl"' : ""}/>` + T(x, y0 + 9, 7, 800, MUT, n + "") + `<circle cx="${x}" cy="${y}" r="2.6" fill="${n === 1 ? HL : INK}"/>`; });
    s += `<path d="${d}" stroke="#2f6fb8" stroke-width="2.4" fill="none"/>`;
    s += T(x0 - 3, y0 - H + 3, 7, 800, MUT, "100%", "end") + T(x0 - 3, y0 - H / 2 + 3, 7, 800, HL, "50%", "end") + T(x0 - 3, y0 - H / 4 + 3, 7, 800, MUT, "25%", "end");
    s += T(x0 + W / 2, 150, 7.5, 700, MUT, "number of half-lives");
    s += hlTxt ? `<rect x="66" y="24" width="${Math.max(70, hlTxt.length * 6 + 34)}" height="16" rx="8" fill="${HL}"/>` + T(66 + Math.max(70, hlTxt.length * 6 + 34) / 2, 35.5, 7.5, 800, "#fff", "t½ = " + hlTxt)
      : T(100, 34, 8, 800, INK, "½ → ¼ → ⅛ → 1/16");
    return s;
  }

  const S = {
    isotope: () => {
      let s = T(80, 18, 8.5, 800, INK, "Isotopes of carbon: 6 protons each");
      [["¹²C", 6, 30], ["¹³C", 7, 80], ["¹⁴C", 8, 130]].forEach(([n, ne, x], i) => {
        let k = 0;
        for (let j = 0; j < 6 + ne; j++) { const a = j * 2.39996, rr = 15 * Math.sqrt((j + .5) / (6 + ne)); const pr = j % 2 === 0 && k < 6; if (pr) k++;
          s += `<circle cx="${(x + Math.cos(a) * rr).toFixed(1)}" cy="${(70 + Math.sin(a) * rr).toFixed(1)}" r="3.8" fill="${pr ? PR : (i === 2 ? HL : NE)}" stroke="#fff" stroke-width=".5"/>`; }
        s += T(x, 108, 11, 900, i === 2 ? HL : INK, n) + T(x, 122, 7, 800, MUT, ne + " neutrons");
      });
      s += `<g class="dg-hl"><rect x="20" y="134" width="120" height="16" rx="8" fill="${HL}"/></g>` + T(80, 145.5, 7.5, 800, "#fff", "same Z, different A");
      return s;
    },
    nucleon: () => nucleus(60, 74, 14, 18, 5) + `<g class="dg-hl"><circle cx="112" cy="54" r="10" fill="${PR}" stroke="${HL}" stroke-width="2"/><circle cx="112" cy="94" r="10" fill="${NE}" stroke="${HL}" stroke-width="2"/></g>`
      + T(112, 57, 9, 900, "#fff", "p") + T(112, 97, 9, 900, "#fff", "n") + T(134, 57, 7.5, 800, INK, "+1", "start") + T(134, 97, 7.5, 800, INK, "0", "start")
      + `<rect x="18" y="124" width="124" height="18" rx="9" fill="${INK}"/>` + T(80, 136.5, 7.5, 800, "#fff", "A = protons + neutrons"),
    symbol: () => `<text x="62" y="96" font-family="Chivo, sans-serif" font-size="54" font-weight="900" fill="${INK}" text-anchor="middle">C</text>
      <g class="dg-hl"><text x="40" y="60" font-family="Chivo, sans-serif" font-size="20" font-weight="900" fill="${HL}" text-anchor="end">14</text></g>
      <text x="40" y="100" font-family="Chivo, sans-serif" font-size="20" font-weight="900" fill="#2f6fb8" text-anchor="end">6</text>
      ${T(96, 48, 7.5, 800, HL, "A = mass no.", "start")}${T(96, 58, 7, 700, MUT, "protons +", "start")}${T(96, 67, 7, 700, MUT, "neutrons", "start")}
      ${T(96, 92, 7.5, 800, "#2f6fb8", "Z = atomic no.", "start")}${T(96, 102, 7, 700, MUT, "protons", "start")}
      ${T(80, 132, 8, 800, INK, "neutrons = A − Z = 8")}${T(80, 148, 7.5, 700, MUT, "carbon-14 · C-14")}`,
    band: () => {
      let s = `<path d="M24 136 V18 M24 136 H150" stroke="${INK}" stroke-width="1.4"/>` + T(86, 150, 7.5, 700, MUT, "protons (Z)") + `<text x="12" y="78" font-family="Chivo, sans-serif" font-size="7.5" font-weight="700" fill="${MUT}" text-anchor="middle" transform="rotate(-90 12 78)">neutrons</text>`;
      s += `<path d="M24 136 L140 20" stroke="#b9c5cf" stroke-dasharray="3 3"/>` + T(132, 40, 6.8, 700, MUT, "n = p", "end");
      s += `<path d="M26 132 Q70 100 104 56 Q120 36 142 22 L148 34 Q124 48 110 66 Q78 108 30 136Z" fill="${HL}" fill-opacity=".35" stroke="${HL}" class="dg-hl"/>`;
      s += T(50, 50, 7, 800, "#2f6fb8", "too many n:") + T(50, 59, 7, 800, "#2f6fb8", "beta-minus") + T(118, 108, 7, 800, PR, "too few n:") + T(118, 117, 7, 800, PR, "positron / EC");
      return s;
    },
    fission: () => {
      let s = `<circle cx="16" cy="78" r="4" fill="${NE}"/>` + arrow(22, 78, 38, 78, MUT) + nucleus(58, 78, 26, 18, 2) + T(58, 108, 7.5, 800, INK, "²³⁵U");
      s += arrow(80, 70, 96, 56, MUT) + arrow(80, 86, 96, 100, MUT);
      s += `<g class="dg-hl">` + nucleus(114, 44, 14, 12, 4) + nucleus(114, 112, 12, 11, 6) + `</g>` + T(114, 28, 7, 800, INK, "Ba") + T(114, 134, 7, 800, INK, "Kr");
      [[146, 64], [148, 80], [146, 96]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="3.4" fill="${NE}" stroke="${HL}"/>`);
      s += T(80, 152, 8, 800, INK, "splits + 2–3 neutrons + energy");
      return s;
    },
    chain: () => {
      let s = "", lv = [[[30, 80]], [[74, 50], [74, 110]], [[120, 32], [120, 66], [120, 94], [120, 128]]];
      lv.forEach((L, i) => L.forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="9" fill="${i === 2 ? HL : "#f2b2a8"}"${i === 2 ? ' class="dg-hl"' : ""}/>`;
        if (i < 2) { const nx = lv[i + 1].filter(p => Math.abs(p[1] - y) < 40); nx.forEach(([x2, y2]) => s += arrow(x + 10, y, x2 - 12, y2, MUT, 1.4)); } }));
      s += T(80, 16, 8, 800, INK, "each fission triggers more");
      return s + T(80, 153, 7.5, 700, MUT, "control rods absorb neutrons");
    },
    fusion: () => `<circle cx="80" cy="56" r="34" fill="#ffd36b" opacity=".55"/><circle cx="80" cy="56" r="24" fill="#ffb72e" opacity=".7"/>
      ${nucleus(32, 104, 2, 4, 1)}${nucleus(60, 112, 3, 5, 2)}${arrow(70, 108, 92, 108, MUT)}
      <g class="dg-hl">${nucleus(108, 108, 4, 6, 3)}</g>${T(108, 126, 7.5, 800, HL, "⁴₂He")}${T(32, 124, 7, 800, MUT, "²H")}${T(60, 130, 7, 800, MUT, "³H")}
      <circle cx="140" cy="100" r="3.4" fill="${NE}"/>${T(140, 114, 7, 800, MUT, "n")}${T(80, 60, 9, 900, "#8a5a00", "the Sun")}${T(80, 150, 8, 800, INK, "light nuclei join")}`,
    binding: () => {
      let s = `<path d="M24 136 V22 M24 136 H150" stroke="${INK}" stroke-width="1.4"/>` + T(86, 150, 7.5, 700, MUT, "mass number") + `<text x="13" y="80" font-family="Chivo, sans-serif" font-size="7" font-weight="700" fill="${MUT}" text-anchor="middle" transform="rotate(-90 13 80)">binding energy per nucleon</text>`;
      s += `<path d="M28 128 Q40 56 62 42 Q90 36 148 58" stroke="#2f6fb8" stroke-width="2.4" fill="none"/>`;
      s += `<g class="dg-hl"><circle cx="66" cy="41" r="4" fill="${HL}"/></g>` + T(66, 32, 7.5, 800, HL, "Fe-56 peak");
      s += arrow(40, 96, 56, 70, PR, 1.6) + T(44, 110, 7, 800, PR, "fusion") + arrow(140, 74, 112, 60, "#7a4fa0", 1.6) + T(134, 90, 7, 800, "#7a4fa0", "fission");
      return s;
    },
    dose: () => `<rect x="36" y="20" width="88" height="100" rx="10" fill="#fff" stroke="#9fb3c4"/><rect x="44" y="30" width="72" height="22" rx="4" fill="#13202b"/>
      <g class="dg-hl"><rect x="46" y="32" width="68" height="18" rx="3" fill="none" stroke="${HL}" stroke-width="1.6"/></g>${T(80, 45, 9, 800, "#7CFFB2", "2.4 mSv/yr")}
      ${T(80, 70, 7.5, 800, INK, "background")}${T(80, 82, 7.5, 800, INK, "≈ 2–3 mSv a year")}${T(80, 100, 7, 700, MUT, "CT ≈ 10 mSv")}${T(80, 110, 7, 700, MUT, "chest X-ray < 0.1")}
      ${T(80, 140, 7.5, 700, MUT, "Gy = J/kg · Sv = effect")}${T(80, 152, 7.5, 700, MUT, "Bq = decays per second")}`,
    distance: () => `<circle cx="22" cy="80" r="9" fill="#f4d36a" stroke="#b27a00"/>${T(22, 83, 8, 900, INK, "☢")}
      ${[[56, 88, "×1"], [90, 22, "×¼"], [124, 10, "×1/9"]].map(([x, h, t], i) => `<rect x="${x - 7}" y="${80 - h / 2}" width="14" height="${h}" rx="3" fill="${i === 1 ? HL : "#dceefb"}"${i === 1 ? ' class="dg-hl"' : ""}/>` + T(x, 128, 7.5, 800, INK, ["1 m", "2 m", "3 m"][i]) + T(x, 140, 7.5, 800, i === 1 ? HL : MUT, ["dose", "¼ dose", "1/9 dose"][i])).join("")}
      ${T(80, 22, 8, 800, INK, "Time · Distance · Shielding")}${T(80, 154, 7.5, 700, MUT, "double the distance, ¼ the dose")}`
  };
  const NAMES = { alpha: "Alpha decay", beta: "Beta-minus decay", positron: "Positron emission", ec: "Electron capture", gamma: "Gamma emission", shield: "Penetrating power and shielding",
    ionise: "Ionising radiation", curve: "Decay curve with half-lives", isotope: "Isotopes", nucleon: "Nucleons", symbol: "Nuclide symbol", band: "Band of stability",
    fission: "Fission", chain: "Chain reaction", fusion: "Fusion", binding: "Binding energy", dose: "Radiation dose", distance: "Distance and dose" };

  BGX.DIAGRAMS.nuclear = item => {
    const k = dg.spots(item)[0], bg = ["#F6F4FB", "#E4E0F0"];
    if (!item || !k) return dg.frame(shielding(false), "Alpha is stopped by paper, beta by aluminium, gamma is reduced by lead", bg);
    if (EMIT[k]) return dg.frame(emitter(k), NAMES[k], bg);
    if (k === "ec") return dg.frame(capture(), NAMES.ec, bg);
    if (k === "shield") return dg.frame(shielding(true), NAMES.shield, bg);
    if (k === "ionise") return dg.frame(ionise(), NAMES.ionise, bg);
    if (k === "curve") return dg.frame(curve(item), NAMES.curve, bg);
    if (S[k]) return dg.frame(S[k](item), NAMES[k], bg);
    return dg.frame(shielding(false), item.name, bg);
  };
})();
