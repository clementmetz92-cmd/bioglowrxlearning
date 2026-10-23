/* BioglowRX — Food Test Lab (Nutrition, Deen & Hark chapters 11–12: the macronutrients).
   A hands-on bench: put food samples into test tubes, add reagents with a dropper, heat Benedict's
   in a water bath, watch the colour change, record it, and conclude which nutrients a food contains.
   Tests: iodine (starch), Benedict's + heat (reducing sugars), biuret (protein), ethanol emulsion (fat).
   Loads after core.js, icons.js and lab-kit.js. */
(function () {
  "use strict";
  const BGX = window.BGX, esc = BGX.esc;
  const view = document.getElementById("br-view");
  const $ = s => view.querySelector(s);
  const ID = "food-test-lab";
  const HEAT_S = 6;              // real seconds in the bath = 5 simulated minutes
  const NT = 6, BATH = 4;        // tubes in the rack, slots in the water bath
  const K = BGX.labKit({ id: ID, title: "Food Test Lab", subject: "nutrition", subjectName: "Nutrition", tagline: "Hands-on lab: test foods for nutrients" });

  /* ---------------- colour helpers ---------------- */
  const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const A = hx(a), B = hx(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
  const ladder = (cols, x) => { x = Math.max(0, Math.min(cols.length - 1, x)); const i = Math.floor(x), f = x - i; return i >= cols.length - 1 ? cols[cols.length - 1] : mix(cols[i], cols[i + 1], f); };
  const lerpN = (arr, x) => { x = Math.max(0, Math.min(arr.length - 1, x)); const i = Math.floor(x), f = x - i; return i >= arr.length - 1 ? arr[arr.length - 1] : arr[i] + (arr[i + 1] - arr[i]) * f; };

  /* ---------------- the science ----------------
     levels 0–4 per nutrient: s starch, r reducing sugar, p protein, f fat (rough, for samples
     prepared the same way: mashed or diluted in the same volume of water) */
  const FOODS = {
    potato:     { name: "Potato", prep: "mashed in water", col: "#E9DEC0", op: .9, s: 3, r: 0, p: 0, f: 0 },
    bread:      { name: "White bread", prep: "soaked and mashed", col: "#E2CFA2", op: .9, s: 3, r: 1, p: 1, f: 0 },
    applejuice: { name: "Apple juice", prep: "", col: "#E3AE3E", op: .55, s: 0, r: 3, p: 0, f: 0 },
    milk:       { name: "Whole milk", prep: "", col: "#F7F4EC", op: .97, s: 0, r: 2, p: 2, f: 2 },
    eggwhite:   { name: "Egg white", prep: "diluted", col: "#EDEBCF", op: .5, s: 0, r: 0, p: 3, f: 0 },
    honey:      { name: "Honey", prep: "diluted", col: "#D99A2B", op: .6, s: 0, r: 4, p: 0, f: 0 },
    oil:        { name: "Cooking oil", prep: "", col: "#EFCF4F", op: .6, s: 0, r: 0, p: 0, f: 3 },
    chicken:    { name: "Chicken", prep: "ground in water", col: "#E6CDBA", op: .85, s: 0, r: 0, p: 3, f: 1 },
    rice:       { name: "Cooked rice", prep: "mashed in water", col: "#EEE8DA", op: .9, s: 3, r: 0, p: 0, f: 0 },
    banana:     { name: "Ripe banana", prep: "mashed in water", col: "#EFE1A6", op: .9, s: 1, r: 3, p: 0, f: 0 },
    sports:     { name: "Glucose sports drink", prep: "", col: "#F6C26B", op: .45, s: 0, r: 4, p: 0, f: 0 },
    grape:      { name: "White grape juice", prep: "", col: "#E8D98A", op: .5, s: 0, r: 3, p: 0, f: 0 },
    onion:      { name: "Onion", prep: "crushed in water", col: "#EEEBDC", op: .6, s: 0, r: 2, p: 0, f: 0 },
    sugar:      { name: "Table sugar", prep: "dissolved in water", col: "#EEF4F8", op: .25, s: 0, r: 0, p: 0, f: 0, sucrose: true },
    water:      { name: "Water", prep: "control", col: "#DCEEF9", op: .25, s: 0, r: 0, p: 0, f: 0 }
  };
  const L1_POOL = ["potato", "applejuice", "milk", "eggwhite", "honey", "oil", "rice"];
  const L2_POOL = ["potato", "bread", "applejuice", "milk", "eggwhite", "honey", "oil", "chicken", "rice", "banana"];
  const L3_BY_LEVEL = { 4: ["honey", "sports"], 3: ["applejuice", "banana", "grape"], 2: ["milk", "onion"], 1: ["bread"] };
  const NUTS = [["s", "Starch"], ["r", "Reducing sugar"], ["p", "Protein"], ["f", "Fat"]];
  const AMOUNT = ["none", "a trace", "a little", "a fair amount", "a lot"];

  const TESTS = {
    iodine:   { name: "Iodine", full: "iodine test", nut: "s", nutName: "starch", reagent: "iodine", min: 3, max: 5,
                cols: ["#C9862C", "#3F4688", "#262B63", "#15173A"], opts: [["Orange-brown (no change)", "#C9862C", "Orange-brown"], ["Blue-black", "#1E2250", "Blue-black"]], bin: true,
                mean: ["Orange-brown, no change: no starch.", "Blue-black: starch is present."] },
    benedict: { name: "Benedict's", full: "Benedict's test", nut: "r", nutName: "reducing sugar", reagent: "benedict", min: 8, max: 12, heat: true,
                cols: ["#2F7ED8", "#5FA63E", "#D9C232", "#E58A2B", "#B0432B"],
                opts: [["Blue (no change)", "#2F7ED8", "Blue"], ["Green", "#5FA63E", "Green"], ["Yellow", "#D9C232", "Yellow"], ["Orange", "#E58A2B", "Orange"], ["Brick-red", "#B0432B", "Brick-red"]],
                mean: ["Blue, no change: no reducing sugar.", "Green: a trace of reducing sugar.", "Yellow: a little reducing sugar.", "Orange: a fair amount of reducing sugar.", "Brick-red: a lot of reducing sugar."] },
    biuret:   { name: "Biuret", full: "biuret test", nut: "p", nutName: "protein", reagent: "biuret", min: 8, max: 12,
                cols: ["#8CB8E6", "#B49ADB", "#9461C8", "#6E35A8"], opts: [["Blue (no change)", "#8CB8E6", "Blue"], ["Purple / lilac", "#9461C8", "Purple"]], bin: true,
                mean: ["Blue, no change: no protein.", "Purple: protein is present."] },
    emulsion: { name: "Emulsion", full: "emulsion test", nut: "f", nutName: "fat", reagent: "ethanol", min: 8, max: 12, water: true,
                opts: [["Clear", "#E3EEF5", "Clear"], ["Cloudy white", "#F7F7F2", "Cloudy"]], bin: true,
                mean: ["Stays clear: no fat.", "Cloudy white emulsion: fat (lipid) is present."] }
  };
  const TORDER = ["iodine", "benedict", "biuret", "emulsion"];
  const REAG = {
    iodine:   { name: "Iodine solution", short: "Iodine", col: "#A85A1C", test: "iodine" },
    benedict: { name: "Benedict's solution", short: "Benedict's", col: "#2F7ED8", test: "benedict" },
    biuret:   { name: "Biuret solution", short: "Biuret", col: "#8CB8E6", test: "biuret" },
    ethanol:  { name: "Ethanol", short: "Ethanol", col: "#E9F0F5", test: "emulsion" },
    water:    { name: "Distilled water", short: "Water", col: "#CFE7F7", step: true }
  };

  const LEVELS = [
    { n: 1, title: "Guided tests", desc: "One food, all four tests, one at a time. A glow shows what to touch next." },
    { n: 2, title: "Mystery food", desc: "An unknown sample. Choose your tests, run a water control, then name its nutrients." },
    { n: 3, title: "How much sugar?", desc: "Use Benedict's colour as a rough sugar meter to rank four foods, and spot the table-sugar trap." }
  ];
  const STEPS = [
    "<b>Sample:</b> drag a food into an empty test tube (or tap the food, then tap a tube).",
    "<b>Reagent:</b> drag a reagent bottle onto the tube, then hold <b>Squeeze</b> to add drops. Iodine needs only 3–5 drops; the others about 10 (8–12).",
    "<b>Extra step if needed:</b> Benedict's must be <b>heated</b>: drag the tube into the hot water bath and wait for the timer. Emulsion test: after the ethanol, tap the tube and <b>Shake</b>, then add <b>distilled water</b>.",
    "<b>Read and record:</b> watch the colour change, tap the tube, press <b>Record result</b> and pick the colour you see.",
    "<b>Conclude:</b> use your results table to decide which nutrients the food contains."
  ];

  let L = null, st = null, raf = 0, drag = null, ghost = null;
  const label = k => (st && st.unknown === k) ? "Unknown X" : FOODS[k].name;

  /* ---------------- menu ---------------- */
  const sw = (c, extra = "") => `<i class="ft-sw${extra}" style="background:${c}"></i>`;
  function menu() {
    cancelAnimationFrame(raf); st = null;
    K.menu({
      hero: "Hands-on nutrition: find starch, sugar, protein and fat in real foods",
      introHTML: `<p>Every food is a mixture of nutrients. You can find out which ones a food has with <b>food tests</b>: add a reagent to a little mashed or dissolved food and watch for a colour change.</p>
        <div class="ft-refwrap"><table class="ft-ref"><thead><tr><th>Nutrient</th><th>Test</th><th>No</th><th>Yes</th></tr></thead><tbody>
          <tr><td>Starch</td><td>Iodine</td><td>${sw("#C9862C")}orange-brown</td><td>${sw("#1E2250")}blue-black</td></tr>
          <tr><td>Reducing sugar <small>(glucose, fructose, lactose, maltose)</small></td><td>Benedict's <b>+ heat</b></td><td>${sw("#2F7ED8")}blue</td><td><span class="ft-grad"></span>green → yellow → orange → brick-red</td></tr>
          <tr><td>Protein</td><td>Biuret</td><td>${sw("#8CB8E6")}blue</td><td>${sw("#9461C8")}purple / lilac</td></tr>
          <tr><td>Fat (lipid)</td><td>Ethanol, shake, then water</td><td>${sw("#E3EEF5", " is-clear")}clear</td><td>${sw("#F7F7F2", " is-cloud")}cloudy white</td></tr>
        </tbody></table></div>
        <p><b>Why it works:</b> iodine slots inside the coiled starch chain (blue-black); reducing sugars turn the blue copper ions in Benedict's into orange-red copper(I) oxide, but only when hot; biuret's copper ions bind to the peptide bonds of proteins (purple); fats dissolve in ethanol, then form tiny white droplets when water is added.</p>
        <p>A <b>control</b> (the same test on plain water) shows what "no change" looks like, so a faint colour can't fool you.</p>`,
      lifeHTML: `<p>These are the classic first steps of food analysis. The same chemistry reached the clinic: copper-reduction tests like Benedict's were once the standard urine sugar check in diabetes, and the biuret reaction is still used to measure total protein in blood.</p>`,
      steps: STEPS, levels: LEVELS, onStart: start,
      controls: "drag (or tap, then tap) samples and bottles onto tubes; hold <b>Squeeze</b> for drops (a tap gives one drop); drag a tube into the water bath to heat it; tap a tube for Shake, Record and Rinse. Keyboard: hold Space to squeeze, Enter when done, Esc to put down.",
      safety: "<b>Safety in a real lab:</b> wear goggles. Heat Benedict's in a hot water bath, never directly in a flame, and point tubes away from people. Ethanol is flammable: keep it away from heat and flames. Biuret solution contains sodium hydroxide (corrosive). Iodine stains skin and clothes. Never taste anything in the lab."
    });
  }

  /* ---------------- icons ---------------- */
  function jarIcon(col, op) {
    return `<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M7 7 H21 V22 Q21 25 18 25 H10 Q7 25 7 22 Z" fill="#fff" fill-opacity=".5" stroke="#8a96a3" stroke-width="1.3"/>
      <path d="M8 13 H20 V22 Q20 24 18 24 H10 Q8 24 8 22 Z" fill="${col}" opacity="${Math.max(.45, op)}"/><rect x="6" y="4" width="16" height="4" rx="1.5" fill="#9aa5b1"/></svg>`;
  }
  function bottleIcon(col) {
    return `<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M9 11 Q9 9 11 9 H17 Q19 9 19 11 V23 Q19 25 17 25 H11 Q9 25 9 23 Z" fill="${col}" stroke="#7d8a96" stroke-width="1.2"/>
      <rect x="11.5" y="5" width="5" height="4.5" rx="1" fill="#e6ebef" stroke="#7d8a96" stroke-width="1"/><ellipse cx="14" cy="4" rx="3" ry="2.6" fill="#3b3f46"/>
      <rect x="10.5" y="15" width="7" height="5" rx="1" fill="#fff" opacity=".75"/></svg>`;
  }

  /* ---------------- scene ---------------- */
  const rackCx = i => 30 + i * 32;
  const bathCx = s => 242 + s * 28;
  const tubeCx = (t, i) => t.inBath ? bathCx(t.slot) : rackCx(i);
  function sceneSVG() {
    let hits = "";
    for (let i = 0; i < NT; i++) hits += `<rect class="ft-hit" data-drop="tube" data-tube="${i}" x="${rackCx(i) - 15}" y="44" width="30" height="190" fill="transparent"/>`;
    return `<svg viewBox="0 0 360 250" class="lab-scene ft-scene" role="img" aria-label="Lab bench: a rack of six test tubes on the left and a hot water bath on the right">
      <defs>
        <linearGradient id="ft-glass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".3" stop-color="#fff" stop-opacity=".1"/><stop offset=".8" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/></linearGradient>
        <linearGradient id="ft-wood" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#C99460"/><stop offset="1" stop-color="#8E5E34"/></linearGradient>
        <linearGradient id="ft-water" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#bfe3f7" stop-opacity=".22"/><stop offset="1" stop-color="#5aa3d2" stop-opacity=".32"/></linearGradient>
        <linearGradient id="ft-steel" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#dfe5ea"/><stop offset="1" stop-color="#9aa5b0"/></linearGradient>
      </defs>
      <rect x="0" y="222" width="360" height="28" fill="var(--line)" opacity=".55"/>
      <!-- rack (back) -->
      <rect x="10" y="102" width="6" height="112" fill="#8E5E34"/><rect x="206" y="102" width="6" height="112" fill="#8E5E34"/>
      <rect x="6" y="98" width="210" height="9" rx="2" fill="url(#ft-wood)"/>
      ${Array.from({ length: NT }, (_, i) => `<ellipse cx="${rackCx(i)}" cy="101" rx="10" ry="2.4" fill="#5e3b1f" opacity=".55"/>`).join("")}
      <!-- water bath (back wall) -->
      <rect x="226" y="120" width="128" height="94" rx="6" fill="url(#ft-steel)" opacity=".45"/>
      <g class="ft-steam" aria-hidden="true"><path d="M248 116 q-6 -10 0 -18 q6 -8 0 -16"/><path d="M290 116 q6 -10 0 -18 q-6 -8 0 -16"/><path d="M332 116 q-6 -10 0 -18 q6 -8 0 -16"/></g>
      <g id="ft-dyn"></g>
      <!-- rack (front) -->
      <rect x="6" y="170" width="210" height="9" rx="2" fill="url(#ft-wood)"/>
      <rect x="2" y="208" width="218" height="11" rx="3" fill="url(#ft-wood)"/>
      <!-- water bath (water and front) -->
      <rect x="227" y="140" width="126" height="73" fill="url(#ft-water)"/>
      <path d="M227 140 H353" stroke="#e8f6ff" stroke-width="1.2" opacity=".8"/>
      <rect x="226" y="120" width="128" height="94" rx="6" fill="none" stroke="#7d8a96" stroke-width="2.5"/>
      <rect x="222" y="212" width="136" height="12" rx="3" fill="#4a535c"/>
      <circle cx="345" cy="218" r="2.6" fill="#ff6a4d"/>
      <text x="290" y="132" text-anchor="middle" font-size="10" font-weight="700" font-family="var(--font-mono)" fill="#33414d">90 °C</text>
      <g id="ft-bathglow"></g>
      <g id="ft-top"></g>
      <rect id="ft-rackhit" data-drop="rack" x="0" y="40" width="220" height="200" fill="transparent"/>
      <rect id="ft-bath" data-drop="bath" x="222" y="40" width="138" height="200" fill="transparent"/>
      ${hits}
    </svg>`;
  }

  /* ---------------- run ---------------- */
  function newTube() { return { sample: null, test: null, drops: 0, water: 0, shaken: false, heat: 0, inBath: false, slot: -1, dev: 0, shakeT: 0, recorded: false }; }

  function start(level) {
    L = level; cancelAnimationFrame(raf);
    st = { tubes: Array.from({ length: NT }, newTube), held: null, dropper: null, squeeze: false, sqT: 0, recording: null,
      records: {}, mistakes: 0, done: false, msg: "", msgUntil: 0, fx: [], ti: 0, guide: {}, gk: "", tipKey: "", concl: false, t: performance.now(),
      level: L.n, food: null, unknown: null, foods: [], samples: [], reagents: [], cq: BGX.shuffle(CQ), tq: BGX.shuffle(TQ) };
    if (L.n === 1) {
      st.food = BGX.pick(L1_POOL); st.samples = [st.food]; st.reagents = ["iodine", "benedict", "biuret", "ethanol", "water"];
    } else if (L.n === 2) {
      st.food = st.unknown = BGX.pick(L2_POOL); st.samples = [st.food, "water"]; st.reagents = BGX.shuffle(["iodine", "benedict", "biuret", "ethanol"]).concat(["water"]);
    } else {
      const lv = BGX.shuffle([4, 3, 2, 1]).slice(0, 3);
      st.foods = BGX.shuffle(lv.map(v => BGX.pick(L3_BY_LEVEL[v])).concat(["sugar"]));
      st.samples = st.foods.concat(["water"]); st.reagents = ["benedict"];
    }
    st.samples.forEach(k => st.records[k] = {});
    K.begin(L, L.n === 1 ? [
      "Follow the glow: it always marks the next thing to touch. The tip line under the bench says what to do in words.",
      () => `Results for this test: ${TESTS[TORDER[Math.min(3, st.ti)]].full} looks for <b>${TESTS[TORDER[Math.min(3, st.ti)]].nutName}</b>. ${TORDER[Math.min(3, st.ti)] === "benedict" ? "It only changes colour after 5 minutes in the hot water bath." : "No heating needed."} When you record, pick the swatch that matches the tube, not the one you expect.`
    ] : L.n === 2 ? [
      "Run all four tests on Unknown X: one tube per test. Then run at least one test on water, so you know what \"no change\" looks like.",
      "Benedict's only works hot: drag that tube into the water bath and wait for the full timer. Emulsion test: ethanol, then tap the tube and <b>Shake</b>, then distilled water.",
      "Compare each Unknown X tube with the matching water tube: if it's a different colour from the water's, that test is positive. Faint lilac or green still counts."
    ] : [
      "Every food needs its own tube of Benedict's, the same number of drops, and the <b>full</b> time in the hot water bath, or the comparison isn't fair.",
      "From least to most reducing sugar the colours go: blue → green → yellow → orange → brick-red. Rank by that order.",
      "Table sugar is <b>sucrose</b>. Benedict's only detects <b>reducing</b> sugars (glucose, fructose, lactose, maltose). Is sucrose one of them?"
    ]);

    const chip = (kind, k) => {
      const f = kind === "sample" ? FOODS[k] : REAG[k];
      const nm = kind === "sample" ? label(k) : f.name;
      const sub = kind === "sample" ? (st.unknown === k ? "mystery sample" : f.prep) : (k === "water" ? "for emulsion step 2" : "");
      return `<button class="ft-chip" type="button" data-${kind}="${k}" aria-label="${esc(nm)}">${kind === "sample" ? jarIcon(st.unknown === k ? "#cfd5dc" : f.col, f.op) : bottleIcon(f.col)}<span><b>${esc(nm)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</span></button>`;
    };
    view.innerHTML = K.topHTML(L) + `
      <div class="lab-stage lab-run ft-run">
        <div class="lab-scenewrap ft-scenewrap">${sceneSVG()}</div>
        <div class="ft-side">
          <p class="lab-hint ft-tip" id="lab-hint" aria-live="polite"></p>
          <div class="ft-bar" id="ft-bar"></div>
          <div class="ft-shelf"><p class="br-label">Food samples</p><div class="ft-chips">${st.samples.map(k => chip("sample", k)).join("")}</div></div>
          <div class="ft-shelf"><p class="br-label">Reagents</p><div class="ft-chips">${st.reagents.map(k => chip("reagent", k)).join("")}</div></div>
        </div>
      </div>
      <div class="ft-results"><p class="br-label">Results table</p><div class="ft-tablewrap" id="ft-table"></div>
        <div class="lab-controls" id="ft-concbtns"></div></div>
      <div id="ft-concl"></div>
      ${K.hintHTML()}
      <details class="lab-howrun"${L.n === 1 ? " open" : ""}><summary>How to do it</summary>${K.stepsHTML(STEPS)}</details>
      <div class="br-feedback" id="lab-fb" aria-live="polite"></div>`;
    $("#lab-quit").onclick = menu;
    K.bindHints();
    view.querySelectorAll("[data-sample]").forEach(el => bindDrag(el, () => ({ kind: "sample", key: el.dataset.sample })));
    view.querySelectorAll("[data-reagent]").forEach(el => bindDrag(el, () => ({ kind: "reagent", key: el.dataset.reagent })));
    view.querySelectorAll("[data-tube]").forEach(el => bindDrag(el, () => ({ kind: "tube", i: +el.dataset.tube })));
    $("#ft-bath").addEventListener("click", () => tapBath());
    $("#ft-rackhit").addEventListener("click", () => tapRack());
    renderBar(); renderTable(); renderConcBtns();
    try { window.scrollTo({ top: 0, behavior: "auto" }); } catch (_) { window.scrollTo(0, 0); }
    say(L.n === 1 ? "" : L.n === 2 ? `Find out what Unknown X contains. Pick your own tests, and test water too as a control.` : `Run Benedict's on every food, heat each tube in the bath, record the colours, then rank them.`, 0);
    st.t = performance.now(); raf = requestAnimationFrame(loop);
  }

  /* ---------------- pointer: drag or tap ---------------- */
  function bindDrag(el, getItem) {
    el.addEventListener("pointerdown", e => {
      if (!st || st.done || (e.button && e.button !== 0)) return;
      e.preventDefault();
      drag = { item: getItem(), x0: e.clientX, y0: e.clientY, moved: false, el };
      try { el.setPointerCapture(e.pointerId); } catch (_) { }
    });
    el.addEventListener("pointermove", e => {
      if (!drag || drag.el !== el) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 8) { drag.moved = true; ghost = makeGhost(drag.item); if (st.dropper) endDropper(); }
      if (drag.moved && ghost) { ghost.style.left = e.clientX + "px"; ghost.style.top = e.clientY + "px"; }
    });
    el.addEventListener("pointerup", e => {
      if (!drag || drag.el !== el) return;
      const d = drag; drag = null;
      if (ghost) { ghost.remove(); ghost = null; }
      if (!st || st.done) return;
      if (d.moved) { const tg = targetAt(e.clientX, e.clientY); if (tg) apply(d.item, tg); else say("Drop it onto a test tube" + (d.item.kind === "tube" ? " slot or the water bath." : ".")); }
      else tap(d.item);
    });
    el.addEventListener("pointercancel", () => { drag = null; if (ghost) { ghost.remove(); ghost = null; } });
    el.addEventListener("click", e => { if (e.detail === 0 && st && !st.done) tap(getItem()); });   // keyboard activation
    el.addEventListener("contextmenu", e => e.preventDefault());
  }
  function makeGhost(it) {
    const g = document.createElement("div"); g.className = "ft-ghost"; g.setAttribute("aria-hidden", "true");
    if (it.kind === "sample") g.innerHTML = jarIcon(FOODS[it.key].col, FOODS[it.key].op);
    else if (it.kind === "reagent") g.innerHTML = bottleIcon(REAG[it.key].col);
    else g.innerHTML = `<svg viewBox="0 0 28 28"><rect x="10" y="2" width="8" height="24" rx="4" fill="#fff" fill-opacity=".6" stroke="#8a96a3"/></svg>`;
    document.body.appendChild(g); return g;
  }
  function targetAt(x, y) {
    const el = document.elementFromPoint(x, y); if (!el) return null;
    const d = el.closest("[data-drop]"); if (!d) return null;
    return { drop: d.dataset.drop, i: d.dataset.tube != null ? +d.dataset.tube : -1 };
  }

  function tap(it) {
    if (st.recording != null) { st.recording = null; }
    if (it.kind === "tube") return tapTube(it.i);
    if (st.dropper) endDropper();
    if (st.held && st.held.kind === it.kind && st.held.key === it.key) st.held = null;
    else { st.held = it; BGX.sfx.tap(); say(it.kind === "sample" ? `Holding ${label(it.key)}: now tap a test tube (or drag it onto one).` : `Holding the ${REAG[it.key].name} bottle: now tap the test tube to add it to.`); }
    renderBar();
  }
  function tapTube(j) {
    if (st.dropper) { const same = st.dropper.i === j; endDropper(); if (same) return; }
    const h = st.held;
    if (h && h.kind !== "tube") return apply(h, { drop: "tube", i: j });
    if (h && h.kind === "tube") {
      if (h.i === j) { st.held = null; renderBar(); return; }
      if (st.tubes[j].inBath && !st.tubes[h.i].inBath) return apply(h, { drop: "bath", i: -1 });
    }
    st.held = { kind: "tube", i: j }; BGX.sfx.tap(); st.recording = null;
    say(st.tubes[j].sample ? `Tube ${j + 1} selected: use the buttons below the bench${st.tubes[j].inBath ? "" : ", or tap the water bath to heat it"}.` : `Tube ${j + 1} is empty. Put a food sample in it first.`);
    renderBar();
  }
  function tapBath() {
    if (!st || st.done) return;
    if (st.dropper) endDropper();
    const h = st.held;
    if (h && h.kind === "tube") return apply(h, { drop: "bath", i: -1 });
    if (h) return say("Put it in a test tube first: the water bath only heats tubes.");
    say("This is the hot water bath (about 90 °C). Drag a tube into it to heat the tube.");
  }
  function tapRack() {
    if (!st || st.done) return;
    if (st.dropper) endDropper();
    const h = st.held;
    if (h && h.kind === "tube" && st.tubes[h.i].inBath) return apply(h, { drop: "rack", i: -1 });
    if (h) { st.held = null; renderBar(); }
  }

  /* ---------------- actions ---------------- */
  function apply(it, tg) {
    if (st.dropper) endDropper();
    if (it.kind === "sample") {
      if (tg.drop === "tube") addSample(it.key, tg.i); else say("Put the food into a test tube first.");
    } else if (it.kind === "reagent") {
      if (tg.drop === "tube") startDropper(it.key, tg.i); else say("Reagents go into a test tube: drop the bottle onto a tube that has food in it.");
    } else if (it.kind === "tube") {
      const t = st.tubes[it.i];
      if (tg.drop === "bath" || (tg.drop === "tube" && st.tubes[tg.i] && st.tubes[tg.i].inBath && tg.i !== it.i)) toBath(it.i);
      else if ((tg.drop === "rack" || tg.drop === "tube") && t.inBath) fromBath(it.i);
      else { st.held = { kind: "tube", i: it.i }; }
    }
    renderBar();
  }
  function wrongStep(msg) { say(msg, 1); BGX.sfx.no(); return true; }
  function addSample(k, i) {
    const t = st.tubes[i];
    if (L.n === 1 && st.ti < 4 && i !== st.ti) return wrongStep(`Use tube ${st.ti + 1}, the glowing one, for this test.`);
    if (t.inBath) return wrongStep(`Tube ${i + 1} is in the water bath. Take it out first.`);
    if (t.sample) return wrongStep(`Tube ${i + 1} already has something in it. Use an empty tube, or tap it and Rinse it.`);
    t.sample = k; st.held = null; BGX.tone([330, 440], .05, "sine", .04, .04);
    say(`${label(k)} is in tube ${i + 1}. Next: add a reagent.`);
  }
  function startDropper(r, i) {
    const t = st.tubes[i], R = REAG[r];
    if (!t.sample) return wrongStep(`Tube ${i + 1} is empty. Put a food sample in first, then the reagent.`);
    if (t.inBath) return wrongStep(`Tube ${i + 1} is in the water bath. Add reagents before heating.`);
    if (L.n === 1 && st.ti < 4) {
      const test = TORDER[st.ti], want = test === "emulsion" && t.drops >= TESTS.emulsion.min && t.shaken ? "water" : TESTS[test].reagent;
      if (i !== st.ti) return wrongStep(`Use tube ${st.ti + 1}, the glowing one.`);
      if (r !== want) return wrongStep(want === "water" ? "Now the emulsion test needs distilled water." : r === "water" ? "Distilled water comes later: it's step 2 of the emulsion test." : `Not yet: this is the ${TESTS[test].full}, which uses ${REAG[want].name}.`);
    }
    if (r === "water") {
      if (t.test !== "emulsion") return wrongStep("Distilled water is step 2 of the emulsion test: use it only after ethanol and shaking.");
      if (!t.shaken) return wrongStep(`Shake the ethanol and food first (tap tube ${i + 1}, then Shake), so any fat dissolves in the ethanol.`);
    } else {
      if (t.test && t.test !== R.test) return wrongStep(`One test per tube: tube ${i + 1} already has ${REAG[TESTS[t.test].reagent].short} in it. Use a clean tube.`);
      if (t.recorded) return wrongStep(`Tube ${i + 1} is finished. Rinse it to use it again.`);
      if (t.test === "emulsion" && t.water) return wrongStep("The water is already in. Read the result now.");
      t.test = R.test;
    }
    st.dropper = { i, r }; st.held = null; BGX.sfx.tap();
    const T = TESTS[t.test];
    say(r === "water" ? `Hold Squeeze to add distilled water: about 10 drops (8–12).` : `Hold Squeeze to add ${R.short}: aim for ${T.min}–${T.max} drops.`);
  }
  function addDrop() {
    const d = st.dropper; if (!d) return;
    const t = st.tubes[d.i];
    const n = d.r === "water" ? t.water : t.drops;
    if (n >= 14) { say("The tube is full. Tap Done.", 1); st.squeeze = false; return; }
    if (d.r === "water") t.water++; else t.drops++;
    if (t.test === "benedict" && d.r !== "water") {} else if (d.r !== "water") t.dev = Math.min(t.dev, .6);
    st.fx.push({ x: rackCx(d.i), y: 64, to: 200 - 26 - (t.drops + t.water) * 3.6, col: REAG[d.r].col });
    BGX.tone([1150 + Math.random() * 120], .03, "sine", 0, .03);
    const c = $("#ft-dropn"); if (c) c.textContent = d.r === "water" ? t.water : t.drops;
  }
  function endDropper() {
    const d = st.dropper; if (!d) return;
    st.dropper = null; st.squeeze = false;
    const t = st.tubes[d.i], T = TESTS[t.test];
    const n = d.r === "water" ? t.water : t.drops, min = T.min;
    if (n === 0 && d.r !== "water") { t.test = null; say("No drops added: the bottle is back on the shelf."); }
    else if (n < min) say(`Only ${n} drop${n === 1 ? "" : "s"}: that may be too little to react fully. You can add more (drop the bottle on the tube again).`, 1);
    else if (n > T.max + 1) say(`${n} drops: more than needed (that wastes reagent), but it will still work.`);
    else say(d.r === "water" ? "Water added. Watch the tube." : T.heat ? `Good amount. Benedict's needs heat: drag tube ${d.i + 1} into the water bath.` : T.water ? `Good. Now tap tube ${d.i + 1} and press Shake.` : `Good amount. Watch the colour develop, then record it.`);
    renderBar();
  }
  function toBath(i) {
    const t = st.tubes[i];
    st.held = null;
    if (t.inBath) return;
    if (!t.sample) return wrongStep("That tube is empty: nothing to heat.");
    if (!t.test) return wrongStep("Add Benedict's solution first, then heat.");
    if (t.test === "iodine") return wrongStep("Iodine tests are done cold: heat breaks up the blue-black starch–iodine complex, so the colour would fade.");
    if (t.test === "emulsion") return wrongStep("Never heat ethanol: it's flammable. The emulsion test is done cold.");
    if (t.test === "biuret") return wrongStep("The biuret test works at room temperature: no heating needed.");
    const used = st.tubes.filter(x => x.inBath).map(x => x.slot);
    const s = [0, 1, 2, 3].find(v => !used.includes(v));
    if (s == null) return wrongStep("The water bath is full. Wait for a tube to finish.");
    t.inBath = true; t.slot = s; BGX.tone([260, 330], .08, "sine", .05, .04);
    say(`Tube ${i + 1} is in the hot water bath. Wait for the timer: 5 minutes (sped up here).`);
  }
  function fromBath(i) {
    const t = st.tubes[i]; t.inBath = false; t.slot = -1; st.held = null; BGX.sfx.tap();
    say(t.heat >= HEAT_S ? `Tube ${i + 1} is out of the bath, ready to read.` : `Taken out early: heating wasn't finished, so the colour may be weaker than it should be.`, t.heat < HEAT_S ? 1 : 0);
  }
  function shake(i) {
    const t = st.tubes[i]; t.shakeT = .8; BGX.tone([300, 360, 300], .04, "triangle", .03, .03);
    if (t.test === "emulsion" && t.drops > 0 && !t.water) { t.shaken = true; say(`Shaken: any fat in the food is now dissolved in the ethanol. Next: add distilled water to tube ${i + 1}.`); }
    else if (!t.test) say("Shaken. Add a reagent to test it.");
    else say("Shaken to mix.");
    renderBar();
  }
  function rinse(i) {
    if (st.recording === i) st.recording = null;
    if (st.dropper && st.dropper.i === i) st.dropper = null;
    st.tubes[i] = newTube(); st.held = null; BGX.tone([600, 500], .05, "sine", .03, .03);
    say(`Tube ${i + 1} rinsed and clean.`); renderBar();
  }
  function startRecord(i) {
    const t = st.tubes[i];
    if (!t.test) return wrongStep("Nothing to read yet: add a reagent first.");
    if (t.recorded) return wrongStep("Already recorded. Rinse the tube to reuse it.");
    if (t.test === "emulsion" && !t.water) return wrongStep("Not finished: the emulsion test needs Shake, then distilled water.");
    if (t.test === "benedict" && t.inBath && t.heat < HEAT_S) return wrongStep("Still heating: wait for the timer to finish.");
    if (L.n === 1 && t.test === "benedict" && t.heat < HEAT_S) return wrongStep("Benedict's must be heated first: drag the tube into the hot water bath.");
    if (t.test !== "benedict" && t.dev < .98) return wrongStep("The colour is still changing: give it a second.");
    st.recording = i; BGX.sfx.tap(); renderBar();
  }
  const tubeX = t => {
    const T = TESTS[t.test], F = FOODS[t.sample], lvl = F[T.nut], dose = Math.min(1, t.drops / T.min);
    if (t.test === "benedict") return lvl * dose * Math.min(1, t.heat / HEAT_S);
    if (t.test === "emulsion") return t.water ? lvl * dose * Math.min(1, t.water / T.min) * t.dev : 0;
    return lvl * dose * t.dev;
  };
  const answerOf = (test, x) => TESTS[test].bin ? (x >= .5 ? 1 : 0) : Math.round(x);
  function chooseRec(k, btn) {
    const i = st.recording, t = st.tubes[i], T = TESTS[t.test], x = tubeX(t);
    const xv = T.bin ? Math.min(1, x) : x;
    if (Math.abs(k - xv) <= .55) {
      const proper = t.drops >= T.min && (!T.heat || t.heat >= HEAT_S) && (!T.water || (t.shaken && t.water >= T.min));
      st.records[t.sample][t.test] = { ans: k, x, proper, heated: t.heat >= HEAT_S, drops: t.drops };
      t.recorded = true; st.recording = null; st.held = null;
      BGX.reward(true, btn);
      say(`Recorded: ${label(t.sample)}, ${T.name}: ${T.mean[k]}`);
      if (L.n === 1) st.ti = Math.min(4, st.ti + 1);
      renderTable(); renderConcBtns();
      const cell = $(`[data-cell="${t.sample}-${t.test}"]`); if (cell) { cell.classList.remove("is-new"); void cell.offsetWidth; cell.classList.add("is-new"); }
      if (L.n === 1 && st.ti === 4) renderConcl();
    } else {
      st.mistakes++; BGX.reward(false, btn, { flash: $("#ft-bar") });
      say(`Look again at tube ${i + 1}: that's not the colour it shows. Compare the tube with each swatch.`, 1);
    }
    renderBar();
  }
  function say(m, warn) { if (!st) return; st.msg = m; st.msgWarn = !!warn; st.msgUntil = m ? performance.now() + (L.n === 1 ? 3800 : 6000) : 0; st.tipKey = ""; }

  /* ---------------- context bar under the bench ---------------- */
  function tubeDesc(i) {
    const t = st.tubes[i];
    if (!t.sample) return `Tube ${i + 1}: empty`;
    let s = `Tube ${i + 1}: ${label(t.sample)}`;
    if (t.test) { const T = TESTS[t.test]; s += ` + ${REAG[T.reagent].short} (${t.drops} drop${t.drops === 1 ? "" : "s"})`; if (T.water) s += t.shaken ? (t.water ? ` + water (${t.water})` : ", shaken") : ""; if (T.heat) s += t.heat >= HEAT_S ? ", heated 5 min" : t.heat > 0 ? `, heated ${Math.round(t.heat / HEAT_S * 5 * 60 / 60 * 10) / 10} of 5 min` : ", not heated yet"; }
    if (t.recorded) s += " · recorded ✓";
    return s;
  }
  function renderBar() {
    const bar = $("#ft-bar"); if (!bar || !st) return;
    st.gk = "";
    if (st.done) { bar.innerHTML = ""; return; }
    if (st.dropper) {
      const d = st.dropper, t = st.tubes[d.i], R = REAG[d.r], T = TESTS[t.test];
      bar.innerHTML = `<p class="ft-what">${sw(R.col)}<b>${esc(R.name)}</b> dropper over tube ${d.i + 1}. Drops: <b id="ft-dropn" class="ft-dropn">${d.r === "water" ? t.water : t.drops}</b> <small>(aim ${d.r === "water" ? "8–12" : T.min + "–" + T.max})</small></p>
        <div class="ft-btns"><button class="lab-btn is-pour" id="ft-squeeze" type="button">Hold to squeeze</button><button class="lab-btn" id="ft-dropdone" type="button">Done</button></div>`;
      const sq = $("#ft-squeeze");
      const on = e => { e.preventDefault(); if (!st.dropper) return; st.squeeze = true; st.sqT = .38; sq.classList.add("is-on"); addDrop(); };
      const off = () => { if (!st) return; st.squeeze = false; sq.classList.remove("is-on"); };
      sq.addEventListener("pointerdown", on); ["pointerup", "pointerleave", "pointercancel"].forEach(ev => sq.addEventListener(ev, off));
      sq.addEventListener("click", e => { if (e.detail === 0) addDrop(); });
      sq.addEventListener("contextmenu", e => e.preventDefault());
      $("#ft-dropdone").onclick = () => endDropper();
      return;
    }
    if (st.recording != null) {
      const i = st.recording, T = TESTS[st.tubes[i].test];
      bar.innerHTML = `<p class="ft-what">Which colour is <b>tube ${i + 1}</b> (${esc(T.name)})? Look at the tube, then pick:</p>
        <div class="ft-opts">${T.opts.map((o, k) => `<button class="ft-opt" type="button" data-rec="${k}">${sw(o[1], o[2] === "Clear" ? " is-clear" : o[2] === "Cloudy" ? " is-cloud" : "")}${esc(o[0])}</button>`).join("")}</div>
        <div class="ft-btns"><button class="br-ghost ft-small" id="ft-reccancel" type="button">Cancel</button></div>`;
      bar.querySelectorAll("[data-rec]").forEach(b => b.onclick = () => chooseRec(+b.dataset.rec, b));
      $("#ft-reccancel").onclick = () => { st.recording = null; renderBar(); };
      return;
    }
    const h = st.held;
    if (h && h.kind === "tube") {
      const t = st.tubes[h.i];
      const btns = [];
      if (t.sample) {
        if (!t.inBath && !t.recorded) btns.push(`<button class="lab-btn" id="ft-shake" type="button">Shake</button>`);
        if (t.test === "benedict") btns.push(t.inBath ? `<button class="lab-btn" id="ft-out" type="button">Take out</button>` : `<button class="lab-btn" id="ft-heat" type="button">Into water bath</button>`);
        if (t.test && !t.recorded) btns.push(`<button class="lab-btn is-rec" id="ft-record" type="button">Record result</button>`);
        btns.push(`<button class="lab-btn" id="ft-rinse" type="button">Rinse</button>`);
      }
      bar.innerHTML = `<p class="ft-what" id="ft-tdesc">${esc(tubeDesc(h.i))}</p><div class="ft-btns">${btns.join("")}<button class="br-ghost ft-small" id="ft-put" type="button">Put down</button></div>`;
      const on = (id, f) => { const b = $(id); if (b) b.onclick = f; };
      on("#ft-shake", () => shake(h.i)); on("#ft-heat", () => { toBath(h.i); renderBar(); }); on("#ft-out", () => { fromBath(h.i); renderBar(); });
      on("#ft-record", () => startRecord(h.i)); on("#ft-rinse", () => rinse(h.i)); on("#ft-put", () => { st.held = null; renderBar(); });
      return;
    }
    if (h) {
      const nm = h.kind === "sample" ? label(h.key) : REAG[h.key].name;
      bar.innerHTML = `<p class="ft-what">Holding <b>${esc(nm)}</b>: tap a test tube to put it in.</p><div class="ft-btns"><button class="br-ghost ft-small" id="ft-put" type="button">Put back</button></div>`;
      $("#ft-put").onclick = () => { st.held = null; renderBar(); };
      return;
    }
    bar.innerHTML = `<p class="ft-what is-idle">Drag a sample or bottle onto a tube, or tap a tube to Shake, Heat, Record or Rinse it.</p>`;
  }

  /* ---------------- results table ---------------- */
  function renderTable() {
    const cols = L.n === 3 ? ["benedict"] : TORDER;
    const rows = st.samples;
    const cell = (k, test) => {
      const r = st.records[k][test], T = TESTS[test];
      if (!r) return `<td data-cell="${k}-${test}" class="is-empty">–</td>`;
      const o = T.opts[r.ans];
      return `<td data-cell="${k}-${test}">${sw(o[1], o[2] === "Clear" ? " is-clear" : o[2] === "Cloudy" ? " is-cloud" : "")}<span>${esc(o[2])}</span>${L.n === 3 ? `<small>${esc(AMOUNT[r.ans])}</small>` : ""}</td>`;
    };
    $("#ft-table").innerHTML = `<table class="ft-table"><thead><tr><th>Food</th>${cols.map(c => `<th>${esc(TESTS[c].name)}<small>${esc(TESTS[c].nutName)}</small></th>`).join("")}</tr></thead>
      <tbody>${rows.map(k => `<tr><th>${esc(label(k))}${k === "water" ? "<small>control</small>" : ""}</th>${cols.map(c => cell(k, c)).join("")}</tr>`).join("")}</tbody></table>`;
  }
  function renderConcBtns() {
    const box = $("#ft-concbtns"); if (!box || st.concl) { if (box) box.innerHTML = ""; return; }
    if (L.n === 1) { box.innerHTML = ""; return; }
    let ok, txt, why;
    if (L.n === 2) { ok = Object.keys(st.records[st.unknown]).length > 0; txt = "Conclude: what's in Unknown X?"; why = "Record at least one test on Unknown X first."; }
    else { const left = st.foods.filter(k => !st.records[k].benedict).length; ok = left === 0; txt = "Rank the foods"; why = `Record Benedict's for every food first (${left} to go).`; }
    box.innerHTML = `<button class="br-next" id="ft-conclude" type="button"${ok ? "" : " disabled"}>${txt}</button>${ok ? "" : `<p class="ft-note">${why}</p>`}`;
    const b = $("#ft-conclude"); if (b) b.onclick = () => renderConcl();
  }

  /* ---------------- conclusions ---------------- */
  function renderConcl() {
    st.concl = true; renderConcBtns();
    const box = $("#ft-concl");
    if (L.n < 3) {
      const nm = label(st.food);
      box.innerHTML = `<div class="ft-concl"><p class="br-label">Conclusion</p>
        <p>Which nutrients does <b>${esc(nm)}</b> contain? Use your results table and tick every nutrient that tested positive (tick none if every test stayed unchanged).</p>
        <div class="ft-togs">${NUTS.map(([k, n]) => `<button class="ft-tog" type="button" data-nut="${k}" aria-pressed="false">${esc(n)}</button>`).join("")}</div>
        ${L.n === 2 ? `<p style="margin-top:14px">Why did you also run tests on plain <b>water</b>?</p><div class="ft-mcq">${st.cq.map((o, k) => `<button class="ft-tog is-wide" type="button" data-cq="${k}" aria-pressed="false">${esc(o[0])}</button>`).join("")}</div>` : ""}
        <div class="lab-controls"><button class="br-next" id="ft-submit" type="button">Check my conclusion</button></div>
        ${L.n === 2 ? `<p class="ft-note">You can keep testing on the bench before you check.</p>` : ""}</div>`;
      box.querySelectorAll("[data-nut]").forEach(b => b.onclick = () => { BGX.sfx.tap(); b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
      box.querySelectorAll("[data-cq]").forEach(b => b.onclick = () => { BGX.sfx.tap(); box.querySelectorAll("[data-cq]").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false")); });
      $("#ft-submit").onclick = () => submit();
    } else {
      st.rank = [];
      box.innerHTML = `<div class="ft-concl"><p class="br-label">Rank and interpret</p>
        <p>Tap the foods in order from <b>most</b> reducing sugar to <b>least</b>. Use your Benedict's colours.</p>
        <div class="ft-togs" id="ft-rank">${st.foods.map(k => `<button class="ft-tog" type="button" data-rk="${k}" aria-pressed="false"><span class="ft-rn"></span>${esc(FOODS[k].name)}</button>`).join("")}</div>
        <div class="lab-controls"><button class="br-ghost ft-small" id="ft-rkreset" type="button">Start the order again</button></div>
        <p style="margin-top:12px">Table sugar is full of sugar, yet its Benedict's tube stayed <b>blue</b>. What does that tell you?</p>
        <div class="ft-mcq">${st.tq.map((o, k) => `<button class="ft-tog is-wide" type="button" data-tq="${k}" aria-pressed="false">${esc(o[0])}</button>`).join("")}</div>
        <div class="lab-controls"><button class="br-next" id="ft-submit" type="button">Check my answers</button></div></div>`;
      const paint = () => box.querySelectorAll("[data-rk]").forEach(b => { const p = st.rank.indexOf(b.dataset.rk); b.setAttribute("aria-pressed", p >= 0 ? "true" : "false"); b.querySelector(".ft-rn").textContent = p >= 0 ? (p + 1) + "." : ""; });
      box.querySelectorAll("[data-rk]").forEach(b => b.onclick = () => { BGX.sfx.tap(); const k = b.dataset.rk; const p = st.rank.indexOf(k); if (p >= 0) st.rank.splice(p, 1); else st.rank.push(k); paint(); });
      $("#ft-rkreset").onclick = () => { st.rank = []; paint(); };
      box.querySelectorAll("[data-tq]").forEach(b => b.onclick = () => { BGX.sfx.tap(); box.querySelectorAll("[data-tq]").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false")); });
      $("#ft-submit").onclick = () => submit();
    }
    box.scrollIntoView({ behavior: BGX.RM ? "auto" : "smooth", block: "nearest" });
  }
  const CQ = [["It shows what \"no change\" looks like, so a faint colour in the food can be told apart from the reagent's own colour.", true],
    ["Water contains a little of every nutrient.", false], ["It makes the reagents react faster.", false], ["It dilutes the unknown food so the colours are stronger.", false]];
  const TQ = [["Sucrose is not a reducing sugar, so Benedict's can't detect it until it is broken into glucose and fructose.", true],
    ["Table sugar doesn't really contain any sugar.", false], ["The water bath wasn't hot enough for table sugar.", false], ["Sucrose is a protein, so it needs the biuret test.", false]];

  function submit() {
    const box = $("#ft-concl"), fb = $("#lab-fb");
    if (L.n < 3) {
      const picked = {}; box.querySelectorAll("[data-nut]").forEach(b => picked[b.dataset.nut] = b.getAttribute("aria-pressed") === "true");
      let cq = -1; box.querySelectorAll("[data-cq]").forEach(b => { if (b.getAttribute("aria-pressed") === "true") cq = +b.dataset.cq; });
      if (L.n === 2 && cq < 0) { fb.innerHTML = `<p class="no">Answer the question about the water control too.</p>`; return; }
      finish({ picked, cq });
    } else {
      let tq = -1; box.querySelectorAll("[data-tq]").forEach(b => { if (b.getAttribute("aria-pressed") === "true") tq = +b.dataset.tq; });
      if (st.rank.length < st.foods.length || tq < 0) { fb.innerHTML = `<p class="no">${st.rank.length < st.foods.length ? "Put all the foods in order" : "Answer the table-sugar question"} first.</p>`; return; }
      finish({ rank: st.rank.slice(), tq });
    }
  }

  function finish(a) {
    st.done = true; st.held = null; st.dropper = null; st.recording = null; renderBar();
    view.querySelectorAll("#ft-concl button, #lab-hintbtn, .ft-chip, #ft-conclude").forEach(b => b.disabled = true);
    const F = FOODS[st.food || "water"];
    let n0 = 0, verdict = "", why = "", extra = "";
    if (L.n < 3) {
      K.setStep(4);
      const truth = {}; NUTS.forEach(([k]) => truth[k] = (FOODS[st.food][k] || 0) > 0);
      const wrongN = NUTS.filter(([k]) => truth[k] !== a.picked[k]);
      const has = NUTS.filter(([k]) => truth[k]).map(([, n]) => n.toLowerCase());
      const hasTxt = has.length ? has.join(", ").replace(/, ([^,]*)$/, " and $1") : "none of the four nutrients tested";
      const recs = st.records[st.food];
      const lines = TORDER.map(test => {
        const T = TESTS[test], r = recs[test], lvl = FOODS[st.food][T.nut];
        if (!r) return `<li><b>${T.name}:</b> not run. ${lvl ? `It would have turned ${T.opts[Math.min(T.opts.length - 1, T.bin ? 1 : lvl)][2].toLowerCase()}: ${T.nutName} present.` : `It would have stayed unchanged: no ${T.nutName}.`}</li>`;
        let s = `<li><b>${T.name}:</b> ${esc(T.mean[r.ans])}`;
        if (!r.proper && test === "benedict" && !r.heated) s += ` <span class="no">But the tube was never fully heated, so it couldn't change colour.</span>${lvl ? " Heated properly it shows reducing sugar." : ""}`;
        else if (!r.proper) s += ` <span class="no">Too few drops, so the reaction may have been weak.</span>`;
        return s + "</li>";
      }).join("");
      if (L.n === 1) {
        const ok = wrongN.length === 0;
        n0 = !ok ? 1 : st.mistakes === 0 ? 3 : st.mistakes <= 2 ? 2 : 1;
        verdict = ok ? (n0 === 3 ? "Spot-on lab work!" : "Right conclusion.") : "Not quite.";
        why = `<b>${esc(F.name)}</b> contains ${hasTxt}. ${ok ? "" : `Your answer was wrong about <b>${wrongN.map(([, n]) => n.toLowerCase()).join(", ")}</b>: tick a nutrient only when its test changed colour. `}${st.mistakes ? `You picked a colour that didn't match the tube ${st.mistakes} time${st.mistakes === 1 ? "" : "s"}: hold the swatches next to the tube in your mind and pick the closest.` : "Every colour was recorded correctly."}`;
        extra = `<ul class="ft-why">${lines}</ul>` + tubesFig([{ k: st.food, name: F.name }]);
      } else {
        const ok = wrongN.length === 0;
        const ranAll = TORDER.every(t => recs[t] && recs[t].proper);
        const ctrl = Object.keys(st.records.water).length > 0, cqOk = st.cq[a.cq][1];
        let n = ok ? 3 : wrongN.length === 1 ? 1 : 0;
        if (ok) { if (!ranAll) n--; if (!(ctrl && cqOk)) n--; if (st.mistakes > 1) n--; n = Math.max(1, n); }
        n0 = n;
        verdict = ok ? (n0 === 3 ? "Mystery solved!" : "Right nutrients.") : n0 ? "One nutrient off." : "Not this time.";
        const notes = [];
        if (!ranAll) notes.push(`Not every test was run properly on Unknown X (${TORDER.filter(t => !(recs[t] && recs[t].proper)).map(t => TESTS[t].name).join(", ")}). Run all four, with enough drops, and heat Benedict's for the full time.`);
        if (!ctrl) notes.push("You didn't test water. A control shows the reagent's own colour, which makes faint results (pale lilac, slight green) easy to judge.");
        if (!cqOk) notes.push("The water control is there to show what \"no change\" looks like: water has no nutrients, so any difference in the food's tube is a real positive.");
        if (st.mistakes > 1) notes.push(`You picked a colour that didn't match a tube ${st.mistakes} times.`);
        why = `Unknown X was <b>${esc(F.name.toLowerCase())}</b>, which contains ${hasTxt}. ${ok ? "" : `Your conclusion was wrong about <b>${wrongN.map(([, nm]) => nm.toLowerCase()).join(", ")}</b>. `}${notes.length ? notes.join(" ") : "You ran every test properly and used a water control: textbook method."}`;
        extra = `<ul class="ft-why">${lines}</ul>` + tubesFig([{ k: st.food, name: "Unknown X" }, { k: "water", name: "Water (control)" }]);
      }
    } else {
      const order = st.foods.slice().sort((x, y) => FOODS[y].r - FOODS[x].r);
      const rankOk = a.rank.every((k, i) => k === order[i]);
      const tqOk = st.tq[a.tq][1];
      const improper = st.foods.filter(k => !st.records[k].benedict || !st.records[k].benedict.proper);
      let n = 3; if (!rankOk) n--; if (!tqOk) n--; if (st.mistakes > 1 || improper.length) n--;
      n0 = Math.max(rankOk || tqOk ? 1 : 0, n);
      verdict = n0 === 3 ? "Sugar sleuth!" : n0 === 2 ? "Nearly there." : n0 ? "Partly right." : "Not this time.";
      const notes = [];
      notes.push(rankOk ? `Your ranking was right: ${order.map(k => FOODS[k].name).join(" > ")}.` : `The right order is ${order.map(k => `${FOODS[k].name} (${TESTS.benedict.opts[FOODS[k].r][2].toLowerCase()})`).join(" > ")}. Rank by the colour scale: brick-red > orange > yellow > green > blue.`);
      notes.push(tqOk ? "And you avoided the trap: sucrose is a <b>non-reducing</b> sugar." : "The trap: table sugar (sucrose) is a <b>non-reducing</b> sugar, so it stays blue even though it is pure sugar.");
      notes.push("In sucrose, glucose and fructose are joined through the very groups that would reduce the copper ions, so there's nothing left to react. Boil it with dilute acid first (hydrolysis), neutralise, and Benedict's turns positive.");
      if (improper.length) notes.push(`Fair test: ${improper.map(k => FOODS[k].name).join(", ")} ${improper.length === 1 ? "was" : "were"} not tested properly (too few drops or not heated for the full 5 minutes), which makes the colours unfair to compare.`);
      if (st.mistakes > 1) notes.push(`You picked a colour that didn't match a tube ${st.mistakes} times.`);
      why = notes.join(" ");
      extra = ladderFig();
    }
    const n = K.capStars(n0);
    why += esc(K.capNote(n0));
    if (L.n === 1) K.setStep(5);
    K.result({ n, verdict, why, extraHTML: extra, levels: LEVELS, onLevel: start, onMenu: menu });
  }

  /* result figures */
  function idealTube(k, test) { return { sample: k, test, drops: TESTS[test].min, water: TESTS[test].water ? TESTS[test].min : 0, shaken: true, heat: HEAT_S, dev: 1 }; }
  function miniTube(x, y, t) {
    const L2 = tubeLook(t), h = 22 + 30, ly = y + 70 - h, x0 = x - 7;
    const liq = `M${x0 + 1.3} ${ly} V${y + 63} A5.7 5.7 0 0 0 ${x0 + 12.7} ${y + 63} V${ly} Z`;
    return `<path d="${liq}" fill="${L2.col}" opacity="${L2.op}"/>${L2.cloud ? `<path d="${liq}" fill="#fbfbf7" opacity="${L2.cloud}"/>` : ""}${L2.ppt ? `<path d="M${x0 + 2} ${y + 65} Q${x} ${y + 71} ${x0 + 12} ${y + 65} Z" fill="#9E3420" opacity="${L2.ppt}"/>` : ""}
      <path d="M${x0} ${y} V${y + 63} A7 7 0 0 0 ${x0 + 14} ${y + 63} V${y}" fill="url(#ft-glass2)" stroke="#8a96a3" stroke-width="1.2"/>`;
  }
  function tubesFig(rows) {
    const W = 320, rh = 116;
    let s = "";
    rows.forEach((r, ri) => {
      const y0 = 8 + ri * rh;
      s += `<text x="4" y="${y0 + 40}" font-size="11" font-weight="700" fill="var(--ink)" font-family="var(--font-display, inherit)">${esc(r.name)}</text>`;
      TORDER.forEach((test, ti) => {
        const x = 128 + ti * 52, T = TESTS[test], lvl = FOODS[r.k][T.nut];
        s += miniTube(x, y0, idealTube(r.k, test));
        s += `<text x="${x}" y="${y0 + 88}" text-anchor="middle" font-size="9" fill="var(--muted)" font-family="var(--font-mono)">${esc(T.name)}</text>`;
        s += `<text x="${x}" y="${y0 + 100}" text-anchor="middle" font-size="9" font-weight="700" fill="${lvl ? "var(--good)" : "var(--muted)"}" font-family="var(--font-mono)">${lvl ? "✓ " : "✗ "}${esc(NUTS.find(n => n[0] === T.nut)[1].replace("Reducing sugar", "Sugar"))}</text>`;
      });
    });
    return `<figure class="lab-curve ft-fig"><svg viewBox="0 0 ${W} ${8 + rows.length * rh}" role="img" aria-label="What each test looks like for this food, done properly">
      <defs><linearGradient id="ft-glass2" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".3" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/></linearGradient></defs>${s}</svg>
      <figcaption>Each test done properly${rows.length > 1 ? ", with the water control underneath. Any tube that differs from the water's is a positive" : ""}. ✓ means the nutrient is present.</figcaption></figure>`;
  }
  function ladderFig() {
    const W = 320, cols = TESTS.benedict.cols, seg = (W - 20) / 5;
    let s = cols.map((c, i) => `<rect x="${10 + i * seg}" y="10" width="${seg}" height="26" fill="${c}"/><text x="${10 + i * seg + seg / 2}" y="50" text-anchor="middle" font-size="9" fill="var(--muted)" font-family="var(--font-mono)">${TESTS.benedict.opts[i][2].toLowerCase()}</text><text x="${10 + i * seg + seg / 2}" y="61" text-anchor="middle" font-size="9" fill="var(--muted)" font-family="var(--font-mono)">${["none", "trace", "low", "medium", "high"][i]}</text>`).join("");
    const by = {}; st.foods.concat(["water"]).forEach(k => { const v = FOODS[k].r; (by[v] = by[v] || []).push(k); });
    let maxN = 1;
    Object.keys(by).forEach(v => { maxN = Math.max(maxN, by[v].length); by[v].forEach((k, j) => {
      const x = 10 + v * seg + seg / 2, y = 80 + j * 14;
      s += `<circle cx="${x}" cy="${y - 3}" r="3" fill="${cols[v]}" stroke="var(--ink)" stroke-width=".6"/><text x="${x}" y="${y + 9}" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--ink)">${esc(FOODS[k].name.replace("Glucose sports drink", "Sports drink").replace("White grape juice", "Grape juice").replace("White bread", "Bread").replace("Table sugar", "Sugar"))}</text>`;
    }); });
    return `<figure class="lab-curve ft-fig"><svg viewBox="0 0 ${W} ${80 + maxN * 14 + 12}" role="img" aria-label="Benedict's colour scale with each food placed on it">${s}</svg>
      <figcaption>Benedict's as a rough sugar meter (all samples prepared the same way). More reducing sugar makes more orange-red copper(I) oxide, so the colour moves along the scale. Table sugar sits at "none" because sucrose isn't a reducing sugar.</figcaption></figure>`;
  }

  /* ---------------- look of a tube ---------------- */
  function tubeLook(t) {
    const F = FOODS[t.sample];
    if (!t.test) return { col: F.col, op: F.op };
    const T = TESTS[t.test], x = tubeX(t);
    if (t.test === "emulsion") return { col: mix(F.col, "#EEF3F7", .55), op: Math.max(.3, F.op * .6), cloud: t.water ? lerpN([0, .55, .78, .93], x) : 0 };
    return { col: mix(ladder(T.cols, x), F.col, .15 * F.op), op: .92, ppt: t.test === "benedict" && x > 2.6 ? Math.min(1, (x - 2.6) / 1.2) : 0 };
  }
  function tubeSVG(t, i, cx, now) {
    const x0 = cx - 8, top = 66, bot = 200;
    const sel = st.held && st.held.kind === "tube" && st.held.i === i;
    let o = "";
    if (st.guide.tube === i) o += `<rect x="${cx - 15}" y="${top - 8}" width="30" height="${bot - top + 16}" rx="12" fill="var(--accent)" opacity="${(.16 + .14 * Math.sin(now / 200)).toFixed(2)}"/>`;
    if (t.sample) {
      const lk = tubeLook(t), h = 26 + (t.drops + t.water) * 3.6, ly = (bot - h).toFixed(1);
      const liq = `M${x0 + 1.5} ${ly} V${bot - 8} A6.5 6.5 0 0 0 ${x0 + 14.5} ${bot - 8} V${ly} Z`;
      o += `<path d="${liq}" fill="${lk.col}" opacity="${lk.op}"/>`;
      if (lk.cloud) o += `<path d="${liq}" fill="#fbfbf7" opacity="${lk.cloud.toFixed(2)}"/>`;
      if (lk.ppt) o += `<path d="M${x0 + 2} ${bot - 5} Q${cx} ${bot + 1} ${x0 + 14} ${bot - 5} Z" fill="#9E3420" opacity="${lk.ppt.toFixed(2)}"/>`;
      if (t.inBath && t.test === "benedict" && t.heat < HEAT_S && !BGX.RM) { const b = (now / 300 + i) % 1; o += `<circle cx="${cx + Math.sin(now / 150 + i) * 3}" cy="${(bot - 10 - b * (h - 14)).toFixed(1)}" r="1.4" fill="#fff" opacity=".7"/>`; }
      o += `<path d="M${x0 + 1.5} ${ly} Q${cx} ${(+ly + 2.5).toFixed(1)} ${x0 + 14.5} ${ly}" stroke="#fff" stroke-opacity=".75" stroke-width="1" fill="none"/>`;
    }
    if (st.guide.band === i) {
      const T = TESTS[t.test || TORDER[Math.min(3, st.ti)]], base = t.water || (st.dropper && st.dropper.r === "water") ? t.drops : 0;
      const y1 = bot - 26 - (base + T.min) * 3.6, y2 = bot - 26 - (base + T.max) * 3.6;
      o += `<rect x="${x0 - 3}" y="${y2.toFixed(1)}" width="22" height="${(y1 - y2).toFixed(1)}" fill="#2fb67c" opacity=".22"/><path d="M${x0 - 4} ${y1.toFixed(1)} H${x0 + 20}" stroke="#1e8a4c" stroke-width="1.4" stroke-dasharray="3 2"/>`;
    }
    o += `<path d="M${x0} ${top} V${bot - 8} A8 8 0 0 0 ${x0 + 16} ${bot - 8} V${top}" fill="url(#ft-glass)" stroke="${sel ? "var(--accent)" : "#8a96a3"}" stroke-width="${sel ? 2.6 : 1.3}"/>`;
    o += `<rect x="${x0 - 2}" y="${top - 3}" width="20" height="4" rx="2" fill="${sel ? "var(--accent)" : "#a9b4bf"}"/>`;
    o += `<text x="${cx}" y="241" text-anchor="middle" font-size="12" font-weight="800" font-family="var(--font-mono)" fill="${sel ? "var(--accent)" : "var(--muted)"}">${i + 1}</text>`;
    if (t.recorded && !t.inBath) o += `<text x="${cx}" y="${top - 8}" text-anchor="middle" font-size="12" font-weight="800" fill="var(--good)">✓</text>`;
    if (t.inBath && t.test === "benedict") {
      const done = t.heat >= HEAT_S, rem = Math.max(0, Math.ceil((1 - t.heat / HEAT_S) * 300));
      o += done ? `<circle cx="${cx}" cy="48" r="8" fill="var(--good)"/><text x="${cx}" y="52" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">✓</text>`
        : `<rect x="${cx - 13}" y="41" width="26" height="14" rx="7" fill="var(--surface)" stroke="var(--line)"/>
        <text x="${cx}" y="51" text-anchor="middle" font-size="8.5" font-weight="700" font-family="var(--font-mono)" fill="var(--ink)">${Math.floor(rem / 60) + ":" + String(rem % 60).padStart(2, "0")}</text>`;
    }
    return o;
  }

  /* ---------------- level 1 guide ---------------- */
  function l1Guide() {
    const ti = st.ti;
    if (ti >= 4) return { step: 4, g: {}, tip: st.done ? "" : "<b>Step 5.</b> All four tests recorded. Now decide which nutrients the food contains (below the results table)." };
    const test = TORDER[ti], T = TESTS[test], t = st.tubes[ti], fn = FOODS[st.food].name, R = REAG[T.reagent], h = st.held;
    const head = `<b>Test ${ti + 1} of 4: ${T.full}</b> (${T.nutName}). `;
    if (!t.sample) return { step: 0, g: h && h.kind === "sample" ? { tube: ti } : { sample: st.food }, tip: head + (h && h.kind === "sample" ? `Now tap the glowing <b>tube ${ti + 1}</b>.` : `Drag the <b>${esc(fn)}</b> into the glowing tube ${ti + 1} (or tap it, then the tube).`) };
    if (t.drops < T.min || (st.dropper && st.dropper.r !== "water")) {
      if (st.dropper) return { step: 1, g: t.drops < T.min ? { btn: "#ft-squeeze", band: ti } : { btn: "#ft-dropdone", band: ti }, tip: head + (t.drops < T.min ? `Hold <b>Squeeze</b> (or tap it for single drops) until the liquid reaches the green band: ${T.min}–${T.max} drops.` : `Enough ${R.short}. Tap <b>Done</b> to put the bottle back.`) };
      return { step: 1, g: h && h.kind === "reagent" ? { tube: ti } : { reagent: T.reagent }, tip: head + (h && h.kind === "reagent" ? `Now tap tube ${ti + 1}.` : `Drag the <b>${R.name}</b> bottle onto tube ${ti + 1} (or tap it, then the tube).`) };
    }
    if (test === "benedict" && t.heat < HEAT_S) {
      if (t.inBath) return { step: 2, g: {}, tip: head + "Heating in the water bath: watch the timer and the colour. Benedict's only reacts when hot." };
      return { step: 2, g: h && h.kind === "tube" && h.i === ti ? { bath: 1, btn: "#ft-heat" } : { tube: ti }, tip: head + (h && h.kind === "tube" ? "Now tap the <b>water bath</b> (or press Into water bath)." : `Benedict's needs heat. Drag tube ${ti + 1} into the hot water bath (or tap the tube, then the bath).`) };
    }
    if (test === "emulsion" && !t.shaken) return { step: 2, g: h && h.kind === "tube" && h.i === ti ? { btn: "#ft-shake" } : { tube: ti }, tip: head + (h && h.kind === "tube" ? "Press <b>Shake</b>: any fat dissolves in the ethanol." : `Tap tube ${ti + 1}, then press <b>Shake</b> to dissolve any fat in the ethanol.`) };
    if (test === "emulsion" && (t.water < T.min || st.dropper)) {
      if (st.dropper) return { step: 2, g: t.water < T.min ? { btn: "#ft-squeeze", band: ti } : { btn: "#ft-dropdone" }, tip: head + (t.water < T.min ? `Squeeze in about 10 drops of <b>distilled water</b> (8–12). Fat makes tiny white droplets: an emulsion.` : "Enough water. Tap <b>Done</b>.") };
      return { step: 2, g: h && h.kind === "reagent" ? { tube: ti } : { reagent: "water" }, tip: head + (h && h.kind === "reagent" ? `Now tap tube ${ti + 1}.` : `Now drag the <b>Distilled water</b> bottle onto tube ${ti + 1}.`) };
    }
    if (test !== "benedict" && t.dev < .98) return { step: 3, g: {}, tip: head + "Watch the tube: the colour is developing…" };
    if (st.recording === ti) return { step: 3, g: {}, tip: head + "Pick the swatch that matches the tube's colour." };
    return { step: 3, g: h && h.kind === "tube" && h.i === ti ? { btn: "#ft-record" } : { tube: ti }, tip: head + (h && h.kind === "tube" ? "Press <b>Record result</b>." : `Done! Look at tube ${ti + 1}, tap it, then press <b>Record result</b>.`) };
  }
  function defaultTip() {
    if (L.n === 2) {
      const done = TORDER.filter(t => st.records[st.unknown][t]).length, ctrl = Object.keys(st.records.water).length;
      return `Unknown X: <b>${done} of 4</b> tests recorded · water control: <b>${ctrl ? ctrl + " recorded" : "not yet"}</b>. ${done === 4 && ctrl ? "Ready to conclude." : ""}`;
    }
    const left = st.foods.filter(k => !st.records[k].benedict).length;
    return left ? `Benedict's on every food: <b>${st.foods.length - left} of ${st.foods.length}</b> recorded. Same drops, full 5 minutes in the bath for each.` : "All foods recorded: press <b>Rank the foods</b>.";
  }

  /* ---------------- loop ---------------- */
  function loop(now) {
    if (!st) return;
    const dt = Math.min(.05, (now - st.t) / 1000); st.t = now;
    if (!st.done) {
      if (st.squeeze && st.dropper) { st.sqT -= dt; if (st.sqT <= 0) { st.sqT = .22; addDrop(); } }
      st.tubes.forEach(t => {
        if (t.inBath && t.test === "benedict") t.heat = Math.min(HEAT_S, t.heat + dt);
        if (t.test && t.test !== "benedict" && t.drops > 0 && (t.test !== "emulsion" || t.water > 0)) t.dev = Math.min(1, t.dev + dt * .9);
        t.shakeT = Math.max(0, t.shakeT - dt);
      });
    }
    st.fx.forEach(d => d.y += 280 * dt); st.fx = st.fx.filter(d => d.y < d.to);
    // guide + tip
    let tip = "";
    if (L.n === 1 && !st.done) { const gd = l1Guide(); st.guide = gd.g; K.setStep(gd.step); tip = gd.tip; }
    else { st.guide = {}; if (!st.done) tip = defaultTip(); }
    if (st.msg && now < st.msgUntil) tip = (st.msgWarn ? "<b class=\"ft-warn\">!</b> " : "") + st.msg + (L.n === 1 ? `<br><span class="ft-sub">${tip}</span>` : "");
    if (tip !== st.tipKey) { st.tipKey = tip; const el = $("#lab-hint"); if (el) el.innerHTML = tip; }
    const gk = JSON.stringify(st.guide);
    if (gk !== st.gk) {
      st.gk = gk; const g = st.guide;
      view.querySelectorAll(".ft-glow").forEach(e => e.classList.remove("ft-glow"));
      if (g.sample) { const e = $(`[data-sample="${g.sample}"]`); if (e) e.classList.add("ft-glow"); }
      if (g.reagent) { const e = $(`[data-reagent="${g.reagent}"]`); if (e) e.classList.add("ft-glow"); }
      if (g.btn) { const e = $(g.btn); if (e) e.classList.add("ft-glow"); }
    }
    view.querySelectorAll(".ft-chip").forEach(c => { const k = c.dataset.sample || c.dataset.reagent, kind = c.dataset.sample ? "sample" : "reagent"; c.classList.toggle("is-held", !!(st.held && st.held.kind === kind && st.held.key === k) || !!(st.dropper && kind === "reagent" && st.dropper.r === k)); });
    // held tube description (timer text changes)
    const td = $("#ft-tdesc"); if (td && st.held && st.held.kind === "tube") { const s = tubeDesc(st.held.i); if (td.textContent !== s) td.textContent = s; }
    draw(now);
    raf = requestAnimationFrame(loop);
  }
  function draw(now) {
    const g = $("#ft-dyn"); if (!g) return;
    let s = "";
    st.tubes.forEach((t, i) => { const cx = tubeCx(t, i) + (t.shakeT > 0 && !BGX.RM ? Math.sin(now / 22) * 2.4 : 0); s += tubeSVG(t, i, cx, now); });
    st.fx.forEach(d => { s += `<ellipse cx="${d.x}" cy="${d.y.toFixed(1)}" rx="2.4" ry="3.2" fill="${d.col}" stroke="#7d8a96" stroke-width=".4"/>`; });
    g.innerHTML = s;
    let top = "";
    if (st.dropper) {
      const cx = rackCx(st.dropper.i), R = REAG[st.dropper.r], sq = st.squeeze;
      top += `<g aria-hidden="true"><ellipse cx="${cx}" cy="${sq ? 15 : 13}" rx="${sq ? 8.5 : 7}" ry="${sq ? 6.5 : 10}" fill="#3b3f46"/>
        <rect x="${cx - 3}" y="22" width="6" height="34" rx="2" fill="url(#ft-glass)" stroke="#8a96a3"/><rect x="${cx - 2}" y="34" width="4" height="22" fill="${R.col}" opacity=".95"/>
        <path d="M${cx - 3} 56 L${cx - 1} 64 H${cx + 1} L${cx + 3} 56 Z" fill="${R.col}" stroke="#8a96a3" stroke-width=".6"/>
        <text x="${cx + 11}" y="20" font-size="10" font-weight="700" fill="var(--ink)" font-family="var(--font-mono)">${esc(R.short)}</text></g>`;
    }
    $("#ft-top").innerHTML = top;
    $("#ft-bathglow").innerHTML = st.guide.bath ? `<rect x="223" y="117" width="134" height="100" rx="8" fill="none" stroke="var(--accent)" stroke-width="3" opacity="${(.5 + .4 * Math.sin(now / 200)).toFixed(2)}"/>` : "";
    st.tubes.forEach((t, i) => { const r = view.querySelector(`[data-tube="${i}"]`), x = tubeCx(t, i) - (t.inBath ? 14 : 16); if (r && +r.getAttribute("x") !== x) { r.setAttribute("x", x); r.setAttribute("width", t.inBath ? 28 : 32); } });
  }

  /* keyboard */
  document.addEventListener("keydown", e => {
    if (!st || st.done || document.querySelector(".br-milestone")) return;
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.code === "Space" && st.dropper) { e.preventDefault(); if (!st.squeeze) { st.squeeze = true; st.sqT = .38; addDrop(); const b = $("#ft-squeeze"); if (b) b.classList.add("is-on"); } }
    else if (e.key === "Enter" && st.dropper) { e.preventDefault(); endDropper(); }
    else if (e.key === "Escape") { st.held = null; st.recording = null; if (st.dropper) endDropper(); renderBar(); }
  });
  document.addEventListener("keyup", e => { if (st && e.code === "Space") { st.squeeze = false; const b = $("#ft-squeeze"); if (b) b.classList.remove("is-on"); } });

  // test hook: what an automated player needs (true nutrient levels, tube states, records)
  BGX.lab = { state: () => st, foods: FOODS, tests: TESTS, heatS: HEAT_S, x: tubeX };
  menu();
})();
