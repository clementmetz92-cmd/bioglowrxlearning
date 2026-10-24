/* BioglowRX diagram "gibbs" — entropy and free energy (chemistry chapter 18).
   spot ids: always · never · hight · lowt (the ΔH/ΔS grid) · sup · sdown · dissolve · gasup · gasdown · split · build ·
   spread · squeeze · cool · crystal · universe · ball · slow · cross · dgk · atp.
   Overview (null): the 2×2 grid of ΔH and ΔS signs. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#1B2430", MUT = "#55616e", P1 = "#2f6fb8", P2 = "#e07a3c";
  const arrow = (x1, y1, x2, y2, c, w) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 5;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${w || 2}" stroke-linecap="round"/><path d="M${(x2 - L * Math.cos(a - .5)).toFixed(1)} ${(y2 - L * Math.sin(a - .5)).toFixed(1)} L${x2} ${y2} L${(x2 - L * Math.cos(a + .5)).toFixed(1)} ${(y2 - L * Math.sin(a + .5)).toFixed(1)}" stroke="${c}" stroke-width="${w || 2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const pts = (n, x0, y0, x1, y1, seed) => {
    let s = seed || 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280, out = [];
    const cols = Math.ceil(Math.sqrt(n * (x1 - x0) / (y1 - y0))), rows = Math.ceil(n / cols), cw = (x1 - x0) / cols, rh = (y1 - y0) / rows;
    for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); out.push([+(x0 + (c + .2 + rnd() * .6) * cw).toFixed(1), +(y0 + (r + .2 + rnd() * .6) * rh).toFixed(1)]); }
    return out;
  };
  const lattice = (x, y, cols, rows, gap, c) => { let o = ""; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) o += `<circle cx="${x + i * gap}" cy="${y + j * gap}" r="3.4" fill="${c || P1}"/>`; return o; };
  const scatter = (P, c) => P.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${c || P1}"/>`).join("");
  const panel = (x, y, w, h, on) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fff" stroke="${on ? HL : "#a9b6c2"}" stroke-width="${on ? 2.2 : 1.3}"${on ? ' class="dg-hl"' : ""}/>`;
  /* before → after picture: two panels and an arrow; hl = "after" for an entropy picture */
  const ba = (title, left, right, capL, capR, verdict) => `${T(80, 18, 9, 900, INK, title)}${panel(8, 28, 62, 74, false)}${panel(90, 28, 62, 74, true)}${left}${right}${arrow(72, 65, 88, 65, MUT)}
    ${T(39, 114, 8, 700, MUT, capL)}${T(121, 114, 8, 800, HL, capR)}${T(80, 140, 10, 900, verdict.indexOf("up") >= 0 ? "#2f9e6e" : "#7b4fc4", verdict)}`;

  /* 2×2 grid. hl: always | never | hight | lowt */
  const grid = hl => {
    const C = { lowt: [60, 34, "#ece4f6", "low T only"], always: [118, 34, "#dff1e6", "always"],
      never: [60, 84, "#fbe3e0", "never"], hight: [118, 84, "#fff0d6", "high T only"] };
    return `${T(60, 24, 8.5, 900, MUT, "ΔS −")}${T(118, 24, 8.5, 900, MUT, "ΔS +")}${T(18, 62, 8.5, 900, MUT, "ΔH −")}${T(18, 112, 8.5, 900, MUT, "ΔH +")}
      ${Object.keys(C).map(k => { const [x, y, f, a] = C[k], on = hl === k;
        return `<rect x="${x - 27}" y="${y}" width="54" height="44" rx="7" fill="${f}" stroke="${on ? HL : "#c9d2da"}" stroke-width="${on ? 2.6 : 1}"${on ? ' class="dg-hl"' : ""}/>${T(x, y + 26, 9, 900, on ? HL : INK, a)}`; }).join("")}
      ${T(80, 148, 8.5, 800, INK, "ΔG = ΔH − TΔS")}`;
  };
  /* ball on a free-energy hill */
  const hill = mode => `${T(80, 18, 9, 900, INK, mode === "slow" ? "Downhill, but a bump in the way" : "ΔG < 0: rolls down by itself")}
    <path d="M10 52 H34 C50 52 ${mode === "slow" ? "54 30 64 30 C76 30 80 52 90 70" : "60 52 72 70"} C100 88 110 118 150 118" stroke="${INK}" stroke-width="2.4" fill="none"/>
    <circle cx="24" cy="44" r="8" fill="${HL}" class="dg-hl"/>${mode !== "slow" ? arrow(40, 56, 70, 78, HL, 2.4) : ""}
    ${T(24, 70, 7.5, 700, MUT, "reactants")}${T(134, 132, 7.5, 700, MUT, "products")}
    <path d="M144 52 V114" stroke="${MUT}" stroke-width="1.4"/><path d="M140 108 L144 115 L148 108" stroke="${MUT}" stroke-width="1.4" fill="none"/>${T(140, 86, 8, 900, MUT, "ΔG", "end")}
    ${T(80, 150, 8, 700, MUT, mode === "slow" ? "spontaneous ≠ fast: Eₐ holds it up" : "free energy falls: spontaneous")}`;

  const S = {
    always: () => grid("always"), never: () => grid("never"), hight: () => grid("hight"), lowt: () => grid("lowt"),
    sup: () => ba("Solid → liquid → gas", lattice(22, 44, 4, 4, 11), scatter(pts(9, 96, 34, 146, 96, 3)), "ordered", "spread out", "entropy up"),
    sdown: () => ba("Gas → liquid or solid", scatter(pts(9, 14, 34, 64, 96, 3)), lattice(104, 44, 4, 4, 11), "spread out", "ordered", "entropy down"),
    dissolve: () => ba("Dissolving a solid", `<rect x="9" y="70" width="60" height="31" fill="#d7ecf7"/>${lattice(26, 52, 3, 3, 8, P2)}`, `<rect x="91" y="44" width="60" height="57" fill="#d7ecf7"/>${scatter(pts(9, 96, 50, 146, 98, 5), P2)}`, "crystal", "dissolved", "entropy up"),
    gasup: () => ba("Gas is formed", lattice(26, 70, 4, 3, 9, "#9a8a70"), `${lattice(108, 82, 4, 2, 9, "#9a8a70")}${scatter(pts(6, 96, 34, 146, 70, 6))}`, "0 mol gas", "2 mol gas", "entropy up"),
    gasdown: () => ba("Fewer gas molecules", scatter(pts(9, 14, 34, 64, 96, 4)), scatter(pts(6, 96, 34, 146, 96, 4), P2), "3 mol gas", "2 mol gas", "entropy down"),
    split: () => ba("One big → many small", `<path d="M16 66 ${[0, 1, 2, 3, 4, 5].map(i => `L${22 + i * 8} ${i % 2 ? 58 : 74}`).join(" ")}" stroke="${P2}" stroke-width="3" fill="none"/>${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${22 + i * 8}" cy="${i % 2 ? 58 : 74}" r="3.4" fill="${P2}"/>`).join("")}`, scatter(pts(6, 96, 34, 146, 96, 2), P2), "starch", "glucose units", "entropy up"),
    build: () => ba("Many small → one big", scatter(pts(6, 14, 34, 64, 96, 2), P2), `<path d="M98 66 ${[0, 1, 2, 3, 4, 5].map(i => `L${104 + i * 8} ${i % 2 ? 58 : 74}`).join(" ")}" stroke="${P2}" stroke-width="3" fill="none"/>${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${104 + i * 8}" cy="${i % 2 ? 58 : 74}" r="3.4" fill="${P2}"/>`).join("")}`, "amino acids", "protein chain", "entropy down"),
    spread: () => ba("Gas spreading out", `<rect x="9" y="29" width="22" height="72" fill="#f4e6f0"/>${scatter(pts(8, 12, 34, 28, 96, 1), "#b05aa0")}`, scatter(pts(8, 94, 34, 148, 96, 1), "#b05aa0"), "in a corner", "whole room", "entropy up"),
    squeeze: () => ba("Compressing a gas", scatter(pts(8, 14, 34, 64, 96, 3)), `<rect x="91" y="29" width="30" height="72" fill="#eef1f4"/><rect x="121" y="29" width="5" height="72" fill="#7f8c99"/>${scatter(pts(8, 120 - 26, 34, 118, 96, 3))}`, "big volume", "half the volume", "entropy down"),
    cool: () => ba("Cooling a gas", pts(6, 14, 34, 64, 96, 4).map(([x, y], i) => `<path d="M${x} ${y} l${i % 2 ? -12 : 12} ${i % 3 ? 6 : -6}" stroke="${P1}" opacity=".4" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="3.4" fill="${P1}"/>`).join(""), pts(6, 96, 34, 146, 96, 4).map(([x, y], i) => `<path d="M${x} ${y} l${i % 2 ? -4 : 4} ${i % 3 ? 2 : -2}" stroke="${P1}" opacity=".4" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="3.4" fill="${P1}"/>`).join(""), "30 °C, fast", "5 °C, slow", "entropy down"),
    crystal: () => `${T(80, 18, 9, 900, INK, "Third law")}${panel(40, 28, 80, 80, true)}${lattice(54, 42, 6, 6, 10.4)}${T(80, 126, 10, 900, HL, "0 K: S = 0")}${T(80, 142, 8, 700, MUT, "perfect crystal: one arrangement")}`,
    universe: () => `${T(80, 18, 9, 900, INK, "Second law")}<circle cx="80" cy="74" r="50" fill="#fff4e6" stroke="${HL}" stroke-width="2.2" class="dg-hl"/><rect x="58" y="56" width="44" height="36" rx="6" fill="#fff" stroke="#a9b6c2"/>
      ${lattice(66, 64, 4, 3, 9, P1)}${T(80, 104, 7.5, 800, INK, "system")}${T(80, 36, 7.5, 800, MUT, "surroundings")}
      ${[[44, 58], [116, 58], [46, 96], [114, 96]].map(([x, y]) => `<path d="M${x > 80 ? x - 10 : x + 10} ${y} q${x > 80 ? 4 : -4} -6 ${x > 80 ? 8 : -8} -6" stroke="#e0453c" stroke-width="1.6" fill="none"/>`).join("")}
      ${T(80, 140, 8, 800, HL, "ΔS(system) + ΔS(surr.) > 0")}${T(80, 151, 7.5, 700, MUT, "heat given off raises S(surr.)")}`,
    ball: () => hill("down"), slow: () => hill("slow"),
    cross: () => `<path d="M24 20 V128 H150" stroke="${INK}" stroke-width="1.4" fill="none"/><path d="M24 74 H150" stroke="${MUT}" stroke-dasharray="3 3"/>${T(20, 77, 8, 800, MUT, "0", "end")}
      ${T(14, 46, 8, 800, MUT, "ΔG").replace("<text", '<text transform="rotate(-90 14 46)"')}${T(140, 140, 7.5, 700, MUT, "T →", "end")}
      <path d="M28 36 L146 116" stroke="${INK}" stroke-width="2.4"/><circle cx="84" cy="74" r="5" fill="${HL}" class="dg-hl"/>${T(80, 94, 8, 900, HL, "T = ΔH ÷ ΔS", "end")}
      ${T(70, 32, 7.5, 700, MUT, "not spontaneous", "start")}${T(104, 122, 7.5, 700, "#2f9e6e", "spontaneous", "end")}${T(80, 152, 7.5, 700, MUT, "ΔH, ΔS both +: spontaneous above it")}`,
    dgk: () => `${T(80, 20, 10, 900, HL, "ΔG° = −RT ln K")}${[["ΔG° < 0", "K > 1", "products win", 50], ["ΔG° = 0", "K = 1", "balanced", 84], ["ΔG° > 0", "K < 1", "reactants win", 118]].map(([a, b, c, y], i) =>
      `<rect x="10" y="${y - 14}" width="140" height="26" rx="13" fill="${["#dff1e6", "#eef1f4", "#fbe3e0"][i]}"/>${T(38, y + 3, 9, 900, INK, a)}${T(74, y + 3, 9, 900, P1, b)}${T(96, y + 3, 7.5, 700, MUT, c, "start")}`).join("")}${T(80, 150, 7.5, 700, MUT, "R = 8.314 J/(mol·K), T in K")}`,
    atp: () => `${T(80, 18, 9, 900, INK, "Coupled reactions")}<path d="M14 120 L60 70" stroke="#7b4fc4" stroke-width="3"/><circle cx="60" cy="70" r="7" fill="#7b4fc4"/>${T(30, 72, 7.5, 800, "#7b4fc4", "uphill")}${T(30, 82, 7.5, 700, MUT, "+13.8")}
      <path d="M100 40 L146 110" stroke="${HL}" stroke-width="3" class="dg-hl"/><circle cx="100" cy="40" r="7" fill="${HL}"/>${T(132, 56, 7.5, 800, HL, "ATP → ADP")}${T(132, 66, 7.5, 700, MUT, "−30.5")}
      <path d="M68 70 Q80 48 94 44" stroke="${MUT}" stroke-width="1.6" stroke-dasharray="3 2" fill="none"/>
      ${T(80, 138, 8.5, 900, "#2f9e6e", "total ΔG = −16.7 kJ/mol")}${T(80, 150, 7.5, 700, MUT, "add the ΔG values: downhill overall")}`
  };
  const NAMES = { always: "ΔH − and ΔS +: always spontaneous", never: "ΔH + and ΔS −: never spontaneous", hight: "ΔH + and ΔS +: spontaneous at high temperature",
    lowt: "ΔH − and ΔS −: spontaneous at low temperature", sup: "Entropy rises", sdown: "Entropy falls", dissolve: "Dissolving", gasup: "Gas formed", gasdown: "Fewer gas molecules",
    split: "Breaking down", build: "Building up", spread: "Spreading out", squeeze: "Compressing", cool: "Cooling", crystal: "Third law", universe: "Second law",
    ball: "Free energy downhill", slow: "Spontaneous but slow", cross: "Crossover temperature", dgk: "Free energy and K", atp: "Coupling to ATP" };

  BGX.DIAGRAMS.gibbs = item => {
    const sp = dg.spots(item)[0];
    if (!item || !S[sp]) return dg.frame(grid(null), "The four sign cases of ΔG = ΔH − TΔS", ["#F7F5FB", "#E6E1F0"]);
    return dg.frame(S[sp](), NAMES[sp], ["#F7F5FB", "#E6E1F0"]);
  };
})();
