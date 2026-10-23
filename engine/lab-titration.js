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
    { n: 1, title: "First titration", desc: "Guided: hints tell you when to slow down.", hints: true, min: 18, max: 24, calc: false },
    { n: 2, title: "On your own", desc: "No hints. Watch for the pink flashes yourself.", hints: false, min: 12, max: 30, calc: false },
    { n: 3, title: "Work it out", desc: "Find the endpoint, then calculate the acid's concentration.", hints: false, min: 14, max: 28, calc: true }
  ];
  const STARS = { 3: 0.10, 2: 0.25, 1: 0.50 };    // allowed error (mL) for each star rating
  const stars = BGX.store.get("lab_" + ID, {});
  let L = null, st = null, raf = 0;

  BGX.shell();
  BGX.recordPlay({ id: ID, title: "Titration Lab", subject: "chemistry", url: "games/" + ID + "/index.html", tagline: "Hands-on lab: find the endpoint" });

  /* ---------------- menu ---------------- */
  function menu() {
    cancelAnimationFrame(raf); st = null;
    view.innerHTML = `
      <div class="br-hero"><h2>Titration Lab</h2><p>Hands-on chemistry: find the exact moment acid is neutralised</p></div>
      <div class="lab-intro">
        <div><p class="br-label">What you're doing</p>
          <p>The flask holds <b>25.0 mL of hydrochloric acid</b> with a few drops of <b>phenolphthalein</b>, an indicator that is colourless in acid and turns pink in base.
          The burette above holds <b>sodium hydroxide</b>, a base. Add it until every bit of acid is neutralised: the first drop extra turns the whole flask <b>pale pink</b>. That moment is the <b>endpoint</b>.</p>
          <p class="lab-eq">HCl + NaOH → NaCl + H₂O</p></div>
        <div class="life"><p class="br-label">In real life</p><p>Titrations check how strong vinegar is, test water quality, and make sure every batch of a medicine has exactly the right amount of active ingredient.</p></div>
      </div>
      <p class="br-label" style="margin-top:22px">Choose a level</p>
      <div class="br-modes">${LEVELS.map(l => `<button class="br-mode" data-l="${l.n}">
        <span class="ic" style="background:var(--cat-${l.n === 1 ? "sky" : l.n === 2 ? "orchid" : "amber"})">${l.n}</span>
        <span><h3>${esc(l.title)}</h3><p>${esc(l.desc)}</p><span class="best">${starText(stars[l.n] || 0)}</span></span></button>`).join("")}</div>
      <p class="br-hint" style="margin-top:16px"><b>Controls:</b> hold <b>Pour</b> for a steady stream, tap <b>1 drop</b> near the end, <b>Swirl</b> to mix. Keyboard: hold Space to pour, D for a drop, S to swirl, Enter at the endpoint.</p>
      <p class="br-hint">In a real lab: wear goggles and gloves. Sodium hydroxide is corrosive, even when dilute.</p>
      <p class="br-hint"><a class="br-crumb" href="${BGX.root}subjects/chemistry/index.html">← Chemistry</a></p>`;
    view.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { BGX.sfx.tap(); start(LEVELS[+b.dataset.l - 1]); });
  }
  const starText = n => n ? "★".repeat(n) + "☆".repeat(3 - n) + " best" : "Not tried yet";

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
  function start(level) {
    L = level;
    const vend = +(L.min + Math.random() * (L.max - L.min)).toFixed(2);
    st = { V: 0, vend, flash: 0, pouring: false, swirlT: 0, done: false, drops: [], lastTick: 0, t: performance.now() };
    view.innerHTML = `
      <div class="br-top"><button class="br-quit" id="lab-quit">✕ Labs</button><span class="br-label" style="margin:0;flex:1">Level ${L.n} · ${esc(L.title)}</span><span class="br-count">${starText(stars[L.n] || 0)}</span></div>
      <div class="lab-stage">
        <div class="lab-scenewrap">${sceneSVG()}</div>
        <div class="lab-side">
          <div class="lab-read"><p class="br-label">Burette reading</p><b id="lab-reading">0.00</b><span>mL added</span></div>
          <div class="lab-read is-flask"><p class="br-label">In the flask</p><span>25.0 mL HCl + phenolphthalein</span></div>
          <p class="lab-hint" id="lab-hint" aria-live="polite">${L.hints ? "Hold <b>Pour</b> to add sodium hydroxide. Watch the flask closely." : "Find the endpoint: the first pale pink that stays after swirling."}</p>
        </div>
      </div>
      <div class="lab-controls">
        <button class="lab-btn is-pour" id="lab-pour" aria-label="Hold to pour">Hold to pour</button>
        <button class="lab-btn" id="lab-drop">+1 drop</button>
        <button class="lab-btn" id="lab-swirlbtn">Swirl</button>
      </div>
      <div class="lab-controls"><button class="br-next lab-end" id="lab-end">Endpoint reached</button></div>
      <div class="br-feedback" id="lab-fb" aria-live="polite"></div>`;
    $("#lab-quit").onclick = menu;
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
    if (d > 0 && d < 1.6) st.flash = Math.min(1, st.flash + (st.V - before) * (1.6 - d) * 1.6);   // local pink where the base lands
  }

  function loop(now) {
    if (!st) return;
    const dt = Math.min(0.05, (now - st.t) / 1000); st.t = now;
    if (!st.done && st.pouring) {
      add(POUR_RATE * dt);
      if (now - st.lastTick > 90) { st.lastTick = now; BGX.tone([900 + Math.random() * 200], .02, "sine", 0, .015); }
    }
    // falling drops land in the flask, then count
    st.drops.forEach(d => { d.y += 420 * dt; });
    st.drops = st.drops.filter(d => { if (d.y >= 468) { add(d.add); return false; } return true; });
    // mixing: the local pink fades, faster while swirling
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
    // flask liquid rises a little as base is added
    const h = 34 + st.V * 0.45, top = 506 - h;
    ["#lab-liquid", "#lab-pink"].forEach(s => { const r = $(s); r.setAttribute("y", top.toFixed(1)); r.setAttribute("height", (h + 4).toFixed(1)); });
    $("#lab-pink").setAttribute("opacity", Math.max(permanentPink(), st.flash * 0.75).toFixed(3));
    const sw = $("#lab-swirl"); sw.setAttribute("cy", (top + 8).toFixed(1)); sw.setAttribute("opacity", swirling ? (0.25 + 0.2 * Math.sin(performance.now() / 60)).toFixed(2) : 0);
    $("#lab-flask").style.transform = swirling && !BGX.RM ? `rotate(${(Math.sin(performance.now() / 70) * 3).toFixed(2)}deg)` : "";
    if (L.hints && !st.done) {
      const d = st.vend - st.V, hint = $("#lab-hint");
      hint.innerHTML = d > 1.6 ? "Hold <b>Pour</b> to add sodium hydroxide. Watch the flask closely."
        : d > 0 ? "<b>Pink flashes!</b> You're close. Switch to <b>+1 drop</b> and swirl after each one."
        : "The pink stays after swirling: press <b>Endpoint reached</b> now.";
    }
  }

  /* ---------------- judging ---------------- */
  function endpoint() {
    if (!st || st.done) return;
    st.pouring = false; st.drops.forEach(d => add(d.add)); st.drops = [];
    st.done = true;
    const read = +reading(st.V), err = st.V - st.vend, abs = Math.abs(err);
    let n = 0; for (const s of [3, 2, 1]) if (abs <= STARS[s]) { n = s; break; }
    const btn = $("#lab-end"); btn.disabled = true;
    view.querySelectorAll(".lab-btn").forEach(b => b.disabled = true);
    const verdict = n === 3 ? "Perfect endpoint!" : n === 2 ? "Very close." : n === 1 ? "Close enough to pass." : err < 0 ? "Too early." : "Overshot.";
    const why = err < -STARS[1] ? "The flask was still colourless after swirling, so some acid was left."
      : err > STARS[1] ? "The flask went past pale pink to a deeper pink: extra base was added after the acid ran out."
      : `The true endpoint was ${st.vend.toFixed(2)} mL; you stopped at ${read.toFixed(2)} mL.`;
    BGX.reward(n > 0, btn, { flash: view });
    if (L.calc && n > 0) return calcQuestion(read, n, verdict, why);
    finish(n, verdict, why);
  }

  function calcQuestion(read, n, verdict, why) {
    const c = BASE_M * read / ACID_ML;
    const f = x => x.toFixed(3);
    const opts = BGX.shuffle([...new Set([f(c), f(c * 10), f(BASE_M * ACID_ML / read), f(read / ACID_ML)])]);
    $("#lab-fb").innerHTML = `<span class="ok">${verdict}</span> ${esc(why)}
      <div class="lab-calc"><p class="br-label">Now work it out</p>
        <p>You used <b>${read.toFixed(2)} mL</b> of <b>0.100 mol/L</b> NaOH to neutralise <b>25.0 mL</b> of HCl. They react one to one. What is the HCl concentration?</p>
        <div class="br-answers">${opts.map(o => `<button class="br-ans is-small" data-o="${o}">${o} mol/L</button>`).join("")}</div></div>`;
    view.querySelectorAll("[data-o]").forEach(b => b.onclick = () => {
      const ok = b.dataset.o === f(c);
      view.querySelectorAll("[data-o]").forEach(x => { x.disabled = true; if (x.dataset.o === f(c)) x.classList.add("is-correct"); });
      if (!ok) b.classList.add("is-wrong");
      BGX.reward(ok, b, { flash: view });
      const total = ok ? n : Math.max(0, n - 1);
      finish(total, ok ? "Calculation correct." : "Not quite.",
        `Moles of NaOH = 0.100 × ${read.toFixed(2)} ÷ 1000. The acid has the same number of moles in 25.0 mL, so its concentration = 0.100 × ${read.toFixed(2)} ÷ 25.0 = ${f(c)} mol/L.`, true);
    });
  }

  function finish(n, verdict, why, append) {
    if (n > (stars[L.n] || 0)) { stars[L.n] = n; BGX.store.set("lab_" + ID, stars); }
    if (n === 3) { BGX.sfx.big(); BGX.rain(160); } else if (n > 0) BGX.sfx.win();
    const html = `<div class="lab-result"><div class="lab-stars" aria-label="${n} of 3 stars">${"★".repeat(n)}<span>${"☆".repeat(3 - n)}</span></div>
      <p><span class="${n ? "ok" : "no"}">${verdict}</span> ${esc(why)}</p>
      <div class="br-btns"><button class="br-next" id="lab-again">Try again</button>${L.n < 3 && n ? `<button class="br-ghost" id="lab-next">Next level</button>` : ""}<button class="br-ghost" id="lab-menu">All levels</button></div></div>`;
    const fb = $("#lab-fb");
    fb.innerHTML = append ? fb.innerHTML + html : html;
    $("#lab-again").onclick = () => start(L); $("#lab-menu").onclick = menu;
    const nx = $("#lab-next"); if (nx) nx.onclick = () => start(LEVELS[L.n]);
    fb.scrollIntoView({ behavior: BGX.RM ? "auto" : "smooth", block: "nearest" });
  }

  /* keyboard: Space pours, D drops, S swirls, Enter = endpoint */
  document.addEventListener("keydown", e => {
    if (!st || st.done || document.querySelector(".br-milestone")) return;
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
