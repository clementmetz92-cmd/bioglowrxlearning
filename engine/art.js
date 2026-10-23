/* BioglowRX — hero illustrations for subject and lab tiles on the hub.
   BGX.ART[key]() returns a 160×160 svg string with a transparent background (made to sit on a coloured tile).
   keys: chemistry, anatomy, pharmacology, nutrition, wellness, titration-lab, microscope-lab, syringe-prep, food-test-lab, pulse-lab */
(function () {
  "use strict";
  const BGX = window.BGX = window.BGX || {};
  let n = 0;
  const st = s => s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`).join("");
  const lg = (id, dir, s) => `<linearGradient id="${id}" ${dir === "h" ? 'x2="1" y2="0"' : dir === "d" ? 'x2="1" y2="1"' : 'x2="0" y2="1"'}>${st(s)}</linearGradient>`;
  const rg = (id, s, cx = .38, cy = .32, r = .75) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(s)}</radialGradient>`;
  const GLASS = [[0, "#fff", .7], [.18, "#fff", .15], [.75, "#fff", .05], [1, "#fff", .45]];
  const METAL = [[0, "#6b737d"], [.3, "#e9edf1"], [.55, "#9aa3ad"], [.8, "#dfe4e9"], [1, "#5f6770"]];
  const svg = (inner, label) => `<svg viewBox="0 0 160 160" class="spec art" role="img" aria-label="${label}">${inner}</svg>`;
  const halo = p => `${rg(p + "halo", [[0, "#fff", .55], [1, "#fff", 0]], .5, .5, .5)}<circle cx="80" cy="80" r="76" fill="url(#${p}halo)"/>`;
  const shadow = (p, cx, cy, rx) => `<filter id="${p}sb" x="-30%" y="-200%" width="160%" height="500%"><feGaussianBlur stdDeviation="3"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="5" fill="#1b2430" opacity=".22" filter="url(#${p}sb)"/>`;
  const bubbles = pts => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".75"/>`).join("");

  const A = {};

  A.chemistry = () => {
    const p = "ar" + (++n) + "_";
    return svg(`<defs>${lg(p + "g", "h", GLASS)}${lg(p + "t", "v", [[0, "#5fe0c8"], [1, "#0e8a78"]])}${lg(p + "m", "v", [[0, "#ff8ac0"], [1, "#c2186a"]])}${lg(p + "y", "v", [[0, "#ffe26a"], [1, "#e09a00"]])}</defs>${halo(p)}
      ${shadow(p, 80, 142, 62)}
      <g transform="translate(-4 0)"><path d="M88 28 H104 M90 28 V64 L64 128 Q60 140 72 140 H120 Q132 140 128 128 L102 64 V28" fill="#eef6fa" fill-opacity=".35" stroke="#7a95aa" stroke-width="2"/>
      <path d="M77 98 H115 L128 128 Q132 140 120 140 H72 Q60 140 64 128Z" fill="url(#${p}t)"/><ellipse cx="96" cy="98" rx="19" ry="2.5" fill="#9ff3e2"/>
      ${bubbles([[90, 120, 3], [102, 112, 2.2], [96, 130, 2], [108, 126, 1.6]])}
      <path d="M90 28 V64 L64 128 Q60 140 72 140 H120 Q132 140 128 128 L102 64 V28Z" fill="url(#${p}g)"/><path d="M85 26 H107" stroke="#7a95aa" stroke-width="4" stroke-linecap="round"/></g>
      <g transform="translate(-14 -18)"><path d="M30 58 V100 Q30 110 40 110 Q50 110 50 100 V58" fill="#eef6fa" fill-opacity=".35" stroke="#7a95aa" stroke-width="2"/><path d="M31 80 V100 Q31 109 40 109 Q49 109 49 100 V80Z" fill="url(#${p}y)"/><ellipse cx="40" cy="80" rx="9" ry="1.6" fill="#fff3a6"/><path d="M27 58 H53" stroke="#7a95aa" stroke-width="3.5" stroke-linecap="round"/><path d="M34 62 V100" stroke="#fff" stroke-width="2.5" opacity=".6" stroke-linecap="round"/>${bubbles([[42, 98, 1.8], [38, 90, 1.3]])}</g>
      <g transform="translate(-2 4)"><circle cx="46" cy="124" r="18" fill="#eef6fa" fill-opacity=".35" stroke="#7a95aa" stroke-width="2"/><path d="M28.5 126 A18 18 0 0 0 63.5 126Z" fill="url(#${p}m)"/><path d="M40 106 V90 M52 106 V90" stroke="#7a95aa" stroke-width="2"/><path d="M37 90 H55" stroke="#7a95aa" stroke-width="3.5" stroke-linecap="round"/><path d="M34 116 Q38 108 46 108" stroke="#fff" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>${bubbles([[44, 132, 2], [52, 128, 1.5]])}</g>
      <circle cx="112" cy="22" r="4" fill="#5fe0c8" opacity=".8"/><circle cx="120" cy="12" r="2.6" fill="#5fe0c8" opacity=".6"/><circle cx="104" cy="12" r="2" fill="#5fe0c8" opacity=".5"/>`, "Chemistry glassware with coloured liquids");
  };

  A.anatomy = () => {
    const p = "ar" + (++n) + "_";
    return svg(`<defs>${lg(p + "b", "v", [[0, "#fff8f2"], [1, "#f6dccb"]])}${rg(p + "h", [[0, "#ff8a8a"], [.55, "#d8263a"], [1, "#7a0c1a"]], .38, .3, .8)}${lg(p + "l", "v", [[0, "#ffc0c8"], [1, "#e88a98"]])}</defs>${halo(p)}
      <path d="M80 10 Q96 10 98 28 Q99 42 90 50 V56 Q118 60 132 74 Q140 84 142 104 L146 160 H14 L18 104 Q20 84 28 74 Q42 60 70 56 V50 Q61 42 62 28 Q64 10 80 10Z" fill="url(#${p}b)" stroke="#e2b9a0" stroke-width="1.5"/>
      <path d="M58 82 Q48 84 44 104 Q42 128 52 136 Q64 140 72 128 L74 92 Q70 82 58 82Z" fill="url(#${p}l)" opacity=".75"/>
      <path d="M102 82 Q112 84 116 104 Q118 128 108 136 Q96 140 88 128 L86 92 Q90 82 102 82Z" fill="url(#${p}l)" opacity=".75"/>
      <path d="M80 60 V84 M80 84 Q72 88 68 96 M80 84 Q88 88 92 96" stroke="#c9a090" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g transform="translate(86 108) rotate(-14)"><path d="M0 26 Q-28 6 -24-10 Q-20-24 -6-20 Q0-18 2-12 Q6-22 16-20 Q28-16 24 0 Q20 14 0 26Z" fill="url(#${p}h)"/>
      <path d="M-4-20 Q-6-30 0-34 M6-18 Q8-30 16-30" stroke="#b8323e" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M8-19 Q10-28 22-28" stroke="#3b6fd8" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M-16-10 Q-14-16 -8-16" stroke="#fff" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/><path d="M2-10 Q4 6 -2 18" stroke="#9a1424" stroke-width="1.5" fill="none" opacity=".6"/></g>`, "A stylised body with heart and lungs");
  };

  A.pharmacology = () => {
    const p = "ar" + (++n) + "_";
    let cells = "";
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      const x = 32 + c * 22, y = 46 + r * 26, empty = r === 1 && c === 3;
      cells += `<ellipse cx="${x}" cy="${y}" rx="9" ry="10" fill="url(#${p}bub)" stroke="#9aa6b2" stroke-width=".8"/>${empty ? `<path d="M${x - 6} ${y - 4} L${x + 5} ${y + 6} M${x + 4} ${y - 6} L${x - 4} ${y + 5}" stroke="#8a96a2" stroke-width="1.2"/>` : `<ellipse cx="${x}" cy="${y}" rx="6.5" ry="7.5" fill="url(#${p}pl)"/><path d="M${x - 5} ${y} H${x + 5}" stroke="#c9b0e8" stroke-width=".9"/>`}`;
    }
    return svg(`<defs>${lg(p + "foil", "d", [[0, "#f4f6f8"], [.45, "#b9c2cc"], [.6, "#eef1f4"], [1, "#9aa6b2"]])}${rg(p + "bub", [[0, "#fff", .95], [1, "#dfe6ee", .7]])}${rg(p + "pl", [[0, "#ffffff"], [1, "#b9a0e6"]])}${lg(p + "c1", "v", [[0, "#ff8a80"], [1, "#c62828"]])}${lg(p + "c2", "v", [[0, "#ffffff"], [1, "#d9dde2"]])}${lg(p + "c3", "v", [[0, "#7ec0ff"], [1, "#1f6fd0"]])}${lg(p + "c4", "v", [[0, "#ffe27a"], [1, "#f2a900"]])}${rg(p + "tb", [[0, "#ffffff"], [.8, "#eef1f4"], [1, "#b9c2cc"]])}</defs>${halo(p)}
      ${shadow(p, 80, 146, 60)}
      <g transform="rotate(-12 80 60)"><rect x="18" y="30" width="110" height="58" rx="7" fill="url(#${p}foil)" stroke="#8a96a2"/>${cells}<path d="M18 59 H128" stroke="#8a96a2" stroke-dasharray="3 2" opacity=".6"/></g>
      <g transform="translate(50 118) rotate(28)"><rect x="-22" y="-9" width="22" height="18" fill="url(#${p}c1)"/><rect x="0" y="-9" width="22" height="18" fill="url(#${p}c2)"/><circle cx="-22" cy="0" r="9" fill="url(#${p}c1)"/><circle cx="22" cy="0" r="9" fill="url(#${p}c2)"/><path d="M-26-4 H24" stroke="#fff" stroke-width="2.5" opacity=".6" stroke-linecap="round"/></g>
      <g transform="translate(110 112) rotate(-35)"><rect x="-18" y="-8" width="18" height="16" fill="url(#${p}c3)"/><rect x="0" y="-8" width="18" height="16" fill="url(#${p}c4)"/><circle cx="-18" cy="0" r="8" fill="url(#${p}c3)"/><circle cx="18" cy="0" r="8" fill="url(#${p}c4)"/><path d="M-22-3.5 H20" stroke="#fff" stroke-width="2.2" opacity=".6" stroke-linecap="round"/></g>
      <g><ellipse cx="88" cy="140" rx="14" ry="5" fill="#b9c2cc"/><ellipse cx="88" cy="136" rx="14" ry="5.5" fill="url(#${p}tb)"/><path d="M78 136 H98" stroke="#b9c2cc" stroke-width="1.2"/></g>
      <g><ellipse cx="136" cy="142" rx="10" ry="4" fill="#b9c2cc"/><ellipse cx="136" cy="139" rx="10" ry="4.5" fill="url(#${p}tb)"/></g>`, "Pills, capsules and a blister pack");
  };

  A.nutrition = () => {
    const p = "ar" + (++n) + "_";
    const leaf = (x, y, r, c) => `<path d="M0 0 Q8-12 20-6 Q12 6 0 0Z" transform="translate(${x} ${y}) rotate(${r})" fill="${c}"/>`;
    return svg(`<defs>${rg(p + "pl", [[0, "#ffffff"], [.8, "#f4f6f8"], [.92, "#dbe2e8"], [1, "#b9c4ce"]], .5, .45, .55)}${lg(p + "sa", "d", [[0, "#ff9a7a"], [1, "#e0583a"]])}${rg(p + "to", [[0, "#ff8a7a"], [.7, "#e0261c"], [1, "#9a0f0a"]])}${lg(p + "eg", "v", [[0, "#ffe27a"], [1, "#f29d0c"]])}${lg(p + "br", "v", [[0, "#d99a5a"], [1, "#8a5224"]])}</defs>${halo(p)}
      ${shadow(p, 80, 146, 64)}
      <ellipse cx="80" cy="88" rx="70" ry="56" fill="url(#${p}pl)"/><ellipse cx="80" cy="88" rx="54" ry="42" fill="none" stroke="#dbe2e8" stroke-width="1.6"/>
      ${leaf(40, 78, -10, "#4f9a3a")}${leaf(44, 92, 20, "#6fbf4a")}${leaf(52, 70, -50, "#3e8a2e")}${leaf(36, 96, -30, "#8fd06a")}${leaf(56, 100, 40, "#4f9a3a")}
      <circle cx="60" cy="84" r="9" fill="url(#${p}to)"/><path d="M57 77 l3 2 l3-2" stroke="#3e8a2e" stroke-width="1.6" fill="none"/><circle cx="57" cy="81" r="2" fill="#fff" opacity=".6"/>
      <circle cx="46" cy="106" r="6.5" fill="url(#${p}to)"/>
      <g transform="translate(102 70) rotate(-12)"><path d="M-24 0 Q-22-12 0-12 Q22-12 24 0 Q22 12 0 12 Q-22 12 -24 0Z" fill="url(#${p}sa)"/><path d="M-14-9 Q-10 0 -14 9 M-4-11 Q0 0 -4 11 M6-11 Q10 0 6 11 M16-8 Q19 0 16 8" stroke="#ffd0bf" stroke-width="1.8" fill="none"/><path d="M-20 4 Q0 10 20 4" stroke="#fff" stroke-width="1.2" opacity=".4" fill="none"/></g>
      <g transform="translate(104 108)"><ellipse rx="20" ry="12" fill="#fff8dc"/><path d="M-20 0 Q-16-6 -8-8 Q4-10 14-6 Q20-2 20 2 Q12 8 0 10 Q-14 10 -20 0Z" fill="#fbe7a6"/>${[[-10, 0], [-2, -4], [6, 2], [12, -2], [-4, 5], [4, 6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#f2d070"/>`).join("")}</g>
      <g transform="translate(74 118)"><ellipse rx="10" ry="8" fill="#fff"/><circle r="4.8" fill="url(#${p}eg)"/></g>
      <g transform="translate(62 40) rotate(8)"><path d="M-14 8 V-2 Q-14-10 0-10 Q14-10 14-2 V8Z" fill="url(#${p}br)"/><path d="M-11 6 V-1 Q-11-7 0-7 Q11-7 11-1 V6Z" fill="#f6dfb0"/></g>`, "A plate of healthy food");
  };

  A.wellness = () => {
    const p = "ar" + (++n) + "_";
    return svg(`<defs>${lg(p + "s", "d", [[0, "#2bd4b0"], [1, "#0e7a6a"]])}${rg(p + "h", [[0, "#ff9aa8"], [.6, "#ff3d7f"], [1, "#b3124a"]])}<filter id="${p}gl" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter></defs>${halo(p)}
      <path d="M8 118 H44 L52 100 L60 136 L70 84 L78 118 H152" stroke="#ff3d7f" stroke-width="6" fill="none" opacity=".4" filter="url(#${p}gl)" stroke-linejoin="round"/>
      <path d="M8 118 H44 L52 100 L60 136 L70 84 L78 118 H152" stroke="#ff3d7f" stroke-width="3.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      ${shadow(p, 86, 146, 30)}
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M84 62 L66 78 L52 72" stroke="#c98a62" stroke-width="8"/><path d="M84 62 L104 72 L116 60" stroke="#c98a62" stroke-width="8"/>
        <path d="M80 92 L98 110 L94 136" stroke="#1b2430" stroke-width="10"/><path d="M80 92 L64 112 L46 112" stroke="#2a3644" stroke-width="10"/>
        <path d="M88 54 L80 92" stroke="url(#${p}s)" stroke-width="17"/>
        <path d="M94 136 L104 137" stroke="#ff3d7f" stroke-width="8"/><path d="M46 112 L40 104" stroke="#ff3d7f" stroke-width="8"/>
      </g>
      <circle cx="92" cy="38" r="11" fill="#c98a62"/><path d="M81 36 Q82 25 93 26 Q103 27 103 35 Q96 31 81 36Z" fill="#2a1a10"/>
      <g transform="translate(130 34)"><path d="M0 14 Q-18 2 -15-8 Q-12-16 -4-14 Q0-12 0-8 Q0-12 4-14 Q12-16 15-8 Q18 2 0 14Z" fill="url(#${p}h)"/><path d="M-10-7 Q-8-11 -4-11" stroke="#fff" stroke-width="2" opacity=".7" fill="none" stroke-linecap="round"/></g>
      <path d="M22 60 H44 M16 72 H40 M26 84 H44" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`, "A runner with a heart-rate line");
  };

  A["titration-lab"] = () => {
    const p = "ar" + (++n) + "_";
    let ticks = ""; for (let i = 0; i < 9; i++) ticks += `<path d="M76 ${22 + i * 8} h${i % 2 ? 4 : 7}" stroke="#4a5a6a" stroke-width=".9"/>`;
    return svg(`<defs>${lg(p + "g", "h", GLASS)}${lg(p + "m", "h", METAL)}${lg(p + "b", "v", [[0, "#9fd0ff"], [1, "#3d8fd1"]])}${lg(p + "k", "v", [[0, "#ffb3d6"], [1, "#e0408a"]])}${lg(p + "w", "v", [[0, "#3a3f47"], [1, "#15181d"]])}</defs>${halo(p)}
      ${shadow(p, 80, 148, 64)}
      <rect x="16" y="138" width="128" height="10" rx="3" fill="url(#${p}w)"/><rect x="28" y="8" width="5" height="132" rx="2" fill="url(#${p}m)"/>
      <path d="M31 50 H74" stroke="url(#${p}m)" stroke-width="5"/><rect x="68" y="44" width="16" height="12" rx="3" fill="#2a3644"/>
      <rect x="73" y="10" width="14" height="80" rx="3" fill="#eef6fa" fill-opacity=".4" stroke="#7a95aa" stroke-width="1.5"/>
      <rect x="74.5" y="40" width="11" height="49" fill="url(#${p}b)"/><ellipse cx="80" cy="40" rx="5.5" ry="1.4" fill="#d6ecff"/>${ticks}
      <rect x="73" y="10" width="14" height="80" rx="3" fill="url(#${p}g)"/>
      <path d="M77 90 V98 L79 106 H81 L83 98 V90Z" fill="#cfe2ee" stroke="#7a95aa"/><rect x="70" y="93" width="20" height="4" rx="2" fill="#2a3644"/>
      <path d="M80 108 q-2.4 4 0 5.5 q2.4-1.5 0-5.5Z" fill="#3d8fd1"/>
      <path d="M72 116 V122 L50 136 Q46 140 52 140 H108 Q114 140 110 136 L88 122 V116" fill="#eef6fa" fill-opacity=".35" stroke="#7a95aa" stroke-width="1.8"/>
      <path d="M62 128 H98 L110 136 Q114 140 108 140 H52 Q46 140 50 136Z" fill="url(#${p}k)"/><ellipse cx="80" cy="128" rx="18" ry="1.6" fill="#ffd6ea"/>
      <path d="M72 116 V122 L50 136 Q46 140 52 140 H108 Q114 140 110 136 L88 122 V116Z" fill="url(#${p}g)"/><path d="M69 116 H91" stroke="#7a95aa" stroke-width="3" stroke-linecap="round"/>`, "A burette over a conical flask");
  };

  A["microscope-lab"] = () => {
    const p = "ar" + (++n) + "_";
    return svg(`<defs>${lg(p + "a", "h", [[0, "#e9edf1"], [.5, "#ffffff"], [1, "#b9c2cc"]])}${lg(p + "d", "h", [[0, "#1b2430"], [.4, "#4a5668"], [1, "#11161d"]])}${lg(p + "m", "h", METAL)}${rg(p + "l", [[0, "#fffbe0"], [1, "#ffd23f", 0]], .5, .5, .5)}</defs>${halo(p)}
      ${shadow(p, 84, 148, 52)}
      <path d="M40 140 Q40 128 56 128 H118 Q130 128 130 140 V146 H40Z" fill="url(#${p}d)"/>
      <path d="M100 128 Q112 108 108 80 Q104 56 86 44" stroke="url(#${p}a)" stroke-width="16" fill="none" stroke-linecap="round"/>
      <circle cx="104" cy="98" r="9" fill="url(#${p}m)" stroke="#5f6770"/><circle cx="104" cy="98" r="3" fill="#5f6770"/>
      <rect x="46" y="98" width="62" height="7" rx="2" fill="url(#${p}d)"/><rect x="58" y="94" width="32" height="4" rx="1" fill="#dff1ff" stroke="#9fb3c4" stroke-width=".8"/><circle cx="74" cy="96" r="2.4" fill="#e05a8a" opacity=".8"/>
      <circle cx="74" cy="118" r="10" fill="url(#${p}l)"/><circle cx="74" cy="118" r="4" fill="#fff6c2" stroke="#b9c2cc"/>
      <g transform="rotate(-28 74 56)"><rect x="64" y="20" width="20" height="58" rx="4" fill="url(#${p}a)" stroke="#9aa6b2"/><rect x="66" y="6" width="16" height="16" rx="3" fill="url(#${p}d)"/><rect x="62" y="40" width="24" height="5" fill="#2b7de0"/></g>
      <rect x="62" y="74" width="24" height="10" rx="3" fill="url(#${p}d)"/><rect x="66" y="84" width="6" height="9" fill="url(#${p}m)"/><rect x="76" y="84" width="6" height="7" fill="url(#${p}m)"/>`, "A light microscope");
  };

  A["syringe-prep"] = () => {
    const p = "ar" + (++n) + "_";
    let tk = ""; for (let i = 0; i < 7; i++) tk += `<path d="M${30 + i * 8} 104 v${i % 2 ? -4 : -7}" stroke="#4a5a6a" stroke-width=".9"/>`;
    return svg(`<defs>${lg(p + "g", "v", GLASS)}${lg(p + "v", "h", GLASS)}${lg(p + "l", "v", [[0, "#9ad4f5"], [1, "#3d8fd1"]])}${lg(p + "lh", "h", [[0, "#9ad4f5"], [1, "#3d8fd1"]])}${lg(p + "m", "h", METAL)}${lg(p + "cap", "h", [[0, "#8a1424"], [.4, "#e0405a"], [1, "#7a0c1a"]])}</defs>${halo(p)}
      <g transform="rotate(-38 80 80)">
        <rect x="104" y="98" width="6" height="12" fill="url(#${p}m)"/><rect x="108" y="96" width="6" height="16" rx="1.5" fill="url(#${p}cap)"/>
        <rect x="114" y="86" width="36" height="36" rx="5" fill="#eef6fa" fill-opacity=".45" stroke="#7a95aa" stroke-width="1.6"/><rect x="115.5" y="87.5" width="18" height="33" rx="4" fill="url(#${p}lh)"/>
        <rect x="136" y="92" width="11" height="24" fill="#fff" opacity=".92"/><path d="M139 96 v16 M143 96 v11" stroke="#8a96a2" stroke-width="1.2"/><rect x="114" y="86" width="36" height="36" rx="5" fill="url(#${p}v)"/>
        <path d="M94 104 H124" stroke="url(#${p}m)" stroke-width="1.6"/>
        <rect x="24" y="96" width="62" height="16" rx="3" fill="#eef6fa" fill-opacity=".45" stroke="#7a95aa" stroke-width="1.5"/>
        <rect x="58" y="97.5" width="27" height="13" fill="url(#${p}l)"/>${tk}
        <rect x="52" y="96" width="6" height="16" fill="#2a3644"/><path d="M10 104 H52" stroke="#c9d1d8" stroke-width="6"/><rect x="4" y="94" width="6" height="20" rx="2" fill="#c9d1d8" stroke="#9aa6b2"/>
        <rect x="20" y="90" width="5" height="28" rx="2" fill="#dfe5ea" stroke="#9aa6b2"/>
        <rect x="24" y="96" width="62" height="16" rx="3" fill="url(#${p}g)"/>
        <path d="M86 100 H94 V108 H86Z" fill="#dfe5ea" stroke="#9aa6b2" stroke-width=".6"/>
      </g>
      <path d="M24 30 l4 4 M30 22 l5 2 M18 40 l5 1" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>`, "A syringe drawing liquid from a vial");
  };

  A["food-test-lab"] = () => {
    const p = "ar" + (++n) + "_";
    const tube = (x, top, c1, c2, tag) => `${lg(p + tag, "v", [[0, c1], [1, c2]])}<path d="M${x - 8} 24 V104 Q${x - 8} 114 ${x} 114 Q${x + 8} 114 ${x + 8} 104 V24" fill="#eef6fa" fill-opacity=".4" stroke="#7a95aa" stroke-width="1.5"/><path d="M${x - 7} ${top} V104 Q${x - 7} 113 ${x} 113 Q${x + 7} 113 ${x + 7} 104 V${top}Z" fill="url(#${p}${tag})"/><ellipse cx="${x}" cy="${top}" rx="7" ry="1.3" fill="${BGX.shade ? BGX.shade(c1, .35) : c1}"/><path d="M${x - 8} 24 V104 Q${x - 8} 114 ${x} 114 Q${x + 8} 114 ${x + 8} 104 V24Z" fill="url(#${p}g)"/><path d="M${x - 10} 24 H${x + 10}" stroke="#7a95aa" stroke-width="2.6" stroke-linecap="round"/>`;
    return svg(`<defs>${lg(p + "g", "h", GLASS)}${lg(p + "r", "v", [[0, "#d9a066"], [1, "#9a6234"]])}${lg(p + "br", "v", [[0, "#e8b878"], [1, "#a8743e"]])}${rg(p + "ap", [[0, "#ff8a7a"], [.7, "#d8261c"], [1, "#8a0f0a"]])}</defs>${halo(p)}
      ${shadow(p, 80, 148, 64)}
      ${tube(38, 70, "#4a8fe0", "#1f5fb0", "t1")}${tube(64, 64, "#e0662a", "#a8320f", "t2")}${tube(90, 72, "#2a1f4a", "#0e0a1f", "t3")}${tube(116, 66, "#a86ad8", "#6a2fa8", "t4")}
      <rect x="20" y="78" width="116" height="9" rx="2" fill="url(#${p}r)"/><rect x="20" y="114" width="116" height="9" rx="2" fill="url(#${p}r)"/><rect x="22" y="87" width="5" height="40" fill="#8a5224"/><rect x="129" y="87" width="5" height="40" fill="#8a5224"/>
      <g transform="translate(40 136)"><path d="M-20 6 V-6 Q-20-14 -10-14 Q-6-20 0-14 Q6-20 10-14 Q20-14 20-6 V6Z" fill="url(#${p}br)"/><path d="M-16 4 V-5 Q-16-10 -9-10 Q-5-15 0-10 Q5-15 9-10 Q16-10 16-5 V4Z" fill="#f6e2b8"/></g>
      <g transform="translate(120 134)"><circle r="12" fill="url(#${p}ap)"/><path d="M0-12 Q1-18 4-20" stroke="#5a3a1a" stroke-width="2" fill="none"/><path d="M2-15 Q8-20 12-16 Q8-12 2-15Z" fill="#4f9a3a"/><circle cx="-4" cy="-4" r="2.5" fill="#fff" opacity=".6"/></g>
      <g transform="translate(80 138)"><path d="M-10 6 Q-12-6 -4-8 Q4-10 10-4 Q14 4 6 8 Q-4 10 -10 6Z" fill="#fff8e8" stroke="#e2d4b4"/><path d="M-6 0 Q0-4 6 0" stroke="#e8c98a" stroke-width="1.4" fill="none"/></g>
      <path d="M140 40 q-3 5 0 7 q3-2 0-7Z" fill="#2a1f4a"/><rect x="134" y="14" width="12" height="22" rx="3" fill="#7a3a10"/><rect x="136" y="8" width="8" height="7" rx="2" fill="#1b2430"/>`, "Test tubes with food samples and reagents");
  };

  A["pulse-lab"] = () => {
    const p = "ar" + (++n) + "_";
    let tk = ""; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; tk += `<path d="M${(116 + Math.cos(a) * 21).toFixed(1)} ${(56 + Math.sin(a) * 21).toFixed(1)} L${(116 + Math.cos(a) * (i % 3 ? 18.5 : 16.5)).toFixed(1)} ${(56 + Math.sin(a) * (i % 3 ? 18.5 : 16.5)).toFixed(1)}" stroke="#4a5a6a" stroke-width="${i % 3 ? 1 : 1.8}"/>`; }
    return svg(`<defs>${lg(p + "sk", "v", [[0, "#f6c9a4"], [1, "#d89a70"]])}${lg(p + "sk2", "v", [[0, "#eab48a"], [1, "#c9845a"]])}${lg(p + "m", "h", METAL)}${rg(p + "f", [[0, "#ffffff"], [1, "#e3e7ec"]])}<filter id="${p}gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter></defs>${halo(p)}
      <path d="M-4 118 Q40 100 92 104 Q108 106 110 116 Q110 128 92 130 Q40 134 -4 148Z" fill="url(#${p}sk)"/>
      <path d="M30 116 Q50 112 72 114" stroke="#c9845a" stroke-width="1.2" fill="none" opacity=".6"/><path d="M40 124 Q60 121 80 122" stroke="#9ab4d8" stroke-width="1.6" fill="none" opacity=".6"/>
      <circle cx="74" cy="117" r="9" fill="#ff3d7f" opacity=".45" filter="url(#${p}gl)"/>
      <path d="M150 74 Q122 80 100 92 Q84 100 66 104 Q58 108 64 114 Q74 116 86 112 Q104 106 118 100 Z" fill="url(#${p}sk2)"/>
      <path d="M150 88 Q124 94 104 104 Q88 112 74 114 Q66 118 72 124 Q82 126 94 120 Q112 112 126 108 Z" fill="url(#${p}sk)"/>
      <path d="M64 112 Q60 108 66 104 M72 122 Q66 118 74 114" stroke="#b97a52" stroke-width="1.2" fill="none"/>
      <path d="M66 105 q3-2 6 0 M74 115 q3-2 6 0" stroke="#fff" stroke-width="1.6" opacity=".6" fill="none"/>
      <path d="M44 96 q8-6 14 0 q6 6 12 0" stroke="#ff3d7f" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".9"/>
      <rect x="111" y="22" width="10" height="8" rx="2" fill="url(#${p}m)"/><rect x="113" y="18" width="6" height="5" rx="1.5" fill="#ff3d7f"/><path d="M134 34 l5-5" stroke="#5f6770" stroke-width="4" stroke-linecap="round"/>
      <circle cx="116" cy="56" r="26" fill="url(#${p}m)"/><circle cx="116" cy="56" r="22" fill="url(#${p}f)"/>${tk}
      <path d="M116 56 L116 40" stroke="#1b2430" stroke-width="2" stroke-linecap="round"/><path d="M116 56 L127 63" stroke="#ff3d7f" stroke-width="1.6" stroke-linecap="round"/><circle cx="116" cy="56" r="2.4" fill="#1b2430"/>
      <path d="M116 56 L116 35 A21 21 0 0 1 134.2 66.5Z" fill="#ff3d7f" opacity=".15"/>`, "A wrist with a pulse and a stopwatch");
  };

  BGX.ART = A;
})();
