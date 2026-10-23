/* BioglowRX diagram: "cell" — an animal cell, cut open, with its organelles.
   Spot ids: nucleus nucleolus chromatin membrane microvilli cilia ribosome rough-er smooth-er
   golgi vesicles mitochondrion lysosome peroxisome cytoskeleton centrioles cytoplasm */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  let it = null;
  const col = (id, base) => !it ? base : dg.is(it, id) ? dg.HL : BGX.shade(base, .55);
  const dk = (id, base) => BGX.shade(col(id, base), -.3);
  const c = id => dg.cls(it, id);
  const hl = id => dg.is(it, id);
  const glow = (id, x, y, r) => hl(id) ? `<circle cx="${x}" cy="${y}" r="${r}" fill="${dg.HL}" fill-opacity=".25" stroke="${dg.HL}" stroke-width="1.2"${c(id)}/>` : "";
  const BODY = "M20 70Q16 34 60 30Q100 22 132 38Q150 60 146 98Q144 132 108 142Q70 150 38 138Q14 120 20 70Z";
  const MEM = "#D0866A", CYTO = "#FBEBD0";

  function draw() {
    let s = `<g fill="none" stroke-linecap="round" stroke-linejoin="round">`;
    // microvilli (top right) and cilia (top left) stick out of the membrane
    const mv = [[96, 27], [103, 26], [110, 27], [117, 29], [124, 32]].map(p => `M${p[0]} ${p[1] + 4}V${p[1] - 7}`).join("");
    s += `<g${c("microvilli")}><path d="${mv}" stroke="${dk("microvilli", MEM)}" stroke-width="${hl("microvilli") ? 6.4 : 5.4}"/><path d="${mv}" stroke="${hl("microvilli") ? dg.HL : col("microvilli", CYTO)}" stroke-width="${hl("microvilli") ? 4.4 : 3.4}"/></g>`;
    const ci = [[28, 48, -30], [34, 41, -38], [41, 36, -48], [49, 32, -60], [57, 30, -72]].map(p => {
      const a = p[2] * Math.PI / 180, x = p[0] + Math.cos(a + Math.PI) * 0, dx = Math.cos(a - Math.PI / 2), dy = Math.sin(a - Math.PI / 2);
      const L = 15, ex = +(p[0] + dx * L).toFixed(1), ey = +(p[1] + dy * L).toFixed(1);
      return `M${p[0]} ${p[1]}Q${+(p[0] + dx * L * .5 + 3).toFixed(1)} ${+(p[1] + dy * L * .5 + 1).toFixed(1)} ${ex} ${ey}`;
    }).join("");
    s += `<path d="${ci}" stroke="${col("cilia", "#A0614A")}" stroke-width="${hl("cilia") ? 2.6 : 1.6}"${c("cilia")}/>`;
    // cell body: cytoplasm + plasma membrane
    s += `<path d="${BODY}" fill="${col("cytoplasm", CYTO)}"${c("cytoplasm")}/>` +
      `<path d="${BODY}" stroke="${col("membrane", MEM)}" stroke-width="${hl("membrane") ? 4.6 : 3}"${c("membrane")}/>` +
      `<path d="${BODY}" stroke="#fff" stroke-opacity=".5" stroke-width=".8" transform="translate(80 86) scale(.975) translate(-80 -86)"/>`;
    // cytoskeleton: fine filaments radiating from the centrosome
    s += `<path d="M100 54L30 64M100 54L26 104M100 54L60 140M100 54L104 140M100 54L142 92M100 54L136 48M100 54L76 32M100 54L118 34M100 54L140 124" stroke="${col("cytoskeleton", "#93AFC0")}" stroke-width="${hl("cytoskeleton") ? 1.4 : .7}"${c("cytoskeleton")}/>`;
    // smooth ER (tubes, lower left)
    s += `<path d="M28 112q5 -6 10 0t10 0t10 0M30 121q5 6 10 0t10 0t10 0M34 129q5 -5 10 0t10 0" stroke="${dk("smooth-er", "#7FC6C9")}" stroke-width="3.6"/><path d="M28 112q5 -6 10 0t10 0t10 0M30 121q5 6 10 0t10 0t10 0M34 129q5 -5 10 0t10 0" stroke="${col("smooth-er", "#A9DEDF")}" stroke-width="2.2"${c("smooth-er")}/>`;
    // rough ER: sheets wrapped round the nucleus, studded with ribosomes
    const arc = r => { const a0 = -35 * Math.PI / 180, a1 = 75 * Math.PI / 180, p = a => `${+(66 + r * Math.cos(a)).toFixed(1)} ${+(88 + r * Math.sin(a)).toFixed(1)}`; return `M${p(a0)}A${r} ${r} 0 0 1 ${p(a1)}`; };
    const rer = arc(28) + arc(32.5) + arc(37), rib = arc(29.7) + arc(34.2) + arc(38.7);
    s += `<path d="${rer}" stroke="${dk("rough-er", "#6FA6D8")}" stroke-width="3"/><path d="${rer}" stroke="${col("rough-er", "#A9CBEB")}" stroke-width="1.8"${c("rough-er")}/>`;
    const RIB = hl("ribosome") ? dg.HL : col("ribosome", "#2F4E7A"), rw = hl("ribosome") ? 2.4 : 1.4;
    s += `<g${c("ribosome")} stroke="${RIB}" stroke-width="${rw}"><path d="${rib}" stroke-dasharray="0 3.2"/>` +
      `<path d="M30 80h0M34 74h0M110 112h0M120 104h0M96 140h0M70 132h0M78 138h0M52 46h0M86 40h0M126 54h0M136 116h0M24 92h0M60 122h0"/></g>`;
    // Golgi apparatus (stacked curved sacs) and vesicles budding off
    const gol = [0, 4.2, 8.4, 12.6].map(o => `M${112 + o} ${66 + o * .6}Q${126 + o} 81 ${112 + o} ${96 - o * .6}`).join("");
    s += `<path d="${gol}" stroke="${dk("golgi", "#E7A43C")}" stroke-width="3.4"/><path d="${gol}" stroke="${col("golgi", "#F6C76E")}" stroke-width="2"${c("golgi")}/>`;
    s += `</g>` + glow("vesicles", 137, 86, 13) +
      `<g fill="${col("vesicles", "#F6D27E")}" stroke="${dk("vesicles", "#D49A2E")}" stroke-width=".7"${c("vesicles")}><circle cx="136" cy="74" r="2.4"/><circle cx="140" cy="84" r="2.2"/><circle cx="135" cy="94" r="2.6"/><circle cx="139" cy="103" r="2"/><circle cx="130" cy="68" r="1.8"/></g>`;
    // nucleus: envelope with pores, chromatin, nucleolus
    s += `<circle cx="66" cy="88" r="23" fill="${col("nucleus", "#C7B3E2")}" stroke="${dk("nucleus", "#8E72BE")}" stroke-width="2.4"${c("nucleus")}/>` +
      `<circle cx="66" cy="88" r="23" fill="none" stroke="${col("nucleus", "#EDE4F7")}" stroke-width="1.2" stroke-dasharray="1.5 8"/>` +
      `<path d="M50 80q4 -6 8 0t8 0M48 94q5 5 9 0t9 2M58 104q4 -5 8 0t8 -1M74 96q3 4 7 0M78 72q-4 -4 -9 -1M52 88q3 -3 6 0" fill="none" stroke="${col("chromatin", "#7650A8")}" stroke-width="${hl("chromatin") ? 2.2 : 1.3}" stroke-linecap="round"${c("chromatin")}/>` +
      `<circle cx="73" cy="83" r="6.5" fill="${col("nucleolus", "#5B3B8A")}"${c("nucleolus")}/>`;
    // mitochondria
    const mito = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})"><ellipse rx="11" ry="5.4" fill="${col("mitochondrion", "#E2705A")}" stroke="${dk("mitochondrion", "#E2705A")}" stroke-width="1"/><path d="M-8 0l2 -3l2 5l2 -5l2 5l2 -5l2 5l2 -5l2 5l2 -3" fill="none" stroke="${col("mitochondrion", "#FCD5C6")}" stroke-width=".9" stroke-linejoin="round"/></g>`;
    s += `<g${c("mitochondrion")}>${mito(46, 57, -18)}${mito(114, 123, 20)}</g>`;
    // lysosome, peroxisome, centrioles
    s += glow("lysosome", 88, 129, 10) + `<circle cx="88" cy="129" r="5.4" fill="${col("lysosome", "#9A5B8E")}" stroke="${dk("lysosome", "#9A5B8E")}"${c("lysosome")}/><path d="M86 127h0M90 130h0M87 131h0" stroke="#fff" stroke-opacity=".7" stroke-width="1.2" stroke-linecap="round"/>` +
      glow("peroxisome", 33, 92, 9.5) + `<circle cx="33" cy="92" r="4.8" fill="${col("peroxisome", "#86BE68")}" stroke="${dk("peroxisome", "#86BE68")}"${c("peroxisome")}/><rect x="31.3" y="90.3" width="3.4" height="3.4" fill="${dk("peroxisome", "#4E8A35")}" transform="rotate(45 33 92)"/>` +
      glow("centrioles", 100, 54, 9) + `<g fill="${col("centrioles", "#4E8B6A")}" stroke="${dk("centrioles", "#4E8B6A")}" stroke-width=".6"${c("centrioles")}><rect x="95" y="51.6" width="7" height="3.4" rx="1"/><rect x="101.5" y="51" width="3.4" height="7" rx="1"/></g>`;
    return s;
  }

  BGX.DIAGRAMS.cell = item => {
    it = item || null;
    const s = draw();
    it = null;
    return dg.frame(s, item ? "Animal cell: " + item.name : "An animal cell and its organelles", ["#EEF6F4", "#D3E6E2"]);
  };
})();
