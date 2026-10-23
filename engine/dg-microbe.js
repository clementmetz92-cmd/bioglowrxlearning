/* BioglowRX diagram "microbe" — where each drug class strikes: a rod bacterium in cross-section
   (cell wall, membrane, ribosomes, DNA, folate enzyme), a budding yeast cell (ergosterol membrane)
   and an enveloped virus (surface spikes, genome).
   spot ids: wall, ribosome, dna, folate, ergosterol, na (neuraminidase spikes), vdna (viral DNA) */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const NAMES = { wall: "Cell wall", ribosome: "Ribosomes", dna: "Bacterial DNA", folate: "Folate making",
    ergosterol: "Ergosterol", na: "Neuraminidase", vdna: "Viral DNA" };
  const TAGPOS = { wall: [80, 84], ribosome: [80, 84], dna: [80, 84], folate: [80, 84], ergosterol: [44, 151], na: [116, 151], vdna: [116, 151] };

  BGX.DIAGRAMS.microbe = item => {
    const p = dg.uid(), F = (id, c) => dg.fill(item, id, c), C = id => dg.cls(item, id), on = id => dg.is(item, id);
    const rod = "M44 10 H116 Q148 10 148 42 Q148 74 116 74 H44 Q12 74 12 42 Q12 10 44 10Z";
    const rodIn = "M45 17 H115 Q141 17 141 42 Q141 67 115 67 H45 Q19 67 19 42 Q19 17 45 17Z";
    let o = `<defs>
      <radialGradient id="${p}cy" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#eaf6ee"/><stop offset="1" stop-color="#b9dcc6"/></radialGradient>
      <radialGradient id="${p}ye" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fff6de"/><stop offset="1" stop-color="#e9cf95"/></radialGradient>
      <radialGradient id="${p}vi" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#efe6ff"/><stop offset="1" stop-color="#b9a4e6"/></radialGradient>
      <pattern id="${p}h" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V4" stroke="#fff" stroke-width="1" opacity=".45"/></pattern></defs>`;
    /* bacterium */
    o += `<path d="M148 42 Q154 30 150 20 Q146 10 154 4" fill="none" stroke="#8a7a5a" stroke-width="1.4"/>`;
    o += `<path d="${rod}" fill="${F("wall", "#c98f45")}"${C("wall")}/><path d="${rod}" fill="url(#${p}h)"/>`;
    o += `<path d="${rodIn}" fill="url(#${p}cy)" stroke="#e4b44c" stroke-width="2.2"/>`;
    // folate enzyme (bottom-left): enzyme blob turning PABA into folate
    o += `<g${C("folate")} transform="translate(-12 -15) scale(1.3)"><path d="M30 52 Q30 44 38 44 Q46 44 46 50 L40 52 L46 55 Q46 61 38 61 Q30 61 30 52Z" fill="${F("folate", "#e3a43a")}"/>
      <circle cx="51" cy="52" r="2.6" fill="${F("folate", "#f2c21b")}"/><circle cx="57" cy="56" r="2.2" fill="${F("folate", "#f2c21b")}"/></g>`;
    // DNA (nucleoid): tangled loop
    o += `<path d="M58 38 Q62 24 76 28 Q90 32 88 42 Q86 52 74 48 Q64 44 70 36 Q78 28 92 34 Q104 40 98 50 Q92 58 80 54 Q66 50 62 46 Q56 42 58 38Z" fill="none" stroke="${F("dna", "#7b4fc4")}" stroke-width="${on("dna") ? 3.4 : 2}" stroke-linejoin="round"${C("dna")}/>`;
    // ribosomes
    const rib = [[110, 28], [122, 36], [114, 46], [128, 50], [106, 58], [120, 60], [40, 30], [34, 38], [100, 24], [132, 40]];
    o += `<g${C("ribosome")}>` + rib.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${on("ribosome") ? 3.4 : 2.3}" fill="${F("ribosome", "#3a4a8a")}"/>`).join("") + `</g>`;
    /* yeast (fungus) cell with a bud */
    const ye = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#b98a4a"/><ellipse cx="${cx}" cy="${cy}" rx="${rx - 3}" ry="${ry - 3}" fill="url(#${p}ye)" stroke="${F("ergosterol", "#d07a2a")}" stroke-width="${on("ergosterol") ? 3.4 : 1.8}"${C("ergosterol")}/>`;
    o += ye(64, 98, 10, 8) + ye(40, 118, 24, 21);
    o += `<circle cx="36" cy="116" r="7" fill="#c9a3e8" stroke="#8a5ac0"/><circle cx="36" cy="116" r="2.2" fill="#8a5ac0"/><ellipse cx="50" cy="126" rx="5" ry="3" fill="#e9b97a"/>`;
    /* virus: envelope, spikes (haemagglutinin rods + neuraminidase mushrooms), genome */
    const vx = 116, vy = 116, vr = 17;
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), x1 = vx + c * vr, y1 = vy + s * vr, x2 = vx + c * (vr + 7), y2 = vy + s * (vr + 7);
      if (i % 2) o += `<g${C("na")}><path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${F("na", "#8a6ac8")}" stroke-width="1.6"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="${on("na") ? 3.6 : 2.6}" fill="${F("na", "#8a6ac8")}"/></g>`;
      else o += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#4fa36a" stroke-width="3" stroke-linecap="round"/>`;
    }
    o += `<circle cx="${vx}" cy="${vy}" r="${vr}" fill="url(#${p}vi)" stroke="#7a5ab8" stroke-width="2"/>`;
    o += `<path d="M106 112 Q110 104 116 110 Q122 116 126 108 M106 122 Q112 128 116 120 Q120 112 126 124" fill="none" stroke="${F("vdna", "#2f62b8")}" stroke-width="${on("vdna") ? 3.4 : 2}" stroke-linecap="round"${C("vdna")}/>`;
    if (!item) o += `<g font-family="Chivo, sans-serif" font-size="8" font-weight="800" fill="#1B2430" text-anchor="middle"><text x="80" y="88">bacterium</text><text x="40" y="152">fungus</text><text x="116" y="152">virus</text></g>`;
    const s = dg.spots(item)[0];
    if (s && NAMES[s]) { const w = Math.max(28, NAMES[s].length * 5.6 + 12); o += dg.tag(Math.max(w / 2 + 6, Math.min(154 - w / 2, TAGPOS[s][0])), TAGPOS[s][1], NAMES[s]); }
    return dg.frame(o, item ? `Drug target: ${NAMES[s] || ""}` : "A bacterium, a fungus cell and a virus");
  };
})();
