/* BioglowRX engine — core: storage, helpers, branding, sound, confetti, streaks, milestones.
   Plain script (no build step). Everything hangs off window.BGX. */
(function () {
  "use strict";
  const BGX = window.BGX = window.BGX || {};

  /* ---------- storage (safe when blocked) ---------- */
  BGX.store = {
    get(k, d) { try { const v = localStorage.getItem("bgx_" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("bgx_" + k, JSON.stringify(v)); } catch (e) {} }
  };

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
      <div class="br-stat"><div class="br-streak" id="br-streakbox">streak <b id="br-streak">${BGX.streak}</b></div>best <span id="br-best">${BGX.bestStreak}</span><br><button class="br-sound" id="br-sound" aria-pressed="true">Sound on</button></div>`;
    if (foot) foot.innerHTML = `${BGX.logo("br-footlogo")}<span>A BioglowRX Sciences Learning game · free to play, no login</span>`;
    const s = document.getElementById("br-sound");
    if (s) { BGX.paintSound(); s.onclick = () => { BGX.soundOn = !BGX.soundOn; BGX.store.set("sound", BGX.soundOn); BGX.paintSound(); if (BGX.soundOn) BGX.tone([660], .08); }; }
    BGX.paintStreak();
  };

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
  BGX.soundOn = BGX.store.get("sound", true);
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
    d.className = "br-plus"; d.textContent = txt; d.style.left = x + "px"; d.style.top = (y - 20) + "px";
    document.body.appendChild(d); setTimeout(() => d.remove(), 950);
  };
  BGX.flash = el => { el.classList.remove("br-wrong-flash"); void el.offsetWidth; el.classList.add("br-wrong-flash"); };

  /* correct / wrong in one call: sound, confetti, +1, streak, milestone */
  BGX.reward = (correct, el, opts = {}) => {
    const hit = BGX.scoreStreak(correct);
    if (correct) {
      BGX.sfx.ok(); if (el) { const [x, y] = BGX.center(el); BGX.burst(x, y, BGX.streak >= 3 ? 40 : 24); BGX.plus(el, BGX.streak >= 3 ? `+1 · ${BGX.streak} in a row` : "+1"); }
    } else { BGX.sfx.no(); if (opts.flash) BGX.flash(opts.flash); }
    if (hit) setTimeout(() => BGX.milestone(BGX.streak, opts.milestoneTile), 450);
  };

  /* ---------- milestones ---------- */
  const CHEERS = { 5: "Warming up!", 10: "On fire!", 20: "Unstoppable!", 30: "Subject master!", 40: "Lab legend!", 50: "Half a century!", 60: "Science genius!" };
  BGX.milestone = (n, tileFn) => {
    BGX.sfx.big(); BGX.rain(n >= 20 ? 200 : 140);
    const t = tileFn ? tileFn(n) : { bg: "var(--cat-mint)", corner: n, big: n, label: "in a row", text: "" };
    const ov = document.createElement("div"); ov.className = "br-milestone"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", n + " in a row");
    ov.innerHTML = `<div class="box"><div class="mtile" style="background:${t.bg}"><small>${BGX.esc(t.corner)}</small><b>${BGX.esc(t.big)}</b><em>${BGX.esc(t.label)}</em></div>
      <h2>${n} in a row!</h2><p>${CHEERS[n] || "Incredible streak!"} ${t.text || ""}</p><button class="br-next" id="br-mclose">Keep going</button></div>`;
    document.body.appendChild(ov);
    const close = () => { ov.remove(); document.removeEventListener("keydown", k, true); };
    const k = ev => { if (ev.key === "Escape" || ev.key === "Enter") { ev.preventDefault(); ev.stopPropagation(); close(); } };
    document.addEventListener("keydown", k, true);
    ov.querySelector("#br-mclose").onclick = close; ov.onclick = ev => { if (ev.target === ov) close(); };
    ov.querySelector("#br-mclose").focus({ preventScroll: true });
  };
})();
