/* BioglowRX diagram "exam" — topic badge for whole-course review games.
   spot: assess · energy · life · diet · vit · supp · coach (the Nutrition chapter groups).
   Overview (null): all seven topic badges on a revision board. Uses the icon paths from engine/icons.js. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="middle">${BGX.esc(txt)}</text>`;
  const TOPICS = [
    ["assess", "clipboard", "Assessment", "ch. 1–2", "#f2a99a"],
    ["energy", "scale", "Energy & weight", "ch. 3", "#f5c27a"],
    ["life", "baby", "Life stages", "ch. 4–6", "#efe08a"],
    ["diet", "heart", "Heart, sugar, gut", "ch. 7–10", "#a9d6a2"],
    ["vit", "apple", "Vitamins & minerals", "ch. 11–12", "#9fcdec"],
    ["supp", "pill", "Supplements", "ch. 13–14", "#c7b5ea"],
    ["coach", "chat", "Behaviour change", "ch. 15–17", "#e9a9d6"]
  ];
  /* an icon path from icons.js drawn at (x, y) with size s (icons are 24×24) */
  const ico = (name, x, y, s, col, sw) => { const P = BGX.icons || {}; return `<g transform="translate(${x - s / 2} ${y - s / 2}) scale(${s / 24})"><path d="${P[name] || P.lab || ""}" fill="none" stroke="${col}" stroke-width="${sw || 1.7}" stroke-linecap="round" stroke-linejoin="round"/></g>`; };

  function board() {
    let o = T(80, 20, 9.5, 900, "#1B2430", "Nutrition review");
    TOPICS.forEach(([id, ic, name, ch, col], i) => {
      const r = i < 4 ? 0 : 1, c = r === 0 ? i : i - 4, n = r === 0 ? 4 : 3;
      const x = 80 + (c - (n - 1) / 2) * 34, y = 52 + r * 52;
      o += `<circle cx="${x}" cy="${y}" r="15" fill="${col}" stroke="#fff" stroke-width="2"/>${ico(ic, x, y, 18, "#1B2430", 1.9)}${T(x, y + 26, 6.5, 800, "#55616e", ch)}`;
    });
    return o + T(80, 152, 7.5, 700, "#55616e", "7 topics · 17 chapters");
  }
  function badge(t) {
    const [, ic, name, ch, col] = t;
    return `<circle cx="80" cy="70" r="50" fill="${col}" opacity=".45"/>
      <circle cx="80" cy="70" r="38" fill="#fff" stroke="${HL}" stroke-width="4" class="dg-hl"/>${ico(ic, 80, 70, 44, "#1B2430", 1.8)}
      ${T(80, 132, 8.5, 800, "#55616e", ch)}${dg.tag(80, 148, name)}`;
  }
  BGX.DIAGRAMS.exam = item => {
    const t = TOPICS.find(x => dg.is(item, x[0]));
    return t ? dg.frame(badge(t), t[2], ["#FBF7EF", "#EFE6D3"]) : dg.frame(board(), "Nutrition review: seven topics", ["#FBF7EF", "#EFE6D3"]);
  };
})();
