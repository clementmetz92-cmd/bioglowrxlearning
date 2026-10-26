/* BioglowRX — Titration Lab (Chemistry, chapters 16–17).
   A hands-on mini game: pour sodium hydroxide from a burette into hydrochloric acid with
   phenolphthalein indicator, and stop at the first permanent pale pink (the endpoint).
   Loads after core.js and icons.js. */
(function () {
  "use strict";
  const BGX = window.BGX, esc = BGX.esc;
  const view = document.getElementById("br-view");
  const $ = s => view.querySelector(s);
  const ID = "titration-lab";

  const ACID_ML = 25.0, BASE_M = 0.100;          // 25.0 mL HCl in the flask, 0.100 mol/L NaOH in the burette
  const POUR_RATE = 0.9, DROP_ML = 0.05;          // mL per second when holding the tap open; one drop
  const LEVELS = [
    { n: 1, title: "First titration", desc: "Guided: a pH meter, a 'slow down' band on the burette and step-by-step tips.", hints: true, min: 18, max: 24, calc: false },
    { n: 2, title: "On your own", desc: "No meter, no band. Watch for the pink flashes yourself (hints if you need them).", hints: false, min: 12, max: 30, calc: false },
    { n: 3, title: "Work it out", desc: "Find the endpoint, then calculate the acid's concentration from your reading.", hints: false, min: 14, max: 28, calc: true }
  ];
  const STARS = { 3: 0.10, 2: 0.25, 1: 0.50 };    // allowed error (mL) for each star rating
  const K = BGX.labKit({ id: ID, title: "Titration Lab", subject: "chemistry", subjectName: "Chemistry", tagline: "Hands-on lab: find the endpoint" });
  const stars = K.stars;
  let L = null, st = null, raf = 0;
  const STEPS = [
    "Hold <b>Pour</b> to let sodium hydroxide run in quickly. The burette reading shows how many mL you have added.",
    "Slow down when <b>pink flashes</b> appear and fade where the drops land (or when you reach the orange <b>slow down</b> band, if it is shown).",
    "Now add <b>+1 drop</b> at a time and press <b>Swirl</b> after each drop to mix.",
    "Stop at the first <b>pale pink that stays</b> after swirling, and press <b>Endpoint reached</b>. Deep pink means you went too far.",
    "Level 3 only: use your reading to work out how concentrated the acid was."
  ];

  /* ---------------- menu ---------------- */
  function menu() {
    cancelAnimationFrame(raf); st = null;
    K.menu({
      hero: "Hands-on chemistry: find the exact moment acid is neutralised",
      introHTML: `<p>The flask holds <b>25.0 mL of hydrochloric acid</b> with a few drops of <b>phenolphthalein</b>, an indicator that is colourless in acid and turns pink in base.
        The burette above holds <b>sodium hydroxide</b> (0.100 mol/L), a base. Add it until every bit of acid is neutralised: the first drop extra turns the whole flask <b>pale pink</b>. That moment is the <b>endpoint</b>, and the burette reading then is your answer.</p>
        <p class="lab-eq">HCl + NaOH → NaCl + H₂O</p>
        <p><b>How to get the right number:</b> the endpoint is different every run, so you can't know it in advance. The clue is in the flask: far from the endpoint the drops vanish instantly; close to it, each drop leaves a <b>pink flash</b> that fades as you swirl. Flashes mean "go drop by drop now".</p>`,
      lifeHTML: `<p>Titrations check how strong vinegar is, test water quality, and make sure every batch of a medicine has exactly the right amount of active ingredient.</p>`,
      steps: STEPS, levels: LEVELS, onStart: start,
      controls: "hold <b>Pour</b> for a steady stream, tap <b>+1 drop</b> near the end, <b>Swirl</b> to mix. Keyboard: hold Space to pour, D for a drop, S to swirl, Enter at the endpoint.",
      safety: "In a real lab: wear goggles and gloves. Sodium hydroxide is corrosive, even when dilute."
    });
  }

  /* ---------------- the scene ---------------- */
  const B_TOP = 44, B_BOT = 324, PX = (B_BOT - B_TOP) / 50;   // burette scale: 0 mL at top, 50 mL at bottom
  function sceneSVG() {
    let ticks = "";
    for (let v = 0; v <= 50; v++) {
      const y = B_TOP + v * PX, major = v % 5 === 0;
      ticks += `<line x1="${major ? 166 : 170}" x2="176" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--muted)" stroke-width="${major ? 1 : .6}"/>`;
      if (major) ticks += `<text x="160" y="${(y + 3.5).toFixed(1)}" text-anchor="end" font-size="9" font-family="var(--font-mono)" fill="var(--muted)">${v}</text>`;
    }
    return `<svg viewBox="0 0 360 520" class="lab-scene" role="img" aria-label="Burette above a conical flask">
      <defs>
        <linearGradient id="glass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".25" stop-color="#fff" stop-opacity=".08"/><stop offset=".8" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
        <linearGradient id="naoh" x1="0" x2="1"><stop offset="0" stop-color="#cfe8ff"/><stop offset=".5" stop-color="#e9f5ff"/><stop offset="1" stop-color="#bcdcf7"/></linearGradient>
        <clipPath id="flaskclip"><path d="M163 394 V430 L104 498 Q100 506 110 506 H250 Q260 506 256 498 L197 430 V394 Z"/></clipPath>
      </defs>
      <!-- stand -->
      <rect x="40" y="504" width="190" height="10" rx="3" fill="var(--muted)" opacity=".55"/>
      <rect x="56" y="40" width="7" height="466" rx="3" fill="var(--muted)" opacity=".55"/>
      <rect x="60" y="210" width="112" height="6" rx="3" fill="var(--muted)" opacity=".6"/>
      <rect x="166" y="203" width="28" height="20" rx="5" fill="none" stroke="var(--muted)" stroke-width="3" opacity=".7"/>
      <!-- burette -->
      <rect x="176" y="34" width="20" height="292" rx="3" fill="var(--bg)" stroke="var(--line)"/>
      <rect id="lab-base" x="178" y="${B_TOP}" width="16" height="${B_BOT - B_TOP}" fill="url(#naoh)"/>
      <path id="lab-meniscus" d="M178 ${B_TOP} Q186 ${B_TOP + 4} 194 ${B_TOP}" stroke="#7fb3e0" stroke-width="1.4" fill="none"/>
      <path d="M178 324 L183 344 H189 L194 324 Z" fill="url(#naoh)" stroke="var(--line)"/>
      <rect x="176" y="34" width="20" height="292" rx="3" fill="url(#glass)" stroke="var(--muted)" stroke-opacity=".6"/>
      <rect id="lab-band" x="176" y="0" width="20" height="0" fill="#FFB020" opacity="0"/>
      <text id="lab-bandtxt" x="199" y="0" font-size="12" font-weight="700" font-family="var(--font-mono)" fill="#C77700" opacity="0">slow down</text>
      ${ticks}
      <!-- tap -->
      <rect x="183" y="342" width="6" height="18" fill="var(--muted)"/>
      <g id="lab-tap" style="transform-origin:186px 350px;transition:transform .15s"><rect x="172" y="347" width="28" height="6" rx="3" fill="var(--accent)"/></g>
      <path d="M184.5 360 L185.5 378 H186.5 L187.5 360 Z" fill="var(--muted)"/>
      <!-- stream and drops -->
      <rect id="lab-stream" x="185.2" y="378" width="1.6" height="0" fill="#a9d2f5"/>
      <g id="lab-drops"></g>
      <!-- flask -->
      <g id="lab-flask" style="transform-origin:180px 506px">
        <g clip-path="url(#flaskclip)">
          <rect id="lab-liquid" x="100" y="470" width="160" height="40" fill="#eef6ff"/>
          <rect id="lab-pink" x="100" y="470" width="160" height="40" fill="#E83E8C" opacity="0"/>
          <ellipse id="lab-swirl" cx="180" cy="490" rx="40" ry="6" fill="#fff" opacity="0"/>
        </g>
        <path d="M163 394 V430 L104 498 Q100 506 110 506 H250 Q260 506 256 498 L197 430 V394" fill="url(#glass)" stroke="var(--muted)" stroke-width="1.6"/>
        <path d="M158 392 H202" stroke="var(--muted)" stroke-width="3" stroke-linecap="round"/>
        <path d="M112 494 L150 452" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>
      </g>
      <!-- white tile under the flask, as in a real lab -->
      <rect x="100" y="506" width="160" height="0" fill="#fff"/>
    </svg>`;
  }

  /* ---------------- a run ---------------- */
  function pHat(V) {   // strong acid + strong base: excess H+ (or OH-) in the total volume, with water's own ions
    const x = (BASE_M * st.vend - BASE_M * V) / (ACID_ML + V);      // mmol/mL = mol/L of excess acid (negative = excess base)
    const h = (x + Math.sqrt(x * x + 4e-14)) / 2;
    return -Math.log10(h);
  }
  const phWord = p => p < 3 ? "strongly acidic" : p < 6.5 ? "acidic" : p <= 7.5 ? "neutral" : p < 11 ? "basic" : "strongly basic";

  function start(level) {
    L = level; cancelAnimationFrame(raf);
    const vend = +(L.min + Math.random() * (L.max - L.min)).toFixed(2);
    const lo = +(vend - (0.5 + Math.random() * 1.0)).toFixed(1);       // a "rough run" range 2 mL wide that contains the endpoint
    st = { V: 0, vend, band: [lo, +(lo + 2).toFixed(1)], showBand: L.hints, showPH: L.hints, flash: 0, seenFlash: false, pouring: false, swirlT: 0, done: false, drops: [], lastTick: 0, t: performance.now() };
    K.begin(L, L.hints ? [
      "Drop, swirl, look. If the pink fades after the swirl, add one more drop. The first pink that <b>stays</b> is the endpoint.",
      () => `Watch the pH meter: it stays low for a long time, then jumps. The jump happens inside the orange band (${st.band[0].toFixed(1)}–${st.band[1].toFixed(1)} mL). By pH 4 you should be adding single drops.`
    ] : [
      () => { st.showBand = true; return `A quick rough run (chemists always do one first) found the endpoint between <b>${st.band[0].toFixed(1)} and ${st.band[1].toFixed(1)} mL</b>. It's now shaded orange on the burette: pour fast to the top of the band, then go drop by drop.`; },
      () => { st.showPH = true; return "The pH meter is now on. Acid sits near pH 1–2 and barely moves; close to the endpoint it shoots up. Once it passes about 4, add one drop at a time."; },
      "The endpoint is the first <b>pale</b> pink that is still there after you swirl. If it fades, add one more drop. If it's deep pink, you've gone too far."
    ]);
    view.innerHTML = K.topHTML(L) + `
      <div class="lab-stage lab-run">
        <div class="lab-scenewrap">${sceneSVG()}</div>
        <div class="lab-side">
          <div class="lab-read"><p class="br-label">Burette reading</p><b id="lab-reading">0.00</b><span>mL of NaOH added</span></div>
          <div class="lab-read is-ph" id="lab-phbox" hidden><p class="br-label">pH meter</p><b id="lab-ph">1.0</b><span id="lab-phword">strongly acidic</span><i class="lab-phbar"><i id="lab-phfill"></i></i></div>
          <div class="lab-read is-flask"><p class="br-label">In the flask</p><span>25.0 mL HCl + phenolphthalein</span></div>
          <p class="lab-hint" id="lab-hint" aria-live="polite"></p>
        </div>
      </div>
      <div class="lab-controls">
        <button class="lab-btn is-pour" id="lab-pour" aria-label="Hold to pour">Hold to pour</button>
        <button class="lab-btn" id="lab-drop">+1 drop</button>
        <button class="lab-btn" id="lab-swirlbtn">Swirl</button>
      </div>
      <div class="lab-controls"><button class="br-next lab-end" id="lab-end">Endpoint reached</button></div>
      ${K.hintHTML()}
      <details class="lab-howrun"${L.n === 1 ? " open" : ""}><summary>How to do it</summary>${K.stepsHTML(STEPS.slice(0, L.calc ? 5 : 4))}</details>
      <div class="br-feedback" id="lab-fb" aria-live="polite"></div>`;
    $("#lab-quit").onclick = menu;
    K.bindHints();
    const pour = $("#lab-pour");
    const on = e => { e.preventDefault(); if (st.done) return; st.pouring = true; pour.classList.add("is-on"); };
    const off = () => { if (!st) return; st.pouring = false; pour.classList.remove("is-on"); };
    pour.addEventListener("pointerdown", on); ["pointerup", "pointerleave", "pointercancel"].forEach(ev => pour.addEventListener(ev, off));
    pour.addEventListener("contextmenu", e => e.preventDefault());
    $("#lab-drop").onclick = () => addDrop();
    $("#lab-swirlbtn").onclick = () => swirl();
    $("#lab-end").onclick = () => endpoint();
    st.t = performance.now(); raf = requestAnimationFrame(loop);
  }

  function addDrop() {
    if (!st || st.done) return;
    st.drops.push({ y: 378, add: DROP_ML });
    BGX.tone([1200], .03, "sine", 0, .03);
  }
  function swirl() {
    if (!st || st.done) return;
    st.swirlT = 0.9; BGX.sfx.tap();
  }
  function add(ml) {
    const before = st.V;
    st.V = Math.min(50, st.V + ml);
    const d = st.vend - st.V;                       // mL still needed
    if (d > 0 && d < 1.6) { st.flash = Math.min(1, st.flash + (st.V - before) * (1.6 - d) * 1.6); if (st.flash > .15) st.seenFlash = true; }   // local pink where the base lands
  }

  function loop(now) {
    if (!st) return;
    const dt = Math.min(0.05, (now - st.t) / 1000); st.t = now;
    if (!st.done && st.pouring) {
      add(POUR_RATE * dt);
      if (now - st.lastTick > 90) { st.lastTick = now; BGX.tone([900 + Math.random() * 200], .02, "sine", 0, .015); }
    }
    st.drops.forEach(d => { d.y += 420 * dt; });
    st.drops = st.drops.filter(d => { if (d.y >= 468) { add(d.add); return false; } return true; });
    const swirling = st.swirlT > 0;
    st.swirlT = Math.max(0, st.swirlT - dt);
    st.flash = Math.max(0, st.flash - dt * (swirling ? 2.2 : 0.35));
    draw(swirling);
    raf = requestAnimationFrame(loop);
  }

  function permanentPink() {
    const over = st.V - st.vend;
    return over < 0 ? 0 : Math.min(1, 0.32 + over * 0.7);    // pale at the endpoint, deep magenta 1 mL past it
  }
  function reading(v) { return (Math.round(v / 0.05) * 0.05).toFixed(2); }   // burettes are read to the nearest 0.05 mL

  function draw(swirling) {
    const y = B_TOP + st.V * PX;
    const base = view.querySelector("#lab-base"); if (!base) return;
    base.setAttribute("y", y.toFixed(1)); base.setAttribute("height", Math.max(0, B_BOT - y).toFixed(1));
    $("#lab-meniscus").setAttribute("d", `M178 ${y.toFixed(1)} Q186 ${(y + 4).toFixed(1)} 194 ${y.toFixed(1)}`);
    $("#lab-reading").textContent = reading(st.V);
    $("#lab-tap").style.transform = st.pouring && !st.done ? "rotate(90deg)" : "rotate(0deg)";
    $("#lab-stream").setAttribute("height", st.pouring && !st.done ? 92 : 0);
    $("#lab-drops").innerHTML = st.drops.map(d => `<ellipse cx="186" cy="${d.y.toFixed(1)}" rx="2.6" ry="3.4" fill="#a9d2f5"/>`).join("");
    const h = 34 + st.V * 0.45, top = 506 - h;
    ["#lab-liquid", "#lab-pink"].forEach(s => { const r = $(s); r.setAttribute("y", top.toFixed(1)); r.setAttribute("height", (h + 4).toFixed(1)); });
    $("#lab-pink").setAttribute("opacity", Math.max(permanentPink(), st.flash * 0.75).toFixed(3));
    const sw = $("#lab-swirl"); sw.setAttribute("cy", (top + 8).toFixed(1)); sw.setAttribute("opacity", swirling ? (0.25 + 0.2 * Math.sin(performance.now() / 60)).toFixed(2) : 0);
    $("#lab-flask").style.transform = swirling && !BGX.RM ? `rotate(${(Math.sin(performance.now() / 70) * 3).toFixed(2)}deg)` : "";
    // the "slow down" band (rough-run range) on the burette scale
    const band = $("#lab-band"), bt = $("#lab-bandtxt");
    if (st.showBand) {
      const y0 = B_TOP + st.band[0] * PX, y1 = B_TOP + st.band[1] * PX;
      band.setAttribute("y", y0.toFixed(1)); band.setAttribute("height", (y1 - y0).toFixed(1)); band.setAttribute("opacity", ".38");
      bt.setAttribute("y", (y0 - 3).toFixed(1)); bt.setAttribute("opacity", "1");
    }
    // pH meter
    const pb = $("#lab-phbox");
    if (st.showPH) {
      if (pb.hidden) pb.hidden = false;
      const p = pHat(st.V);
      $("#lab-ph").textContent = p.toFixed(1); $("#lab-phword").textContent = phWord(p);
      const f = $("#lab-phfill"); f.style.width = (p / 14 * 100).toFixed(1) + "%"; f.style.background = p < 4 ? "#E8503A" : p < 6.5 ? "#F2A33A" : p <= 7.5 ? "#4CB050" : "#5A62D6";
    }
    if (!st.done) {
      const d = st.vend - st.V, hint = $("#lab-hint");
      if (L.hints) {
        const i = d > 1.6 ? 0 : d > 0.5 ? 1 : d > 0 ? 2 : 3;
        K.setStep(i);
        hint.innerHTML = [
          st.V < st.band[0] - 0.5 ? `<b>Step 1.</b> Hold <b>Pour</b>. You can go fast until about <b>${st.band[0].toFixed(1)} mL</b> (top of the orange band).` : "<b>Step 1.</b> Nearly at the band: start using short taps or single drops.",
          "<b>Step 2. Pink flashes!</b> You're close. Stop pouring and switch to <b>+1 drop</b>.",
          "<b>Step 3.</b> One drop, then <b>Swirl</b>. Repeat until the pale pink stays.",
          "<b>Step 4.</b> The pink stays after swirling: press <b>Endpoint reached</b> now."][i];
      } else hint.innerHTML = st.seenFlash ? "Pink flashes seen: go drop by drop and swirl after each one." : "Find the endpoint: the first pale pink that stays after swirling.";
    }
  }

  /* titration curve with the player's stop and the true endpoint */
  function curveSVG(stop) {
    const vmax = Math.max(st.vend + 6, stop + 2), W = 300, H = 140, px = v => 30 + v / vmax * (W - 40), py = p => 10 + (14 - p) / 14 * (H - 30);
    let d = ""; for (let i = 0; i <= 160; i++) { const v = i / 160 * vmax; d += (i ? "L" : "M") + px(v).toFixed(1) + " " + py(pHat(v)).toFixed(1); }
    return `<figure class="lab-curve"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Titration curve: pH against volume of base added">
      <rect x="30" y="10" width="${W - 40}" height="${H - 30}" fill="var(--bg)" stroke="var(--line)"/>
      <line x1="30" x2="${W - 10}" y1="${py(7)}" y2="${py(7)}" stroke="var(--line)" stroke-dasharray="3 3"/>
      ${[0, 7, 14].map(p => `<text x="25" y="${py(p) + 3}" font-size="9" text-anchor="end" fill="var(--muted)" font-family="var(--font-mono)">${p}</text>`).join("")}
      <path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2.4"/>
      <line x1="${px(st.vend)}" x2="${px(st.vend)}" y1="10" y2="${H - 20}" stroke="#4CB050" stroke-width="1.6"/>
      <line x1="${px(stop)}" x2="${px(stop)}" y1="10" y2="${H - 20}" stroke="#E83E8C" stroke-width="1.6" stroke-dasharray="4 3"/>
      <text x="${W / 2}" y="${H - 4}" font-size="9" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)">mL of NaOH added →   pH ↑</text>
    </svg><figcaption><span style="color:#4CB050">━</span> true endpoint ${st.vend.toFixed(2)} mL · <span style="color:#E83E8C">┅</span> you stopped at ${reading(stop)} mL. See how pH barely moves, then jumps right at the endpoint: that jump is why you go drop by drop.</figcaption></figure>`;
  }

  /* ---------------- judging ---------------- */
  function endpoint() {
    if (!st || st.done) return;
    st.pouring = false; st.drops.forEach(d => add(d.add)); st.drops = [];
    st.done = true; K.setStep(L.calc ? 4 : 3);
    const read = +reading(st.V), err = st.V - st.vend, abs = Math.abs(err);
    let n0 = 0; for (const s of [3, 2, 1]) if (abs <= STARS[s]) { n0 = s; break; }
    const n = K.capStars(n0);
    const btn = $("#lab-end"); btn.disabled = true;
    view.querySelectorAll(".lab-btn, #lab-hintbtn").forEach(b => b.disabled = true);
    const verdict = n0 === 3 ? "Perfect endpoint!" : n0 === 2 ? "Very close." : n0 === 1 ? "Close enough to pass." : err < 0 ? "Too early." : "Overshot.";
    const why = (err < -STARS[1] ? "The flask was still colourless after swirling, so some acid was left. Next time keep adding single drops until the pink stays."
      : err > STARS[1] ? "The flask went past pale pink to a deeper pink: extra base was added after the acid ran out. Next time switch to single drops as soon as you see pink flashes."
      : `The true endpoint was ${st.vend.toFixed(2)} mL; you stopped at ${read.toFixed(2)} mL.`) + K.capNote(n0);
    BGX.reward(n > 0, btn, { flash: view });
    if (L.calc && n > 0) return calcQuestion(read, n, verdict, why);
    K.result({ n, verdict, why: esc(why), extraHTML: curveSVG(st.V), levels: LEVELS, onLevel: start, onMenu: menu });
  }

  function calcQuestion(read, n, verdict, why) {
    const c = BASE_M * read / ACID_ML;
    const f = x => x.toFixed(3);
    const opts = BGX.shuffle([...new Set([f(c), f(c * 10), f(BASE_M * ACID_ML / read), f(read / ACID_ML)])]);
    $("#lab-fb").innerHTML = `<span class="ok">${verdict}</span> ${esc(why)}
      <div class="lab-calc"><p class="br-label">Now work it out</p>
        <p>You used <b>${read.toFixed(2)} mL</b> of <b>0.100 mol/L</b> NaOH to neutralise <b>25.0 mL</b> of HCl. They react one to one. What is the HCl concentration?</p>
        <details class="lab-howcalc"><summary>💡 Show me how (beginner)</summary>
          <ol><li>Moles of NaOH used = concentration × volume = 0.100 × ${read.toFixed(2)} ÷ 1000 L.</li>
          <li>One NaOH neutralises one HCl, so the flask had the same number of moles of HCl.</li>
          <li>Concentration of HCl = moles ÷ its volume (25.0 mL). The ÷1000s cancel, so: <b>0.100 × ${read.toFixed(2)} ÷ 25.0</b>.</li></ol></details>
        <div class="br-answers">${opts.map(o => `<button class="br-ans is-small" data-o="${o}">${o} mol/L</button>`).join("")}</div></div>`;
    view.querySelectorAll("[data-o]").forEach(b => b.onclick = () => {
      const ok = b.dataset.o === f(c);
      view.querySelectorAll("[data-o]").forEach(x => { x.disabled = true; if (x.dataset.o === f(c)) x.classList.add("is-correct"); });
      if (!ok) b.classList.add("is-wrong");
      BGX.reward(ok, b, { flash: view });
      K.result({ n: ok ? n : Math.max(0, n - 1), verdict: ok ? "Calculation correct." : "Not quite.", append: true, levels: LEVELS, onLevel: start, onMenu: menu,
        why: esc(`Moles of NaOH = 0.100 × ${read.toFixed(2)} ÷ 1000. The acid has the same number of moles in 25.0 mL, so its concentration = 0.100 × ${read.toFixed(2)} ÷ 25.0 = ${f(c)} mol/L.`), extraHTML: curveSVG(st.V) });
    });
  }

  /* keyboard: Space pours, D drops, S swirls, Enter = endpoint */
  document.addEventListener("keydown", e => {
    if (!st || st.done || document.querySelector(".br-milestone")) return;
    /* Enter/Space on a focused button or field does that button's job, never the bench shortcut */
    const ui = e.target && e.target.closest && e.target.closest("button, a, input, select, textarea, [role=button]");
    if (ui && ui.id !== "lab-pour" && (e.key === "Enter" || e.code === "Space")) return;
    if (e.code === "Space") { e.preventDefault(); st.pouring = true; const p = $("#lab-pour"); if (p) p.classList.add("is-on"); }
    else if (e.key === "d" || e.key === "D") addDrop();
    else if (e.key === "s" || e.key === "S") swirl();
    else if (e.key === "Enter") { e.preventDefault(); endpoint(); }
  });
  document.addEventListener("keyup", e => { if (st && e.code === "Space") { st.pouring = false; const p = $("#lab-pour"); if (p) p.classList.remove("is-on"); } });

  // test hook: lets automated checks read the hidden endpoint (not shown anywhere in the game)
  BGX.lab = { state: () => st };
  menu();
})();
