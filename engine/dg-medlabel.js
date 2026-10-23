/* BioglowRX diagram "medlabel" — a pharmacy medication label / administration card.
   spot = the field a "right" checks: patient, drug, dose, route, time, reason, response, doc, refuse.
   For do-not-use abbreviation items the label shows the risky wording crossed out and the safe wording. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const BASE = { patient: "Jane Smith · DOB 02/03/1961", drug: "Amoxicillin 500 mg capsules", dose: "1 capsule (500 mg)", route: "By mouth",
    time: "8 am · 2 pm · 10 pm", reason: "Chest infection", response: "Rash? Fever falling?" };
  // abbreviation items: field overrides + [field, risky, safe]
  const ABBR = {
    "U for units": [{ drug: "Insulin glargine", route: "Under the skin", time: "Once daily, 10 pm", reason: "Diabetes", response: "Blood sugar" }, "dose", "10U", "10 units"],
    "IU for international units": [{ drug: "Vitamin D3 (colecalciferol)", time: "Once daily", reason: "Low vitamin D", response: "Vitamin D level" }, "dose", "1000 IU", "1000 international units", "IU", "international units"],
    "QD and QOD": [{ drug: "Furosemide 40 mg tablets", dose: "1 tablet (40 mg)", reason: "Fluid retention", response: "Weight, ankle swelling" }, "time", "QD", "daily"],
    "Trailing zero (5.0 mg)": [{ drug: "Warfarin tablets", time: "Once daily, 6 pm", reason: "Prevent clots", response: "INR blood test" }, "dose", "5.0 mg", "5 mg"],
    "No leading zero (.5 mg)": [{ drug: "Lorazepam tablets", time: "At night", reason: "Anxiety", response: "Drowsiness" }, "dose", ".5 mg", "0.5 mg"],
    "MS, MSO4 and MgSO4": [{ dose: "10 mg", route: "By mouth", time: "Every 4 hours", reason: "Severe pain", response: "Pain score, breathing" }, "drug", "MSO4", "morphine sulfate"]
  };
  const ROWS = [["patient", "Patient"], ["drug", "Drug"], ["dose", "Dose"], ["route", "Route"], ["time", "Time"], ["reason", "For"], ["response", "Watch"]];
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}"${a ? ` text-anchor="${a}"` : ""}>${BGX.esc(txt)}</text>`;
  const hlBox = (it, id, x, y, w, h) => dg.is(it, id) ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${dg.HL}" fill-opacity=".28" stroke="${dg.HL}" stroke-width="2.2" class="dg-hl"/>` : "";

  BGX.DIAGRAMS.medlabel = item => {
    const p = dg.uid(), ab = item && ABBR[item.name], v = Object.assign({}, BASE, ab ? ab[0] : {});
    let o = `<defs><linearGradient id="${p}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f1f4f6"/></linearGradient>
      <linearGradient id="${p}t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1f8f8a"/><stop offset="1" stop-color="#2f6fb8"/></linearGradient></defs>
      <rect x="13" y="12" width="136" height="140" rx="7" fill="#000" opacity=".12"/>
      <rect x="11" y="9" width="136" height="140" rx="7" fill="url(#${p}c)" stroke="#c9d2da"/>
      <path d="M11 16 Q11 9 18 9 H140 Q147 9 147 16 V26 H11Z" fill="url(#${p}t)"/>
      ${T(18, 21, 8, 800, "#fff", "℞  PHARMACY LABEL")}${T(141, 21, 6.5, 700, "#d9f2f0", "Ward 4B", "end")}`;
    let y = 30;
    ROWS.forEach(([id, lab]) => {
      o += hlBox(item, id, 14, y, 130, 11.5);
      o += T(18, y + 9, 6.2, 700, "#6b7785", lab.toUpperCase());
      if (ab && ab[1] === id) {
        const rx = 46, rw = ab[2].length * 4.6, sw = ab[3].length * (ab[3].length > 14 ? 3.4 : 4.4);
        o += rw + sw + 6 > 96 ? T(rx, y + 9, 6.6, 800, "#1b7a3a", ab[3]) : T(rx, y + 9, 7.5, 800, "#c0262d", ab[2]) + `<path d="M${rx - 1} ${y + 6} H${rx + rw + 1}" stroke="#c0262d" stroke-width="1.4"/>` + T(rx + rw + 5, y + 9, ab[3].length > 14 ? 6 : 7.5, 800, "#1b7a3a", ab[3]);
      } else o += T(46, y + 9, id === "patient" || v[id].length > 22 ? 6.6 : 7.5, id === "drug" ? 800 : 600, "#1B2430", v[id]);
      y += 12;
    });
    // given / refused record row
    o += hlBox(item, "doc", 14, y, 64, 13) + hlBox(item, "refuse", 80, y, 64, 13);
    o += `<rect x="18" y="${y + 3}" width="7" height="7" rx="1.5" fill="#fff" stroke="#6b7785"/><path d="M19.5 ${y + 6.5} L21.5 ${y + 8.5} L24 ${y + 4.5}" stroke="#1b7a3a" stroke-width="1.4" fill="none"/>` +
      T(28, y + 9, 6.6, 700, "#1B2430", "Given · sign") + `<rect x="84" y="${y + 3}" width="7" height="7" rx="1.5" fill="#fff" stroke="#6b7785"/>` + T(94, y + 9, 6.6, 700, "#1B2430", "Refused · why");
    y += 16;
    if (ab) {
      // big before → after callout, readable even when tiny
      const cr = ab[4] || ab[2], cs = ab[5] || ab[3];
      o += `<rect x="16" y="${y}" width="126" height="${146 - y}" rx="5" fill="#fff" stroke="#e3e8ec"/>` +
        T(44, y + 12, cr.length > 5 ? 10 : 12, 800, "#c0262d", cr, "middle") + `<path d="M${44 - cr.length * (cr.length > 5 ? 3 : 3.6)} ${y + 8} H${44 + cr.length * (cr.length > 5 ? 3 : 3.6)}" stroke="#c0262d" stroke-width="2.2"/>` +
        `<path d="M72 ${y + 8} H84 M80 ${y + 4} L85 ${y + 8} L80 ${y + 12}" stroke="#6b7785" stroke-width="1.8" fill="none"/>` +
        (cs.length > 12 ? (() => { const k = cs.lastIndexOf(" "); return T(114, y + 7, 8, 800, "#1b7a3a", cs.slice(0, k), "middle") + T(114, y + 14.5, 8, 800, "#1b7a3a", cs.slice(k + 1), "middle"); })() : T(114, y + 12, cs.length > 9 ? 8.5 : 12, 800, "#1b7a3a", cs, "middle"));
    } else {
      // barcode + expiry
      let bars = "", x = 18;
      for (let i = 0; i < 30; i++) { const w = [1, 1.6, 0.8, 2.2][(i * 7 + 3) % 4]; bars += `<rect x="${x.toFixed(1)}" y="${y}" width="${w}" height="14" fill="#1B2430"/>`; x += w + 1.1; }
      o += `${bars}` + T(141, y + 7, 6.2, 700, "#6b7785", "EXP", "end") + T(141, y + 16, 7.5, 800, "#1B2430", "03/2027", "end");
    }
    const lab = item ? (ab ? `Label: write “${ab[3]}”, not “${ab[2]}”` : `Medication label: ${item.name}`) : "A medication label";
    return dg.frame(o, lab);
  };
})();
