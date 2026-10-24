/* BioglowRX diagram "joints" — joints and movements.
   Synovial joint, labelled (spot): cartilage fluid capsule ligament bursa meniscus (null = labelled overview).
   Fibrous / cartilaginous: suture gomphosis syndesmosis synchondrosis symphysis.
   Synovial types: plane hinge pivot condylar saddle ball.
   Movement pictograms: flexion extension hyperext abduction adduction circum rotation supination pronation dorsi plantar inversion eversion.
   Clinical: acl gout dislocation ra oa tmj. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#2A3440", MUTED = "#55616e", BONE = "#EFE6D0", EDGE = "#9a8866", CART = "#cfe6f2", CARTE = "#7fb0cc", FLUID = "#bfe0f5", GHOST = "#b9c4ce";
  const BG = ["#F4F8FA", "#DDE8EE"], BGM = ["#FFF8EE", "#F3E6D3"];
  const arrowHead = (x, y, ang, c) => { const a = ang * Math.PI / 180, l = 6; return `<path d="M${x} ${y} L${(x - l * Math.cos(a - .5)).toFixed(1)} ${(y - l * Math.sin(a - .5)).toFixed(1)} M${x} ${y} L${(x - l * Math.cos(a + .5)).toFixed(1)} ${(y - l * Math.sin(a + .5)).toFixed(1)}" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`; };
  const arc = (cx, cy, r, a1, a2, c) => {   // degrees, clockwise from a1 to a2 if a2 > a1
    const p = a => [(cx + r * Math.cos(a * Math.PI / 180)).toFixed(1), (cy + r * Math.sin(a * Math.PI / 180)).toFixed(1)];
    const [x1, y1] = p(a1), [x2, y2] = p(a2), sweep = a2 > a1 ? 1 : 0, large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    const tang = a2 + (sweep ? 90 : -90);
    return `<path d="M${x1} ${y1} A${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/>` + arrowHead(+x2, +y2, tang, c);
  };

  /* ---------- labelled synovial joint ---------- */
  function synovial(sp) {
    const on = id => sp === id, cx = 56;
    const X = d => cx + d;
    let s = "";
    // ligaments (outside the capsule)
    s += `<path d="M${X(-34)} 40 Q${X(-42)} 80 ${X(-32)} 122 M${X(34)} 40 Q${X(42)} 80 ${X(32)} 122" stroke="${on("ligament") ? HL : "#d8c7a4"}" stroke-width="${on("ligament") ? 6 : 5}" fill="none" stroke-linecap="round"${dg.cls({ spot: sp }, "ligament")}/>`;
    // capsule (fibrous layer + synovial membrane)
    const cap = `M${X(-18)} 34 Q${X(-36)} 54 ${X(-34)} 82 Q${X(-32)} 106 ${X(-18)} 118 M${X(18)} 34 Q${X(36)} 54 ${X(34)} 82 Q${X(32)} 106 ${X(18)} 118`;
    s += `<path d="${cap}" stroke="${on("capsule") ? HL : "#8c7fb0"}" stroke-width="${on("capsule") ? 4.5 : 3}" fill="none"${on("capsule") ? ' class="dg-hl"' : ""}/>`;
    s += `<path d="${cap}" stroke="#d6cdee" stroke-width="1" fill="none" transform="translate(0 0)"/>`;
    // joint cavity with synovial fluid
    s += `<path d="M${X(-30)} 74 Q${X(-32)} 96 ${X(-24)} 104 H${X(24)} Q${X(32)} 96 ${X(30)} 74Z" fill="${on("fluid") ? HL : FLUID}"${on("fluid") ? ' class="dg-hl" fill-opacity=".85"' : ""}/>`;
    // femur-like upper bone
    s += `<path d="M${X(-16)} 8 V44 Q${X(-30)} 52 ${X(-30)} 68 Q${X(-30)} 82 ${X(-16)} 82 H${X(16)} Q${X(30)} 82 ${X(30)} 68 Q${X(30)} 52 ${X(16)} 44 V8Z" fill="${BONE}" stroke="${EDGE}"/>`;
    // tibia-like lower bone
    s += `<path d="M${X(-28)} 98 H${X(28)} V104 Q${X(20)} 112 ${X(15)} 116 V152 H${X(-15)} V116 Q${X(-20)} 112 ${X(-28)} 104Z" fill="${BONE}" stroke="${EDGE}"/>`;
    // articular cartilage caps
    const cc = on("cartilage") ? HL : CART, ce = on("cartilage") ? "#fff" : CARTE, ccl = on("cartilage") ? ' class="dg-hl"' : "";
    s += `<path d="M${X(-30)} 68 Q${X(-30)} 82 ${X(-16)} 82 H${X(16)} Q${X(30)} 82 ${X(30)} 68 Q${X(28)} 78 ${X(15)} 77.5 H${X(-15)} Q${X(-28)} 78 ${X(-30)} 68Z" fill="${cc}" stroke="${ce}" stroke-width=".6"${ccl}/>`;
    s += `<rect x="${X(-28)}" y="94.5" width="56" height="4" rx="1.5" fill="${cc}" stroke="${ce}" stroke-width=".6"${ccl}/>`;
    // menisci
    const mc = on("meniscus") ? HL : "#a9cfa0";
    s += `<path d="M${X(-30)} 84 L${X(-12)} 92.5 L${X(-30)} 94Z M${X(30)} 84 L${X(12)} 92.5 L${X(30)} 94Z" fill="${mc}" stroke="${on("meniscus") ? "#fff" : "#6a9a62"}" stroke-width=".7"${on("meniscus") ? ' class="dg-hl"' : ""}/>`;
    // bursa
    s += `<ellipse cx="${X(-24)}" cy="30" rx="7" ry="9" fill="${on("bursa") ? HL : "#d8ecf7"}" stroke="${on("bursa") ? "#fff" : "#7fb0cc"}"${on("bursa") ? ' class="dg-hl"' : ""}/>`;
    const names = { cartilage: "Articular cartilage", fluid: "Synovial fluid", capsule: "Joint capsule", ligament: "Ligament", bursa: "Bursa", meniscus: "Meniscus" };
    // labels on the right
    const L = [["bone", 18, X(16), 18], ["bursa", 32, X(-17), 30, "bursa"], ["capsule", 48, X(30), 50, "capsule"], ["cartilage", 64, X(24), 79, "cartilage"],
      ["synovial fluid", 80, X(22), 88, "fluid"], ["meniscus", 96, X(20), 92, "meniscus"], ["ligament", 112, X(37), 100, "ligament"]];
    if (!sp) {
      L.forEach(([t, y, lx, ly]) => { s += `<path d="M104 ${y - 2.5} L${lx} ${ly}" stroke="${MUTED}" stroke-width=".6"/>` + T(106, y, 7.5, 800, INK, t, "start"); });
      return dg.frame(s, "A synovial joint: cartilage, cavity with fluid, capsule, ligaments, bursa, menisci", BG);
    }
    const l = L.find(r => r[4] === sp);
    if (l) s += `<path d="M104 ${l[1] - 2.5} L${l[2]} ${l[3]}" stroke="${HL}" stroke-width="1"/>` + T(106, l[1], 8, 900, HL, l[0], "start");
    return dg.frame(s + dg.tag(80, 150, names[sp]), names[sp], BG);
  }

  /* ---------- fibrous and cartilaginous joints ---------- */
  function fixedJoint(sp) {
    let s = "", label = "";
    if (sp === "suture") {
      s += `<ellipse cx="80" cy="76" rx="46" ry="56" fill="${BONE}" stroke="${EDGE}" stroke-width="1.4"/>`;
      const zig = (pts) => "M" + pts.map(p => p.join(" ")).join(" L");
      const sag = []; for (let i = 0; i <= 18; i++) sag.push([80 + (i % 2 ? 3 : -3), 44 + i * 4.8]);
      const cor = []; for (let i = 0; i <= 18; i++) { const x = 37 + i * 4.8; cor.push([x, 50 - Math.sin((x - 37) / 86 * Math.PI) * 14 + (i % 2 ? 3 : -3)]); }
      s += `<path d="${zig(sag)} M${zig(cor).slice(1)}" stroke="${HL}" stroke-width="2.2" fill="none" class="dg-hl"/>`;
      s += T(80, 15, 7.5, 700, MUTED, "front (skull from above)");
      label = "Suture";
    } else if (sp === "gomphosis") {
      s += `<rect x="20" y="70" width="120" height="70" rx="6" fill="${BONE}" stroke="${EDGE}"/>` + T(124, 132, 7, 700, "#7d6c50", "jaw bone", "end");
      s += `<path d="M58 72 Q56 120 72 124 Q80 112 88 124 Q104 120 102 72Z" fill="none" stroke="${HL}" stroke-width="4" class="dg-hl"/>`;
      s += `<path d="M56 30 Q56 18 70 18 Q80 22 90 18 Q104 18 104 30 Q106 52 100 72 Q100 112 88 120 Q80 108 72 120 Q60 112 60 72 Q54 52 56 30Z" fill="#fbfbf6" stroke="#b9b39a" stroke-width="1.2"/>`;
      s += `<path d="M48 64 Q80 56 112 64" stroke="#e79a9a" stroke-width="5" fill="none"/>` + T(118, 58, 7, 700, "#c4515a", "gum", "start");
      s += T(53, 92, 7, 800, HL, "periodontal", "end") + T(53, 101, 7, 800, HL, "ligament", "end");
      label = "Gomphosis";
    } else if (sp === "syndesmosis") {
      s += `<path d="M44 14 Q36 80 50 146" stroke="${BONE}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M116 14 Q124 80 110 146" stroke="${BONE}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
      s += `<path d="M44 14 Q36 80 50 146" stroke="${EDGE}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".25"/>`;
      s += `<path d="M50 30 Q44 80 56 132 L104 132 Q116 80 110 30Z" fill="${HL}" fill-opacity=".25" stroke="${HL}" stroke-width="1.5" class="dg-hl"/>`;
      for (let i = 0; i < 9; i++) s += `<path d="M${50 - (i % 3)} ${38 + i * 11} L${110 + (i % 3)} ${32 + i * 11}" stroke="${HL}" stroke-width=".8"/>`;
      s += T(44, 156, 7, 700, MUTED, "radius") + T(116, 156, 7, 700, MUTED, "ulna") + T(80, 22, 7.5, 800, HL, "interosseous membrane");
      label = "";
    } else if (sp === "synchondrosis") {
      s += `<path d="M62 150 V64 Q40 60 40 36 Q40 14 80 14 Q120 14 120 36 Q120 60 98 64 V150Z" fill="${BONE}" stroke="${EDGE}"/>`;
      s += `<path d="M44 52 Q80 62 116 52 L114 60 Q80 70 46 60Z" fill="${HL}" class="dg-hl"/>`;
      s += T(80, 34, 7.5, 700, "#7d6c50", "epiphysis") + T(80, 110, 7.5, 700, "#7d6c50", "shaft") + T(80, 82, 7.5, 900, HL, "growth plate");
      label = "Synchondrosis";
    } else if (sp === "symphysis") {
      const vb = y => `<rect x="44" y="${y}" width="72" height="34" rx="8" fill="${BONE}" stroke="${EDGE}"/>`;
      s += vb(18) + vb(108 - 0) + `<rect x="46" y="58" width="68" height="44" rx="14" fill="${HL}" fill-opacity=".85" class="dg-hl"/><ellipse cx="80" cy="80" rx="16" ry="10" fill="#ffd1e1"/>`;
      s += T(80, 38, 7.5, 700, "#7d6c50", "vertebra") + T(80, 128, 7.5, 700, "#7d6c50", "vertebra") + T(80, 68, 7, 800, "#fff", "fibrocartilage");
      label = "Symphysis";
    }
    const names = { suture: "Suture", gomphosis: "Gomphosis", syndesmosis: "Syndesmosis", synchondrosis: "Synchondrosis", symphysis: "Symphysis" };
    return dg.frame(s + (label ? dg.tag(80, 150, label) : ""), names[sp], ["#FBF7EE", "#EEE5D2"]);
  }

  /* ---------- six synovial types ---------- */
  const TYPES = {
    plane: () => `<rect x="24" y="36" width="70" height="38" rx="6" fill="${BONE}" stroke="${EDGE}"/><rect x="66" y="78" width="70" height="38" rx="6" fill="${HL}" class="dg-hl"/>
      <path d="M40 126 H118" stroke="${INK}" stroke-width="2"/>${arrowHead(118, 126, 0, INK)}${arrowHead(40, 126, 180, INK)}${T(80, 26, 8, 800, MUTED, "flat surfaces glide")}`,
    hinge: () => `<path d="M60 10 V60 Q46 64 46 80 Q46 98 66 98 H94 Q114 98 114 80 Q114 64 100 60 V10Z" fill="${BONE}" stroke="${EDGE}"/>
      <path d="M40 92 Q42 118 66 118 H94 Q118 118 120 92 L132 92 Q132 132 94 132 H66 Q28 132 28 92Z" fill="${HL}" class="dg-hl"/>${arc(80, 82, 62, 20, 70, INK)}${T(28, 30, 8, 800, MUTED, "1 axis", "start")}`,
    pivot: () => `<ellipse cx="80" cy="90" rx="30" ry="12" fill="none" stroke="#c9a46a" stroke-width="7"/><rect x="66" y="28" width="28" height="100" rx="10" fill="${HL}" class="dg-hl"/>
      <path d="M50 90 A30 12 0 0 0 110 90" stroke="#c9a46a" stroke-width="7" fill="none"/><ellipse cx="80" cy="28" rx="14" ry="5" fill="#ff8fb3"/>${arc(80, 28, 24, 200, 340, INK)}${T(124, 120, 7.5, 700, MUTED, "ring of", "middle")}${T(124, 129, 7.5, 700, MUTED, "ligament", "middle")}`,
    condylar: () => `<path d="M24 92 Q24 136 80 136 Q136 136 136 92 L120 92 Q120 120 80 120 Q40 120 40 92Z" fill="${BONE}" stroke="${EDGE}"/>
      <ellipse cx="80" cy="88" rx="38" ry="24" fill="${HL}" class="dg-hl"/><rect x="66" y="16" width="28" height="56" fill="${HL}"/>
      <path d="M22 60 H138" stroke="${INK}" stroke-width="2"/>${arrowHead(138, 60, 0, INK)}${arrowHead(22, 60, 180, INK)}${arc(80, 60, 50, 230, 310, INK)}${T(80, 152, 8, 800, MUTED, "2 axes, no rotation")}`,
    saddle: () => `<path d="M24 104 Q52 84 80 104 Q108 124 136 104 L136 140 H24Z" fill="${BONE}" stroke="${EDGE}"/>
      <path d="M40 92 Q60 70 80 94 Q100 116 120 92 L120 40 Q80 20 40 40Z" fill="${HL}" class="dg-hl"/><path d="M40 92 Q60 70 80 94 Q100 116 120 92" stroke="#fff" stroke-width="1.4" fill="none"/>
      <path d="M50 56 Q80 44 110 56" stroke="#fff" stroke-width="1.4" fill="none"/>${T(80, 152, 8, 800, MUTED, "2 axes, very versatile")}`,
    ball: () => `<path d="M30 74 Q30 132 80 132 Q130 132 130 74 L116 74 Q116 116 80 116 Q44 116 44 74Z" fill="${BONE}" stroke="${EDGE}"/>
      <circle cx="80" cy="76" r="34" fill="${HL}" class="dg-hl"/><path d="M60 50 L40 16" stroke="${HL}" stroke-width="22" stroke-linecap="round"/><circle cx="70" cy="66" r="8" fill="#fff" opacity=".35"/>
      ${arc(80, 76, 56, 300, 360, INK)}${arc(80, 76, 56, 120, 60, INK)}${T(124, 22, 8, 800, MUTED, "all axes")}`
  };
  const TN = { plane: "Plane (gliding) joint", hinge: "Hinge joint", pivot: "Pivot joint", condylar: "Condylar (ellipsoid) joint", saddle: "Saddle joint", ball: "Ball-and-socket joint" };

  /* ---------- movement pictograms ---------- */
  const limb = (pts, c, w, cls) => `<path d="M${pts.map(p => p.join(" ")).join(" L")}" stroke="${c}" stroke-width="${w || 7}" fill="none" stroke-linecap="round" stroke-linejoin="round"${cls ? ' class="dg-hl"' : ""}/>`;
  const head = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r || 10}" fill="${c || "#f2c9a8"}" stroke="#c9a283"/>`;
  const SKIN = "#d9a98c";
  const frontBody = () => head(80, 22) + limb([[80, 33], [80, 92]], SKIN, 10) + limb([[74, 44], [62, 70], [58, 96]], SKIN) +
    limb([[76, 92], [70, 120], [68, 140]], SKIN, 8) + limb([[84, 92], [90, 120], [92, 140]], SKIN, 8);
  const MOVES = {
    flexion: () => limb([[70, 22], [70, 82]], SKIN, 10) + limb([[70, 82], [70, 140]], GHOST, 8) + limb([[70, 82], [118, 56]], HL, 8, 1) + head(70, 18, 8) + arc(70, 82, 40, 80, 0, INK) + T(130, 100, 8, 800, MUTED, "angle", "middle") + T(130, 110, 8, 800, MUTED, "decreases", "middle"),
    extension: () => limb([[70, 22], [70, 82]], SKIN, 10) + limb([[70, 82], [118, 56]], GHOST, 8) + limb([[70, 82], [70, 140]], HL, 8, 1) + head(70, 18, 8) + arc(70, 82, 40, -10, 75, INK) + T(130, 100, 8, 800, MUTED, "straighten", "middle"),
    hyperext: () => limb([[80, 150], [80, 82]], SKIN, 14) + `<g opacity=".5">${head(80, 56, 16, "#dde3e8")}</g>` + `<circle cx="66" cy="62" r="16" fill="${HL}" class="dg-hl"/>` + `<path d="M56 54 L50 50" stroke="#fff" stroke-width="2"/>` + arc(80, 82, 44, 268, 212, INK) + T(120, 30, 8, 800, MUTED, "beyond", "middle") + T(120, 40, 8, 800, MUTED, "straight", "middle"),
    abduction: () => `<path d="M80 6 V142" stroke="${MUTED}" stroke-dasharray="3 3"/>` + frontBody() + limb([[86, 44], [98, 70], [102, 96]], GHOST) + limb([[86, 44], [146, 44]], HL, 7, 1) + arc(86, 44, 44, 66, 8, INK) + T(122, 120, 8, 800, MUTED, "away from") + T(122, 130, 8, 800, MUTED, "midline"),
    adduction: () => `<path d="M80 6 V142" stroke="${MUTED}" stroke-dasharray="3 3"/>` + frontBody() + limb([[86, 44], [146, 44]], GHOST) + limb([[86, 44], [98, 70], [102, 96]], HL, 7, 1) + arc(86, 44, 44, 8, 66, INK) + T(126, 120, 8, 800, MUTED, "toward") + T(126, 130, 8, 800, MUTED, "midline"),
    circum: () => limb([[50, 40], [50, 50]], SKIN, 10) + head(50, 26) + `<ellipse cx="116" cy="112" rx="22" ry="10" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="4 3"/>` + limb([[54, 46], [116, 102]], HL, 7, 1) + limb([[54, 46], [96, 122]], GHOST, 6) + arrowHead(138, 113, 90, INK) + T(116, 140, 8, 800, MUTED, "hand traces a circle"),
    rotation: () => `<circle cx="80" cy="84" r="34" fill="#f2c9a8" stroke="#c9a283"/><path d="M80 50 L74 40 L86 40Z" fill="${GHOST}"/>` + `<g transform="rotate(50 80 84)"><path d="M80 50 L73 38 L87 38Z" fill="${HL}" class="dg-hl"/></g>` + arc(80, 84, 46, 250, 320, INK) + T(80, 146, 8, 800, MUTED, "head from above: turning 'no'"),
    supination: () => hand(true),
    pronation: () => hand(false),
    dorsi: () => foot(-28),
    plantar: () => foot(34),
    inversion: () => sole(true),
    eversion: () => sole(false)
  };
  function hand(sup) {
    let s = `<rect x="14" y="66" width="70" height="26" rx="12" fill="#f2c9a8" stroke="#c9a283"/>` + T(30, 118, 7.5, 700, MUTED, "forearm", "start");
    s += `<path d="M84 64 H128 Q136 64 136 72 V86 Q136 94 128 94 H84Z" fill="${sup ? "#ffd9e6" : "#e9b892"}" stroke="${HL}" stroke-width="2" class="dg-hl"/>`;
    s += [0, 1, 2, 3].map(i => `<rect x="136" y="${65 + i * 7.5}" width="12" height="6" rx="3" fill="${sup ? "#ffd9e6" : "#e9b892"}" stroke="${HL}" stroke-width="1"/>`).join("");
    if (sup) s += `<path d="M94 72 Q110 80 126 72 M94 84 Q110 78 126 86" stroke="#d47f9c" fill="none"/>`;
    else s += [0, 1, 2, 3].map(i => `<path d="M${130} ${68 + i * 7.5} h4" stroke="#c9a283"/>`).join("");
    s += `<path d="M${sup ? 96 : 96} ${sup ? 58 : 100} q${sup ? 6 : 6} ${sup ? -6 : 6} 12 0" stroke="#e9b892" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    s += arc(60, 79, 26, sup ? 120 : 240, sup ? 240 : 120, INK);
    s += T(110, 30, 9, 900, HL, sup ? "palm up" : "palm down") + T(110, 130, 7.5, 700, MUTED, sup ? "radius and ulna parallel" : "radius crosses the ulna");
    return s;
  }
  function foot(ang) {
    const ank = [70, 96];
    let s = limb([[70, 14], ank], SKIN, 16);
    const f = (a, c, cls) => `<g transform="rotate(${a} ${ank[0]} ${ank[1]})"><path d="M60 92 Q62 108 70 110 H128 Q138 110 138 102 Q136 94 120 92Z" fill="${c}"${cls ? ' class="dg-hl"' : ""}/></g>`;
    s += f(0, GHOST) + f(ang, HL, 1);
    s += arc(70, 101, 60, ang < 0 ? 6 : -6, ang < 0 ? -28 : 30, INK);
    s += T(80, 150, 8, 800, MUTED, ang < 0 ? "toes lifted to the shin" : "toes point down");
    return s;
  }
  function sole(inv) {
    let s = `<path d="M80 8 V156" stroke="${MUTED}" stroke-dasharray="3 3"/>` + T(84, 16, 7, 700, MUTED, "midline", "start");
    s += limb([[46, 14], [46, 92]], SKIN, 16);
    const g = (a, c, cls) => `<g transform="rotate(${a} 46 100)"><path d="M30 94 H62 Q66 104 60 112 H32 Q26 104 30 94Z" fill="${c}"${cls ? ' class="dg-hl"' : ""}/><path d="M30 112 H60" stroke="${cls ? "#fff" : "#8796a3"}" stroke-width="2"/></g>`;
    s += g(0, GHOST) + g(inv ? -28 : 28, HL, 1);
    s += arc(46, 100, 30, inv ? 60 : 120, inv ? 20 : 160, INK);
    s += T(120, 100, 8.5, 900, HL, inv ? "sole turns in" : "sole turns out") + T(120, 112, 7, 700, MUTED, "(left foot,") + T(120, 121, 7, 700, MUTED, "seen from behind)");
    return s;
  }
  const MN = { flexion: "Flexion", extension: "Extension", hyperext: "Hyperextension", abduction: "Abduction", adduction: "Adduction", circum: "Circumduction", rotation: "Rotation",
    supination: "Supination", pronation: "Pronation", dorsi: "Dorsiflexion", plantar: "Plantar flexion", inversion: "Inversion", eversion: "Eversion" };

  /* ---------- clinical scenes ---------- */
  const CLIN = {
    acl: () => `<path d="M48 8 V40 Q30 50 32 70 Q34 80 60 80 H100 Q126 80 128 70 Q130 50 112 40 V8Z" fill="${BONE}" stroke="${EDGE}"/>
      <path d="M30 96 H130 V104 Q112 112 104 116 V154 H56 V116 Q48 112 30 104Z" fill="${BONE}" stroke="${EDGE}"/>
      <path d="M92 96 L72 76" stroke="#d8c7a4" stroke-width="6" stroke-linecap="round"/><path d="M66 96 L80 84" stroke="${HL}" stroke-width="6" stroke-linecap="round" class="dg-hl"/><path d="M84 80 L92 76" stroke="${HL}" stroke-width="6" stroke-linecap="round"/>
      <path d="M80 82 l3 -4 2 4" stroke="#fff" stroke-width="1.4" fill="none"/>${T(14, 128, 7.5, 800, HL, "torn ACL", "start")}${T(14, 138, 7, 700, MUTED, "(front view)", "start")}${T(144, 20, 7, 700, MUTED, "femur", "end")}${T(142, 134, 7, 700, MUTED, "tibia", "end")}`,
    gout: () => `<path d="M14 70 Q20 40 44 40 L62 50 Q90 60 118 70 L146 74 Q154 86 146 96 L30 98 Q10 96 14 70Z" fill="#f2c9a8" stroke="#c9a283"/>
      <circle cx="122" cy="82" r="16" fill="${HL}" fill-opacity=".45" class="dg-hl"/><circle cx="122" cy="82" r="8" fill="${HL}"/>
      ${[[110, 112, 20], [122, 114, -30], [134, 112, 40], [116, 126, -10], [130, 128, 15]].map(([x, y, r]) => `<path d="M${x - 5} ${y} L${x + 5} ${y}" stroke="#7a86c8" stroke-width="1.8" transform="rotate(${r} ${x} ${y})"/>`).join("")}
      ${T(122, 146, 7.5, 800, INK, "urate crystals")}${T(56, 124, 7.5, 800, HL, "big toe joint")}${T(56, 134, 7, 700, MUTED, "(1st MTP)")}`,
    dislocation: () => `<path d="M36 14 Q24 60 40 104 L64 82 Q60 56 66 36 Z" fill="${BONE}" stroke="${EDGE}"/><path d="M64 46 Q74 56 66 72" stroke="${EDGE}" stroke-width="5" fill="none"/>
      <circle cx="80" cy="60" r="13" fill="none" stroke="${GHOST}" stroke-dasharray="3 3" stroke-width="1.5"/>
      <circle cx="80" cy="96" r="15" fill="${HL}" class="dg-hl"/><path d="M84 108 L110 152" stroke="${HL}" stroke-width="14" stroke-linecap="round"/>
      <path d="M86 66 Q96 76 88 84" stroke="${INK}" stroke-width="1.6" fill="none"/>${arrowHead(88, 84, 110, INK)}
      ${T(112, 34, 7.5, 700, MUTED, "glenoid", "start")}${T(112, 43, 7.5, 700, MUTED, "cavity", "start")}${T(104, 92, 7.5, 800, HL, "humeral head", "start")}${T(104, 101, 7.5, 800, HL, "out of socket", "start")}`,
    ra: () => `<path d="M40 150 V96 Q40 84 50 84 H112 Q122 84 122 96 V150Z" fill="#f2c9a8" stroke="#c9a283"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${44 + i * 19}" y="${20 + (i === 0 || i === 3 ? 10 : 0)}" width="14" height="${70 - (i === 0 || i === 3 ? 10 : 0)}" rx="7" fill="#f2c9a8" stroke="#c9a283"/>`).join("")}
      <path d="M122 120 Q140 108 144 86" stroke="#f2c9a8" stroke-width="13" stroke-linecap="round" fill="none"/>
      ${[0, 1, 2, 3].map(i => `<ellipse cx="${51 + i * 19}" cy="84" rx="9.5" ry="7" fill="${HL}" fill-opacity=".8" class="dg-hl"/>`).join("")}${T(80, 14, 7.5, 800, HL, "swollen knuckles")}`,
    oa: () => {
      const j = (x, worn) => `<path d="M${x - 22} 12 V44 Q${x - 26} 64 ${x} 66 Q${x + 26} 64 ${x + 22} 44 V12Z" fill="${BONE}" stroke="${EDGE}"/>
        <path d="M${x - 24} 82 Q${x} ${worn ? 72 : 80} ${x + 24} 82 V130 H${x - 24}Z" fill="${BONE}" stroke="${EDGE}"/>
        ${worn ? `<path d="M${x - 18} 62 Q${x} 68 ${x + 18} 62" stroke="${HL}" stroke-width="2" fill="none" class="dg-hl"/><path d="M${x - 24} 82 l-6 -4 M${x + 24} 82 l6 -4" stroke="${EDGE}" stroke-width="3" stroke-linecap="round"/>`
        : `<path d="M${x - 22} 58 Q${x} 72 ${x + 22} 58" stroke="${CARTE}" stroke-width="5" fill="none"/><path d="M${x - 24} 80 Q${x} 76 ${x + 24} 80" stroke="${CARTE}" stroke-width="5" fill="none"/>`}`;
      return j(44, false) + j(116, true) + T(44, 146, 8, 800, MUTED, "healthy") + T(116, 146, 8, 800, HL, "osteoarthritis") + T(116, 96, 6.8, 700, INK, "spurs, thin");
    },
    tmj: () => `<path d="M40 70 Q34 26 80 18 Q128 16 132 56 Q134 74 122 84 L112 86 Q102 92 96 104 L60 108 Q44 100 40 70Z" fill="${BONE}" stroke="${EDGE}"/>
      <circle cx="100" cy="60" r="8" fill="#fff" stroke="${EDGE}"/>
      <path d="M58 112 Q50 132 66 140 L118 138 Q124 130 116 120 L112 100 L106 96 Q96 104 90 112Z" fill="${BONE}" stroke="${EDGE}"/>
      <path d="M106 96 L112 82" stroke="${BONE}" stroke-width="8" stroke-linecap="round"/><path d="M106 96 L112 82" stroke="${EDGE}" stroke-width="8" stroke-linecap="round" opacity=".25"/>
      <ellipse cx="112" cy="80" rx="7" ry="4" fill="${HL}" class="dg-hl"/>${T(140, 104, 7.5, 800, HL, "TMJ", "middle")}${T(100, 46, 7, 700, MUTED, "ear")}${T(30, 150, 7, 700, MUTED, "mandible", "start")}`
  };
  const CNm = { acl: "ACL tear", gout: "Gout", dislocation: "Dislocated shoulder", ra: "Rheumatoid arthritis", oa: "Osteoarthritis", tmj: "Temporomandibular joint" };

  BGX.DIAGRAMS.joints = item => {
    const sp = item ? dg.spots(item)[0] : null;
    if (TYPES[sp]) return dg.frame(TYPES[sp](), TN[sp], BG);
    if (MOVES[sp]) return dg.frame(MOVES[sp]() + (["supination", "pronation", "circum", "rotation", "dorsi", "plantar"].indexOf(sp) >= 0 ? "" : dg.tag(80, 150, MN[sp])), MN[sp], BGM);
    if (CLIN[sp]) return dg.frame(CLIN[sp](), CNm[sp], ["#F6F4FB", "#E4E0F0"]);
    if (["suture", "gomphosis", "syndesmosis", "synchondrosis", "symphysis"].indexOf(sp) >= 0) return fixedJoint(sp);
    return synovial(sp);
  };
})();
