/* BioglowRX diagram "nerve" — the nervous system.
   Scenes chosen by item.spot:
   neuron:  dendrites soma hillock axon myelin node knob saltatory
   glia:    astro oligo schwann microglia ependymal
   signal:  resting threshold depol repol refractory (action-potential graph), synapse (close-up)
   cord:    grey white reflex nerves (spinal cord cross-section with a reflex arc)
   brain (lateral view): frontal parietal temporal occipital cerebellum
   brain (medial view):  cc thalamus hypothal limbic midbrain pons medulla csf
   meninges (layers close-up), cranial nerves cn1 … cn12 (underside schematic).
   Overview (null): the brain from the side with its four lobes. */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg, HL = dg.HL;
  const T = (x, y, s, w, c, txt, a) => `<text x="${x}" y="${y}" font-family="Chivo, sans-serif" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a || "middle"}">${BGX.esc(txt)}</text>`;
  let it = null;
  const on = id => dg.is(it, id);
  const col = (id, base) => on(id) ? HL : base;
  const c = id => dg.cls(it, id);
  const NAMES = {
    dendrites: "Dendrites", soma: "Cell body (soma)", hillock: "Axon hillock", axon: "Axon", myelin: "Myelin sheath", node: "Node of Ranvier",
    knob: "Synaptic knob", saltatory: "Saltatory conduction", astro: "Astrocyte", oligo: "Oligodendrocyte", schwann: "Schwann cell",
    microglia: "Microglia", ependymal: "Ependymal cells", resting: "Resting potential", threshold: "Threshold", depol: "Depolarisation",
    repol: "Repolarisation", refractory: "Refractory period", synapse: "Chemical synapse", grey: "Grey matter", white: "White matter",
    reflex: "Reflex arc", nerves: "Spinal nerve roots", frontal: "Frontal lobe", parietal: "Parietal lobe", temporal: "Temporal lobe",
    occipital: "Occipital lobe", cerebellum: "Cerebellum", cc: "Corpus callosum", thalamus: "Thalamus", hypothal: "Hypothalamus",
    limbic: "Limbic system", midbrain: "Midbrain", pons: "Pons", medulla: "Medulla oblongata", csf: "CSF and ventricles", meninges: "Meninges"
  };
  const CN = ["Olfactory", "Optic", "Oculomotor", "Trochlear", "Trigeminal", "Abducens", "Facial", "Vestibulocochlear", "Glossopharyngeal", "Vagus", "Accessory", "Hypoglossal"];
  const RN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

  /* ---------- a neuron ---------- */
  function neuron() {
    const den = col("dendrites", "#E59AA8"), sw = on("dendrites") ? 2.6 : 1.8;
    let s = `<g fill="none" stroke-linecap="round" stroke="${den}" stroke-width="${sw}"${c("dendrites")}>
      <path d="M30 66 L16 52 L8 48 M16 52 L14 40 M28 62 L24 44 L26 34 M24 44 L16 36 M30 76 L14 84 L6 82 M14 84 L12 96 M34 78 L30 96 L36 106 M30 96 L22 104 M40 60 L44 44 L52 38"/></g>`;
    s += `<circle cx="34" cy="70" r="13" fill="${col("soma", "#F2B8C2")}" stroke="#C0707F" stroke-width="1.2"${c("soma")}/><circle cx="33" cy="70" r="5" fill="#8B3E57"/>`;
    s += `<path d="M46 64 L58 68 L58 72 L46 76Z" fill="${col("hillock", "#E8A2B0")}"${c("hillock")}/>`;
    s += `<path d="M58 70 H132" stroke="${col("axon", "#C77788")}" stroke-width="${on("axon") ? 4 : 2.6}"${c("axon")}/>`;
    [[62, 78], [82, 98], [102, 118]].forEach(([a, b]) => s += `<rect x="${a}" y="64" width="${b - a}" height="12" rx="5" fill="${col("myelin", "#F6E7B8")}" stroke="#C9AE5E" stroke-width=".8"${c("myelin")}/>`);
    [80, 100, 120].forEach(x => s += on("node") ? `<circle cx="${x}" cy="70" r="4" fill="${HL}" class="dg-hl"/>` : "");
    s += `<g fill="none" stroke="#C77788" stroke-width="1.8" stroke-linecap="round"><path d="M132 70 L144 58 M132 70 L146 70 M132 70 L144 82"/></g>`;
    [[146, 56], [149, 70], [146, 84]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="${on("knob") ? 4.5 : 3.6}" fill="${col("knob", "#B35C73")}"${c("knob")}/>`);
    if (on("saltatory")) s += `<g fill="none" stroke="${HL}" stroke-width="1.8" class="dg-hl"><path d="M60 60 Q70 44 80 60 M80 60 Q90 44 100 60 M100 60 Q110 44 120 60"/><path d="M117 55 L120 60 L114 59" /></g>`;
    s += T(80, 126, 7.5, 700, "#6B4A55", "dendrites → soma → axon → knob");
    return s;
  }

  /* ---------- glial cells ---------- */
  function glia(k) {
    const H = id => col(id, "#E9B86A");
    if (k === "astro") return `<rect x="10" y="100" width="140" height="22" rx="11" fill="#E46B6B"/><rect x="10" y="106" width="140" height="10" rx="5" fill="#C94A4A"/>
      <g stroke="${HL}" stroke-width="3" stroke-linecap="round" fill="none" class="dg-hl"><path d="M80 58 L50 98 M80 58 L80 98 M80 58 L112 98 M80 58 L44 30 M80 58 L118 28 M80 58 L130 60 M80 58 L30 62"/></g>
      <circle cx="80" cy="58" r="12" fill="${HL}"/><circle cx="80" cy="58" r="5" fill="#8A2050"/>${T(80, 136, 8, 700, "#8A3030", "capillary: blood–brain barrier")}`;
    if (k === "oligo") return [40, 80, 120].map(x => `<path d="M${x} 14 V146" stroke="#C77788" stroke-width="2.4"/><rect x="${x - 6}" y="96" width="12" height="28" rx="5" fill="#F6E7B8" stroke="#C9AE5E"/>`).join("") +
      `<g class="dg-hl" stroke="${HL}" stroke-width="2.4" fill="none"><path d="M80 52 L40 96 M80 52 L80 96 M80 52 L120 96"/></g><circle cx="80" cy="48" r="12" fill="${HL}"/><circle cx="80" cy="48" r="5" fill="#8A2050"/>${T(80, 26, 8, 700, "#6B4A55", "one cell, many axons (CNS)")}`;
    if (k === "schwann") return `<circle cx="80" cy="74" r="44" fill="${HL}" opacity=".25"/>` + [40, 33, 26, 19].map((r, i) => `<circle cx="80" cy="74" r="${r}" fill="none" stroke="${HL}" stroke-width="${i ? 3 : 4}"${i ? "" : ' class="dg-hl"'}/>`).join("") +
      `<circle cx="80" cy="74" r="13" fill="#C77788"/>${T(80, 77, 7.5, 800, "#fff", "axon")}<ellipse cx="114" cy="40" rx="9" ry="6" fill="#8A2050"/>${T(80, 136, 8, 700, "#6B4A55", "wraps one axon segment (PNS)")}`;
    if (k === "microglia") return `<g stroke="${HL}" stroke-width="2.4" stroke-linecap="round" class="dg-hl"><path d="M72 76 L48 56 M72 76 L50 100 M72 76 L64 112 M72 76 L60 44 M72 76 L104 104"/></g>
      <circle cx="72" cy="76" r="12" fill="${HL}"/><ellipse cx="70" cy="76" rx="6" ry="4" fill="#8A2050"/>
      <circle cx="112" cy="62" r="12" fill="#fff" stroke="${HL}" stroke-dasharray="3 2"/><path d="M106 58 l5 6 l6 -9" stroke="#8B7A6A" stroke-width="2" fill="none"/>${[[128, 40], [134, 96], [116, 118]].map(([x, y]) => `<path d="M${x} ${y} l4 3 -3 4 -4 -2z" fill="#9A8A7A"/>`).join("")}${T(80, 138, 8, 700, "#6B4A55", "eats debris and microbes")}`;
    if (k === "ependymal") return `<rect x="10" y="20" width="140" height="44" rx="6" fill="#BFE3F5"/>${T(80, 40, 8, 700, "#2F6F98", "ventricle: CSF")}` +
      [0, 1, 2, 3, 4, 5].map(i => `<rect x="${14 + i * 22}" y="70" width="20" height="24" rx="3" fill="${HL}"${i ? "" : ' class="dg-hl"'}/><circle cx="${24 + i * 22}" cy="82" r="4" fill="#8A2050"/><path d="M${17 + i * 22} 70 v-6 M${22 + i * 22} 70 v-7 M${27 + i * 22} 70 v-6 M${32 + i * 22} 70 v-7" stroke="${HL}" stroke-width="1.2"/>`).join("") +
      `<rect x="10" y="98" width="140" height="36" rx="6" fill="#EADCE0"/>${T(80, 120, 8, 700, "#6B4A55", "brain tissue")}`;
    return "";
  }

  /* ---------- action potential graph ---------- */
  const yv = v => +(30 + (40 - v) * .75).toFixed(1);   // mV → y
  function apGraph() {
    let s = `<path d="M26 22 V128 H148" stroke="#5B6672" stroke-width="1" fill="none"/>`;
    s += T(23, yv(35) + 2.5, 7, 700, "#5B6672", "+35", "end") + T(23, yv(0) + 2.5, 7, 700, "#5B6672", "0", "end") + T(23, yv(-55) + 2.5, 7, 700, "#5B6672", "−55", "end") + T(23, yv(-70) + 4, 7, 700, "#5B6672", "−70", "end");
    s += `<path d="M26 ${yv(0)} H148" stroke="#C6CED6" stroke-width=".6" stroke-dasharray="2 2"/>`;
    s += `<path d="M26 ${yv(-55)} H148" stroke="${col("threshold", "#9AA7B4")}" stroke-width="${on("threshold") ? 1.8 : .8}" stroke-dasharray="3 2"${c("threshold")}/>`;
    if (on("refractory")) s += `<rect x="58" y="24" width="44" height="102" fill="${HL}" opacity=".18" class="dg-hl"/>`;
    const base = "#3E6FA8", W = 2.2;
    s += `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M26 ${yv(-70)} H50 M112 ${yv(-70)} H148" stroke="${col("resting", base)}" stroke-width="${on("resting") ? 3.2 : W}"${c("resting")}/>
      <path d="M50 ${yv(-70)} Q55 ${yv(-68)} 58 ${yv(-55)}" stroke="${base}" stroke-width="${W}"/>
      <path d="M58 ${yv(-55)} L68 ${yv(35)}" stroke="${col("depol", base)}" stroke-width="${on("depol") ? 3.4 : W}"${c("depol")}/>
      <path d="M68 ${yv(35)} Q72 ${yv(38)} 76 ${yv(10)} L86 ${yv(-70)}" stroke="${col("repol", base)}" stroke-width="${on("repol") ? 3.4 : W}"${c("repol")}/>
      <path d="M86 ${yv(-70)} Q90 ${yv(-82)} 96 ${yv(-79)} Q104 ${yv(-76)} 112 ${yv(-70)}" stroke="${base}" stroke-width="${W}"/></g>`;
    s += T(54, 46, 7, 700, "#2F6F3A", "Na⁺ in", "end") + T(86, 46, 7, 700, "#8A4A12", "K⁺ out", "start");
    s += T(87, 140, 7.5, 600, "#5B6672", "time (about 2 ms) →");
    return s;
  }

  /* ---------- synapse ---------- */
  function synapse() {
    const hl = on("synapse");
    let s = `<path d="M50 8 H110 V42 Q110 74 80 76 Q50 74 50 42Z" fill="#F2B8C2" stroke="#C0707F" stroke-width="1.2"/>`;
    [[66, 40], [80, 34], [94, 42], [72, 56], [88, 58], [80, 48]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#B35C73"/><circle cx="${x}" cy="${y}" r="1.6" fill="#B35C73"/>`);
    s += `<path d="M18 92 H142 V140 H18Z" fill="#DCE7F3" stroke="#7D96B4" stroke-width="1.2"/>`;
    [44, 62, 80, 98, 116].forEach(x => s += `<path d="M${x - 4} 92 v6 h8 v-6" fill="${hl ? HL : "#5B7FB0"}" stroke="none"/>`);
    s += `<g fill="${col("synapse", "#B35C73")}"${c("synapse")}>${[[70, 82], [80, 86], [90, 82], [76, 88], [86, 89], [64, 87], [96, 88]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7"/>`).join("")}</g>`;
    s += T(132, 30, 7, 700, "#8A3E57", "knob", "middle") + T(132, 40, 7, 600, "#8A3E57", "vesicles", "middle");
    s += T(30, 84, 7, 700, "#5B6672", "cleft") + T(80, 120, 7.5, 700, "#3F5F86", "receptors on next cell");
    s += T(28, 30, 9, 900, "#2F6F98", "Ca²⁺") + `<path d="M36 34 L48 40" stroke="#2F6F98" stroke-width="1.4"/>`;
    return s;
  }

  /* ---------- spinal cord cross-section ---------- */
  function cord() {
    const rf = on("reflex");
    let s = `<ellipse cx="80" cy="72" rx="42" ry="32" fill="${col("white", "#F4EFE6")}" stroke="#B9A98F" stroke-width="1.2"${c("white")}/>`;
    s += `<path d="M58 46 Q66 54 72 64 Q76 68 80 68 Q84 68 88 64 Q94 54 102 46 Q106 50 100 62 Q96 70 96 74 Q100 84 104 96 Q98 98 90 86 Q86 80 80 80 Q74 80 70 86 Q62 98 56 96 Q60 84 64 74 Q64 70 60 62 Q54 50 58 46Z" fill="${col("grey", "#B7AFA4")}"${c("grey")}/>`;
    s += `<circle cx="80" cy="74" r="2" fill="#7FB7DA"/>`;
    const nv = col("nerves", "#E1B45C"), nw = on("nerves") ? 3.4 : 2.4;
    s += `<g fill="none" stroke="${nv}" stroke-width="${nw}" stroke-linecap="round"${c("nerves")}><path d="M58 50 Q44 46 30 58 M58 94 Q44 96 32 70 M30 58 Q24 64 12 66 M102 50 Q116 46 130 58 M102 94 Q116 96 128 70 M130 58 Q136 64 148 66"/></g>`;
    s += `<ellipse cx="38" cy="52" rx="6" ry="4" fill="${nv}"/><ellipse cx="122" cy="52" rx="6" ry="4" fill="${nv}"/>`;
    s += T(80, 22, 7.5, 700, "#6B5A45", "dorsal (back)") + T(80, 124, 7.5, 700, "#6B5A45", "ventral (front)");
    // reflex arc on the left side: skin receptor → dorsal root → interneuron → ventral root → muscle
    const rc = rf ? HL : "#7D8FA3";
    s += `<g fill="none" stroke="${rc}" stroke-width="${rf ? 2 : 1.1}" stroke-linecap="round" stroke-dasharray="${rf ? "0" : "3 2"}"${c("reflex")}>
      <path d="M10 40 Q22 40 34 52 Q50 50 66 56"/><path d="M66 58 Q70 68 68 78"/><path d="M68 80 Q60 90 52 96 Q40 100 26 128"/></g>`;
    s += `<circle cx="10" cy="40" r="3" fill="${rc}"/><rect x="14" y="128" width="22" height="10" rx="5" fill="${rf ? HL : "#D98A8A"}"/>`;
    s += T(10, 34, 7, 700, "#5B6672", "skin", "start") + T(40, 148, 7, 700, "#5B6672", "muscle", "start");
    return s;
  }

  /* ---------- brain: lateral and medial views (front on the left) ---------- */
  const CEREBRUM = "M24 88 C12 68 20 34 56 26 C86 18 124 22 138 48 C146 64 144 86 134 96 C124 104 110 102 98 104 C84 108 64 106 52 102 C40 100 30 96 24 88Z";
  const LOBES = {
    frontal: ["0,0 86,0 86,22 72,71 46,78 0,90", "#F2C4A0"],
    parietal: ["86,0 132,0 128,26 121,74 100,64 72,71 86,22", "#B9D7A8"],
    temporal: ["0,90 46,78 100,64 121,74 118,130 0,130", "#A9C8E6"],
    occipital: ["132,0 160,0 160,130 118,130 121,74 128,26", "#D7B8E2"]
  };
  function stem(p) {
    return `<path d="M88 96 L100 96 L101 106 Q108 108 108 116 Q108 124 101 126 L100 146 L90 146 L89 126 Q82 124 82 116 Q82 108 89 106Z" fill="#E7C9A6" stroke="#B9946C" stroke-width=".8"/>` +
      `<path d="M89 96 H101 V106 H89Z" fill="${col("midbrain", "#E7C9A6")}"${c("midbrain")}/>` +
      `<path d="M89 106 Q82 108 82 116 Q82 124 89 126 H101 Q108 124 108 116 Q108 108 101 106Z" fill="${col("pons", "#DDB78F")}"${c("pons")}/>` +
      `<path d="M89 126 H101 L100 146 H90Z" fill="${col("medulla", "#E7C9A6")}"${c("medulla")}/>` +
      `<path d="M90 146 H100 L99 158 H91Z" fill="#E7D3B8"/>`;
  }
  function cerebellum() {
    return `<g${c("cerebellum")}><ellipse cx="124" cy="110" rx="21" ry="12" fill="${col("cerebellum", "#E8A3A3")}" stroke="#B46A6A" stroke-width=".8"/>
      <path d="M108 106 Q124 100 140 106 M106 112 Q124 106 142 112 M108 118 Q124 113 140 118" stroke="#B46A6A" stroke-width=".7" fill="none"/></g>`;
  }
  function lateral(p) {
    let s = cerebellum() + stem(p);
    s += `<defs><clipPath id="${p}cb"><path d="${CEREBRUM}"/></clipPath></defs><g clip-path="url(#${p}cb)">`;
    for (const k in LOBES) s += `<polygon points="${LOBES[k][0]}" fill="${col(k, LOBES[k][1])}"${c(k)}/>`;
    s += `<path d="M40 48 Q48 40 56 46 M100 36 Q110 30 118 38 M56 90 Q70 86 84 90 M30 70 Q38 64 46 70 M130 70 Q136 62 140 72" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" fill="none"/></g>`;
    s += `<path d="${CEREBRUM}" fill="none" stroke="#8C7A6A" stroke-width="1"/>`;
    s += `<path d="M86 22 L72 71 M46 78 L100 64 L121 74" stroke="#6E5E50" stroke-width="1.3" fill="none"/>`;
    if (!it) s += T(46, 56, 7.5, 800, "#7A4A20", "Frontal") + T(106, 46, 7.5, 800, "#3E6A2E", "Parietal") + T(76, 92, 7.5, 800, "#2F5F8A", "Temporal") + T(134, 82, 7, 800, "#6A3E7A", "Occip.") + T(132, 132, 7, 700, "#8A4040", "Cerebellum");
    return s;
  }
  function medial(p) {
    let s = cerebellum() + `<path d="${CEREBRUM}" fill="#F3E4D6" stroke="#8C7A6A" stroke-width="1"/>`;
    s += `<path d="M30 60 Q36 40 56 36 M118 40 Q132 48 134 66" stroke="#D9C2AE" stroke-width="1.2" fill="none"/>`;
    // limbic: cingulate gyrus above the corpus callosum + hippocampus/amygdala below
    const lb = col("limbic", "#E4C8A0"), lw = on("limbic") ? 5 : 4;
    s += `<g fill="none" stroke="${lb}" stroke-width="${lw}" stroke-linecap="round"${c("limbic")}><path d="M50 64 C54 38 108 32 124 60"/><path d="M118 72 C120 86 110 94 98 90"/></g>`;
    if (on("limbic")) s += `<circle cx="97" cy="90" r="3.5" fill="${HL}"/>`;
    s += `<path d="M58 66 C60 50 106 44 118 62 Q116 70 110 64 C100 54 72 54 64 66 Q60 72 58 66Z" fill="${col("cc", "#FFFFFF")}" stroke="#B9A48E" stroke-width=".8"${c("cc")}/>`;
    const cs = on("csf") ? HL : "#9CCBE8";
    s += `<path d="M66 68 Q80 58 104 64 Q100 70 84 68 Q72 70 66 68Z" fill="${cs}"${c("csf")}/><path d="M86 76 L86 84 M94 96 L95 106 M97 114 L106 112" stroke="${cs}" stroke-width="${on("csf") ? 2.4 : 1.6}"/>`;
    if (on("csf")) s += `<path d="${CEREBRUM}" fill="none" stroke="${HL}" stroke-width="2.4" stroke-dasharray="3 2"/>`;
    s += `<ellipse cx="90" cy="76" rx="11" ry="7" fill="${col("thalamus", "#D9A6C6")}"${c("thalamus")}/>`;
    s += `<path d="M70 82 Q76 78 82 82 L80 90 Q74 92 70 88Z" fill="${col("hypothal", "#F0B47A")}"${c("hypothal")}/>`;
    s += `<path d="M75 90 L74 95" stroke="#C99A6A" stroke-width="1.2"/><circle cx="74" cy="97.5" r="3" fill="#E9B98A"/>`;
    s += stem(p);
    return s;
  }

  /* ---------- meninges close-up ---------- */
  function meninges() {
    const L = [["Skull bone", "#EFE6D0", 14, 16], ["Dura mater", "#C9A27A", 30, 14], ["Arachnoid mater", "#E8D8F0", 44, 12], ["Subarachnoid space: CSF", "#BFE3F5", 56, 18], ["Pia mater", "#F2A2B0", 74, 11], ["Brain (cortex)", "#D8C6BC", 85, 44]];
    let s = "";
    L.forEach(([n, f, y, h], i) => {
      const hl = on("meninges") && (i === 1 || i === 2 || i === 4);
      s += `<rect x="12" y="${y}" width="136" height="${h}" fill="${hl ? HL : f}"${hl && i === 1 ? ' class="dg-hl"' : ""}/>`;
      s += T(80, y + h / 2 + 3, 7.5, 800, hl ? "#fff" : "#3C3C46", n);
    });
    s += `<path d="M30 56 V74 M130 56 V74" stroke="#A88FC0" stroke-width=".8"/>`;
    return s;
  }

  /* ---------- cranial nerves from below ---------- */
  function cranial() {
    const sel = RN.findIndex((r, i) => on("cn" + (i + 1)));
    let s = `<path d="M44 40 Q40 14 80 12 Q120 14 116 40 Q112 52 98 50 L94 44 H66 L62 50 Q48 52 44 40Z" fill="#EAD6C6" stroke="#B9A08A" stroke-width=".8"/>`;
    s += `<path d="M70 44 H90 Q96 56 94 70 Q100 76 98 88 L94 92 V138 H66 V92 L62 88 Q60 76 66 70 Q64 56 70 44Z" fill="#E7C9A6" stroke="#B9946C" stroke-width=".8"/>`;
    s += `<path d="M64 70 Q80 66 96 70 M62 88 Q80 92 98 88" stroke="#B9946C" stroke-width=".6" fill="none"/>`;
    // [y on brain, x reach, label side, label y]
    const P = [[20, 30, -1, 22], [34, 26, 1, 34], [48, 26, -1, 47], [56, 24, 1, 57], [70, 18, -1, 69], [84, 24, 1, 82], [90, 22, -1, 91], [96, 22, 1, 99], [104, 22, -1, 105], [110, 20, 1, 114], [130, 20, -1, 131], [118, 24, -1, 118]];
    P.forEach(([y, reach, side, ly], i) => {
      const h = sel === i, st = h ? HL : "#E1B45C", w = h ? 2.6 : (i === 4 ? 2.4 : 1.4);
      const xL = i < 2 ? 66 : 68, xR = i < 2 ? 94 : 92;
      if (i === 0) s += `<g${h ? ' class="dg-hl"' : ""}><ellipse cx="70" cy="20" rx="3" ry="6" fill="${st}"/><ellipse cx="90" cy="20" rx="3" ry="6" fill="${st}"/></g>`;
      else if (i === 1) s += `<path d="M58 30 L80 38 L102 30 M80 38 L66 46 M80 38 L94 46" stroke="${st}" stroke-width="${w}" fill="none"${h ? ' class="dg-hl"' : ""}/>`;
      else s += `<path d="M${xL} ${y} L${xL - reach} ${y + 4} M${xR} ${y} L${xR + reach} ${y + 4}" stroke="${st}" stroke-width="${w}" stroke-linecap="round"${h ? ' class="dg-hl"' : ""}/>`;
      const lx = side < 0 ? 14 : 146;
      s += T(lx, ly + 2.5, 8, h ? 900 : 700, h ? HL : "#5B6672", RN[i], side < 0 ? "start" : "end");
    });
    return s;
  }

  const GLIA = ["astro", "oligo", "schwann", "microglia", "ependymal"], AP = ["resting", "threshold", "depol", "repol", "refractory"],
    CORD = ["grey", "white", "reflex", "nerves"], LAT = ["frontal", "parietal", "temporal", "occipital", "cerebellum"],
    MED = ["cc", "thalamus", "hypothal", "limbic", "midbrain", "pons", "medulla", "csf"];
  BGX.DIAGRAMS.nerve = item => {
    it = item || null;
    const p = dg.uid(), sp = dg.spots(it)[0];
    let inner, label, bg = ["#F7F3FA", "#E6DEEE"], tag = "";
    const cn = sp && /^cn(\d+)$/.exec(sp);
    if (!sp) { inner = lateral(p); label = "The brain from the left side: frontal, parietal, temporal and occipital lobes, cerebellum and brainstem"; }
    else if (cn) { inner = cranial(); const n = +cn[1] - 1; label = `Cranial nerve ${RN[n]}: ${CN[n]}`; tag = dg.tag(80, 150, `${RN[n]} ${CN[n]}`); }
    else if (GLIA.indexOf(sp) >= 0) { inner = glia(sp); bg = ["#FBF6EE", "#EFE3D0"]; }
    else if (AP.indexOf(sp) >= 0) { inner = apGraph(); bg = ["#F2F7FB", "#DCE7F0"]; }
    else if (sp === "synapse") { inner = synapse(); bg = ["#F8F2F5", "#EADDE4"]; }
    else if (CORD.indexOf(sp) >= 0) { inner = cord(); bg = ["#F6F4EE", "#E6E1D4"]; }
    else if (LAT.indexOf(sp) >= 0) { inner = lateral(p); tag = dg.tag(80, 12, NAMES[sp]); }
    else if (MED.indexOf(sp) >= 0) { inner = medial(p); tag = dg.tag(80, 12, NAMES[sp]); }
    else if (sp === "meninges") inner = meninges();
    else { inner = neuron(); bg = ["#FBF3F5", "#EEDDE2"]; }
    if (!label) label = NAMES[sp] || (it && it.name) || "Nervous system";
    if (!tag && sp && !cn && LAT.indexOf(sp) < 0 && MED.indexOf(sp) < 0) tag = dg.tag(80, 150, NAMES[sp] || it.name);
    it = null;
    return dg.frame(inner + tag, label, bg);
  };
})();
