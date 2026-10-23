/* BioglowRX diagram "drug-path": three linked pictures for pharmacology terms.
   Body route (overview + journey terms) spots: gut, portal, liver, blood, tissue, kidneys
   Receptor close-up (what the drug does) spots: agonist, antagonist, offtarget
   Drug level over time graph (dosing terms) spots: halflife, steady, range, peak, trough, loading */
(function () {
  "use strict";
  const B = window.BGX, D = B.dg, HL = D.HL;
  const RX = ["agonist", "antagonist", "offtarget"], GR = ["halflife", "steady", "range", "peak", "trough", "loading"];
  const LBL = { gut: "Gut wall", liver: "Liver", kidneys: "Kidneys", blood: "Into the bloodstream", "blood,tissue": "Blood to tissues",
    "gut,portal,liver": "Gut to liver first", agonist: "Switches receptor on", antagonist: "Blocks the receptor", offtarget: "Unwanted effect",
    halflife: "Half-life", steady: "Steady state", range: "Therapeutic range", peak: "Peak level", trough: "Trough level", loading: "Loading dose" };
  const glow = P => `<filter id="${P}gl" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="${HL}" flood-opacity=".95"/></filter>`;
  const wash = `<rect width="160" height="160" rx="18" fill="#EEF3F6" opacity=".55"/>`;
  const st = on => on ? ' stroke="#fff" stroke-width=".8"' : "";
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="1.7" fill="#7B4FD0" stroke="#fff" stroke-width=".5"/>`;

  /* ---------- 1. body route ---------- */
  const SK = "M80 4 C88 4 94 10 94 19 C94 27 90 31 86 34 L86 40 C102 42 120 46 127 54 C133 62 133 74 131 86 C129 100 128 114 130 128 C131 140 128 150 125 160 L35 160 C32 150 29 140 30 128 C32 114 31 100 29 86 C27 74 27 62 33 54 C40 46 58 42 74 40 L74 34 C70 31 66 27 66 19 C66 10 72 4 80 4Z";
  const BODY = [
    ["blood", (f, on) => `<g fill="none" stroke="${on ? f : "#C8323F"}" stroke-width="${on ? 2.2 : 1.5}" stroke-linecap="round"><path d="M80 50 V24 M74 57 C56 60 44 72 43 96 M86 57 C104 60 116 72 117 96 M82 66 V130 M82 100 H70 M82 100 H94"/></g>`],
    ["tissue", (f, on) => [[43, 101], [117, 101]].map(([x, y]) => `<g>${[[0, 0], [6, 2], [2, 6]].map(([a, b]) => `<circle cx="${x + a - 3}" cy="${y + b - 2}" r="3.4" fill="${on ? f : "#E7A79A"}"${st(on)}/><circle cx="${x + a - 3}" cy="${y + b - 2}" r="1" fill="${on ? "#fff" : "#9C4C43"}"/>`).join("")}</g>`).join("")
      + `<path d="M68 14 C68 7 74 5 80 5 C86 5 92 7 92 14 C92 18 88 20 80 20 C72 20 68 18 68 14Z" fill="${on ? f : "#E8AFBB"}"${st(on)}/>`],
    ["kidneys", (f, on) => `<ellipse cx="62" cy="104" rx="5" ry="8" fill="${on ? f : "#9C3D3A"}"${st(on)}/><ellipse cx="102" cy="104" rx="5" ry="8" fill="${on ? f : "#9C3D3A"}"${st(on)}/><path d="M63 111 L77 134 M101 111 L83 134" stroke="${on ? f : "#D9B26A"}" stroke-width="1.3" fill="none"/><ellipse cx="80" cy="137" rx="6" ry="4.4" fill="${on ? f : "#EBCB6E"}"${st(on)}/>`],
    ["gut", (f, on) => `<path d="M88 62 C96 58 110 62 112 72 C114 82 106 88 96 87 C90 86 86 84 85 81 C90 80 96 78 97 74 C98 70 93 67 88 66Z" fill="${on ? f : "#E8956B"}"${st(on)}/><path d="M68 96 q4 -3 8 0 t8 0 t8 0 M68 102 q4 -3 8 0 t8 0 t8 0 M68 108 q4 -3 8 0 t8 0 t8 0 M68 114 q4 -3 8 0 t8 0 t8 0" stroke="${on ? f : "#EDA99B"}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`],
    ["portal", (f, on) => `<path d="M70 96 C64 92 62 88 62 80" stroke="${on ? f : "#7A64B8"}" stroke-width="${on ? 3.2 : 2.2}" fill="none" stroke-linecap="round"/>`],
    ["liver", (f, on) => `<path d="M38 70 C46 62 70 61 84 64 C84 70 76 76 66 80 C56 84 44 84 39 78Z" fill="${on ? f : "#8E3B2E"}"${st(on)}/>`],
    [null, () => `<path d="M80 52 C85 47 93 49 93 56 C93 62 87 66 84 69 C78 66 72 61 73 56 C73 52 76 51 80 52Z" fill="#C8323F"/>`]
  ];
  const BTAG = ["1", 124, 64, "2", 104, 46, "3", 34, 64, "4", 112, 116];
  function body(sp, P) {
    let lo = "", hi = "";
    BODY.forEach(([id, fn]) => { if (id && sp.indexOf(id) >= 0) hi += `<g class="dg-hl" filter="url(#${P}gl)">${fn(HL, true)}</g>`; else lo += fn("", false); });
    const route = `<g transform="rotate(-30 80 27)"><rect x="75" y="24.5" width="10" height="5" rx="2.5" fill="#fff" stroke="#7B4FD0" stroke-width=".8"/><rect x="80" y="24.5" width="5" height="5" rx="2.5" fill="#9B74E0"/></g>`
      + [[84, 50], [92, 76], [80, 100], [64, 88], [60, 74], [78, 34], [82, 84], [98, 60], [45, 84], [115, 84], [70, 100], [96, 100], [80, 128]].map(([x, y]) => dot(x, y)).join("");
    let n = "";
    for (let i = 0; i < BTAG.length; i += 3) n += `<circle cx="${BTAG[i + 1]}" cy="${BTAG[i + 2]}" r="5" fill="#2F4A6B"/><text x="${BTAG[i + 1]}" y="${BTAG[i + 2] + 2.6}" font-family="Chivo, sans-serif" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">${BTAG[i]}</text>`;
    return `<defs><linearGradient id="${P}sk" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#F8DFCF"/><stop offset="1" stop-color="#E9BC9F"/></linearGradient>${glow(P)}</defs>
      <path d="${SK}" fill="url(#${P}sk)" stroke="#D9A88C" stroke-width=".6"/><path d="M80 26 C80 40 82 52 88 62" stroke="#E3A28E" stroke-width="3" fill="none"/>` + lo + route + n + (sp.length ? wash : "") + hi;
  }

  /* ---------- 2. receptor close-up ---------- */
  const REC = "M-14 112 V62 H-6 L0 72 L6 62 H14 V112 Q14 122 0 122 Q-14 122 -14 112Z";
  const KEY = "M-6 62 L0 72 L6 62 V55 Q6 51 2 51 H-2 Q-6 51 -6 55Z";
  const rec = (cx, P) => `<path transform="translate(${cx} 0)" d="${REC}" fill="url(#${P}rc)" stroke="#3E6AAE" stroke-width=".8"/>`;
  function receptor(sp, P) {
    const s = sp[0];
    let mem = "";
    for (let x = 10; x <= 150; x += 7) mem += `<circle cx="${x}" cy="93" r="3" fill="#F2C46D"/><circle cx="${x}" cy="109" r="3" fill="#F2C46D"/><path d="M${x - 1} 96 V101 M${x + 1} 96 V101 M${x - 1} 101.5 V106 M${x + 1} 101.5 V106" stroke="#D9A84E" stroke-width=".7"/>`;
    let pic = "";
    if (s === "agonist") pic = rec(80, P) + `<path transform="translate(80 0)" d="${KEY}" fill="${HL}" stroke="#fff" stroke-width=".8" class="dg-hl" filter="url(#${P}gl)"/>`
      + `<path d="M80 124 L75 132 L84 134 L78 146" stroke="#F4B400" stroke-width="2.4" fill="none" stroke-linejoin="round"/><path d="M60 52 L54 46 M100 52 L106 46 M80 44 V38" stroke="#F4B400" stroke-width="2" stroke-linecap="round"/>`;
    else if (s === "antagonist") pic = rec(80, P) + `<path transform="translate(80 0)" d="M-8 62 L0 68 L8 62 V52 H-8Z" fill="${HL}" stroke="#fff" stroke-width=".8" class="dg-hl" filter="url(#${P}gl)"/>`
      + `<path transform="translate(118 -12) rotate(20)" d="${KEY}" fill="#8A5CD6"/><path d="M110 32 L124 46 M124 32 L110 46" stroke="#D93025" stroke-width="2.4" stroke-linecap="round"/><path d="M74 136 H86" stroke="#8A97A6" stroke-width="2.4" stroke-linecap="round"/>`;
    else if (s === "offtarget") pic = rec(44, P) + rec(116, P) + `<path transform="translate(44 0)" d="${KEY}" fill="#8A5CD6"/><path d="M38 136 L43 141 L52 130" stroke="#2E9E5B" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      + `<path transform="translate(116 0)" d="${KEY}" fill="${HL}" stroke="#fff" stroke-width=".8" class="dg-hl" filter="url(#${P}gl)"/><path d="M116 128 L124 142 H108Z" fill="#F4B400"/><path d="M116 132.5 V137.5 M116 139.5 V140" stroke="#1B2430" stroke-width="1.4" stroke-linecap="round"/>`
      + `<text x="44" y="38" font-family="Chivo, sans-serif" font-size="8" font-weight="700" fill="#2F4A6B" text-anchor="middle">target</text><text x="116" y="38" font-family="Chivo, sans-serif" font-size="8" font-weight="700" fill="#2F4A6B" text-anchor="middle">elsewhere</text>`;
    return `<defs><linearGradient id="${P}rc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7FAAE6"/><stop offset="1" stop-color="#3F6FB8"/></linearGradient>${glow(P)}</defs>
      <rect x="2" y="100" width="156" height="58" fill="#F7E1DC"/><path d="M2 100 H158" stroke="none"/>${mem}${pic}
      <text x="150" y="152" font-family="Chivo, sans-serif" font-size="7" fill="#9C6A60" text-anchor="end">inside the cell</text>`;
  }

  /* ---------- 3. drug level over time ---------- */
  const X0 = 22, X1 = 152, YB = 132, H = 86, KE = Math.LN2 / 20, KA = .35;
  function curve(doses, t) { let c = 0; doses.forEach(([td, a]) => { if (t >= td) c += a * (Math.exp(-KE * (t - td)) - Math.exp(-KA * (t - td))); }); return c; }
  const REG = [0, 20, 40, 60, 80, 100, 120].map(t => [t, 1]);
  let CMAX = 0; for (let t = 0; t <= 128; t++) CMAX = Math.max(CMAX, curve(REG, t));
  const yv = c => (YB - c / CMAX * H).toFixed(1), xv = t => (X0 + t).toFixed(1);
  const pathOf = (doses, a, b) => { let d = ""; for (let t = a; t <= b; t++) d += (d ? "L" : "M") + xv(t) + " " + yv(curve(doses, t)); return d; };
  function graph(sp, P) {
    const s = sp[0], lo = YB - .42 * H, up = YB - 1.12 * H;
    const gl = `class="dg-hl" filter="url(#${P}gl)"`;
    let g = `<defs>${glow(P)}</defs><rect x="${X0}" y="${up}" width="${X1 - X0}" height="${lo - up}" fill="${s === "range" ? HL : "#8FD3B6"}" opacity="${s === "range" ? .35 : .4}"/>`
      + (s === "range" ? `<path d="M${X0} ${up}H${X1}M${X0} ${lo}H${X1}" stroke="${HL}" stroke-width="1.6" ${gl}/>` : "")
      + `<text x="${X1 - 2}" y="${up + 7}" font-family="Chivo, sans-serif" font-size="6.5" fill="#B24A3A" text-anchor="end" opacity=".8">too high</text><text x="${X1 - 2}" y="${lo + 8}" font-family="Chivo, sans-serif" font-size="6.5" fill="#6F7F8E" text-anchor="end">too low</text>`
      + `<path d="M${X0} 22 V${YB} H${X1 + 2}" stroke="#2F4A6B" stroke-width="1.4" fill="none"/><text x="${X0 - 6}" y="78" font-family="Chivo, sans-serif" font-size="7" fill="#2F4A6B" transform="rotate(-90 ${X0 - 6} 78)" text-anchor="middle">drug level</text><text x="86" y="${YB + 10}" font-family="Chivo, sans-serif" font-size="7" fill="#2F4A6B" text-anchor="middle">time</text>`;
    const doses = s === "halflife" ? [[0, 1.7]] : s === "loading" ? [[0, 2]].concat(REG.slice(1)) : REG;
    g += (s === "halflife" ? [[0]] : REG).map(([t]) => `<path d="M${xv(t)} ${YB + 1} l-2.5 4 h5Z" fill="#7B4FD0"/>`).join("");
    if (s === "loading") g += `<path d="${pathOf(REG, 0, 128)}" stroke="#3A6EA5" stroke-width="1.6" fill="none" stroke-dasharray="3 2" opacity=".7"/>`;
    const main = pathOf(doses, 0, 128);
    g += `<path d="${main}" stroke="${s === "loading" ? HL : "#3A6EA5"}" stroke-width="${s === "loading" ? 2.6 : 2}" fill="none" stroke-linejoin="round" ${s === "loading" ? gl : ""}/>`;
    if (s === "steady") g += `<path d="${pathOf(REG, 80, 128)}" stroke="${HL}" stroke-width="3" fill="none" ${gl}/><path d="M${xv(80)} 140 H${xv(128)} M${xv(80)} 137 V143 M${xv(128)} 137 V143" stroke="${HL}" stroke-width="1.6"/>`;
    if (s === "peak" || s === "trough") {
      let m = "";
      for (let k = 0; k < REG.length; k++) {
        const a = k * 20, b = Math.min(a + 20, 128); let best = a, bt = a;
        for (let t = a; t < b; t++) { if (curve(REG, t) > curve(REG, best)) best = t; }
        bt = b - 1;
        const t = s === "peak" ? best : bt; if (s === "trough" && b === 128) continue;
        m += `<circle cx="${xv(t)}" cy="${yv(curve(REG, t))}" r="3.4" fill="${HL}" stroke="#fff" stroke-width="1"/>`;
      }
      g += `<g ${gl}>${m}</g>`;
    }
    if (s === "halflife") {
      const ys = [30, 50, 70].map(t => yv(curve(doses, t)));
      g += `<g ${gl} stroke="${HL}" stroke-width="1.4" fill="none">`
        + [30, 50, 70].map((t, i) => `<path d="M${X0} ${ys[i]} H${xv(t)} V${YB}" stroke-dasharray="${i ? "2 2" : "none"}"/>`).join("")
        + `</g>` + [30, 50, 70].map((t, i) => `<circle cx="${xv(t)}" cy="${ys[i]}" r="3" fill="${HL}" stroke="#fff"/>`).join("")
        + `<text x="${xv(52)}" y="${+ys[1] - 6}" font-family="Chivo, sans-serif" font-size="8" font-weight="800" fill="${HL}">½</text><text x="${xv(72)}" y="${+ys[2] - 6}" font-family="Chivo, sans-serif" font-size="8" font-weight="800" fill="${HL}">¼</text>`;
    }
    return g;
  }

  B.DIAGRAMS["drug-path"] = item => {
    const P = D.uid(), sp = D.spots(item), s = sp[0];
    const inner = RX.indexOf(s) >= 0 ? receptor(sp, P) : GR.indexOf(s) >= 0 ? graph(sp, P) : body(sp, P);
    const lab = sp.length ? D.tag(80, RX.indexOf(s) >= 0 || GR.indexOf(s) >= 0 ? 12 : 151, LBL[sp.join(",")] || LBL[s] || "") : "";
    return D.frame(inner + lab, item ? item.name : "A tablet's journey: gut, blood, liver, kidneys");
  };
})();
