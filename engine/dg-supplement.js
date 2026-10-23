/* BioglowRX diagram "supplement" — supplement bottles, capsules, gummies, powder tubs, with food alternatives
   (per item, keyed by item.name). "Big promises" claims get a "?" burst. Needs dg-foods.js (BGX.FOOD) loaded first. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const st = s => s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`).join("");
  const lg = (id, dir, s) => `<linearGradient id="${id}" ${dir === "h" ? 'x2="1" y2="0"' : dir === "d" ? 'x2="1" y2="1"' : 'x2="0" y2="1"'}>${st(s)}</linearGradient>`;
  const rg = (id, s, cx = .38, cy = .32, r = .75) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(s)}</radialGradient>`;
  const T = (x, y, t, sz, col, w) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Chivo, sans-serif" font-weight="${w || 900}" font-size="${sz}" fill="${col}">${BGX.esc(t)}</text>`;
  const BODY = { amber: ["#b8641a", "#e8a050", "#7a3a08"], white: ["#d9dee3", "#ffffff", "#aab4be"], green: ["#2e7d4a", "#6cc08a", "#17502c"], blue: ["#2b5fa8", "#6aa0e0", "#163a6e"] };

  /* small doses, centred on 0,0 */
  const dose = {
    caps: (u, c) => `${[[-10, 2, -30], [6, -2, 20], [0, 9, 70]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-8" y="-3.5" width="8" height="7" rx="3.5" fill="${c || "#e0523a"}"/><rect x="-1" y="-3.5" width="9" height="7" rx="3.5" fill="#fff" stroke="#d6dbe0" stroke-width=".5"/><rect x="-1" y="-3.5" width="3" height="7" fill="#fff"/><path d="M-6-1.5 H5" stroke="#fff" stroke-width="1.2" opacity=".6"/></g>`).join("")}`,
    soft: u => `${rg(u + "sg", [[0, "#fff6c2"], [.5, "#f2c21b", .9], [1, "#b37f00", .9]])}${[[-10, 2, -20], [5, -2, 25], [0, 9, 80]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="4.5" transform="rotate(${r} ${x} ${y})" fill="url(#${u}sg)" stroke="#a87400" stroke-width=".5"/>`).join("")}`,
    tab: (u, c) => `${[[-10, 3], [5, -1], [-1, 9], [12, 8]].map(([x, y]) => `<g><ellipse cx="${x}" cy="${y + 1.2}" rx="6.5" ry="3.6" fill="${BGX.shade(c || "#f4f1ea", -.25)}"/><ellipse cx="${x}" cy="${y}" rx="6.5" ry="3.6" fill="${c || "#f4f1ea"}"/><path d="M${x - 3} ${y} H${x + 3}" stroke="${BGX.shade(c || "#f4f1ea", -.3)}" stroke-width=".8"/></g>`).join("")}`,
    gum: u => `${[["#ff6a8a", -10, 4], ["#ffb02e", 2, -1], ["#7cc94e", 12, 6], ["#b07cf0", 0, 9]].map(([c, x, y]) => `<g transform="translate(${x} ${y})"><circle cy="-4" r="3.5" fill="${c}"/><rect x="-4.5" y="-2" width="9" height="9" rx="4" fill="${c}"/><circle cx="-1.5" cy="-1" r="1.4" fill="#fff" opacity=".6"/></g>`).join("")}`
  };
  const P = {
    bottle: (u, o) => {
      const b = BODY[o.col || "white"], lc = o.lc || "#e86a2a";
      return `${lg(u + "b", "h", [[0, b[2]], [.35, b[1]], [1, b[0]]])}
      <rect x="-15" y="-38" width="30" height="11" rx="2.5" fill="${o.cap || "#f4f6f8"}" stroke="#aab4be" stroke-width=".8"/><path d="M-12-36 V-29 M-8-36 V-29 M-4-36 V-29 M0-36 V-29 M4-36 V-29 M8-36 V-29 M12-36 V-29" stroke="#c9d1d8" stroke-width=".8"/>
      <path d="M-14-27 H14 Q20-24 20-16 V28 Q20 32 16 32 H-16 Q-20 32 -20 28 V-16 Q-20-24 -14-27Z" fill="url(#${u}b)" stroke="${b[2]}" stroke-width=".8"/>
      <rect x="-20" y="-10" width="40" height="28" fill="#fff"/><rect x="-20" y="-10" width="40" height="7" fill="${lc}"/>
      ${T(0, (o.label || "").length > 4 ? 11 : 13, o.label || "", (o.label || "").length > 6 ? 7 : (o.label || "").length > 4 ? 8.5 : 12, lc)}
      <path d="M-15-20 V26" stroke="#fff" stroke-width="2.5" opacity=".45" stroke-linecap="round"/>`;
    },
    jar: (u, o) => `${lg(u + "j", "h", [[0, "#ffffff", .5], [.3, "#ffffff", .1], [1, "#ffffff", .4]])}
      <rect x="-17" y="-30" width="34" height="9" rx="2" fill="${o.cap || "#ff6a8a"}"/><path d="M-19-21 H19 V28 Q19 32 15 32 H-15 Q-19 32 -19 28Z" fill="#eef4f8" fill-opacity=".55" stroke="#9fb3c4"/>
      <g transform="translate(-3 -9) scale(.95)">${dose.gum(u)}</g><g transform="translate(2 18) scale(.95)">${dose.gum(u)}</g>
      <rect x="-19" y="0" width="38" height="12" fill="#fff" opacity=".92"/>${T(0, 9, o.label || "", 7, "#c43a6a")}
      <path d="M-19-21 H19 V28 Q19 32 15 32 H-15 Q-19 32 -19 28Z" fill="url(#${u}j)"/>`,
    tub: (u, o) => `${lg(u + "t", "h", [[0, "#1b2430"], [.4, "#4a5668"], [1, "#11161d"]])}
      <rect x="-26" y="-30" width="52" height="10" rx="3" fill="#e86a2a"/><path d="M-24-20 H24 V28 Q24 32 20 32 H-20 Q-24 32 -24 28Z" fill="url(#${u}t)"/>
      <rect x="-24" y="-8" width="48" height="22" fill="#e86a2a"/>${T(0, 8, o.label || "", 11, "#fff")}<path d="M-19-16 V26" stroke="#fff" stroke-width="2.5" opacity=".25"/>`,
    scoop: u => `<path d="M-14 6 Q-14 -6 0-6 Q14-6 14 6Z" fill="#f2f4f6" stroke="#aab4be"/><ellipse cy="-5" rx="13" ry="3" fill="#e9dcc6"/><path d="M13 2 L28 -6" stroke="#f2f4f6" stroke-width="4" stroke-linecap="round"/>`,
    blister: u => `${lg(u + "x", "d", [[0, "#f4f6f8"], [.5, "#b9c2cc"], [1, "#e9edf1"]])}<g transform="rotate(-10)"><rect x="-22" y="-14" width="44" height="28" rx="3" fill="url(#${u}x)" stroke="#8a96a2" stroke-width=".8"/>${[-14, -4.7, 4.7, 14].map(x => [-6, 6].map(y => `<circle cx="${x}" cy="${y}" r="4" fill="#ffffff" stroke="#aab4be" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="2.8" fill="#4a8fe0"/><circle cx="${x - 1}" cy="${y - 1}" r=".9" fill="#fff" opacity=".8"/>`).join("")).join("")}</g>`,
    tea: u => `${lg(u + "c", "h", [[0, "#cfd8e0"], [.4, "#ffffff"], [1, "#b9c4ce"]])}<path d="M14-4 Q26-4 24 6 Q22 14 12 12" stroke="#cfd8e0" stroke-width="4" fill="none"/><path d="M-18-10 H16 L13 14 Q12 20 6 20 H-8 Q-14 20 -15 14Z" fill="url(#${u}c)" stroke="#9aa6b2" stroke-width=".8"/><ellipse cx="-1" cy="-10" rx="17" ry="3.5" fill="#9a6a2a"/><path d="M6-10 V-26" stroke="#d8cfbf" stroke-width=".8"/><rect x="2" y="-32" width="9" height="8" fill="#7cc94e"/><path d="M-6-16 Q-10-24 -4-30 M2-16 Q-2-24 4-30" stroke="#b9c4ce" stroke-width="1.5" fill="none" opacity=".7"/>`,
    teabox: (u, o) => `${lg(u + "tb", "h", [[0, "#3e9a5a"], [1, "#1f6b3a"]])}<path d="M-20-24 L-12-30 H24 L16-24Z" fill="#7cc94e"/><path d="M16-24 L24-30 V24 L16 30Z" fill="#17502c"/><rect x="-20" y="-24" width="36" height="54" fill="url(#${u}tb)"/><path d="M-12 0 Q-2-16 8 0 Q-2 6 -12 0Z" fill="#c9f0a8"/>${T(-2, 18, o.label || "", 8.5, "#fff")}`,
    flower: u => `<path d="M0 26 Q-2 10 0-4 M0 12 Q8 6 12 8 M0 18 Q-8 12 -12 14" stroke="#4a7f25" stroke-width="2.2" fill="none"/><path d="M12 8 Q16 2 20 6 Q16 10 12 8Z M-12 14 Q-18 9 -20 14 Q-16 18 -12 14Z" fill="#6fbf4a"/>${[[0, -10, 1], [-12, -2, .7], [12, -4, .7]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-6" rx="4.5" ry="6.5" fill="#ffd21f" stroke="#e0a800" stroke-width=".5" transform="rotate(${r})"/>`).join("")}<circle r="3.5" fill="#f29d0c"/><g stroke="#e08a00" stroke-width=".6">${[0, 60, 120, 180, 240, 300].map(r => `<path d="M0 0 L0-7" transform="rotate(${r})"/>`).join("")}</g></g>`).join("")}`,
    tube: (u, o) => `${lg(u + "tu", "h", [[0, "#ffffff", .6], [.3, "#ffffff", .1], [1, "#ffffff", .4]])}<g transform="rotate(12)"><rect x="-7" y="-30" width="14" height="6" rx="1.5" fill="#7a4fd0"/><path d="M-6-24 V20 Q-6 28 0 28 Q6 28 6 20 V-24Z" fill="#eef4f8" fill-opacity=".6" stroke="#9fb3c4"/><path d="M-6 -4 V20 Q-6 28 0 28 Q6 28 6 20 V-4Z" fill="#b3122a"/><path d="M-6-4 H6" stroke="#e4b84a" stroke-width="3"/><rect x="-6" y="-18" width="12" height="9" fill="#fff"/><path d="M-4-15 h8 M-4-12 h6" stroke="#8a96a2" stroke-width=".8"/><path d="M-6-24 V20 Q-6 28 0 28 Q6 28 6 20 V-24Z" fill="url(#${u}tu)"/></g>`,
    burst: u => `${rg(u + "bu", [[0, "#fff6b0"], [1, "#ffc21f"]], .5, .5, .6)}<path d="${Array.from({ length: 24 }, (_, i) => { const a = i / 24 * Math.PI * 2, r = i % 2 ? 12 : 18; return (i ? "L" : "M") + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1); }).join("")}Z" fill="url(#${u}bu)" stroke="#e08a00" stroke-width="1"/>${T(0, 6, "?", 17, "#c4174a")}`,
    warn: u => `<path d="M0-15 L16 13 H-16Z" fill="#ffc21f" stroke="#b37f00" stroke-width="1.5" stroke-linejoin="round"/>${T(0, 10, "!", 17, "#1b2430")}`,
    suncloud: u => `${BGX.FOOD("sun", 6, -6, .8, u)}<path d="M-20 12 Q-22 2 -12 2 Q-10-6 0-4 Q8-8 12 0 Q22 0 20 12Z" fill="#f4f8fb" stroke="#b9c8d6"/>`,
    pile: (u, o) => dose[o.kind](u, o.c)
  };
  const at = (k, x, y, s, u, o) => `<g transform="translate(${x} ${y}) scale(${s})">${P[k](u + k + x, o || {})}</g>`;
  const F = (k, x, y, s, u, a) => BGX.FOOD(k, x, y, s, u, a);

  /* each: list of [kind, x, y, scale, options] — kind is a P key or "food:<name>" */
  const SC = {
    "Vitamin C and colds": [["bottle", 56, 92, 1, { col: "white", label: "C", lc: "#f08a00" }], ["food:orange", 116, 96, 1.2], ["pile", 98, 132, 1, { kind: "tab", c: "#ffb347" }]],
    "Too much vitamin A": [["bottle", 56, 92, 1, { col: "amber", label: "A", lc: "#e05a1a" }], ["pile", 98, 132, 1, { kind: "soft" }], ["food:carrot", 120, 98, 1.1], ["warn", 128, 40, 1]],
    "Water-soluble means safe": [["bottle", 60, 92, 1, { col: "white", label: "B6", lc: "#2b7de0" }], ["pile", 112, 120, 1.3, { kind: "caps", c: "#2b7de0" }], ["warn", 118, 66, 1.3]],
    "Folic acid and pregnancy": [["bottle", 54, 92, 1, { col: "white", label: "FOLIC", lc: "#7c4fd0" }], ["food:asparagus", 106, 102, 1.05], ["food:orange", 130, 120, .9]],
    "Vitamin D in winter": [["bottle", 54, 92, 1, { col: "amber", label: "D", lc: "#f2a900" }], ["pile", 96, 134, 1, { kind: "soft" }], ["suncloud", 118, 50, 1], ["food:fish", 122, 102, 1]],
    "B12 for vegans": [["bottle", 54, 92, 1, { col: "white", label: "B12", lc: "#c62828" }], ["food:carton", 112, 96, 1.25, "B12+"], ["food:greens", 136, 120, .75]],
    "Iron for energy": [["bottle", 56, 92, 1, { col: "white", label: "Fe", lc: "#a8202c" }], ["pile", 98, 132, 1, { kind: "tab", c: "#b33a3a" }], ["food:steak", 120, 100, 1.05]],
    "Calcium and constipation": [["bottle", 56, 92, 1, { col: "white", label: "Ca", lc: "#2b7de0" }], ["pile", 98, 132, 1, { kind: "tab" }], ["food:milk", 118, 94, 1.15], ["food:cheese", 136, 122, .7]],
    "Multivitamins vs diet": [["bottle", 54, 92, 1, { col: "white", label: "MULTI", lc: "#e05a8a" }], ["pile", 96, 134, 1, { kind: "caps", c: "#f2a900" }], ["food:broccoli", 112, 102, .95], ["food:orange", 136, 116, .8]],
    "Natural means safe": [["bottle", 56, 92, 1, { col: "green", label: "NATURAL", lc: "#2e7d4a", cap: "#6cc08a" }], ["food:greens", 112, 106, 1.05], ["pile", 130, 130, .9, { kind: "caps", c: "#4f8a3a" }]],
    "Detox teas": [["teabox", 56, 90, 1, { label: "DETOX" }], ["tea", 112, 110, 1.15]],
    "Tested like medicines": [["bottle", 54, 92, 1, { col: "white", label: "SUPP", lc: "#7c4fd0" }], ["blister", 112, 108, 1.2]],
    "Hidden drugs": [["bottle", 54, 92, 1, { col: "blue", label: "SLIM", lc: "#e05a8a" }], ["pile", 106, 124, 1.2, { kind: "caps", c: "#1b2430" }], ["blister", 116, 92, .9]],
    "Protein powder": [["tub", 56, 92, 1.05, { label: "WHEY" }], ["scoop", 98, 136, .9], ["food:egg", 118, 100, 1], ["food:beans", 132, 126, .7]],
    "St John's wort": [["flower", 48, 92, 1.3], ["bottle", 96, 94, .85, { col: "amber", label: "SJW", lc: "#e0a800" }], ["blister", 128, 128, .75]],
    "Fish oil and the heart": [["bottle", 54, 92, 1, { col: "amber", label: "OMEGA-3", lc: "#2b7de0" }], ["pile", 98, 134, 1, { kind: "soft" }], ["food:fish", 120, 98, 1.15]],
    "Vitamin K and warfarin": [["bottle", 52, 92, 1, { col: "white", label: "K", lc: "#2e7d32" }], ["food:greens", 104, 100, 1], ["blister", 128, 128, .75]],
    "Biotin and blood tests": [["jar", 54, 92, 1, { label: "BIOTIN", cap: "#ff6a8a" }], ["tube", 108, 98, 1.1], ["pile", 132, 132, .8, { kind: "gum" }]]
  };

  function shelf(u) {
    return `${lg(u + "sh", "v", [[0, "#e9d2b0"], [1, "#c9a477"]])}<path d="M0 126 H160 V142 Q160 160 142 160 H18 Q0 160 0 142Z" fill="url(#${u}sh)"/><path d="M0 126 H160" stroke="#b08a5a"/><ellipse cx="80" cy="127" rx="64" ry="4" fill="#000" opacity=".08"/>`;
  }
  function draw(list, u) {
    return list.map(([k, x, y, s, o]) => k.indexOf("food:") === 0 ? F(k.slice(5), x, y, s, u, o) : at(k, x, y, s, u, o)).join("");
  }

  BGX.DIAGRAMS.supplement = item => {
    const u = dg.uid();
    if (!item) {
      const inner = shelf(u) + draw([["tub", 122, 92, 1, { label: "WHEY" }], ["bottle", 40, 92, 1, { col: "amber", label: "D", lc: "#f2a900" }], ["jar", 81, 100, .8, { label: "GUMMY" }], ["pile", 70, 138, 1, { kind: "caps", c: "#e0523a" }], ["pile", 112, 140, .9, { kind: "soft" }], ["burst", 136, 34, .9]], u);
      return dg.frame(inner, "Supplements: bottles, gummies, capsules and powders", ["#FBF6EC", "#F1E4CC"]);
    }
    const list = SC[item.name] || [["bottle", 60, 92, 1, { col: "white", label: "?" }]];
    let inner = shelf(u) + draw(list, u);
    if (item.cat === "claim" && !list.some(e => e[0] === "warn")) inner += at("burst", 132, 34, 1.05, u);
    return dg.frame(inner, item.name, ["#FBF6EC", "#F1E4CC"]);
  };
})();
