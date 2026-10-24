/* BioglowRX diagram "reaction" — the five reaction types drawn as particles.
   spot: synthesis · decomposition · single · double · combustion. The item's type is the big panel;
   a strip of all five along the bottom shows which one it is. Overview (null): the five-type strip with no highlight. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUTE = "#55616e";
  const COL = { A: "#e8735a", B: "#3f8fd2", C: "#5bb36a", D: "#c9a227", O: "#e04848", F: "#7a6a5a" };
  const ball = (x, y, k, r) => `<circle cx="${x}" cy="${y}" r="${r || 7}" fill="${COL[k]}" stroke="#fff" stroke-width="1.2"/>` + T(x, y + (r || 7) * .38, (r || 7) * 1.05, 900, "#fff", k === "O" ? "O" : k);
  const pair = (x, y, a, b, r) => { r = r || 7; return ball(x - r * .8, y, a, r) + ball(x + r * .8, y, b, r); };
  const arrow = (x, y, w) => `<path d="M${x} ${y} h${w}" stroke="${INK}" stroke-width="2"/><path d="M${x + w - 5} ${y - 4} L${x + w} ${y} L${x + w - 5} ${y + 4}" stroke="${INK}" stroke-width="2" fill="none"/>`;
  const plus = (x, y) => T(x, y + 4, 12, 900, MUTE, "+");

  /* big scenes (top area, y 20–100) */
  const BIG = {
    synthesis: () => ball(22, 62, "A", 10) + plus(40, 62) + ball(58, 62, "B", 10) + arrow(74, 62, 24) + pair(124, 62, "A", "B", 10) +
      T(80, 92, 10, 900, INK, "A + B → AB") + T(80, 104, 7.5, 600, MUTE, "many → one"),
    decomposition: () => pair(30, 62, "A", "B", 10) + arrow(52, 62, 24) + ball(98, 62, "A", 10) + plus(116, 62) + ball(134, 62, "B", 10) +
      T(80, 92, 10, 900, INK, "AB → A + B") + T(80, 104, 7.5, 600, MUTE, "one → many"),
    single: () => ball(13, 62, "C", 8) + plus(26, 62) + pair(44, 62, "A", "B", 8) + arrow(62, 62, 18) + pair(98, 62, "C", "B", 8) + plus(120, 62) + ball(136, 62, "A", 8) +
      T(80, 92, 10, 900, INK, "C + AB → CB + A") + T(80, 104, 7.5, 600, MUTE, "one element swaps in"),
    double: () => pair(20, 62, "A", "B", 7) + plus(37, 62) + pair(54, 62, "C", "D", 7) + arrow(70, 62, 16) + pair(102, 62, "A", "D", 7) + plus(119, 62) + pair(136, 62, "C", "B", 7) +
      T(80, 92, 10, 900, INK, "AB + CD → AD + CB") + T(80, 104, 7.5, 600, MUTE, "partners swap"),
    combustion: () => `<path d="M30 74 Q18 58 26 40 Q30 50 32 38 Q38 52 42 44 Q48 62 30 74Z" fill="#f6a23e"/><path d="M31 72 Q25 62 31 52 Q37 62 31 72Z" fill="#ffd34d"/>` +
      T(48, 42, 7.5, 700, MUTE, "fuel") + plus(54, 60) + pair(72, 60, "O", "O", 7) + arrow(88, 60, 16) +
      T(130, 52, 9, 900, INK, "CO₂") + T(130, 66, 9, 900, INK, "+ H₂O") + T(80, 92, 10, 900, INK, "fuel + O₂ → CO₂ + H₂O") + T(80, 104, 7.5, 600, MUTE, "fast reaction with oxygen, heat out")
  };
  const NAMES = { synthesis: "Synthesis", decomposition: "Decomposition", single: "Single replacement", double: "Double replacement", combustion: "Combustion" };
  const ORDER = ["synthesis", "decomposition", "single", "double", "combustion"];
  const SHORT = { synthesis: "synth", decomposition: "decomp", single: "single", double: "double", combustion: "burn" };

  const strip = (sp, y) => ORDER.map((k, i) => { const on = k === sp, x = 8 + i * 29.4;
    return `<rect x="${x}" y="${y}" width="27" height="20" rx="5" fill="${on ? HL : "#fff"}" stroke="${on ? HL : "#a9b6c2"}"${on ? ' class="dg-hl"' : ""}/>` +
      T(x + 13.5, y + 13, 6.6, 800, on ? "#fff" : MUTE, SHORT[k]); }).join("");

  BGX.DIAGRAMS.reaction = item => {
    const sp = dg.spots(item)[0];
    if (!item || !BIG[sp]) {
      const o = T(80, 24, 9, 800, INK, "Five reaction patterns") +
        pair(29, 46, "A", "B", 6) + T(62, 50, 7.5, 700, MUTE, "synthesis: join up", "start") +
        ball(18, 66, "A", 6) + ball(42, 66, "B", 6) + T(62, 70, 7.5, 700, MUTE, "decomposition: split", "start") +
        ball(18, 86, "C", 6) + pair(40, 86, "A", "B", 6) + T(62, 90, 7.5, 700, MUTE, "single: one swaps in", "start") +
        pair(18, 106, "A", "D", 6) + pair(40, 106, "C", "B", 6) + T(62, 110, 7.5, 700, MUTE, "double: partners swap", "start") +
        pair(29, 126, "O", "O", 6) + T(62, 130, 7.5, 700, MUTE, "combustion: burn in O₂", "start");
      return dg.frame(o, "Reaction types: synthesis, decomposition, single replacement, double replacement, combustion", ["#FFF8F0", "#F4E6D6"]);
    }
    const inner = `<rect x="6" y="30" width="148" height="84" rx="12" fill="#fff" opacity=".7"/>` + T(80, 22, 10, 900, HL, NAMES[sp]) + BIG[sp]() + strip(sp, 128);
    return dg.frame(inner, NAMES[sp] + " reaction", ["#FFF8F0", "#F4E6D6"]);
  };
})();
