/* BioglowRX diagram "ptable" — a small periodic table with the s, p, d and f blocks coloured
   and the item's cell (item.row = period − 1, item.col = group) highlighted. Overview (null): blocks and trend arrows. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUT = "#55616e";
  const COL = { s: "#F6B3A6", p: "#A9D3F2", d: "#F6E08E", f: "#CDB8EC" };
  const X0 = 8, CW = 8, Y0 = 34, CH = 11;
  const blockOf = (r, c) => (c <= 2 || (r === 0 && c === 18)) ? "s" : c >= 13 ? "p" : "d";
  const exists = (r, c) => r === 0 ? (c === 1 || c === 18) : r <= 2 ? (c <= 2 || c >= 13) : true;
  function table(it) {
    let s = "";
    for (let r = 0; r < 7; r++) for (let c = 1; c <= 18; c++) {
      if (!exists(r, c)) continue;
      const x = X0 + (c - 1) * CW, y = Y0 + r * CH, b = (r >= 5 && c === 3) ? "f" : blockOf(r, c);
      s += `<rect x="${x + .4}" y="${y + .4}" width="${CW - .8}" height="${CH - .8}" rx="1.2" fill="${COL[b]}"/>`;
    }
    // f-block rows underneath
    for (let r = 0; r < 2; r++) for (let c = 0; c < 14; c++) s += `<rect x="${X0 + (c + 3) * CW + .4}" y="${Y0 + 7 * CH + 6 + r * CH + .4}" width="${CW - .8}" height="${CH - .8}" rx="1.2" fill="${COL.f}"/>`;
    // block labels
    s += T(X0 + CW, Y0 + 4 * CH + 7.5, 8, 900, "#a3473a", "s") + T(X0 + 11.5 * CW, Y0 + 2 * CH + 7.5, 8, 900, "#2f6fb8", "p") + T(X0 + 7.5 * CW, Y0 + 4 * CH + 7.5, 8, 900, "#8a6a00", "d") + T(X0 + 10 * CW, Y0 + 8 * CH + 13.5, 8, 900, "#6a4aa0", "f");
    if (it && it.row != null) {
      const x = X0 + (it.col - 1) * CW, y = Y0 + it.row * CH;
      s += `<rect x="${x - 1.6}" y="${y - 1.6}" width="${CW + 3.2}" height="${CH + 3.2}" rx="2" fill="${HL}" stroke="#fff" stroke-width="1.2" class="dg-hl"/>`;
      const w = Math.max(54, (it.name.length + it.symbol.length) * 5.4 + 22);
      s += `<rect x="${80 - w / 2}" y="8" width="${w}" height="18" rx="9" fill="${INK}"/>` + T(80, 20.5, 8.5, 800, "#fff", it.symbol + " · " + it.name);
      s += T(80, 152, 7.5, 700, MUT, `period ${it.row + 1} · group ${it.col}`);
    }
    return s;
  }
  function overview() {
    let s = table(null);
    s += T(80, 18, 8, 800, INK, "s, p, d and f blocks");
    s += T(80, 152, 7.5, 700, MUT, "atoms grow ↓ a group, shrink → a period");
    return s;
  }
  BGX.DIAGRAMS.ptable = item => item && item.row != null
    ? dg.frame(table(item), `${item.name}: period ${item.row + 1}, group ${item.col}`, ["#FBF7EE", "#EFE6D2"])
    : dg.frame(overview(), "Periodic table blocks: s on the left, d in the middle, p on the right, f below", ["#FBF7EE", "#EFE6D2"]);
})();
