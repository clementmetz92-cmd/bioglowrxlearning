/* BioglowRX — Pre-Exam Simulator pages (needs engine/exam-core.js, the subject's game data and data/exams/<subject>.js).
   <body data-page="exam" data-subject="chemistry">  a subject's exams: format list → start screen → exam → review → results
   <body data-page="exams">                          the list of subjects and formats
   Calm LMS-style mock exams: one question per page, timer to a fixed end time, autosave, no feedback until submit.
   Mock exams never count toward certificates or chapter progress. Test hook: BGX.examTest. */
(function () {
  "use strict";
  const BGX = window.BGX, X = BGX.exam, esc = BGX.esc, R = BGX.root, CFG = window.BGX_CONFIG || {}, CAT = window.BGX_CATALOG || { subjects: [] };
  const view = document.getElementById("br-view"), PAGE = document.body.dataset.page, SUBJ = document.body.dataset.subject;
  const N = X.num, html = document.documentElement;
  const pad = n => String(n).padStart(2, "0");
  const subjOf = id => CAT.subjects.find(s => s.id === id) || { id, name: id, color: "cat-mint" };
  const gameTitle = id => { for (const s of CAT.subjects) for (const c of s.chapters) if (c.url && c.url.indexOf("games/" + id + "/") === 0) return c.game; return (X.games[id] || {}).title || id; };
  const K = (s, f) => "exam_" + s + "_" + f, HK = (s, f) => "examhist_" + s + "_" + f, LK = (s, f) => "examlast_" + s + "_" + f;
  const clock = ms => { const t = Math.max(0, Math.ceil(ms / 1000)), h = t / 3600 | 0, m = (t % 3600) / 60 | 0, s = t % 60; return (h ? h + ":" + pad(m) : m) + ":" + pad(s); };
  const hm = d => { const x = new Date(d); return pad(x.getHours()) + ":" + pad(x.getMinutes()); };
  const day = d => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const mins = ms => Math.round(ms / 6e4);
  const plural = (n, w, ws) => n + " " + (n === 1 ? w : ws || w + "s");
  const SVG = {
    flag: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
    calc: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h7"/></svg>',
    grid: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>'
  };
  const track = (e, p) => { if (BGX.track) BGX.track(e, p); };
  const store = { get: (k, d) => BGX.store.get(k, d), set: (k, v) => BGX.store.set(k, v), del: k => { try { localStorage.removeItem("bgx_" + k); } catch (e) {} } };
  let live = null;   // the live region for timer warnings

  const baseMinutes = f => f.minutes || Math.ceil((f.n * (f.secondsEach || 90)) / 60);
  BGX.shell();
  if (PAGE === "exams") return listPage();
  const P = X.pool(SUBJ);
  if (!P) { view.innerHTML = `<p class="br-empty">No exam bank for this subject yet. <a href="${R}exams/index.html">All exams</a></p>`; return; }
  const B = P.bank, S0 = subjOf(SUBJ);
  document.title = "Pre-exam simulator · " + (B.title || S0.name) + " · BioglowRX Sciences Learning";
  const fmtOf = id => B.formats.find(f => f.id === id);
  const topicOf = id => P.topics[id] || { label: id };
  const practiseURL = t => R + "games/" + t.game + "/index.html" + (t.mode ? "?mode=" + encodeURIComponent(t.mode) + "&ref=exam" : "?ref=exam");
  const sheetsOf = f => [].concat(f.sheet || []);
  const toolLine = f => [f.calculator ? (f.calculator === "scientific" ? "Scientific calculator" : "Calculator") : "", ...sheetsOf(f).map(s => sheetDef(s).title)].filter(Boolean);

  let A = null, Q = [], timer = 0, screen = "", popover = null;

  /* ================= saving ================= */
  const saveA = () => { if (!A) return; A.savedAt = Date.now(); const ok = store.set(K(A.subject, A.format), A); const el = document.getElementById("ex-saved"); if (el) el.textContent = ok ? "Saved " + hm(A.savedAt) : "Not saved: storage blocked"; };
  const loadA = f => { const a = store.get(K(SUBJ, f), null); return a && a.v === 1 && Array.isArray(a.slots) ? a : null; };
  const liveA = () => B.formats.map(f => loadA(f.id)).filter(a => a && a.status === "live");
  const questionsFor = a => { const qs = a.slots.map(s => X.question(P, s)); return qs.every(Boolean) ? qs : null; };

  /* ================= format list ================= */
  function home() {
    stopTimer(); screen = "home"; html.classList.remove("bgx-exam-on");
    setURL(null);
    const cards = B.formats.map(f => {
      const a = loadA(f.id), hist = store.get(HK(SUBJ, f.id), []), best = hist.length ? Math.max(...hist.map(h => h.pct)) : null;
      const ch = X.choices(P, f), plan = ch.length ? null : X.plan(P, f, null), n = plan ? plan.got : f.n;
      const inProg = a && a.status === "live";
      return `<button class="ex-fmt" data-f="${esc(f.id)}" type="button">
        <span class="t"><b>${esc(f.label)}</b><span>${esc(f.desc || "")}</span>
          <small>${plural(n, "question")} · ${f.secondsEach ? f.secondsEach + " s a station" : Math.ceil(baseMinutes(f) * n / f.n) + " min"} · pass ${f.pass}%${ch.length ? ` · choose a ${f.choose === "group" ? "unit" : f.choose === "unit" ? "chapter" : "topic"}` : ""}</small>
          ${plan && plan.short ? `<small class="ex-short">Practice bank: ${plural(plan.got, "question")} (a full paper has ${f.n})</small>` : ""}
          ${toolLine(f).length ? `<small>Allowed: ${esc(toolLine(f).join(" · "))}</small>` : ""}</span>
        <span class="r">${inProg ? `<em class="ex-chip is-live">In progress · ${clock(a.endsAt - Date.now())} left</em>` : best != null ? `<em class="ex-chip">Best ${best}% · ${plural(hist.length, "attempt")}</em>` : `<em class="ex-chip is-new">Not tried yet</em>`}<i aria-hidden="true">→</i></span></button>`;
    }).join("");
    view.innerHTML = `<nav class="br-backrow" aria-label="Back"><a class="br-crumb" href="${R}subjects/${SUBJ}/index.html"><span aria-hidden="true">←</span> ${esc(S0.name)}</a><a class="br-crumb" href="${R}exams/index.html">All exams</a></nav>
      <section class="ex-hero"><p class="br-label" style="margin:0">Pre-exam simulator</p><h1>${esc(B.title || S0.name)} mock exams</h1>
        <p>Timed papers that work like the quiz in your course's learning system: one question per page, a countdown, flag for review, and no answers until you submit.</p>
        <p class="ex-note">Practice only. Mock exams never count toward your certificates or chapter progress, and every paper is drawn fresh from the question bank.</p></section>
      <div class="ex-fmts">${cards}</div>
      <p class="br-hint">Practice bank: ${plural(P.entries.reduce((n, e) => n + e.slots, 0), "question")} across ${plural((B.topics || []).length, "topic")}, from ${esc(S0.name)} games and exam-style questions. Answers save in this browser as you go.</p>`;
    view.querySelectorAll("[data-f]").forEach(b => b.onclick = () => startScreen(fmtOf(b.dataset.f)));
  }

  /* ================= start screen (and resume) ================= */
  function startScreen(f, pre = {}) {
    stopTimer(); screen = "start"; html.classList.remove("bgx-exam-on"); setURL(f.id);
    const a = loadA(f.id);
    if (a && a.status === "live" && !pre.fresh) return resumeScreen(f, a);
    const ch = X.choices(P, f), forced = f.navigation === "forward";
    const st = { choice: pre.choice || (ch[0] && ch[0].id) || null, extra: 1, nav: forced ? "forward" : "free", ok: false, only: pre.only || null };
    const hist = store.get(HK(SUBJ, f.id), []);
    const draw = () => {
      const plan = st.only ? X.plan(P, f, null, { only: st.only }) : X.plan(P, f, st.choice, { avoid: new Set(store.get(LK(SUBJ, f.id), [])) }), n = st.only ? plan.target : plan.got;
      const limit = limitMs(f, n, st.extra);
      view.innerHTML = `<nav class="br-backrow" aria-label="Back"><button class="br-crumb" type="button" id="ex-back"><span aria-hidden="true">←</span> All ${esc(B.title || S0.name)} exams</button></nav>
        <section class="ex-start">
          <p class="br-label" style="margin:0">${esc(B.title || S0.name)} · Pre-exam simulator</p>
          <h1>${esc(f.label)}${st.only ? ": only what I missed" : ""}</h1>
          <dl class="ex-facts"><div><dt>Questions</dt><dd>${n}</dd></div><div><dt>Time limit</dt><dd>${clock(limit)}${st.extra > 1 ? ` <small>(${st.extra}×)</small>` : ""}</dd></div>
            <div><dt>Pass mark</dt><dd>${f.pass}%</dd></div><div><dt>Attempts so far</dt><dd>${hist.length}</dd></div></dl>
          ${plan.short && !st.only ? `<p class="ex-short is-box"><b>Practice bank: ${plural(n, "question")}.</b> A full ${esc(f.label.toLowerCase())} has ${f.n}; this paper uses every question we have for it so far, and the time is scaled to match. More questions are being written.</p>` : ""}
          ${n === 0 ? `<p class="ex-short is-box">There are no questions for this choice yet.</p>` : ""}
          ${ch.length && !st.only ? `<fieldset class="ex-set"><legend>${f.choose === "group" ? "Unit" : f.choose === "unit" ? "Chapter" : "Topic"}</legend>
            <select id="ex-choice">${ch.map(c => `<option value="${esc(c.id)}"${c.id === st.choice ? " selected" : ""}>${esc(c.label)}</option>`).join("")}</select></fieldset>` : ""}
          <fieldset class="ex-set"><legend>Accommodation: extra time</legend><div class="br-seg ex-seg" role="group" aria-label="Extra time">
            ${[1, 1.25, 1.5, 2].map(x => `<button type="button" data-x="${x}" aria-pressed="${st.extra === x}">${x === 1 ? "Off" : x + "×"}</button>`).join("")}</div></fieldset>
          <fieldset class="ex-set"><legend>Navigation</legend>${forced ? `<p class="br-hint" style="margin:0">One-way: you can't go back to a question, as in a lab practical.</p>` : `<div class="br-seg ex-seg" role="group" aria-label="Navigation">
            <button type="button" data-nav="free" aria-pressed="${st.nav === "free"}">Free (go back, flag)</button><button type="button" data-nav="forward" aria-pressed="${st.nav === "forward"}">One-way</button></div>`}</fieldset>
          <div class="ex-rules"><p class="br-label">Rules</p><ul>
            <li>The timer starts when you press Start and never pauses, even if you close the tab.</li>
            <li>No feedback until you submit. Answers save in this browser after every change.</li>
            <li>${st.nav === "forward" ? "One-way: once you move on you can't go back, and flags are off." : "Go back to any question and flag ones to review before you submit."}</li>
            <li>At 0:00 the paper is submitted automatically; unanswered questions score zero.</li>
            <li>Select all that apply and ordering questions score only when fully right. Matching scores ${(B.items || []).some(i => i.kind === "match" && i.allOrNothing) ? "1 point per pair unless the question says all-or-nothing" : "1 point per pair"}.</li>
            <li>${toolLine(f).length ? "Allowed: " + esc(toolLine(f).join(", ")) + "." : "No calculator or formula sheet for this paper."}${B.rules ? " " + esc(B.rules) : ""}</li>
            <li>Keyboard: 1–5 choose an option, F flags, N and P move to the next and previous question.</li></ul></div>
          <label class="ex-attest"><input type="checkbox" id="ex-attest"${st.ok ? " checked" : ""}> <span>I will work alone, without notes or other tabs, as in my real exam.</span></label>
          <div class="br-btns"><button class="br-next" id="ex-go" type="button"${st.ok && n ? "" : " disabled"}>Start the exam</button></div>
          <p class="br-hint">Practice only: this mock exam never counts toward certificates or chapter progress.</p>
        </section>`;
      view.querySelector("#ex-back").onclick = home;
      const cs = view.querySelector("#ex-choice"); if (cs) cs.onchange = () => { st.choice = cs.value; draw(); view.querySelector("#ex-choice").focus(); };
      view.querySelectorAll("[data-x]").forEach(b => b.onclick = () => { st.extra = +b.dataset.x; draw(); view.querySelector(`[data-x="${st.extra}"]`).focus(); });
      view.querySelectorAll("[data-nav]").forEach(b => b.onclick = () => { st.nav = b.dataset.nav; draw(); view.querySelector(`[data-nav="${st.nav}"]`).focus(); });
      const at = view.querySelector("#ex-attest"); at.onchange = () => { st.ok = at.checked; view.querySelector("#ex-go").disabled = !(st.ok && n); };
      view.querySelector("#ex-go").onclick = () => begin(f, st, plan);
    };
    draw();
    const h = view.querySelector("h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }
  const limitMs = (f, n, extra) => Math.round((f.secondsEach ? n * f.secondsEach / 60 : baseMinutes(f) * n / f.n) * 6e4 * extra);
  function resumeScreen(f, a) {
    screen = "resume";
    if (a.endsAt <= Date.now()) { A = a; Q = questionsFor(a) || []; return submit(true, "The time ran out while you were away, so your saved answers were submitted."); }
    const answered = Object.keys(a.answers).length;
    view.innerHTML = `<section class="ex-start"><p class="br-label" style="margin:0">${esc(B.title || S0.name)} · ${esc(f.label)}</p>
      <h1 tabindex="-1">Resume exam in progress?</h1>
      <p class="ex-big"><b id="ex-rleft">${clock(a.endsAt - Date.now())}</b> left · ${answered} of ${a.slots.length} answered</p>
      <p class="br-hint">The timer kept running while you were away, as in a real exam.</p>
      <div class="br-btns"><button class="br-next" id="ex-resume" type="button">Resume</button><button class="br-ghost" id="ex-discard" type="button">Discard and start again</button><button class="br-ghost" id="ex-home" type="button">Back</button></div></section>`;
    view.querySelector("h1").focus({ preventScroll: true });
    A = a; Q = questionsFor(a);
    if (!Q) { store.del(K(SUBJ, f.id)); A = null; BGX.toast("This paper's questions have changed, so it can't be resumed."); return startScreen(f, { fresh: true }); }
    startTimer(() => { const e = document.getElementById("ex-rleft"); if (e) e.textContent = clock(A.endsAt - Date.now()); });
    view.querySelector("#ex-resume").onclick = () => exam(A.cur);
    view.querySelector("#ex-discard").onclick = () => { if (!confirmBox("Discard this attempt?", "Your answers on this paper will be lost.", "Discard", () => { store.del(K(SUBJ, f.id)); A = null; startScreen(f, { fresh: true }); })) return; };
    view.querySelector("#ex-home").onclick = home;
  }

  function begin(f, st, plan) {
    const slots = X.makePaper(P, plan);
    const n = slots.length, limit = limitMs(f, st.only ? n : plan.got, st.extra), now = Date.now();
    const hist = store.get(HK(SUBJ, f.id), []);
    A = { v: 1, id: now.toString(36), subject: SUBJ, format: f.id, choice: st.only ? null : st.choice, only: !!st.only, slots, answers: {}, flags: [], cur: 0, seen: [0],
      startedAt: now, endsAt: now + limit, limitMs: limit, extra: st.extra, nav: st.nav, status: "live", attempt: hist.length + 1, warned: [], tq: [],
      stEnds: f.secondsEach ? now + f.secondsEach * 1000 * st.extra : null, target: f.n };
    Q = questionsFor(A);
    store.set(LK(SUBJ, f.id), plan.entries.map(e => e.id));
    saveA();
    track("exam_start", { subject: SUBJ, format: f.id, n, minutes: mins(limit), extra: st.extra, nav: st.nav, only_missed: !!st.only });
    exam(0);
  }

  /* ================= the exam ================= */
  const F = () => fmtOf(A.format);
  const oneWay = () => A.nav === "forward";
  const isFlag = i => A.flags.indexOf(i) >= 0;
  const answered = i => X.isAnswered(Q[i], A.answers[i]);
  const counts = () => { let a = 0, fl = 0; Q.forEach((q, i) => { if (answered(i)) a++; if (isFlag(i)) fl++; }); return { a, fl, u: Q.length - a }; };
  let shownAt = 0;
  const leaveQ = () => { if (shownAt && A) { A.tq[A.cur] = (A.tq[A.cur] || 0) + (Date.now() - shownAt); } shownAt = 0; };

  function exam(i) {
    if (!A || A.status !== "live") return;
    leaveQ();
    screen = "exam"; html.classList.add("bgx-exam-on"); setURL(A.format);
    A.cur = Math.max(0, Math.min(Q.length - 1, i)); if (A.seen.indexOf(A.cur) < 0) A.seen.push(A.cur);
    if (oneWay() && A.stEnds && A.cur !== A.stCur) { A.stCur = A.cur; A.stEnds = Date.now() + F().secondsEach * 1000 * A.extra; }
    saveA(); shownAt = Date.now();
    const q = Q[A.cur], f = F(), c = counts();
    view.innerHTML = `<div class="ex-shell">
      ${topBar(f)}
      <div class="ex-tools" role="toolbar" aria-label="Exam tools">
        <button class="ex-tool ex-navbtn" type="button" id="ex-navopen">${SVG.grid}<span>Questions <b>${c.a}/${Q.length}</b></span></button>
        ${f.calculator ? `<button class="ex-tool" type="button" id="ex-calc" aria-haspopup="dialog">${SVG.calc}<span>Calculator</span></button>` : ""}
        ${sheetsOf(f).length ? `<button class="ex-tool" type="button" id="ex-sheet" aria-haspopup="dialog">${SVG.sheet}<span>${sheetsOf(f).length === 1 ? esc(sheetDef(sheetsOf(f)[0]).short || sheetDef(sheetsOf(f)[0]).title) : "Reference sheet"}</span></button>` : ""}
        <button class="ex-tool is-finish" type="button" id="ex-finish">${A.cur === Q.length - 1 || !oneWay() ? "Finish…" : "Finish"}</button>
      </div>
      <div class="ex-body">
        <section class="ex-main" aria-labelledby="ex-qh">${questionHTML(q, A.cur)}
          <div class="ex-qfoot">
            ${oneWay() ? "" : `<button class="ex-flag" type="button" id="ex-flag" aria-pressed="${isFlag(A.cur)}">${SVG.flag}<span>${isFlag(A.cur) ? "Flagged for review" : "Flag for review"}</span></button>`}
            ${clearable(q) ? `<button class="ex-clear" type="button" id="ex-clear"${answered(A.cur) ? "" : " disabled"}>Clear my answer</button>` : ""}
          </div>
          <div class="ex-move">
            ${oneWay() ? "<span></span>" : `<button class="br-ghost" type="button" id="ex-prev"${A.cur === 0 ? " disabled" : ""}><span aria-hidden="true">←</span> Previous</button>`}
            ${A.cur < Q.length - 1 ? `<button class="br-next" type="button" id="ex-next">Next <span aria-hidden="true">→</span></button>` : `<button class="br-next" type="button" id="ex-next">Review and finish</button>`}
          </div>
        </section>
        <aside class="ex-side" aria-label="Question navigator">${navHTML()}</aside>
      </div></div>`;
    bindQuestion(q, A.cur);
    const $ = s => view.querySelector(s);
    $("#ex-next").onclick = next;
    const pv = $("#ex-prev"); if (pv) pv.onclick = () => exam(A.cur - 1);
    const fl = $("#ex-flag"); if (fl) fl.onclick = toggleFlag;
    const cl = $("#ex-clear"); if (cl) cl.onclick = () => { delete A.answers[A.cur]; saveA(); exam(A.cur); };
    $("#ex-navopen").onclick = openNavSheet;
    $("#ex-finish").onclick = () => { if (oneWay() && A.cur < Q.length - 1) confirmBox("Finish now?", `In one-way mode you can't come back. ${Q.length - A.cur - 1} question${Q.length - A.cur - 1 === 1 ? "" : "s"} after this one will be left unanswered.`, "Go to submit", () => reviewScreen()); else reviewScreen(); };
    const ca = $("#ex-calc"); if (ca) ca.onclick = () => openCalc(ca);
    const sh = $("#ex-sheet"); if (sh) sh.onclick = () => openSheet(sh);
    bindNav(view.querySelector(".ex-side"));
    paintTime();
    const h = $("#ex-qh"); if (h) h.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
    startTimer();
  }
  function topBar(f) {
    return `<div class="ex-top"><div class="ttl"><b>${esc(f.label)}</b><span>${esc(B.title || S0.name)}${A.only ? " · missed only" : ""}</span></div>
      <span class="ex-qn">${screen === "review" ? "Review" : `Question ${A.cur + 1} of ${Q.length}`}</span>
      <div class="ex-timer" id="ex-timer"><span class="lb">Time left</span><b id="ex-time" role="timer" aria-live="off">${clock(A.endsAt - Date.now())}</b><button type="button" id="ex-hidet" class="ex-hidet" aria-pressed="${!!A.hideTimer}">${A.hideTimer ? "Show" : "Hide"}</button></div>
      <span class="ex-saved" id="ex-saved">${A.savedAt ? "Saved " + hm(A.savedAt) : ""}</span>
      <div class="ex-live" id="ex-live" aria-live="assertive" aria-atomic="true"></div></div>`;
  }
  const clearable = q => ["single", "first", "diagram", "sata", "numeric", "match", "order"].indexOf(q.kind) >= 0;
  function navHTML() {
    const c = counts();
    return `<p class="ex-counts"><b>${c.a}</b> answered · <b>${c.fl}</b> flagged · <b>${c.u}</b> unanswered</p>
      <div class="ex-grid" role="list">${Q.map((q, i) => { const st = [answered(i) ? "is-ans" : "", isFlag(i) ? "is-flag" : "", i === A.cur && screen === "exam" ? "is-cur" : ""].join(" ");
        const lab = `Question ${i + 1}: ${answered(i) ? "answered" : "unanswered"}${isFlag(i) ? ", flagged" : ""}${i === A.cur && screen === "exam" ? ", current" : ""}`;
        return `<span role="listitem"><button type="button" class="ex-cell ${st}" data-go="${i}" aria-label="${lab}"${oneWay() ? " disabled" : ""}${i === A.cur && screen === "exam" ? ' aria-current="step"' : ""}>${i + 1}${isFlag(i) ? '<i aria-hidden="true">⚑</i>' : ""}</button></span>`; }).join("")}</div>
      <p class="ex-legend" aria-hidden="true"><span><i class="ex-cell is-ans"></i>Answered</span><span><i class="ex-cell"></i>Unanswered</span><span><i class="ex-cell is-flag">⚑</i>Flagged</span><span><i class="ex-cell is-cur"></i>Current</span></p>
      ${oneWay() ? `<p class="br-hint" style="margin:0">One-way mode: the navigator shows progress only.</p>` : ""}`;
  }
  function bindNav(box) { if (!box) return; box.querySelectorAll("[data-go]").forEach(b => b.onclick = () => { if (popover && popover.nav) popover.close(); exam(+b.dataset.go); }); }
  function openNavSheet() {
    const sh = BGX.sheet({ label: "Questions", title: "Questions", html: `<div class="ex-side is-sheet">${navHTML()}</div>` });
    bindNav(sh.body); popover = { nav: true, close: sh.close };
    sh.body.querySelectorAll("[data-go]").forEach(b => { const go = b.onclick; b.onclick = () => { sh.close(); go(); }; });
  }
  function toggleFlag() { if (oneWay()) return; const i = A.cur, k = A.flags.indexOf(i); if (k >= 0) A.flags.splice(k, 1); else A.flags.push(i); saveA(); refreshChrome(); }
  /* after an answer or flag change: repaint the navigator and buttons without redrawing the question */
  function refreshChrome() {
    const side = view.querySelector(".ex-side"); if (side) { side.innerHTML = navHTML(); bindNav(side); }
    const nb = view.querySelector("#ex-navopen b"); if (nb) nb.textContent = counts().a + "/" + Q.length;
    const fl = view.querySelector("#ex-flag"); if (fl) { fl.setAttribute("aria-pressed", isFlag(A.cur)); fl.querySelector("span").textContent = isFlag(A.cur) ? "Flagged for review" : "Flag for review"; }
    const cl = view.querySelector("#ex-clear"); if (cl) cl.disabled = !answered(A.cur);
  }
  function setAns(v) { if (!A || A.status !== "live") return; if (v == null) delete A.answers[A.cur]; else A.answers[A.cur] = v; saveA(); refreshChrome(); }
  function next() {
    if (A.cur >= Q.length - 1) return reviewScreen();
    if (oneWay() && !A.noAsk) return confirmBox("Move on?", "You cannot return to this question.", "Next question", () => exam(A.cur + 1), { askAgain: true });
    exam(A.cur + 1);
  }

  /* ---------- questions ---------- */
  function caseHTML(q) {
    const c = q.caseOf; if (!c) return "";
    return `<div class="ex-case"><p class="br-label" style="margin:0">Case${c.title ? ": " + esc(c.title) : ""} · part ${c.part + 1} of ${c.n}</p>
      ${c.who ? `<p class="who">${esc(c.who)}</p>` : ""}${c.stem ? `<p>${esc(c.stem)}</p>` : ""}
      ${c.data && c.data.length ? `<dl class="ex-data">${c.data.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}</div>`;
  }
  const KIND_HINT = { single: "Choose one answer.", first: "Choose the one action to take first.", diagram: "Choose one answer.", sata: "Select all that apply.", numeric: "Type a number.", match: "Choose a match for each item.", order: "Put the items in order: use the arrow buttons." };
  function questionHTML(q, i, ro) {
    const a = A.answers[i];
    let body = "";
    if (["single", "first", "diagram", "sata"].indexOf(q.kind) >= 0) {
      const multi = q.kind === "sata", picked = multi ? new Set(a || []) : new Set(a != null ? [a] : []);
      body = `<fieldset class="ex-opts"><legend class="sr">${KIND_HINT[q.kind]}</legend>${q.order.map((k, j) => `<label class="ex-opt${picked.has(k) ? " is-on" : ""}"><input type="${multi ? "checkbox" : "radio"}" name="ex-o" value="${k}"${picked.has(k) ? " checked" : ""}${ro ? " disabled" : ""}><span class="key" aria-hidden="true">${"ABCDEFGH"[j]}</span><span class="t">${esc(q.options[k])}</span></label>`).join("")}</fieldset>`;
    } else if (q.kind === "numeric") {
      body = `<div class="ex-numin"><label for="ex-num">Your answer${q.dp ? ` (to ${q.dp} decimal place${q.dp > 1 ? "s" : ""})` : " (whole number)"}</label>
        <div class="row"><input id="ex-num" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" value="${esc(a == null ? "" : a)}"${ro ? " disabled" : ""}>${q.unit ? `<span class="unit">${esc(q.unit)}</span>` : ""}</div>
        <p class="br-hint" style="margin:6px 0 0">Commas are fine as decimal points; 2.19e-3 works for scientific notation.${q.signed ? " Type a minus sign if the answer is negative." : ""}</p></div>`;
    } else if (q.kind === "match") {
      const cur = Array.isArray(a) ? a : [];
      body = `<div class="ex-match">${q.left.map((l, r) => `<div class="row"><label for="ex-m${r}">${esc(l)}</label><select id="ex-m${r}" data-r="${r}"${ro ? " disabled" : ""}><option value="">Choose…</option>${q.rightOrder.map(k => `<option value="${k}"${cur[r] !== "" && cur[r] != null && +cur[r] === k ? " selected" : ""}>${esc(q.right[k])}</option>`).join("")}</select></div>`).join("")}</div>`;
    } else if (q.kind === "order") {
      const cur = Array.isArray(a) ? a : q.start;
      body = `<ol class="ex-order" id="ex-order">${cur.map((k, p) => `<li><span class="n">${p + 1}</span><span class="t">${esc(q.steps[k])}</span>
        <span class="mv"><button type="button" data-up="${p}" aria-label="Move up: ${esc(q.steps[k])}"${p === 0 || ro ? " disabled" : ""}>↑</button><button type="button" data-dn="${p}" aria-label="Move down: ${esc(q.steps[k])}"${p === cur.length - 1 || ro ? " disabled" : ""}>↓</button></span></li>`).join("")}</ol>
        ${ro ? "" : `<button class="br-ghost ex-keep" type="button" id="ex-keep"${Array.isArray(a) ? " disabled" : ""}>${Array.isArray(a) ? "Order saved" : "This order is my answer"}</button>`}`;
    }
    const dg = q.kind === "diagram" ? `<div class="ex-dg">${X.quietSVG(q.diagram, q.dgItem)}</div>` : "";
    return `<p class="ex-kind">${esc(X.KIND_LABEL[q.kind === "first" ? "first" : q.kind] || "")}${q.caseOf ? " · case" : ""}</p>
      ${caseHTML(q)}${q.lead ? `<p class="ex-lead">${esc(q.lead)}</p>` : ""}
      <h2 class="ex-q" id="ex-qh" tabindex="-1"><span class="sr">Question ${i + 1}. </span>${esc(q.stem)}</h2>
      ${q.big ? `<p class="ex-bigq">${esc(q.big)}</p>` : ""}${dg}
      <p class="ex-howto">${KIND_HINT[q.kind] || ""}</p>${body}`;
  }
  function bindQuestion(q, i) {
    const box = view.querySelector(".ex-main");
    if (["single", "first", "diagram", "sata"].indexOf(q.kind) >= 0) {
      box.querySelectorAll('input[name="ex-o"]').forEach(inp => inp.onchange = () => {
        if (q.kind === "sata") { const v = [...box.querySelectorAll('input[name="ex-o"]:checked')].map(x => +x.value).sort((x, y) => x - y); setAns(v.length ? v : null); }
        else setAns(+inp.value);
        box.querySelectorAll(".ex-opt").forEach(l => l.classList.toggle("is-on", l.querySelector("input").checked));
      });
    } else if (q.kind === "numeric") {
      const inp = box.querySelector("#ex-num");
      inp.oninput = () => setAns(inp.value.trim() === "" ? null : inp.value.trim());
      inp.onkeydown = ev => { if (ev.key === "Enter") { ev.preventDefault(); next(); } };
    } else if (q.kind === "match") {
      box.querySelectorAll("select[data-r]").forEach(sel => sel.onchange = () => {
        const cur = Q[i].left.map((x, r) => { const v = box.querySelector(`#ex-m${r}`).value; return v === "" ? "" : +v; });
        setAns(cur.some(v => v !== "") ? cur : null);
      });
    } else if (q.kind === "order") {
      const move = (p, d) => { const cur = (Array.isArray(A.answers[i]) ? A.answers[i] : q.start).slice(), t = cur[p]; cur[p] = cur[p + d]; cur[p + d] = t; setAns(cur); exam(i);
        const b = view.querySelector(`[data-${d < 0 ? "up" : "dn"}="${p + d}"]`) || view.querySelector(`[data-${d < 0 ? "dn" : "up"}="${p + d}"]`); if (b) b.focus(); };
      box.querySelectorAll("[data-up]").forEach(b => b.onclick = () => move(+b.dataset.up, -1));
      box.querySelectorAll("[data-dn]").forEach(b => b.onclick = () => move(+b.dataset.dn, 1));
      const kp = box.querySelector("#ex-keep"); if (kp) kp.onclick = () => { setAns(q.start.slice()); exam(i); };
    }
  }

  /* ---------- timer ---------- */
  function startTimer(extra) { stopTimer(); const t = () => { tick(); if (extra) extra(); }; timer = setInterval(t, 250); t(); }
  function stopTimer() { clearInterval(timer); timer = 0; }
  const WARN = [[10, "10 minutes left."], [5, "5 minutes left."], [1, "1 minute left."]];
  function tick() {
    if (!A || A.status !== "live") return stopTimer();
    const left = A.endsAt - Date.now();
    if (left <= 0) return timeUp();
    WARN.forEach(([m, txt]) => { if (left <= m * 6e4 && A.limitMs > m * 6e4 + 3e4 && A.warned.indexOf(m) < 0) { A.warned.push(m); saveA(); warn(txt, m); } });
    if (A.stEnds && oneWay() && screen === "exam" && Date.now() >= A.stEnds) { if (A.cur < Q.length - 1) { BGX.toast("Time for that station: next one."); exam(A.cur + 1); } else reviewScreen(); return; }
    paintTime();
  }
  function paintTime() {
    const el = document.getElementById("ex-time"); if (!el || !A) return;
    const left = A.endsAt - Date.now(), box = document.getElementById("ex-timer");
    el.textContent = A.hideTimer ? "hidden" : clock(left);
    box.classList.toggle("is-amber", left <= 5 * 6e4 && left > 6e4); box.classList.toggle("is-red", left <= 6e4);
    if (A.stEnds && oneWay()) { const s = Math.max(0, Math.ceil((A.stEnds - Date.now()) / 1000)); box.querySelector(".lb").textContent = "Station " + s + " s · total"; }
    const hb = document.getElementById("ex-hidet");
    if (hb && !hb.onclick) hb.onclick = () => { A.hideTimer = !A.hideTimer; hb.setAttribute("aria-pressed", A.hideTimer); hb.textContent = A.hideTimer ? "Show" : "Hide"; saveA(); paintTime(); };
  }
  function warn(txt, m) {
    const lv = document.getElementById("ex-live"); if (lv) { lv.textContent = ""; setTimeout(() => { lv.textContent = txt + (m === 1 ? " The paper submits itself at 0:00." : ""); }, 30); }
    BGX.toast(txt);
  }
  function timeUp() {
    stopTimer(); if (!A || A.status !== "live") return;
    leaveQ();
    view.querySelectorAll(".ex-main input, .ex-main select, .ex-main button, .ex-move button, .ex-tools button").forEach(x => x.disabled = true);
    const lv = document.getElementById("ex-live"); if (lv) lv.textContent = "Time is up. Submitting your answers.";
    const ov = document.createElement("div"); ov.className = "ex-modal"; ov.setAttribute("role", "alertdialog"); ov.setAttribute("aria-label", "Time is up");
    ov.innerHTML = `<div class="box"><h2>Time is up</h2><p>Submitting everything you saved…</p></div>`; document.body.appendChild(ov);
    setTimeout(() => { ov.remove(); submit(true); }, BGX.RM ? 300 : 1200);
  }

  /* ---------- small dialogs ---------- */
  function confirmBox(title, text, okLabel, onOk, o = {}) {
    const prev = document.activeElement, ov = document.createElement("div");
    ov.className = "ex-modal"; ov.setAttribute("role", "alertdialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-labelledby", "ex-mt"); ov.setAttribute("aria-describedby", "ex-md");
    ov.innerHTML = `<div class="box"><h2 id="ex-mt">${esc(title)}</h2><p id="ex-md">${esc(text)}</p>${o.askAgain ? `<label class="ex-attest"><input type="checkbox" id="ex-noask"> <span>Don't ask again during this exam</span></label>` : ""}
      <div class="br-btns"><button class="br-next" type="button" data-ok>${esc(okLabel)}</button><button class="br-ghost" type="button" data-no>Go back</button></div></div>`;
    document.body.appendChild(ov);
    const close = () => { ov.remove(); document.removeEventListener("keydown", k, true); };
    const k = ev => { if (ev.key === "Escape") { ev.preventDefault(); ev.stopPropagation(); close(); if (prev && prev.focus) prev.focus(); }
      else if (ev.key === "Tab") { const f = [...ov.querySelectorAll("button, input")]; const i = f.indexOf(document.activeElement); if (ev.shiftKey && i <= 0) { ev.preventDefault(); f[f.length - 1].focus(); } else if (!ev.shiftKey && i === f.length - 1) { ev.preventDefault(); f[0].focus(); } }
      else if (!/^(Enter| )$/.test(ev.key)) ev.stopPropagation(); };
    document.addEventListener("keydown", k, true);
    ov.querySelector("[data-ok]").onclick = () => { const na = ov.querySelector("#ex-noask"); if (na && na.checked && A) { A.noAsk = true; saveA(); } close(); onOk(); };
    ov.querySelector("[data-no]").onclick = () => { close(); if (prev && prev.focus) prev.focus(); };
    ov.querySelector("[data-ok]").focus();
    return true;
  }

  /* ---------- calculator and reference sheet (non-modal panels: the question stays readable) ---------- */
  function panel(id, title, inner, opener, onOpen) {
    if (popover && popover.id === id) { popover.close(); return; }
    if (popover && popover.close) popover.close();
    const el = document.createElement("div"); el.className = "ex-pop"; el.id = "ex-pop-" + id; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", title);
    el.innerHTML = `<div class="hd"><b>${esc(title)}</b><button type="button" class="br-quit" data-x aria-label="Close ${esc(title)}"><span aria-hidden="true">✕</span> Close</button></div><div class="bd">${inner}</div>`;
    document.body.appendChild(el);
    const close = () => { el.remove(); document.removeEventListener("keydown", k, true); popover = null; if (opener && document.body.contains(opener)) opener.focus(); };
    const k = ev => { if (ev.key === "Escape" && el.contains(document.activeElement)) { ev.preventDefault(); ev.stopPropagation(); close(); } };
    document.addEventListener("keydown", k, true);
    el.querySelector("[data-x]").onclick = close;
    popover = { id, close, el };
    if (onOpen) onOpen(el);
    return el;
  }
  function openCalc(opener) {
    const sci = F().calculator === "scientific";
    const keys = (sci ? [["log", "log("], ["ln", "ln("], ["10ˣ", "tenx("], ["eˣ", "exp("], ["xʸ", "^"], ["EE", "e"]] : []).concat([
      ["√", "sqrt("], ["x²", "²"], ["(", "("], [")", ")"], ["C", "C"], ["⌫", "B"],
      ["7", "7"], ["8", "8"], ["9", "9"], ["÷", "÷"], ["4", "4"], ["5", "5"], ["6", "6"], ["×", "×"],
      ["1", "1"], ["2", "2"], ["3", "3"], ["−", "−"], ["0", "0"], [".", "."], ["Ans", "A"], ["+", "+"], ["±", "N"], ["=", "="]]);
    panel("calc", sci ? "Scientific calculator" : "Calculator", `<label class="sr" for="ex-cin">Calculation</label><input id="ex-cin" class="ex-cin" type="text" inputmode="none" autocomplete="off" spellcheck="false">
      <output id="ex-cout" class="ex-cout" aria-live="polite">0</output><div class="ex-keys${sci ? " is-sci" : ""}">${keys.map(([l, v]) => `<button type="button" data-k="${esc(v)}"${v === "=" ? ' class="is-eq"' : ""}${l === "⌫" ? ' aria-label="Delete"' : l === "±" ? ' aria-label="Change sign"' : ""}>${l}</button>`).join("")}</div>
      <p class="br-hint" style="margin:6px 0 0">You can also type: 2.5*(3+4), sqrt(2), 6.02e23, log(0.001).</p>`, opener, el => {
      const inp = el.querySelector("#ex-cin"), out = el.querySelector("#ex-cout");
      let ans = A.calcAns || 0;
      const show = v => { out.textContent = typeof v === "number" ? (isFinite(v) ? (Math.abs(v) >= 1e10 || (Math.abs(v) < 1e-6 && v !== 0) ? v.toExponential(6).replace(/\.?0+e/, "e") : String(+v.toPrecision(12))) : "Error") : v; };
      const run = () => { try { const v = X.calc(inp.value.replace(/Ans/g, "(" + ans + ")")); if (!isFinite(v)) throw 0; ans = v; A.calcAns = v; show(v); inp.value = String(+v.toPrecision(12)); } catch (e) { show("Error"); } };
      el.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { const k = b.dataset.k;
        if (k === "=") run(); else if (k === "C") { inp.value = ""; show(0); } else if (k === "B") inp.value = inp.value.slice(0, -1);
        else if (k === "A") inp.value += "Ans"; else if (k === "N") inp.value = inp.value.startsWith("−(") && inp.value.endsWith(")") ? inp.value.slice(2, -1) : "−(" + (inp.value || "0") + ")";
        else inp.value += k; });
      inp.onkeydown = ev => { ev.stopPropagation(); if (ev.key === "Enter" || ev.key === "=") { ev.preventDefault(); run(); } };
      inp.focus();
    });
  }
  /* sheets: "ptable", "constants", "dosecalc", "stats", or a key of bank.sheets: { title, rows: [[name, value]], text } */
  function sheetDef(k) {
    const S = {
      ptable: { title: "Periodic table", short: "Periodic table" },
      constants: { title: "Constants and conversions", short: "Constants", rows: [["Avogadro's number", "6.022 × 10²³ /mol"], ["Gas constant R", "0.08206 L·atm/(mol·K) = 8.314 J/(mol·K)"], ["Molar volume at STP", "22.4 L/mol (0 °C, 1 atm)"],
        ["Specific heat of water", "4.184 J/(g·°C)"], ["Pressure", "1 atm = 760 mmHg = 760 torr = 101.325 kPa"], ["Temperature", "K = °C + 273.15"], ["Water ion product Kw", "1.0 × 10⁻¹⁴ at 25 °C"],
        ["pH", "pH = −log[H⁺]; pH + pOH = 14"], ["Faraday constant F", "96,485 C/mol e⁻"], ["Speed of light c", "3.00 × 10⁸ m/s"], ["Planck's constant h", "6.626 × 10⁻³⁴ J·s"], ["Metric", "1 L = 1,000 mL = 1,000 cm³; 1 g = 1,000 mg"]] },
      dosecalc: { title: "Dosage formulas", short: "Formulas", rows: [["Tablets or liquid", "(D ÷ H) × Q"], ["Weight", "kg = lb ÷ 2.2 (round kg to the tenth first)"], ["Weight-based dose", "dose = mg/kg × kg"],
        ["IV pump rate", "mL/h = total mL ÷ hours"], ["Gravity drip", "gtt/min = mL × drop factor ÷ minutes"], ["Infusion time", "hours = total mL ÷ mL/h"], ["mcg/kg/min", "mL/h = mcg/kg/min × kg × 60 ÷ concentration (mcg/mL)"],
        ["Metric", "1 g = 1,000 mg; 1 mg = 1,000 mcg; 1 L = 1,000 mL"], ["Rounding", "round only at the end; leading zero (0.5); no trailing zero (5)"]] },
      stats: { title: "Statistics formulas", short: "Formulas", rows: [["Mean", "x̄ = Σx ÷ n"], ["z-score", "z = (x − x̄) ÷ s"], ["Empirical rule", "68% within 1 SD, 95% within 2, 99.7% within 3"], ["Complement", "P(not A) = 1 − P(A)"],
        ["Sensitivity", "TP ÷ (TP + FN)"], ["Specificity", "TN ÷ (TN + FP)"], ["PPV", "TP ÷ (TP + FP)"], ["NPV", "TN ÷ (TN + FN)"], ["Relative risk", "risk exposed ÷ risk unexposed"], ["Odds ratio", "(a × d) ÷ (b × c)"], ["NNT", "1 ÷ absolute risk reduction"]] }
    };
    return (B.sheets && B.sheets[k]) || S[k] || { title: String(k), text: String(k) };
  }
  function ptableHTML() {
    const G = X.games["element-rush"]; if (!G) return `<p class="br-hint">Periodic table not available.</p>`;
    const M = G.map || { cols: 18, gapAfterRow: 7 }, rowOf = r => M.gapAfterRow != null && r >= M.gapAfterRow ? r + 2 : r + 1;
    return `<div class="ex-ptwrap"><div class="ex-pt" role="table" aria-label="Periodic table: atomic number, symbol and atomic mass">${G.items.map(it => `<div class="c" role="cell" style="grid-row:${rowOf(it.row)};grid-column:${it.col};background:var(--${(G.categories.find(c => c.id === it.cat) || {}).color || "cat-mint"})" title="${esc(it.name)}"><small>${it.num}</small><b>${esc(it.symbol)}</b><i>${esc(String(it.mass || "").replace(/\(|\)/g, ""))}</i></div>`).join("")}
      ${(M.placeholders || []).map(p => `<div class="c is-ph" style="grid-row:${rowOf(p.row)};grid-column:${p.col}">${esc(p.label)}</div>`).join("")}<div class="gap" style="grid-row:${M.gapAfterRow + 1}"></div></div></div>
      <p class="br-hint" style="margin:6px 0 0">Scroll sideways inside the table on a phone. Atomic masses in g/mol.</p>`;
  }
  function openSheet(opener) {
    const list = sheetsOf(F());
    const body = list.map(k => { const d = sheetDef(k); return `<section class="ex-sheetsec"><h3>${esc(d.title)}</h3>${k === "ptable" ? ptableHTML() : d.rows ? `<dl class="ex-rows">${d.rows.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>` : `<p>${esc(d.text || "")}</p>`}</section>`; }).join("");
    panel("sheet", list.length === 1 ? sheetDef(list[0]).title : "Reference sheet", body, opener, el => el.querySelector("[data-x]").focus());
  }

  /* ================= review before submit ================= */
  function reviewScreen() {
    leaveQ(); if (popover && popover.close) popover.close();
    screen = "review"; html.classList.add("bgx-exam-on");
    const c = counts(), un = Q.map((q, i) => i).filter(i => !answered(i)), fl = A.flags.slice().sort((a, b) => a - b);
    const link = i => oneWay() ? `<span class="ex-qlink">Q${i + 1}</span>` : `<button type="button" class="ex-qlink" data-go="${i}">Q${i + 1}</button>`;
    view.innerHTML = `<div class="ex-shell">${topBar(F())}
      <section class="ex-review" aria-labelledby="ex-rh"><h2 id="ex-rh" tabindex="-1">Review before you submit</h2>
        <p>${c.a} of ${Q.length} answered · ${c.fl} flagged · ${c.u} unanswered. The timer is still running.</p>
        <div class="ex-rlists"><div><p class="br-label">Unanswered (${un.length})</p>${un.length ? `<p class="ex-links">${un.map(link).join("")}</p>` : `<p class="br-hint" style="margin:0">None: every question has an answer.</p>`}</div>
          ${oneWay() ? "" : `<div><p class="br-label">Flagged (${fl.length})</p>${fl.length ? `<p class="ex-links">${fl.map(link).join("")}</p>` : `<p class="br-hint" style="margin:0">None flagged.</p>`}</div>`}</div>
        <p class="br-label">All questions</p><div class="ex-side is-inline">${navHTML()}</div>
        <div class="br-btns">${oneWay() ? "" : `<button class="br-ghost" type="button" id="ex-backq"><span aria-hidden="true">←</span> Back to the exam</button>`}<button class="br-next" type="button" id="ex-submit">Submit exam</button></div>
      </section></div>`;
    view.querySelectorAll("[data-go]").forEach(b => b.onclick = () => exam(+b.dataset.go));
    const bq = view.querySelector("#ex-backq"); if (bq) bq.onclick = () => exam(A.cur);
    view.querySelector("#ex-submit").onclick = () => {
      const msg = c.u || c.fl ? `You have ${plural(c.u, "unanswered question")}${oneWay() ? "" : ` and ${plural(c.fl, "flagged question")}`}. Submit anyway?` : "You have answered every question. Submit now?";
      confirmBox("Submit the exam?", msg, "Submit", () => submit(false));
    };
    view.querySelector("#ex-rh").focus({ preventScroll: true }); window.scrollTo({ top: 0 });
    startTimer();
  }

  /* ================= submit and results ================= */
  function submit(auto, note) {
    stopTimer(); if (!A) return; leaveQ(); if (popover && popover.close) popover.close();
    if (A.status === "live") {
      const per = Q.map((q, i) => { const r = X.score(q, A.answers[i]); return { s: r.state, p: r.pts, m: r.max }; });
      const pts = per.reduce((n, r) => n + r.p, 0), max = per.reduce((n, r) => n + r.m, 0), pct = max ? Math.round(pts / max * 100) : 0;
      const now = Math.min(Date.now(), A.endsAt), f = F();
      A.status = "done"; A.result = { pts, max, pct, pass: pct >= f.pass, auto: !!auto, usedMs: now - A.startedAt, at: Date.now(), per, note: note || "" };
      const hist = store.get(HK(SUBJ, A.format), []);
      hist.push({ at: A.result.at, pct, pass: A.result.pass, pts, max, ms: A.result.usedMs, auto: !!auto, extra: A.extra, n: Q.length, only: A.only, choice: A.choice });
      store.set(HK(SUBJ, A.format), hist.slice(-30));
      saveA();
      track("exam_submit", { subject: SUBJ, format: A.format, pct, pass: A.result.pass, auto: !!auto, minutes: mins(A.result.usedMs), n: Q.length, extra: A.extra, only_missed: A.only });
      /* modest XP, once per attempt: 5 per fully right question + 50 for passing. Never touches certificates or progress. */
      if (!A.xpDone && BGX.xp) { const right = per.filter(r => r.s === "right").length; A.xpGot = 5 * right + (A.result.pass ? 50 : 0); A.xpDone = true; saveA(); if (A.xpGot) setTimeout(() => BGX.xp.add(A.xpGot), 900); }
    }
    results();
  }
  function results(filter = "all") {
    stopTimer(); screen = "results"; html.classList.remove("bgx-exam-on"); setURL(A.format);
    const f = F(), r = A.result, hist = store.get(HK(SUBJ, A.format), []);
    const byTopic = {}, byKind = {}; let flR = 0, flN = 0;
    Q.forEach((q, i) => { const p = r.per[i];
      const t = byTopic[q.topic] = byTopic[q.topic] || { p: 0, m: 0, n: 0 }; t.p += p.p; t.m += p.m; t.n++;
      const kd = q.entryKind === "case" ? "case" : q.kind, k = byKind[kd] = byKind[kd] || { p: 0, m: 0, n: 0 }; k.p += p.p; k.m += p.m; k.n++;
      if (A.flags.indexOf(i) >= 0) { flN++; if (p.s === "right") flR++; } });
    const bar = (lab, o, extra) => { const pc = o.m ? Math.round(o.p / o.m * 100) : 0; return `<li><div class="l"><b>${esc(lab)}</b><span>${pc}% · ${o.p}/${o.m}</span></div><i class="bar${pc < f.pass ? " is-low" : ""}"><i style="width:${pc}%"></i></i>${extra || ""}</li>`; };
    const topics = Object.keys(byTopic).sort((a, b) => byTopic[a].p / byTopic[a].m - byTopic[b].p / byTopic[b].m);
    const missed = Q.map((q, i) => i).filter(i => r.per[i].s !== "right");
    const missedEntries = [...new Set(missed.map(i => A.slots[i].e))].filter(id => P.byId[id]);
    const right = r.per.filter(x => x.s === "right").length;
    const tags = [r.auto ? "Auto-submitted" : "", A.extra > 1 ? "Extra time " + A.extra + "×" : "", oneWay() ? "One-way" : "", A.only ? "Missed questions only" : "", "Attempt " + A.attempt].filter(Boolean);
    const avgS = Math.round((A.tq || []).reduce((n, x) => n + (x || 0), 0) / Math.max(1, Q.length) / 1000);
    view.innerHTML = `<nav class="br-backrow" aria-label="Back"><button class="br-crumb" type="button" id="ex-home"><span aria-hidden="true">←</span> All ${esc(B.title || S0.name)} exams</button></nav>
      <section class="ex-result" aria-labelledby="ex-resh">
        <p class="br-label" style="margin:0">${esc(f.label)} · results</p>
        <h1 id="ex-resh" tabindex="-1"><span class="pct">${r.pct}%</span> <span class="ex-verdict ${r.pass ? "is-pass" : "is-fail"}">${r.pass ? "Passed" : "Not yet"}</span></h1>
        <p class="ex-big">${r.pts} of ${r.max} points · pass mark ${f.pass}% · time used ${clock(r.usedMs)} of ${clock(A.limitMs)}${avgS ? ` · about ${avgS} s a question` : ""}</p>
        <p class="ex-tags">${tags.map(t => `<span class="ex-chip">${esc(t)}</span>`).join("")}</p>
        ${r.note ? `<p class="ex-short is-box">${esc(r.note)}</p>` : ""}
        ${A.xpGot ? `<p class="br-hint" style="margin:0">+${A.xpGot} XP (5 per right answer${r.pass ? " + 50 for passing" : ""}). Mock exams never count toward certificates.</p>` : `<p class="br-hint" style="margin:0">Mock exams never count toward certificates or chapter progress.</p>`}
        <div class="br-btns"><button class="br-next" type="button" id="ex-new">Retake with a new paper</button>${missedEntries.length ? `<button class="br-ghost" type="button" id="ex-miss">Retake only what I missed (${missed.length})</button>` : ""}<a class="br-ghost" href="${R}subjects/${SUBJ}/index.html">Back to ${esc(S0.name)}</a></div>
      </section>
      <div class="ex-cols">
        <section class="ex-panel"><h2>By topic <small>weakest first</small></h2><ul class="ex-bars">${topics.map(t => bar(topicOf(t).label, byTopic[t], `<a class="ex-prac" href="${practiseURL(topicOf(t))}">Practise in ${esc(gameTitle(topicOf(t).game))} →</a>`)).join("")}</ul></section>
        <section class="ex-panel"><h2>By question type</h2><ul class="ex-bars">${Object.keys(byKind).map(k => bar(X.KIND_LABEL[k] || k, byKind[k])).join("")}</ul>
          ${flN ? `<p class="br-hint" style="margin:10px 0 0">Flagged questions: ${flR} of ${flN} right.${flR ? " Flagged and right often means a lucky guess: revise those too." : ""}</p>` : ""}</section>
      </div>
      <section class="ex-panel"><h2>Attempt history</h2>${historyHTML(hist)}</section>
      <section class="ex-panel" aria-labelledby="ex-revh"><h2 id="ex-revh">Review your answers</h2>
        <div class="br-seg ex-seg" role="group" aria-label="Show">${[["all", "All", Q.length], ["wrong", "Incorrect", r.per.filter(x => x.s === "wrong" || x.s === "partial").length], ["blank", "Unanswered", r.per.filter(x => x.s === "blank").length], ["flag", "Flagged", A.flags.length]].map(([k, l, n]) => `<button type="button" data-fl="${k}" aria-pressed="${filter === k}">${l} (${n})</button>`).join("")}</div>
        <ol class="ex-revlist">${Q.map((q, i) => ({ q, i })).filter(({ i }) => filter === "all" || (filter === "wrong" ? ["wrong", "partial"].indexOf(r.per[i].s) >= 0 : filter === "blank" ? r.per[i].s === "blank" : A.flags.indexOf(i) >= 0)).map(({ q, i }) => reviewItem(q, i)).join("") || `<li class="br-hint">Nothing to show here.</li>`}</ol>
      </section>`;
    const $ = s => view.querySelector(s);
    $("#ex-home").onclick = home;
    $("#ex-new").onclick = () => startScreen(f, { fresh: true, choice: A.choice });
    const mb = $("#ex-miss"); if (mb) mb.onclick = () => startScreen(f, { fresh: true, only: missedEntries });
    view.querySelectorAll("[data-fl]").forEach(b => b.onclick = () => { results(b.dataset.fl); const x = view.querySelector(`[data-fl="${b.dataset.fl}"]`); if (x) { x.focus({ preventScroll: true }); x.scrollIntoView({ block: "nearest" }); } });
    if (filter === "all") { $("#ex-resh").focus({ preventScroll: true }); window.scrollTo({ top: 0 }); }
  }
  function historyHTML(h) {
    if (!h.length) return `<p class="br-hint">No attempts yet.</p>`;
    const last = h.slice(-10), w = 260, ht = 60, x = i => last.length < 2 ? w / 2 : 8 + i * (w - 16) / (last.length - 1), y = p => ht - 6 - p / 100 * (ht - 12);
    const pass = F().pass;
    return `<svg class="ex-spark" viewBox="0 0 ${w} ${ht}" role="img" aria-label="Scores of the last ${last.length} attempts: ${last.map(a => a.pct + "%").join(", ")}">
        <line x1="0" x2="${w}" y1="${y(pass)}" y2="${y(pass)}" class="pl"/><polyline points="${last.map((a, i) => x(i) + "," + y(a.pct)).join(" ")}" class="ln"/>${last.map((a, i) => `<circle cx="${x(i)}" cy="${y(a.pct)}" r="3.5" class="${a.pass ? "ok" : "no"}"/>`).join("")}</svg>
      <table class="ex-hist"><thead><tr><th scope="col">Date</th><th scope="col">Score</th><th scope="col">Time</th><th scope="col">Notes</th></tr></thead><tbody>${h.slice().reverse().slice(0, 10).map(a => `<tr><td>${day(a.at)} ${hm(a.at)}</td><td><b>${a.pct}%</b> ${a.pass ? "pass" : ""}</td><td>${clock(a.ms)}</td><td>${[a.auto ? "auto-submitted" : "", a.extra > 1 ? a.extra + "×" : "", a.only ? "missed only" : "", a.n + " Q"].filter(Boolean).join(" · ")}</td></tr>`).join("")}</tbody></table>
      <p class="br-hint" style="margin:6px 0 0">Best ${Math.max(...h.map(a => a.pct))}% · last ${h[h.length - 1].pct}% · kept in this browser.</p>`;
  }
  const yourAns = (q, a) => {
    if (a == null) return "";
    if (q.kind === "sata") return (a || []).map(k => q.options[k]).join(" · ");
    if (q.options) return q.options[a];
    if (q.kind === "numeric") return a + (q.unit ? " " + q.unit : "");
    return "";
  };
  function reviewItem(q, i) {
    const r = A.result.per[i], a = A.answers[i], sc = X.score(q, a), mark = { right: "✓ Correct", wrong: "✕ Incorrect", partial: "◐ Partly right", blank: "– Unanswered" }[r.s];
    let body = "";
    if (q.options) {
      const want = new Set(Array.isArray(q.answer) ? q.answer : [q.answer]), got = new Set(Array.isArray(a) ? a : a != null ? [a] : []);
      body = `<ul class="ex-ropts">${q.order.map(k => `<li class="${want.has(k) ? "is-key" : ""}${got.has(k) ? " is-mine" : ""}"><span class="t">${esc(q.options[k])}</span>
        <span class="tag">${want.has(k) ? "Correct answer" : ""}${got.has(k) ? (want.has(k) ? " · yours" : "Your answer") : ""}</span>${q.whyOpt && q.whyOpt[k] ? `<span class="w">${esc(q.whyOpt[k])}</span>` : ""}</li>`).join("")}</ul>
        ${q.kind === "sata" && sc.detail ? `<p class="ex-rnote">You picked ${sc.detail.right} of ${sc.detail.of} right options${sc.detail.extra ? `, plus ${sc.detail.extra} that ${sc.detail.extra === 1 ? "isn't" : "aren't"} right` : ""}. Select all that apply scores only when fully right.</p>` : ""}`;
    } else if (q.kind === "numeric") {
      const x = N.parseNum(a), note = a != null ? X.numNote(q, x) : "", style = [];
      if (q.noTrail && a != null && /\.\d*0$/.test(String(a).trim())) style.push("Write no trailing zero (5, not 5.0).");
      if (a != null && /^[.,]\d/.test(String(a).trim())) style.push("Use a leading zero (0.5, not .5).");
      body = `<dl class="ex-rnum"><div><dt>Your answer</dt><dd>${a == null ? "–" : esc(a) + " " + esc(q.unit || "")}</dd></div><div><dt>Correct answer</dt><dd><b>${N.nfd(N.roundTo(q.answer, q.dp || 0), q.dp, q.noTrail)} ${esc(q.unit || "")}</b>${q.tol ? ` <small>(±${q.tol.pct != null ? q.tol.pct + "%" : q.tol.abs})</small>` : ""}</dd></div></dl>
        ${note ? `<p class="ex-rnote">${esc(note)}</p>` : ""}${style.length ? `<p class="ex-rnote">${esc(style.join(" "))}</p>` : ""}
        ${q.steps && q.steps.length ? `<div class="ex-steps"><p class="br-label">Worked answer</p><ol>${q.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>` : ""}`;
    } else if (q.kind === "match") {
      body = `<table class="ex-rmatch"><thead><tr><th scope="col">Item</th><th scope="col">Your match</th><th scope="col">Correct match</th></tr></thead><tbody>${q.left.map((l, k) => { const g = Array.isArray(a) && a[k] !== "" && a[k] != null ? +a[k] : null, ok = g === q.answer[k];
        return `<tr class="${ok ? "is-ok" : "is-no"}"><td>${esc(l)}</td><td>${g == null ? "–" : esc(q.right[g])} ${ok ? "✓" : "✕"}</td><td>${esc(q.right[q.answer[k]])}${q.whyPair && q.whyPair[k] ? `<small>${esc(q.whyPair[k])}</small>` : ""}</td></tr>`; }).join("")}</tbody></table>
        ${sc.detail ? `<p class="ex-rnote">${sc.detail.right} of ${sc.detail.of} pairs right${q.allOrNothing ? " (all-or-nothing: 1 point only when every pair is right)" : " (1 point each)"}.</p>` : ""}`;
    } else if (q.kind === "order") {
      body = `<div class="ex-rord"><div><p class="br-label">Your order</p>${Array.isArray(a) ? `<ol>${a.map((k, p) => `<li class="${k === p ? "is-ok" : "is-no"}">${esc(q.steps[k])}</li>`).join("")}</ol>` : `<p>–</p>`}</div><div><p class="br-label">Correct order</p><ol>${q.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div></div>`;
    }
    const t = topicOf(q.topic);
    const dg = q.kind === "diagram" && BGX.DIAGRAMS[q.diagram] ? `<div class="ex-dg is-sm">${BGX.DIAGRAMS[q.diagram](q.dgItem)}</div>` : "";
    return `<li class="ex-ritem is-${r.s}"><details${r.s !== "right" && A.result.per.length <= 60 ? " open" : ""}><summary><span class="no">Q${i + 1}</span><span class="mk">${mark}${A.flags.indexOf(i) >= 0 ? " · ⚑ flagged" : ""}</span><span class="st">${esc((t => t.length > 90 ? t.slice(0, 88).replace(/\s+\S*$/, "") + "…" : t)(q.stem + (q.big ? ": " + q.big : "")))}</span></summary>
      <div class="ex-rbody">${caseHTML(q)}${q.lead ? `<p class="ex-lead">${esc(q.lead)}</p>` : ""}<p class="ex-q">${esc(q.stem)}</p>${q.big ? `<p class="ex-bigq">${esc(q.big)}</p>` : ""}${dg}
        ${body}${q.why ? `<p class="ex-why"><b>Why:</b> ${esc(q.why)}</p>` : ""}
        <p class="ex-rmeta">${esc(t.label)}${q.src ? " · textbook ch. " + esc(q.src) : ""} · ${r.p}/${r.m} point${r.m === 1 ? "" : "s"} · <a href="${practiseURL(t)}">Practise in ${esc(gameTitle(t.game))}</a></p></div></details></li>`;
  }

  /* ================= keyboard ================= */
  document.addEventListener("keydown", ev => {
    if (screen !== "exam" || !A || A.status !== "live" || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (document.querySelector(".ex-modal, .br-sheetwrap") || (popover && popover.el && popover.el.contains(document.activeElement))) return;
    const tag = (ev.target.tagName || "").toUpperCase(); if (/INPUT|SELECT|TEXTAREA/.test(tag) && !(tag === "INPUT" && /radio|checkbox/.test(ev.target.type))) return;
    const k = ev.key.toLowerCase(), n = "12345678".indexOf(ev.key);
    if (n >= 0) { const o = view.querySelectorAll('.ex-main input[name="ex-o"]')[n]; if (o) { ev.preventDefault(); o.click(); o.focus(); } }
    else if (k === "f") { ev.preventDefault(); toggleFlag(); }
    else if (k === "n") { ev.preventDefault(); next(); }
    else if (k === "p" && !oneWay() && A.cur > 0) { ev.preventDefault(); exam(A.cur - 1); }
  });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && timer) tick(); });

  /* ================= URL: ?f=<format> keeps the screen across reloads ================= */
  function setURL(fid) { try { const u = new URL(location.href); if (fid) u.searchParams.set("f", fid); else u.searchParams.delete("f"); if (u.href !== location.href) history.replaceState(null, "", u.href); } catch (e) {} }

  /* test hook for automated checks (and a fast way to try the time-out path) */
  BGX.examTest = {
    state: () => A, questions: () => Q, screen: () => screen, pool: () => P,
    expire: () => { if (A && A.status === "live") { A.endsAt = Date.now() - 1; saveA(); tick(); } },
    endsIn: ms => { if (A && A.status === "live") { A.endsAt = Date.now() + ms; saveA(); tick(); } },
    correct: i => { const q = Q[i]; if (q.kind === "numeric") return String(N.roundTo(q.answer, q.dp || 0)); if (q.kind === "match") return q.answer.slice(); if (q.kind === "order") return q.steps.map((s, k) => k); return Array.isArray(q.answer) ? q.answer.slice() : q.answer; },
    wrong: i => { const q = Q[i]; if (q.kind === "numeric") return String(q.answer * 3 + 7); if (q.kind === "match") return q.answer.map((k, j) => q.answer[(j + 1) % q.answer.length]); if (q.kind === "order") return q.steps.map((s, k) => q.steps.length - 1 - k);
      if (q.kind === "sata") return [q.options.findIndex((o, k) => q.answer.indexOf(k) < 0)]; return (q.answer + 1) % q.options.length; },
    set: (i, v) => { const keep = A.cur; A.cur = i; setAns(v); A.cur = keep; },
    go: i => exam(i), review: () => reviewScreen(), submit: () => submit(false), open: fid => startScreen(fmtOf(fid))
  };

  /* ================= boot ================= */
  const want = new URLSearchParams(location.search).get("f"), lv = liveA();
  if (lv.length) { const a = lv.find(x => x.format === want) || lv[0]; startScreen(fmtOf(a.format)); }
  else if (want && fmtOf(want)) {
    const a = loadA(want);
    if (a && a.status === "done" && a.result && (Q = questionsFor(a))) { A = a; results(); } else startScreen(fmtOf(want));
  } else home();

  /* ================= /exams/: every subject and its formats ================= */
  function listPage() {
    document.title = "Pre-exam simulator · BioglowRX Sciences Learning";
    const subs = CAT.subjects.filter(s => X.banks[s.id]);
    view.innerHTML = `<nav class="br-backrow" aria-label="Back"><a class="br-crumb" href="${R}index.html"><span aria-hidden="true">←</span> All subjects</a></nav>
      <section class="ex-hero"><p class="br-label" style="margin:0">Pre-exam simulator</p><h1>Mock exams, like the real thing</h1>
        <p>Timed papers with a question navigator, flag for review, an on-screen calculator and reference sheets where your exam allows them, and a full review when you submit.</p>
        <p class="ex-note">Practice only: mock exams never count toward certificates or chapter progress.</p></section>
      <div class="ex-subjects">${subs.map(s => { const b = X.banks[s.id];
        return `<section class="ex-subj"><a class="hd" href="${R}exams/${s.id}/index.html" style="--c:var(--${s.color})"><span class="ic">${BGX.icon ? BGX.icon(s.icon) : ""}</span><span><b>${esc(s.name)}</b><small>${plural(b.formats.length, "format")}</small></span><i aria-hidden="true">→</i></a>
          <ul>${b.formats.map(f => { const a = store.get(K(s.id, f.id), null), h = store.get(HK(s.id, f.id), []);
            return `<li><a href="${R}exams/${s.id}/index.html?f=${encodeURIComponent(f.id)}"><b>${esc(f.label)}</b><span>${f.n} questions · ${f.secondsEach ? f.secondsEach + " s a station" : baseMinutes(f) + " min"} · pass ${f.pass}%</span>${a && a.status === "live" ? `<em class="ex-chip is-live">In progress</em>` : h.length ? `<em class="ex-chip">Best ${Math.max(...h.map(x => x.pct))}%</em>` : ""}</a></li>`; }).join("")}</ul></section>`; }).join("")}</div>`;
  }
})();
