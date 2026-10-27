/* BioglowRX — study habits, loaded on every page straight after core.js:
   - day streak and daily goal (a day counts when you finish one round or lab run; the goal is a number of rounds)
   - saved mistakes with spaced review ("Today's review")
   - progress backup: a code or a file you can move to another device, merged with what is already there
   - a warning when the browser refuses to save progress
   Everything is kept in this browser (BGX.store). */
(function () {
  "use strict";
  const BGX = window.BGX, esc = BGX.esc, R = BGX.root;
  const pad = n => String(n).padStart(2, "0");
  const dayOf = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const today = () => dayOf(new Date());
  const addDays = (day, n) => { const d = new Date(day + "T12:00:00"); d.setDate(d.getDate() + n); return dayOf(d); };
  const gap = (a, b) => Math.round((Date.parse(a + "T12:00:00") - Date.parse(b + "T12:00:00")) / 864e5);
  const track = (e, p) => { if (BGX.track) BGX.track(e, p || {}); };

  /* ================= day streak + daily goal ================= */
  const GOALS = [{ n: 1, name: "Light", sub: "1 round a day" }, { n: 3, name: "Regular", sub: "3 rounds a day" }, { n: 5, name: "Serious", sub: "5 rounds a day" }];
  const GOAL_XP = 30, FREEZE_MAX = 2;
  const loadH = () => {
    const h = BGX.store.get("habit", null) || {};
    return { goal: GOALS.some(g => g.n === h.goal) ? h.goal : 3, cur: h.cur | 0, best: h.best | 0, last: typeof h.last === "string" ? h.last : "",
      freeze: Math.min(FREEZE_MAX, h.freeze | 0), days: h.days && typeof h.days === "object" ? h.days : {} };
  };
  const saveH = h => {
    const keep = addDays(today(), -40); Object.keys(h.days).forEach(d => { if (d < keep) delete h.days[d]; });
    BGX.store.set("habit", h);
  };
  /* the streak as it stands right now (it drops to 0 only once a missed day can't be covered by a freeze) */
  function streakNow(h) {
    h = h || loadH(); if (!h.last) return { n: 0, alive: false, needToday: true };
    const g = gap(today(), h.last);
    if (g <= 0) return { n: h.cur, alive: true, needToday: false };
    if (g === 1) return { n: h.cur, alive: true, needToday: true };
    if (g - 1 <= h.freeze) return { n: h.cur, alive: true, needToday: true, freezeNeeded: g - 1 };
    return { n: 0, alive: false, needToday: true, lost: h.cur };
  }
  const roundsToday = h => (h || loadH()).days[today()] | 0;

  /* called when a round or a lab run ends; returns what changed, for the end screen */
  function roundDone() {
    const h = loadH(), t = today(), out = { first: false, goalMet: false, freezeUsed: 0, gotFreeze: false };
    if (h.last !== t) {
      const g = h.last ? gap(t, h.last) : null;
      if (g === 1) h.cur += 1;
      else if (g != null && g > 1 && g - 1 <= h.freeze) { h.freeze -= g - 1; out.freezeUsed = g - 1; h.cur += 1; }
      else h.cur = 1;
      h.last = t; out.first = true;
      if (h.cur % 7 === 0 && h.freeze < FREEZE_MAX) { h.freeze++; out.gotFreeze = true; }
      h.best = Math.max(h.best, h.cur);
    }
    h.days[t] = (h.days[t] | 0) + 1;
    if (h.days[t] === h.goal) out.goalMet = true;
    saveH(h);
    out.streak = h.cur; out.rounds = h.days[t]; out.goal = h.goal;
    if (out.goalMet) { BGX.xp.add(GOAL_XP); track("daily_goal", { goal: h.goal, streak: h.cur }); }
    if (out.first) track("streak_day", { streak: h.cur, freeze_used: out.freezeUsed });
    maybePersist();
    paintHeader();
    /* a pop-up only for the moments worth one: the goal reached, or a streak milestone */
    const mile = out.first && [3, 7, 14, 30, 50, 100, 200, 365].indexOf(h.cur) >= 0;
    if (out.goalMet || mile) setTimeout(() => BGX.popup(out.goalMet ? "Daily goal reached" : h.cur + "-day streak", `${ringSVG(1, 92)}
      <h2>${out.goalMet ? "Daily goal reached!" : `${h.cur}-day streak!`}</h2>
      <p>${out.goalMet ? `${h.goal} round${h.goal > 1 ? "s" : ""} today${h.cur > 1 ? ` and a <b>${h.cur}-day streak</b>` : ""}. Come back tomorrow to keep it going.` : "You've studied " + h.cur + " days in a row. Small and often is how it sticks."}</p>
      ${out.goalMet ? `<p class="br-xpbonus">+${GOAL_XP} XP daily-goal bonus</p>` : ""}${out.gotFreeze ? `<p class="br-hint" style="margin:0">You earned a <b>streak freeze</b>: it covers one missed day.</p>` : ""}
      <button class="br-next" data-close>Keep going</button>`, { cls: "is-goal" }), 900);
    return out;
  }
  function setGoal(n) { const h = loadH(); h.goal = n; saveH(h); track("goal_set", { goal: n }); paintHeader(); }

  const ringSVG = (f, size = 26, sw) => {
    sw = sw || (size > 40 ? 8 : 3.4); const r = (size - sw) / 2, c = 2 * Math.PI * r, k = Math.max(0, Math.min(1, f));
    return `<svg class="br-ring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${sw}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${k >= 1 ? "var(--good)" : "var(--accent)"}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${(c * k).toFixed(2)} ${c.toFixed(2)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      ${size > 40 ? `<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="${size / 4}" font-weight="900" fill="currentColor">${k >= 1 ? "✓" : Math.round(k * 100) + "%"}</text>` : ""}</svg>`;
  };
  const flame = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 2c1 3.5 5 5.5 5 10.5A5 5 0 0 1 7 12.5c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5.5 1-9z" fill="#F08A4B"/><path d="M12 13c1 1.4 2 2.2 2 3.6a2 2 0 0 1-4 0c0-1 .6-1.8 1-2.3.1.8.5 1.2 1 1.2 0-1 0-1.6 0-2.5z" fill="#FBD08A"/></svg>';

  const FLAME_D = "M12 2c1 3.5 5 5.5 5 10.5A5 5 0 0 1 7 12.5c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5.5 1-9z";
  const FLAME_CORE = "M12 13c1 1.4 2 2.2 2 3.6a2 2 0 0 1-4 0c0-1 .6-1.8 1-2.3.1.8.5 1.2 1 1.2 0-1 0-1.6 0-2.5z";
  function paintHeader() {
    const b = document.getElementById("br-day"); if (!b) return;
    const h = loadH(), s = streakNow(h), r = roundsToday(h);
    b.hidden = false;
    /* the flame fills from the bottom like a measuring cylinder as today's rounds add up; it is fully lit once the goal is met */
    const k = Math.max(0, Math.min(1, r / h.goal)), done = r >= h.goal, fy = (2 + 20 * (1 - k)).toFixed(2);
    b.innerHTML = `<span class="br-flame" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><clipPath id="br-flclip"><rect x="0" y="${fy}" width="24" height="24"/></clipPath></defs>
      <path class="shell" d="${FLAME_D}"/><g clip-path="url(#br-flclip)"><path class="fill" d="${FLAME_D}"/><path class="core" d="${FLAME_CORE}"/></g></svg></span>
      <span class="v"><b>${s.n}</b><small>day streak</small></span>`;
    b.classList.toggle("is-done", done); b.classList.toggle("is-cold", !s.alive || s.needToday);
    /* the flame lights up with a short flare once, the moment today's goal is reached */
    if (done && BGX.store.get("flamelit", "") !== today()) { BGX.store.set("flamelit", today()); if (!BGX.RM) { b.classList.remove("is-lighting"); void b.offsetWidth; b.classList.add("is-lighting"); } }
    b.title = `${s.n}-day streak · today ${Math.min(r, h.goal)} of ${h.goal} round${h.goal > 1 ? "s" : ""}${done ? " ✓" : ""}`;
    b.setAttribute("aria-label", `Day streak: ${s.n} day${s.n === 1 ? "" : "s"}. Today ${Math.min(r, h.goal)} of ${h.goal} rounds. Open your study plan`);
    b.onclick = () => { if (BGX.sfx) BGX.sfx.tap(); openHabit(); };
  }

  function weekHTML(h) {
    const t = today(), out = [];
    for (let i = 13; i >= 0; i--) {
      const d = addDays(t, -i), n = h.days[d] | 0, dt = new Date(d + "T12:00:00");
      out.push(`<li class="${n >= h.goal ? "is-goal" : n ? "is-on" : ""}${d === t ? " is-today" : ""}" title="${d}: ${n} round${n === 1 ? "" : "s"}"><i></i><small>${"SMTWTFS"[dt.getDay()]}</small></li>`);
    }
    return `<ol class="br-days" aria-label="Rounds finished in the last 14 days">${out.join("")}</ol>`;
  }
  function openHabit() {
    const h = loadH(), s = streakNow(h), r = roundsToday(h), due = dueList();
    const dueN = due.reduce((n, x) => n + x.n, 0);
    const sh = BGX.sheet({ label: "Your study plan", title: "Your study plan", html: `
      <div class="br-habit">
        <div class="br-habitnow">${ringSVG(r / h.goal, 92)}<div><p class="br-label" style="margin:0">Today</p>
          <h3>${Math.min(r, h.goal)} of ${h.goal} round${h.goal > 1 ? "s" : ""}</h3>
          <p class="br-hint" style="margin:2px 0 0">${r >= h.goal ? "Goal reached. Anything more is a bonus." : `Finish ${h.goal - r} more to reach today's goal (+${GOAL_XP} XP).`}</p></div></div>
        <div class="br-habitstats"><span>${flame}<b>${s.n}</b> day streak</span><span><b>${h.best}</b> best streak</span><span><b>${h.freeze}</b> streak freeze${h.freeze === 1 ? "" : "s"}</span><span><b>${BGX.bestStreak}</b> answers in a row (best)</span></div>
        ${s.lost ? `<p class="br-hint">Your ${s.lost}-day streak ended. Finish a round today to start a new one.</p>` : s.freezeNeeded ? `<p class="br-hint">You missed ${s.freezeNeeded === 1 ? "a day" : s.freezeNeeded + " days"}: a streak freeze will cover it when you finish a round today.</p>` : ""}
        ${weekHTML(h)}
        <p class="br-label">Daily goal</p>
        <div class="br-seg" role="group" aria-label="Daily goal">${GOALS.map(g => `<button type="button" data-goal="${g.n}" aria-pressed="${g.n === h.goal}">${g.name}<small>${g.sub}</small></button>`).join("")}</div>
        <p class="br-hint">A day counts toward your streak when you finish one round or lab run. Every 7 days in a row earns a streak freeze (you can hold ${FREEZE_MAX}), which covers one missed day.</p>
        <p class="br-label">Today's review</p>
        ${dueN ? `<p style="margin:0 0 8px">${dueN} question${dueN === 1 ? "" : "s"} you missed before ${dueN === 1 ? "is" : "are"} due.</p>${dueLinks(due, 6)}` : `<p class="br-hint" style="margin:0">${savedCount() ? `Nothing due today. ${savedCount()} saved mistake${savedCount() === 1 ? " comes" : "s come"} back over the next few days.` : "Questions you get wrong are saved here and come back after 1, 3, 7, 14 and 30 days until you know them."}</p>`}
        <p class="br-hint" style="margin-top:16px">Saved in this browser on this device. <a href="${R}cabinet/index.html#backup">Back up or move your progress</a>.</p>
      </div>` });
    sh.body.querySelectorAll("[data-goal]").forEach(b => b.onclick = () => { setGoal(+b.dataset.goal); BGX.sfx.tap(); sh.close(); openHabit(); });
  }

  /* ================= saved mistakes, spaced review ================= */
  const STEPS = [1, 3, 7, 14, 30], CAP = 600;
  const loadM = () => { const m = BGX.store.get("miss", null); return m && typeof m === "object" && !Array.isArray(m) ? m : {}; };
  const saveM = m => {
    let all = []; Object.keys(m).forEach(gm => Object.keys(m[gm]).forEach(k => all.push([gm, k, m[gm][k][1]])));
    if (all.length > CAP) { all.sort((a, b) => a[2] < b[2] ? 1 : -1); all.slice(CAP).forEach(([gm, k]) => { delete m[gm][k]; if (!Object.keys(m[gm]).length) delete m[gm]; }); }
    BGX.store.set("miss", m);
  };
  /* a wrong answer: back to the first step, due tomorrow */
  function miss(gid, mid, key) {
    if (!key) return; const m = loadM(), gm = gid + "|" + mid;
    (m[gm] = m[gm] || {})[key] = [0, addDays(today(), 1)];
    saveM(m);
  }
  /* a right answer on a saved question that's due: up one step, or retired after the last step */
  function hit(gid, mid, key, force) {
    if (!key) return; const m = loadM(), gm = gid + "|" + mid, e = m[gm] && m[gm][key];
    if (!e || (!force && e[1] > today())) return;
    const box = e[0] + 1;
    if (box >= STEPS.length) { delete m[gm][key]; if (!Object.keys(m[gm]).length) delete m[gm]; }
    else m[gm][key] = [box, addDays(today(), STEPS[box])];
    saveM(m);
  }
  const keysFor = (gid, mid, dueOnly) => { const e = loadM()[gid + "|" + mid] || {}, t = today(); return Object.keys(e).filter(k => !dueOnly || e[k][1] <= t); };
  function dueList() {
    const m = loadM(), t = today(), out = [];
    Object.keys(m).forEach(gm => { const n = Object.keys(m[gm]).filter(k => m[gm][k][1] <= t).length; if (n) { const [gid, mid] = gm.split("|"); out.push({ gid, mid, n }); } });
    return out.sort((a, b) => b.n - a.n);
  }
  const savedCount = () => { const m = loadM(); return Object.keys(m).reduce((n, gm) => n + Object.keys(m[gm]).length, 0); };
  const names = (gid, mid) => {
    const P = (window.BGX_PROGRESS_MAP || {})[gid] || {}, md = (P.modes || []).find(x => x.id === mid);
    return { game: P.title || gid, mode: md ? md.t : mid };
  };
  const reviewURL = (gid, mid) => `${R}games/${gid}/index.html?mode=${encodeURIComponent(mid)}&review=1`;
  const dueLinks = (due, max) => `<ul class="br-duelist">${due.slice(0, max).map(x => { const n = names(x.gid, x.mid);
    return `<li><a href="${reviewURL(x.gid, x.mid)}"><span><b>${esc(n.game)}</b><small>${esc(n.mode)}</small></span><em>${x.n} due</em><span class="go" aria-hidden="true">Review →</span></a></li>`; }).join("")}</ul>
    ${due.length > max ? `<p class="br-hint" style="margin:6px 0 0">and ${due.length - max} more</p>` : ""}`;

  /* the hub's "Today" card: only once someone has played */
  function hubCard() {
    const h = loadH(), played = (BGX.store.get("rounds", 0) | 0) > 0 || h.last;
    if (!played) return "";
    const s = streakNow(h), r = roundsToday(h), due = dueList(), dueN = due.reduce((n, x) => n + x.n, 0), saved = savedCount();
    const bk = BGX.store.get("backupAt", 0), rounds = BGX.store.get("rounds", 0) | 0;
    const nudge = rounds >= 10 && Date.now() - bk > 14 * 864e5;
    return `<section class="br-today" aria-label="Today">
      <button class="br-todaygoal" type="button" id="br-todaygoal">${ringSVG(r / h.goal, 64)}<span><span class="br-label" style="margin:0">Today</span>
        <b>${Math.min(r, h.goal)} of ${h.goal} round${h.goal > 1 ? "s" : ""}</b><small>${flame} ${s.n}-day streak${s.needToday && s.n ? " · play today to keep it" : ""}</small></span></button>
      <div class="br-todayrev"><p class="br-label" style="margin:0">Today's review</p>
        ${dueN ? `<p style="margin:2px 0 8px"><b>${dueN} question${dueN === 1 ? "" : "s"}</b> you missed before ${dueN === 1 ? "is" : "are"} due.</p>${dueLinks(due, 3)}`
          : `<p class="br-hint" style="margin:2px 0 0">${saved ? `All caught up. ${saved} saved mistake${saved === 1 ? "" : "s"} will come back over the next few days.` : "Nothing to review yet. Questions you miss come back here on later days."}</p>`}
        ${nudge ? `<p class="br-hint" style="margin:10px 0 0">Your progress lives only in this browser. <a href="${R}cabinet/index.html#backup">Back it up</a> so you don't lose it.</p>` : ""}</div>
    </section>`;
  }
  function bindHub(root) { const b = (root || document).querySelector("#br-todaygoal"); if (b) b.onclick = () => { BGX.sfx.tap(); openHabit(); }; }

  /* ================= storage warnings, persistence ================= */
  function warn() {
    if (document.getElementById("br-storewarn") || !document.body) return;
    const d = document.createElement("div"); d.id = "br-storewarn"; d.className = "br-storewarn"; d.setAttribute("role", "alert");
    d.innerHTML = `<span><b>Your progress isn't being saved.</b> This browser is blocking storage (private browsing, or storage is full). You can still play, but XP and trophies will be gone when you close the page.</span><button type="button" aria-label="Dismiss">✕</button>`;
    d.querySelector("button").onclick = () => d.remove();
    document.body.appendChild(d); track("storage_blocked", {});
  }
  document.addEventListener("bgx:storefail", () => { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", warn); else warn(); });
  if (BGX.storeBroken) document.addEventListener("DOMContentLoaded", warn);
  function maybePersist() {
    try {
      if (!navigator.storage || !navigator.storage.persist || BGX.store.get("persistAsked", false)) return;
      if ((BGX.store.get("rounds", 0) | 0) < 3) return;
      BGX.store.set("persistAsked", true);
      navigator.storage.persist().then(ok => track("storage_persist", { granted: !!ok })).catch(() => {});
    } catch (e) {}
  }

  /* ================= backup: export / import ================= */
  const SKIP = { visits: 1, persistAsked: 1, backupAt: 1, sound: 1 };
  function snapshot() {
    const d = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (!k || k.indexOf("bgx_") !== 0) continue; const kk = k.slice(4); if (SKIP[kk] || kk[0] === "_") continue; try { d[kk] = JSON.parse(localStorage.getItem(k)); } catch (e) {} }
    return { v: 1, at: new Date().toISOString(), d };
  }
  const b64u = bytes => { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const unb64u = s => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
  const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h.toString(36); };
  const pipe = async (bytes, Stream) => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new Stream("deflate-raw"))).arrayBuffer());
  async function exportCode() {
    const json = JSON.stringify(snapshot()), raw = new TextEncoder().encode(json);
    let tag = "BGX1", body = raw;
    try { if (window.CompressionStream) { body = await pipe(raw, CompressionStream); tag = "BGX1z"; } } catch (e) { body = raw; tag = "BGX1"; }
    const data = b64u(body);
    return `${tag}.${fnv(data)}.${data}`;
  }
  async function decode(code) {
    code = String(code || "").replace(/\s+/g, "");
    const m = /^(BGX1z?)\.([0-9a-z]+)\.([A-Za-z0-9_-]+)$/.exec(code);
    if (!m) throw new Error("That doesn't look like a BioglowRX backup code. It should start with BGX1.");
    if (fnv(m[3]) !== m[2]) throw new Error("This code is incomplete or has been changed. Copy the whole code again.");
    let bytes = unb64u(m[3]);
    if (m[1] === "BGX1z") { if (!window.DecompressionStream) throw new Error("This browser is too old to read the code. Try the backup file in an up-to-date browser."); bytes = await pipe(bytes, DecompressionStream); }
    const o = JSON.parse(new TextDecoder().decode(bytes));
    if (!o || o.v !== 1 || typeof o.d !== "object") throw new Error("This backup is from a version this page can't read.");
    return o;
  }
  /* merging keeps the best of both devices: highest scores and XP, every award, the longer streak */
  function merge(a, b, key) {
    if (a == null) return b; if (b == null) return a;
    if (key === "name") return String(a).trim() ? a : b;
    if (key === "last") return (b.at || 0) > (a.at || 0) ? b : a;
    if (key === "habit") { const x = (b.last || "") > (a.last || "") ? b : a, y = x === a ? b : a; const days = Object.assign({}, y.days || {}); Object.keys(x.days || {}).forEach(d => days[d] = Math.max(days[d] | 0, x.days[d] | 0));
      return Object.assign({}, x, { best: Math.max(a.best | 0, b.best | 0), freeze: Math.max(a.freeze | 0, b.freeze | 0), days }); }
    if (key === "miss") { const o = JSON.parse(JSON.stringify(a)); Object.keys(b).forEach(gm => { o[gm] = o[gm] || {}; Object.keys(b[gm]).forEach(k => { const x = o[gm][k], y = b[gm][k]; o[gm][k] = !x ? y : (y[0] < x[0] || (y[0] === x[0] && y[1] < x[1])) ? y : x; }); }); return o; }
    if (typeof a === "number" && typeof b === "number") return Math.max(a, b);
    if (typeof a === "boolean" || typeof b === "boolean") return !!(a || b);
    if (Array.isArray(a) && Array.isArray(b)) { const seen = new Set(a.map(x => JSON.stringify(x))); return a.concat(b.filter(x => !seen.has(JSON.stringify(x)))); }
    if (typeof a === "object" && typeof b === "object") { const o = Object.assign({}, a); Object.keys(b).forEach(k => o[k] = merge(a[k], b[k])); return o; }
    return a;
  }
  function restore(o) {
    let n = 0;
    Object.keys(o.d).forEach(k => { if (SKIP[k] || !/^[\w.|:-]+$/.test(k)) return; const cur = BGX.store.get(k, null); BGX.store.set(k, merge(cur, o.d[k], k)); n++; });
    track("backup_restore", { keys: n });
    return n;
  }
  const download = (text, name) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); };

  /* the cabinet's "Back up or move your progress" panel */
  function backupPanel() {
    const bk = BGX.store.get("backupAt", 0);
    return `<section class="br-backup" id="backup" aria-labelledby="br-bkh">
      <div><p class="br-label" style="margin:0">Keep your progress safe</p><h2 id="br-bkh">Back up or move your progress</h2>
        <p>Your XP, streak, saved mistakes and trophies live only in this browser. Clearing your browsing data deletes them, and iPhones can clear them after a week without a visit (adding BioglowRX to your home screen prevents that). A backup lets you get everything back, or carry it to another phone or laptop. Restoring merges with what's already here and keeps the best of both.</p>
        <p class="br-hint" style="margin:0">${bk ? "Last backup: " + new Date(bk).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "No backup yet."}</p></div>
      <div class="br-bkacts">
        <div class="br-btns"><button class="br-next" type="button" id="br-bkcopy">Copy backup code</button><button class="br-ghost" type="button" id="br-bkfile">Save backup file</button></div>
        <details class="br-bkin"><summary>Restore from a backup</summary>
          <label class="br-label" for="br-bkcode">Paste your backup code</label><textarea id="br-bkcode" rows="3" spellcheck="false" autocomplete="off" placeholder="BGX1z.…"></textarea>
          <div class="br-btns"><button class="br-next" type="button" id="br-bkgo">Restore</button><label class="br-ghost br-filebtn">Open a backup file<input type="file" id="br-bkup" accept=".txt,text/plain" hidden></label></div></details>
        <p class="br-bkmsg" id="br-bkmsg" aria-live="polite"></p></div></section>`;
  }
  function bindBackup(root) {
    const $ = s => root.querySelector(s), msg = (t, bad) => { const e = $("#br-bkmsg"); e.textContent = t; e.classList.toggle("is-bad", !!bad); };
    const done = () => { BGX.store.set("backupAt", Date.now()); track("backup_export", {}); };
    $("#br-bkcopy").onclick = async () => {
      BGX.sfx.tap();
      try { const c = await exportCode(); try { await navigator.clipboard.writeText(c); msg("Backup code copied. Paste it somewhere safe (a note or an email to yourself), or into this page on your other device."); }
        catch (e) { $("#br-bkcode").value = c; $(".br-bkin").open = true; $("#br-bkcode").select(); msg("Copy the code in the box below and keep it somewhere safe."); }
        done(); } catch (e) { msg("Couldn't make a backup in this browser.", true); }
    };
    $("#br-bkfile").onclick = async () => { BGX.sfx.tap(); try { download(await exportCode(), `BioglowRX-backup-${today()}.txt`); done(); msg("Backup file saved. Open it on another device from this page to restore."); } catch (e) { msg("Couldn't save a backup file in this browser.", true); } };
    const go = async code => {
      try { const o = await decode(code); restore(o); msg("Progress restored. Reloading…"); setTimeout(() => location.reload(), 900); }
      catch (e) { msg(e.message || "That code didn't work.", true); }
    };
    $("#br-bkgo").onclick = () => { BGX.sfx.tap(); go($("#br-bkcode").value); };
    $("#br-bkup").onchange = ev => { const f = ev.target.files && ev.target.files[0]; if (!f) return; f.text().then(go); };
  }

  /* "Back up your progress" links: when already on the cabinet page, a hash-only link would leave the
     study-plan sheet open on top and not move the page. Close any open sheet and scroll to the backup panel instead. */
  const toBackup = () => {
    const b = document.getElementById("backup"); if (!b) return false;
    const go = () => { b.scrollIntoView({ block: "start", behavior: BGX.RM ? "auto" : "smooth" }); const s = b.querySelector("#br-bkcopy"); if (s) s.focus({ preventScroll: true }); };
    const open = document.querySelectorAll(".br-sheetwrap [data-x]");
    if (open.length) { open.forEach(x => x.click()); setTimeout(go, BGX.RM ? 20 : 220); } else go();
    return true;
  };
  document.addEventListener("click", ev => {
    const a = ev.target.closest && ev.target.closest('a[href*="#backup"]'); if (!a) return;
    const u = new URL(a.href, location.href);
    if (u.pathname.replace(/index\.html$/, "") === location.pathname.replace(/index\.html$/, "") && toBackup()) { ev.preventDefault(); history.replaceState(null, "", "#backup"); }
  });

  BGX.study = { today, roundDone, setGoal, streakNow, paintHeader, openHabit, hubCard, bindHub, miss, hit, keysFor, dueList, savedCount, reviewURL, names,
    backupPanel, bindBackup, exportCode, decode, merge, restore, loadH, loadM, GOALS };
})();
