/* BioglowRX diagram "immune" — the immune system.
   Organs on a body (item.spot): marrow, thymus, nodes, spleen, tonsils, lymphvessels, skin, mucosa.
   Cells and responses as a close-up (item.cell): neutrophil, macrophage, nk, mast, helper, cytotoxic, bcell, plasma,
   antibody, memory, apc, inflammation, fever, complement, interferon, lysozyme. Overview (null): the lymphatic organs. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;

  /* ---------- body with lymphatic organs ---------- */
  const BODY = "M80 6 C90 6 95 13 95 23 C95 31 91 36 87 38 L87 43 C98 45 112 46 119 51 C125 55 126 62 126 70 L129 112 C129 116 123 117 122 113 L117 76 C115 88 108 96 109 104 C110 112 114 118 114 128 L110 156 L84 156 L80 142 L76 156 L50 156 L46 128 C46 118 50 112 51 104 C52 96 45 88 43 76 L38 113 C37 117 31 116 31 112 L34 70 C34 62 35 55 41 51 C48 46 62 45 73 43 L73 38 C69 36 65 31 65 23 C65 13 70 6 80 6Z";
  const NODES = { neck: [[72, 41], [88, 41], [74, 46], [86, 46]], arm: [[50, 58], [53, 63], [110, 58], [107, 63]], gut: [[74, 96], [86, 98], [80, 104], [70, 104], [90, 106]], groin: [[64, 124], [68, 129], [96, 124], [92, 129]] };
  function bodySVG(it, p) {
    const on = id => dg.is(it, id), c = (id, base) => on(id) ? HL : base;
    const vessels = `<g fill="none" stroke="${c("lymphvessels", "#4fb38a")}" stroke-width="${on("lymphvessels") ? 2 : 1.3}" stroke-linecap="round" opacity="${on("lymphvessels") ? 1 : .8}">
      <path d="M80 44 V118 M80 60 Q66 58 52 60 L40 100 M80 60 Q94 58 108 60 L120 100 M80 112 L66 126 L60 154 M80 112 L94 126 L100 154 M76 50 Q72 46 72 41 M84 50 Q88 46 88 41"/></g>`;
    const nodes = Object.values(NODES).flat().map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="2" fill="${c("nodes", "#2e8f6a")}"${on("nodes") ? ' stroke="#fff" stroke-width=".7"' : ""}/>`).join("");
    const marrow = [[66, 134, 62, 152], [94, 134, 98, 152], [72, 110, 88, 110]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c("marrow", "#d98a8a")}" stroke-width="${on("marrow") ? 5 : 4}" stroke-linecap="round"/>`).join("");
    const o = `<defs><linearGradient id="${p}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2cf"/><stop offset="1" stop-color="#f4c9ae"/></linearGradient></defs>
      <path d="${BODY}" fill="url(#${p}sk)" stroke="${on("skin") ? HL : "#d9a98c"}" stroke-width="${on("skin") ? 4 : 1}"${on("skin") ? ' class="dg-hl"' : ""}/>
      <path d="M77 30 Q80 34 83 30 M80 25 V29 M80 36 V44 Q80 50 80 52" stroke="${on("mucosa") ? HL : "#d9a98c"}" stroke-width="${on("mucosa") ? 3 : 1.2}" fill="none" stroke-linecap="round"${on("mucosa") ? ' class="dg-hl"' : ""}/>
      ${on("mucosa") ? `<path d="M80 52 L72 62 M80 52 L88 62" stroke="${HL}" stroke-width="3" stroke-linecap="round"/><path d="M80 66 Q76 80 80 94" stroke="${HL}" stroke-width="3" fill="none"/>` : ""}
      ${marrow}${vessels}${nodes}
      <ellipse cx="80" cy="56" rx="${on("thymus") ? 6 : 5}" ry="4" fill="${c("thymus", "#8fb7e0")}"${on("thymus") ? ' class="dg-hl"' : ""}/>
      <path d="M93 80 Q102 76 104 84 Q103 92 95 90 Q91 86 93 80Z" fill="${c("spleen", "#9b5a7a")}"${on("spleen") ? ' class="dg-hl"' : ""}/>
      <circle cx="76.5" cy="34" r="${on("tonsils") ? 2.6 : 1.8}" fill="${c("tonsils", "#e07b7b")}"/><circle cx="83.5" cy="34" r="${on("tonsils") ? 2.6 : 1.8}" fill="${c("tonsils", "#e07b7b")}"/>`;
    const names = { marrow: "Red bone marrow", thymus: "Thymus", nodes: "Lymph nodes", spleen: "Spleen", tonsils: "Tonsils", lymphvessels: "Lymphatic vessels", skin: "Skin", mucosa: "Mucous membranes" };
    const sp = dg.spots(it)[0];
    const tag = sp ? dg.tag(80, 150, names[sp] || sp) : "";
    return dg.frame(o + tag, sp ? names[sp] : "The lymphatic organs: tonsils, thymus, lymph nodes, spleen, bone marrow", ["#F2FAF6", "#D9EEE4"]);
  }

  /* ---------- close-up scenes ---------- */
  const bug = (x, y, r, s) => `<g transform="translate(${x} ${y}) rotate(${r || 0}) scale(${s || 1})"><rect x="-9" y="-4.5" width="18" height="9" rx="4.5" fill="#7bbf4a" stroke="#4f8a2a"/><path d="M9 0 q5 -2 8 2" stroke="#4f8a2a" fill="none"/></g>`;
  const virus = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})">${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${(Math.cos(a) * 6).toFixed(1)} ${(Math.sin(a) * 6).toFixed(1)} L${(Math.cos(a) * 9).toFixed(1)} ${(Math.sin(a) * 9).toFixed(1)}" stroke="#8a4fbf" stroke-width="1.4"/><circle cx="${(Math.cos(a) * 9.5).toFixed(1)}" cy="${(Math.sin(a) * 9.5).toFixed(1)}" r="1.4" fill="#8a4fbf"/>`; }).join("")}<circle r="6" fill="#b57de0"/></g>`;
  const Y = (x, y, r, s, col) => `<g transform="translate(${x} ${y}) rotate(${r || 0}) scale(${s || 1})" stroke="${col || "#2f6fb8"}" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M0 8 V0 L-6 -7 M0 0 L6 -7"/></g>`;
  const cellBody = (cx, cy, r, fill, stroke, extra) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"${extra || ""}/>`;
  const lympho = (cx, cy, r, fill, nuc) => cellBody(cx, cy, r, fill, "#6d8fb0") + `<circle cx="${cx}" cy="${cy}" r="${r * .72}" fill="${nuc || "#5b4a9e"}"/>`;
  const C = {
    neutrophil: () => cellBody(78, 78, 40, "#f6e9f3", "#c99ab9", ' class="dg-hl"') + `<path d="M58 70 q8 -12 16 -2 q6 -12 16 -2 q8 -8 12 6 q-4 10 -12 6 q-4 10 -14 4 q-8 8 -16 -2 q-6 -4 -2 -10Z" fill="#7a3d8f"/>` + [[62, 96], [74, 104], [90, 100], [98, 88], [56, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#c99ab9"/>`).join("") + bug(128, 50, 30, .9) + bug(132, 112, -20, .9),
    macrophage: () => `<path d="M30 80 Q24 50 52 40 Q60 22 82 32 Q110 22 122 46 Q144 56 134 84 Q146 110 118 120 Q104 142 78 128 Q50 140 40 116 Q18 104 30 80Z" fill="#f3e3cf" stroke="#c9a37a" stroke-width="2" class="dg-hl"/>
      <ellipse cx="70" cy="86" rx="16" ry="12" fill="#a0602f"/>
      <circle cx="106" cy="76" r="14" fill="#fff" stroke="#c9a37a" stroke-dasharray="3 2"/>${bug(106, 76, 20, .9)}${bug(144, 30, -30, .8)}`,
    nk: () => lympho(70, 80, 34, "#e6f0fa") + `<g fill="#ff9a3c">${[[96, 60], [100, 74], [96, 90], [90, 102]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</g>
      <circle cx="128" cy="80" r="22" fill="#efe1f7" stroke="#b57de0" stroke-width="2"/>${virus(124, 74, .6)}${virus(134, 90, .5)}
      <path d="M102 80 L110 80" stroke="${HL}" stroke-width="3" class="dg-hl"/><path d="M106 74 L112 80 L106 86" stroke="${HL}" stroke-width="3" fill="none"/>`,
    mast: () => cellBody(76, 80, 40, "#fbeaea", "#d99", ' class="dg-hl"') + `<ellipse cx="76" cy="80" rx="12" ry="10" fill="#8a4a6a"/>` + Array.from({ length: 26 }, (_, i) => { const a = i * 2.4, rr = 18 + (i % 4) * 4.5; return `<circle cx="${(76 + Math.cos(a) * rr).toFixed(1)}" cy="${(80 + Math.sin(a) * rr).toFixed(1)}" r="2.6" fill="#7a2f8f"/>`; }).join("") +
      [[124, 50], [134, 68], [128, 92], [140, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#7a2f8f" opacity=".75"/>`).join("") + T(132, 134, 8.5, 800, "#7a2f8f", "histamine"),
    helper: () => lympho(80, 80, 34, "#e6f0fa", "#3e7cc4") + T(80, 84, 12, 900, "#fff", "CD4") + [[30, 40], [130, 40], [30, 120], [130, 120]].map(([x, y]) => `<path d="M${80 + (x - 80) * .45} ${80 + (y - 80) * .45} L${x} ${y}" stroke="${HL}" stroke-width="2" stroke-dasharray="3 3" class="dg-hl"/><circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="#6d8fb0"/>`).join("") + T(30, 43, 7, 800, "#3e7cc4", "B") + T(130, 43, 7, 800, "#3e7cc4", "Tc") + T(30, 123, 7, 800, "#3e7cc4", "M") + T(130, 123, 7, 800, "#3e7cc4", "NK"),
    cytotoxic: () => lympho(58, 80, 30, "#e6f0fa", "#2e8f6a") + T(58, 84, 11, 900, "#fff", "CD8") + `<circle cx="118" cy="80" r="26" fill="#efe1f7" stroke="#b57de0" stroke-width="2" stroke-dasharray="5 3"/>${virus(116, 76, .55)}
      <g class="dg-hl" fill="${HL}">${[[92, 70], [96, 80], [92, 90]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</g>` + T(118, 124, 8.5, 800, "#7a2f8f", "infected cell"),
    bcell: () => lympho(80, 84, 32, "#eef7ee", "#3f8f4a") + Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4 - Math.PI / 2; return Y((80 + Math.cos(a) * 38).toFixed(1), (84 + Math.sin(a) * 38).toFixed(1), (a * 57.3 + 90).toFixed(0), .9, HL); }).join("") + T(80, 88, 11, 900, "#fff", "B"),
    plasma: () => `<ellipse cx="66" cy="84" rx="38" ry="30" fill="#eef7ee" stroke="#3f8f4a" stroke-width="2"/><circle cx="48" cy="84" r="13" fill="#3f8f4a"/>
      ${[0, 1, 2, 3, 4].map(i => `<path d="M64 ${66 + i * 8} q10 -3 22 0" stroke="#9fcf9f" stroke-width="2" fill="none"/>`).join("")}
      <g class="dg-hl">${[[118, 46, 20], [132, 70, -30], [116, 96, 40], [138, 112, 10], [104, 126, -20], [140, 40, 60]].map(([x, y, r]) => Y(x, y, r, 1.1, HL)).join("")}</g>`,
    antibody: () => `<g transform="translate(80 92)" stroke-linecap="round" fill="none"><path d="M-4 40 V2 L-34 -30 M4 40 V2 L34 -30" stroke="#2f6fb8" stroke-width="9"/><path d="M-12 -4 L-38 -30 M12 -4 L38 -30" stroke="#7fb0e6" stroke-width="7"/>
      <path d="M-40 -32 l-4 -6 M40 -32 l4 -6" stroke="${HL}" stroke-width="8" class="dg-hl"/></g>${T(80, 150, 8.5, 700, "#2f6fb8", "tips grip one antigen")}${bug(30, 36, -30, .9)}${bug(130, 36, 30, .9)}`,
    memory: () => lympho(54, 78, 26, "#fff7e0", "#c9902a") + lympho(108, 70, 22, "#fff7e0", "#c9902a") + lympho(92, 116, 20, "#fff7e0", "#c9902a") + `<g class="dg-hl"><circle cx="54" cy="78" r="30" fill="none" stroke="${HL}" stroke-width="2"/></g>` + T(80, 30, 9, 800, "#9a6a12", "remembers the antigen"),
    apc: () => `<path d="M80 80 L40 40 M80 80 L128 36 M80 80 L136 108 M80 80 L44 124 M80 80 L80 30" stroke="#d8b4e8" stroke-width="12" stroke-linecap="round"/>${cellBody(80, 80, 26, "#efe1f7", "#a678c4")}<circle cx="80" cy="80" r="10" fill="#7a4fa0"/>
      <g class="dg-hl"><path d="M100 64 h10" stroke="#7a4fa0" stroke-width="4"/><path d="M110 60 l6 4 -6 4z" fill="${HL}"/></g>${lympho(136, 60, 14, "#e6f0fa", "#3e7cc4")}`,
    inflammation: () => `<rect x="10" y="70" width="140" height="30" rx="6" fill="#f2b2a8" class="dg-hl"/><rect x="10" y="78" width="140" height="14" rx="6" fill="#d9483b"/>
      ${[30, 70, 110].map(x => `<circle cx="${x}" cy="85" r="4" fill="#fff" opacity=".7"/>`).join("")}<circle cx="90" cy="104" r="6" fill="#f6e9f3" stroke="#c99ab9"/><circle cx="96" cy="118" r="6" fill="#f6e9f3" stroke="#c99ab9"/>${bug(120, 128, 20, .8)}
      ${["Redness", "Heat", "Swelling", "Pain"].map((w, i) => `<rect x="${8 + i * 37}" y="22" width="34" height="16" rx="8" fill="#fff" stroke="#d9483b"/>` + T(25 + i * 37, 33, 6.8, 800, "#b0322a", w)).join("")}
      ${T(80, 58, 8, 600, "#55616e", "vessels widen and leak")}`,
    fever: () => `<rect x="70" y="22" width="20" height="96" rx="10" fill="#fff" stroke="#9fb3c4" stroke-width="2"/><rect x="76" y="50" width="8" height="70" fill="${HL}" class="dg-hl"/><circle cx="80" cy="126" r="16" fill="${HL}"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M90 ${36 + i * 12} h7" stroke="#55616e"/>`).join("")}${T(118, 56, 13, 900, HL, "38.5 °C", "middle")}${T(118, 70, 8, 600, "#55616e", "101 °F")}
      ${T(36, 60, 8, 700, "#55616e", "hypothalamus")}${T(36, 70, 8, 700, "#55616e", "resets the")}${T(36, 80, 8, 700, "#55616e", "thermostat")}`,
    complement: () => `<rect x="34" y="54" width="92" height="52" rx="26" fill="#a6d77c" stroke="#4f8a2a" stroke-width="2"/>
      <g class="dg-hl"><rect x="74" y="44" width="12" height="28" rx="3" fill="${HL}"/><rect x="76" y="50" width="8" height="18" fill="#fff"/></g>
      ${[[40, 32], [60, 26], [104, 28], [124, 36], [32, 128], [128, 124]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#f2a33a"/>`).join("")}${T(80, 88, 8, 800, "#2f5f1a", "bacterium")}${T(80, 146, 8, 700, "#55616e", "proteins punch a hole")}`,
    interferon: () => `${cellBody(48, 84, 30, "#efe1f7", "#b57de0")}${virus(44, 80, .7)}${cellBody(128, 84, 22, "#eaf6ee", "#4f8a5a")}
      <g class="dg-hl" fill="${HL}">${[[84, 70], [92, 84], [84, 98], [100, 74], [102, 94]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</g>${T(128, 88, 8, 800, "#2f6f3a", "on guard")}${T(48, 132, 8, 700, "#7a2f8f", "infected cell")}`,
    lysozyme: () => `<path d="M80 18 Q104 54 104 78 A24 24 0 0 1 56 78 Q56 54 80 18Z" fill="#cde7f5" stroke="#6fa8cf" stroke-width="2"/>${T(80, 74, 8, 800, "#2f6fb8", "tears,")}${T(80, 84, 8, 800, "#2f6fb8", "saliva")}
      <g transform="translate(80 124)"><rect x="-26" y="-11" width="52" height="22" rx="11" fill="#a6d77c" stroke="#4f8a2a" stroke-width="2" stroke-dasharray="7 4"/><g class="dg-hl"><path d="M-6 -16 L4 16" stroke="${HL}" stroke-width="3"/></g></g>`
  };
  const CN = { neutrophil: "Neutrophil", macrophage: "Macrophage", nk: "Natural killer cell", mast: "Mast cell", helper: "Helper T cell", cytotoxic: "Cytotoxic T cell",
    bcell: "B cell", plasma: "Plasma cell", antibody: "Antibody", memory: "Memory cells", apc: "Antigen-presenting cell", inflammation: "Inflammation",
    fever: "Fever", complement: "Complement", interferon: "Interferon", lysozyme: "Lysozyme" };
  BGX.DIAGRAMS.immune = item => {
    const p = dg.uid();
    if (item && item.cell && C[item.cell]) return dg.frame(C[item.cell](p), CN[item.cell] || item.name, ["#F6F4FB", "#E4E0F0"]);
    return bodySVG(item, p);
  };
})();
