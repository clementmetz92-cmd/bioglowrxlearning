/* BioglowRX diagram "bodymap" — the body's map: anatomical position, directions, planes, cavities,
   abdominal quadrants and regions, body regions and feedback loops. Body's right is on the viewer's left.
   Spot ids:
     front view:  position supinf medlat proxdist sagittal transverse antebrachial cubital femoral patellar
     side view:   antpost frontal cranial
     skin layers: supdeep
     trunk:       pleural pericardial mediastinum abdominopelvic
     abdomen:     ruq luq rlq llq hypochondriac epigastric umbilical lumbar iliac hypogastric
     loops:       negative positive
   Overview (null): front view with the midline and the four quadrants. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const INK = "#1B2430", MUT = "#55616e", SKIN = "#F4D2BC", EDGE = "#C99478";
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const tag = (x, y, text) => { const w = text.length * 4.7 + 12; return `<g><rect x="${(x - w / 2).toFixed(1)}" y="${y - 8}" width="${w.toFixed(1)}" height="14" rx="7" fill="${INK}" opacity=".88"/>${T(x, y + 2.6, 8, 700, "#fff", text)}</g>`; };
  const hlTag = (x, y, text) => { const w = text.length * 4.7 + 12; return `<g class="dg-hl"><rect x="${(x - w / 2).toFixed(1)}" y="${y - 8}" width="${w.toFixed(1)}" height="14" rx="7" fill="${HL}"/>${T(x, y + 2.6, 8, 800, "#fff", text)}</g>`; };
  const arrow = (x1, y1, x2, y2, col, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5;
    const p1 = [x2 - h * Math.cos(a - .5), y2 - h * Math.sin(a - .5)], p2 = [x2 - h * Math.cos(a + .5), y2 - h * Math.sin(a + .5)];
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col}" stroke-width="${w || 2}" stroke-linecap="round"/><path d="M${x2} ${y2} L${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" fill="${col}"/>`;
  };
  const RL = `${T(14, 22, 9, 900, "#8a96a3", "R")}${T(146, 22, 9, 900, "#8a96a3", "L")}`;
  const NAMES = { position: "Anatomical position", supinf: "Superior / inferior", medlat: "Medial / lateral", proxdist: "Proximal / distal",
    sagittal: "Midsagittal plane", transverse: "Transverse plane", antebrachial: "Antebrachial (forearm)", cubital: "Cubital (elbow)",
    femoral: "Femoral (thigh)", patellar: "Patellar (front of knee)", antpost: "Anterior / posterior", frontal: "Frontal (coronal) plane",
    cranial: "Cranial cavity + vertebral canal", supdeep: "Superficial / deep", pleural: "Pleural cavities", pericardial: "Pericardial cavity",
    mediastinum: "Mediastinum", abdominopelvic: "Abdominopelvic cavity", ruq: "Right upper quadrant", luq: "Left upper quadrant",
    rlq: "Right lower quadrant", llq: "Left lower quadrant", hypochondriac: "Hypochondriac regions", epigastric: "Epigastric region",
    umbilical: "Umbilical region", lumbar: "Lateral (lumbar) regions", iliac: "Inguinal (iliac) regions", hypogastric: "Hypogastric region",
    negative: "Negative feedback", positive: "Positive feedback" };

  /* ---------- front view, anatomical position ---------- */
  const ARMS = [[[62, 32], [54, 59], [50, 82]], [[98, 32], [106, 59], [110, 82]]];
  const LEGS = [[[71, 90], [69, 115], [68, 137]], [[89, 90], [91, 115], [92, 137]]];
  const pl = pts => "M" + pts.map(p => p.join(" ")).join(" L");
  const limb = (pts, w, col, edge) => `<path d="${pl(pts)}" stroke="${edge}" stroke-width="${w + 1.6}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${pl(pts)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const TORSO = "M63 29 Q80 26 97 29 L99 52 Q97 70 99 90 Q80 96 61 90 Q63 70 61 52 Z";
  function front(sp) {
    const edge = sp === "position" ? HL : EDGE, ew = sp === "position" ? 1.6 : .8;
    let o = "";
    ARMS.forEach(a => o += limb(a, 7, SKIN, edge));
    LEGS.forEach(l => o += limb(l, 9, SKIN, edge));
    // hands, palms forward with thumbs pointing out
    o += `<ellipse cx="48.6" cy="89" rx="3.6" ry="6" fill="${SKIN}" stroke="${edge}" stroke-width="${ew}"/><path d="M47 85 L43.5 88" stroke="${edge}" stroke-width="2.2" stroke-linecap="round"/>
      <ellipse cx="111.4" cy="89" rx="3.6" ry="6" fill="${SKIN}" stroke="${edge}" stroke-width="${ew}"/><path d="M113 85 L116.5 88" stroke="${edge}" stroke-width="2.2" stroke-linecap="round"/>
      <ellipse cx="66" cy="140.5" rx="5.5" ry="2.6" fill="${SKIN}" stroke="${edge}" stroke-width="${ew}"/><ellipse cx="94" cy="140.5" rx="5.5" ry="2.6" fill="${SKIN}" stroke="${edge}" stroke-width="${ew}"/>
      <rect x="76.5" y="22" width="7" height="8" fill="${SKIN}" stroke="${edge}" stroke-width="${ew}"/>
      <path d="${TORSO}" fill="${SKIN}" stroke="${edge}" stroke-width="${ew}"/>
      <circle cx="80" cy="14" r="9" fill="${SKIN}" stroke="${edge}" stroke-width="${ew}"/>
      <circle cx="77" cy="13" r=".9" fill="${INK}"/><circle cx="83" cy="13" r=".9" fill="${INK}"/><path d="M78 17.5 Q80 18.6 82 17.5" stroke="${EDGE}" stroke-width=".7" fill="none"/>
      <circle cx="80" cy="66" r="1" fill="${EDGE}"/>`;
    return o;
  }
  const seg = (a, b, w) => `<path d="M${a.join(" ")} L${b.join(" ")}" stroke="${HL}" stroke-width="${w}" stroke-linecap="round"/>`;
  function frontView(sp) {
    let o = front(sp), top = "";
    if (sp === "antebrachial") top = `<g class="dg-hl">${ARMS.map(a => seg(a[1], a[2], 7)).join("")}</g>`;
    if (sp === "femoral") top = `<g class="dg-hl">${LEGS.map(l => seg(l[0], l[1], 9)).join("")}</g>`;
    if (sp === "cubital") top = `<g class="dg-hl">${ARMS.map(a => `<circle cx="${a[1][0]}" cy="${a[1][1]}" r="5" fill="${HL}"/>`).join("")}</g>`;
    if (sp === "patellar") top = `<g class="dg-hl">${LEGS.map(l => `<circle cx="${l[1][0]}" cy="${l[1][1]}" r="4.6" fill="${HL}"/>`).join("")}</g>`;
    if (sp === "proxdist") top = `<g class="dg-hl">${seg(ARMS[1][0], ARMS[1][1], 7)}${seg(ARMS[1][1], ARMS[1][2], 7)}<ellipse cx="111.4" cy="89" rx="3.6" ry="6" fill="${HL}"/></g>
      <circle cx="98" cy="32" r="2.6" fill="#fff" stroke="${INK}"/><circle cx="111.4" cy="94" r="2.6" fill="#fff" stroke="${INK}"/>
      <path d="M100 30 L118 26" stroke="${INK}" stroke-width=".8"/><path d="M113 96 L124 104" stroke="${INK}" stroke-width=".8"/>
      ${tag(134, 24, "Proximal")}${tag(136, 106, "Distal")}`;
    if (sp === "supinf") top = `<g class="dg-hl">${arrow(138, 74, 138, 30, HL, 2.4)}${arrow(138, 74, 138, 120, HL, 2.4)}</g>
      ${T(138, 24, 8, 800, INK, "Superior")}${T(138, 131, 8, 800, INK, "Inferior")}`;
    if (sp === "medlat") top = `<path d="M80 4 V146" stroke="${MUT}" stroke-width="1" stroke-dasharray="3 3"/>
      <g class="dg-hl">${arrow(112, 48, 84, 48, HL, 2.4)}${arrow(116, 48, 146, 48, HL, 2.4)}</g>
      ${tag(92, 38, "Medial")}${tag(132, 60, "Lateral")}${T(80, 152, 7.5, 700, MUT, "midline")}`;
    if (sp === "sagittal") top = `<g class="dg-hl"><rect x="78.6" y="2" width="2.8" height="146" fill="${HL}"/><rect x="74" y="2" width="12" height="146" fill="${HL}" opacity=".18"/></g>
      ${T(40, 120, 7.5, 700, MUT, "right half")}${T(122, 120, 7.5, 700, MUT, "left half")}`;
    if (sp === "transverse") top = `<g class="dg-hl"><rect x="20" y="58.6" width="120" height="2.8" fill="${HL}"/><rect x="20" y="54" width="120" height="12" fill="${HL}" opacity=".18"/></g>
      ${T(134, 44, 7.5, 700, MUT, "upper")}${T(134, 78, 7.5, 700, MUT, "lower")}`;
    if (sp == null) top = `<path d="M80 4 V146" stroke="${MUT}" stroke-width=".8" stroke-dasharray="3 3"/>
      <rect x="63" y="50" width="17" height="16" fill="#9ED3C2" opacity=".85"/><rect x="80" y="50" width="17" height="16" fill="#F6D27A" opacity=".85"/>
      <rect x="63" y="66" width="17" height="16" fill="#A9C8EE" opacity=".85"/><rect x="80" y="66" width="17" height="16" fill="#F2AFC0" opacity=".85"/>
      <path d="M63 66 H97" stroke="${MUT}" stroke-width=".8"/>
      ${arrow(138, 70, 138, 34, MUT, 1.6)}${arrow(138, 70, 138, 106, MUT, 1.6)}${T(138, 28, 7.5, 700, MUT, "superior")}${T(138, 116, 7.5, 700, MUT, "inferior")}`;
    const label = sp && ["supinf", "medlat"].indexOf(sp) < 0 ? tag(80, 152, NAMES[sp]) : sp === "supinf" ? tag(80, 152, NAMES[sp]) : "";
    return o + top + RL + label;
  }

  /* ---------- side view (facing the viewer's right) ---------- */
  function side(sp) {
    let o = `${limb([[80, 90], [81, 115], [79, 137]], 11, SKIN, EDGE)}
      <ellipse cx="84" cy="140.5" rx="6.5" ry="2.6" fill="${SKIN}" stroke="${EDGE}" stroke-width=".8"/>
      <rect x="76" y="22" width="7" height="9" fill="${SKIN}" stroke="${EDGE}" stroke-width=".8"/>
      <path d="M72 29 Q84 27 89 31 Q92 40 91 50 Q89 60 92 72 Q93 84 89 90 L71 90 Q67 80 69 70 Q66 52 70 40 Z" fill="${SKIN}" stroke="${EDGE}" stroke-width=".8"/>
      <circle cx="80" cy="15" r="9" fill="${SKIN}" stroke="${EDGE}" stroke-width=".8"/><path d="M88.6 12 L92 17 L88.4 18" fill="${SKIN}" stroke="${EDGE}" stroke-width=".8"/>
      <circle cx="85.5" cy="12.5" r=".9" fill="${INK}"/>
      ${limb([[80, 33], [81, 60], [83, 82]], 6, SKIN, EDGE)}<ellipse cx="83.6" cy="88" rx="3" ry="5.5" fill="${SKIN}" stroke="${EDGE}" stroke-width=".8"/>`;
    if (sp === "cranial") o += `<g class="dg-hl"><ellipse cx="79" cy="13" rx="6.5" ry="5.5" fill="${HL}"/><path d="M73 22 Q71 40 72 60 Q71 78 73 88" stroke="${HL}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      ${T(124, 14, 7.5, 700, INK, "brain", "start")}<path d="M86 13 L122 13" stroke="${INK}" stroke-width=".7"/>${T(30, 56, 7.5, 700, INK, "spinal")}${T(30, 65, 7.5, 700, INK, "cord")}<path d="M42 60 L71 60" stroke="${INK}" stroke-width=".7"/>`;
    if (sp === "antpost") o += `<g class="dg-hl">${arrow(97, 58, 132, 58, HL, 2.4)}${arrow(63, 58, 28, 58, HL, 2.4)}</g>
      ${T(126, 50, 8, 800, INK, "Anterior")}${T(126, 70, 7.5, 600, MUT, "(ventral)")}${T(34, 50, 8, 800, INK, "Posterior")}${T(34, 70, 7.5, 600, MUT, "(dorsal)")}`;
    if (sp === "frontal") o += `<g class="dg-hl"><rect x="78.6" y="2" width="2.8" height="146" fill="${HL}"/><rect x="74" y="2" width="12" height="146" fill="${HL}" opacity=".18"/></g>
      ${T(122, 110, 7.5, 700, MUT, "front part")}${T(40, 110, 7.5, 700, MUT, "back part")}`;
    return o + (sp === "cranial" ? "" : T(146, 22, 7, 700, "#8a96a3", "front", "end")) + tag(80, 152, NAMES[sp] || "Side view");
  }

  /* ---------- skin to bone layers ---------- */
  function layers() {
    const fat = Array.from({ length: 14 }, (_, i) => `<circle cx="${30 + i * 7}" cy="${52 + (i % 2) * 4}" r="3.6" fill="#FBEBB0" stroke="#E2C460" stroke-width=".6"/>`).join("");
    const mus = Array.from({ length: 6 }, (_, i) => `<path d="M24 ${67 + i * 5} H120" stroke="#B9473F" stroke-width=".7"/>`).join("");
    return `${T(72, 22, 8.5, 800, INK, "Superficial: near the surface")}
      <rect x="22" y="30" width="100" height="12" fill="#F1BFA6"/><rect x="22" y="30" width="100" height="3" fill="#D98E73"/>
      <rect x="22" y="42" width="100" height="20" fill="#F6DE8A"/>${fat}
      <rect x="22" y="62" width="100" height="32" fill="#D9675F"/>${mus}
      <rect x="22" y="94" width="100" height="30" fill="#EFE6D0"/><circle cx="40" cy="110" r="2" fill="#D9A07A"/><circle cx="70" cy="106" r="2" fill="#D9A07A"/><circle cx="100" cy="114" r="2" fill="#D9A07A"/>
      ${T(26, 39, 7.5, 800, INK, "skin", "start")}${T(26, 60, 7.5, 800, INK, "fat", "start")}${T(26, 80, 7.5, 800, "#fff", "muscle", "start")}${T(26, 118, 7.5, 800, INK, "bone", "start")}
      <g class="dg-hl">${arrow(138, 32, 138, 26, HL, 2.4)}${arrow(138, 32, 138, 124, HL, 2.4)}</g>
      ${T(72, 138, 8.5, 800, INK, "Deep: farther inside")}${tag(80, 152, NAMES.supdeep)}`;
  }

  /* ---------- trunk: thoracic and abdominopelvic cavities ---------- */
  function trunk(sp) {
    const on = id => sp === id;
    const LUNGR = "M74 22 Q60 18 50 34 Q44 56 46 84 Q58 80 74 82 Z", LUNGL = "M86 22 Q100 18 110 34 Q116 56 114 84 Q104 80 96 82 Q94 70 86 66 Z";
    const HEART = "M80 58 Q92 52 98 63 Q100 75 88 85 Q76 81 74 71 Q74 61 80 58Z";
    return `<path d="M44 8 Q80 2 116 8 L124 40 Q122 90 126 130 Q80 146 34 130 Q38 90 36 40 Z" fill="${SKIN}" stroke="${EDGE}"/>
      <path d="M40 94 Q60 82 80 92 Q100 82 120 94 L122 126 Q80 140 38 126 Z" fill="${on("abdominopelvic") ? HL : "#F7E3D3"}"${on("abdominopelvic") ? ' class="dg-hl" opacity=".75"' : ""}/>
      ${on("mediastinum") ? `<path d="M74 20 L86 20 L86 64 Q100 74 94 88 L72 88 Q70 76 74 66 Z" fill="${HL}" opacity=".7" class="dg-hl"/>` : ""}
      <path d="${LUNGR}" fill="#F7B9BF" stroke="${on("pleural") ? HL : "#D27C88"}" stroke-width="${on("pleural") ? 3.4 : 1}"${on("pleural") ? ' class="dg-hl"' : ""}/>
      <path d="${LUNGL}" fill="#F7B9BF" stroke="${on("pleural") ? HL : "#D27C88"}" stroke-width="${on("pleural") ? 3.4 : 1}"${on("pleural") ? ' class="dg-hl"' : ""}/>
      <path d="M80 6 V28 M80 28 L72 36 M80 28 L88 36" stroke="#9FC3D9" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${on("pericardial") ? `<path d="M79 54 Q95 46 102 63 Q104 78 88 90 Q72 85 70 71 Q70 58 79 54Z" fill="none" stroke="${HL}" stroke-width="3" class="dg-hl"/>` : ""}
      <path d="${HEART}" fill="#C8323F"/>
      <path d="M40 92 Q60 80 80 90 Q100 80 120 92" stroke="#A06A50" stroke-width="2" fill="none"/>
      ${T(80, 116, 7.5, 700, "#8a6a58", "abdominopelvic")}${T(126, 100, 7, 700, "#8a6a58", "diaphragm", "end")}
      ${RL}${sp ? tag(80, 152, NAMES[sp]) : ""}`;
  }

  /* ---------- abdomen: 4 quadrants or 9 regions ---------- */
  const COLS = [[28, 62], [62, 98], [98, 132]], ROWS = [[20, 56], [56, 100], [100, 132]];
  const CELLS = { hypochondriac: [[0, 0], [2, 0]], epigastric: [[1, 0]], lumbar: [[0, 1], [2, 1]], umbilical: [[1, 1]], iliac: [[0, 2], [2, 2]], hypogastric: [[1, 2]] };
  const QUADS = { ruq: [28, 20, 52, 56], luq: [80, 20, 52, 56], rlq: [28, 76, 52, 56], llq: [80, 76, 52, 56] };
  function abdomen(sp) {
    const organs = `<g opacity=".75">
      <path d="M30 32 Q52 28 76 40 Q70 54 50 56 Q33 54 30 44Z" fill="#B5654F"/><ellipse cx="55" cy="56" rx="4" ry="3" fill="#7DAF5A"/>
      <path d="M88 38 Q112 32 118 48 Q114 62 98 60 Q92 52 88 38Z" fill="#E8A07E"/><ellipse cx="124" cy="44" rx="5" ry="8" fill="#8E5A86"/>
      <path d="M44 108 V66 H116 V100 Q112 112 94 112" stroke="#A9744F" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <path d="M44 108 l-2 8" stroke="#A9744F" stroke-width="2.4" stroke-linecap="round"/>
      ${[0, 1, 2].map(r => `<path d="M58 ${78 + r * 9} q5 -5 10 0 t10 0 t10 0 t10 0 t10 0" stroke="#E9A595" stroke-width="3" fill="none"/>`).join("")}
      <ellipse cx="80" cy="121" rx="9" ry="6" fill="#EBCB6E"/></g>`;
    let hl = "", grid = "";
    if (QUADS[sp] || sp == null) {
      if (QUADS[sp]) { const [x, y, w, h] = QUADS[sp]; hl = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${HL}" opacity=".5" class="dg-hl"/>`; }
      grid = `<path d="M80 18 V134 M26 76 H134" stroke="${INK}" stroke-width="1.4"/>`;
    } else {
      hl = (CELLS[sp] || []).map(([c, r]) => `<rect x="${COLS[c][0]}" y="${ROWS[r][0]}" width="${COLS[c][1] - COLS[c][0]}" height="${ROWS[r][1] - ROWS[r][0]}" fill="${HL}" opacity=".5" class="dg-hl"/>`).join("");
      grid = `<path d="M62 18 V134 M98 18 V134 M26 56 H134 M26 100 H134" stroke="${INK}" stroke-width="1.2"/>`;
    }
    return `<path d="M28 14 H132 V134 Q80 146 28 134 Z" fill="${SKIN}" stroke="${EDGE}"/>
      ${organs}
      <path d="M28 26 Q55 48 80 34 Q105 48 132 26" stroke="#B98A70" stroke-width="1.6" fill="none"/>
      <path d="M28 114 Q40 104 52 118 M132 114 Q120 104 108 118" stroke="#B98A70" stroke-width="1.6" fill="none"/>
      <circle cx="80" cy="76" r="2.2" fill="#9A6A52"/>
      ${hl}${grid}
      ${T(14, 80, 9, 900, "#8a96a3", "R")}${T(146, 80, 9, 900, "#8a96a3", "L")}${tag(80, 152, NAMES[sp] || "Abdomen")}`;
  }

  /* ---------- feedback loops ---------- */
  function node(x, y, lines, fill) {
    const L = [].concat(lines), w = Math.max(...L.map(s => s.length)) * 4.2 + 12, h = L.length * 9 + 6;
    return `<g><rect x="${(x - w / 2).toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="6" fill="${fill || "#fff"}" stroke="#9fb3c4"/>${L.map((s, i) => T(x, (y - h / 2 + 11 + i * 9).toFixed(1), 7.5, 800, INK, s)).join("")}</g>`;
  }
  function loop(sp) {
    const cx = 80, cy = 74, r = 50;
    const pos = deg => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
    const heads = degs => degs.map(d => { const [x, y] = pos(d), a = (d + 90) * Math.PI / 180;
      return `<path d="M${(x + 4 * Math.cos(a)).toFixed(1)} ${(y + 4 * Math.sin(a)).toFixed(1)} L${(x - 3 * Math.cos(a) + 4 * Math.cos(a - Math.PI / 2)).toFixed(1)} ${(y - 3 * Math.sin(a) + 4 * Math.sin(a - Math.PI / 2)).toFixed(1)} L${(x - 3 * Math.cos(a) - 4 * Math.cos(a - Math.PI / 2)).toFixed(1)} ${(y - 3 * Math.sin(a) - 4 * Math.sin(a - Math.PI / 2)).toFixed(1)}Z" fill="${HL}"/>`; }).join("");
    const ring = `<g class="dg-hl"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${HL}" stroke-width="2.2"/>`;
    if (sp === "positive") {
      const n = [[-90, ["Cervix", "stretches"]], [30, ["More", "oxytocin"]], [150, ["Stronger", "contractions"]]];
      return ring + heads([-30, 90, 210]) + `</g>` + n.map(([d, l]) => { const [x, y] = pos(d); return node(x, y, l, "#FFF1F5"); }).join("") +
        T(cx, cy - 2, 22, 900, HL, "+") + T(cx, cy + 8, 7.5, 700, MUT, "amplifies") + T(80, 138, 7.5, 700, MUT, "…until birth ends the loop") + tag(80, 152, NAMES.positive);
    }
    const n = [[-90, "Stimulus"], [-18, "Receptor"], [54, ["Control", "centre"]], [126, "Effector"], [198, "Response"]];
    return ring + heads([-54, 18, 90, 162, 234]) + `</g>` + n.map(([d, l]) => { const [x, y] = pos(d); return node(x, y, l); }).join("") +
      T(cx, cy - 2, 8, 800, INK, "set point") + T(cx, cy + 10, 7.5, 700, MUT, "change reversed") + tag(80, 152, NAMES.negative);
  }

  const VIEW = { antpost: "side", frontal: "side", cranial: "side", supdeep: "layers", pleural: "trunk", pericardial: "trunk", mediastinum: "trunk",
    abdominopelvic: "trunk", ruq: "abd", luq: "abd", rlq: "abd", llq: "abd", hypochondriac: "abd", epigastric: "abd", umbilical: "abd",
    lumbar: "abd", iliac: "abd", hypogastric: "abd", negative: "loop", positive: "loop" };
  BGX.DIAGRAMS.bodymap = item => {
    const sp = dg.spots(item)[0], v = VIEW[sp] || "front";
    const inner = v === "side" ? side(sp) : v === "layers" ? layers() : v === "trunk" ? trunk(sp) : v === "abd" ? abdomen(sp) : v === "loop" ? loop(sp) : frontView(sp);
    return dg.frame(inner, sp ? NAMES[sp] || item.name : "The body in anatomical position, with the midline and four abdominal quadrants", ["#F4F8FA", "#DDE8EE"]);
  };
})();
