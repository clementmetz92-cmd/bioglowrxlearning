/* BioglowRX diagram "tissue" — stylised micrographs (H&E-style pink and purple) in a round field of view.
   The key feature of each tissue is drawn in the highlight colour.
   Spot ids: simpleSquamous simpleCuboidal simpleColumnar pseudo keratinised nonKeratinised transitional
             areolar adipose denseRegular denseIrregular reticular hyaline elastic fibrocartilage bone blood
             skeletal cardiac smooth neuron glia mucous serous exocrine endocrine
   Overview (null): four mini fields, one per tissue type. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const PINK = "#F4C6D6", PINK2 = "#E9A3BD", PALE = "#FBE7EE", NUC = "#5B3A8E", NUC2 = "#7A55B0", COL = "#E58FAE", INK = "#1B2430";
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  let seed = 1; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const R = (a, b) => a + rnd() * (b - a);
  const nuc = (x, y, rx, ry, rot, col) => `<ellipse cx="${(+x).toFixed(1)}" cy="${(+y).toFixed(1)}" rx="${rx}" ry="${ry}" transform="rotate(${rot || 0} ${(+x).toFixed(1)} ${(+y).toFixed(1)})" fill="${col || NUC}"/>`;
  const hl = s => `<g class="dg-hl">${s}</g>`;
  const CX = 80, CY = 72, RAD = 62;

  /* epithelium helpers: tissue sits on a basement membrane at y=bm, lumen above */
  const lumen = top => `<rect x="0" y="0" width="160" height="${top}" fill="#FFF7FA"/>`;
  const ct = (y) => { let o = `<rect x="0" y="${y}" width="160" height="${160 - y}" fill="${PALE}"/>`; for (let i = 0; i < 14; i++) { const x = R(10, 150), yy = R(y + 6, 140); o += `<path d="M${x.toFixed(1)} ${yy.toFixed(1)} q${R(8, 16).toFixed(1)} ${R(-6, 6).toFixed(1)} ${R(18, 30).toFixed(1)} ${R(-4, 4).toFixed(1)}" stroke="${COL}" stroke-width="1.2" fill="none"/>`; if (i % 3 === 0) o += nuc(R(14, 146), R(y + 8, 136), 3.4, 1.4, R(-30, 30), NUC2); } return o; };
  const bm = y => `<path d="M0 ${y} H160" stroke="#B0607F" stroke-width="1.6"/>`;

  const L = () => "";   /* labels inside the field would be scaled below 7px, so the Explore card text names the features instead */
  const S = {
    simpleSquamous: () => { let o = lumen(70) + ct(76) + `<path d="M0 74 H160" stroke="${PINK2}" stroke-width="5"/>` + bm(76.5);
      for (let i = 0; i < 5; i++) o += nuc(14 + i * 33, 71.5, 7, 2.6, 0); return o + hl(`<path d="M30 74 H64" stroke="${HL}" stroke-width="5"/>` + nuc(47, 71.5, 7, 2.6, 0, "#fff")) + L(80, 44, 8, 700, "#9a5a78", "air / blood"); },
    simpleCuboidal: () => { let o = `<rect width="160" height="160" fill="${PALE}"/><circle cx="80" cy="72" r="46" fill="${PINK}"/><circle cx="80" cy="72" r="24" fill="#FFF7FA"/>`;
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5, a2 = a + Math.PI / 5; o += `<path d="M${(80 + 24 * Math.cos(a)).toFixed(1)} ${(72 + 24 * Math.sin(a)).toFixed(1)} L${(80 + 46 * Math.cos(a)).toFixed(1)} ${(72 + 46 * Math.sin(a)).toFixed(1)}" stroke="${PINK2}" stroke-width="1.4"/>`;
        const m = a + Math.PI / 10; o += i === 0 ? hl(`<circle cx="${(80 + 35 * Math.cos(m)).toFixed(1)}" cy="${(72 + 35 * Math.sin(m)).toFixed(1)}" r="5" fill="${HL}"/>`) : `<circle cx="${(80 + 35 * Math.cos(m)).toFixed(1)}" cy="${(72 + 35 * Math.sin(m)).toFixed(1)}" r="4.6" fill="${NUC}"/>`; }
      return o + L(80, 75, 7.5, 700, "#9a5a78", "lumen"); },
    simpleColumnar: () => { let o = lumen(30) + ct(98) + `<rect x="0" y="30" width="160" height="68" fill="${PINK}"/>` + bm(98);
      for (let i = 0; i <= 12; i++) o += `<path d="M${i * 13} 30 V98" stroke="${PINK2}" stroke-width="1.2"/>`;
      for (let i = 0; i < 12; i++) o += i === 5 ? `<path d="M${i * 13 + 2} 32 Q${i * 13 + 6.5} 64 ${i * 13 + 11} 32 Z" fill="#fff" stroke="#C7A9D9"/>` + nuc(i * 13 + 6.5, 88, 3, 4) : nuc(i * 13 + 6.5, 84, 3, 6);
      return o + `<path d="M0 30 H160" stroke="#C77A9A" stroke-width="2.4" stroke-dasharray="1 1.4"/>` + hl(`<rect x="91" y="30" width="13" height="68" fill="none" stroke="${HL}" stroke-width="2.4"/>`) + L(80, 22, 7.5, 700, "#9a5a78", "lumen · goblet cell outlined"); },
    pseudo: () => { let o = lumen(30) + ct(102) + `<rect x="0" y="30" width="160" height="72" fill="${PINK}"/>` + bm(102);
      for (let i = 0; i < 160; i += 4) o += `<path d="M${i} 30 v-7" stroke="${HL}" stroke-width="1.1" class="dg-hl"/>`;
      const ys = [48, 66, 88, 56, 94, 72, 50, 84, 62, 96, 54, 78];
      for (let i = 0; i < 12; i++) o += nuc(i * 13 + 6.5, ys[i], 3, 5.5);
      for (let i = 0; i <= 12; i++) o += `<path d="M${i * 13} 30 L${i * 13 + R(-4, 4)} 102" stroke="${PINK2}" stroke-width="1"/>`;
      return o + L(80, 16, 7.5, 700, "#9a5a78", "cilia on top · nuclei at many levels"); },
    keratinised: () => { let o = ct(122) + `<rect x="0" y="12" width="160" height="110" fill="${PINK}"/>`;
      o += hl(`<rect x="0" y="12" width="160" height="26" fill="#F7A8C6"/>` + [16, 21, 26, 31, 36].map(y => `<path d="M0 ${y} H160" stroke="#fff" stroke-width=".8" opacity=".8"/>`).join(""));
      for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const y = 48 + r * 19, flat = 1 - r * .2; o += nuc(i * 18 + 9 + (r % 2) * 9, y, 3 + r * .4, 2 + r * .6, 0); }
      return o + bm(122) + L(80, 10, 7, 700, "#9a5a78", "dead keratin flakes on top"); },
    nonKeratinised: () => { let o = lumen(20) + ct(124) + `<rect x="0" y="20" width="160" height="104" fill="${PINK}"/>`;
      for (let r = 0; r < 5; r++) for (let i = 0; i < 9; i++) { const y = 28 + r * 21; o += r === 0 ? hl(nuc(i * 18 + 9, y, 7, 2, 0, HL)) : nuc(i * 18 + 9 + (r % 2) * 9, y, 2.8 + r * .5, 1.8 + r * .7, 0); }
      return o + bm(124) + L(80, 14, 7, 700, "#9a5a78", "flat but living (nucleated) top cells"); },
    transitional: () => { let o = lumen(34) + ct(116) + `<rect x="0" y="40" width="160" height="76" fill="${PINK}"/>`;
      for (let i = 0; i < 6; i++) { const x = 14 + i * 26.4; o += (i === 2 ? hl(`<path d="M${x - 13} 42 Q${x} 18 ${x + 13} 42 Z" fill="${HL}"/>`) : `<path d="M${x - 13} 42 Q${x} 18 ${x + 13} 42 Z" fill="${PINK}" stroke="${PINK2}"/>`) + nuc(x, 34, 3.8, 3, 0, i === 2 ? "#fff" : NUC); }
      for (let r = 0; r < 3; r++) for (let i = 0; i < 8; i++) o += nuc(i * 20 + 10 + (r % 2) * 10, 58 + r * 18, 3.4, 4, 0);
      return o + bm(116) + L(80, 14, 7, 700, "#9a5a78", "dome-shaped umbrella cells"); },
    areolar: () => { let o = `<rect width="160" height="160" fill="#FFF3F7"/>`;
      for (let i = 0; i < 9; i++) { const x = R(10, 140), y = R(16, 130); o += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${R(10, 30).toFixed(1)} ${R(-20, 20).toFixed(1)} ${R(40, 70).toFixed(1)} ${R(-10, 10).toFixed(1)}" stroke="${COL}" stroke-width="3.6" fill="none"/>`; }
      o += hl(Array.from({ length: 7 }, () => { const x = R(10, 140), y = R(16, 130); return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${R(10, 25).toFixed(1)} ${R(-25, 25).toFixed(1)} ${R(30, 55).toFixed(1)} ${R(-10, 10).toFixed(1)}" stroke="${HL}" stroke-width="1" fill="none"/>`; }).join(""));
      for (let i = 0; i < 9; i++) o += nuc(R(16, 144), R(20, 128), 4, 1.8, R(-40, 40));
      return o + L(124, 126, 7, 700, "#9a5a78", "lots of space"); },
    adipose: () => { let o = `<rect width="160" height="160" fill="${PINK2}"/>`;
      const cells = [[34, 34], [80, 26], [126, 36], [20, 80], [62, 72], [106, 76], [146, 84], [40, 120], [86, 118], [128, 124]];
      cells.forEach(([x, y], i) => { o += `<circle cx="${x}" cy="${y}" r="22" fill="#FFFBFD" stroke="${PINK2}" stroke-width="2"/>`; o += i === 4 ? hl(`<circle cx="${x}" cy="${y}" r="22" fill="none" stroke="${HL}" stroke-width="2.6"/>` + nuc(x - 18, y + 8, 4.4, 2, 60, HL)) : nuc(x + 17, y - 12, 4, 1.8, -50); });
      return o + L(62, 75, 7, 700, "#9a5a78", "fat droplet"); },
    denseRegular: () => { let o = `<rect width="160" height="160" fill="${PINK}"/>`;
      for (let i = 0; i < 16; i++) { const y = 10 + i * 9; o += `<path d="M0 ${y} ${Array.from({ length: 16 }, (_, k) => `Q${k * 10 + 5} ${y + (k % 2 ? 2.5 : -2.5)} ${k * 10 + 10} ${y}`).join(" ")}" stroke="${i === 7 ? HL : COL}" stroke-width="${i === 7 ? 2.6 : 2.2}" fill="none"${i === 7 ? ' class="dg-hl"' : ""}/>`;
        if (i % 2) for (let k = 0; k < 4; k++) o += nuc(R(8, 150), y + 4.5, 5, 1.3, 0); }
      return o; },
    denseIrregular: () => { let o = `<rect width="160" height="160" fill="${PALE}"/>`;
      for (let i = 0; i < 22; i++) { const x = R(0, 150), y = R(4, 150), a = R(0, 180); o += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${R(30, 56).toFixed(1)}" height="${R(7, 11).toFixed(1)}" rx="4" fill="${COL}" opacity=".85" transform="rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }
      o += hl(`<rect x="52" y="60" width="54" height="10" rx="5" fill="${HL}" transform="rotate(-35 79 65)"/><rect x="58" y="74" width="48" height="10" rx="5" fill="${HL}" transform="rotate(40 82 79)"/>`);
      for (let i = 0; i < 6; i++) o += nuc(R(16, 144), R(16, 140), 3.6, 1.4, R(0, 180));
      return o; },
    reticular: () => { let o = `<rect width="160" height="160" fill="#F5E9D8"/>`;
      for (let i = 0; i < 26; i++) o += `<circle cx="${R(10, 150).toFixed(1)}" cy="${R(10, 150).toFixed(1)}" r="4.4" fill="${NUC2}" opacity=".75"/>`;
      const pts = Array.from({ length: 22 }, () => [R(4, 156), R(4, 146)]);
      o += hl(pts.map(([x, y], i) => { const [x2, y2] = pts[(i * 7 + 3) % pts.length]; return Math.hypot(x - x2, y - y2) < 70 ? `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#2A1B2E" stroke-width="1.3"/>` : ""; }).join("") + pts.map(([x, y], i) => { const [x2, y2] = pts[(i + 1) % pts.length]; return Math.hypot(x - x2, y - y2) < 60 ? `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#2A1B2E" stroke-width="1.3"/>` : ""; }).join(""));
      return o + L(118, 140, 7, 700, "#5a4a3a", "black fibre mesh"); },
    hyaline: () => { let o = `<rect width="160" height="160" fill="#D8D3EE"/>`;
      [[40, 40, 2], [92, 34, 1], [128, 56, 2], [34, 92, 1], [80, 82, 2], [122, 108, 1], [56, 126, 2], [100, 130, 1]].forEach(([x, y, n], i) => {
        for (let k = 0; k < n; k++) { const xx = x + k * 11; o += i === 4 && k === 0 ? hl(`<circle cx="${xx}" cy="${y}" r="7" fill="#fff" stroke="${HL}" stroke-width="2.4"/>`) + nuc(xx, y, 3, 3) : `<circle cx="${xx}" cy="${y}" r="6.4" fill="#F7F5FC" stroke="#9C8FCB" stroke-width="1.2"/>` + nuc(xx, y, 2.8, 2.8); } });
      return o + L(80, 104, 7, 700, "#5a4f88", "glassy matrix, cell in a lacuna"); },
    elastic: () => { let o = `<rect width="160" height="160" fill="#E4D6EA"/>`;
      for (let i = 0; i < 40; i++) { const x = R(0, 160), y = R(0, 160); o += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${R(-10, 10).toFixed(1)} ${R(4, 12).toFixed(1)} ${R(-14, 14).toFixed(1)} ${R(10, 20).toFixed(1)}" stroke="#3A2147" stroke-width="1.4" fill="none"/>`; }
      [[36, 40], [90, 32], [130, 60], [40, 96], [86, 84], [124, 116], [60, 128]].forEach(([x, y], i) => o += `<circle cx="${x}" cy="${y}" r="7.4" fill="#F7F5FC" stroke="${i === 4 ? HL : "#9C8FCB"}" stroke-width="${i === 4 ? 2.4 : 1.2}"/>` + nuc(x, y, 3, 3));
      return o + hl(`<path d="M92 76 q8 10 2 22 M78 92 q-8 8 -4 18" stroke="${HL}" stroke-width="2.2" fill="none"/>`); },
    fibrocartilage: () => { let o = `<rect width="160" height="160" fill="#F2D5DF"/>`;
      for (let i = 0; i < 9; i++) { const y = 12 + i * 17; o += `<path d="M0 ${y} Q40 ${y - 4} 80 ${y} T160 ${y}" stroke="${i === 4 ? HL : COL}" stroke-width="${i === 4 ? 6 : 5}" fill="none"${i === 4 ? ' class="dg-hl"' : ""}/>`;
        if (i < 8) for (let k = 0; k < 5; k++) o += `<circle cx="${18 + k * 30}" cy="${y + 8.5}" r="4" fill="#fff" stroke="#9C8FCB"/>` + nuc(18 + k * 30, y + 8.5, 2, 2); }
      return o; },
    bone: () => { let o = `<rect width="160" height="160" fill="#EDE0CF"/>`;
      [[52, 58], [114, 92], [40, 130]].forEach(([x, y], j) => { for (let r = 34; r > 8; r -= 6) o += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${j === 0 && r === 10 ? HL : "#C9AF8E"}" stroke-width="${j === 0 && r === 10 ? 3 : 1.4}"${j === 0 && r === 10 ? ' class="dg-hl"' : ""}/>`;
        o += `<circle cx="${x}" cy="${y}" r="6" fill="${j === 0 ? HL : "#B85C5C"}"${j === 0 ? ' class="dg-hl"' : ""}/>`;
        for (let k = 0; k < 10; k++) { const a = k * .63, rr = 15 + (k % 3) * 7; const px = x + rr * Math.cos(a), py = y + rr * Math.sin(a); o += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="2.6" ry="1.4" fill="#3E2E26" transform="rotate(${(a * 57.3 + 90).toFixed(0)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`; } });
      return o + L(110, 30, 7, 700, "#6a5038", "osteon"); },
    blood: () => { let o = `<rect width="160" height="160" fill="#FCEEE8"/>`;
      for (let i = 0; i < 34; i++) { const x = R(8, 152), y = R(8, 150); o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#E9707B"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#F6B2B8"/>`; }
      o += hl(`<circle cx="80" cy="72" r="13" fill="#F1E6F5" stroke="${HL}" stroke-width="2.4"/><path d="M72 68 q4 -6 8 0 q4 -6 8 0 q2 6 -4 8 q-4 4 -8 0 q-6 0 -4 -8Z" fill="${NUC}"/>`);
      for (let i = 0; i < 6; i++) o += `<circle cx="${R(10, 150).toFixed(1)}" cy="${R(10, 150).toFixed(1)}" r="1.8" fill="${NUC2}"/>`;
      return o + L(80, 100, 7, 700, "#9a3a48", "white cell among red cells"); },
    skeletal: () => { let o = `<rect width="160" height="160" fill="#F4D9E3"/>`;
      for (let f = 0; f < 4; f++) { const y = 10 + f * 36; o += `<rect x="-5" y="${y}" width="170" height="32" rx="6" fill="${f === 1 ? "#F7B7CC" : "#EDA6BF"}"${f === 1 ? ` stroke="${HL}" stroke-width="2.4" class="dg-hl"` : ""}/>`;
        for (let x = 2; x < 160; x += 4) o += `<path d="M${x} ${y + 2} v28" stroke="#B5547A" stroke-width="${x % 8 ? .6 : 1.4}" opacity=".7"/>`;
        for (let k = 0; k < 4; k++) o += nuc(16 + k * 40 + f * 7, y + 3.2, 6, 1.8, 0); }
      return o; },
    cardiac: () => { let o = `<rect width="160" height="160" fill="#F4D9E3"/>`;
      const fib = (pts) => `<path d="M${pts.join(" L")}" stroke="#EDA6BF" stroke-width="22" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
      o += fib(["-10 36", "60 30", "100 50", "170 40"]) + fib(["-10 86", "50 84", "100 50"]) + fib(["50 84", "110 100", "170 96"]) + fib(["-10 132", "80 128", "110 100"]);
      for (let x = 0; x < 160; x += 3.4) o += `<path d="M${x} 0 v160" stroke="#B5547A" stroke-width=".5" opacity=".25"/>`;
      [[24, 34], [80, 38], [130, 45], [24, 86], [80, 92], [140, 98], [40, 130]].forEach(([x, y]) => o += nuc(x, y, 4.6, 3));
      o += hl(`<path d="M52 22 l3 6 -3 6 3 6" stroke="${HL}" stroke-width="3" fill="none"/><path d="M122 86 l-3 6 3 6 -3 6" stroke="${HL}" stroke-width="3" fill="none"/>`);
      return o + L(80, 152, 7, 700, "#9a3a5a", "branching cells · intercalated discs"); },
    smooth: () => { let o = `<rect width="160" height="160" fill="#F4D9E3"/>`;
      for (let r = 0; r < 7; r++) for (let k = 0; k < 4; k++) { const x = k * 46 + (r % 2) * 23 - 6, y = 14 + r * 19; const hlx = r === 3 && k === 1;
        o += `<path d="M${x - 22} ${y} Q${x} ${y - 9} ${x + 22} ${y} Q${x} ${y + 9} ${x - 22} ${y}Z" fill="${hlx ? "#F7B7CC" : "#EDA6BF"}" stroke="${hlx ? HL : "#D489A6"}" stroke-width="${hlx ? 2.4 : .8}"${hlx ? ' class="dg-hl"' : ""}/>` + nuc(x, y, 6, 1.8, 0); }
      return o; },
    neuron: () => { let o = `<rect width="160" height="160" fill="#F1E3EE"/>`;
      for (let i = 0; i < 26; i++) o += `<circle cx="${R(6, 154).toFixed(1)}" cy="${R(6, 154).toFixed(1)}" r="2.2" fill="${NUC2}" opacity=".8"/>`;
      o += hl(`<path d="M80 72 L30 30 M80 72 L40 110 M80 72 L118 22 M80 72 L150 112" stroke="${HL}" stroke-width="5" stroke-linecap="round"/><path d="M80 72 L26 64" stroke="${HL}" stroke-width="3"/><path d="M80 72 C100 90 110 130 150 150" stroke="${HL}" stroke-width="2.6" fill="none"/><path d="M60 72 L80 52 L100 72 L80 94 Z" fill="${HL}"/>`);
      return o + `<circle cx="80" cy="72" r="8" fill="#fff"/><circle cx="80" cy="72" r="3" fill="${NUC}"/>` + L(120, 150, 7, 700, "#6a4a7a", "axon"); },
    glia: () => { let o = `<rect width="160" height="160" fill="#F1E3EE"/>`;
      o += `<path d="M64 72 L80 54 L96 72 L80 92 Z" fill="#B78ACB"/><path d="M80 72 L30 34 M80 72 L130 30 M80 72 L44 120 M80 72 L140 120" stroke="#B78ACB" stroke-width="4" stroke-linecap="round"/><circle cx="80" cy="72" r="6" fill="#fff"/><circle cx="80" cy="72" r="2.4" fill="${NUC}"/>`;
      o += hl([[54, 50], [108, 52], [60, 100], [104, 100], [34, 74], [128, 76], [80, 32], [82, 118]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${HL}"/>`).join(""));
      return o + L(80, 150, 7, 700, "#6a4a7a", "small glia around a neuron"); },
    mucous: () => S.simpleColumnar() + hl(`<rect x="0" y="98" width="160" height="6" fill="${HL}" opacity=".5"/>`) + L(80, 122, 7, 700, "#9a5a78", "lamina propria (areolar)"),
    serous: () => { let o = `<rect width="160" height="160" fill="${PALE}"/><rect x="0" y="0" width="160" height="56" fill="#FFF7FA"/>`;
      o += hl(`<path d="M0 60 H160" stroke="${HL}" stroke-width="5"/>` + [16, 50, 84, 118, 150].map(x => nuc(x, 58, 6, 2.4, 0, "#fff")).join(""));
      o += ct(66); return o + L(80, 36, 7.5, 700, "#9a5a78", "cavity: thin watery fluid") + L(80, 140, 7, 700, "#9a5a78", "thin connective tissue"); },
    exocrine: () => { let o = `<rect width="160" height="160" fill="${PALE}"/>`;
      o += hl(`<path d="M80 2 V58" stroke="${HL}" stroke-width="9" stroke-linecap="round"/><path d="M80 2 V58" stroke="#fff" stroke-width="3"/>`);
      [[50, 84], [80, 98], [110, 84], [64, 124], [98, 124]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="18" fill="#C9A1D9"/><circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; o += nuc(x + 12 * Math.cos(a), y + 12 * Math.sin(a), 2.4, 2.4); } });
      o += `<path d="M80 58 L50 84 M80 58 L80 98 M80 58 L110 84" stroke="#fff" stroke-width="2"/>`;
      return o + L(110, 20, 7.5, 700, "#7a4a8a", "duct", "start"); },
    endocrine: () => { let o = `<rect width="160" height="160" fill="#E8C6DA"/>`;
      o += `<ellipse cx="80" cy="74" rx="48" ry="40" fill="#F6E6EE" stroke="#D4A7BF"/>`;
      for (let i = 0; i < 28; i++) { const a = R(0, 6.28), r = R(4, 34); o += nuc(80 + r * Math.cos(a) * 1.15, 74 + r * Math.sin(a) * .95, 2.6, 2.6); }
      o += hl([[52, 54, 96, 60], [56, 96, 104, 90], [80, 40, 82, 110]].map(([a, b, c, d]) => `<path d="M${a} ${b} Q80 74 ${c} ${d}" stroke="${HL}" stroke-width="3.4" fill="none"/>`).join(""));
      return o + L(80, 132, 7, 700, "#7a3a5a", "no duct · capillaries (pink)"); }
  };
  const NAMES = { simpleSquamous: "Simple squamous", simpleCuboidal: "Simple cuboidal", simpleColumnar: "Simple columnar", pseudo: "Pseudostratified", keratinised: "Keratinised squamous", nonKeratinised: "Non-keratinised sq.", transitional: "Transitional",
    areolar: "Areolar", adipose: "Adipose", denseRegular: "Dense regular", denseIrregular: "Dense irregular", reticular: "Reticular", hyaline: "Hyaline cartilage", elastic: "Elastic cartilage", fibrocartilage: "Fibrocartilage", bone: "Compact bone", blood: "Blood",
    skeletal: "Skeletal muscle", cardiac: "Cardiac muscle", smooth: "Smooth muscle", neuron: "Neuron", glia: "Neuroglia", mucous: "Mucous membrane", serous: "Serous membrane", exocrine: "Exocrine gland", endocrine: "Endocrine gland" };
  const field = (inner, p, cx, cy, r) => `<defs><clipPath id="${p}c${cx}${cy}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
    <circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="#2A2F3A"/><g clip-path="url(#${p}c${cx}${cy})"><g transform="translate(${cx - r} ${cy - r}) scale(${(2 * r / 160).toFixed(4)})">${inner}</g></g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2A2F3A" stroke-width="1.5"/>`;
  BGX.DIAGRAMS.tissue = item => {
    const p = dg.uid(), sp = dg.spots(item)[0];
    seed = 7 + (sp ? sp.length * 31 + sp.charCodeAt(0) : 0);
    if (S[sp]) return dg.frame(field(S[sp](), p, CX, CY, RAD) + dg.tag(80, 148, NAMES[sp]), (item.name || NAMES[sp]) + ": under the microscope", ["#F3F1F6", "#DCD8E4"]);
    const mini = [["simpleColumnar", 42, 42, "Epithelial"], ["denseRegular", 118, 42, "Connective"], ["skeletal", 42, 112, "Muscle"], ["neuron", 118, 112, "Nervous"]];
    return dg.frame(mini.map(([s, x, y, n]) => { seed = 11; return field(S[s]().replace(/class="dg-hl"/g, ""), p, x, y - 4, 27) + T(x, y + 33, 8, 800, INK, n); }).join(""), "The four tissue types under the microscope", ["#F3F1F6", "#DCD8E4"]);
  };
})();
