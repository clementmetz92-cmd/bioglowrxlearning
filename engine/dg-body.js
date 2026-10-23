/* BioglowRX diagram "body": front view of the body with main organs and glands (body's left on the viewer's right).
   Spot ids: brain, pineal, pituitary, eyes, salivary, thyroid, parathyroid, airways, lungs, heart, liver, stomach,
   pancreas, adrenals, kidneys, intestines, bladder, ovaries, testes, vessels, skin, fat */
(function () {
  "use strict";
  const B = window.BGX, D = B.dg;
  const LBL = { brain: "Brain", pineal: "Pineal gland", pituitary: "Pituitary gland", eyes: "Eyes", salivary: "Salivary glands",
    thyroid: "Thyroid", parathyroid: "Parathyroids", airways: "Airways", lungs: "Lungs", heart: "Heart", liver: "Liver",
    stomach: "Stomach", pancreas: "Pancreas", adrenals: "Adrenal glands", kidneys: "Kidneys", intestines: "Intestines",
    bladder: "Bladder", ovaries: "Ovaries", testes: "Testes", vessels: "Blood vessels", skin: "Skin", fat: "Fat tissue" };
  const COMBO = { "heart,vessels": "Heart & vessels", "lungs,airways": "Lungs & airways", "stomach,intestines": "Stomach & gut",
    "liver,vessels": "Liver & vessels", "kidneys,vessels": "Kidneys & vessels", "liver,pancreas": "Liver & pancreas" };
  const RING = { pituitary: [[80, 26.6, 5.5]], pineal: [[80, 17, 5.5]], parathyroid: [[80, 46, 8]], thyroid: [[80, 46, 8]],
    adrenals: [[62, 105.5, 5.5], [98, 103.5, 5.5]], ovaries: [[67, 138, 5.5], [93, 138, 5.5]], testes: [[80, 151, 7]],
    eyes: [[71, 30, 6], [89, 30, 6]], salivary: [[66, 36, 6.5], [94, 36, 6.5]], bladder: [[80, 140, 9]] };
  const HEAD = ["brain", "pineal", "pituitary", "eyes", "salivary"];
  const SK = "M80 3 C92 3 98 12 98 24 C98 33 94 38 88 41 L88 46 C100 48 116 49 124 54 C130 58 131 66 131 74 L134 118 C134 122 128 123 127 119 L122 80 C120 92 112 100 113 108 C114 116 118 122 118 132 L114 160 L84 160 L80 146 L76 160 L46 160 L42 132 C42 122 46 116 47 108 C48 100 40 92 38 80 L33 119 C32 123 26 122 26 118 L29 74 C29 66 30 58 36 54 C44 49 60 48 72 46 L72 41 C66 38 62 33 62 24 C62 12 68 3 80 3Z";
  const st = on => on ? ' stroke="#fff" stroke-width=".8"' : "";
  const E = (cx, cy, rx, ry, f, on, x) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${st(on)}${x || ""}/>`;
  const L = [
    ["vessels", "", (f, on) => `<g fill="none" stroke-linecap="round" stroke-width="${on ? 1.8 : 1.2}"><path d="M83 70 C83 61 90 61 90 68 M82 72 V128 L71 158 M82 128 L90 158 M80 64 V36 M76 54 L42 60 L36 80 L31 114 M86 54 L118 60 L124 80 L129 114" stroke="${on ? f : "#C8323F"}"/><path d="M77 74 V128 L66 158 M77 128 L86 158 M77 64 V40" stroke="${on ? f : "#4B6FB5"}" opacity="${on ? 1 : .8}"/></g>`],
    ["fat", "#F2D27A", (f, on) => `<path d="M46 92 C44 104 45 118 43 132 L48 132 C50 118 49 104 51 94Z M114 92 C116 104 115 118 117 132 L112 132 C110 118 111 104 109 94Z" fill="${f}"${st(on)} opacity="${on ? 1 : .45}"/>`],
    ["brain", "url(#P_br)", (f, on) => `<path d="M65.5 18 C65.5 9 72 4.5 80 4.5 C88 4.5 94.5 9 94.5 18 C94.5 23 90 25 80 25 C70 25 65.5 23 65.5 18Z" fill="${f}"${st(on)}/><path d="M80 5 V24 M69 12 q4 -3 7 0 M84 12 q4 -3 7 0 M68 18 q4 -3 8 0 M84 18 q4 -3 8 0" stroke="#fff" stroke-opacity=".5" fill="none" stroke-width=".9"/>`],
    ["eyes", "#fff", (f, on) => E(71, 30, 4, 2.4, f, on, ' stroke="#9A7F70" stroke-width=".5"') + E(89, 30, 4, 2.4, f, on, ' stroke="#9A7F70" stroke-width=".5"') + `<circle cx="71" cy="30" r="1.5" fill="${on ? "#fff" : "#4E7BA8"}"/><circle cx="89" cy="30" r="1.5" fill="${on ? "#fff" : "#4E7BA8"}"/>`],
    ["salivary", "#D9A86C", (f, on) => E(63.8, 33, 2.1, 3.6, f, on) + E(96.2, 33, 2.1, 3.6, f, on) + E(70, 39, 3, 1.7, f, on) + E(90, 39, 3, 1.7, f, on)],
    ["airways", "#BFD8E6", (f, on) => `<path d="M80 41 V58 L71 65 M80 58 L89 65" stroke="${f}" stroke-width="${on ? 3.4 : 2.8}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`],
    ["lungs", "url(#P_lu)", (f, on) => `<path d="M77 54 C70 51 58 53 53 64 C49 74 48 84 49 92 C56 89 66 89 77 91Z M83 54 C90 51 102 53 107 64 C111 74 112 84 111 92 C105 89 98 89 95 91 C93 84 88 80 83 78Z" fill="${f}"${st(on)}/>`],
    ["thyroid", "#C9604F", (f, on) => E(76.8, 46, 2.8, 3.6, f, on) + E(83.2, 46, 2.8, 3.6, f, on) + `<rect x="77" y="46" width="6" height="2.4" fill="${f}"/>`],
    ["parathyroid", "#E9A23B", (f, on) => [[75.6, 44.2], [84.4, 44.2], [75.6, 48], [84.4, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${on ? 1.7 : 1}" fill="${f}"${st(on)}/>`).join("")],
    ["heart", "url(#P_ht)", (f, on) => `<path d="M80 72 C85 67 95 69 95 77 C95 84 89 88 86 92 C80 89 74 84 75 79 C75 75 77 73 80 72Z" fill="${f}"${st(on)}/>`],
    ["kidneys", "#9C3D3A", (f, on) => E(62, 115, 4.6, 7, f, on) + E(98, 113, 4.6, 7, f, on)],
    ["adrenals", "#E8B04A", (f, on) => `<path d="M58 108.5 L62 103 L66 108.5Z M94 106.5 L98 101 L102 106.5Z" fill="${f}"${st(on)} stroke-linejoin="round"/>`],
    ["liver", "url(#P_lv)", (f, on) => `<path d="M50 96 C56 89 76 88 92 92 C90 98 82 102 72 104 C62 106 52 104 50 100Z" fill="${f}"${st(on)}/>`],
    ["stomach", "url(#P_sm)", (f, on) => `<path d="M89 94 C98 90 108 94 109 100 C110 108 102 113 93 111 C88 110 86 107 88 105 C94 105 98 103 97 99 C96 97 92 96 89 94Z" fill="${f}"${st(on)}/>`],
    ["pancreas", "#F0C27A", (f, on) => `<path d="M70 112 C76 108 88 110 97 108 C102 107 106 108 104 111 C98 114 88 114 72 116 C68 116 67 113 70 112Z" fill="${f}"${st(on)}/>`],
    ["intestines", "", (f, on) => `<path d="M58 134 V121 H102 V134" stroke="${on ? f : "#C98A6E"}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M64 125 q4 -3 8 0 t8 0 t8 0 t8 0 M64 130 q4 -3 8 0 t8 0 t8 0 t8 0" stroke="${on ? f : "#EDA99B"}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`],
    ["ovaries", "#E58FB0", (f, on) => E(67, 138, on ? 3.4 : 2.6, on ? 2.4 : 1.8, f, on) + E(93, 138, on ? 3.4 : 2.6, on ? 2.4 : 1.8, f, on)],
    ["bladder", "#EBCB6E", (f, on) => E(80, 140, 6, 4.4, f, on)],
    ["testes", "#D99A8A", (f, on) => E(77, 151, 2.6, 3.4, f, on) + E(83, 151, 2.6, 3.4, f, on)],
    ["pineal", "#B5677F", (f, on) => `<circle cx="80" cy="17" r="${on ? 2.8 : 1.8}" fill="${f}"${st(on)}/>`],
    ["pituitary", "#A9506F", (f, on) => `<path d="M80 23.5 V25.5" stroke="${f}" stroke-width="1"/><circle cx="80" cy="26.6" r="${on ? 2.8 : 2}" fill="${f}"${st(on)}/>`],
    ["skin", "", (f, on) => on ? `<path d="${SK}" fill="none" stroke="${f}" stroke-width="3.2" stroke-linejoin="round"/>` : ""]
  ];
  B.DIAGRAMS.body = item => {
    const P = D.uid(), sp = D.spots(item), any = sp.length > 0;
    let lo = "", hi = "";
    L.forEach(([id, base, fn]) => {
      if (sp.indexOf(id) >= 0) hi += `<g class="dg-hl" filter="url(#${P}gl)">${fn(D.HL, true)}${(RING[id] || []).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${D.HL}" stroke-width="1.5"/>`).join("")}</g>`;
      else lo += fn(base.replace("P_", P), false);
    });
    const g = (n, a, b) => `<linearGradient id="${P}${n}" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
    const defs = `<defs>${g("sk", "#F8DFCF", "#E9BC9F")}${g("br", "#F2BCC6", "#D58A9A")}${g("lu", "#F9BDC1", "#E07D89")}${g("ht", "#E0505A", "#A8232F")}${g("lv", "#A8473A", "#71291F")}${g("sm", "#F2AE86", "#D97C55")}
      <filter id="${P}gl" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="${D.HL}" flood-opacity=".95"/></filter></defs>`;
    const skin = `<path d="${SK}" fill="url(#${P}sk)" stroke="#D9A88C" stroke-width=".6"/><path d="M78 34 Q80 35.5 82 34 M76 37.5 Q80 38.6 84 37.5" stroke="#B9806A" stroke-width=".7" fill="none"/>`;
    let label = "";
    if (any) {
      const t = COMBO[sp.join(",")] || sp.map(s => LBL[s]).join(" & ");
      label = D.tag(80, HEAD.indexOf(sp[0]) >= 0 ? 152 : 10, t);
    }
    return D.frame(defs + skin + lo + (any ? `<rect width="160" height="160" rx="18" fill="#EEF3F6" opacity=".55"/>` : "") + hi + label,
      item ? (item.name + ": where in the body") : "The body's main organs and glands");
  };
})();
