/* BioglowRX — Syringe Prep (Pharmacology, Open RN Nursing Pharmacology ch. 2 + all).
   A hands-on mini game: check a medication order against the vial label, calculate the volume
   (desired ÷ have × volume), pick the right syringe, draw the dose up to the exact line, tap out
   air bubbles and confirm. Practice simulation with textbook-style examples, not medical advice.
   Loads after core.js, icons.js and lab-kit.js. */
(function () {
  "use strict";
  const BGX = window.BGX, esc = BGX.esc;
  const view = document.getElementById("br-view");
  const $ = s => view.querySelector(s);
  const ID = "syringe-prep";
  const K = BGX.labKit({ id: ID, title: "Syringe Prep", subject: "pharmacology", subjectName: "Pharmacology", tagline: "Hands-on lab: draw up the exact dose" });

  /* ---------------- syringes ---------------- */
  const SYR = [
    { ml: 1, g: 0.01, mid: 0.05, major: 0.1, name: "1 mL (tuberculin)" },
    { ml: 3, g: 0.1, mid: 0.5, major: 0.5, name: "3 mL" },
    { ml: 5, g: 0.2, mid: 1, major: 1, name: "5 mL" },
    { ml: 10, g: 0.2, mid: 1, major: 1, name: "10 mL" }
  ];
  const isMult = (v, g) => Math.abs(v / g - Math.round(v / g)) < 1e-6;
  function syringesFor(v) {                    // smallest syringe that holds the volume and has a line for it
    const ok = SYR.filter(s => s.ml >= v - 1e-9 && isMult(v, s.g));
    const best = ok[0], acc = [best.ml];
    if (Math.abs(best.ml - v) < 1e-9 && ok[1]) acc.push(ok[1].ml);   // exactly full: the next size up is fine too
    return acc;
  }

  /* ---------------- drugs and orders (textbook-style practice examples) ---------------- */
  // vial: name, s = strength per mL, su = strength unit, ml = vial size, routes (codes the label allows), routeTxt, cap colour
  const V = {
    furosemide:  { name: "Furosemide", s: 10, su: "mg", ml: 4, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#3E7CC9" },
    furosemide10:{ name: "Furosemide", s: 10, su: "mg", ml: 10, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#3E7CC9" },
    ondansetron: { name: "Ondansetron", s: 2, su: "mg", ml: 20, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#7A5BC4", multi: true },
    heparin:     { name: "Heparin sodium", s: 5000, su: "units", ml: 10, routes: ["IV", "subcut"], routeTxt: "For IV or subcut use. Not for IM", cap: "#2E9E6A", multi: true, alt: 10000 },
    morphine2:   { name: "Morphine sulfate", s: 2, su: "mg", ml: 1, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#C23B3B", look: "HYDROmorphone" },
    morphine4:   { name: "Morphine sulfate", s: 4, su: "mg", ml: 1, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#C23B3B", look: "HYDROmorphone" },
    hydromorphone:{ name: "HYDROmorphone", s: 2, su: "mg", ml: 1, routes: ["IV", "IM", "subcut"], routeTxt: "For IV, IM or subcut use", cap: "#D9822B", look: "Morphine sulfate", alt: 10 },
    gentamicin:  { name: "Gentamicin", s: 40, su: "mg", ml: 20, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#2F8F9D", multi: true, alt: 10 },
    famotidine:  { name: "Famotidine", s: 10, su: "mg", ml: 20, routes: ["IV"], routeTxt: "For IV use. Dilute before giving", cap: "#9A6B2F", multi: true },
    metoclopramide:{ name: "Metoclopramide", s: 5, su: "mg", ml: 2, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#5C6B7A" },
    diphenhydramine:{ name: "Diphenhydramine", s: 50, su: "mg", ml: 1, routes: ["IV", "IM"], routeTxt: "For IV or deep IM use", cap: "#C2477E" },
    dexamethasone:{ name: "Dexamethasone sodium phosphate", s: 4, su: "mg", ml: 5, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#4C9A2A", multi: true },
    ketorolac:   { name: "Ketorolac", s: 30, su: "mg", ml: 1, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#B8860B" },
    hydralazine: { name: "hydrALAZINE", s: 20, su: "mg", ml: 1, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#6D4FB0", lookV: "hydroxyzine" },
    hydroxyzine: { name: "hydrOXYzine", s: 50, su: "mg", ml: 1, routes: ["IM"], routeTxt: "For IM use only. Do not give IV", cap: "#6D4FB0" },
    epinephrine: { name: "EPINEPHrine", s: 1, su: "mg", ml: 1, routes: ["IM", "subcut"], routeTxt: "For IM or subcut use. Dilute before IV use", cap: "#C9372C", alt: 0.1, ratio: "(1 mg/mL)" },
    fentanyl:    { name: "fentaNYL citrate", s: 50, su: "mcg", ml: 2, routes: ["IV", "IM"], routeTxt: "For IV or IM use", cap: "#1F6FB2", look: "SUFentanil" },
    cyanocobalamin:{ name: "Cyanocobalamin (vitamin B12)", s: 1000, su: "mcg", ml: 1, routes: ["IM", "subcut"], routeTxt: "For IM or deep subcut use", cap: "#C0392B" },
    naloxone:    { name: "Naloxone", s: 0.4, su: "mg", ml: 1, routes: ["IV", "IM", "subcut"], routeTxt: "For IV, IM or subcut use", cap: "#1E8A4C" }
  };
  // order: v = vial key, d = dose, du = dose unit, r = route, how = rest of the order line
  const CASES = {
    1: [
      { v: "furosemide", d: 20, du: "mg", r: "IV", how: "push, once now" },
      { v: "furosemide", d: 40, du: "mg", r: "IV", how: "push, once now" },
      { v: "ondansetron", d: 4, du: "mg", r: "IV", how: "every 8 hours as needed for nausea" },
      { v: "heparin", d: 5000, du: "units", r: "subcut", how: "every 12 hours" },
      { v: "morphine2", d: 2, du: "mg", r: "IV", how: "every 4 hours as needed for pain" },
      { v: "gentamicin", d: 80, du: "mg", r: "IM", how: "once now" },
      { v: "famotidine", d: 20, du: "mg", r: "IV", how: "every 12 hours" },
      { v: "metoclopramide", d: 10, du: "mg", r: "IV", how: "every 6 hours" },
      { v: "diphenhydramine", d: 50, du: "mg", r: "IM", how: "once now" },
      { v: "dexamethasone", d: 4, du: "mg", r: "IV", how: "every 6 hours" },
      { v: "ketorolac", d: 30, du: "mg", r: "IM", how: "once now" }
    ],
    2: [
      { v: "heparin", d: 7500, du: "units", r: "subcut", how: "every 12 hours" },
      { v: "furosemide", d: 25, du: "mg", r: "IV", how: "push, once now" },
      { v: "furosemide10", d: 60, du: "mg", r: "IV", how: "slow push, once now" },
      { v: "furosemide10", d: 80, du: "mg", r: "IV", how: "slow push, once now" },
      { v: "ondansetron", d: 8, du: "mg", r: "IV", how: "once, before chemotherapy" },
      { v: "morphine4", d: 3, du: "mg", r: "IV", how: "every 4 hours as needed for pain" },
      { v: "ketorolac", d: 15, du: "mg", r: "IV", how: "every 6 hours" },
      { v: "diphenhydramine", d: 25, du: "mg", r: "IV", how: "every 6 hours as needed for itching" },
      { v: "hydralazine", d: 10, du: "mg", r: "IV", how: "every 6 hours if systolic BP over 170" },
      { v: "dexamethasone", d: 6, du: "mg", r: "IV", how: "once daily" },
      { v: "dexamethasone", d: 10, du: "mg", r: "IV", how: "once now" },
      { v: "gentamicin", d: 60, du: "mg", r: "IM", how: "once now" },
      { v: "gentamicin", d: 100, du: "mg", r: "IM", how: "once now" },
      { v: "hydromorphone", d: 1, du: "mg", r: "IV", how: "every 3 hours as needed for pain" }
    ],
    3: [
      { v: "furosemide", d: 0.04, du: "g", r: "IV", how: "push, once now" },
      { v: "gentamicin", d: 0.06, du: "g", r: "IM", how: "once now" },
      { v: "gentamicin", d: 0.08, du: "g", r: "IM", how: "once now" },
      { v: "ondansetron", d: 0.004, du: "g", r: "IV", how: "every 8 hours as needed for nausea" },
      { v: "hydromorphone", d: 500, du: "mcg", r: "IV", how: "every 3 hours as needed for pain" },
      { v: "epinephrine", d: 300, du: "mcg", r: "IM", how: "once now (anterolateral thigh)" },
      { v: "fentanyl", d: 0.05, du: "mg", r: "IV", how: "every hour as needed for pain" },
      { v: "fentanyl", d: 0.075, du: "mg", r: "IV", how: "once, before the procedure" },
      { v: "cyanocobalamin", d: 1, du: "mg", r: "IM", how: "once monthly" },
      { v: "naloxone", d: 400, du: "mcg", r: "IV", how: "once now for opioid overdose" },
      { v: "naloxone", d: 200, du: "mcg", r: "IV", how: "every 2 minutes as needed" },
      { v: "hydralazine", d: 10, du: "mg", r: "IV", how: "every 6 hours if systolic BP over 170" }
    ]
  };
  const TOMG = { g: 1000, mg: 1, mcg: 0.001 };
  const num = x => (+x.toFixed(4)).toLocaleString("en-US", { maximumFractionDigits: 4 });
  const qty = (x, u) => num(x) + " " + u;
  const mL = x => num(x) + " mL";
  function inUnit(d, du, su) { return su === "units" ? d : d * TOMG[du] / TOMG[su]; }
  function volFor(c, vial) { return Math.round(inUnit(c.d, c.du, vial.su) / vial.s * 100) / 100; }
  // self-check the tables once: every case must be measurable on some syringe
  Object.values(CASES).flat().forEach(c => { const v = volFor(c, V[c.v]); if (!SYR.some(s => s.ml >= v && isMult(v, s.g))) console.warn("syringe-prep: unmeasurable", c, v); });

  const LEVELS = [
    { n: 1, title: "First syringe", desc: "Guided: tips at every step, the working shown, a live reading on the syringe. Whole-number doses.", guided: true },
    { n: 2, title: "On your own", desc: "Decimal doses, you choose the syringe, and air bubbles to tap out. No live reading.", bubbles: 0.8 },
    { n: 3, title: "Convert and catch", desc: "Unit conversions (g, mg, mcg) and sometimes a wrong vial that you must reject.", bubbles: 0.85, trap: 0.45 }
  ];
  const STEPS = [
    "<b>Clean your hands</b>, then <b>check</b> the order against the vial label: right <b>drug</b>, right <b>strength</b> (as on the MAR), a <b>route</b> the label allows, and <b>in date</b>. Reject a wrong vial.",
    "<b>Calculate</b> the volume: <b>D ÷ H × V</b> (desired dose ÷ dose you have × the volume it comes in). Convert units first if they differ.",
    "<b>Pick the syringe</b>: the smallest one that holds the dose and has a line for it.",
    "<b>Prepare the vial</b>: swab the rubber top with alcohol and let it dry, then inject <b>air equal to your dose</b> into the vial so the drug draws out easily.",
    "<b>Draw up</b>: drag the plunger down (or use <b>Pull / Push</b>) until the <b>top edge of the black rubber stopper</b> sits on your line.",
    "<b>Air bubbles?</b> <b>Tap the barrel</b> until they rise to the top, push the plunger up to squeeze the air out, then fix the level again.",
    "<b>Confirm</b> and go to the bedside: check the label a final time, then match the patient's <b>name and date of birth</b> on the wristband with the order before giving."
  ];
  const STARTXT = "3 stars: the stopper within half of the smallest line of your syringe, no air left and no slips on the way. 2 stars: within one line. 1 star: within two lines.";

  let L = null, st = null, raf = 0;

  /* ---------------- menu ---------------- */
  function menu() {
    cancelAnimationFrame(raf); st = null;
    K.menu({
      hero: "Hands-on nursing pharmacology: check, calculate and draw up an injection",
      introHTML: `<p>A medication order card tells you what the prescriber wants. The pharmacy sends a vial. Before anything goes into a syringe, you <b>compare the two</b>: same drug, same strength, a route the vial allows, and not expired.</p>
        <p>Then you work out how many millilitres hold the ordered dose:</p>
        <p class="lab-eq">volume = D ÷ H × V</p>
        <p><b>D</b> is the dose ordered (desired), <b>H</b> the dose the vial has, and <b>V</b> the volume that H comes in (1 mL here). Example: order 20 mg, vial 10 mg/mL → 20 ÷ 10 × 1 = <b>2 mL</b>.</p>
        <p>You draw that volume into the right syringe, after cleaning your hands and preparing the vial (swab the top, inject air), and read it where nurses do: at the <b>top edge of the rubber stopper</b>, the ring closest to the needle. Last, at the bedside, you check the patient's two identifiers against the order.</p>`,
      lifeHTML: `<p>Nurses do this many times every shift. The "rights" of medication administration (right patient, drug, dose, route and time, plus documentation) and checking the label three times are there because small slips, like a look-alike name or a misplaced decimal, cause real harm.</p>`,
      steps: STEPS, levels: LEVELS, onStart: start,
      controls: "drag the plunger, or hold <b>Pull ▼</b> / <b>Push ▲</b> to move one line at a time; tap the barrel (or the <b>Tap barrel</b> button) to raise bubbles. Keyboard: ↓ / ↑ move one line, T taps, Enter confirms.",
      safety: "<b>Practice simulation, not medical advice.</b> Doses and vials are textbook-style practice examples. In real practice follow your facility's policy, check the patient with two identifiers, and have high-alert drugs (opioids, heparin) independently double-checked."
    });
  }

  /* ---------------- a run ---------------- */
  function today() { return new Date(); }
  function expStr(d) { return String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear(); }
  function makeVial(key, expiredOffset) {
    const t = today(), e = new Date(t.getFullYear(), t.getMonth() + (expiredOffset != null ? expiredOffset : 4 + (Math.random() * 18 | 0)), 1);
    return Object.assign({ key, exp: expStr(e), expired: expiredOffset != null, lot: "L" + (10000 + Math.random() * 89999 | 0) }, V[key]);
  }

  function start(level) {
    L = level; cancelAnimationFrame(raf);
    const c = BGX.pick(CASES[L.n]);
    const good = makeVial(c.v);
    const target = volFor(c, good);
    const acc = syringesFor(target);
    // a wrong vial (level 3 only): look-alike name, wrong strength, wrong route, or expired
    let trap = null;
    if (L.trap && Math.random() < L.trap) {
      const kinds = ["expired"];
      if (good.look) kinds.push("look", "look");
      if (good.lookV) kinds.push("route", "route");
      if (good.alt) kinds.push("strength", "strength");
      const kind = BGX.pick(kinds);
      let tv;
      if (kind === "expired") tv = makeVial(c.v, -(1 + (Math.random() * 5 | 0)));
      else if (kind === "route") tv = makeVial(good.lookV);
      else if (kind === "look") tv = Object.assign(makeVial(c.v), { name: good.look, cap: "#8E5A9B" });
      else tv = Object.assign(makeVial(c.v), { s: good.alt, ratio: good.ratio ? "(0.1 mg/mL)" : "", routeTxt: good.ratio ? "For IV use (cardiac arrest syringe)" : good.routeTxt, routes: good.ratio ? ["IV"] : good.routes, cap: "#333" });
      trap = { kind, vial: tv };
    }
    const plannedAir = (L.bubbles && Math.random() < L.bubbles) ? 1 : 0;
    st = {
      phase: "check", c, good, vial: trap ? trap.vial : good, trap, target, accept: acc,
      looked: {}, slips: [], calcMiss: 0, calcOk: false, syrMiss: 0, syr: null, rejectedGood: false, caught: false,
      liquid: 0, air: 0, planAir: plannedAir, bubbles: [], spawned: false, risen: false, taps: 0, shake: 0, aired: false,
      showRead: !!L.guided, done: false, t: performance.now(),
      hands: false, prep: [], bedside: null, ptOk: null,
      /* level 3: sometimes the wristband doesn't match the order (a digit swapped in the date of birth, or a similar surname) */
      ptTrap: L.trap && Math.random() < 0.25 ? BGX.pick(["dob", "name"]) : null
    };
    const D = () => qty(c.d, c.du), H = () => qty(good.s, good.su);
    K.begin(L, L.n === 1 ? [
      "Work through it one box at a time. The order says what is wanted; the vial says what you have. The formula turns that into millilitres.",
      () => `<b>${D()} ÷ ${H()} × 1 mL = ${mL(target)}</b>. Use the <b>${acc[0]} mL syringe</b> and drag until the top edge of the black stopper sits on the <b>${num(target)}</b> line.`
    ] : L.n === 2 ? [
      "Draw a little <b>past</b> your line, tap the barrel until the bubbles gather at the top, push the air out, then stop exactly on your line.",
      () => `${D()} ÷ ${H()} × 1 mL = <b>${mL(target)}</b>. The smallest syringe that has a ${num(target)} line is the <b>${acc[0]} mL</b> one.`,
      () => { st.showRead = true; return "The live stopper reading is now switched on beside the syringe. Match it to your answer."; }
    ] : [
      "Read the label <b>letter by letter</b>: look-alike names (morphine and HYDROmorphone, hydrALAZINE and hydrOXYzine) are a classic error. Also check strength, route and the expiry date against today's date.",
      () => `Convert first so both are in the same unit: <b>1 g = 1,000 mg</b> and <b>1 mg = 1,000 mcg</b>. Here the order is in ${c.du} and the vial in ${good.su}.`,
      () => `${D()} = ${qty(inUnit(c.d, c.du, good.su), good.su)}. ${qty(inUnit(c.d, c.du, good.su), good.su)} ÷ ${H()} × 1 mL = <b>${mL(target)}</b>, in the <b>${acc[0]} mL</b> syringe.`
    ]);
    render();
  }

  /* ---------------- cards ---------------- */
  function orderCard(compact) {
    const c = st.c, g = st.good, t = today();
    if (compact) return `<div class="sp-strip"><span><b>Order</b> ${esc(g.name.split(" (")[0])} ${qty(c.d, c.du)} ${c.r}</span><span><b>Vial</b> ${qty(st.vial.s, st.vial.su)}/mL</span>${st.calcOk ? `<span><b>Draw</b> ${mL(st.target)}</span>` : ""}${st.syr ? `<span><b>Syringe</b> ${st.syr.ml} mL</span>` : ""}</div>`;
    return `<div class="sp-order">
      <p class="br-label">Medication order · MAR</p>
      <p class="sp-pt">Patient: Alex Morgan (practice), DOB 14 Mar 1968 · check name and date of birth, never the bed number · Today ${t.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
      <p class="sp-line" data-k="drug"><b>${esc(g.name)}</b></p>
      <p class="sp-line" data-k="dose"><span class="sp-big">${qty(c.d, c.du)}</span> <span data-k="route" class="sp-line sp-route">${c.r}</span> ${esc(c.how)}</p>
      <p class="sp-line sp-mar" data-k="strength">Pharmacy supplies: ${esc(g.name.split(" (")[0])} <b>${qty(g.s, g.su)}/mL</b></p>
    </div>`;
  }
  function vialSVG(v, w) {
    return `<svg viewBox="0 0 60 100" width="${w}" aria-hidden="true"><defs><linearGradient id="vg${w}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="#e8f1f8"/><stop offset="1" stop-color="#c9d9e6"/></linearGradient></defs>
      <rect x="18" y="4" width="24" height="12" rx="3" fill="${v.cap}"/><rect x="21" y="15" width="18" height="8" fill="#b7c1cb"/>
      <path d="M12 30 Q12 23 20 23 H40 Q48 23 48 30 V92 Q48 97 43 97 H17 Q12 97 12 92 Z" fill="url(#vg${w})" stroke="#9fb0bf"/>
      <rect x="12" y="44" width="36" height="38" fill="#fff" stroke="#d6dde6"/><rect x="12" y="44" width="36" height="8" fill="${v.cap}"/>
      <rect x="16" y="57" width="26" height="3" fill="#99a" /><rect x="16" y="64" width="20" height="3" fill="#bbc"/><rect x="16" y="71" width="24" height="3" fill="#bbc"/>
      <path d="M16 30 V88" stroke="#fff" stroke-width="3" stroke-opacity=".7" stroke-linecap="round"/></svg>`;
  }
  function vialCard() {
    const v = st.vial;
    return `<div class="sp-vial" style="--cap:${v.cap}">
      <div class="sp-vialpic">${vialSVG(v, 64)}</div>
      <div class="sp-label">
        <p class="sp-band">Vial label</p>
        <p class="sp-line" data-k="drug"><b class="sp-drug">${esc(v.name)}</b> injection</p>
        <p class="sp-line" data-k="strength"><span class="sp-big">${qty(v.s, v.su)}/mL</span> ${esc(v.ratio || "")}</p>
        <p class="sp-small">${v.ml} mL ${v.multi ? "multiple-dose" : "single-dose"} vial</p>
        <p class="sp-line" data-k="route">${esc(v.routeTxt)}</p>
        <p class="sp-line sp-small" data-k="exp">Lot ${v.lot} · EXP ${v.exp}</p>
      </div></div>`;
  }

  /* ---------------- run screen ---------------- */
  function render() {
    cancelAnimationFrame(raf);
    view.innerHTML = K.topHTML(L) + `<div class="lab-run sp-run"><div id="sp-panel"></div></div>
      ${K.hintHTML()}
      <details class="lab-howrun"${L.guided ? " open" : ""}><summary>How to do it</summary>${K.stepsHTML(STEPS)}</details>
      <p class="sp-disclaim">Practice simulation, not medical advice.</p>
      <div class="br-feedback" id="lab-fb" aria-live="polite"></div>`;
    $("#lab-quit").onclick = menu;
    K.bindHints();
    phaseCheck();
  }
  const panel = () => $("#sp-panel");
  function tip(html) { const t = $("#sp-tip"); if (t) t.innerHTML = html; }
  function slip(code, text) { st.slips.push({ code, text }); }

  /* 1. check the vial */
  const CHECKS = [["drug", "Drug name"], ["strength", "Strength"], ["route", "Route"], ["exp", "Expiry date"]];
  function phaseCheck() {
    st.phase = "check"; K.setStep(0);
    panel().innerHTML = `<div class="sp-cards">${orderCard()}${vialCard()}</div>
      <p class="sp-tip" id="sp-tip" aria-live="polite"></p>
      <div class="lab-controls sp-hands"><button class="lab-btn" id="sp-hands" type="button">🧼 Clean your hands</button></div>
      <p class="br-label sp-mt">Compare the order with the label${L.guided ? " (tap each check)" : ""}</p>
      <div class="sp-checks">${CHECKS.map(([k, t]) => `<button class="sp-chk" data-chk="${k}" type="button"><span class="dot"></span>${t}</button>`).join("")}</div>
      <div class="lab-controls"><button class="br-next sp-yes" id="sp-use">✓ Vial is right: use it</button><button class="br-ghost sp-no" id="sp-reject">✗ Wrong vial: reject</button></div>`;
    tip(L.guided ? "<b>Step 1.</b> First <b>clean your hands</b>, then tap each check. Both matching spots light up: compare them." : L.trap ? "<b>Step 1.</b> Check everything. On this level the pharmacy sometimes sends the <b>wrong vial</b>." : "<b>Step 1.</b> Check the label against the order, then decide.");
    const gate = () => { const all = CHECKS.every(([k]) => st.looked[k]) && st.hands; if (L.guided) { $("#sp-use").disabled = !all; $("#sp-reject").disabled = !all; } };
    $("#sp-hands").onclick = () => { if (st.hands) return; st.hands = true; BGX.sfx.tap(); const b = $("#sp-hands"); b.classList.add("is-on"); b.textContent = "✓ Hands cleaned"; b.disabled = true; if (L.guided) tip("<b>Hands clean.</b> Hand hygiene comes before you touch any medicine. Now tap each check."); gate(); };
    view.querySelectorAll("[data-chk]").forEach(b => b.onclick = () => {
      const k = b.dataset.chk; st.looked[k] = true; BGX.sfx.tap();
      view.querySelectorAll(".sp-chk").forEach(x => x.classList.toggle("is-on", x === b));
      b.classList.add("is-seen");
      view.querySelectorAll(".sp-line").forEach(x => x.classList.toggle("is-look", x.dataset.k === k));
      if (L.guided) tip(guidedCheck(k));
      gate();
    });
    gate();
    $("#sp-use").onclick = () => decide(true);
    $("#sp-reject").onclick = () => decide(false);
  }
  function guidedCheck(k) {
    const c = st.c, v = st.vial;
    return {
      drug: `<b>Drug:</b> the order says <b>${esc(st.good.name)}</b>, the label says <b>${esc(v.name)}</b>. Read every letter: look-alike names are a common error.`,
      strength: `<b>Strength:</b> the MAR says the pharmacy supplies <b>${qty(st.good.s, st.good.su)}/mL</b>; the label says <b>${qty(v.s, v.su)}/mL</b>. This is the "have" (H) in your sum.`,
      route: `<b>Route:</b> the order is <b>${c.r}</b>; the label says "${esc(v.routeTxt)}". The ordered route must be one the label allows.`,
      exp: `<b>Expiry:</b> the label says <b>EXP ${v.exp}</b> (month/year). Today is ${today().toLocaleDateString("en-GB", { month: "short", year: "numeric" })}, so it must be later than this month.`
    }[k] + (CHECKS.every(([q]) => st.looked[q]) ? " <b>All four checked:</b> decide below." : "");
  }
  function trapWhy(t) {
    const g = st.good, v = t.vial;
    return { look: `the label says <b>${esc(v.name)}</b>, not ${esc(g.name)}. They look alike but are different drugs (HYDROmorphone is about 5 to 7 times stronger than morphine; SUFentanil far stronger than fentaNYL).`,
      route: `it is <b>${esc(v.name)}</b>, not ${esc(g.name)}, and it is "${esc(v.routeTxt)}", while the order is ${st.c.r}.`,
      strength: `the strength is <b>${qty(v.s, v.su)}/mL</b>, but the MAR says ${qty(g.s, g.su)}/mL. Wrong-concentration vials are behind some of the worst dosing errors.`,
      expired: `it expired at the end of <b>${v.exp}</b>. Expired drugs may be weaker or unsafe.` }[t.kind];
  }
  function decide(use) {
    if (st.phase !== "check") return;
    if (st.trap && !st.caught) {
      if (use) {   // used a wrong vial: the run ends here
        st.done = true; BGX.reward(false, null, { flash: view }); disableAll();
        return K.result({ n: 0, verdict: "Wrong vial used.", levels: LEVELS, onLevel: start, onMenu: menu,
          why: `This vial should have been rejected: ${trapWhy(st.trap)} Always compare the label with the order <b>before</b> you draw anything up. This check is the first of three label checks.`, extraHTML: rightsHTML() });
      }
      st.caught = true; BGX.reward(true, $("#sp-reject"));
      st.vial = st.good;
      panel().querySelector(".sp-vial").outerHTML = vialCard();
      panel().querySelector(".sp-vial").classList.add("br-pop");
      tip(`<b>Good catch!</b> Rejected: ${trapWhy(st.trap)} The pharmacy has sent the right vial: check it, then use it.`);
      return;
    }
    if (!use) {   // rejected a correct vial
      if (!st.rejectedGood) { st.rejectedGood = true; slip("reject", "You rejected a vial that was correct (a delay, not harm, but a slip)."); }
      BGX.reward(false, null, { flash: $("#sp-tip") });
      tip(`This vial <b>is</b> right: the name, the strength (${qty(st.vial.s, st.vial.su)}/mL), the route (${st.c.r}) and the date (EXP ${st.vial.exp}) all fit the order. Press <b>Use it</b>.`);
      return;
    }
    if (!st.hands) { st.hands = "late"; slip("hands", "You handled the vial before cleaning your hands: hand hygiene comes first, every time."); }
    BGX.sfx.ok(); phaseCalc();
  }

  /* 2. calculate */
  function phaseCalc() {
    st.phase = "calc"; K.setStep(1);
    const c = st.c, g = st.good, conv = c.du !== g.su && g.su !== "units";
    const Dn = conv ? inUnit(c.d, c.du, g.su) : c.d;
    panel().innerHTML = orderCard(true) + `
      <div class="sp-calc">
        <p class="br-label">Step 2 · How many mL?</p>
        <div class="sp-formula">
          <span class="sp-term"><i>D</i><b>${qty(c.d, c.du)}</b><small>dose ordered</small></span><span class="op">÷</span>
          <span class="sp-term"><i>H</i><b>${qty(g.s, g.su)}</b><small>dose in vial</small></span><span class="op">×</span>
          <span class="sp-term"><i>V</i><b>1 mL</b><small>it comes in</small></span><span class="op">=</span>
          <span class="sp-term is-ans"><i>volume</i><span class="sp-inwrap"><input id="sp-in" inputmode="decimal" autocomplete="off" aria-label="Volume in mL" placeholder="?"> mL</span></span>
        </div>
        ${conv ? `<p class="sp-warn">⚠ The order is in <b>${c.du}</b> but the vial is in <b>${g.su}</b>. Convert first.</p>` : ""}
        <details class="lab-howcalc"${L.guided ? " open" : ""}><summary>💡 Show me how (beginner)</summary><ol>
          ${conv ? `<li>Same units first: ${c.du === "g" ? "1 g = 1,000 mg" : c.du === "mcg" ? "1 mg = 1,000 mcg" : "1 mg = 1,000 mcg"}, so ${qty(c.d, c.du)} = <b>${qty(Dn, g.su)}</b>.</li>` : ""}
          <li>Divide what you want by what you have: ${qty(Dn, g.su)} ÷ ${qty(g.s, g.su)} = ${num(Dn / g.s)}.</li>
          <li>Multiply by the volume the "have" comes in (1 mL): ${num(Dn / g.s)} × 1 mL = <b>the volume to draw up</b>.</li>
          <li>Sense check: ${Dn > g.s ? "you want more than one mL's worth, so the answer is more than 1 mL" : Dn < g.s ? "you want less than one mL's worth, so the answer is less than 1 mL" : "you want exactly one mL's worth, so 1 mL"}. Write a leading zero (0.5 mL, never .5 mL) and no trailing zero (5 mL, never 5.0 mL).</li></ol></details>
        <div class="lab-controls"><button class="br-next" id="sp-calcgo">Check my answer</button></div>
        <p class="sp-tip" id="sp-tip" aria-live="polite"></p>
      </div>`;
    tip(L.guided ? "<b>Step 2.</b> Fill in the sum: dose ordered ÷ dose per mL in the vial. Type your answer in mL." : "<b>Step 2.</b> Work out the volume to draw up.");
    const inp = $("#sp-in");
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); checkCalc(); } });
    $("#sp-calcgo").onclick = checkCalc;
    if (matchMedia("(pointer: fine)").matches) inp.focus();
  }
  function checkCalc() {
    if (st.phase !== "calc") return;
    const inp = $("#sp-in"), raw = inp.value.trim().replace(",", ".");
    const v = parseFloat(raw);
    if (raw === "" || isNaN(v)) { tip("Type a number of mL first (for example 1.5)."); return; }
    const ok = Math.abs(v - st.target) < 0.005;
    const working = workingText();
    if (ok) {
      st.calcOk = true; BGX.reward(true, inp); inp.disabled = true; inp.classList.add("is-ok");
      tip(`<b>Correct: ${mL(st.target)}.</b> ${L.guided ? working : ""}`);
      $("#sp-calcgo").textContent = "Next: pick the syringe"; $("#sp-calcgo").onclick = phaseSyringe;
      return;
    }
    st.calcMiss++; BGX.reward(false, null, { flash: inp });
    const hint = v * 1000 === st.target || v / 1000 === st.target || Math.abs(v * 10 - st.target) < 1e-6 || Math.abs(v / 10 - st.target) < 1e-6 ? " Your answer is off by a power of ten: check the conversion and the decimal point." : v === st.vial.s / st.c.d || Math.abs(v - (st.good.s / inUnit(st.c.d, st.c.du, st.good.su))) < 0.005 ? " It looks like you divided the wrong way round: it is <b>what you want ÷ what you have</b>." : "";
    if (L.guided || st.calcMiss >= 2) {
      slip("calc", `Calculation: you answered ${mL(v)}; the right volume was ${mL(st.target)}.`);
      st.calcOk = true; inp.value = num(st.target); inp.disabled = true; inp.classList.add("is-fix");
      tip(`Not quite.${hint} The answer is <b>${mL(st.target)}</b>: ${working}`);
      $("#sp-calcgo").textContent = "Next: pick the syringe"; $("#sp-calcgo").onclick = phaseSyringe;
    } else tip(`Not quite: check your sum and try once more.${hint}`);
  }
  function workingText() {
    const c = st.c, g = st.good, Dn = inUnit(c.d, c.du, g.su);
    return `${c.du !== g.su && g.su !== "units" ? `${qty(c.d, c.du)} = ${qty(Dn, g.su)}; ` : ""}${qty(Dn, g.su)} ÷ ${qty(g.s, g.su)} × 1 mL = ${mL(st.target)}.`;
  }

  /* 3. syringe */
  function syrIcon(s) {
    const len = 14 + s.ml * 3.2;
    return `<svg viewBox="0 0 64 20" width="64" height="20" aria-hidden="true"><rect x="2" y="8" width="10" height="4" fill="#9aa6b6"/><rect x="12" y="4" width="${Math.min(46, len)}" height="12" rx="2" fill="#eef6ff" stroke="#9aa6b6"/><rect x="${12 + Math.min(46, len)}" y="2" width="3" height="16" fill="#9aa6b6"/><path d="M12 10 H2" stroke="#9aa6b6"/></svg>`;
  }
  function phaseSyringe() {
    st.phase = "syringe"; K.setStep(2);
    panel().innerHTML = orderCard(true) + `<p class="br-label sp-mt">Step 3 · Pick a syringe for ${mL(st.target)}</p>
      <div class="sp-syrs">${SYR.map(s => `<button class="sp-syr${L.guided && s.ml === st.accept[0] ? " is-rec" : ""}" data-syr="${s.ml}" type="button">${syrIcon(s)}<b>${s.ml} mL</b><small>lines every ${num(s.g)} mL</small></button>`).join("")}</div>
      <p class="sp-tip" id="sp-tip" aria-live="polite"></p>`;
    tip(L.guided ? `<b>Step 3.</b> Use the <b>smallest syringe that holds the dose</b>: it has the finest lines, so it's the most accurate. For ${mL(st.target)} that is the highlighted <b>${st.accept[0]} mL</b> syringe.` : "<b>Step 3.</b> Smallest syringe that holds the dose and has a line for it.");
    view.querySelectorAll("[data-syr]").forEach(b => b.onclick = () => {
      const ml = +b.dataset.syr, s = SYR.find(x => x.ml === ml);
      if (st.accept.includes(ml)) { BGX.reward(true, b); st.syr = s; return phasePrep(); }
      st.syrMiss++; b.classList.add("is-wrong"); BGX.reward(false, null, { flash: b });
      if (st.syrMiss === 1) slip("syr", `Syringe: you first picked ${ml} mL; best for ${mL(st.target)} is the ${st.accept[0]} mL.`);
      tip(s.ml < st.target ? `The ${ml} mL syringe is too small to hold ${mL(st.target)}.` : !isMult(st.target, s.g) ? `The ${ml} mL syringe has lines every ${num(s.g)} mL, so there is no line for ${mL(st.target)}.` : `The ${ml} mL syringe would work, but a smaller one has finer lines and is more accurate. Pick the smallest that holds ${mL(st.target)}.`);
    });
  }

  /* 4. prepare the vial: swab the top, then inject air equal to the dose (one wrong option to resist) */
  const PREP = [
    { k: "swab", t: "Swab the rubber top with alcohol and let it dry" },
    { k: "air", t: () => `Draw ${mL(st.target)} of air into the syringe and inject it into the vial` },
    { k: "blow", t: "Blow on the swabbed top so it dries faster", bad: "Blowing or fanning puts germs back on the clean top. Let the alcohol air-dry instead." }
  ];
  function phasePrep() {
    st.phase = "prep"; K.setStep(3);
    const opts = BGX.shuffle(PREP);
    panel().innerHTML = orderCard(true) + `<p class="br-label sp-mt">Step 4 · Prepare the vial</p>
      <div class="sp-prep">${opts.map(o => `<button class="lab-btn sp-prepbtn" data-prep="${o.k}" type="button">${typeof o.t === "function" ? o.t() : o.t}</button>`).join("")}</div>
      <p class="sp-tip" id="sp-tip" aria-live="polite"></p>`;
    tip(L.guided ? "<b>Step 4.</b> Do the two right actions <b>in order</b>: clean the rubber top first, then put air into the vial. One option is a mistake." : "<b>Step 4.</b> Prepare the vial before you draw up: pick the right actions in the right order.");
    view.querySelectorAll("[data-prep]").forEach(b => b.onclick = () => {
      const o = PREP.find(x => x.k === b.dataset.prep);
      if (o.bad) { if (!st.prep.includes("blow")) { st.prep.push("blow"); slip("blow", "You blew on the swabbed vial top: let alcohol air-dry so the top stays clean."); } BGX.reward(false, null, { flash: b }); b.classList.add("is-wrong"); b.disabled = true; return tip(`<b>Not that one.</b> ${o.bad}`); }
      if (o.k === "air" && !st.prep.includes("swab")) {
        if (!st.prep.includes("order")) { st.prep.push("order"); slip("prep", "You put the needle into the vial before swabbing the top: clean it first."); }
        BGX.reward(false, null, { flash: b });
        return tip("<b>Swab first.</b> The needle must only go through a clean rubber top. Swab it and let it dry, then add the air.");
      }
      st.prep.push(o.k); b.classList.add("is-on"); b.disabled = true; BGX.sfx.ok();
      if (o.k === "swab") tip("<b>Clean.</b> Now add air: it replaces the liquid you'll take out, so the plunger isn't sucked back.");
      if (st.prep.includes("swab") && st.prep.includes("air")) { tip("<b>Vial ready.</b> Turn it upside down and draw up your dose."); setTimeout(phaseDraw, BGX.RM ? 0 : 700); }
    });
  }

  /* 5–7. draw up, bubbles, confirm */
  const Y0 = 176, YH = 300, BX = 78, BW = 44, CX = BX + BW / 2;   // barrel: zero line, length for full capacity, left x, width
  const px = () => YH / st.syr.ml;
  const content = () => st.liquid + st.air;
  const sy = () => Y0 + content() * px();
  function scaleTicks(s, big) {
    let o = ""; const n = Math.round(s.ml / s.g), p = YH / s.ml;
    for (let i = 0; i <= n; i++) {
      const v = i * s.g, y = (Y0 + v * p).toFixed(2), major = isMult(v, s.major), mid = isMult(v, s.mid);
      const len = major ? 16 : mid ? 11 : 7;
      o += `<line x1="${BX}" x2="${BX + len}" y1="${y}" y2="${y}" stroke="#1d2733" stroke-width="${major ? 1.1 : .7}"/>`;
      if (major && i > 0) o += `<text x="${BX - 4}" y="${(+y + 3.6).toFixed(2)}" text-anchor="end" font-size="${big ? 11 : 10.5}" font-weight="700" font-family="var(--font-mono)" fill="var(--ink)">${num(v)}</text>`;
    }
    return o;
  }
  function syringeGroup(s) {
    return `<g id="sp-syr">
      <rect x="${BX}" y="${Y0 - 8}" width="${BW}" height="${YH + 22}" rx="5" fill="#f7fbff" fill-opacity=".9" stroke="#8796a7" stroke-width="1.4"/>
      <rect id="sp-liq" x="${BX + 1}" y="${Y0}" width="${BW - 2}" height="0" fill="url(#sp-liqg)"/>
      <rect id="sp-airp" x="${BX + 1}" y="${Y0}" width="${BW - 2}" height="0" fill="#fff" opacity=".9"/>
      <g id="sp-bub"></g>
      <g id="sp-stop"><rect x="${BX + 1}" y="0" width="${BW - 2}" height="24" rx="3" fill="#2b3038"/><rect x="${BX + 1}" y="0" width="${BW - 2}" height="2.4" fill="#5a6270"/><rect x="${BX + 1}" y="10" width="${BW - 2}" height="2" fill="#454c57"/><rect x="${BX + 1}" y="19" width="${BW - 2}" height="2" fill="#454c57"/>
        <rect x="${CX - 7}" y="24" width="14" height="420" fill="#d8dee6" stroke="#aab4c0"/><rect x="${CX - 1.5}" y="24" width="3" height="420" fill="#b9c2cd"/></g>
      ${scaleTicks(s)}
      <path d="M${BX + 4} ${Y0 - 4} V${Y0 + YH + 8}" stroke="#fff" stroke-opacity=".75" stroke-width="3" stroke-linecap="round"/>
    </g>`;
  }
  function sceneSVG() {
    const s = st.syr, v = st.vial;
    return `<svg viewBox="0 0 300 560" class="sp-scene" id="sp-svg" role="img" aria-label="${s.ml} mL syringe, needle up, drawing from an upside-down vial">
      <defs>
        <linearGradient id="sp-liqg" x1="0" x2="1"><stop offset="0" stop-color="#cfe6fb"/><stop offset=".5" stop-color="#e6f3ff"/><stop offset="1" stop-color="#b9d8f2"/></linearGradient>
        <linearGradient id="sp-vialg" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".4" stop-color="#e3eef7"/><stop offset="1" stop-color="#c3d5e4"/></linearGradient>
        <clipPath id="sp-vclip"><path d="M64 8 H136 Q142 8 142 16 V88 Q142 98 132 100 H68 Q58 98 58 88 V16 Q58 8 64 8 Z"/></clipPath>
        <clipPath id="sp-loupeclip"><circle id="sp-lc" cx="236" cy="300" r="56"/></clipPath>
        <clipPath id="sp-barrelclip"><rect x="0" y="${Y0 - 8}" width="300" height="400"/></clipPath>
      </defs>
      <!-- inverted vial -->
      <g clip-path="url(#sp-vclip)"><rect x="56" y="6" width="90" height="96" fill="url(#sp-vialg)"/><rect id="sp-vliq" x="56" y="30" width="90" height="72" fill="#cfe6fb" opacity=".9"/></g>
      <path d="M64 8 H136 Q142 8 142 16 V88 Q142 98 132 100 H68 Q58 98 58 88 V16 Q58 8 64 8 Z" fill="none" stroke="#8796a7" stroke-width="1.4"/>
      <g transform="rotate(180 100 54)"><rect x="66" y="22" width="68" height="44" fill="#fff" stroke="#d6dde6"/><rect x="66" y="22" width="68" height="10" fill="${v.cap}"/>
        <text x="100" y="45" text-anchor="middle" font-size="8.5" font-weight="800" font-family="var(--font-display)" fill="#1d2733">${esc(v.name.split(" ")[0])}</text>
        <text x="100" y="58" text-anchor="middle" font-size="9" font-weight="800" font-family="var(--font-mono)" fill="#1d2733">${qty(v.s, v.su)}/mL</text></g>
      <rect x="84" y="100" width="32" height="10" fill="#b7c1cb"/><rect x="80" y="108" width="40" height="16" rx="3" fill="${v.cap}"/>
      <!-- needle and hub -->
      <rect x="${CX - .9}" y="70" width="1.8" height="80" fill="#9aa6b6"/>
      <path d="M${CX - 9} 150 H${CX + 9} L${CX + 6} 168 H${CX - 6} Z" fill="#7fb8e6" stroke="#5c8fbf"/>
      <rect id="sp-tipliq" x="${CX - 4}" y="164" width="8" height="${Y0 - 164}" fill="#cfe6fb"/>
      <path d="M${BX + 6} ${Y0 - 8} L${CX - 6} 166 H${CX + 6} L${BX + BW - 6} ${Y0 - 8}" fill="#f7fbff" stroke="#8796a7" stroke-width="1.4"/>
      <!-- syringe -->
      <g id="sp-syrwrap"><g clip-path="url(#sp-barrelclip)">${syringeGroup(s)}</g>
        <rect x="${BX - 18}" y="${Y0 + YH + 14}" width="${BW + 36}" height="8" rx="3" fill="#cbd3dc" stroke="#8796a7"/></g>
      <g id="sp-readmark" opacity="0"><path d="M${BX + BW + 4} 0 l10 -6 v12 z" fill="var(--accent)"/><text x="${BX + BW + 16}" y="4" font-size="11" font-weight="800" fill="var(--accent)" font-family="var(--font-mono)">read</text></g>
      <!-- loupe -->
      <g id="sp-loupe">
        <line id="sp-lline" x1="${BX + BW}" y1="300" x2="180" y2="300" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="3 3"/>
        <circle id="sp-lbg" cx="236" cy="300" r="56" fill="var(--surface)"/>
        <g clip-path="url(#sp-loupeclip)"><use id="sp-luse" href="#sp-syr"/></g>
        <line id="sp-lcross" x1="180" x2="292" y1="300" y2="300" stroke="#E83E8C" stroke-width=".8" stroke-dasharray="2 2" opacity=".0"/>
        <circle id="sp-lring" cx="236" cy="300" r="56" fill="none" stroke="var(--accent)" stroke-width="3"/>
        <text id="sp-ltxt" x="236" y="380" text-anchor="middle" font-size="10" font-family="var(--font-mono)" fill="var(--muted)">magnified ×2.4</text>
      </g>
      <!-- tap zone hint -->
      <text id="sp-taptxt" x="${CX}" y="${Y0 + 20}" text-anchor="middle" font-size="10" font-weight="700" fill="#5c8fbf" opacity="0">tap!</text>
    </svg>`;
  }
  function phaseDraw() {
    st.phase = "draw"; K.setStep(4);
    const s = st.syr;
    panel().innerHTML = orderCard(true) + `
      <div class="sp-stage">
        <div class="sp-scenewrap">${sceneSVG()}</div>
        <div class="sp-side">
          <div class="lab-read"><p class="br-label">Draw up</p><b>${mL(st.target)}</b><span>${s.ml} mL syringe · lines every ${num(s.g)} mL</span></div>
          <div class="lab-read sp-live" id="sp-livebox" ${st.showRead ? "" : "hidden"}><p class="br-label">Stopper reading</p><b id="sp-live">0</b><span id="sp-livesub">mL (top edge of the stopper)</span></div>
          <p class="lab-hint" id="sp-tip" aria-live="polite"></p>
        </div>
      </div>
      <div class="lab-controls sp-ctl">
        <button class="lab-btn" id="sp-push" type="button" aria-label="Push plunger up one line">Push ▲</button>
        <button class="lab-btn" id="sp-pull" type="button" aria-label="Pull plunger down one line">Pull ▼</button>
        <button class="lab-btn" id="sp-tap" type="button">Tap barrel</button>
      </div>
      <div class="lab-controls"><button class="br-next lab-end" id="sp-confirm">Confirm dose</button></div>`;
    bindDraw();
    st.t = performance.now(); raf = requestAnimationFrame(loop);
  }

  function setContent(total) {
    const cap = st.syr.ml;
    total = Math.max(0, Math.min(cap, total));
    let dv = total - content();
    if (Math.abs(dv) < 1e-9) return;
    if (dv > 0) {
      st.liquid += dv;
      if (st.planAir && !st.spawned && content() >= st.target * 0.5) spawnBubbles();
    } else {
      dv = -dv;
      if (st.risen && st.air > 0) {      // air sits at the needle end: it leaves first
        const a = Math.min(st.air, dv); st.air -= a; dv -= a;
        if (st.air < 1e-9) { st.air = 0; st.aired = true; st.bubbles = []; BGX.tone([300, 240], .06, "triangle", .04, .03); }
      }
      st.liquid = Math.max(0, st.liquid - dv);   // the rest goes back into the vial
      if (st.liquid < 1e-9 && !st.risen && st.air > 0) st.air = Math.max(0, total);
    }
    st.liquid = Math.round(st.liquid * 1e6) / 1e6; st.air = Math.round(st.air * 1e6) / 1e6;
  }
  function spawnBubbles() {
    st.spawned = true;
    const g = st.syr.g;
    const a = Math.max(3 * g, Math.round(st.target * (0.06 + Math.random() * 0.08) / g) * g);
    const take = Math.min(a, st.liquid * 0.6);
    st.air = Math.round(take * 1e6) / 1e6; st.liquid -= st.air;
    const n = 4 + (Math.random() * 4 | 0);
    st.bubbles = Array.from({ length: n }, () => ({ fx: 0.15 + Math.random() * 0.7, fy: 0.2 + Math.random() * 0.75, r: 2 + Math.random() * 3.5, p: 0 }));
    BGX.tone([700, 900], .04, "sine", .03, .03);
  }
  function tapBarrel() {
    if (!st || st.phase !== "draw" || st.done) return;
    st.taps++; st.shake = 0.25; BGX.tone([180], .05, "square", 0, .04);
    if (st.air > 0 && !st.risen) {
      st.bubbles.forEach(b => b.p = Math.min(1, b.p + 0.5 + Math.random() * 0.15));
      if (st.bubbles.every(b => b.p >= 0.999)) st.risen = true;
    }
  }
  function nudge(dir) {
    if (!st || st.phase !== "draw" || st.done) return;
    const g = st.syr.g, c = content();
    const k = c / g, onL = Math.abs(k - Math.round(k)) < 1e-6;
    setContent((onL ? Math.round(k) + dir : dir > 0 ? Math.ceil(k) : Math.floor(k)) * g);
    BGX.tone([dir > 0 ? 820 : 960], .025, "sine", 0, .02);
  }
  function holdBtn(el, fn) {
    let t1 = 0, t2 = 0;
    const stop = () => { clearTimeout(t1); clearInterval(t2); el.classList.remove("is-on"); };
    el.addEventListener("pointerdown", e => { e.preventDefault(); fn(); el.classList.add("is-on"); stop(); el.classList.add("is-on"); t1 = setTimeout(() => { t2 = setInterval(fn, 90); }, 380); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(ev => el.addEventListener(ev, stop));
    el.addEventListener("click", e => { if (e.detail === 0) fn(); });   // keyboard activation
    el.addEventListener("contextmenu", e => e.preventDefault());
  }
  function bindDraw() {
    holdBtn($("#sp-pull"), () => nudge(1));
    holdBtn($("#sp-push"), () => nudge(-1));
    $("#sp-tap").onclick = tapBarrel;
    $("#sp-confirm").onclick = confirmDose;
    const svg = $("#sp-svg");
    const toY = e => { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const m = svg.getScreenCTM(); return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 }; };
    let drag = null;
    svg.addEventListener("pointerdown", e => {
      if (st.done) return;
      const p = toY(e), s0 = sy();
      if (p.y >= s0 - 22 && p.x > BX - 24 && p.x < BX + BW + 24) { drag = { off: p.y - s0 }; svg.setPointerCapture(e.pointerId); e.preventDefault(); }
      else if (p.x > BX - 10 && p.x < BX + BW + 10 && p.y > Y0 - 30 && p.y < s0 - 22) tapBarrel();
    });
    svg.addEventListener("pointermove", e => { if (!drag) return; const p = toY(e); setContent((p.y - drag.off - Y0) / px()); });
    const end = () => { drag = null; };
    svg.addEventListener("pointerup", end); svg.addEventListener("pointercancel", end);
  }

  function reading() { return content(); }
  function loop(now) {
    if (!st || st.phase !== "draw") return;
    const dt = Math.min(0.05, (now - st.t) / 1000); st.t = now;
    st.shake = Math.max(0, st.shake - dt);
    draw(dt);
    raf = requestAnimationFrame(loop);
  }
  function draw(dt) {
    const s0 = sy(), p = px(), g = st.syr.g;
    const liq = $("#sp-liq"); if (!liq) return;
    const airH = st.risen ? st.air * p : 0;
    liq.setAttribute("y", (Y0 + airH).toFixed(2)); liq.setAttribute("height", Math.max(0, s0 - Y0 - airH).toFixed(2));
    const ap = $("#sp-airp"); ap.setAttribute("height", airH.toFixed(2));
    $("#sp-tipliq").setAttribute("opacity", st.risen && st.air > 0 ? 0 : content() > 0 ? 1 : 0);
    $("#sp-stop").setAttribute("transform", `translate(0 ${s0.toFixed(2)})`);
    // bubbles drift up toward their target position (p = how far they have risen)
    let bh = "";
    if (!st.risen && st.air > 0) st.bubbles.forEach(b => {
      b.y = b.y == null ? 1 : b.y; const goal = 1 - b.p; b.y += (goal - b.y) * Math.min(1, dt * 6);
      const col = s0 - Y0 - 6, yy = Y0 + 4 + b.y * b.fy * col + (1 - b.fy) * 0;
      const r = Math.min(b.r, Math.max(1.2, col / 3));
      bh += `<circle cx="${(BX + 4 + b.fx * (BW - 8)).toFixed(1)}" cy="${Math.min(s0 - r - 1, yy).toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" stroke="#7fa7c9" stroke-width=".8"/><circle cx="${(BX + 4 + b.fx * (BW - 8) - r * .35).toFixed(1)}" cy="${(Math.min(s0 - r - 1, yy) - r * .35).toFixed(1)}" r="${(r * .3).toFixed(1)}" fill="#fff"/>`;
    });
    $("#sp-bub").innerHTML = bh;
    const wrap = $("#sp-syrwrap");
    wrap.setAttribute("transform", st.shake > 0 && !BGX.RM ? `translate(${(Math.sin(performance.now() / 18) * 2.2).toFixed(2)} 0)` : "");
    // vial empties a little as you draw
    const used = Math.min(1, content() / Math.max(st.vial.ml, 1)) * (st.vial.ml <= 2 ? 0.85 : 0.5);
    $("#sp-vliq").setAttribute("y", (30 + used * 60).toFixed(1));
    // loupe follows the stopper
    const cy = Math.max(200, Math.min(430, s0)), Z = 2.4, zx = 80;
    ["#sp-lc", "#sp-lbg", "#sp-lring"].forEach(q => $(q).setAttribute("cy", cy.toFixed(1)));
    $("#sp-luse").setAttribute("transform", `translate(${(236 - Z * zx).toFixed(2)} ${(cy - Z * s0).toFixed(2)}) scale(${Z})`);
    const ll = $("#sp-lline"); ll.setAttribute("y1", s0.toFixed(1)); ll.setAttribute("y2", cy.toFixed(1));
    $("#sp-ltxt").setAttribute("y", (cy + 70).toFixed(1));
    const rm = $("#sp-readmark"); rm.setAttribute("transform", `translate(0 ${s0.toFixed(1)})`); rm.setAttribute("opacity", L.guided ? 1 : 0);
    $("#sp-taptxt").setAttribute("opacity", st.air > 0 && !st.risen && (s0 - Y0) > 40 ? (0.5 + 0.5 * Math.sin(performance.now() / 200)).toFixed(2) : 0);
    // readouts
    const lb = $("#sp-livebox");
    if (st.showRead) { if (lb.hidden) lb.hidden = false; $("#sp-live").textContent = num(Math.round(content() / g * 2) / 2 * g); $("#sp-livesub").textContent = st.air > 0 ? `mL (includes ${st.risen ? "an air pocket" : "air bubbles"})` : "mL (top edge of the stopper)"; }
    // step tracker + tips
    const c = content(), onLine = Math.abs(c - st.target) <= g / 2 + 1e-9;
    let i = 4, t;
    if (st.air > 0) {
      i = 5;
      t = !st.risen ? (st.taps ? "<b>Keep tapping</b> the barrel until all the bubbles reach the top." : "<b>Air bubbles!</b> They take up space, so you would give less drug. <b>Tap the barrel</b> to make them rise.")
        : "<b>Bubbles at the top.</b> Now <b>Push ▲</b> (or drag the plunger up) to squeeze the air out through the needle.";
    } else if (onLine) { i = 6; t = `<b>On the line!</b> The top edge of the stopper is at ${mL(st.target)}${st.aired ? " and the air is out" : ""}. Check the label one last time, then <b>Confirm dose</b> and take it to the patient.`; }
    else if (c < st.target) t = L.guided ? `<b>Step 4.</b> Drag the plunger <b>down</b> (or hold <b>Pull ▼</b>) until the top edge of the black stopper reaches the <b>${num(st.target)}</b> line.` : "Draw up your dose: read at the <b>top edge</b> of the stopper. Use the magnifier for the last lines.";
    else t = st.aired ? "Air out. Now set the stopper exactly on your line again." : `Too far: <b>Push ▲</b> back to the ${num(st.target)} line.`;
    K.setStep(i);
    const tp = $("#sp-tip"); if (tp.dataset.t !== t) { tp.dataset.t = t; tp.innerHTML = t; }
  }

  /* ---------------- judging ---------------- */
  function disableAll() { view.querySelectorAll("#sp-panel button, #lab-hintbtn, #sp-in").forEach(b => b.disabled = true); }
  function confirmDose() {
    if (!st || st.done || st.phase !== "draw") return;
    cancelAnimationFrame(raf); draw(0); st.phase = "bedside"; K.setStep(6);
    phaseBedside();
  }
  /* 7. at the bedside: two identifiers on the wristband against the order */
  function phaseBedside() {
    const band = st.ptTrap === "dob" ? { name: "Alex Morgan", dob: "14 Mar 1986" } : st.ptTrap === "name" ? { name: "Alex Morgen", dob: "14 Mar 1968" } : { name: "Alex Morgan", dob: "14 Mar 1968" };
    panel().innerHTML = orderCard(true) + `<p class="br-label sp-mt">Step 7 · At the bedside</p>
      <div class="sp-cards"><div class="sp-order"><p class="br-label">Order says</p><p class="sp-line"><b>Alex Morgan</b></p><p class="sp-line">DOB 14 Mar 1968</p></div>
        <div class="sp-order sp-band"><p class="br-label">Wristband says</p><p class="sp-line"><b>${esc(band.name)}</b></p><p class="sp-line">DOB ${esc(band.dob)}</p></div></div>
      <div class="lab-controls"><button class="br-next sp-yes" id="sp-give">✓ Name and date of birth match: give</button><button class="br-ghost sp-no" id="sp-stop">✗ They don't match: stop and check</button></div>
      <p class="sp-tip" id="sp-tip" aria-live="polite"></p>`;
    tip(L.guided ? "<b>Step 7.</b> Ask the patient to say their full name and date of birth, and check both against the order and the wristband. Never use the bed number." : "<b>Step 7.</b> Check two identifiers before you give anything.");
    $("#sp-give").onclick = () => { st.ptOk = !st.ptTrap; if (st.ptTrap) return finishRun("wrongpt"); finishRun(); };
    $("#sp-stop").onclick = () => {
      if (st.ptTrap) { st.ptOk = true; st.ptCaught = true; BGX.reward(true, $("#sp-stop")); tip("<b>Well caught.</b> The wristband doesn't match the order. You stop, check with the team and find the right patient."); setTimeout(() => finishRun(), BGX.RM ? 0 : 1400); return; }
      if (!st.ptStopped) { st.ptStopped = true; slip("pt", "At the bedside you stopped although the name and date of birth matched (a delay, not harm, but a slip)."); }
      BGX.reward(false, null, { flash: $("#sp-tip") });
      tip("Look again: the name <b>and</b> the date of birth on the wristband match the order exactly. Give the dose.");
    };
  }
  function finishRun(why) {
    if (st.done) return;
    st.done = true; st.phase = "done"; K.setStep(7);
    disableAll();
    if (why === "wrongpt") {
      BGX.reward(false, null, { flash: view });
      return K.result({ n: 0, verdict: "Wrong patient.", levels: LEVELS, onLevel: start, onMenu: menu,
        why: `The wristband ${st.ptTrap === "dob" ? "date of birth (14 Mar 1986)" : "surname (Morgen)"} doesn't match the order (Alex Morgan, 14 Mar 1968). A perfect dose given to the wrong person is still a serious error: always match two identifiers before giving.`, extraHTML: rightsHTML() });
    }
    const g = st.syr.g, err = st.liquid - st.target, abs = Math.abs(err);
    let n0 = abs <= g / 2 + 1e-9 ? 3 : abs <= g + 1e-9 ? 2 : abs <= 2 * g + 1e-9 ? 1 : 0;
    const notes = [];
    if (st.air > 0 && n0 > 1) { n0 = 1; notes.push(`Air was left in the syringe (${mL(st.air)}). Air takes the place of drug, so the dose is short; always tap it up and push it out.`); }
    st.slips.forEach(s => notes.push(s.text));
    if (st.slips.length && n0 === 3) n0 = 2;
    if (st.calcMiss >= 2 && n0 > 1) n0 = 1;
    const n = K.capStars(n0);
    st.stars = n;
    const verdict = n0 === 3 ? "Perfect dose!" : n0 === 2 ? "Very close." : n0 === 1 ? "Close enough to pass." : abs > 2 * g && err < 0 ? "Dose too small." : "Dose too large.";
    const lines = abs <= g / 2 + 1e-9 ? `You drew up ${mL(Math.round(st.liquid / g) * g)} of drug, exactly the ${mL(st.target)} needed.`
      : `You drew up about ${mL(Math.round(st.liquid / g * 2) / 2 * g)} of drug; the dose needed ${mL(st.target)} (${err > 0 ? "over" : "under"} by ${num(Math.round(abs / g * 10) / 10)} line${abs > g * 1.05 ? "s" : ""}). Read at the top edge of the stopper and use Pull/Push for the last lines.`;
    BGX.reward(n > 0, $("#sp-confirm"), { flash: view });
    K.result({ n, verdict, levels: LEVELS, onLevel: start, onMenu: menu,
      why: lines + (notes.length ? " " + notes.join(" ") : "") + K.capNote(n0) + `<br><small class="sp-startxt">${STARTXT}</small>`,
      extraHTML: zoomSVG() + rightsHTML() });
  }
  function zoomSVG() {   // a close-up strip of the barrel around the target, with the target line and your stopper
    const s = st.syr, g = s.g, Wd = 300, Hh = 110, span = Math.max(6 * g, 0); const lo = Math.max(0, st.target - span), hi = Math.min(s.ml, st.target + span);
    const X = v => 16 + (v - lo) / (hi - lo) * (Wd - 32);
    let t = "";
    for (let i = Math.ceil(lo / g - 1e-9); i * g <= hi + 1e-9; i++) { const v = i * g, x = X(v).toFixed(1), mj = isMult(v, s.major), md = isMult(v, s.mid);
      t += `<line x1="${x}" x2="${x}" y1="30" y2="${30 + (mj ? 22 : md ? 16 : 10)}" stroke="var(--ink)" stroke-width="${mj ? 1.3 : .8}"/>${mj || md || g >= 0.1 ? `<text x="${x}" y="24" text-anchor="middle" font-size="10" font-family="var(--font-mono)" fill="var(--muted)">${num(v)}</text>` : ""}`; }
    const yx = Math.max(10, Math.min(Wd - 10, X(content())));
    return `<figure class="lab-curve sp-zoom"><svg viewBox="0 0 ${Wd} ${Hh}" role="img" aria-label="Close-up of the syringe scale: target line and where your stopper stopped">
      <rect x="10" y="30" width="${Wd - 20}" height="44" rx="4" fill="#e6f3ff" stroke="var(--line)"/>${t}
      <line x1="${X(st.target).toFixed(1)}" x2="${X(st.target).toFixed(1)}" y1="26" y2="80" stroke="#4CB050" stroke-width="2.4"/>
      <rect x="${yx.toFixed(1)}" y="31" width="${Math.max(0, Wd - 10 - yx).toFixed(1)}" height="42" fill="#2b3038" opacity=".85"/>
      <line x1="${yx.toFixed(1)}" x2="${yx.toFixed(1)}" y1="26" y2="80" stroke="#E83E8C" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="${Wd / 2}" y="98" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="var(--font-mono)">mL on the ${s.ml} mL syringe (lines every ${num(g)} mL) →</text>
    </svg><figcaption><span style="color:#4CB050">━</span> the ${mL(st.target)} line · <span style="color:#E83E8C">┅</span> top edge of your stopper · the dark block is the rubber stopper</figcaption></figure>`;
  }
  function rightsHTML() {
    const c = st.c, g = st.good, ok = b => b ? `<span class="sp-ok">✓</span>` : `<span class="sp-x">✗</span>`;
    const conv = c.du !== g.su && g.su !== "units";
    const rows = [
      [st.hands === true, "Clean hands", st.hands === true ? "Hands cleaned before touching the medicine." : "Clean your hands before you touch the vial."],
      [st.trap ? st.caught : true, "Right drug & vial", st.trap ? (st.caught ? `You caught the wrong vial (${st.trap.kind === "expired" ? "expired" : st.trap.kind === "strength" ? "wrong strength" : st.trap.kind === "route" ? "look-alike drug, IM only" : "look-alike name"}).` : `The vial was wrong: ${trapWhy(st.trap)}`) : `${esc(g.name)} ${qty(g.s, g.su)}/mL, in date (EXP ${g.exp}).`],
      [st.calcMiss === 0, "Right dose (calculation)", `${workingText()}${conv ? " Converting first avoids 10× and 1000× errors." : ""}`],
      [true, "Right route", `${c.r}: the label allows "${esc(g.routeTxt)}".`],
      [st.syr ? st.syrMiss === 0 : false, "Right syringe", st.syr ? `${st.accept[0]} mL: the smallest that holds ${mL(st.target)} has the finest lines.` : `${st.accept[0]} mL for ${mL(st.target)}.`],
      [st.prep.includes("swab") && st.prep.includes("air") && !st.prep.includes("order") && !st.prep.includes("blow"), "Vial prepared", st.prep.includes("air") ? "Top swabbed and left to dry, then air equal to the dose injected." : "Not reached."],
      [st.ptOk === true && !st.ptStopped, "Right patient", st.ptOk == null ? "Not reached." : st.ptCaught ? "You caught a wristband that didn't match the order." : st.ptOk ? "Name and date of birth matched the order." : "The wristband didn't match the order."],
      [st.phase === "done" ? st.air === 0 : false, "Air out", st.phase === "done" ? (st.planAir ? (st.air === 0 ? "Bubbles tapped up and pushed out." : "Air was still in the syringe.") : "No bubbles this time: still always look for them.") : "Not reached."]
    ];
    return `<div class="sp-rights"><p class="br-label">Your checks</p><ul>${rows.map(([b, h, t]) => `<li>${ok(b)}<span><b>${h}.</b> ${t}</span></li>`).join("")}</ul>
      <p class="sp-small"><b>Remember:</b> check the label three times (when you take the vial, while you draw it up, and at the bedside before giving), identify the patient with two identifiers, and write a leading zero (0.5 mL) but never a trailing zero (5 mL, not 5.0 mL). <b>Practice simulation, not medical advice.</b></p></div>`;
  }

  /* keyboard: arrows move one line, T taps, Enter confirms */
  document.addEventListener("keydown", e => {
    if (!st || st.done || st.phase !== "draw" || document.querySelector(".br-milestone")) return;
    if (e.target && e.target.tagName === "INPUT") return;
    if (e.key === "ArrowDown") { e.preventDefault(); nudge(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); nudge(-1); }
    else if (e.key === "t" || e.key === "T") tapBarrel();
    else if (e.key === "Enter" && !(e.target && e.target.tagName === "BUTTON")) { e.preventDefault(); confirmDose(); }
  });

  // test hook: what an automated check needs to play perfectly (hidden answers are not shown in the game)
  BGX.lab = { state: () => st, reading: () => st && content() };
  menu();
})();
