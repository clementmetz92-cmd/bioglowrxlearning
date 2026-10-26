/* BioglowRX engine — core: storage, helpers, branding, sound, confetti, streaks, milestones.
   Plain script (no build step). Everything hangs off window.BGX. */
(function () {
  "use strict";
  const BGX = window.BGX = window.BGX || {};

  /* ---------- storage (safe when blocked) ---------- */
  BGX.store = {
    /* a value of the wrong kind (hand-edited or from an old version) falls back to the default instead of breaking a page */
    get(k, d) { try { const v = localStorage.getItem("bgx_" + k); if (v == null) return d; const x = JSON.parse(v);
      if (d != null && (typeof x !== typeof d || Array.isArray(x) !== Array.isArray(d) || x === null || (typeof d === "number" && !isFinite(x)))) return d; return x; } catch (e) { return d; } },
    /* returns false when the browser refuses to save (private browsing, storage full or blocked); study.js shows a warning */
    set(k, v) { try { localStorage.setItem("bgx_" + k, JSON.stringify(v)); return true; } catch (e) {
      if (!BGX.storeBroken) { BGX.storeBroken = true; try { document.dispatchEvent(new CustomEvent("bgx:storefail")); } catch (x) {} } return false; } }
  };
  try { localStorage.setItem("bgx__t", "1"); localStorage.removeItem("bgx__t"); } catch (e) { BGX.storeBroken = true; }

  /* ---------- text size (0 normal, 1 large, 2 extra large), set from the "Aa" button in the header ---------- */
  BGX.textSize = Math.max(0, Math.min(2, BGX.store.get("text", 0) | 0));
  BGX.setTextSize = n => { BGX.textSize = n; BGX.store.set("text", n); const h = document.documentElement; h.classList.remove("bgx-t1", "bgx-t2"); if (n) h.classList.add("bgx-t" + n); if (BGX.track) BGX.track("text_size", { size: n }); };
  if (BGX.textSize) document.documentElement.classList.add("bgx-t" + BGX.textSize);

  /* ---------- helpers ---------- */
  BGX.esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  BGX.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  BGX.pick = a => a[Math.random() * a.length | 0];
  BGX.rng = seed => { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };
  BGX.shade = (hex, amt) => {
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = n >> 8 & 255, b = n & 255;
    const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  BGX.cssVar = name => { try { return getComputedStyle(document.documentElement).getPropertyValue("--" + name).trim(); } catch (e) { return ""; } };
  BGX.root = document.documentElement.getAttribute("data-root") || "./";   // path back to the site root
  BGX.RM = (() => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } })();

  /* ---------- logo ---------- */
  let lid = 0;
  BGX.logo = (cls = "br-logo") => {
    const i = "lg" + (++lid);
    return `<svg class="${cls}" viewBox="0 0 52 56" role="img" aria-label="BioglowRX logo"><defs><linearGradient id="${i}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0E6B66"/><stop offset="1" stop-color="#2FB67C"/></linearGradient><radialGradient id="${i}b"><stop offset="0" stop-color="#E9FFF6"/><stop offset=".45" stop-color="#9BF5CF"/><stop offset="1" stop-color="#9BF5CF" stop-opacity="0"/></radialGradient></defs><rect width="52" height="56" rx="11" fill="url(#${i}a)"/><ellipse cx="26" cy="31" rx="20" ry="8.5" fill="none" stroke="#FFFFFF" stroke-opacity=".38" stroke-width="1.4" transform="rotate(-24 26 31)"/><text x="6" y="13" font-family="Chivo Mono,ui-monospace,monospace" font-weight="600" font-size="8.5" fill="#FFFFFF" fill-opacity=".9">Rx</text><text x="26" y="40" text-anchor="middle" font-family="Chivo,-apple-system,sans-serif" font-weight="900" font-size="23" fill="#FFFFFF">Bg</text><circle cx="44" cy="22" r="7" fill="url(#${i}b)"/><circle cx="44" cy="22" r="2.2" fill="#FFFFFF"/></svg>`;
  };

  /* ---------- page shell: header + footer ---------- */
  BGX.shell = (opts = {}) => {
    const header = document.getElementById("br-header"), foot = document.getElementById("br-foot");
    if (header) header.innerHTML = `
      <a class="br-brand" href="${BGX.root}index.html" aria-label="BioglowRX Sciences Learning home">${BGX.logo()}
        <div class="br-word"><div class="br-word-name">Bioglow<span>RX</span></div><p>Sciences Learning</p></div></a>
      <button class="br-lvl" id="br-lvl" type="button"></button>${BGX.progress ? BGX.progress.headerLink() : ""}${BGX.community ? BGX.community.headerButton() : ""}
      <div class="br-stat"><span class="br-streaks"><div class="br-streak" id="br-streakbox" title="Correct answers in a row">streak <b id="br-streak">${BGX.streak}</b></div><span id="br-best" hidden>${BGX.bestStreak}</span></span><button class="br-day" id="br-day" type="button" hidden></button><button class="br-sound" id="br-sound" aria-pressed="false">Sound off</button><button class="br-sound br-textbtn" id="br-text" type="button">Aa</button></div>`;
    /* a first-time visitor sees no row of zeros: the stats appear after the first answer */
    const fresh = () => BGX.xp && BGX.xp.total === 0 && !BGX.bestStreak;
    document.documentElement.classList.toggle("bgx-new", fresh());
    BGX.unfresh = () => document.documentElement.classList.remove("bgx-new");
    if (foot) foot.innerHTML = `<div class="br-footline">${BGX.logo("br-footlogo")}<span>A BioglowRX Sciences Learning game · free to play, no login · <a href="${BGX.root}practice/index.html">Practice topics</a> · <a href="${BGX.root}about/index.html">About &amp; accuracy</a> · <a href="${BGX.root}privacy/index.html">Privacy</a></span></div>` +
      `<a class="br-phbadge" href="https://www.producthunt.com/products/bioglowrx-sciences-learning?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-bioglowrx-sciences-learning" target="_blank" rel="noopener noreferrer"><img alt="BioglowRX Sciences Learning - Free science games built from real university textbooks | Product Hunt" width="250" height="54" loading="lazy" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1293422&amp;theme=neutral&amp;t=1793026291700"></a>`;
    const s = document.getElementById("br-sound");
    if (s) { BGX.paintSound(); s.onclick = () => { BGX.soundOn = !BGX.soundOn; BGX.store.set("sound", BGX.soundOn); BGX.paintSound(); if (BGX.soundOn) BGX.tone([660], .08); }; }
    const tb = document.getElementById("br-text");
    if (tb) { const paintT = () => { tb.innerHTML = `Aa<small>${["", "+", "++"][BGX.textSize]}</small>`; tb.setAttribute("aria-label", `Text size: ${["normal", "large", "extra large"][BGX.textSize]}. Change text size`); };
      paintT(); tb.onclick = () => { BGX.setTextSize((BGX.textSize + 1) % 3); paintT(); if (BGX.toast) BGX.toast(["Normal text", "Large text", "Extra-large text"][BGX.textSize]); }; }
    BGX.paintStreak();
    if (BGX.study) BGX.study.paintHeader();
    const lv = document.getElementById("br-lvl");
    if (lv) { lv.onclick = () => { BGX.sfx.tap(); BGX.showLevels(); }; BGX.paintLevel(); }
  };

  /* ---------- days used (kept on this device; the base for a day streak, and anonymous visit info) ---------- */
  (function () {
    const d = new Date(), day = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const v = BGX.store.get("visits", null);
    const ok = v && typeof v === "object" && typeof v.first === "string" && typeof v.days === "number";
    const rec = ok ? v : { first: day, last: "", days: 0 };
    if (rec.last !== day) { rec.days += 1; rec.prev = rec.last || ""; rec.last = day; BGX.store.set("visits", rec); }
    const diff = (a, b) => Math.round((Date.parse(a) - Date.parse(b)) / 864e5);
    BGX.visitInfo = () => ({ days_active: rec.days, days_since_first: diff(day, rec.first), days_since_last: rec.prev ? diff(day, rec.prev) : null, returning: rec.days > 1,
      rounds_total: (BGX.store.get("rounds", 0) | 0) });
  })();

  /* ---------- streaks (shared across every game) ---------- */
  BGX.streak = 0;
  BGX.bestStreak = BGX.store.get("bestStreak", 0);
  BGX.paintStreak = (bump) => {
    const b = document.getElementById("br-streak"), best = document.getElementById("br-best"), box = document.getElementById("br-streakbox");
    if (!b) return;
    b.textContent = BGX.streak; best.textContent = BGX.bestStreak;
    box.classList.toggle("is-hot", BGX.streak >= 3);
    if (bump) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  };
  BGX.scoreStreak = correct => {
    if (BGX.unfresh) BGX.unfresh();
    if (correct) { BGX.streak++; if (BGX.streak > BGX.bestStreak) { BGX.bestStreak = BGX.streak; BGX.store.set("bestStreak", BGX.bestStreak); } }
    else BGX.streak = 0;
    BGX.paintStreak(true);
    return correct && BGX.isMilestone(BGX.streak);
  };
  BGX.isMilestone = n => n === 5 || (n >= 10 && n % 10 === 0);

  /* ---------- last played (hub "continue where you left off") ---------- */
  BGX.recordPlay = info => BGX.store.set("last", Object.assign({ at: Date.now() }, info));
  BGX.lastPlay = () => BGX.store.get("last", null);

  /* ---------- sound ---------- */
  BGX.soundOn = BGX.store.get("sound", false);   // off until switched on: quiet in class, on the bus, in the library
  let actx = null;
  BGX.paintSound = () => { const b = document.getElementById("br-sound"); if (!b) return; b.textContent = BGX.soundOn ? "Sound on" : "Sound off"; b.setAttribute("aria-pressed", BGX.soundOn); };
  BGX.tone = (freqs, dur = .12, type = "sine", gap = .09, vol = .08) => {
    if (!BGX.soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume();
      freqs.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * gap;
        o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
        o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + .02);
      });
    } catch (e) {}
  };
  BGX.sfx = {
    ok: () => BGX.tone([660, 880], .14), no: () => BGX.tone([220, 180], .18, "triangle", .1, .07), tap: () => BGX.tone([520], .05, "sine", 0, .04),
    win: () => BGX.tone([523, 659, 784, 1047], .22, "sine", .11, .09), big: () => BGX.tone([523, 659, 784, 1047, 1319], .3, "triangle", .1, .09)
  };

  /* ---------- confetti ---------- */
  let fx, ctx, parts = [], raf = 0;
  function ensureFx() {
    if (fx) return;
    fx = document.createElement("canvas"); fx.id = "br-fx"; fx.setAttribute("aria-hidden", "true"); document.body.appendChild(fx);
    ctx = fx.getContext("2d"); size(); addEventListener("resize", size);
  }
  function size() { const d = devicePixelRatio || 1; fx.width = innerWidth * d; fx.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  const PAL = () => ["coral", "amber", "lemon", "sage", "mint", "sky", "lilac", "orchid", "peach"].map(k => BGX.cssVar("cat-" + k) || "#9FD8CB");
  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 30);
    for (const p of parts) {
      p.vy += .18; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= .008;
      ctx.save(); ctx.globalAlpha = Math.min(1, p.life); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.sq) ctx.fillRect(-p.r, -p.r * .6, p.r * 2, p.r * 1.2); else { ctx.beginPath(); ctx.arc(0, 0, p.r * .8, 0, 7); ctx.fill(); }
      ctx.restore();
    }
    raf = parts.length ? requestAnimationFrame(tick) : 0;
  }
  BGX.burst = (x, y, n = 26) => {
    if (BGX.RM) return; ensureFx(); const pal = PAL();
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 5;
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3, r: 3 + Math.random() * 4, c: pal[i % pal.length], rot: Math.random() * 6, vr: (Math.random() - .5) * .4, life: 1, sq: Math.random() < .5 }); }
    if (!raf) raf = requestAnimationFrame(tick);
  };
  BGX.rain = (n = 140) => {
    if (BGX.RM) return; ensureFx(); const pal = PAL();
    for (let i = 0; i < n; i++) parts.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .6, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3, r: 4 + Math.random() * 4, c: pal[i % pal.length], rot: Math.random() * 6, vr: (Math.random() - .5) * .3, life: 1.6, sq: Math.random() < .6 });
    if (!raf) raf = requestAnimationFrame(tick);
  };
  BGX.center = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  BGX.plus = (el, txt = "+1") => {
    const [x, y] = BGX.center(el), d = document.createElement("div");
    d.className = "br-plus"; d.textContent = txt; d.style.left = Math.max(txt.length * 6 + 8, Math.min(innerWidth - txt.length * 6 - 8, x)) + "px"; d.style.top = (y - 20) + "px";
    document.body.appendChild(d); setTimeout(() => d.remove(), 950);
  };
  BGX.toast = txt => {
    document.querySelectorAll(".br-toast").forEach(x => x.remove());
    const d = document.createElement("div"); d.className = "br-toast"; d.setAttribute("role", "status"); d.textContent = txt;
    document.body.appendChild(d); setTimeout(() => d.classList.add("is-out"), 2200); setTimeout(() => d.remove(), 2700);
  };
  BGX.flash = el => { el.classList.remove("br-wrong-flash"); void el.offsetWidth; el.classList.add("br-wrong-flash"); };

  /* correct / wrong in one call: sound, confetti, XP, streak, milestone.
     opts: flash (element to flash on a miss), milestoneTile, xpScale (e.g. 0.5 when a helper was used) */
  BGX.reward = (correct, el, opts = {}) => {
    const hit = BGX.scoreStreak(correct);
    if (correct) {
      const gain = BGX.xp.forAnswer(BGX.streak, opts.xpScale);
      BGX.sfx.ok();
      if (el) { const [x, y] = BGX.center(el); BGX.burst(x, y, BGX.streak >= 3 ? 40 : 24); BGX.plus(el, BGX.streak >= 3 ? `+${gain} XP · ${BGX.streak} in a row` : `+${gain} XP`); }
      BGX.xp.add(gain);
    } else { BGX.sfx.no(); if (opts.flash) BGX.flash(opts.flash); }
    if (hit) { const bonus = BGX.xp.milestoneBonus(BGX.streak); BGX.xp.add(bonus); setTimeout(() => BGX.milestone(BGX.streak, opts.milestoneTile, bonus), 450); }
  };

  /* ---------- sheet: a pop-up panel for reading content without losing your place on the page ----------
     BGX.sheet({ label, title, html, nav: { count, index, render: i => ({ title, html }) }, onOpen(body), onClose })
     Phone: slides up from the bottom; larger screens: a centred panel. Esc / backdrop / Close button close it,
     ← → (and the arrow buttons) move between items when nav is given. Page scroll is locked while open. */
  BGX.sheet = o => {
    const prev = document.activeElement, n = o.nav ? o.nav.count : 0;
    let idx = o.nav ? o.nav.index : 0;
    const ov = document.createElement("div");
    ov.className = "br-sheetwrap"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", o.label || o.title || "Details");
    ov.innerHTML = `<div class="br-sheet${o.wide ? " is-wide" : ""}" tabindex="-1">
      <div class="br-sheethead"><button class="br-quit" type="button" data-x aria-label="Close"><span aria-hidden="true">✕</span> Close</button>
        ${n > 1 ? `<div class="br-sheetnav"><button class="br-carbtn" type="button" data-p aria-label="Previous">‹</button><span class="ct" aria-live="polite"></span><button class="br-carbtn" type="button" data-n aria-label="Next">›</button></div>` : ""}</div>
      <div class="br-sheetbody"></div></div>`;
    const body = ov.querySelector(".br-sheetbody"), ct = ov.querySelector(".ct");
    const set = (title, html) => {
      body.innerHTML = (title ? `<h2 class="br-sheettitle">${BGX.esc(title)}</h2>` : "") + html;
      body.scrollTop = 0; if (ct) ct.textContent = `${idx + 1} / ${n}`;
      if (o.onOpen) o.onOpen(body, idx);
    };
    const go = d => { if (!o.nav) return; idx = (idx + d + n) % n; const r = o.nav.render(idx); BGX.sfx.tap(); set(r.title, r.html); };
    const close = () => {
      ov.classList.add("is-out"); document.removeEventListener("keydown", key, true);
      setTimeout(() => { ov.remove(); if (!document.querySelector(".br-sheetwrap")) document.documentElement.classList.remove("br-locked"); }, BGX.RM ? 0 : 160);
      if (prev && prev.focus) prev.focus({ preventScroll: true });
      if (o.onClose) o.onClose(idx);
    };
    const key = ev => {
      if (!document.body.contains(ov)) return;
      if (ev.key === "Escape") { ev.preventDefault(); ev.stopPropagation(); close(); }
      else if (n > 1 && ev.key === "ArrowRight" && !/INPUT|TEXTAREA/.test(ev.target.tagName)) { ev.preventDefault(); ev.stopPropagation(); go(1); }
      else if (n > 1 && ev.key === "ArrowLeft" && !/INPUT|TEXTAREA/.test(ev.target.tagName)) { ev.preventDefault(); ev.stopPropagation(); go(-1); }
      else if (ev.key === "Tab") {   // keep focus inside the sheet
        const f = [...ov.querySelectorAll("button, a[href], input, summary, [tabindex]:not([tabindex='-1'])")].filter(e => !e.disabled && e.offsetParent !== null);
        if (!f.length) return; const first = f[0], last = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
        else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
      }
      else if (ev.key === "Enter" || ev.key === " ") ev.stopPropagation();   // don't trigger the game behind
    };
    document.addEventListener("keydown", key, true);
    ov.querySelector("[data-x]").onclick = close;
    ov.onclick = ev => { if (ev.target === ov) close(); };
    if (n > 1) { ov.querySelector("[data-p]").onclick = () => go(-1); ov.querySelector("[data-n]").onclick = () => go(1); }
    // swipe left/right between items on touch screens
    let x0 = null, y0 = null;
    body.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    body.addEventListener("touchend", e => { if (x0 == null || n < 2) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1); }, { passive: true });
    document.documentElement.classList.add("br-locked");
    document.body.appendChild(ov);
    set(o.title, o.html);
    ov.querySelector("[data-x]").focus({ preventScroll: true });
    return { el: ov, body, close, set, go };
  };

  /* ---------- printing: BGX.printDoc(html, kind) prints only that content (kind "notes" = portrait study guide).
     Uses the browser's print dialog, where "Save as PDF" (or Share › Save to Files on iPhone) makes the PDF. */
  BGX.printDoc = (html, kind = "doc") => {
    let box = document.getElementById("br-printdoc");
    if (!box) { box = document.createElement("div"); box.id = "br-printdoc"; document.body.appendChild(box); }
    box.className = "is-" + kind; box.innerHTML = html;
    document.body.classList.add("br-printing-doc");
    const done = () => { document.body.classList.remove("br-printing-doc"); box.innerHTML = ""; window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    setTimeout(() => { try { window.print(); } catch (e) { done(); } }, 80);
  };

  /* ---------- pop-ups (one at a time: a streak milestone and a level-up never overlap) ---------- */
  const popQ = []; let popping = false;
  /* during a round, pop-ups wait for the end screen so they never cover the Next button */
  BGX.inRound = false;
  const held = [];
  BGX.popup = (label, html, opts = {}) => { if (BGX.inRound && !opts.now) { held.push({ label, html, opts }); return; } popQ.push({ label, html, opts }); if (!popping) nextPop(); };
  BGX.endRound = () => { BGX.inRound = false; const h = held.splice(0); h.forEach(p => popQ.push(p)); if (h.length && !popping) nextPop(); };
  function nextPop() {
    const p = popQ.shift(); if (!p) { popping = false; return; }
    popping = true;
    const ov = document.createElement("div"); ov.className = "br-milestone" + (p.opts.cls ? " " + p.opts.cls : ""); ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", p.label);
    ov.innerHTML = `<div class="box">${p.html}</div>`;
    document.body.appendChild(ov);
    if (p.opts.onOpen) p.opts.onOpen(ov);
    const close = () => { ov.remove(); document.removeEventListener("keydown", k, true); setTimeout(nextPop, 120); };
    const k = ev => { if (ev.key === "Escape" || (ev.key === "Enter" && !p.opts.noEnter)) { ev.preventDefault(); ev.stopPropagation(); close(); } };
    document.addEventListener("keydown", k, true);
    ov.querySelectorAll("[data-close]").forEach(b => b.onclick = close); ov.onclick = ev => { if (ev.target === ov) close(); };
    const f = ov.querySelector("[data-close]"); if (f) f.focus({ preventScroll: true });
  }

  /* ---------- milestones ---------- */
  const CHEERS = { 5: "Warming up!", 10: "On fire!", 20: "Unstoppable!", 30: "Subject master!", 40: "Lab legend!", 50: "Half a century!", 60: "Science genius!" };
  BGX.milestone = (n, tileFn, bonus) => {
    /* mid-round: a small note that doesn't block anything; the full card is for streaks outside rounds */
    if (BGX.inRound) { BGX.sfx.big(); BGX.rain(80); if (BGX.toast) BGX.toast(`🔥 ${n} in a row! ${CHEERS[n] || ""}${bonus ? ` +${bonus} XP` : ""}`); return; }
    BGX.sfx.big(); BGX.rain(n >= 20 ? 200 : 140);
    const t = tileFn ? tileFn(n) : { bg: "var(--cat-mint)", corner: n, big: n, label: "in a row", text: "" };
    BGX.popup(n + " in a row", `<div class="mtile" style="background:${t.bg}"><small>${BGX.esc(t.corner)}</small><b>${t.bigHTML || BGX.esc(t.big)}</b><em>${BGX.esc(t.label)}</em></div>
      <h2>${n} in a row!</h2><p>${CHEERS[n] || "Incredible streak!"} ${t.text || ""}</p>${bonus ? `<p class="br-xpbonus">+${bonus} XP streak bonus</p>` : ""}<button class="br-next" data-close>Keep going</button>`);
  };

  /* ---------- XP and levels ----------
     Every correct answer: 10 XP, plus 2 XP for each answer already in the current streak (up to +40).
     Streak milestones (5, 10, 20, 30…) add 5 XP per answer in the streak. Finishing a round adds 20 XP,
     a perfect round 50 more. Reading a game's study notes the first time: 25 XP. Labs: 20 XP per star
     plus 10 per level above 1. Saved on this device. */
  const T = [
    { tier: "Lab bench", color: "cat-sky" }, { tier: "Research lab", color: "cat-mint" }, { tier: "Clinic", color: "cat-lilac" },
    { tier: "Faculty", color: "cat-amber" }, { tier: "Hall of fame", color: "cat-coral" }];
  BGX.LEVELS = [
    [0, "Lab Trainee", "beaker", "Goggles on, gloves on. Every great scientist starts here."],
    [100, "Beaker Washer", "drop", "Clean glassware, clean results. You're learning the ropes."],
    [250, "Pipette Apprentice", "lab", "Steady hands, exact drops. Precision is your new hobby."],
    [450, "Microscope Rookie", "eye", "Coarse focus, fine focus… and suddenly cells everywhere."],
    [700, "Sample Sleuth", "search", "You spot what others miss. Nothing gets past you."],
    [1000, "Lab Assistant", "flask", "Trusted at the bench. The lab can't run without you."],
    [1400, "Cell Spotter", "cell", "Mitochondria, ribosomes, nuclei: you know every neighbourhood."],
    [1900, "Lab Technician", "gauge", "Calibrated, careful and quick. Machines obey you."],
    [2500, "Data Wrangler", "chart", "Means, medians and outliers: your numbers tell stories."],
    [3200, "Junior Scientist", "molecule", "Halfway there! You think in molecules now."],
    [4000, "Research Assistant", "layers", "Reading the literature for fun. Footnotes fear you."],
    [5000, "Clinical Intern", "heart", "From the bench to the bedside. Patients, here you come."],
    [6200, "Case Solver", "clipboard", "Symptoms in, diagnosis out. Detective mode: on."],
    [7600, "Senior Scientist", "dna", "Your knowledge has its own double helix."],
    [9200, "Lab Lead", "steps", "You run the lab now. Someone fetch you a coffee."],
    [11000, "Clinical Specialist", "pill", "Doses, drugs and diets: you know the right one."],
    [13000, "Principal Investigator", "brain", "Your name goes first on the grant. Big ideas only."],
    [15500, "Professor", "book", "Students take notes when you speak."],
    [18500, "Chief Scientist", "globe", "The whole institute comes to you with questions."],
    [22000, "Doctor Researcher", "atom", "The top of the table. Science bows to you!"]
  ].map(([xp, name, icon, line], i) => Object.assign({ n: i + 1, xp, name, icon, line }, T[i === 19 ? 4 : Math.floor(i / 5) > 3 ? 3 : Math.floor(i / 5)]));
  const L = BGX.LEVELS;
  BGX.xp = {
    total: BGX.store.get("xp", 0),
    STREAK_STEP: 2, STREAK_CAP: 40,
    forAnswer: (streak, scale) => Math.max(1, Math.round((10 + Math.min(BGX.xp.STREAK_CAP, BGX.xp.STREAK_STEP * Math.max(0, streak - 1))) * (scale == null ? 1 : scale))),
    milestoneBonus: n => 5 * n,
    roundBonus: perfect => 20 + (perfect ? 50 : 0),
    labBonus: (stars, level) => stars > 0 ? 20 * stars + 10 * (level - 1) : 0,
    level: t => {
      t = t == null ? BGX.xp.total : t;
      let i = 0; while (i + 1 < L.length && t >= L[i + 1].xp) i++;
      const cur = L[i], next = L[i + 1] || null;
      return Object.assign({}, cur, { next, into: t - cur.xp, need: next ? next.xp - cur.xp : 0, pct: next ? Math.min(100, (t - cur.xp) / (next.xp - cur.xp) * 100) : 100 });
    },
    add: n => {
      n = Math.round(n || 0); if (n <= 0) return 0;
      BGX.xp.total = BGX.store.get("xp", BGX.xp.total) + n;   // re-read: another tab may have added XP
      const before = BGX.xp.level(BGX.xp.total - n).n;
      BGX.store.set("xp", BGX.xp.total);
      const after = BGX.xp.level();
      BGX.paintLevel(true);
      if (after.n > before) setTimeout(() => BGX.levelUp(after), 700);
      return n;
    },
    /* one-time rewards (e.g. reading a game's notes) */
    once: (key, n) => { const done = BGX.store.get("xponce", {}); if (done[key]) return 0; done[key] = 1; BGX.store.set("xponce", done); return BGX.xp.add(n); }
  };
  const badge = (lv, cls) => `<span class="br-badge ${cls || ""}" style="background:var(--${lv.color})">${BGX.icon ? BGX.icon(lv.icon) : ""}<small>${lv.n}</small></span>`;
  BGX.levelBadge = badge;
  BGX.paintLevel = bump => {
    const el = document.getElementById("br-lvl"); if (!el) return;
    const lv = BGX.xp.level();
    el.setAttribute("aria-label", `Level ${lv.n}, ${lv.name}. ${BGX.xp.total} XP${lv.next ? `, ${lv.next.xp - BGX.xp.total} to level ${lv.n + 1}` : ""}. See all levels`);
    el.innerHTML = `${badge(lv)}<span class="tx"><b>Lv ${lv.n} <em>${BGX.esc(lv.name)}</em></b><i class="bar"><i style="width:${lv.pct.toFixed(1)}%"></i></i>
      <small>${lv.next ? `${lv.into.toLocaleString("en-US")} / ${lv.need.toLocaleString("en-US")} XP` : `${BGX.xp.total.toLocaleString("en-US")} XP · top level`}</small></span>`;
    if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  };
  BGX.levelUp = lv => {
    BGX.sfx.big(); BGX.rain(240);
    BGX.popup("Level " + lv.n, `${badge(lv, "is-big")}
      <p class="br-label" style="margin:6px 0 0">Level up · ${BGX.esc(lv.tier)}</p>
      <h2>Level ${lv.n}!</h2><p class="br-lvname">${BGX.esc(lv.name)}</p><p>${BGX.esc(lv.line)}</p>
      ${lv.next ? `<p class="br-hint" style="margin:0">Next: <b>${BGX.esc(lv.next.name)}</b> at ${lv.next.xp.toLocaleString("en-US")} XP</p>` : `<p class="br-hint" style="margin:0"><b>You've reached the top level.</b></p>`}
      <div class="br-btns" style="margin-top:6px"><button class="br-next" data-close>Keep going</button><button class="br-ghost" id="br-lvlall">All levels</button></div>`,
      { cls: "is-level", onOpen: ov => { ov.querySelector("#br-lvlall").onclick = () => { ov.querySelector("[data-close]").click(); BGX.showLevels(); }; } });
  };
  BGX.showLevels = () => {
    const lv = BGX.xp.level(), tiers = [];
    L.forEach(l => { let t = tiers.find(x => x.tier === l.tier); if (!t) tiers.push(t = { tier: l.tier, color: l.color, ls: [] }); t.ls.push(l); });
    BGX.popup("Your level", `<button class="br-quit br-lvclose" data-close aria-label="Close">✕ Close</button>
      <div class="br-lvnow">${badge(lv, "is-big")}<div><p class="br-label" style="margin:0">${BGX.esc(lv.tier)} · Level ${lv.n} of 20</p><h2>${BGX.esc(lv.name)}</h2><p>${BGX.esc(lv.line)}</p>
        <i class="bar"><i style="width:${lv.pct.toFixed(1)}%"></i></i>
        <p class="br-hint" style="margin:4px 0 0">${BGX.xp.total.toLocaleString("en-US")} XP${lv.next ? ` · ${(lv.next.xp - BGX.xp.total).toLocaleString("en-US")} XP to <b>${BGX.esc(lv.next.name)}</b>` : " · top level reached"}</p></div></div>
      <details class="br-xphow"><summary>How to earn XP</summary><ul>
        <li><b>10 XP</b> for every correct answer</li>
        <li><b>+2 XP</b> for each answer already in your streak (up to +40): a 10-answer streak earns 28 XP per answer</li>
        <li><b>Streak bonus</b> at 5, 10, 20, 30… in a row: 5 XP per answer in the streak</li>
        <li><b>+20 XP</b> for finishing a round, <b>+50 XP</b> more if it's perfect</li>
        <li><b>+25 XP</b> the first time you read a game's study notes</li>
        <li><b>Labs:</b> 20 XP per star, plus 10 for level 2 and 20 for level 3</li>
        <li>Using "Show me how" halves the XP for that answer. A wrong answer costs nothing, but ends the streak.</li></ul></details>
      <div class="br-lvlist">${tiers.map(t => `<p class="br-label">${BGX.esc(t.tier)}</p><ol>${t.ls.map(l => `<li class="${l.n < lv.n ? "is-done" : l.n === lv.n ? "is-now" : "is-locked"}">${badge(l)}<span><b>${BGX.esc(l.name)}</b><small>${l.n === 1 ? "Start" : l.xp.toLocaleString("en-US") + " XP"}</small></span>${l.n < lv.n ? '<i aria-label="reached">✓</i>' : l.n === lv.n ? '<i class="you">You</i>' : ""}</li>`).join("")}</ol>`).join("")}</div>
      <p class="br-hint" style="margin:0">XP and levels are saved in this browser on this device.</p>`, { now: true,  cls: "is-levels", noEnter: true });
  };
})();

/* ---------- install as an app ("Add to Home Screen") ---------- */
(function () {
  "use strict";
  const BGX = window.BGX;
  const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isIPad = /iPad/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isPhone = isIOS || /Android|Mobile/i.test(ua) || matchMedia("(pointer: coarse) and (max-width: 900px)").matches;
  let deferred = null;
  if ("serviceWorker" in navigator && location.protocol === "https:") addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; });
  addEventListener("appinstalled", () => { deferred = null; if (BGX.track) BGX.track("app_installed", {}); document.querySelectorAll("[data-bgx-install]").forEach(b => b.remove()); if (BGX.toast) BGX.toast("Added! Find BioglowRX on your home screen."); });
  if (standalone() && BGX.track) addEventListener("load", () => BGX.track("open_from_homescreen", {}));
  const share = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-4px"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
  function howTo() {
    const safari = isIOS && !/CriOS|FxiOS|EdgiOS/.test(ua);
    const steps = isIOS
      ? (safari ? [`Tap the <b>Share</b> button ${share} ${isIPad ? "at the top right of Safari, next to the address bar" : "at the bottom of Safari"}.`, "Scroll down and tap <b>Add to Home Screen</b>.", "Tap <b>Add</b>. BioglowRX appears on your home screen like an app."]
                : [`Tap the <b>Share</b> button ${share} (top right or bottom of the browser).`, "Choose <b>Add to Home Screen</b>. If you don't see it, open this page in Safari first.", "Tap <b>Add</b>."])
      : ["Open your browser menu: <b>⋮</b> (top right) in Chrome, or <b>☰</b> in Samsung Internet.", "Tap <b>Add to Home screen</b> or <b>Install app</b>.", "Tap <b>Add</b> or <b>Install</b>."];
    BGX.sheet({ label: "Add BioglowRX to your home screen", title: "Add BioglowRX to your home screen",
      html: `<p class="br-hint" style="margin:0 0 12px">Opens full screen like an app, with your streak and trophies one tap away. Nothing to download from a store.</p>
        <ol class="br-howadd">${steps.map(s => `<li>${s}</li>`).join("")}</ol>` });
  }
  BGX.install = {
    available: () => isPhone && !standalone(),
    open() {
      if (BGX.track) BGX.track("install_click", { prompt: !!deferred, ios: isIOS });
      if (deferred) { deferred.prompt(); deferred.userChoice.then(r => { if (BGX.track) BGX.track("install_choice", { outcome: r.outcome }); deferred = null; }); }
      else howTo();
    }
  };
})();
