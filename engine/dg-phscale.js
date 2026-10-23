/* BioglowRX diagram "phscale" — universal-indicator pH strip (0–14) with a marker at item.ph
   and the substance drawn above it. Overview: the strip with a few everyday markers. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const UI = ["#E5242B", "#EF5A24", "#F69420", "#F8C611", "#E9E11B", "#B5D333", "#84C341", "#4DB749",
    "#22A55A", "#16A39A", "#1F8FC4", "#3366B0", "#4A4AA0", "#5E3C98", "#6C2180"];
  const X0 = 13, W = 134 / 15, Y = 108;
  const xOf = ph => X0 + (ph + .5) * W;
  const lg = (id, st, h) => `<linearGradient id="${id}" x1="0" y1="0" x2="${h ? 1 : 0}" y2="${h ? 0 : 1}">${st.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient>`;
  const rg = (id, st) => `<radialGradient id="${id}" cx=".38" cy=".32" r=".75">${st.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</radialGradient>`;
  const GL = [[0, "#fff", .6], [.25, "#fff", .08], [.8, "#fff", .04], [1, "#fff", .4]];
  const shadow = (cx, rx) => `<ellipse cx="${cx}" cy="98" rx="${rx}" ry="3.5" fill="#000" opacity=".14"/>`;

  /* drinking glass with liquid (top of liquid at ly) */
  const glass = (p, c1, c2, ly, extra) => `${lg(p + "l", [[0, c1], [1, c2]])}${lg(p + "g", GL, 1)}${shadow(80, 26)}
    <path d="M58 ${ly} L61 94 Q61.5 97 65 97 H95 Q98.5 97 99 94 L102 ${ly}Z" fill="url(#${p}l)"/>
    <ellipse cx="80" cy="${ly}" rx="22" ry="3" fill="${c1}" opacity=".9"/>${extra || ""}
    <path d="M55 22 L61 94 Q61.5 97 65 97 H95 Q98.5 97 99 94 L105 22Z" fill="url(#${p}g)" stroke="#9fb3c4" stroke-width="1.2"/>
    <ellipse cx="80" cy="22" rx="25" ry="3.5" fill="none" stroke="#9fb3c4" stroke-width="1.2"/>`;
  /* bottle with label */
  const bottle = (p, body, cap, label, lc, opts) => { const o = opts || {};
    return `${lg(p + "b", [[0, BGX.shade(body, .35)], [.45, body], [1, BGX.shade(body, -.35)]], 1)}${lg(p + "g", GL, 1)}${shadow(80, 24)}
    <rect x="72" y="14" width="16" height="12" rx="2.5" fill="${cap}"/>
    <path d="M72 26 H88 V32 Q100 38 100 50 V92 Q100 97 95 97 H65 Q60 97 60 92 V50 Q60 38 72 32Z" fill="url(#${p}b)"/>
    ${o.handle ? `<path d="M98 44 Q112 46 110 62 Q108 74 98 72" fill="none" stroke="${BGX.shade(body, -.2)}" stroke-width="6" stroke-linecap="round"/>` : ""}
    <rect x="63" y="56" width="34" height="28" rx="3" fill="#fff" opacity=".93"/>
    <text x="80" y="${o.sym ? 66 : 73}" font-family="Chivo, sans-serif" font-size="${label.length > 6 ? 5.6 : 7.5}" font-weight="800" fill="${lc}" text-anchor="middle">${label}</text>${o.sym || ""}
    <path d="M72 26 H88 V32 Q100 38 100 50 V92 Q100 97 95 97 H65 Q60 97 60 92 V50 Q60 38 72 32Z" fill="url(#${p}g)" opacity=".6"/>`; };
  const hazard = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -8 L8 0 L0 8 L-8 0Z" fill="#fff" stroke="#e0323a" stroke-width="1.6"/><path d="M-3 -2 L1 -4 M-3 2 L3 1 M-2 4 L2 3" stroke="#1B2430" stroke-width="1.2"/></g>`;
  const drops = (pts, c) => pts.map(([x, y, s]) => `<path d="M${x} ${y - 6 * s} Q${x + 4 * s} ${y} ${x} ${y + 3 * s} Q${x - 4 * s} ${y} ${x} ${y - 6 * s}Z" fill="${c}"/>`).join("");

  const OBJ = {
    "Battery acid": p => `${lg(p + "c", [[0, "#5a6270"], [1, "#22272e"]])}${shadow(80, 46)}
      <rect x="34" y="40" width="92" height="56" rx="5" fill="url(#${p}c)"/><rect x="34" y="34" width="92" height="10" rx="3" fill="#3a3f47"/>
      <rect x="46" y="24" width="12" height="11" rx="2" fill="#e0323a"/><rect x="102" y="24" width="12" height="11" rx="2" fill="#1B2430" stroke="#8d939b"/>
      <text x="52" y="21" font-family="Chivo, sans-serif" font-size="10" font-weight="800" fill="#e0323a" text-anchor="middle">+</text><text x="108" y="21" font-family="Chivo, sans-serif" font-size="11" font-weight="800" fill="#3a3f47" text-anchor="middle">−</text>
      <rect x="46" y="54" width="68" height="28" rx="3" fill="#f2c21b"/>${hazard(62, 68, 1)}<text x="88" y="72" font-family="Chivo, sans-serif" font-size="9" font-weight="800" fill="#1B2430" text-anchor="middle">12 V</text>`,
    "Stomach acid": p => `${rg(p + "s", [[0, "#ffc4c4"], [.6, "#f08a8a"], [1, "#b8484e"]])}${lg(p + "a", [[0, "#e9e11b"], [1, "#d0a414"]])}
      <path d="M60 18 Q58 34 66 40 Q50 44 44 62 Q38 86 62 94 Q86 100 108 86 Q126 72 118 52 Q112 38 98 44 Q84 50 78 40 Q72 30 74 18Z" fill="url(#${p}s)" stroke="#a03c42" stroke-width="1.2"/>
      <path d="M50 70 Q60 64 80 70 Q100 76 116 64 Q118 76 108 86 Q86 100 62 94 Q46 88 50 70Z" fill="url(#${p}a)" opacity=".85"/>
      <path d="M108 84 Q118 92 128 92" stroke="#b8484e" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="70" cy="80" r="2" fill="#fff" opacity=".7"/><circle cx="90" cy="84" r="1.6" fill="#fff" opacity=".7"/><text x="80" y="60" font-family="Chivo, sans-serif" font-size="8" font-weight="800" fill="#7d1f25" text-anchor="middle">HCl</text>`,
    "Lemon juice": p => `${rg(p + "y", [[0, "#fff6a8"], [.6, "#f8d81c"], [1, "#c9a200"]])}${rg(p + "f", [[0, "#fffbe0"], [.7, "#fbe96a"], [1, "#f0c800"]])}${shadow(80, 46)}
      <ellipse cx="62" cy="62" rx="30" ry="24" fill="url(#${p}y)" transform="rotate(-18 62 62)"/><path d="M33 72 Q28 76 30 80" stroke="#c9a200" stroke-width="3" fill="none"/>
      <circle cx="104" cy="70" r="24" fill="#f0c800"/><circle cx="104" cy="70" r="21" fill="url(#${p}f)"/>
      ${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M104 70 L${(104 + Math.cos(a) * 18).toFixed(1)} ${(70 + Math.sin(a) * 18).toFixed(1)}" stroke="#fffbe0" stroke-width="2"/>`; }).join("")}
      <circle cx="104" cy="70" r="3" fill="#fffbe0"/>`,
    "Cola": p => glass(p, "#7a3a1a", "#2a0f05", 34, `<rect x="66" y="40" width="12" height="12" rx="2" fill="#e8f6ff" opacity=".7" transform="rotate(12 72 46)"/><rect x="82" y="36" width="12" height="12" rx="2" fill="#e8f6ff" opacity=".6" transform="rotate(-10 88 42)"/>
      <circle cx="70" cy="70" r="1.5" fill="#fff" opacity=".7"/><circle cx="84" cy="80" r="1.3" fill="#fff" opacity=".7"/><circle cx="90" cy="62" r="1.2" fill="#fff" opacity=".7"/><circle cx="76" cy="88" r="1.2" fill="#fff" opacity=".7"/>`),
    "Vinegar": p => bottle(p, "#d8a64a", "#8a3a1a", "VINEGAR", "#7a4a10"),
    "Orange juice": p => glass(p, "#ffb43a", "#f07a10", 34, `<circle cx="100" cy="24" r="12" fill="#f07a10"/><circle cx="100" cy="24" r="10" fill="#ffc55a"/><path d="M100 14 V34 M90 24 H110 M93 17 L107 31 M107 17 L93 31" stroke="#ffe3a8" stroke-width="1.2"/>`),
    "Tomato juice": p => `${glass(p, "#e2412e", "#9a1a10", 34)}${rg(p + "t", [[0, "#ff8a7a"], [.6, "#e0323a"], [1, "#8f1018"]])}<circle cx="116" cy="84" r="13" fill="url(#${p}t)"/><path d="M110 72 L116 75 L122 72 L118 70 L116 66 L114 70Z" fill="#3a9a3a"/>`,
    "Black coffee": p => `${lg(p + "m", [[0, "#ffffff"], [1, "#cfd6dd"]], 1)}${shadow(78, 34)}
      <path d="M100 48 Q122 48 120 64 Q118 80 98 80" fill="none" stroke="#dfe4e9" stroke-width="7"/>
      <path d="M44 40 H104 V82 Q104 96 90 96 H58 Q44 96 44 82Z" fill="url(#${p}m)" stroke="#aab3bd"/><ellipse cx="74" cy="40" rx="30" ry="6" fill="#3a1f10" stroke="#aab3bd"/>
      <ellipse cx="68" cy="39" rx="10" ry="2" fill="#6b4024" opacity=".7"/>
      <path d="M62 30 Q56 22 62 14 M76 30 Q70 22 76 14 M90 30 Q84 22 90 14" stroke="#9aa3ad" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`,
    "Normal rain": p => `${lg(p + "c", [[0, "#ffffff"], [1, "#b8c6d4"]])}
      <path d="M38 56 Q26 56 28 44 Q30 34 42 36 Q46 20 64 22 Q76 12 90 22 Q108 18 112 34 Q130 34 130 46 Q130 58 116 58Z" fill="url(#${p}c)" stroke="#9fb3c4"/>
      ${drops([[46, 70, 1.3], [66, 80, 1.3], [86, 70, 1.3], [106, 80, 1.3], [56, 94, 1.1], [96, 94, 1.1]], "#3d8fd1")}`,
    "Milk": p => glass(p, "#ffffff", "#dde3e8", 30, `<path d="M60 34 L64 92" stroke="#fff" stroke-width="3" opacity=".9"/>`),
    "Pure water": p => glass(p, "#bfe6fb", "#5aa7e0", 40, `<circle cx="72" cy="80" r="1.5" fill="#fff"/><circle cx="88" cy="66" r="1.2" fill="#fff"/>`),
    "Blood": p => `${rg(p + "b", [[0, "#ff7a7a"], [.55, "#c8102e"], [1, "#6a0010"]])}${shadow(80, 22)}
      <path d="M80 14 Q112 56 108 72 Q104 96 80 96 Q56 96 52 72 Q48 56 80 14Z" fill="url(#${p}b)"/><ellipse cx="68" cy="66" rx="5" ry="10" fill="#fff" opacity=".35" transform="rotate(20 68 66)"/>`,
    "Sea water": p => `${lg(p + "s", [[0, "#5ec8e6"], [1, "#0f5f8f"]])}${lg(p + "k", [[0, "#cfeaff"], [1, "#eaf6ff"]])}
      <rect x="22" y="16" width="116" height="82" rx="10" fill="url(#${p}k)"/><circle cx="114" cy="34" r="9" fill="#ffd25c"/>
      <path d="M22 54 Q36 46 50 54 T78 54 T106 54 T138 54 V88 Q138 98 128 98 H32 Q22 98 22 88Z" fill="url(#${p}s)"/>
      <path d="M22 66 Q36 58 50 66 T78 66 T106 66 T138 66" stroke="#bfefff" stroke-width="2" fill="none" opacity=".7"/>
      <path d="M22 80 Q36 72 50 80 T78 80 T106 80 T138 80" stroke="#bfefff" stroke-width="2" fill="none" opacity=".5"/>`,
    "Baking soda solution": p => `${glass(p, "#f4f7f9", "#cdd8e0", 40, `<g opacity=".5" fill="#fff"><circle cx="70" cy="70" r="2"/><circle cx="86" cy="80" r="2"/><circle cx="78" cy="60" r="1.6"/></g>`)}
      <path d="M96 12 L110 26 Q118 30 120 24" stroke="#aab3bd" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="94" cy="11" rx="6" ry="4" fill="#fff" stroke="#aab3bd"/>`,
    "Milk of magnesia": p => bottle(p, "#5b8fd6", "#e8ecef", "MAGNESIA", "#2f62b8"),
    "Household ammonia": p => bottle(p, "#a6dcef", "#2f62b8", "AMMONIA", "#1f5f8a", { handle: 1 }),
    "Bleach": p => bottle(p, "#f4f6f8", "#2f62b8", "BLEACH", "#2f62b8", { handle: 1 }),
    "Drain cleaner": p => bottle(p, "#8a4fd0", "#e0323a", "DRAIN", "#6a2a9a", { sym: hazard(80, 76, .9) })
  };

  function strip(p, ends) {
    let o = `<rect x="${X0 - 1.5}" y="${Y - 1.5}" width="${15 * W + 3}" height="17" rx="5" fill="#1B2430" opacity=".18"/>`;
    o += UI.map((c, i) => `<rect x="${(X0 + i * W).toFixed(2)}" y="${Y}" width="${(W + .4).toFixed(2)}" height="14" fill="${c}"/>`).join("");
    o += `<rect x="${X0}" y="${Y}" width="${15 * W}" height="14" rx="3" fill="url(#${p}sh)"/>`;
    o += [0, 7, 14].map(n => `<text x="${xOf(n).toFixed(1)}" y="${Y + 25}" font-family="Chivo, sans-serif" font-size="8.5" font-weight="700" fill="#3a4654" text-anchor="middle">${n}</text>`).join("");
    if (ends) o += `<text x="${X0}" y="${Y + 36}" font-family="Chivo, sans-serif" font-size="7" font-weight="700" fill="#b8302a">acid</text><text x="${X0 + 15 * W}" y="${Y + 36}" font-family="Chivo, sans-serif" font-size="7" font-weight="700" fill="#5a2a8a" text-anchor="end">base</text>`;
    return `<defs>${lg(p + "sh", [[0, "#fff", .35], [.5, "#fff", 0], [1, "#000", .12]])}</defs>` + o;
  }
  function marker(ph, hl) {
    const x = xOf(ph).toFixed(1), c = hl ? dg.HL : "#1B2430";
    return `<g${hl ? ' class="dg-hl"' : ""}><rect x="${(x - W / 2 - 1.5).toFixed(1)}" y="${Y - 3}" width="${(W + 3).toFixed(1)}" height="20" rx="3" fill="none" stroke="${c}" stroke-width="3.2"/>
      <path d="M${x - 8} ${Y - 15} H${+x + 8} L${x} ${Y - 4}Z" fill="${c}" stroke="#fff" stroke-width="1"/></g>`;
  }

  BGX.DIAGRAMS.phscale = item => {
    const p = dg.uid();
    if (!item) {
      const pts = [[1.5], [7], [12.5]];
      let o = strip(p, 1) + pts.map(([ph]) => marker(ph)).join("");
      o += `<g transform="translate(0 -10)">${drops([[40, 70, 3.2]], "#E5242B")}${drops([[80, 64, 3.4]], "#33A94B")}${drops([[120, 70, 3.2]], "#6C2180")}</g>`;
      o += `<g font-family="Chivo, sans-serif" font-size="8" font-weight="800" text-anchor="middle" fill="#1B2430"><text x="40" y="84">ACID</text><text x="80" y="84">NEUTRAL</text><text x="120" y="84">BASE</text></g>`;
      o += `<text x="80" y="24" font-family="Chivo, sans-serif" font-size="11" font-weight="800" fill="#1B2430" text-anchor="middle">The pH scale</text>`;
      return dg.frame(o, "pH scale from 0 (acid) to 14 (base)");
    }
    const ph = parseFloat(item.ph), draw = OBJ[item.name];
    let o = (draw ? draw(p + "o") : "") + strip(p) + marker(ph, true);
    const tx = Math.max(30, Math.min(130, xOf(ph)));
    o += dg.tag(tx, 150, item.phLabel || "pH " + item.ph);
    return dg.frame(o, `${item.name}: pH ${item.ph}`);
  };
})();
