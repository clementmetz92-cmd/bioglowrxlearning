/* BioglowRX — Pulse Lab (Health & Wellness + statistics coursework).
   A hands-on mini game: place two fingers on the radial (wrist) or carotid (neck) pulse,
   start a stopwatch, tap along with every beat, then work out beats per minute.
   Level 2 adds rest vs after exercise; level 3 adds class statistics (mean, median, range, outlier).
   Loads after core.js, icons.js and lab-kit.js. Educational simulation, not medical advice. */
(function () {
  "use strict";
  const BGX = window.BGX;
  const view = document.getElementById("br-view");
  const $ = s => view.querySelector(s);
  const ID = "pulse-lab";
  const K = BGX.labKit({ id: ID, title: "Pulse Lab", subject: "wellness", subjectName: "Health & Wellness", tagline: "Hands-on lab: find a pulse and measure heart rate" });

  const LEVELS = [
    { n: 1, title: "Find and count", desc: "Guided: a target circle, a live beat counter and a ×4 helper.", guided: true, rest: [62, 96] },
    { n: 2, title: "Rest vs exercise", desc: "Measure at rest, jog on the spot for a minute, measure again straight away, then compare both with the typical range.", ex: true, rest: [56, 90] },
    { n: 3, title: "Class statistics", desc: "Measure a classmate, add the reading to the class data, then find the mean, median, range and the outlier.", stats: true, rest: [62, 90] }
  ];
  const R_ON = 20, R_NEAR = 50;          // SVG units: on the pulse / close enough to feel a faint throb
  const TAU = 75;                        // s: how fast the after-exercise rate falls back towards resting
  const TRAY_Y = 372;                    // anything dropped below this goes back to the tray
  const HOME = { fingers: [118, 396], thumb: [252, 398] };
  const SITES = {
    wrist: { name: "Wrist", pulse: "radial", spot: [142, 244], label: "Wrist (radial)",
      where: "on the <b>thumb side</b> of the inside of the wrist, about two finger-widths below the wrist crease, in the soft dip between the edge of the bone and the tendon in the middle" },
    neck: { name: "Neck", pulse: "carotid", spot: [147, 198], label: "Neck (carotid)",
      where: "in the soft <b>groove beside the windpipe</b>, level with the Adam's apple and below the angle of the jaw. Press gently and on <b>one side only</b>" }
  };
  const STEPS = [
    "Pick where to feel: the <b>wrist</b> (radial pulse, the usual first choice) or the <b>neck</b> (carotid pulse).",
    "Drag the <b>index + middle fingers</b> from the tray onto the pulse spot. Not the thumb: it has a pulse of its own, so you could end up counting your own heartbeat.",
    "On the right spot the artery <b>throbs</b>, the fingertips flash and you hear a soft beat. Choose <b>15 s</b> or <b>30 s</b>, then press <b>Start stopwatch</b>.",
    "Tap <b>Beat</b> once for every throb until the stopwatch stops. Tap what you feel, not a rhythm you guess.",
    "Work out <b>beats per minute (bpm)</b>: a 15-second count × 4, or a 30-second count × 2."
  ];
  const STEP_EX = "Level 2: <b>hold Jog</b> for one (sped-up) minute, measure again <b>straight away</b>, then compare both readings with the typical adult resting range (about 60–100 bpm).";
  const STEP_ST = "Level 3: add your reading to the class table, work out the <b>mean</b>, <b>median</b> and <b>range</b>, and spot the <b>outlier</b>.";
  const NAMES = ["Ana", "Ben", "Chloé", "Dev", "Eli", "Farah", "Gus", "Hana", "Ivo", "Jun", "Kofi", "Lena", "Mo", "Nia"];

  let L = null, st = null, raf = 0;
  const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;   // mean 0, sd about 1

  /* ---------------- menu ---------------- */
  function menu() {
    cancelAnimationFrame(raf); st = null;
    K.menu({
      hero: "Hands-on health science: find a pulse, count it, work out the heart rate",
      introHTML: `<p>Every heartbeat pushes a wave of blood along the arteries. Where an artery runs close to the skin over something firm, you can feel that wave as a <b>pulse</b>. Count the pulses for a set time and you get the <b>heart rate</b> in <b>beats per minute (bpm)</b>.</p>
        <p class="lab-eq">bpm = beats in 15 s × 4 &nbsp;or&nbsp; beats in 30 s × 2</p>
        <p><b>Two places to feel it:</b> the <b>radial pulse</b> on the thumb side of the inside of the wrist, and the <b>carotid pulse</b> in the groove beside the windpipe. Use the pads of the <b>index and middle fingers</b>, never the thumb: the thumb has a pulse of its own, so you might count your own heartbeat instead.</p>`,
      lifeHTML: `<p>Nurses check the pulse as one of the vital signs, coaches use it to set training zones, and in statistics class it's a classic first dataset. For resting adults the typical range is about <b>60–100 bpm</b>; very fit people often sit lower, and exercise pushes it higher for a while.</p>`,
      steps: STEPS.concat([STEP_EX, STEP_ST]), levels: LEVELS, onStart: start,
      controls: "drag the fingers onto the body, press <b>Start stopwatch</b>, tap <b>Beat</b> with each throb. Keyboard: arrow keys move the fingers, Enter starts the stopwatch, Space taps a beat (and holds Jog on level 2).",
      safety: "<b>Educational simulation, not medical advice.</b> In real life press gently, and feel the carotid pulse on one side only, never both sides at once."
    });
  }

  /* ---------------- the scene ---------------- */
  function defs() {
    return `<defs>
      <linearGradient id="pl-skin" x1="0" x2="1"><stop offset="0" stop-color="#d9946c"/><stop offset=".3" stop-color="#f1c3a0"/><stop offset=".62" stop-color="#f6d1b3"/><stop offset="1" stop-color="#d99a73"/></linearGradient>
      <radialGradient id="pl-palm" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#f8d7bd"/><stop offset="1" stop-color="#eab18c"/></radialGradient>
      <linearGradient id="pl-neckg" x1="0" x2="1"><stop offset="0" stop-color="#c98760"/><stop offset=".22" stop-color="#eebc98"/><stop offset=".5" stop-color="#f5ceb0"/><stop offset=".78" stop-color="#eebc98"/><stop offset="1" stop-color="#c98760"/></linearGradient>
      <linearGradient id="pl-face" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f3c9a8"/><stop offset="1" stop-color="#e7ad87"/></linearGradient>
      <linearGradient id="pl-exam" x1="0" x2="1"><stop offset="0" stop-color="#8d5636"/><stop offset=".45" stop-color="#b87a52"/><stop offset="1" stop-color="#8a5332"/></linearGradient>
      <linearGradient id="pl-shirt" x1="0" x2="1"><stop offset="0" stop-color="#0c7d76"/><stop offset="1" stop-color="#15a39a"/></linearGradient>
      <radialGradient id="pl-face2" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e9eef2"/></radialGradient>
    </defs>`;
  }
  function wristSVG() {
    return `<g aria-hidden="true">
      <path d="M118 374 L124 238 Q126 216 131 205 L225 205 Q231 216 233 238 L247 374 Z" fill="url(#pl-skin)"/>
      <path d="M162 228 L157 340" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/>
      <path d="M166 228 L162 340" stroke="#b9774f" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>
      <path d="M181 228 L181 336" stroke="#fff" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/>
      <path d="M134 192 Q103 180 91 150 Q80 124 78 104 Q77 88 89 87 Q101 87 105 104 Q111 128 128 146 Z" fill="url(#pl-palm)" stroke="#c98a63" stroke-opacity=".5"/>
      <path d="M84 98 Q90 92 98 98" stroke="#c98a63" stroke-opacity=".45" fill="none"/>
      <rect x="130" y="18" width="23" height="84" rx="11.5" fill="url(#pl-palm)" stroke="#c98a63" stroke-opacity=".5"/>
      <rect x="156" y="4" width="24" height="98" rx="12" fill="url(#pl-palm)" stroke="#c98a63" stroke-opacity=".5"/>
      <rect x="183" y="12" width="23" height="90" rx="11.5" fill="url(#pl-palm)" stroke="#c98a63" stroke-opacity=".5"/>
      <rect x="209" y="34" width="20" height="72" rx="10" fill="url(#pl-palm)" stroke="#c98a63" stroke-opacity=".5"/>
      <path d="M131 52 H152 M131 74 H152 M157 40 H179 M157 66 H179 M184 46 H205 M184 70 H205 M210 62 H228 M210 82 H228" stroke="#c98a63" stroke-opacity=".4"/>
      <path d="M130 207 Q117 170 120 130 Q122 98 131 88 L226 88 Q237 100 237 130 Q237 170 226 207 Z" fill="url(#pl-palm)" stroke="#c98a63" stroke-opacity=".5"/>
      <ellipse cx="143" cy="170" rx="20" ry="30" fill="#e6a37d" opacity=".28"/>
      <path d="M126 112 Q170 122 232 108 M136 140 Q170 132 210 124 M152 196 Q150 160 166 126" stroke="#bf7f58" stroke-opacity=".45" fill="none" stroke-width="1.4"/>
      <path d="M132 212 Q178 220 224 212 M131 222 Q178 230 225 222" stroke="#bf7f58" stroke-opacity=".55" fill="none" stroke-width="1.4"/>
      <path id="pl-artery" d="M142 374 Q139 300 142 244 Q144 222 139 204" stroke="#c62828" stroke-width="4" fill="none" stroke-linecap="round" opacity="0"/>
      <text x="62" y="262" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">thumb</text>
      <text x="62" y="275" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">side</text>
      <path d="M86 268 H112" stroke="var(--muted)" stroke-width="1.2" marker-end="none"/>
      <text x="300" y="262" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">little-</text>
      <text x="300" y="275" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">finger side</text>
      <text x="182" y="356" font-size="10" text-anchor="middle" font-family="var(--font-mono)" fill="#7a4a30" opacity=".75">left forearm, palm up</text>
    </g>`;
  }
  function neckSVG() {
    let rings = ""; for (let y = 196; y <= 316; y += 12) rings += `<path d="M157 ${y} Q170 ${y + 4} 183 ${y}" stroke="#bf7f58" stroke-opacity=".55" fill="none" stroke-width="2"/>`;
    return `<g aria-hidden="true">
      <path d="M120 96 Q124 220 118 300 Q92 330 20 348 L20 374 L340 374 L340 348 Q248 330 222 300 Q216 220 220 96 Z" fill="url(#pl-neckg)"/>
      <path d="M116 126 Q132 220 152 322 L166 320 Q148 220 136 122 Z" fill="#c98760" opacity=".32"/>
      <path d="M224 126 Q208 220 188 322 L174 320 Q192 220 204 122 Z" fill="#c98760" opacity=".32"/>
      <rect x="156" y="188" width="28" height="134" rx="13" fill="#f6d3b8" opacity=".7"/>
      ${rings}
      <path d="M152 170 Q170 160 188 170 L180 188 Q170 194 160 188 Z" fill="#f2c4a3" stroke="#bf7f58" stroke-opacity=".5"/>
      <path d="M60 346 Q120 326 160 334 M280 346 Q220 326 180 334" stroke="#bf7f58" stroke-opacity=".5" fill="none" stroke-width="2"/>
      <path d="M90 0 Q90 70 127 108 Q150 128 170 130 Q190 128 213 108 Q250 70 250 0 Z" fill="url(#pl-face)" stroke="#c98a63" stroke-opacity=".5"/>
      <path d="M140 126 Q170 146 200 126" stroke="#a8694a" stroke-opacity=".35" fill="none" stroke-width="6"/>
      <path d="M150 56 Q170 66 190 56" stroke="#b5584f" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>
      <path id="pl-artery" d="M150 334 Q146 262 147 198 Q146 150 132 112" stroke="#c62828" stroke-width="4" fill="none" stroke-linecap="round" opacity="0"/>
      <text x="282" y="236" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">windpipe</text>
      <path d="M254 240 H188" stroke="var(--muted)" stroke-width="1.2"/>
      <text x="58" y="104" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">jaw</text>
      <path d="M72 108 L110 92" stroke="var(--muted)" stroke-width="1.2"/>
    </g>`;
  }
  function stopwatchSVG() {
    let t = ""; for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, r1 = i % 5 ? 30 : 27; t += `<line x1="${(Math.sin(a) * r1).toFixed(1)}" y1="${(-Math.cos(a) * r1).toFixed(1)}" x2="${(Math.sin(a) * 33).toFixed(1)}" y2="${(-Math.cos(a) * 33).toFixed(1)}" stroke="#55606b" stroke-width="${i % 5 ? .7 : 1.6}"/>`; }
    return `<g id="pl-sw" transform="translate(300 74)" style="cursor:pointer">
      <rect x="-7" y="-52" width="14" height="10" rx="3" fill="#7d8790"/><rect x="-11" y="-58" width="22" height="8" rx="4" id="pl-crown" fill="#e05a47"/>
      <rect x="22" y="-38" width="10" height="7" rx="3" transform="rotate(40)" fill="#7d8790"/>
      <circle r="41" fill="#3a4550"/><circle r="36" fill="url(#pl-face2)"/>
      <path id="pl-wedge" d="M0 0" fill="#2ec4b6" opacity=".22"/>
      ${t}
      <text y="-14" font-size="8" text-anchor="middle" font-family="var(--font-mono)" fill="#55606b">0</text>
      <line id="pl-hand" x1="0" y1="5" x2="0" y2="-30" stroke="#e05a47" stroke-width="2" stroke-linecap="round"/>
      <circle r="3" fill="#e05a47"/>
      <rect x="-30" y="48" width="60" height="22" rx="6" fill="var(--bg)" stroke="var(--line)"/>
      <text id="pl-swtxt" y="64" font-size="14" font-weight="700" text-anchor="middle" font-family="var(--font-mono)" fill="var(--ink)">0.0 s</text>
    </g>`;
  }
  function toolSVG(kind) {
    if (kind === "fingers") return `<g data-tool="fingers" class="pl-tool" id="pl-fingers">
      <rect x="-32" y="-28" width="64" height="84" fill="transparent"/>
      <rect x="-23" y="-11" width="21" height="58" rx="10.5" fill="url(#pl-exam)" stroke="#5e3420" stroke-opacity=".5"/>
      <rect x="1" y="-15" width="22" height="62" rx="11" fill="url(#pl-exam)" stroke="#5e3420" stroke-opacity=".5"/>
      <rect x="-19.5" y="-8" width="14" height="14" rx="6" fill="#f2d6c6" opacity=".85"/>
      <rect x="4.5" y="-12" width="15" height="15" rx="6.5" fill="#f2d6c6" opacity=".85"/>
      <ellipse id="pl-padflash" cx="0" cy="-4" rx="31" ry="19" fill="none" stroke="#2ec4b6" stroke-width="3.5" opacity="0"/>
    </g>`;
    return `<g data-tool="thumb" class="pl-tool" id="pl-thumb">
      <rect x="-26" y="-26" width="52" height="80" fill="transparent"/>
      <rect x="-14" y="-13" width="28" height="56" rx="14" fill="url(#pl-exam)" stroke="#5e3420" stroke-opacity=".5"/>
      <rect x="-9" y="-10" width="18" height="17" rx="7.5" fill="#f2d6c6" opacity=".85"/>
    </g>`;
  }
  function jogSVG() {
    return `<g id="pl-jog" style="display:none">
      <rect x="0" y="0" width="360" height="376" fill="var(--surface)"/>
      <ellipse cx="170" cy="338" rx="70" ry="9" fill="var(--line)"/>
      <g id="pl-runner"></g>
      <g transform="translate(300 74)"><circle r="36" fill="none" stroke="var(--line)" stroke-width="7"/><circle id="pl-jogarc" r="36" fill="none" stroke="#e05a47" stroke-width="7" stroke-dasharray="0 999" transform="rotate(-90)" stroke-linecap="round"/>
        <text id="pl-jogtxt" y="6" font-size="17" font-weight="800" text-anchor="middle" font-family="var(--font-mono)" fill="var(--ink)">0:00</text>
        <text y="58" font-size="10" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">of 1:00 (sped up)</text></g>
    </g>`;
  }
  function sceneSVG() {
    const s = SITES[st.site];
    return `<svg viewBox="0 0 360 460" class="lab-scene pl-scene" role="img" aria-label="${s.name}: drag two fingers onto the ${s.pulse} pulse">
      ${defs()}
      <rect x="0" y="0" width="360" height="372" fill="transparent"/>
      ${st.site === "wrist" ? wristSVG() : neckSVG()}
      <circle id="pl-target" cx="${s.spot[0]}" cy="${s.spot[1]}" r="${R_ON + 2}" fill="#2ec4b6" fill-opacity=".14" stroke="#0e8f86" stroke-width="2" stroke-dasharray="5 4" style="display:none"/>
      <circle id="pl-bulge" cx="${s.spot[0]}" cy="${s.spot[1]}" r="9" fill="#d9534f" opacity="0"/>
      <circle id="pl-ring" cx="${s.spot[0]}" cy="${s.spot[1]}" r="10" fill="none" stroke="#e53935" stroke-width="3" opacity="0"/>
      ${stopwatchSVG()}
      <rect x="8" y="${TRAY_Y + 4}" width="344" height="80" rx="14" fill="var(--surface)" stroke="var(--line)"/>
      <text x="${HOME.fingers[0]}" y="452" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">index + middle</text>
      <text x="${HOME.thumb[0]}" y="452" font-size="11" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">thumb</text>
      ${jogSVG()}
      ${toolSVG("thumb")}${toolSVG("fingers")}
    </svg>`;
  }

  /* ---------------- a run ---------------- */
  function start(level) {
    L = level; cancelAnimationFrame(raf);
    const now = performance.now();
    st = { level: L.n, site: "wrist", phase: "find", rd: 0, readings: [], T: 15,
      hrRest: rint(L.rest[0], L.rest[1]), boost: 0, tEx: 0, jogEnd: 0, jogT: 0, jogging: false, jogAnim: 0,
      beatN: 0, beats: [], nextBeat: now + 400, amp: 0, padFlash: 0,
      tools: { fingers: HOME.fingers.slice(), thumb: HOME.thumb.slice() }, placed: false, drag: null, moved: false,
      onSpot: false, vis: 0, t0: 0, taps: [], beeped: false, thumbTries: 0, showTarget: !!L.guided,
      usedNeck: false, mistakes: 0, cls: [], statsAns: null, t: now, tipMsg: "", tipUntil: 0 };
    const hints = L.guided ? [
      () => `The ${SITES[st.site].pulse} pulse is ${SITES[st.site].where}. The dashed circle marks it: drag the round fingertip pads right into it.`,
      () => `Tap <b>Beat</b> each time the artery jumps (it flashes and you hear a soft thud). Then multiply: a 15-second count × 4, for example 18 beats × 4 = 72 bpm.`
    ] : [
      () => `The ${SITES[st.site].pulse} pulse is ${SITES[st.site].where}. A faint throb means you're close: keep sliding.`,
      () => { st.showTarget = true; return `The pulse spot is now marked with a dashed circle. Put the fingertip pads in it${L.ex ? ", and after the jog go straight back there: the heart rate starts falling within seconds" : ""}.`; },
      L.ex ? "bpm = 15-second count × 4 (or 30-second count × 2). For resting adults the typical range is about 60–100 bpm. After exercise a higher number is expected: the heart is pumping extra blood to the working muscles."
           : "Mean: add all five readings and divide by 5. Median: put them in order and take the middle (3rd) one. Range: biggest − smallest. The outlier is the reading far away from the rest."
    ];
    K.begin(L, hints);
    const steps = STEPS.concat(L.ex ? [STEP_EX] : L.stats ? [STEP_ST] : []);
    view.innerHTML = K.topHTML(L) + `<div class="lab-run pl-run">
      <div class="lab-stage pl-wrap">
        <div class="pl-left">
          <div class="pl-sites" role="group" aria-label="Where to feel the pulse">${Object.keys(SITES).map(k => `<button type="button" class="pl-seg" data-site="${k}">${SITES[k].label}</button>`).join("")}</div>
          <div class="lab-scenewrap" id="pl-scenewrap"></div>
          <div class="pl-ctrls">
            <div class="pl-dur" role="group" aria-label="How long to count"><button type="button" class="pl-seg" data-t="15">15 s · then ×4</button><button type="button" class="pl-seg" data-t="30">30 s · then ×2</button></div>
            <button type="button" class="br-next pl-start" id="pl-start" disabled>Find the pulse first</button>
            <button type="button" class="pl-beat" id="pl-tap" disabled aria-label="Tap for each beat">Beat</button>
            <button type="button" class="lab-btn is-pour pl-jogbtn" id="pl-jogbtn" hidden>Hold to jog</button>
          </div>
        </div>
        <div class="lab-side">
          <div class="lab-read"><p class="br-label">Beats tapped</p><b id="pl-count">0</b><span id="pl-countsub">${L.guided ? "goes up with each tap" : "hidden: count as you tap"}</span></div>
          <div class="lab-read"><p class="br-label">Readings</p><div id="pl-rlist" class="pl-rlist">none yet</div></div>
          <p class="lab-hint" id="lab-hint" aria-live="polite"></p>
        </div>
      </div>
      ${K.hintHTML()}
      <details class="lab-howrun"${L.n === 1 ? " open" : ""}><summary>How to do it</summary>${K.stepsHTML(steps)}</details>
      <div class="br-feedback" id="lab-fb" aria-live="polite"></div></div>`;
    $("#lab-quit").onclick = menu;
    K.bindHints();
    renderScene();
    view.querySelectorAll("[data-site]").forEach(b => b.onclick = () => setSite(b.dataset.site));
    view.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { if (st.phase !== "find" && st.phase !== "ready") return; st.T = +b.dataset.t; BGX.sfx.tap(); paintSegs(); });
    $("#pl-start").onclick = startCount;
    const tap = $("#pl-tap");
    tap.addEventListener("pointerdown", e => { e.preventDefault(); tapBeat(); });
    tap.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); tapBeat(); } });
    tap.addEventListener("contextmenu", e => e.preventDefault());
    const jb = $("#pl-jogbtn");
    const jon = e => { e.preventDefault(); if (st.phase === "jog") { st.jogging = true; jb.classList.add("is-on"); } };
    const joff = () => { if (!st) return; st.jogging = false; jb.classList.remove("is-on"); };
    jb.addEventListener("pointerdown", jon); ["pointerup", "pointerleave", "pointercancel"].forEach(ev => jb.addEventListener(ev, joff));
    jb.addEventListener("contextmenu", e => e.preventDefault());
    bindDrag();
    paintSegs();
    if (view.getBoundingClientRect().top < 0) view.scrollIntoView({ block: "start" });
    st.t = performance.now(); raf = requestAnimationFrame(loop);
  }

  function renderScene() { $("#pl-scenewrap").innerHTML = sceneSVG(); $("#pl-sw").addEventListener("click", () => { if (st.phase === "ready") startCount(); }); }
  function setSite(k) {
    if (!st || (st.phase !== "find" && st.phase !== "ready") || st.site === k) return;
    st.site = k; if (k === "neck") st.usedNeck = true;
    st.tools.fingers = HOME.fingers.slice(); st.tools.thumb = HOME.thumb.slice(); st.placed = false; st.drag = null;
    BGX.sfx.tap(); renderScene(); paintSegs();
    if (k === "neck") flashTip("Carotid pulse: press <b>gently</b>, and only ever on <b>one side</b> of the neck at a time.");
  }
  function paintSegs() {
    view.querySelectorAll("[data-site]").forEach(b => { b.classList.toggle("is-on", b.dataset.site === st.site); b.setAttribute("aria-pressed", b.dataset.site === st.site); b.disabled = st.phase !== "find" && st.phase !== "ready"; });
    view.querySelectorAll("[data-t]").forEach(b => { b.classList.toggle("is-on", +b.dataset.t === st.T); b.setAttribute("aria-pressed", +b.dataset.t === st.T); b.disabled = st.phase !== "find" && st.phase !== "ready"; });
  }
  function flashTip(html, ms) { st.tipMsg = html; st.tipUntil = performance.now() + (ms || 3500); }

  /* ---------------- dragging the fingers ---------------- */
  function svgPt(e) {
    const svg = $("#pl-scenewrap svg"), p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  }
  function svgToClient(x, y) {
    const svg = $("#pl-scenewrap svg"), p = svg.createSVGPoint(); p.x = x; p.y = y;
    const q = p.matrixTransform(svg.getScreenCTM()); return { x: q.x, y: q.y };
  }
  function bindDrag() {
    const wrap = $("#pl-scenewrap");
    wrap.addEventListener("touchstart", e => { if (e.target.closest && e.target.closest("[data-tool]")) e.preventDefault(); }, { passive: false });
    wrap.addEventListener("pointerdown", e => {
      const g = e.target.closest && e.target.closest("[data-tool]");
      if (!g || !st || !["find", "ready", "count"].includes(st.phase)) return;
      e.preventDefault();
      const kind = g.dataset.tool, p = svgPt(e), t = st.tools[kind];
      st.drag = { kind, dx: t[0] - p.x, dy: t[1] - p.y, id: e.pointerId };
      if (kind === "fingers") st.placed = false;
      try { wrap.setPointerCapture(e.pointerId); } catch (x) {}
      BGX.sfx.tap();
    });
    wrap.addEventListener("pointermove", e => {
      if (!st || !st.drag || e.pointerId !== st.drag.id) return;
      const p = svgPt(e), t = st.tools[st.drag.kind];
      t[0] = Math.max(16, Math.min(344, p.x + st.drag.dx)); t[1] = Math.max(16, Math.min(440, p.y + st.drag.dy));
      st.moved = true;
    });
    const up = e => { if (!st || !st.drag || e.pointerId !== st.drag.id) return; drop(); };
    wrap.addEventListener("pointerup", up); wrap.addEventListener("pointercancel", up);
  }
  function drop() {
    const kind = st.drag.kind, t = st.tools[kind]; st.drag = null;
    if (kind === "thumb") {
      if (t[1] < TRAY_Y) {
        st.thumbTries++;
        const d = Math.hypot(t[0] - SITES[st.site].spot[0], t[1] - SITES[st.site].spot[1]);
        flashTip(d < R_NEAR ? "Careful: with the thumb you'd feel a beat, but the thumb has its own artery, so it could be <b>your own</b> pulse. Use the <b>index + middle fingers</b>." : "Not the thumb: it has a pulse of its own. Take a pulse with the pads of the <b>index + middle fingers</b>.", 5000);
        BGX.sfx.no();
      }
      st.tools.thumb = HOME.thumb.slice();
      return;
    }
    if (t[1] >= TRAY_Y) { st.tools.fingers = HOME.fingers.slice(); st.placed = false; return; }
    st.placed = true;
  }
  function moveFingers(dx, dy) {
    if (!st || !["find", "ready", "count"].includes(st.phase)) return;
    const t = st.tools.fingers;
    if (!st.placed) { t[0] = 180; t[1] = 290; st.placed = true; return; }
    t[0] = Math.max(16, Math.min(344, t[0] + dx)); t[1] = Math.max(16, Math.min(TRAY_Y - 4, t[1] + dy));
  }

  /* ---------------- heartbeat model ---------------- */
  const hrAt = t => st.hrRest + (st.boost ? st.boost * Math.exp(-(t - st.tEx) / 1000 / TAU) : 0);
  // normal sinus rhythm is not a metronome: small random variation plus a slow breathing-linked swing
  const interval = t => 60000 / hrAt(t) * (1 + 0.03 * gauss() + 0.03 * Math.sin(t / 4200 * Math.PI * 2));
  function visibility() {
    if (st.phase === "jog" || st.phase === "done") return 0;
    if (!st.placed && !(st.drag && st.drag.kind === "fingers")) return 0;
    const f = st.tools.fingers, s = SITES[st.site].spot, d = Math.hypot(f[0] - s[0], f[1] - s[1]);
    return d <= R_ON ? 1 : d < R_NEAR ? 0.35 * (1 - (d - R_ON) / (R_NEAR - R_ON)) : 0;
  }
  function beat(t) {
    st.beatN++; st.beats.push(t); if (st.beats.length > 600) st.beats.shift();
    st.amp = 1;
    if (st.vis >= 1) {
      st.padFlash = 1;
      BGX.tone([170], .11, "triangle", 0, .07);
      try { if (navigator.vibrate) navigator.vibrate(25); } catch (e) {}
      if (L.guided && st.phase === "count") { const b = $("#pl-tap"); if (b) { b.classList.remove("is-cue"); void b.offsetWidth; b.classList.add("is-cue"); } }
    }
  }

  /* ---------------- counting ---------------- */
  function startCount() {
    if (!st || st.phase !== "ready") return;
    st.phase = "count"; st.t0 = performance.now(); st.taps = []; st.beeped = false;
    BGX.tone([1320], .06, "sine", 0, .05);
    paintSegs();
    $("#pl-start").disabled = true;
    const tap = $("#pl-tap"); tap.disabled = false;
    $("#pl-count").textContent = L.guided ? "0" : "?";
    if (!BGX.RM) tap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function tapBeat() {
    if (!st || st.phase !== "count") return;
    const now = performance.now();
    if (now - st.t0 > (st.T + 0.35) * 1000) return;
    // a slightly late tap belongs to the beat it follows: ignore taps for a beat just before the start or just after the end
    const lb = st.beats[st.beats.length - 1] || 0, late = now - lb < 350;
    const counts = !(late && (lb < st.t0 || lb > st.t0 + st.T * 1000)) && now - st.t0 <= st.T * 1000 + 350;
    if (counts) st.taps.push(now);
    BGX.tone([880], .03, "sine", 0, .03);
    const b = $("#pl-tap"); b.classList.remove("is-hit"); void b.offsetWidth; b.classList.add("is-hit");
    if (L.guided) $("#pl-count").textContent = st.taps.length;
  }
  function finishCount() {
    const t0 = st.t0, t1 = t0 + st.T * 1000;
    const beats = st.beats.filter(b => b >= t0 && b <= t1);
    const r = { kind: L.ex ? (st.rd === 0 ? "rest" : "after") : "rest", site: st.site, T: st.T, f: st.T === 15 ? 4 : 2,
      count: st.taps.length, trueCount: beats.length, beatRel: beats.map(b => (b - t0) / 1000), tapRel: st.taps.map(b => (b - t0) / 1000),
      delay: st.boost ? (t0 - st.jogEnd) / 1000 : 0, hrStart: Math.round(hrAt(t0)) };
    st.cur = r; st.phase = "calc";
    $("#pl-tap").disabled = true; $("#pl-tap").classList.remove("is-cue");
    $("#pl-count").textContent = r.count;
    showCalc(r);
  }

  /* ---------------- calculation ---------------- */
  function showCalc(r) {
    const fb = $("#lab-fb");
    const label = r.kind === "after" ? "After exercise" : L.stats ? "Your classmate Sam" : "At rest";
    fb.innerHTML = `<div class="lab-calc pl-calc"><p class="br-label">Work it out · ${label}</p>
      <p>You tapped <b>${r.count} beat${r.count === 1 ? "" : "s"}</b> in <b>${r.T} seconds</b>. A minute is 60 seconds, which is ${r.f} lots of ${r.T} s.</p>
      <div class="pl-eq">${L.guided ? `<b>${r.count}</b> × ${r.f} =` : "Beats per minute ="} <input id="pl-ans" type="text" inputmode="numeric" autocomplete="off" aria-label="Beats per minute" maxlength="4"> bpm</div>
      ${L.guided ? "" : `<details class="lab-howcalc"><summary>💡 Show me how</summary><ol><li>You counted for ${r.T} seconds. How many ${r.T}-second blocks fit in 60 seconds? 60 ÷ ${r.T} = ${r.f}.</li><li>So multiply your count by ${r.f}: <b>${r.count} × ${r.f}</b>.</li></ol></details>`}
      <div class="br-btns" style="margin-top:10px"><button class="br-next" id="pl-check" type="button">Check</button></div>
      <div id="pl-calcfb"></div></div>`;
    const inp = $("#pl-ans");
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); checkCalc(); } });
    $("#pl-check").onclick = checkCalc;
    // (shown in the docked task panel: no page scrolling)
    if (matchMedia("(pointer: fine)").matches) inp.focus({ preventScroll: true });
  }
  function checkCalc() {
    const r = st.cur, inp = $("#pl-ans"); if (!r || r.ans !== undefined) return;
    const v = parseFloat(String(inp.value).replace(",", "."));
    if (!isFinite(v)) { inp.classList.add("is-empty"); inp.focus(); return; }
    r.ans = v; r.ok = v === r.count * r.f; r.bpm = r.count * r.f;
    inp.disabled = true; inp.classList.add(r.ok ? "is-ok" : "is-bad"); $("#pl-check").disabled = true;
    st.readings.push(r); st.cur = null;
    BGX.reward(r.ok, $("#pl-check"), { flash: view });
    paintReadings();
    const line = `<p class="pl-fbline"><span class="${r.ok ? "ok" : "no"}">${r.ok ? "Correct." : "Not quite."}</span> ${r.count} × ${r.f} = <b>${r.bpm} bpm</b>.</p>`;
    const next = L.ex && st.rd === 0 ? "Next: jog on the spot" : L.ex ? "Next: compare with the typical range" : L.stats ? "Next: the class data" : null;
    $("#pl-calcfb").innerHTML = line + (next ? `<div class="br-btns" style="margin-top:8px"><button class="br-next" id="pl-cont" type="button">${next} →</button></div>` : "");
    if (!next) return finish();
    const c = $("#pl-cont"); c.onclick = () => { if (L.ex && st.rd === 0) startJog(); else if (L.ex) classify(); else stats(); };
    c.focus({ preventScroll: true });
  }
  function paintReadings() {
    $("#pl-rlist").innerHTML = st.readings.map(r => `<div><span>${r.kind === "after" ? "After jog" : L.stats ? "Sam" : "At rest"}</span> <b>${r.bpm}</b> bpm</div>`).join("") || "none yet";
  }

  /* ---------------- level 2: jog, then classify ---------------- */
  function startJog() {
    st.phase = "jog"; st.jogT = 0; st.jogging = false;
    st.tools.fingers = HOME.fingers.slice(); st.placed = false;
    $("#lab-fb").innerHTML = `<p><b>Exercise time.</b> Hold <b>Jog</b> to jog on the spot for one minute (sped up ×10). Then find the pulse again and measure <b>straight away</b>.</p>`;
    $("#pl-jogbtn").hidden = false; $("#pl-start").hidden = true; $("#pl-tap").hidden = true;
    $("#pl-jog").style.display = ""; paintSegs();
    $("#pl-jogbtn").scrollIntoView({ behavior: BGX.RM ? "auto" : "smooth", block: "nearest" });
  }
  function endJog(now) {
    st.phase = "find"; st.rd = 1; st.jogging = false;
    st.boost = rint(42, 62); st.tEx = now; st.jogEnd = now; st.nextBeat = now + 200;
    $("#pl-jogbtn").hidden = true; $("#pl-jogbtn").classList.remove("is-on"); $("#pl-start").hidden = false; $("#pl-tap").hidden = false;
    $("#pl-jog").style.display = "none";
    $("#lab-fb").innerHTML = `<p><b>One minute done!</b> Quick: put the two fingers back on the pulse and start the stopwatch. The heart rate starts dropping as soon as you stop.</p>`;
    BGX.sfx.ok(); paintSegs();
  }
  function drawRunner(now) {
    const g = $("#pl-runner"); if (!g) return;
    const a = st.jogAnim, s = Math.sin(a), bob = Math.abs(Math.cos(a)) * -8;
    const hip = [170, 230 + bob], sh = [170, 156 + bob];
    const leg = (side) => { const ph = side ? s : -s, lift = Math.max(0, ph); const knee = [hip[0] + (side ? 10 : -10), hip[1] + 46 - lift * 26], foot = [knee[0] + (side ? 4 : -4) - lift * 6, 334 - lift * 44 - (ph < 0 ? 0 : 0)]; return { knee, foot }; };
    const arm = (side) => { const ph = side ? -s : s; const el = [sh[0] + (side ? 22 : -22), sh[1] + 30 - ph * 6], hand = [el[0] + (side ? 6 : -6), el[1] - 22 - ph * 10]; return { el, hand }; };
    const P = p => p[0].toFixed(1) + " " + p[1].toFixed(1);
    const l0 = leg(0), l1 = leg(1), a0 = arm(0), a1 = arm(1);
    g.innerHTML = `
      <path d="M${P(hip)} L${P(l0.knee)} L${P(l0.foot)}" stroke="#e7ad87" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${P(l0.foot)} h-12" stroke="#33415c" stroke-width="10" stroke-linecap="round"/>
      <path d="M${P(hip)} L${P(l1.knee)} L${P(l1.foot)}" stroke="#f1c3a0" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${P(l1.foot)} h12" stroke="#33415c" stroke-width="10" stroke-linecap="round"/>
      <path d="M${hip[0] - 16} ${hip[1] - 8} h32 v24 h-14 l-2 -8 l-2 8 h-14 Z" fill="#33415c"/>
      <path d="M${P(sh)} L${P(a0.el)} L${P(a0.hand)}" stroke="#e7ad87" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="${sh[0] - 19}" y="${sh[1] - 8}" width="38" height="${hip[1] - sh[1] + 6}" rx="14" fill="url(#pl-shirt)"/>
      <path d="M${P(sh)} L${P(a1.el)} L${P(a1.hand)}" stroke="#f1c3a0" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="170" cy="${(124 + bob).toFixed(1)}" r="20" fill="#f1c3a0"/>
      <path d="M150 ${(120 + bob).toFixed(1)} Q152 ${(98 + bob).toFixed(1)} 172 ${(102 + bob).toFixed(1)} Q190 ${(102 + bob).toFixed(1)} 191 ${(122 + bob).toFixed(1)} Q180 ${(110 + bob).toFixed(1)} 150 ${(120 + bob).toFixed(1)} Z" fill="#3b2a20"/>`;
    const sec = Math.min(60, st.jogT);
    $("#pl-jogtxt").textContent = `0:${String(Math.floor(sec)).padStart(2, "0")}`.replace("0:60", "1:00");
    $("#pl-jogarc").setAttribute("stroke-dasharray", `${(sec / 60 * 226.2).toFixed(1)} 999`);
  }

  function classify() {
    st.phase = "classify"; K.setStep(5);
    const fb = $("#lab-fb");
    fb.innerHTML = `<div class="lab-calc"><p class="br-label">Compare with the typical range</p>
      <p>For resting adults the typical range is about <b>60–100 bpm</b>. Where does each of your readings sit?</p>
      ${st.readings.map((r, i) => `<div class="pl-cls" data-r="${i}"><p><b>${r.kind === "after" ? "After exercise" : "At rest"}:</b> ${r.bpm} bpm</p>
        <div class="pl-clsbtns">${[["low", "Below 60"], ["mid", "60–100"], ["high", "Above 100"]].map(([c, t]) => `<button type="button" class="br-ans is-small" data-c="${c}">${t}</button>`).join("")}</div></div>`).join("")}
      <p class="br-hint" style="margin:8px 0 0">This compares a number with a typical range. It isn't a diagnosis: only a health professional can judge what a reading means for a person.</p></div>`;
    fb.querySelectorAll(".pl-cls").forEach(row => row.querySelectorAll("[data-c]").forEach(b => b.onclick = () => {
      const i = +row.dataset.r; if (st.cls[i] !== undefined) return;
      const v = st.readings[i].bpm, right = v < 60 ? "low" : v > 100 ? "high" : "mid", ok = b.dataset.c === right;
      st.cls[i] = { pick: b.dataset.c, right, ok };
      row.querySelectorAll("[data-c]").forEach(x => { x.disabled = true; if (x.dataset.c === right) x.classList.add("is-correct"); });
      if (!ok) b.classList.add("is-wrong");
      BGX.reward(ok, b, { flash: view });
      if (st.cls.filter(Boolean).length === st.readings.length) setTimeout(finish, 350);
    }));
    // (shown in the docked task panel: no page scrolling)
  }

  /* ---------------- level 3: class statistics ---------------- */
  function makeClass() {
    const names = BGX.shuffle(NAMES).slice(0, 4);
    const rows = names.slice(0, 3).map(n => ({ name: n, v: 4 * rint(15, 23) }));       // 60–92 bpm, 15-second counts × 4
    const high = Math.random() < 0.5;
    const out = high ? { name: names[3], v: 4 * rint(31, 35), why: `${names[3]} had just run up the stairs to class, so it wasn't a resting reading` }
                     : { name: names[3], v: 2 * rint(15, 18), why: `${names[3]} counted for 15 seconds but multiplied by 2 instead of 4` };
    return { rows: BGX.shuffle(rows.concat([out])), out };
  }
  function stats() {
    st.phase = "stats"; K.setStep(5);
    const me = st.readings[0];
    if (!st.cls3) st.cls3 = makeClass();
    const rows = [{ name: "Sam (your reading)", v: me.bpm, me: true }].concat(st.cls3.rows);
    const vals = rows.map(r => r.v), sorted = vals.slice().sort((a, b) => a - b);
    const sum = vals.reduce((a, b) => a + b, 0);
    st.statsKey = { rows, mean: sum / 5, sum, median: sorted[2], range: sorted[4] - sorted[0], min: sorted[0], max: sorted[4], outIndex: rows.findIndex(r => r === st.cls3.out) };
    const fb = $("#lab-fb");
    fb.innerHTML = `<div class="lab-calc pl-stats"><p class="br-label">Class data · resting pulse (bpm)</p>
      <p>Your reading joins four classmates'. Tap the row that looks like an <b>outlier</b>, then fill in the three answers.</p>
      <div class="pl-table" role="group" aria-label="Class readings: tap the outlier">${rows.map((r, i) => `<button type="button" class="pl-row" data-row="${i}" aria-pressed="false"><span>${r.name}</span><b>${r.v}</b></button>`).join("")}</div>
      <div class="pl-qs">
        <label class="pl-q"><span>Mean <small>(to 1 decimal place)</small></span><input id="pl-mean" type="text" inputmode="decimal" autocomplete="off"></label>
        <details class="lab-howcalc"><summary>💡 Show me how: mean</summary><ol><li>Add all five readings together.</li><li>Divide the total by 5 (how many readings there are).</li><li>Example: 60, 70, 80, 90, 100 → 400 ÷ 5 = 80.0.</li></ol></details>
        <label class="pl-q"><span>Median</span><input id="pl-median" type="text" inputmode="numeric" autocomplete="off"></label>
        <details class="lab-howcalc"><summary>💡 Show me how: median</summary><ol><li>Write the five readings in order, smallest to largest.</li><li>The median is the one in the middle: the 3rd of 5.</li><li>Example: 72, 60, 100, 64, 80 → 60, 64, <b>72</b>, 80, 100.</li></ol></details>
        <label class="pl-q"><span>Range</span><input id="pl-range" type="text" inputmode="numeric" autocomplete="off"></label>
        <details class="lab-howcalc"><summary>💡 Show me how: range and outlier</summary><ol><li>Range = largest reading − smallest reading.</li><li>An outlier is a value far from all the others. Ask why: a mistake in counting, or not a resting reading?</li><li>Keep it in the range and mean for now: the result shows how much it pulls the mean.</li></ol></details>
      </div>
      <div class="br-btns" style="margin-top:12px"><button class="br-next" id="pl-scheck" type="button">Check my answers</button></div></div>`;
    fb.querySelectorAll("[data-row]").forEach(b => b.onclick = () => {
      if (st.statsAns) return; BGX.sfx.tap();
      fb.querySelectorAll("[data-row]").forEach(x => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", x === b); });
      st.pickRow = +b.dataset.row;
    });
    ["#pl-mean", "#pl-median", "#pl-range"].forEach(s => $(s).addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); checkStats(); } }));
    $("#pl-scheck").onclick = checkStats;
    // (shown in the docked task panel: no page scrolling)
  }
  function checkStats() {
    if (st.statsAns) return;
    const k = st.statsKey, num = s => parseFloat(String($(s).value).replace(",", "."));
    const a = { mean: num("#pl-mean"), median: num("#pl-median"), range: num("#pl-range"), out: st.pickRow };
    if (![a.mean, a.median, a.range].every(isFinite) || a.out === undefined) {
      $("#pl-scheck").textContent = a.out === undefined ? "Tap the outlier row first" : "Fill in all three answers";
      setTimeout(() => { const b = $("#pl-scheck"); if (b) b.textContent = "Check my answers"; }, 1800);
      return;
    }
    a.ok = { mean: Math.abs(a.mean - k.mean) < 0.051, median: a.median === k.median, range: a.range === k.range, out: a.out === k.outIndex };
    st.statsAns = a;
    [["#pl-mean", "mean"], ["#pl-median", "median"], ["#pl-range", "range"]].forEach(([s, f]) => { const i = $(s); i.disabled = true; i.classList.add(a.ok[f] ? "is-ok" : "is-bad"); });
    view.querySelectorAll("[data-row]").forEach((x, i) => { x.disabled = true; if (i === k.outIndex) x.classList.add("is-out"); });
    $("#pl-scheck").disabled = true;
    const all = Object.values(a.ok).every(Boolean);
    BGX.reward(all, $("#pl-scheck"), { flash: view });
    finish(true);
  }

  /* ---------------- judging ---------------- */
  const cntWord = e => e === 0 ? "spot on" : e === 1 ? "within 1 beat" : `${e} beats out`;
  function finish(append) {
    st.phase = "done"; K.setStep(L.ex || L.stats ? 5 : 4);
    view.querySelectorAll("#pl-start, #pl-tap, #lab-hintbtn, .pl-seg").forEach(b => b.disabled = true);
    view.querySelectorAll("#lab-fb input").forEach(i => i.setAttribute("value", i.value));   // the kit re-serialises the feedback HTML
    const errs = st.readings.map(r => Math.abs(r.count - r.trueCount)), e = Math.max(...errs);
    let m = st.readings.filter(r => !r.ok).length;
    if (L.ex) m += st.cls.filter(c => !c.ok).length;
    if (L.stats && st.statsAns) m += Object.values(st.statsAns.ok).filter(x => !x).length;
    const n0 = e <= 1 && m === 0 ? 3 : e <= 2 && m <= 1 ? 2 : e <= 4 && m <= 2 ? 1 : 0;
    const n = K.capStars(n0);
    const verdict = n0 === 3 ? "Spot on!" : n0 === 2 ? "Nearly there." : n0 === 1 ? "Good start." : "Not yet.";
    let why = st.readings.map(r => `<b>${r.kind === "after" ? "After exercise" : L.stats ? "Sam" : "At rest"}:</b> the artery beat <b>${r.trueCount}</b> times in ${r.T} s and you tapped <b>${r.count}</b> (${cntWord(Math.abs(r.count - r.trueCount))}). ${r.count} × ${r.f} = ${r.bpm} bpm${r.ok ? "" : ` (you wrote ${r.ans})`}.`).join(" ");
    if (e > 1) why += " To count better: keep the fingers on the throb the whole time and tap only when you see or hear a beat, not to a rhythm in your head.";
    if (L.guided) why += ` The simulated person's resting rate was about ${st.hrRest} bpm.`;
    if (L.ex) {
      const rest = st.readings[0], aft = st.readings[1];
      why += ` <br><b>Rest vs exercise:</b> the rate went up by ${aft.bpm - rest.bpm} bpm. During exercise the muscles need more oxygen, so the heart beats faster to pump more blood; afterwards it falls back, quickest in the first minute of recovery.`;
      why += aft.delay > 10 ? ` You started counting ${Math.round(aft.delay)} s after stopping, so the rate had already fallen (from about ${st.hrRest + st.boost} bpm at the end of the jog to ${aft.hrStart} bpm): measure straight away.` : ` You measured straight away (${Math.round(aft.delay)} s after stopping): well done.`;
      const cw = st.cls.filter(c => !c.ok).length;
      if (cw) why += " Classification: below 60 is under the typical resting range, 60–100 is inside it, above 100 is over it. A high number straight after exercise is expected; the range is for people at rest.";
    }
    if (L.stats && st.statsAns) {
      const k = st.statsKey, a = st.statsAns, sorted = k.rows.map(r => r.v).sort((x, y) => x - y);
      const fix = [];
      if (!a.ok.mean) fix.push(`mean = ${k.sum} ÷ 5 = <b>${k.mean.toFixed(1)}</b> (you wrote ${a.mean})`);
      if (!a.ok.median) fix.push(`median = middle of ${sorted.join(", ")} = <b>${k.median}</b> (you wrote ${a.median})`);
      if (!a.ok.range) fix.push(`range = ${k.max} − ${k.min} = <b>${k.range}</b> (you wrote ${a.range})`);
      if (!a.ok.out) fix.push(`the outlier was <b>${k.rows[k.outIndex].name}'s ${k.rows[k.outIndex].v} bpm</b>`);
      why += fix.length ? ` <br><b>Statistics:</b> ${fix.join("; ")}.` : ` <br><b>Statistics:</b> mean ${k.mean.toFixed(1)}, median ${k.median}, range ${k.range}: all correct.`;
      why += ` The outlier: ${st.cls3.out.why}.`;
    }
    if (st.thumbTries) why += " Remember: never the thumb, it has its own pulse.";
    if (st.readings.some(r => r.site === "neck")) why += " Carotid tip: press gently and on one side only.";
    if (st.readings.every(r => r.T === 15)) why += " A 15-second count can only give multiples of 4 bpm; a 30-second count (or a full minute, best if a pulse is irregular) is more precise.";
    why += K.capNote(n0);
    let extra = st.readings.map(timelineSVG).join("");
    if (L.ex) extra += barsSVG();
    if (L.stats && st.statsAns) extra += dotSVG();
    extra += `<p class="br-hint">Educational simulation, not medical advice.</p>`;
    BGX.lab.lastStars = n;
    K.result({ n, verdict, why, extraHTML: extra, levels: LEVELS, onLevel: start, onMenu: menu, append: true });
  }

  /* ---------------- charts ---------------- */
  function timelineSVG(r) {
    const W = 320, H = 64, x = t => 14 + t / r.T * (W - 28);
    let ticks = ""; for (let s = 0; s <= r.T; s += 5) ticks += `<line x1="${x(s)}" x2="${x(s)}" y1="44" y2="48" stroke="var(--muted)"/><text x="${x(s)}" y="60" font-size="9" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">${s}s</text>`;
    const title = r.kind === "after" ? "After exercise" : L.stats ? "Sam" : "At rest";
    return `<figure class="lab-curve pl-tl"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}: real beats compared with your taps">
      <line x1="14" x2="${W - 14}" y1="44" y2="44" stroke="var(--line)"/>${ticks}
      ${r.beatRel.map(t => `<line x1="${x(t).toFixed(1)}" x2="${x(t).toFixed(1)}" y1="8" y2="40" stroke="#e53935" stroke-width="2"/>`).join("")}
      ${r.tapRel.filter(t => t <= r.T + 0.35).map(t => `<circle cx="${x(Math.min(t, r.T)).toFixed(1)}" cy="26" r="4.5" fill="#0e8f86" stroke="var(--bg)" stroke-width="1.2"/>`).join("")}
    </svg><figcaption><b>${title}</b> · <span style="color:#e53935">┃</span> real beats (${r.trueCount}) · <span style="color:#0e8f86">●</span> your taps (${r.count}). Each dot should sit on a red line.</figcaption></figure>`;
  }
  function barsSVG() {
    const W = 300, H = 170, top = Math.max(160, ...st.readings.map(r => r.bpm + 10)), y = v => 150 - v / top * 136;
    const bars = st.readings.map((r, i) => { const x = 90 + i * 110; return `<rect x="${x}" y="${y(r.bpm).toFixed(1)}" width="60" height="${(150 - y(r.bpm)).toFixed(1)}" rx="6" fill="${i ? "#e05a47" : "#0e8f86"}"/>
      <text x="${x + 30}" y="${(y(r.bpm) - 5).toFixed(1)}" font-size="12" font-weight="700" text-anchor="middle" font-family="var(--font-mono)" fill="var(--ink)">${r.bpm}</text>
      <text x="${x + 30}" y="164" font-size="10" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">${i ? "after jog" : "at rest"}</text>`; }).join("");
    return `<figure class="lab-curve"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart: resting and after-exercise heart rate with the typical resting range shaded">
      <rect x="40" y="${y(100).toFixed(1)}" width="${W - 50}" height="${(y(60) - y(100)).toFixed(1)}" fill="#4CB050" opacity=".16"/>
      ${[0, 60, 100, 150].filter(v => v <= top).map(v => `<text x="34" y="${(y(v) + 3).toFixed(1)}" font-size="9" text-anchor="end" font-family="var(--font-mono)" fill="var(--muted)">${v}</text><line x1="38" x2="${W - 10}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="var(--line)" stroke-dasharray="${v ? "3 3" : ""}"/>`).join("")}
      ${bars}</svg><figcaption>Heart rate in bpm. The green band (60–100) is the typical range for resting adults; straight after exercise a higher rate is normal.</figcaption></figure>`;
  }
  function dotSVG() {
    const k = st.statsKey, W = 320, H = 96, lo = Math.min(k.min, 50) - 6, hi = Math.max(k.max, 110) + 6, x = v => 16 + (v - lo) / (hi - lo) * (W - 32);
    const others = k.rows.filter((r, i) => i !== k.outIndex).map(r => r.v), meanNo = others.reduce((a, b) => a + b, 0) / 4;
    const stack = {}; const dots = k.rows.map((r, i) => { const n = stack[r.v] = (stack[r.v] || 0) + 1; return `<circle cx="${x(r.v).toFixed(1)}" cy="${56 - (n - 1) * 11}" r="5" fill="${i === k.outIndex ? "#e05a47" : r.me ? "#0e8f86" : "#5b6b7a"}"/>${i === k.outIndex ? `<circle cx="${x(r.v).toFixed(1)}" cy="56" r="10" fill="none" stroke="#e05a47" stroke-width="1.5"/>` : ""}`; }).join("");
    return `<figure class="lab-curve"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Dot plot of the five readings with the mean and median marked">
      <line x1="16" x2="${W - 16}" y1="66" y2="66" stroke="var(--line)"/>
      ${[lo, (lo + hi) / 2, hi].map(v => Math.round(v)).map(v => `<text x="${x(v).toFixed(1)}" y="80" font-size="9" text-anchor="middle" font-family="var(--font-mono)" fill="var(--muted)">${v}</text>`).join("")}
      <line x1="${x(k.mean).toFixed(1)}" x2="${x(k.mean).toFixed(1)}" y1="14" y2="66" stroke="#b5179e" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="${x(k.mean).toFixed(1)}" y="11" font-size="9" text-anchor="middle" font-family="var(--font-mono)" fill="#b5179e">mean</text>
      <line x1="${x(k.median).toFixed(1)}" x2="${x(k.median).toFixed(1)}" y1="24" y2="66" stroke="#2e7d32" stroke-width="2"/>
      <text x="${x(k.median).toFixed(1)}" y="92" font-size="9" text-anchor="middle" font-family="var(--font-mono)" fill="#2e7d32">median</text>
      ${dots}</svg><figcaption>The five readings (bpm). The outlier (circled) drags the <span style="color:#b5179e">mean</span> towards it: ${k.mean.toFixed(1)} with it, ${meanNo.toFixed(1)} without it. The <span style="color:#2e7d32">median</span> (${k.median}) hardly cares, which is why it's useful when data has outliers.</figcaption></figure>`;
  }

  /* ---------------- main loop ---------------- */
  function loop(now) {
    if (!st) return;
    const dt = Math.min(0.05, (now - st.t) / 1000); st.t = now;
    st.vis = visibility();
    if (now - st.nextBeat > 2000) st.nextBeat = now + interval(now);
    while (now >= st.nextBeat) { const t = st.nextBeat; st.nextBeat += interval(t); beat(t); }
    st.amp *= Math.exp(-dt * 6); st.padFlash = Math.max(0, st.padFlash - dt * 4);
    if (st.phase === "find" || st.phase === "ready") {
      const ready = st.placed && !st.drag && st.vis >= 1;
      if ((st.phase === "ready") !== ready) {
        st.phase = ready ? "ready" : "find";
        const b = $("#pl-start"); b.disabled = !ready; b.textContent = ready ? "Start stopwatch" : "Find the pulse first";
        if (ready) BGX.sfx.ok();
      }
    }
    if (st.phase === "count") {
      const el = (now - st.t0) / 1000;
      if (el >= st.T && !st.beeped) { st.beeped = true; BGX.tone([1046, 1046], .1, "sine", .14, .06); }
      if (el >= st.T + 0.35) finishCount();
    }
    if (st.phase === "jog") {
      if (st.jogging) { st.jogT += dt * 10; st.jogAnim += dt * 11; }
      drawRunner(now);
      if (st.jogT >= 60) endJog(now);
    }
    draw(now);
    raf = requestAnimationFrame(loop);
  }

  function draw(now) {
    const f = $("#pl-fingers"); if (!f) return;
    const v = st.vis, a = st.amp;
    const ft = st.tools.fingers, tt = st.tools.thumb;
    f.setAttribute("transform", `translate(${ft[0].toFixed(1)} ${(ft[1] - (BGX.RM ? 0 : 2.5 * a * v)).toFixed(1)})`);
    $("#pl-thumb").setAttribute("transform", `translate(${tt[0].toFixed(1)} ${tt[1].toFixed(1)})`);
    f.classList.toggle("is-drag", !!(st.drag && st.drag.kind === "fingers"));
    $("#pl-padflash").setAttribute("opacity", (st.padFlash * 0.9).toFixed(2));
    const ring = $("#pl-ring"); ring.setAttribute("r", (10 + 26 * (1 - a)).toFixed(1)); ring.setAttribute("opacity", (a * v * 0.85).toFixed(2));
    $("#pl-bulge").setAttribute("opacity", (a * v * 0.45).toFixed(2));
    $("#pl-artery").setAttribute("opacity", ((L.guided ? 0.22 : 0) + 0.55 * a * v).toFixed(2));
    $("#pl-artery").setAttribute("stroke-width", (4 + 2.5 * a * v).toFixed(1));
    $("#pl-target").style.display = st.showTarget && st.phase !== "done" ? "" : "none";
    // stopwatch
    const el = st.phase === "count" ? Math.min(st.T, (now - st.t0) / 1000) : st.phase === "calc" || st.phase === "classify" || st.phase === "stats" || st.phase === "done" ? (st.readings.length || st.cur ? st.T : 0) : 0;
    $("#pl-hand").setAttribute("transform", `rotate(${(el / 60 * 360).toFixed(1)})`);
    const ang = st.T / 60 * Math.PI * 2; $("#pl-wedge").setAttribute("d", `M0 0 L0 -33 A33 33 0 0 1 ${(Math.sin(ang) * 33).toFixed(1)} ${(-Math.cos(ang) * 33).toFixed(1)} Z`);
    $("#pl-swtxt").textContent = el.toFixed(1) + " s";
    $("#pl-crown").setAttribute("fill", st.phase === "ready" ? "#2ec4b6" : "#e05a47");
    tip(now);
  }

  function tip(now) {
    const h = $("#lab-hint"); if (!h) return;
    let s, step = 0;
    const g = L.guided, site = SITES[st.site];
    if (st.tipMsg && now < st.tipUntil) s = st.tipMsg;
    else if (st.phase === "find") {
      step = st.moved || st.placed || st.drag ? 1 : 0;
      if (st.rd === 1) s = "<b>Quick!</b> Put the two fingers back on the pulse and start counting straight away: the rate is already falling.";
      else if (st.vis > 0) s = "<b>Warmer!</b> A faint throb: slide a little further to find the strongest spot.";
      else if (g) s = `<b>Step 2.</b> Drag the <b>index + middle fingers</b> from the tray onto the dashed circle${st.site === "wrist" ? " on the thumb side of the wrist" : " beside the windpipe"}.`;
      else s = `Drag the two fingers onto the ${site.pulse} pulse. When you're on it, it throbs.`;
    } else if (st.phase === "ready") { step = 2; s = `<b>${g ? "Step 3. " : ""}You can feel it!</b> Choose 15 s or 30 s, then press <b>Start stopwatch</b>.`; }
    else if (st.phase === "count") {
      step = 3; const left = Math.max(0, st.T - (now - st.t0) / 1000);
      s = st.vis < 1 ? "<b>You've slipped off the pulse!</b> Drag the fingers back onto the throb." : `${g ? "<b>Step 4.</b> " : ""}Tap <b>Beat</b> on every throb. <b>${Math.ceil(left)} s</b> left.`;
    } else if (st.phase === "calc") { step = 4; s = `${g ? "<b>Step 5.</b> " : ""}Stopwatch done. Now work out beats per minute below.`; }
    else if (st.phase === "jog") { step = 5; s = st.jogging ? "Jogging… keep holding!" : "Hold <b>Jog</b> to jog on the spot for one minute."; }
    else if (st.phase === "classify") { step = 5; s = "Compare each reading with the typical resting range below."; }
    else if (st.phase === "stats") { step = 5; s = "Tap the outlier, then work out the mean, median and range."; }
    else { step = L.ex || L.stats ? 5 : 4; s = "Done! See your result below."; }
    if (st.phase !== "done") K.setStep(step);
    if (h._s !== s) { h._s = s; h.innerHTML = s; }
  }

  /* keyboard: arrows move the fingers, Enter starts the stopwatch, Space taps a beat (or holds Jog) */
  document.addEventListener("keydown", e => {
    if (!st || st.phase === "done" || document.querySelector(".br-milestone")) return;
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    const mv = { ArrowLeft: [-6, 0], ArrowRight: [6, 0], ArrowUp: [0, -6], ArrowDown: [0, 6] }[e.key];
    if (mv && ["find", "ready", "count"].includes(st.phase)) { e.preventDefault(); moveFingers(mv[0], mv[1]); }
    else if (e.code === "Space") {
      if (st.phase === "count") { e.preventDefault(); if (!e.repeat) tapBeat(); }
      else if (st.phase === "jog") { e.preventDefault(); st.jogging = true; const b = $("#pl-jogbtn"); if (b) b.classList.add("is-on"); }
    } else if (e.key === "Enter" && st.phase === "ready") { e.preventDefault(); startCount(); }
  });
  document.addEventListener("keyup", e => { if (st && e.code === "Space" && st.phase === "jog") { st.jogging = false; const b = $("#pl-jogbtn"); if (b) b.classList.remove("is-on"); } });

  // test hook: lets automated checks read the hidden heart rate, beats and answers (not shown in the game)
  BGX.lab = { state: () => st, svgToClient };
  menu();
})();
