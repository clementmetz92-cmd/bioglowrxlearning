/* BioglowRX engine — game runner and game formats.
   A game page loads: core.js, icons.js, illus.js, game.js, then its data file, which calls
   BGX.registerGame({...}). Everything a game shows comes from that data (see data/README.md). */
(function () {
  "use strict";
  const BGX = window.BGX;
  const ROUND = 10;
  const esc = s => BGX.esc(s);
  let G = null, view = null, S = {};
  const $ = s => view.querySelector(s);

  /* ---------- data helpers ---------- */
  const catOf = it => G.catMap[it.cat] || { name: "", color: "cat-mint" };
  const catBg = it => `var(--${catOf(it).color})`;
  const fill = (tpl, it) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => k === "category" ? catOf(it).name : (it[k] == null ? "" : it[k]));
  const val = (field, it) => field.indexOf("{") >= 0 ? fill(field, it) : (field === "category" ? catOf(it).name : it[field]);
  const confHTML = c => esc(c).replace(/(\d[spdf])(\d+)/g, "$1<sup>$2</sup>");
  const pool = () => G.items.slice(0, S.set || G.items.length);
  /* quiz, sortit, truemyth, findit and matchpairs modes can take  only: [category ids]  to play one group */
  const poolFor = m => m && m.only ? pool().filter(it => m.only.indexOf(it.cat) >= 0) : pool();
  /* saved-mistake review: each question has a stable key; a review round keeps only the questions whose keys are due */
  const itemKey = it => it && it.num != null && it.num !== "" ? "i:" + it.num : null;
  const qKey = q => !q ? null : q.p ? "p:" + q.p.id : q.c ? "c:" + (q.c.id || q.c.title) : q.item && q.item.seq ? "s:" + (q.item.seq.id || q.item.seq.title) : itemKey(q.item);
  const reviewing = m => S.review && S.reviewMode === m.id;
  const rv = (m, list, key) => { if (!reviewing(m)) return list; const out = list.filter(x => S.review.has(key(x))); if (!out.length) S.reviewEmpty = true; return out.length ? out : list; };
  const roundPool = m => rv(m, poolFor(m), itemKey);
  const bigHTML = it => G.tile.big === "@icon" ? BGX.icon(it.icon || catOf(it).icon || "lab") : esc(val(G.tile.big, it));
  const bigText = it => G.tile.big === "@icon" ? "" : val(G.tile.big, it);
  const tileHTML = (it, cls = "", extra = "") => {
    const t = G.tile;
    return `<div class="br-tile ${cls}${t.big === "@icon" ? " is-icon" : ""}" style="background:${catBg(it)}"><small>${esc(val(t.corner, it))}</small><b>${bigHTML(it)}</b>${extra}</div>`;
  };
  BGX.fill = fill;

  /* ---------- registration ---------- */
  BGX.formats = {};
  BGX.registerGame = g => {
    G = BGX.game = g;
    g.catMap = {}; (g.categories || []).forEach(c => g.catMap[c.id] = c);
    g.items.forEach((it, i) => { if (it.num == null) it.num = i + 1; it._i = i; });
    g.byNum = n => g.items.find(it => it.num === n);
    if (g.notes && !g.modes.some(m => m.format === "notes")) g.modes.unshift({ id: "notes", format: "notes", title: "Study notes", desc: "Read the key ideas first: everything the activities ask is in here.", icon: "✎", color: "cat-lemon" });
    g.modes.forEach(m => { const f = BGX.formats[m.format]; m._ready = !!(f && !f.soon); });
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  };

  function boot() {
    view = document.getElementById("br-view");
    S.set = BGX.store.get("set_" + G.id, G.defaultSet || G.items.length);
    if (G.sets && !G.sets.some(x => x.size === S.set)) S.set = G.defaultSet || G.sets[0].size;
    BGX.shell();
    BGX.recordPlay({ id: G.id, title: G.title, subject: G.subject, url: "games/" + G.id + "/index.html", tagline: G.tagline });
    document.title = G.title + " · BioglowRX Sciences Learning";
    menu();
    const want = new URLSearchParams(location.search).get("mode");   // ?mode=<id> opens that mode straight away (used by practice pages)
    if (want) {
      const rev = new URLSearchParams(location.search).get("review") && BGX.study ? BGX.study.keysFor(G.id, want, true) : null;
      if (rev && !rev.length && BGX.toast) setTimeout(() => BGX.toast("Nothing due here any more: here's a normal round."), 300);
      BGX.startMode(want, rev && rev.length ? { review: rev } : null);
    }
    addEventListener("popstate", () => { if (menu.skipPop) { menu.skipPop = false; return; } if (S.screen && S.screen !== "menu") { clearInterval(S.peekTimer); menu(); } });
    document.addEventListener("keydown", ev => {
      if (S.screen !== "game" || document.querySelector(".br-milestone")) return;
      if (S.answered && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); nextQ(); return; }
      const n = "1234".indexOf(ev.key), b = view.querySelectorAll(".br-ans")[n];
      if (n >= 0 && b && !S.answered) b.click();
    });
  }

  /* ---------- menu ---------- */
  function menu() {
    const fromRound = S.screen && S.screen !== "menu";
    S.screen = "menu"; undock(); if (BGX.endRound) BGX.endRound();
    document.documentElement.classList.remove("bgx-playing");
    if (fromRound) { try { if (history.state && history.state.bgxRound) { menu.skipPop = true; history.back(); } } catch (e) {} }
    const best = BGX.store.get("best_" + G.id, {});
    const sName = G.subject ? (G.subjectName || G.subject.charAt(0).toUpperCase() + G.subject.slice(1)) : "";
    const subj = G.subject ? `<a class="br-crumb" href="${BGX.root}subjects/${G.subject}/index.html"><span aria-hidden="true">←</span> All ${esc(sName)} chapters</a>` : "";
    view.innerHTML = `${subj ? `<nav class="br-backrow" aria-label="Back">${subj}</nav>` : ""}
      ${BGX.community ? BGX.community.challengeBanner(G) : ""}
      <div class="br-hero${diagramSVG(null) ? " has-art" : ""}"><div><h2>${esc(G.title)}</h2><p>${esc(G.tagline || "")}</p></div>${diagramSVG(null) ? `<div class="br-heroart" aria-hidden="true">${diagramSVG(null)}</div>` : ""}</div>
      ${G.sets ? `<p class="br-label">Practise with</p>
      <div class="br-seg" role="group" aria-label="${esc(G.itemNoun || "item")}s to practise">${G.sets.map(x => `<button data-set="${x.size}" aria-pressed="${S.set == x.size}">${esc(x.label)}</button>`).join("")}</div>` : ""}
      ${G.hint ? `<p class="br-hint">${esc(G.hint)}</p>` : ""}${G.note ? `<p class="br-hint"><b>${esc(G.note)}</b></p>` : ""}
      ${BGX.progress ? BGX.progress.gameCard(G.id) : ""}
      ${modeGroups()}
      ${subj ? `<nav class="br-backrow is-bottom" aria-label="Back">${subj}</nav>` : ""}`;
    view.classList.remove("menu-in"); void view.offsetWidth; view.classList.add("menu-in");
    if (BGX.progress) BGX.progress.bindGameCard(G.id);
    view.querySelectorAll("[data-set]").forEach(b => b.onclick = () => { BGX.sfx.tap(); S.set = +b.dataset.set; BGX.store.set("set_" + G.id, S.set); menu(); });
    view.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { const m = G.modes.find(x => x.id === b.dataset.mode); if (m._ready) start(m); });
  }
  /* the menu in three groups: study first (notes, explore), the core activities that count toward the certificate, extra practice */
  function modeGroups() {
    const best = BGX.store.get("best_" + G.id, {}), core = coreIds();
    const scored = m => m._ready && BGX.formats[m.format].scored;
    const btn = m => { const sc = m._ready && BGX.formats[m.format].scored, pc = sc && BGX.progress ? BGX.progress.modePct(G.id, m.id) : null, ok = pc != null && pc >= 70;
        return `<button class="br-mode${m._ready ? "" : " is-soon"}${ok ? " is-passed" : ""}" data-mode="${m.id}"${m._ready ? "" : ' aria-disabled="true"'}>
        <span class="ic" style="background:var(--${m.color || "cat-mint"})">${esc(m.icon || "")}${ok ? '<i class="br-tick" aria-label="passed">✓</i>' : ""}</span>
        <span><h3>${esc(m.title)}</h3><p>${esc(m.desc || "")}</p>${!m._ready ? '<span class="best">Coming soon</span>'
          : sc ? `<span class="best${ok ? " is-ok" : pc != null ? " is-low" : " is-todo"}">${best[m.id + S.set] != null ? `Best: ${best[m.id + S.set]}/${roundSize(m)} · ` : ""}${pc == null ? "Not played yet · pass at 70%" : ok ? `${Math.round(pc)}% · passed` : `${Math.round(pc)}% · 70% to pass`}</span>` : ""}</span></button>`; };
    const study = G.modes.filter(m => !scored(m) && m._ready), coreM = G.modes.filter(m => scored(m) && core.indexOf(m.id) >= 0),
      extra = G.modes.filter(m => scored(m) && core.indexOf(m.id) < 0), soon = G.modes.filter(m => !m._ready);
    const group = (label, note, list) => list.length ? `<p class="br-label br-modehead" style="margin-top:22px">${label}</p>${note ? `<p class="br-hint br-modenote">${note}</p>` : ""}<div class="br-modes">${list.map(btn).join("")}</div>` : "";
    return group("Study first", "", study) +
      group(`Core activities · ${coreM.length}`, `Pass ${coreM.length === 1 ? "this activity" : `these ${coreM.length}`} with 70% or more to earn the chapter certificate.`, coreM) +
      group("Extra practice", "Optional: more ways to practise. They don't count toward the certificate.", extra.concat(soon));
  }
  const roundSize = m => BGX.formats[m.format] && BGX.formats[m.format].roundSize ? BGX.formats[m.format].roundSize(m)
    : m.format === "matchpairs" ? Math.min(m.pairs || 8, G.items.length)
    : m.format === "sequence" ? Math.min(m.rounds || 6, (G.sequences || []).length) : Math.min(ROUND, G.items.length);

  /* core activities: about 4 per chapter count toward its certificate; the others are extra practice.
     A game can name them (core: ["id", …]); otherwise the pick is one "apply" activity (cases or a calculator) if there is one,
     then quizzes and sorting before order and true-or-myth rounds, at most two of the same kind, Match Pairs last. */
  const CORE_N = 4, RANK = { cases: 0, calculator: 0, quiz: 1, findit: 1, sortit: 2, buildit: 2, sequence: 3, truemyth: 3, matchpairs: 5 };
  function coreIds() {
    const sc = G.modes.filter(m => m._ready && BGX.formats[m.format].scored);
    if (G.core) return G.core.filter(id => sc.some(m => m.id === id));
    if (sc.length <= CORE_N) return sc.map(m => m.id);
    const out = [], kind = {}, take = m => { out.push(m); kind[m.format] = (kind[m.format] || 0) + 1; };
    const apply = sc.find(m => RANK[m.format] === 0); if (apply) take(apply);
    const rest = sc.filter(m => m !== apply).map((m, i) => ({ m, i })).sort((a, b) => ((RANK[a.m.format] ?? 4) - (RANK[b.m.format] ?? 4)) || a.i - b.i).map(x => x.m);
    rest.forEach(m => { if (out.length < CORE_N && (kind[m.format] || 0) < 2) take(m); });
    rest.forEach(m => { if (out.length < CORE_N && out.indexOf(m) < 0) take(m); });
    return sc.filter(m => out.indexOf(m) >= 0).map(m => m.id);   // keep the menu's order
  }
  BGX.coreIds = coreIds;

  /* scored modes and their round sizes for every practice set (read by tools-progress-map.js to build data/progress-map.js) */
  BGX.progressInfo = () => {
    const keep = S.set, sizes = G.sets ? G.sets.map(x => x.size) : [G.items.length], core = coreIds();
    const out = G.modes.filter(m => m._ready && BGX.formats[m.format].scored).map(m => {
      const tot = {};
      sizes.forEach(sz => {
        S.set = sz;
        if (m.format === "matchpairs") { const used = new Set(); tot[sz] = Math.min(m.pairs || 8, poolFor(m).filter(it => it[m.clue] && !used.has(it[m.clue]) && used.add(it[m.clue])).length); }
        else { const f = BGX.formats[m.format]; let n; try { n = f.makeRound ? f.makeRound(m).length : roundSize(m); } catch (e) { n = roundSize(m); } tot[sz] = n; }
      });
      return Object.assign({ id: m.id, t: m.title, tot }, core.indexOf(m.id) >= 0 ? { core: 1 } : {});
    });
    S.set = keep;
    return { title: G.title, subject: G.subject, modes: out };
  };

  BGX.startMode = (id, opts) => { const m = G.modes.find(x => x.id === id && x._ready); if (m) start(m, opts); return !!m; };

  /* ---------- round runner (question formats) ---------- */
  /* opts.review: a list of question keys to practise again (Today's review, or "Practise these again" on the end screen) */
  function start(mode, opts) {
    BGX.sfx.tap();
    const rk = opts && opts.review && opts.review.length ? opts.review : null;
    S.review = rk ? new Set(rk) : null; S.reviewMode = rk ? mode.id : null; S.reviewEmpty = false;
    if (BGX.track) BGX.track("round_start", { game: G.id, mode: mode.id, format: mode.format, review: !!rk });
    /* the browser's Back button returns to this game's menu instead of leaving the page */
    try { if (!(history.state && history.state.bgxRound)) history.pushState({ bgxRound: 1 }, ""); } catch (e) {}
    document.documentElement.classList.add("bgx-playing");
    S.xpStart = BGX.xp.total;
    const f = BGX.formats[mode.format];
    BGX.inRound = mode.format !== "explorer" && mode.format !== "notes";
    if (f.open) { S.screen = mode.format; S.mode = mode; f.open(mode); return; }
    S = Object.assign(S, { screen: "game", mode, f, i: 0, score: 0, wrong: [], answered: false, missKeys: new Set() });
    S.qs = f.makeRound(mode);
    if (S.reviewEmpty) { S.review = null; if (BGX.toast) BGX.toast("Those questions have changed since you saved them, so here's a normal round."); if (BGX.study) BGX.study.keysFor(G.id, mode.id).forEach(k => BGX.study.hit(G.id, mode.id, k, true)); }
    renderQ();
  }
  /* "Q 3/10 · 2 right": which question this is, and the score so far */
  const countHTML = (q, total) => `<span class="q">Q ${Math.min(q, total)}/${total}</span> · <b>${S.score}</b> right`;
  function topBar(total) {
    return `<div class="br-top"><button class="br-quit" id="br-quit" aria-label="Back to the game menu"><span aria-hidden="true">←</span> Menu</button>
      <div class="br-bar" aria-hidden="true"><i style="width:${S.i / total * 100}%"></i></div>
      <span class="br-count" aria-live="off">${countHTML(S.i + 1, total)}</span></div>`;
  }
  function renderQ() {
    view.classList.remove("menu-in"); undock();
    const q = S.qs[S.i];
    view.innerHTML = topBar(S.qs.length) + `<div class="br-prompt">${S.f.prompt(S.mode, q)}</div>` + S.f.body(S.mode, q) + `<div class="br-feedback" id="br-fb" aria-live="polite"></div>`;
    $("#br-quit").onclick = menu;
    S.answered = false;
    S.f.bind(S.mode, q, answer);
    /* keyboard and screen-reader users land on the new question instead of the top of the page */
    const pr = view.querySelector(".br-prompt"); if (pr && !view.contains(document.activeElement)) { pr.setAttribute("tabindex", "-1"); pr.focus({ preventScroll: true }); }
  }
  function answer(correct, el, target) {
    if (S.answered) return; S.answered = true;
    const q = S.qs[S.i], it = q.item;
    if (correct) S.score++; else if (S.wrong.indexOf(it) < 0) S.wrong.push(it);
    if (BGX.study) { const k = qKey(q); if (!correct) { BGX.study.miss(G.id, S.mode.id, k); (S.missKeys = S.missKeys || new Set()).add(k); }
      else if (!(S.missKeys && S.missKeys.has(k)) && (!q.c || q.si === q.c.steps.length - 1)) BGX.study.hit(G.id, S.mode.id, k, !!S.review); }
    S.f.reveal(S.mode, q, correct, el);
    BGX.reward(correct, el, { flash: view, milestoneTile: milestoneTile, xpScale: q.helped ? 0.5 : 1 });
    const sc = view.querySelector(".br-count"); if (sc) sc.innerHTML = countHTML(S.i + 1, S.qs.length);
    const pr = view.querySelector(".br-prompt");
    BGX.lastQuestion = { game: G.id, mode: S.mode.id, item: it.name || "", question: pr ? pr.innerText.replace(/\s+/g, " ").trim().slice(0, 240) : "", correct };
    $("#br-fb").innerHTML = (S.f.feedback ? S.f.feedback(S.mode, q, correct) : feedbackHTML(it, correct)) + `<button class="br-next" id="br-next">${S.i + 1 < S.qs.length ? "Next" : "See score"}</button>` + (BGX.community ? BGX.community.reportBtn() : "");
    const nx = $("#br-next"); nx.onclick = nextQ;
    dockFeedback($("#br-fb")); nx.focus({ preventScroll: true });
  }
  /* if the explanation would land below the screen, show it in a panel docked at the bottom instead of making the player scroll */
  function dockFeedback(fb) {
    if (!fb) return;
    const r = fb.getBoundingClientRect();
    if (r.bottom <= innerHeight - 8 && r.top >= 0) return;
    fb.classList.add("is-dock"); document.body.classList.add("br-hasdock");
  }
  const undock = () => document.body.classList.remove("br-hasdock");
  BGX.undock = undock;
  function feedbackHTML(it, correct) {
    const parts = (G.factLine || ["name"]).map((f, i) => i === 0 ? `<b>${esc(val(f, it))}</b>` : esc(val(f, it))).join(" · ");
    const pic = diagramSVG(it) || ((G.explore && (G.explore.pictures || []).indexOf("object") >= 0 && BGX.illus) ? BGX.illus.object(it) : "");
    const verdict = correct ? BGX.pick(["Correct!", "Spot on.", "Nailed it.", "Yes!"]) : "Not quite.";
    return `<span class="${correct ? "ok" : "no"}">${verdict}</span> ${parts}${it.life ? `<div class="br-fbpic">${pic}<span>${esc(it.life)}</span></div>` : ""}`;
  }
  /* Diagrams: engine/dg-*.js register BGX.DIAGRAMS[name] = (item|null) => "<svg…>".
     A game sets  diagram: "skeleton"  and each item an optional  spot  to highlight. */
  function diagramSVG(it) {
    const D = BGX.DIAGRAMS && G.diagram && BGX.DIAGRAMS[G.diagram];
    if (!D || (it && G.diagramNeedsSpot !== false && it.spot == null && !G.diagramPerItem)) return "";
    try { return D(it || null) || ""; } catch (e) { console.warn("diagram", e); return ""; }
  }
  BGX.diagramSVG = diagramSVG;
  function nextQ() { S.i++; if (S.i < S.qs.length) renderQ(); else finish(); }
  function milestoneTile(n) {
    const ms = G.milestone || {};
    const it = ms.field ? (G.items.find(x => x[ms.field] === Math.min(n, G.items.length)) || G.items[G.items.length - 1]) : G.items[(n - 1) % G.items.length];
    return { bg: catBg(it), corner: val(G.tile.corner, it), big: bigText(it), bigHTML: bigHTML(it), label: val(G.tile.label, it), text: ms.text ? fill(ms.text, it) : "" };
  }

  /* what to play next: the next activity in this game not yet passed, else the next chapter's game */
  function nextActivity(cur) {
    const P = BGX.progress;
    if (!P) return null;
    const g = P.gameState(G.id), todo = g.modes.filter(x => !x.ok && x.id !== cur.id);   // core activities not passed yet
    const ready = id => G.modes.find(x => x.id === id && x._ready);
    const pick = todo.map(x => ready(x.id)).find(Boolean);
    if (pick) return { mode: pick, label: `Next: ${pick.title}` };
    const f = P.findChapter(G.id), C = window.BGX_CATALOG;
    if (f && C && g.modes.every(x => x.ok || x.id === cur.id)) {
      const live = f.s.chapters.filter(c => c.status === "live" && c.url), i = live.indexOf(f.c), n = live[i + 1];
      if (n) return { url: BGX.root + n.url, label: `Next chapter: ${n.game}` };
    }
    const ex = (g.extras || []).filter(x => !x.ok && x.id !== cur.id).map(x => ready(x.id)).find(Boolean);
    if (ex && g.modes.every(x => x.ok || x.id === cur.id)) return { mode: ex, label: `Extra practice: ${ex.title}` };
    return null;
  }
  function finish(extra) {
    undock(); BGX.inRound = false;
    const m = S.mode, total = extra && extra.total || S.qs.length, review = !!S.review;
    const best = BGX.store.get("best_" + G.id, {}), k = m.id + S.set;
    /* a review round practises a handful of saved questions, so it doesn't change best scores or the pass mark */
    const isBest = !review && (best[k] == null || S.score > best[k]);
    if (isBest) { best[k] = S.score; BGX.store.set("best_" + G.id, best); }
    const prog = !review && BGX.progress && total > 0 ? BGX.progress.record(G.id, m.id, S.score, total) : null;
    BGX.lastRound = { mode: m, score: S.score, total };
    BGX.store.set("rounds", (BGX.store.get("rounds", 0) | 0) + 1);
    if (BGX.track) BGX.track("round_done", { game: G.id, mode: m.id, score: S.score, total, review });
    const day = BGX.study ? BGX.study.roundDone() : null;
    const dueLeft = BGX.study ? BGX.study.dueList().reduce((n, x) => n + x.n, 0) : 0;
    const again = S.wrong.length && BGX.study ? [...(S.missKeys || [])].filter(Boolean) : [];
    const msg = S.score === total ? "Perfect round!" : S.score >= total * .8 ? "Excellent work." : S.score >= total * .5 ? "Getting there." : "Keep practising — it sticks fast.";
    const setLabel = G.sets ? " · " + (G.sets.find(x => x.size == S.set) || {}).label : "";
    const roundXP = total >= 3 ? BGX.xp.add(BGX.xp.roundBonus(S.score === total)) : 0;
    const earned = Math.max(0, BGX.xp.total - (S.xpStart == null ? BGX.xp.total : S.xpStart)), lv = BGX.xp.level();
    const nx = review ? (dueLeft ? { url: BGX.root + "index.html#today", label: `Back to Today's review (${dueLeft} due)` } : null) : nextActivity(m);
    view.innerHTML = `<div class="br-end">${BGX.logo()}
      <p class="br-label">${review ? "Review · " : ""}${esc(m.title)}${esc(setLabel)}</p>
      <div class="br-score br-pop">${S.score}<span>/${total}</span></div>
      <p style="margin:0;font-weight:700">${msg}${isBest && S.score > 0 ? " New best!" : ""}</p>
      ${extra && extra.note ? `<p class="br-hint" style="margin:6px auto 0">${esc(extra.note)}</p>` : ""}
      ${earned ? `<button class="br-xpline" id="br-xpline" type="button" aria-label="+${earned} XP this round. See all levels">${BGX.levelBadge(lv)}<span><b>+${earned.toLocaleString("en-US")} XP</b> this round${roundXP ? ` <em>(incl. ${S.score === total ? "perfect-round" : "round"} bonus +${roundXP})</em>` : ""}
        <i class="bar"><i style="width:${lv.pct.toFixed(1)}%"></i></i><small>Lv ${lv.n} ${esc(lv.name)}${lv.next ? ` · ${(lv.next.xp - BGX.xp.total).toLocaleString("en-US")} XP to Lv ${lv.n + 1}` : ""}</small></span></button>` : ""}
      ${prog ? BGX.progress.endLine(G.id, m.id, S.score / total * 100) : ""}
      ${review ? `<p class="br-hint" style="margin:8px auto 0">A review round doesn't change your best score or pass mark. Questions you got right come back later; missed ones come back tomorrow.</p>` : ""}
      ${day ? `<button class="br-dayline" id="br-dayline" type="button"><span aria-hidden="true">🔥</span> <b>${day.streak}-day streak</b> · today ${Math.min(day.rounds, day.goal)}/${day.goal} round${day.goal > 1 ? "s" : ""}${day.rounds >= day.goal ? " ✓" : ""}</button>` : ""}
      <div class="br-btns br-endbtns">${nx ? `<${nx.url ? `a href="${esc(nx.url)}"` : "button"} class="br-next" id="br-nextact">${esc(nx.label)}</${nx.url ? "a" : "button"}><button class="br-ghost" id="br-again">Play again</button>` : `<button class="br-next" id="br-again">Play again</button>`}<button class="br-ghost" id="br-back">Menu</button></div>
      ${S.wrong.length ? `<p class="br-label" style="margin-top:22px">Review these</p>
        <div class="br-review">${S.wrong.map(it => tileHTML(it, "is-sm", `<em>${esc(val(G.tile.label, it))}</em>`)).join("")}</div>
        ${again.length ? `<div class="br-btns" style="justify-content:center;margin-top:10px"><button class="br-ghost" id="br-redo">Practise ${again.length === 1 ? "this one" : "these " + again.length} again now</button></div>
        <p class="br-hint" style="margin:6px auto 0">Saved to Today's review: they come back tomorrow, then after 3, 7, 14 and 30 days.</p>` : ""}` : ""}
      ${BGX.community ? BGX.community.endCard(G, m, S.score, total) : ""}</div>`;
    $("#br-again").onclick = () => start(m); $("#br-back").onclick = menu;
    const na = $("#br-nextact"); if (na && nx && nx.mode) na.onclick = () => start(nx.mode);
    if (na && BGX.track) na.addEventListener("click", () => BGX.track("next_activity", { game: G.id, from: m.id, to: nx.mode ? nx.mode.id : nx.url }));
    const xl = $("#br-xpline"); if (xl) xl.onclick = () => BGX.showLevels();
    const dl = $("#br-dayline"); if (dl) dl.onclick = () => BGX.study.openHabit();
    const rd = $("#br-redo"); if (rd) rd.onclick = () => { if (BGX.track) BGX.track("review_again", { game: G.id, mode: m.id, n: again.length }); start(m, { review: again }); };
    if (prog) { const pl = $("#br-progline"); if (pl) pl.onclick = () => BGX.progress.openChapterFor(G.id); setTimeout(() => BGX.progress.celebrate(prog), 900); }
    if (BGX.endRound) setTimeout(BGX.endRound, 600);
    if (S.score === total) { BGX.sfx.big(); BGX.rain(220); } else if (isBest && S.score > 0) { BGX.sfx.win(); BGX.rain(90); } else if (S.score >= total / 2) BGX.sfx.win();
  }

  /* ---------- distractors ---------- */
  function distractors(it, n, key, m) {
    /* an item can list answers that would also be right for it (alsoOk), so they are never offered as wrong options */
    const ok = new Set((it.alsoOk || []).map(String));
    const P = poolFor(m).filter(x => x !== it && !ok.has(String(x[key])));
    const near = P.filter(x => x.cat === it.cat || Math.abs(x._i - it._i) <= 3 || String(x[key])[0] === String(it[key])[0]);
    const out = [], seen = new Set([it[key]]);
    for (const x of BGX.shuffle(near).concat(BGX.shuffle(P))) { if (out.length >= n) break; if (!seen.has(x[key])) { seen.add(x[key]); out.push(x); } }
    return out;
  }

  /* ---------- format: Quick Quiz ---------- */
  BGX.formats.quiz = {
    scored: true,
    makeRound: m => BGX.shuffle(roundPool(m)).slice(0, ROUND).map(item => ({ item, opts: BGX.shuffle([item, ...distractors(item, 3, m.answer, m)]) })),
    prompt: (m, q) => {
      const it = q.item, p = `<div class="q">${esc(fill(m.prompt, it))}</div>`;
      if (m.showAs === "tile") return p + tileHTML(it, "br-pop");
      if (m.showAs === "mono") return p + `<div class="big mono">${esc(val(m.show, it))}</div>`;
      return p + `<div class="big${m.showAs === "text" ? " is-text" : ""}">${esc(val(m.show, it))}</div>` + (m.sub ? `<div class="sub">${esc(fill(m.sub, it))}</div>` : "");
    },
    body: (m, q) => `<div class="br-answers">${q.opts.map(o => `<button class="br-ans${m.answerAs === "symbol" ? " is-sym" : m.answerAs === "small" ? " is-small" : ""}" data-i="${o._i}">${esc(val(m.answer, o))}</button>`).join("")}</div>`,
    bind: (m, q, answer) => view.querySelectorAll(".br-ans").forEach(b => b.onclick = () => answer(+b.dataset.i === q.item._i, b)),
    reveal: (m, q, correct, el) => {
      view.querySelectorAll(".br-ans").forEach(b => { b.disabled = true; if (+b.dataset.i === q.item._i) b.classList.add("is-correct"); });
      if (!correct) el.classList.add("is-wrong");
    }
  };

  /* ---------- format: Sort It (pick the item's group) ---------- */
  BGX.formats.sortit = {
    scored: true,
    makeRound: m => BGX.shuffle(roundPool(m)).slice(0, ROUND).map(item => ({ item, opts: BGX.shuffle([item.cat, ...BGX.shuffle(G.categories.map(c => c.id).filter(c => c !== item.cat && (!m.only || m.only.indexOf(c) >= 0))).slice(0, (m.choices || 4) - 1)]) })),
    prompt: (m, q) => `<div class="q">${esc(m.prompt)}</div><div class="big${m.showAs === "text" ? " is-text" : ""}">${esc(q.item.name)}</div>` +
      (m.sub ? `<div class="sub">${esc(fill(m.sub, q.item))}</div>` : ""),
    body: (m, q) => `<div class="br-answers">${q.opts.map(c => `<button class="br-ans is-small" data-c="${c}">${esc(G.catMap[c].name)}</button>`).join("")}</div>`,
    bind: (m, q, answer) => view.querySelectorAll(".br-ans").forEach(b => b.onclick = () => answer(b.dataset.c === q.item.cat, b)),
    reveal: (m, q, correct, el) => {
      view.querySelectorAll(".br-ans").forEach(b => { b.disabled = true; if (b.dataset.c === q.item.cat) b.classList.add("is-correct"); });
      if (!correct) el.classList.add("is-wrong");
    }
  };

  /* ---------- map (shared by Find It and Card Explorer) ---------- */
  function mapHTML({ blank = false, dimBeyond = 0 } = {}) {
    const M = G.map, gap = M.gapAfterRow;
    const rowOf = r => gap != null && r >= gap ? r + 2 : r + 1;
    const cells = G.items.map(it => {
      const bg = blank ? `color-mix(in srgb,${catBg(it)} 55%,var(--blank))` : catBg(it);
      const dim = dimBeyond && it._i >= dimBeyond ? " is-dim" : "";
      return `<button class="br-cell${blank ? " is-blank" : ""}${dim}" data-i="${it._i}" style="grid-row:${rowOf(it.row)};grid-column:${it.col};background:${bg}" aria-label="${blank ? "Tile " + (it._i + 1) : esc(it.name)}">${blank ? "" : `<small>${esc(val(G.tile.corner, it))}</small>${bigHTML(it)}`}</button>`;
    });
    (M.placeholders || []).forEach(p => cells.push(`<div class="br-cell is-ph" style="grid-row:${rowOf(p.row)};grid-column:${p.col}">${esc(p.label)}</div>`));
    if (gap != null) cells.push(`<div class="br-gaprow" style="grid-row:${gap + 1}"></div>`);
    return `<div class="br-mapwrap"><div class="br-map" style="grid-template-columns:repeat(${M.cols},minmax(0,1fr))">${cells.join("")}</div></div>`;
  }
  function revealCell(cell, it, ok) {
    cell.classList.remove("is-blank"); cell.classList.add(ok ? "is-ok" : "is-no");
    cell.style.background = catBg(it); cell.innerHTML = `<small>${esc(val(G.tile.corner, it))}</small>${bigHTML(it)}`;
  }

  /* ---------- format: Find It ---------- */
  BGX.formats.findit = {
    scored: true,
    makeRound: m => BGX.shuffle(roundPool(m)).slice(0, ROUND).map(item => ({ item })),
    prompt: (m, q) => `<div class="q">${esc(m.prompt)}</div><div class="big">${esc(q.item.name)}${bigText(q.item) ? ` <span style="color:var(--muted)">(${esc(bigText(q.item))})</span>` : ""}</div>`,
    body: () => mapHTML({ blank: true }) + (G.map.tip ? `<p class="br-tip">${esc(G.map.tip)}</p>` : ""),
    bind: (m, q, answer) => view.querySelectorAll(".br-cell[data-i]").forEach(c => c.onclick = () => { S.picked = +c.dataset.i; answer(S.picked === q.item._i, c); }),
    reveal: (m, q, correct, el) => {
      revealCell(view.querySelector(`.br-cell[data-i="${q.item._i}"]`), q.item, true);
      if (!correct) revealCell(el, G.items[S.picked], false);
    }
  };

  /* ---------- format: Study notes ----------
     g.notes = { intro, sections: [{ cat, title?, about, tip }], outro? }. Each section lists its items with a one-line summary. */
  BGX.formats.notes = {
    open: m => {
      view.classList.remove("menu-in");
      const N = G.notes, line = it => it.summary || it.life || "";
      const keyField = G.notesFields || (G.factLine || []).slice(1).filter(f => f !== "{category}" && f !== "category");
      const secs = (N.sections || []).map(sec => {
        const c = G.catMap[sec.cat] || {}, its = G.items.filter(it => sec.cat && it.cat === sec.cat);
        return { sec, c, its, title: sec.title || c.name || "" };
      });
      const iconHTML = c => `<i style="background:var(--${c.color || "cat-mint"})">${c.icon && BGX.icon ? BGX.icon(c.icon) : ""}</i>`;
      const secBody = x => `<section class="br-note is-sheet">
          <h3>${iconHTML(x.c)}${esc(x.title)}</h3>
          <p>${esc(x.sec.about || "")}</p>
          ${x.sec.points && x.sec.points.length ? `<ul class="pts">${x.sec.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
          ${x.sec.tip ? `<p class="tip"><b>Memory tip</b> ${esc(x.sec.tip)}</p>` : ""}
          ${x.its.length ? `<p class="br-label" style="margin:16px 0 6px">${x.its.length} ${esc(G.itemNoun || "item")}${x.its.length > 1 ? "s" : ""} in this group</p><ul class="its">${x.its.map(it => `<li><b>${esc(it.name)}</b>${keyField.map(f => { const v = val(f, it); return v && v !== x.c.name ? ` <span class="k">${esc(v)}</span>` : ""; }).join("")}${line(it) ? ` — ${esc(line(it))}` : ""}</li>`).join("")}</ul>` : ""}
        </section>`;
      /* printable study guide: the whole chapter's notes, or one topic, with every card's key facts */
      const printBtn = (id, label) => `<button class="br-printbtn" type="button" id="${id}">${PRINT_ICON}<span>${label}</span></button>`;
      const guide = list => {
        const f = BGX.progress && BGX.progress.findChapter(G.id), who = (BGX.store.get("name", "") || "").trim();
        const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
        const whole = list.length === secs.length;
        return `<article class="br-guide">
          <header class="gh">${BGX.logo("glogo")}<div><p class="ey">BioglowRX Sciences Learning · Study notes</p>
            <h1>${esc(G.title)}${whole ? "" : `: ${esc(list[0].title)}`}</h1>
            <p class="meta">${f ? `${esc(f.s.name)} · ${esc(BGX.chLabel(f.c).replace(/^Ch\. /, "Chapter "))}: ${esc(f.c.title)}` : esc(G.tagline || "")}</p>
            <p class="meta">${who ? `${esc(who)} · ` : ""}Printed ${esc(date)}</p></div></header>
          ${whole && N.intro ? `<p class="gintro">${esc(N.intro)}</p>` : ""}
          ${whole && diagramSVG(null) ? `<figure class="gart">${diagramSVG(null)}</figure>` : ""}
          ${whole && list.length > 1 ? `<nav class="gtoc"><p class="lb">In these notes</p><ol>${list.map(x => `<li>${esc(x.title)}${x.its.length ? ` <small>(${x.its.length})</small>` : ""}</li>`).join("")}</ol></nav>` : ""}
          ${list.map((x, k) => `<section class="gsec">
            <h2><span class="n">${whole ? k + 1 : "•"}</span>${esc(x.title)}</h2>
            ${x.sec.about ? `<p>${esc(x.sec.about)}</p>` : ""}
            ${x.sec.points && x.sec.points.length ? `<ul class="gpts">${x.sec.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
            ${x.sec.tip ? `<p class="gtip"><b>Memory tip</b> ${esc(x.sec.tip)}</p>` : ""}
            ${x.its.length ? `<div class="gits">${x.its.map(it => `<div class="git"><h3>${esc(it.name)}${keyField.map(fl => { const v = val(fl, it); return v && v !== x.c.name ? ` <span class="k">${esc(v)}</span>` : ""; }).join("")}</h3>
              ${line(it) ? `<p>${esc(line(it))}</p>` : ""}
              ${it.facts && it.facts.length ? `<ul>${it.facts.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>` : ""}
          </section>`).join("")}
          ${whole && N.outro ? `<p class="gintro">${esc(N.outro)}</p>` : ""}
          <footer class="gf">BioglowRX Sciences Learning · free science games built from real course books · ${esc(G.title)}</footer></article>`;
      };
      const printGuide = list => { BGX.sfx.tap(); BGX.printDoc(guide(list), "notes"); };
      const first = t => { const m = String(t || "").match(/^.*?[.!?](\s|$)/); return m ? m[0] : String(t || ""); };
      view.innerHTML = `<div class="br-top"><button class="br-quit" id="br-quit" aria-label="Back to the game menu"><span aria-hidden="true">←</span> Menu</button><span class="br-label" style="margin:0">Study notes · ${esc(G.title)}</span>${printBtn("br-printall", "Print or save as PDF")}</div>
        <div class="br-notes">
          <div class="br-notesintro">${diagramSVG(null) ? `<div class="br-notesart" aria-hidden="true">${diagramSVG(null)}</div>` : ""}<p class="intro">${esc(N.intro || "")}</p></div>
          <p class="br-label" style="margin:16px 0 8px">${secs.length} topic${secs.length > 1 ? "s" : ""}: tap one to read it</p>
          <div class="br-notecards">${secs.map((x, i) => `<button class="br-notecard" type="button" data-s="${i}">${iconHTML(x.c)}<span><b>${esc(x.title)}</b><span class="l">${esc(first(x.sec.about))}</span>
            <small>${x.its.length ? `${x.its.length} ${esc(G.itemNoun || "item")}${x.its.length > 1 ? "s" : ""} · ` : ""}${x.sec.tip ? "memory tip" : "key points"}</small></span><span class="go" aria-hidden="true">›</span></button>`).join("")}</div>
          ${N.outro ? `<p class="intro">${esc(N.outro)}</p>` : ""}
          <div class="br-btns" style="margin-top:18px"><button class="br-next" id="br-play">I'm ready: choose a game</button>${printBtn("br-printall2", "Print all notes")}</div>
        </div>`;
      $("#br-quit").onclick = menu; $("#br-play").onclick = () => { BGX.sfx.tap(); menu(); window.scrollTo({ top: 0, behavior: BGX.RM ? "auto" : "smooth" }); };
      ["#br-printall", "#br-printall2"].forEach(q => { const b = $(q); if (b) b.onclick = () => printGuide(secs); });
      const sheetBody = k => secBody(secs[k]) + `<div class="br-btns" style="margin-top:14px;justify-content:flex-start">${printBtn("br-printone", "Print this topic")}${printBtn("br-printall3", "Print all notes")}</div>`;
      view.querySelectorAll("[data-s]").forEach(btn => btn.onclick = () => {
        BGX.sfx.tap(); const i = +btn.dataset.s;
        BGX.sheet({ label: "Study notes: " + secs[i].title, html: sheetBody(i), wide: true,
          nav: { count: secs.length, index: i, render: k => ({ html: sheetBody(k) }) },
          onOpen: (body, k) => { body.querySelector("#br-printone").onclick = () => printGuide([secs[k]]); body.querySelector("#br-printall3").onclick = () => printGuide(secs); } });
      });
      const got = BGX.xp.once("notes_" + G.id, 25);
      if (got) setTimeout(() => BGX.toast(`+${got} XP for opening the study notes`), 400);
    }
  };

  const PRINT_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z"/></svg>`;

  /* ---------- format: Card Explorer ---------- */
  BGX.formats.explorer = {
    open: m => {
      view.classList.remove("menu-in");
      const dim = G.sets && S.set < G.items.length ? S.set : 0;
      const items = G.map ? G.items : pool();
      // card layout: one titled group per family (category), in the game's category order; the map layout keeps its legend
      const groups = G.map ? [] : (G.categories || []).map(c => ({ c, its: items.filter(it => it.cat === c.id) })).filter(g => g.its.length);
      const loose = G.map ? [] : items.filter(it => !G.catMap[it.cat]);
      if (loose.length) groups.push({ c: { name: "Other", color: "cat-sand" }, its: loose });
      const list = G.map ? items : groups.reduce((a, g) => a.concat(g.its), []);
      const card = it => `<button class="br-cell br-card-tile" data-i="${it._i}" style="background:${catBg(it)}" aria-label="${esc(it.name)}"><small>${esc(val(G.tile.corner, it))}</small>${bigHTML(it)}<em>${esc(it.name)}</em></button>`;
      view.innerHTML = `<div class="br-top"><button class="br-quit" id="br-quit" aria-label="Back to the game menu"><span aria-hidden="true">←</span> Menu</button><span class="br-label" style="margin:0">Tap any ${esc(G.itemNoun || "card")} to open it</span></div>`
        + (G.map ? mapHTML({ dimBeyond: dim }) + `<div class="br-legend">${G.categories.map(c => `<span><i style="background:var(--${c.color})"></i>${esc(c.name)}</span>`).join("")}</div>`
          : groups.map(g => `<section class="br-group" aria-label="${esc(g.c.name)}">
              <h3 class="br-grouphead"><i style="background:var(--${g.c.color || "cat-mint"})">${g.c.icon ? BGX.icon(g.c.icon) : ""}</i><span>${esc(g.c.name)}</span><small>${g.its.length}</small></h3>
              <div class="br-cardlist">${g.its.map(card).join("")}</div></section>`).join(""));
      $("#br-quit").onclick = menu;
      view.querySelectorAll(".br-cell[data-i]").forEach(c => c.onclick = () => {
        BGX.sfx.tap();
        const it = G.items[+c.dataset.i], idx = Math.max(0, list.indexOf(it));
        BGX.sheet({ label: it.name, html: detailHTML(it), wide: true,
          nav: { count: list.length, index: idx, render: k => ({ html: detailHTML(list[k]) }) },
          onClose: k => { const cell = view.querySelector(`.br-cell[data-i="${list[k]._i}"]`); if (cell) cell.focus({ preventScroll: false }); } });
      });
    }
  };
  function detailHTML(it) {
    const pics = (G.explore && G.explore.pictures) || [], I = BGX.illus;
    const figs = pics.map(p => {
      if (p === "sample") { const k = I.lookOf(it)[0]; return `<figure>${I.sample(it)}<figcaption>${it.syn || k === "r" ? "Too rare or short-lived to see" : "What it looks like"}</figcaption></figure>`; }
      if (p === "object") return `<figure>${I.object(it)}<figcaption>Where you meet it: ${esc(I.objOf(it)[1])}</figcaption></figure>`;
      if (p === "shells") return `<figure>${I.shells(it)}<figcaption>Electron shells: ${I.shellCounts(it).join(" · ")}</figcaption></figure>`;
      return "";
    }).join("") + (diagramSVG(it) ? `<figure class="is-dg">${diagramSVG(it)}<figcaption>${esc(it.spotCaption || G.diagramCaption || "Where it is")}</figcaption></figure>` : "");
    return `<div class="br-detail">
      ${tileHTML(it, "is-md")}
      <div style="min-width:0"><h3>${esc(it.name)}</h3>
        <dl>${(G.detail || []).map(d => `<dt>${esc(d.label)}</dt><dd>${d.format === "config" ? confHTML(val(d.field, it)) : esc(val(d.field, it))}</dd>`).join("")}</dl></div></div>
      ${figs ? `<div class="br-pics">${figs}</div>` : ""}
      <div class="br-about">
        ${it.summary || it.discovered || it.nameFrom ? `<div class="sum"><p class="br-label">Quick summary</p>${it.summary ? `<p>${esc(it.summary)}</p>` : ""}
          ${it.discovered || it.nameFrom ? `<dl>${it.discovered ? `<dt>Discovered</dt><dd>${esc(it.discovered)}</dd>` : ""}${it.nameFrom ? `<dt>Name comes from</dt><dd>${esc(it.nameFrom)}</dd>` : ""}</dl>` : ""}</div>` : ""}
        ${it.facts && it.facts.length ? `<div class="facts"><p class="br-label">Key facts</p><ul>${it.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>` : ""}
        ${it.life ? `<div class="life"><p class="br-label">In everyday life</p><p>${esc(it.life)}</p></div>` : ""}
        ${it.link ? `<a class="more" href="${esc(it.link)}" target="_blank" rel="noopener">Read more on Wikipedia ↗</a>` : ""}
      </div>`;
  }

  /* ---------- format: Match Pairs ----------
     Two decks, each with its own colour back: the items (teal) and the clues (amber).
     A short preview shows every card first; you then flip one item and one clue. */
  BGX.formats.matchpairs = {
    scored: true,
    open: m => {
      const used = new Set();
      const want = reviewing(m) ? BGX.shuffle(roundPool(m).filter(it => it[m.clue])) : [];
      const items = want.concat(BGX.shuffle(poolFor(m).filter(it => it[m.clue] && want.indexOf(it) < 0))).filter(it => !used.has(it[m.clue]) && used.add(it[m.clue])).slice(0, reviewing(m) ? Math.max(4, Math.min(m.pairs || 8, want.length)) : m.pairs || 8);
      const n = items.length, noun = G.itemNoun || "item", clueL = m.clueLabel || "Clue";
      const itemCards = BGX.shuffle(items.map(it => ({ it, kind: "item" }))), clueCards = BGX.shuffle(items.map(it => ({ it, kind: "clue" })));
      const cards = itemCards.concat(clueCards);
      const peek = m.peek == null ? Math.min(6, 2 + Math.ceil(n / 2)) : m.peek;
      S = Object.assign(S, { screen: "game", mode: m, i: 0, score: 0, wrong: [], missKeys: new Set(), tries: 0, misses: 0, seen: new Set(), open: [], lock: true, found: 0, qs: items });
      const grid = (from, to) => `<div class="br-mgrid">${cards.slice(from, to).map((c, j) => `<button class="br-mc" data-k="${from + j}"></button>`).join("")}</div>`;
      view.innerHTML = topBar(n).replace(countHTML(S.i + 1, n), `<b>0</b> of ${n} pairs`) +
        `<div class="br-prompt"><div class="q" id="br-mphase">Memorise the cards</div>
          <div class="br-mhow">Each pair is one <span class="br-mkey is-item">${esc(noun)}</span> card and one <span class="br-mkey is-clue">${esc(clueL)}</span> card.</div></div>
        <p class="br-mrow"><span class="br-mkey is-item">${esc(noun)}s</span></p>${grid(0, n)}
        <p class="br-mrow"><span class="br-mkey is-clue">${esc(clueL)}</span></p>${grid(n, 2 * n)}
        <div class="br-feedback" id="br-fb" aria-live="polite"><div class="br-btns" style="justify-content:flex-start"><button class="br-next" id="br-ready">I'm ready (${peek})</button><button class="br-ghost" id="br-peekpause">Pause the timer</button></div></div>`;
      $("#br-quit").onclick = () => { clearInterval(S.peekTimer); menu(); };
      const btn = k => view.querySelector(`.br-mc[data-k="${k}"]`);
      const face = (b, c) => {
        if (c.kind === "item") {
          /* m.cardBig / m.cardCorner override the tile for this mode, so a card never shows its own answer (pH Patrol shows the pH on its tiles) */
          const big = m.cardBig ? (m.cardBig.indexOf("@icon:") === 0 ? BGX.icon(m.cardBig.slice(6)) : esc(val(m.cardBig, c.it))) : bigHTML(c.it);
          const corner = m.cardCorner === "" ? "" : esc(val(m.cardCorner || G.tile.corner, c.it));
          b.className = "br-mc item"; b.style.background = m.cardBig ? "" : catBg(c.it); if (m.cardBig) b.classList.add("is-plain");
          b.innerHTML = `<small>${corner}</small><b>${big}</b><em>${esc(val(G.tile.label, c.it))}</em>`; }
        else { b.className = "br-mc clue"; b.style.background = ""; b.innerHTML = `<small>${esc(clueL)}</small><span class="t${String(c.it[m.clue]).length > 22 ? " is-long" : ""}">${esc(c.it[m.clue])}</span>`; }
        b.setAttribute("aria-label", c.kind === "item" ? c.it.name : clueL + ": " + c.it[m.clue]);
      };
      const down = (b, c) => { b.className = "br-mc is-down " + (c.kind === "item" ? "back-item" : "back-clue"); b.style.background = ""; b.innerHTML = `<span class="q">?</span><em>${esc(c.kind === "item" ? noun : clueL)}</em>`; b.setAttribute("aria-label", "Face-down " + (c.kind === "item" ? noun : clueL) + " card"); };
      const lockKind = kind => cards.forEach((c, k) => { if (!c.done && c.kind === kind && !S.open.some(o => o.k === k)) btn(k).classList.add("is-locked"); });
      const unlock = () => view.querySelectorAll(".br-mc.is-locked").forEach(b => b.classList.remove("is-locked"));
      // preview: everything face up, then flip down
      cards.forEach((c, k) => face(btn(k), c));
      let left = peek;
      const startPlay = () => {
        clearInterval(S.peekTimer); if (!S.lock) return;
        cards.forEach((c, k) => down(btn(k), c)); S.lock = false; BGX.sfx.tap();
        $("#br-mphase").textContent = `Flip a ${noun} card, then find its ${clueL.toLowerCase()} card`;
        $("#br-fb").innerHTML = "";
      };
      $("#br-ready").onclick = startPlay;
      /* no time pressure for those who need it: the cards stay face up until "I'm ready" */
      $("#br-peekpause").onclick = () => { clearInterval(S.peekTimer); BGX.sfx.tap(); $("#br-ready").textContent = "I'm ready"; $("#br-peekpause").remove(); $("#br-ready").focus({ preventScroll: true }); };
      S.peekTimer = setInterval(() => { left--; const r = $("#br-ready"); if (r) r.textContent = `I'm ready (${left})`; if (left <= 0) startPlay(); }, 1000);
      cards.forEach((c, k) => btn(k).onclick = () => {
        const b = btn(k);
        if (S.lock || c.done || S.open.some(o => o.k === k) || b.classList.contains("is-locked")) return;
        BGX.sfx.tap(); face(b, c); S.open.push({ k, c, b });
        if (S.open.length === 1) { lockKind(c.kind); $("#br-fb").innerHTML = `Now find the matching <b>${esc(c.kind === "item" ? clueL.toLowerCase() : noun)}</b> card.`; return; }
        const [a, o] = S.open; S.tries++;
        const ok = a.c.it[m.clue] === o.c.it[m.clue];
        const known = S.seen.has(a.k) || S.seen.has(o.k);   // a miss only counts if you'd already seen one of the cards
        S.seen.add(a.k); S.seen.add(o.k);
        [a, o].forEach(x => { x.b.classList.add(ok ? "is-ok" : "is-no"); x.b.insertAdjacentHTML("beforeend", `<i class="bd${ok ? "" : " no"}">${ok ? "✓" : "✕"}</i>`); });
        if (ok || known) BGX.reward(ok, o.b, { flash: view, milestoneTile }); else BGX.sfx.no();
        const itemCard = a.c.kind === "item" ? a : o, clueCard = a.c.kind === "item" ? o : a;
        S.open = []; S.lock = true;
        if (ok) {
          S.found++; S.score++; a.c.done = o.c.done = true;
          $("#br-fb").innerHTML = `<span class="ok">Pair!</span> <b>${esc(itemCard.c.it.name)}</b> · ${esc(itemCard.c.it[m.clue])}`;
          view.querySelector(".br-bar i").style.width = (S.found / n * 100) + "%";
          view.querySelector(".br-count b").textContent = S.found;
          setTimeout(() => { [a, o].forEach(x => { x.b.classList.remove("is-ok"); x.b.classList.add("is-done"); x.b.style.background = ""; }); S.lock = false; unlock();
            if (S.found === n) { if (BGX.study) S.qs.forEach(it => { if (S.wrong.indexOf(it) < 0) BGX.study.hit(G.id, m.id, itemKey(it), !!S.review); }); S.score = Math.max(0, n - S.misses); finish({ total: n, note: `${n} pairs found in ${S.tries} tries. Only misses on cards you had already seen count against you.` }); } }, 800);
        } else {
          if (known && S.wrong.indexOf(itemCard.c.it) < 0) { S.wrong.push(itemCard.c.it); S.missKeys.add(itemKey(itemCard.c.it)); if (BGX.study) BGX.study.miss(G.id, m.id, itemKey(itemCard.c.it)); }
          $("#br-fb").innerHTML = `<span class="no">Not quite.</span> <b>${esc(itemCard.c.it.name)}</b> goes with “${esc(itemCard.c.it[m.clue])}”, and “${esc(clueCard.c.it[m.clue])}” belongs to another ${esc(noun)}.`;
          setTimeout(() => { down(a.b, a.c); down(o.b, o.c); S.lock = false; unlock(); }, 1600);
        }
      });
    }
  };

  /* ---------- format: Sequence (put steps in the right order) ----------
     Uses game.sequences: [{ title, steps: [...], note, icon }] */
  BGX.formats.sequence = {
    scored: true,
    makeRound: m => BGX.shuffle(rv(m, (G.sequences || []).filter(s => !m.only || m.only.indexOf(s.id) >= 0), s => "s:" + (s.id || s.title))).slice(0, m.rounds || 6)
      .map(s => ({ item: { name: s.title, life: s.note, icon: s.icon, cat: s.cat || (G.categories[0] || {}).id, num: "", seq: s }, steps: BGX.shuffle(s.steps.map((t, i) => ({ t, i }))), picked: [] })),
    prompt: (m, q) => `<div class="q">${esc(m.prompt || "Put these steps in order")}</div><div class="big is-text">${esc(q.item.name)}</div>`,
    body: (m, q) => `<ol class="br-seq" id="br-seq">${q.steps.map((_, i) => `<li class="br-slot" data-pos="${i}"><span class="n">${i + 1}</span><span class="t"></span></li>`).join("")}</ol>
      <p class="br-label" style="margin-top:16px">Tap the steps in order</p>
      <div class="br-pool" id="br-pool">${q.steps.map((s, j) => `<button class="br-step" data-j="${j}">${esc(s.t)}</button>`).join("")}</div>
      <div class="br-btns" style="margin-top:14px"><button class="br-ghost" id="br-undo" disabled>Undo</button><button class="br-next" id="br-check" disabled>Check order</button></div>`,
    bind: (m, q, answer) => {
      const paint = () => {
        view.querySelectorAll(".br-slot").forEach((li, i) => { const p = q.picked[i]; li.querySelector(".t").textContent = p != null ? q.steps[p].t : ""; li.classList.toggle("is-filled", p != null); });
        view.querySelectorAll(".br-step").forEach(b => b.classList.toggle("is-used", q.picked.indexOf(+b.dataset.j) >= 0));
        $("#br-check").disabled = q.picked.length < q.steps.length; $("#br-undo").disabled = !q.picked.length;
      };
      view.querySelectorAll(".br-step").forEach(b => b.onclick = () => { if (S.answered || b.classList.contains("is-used")) return; BGX.sfx.tap(); q.picked.push(+b.dataset.j); paint(); });
      view.querySelectorAll(".br-slot").forEach(li => li.onclick = () => { if (S.answered) return; const i = +li.dataset.pos; if (q.picked[i] == null) return; q.picked.splice(i); paint(); });
      $("#br-undo").onclick = () => { if (S.answered) return; q.picked.pop(); paint(); };
      $("#br-check").onclick = () => answer(q.picked.every((p, i) => q.steps[p].i === i), $("#br-check"));
    },
    reveal: (m, q, correct) => {
      view.querySelectorAll(".br-slot").forEach((li, i) => li.classList.add(q.steps[q.picked[i]].i === i ? "is-ok" : "is-no"));
      $("#br-check").disabled = true; $("#br-undo").disabled = true;
      if (!correct) $("#br-pool").outerHTML = `<div class="br-correct"><p class="br-label">Correct order</p><ol>${q.item.seq.steps.map(t => `<li>${esc(t)}</li>`).join("")}</ol></div>`;
      else $("#br-pool").remove();
    }
  };

  /* ---------- format: True or Myth ----------
     Items carry: claim, verdict (true/false), why. Labels can be renamed (e.g. "Trust signal" / "Red flag"). */
  BGX.formats.truemyth = {
    scored: true,
    makeRound: m => BGX.shuffle(roundPool(m)).slice(0, ROUND).map(item => ({ item })),
    prompt: (m, q) => `<div class="q">${esc(m.prompt || "True or myth?")}</div><div class="big is-text">${esc(q.item.claim)}</div>`,
    body: (m, q) => { const L = m.labels || ["True", "Myth"]; return `<div class="br-answers br-tm"><button class="br-ans is-true" data-v="1">✓ ${esc(L[0])}</button><button class="br-ans is-myth" data-v="0">✕ ${esc(L[1])}</button></div>`; },
    bind: (m, q, answer) => view.querySelectorAll(".br-ans").forEach(b => b.onclick = () => answer((b.dataset.v === "1") === !!q.item.verdict, b)),
    reveal: (m, q, correct, el) => {
      view.querySelectorAll(".br-ans").forEach(b => { b.disabled = true; if ((b.dataset.v === "1") === !!q.item.verdict) b.classList.add("is-correct"); });
      if (!correct) el.classList.add("is-wrong");
    }
  };

  /* ---------- format: Build It (set counts with steppers, e.g. protons / neutrons / electrons) ---------- */
  function atomSVG(p, nn, e) {
    const caps = [2, 8, 8, 18], sh = []; let left = e;
    for (const c of caps) { if (left <= 0) break; sh.push(Math.min(c, left)); left -= c; }
    let o = `<circle cx="90" cy="90" r="20" fill="var(--cat-coral)" stroke="var(--line)"/><text x="90" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="var(--tile-ink)" font-family="var(--font-mono)">${p}p</text><text x="90" y="99" text-anchor="middle" font-size="10" font-weight="700" fill="var(--tile-ink)" font-family="var(--font-mono)">${nn}n</text>`;
    sh.forEach((cnt, i) => { const r = 32 + i * 17; o += `<circle cx="90" cy="90" r="${r}" fill="none" stroke="var(--muted)" stroke-opacity=".45"/>`;
      for (let j = 0; j < cnt; j++) { const a = j / cnt * Math.PI * 2 - Math.PI / 2 + i * .4; o += `<circle cx="${(90 + Math.cos(a) * r).toFixed(1)}" cy="${(90 + Math.sin(a) * r).toFixed(1)}" r="3.4" fill="var(--accent)"/>`; } });
    return `<svg viewBox="0 0 180 180" class="br-atom" role="img" aria-label="Your atom: ${p} protons, ${nn} neutrons, ${e} electrons">${o}</svg>`;
  }
  /* parts: [{ label, field }] on the mode, or per item (item.parts: [{ label, value }]) when items differ, e.g. equation coefficients */
  const want = (p, it) => p.value != null ? +p.value : +it[p.field];
  BGX.formats.buildit = {
    scored: true,
    makeRound: m => BGX.shuffle(roundPool(m)).slice(0, ROUND).map(item => ({ item, parts: item.parts || m.parts, vals: (item.parts || m.parts).map(p => p.start || 0) })),
    prompt: (m, q) => `<div class="q">${esc(m.prompt || "Build")}</div><div class="big">${esc(q.item.name)}</div>${m.sub ? `<div class="sub">${esc(fill(m.sub, q.item))}</div>` : ""}`,
    body: (m, q) => `<div class="br-build">${m.draw === "atom" ? `<div class="br-atomwrap" id="br-atom">${atomSVG(q.vals[0], q.vals[1], q.vals[2])}</div>` : ""}
      <div class="br-steppers">${q.parts.map((p, i) => `<div class="br-stepper" data-p="${i}"><span class="lb">${esc(p.label)}</span>
        <button class="br-ghost minus" aria-label="Fewer ${esc(p.label)}">−</button><b class="v">${q.vals[i]}</b><button class="br-ghost plus" aria-label="More ${esc(p.label)}">+</button><span class="want"></span></div>`).join("")}</div></div>
      <div class="br-btns" style="margin-top:14px"><button class="br-next" id="br-check">Check</button></div>`,
    bind: (m, q, answer) => {
      const paint = () => {
        view.querySelectorAll(".br-stepper").forEach((s, i) => s.querySelector(".v").textContent = q.vals[i]);
        if (m.draw === "atom") $("#br-atom").innerHTML = atomSVG(q.vals[0], q.vals[1], q.vals[2]);
      };
      view.querySelectorAll(".br-stepper").forEach((s, i) => {
        const max = q.parts[i].max || 30;
        s.querySelector(".minus").onclick = () => { if (S.answered) return; q.vals[i] = Math.max(0, q.vals[i] - 1); BGX.sfx.tap(); paint(); };
        s.querySelector(".plus").onclick = () => { if (S.answered) return; q.vals[i] = Math.min(max, q.vals[i] + 1); BGX.sfx.tap(); paint(); };
      });
      $("#br-check").onclick = () => answer(q.parts.every((p, i) => q.vals[i] === want(p, q.item)), $("#br-check"));
    },
    reveal: (m, q) => {
      view.querySelectorAll(".br-stepper").forEach((s, i) => { const w = want(q.parts[i], q.item), ok = q.vals[i] === w;
        s.classList.add(ok ? "is-ok" : "is-no"); s.querySelector(".want").textContent = ok ? "✓" : "should be " + w; s.querySelectorAll("button").forEach(b => b.disabled = true); });
      $("#br-check").disabled = true;
    }
  };

  /* ---------- format: Case Files ----------
     game.cases: [{ id, title, cat, icon, who, story, data: [[label, value]], spot?, takeaway,
                    steps: [{ q, options: [...], answer: <index>, why }] }]
     Each case is a short patient story worked through in steps. Every step answered adds a line to the case file. */
  const caseItem = c => c._item || (c._item = { name: c.title, cat: c.cat, icon: c.icon, num: "", spot: c.spot, cell: c.cell, life: c.takeaway, _case: c, _i: -1 });
  const casePool = m => (G.cases || []).filter(c => !m.only || m.only.indexOf(c.cat) >= 0);
  BGX.formats.cases = {
    scored: true,
    roundSize: m => { const P = casePool(m); return Math.min(m.rounds || 3, P.length) * (P[0] ? P[0].steps.length : 3); },   // write every case with the same number of steps
    makeRound: m => {
      const qs = [];
      BGX.shuffle(rv(m, casePool(m), c => "c:" + (c.id || c.title))).slice(0, m.rounds || 3).forEach((c, ci) => c.steps.forEach((st, si) => {
        const order = BGX.shuffle(st.options.map((t, k) => k));
        qs.push({ item: caseItem(c), c, st, si, ci, order });
      }));
      return qs;
    },
    prompt: (m, q) => {
      const c = q.c, done = S.qs.filter(x => x.c === c && x.si < q.si);
      return `<div class="br-case${q.si === 0 ? " br-pop" : ""}">
        <div class="br-casehead"><span class="ic" style="background:${catBg(q.item)}">${BGX.icon(c.icon || catOf(q.item).icon || "clipboard")}</span>
          <div><p class="br-label">Case ${q.ci + 1} · ${esc(catOf(q.item).name)}</p><h3>${esc(c.title)}</h3></div></div>
        ${c.who ? `<p class="who">${esc(c.who)}</p>` : ""}
        <p class="story">${esc(c.story)}</p>
        ${c.data && c.data.length ? `<dl class="br-casedata">${c.data.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
        ${done.length ? `<ol class="br-casefound">${done.map(x => `<li><b>${esc(x.st.q)}</b> ${esc(x.st.options[x.st.answer])}</li>`).join("")}</ol>` : ""}
      </div>
      <div class="br-casestep"><span class="br-mkey is-item">Step ${q.si + 1} of ${c.steps.length}</span></div>
      <div class="big is-text br-caseq">${esc(q.st.q)}</div>`;
    },
    body: (m, q) => `<div class="br-answers br-caseans">${q.order.map(k => `<button class="br-ans is-small" data-k="${k}">${esc(q.st.options[k])}</button>`).join("")}</div>`,
    bind: (m, q, answer) => view.querySelectorAll(".br-ans").forEach(b => b.onclick = () => answer(+b.dataset.k === q.st.answer, b)),
    reveal: (m, q, correct, el) => {
      view.querySelectorAll(".br-ans").forEach(b => { b.disabled = true; if (+b.dataset.k === q.st.answer) b.classList.add("is-correct"); });
      if (!correct) el.classList.add("is-wrong");
    },
    feedback: (m, q, correct) => {
      const last = q.si === q.c.steps.length - 1, pic = last ? diagramSVG(q.item) : "";
      const verdict = correct ? BGX.pick(["Correct!", "Good call.", "Spot on.", "Yes!"]) : "Not quite.";
      return `<span class="${correct ? "ok" : "no"}">${verdict}</span> <b>${esc(q.st.options[q.st.answer])}</b>
        <div class="br-why">${esc(q.st.why || "")}</div>
        ${last && q.c.takeaway ? `<div class="br-fbpic">${pic}<span><b>Case closed.</b> ${esc(q.c.takeaway)}</span></div>` : ""}`;
    }
  };

  /* ---------- format: Calculator Challenge ----------
     game.problems: [{ id, cat, title, icon?, spot?, make?: () => ({...}), vars: { x: [list] | {min,max,step} }, derive?: v => ({...}),
                       ok?: v => bool, text: "…{x}…", answer: v => number, unit, dp (decimals), tol?,
                       steps: ["…{x}… = {answer}"], tip? }]
     mode: { rounds, only: [cats], help: true (a "Show me how" button), formula: true (show item formula chip) } */
  const nf = (x, dp) => typeof x === "number" ? (+x.toFixed(dp == null ? 4 : dp)).toLocaleString("en-US", { maximumFractionDigits: dp == null ? 4 : dp }) : x;
  /* medication answers never get a trailing zero (2 tablets, not 2.0: a dosing-safety rule); other subjects keep their decimals for significant figures */
  const nfd = (x, dp) => (+x.toFixed(dp || 0)).toLocaleString("en-US", { minimumFractionDigits: G && G.subject === "pharmacology" ? 0 : dp || 0, maximumFractionDigits: dp || 0 }).replace(/^-/, "−");   // answers keep their decimals: 0.80
  const roundTo = (x, dp) => Math.round(x * Math.pow(10, dp) + 1e-9) / Math.pow(10, dp);
  function makeVars(p) {
    for (let t = 0; t < 80; t++) {
      const v = p.make ? p.make() : {};
      Object.keys(p.vars || {}).forEach(k => {
        const d = p.vars[k];
        if (Array.isArray(d)) v[k] = BGX.pick(d);
        else { const n = Math.round((d.max - d.min) / (d.step || 1)); v[k] = roundTo(d.min + Math.floor(Math.random() * (n + 1)) * (d.step || 1), 6); }
      });
      Object.assign(v, p.derive ? p.derive(v) : {});
      const a = p.answer(v);
      if (isFinite(a) && (a > 0 || (p.signed && a !== 0)) && (!p.ok || p.ok(v, a))) { v.answer = a; return v; }
    }
    throw new Error("calculator: no valid numbers for " + p.id);
  }
  const ctext = (tpl, v, p) => esc(String(tpl)).replace(/\{(\w+)\}/g, (mm, k) => k === "answer" ? `<b>${nfd(roundTo(v.answer, p.dp || 0), p.dp)} ${esc(p.unit || "")}</b>` : (v[k] == null ? mm : nf(v[k])));
  const parseNum = s => { s = String(s).trim().replace(/\s/g, "").replace(/^[−–]/, "-"); if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, ""); else s = s.replace(",", "."); return s === "" || isNaN(+s) ? NaN : +s; };
  const calcPool = m => (G.problems || []).filter(p => !m.only || m.only.indexOf(p.cat) >= 0);
  const probItem = p => p._item || (p._item = { name: p.title, cat: p.cat, icon: p.icon, num: "", spot: p.spot, _i: -1 });
  BGX.formats.calculator = {
    scored: true,
    roundSize: m => m.rounds || 8,
    makeRound: m => {
      const P = rv(m, calcPool(m), p => "p:" + p.id), n = reviewing(m) && !S.reviewEmpty ? Math.min(m.rounds || 8, P.length) : m.rounds || 8, out = [];
      let bag = [];
      while (out.length < n) { if (!bag.length) bag = BGX.shuffle(P.slice()); const p = bag.pop(); out.push({ item: probItem(p), p, v: makeVars(p) }); }
      return out;
    },
    prompt: (m, q) => {
      const p = q.p, it = G.items.find(x => x.cat === p.cat && x.formula);
      return `<div class="br-case br-calc">
        <div class="br-casehead"><span class="ic" style="background:${catBg(q.item)}">${BGX.icon(p.icon || catOf(q.item).icon || "scale")}</span>
          <div><p class="br-label">${esc(catOf(q.item).name)}</p><h3>${esc(p.title)}</h3></div></div>
        <p class="story">${ctext(p.text, q.v, p)}</p>
        ${m.formula && (p.formula || it) ? `<p class="br-formula"><span>Use</span> ${esc(p.formula || it.formula)}</p>` : ""}
      </div>`;
    },
    body: (m, q) => `<div class="br-calcin">
        <label for="br-num" class="br-label">Your answer${q.p.dp ? ` (to ${q.p.dp} decimal place${q.p.dp > 1 ? "s" : ""})` : " (whole number)"}</label>
        <div class="row"><input id="br-num" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="0"><span class="unit">${esc(q.p.unit || "")}</span></div>
        <div class="br-btns"><button class="br-ghost" id="br-how"${m.help ? "" : " hidden"}>Show me how</button><button class="br-next" id="br-check" disabled>Check</button></div>
        <div id="br-howbox"></div></div>`,
    bind: (m, q, answer) => {
      const inp = $("#br-num"), chk = $("#br-check");
      inp.oninput = () => { chk.disabled = isNaN(parseNum(inp.value)); };
      const go = () => {
        const x = parseNum(inp.value); if (isNaN(x) || S.answered) return;
        const want = roundTo(q.v.answer, q.p.dp || 0), tol = q.p.tol != null ? q.p.tol : 0;
        q.given = x;
        inp.blur();
        answer(roundTo(x, q.p.dp || 0) === want || Math.abs(x - q.v.answer) <= tol + 1e-9, chk);
      };
      chk.onclick = go;
      inp.onkeydown = ev => { if (ev.key === "Enter") { ev.preventDefault(); ev.stopPropagation(); go(); } };
      const how = $("#br-how");
      if (how) how.onclick = () => {
        BGX.sfx.tap(); q.helped = true; how.disabled = true;
        const steps = q.p.steps.slice(0, -1);
        $("#br-howbox").innerHTML = `<div class="br-correct"><p class="br-label">How to work it out</p><ol>${steps.map(t => `<li>${ctext(t, q.v, q.p)}</li>`).join("")}<li>Now do the last step yourself.</li></ol>${q.p.tip ? `<p class="br-tipline">${esc(q.p.tip)}</p>` : ""}</div>`;
      };
      if (matchMedia("(pointer:fine)").matches) inp.focus({ preventScroll: true });
    },
    reveal: (m, q, correct) => {
      const inp = $("#br-num"); inp.disabled = true; inp.classList.add(correct ? "is-ok" : "is-no");
      $("#br-check").disabled = true; const h = $("#br-how"); if (h) h.remove(); $("#br-howbox").innerHTML = "";
    },
    feedback: (m, q, correct) => {
      const p = q.p, v = q.v, x = q.given, a = v.answer;
      let nudge = "";
      if (!correct) {
        const near = r => Math.abs(x - a * r) <= Math.max(Math.abs(a * r) * 0.01, 0.5 * Math.pow(10, -(p.dp || 0)));
        if (near(1000) || near(0.001)) nudge = "You're out by 1,000: check the unit conversion (" + (p.thousand || G.thousand || "× or ÷ 1,000: g ↔ mg ↔ mcg, L ↔ mL, J ↔ kJ") + ").";
        else if (p.signed && near(-1)) nudge = "Right size, wrong sign: check whether the answer should be negative.";
        else if (near(10) || near(0.1) || near(100) || near(0.01)) nudge = "Your answer is off by a power of ten: check the decimal point.";
        else if (p.hint) nudge = p.hint(v, x) || "";
      }
      const verdict = correct ? BGX.pick(["Correct!", "Spot on.", "Nailed it.", "Yes!"]) + (q.helped ? " (with help)" : "") : `Not quite: you said ${nf(x)} ${esc(p.unit || "")}.`;
      return `<span class="${correct ? "ok" : "no"}">${verdict}</span> Answer: <b>${nfd(roundTo(a, p.dp || 0), p.dp)} ${esc(p.unit || "")}</b>
        ${nudge ? `<div class="br-why">${esc(nudge)}</div>` : ""}
        <div class="br-correct br-worked"><p class="br-label">Worked answer</p><ol>${p.steps.map(t => `<li>${ctext(t, v, p)}</li>`).join("")}</ol>${p.tip ? `<p class="br-tipline">${esc(p.tip)}</p>` : ""}</div>`;
    }
  };
  BGX.calc = { makeVars, parseNum, roundTo };
  BGX.testState = () => S;   // read-only peek for automated play-through tests
})();
