/* BioglowRX diagram "respiratory": head in side view + chest from the front, with an alveoli inset.
   Spot ids: nasal, pharynx, epiglottis, larynx, trachea, bronchi, bronchioles, alveoli, diaphragm, intercostal, pleura */
(function () {
  "use strict";
  const B = window.BGX, D = B.dg;
  const LBL = { nasal: "Nasal cavity", pharynx: "Pharynx", epiglottis: "Epiglottis", larynx: "Larynx", trachea: "Trachea",
    bronchi: "Bronchi", bronchioles: "Bronchioles", alveoli: "Alveoli", diaphragm: "Diaphragm", intercostal: "Intercostal muscles", pleura: "Pleura" };
  const LL = "M73 68 C62 64 46 68 40 82 C34 96 32 112 32 128 C44 120 62 120 74 126 L74 92Z";
  const RL = "M87 68 C98 64 114 68 120 82 C126 96 128 112 128 128 C116 120 98 120 88 126 L88 116 C96 110 96 100 88 96Z";
  const RIBS = [72, 83, 94, 105, 116];
  const arcs = o => RIBS.map(y => `M75 ${y + o} Q52 ${y + o - 8} 33 ${y + o + 10}M85 ${y + o} Q108 ${y + o - 8} 127 ${y + o + 10}`).join("");
  const TW = "M60 98 L48 90 M60 98 L45 104 M60 98 L52 114 M60 98 L64 112 M48 90 L42 84 M48 90 L46 80 M45 104 L38 102 M52 114 L46 120 M64 112 L66 119"
    + " M99 98 L111 90 M99 98 L114 104 M99 98 L108 114 M99 98 L95 112 M111 90 L117 84 M111 90 L113 80 M114 104 L121 102 M108 114 L114 120 M95 112 L93 119";
  const TIPS = [[42, 84], [46, 80], [38, 102], [46, 120], [66, 119], [117, 84], [113, 80], [121, 102], [114, 120], [93, 119]];
  const G7 = [[0, 0], [1.5, -.4], [.7, 1.3], [-.8, 1.1], [-1.3, -.5], [.1, -1.4], [1.6, 1.1]];
  const grape = (x, y, r, n) => G7.slice(0, n).map(([a, b]) => `<circle cx="${(x + a * r).toFixed(1)}" cy="${(y + b * r).toFixed(1)}" r="${r}"/>`).join("");
  // [id, base fill, draw(fill, on, P)]
  const L = [
    [null, "", (f, on, P) => `<path d="M78 98 C84 92 96 96 95 106 C94 114 86 120 82 124 C76 118 72 112 72 106 C72 102 74 99 78 98Z" fill="#C9454C" opacity=".75"/>
      <path d="M64 34 C68 32.5 74 32.5 78 35 C74 36.5 68 36.5 64 35.5Z" fill="#C98A86" opacity=".7"/>`],
    ["pleura", "#A8CFE0", f => `<path d="${LL}M0 0${RL}" fill="none" stroke="${f}" stroke-width="3.6" stroke-linejoin="round"/>`],
    [null, "", (f, on, P) => `<path d="${LL}" fill="url(#${P}lu)"/><path d="${RL}" fill="url(#${P}lu)"/><path d="M40 92 Q54 96 72 90 M42 108 Q56 104 72 110 M96 104 Q108 100 124 106" stroke="#C8616E" stroke-width=".8" fill="none" opacity=".6"/>`],
    ["bronchioles", "#E8EEF2", f => `<path d="${TW}" stroke="${f}" stroke-width="1.7" stroke-linecap="round" fill="none"/>`],
    ["alveoli", "#F9D3D6", (f, on) => `<g fill="${f}" stroke="${on ? "#fff" : "#C8616E"}" stroke-width=".8">${TIPS.map(([x, y]) => grape(x, y, on ? 1.8 : 1.3, 3)).join("")}${grape(134, 30, 4.6, 7)}</g>`],
    ["bronchi", "#DDEBF2", (f, on) => `<path d="M78 86 C72 92 66 94 60 98 M81 86 C87 92 93 94 99 98" stroke="${on ? "#fff" : "#8FAEBE"}" stroke-width="6.6" stroke-linecap="round" fill="none"/><path d="M78 86 C72 92 66 94 60 98 M81 86 C87 92 93 94 99 98" stroke="${f}" stroke-width="4.6" stroke-linecap="round" fill="none"/>`],
    ["trachea", "#DDEBF2", (f, on) => `<rect x="76" y="58" width="7" height="31" rx="3" fill="${f}" stroke="${on ? "#fff" : "#8FAEBE"}" stroke-width=".8"/><path d="M76.5 63H82.5M76.5 67H82.5M76.5 71H82.5M76.5 75H82.5M76.5 79H82.5M76.5 83H82.5" stroke="${on ? "#fff" : "#A9C3D0"}" stroke-width="1.1"/>`],
    [null, "", () => `<path d="${arcs(0)}" stroke="#F6EFE3" stroke-width="2.2" fill="none" opacity=".45" stroke-linecap="round"/>`],
    ["intercostal", "#B3534B", (f, on) => `<path d="${arcs(5.5)}" stroke="${f}" stroke-width="${on ? 3 : 1.3}" fill="none" opacity="${on ? 1 : .35}" stroke-linecap="round"/>`],
    ["diaphragm", "url(#P_dm)", f => `<path d="M24 136 C30 122 50 116 66 122 C72 124 76 128 80 128 C84 128 88 124 94 122 C110 116 130 122 136 136 L136 141 C128 128 110 124 94 129 C88 131 84 134 80 134 C76 134 72 131 66 129 C50 124 32 128 24 141Z" fill="${f}"/>`],
    ["nasal", "#F2A39C", (f, on) => `<path d="M60 27.5 C63 23 71 21.5 78 23.5 L78 28.5 C71 30 65 30 60 28.8Z" fill="${f}" stroke="${on ? "#fff" : "#C9706B"}" stroke-width=".7"/><path d="M64 25.5 Q70 23.6 76 25" stroke="#fff" stroke-opacity=".5" fill="none"/>`],
    ["pharynx", "#E58F8A", (f, on) => `<path d="M77 22.5 C81 21.5 85 23 86 27 C87 35 87 43 86 51 L81 51 C81 43 81 33 78.5 28Z" fill="${f}" stroke="${on ? "#fff" : "#B9605D"}" stroke-width=".7"/>`],
    ["larynx", "#C9D9E3", (f, on) => `<path d="M74.5 50.5 L82.5 50.5 L82.5 60 L76 60 C75 57 74 53.5 74.5 50.5Z" fill="${f}" stroke="${on ? "#fff" : "#8FAEBE"}" stroke-width=".7"/><path d="M75.5 54 L79 56 L75.8 58" stroke="${on ? "#fff" : "#8FAEBE"}" fill="none" stroke-width=".8"/>`],
    ["epiglottis", "#EBC77F", (f, on) => `<path d="M78 51.5 C77 47.5 79 44 82.5 42.5 C81.2 46 80.6 48.8 80.6 51.5Z" fill="${f}" stroke="${on ? "#fff" : "#B8934A"}" stroke-width=".6"/>`]
  ];
  B.DIAGRAMS.respiratory = item => {
    const P = D.uid(), sp = D.spots(item), any = sp.length > 0;
    let lo = "", hi = "";
    L.forEach(([id, base, fn]) => {
      const b = base.replace("P_", P);
      if (id && sp.indexOf(id) >= 0) hi += `<g class="dg-hl" filter="url(#${P}gl)">${fn(D.HL, true, P)}</g>`;
      else lo += fn(b, false, P);
    });
    const defs = `<defs><linearGradient id="${P}sk" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#F8DFCF"/><stop offset="1" stop-color="#EBC0A6"/></linearGradient>
      <linearGradient id="${P}lu" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#F9BDC1"/><stop offset="1" stop-color="#E07D89"/></linearGradient>
      <linearGradient id="${P}dm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CF6A5F"/><stop offset="1" stop-color="#99372F"/></linearGradient>
      <filter id="${P}gl" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="0" stdDeviation="1.6" flood-color="${D.HL}" flood-opacity=".9"/></filter>
      <clipPath id="${P}in"><circle cx="134" cy="30" r="19"/></clipPath></defs>`;
    const skin = `<path d="M84 5 C96 5 105 13 104 24 C103 32 100 38 96 44 L95 56 C112 58 128 62 134 72 L138 142 L22 142 L26 72 C32 62 48 58 75 56 L74 47 C68 46 63 45 61 42 L60 37 L58 35.5 L60 33.5 L58 31.5 L61 29.5 L54 26.5 L60 17 C60 10 70 5 84 5Z" fill="url(#${P}sk)"/>
      <path d="M26 72 C32 62 48 58 75 56 L95 56 C112 58 128 62 134 72 L137 136 L23 136Z" fill="#E7B59D" opacity=".55"/><circle cx="74" cy="15" r="1.6" fill="#5A4636"/>`;
    const inset = `<circle cx="134" cy="30" r="20" fill="#FFF8F6" stroke="#9FB7C4" stroke-width="1.4"/><g clip-path="url(#${P}in)"><path d="M114 44 Q124 36 130 32" stroke="#C9DCE6" stroke-width="3" fill="none"/><path d="M118 18 Q134 6 150 20 M118 46 Q136 52 150 38" stroke="#D9474E" stroke-width="1.4" fill="none" opacity=".8"/><path d="M116 24 Q134 50 152 28" stroke="#4B6FB5" stroke-width="1.2" fill="none" opacity=".7"/></g>
      <path d="M120 44 L114 82" stroke="#7C93A1" stroke-width=".9" stroke-dasharray="2 2"/>`;
    const label = item && sp.length ? D.tag(80, 151, LBL[sp[0]] || "") : "";
    return D.frame(defs + skin + inset + lo + (any ? `<rect width="160" height="160" rx="18" fill="#EEF3F6" opacity=".5"/>` : "") + hi + label, item ? (item.name + " in the respiratory system") : "The respiratory system, nose to alveoli");
  };
})();
