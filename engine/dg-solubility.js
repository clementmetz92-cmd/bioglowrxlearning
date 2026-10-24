/* BioglowRX diagram "solubility" — what an ionic compound or molecule does in water.
   spot: dissolved (ions spread through the water) · precipitate (solid settles at the bottom) ·
         strong / weak / nonelec (electrolyte bulb test: bright, dim, off).
   Overview (null): dissolved beaker beside a precipitate beaker. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUTE = "#55616e", EDGE = "#8fa6b8", WATER = "#d6ecf8";
  const ion = (x, y, plus, on) => `<circle cx="${x}" cy="${y}" r="5" fill="${plus ? (on ? HL : "#e8735a") : "#3f8fd2"}" stroke="#fff"/>` + T(x, y + 2.8, 7.5, 900, "#fff", plus ? "+" : "−");
  const mol = (x, y, on) => `<g><circle cx="${x - 3}" cy="${y}" r="4" fill="${on ? HL : "#9a7fc4"}"/><circle cx="${x + 3}" cy="${y - 2}" r="3.4" fill="${on ? HL : "#9a7fc4"}" opacity=".8"/></g>`;
  /* beaker: x, y top-left, w width, h height; inner drawn inside */
  const beaker = (x, y, w, h, inner) => `<path d="M${x} ${y} V${y + h - 4} Q${x} ${y + h} ${x + 4} ${y + h} H${x + w - 4} Q${x + w} ${y + h} ${x + w} ${y + h - 4} V${y}" fill="#f4fafd" stroke="${EDGE}" stroke-width="1.8"/>
    <rect x="${x + 1}" y="${y + h * .22}" width="${w - 2}" height="${h * .78 - 1}" rx="3" fill="${WATER}"/>${inner}`;

  const IONPTS = [[.2, .4], [.55, .35], [.8, .5], [.35, .62], [.7, .75], [.18, .85], [.5, .9], [.85, .9], [.42, .48]];
  const dissolvedIn = (x, y, w, h, on) => IONPTS.map(([fx, fy], i) => ion(x + fx * w, y + fy * h, i % 2 === 0, on)).join("");
  const precipIn = (x, y, w, h, on) => {
    let o = `<path d="M${x + 2} ${y + h - 2} Q${x + w * .25} ${y + h - 14} ${x + w * .5} ${y + h - 12} Q${x + w * .75} ${y + h - 15} ${x + w - 2} ${y + h - 2}Z" fill="${on ? HL : "#f2efe6"}" stroke="${on ? HL : "#c9bfa6"}"${on ? ' class="dg-hl"' : ""}/>`;
    for (let i = 0; i < 9; i++) o += `<rect x="${x + 6 + i * (w - 14) / 8}" y="${y + h - 9 - (i % 3) * 2}" width="4" height="4" fill="#fff" opacity=".8" transform="rotate(${i * 20} ${x + 8 + i * (w - 14) / 8} ${y + h - 7})"/>`;
    o += ion(x + w * .3, y + h * .45, true, false) + ion(x + w * .7, y + h * .55, false, false);
    return o;
  };

  /* bulb test: two electrodes in a beaker, battery, bulb */
  const BT = [[.08, .5], [.4, .38], [.62, .55], [.46, .82], [.92, .45], [.12, .88], [.6, .32], [.88, .86], [.32, .6]];
  const bulbTest = level => {
    const glow = level === "strong" ? 1 : level === "weak" ? .45 : 0, X = 36, Y = 50, W = 88, H = 74;
    const at = ([fx, fy]) => [X + fx * W, Y + H * .22 + fy * H * .72];
    const inside = level === "nonelec" ? BT.slice(0, 6).map(p => mol(...at(p), true)).join("")
      : level === "weak" ? BT.slice(0, 5).map(p => mol(...at(p), false)).join("") + ion(...at(BT[6]), true, true) + ion(...at(BT[7]), false, true)
      : BT.map((p, i) => ion(...at(p), i % 2 === 0, true)).join("");
    const bx = 103.5, by = 26;
    return `${beaker(X, Y, W, H, "")}${inside}
      <rect x="54" y="46" width="5" height="64" fill="#7a8794"/><rect x="101" y="46" width="5" height="64" fill="#7a8794"/>
      <path d="M56.5 46 V36 M67 29 H${bx - 10} M${bx} 41 V46" stroke="${INK}" stroke-width="1.6" fill="none"/><path d="M46 29 H40 V18 H${bx} V${by - 10}" stroke="${INK}" stroke-width="1.6" fill="none" opacity="0"/>
      <rect x="46" y="22" width="21" height="14" rx="2" fill="#5f6b78"/>${T(56.5, 32, 7, 800, "#fff", "+ −")}
      ${glow ? `<circle cx="${bx}" cy="${by}" r="${8 + glow * 10}" fill="#ffe46b" opacity="${glow * .55}" class="dg-hl"/>` : ""}
      <circle cx="${bx}" cy="${by}" r="9" fill="${glow ? "#ffd84a" : "#eef2f5"}" stroke="${INK}" stroke-width="1.4"/><path d="M${bx - 4} ${by + 2} Q${bx} ${by - 6} ${bx + 4} ${by + 2}" stroke="${glow ? "#c07a00" : MUTE}" fill="none"/>
      <rect x="${bx - 6}" y="${by + 9}" width="12" height="6" rx="1.5" fill="#7a8794"/>`;
  };
  const LAB = { strong: ["Strong electrolyte", "bright bulb: all ions"], weak: ["Weak electrolyte", "dim bulb: a few ions"], nonelec: ["Non-electrolyte", "bulb off: molecules only"] };

  BGX.DIAGRAMS.solubility = item => {
    const sp = dg.spots(item)[0];
    if (sp === "dissolved") return dg.frame(beaker(30, 24, 100, 100, dissolvedIn(30, 24, 100, 100, true)) + T(80, 140, 9, 800, INK, "Dissolves: ions spread out") + T(80, 151, 7.5, 600, MUTE, "clear solution, ions surrounded by water"), "Soluble: ions spread through the water");
    if (sp === "precipitate") return dg.frame(beaker(30, 24, 100, 100, precipIn(30, 24, 100, 100, true)) + T(80, 140, 9, 800, INK, "Insoluble: a solid settles") + T(80, 151, 7.5, 600, MUTE, "the precipitate, e.g. AgCl(s)"), "Insoluble: a precipitate settles at the bottom");
    if (LAB[sp]) return dg.frame(bulbTest(sp) + T(80, 140, 9, 800, INK, LAB[sp][0]) + T(80, 151, 7.5, 600, MUTE, LAB[sp][1]), LAB[sp][0] + ": " + LAB[sp][1]);
    const o = beaker(12, 34, 62, 86, dissolvedIn(12, 34, 62, 86, false)) + beaker(86, 34, 62, 86, precipIn(86, 34, 62, 86, false)) +
      T(43, 24, 8.5, 800, INK, "dissolves") + T(117, 24, 8.5, 800, INK, "precipitate") +
      T(80, 140, 8.5, 700, INK, "ions spread · solid settles") + T(80, 151, 7.5, 600, MUTE, "the solubility rules decide which");
    return dg.frame(o, "Soluble salts dissolve into ions; insoluble ones form a precipitate");
  };
})();
