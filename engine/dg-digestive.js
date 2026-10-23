/* BioglowRX diagram "digestive": front view of the digestive tract and helper organs (body's left on the viewer's right).
   Spot ids: mouth, salivary, oesophagus, stomach, duodenum, jejunum, ileum, colon, rectum, liver, gallbladder, pancreas */
(function () {
  "use strict";
  const B = window.BGX, D = B.dg;
  const LBL = { mouth: "Mouth", salivary: "Salivary glands", oesophagus: "Oesophagus", stomach: "Stomach", duodenum: "Duodenum",
    jejunum: "Jejunum", ileum: "Ileum", colon: "Large intestine", rectum: "Rectum", liver: "Liver", gallbladder: "Gallbladder", pancreas: "Pancreas" };
  const RING = { mouth: [[80, 30, 8]], salivary: [[67, 29, 7], [93, 29, 7]], gallbladder: [[68, 83, 8]] };
  const SK = "M80 3 C89 3 95 10 95 20 C95 28 91 33 87 36 L87 44 C102 46 120 48 128 56 C134 62 134 72 132 84 C130 100 128 112 130 126 C132 138 128 150 124 160 L36 160 C32 150 28 138 30 126 C32 112 30 100 28 84 C26 72 26 62 32 56 C40 48 58 46 73 44 L73 36 C69 33 65 28 65 20 C65 10 71 3 80 3Z";
  const st = on => on ? ' stroke="#fff" stroke-width=".8"' : "";
  const tube = (d, f, w, on, dark) => `<path d="${d}" stroke="${on ? "#fff" : dark}" stroke-width="${w + 1.6}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${f}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const COLON = "M51 139 V114 C51 111 53 110 56 110 H108 C111 110 112 112 112 115 V133 C112 139 104 141 97 139 C91 138 86 139 82 142";
  const L = [
    ["oesophagus", "#E3A28E", (f, on) => tube("M80 33 C80 44 80 54 85 62", f, 3.6, on, "#B9735F")],
    ["liver", "url(#P_lv)", (f, on) => `<path d="M42 66 C50 57 76 56 92 60 C92 66 84 72 72 78 C60 84 48 84 42 76Z" fill="${f}"${st(on)}/><path d="M74 59 C70 66 66 72 60 80" stroke="#5E2018" stroke-opacity=".35" fill="none"/>`],
    ["gallbladder", "#7EA34C", (f, on) => `<ellipse cx="68" cy="83" rx="3" ry="5" transform="rotate(-28 68 83)" fill="${f}"${st(on)}/>`],
    ["pancreas", "#F0C27A", (f, on) => `<path d="M77 100 C80 96 90 98 102 95 C110 93 115 94 113 98 C106 101 94 103 82 105 C78 105 75.5 103 77 100Z" fill="${f}"${st(on)}/>`],
    ["stomach", "url(#P_sm)", (f, on) => `<path d="M86 60 C96 56 114 60 117 72 C120 86 110 94 98 94 C90 94 84 90 82 86 C88 86 96 84 99 78 C101 72 94 66 86 64Z" fill="${f}"${st(on)}/><path d="M92 70 Q104 70 110 80" stroke="#fff" stroke-opacity=".4" fill="none" stroke-width="1.2"/>`],
    ["duodenum", "#E7A487", (f, on) => tube("M82 87 C72 88 68 94 70 100 C72 107 82 108 91 105", f, 4.2, on, "#B9735F")],
    ["colon", "#CB8C70", (f, on) => tube(COLON, f, 7, on, "#9A5F48") + (on ? "" : `<path d="${COLON}" stroke="#E2AC92" stroke-width="3" stroke-dasharray="2.5 3" fill="none"/>`)],
    ["jejunum", "#F1B3A4", (f, on) => tube("M91 105 C98 108 104 112 101 117 C97 122 89 115 85 119 C81 124 93 125 99 123 C105 121 106 131 99 131 C95 131 92 130 88 131", f, 4, on, "#C98576")],
    ["ileum", "#E79A8D", (f, on) => tube("M88 131 C82 131 77 125 71 123 C64 120 59 120 60 125 C61 130 72 128 74 133 C76 137 66 139 61 136 C58 134 56 136 54 137", f, 4, on, "#B9705F")],
    ["rectum", "#B8735C", (f, on) => tube("M82 142 C80 145 80 147 80 150 V154", f, 5, on, "#8A4F3C") + `<circle cx="80" cy="156" r="1.3" fill="${on ? f : "#6E3B2C"}"/>`],
    ["mouth", "#C9575F", (f, on) => `<ellipse cx="80" cy="30" rx="5.5" ry="2.4" fill="${f}"${st(on)}/><path d="M75 30 H85" stroke="#7A2A33" stroke-width=".7"/>`],
    ["salivary", "#D9A86C", (f, on) => `<ellipse cx="66.6" cy="25" rx="2" ry="4" fill="${f}"${st(on)}/><ellipse cx="93.4" cy="25" rx="2" ry="4" fill="${f}"${st(on)}/><ellipse cx="71" cy="34" rx="3" ry="1.6" fill="${f}"${st(on)}/><ellipse cx="89" cy="34" rx="3" ry="1.6" fill="${f}"${st(on)}/><path d="M68 27 Q72 29.5 75 30 M92 27 Q88 29.5 85 30" stroke="${f}" stroke-width=".7" fill="none"/>`]
  ];
  B.DIAGRAMS.digestive = item => {
    const P = D.uid(), sp = D.spots(item), any = sp.length > 0;
    let lo = "", hi = "";
    L.forEach(([id, base, fn]) => {
      if (sp.indexOf(id) >= 0) hi += `<g class="dg-hl" filter="url(#${P}gl)">${fn(D.HL, true)}${(RING[id] || []).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${D.HL}" stroke-width="1.5"/>`).join("")}</g>`;
      else lo += fn(base.replace("P_", P), false);
    });
    const g = (n, a, b) => `<linearGradient id="${P}${n}" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
    const defs = `<defs>${g("sk", "#F8DFCF", "#E9BC9F")}${g("lv", "#A8473A", "#71291F")}${g("sm", "#F2AE86", "#D97C55")}
      <filter id="${P}gl" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="${D.HL}" flood-opacity=".95"/></filter></defs>`;
    const skin = `<path d="${SK}" fill="url(#${P}sk)" stroke="#D9A88C" stroke-width=".6"/><path d="M38 58 C60 54 100 54 122 58 L126 150 L34 150Z" fill="#EDC3AA" opacity=".5"/>
      <ellipse cx="74" cy="17" rx="1.6" ry="1.1" fill="#5A4636"/><ellipse cx="86" cy="17" rx="1.6" ry="1.1" fill="#5A4636"/><path d="M80 19 V24 L78.5 25" stroke="#C99680" stroke-width=".8" fill="none"/>`;
    const head = sp[0] === "mouth" || sp[0] === "salivary";
    const label = any ? D.tag(80, head ? 150 : 10, LBL[sp[0]] || "") : "";
    return D.frame(defs + skin + lo + (any ? `<rect width="160" height="160" rx="18" fill="#EEF3F6" opacity=".55"/>` : "") + hi + label,
      item ? (item.name + " in the digestive system") : "The digestive system, mouth to rectum");
  };
})();
