/* BioglowRX diagram: "heart" — front-view cutaway of the heart (the body's right side is on
   the viewer's left). Blue = oxygen-poor blood, red = oxygen-rich blood, yellow = conduction system.
   Spot ids: ra rv la lv tricuspid pulmonary-valve mitral aortic-valve venae-cavae
   pulmonary-artery pulmonary-veins aorta coronary sa-node av-node purkinje */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const BLUE = "#4F74C8", BLUED = "#3A5AA8", RED = "#D23A44", REDD = "#A9252F", WALL = "#B9575C",
    VALVE = "#F4EAD8", COND = "#F7C948", COR = "#F08A3C";
  let it = null;
  /* colour of a part: highlight when it is the spot; when another part is highlighted, fade the rest */
  const col = (id, base) => !it ? base : dg.is(it, id) ? dg.HL : BGX.shade(base, .55);
  const M = base => it ? BGX.shade(base, .55) : base;
  const c = id => dg.cls(it, id);
  const glow = (id, x, y, r) => dg.is(it, id) ? `<circle cx="${x}" cy="${y}" r="${r}" fill="${dg.HL}" fill-opacity=".3" stroke="${dg.HL}" stroke-width="1.3"${c(id)}/>` : "";
  const tube = (id, d, w, base) => `<path d="${d}" stroke="${BGX.shade(col(id, base), -.25)}" stroke-width="${w + 1.6}"/><path d="${d}" stroke="${col(id, base)}" stroke-width="${w}"${c(id)}/>`;
  const P = (id, d, base, extra) => `<path d="${d}" fill="${col(id, base)}"${c(id)}${extra || ""}/>`;

  function draw() {
    let s = `<g fill="none" stroke-linecap="round" stroke-linejoin="round">`;
    // vessels behind the heart
    s += tube("pulmonary-artery", "M72 47H38Q30 47 26 56", 8, BLUE) +
      tube("aorta", "M88 64V38Q88 22 104 22Q120 22 120 38V62", 12, RED) +
      tube("aorta", "M95 24L92 9M104 21V7M113 24L116 9", 3.6, RED) +
      tube("venae-cavae", "M52 8V64M54 152V104", 12, BLUE) +
      tube("pulmonary-veins", "M152 64L122 68M152 82L122 80", 7, RED) +
      tube("pulmonary-artery", "M72 68V50Q72 44 80 44H136Q144 44 148 52", 10.5, BLUE);
    s += `</g>`;
    // heart wall and the four cavities
    s += `<path d="M40 62Q41 54 52 56L98 58Q116 52 128 60Q138 80 131 104Q121 134 92 152Q60 138 46 112Q36 88 40 62Z" fill="${M(WALL)}" stroke="${M("#8E3A40")}" stroke-width="1"/>` +
      `<path d="M58 70Q80 66 104 72" stroke="#fff" stroke-opacity=".18" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      P("ra", "M44 62L63 62L64 100L48 100Q41 84 44 62Z", BLUE) +
      P("rv", "M66 62L78 62L80 106Q84 124 85 140Q66 132 54 113L51 106L66 106Z", BLUED) +
      P("la", "M97 62L124 64Q130 75 123 88L97 88Z", RED) +
      P("lv", "M82 62L94 62L95 92L121 92Q124 120 92 144Q87 122 84 100Z", REDD);
    // openings + valves (flaps point the way blood flows)
    const vb = it ? "#E9E2D6" : VALVE;
    s += `<rect x="47" y="99" width="17" height="8" fill="${M(BLUE)}"/><rect x="97" y="87" width="24" height="6" fill="${M(RED)}"/>` +
      glow("tricuspid", 55.5, 104, 11) + glow("mitral", 109, 92, 13) + glow("pulmonary-valve", 72, 63, 10) + glow("aortic-valve", 88, 63, 10) +
      P("tricuspid", "M47 101L50.5 109L53 101ZM53.5 101L56 110L58.5 101ZM59 101L62 109L64 101Z", vb, ` stroke="#8E3A40" stroke-width=".5"`) +
      P("mitral", "M97 89L103 98L108.5 89ZM109.5 89L115 98L121 89Z", vb, ` stroke="#8E3A40" stroke-width=".5"`) +
      P("pulmonary-valve", "M66 61Q66 67 70 67Q72 64 72 61Q72 67 76 67Q78 64 78 61V64H66Z", vb, ` stroke="#8E3A40" stroke-width=".5"`) +
      P("aortic-valve", "M82 61Q82 67 86 67Q88 64 88 61Q88 67 92 67Q94 64 94 61V64H82Z", vb, ` stroke="#8E3A40" stroke-width=".5"`);
    // coronary arteries on the surface
    s += `<g fill="none" stroke-linecap="round">` +
      `<path d="M82 61Q60 55 43 63Q35 90 48 116Q60 134 82 146M95 61Q118 54 131 70Q137 92 127 114M96 60Q90 100 88 148" stroke="${col("coronary", COR)}" stroke-width="${dg.is(it, "coronary") ? 3 : 1.8}"${c("coronary")}/>` +
      // conduction system: SA node → AV node → bundle of His → bundle branches → Purkinje fibres
      `<path d="M55 63Q60 82 64.5 100" stroke="${M(COND)}" stroke-width=".8" stroke-dasharray="1.5 1.5"/>` +
      `<path d="M65 101Q76 101 82.5 106M82 106V141M84.5 106V141" stroke="${M(COND)}" stroke-width="1.3"/>` +
      `<path d="M83 141Q70 140 56 120Q50 110 49 104M60 128l-4 1M68 136l-2 3M86 143Q114 132 126 102M108 134l3 2M118 122l3 1M52 114l-3 -1"` +
      ` stroke="${col("purkinje", COND)}" stroke-width="${dg.is(it, "purkinje") ? 2.4 : 1.2}"${c("purkinje")}/></g>` +
      glow("sa-node", 55, 62, 9) + glow("av-node", 64.5, 101, 9) +
      `<ellipse cx="55" cy="62" rx="3.4" ry="2.4" fill="${col("sa-node", COND)}" stroke="#8A6A10" stroke-width=".5"${c("sa-node")}/>` +
      `<ellipse cx="64.5" cy="101" rx="2.8" ry="2.2" fill="${col("av-node", COND)}" stroke="#8A6A10" stroke-width=".5"${c("av-node")}/>`;
    return s;
  }

  BGX.DIAGRAMS.heart = item => {
    it = item || null;
    const s = draw();
    it = null;
    return dg.frame(s, item ? "Heart: " + item.name : "The heart, cut open, front view", ["#FBF4F1", "#EADBD6"]);
  };
})();
