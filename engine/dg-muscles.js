/* BioglowRX diagram "muscles" — front and back body map, plus physiology close-ups.
   Body spots: frontalis orbicularis masseter scm trapezius deltoid pectoralis lats biceps triceps diaphragm rectus oblique
   glutmax glutmed quads hamstrings sartorius gastroc tibant  (null = overview of all of them).
   Physiology spots: sarcomere actin myosin sliding nmj ach motorunit atp roles origin. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  const INK = "#2A3440", MUTED = "#55616e", SKIN = "#f6dccb", SKINE = "#d9a98c", MUS = "#e7a493", MUSE = "#c97a68";
  const ACT = "#4f9fd6", MYO = "#d9893a", ZC = "#2A3440";

  /* ---------- body map ---------- */
  const SIL = `<circle cx="0" cy="14" r="8"/><rect x="-4" y="20" width="8" height="10"/>
    <path d="M-17 29 Q0 26 17 29 Q20 31 20 38 L22 84 Q22 87 19 86 L16 48 L13 72 L15 86 L9 150 L1 150 L0 98 L-1 150 L-9 150 L-15 86 L-13 72 L-16 48 L-19 86 Q-22 87 -22 84 L-20 38 Q-20 31 -17 29Z"/>`;
  const sym = (f) => f(1) + f(-1);
  /* each muscle: [view, svg drawer(fill, stroke)] */
  const M = {
    frontalis: ["F", (f) => `<path d="M-6 9 Q0 5 6 9 L6 11 Q0 9 -6 11Z" fill="${f}"/>`],
    orbicularis: ["F", (f) => `<g fill="none" stroke="${f}" stroke-width="1.4"><circle cx="-3" cy="13" r="1.8"/><circle cx="3" cy="13" r="1.8"/><ellipse cx="0" cy="18.3" rx="2.6" ry="1.2"/></g>`],
    masseter: ["F", (f) => sym(s => `<ellipse cx="${5.6 * s}" cy="17" rx="1.6" ry="2.6" fill="${f}"/>`)],
    scm: ["F", (f) => sym(s => `<path d="M${6.5 * s} 18 L${1.5 * s} 29" stroke="${f}" stroke-width="2.2" stroke-linecap="round"/>`)],
    trapezius: ["B", (f) => `<path d="M0 10 L4 22 L17 30 L0 62 L-17 30 L-4 22Z" fill="${f}"/>`],
    deltoid: ["F", (f) => sym(s => `<path d="M${15 * s} 29 Q${21 * s} 30 ${21 * s} 38 L${19 * s} 44 Q${15 * s} 38 ${15 * s} 29Z" fill="${f}"/>`)],
    pectoralis: ["F", (f) => sym(s => `<path d="M${0.8 * s} 32 L${15 * s} 32 L${15.5 * s} 38 Q${9 * s} 46 ${0.8 * s} 44Z" fill="${f}"/>`)],
    lats: ["B", (f) => sym(s => `<path d="M${15 * s} 38 L${1 * s} 56 L${1 * s} 70 L${12.5 * s} 70 L${15.5 * s} 48Z" fill="${f}"/>`)],
    biceps: ["F", (f) => sym(s => `<ellipse cx="${19 * s}" cy="53" rx="2.3" ry="7" fill="${f}"/>`)],
    triceps: ["B", (f) => sym(s => `<ellipse cx="${19 * s}" cy="52" rx="2.5" ry="8" fill="${f}"/>`)],
    diaphragm: ["F", (f) => `<path d="M-14 54 Q-8 42 0 46 Q8 42 14 54" fill="none" stroke="${f}" stroke-width="2.4" stroke-dasharray="${f === HL ? "0" : "2 1.5"}"/>`],
    rectus: ["F", (f) => sym(s => `<rect x="${s > 0 ? .7 : -4.7}" y="47" width="4" height="35" rx="1.5" fill="${f}"/>`) + `<path d="M-4.7 56 H4.7 M-4.7 64 H4.7 M-4.7 72 H4.7" stroke="#fff" stroke-width=".6" opacity=".8"/>`],
    oblique: ["F", (f) => sym(s => `<path d="M${6 * s} 48 L${15.5 * s} 50 L${13 * s} 72 L${14.5 * s} 82 L${6 * s} 80Z" fill="${f}"/>`)],
    glutmed: ["B", (f) => sym(s => `<path d="M${5 * s} 74 Q${14 * s} 72 ${15 * s} 82 L${9 * s} 84 Q${6 * s} 80 ${5 * s} 74Z" fill="${f}"/>`)],
    glutmax: ["B", (f) => sym(s => `<path d="M${0.8 * s} 80 Q${10 * s} 78 ${15 * s} 86 Q${14 * s} 96 ${7 * s} 98 Q${1 * s} 98 ${0.8 * s} 92Z" fill="${f}"/>`)],
    quads: ["F", (f) => sym(s => `<path d="M${2 * s} 92 Q${8 * s} 86 ${13 * s} 92 L${10 * s} 118 Q${6 * s} 122 ${2.5 * s} 118Z" fill="${f}"/>`)],
    hamstrings: ["B", (f) => sym(s => `<path d="M${2 * s} 98 L${13 * s} 98 L${10 * s} 120 L${3 * s} 120Z" fill="${f}"/>`)],
    sartorius: ["F", (f) => sym(s => `<path d="M${13.5 * s} 87 L${2.2 * s} 122" stroke="${f}" stroke-width="1.8" stroke-linecap="round"/>`)],
    gastroc: ["B", (f) => sym(s => `<ellipse cx="${6.5 * s}" cy="131" rx="3.4" ry="9" fill="${f}"/>`)],
    tibant: ["F", (f) => sym(s => `<path d="M${8.5 * s} 124 L${8 * s} 146" stroke="${f}" stroke-width="2.6" stroke-linecap="round"/>`)]
  };
  const ORDER = ["trapezius", "lats", "glutmed", "glutmax", "hamstrings", "gastroc", "triceps", "pectoralis", "deltoid", "oblique", "rectus", "diaphragm", "quads", "sartorius", "tibant", "biceps", "scm", "masseter", "frontalis", "orbicularis"];
  const NAMES = { frontalis: "Frontalis", orbicularis: "Orbicularis oculi & oris", masseter: "Masseter", scm: "Sternocleidomastoid", trapezius: "Trapezius", deltoid: "Deltoid",
    pectoralis: "Pectoralis major", lats: "Latissimus dorsi", biceps: "Biceps brachii", triceps: "Triceps brachii", diaphragm: "Diaphragm", rectus: "Rectus abdominis",
    oblique: "External oblique", glutmax: "Gluteus maximus", glutmed: "Gluteus medius", quads: "Quadriceps femoris", hamstrings: "Hamstrings", sartorius: "Sartorius",
    gastroc: "Gastrocnemius", tibant: "Tibialis anterior" };
  function bodyMap(sp) {
    const fig = (view, cx) => {
      let s = `<g transform="translate(${cx} 4) scale(.86)"><g fill="${SKIN}" stroke="${SKINE}" stroke-width="1">${SIL}</g>`;
      if (view === "B") s += `<path d="M0 24 V80" stroke="${SKINE}" stroke-width=".7"/>`;
      ORDER.forEach(id => {
        const [v, draw] = M[id];
        if (v !== view) return;
        const on = sp === id;
        const fill = on ? HL : (sp ? "#efc3b6" : MUS);
        s += on ? `<g class="dg-hl">${draw(HL)}</g>` : draw(fill);
      });
      return s + `</g>`;
    };
    let s = fig("F", 44) + fig("B", 116);
    s += T(10, 12, 7.5, 800, MUTED, "front", "start") + T(150, 12, 7.5, 800, MUTED, "back", "end");
    if (!sp) return dg.frame(s, "Major skeletal muscles, front and back", ["#FBF5F1", "#EFE2DA"]);
    return dg.frame(s + dg.tag(80, 150, NAMES[sp]), NAMES[sp], ["#FBF5F1", "#EFE2DA"]);
  }

  /* ---------- sarcomere ---------- */
  function sarcomere(x0, x1, y, opts) {
    const o = opts || {}, mid = (x0 + x1) / 2, half = o.thickHalf || 24;
    const ha = o.hl === "actin", hm = o.hl === "myosin";
    let s = "";
    const g = o.gap || 12, rows = [-1.5, -.5, .5, 1.5].map(k => y + k * g), zh = 2 * g + 4;
    // thin filaments from each Z disc
    rows.forEach(r => {
      [-1, 1].forEach(k => {
        const yy = r + (k < 0 ? -3 : 3);
        s += `<path d="M${x0} ${yy} H${x0 + o.thinLen}" stroke="${ha ? HL : ACT}" stroke-width="2"${ha ? ' class="dg-hl"' : ""}/>`;
        s += `<path d="M${x1} ${yy} H${x1 - o.thinLen}" stroke="${ha ? HL : ACT}" stroke-width="2"/>`;
      });
    });
    // thick filaments in the middle with heads
    rows.forEach(r => {
      s += `<path d="M${mid - half} ${r} H${mid + half}" stroke="${hm ? HL : MYO}" stroke-width="4" stroke-linecap="round"${hm ? ' class="dg-hl"' : ""}/>`;
      for (let x = mid - half + 3; x < mid + half - 2; x += 5) {
        if (Math.abs(x - mid) < 4) continue;
        const d = x < mid ? -1 : 1;
        s += `<path d="M${x} ${r - 1.5} l${-2 * d} -2 M${x} ${r + 1.5} l${-2 * d} 2" stroke="${hm ? HL : MYO}" stroke-width="1.2"/>`;
      }
    });
    s += `<path d="M${mid} ${y - zh + 2} V${y + zh - 2}" stroke="#9aa6b2" stroke-width="1" stroke-dasharray="2 2"/>`;
    s += `<path d="M${x0} ${y - zh} V${y + zh} M${x1} ${y - zh} V${y + zh}" stroke="${ZC}" stroke-width="2.6"/>`;
    return s;
  }
  const PH = {
    sarcomere: () => sarcomere(20, 140, 74, { thinLen: 46, thickHalf: 30 }) +
      `<path d="M20 34 V30 H140 V34" stroke="${HL}" stroke-width="2" fill="none" class="dg-hl"/>` + T(80, 24, 8, 900, HL, "one sarcomere") +
      T(20, 116, 7.5, 800, INK, "Z disc") + T(140, 116, 7.5, 800, INK, "Z disc") + T(80, 116, 7.5, 800, MUTED, "M line") +
      `<path d="M50 126 H110" stroke="${MYO}" stroke-width="1.4"/>` + T(80, 136, 7.5, 800, MYO, "A band (myosin length)"),
    actin: () => sarcomere(20, 140, 70, { thinLen: 46, thickHalf: 30, hl: "actin" }) + T(80, 122, 8, 900, HL, "thin filaments: actin") + T(80, 133, 7, 700, MUTED, "+ tropomyosin and troponin"),
    myosin: () => sarcomere(20, 140, 70, { thinLen: 46, thickHalf: 30, hl: "myosin" }) + T(80, 122, 8, 900, HL, "thick filaments: myosin") + T(80, 133, 7, 700, MUTED, "heads reach out to actin"),
    sliding: () => T(80, 16, 7.5, 800, MUTED, "relaxed") + sarcomere(14, 146, 44, { thinLen: 42, thickHalf: 30, gap: 7 }) +
      T(80, 84, 7.5, 900, HL, "contracted: Z discs pulled closer") + `<g class="dg-hl">${sarcomere(36, 124, 112, { thinLen: 42, thickHalf: 30, gap: 7 })}</g>` +
      `<path d="M16 112 H30 M144 112 H130" stroke="${HL}" stroke-width="2"/>` + T(80, 148, 7, 700, MUTED, "filaments slide; none of them shortens"),
    nmj: () => `<rect x="10" y="104" width="140" height="38" rx="10" fill="#f0b9ab" stroke="${MUSE}"/>` + T(80, 134, 7.5, 800, "#8a3a2a", "muscle fibre") +
      `<path d="M80 10 V54" stroke="#e8c15a" stroke-width="7" stroke-linecap="round"/>` + T(92, 26, 7.5, 800, MUTED, "motor axon", "start") +
      `<path d="M58 60 Q58 52 80 52 Q102 52 102 60 L102 88 Q102 96 80 96 Q58 96 58 88Z" fill="#f7dd8a" stroke="#c9a43c"/>` +
      [[68, 66], [80, 64], [92, 66], [74, 78], [88, 78], [80, 88]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="#c9a43c"/><circle cx="${x}" cy="${y}" r="1.4" fill="${ACT}"/>`).join("") +
      `<path d="M54 104 Q60 110 66 104 Q72 110 78 104 Q84 110 90 104 Q96 110 102 104 Q108 110 108 104" stroke="${HL}" stroke-width="2.4" fill="none" class="dg-hl"/>` +
      `<rect x="54" y="97" width="54" height="5" fill="${HL}" fill-opacity=".25"/>` + T(124, 100, 7, 800, HL, "cleft", "start") + T(26, 70, 7, 700, MUTED, "ACh", "middle") + T(26, 79, 7, 700, MUTED, "vesicles", "middle"),
    ach: () => `<rect x="10" y="110" width="140" height="34" rx="10" fill="#f0b9ab" stroke="${MUSE}"/>` +
      `<path d="M40 30 Q40 16 80 16 Q120 16 120 30 L120 78 Q120 90 80 90 Q40 90 40 78Z" fill="#f7dd8a" stroke="#c9a43c"/>` +
      [[56, 40], [76, 36], [98, 42], [66, 60], [90, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#fff" stroke="#c9a43c"/><circle cx="${x}" cy="${y}" r="2" fill="${ACT}"/>`).join("") +
      `<g class="dg-hl">${[[60, 98], [72, 102], [84, 97], [96, 103], [108, 99], [52, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${HL}"/>`).join("")}</g>` +
      [50, 66, 82, 98, 114].map(x => `<path d="M${x - 3} 110 v-4 M${x + 3} 110 v-4" stroke="${INK}" stroke-width="1.4"/>`).join("") +
      T(80, 136, 7.5, 800, "#8a3a2a", "receptors on the motor end plate") + T(146, 100, 7.5, 900, HL, "ACh", "end"),
    motorunit: () => {
      let s = "";
      for (let i = 0; i < 9; i++) { const y = 62 + i * 9.5, on = i % 3 === 0; s += `<rect x="70" y="${y}" width="80" height="6.5" rx="3" fill="${on ? HL : "#f0b9ab"}"${on ? ' class="dg-hl"' : ""}/>`; }
      s += `<circle cx="24" cy="30" r="10" fill="#f7dd8a" stroke="#c9a43c"/><circle cx="24" cy="30" r="4" fill="#c9a43c"/>`;
      s += `<path d="M30 36 Q56 60 58 92" stroke="${HL}" stroke-width="2.4" fill="none"/>`;
      [0, 3, 6].forEach(i => { const y = 65 + i * 9.5; s += `<path d="M58 92 Q62 ${y} 78 ${y}" stroke="${HL}" stroke-width="1.6" fill="none"/><circle cx="78" cy="${y}" r="2" fill="#c9a43c"/>`; });
      s += T(40, 18, 7.5, 800, MUTED, "motor neuron", "start") + T(110, 54, 7.5, 800, HL, "its fibres contract", "middle") + T(110, 154, 7, 700, MUTED, "others belong to other units");
      return s;
    },
    atp: () => `<rect x="18" y="34" width="52" height="30" rx="6" fill="#fff" stroke="${MUTED}"/><rect x="70" y="42" width="5" height="14" fill="${MUTED}"/>` +
      `<rect x="21" y="37" width="40" height="24" rx="4" fill="${HL}" class="dg-hl"/>` + T(41, 53, 9, 900, "#fff", "ATP") +
      `<path d="M84 49 H104" stroke="${INK}" stroke-width="1.6"/><path d="M100 45 L104 49 L100 53" fill="none" stroke="${INK}" stroke-width="1.6"/>` + T(108, 46, 7.5, 800, INK, "cross-bridges", "start") + T(108, 57, 7.5, 800, INK, "Ca²⁺ pumps", "start") +
      `<rect x="14" y="88" width="132" height="22" rx="8" fill="#fff" stroke="#9fb3c4"/>` + T(80, 102, 8, 800, INK, "creatine phosphate + ADP → ATP") +
      T(80, 128, 7.5, 700, MUTED, "ATP + CP: ~10–15 s of hard effort") + T(80, 140, 7.5, 700, MUTED, "then glycolysis and aerobic respiration"),
    roles: () => armScene("roles"),
    origin: () => armScene("origin")
  };
  function armScene(mode) {
    let s = `<path d="M30 20 L44 112" stroke="#efe6d0" stroke-width="12" stroke-linecap="round"/><path d="M44 112 L128 96" stroke="#efe6d0" stroke-width="9" stroke-linecap="round"/>`;
    s += `<path d="M44 112 L126 104" stroke="#e5dbc2" stroke-width="7" stroke-linecap="round"/>`;
    const bic = `<path d="M34 28 Q60 56 66 100" stroke="${mode === "roles" ? "#e7a493" : HL}" stroke-width="11" stroke-linecap="round" fill="none"${mode === "origin" ? ' class="dg-hl"' : ""}/>`;
    const brach = `<path d="M42 70 Q54 92 58 106" stroke="${mode === "roles" ? HL : "#d8968a"}" stroke-width="8" stroke-linecap="round" fill="none"${mode === "roles" ? ' class="dg-hl"' : ""}/>`;
    const tri = `<path d="M26 30 Q18 72 34 118" stroke="#9fb6d8" stroke-width="9" stroke-linecap="round" fill="none"/>`;
    s += tri + brach + bic;
    if (mode === "roles") {
      s += T(70, 62, 7.5, 900, HL, "brachialis:", "start") + T(70, 71, 7.5, 900, HL, "prime mover", "start") + `<path d="M68 64 L54 86" stroke="${HL}"/>` +
        T(70, 36, 7.5, 800, "#b0584a", "biceps:", "start") + T(70, 45, 7.5, 800, "#b0584a", "synergist", "start") + `<path d="M68 40 L52 46" stroke="#b0584a"/>` +
        T(6, 140, 7.5, 800, "#3a5a90", "triceps: antagonist", "start") + `<path d="M24 132 L28 116" stroke="#3a5a90"/>`;
      s += T(110, 128, 7, 700, MUTED, "elbow flexion");
    } else {
      s += `<circle cx="34" cy="24" r="5" fill="#fff" stroke="${INK}" stroke-width="1.6"/><circle cx="66" cy="104" r="5" fill="${INK}"/>`;
      s += T(44, 18, 7.5, 900, INK, "origin (scapula, fixed)", "start") + T(70, 126, 7.5, 900, INK, "insertion", "start") + T(70, 135, 7.5, 900, INK, "(radius, moves)", "start");
      s += `<path d="M120 80 Q118 60 100 54" stroke="${INK}" stroke-width="1.4" fill="none"/><path d="M104 51 L99 54 L104 58" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
    }
    return s;
  }
  const PN = { sarcomere: "Sarcomere", actin: "Actin", myosin: "Myosin", sliding: "Sliding filaments", nmj: "Neuromuscular junction", ach: "Acetylcholine",
    motorunit: "Motor unit", atp: "ATP and creatine phosphate", roles: "Prime mover, synergist, antagonist", origin: "Origin and insertion" };

  BGX.DIAGRAMS.muscles = item => {
    const sp = item ? dg.spots(item)[0] : null;
    if (PH[sp]) return dg.frame(PH[sp](), PN[sp], ["#F6F4FB", "#E4E0F0"]);
    return bodyMap(M[sp] ? sp : null);
  };
})();
