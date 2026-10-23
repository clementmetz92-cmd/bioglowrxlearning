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
  const tileHTML = (it, cls = "", extra = "") => {
    const t = G.tile;
    return `<div class="br-tile ${cls}" style="background:${catBg(it)}"><small>${esc(val(t.corner, it))}</small><b>${esc(val(t.big, it))}</b>${extra}</div>`;
  };
  BGX.fill = fill;

  /* ---------- registration ---------- */
  BGX.formats = {};
  BGX.registerGame = g => {
    G = BGX.game = g;
    g.catMap = {}; (g.categories || []).forEach(c => g.catMap[c.id] = c);
    g.items.forEach((it, i) => { if (it.num == null) it.num = i + 1; it._i = i; });
    g.byNum = n => g.items.find(it => it.num === n);
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
    document.addEventListener("keydown", ev => {
      if (S.screen !== "game" || document.querySelector(".br-milestone")) return;
      if (S.answered && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); nextQ(); return; }
      const n = "1234".indexOf(ev.key), b = view.querySelectorAll(".br-ans")[n];
      if (n >= 0 && b && !S.answered) b.click();
    });
  }

  /* ---------- menu ---------- */
  function menu() {
    S.screen = "menu";
    const best = BGX.store.get("best_" + G.id, {});
    const subj = G.subject ? `<a class="br-crumb" href="${BGX.root}subjects/${G.subject}/index.html">← ${esc(G.subjectName || G.subject.charAt(0).toUpperCase() + G.subject.slice(1))}</a>` : "";
    view.innerHTML = `
      <div class="br-hero"><h2>${esc(G.title)}</h2><p>${esc(G.tagline || "")}</p></div>
      ${G.sets ? `<p class="br-label">Practise with</p>
      <div class="br-seg" role="group" aria-label="${esc(G.itemNoun || "item")}s to practise">${G.sets.map(x => `<button data-set="${x.size}" aria-pressed="${S.set == x.size}">${esc(x.label)}</button>`).join("")}</div>` : ""}
      ${G.hint ? `<p class="br-hint">${esc(G.hint)}</p>` : ""}
      <p class="br-label" style="margin-top:22px">Choose a game</p>
      <div class="br-modes">${G.modes.map(m => `<button class="br-mode${m._ready ? "" : " is-soon"}" data-mode="${m.id}"${m._ready ? "" : ' aria-disabled="true"'}>
        <span class="ic" style="background:var(--${m.color || "cat-mint"})">${esc(m.icon || "")}</span>
        <span><h3>${esc(m.title)}</h3><p>${esc(m.desc || "")}</p>${!m._ready ? '<span class="best">Coming soon</span>' : (best[m.id + S.set] != null && BGX.formats[m.format].scored ? `<span class="best">Best: ${best[m.id + S.set]}/${roundSize(m)}</span>` : "")}</span></button>`).join("")}</div>
      <p class="br-hint" style="margin-top:16px">${subj}</p>`;
    view.classList.remove("menu-in"); void view.offsetWidth; view.classList.add("menu-in");
    view.querySelectorAll("[data-set]").forEach(b => b.onclick = () => { BGX.sfx.tap(); S.set = +b.dataset.set; BGX.store.set("set_" + G.id, S.set); menu(); });
    view.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { const m = G.modes.find(x => x.id === b.dataset.mode); if (m._ready) start(m); });
  }
  const roundSize = m => m.format === "matchpairs" ? (m.pairs || 8) : ROUND;

  /* ---------- round runner (question formats) ---------- */
  function start(mode) {
    BGX.sfx.tap();
    const f = BGX.formats[mode.format];
    if (f.open) { S.screen = mode.format; S.mode = mode; f.open(mode); return; }
    S = Object.assign(S, { screen: "game", mode, f, i: 0, score: 0, wrong: [], answered: false });
    S.qs = f.makeRound(mode);
    renderQ();
  }
  function topBar(total) {
    return `<div class="br-top"><button class="br-quit" id="br-quit">✕ Menu</button>
      <div class="br-bar" aria-hidden="true"><i style="width:${S.i / total * 100}%"></i></div>
      <span class="br-count"><b>${S.score}</b> / ${S.i}</span></div>`;
  }
  function renderQ() {
    view.classList.remove("menu-in");
    const q = S.qs[S.i];
    view.innerHTML = topBar(S.qs.length) + `<div class="br-prompt">${S.f.prompt(S.mode, q)}</div>` + S.f.body(S.mode, q) + `<div class="br-feedback" id="br-fb" aria-live="polite"></div>`;
    $("#br-quit").onclick = menu;
    S.answered = false;
    S.f.bind(S.mode, q, answer);
  }
  function answer(correct, el, target) {
    if (S.answered) return; S.answered = true;
    const q = S.qs[S.i], it = q.item;
    if (correct) S.score++; else S.wrong.push(it);
    S.f.reveal(S.mode, q, correct, el);
    BGX.reward(correct, el, { flash: view, milestoneTile: milestoneTile });
    const sc = view.querySelector(".br-count b"); if (sc) { sc.textContent = S.score; }
    $("#br-fb").innerHTML = feedbackHTML(it, correct) + `<button class="br-next" id="br-next">${S.i + 1 < S.qs.length ? "Next" : "See score"}</button>`;
    const nx = $("#br-next"); nx.focus({ preventScroll: true }); nx.onclick = nextQ;
  }
  function feedbackHTML(it, correct) {
    const parts = (G.factLine || ["name"]).map((f, i) => i === 0 ? `<b>${esc(val(f, it))}</b>` : esc(val(f, it))).join(" · ");
    const pic = (G.explore && (G.explore.pictures || []).indexOf("object") >= 0 && BGX.illus) ? BGX.illus.object(it) : "";
    const verdict = correct ? BGX.pick(["Correct!", "Spot on.", "Nailed it.", "Yes!"]) : "Not quite.";
    return `<span class="${correct ? "ok" : "no"}">${verdict}</span> ${parts}${it.life ? `<div class="br-fbpic">${pic}<span>${esc(it.life)}</span></div>` : ""}`;
  }
  function nextQ() { S.i++; if (S.i < S.qs.length) renderQ(); else finish(); }
  function milestoneTile(n) {
    const ms = G.milestone || {};
    const it = ms.field ? (G.items.find(x => x[ms.field] === Math.min(n, G.items.length)) || G.items[G.items.length - 1]) : G.items[(n - 1) % G.items.length];
    return { bg: catBg(it), corner: val(G.tile.corner, it), big: val(G.tile.big, it), label: val(G.tile.label, it), text: ms.text ? fill(ms.text, it) : "" };
  }

  function finish(extra) {
    const m = S.mode, total = extra && extra.total || S.qs.length;
    const best = BGX.store.get("best_" + G.id, {}), k = m.id + S.set;
    const isBest = best[k] == null || S.score > best[k];
    if (isBest) { best[k] = S.score; BGX.store.set("best_" + G.id, best); }
    const msg = S.score === total ? "Perfect round!" : S.score >= total * .8 ? "Excellent work." : S.score >= total * .5 ? "Getting there." : "Keep practising — it sticks fast.";
    const setLabel = G.sets ? " · " + (G.sets.find(x => x.size == S.set) || {}).label : "";
    view.innerHTML = `<div class="br-end">${BGX.logo()}
      <p class="br-label">${esc(m.title)}${esc(setLabel)}</p>
      <div class="br-score br-pop">${S.score}<span>/${total}</span></div>
      <p style="margin:0;font-weight:700">${msg}${isBest && S.score > 0 ? " New best!" : ""}</p>
      ${extra && extra.note ? `<p class="br-hint" style="margin:6px auto 0">${esc(extra.note)}</p>` : ""}
      ${S.wrong.length ? `<p class="br-label" style="margin-top:22px">Review these</p>
        <div class="br-review">${S.wrong.map(it => tileHTML(it, "is-sm", `<em>${esc(val(G.tile.label, it))}</em>`)).join("")}</div>` : ""}
      <div class="br-btns"><button class="br-next" id="br-again">Play again</button><button class="br-ghost" id="br-back">Menu</button></div></div>`;
    $("#br-again").onclick = () => start(m); $("#br-back").onclick = menu;
    if (S.score === total) { BGX.sfx.big(); BGX.rain(220); } else if (isBest && S.score > 0) { BGX.sfx.win(); BGX.rain(90); } else if (S.score >= total / 2) BGX.sfx.win();
  }

  /* ---------- distractors ---------- */
  function distractors(it, n, key) {
    const P = pool().filter(x => x !== it);
    const near = P.filter(x => x.cat === it.cat || Math.abs(x._i - it._i) <= 3 || String(x[key])[0] === String(it[key])[0]);
    const out = [], seen = new Set([it[key]]);
    for (const x of BGX.shuffle(near).concat(BGX.shuffle(P))) { if (out.length >= n) break; if (!seen.has(x[key])) { seen.add(x[key]); out.push(x); } }
    return out;
  }

  /* ---------- format: Quick Quiz ---------- */
  BGX.formats.quiz = {
    scored: true,
    makeRound: m => BGX.shuffle(pool()).slice(0, ROUND).map(item => ({ item, opts: BGX.shuffle([item, ...distractors(item, 3, m.answer)]) })),
    prompt: (m, q) => {
      const it = q.item, p = `<div class="q">${esc(fill(m.prompt, it))}</div>`;
      if (m.showAs === "tile") return p + tileHTML(it, "br-pop");
      if (m.showAs === "mono") return p + `<div class="big mono">${esc(val(m.show, it))}</div>`;
      return p + `<div class="big">${esc(val(m.show, it))}</div>` + (m.sub ? `<div class="sub">${esc(fill(m.sub, it))}</div>` : "");
    },
    body: (m, q) => `<div class="br-answers">${q.opts.map(o => `<button class="br-ans${m.answerAs === "symbol" ? " is-sym" : ""}" data-i="${o._i}">${esc(val(m.answer, o))}</button>`).join("")}</div>`,
    bind: (m, q, answer) => view.querySelectorAll(".br-ans").forEach(b => b.onclick = () => answer(+b.dataset.i === q.item._i, b)),
    reveal: (m, q, correct, el) => {
      view.querySelectorAll(".br-ans").forEach(b => { b.disabled = true; if (+b.dataset.i === q.item._i) b.classList.add("is-correct"); });
      if (!correct) el.classList.add("is-wrong");
    }
  };

  /* ---------- format: Sort It (pick the item's group) ---------- */
  BGX.formats.sortit = {
    scored: true,
    makeRound: m => BGX.shuffle(pool()).slice(0, ROUND).map(item => ({ item, opts: BGX.shuffle([item.cat, ...BGX.shuffle(G.categories.map(c => c.id).filter(c => c !== item.cat)).slice(0, 3)]) })),
    prompt: (m, q) => `<div class="q">${esc(m.prompt)}</div><div class="big">${esc(q.item.name)}</div>` +
      (G.tile ? `<div class="sub">${esc(val(G.tile.big, q.item))} · ${esc(G.itemNoun === "element" ? "atomic number " + q.item.num : "No. " + q.item.num)}</div>` : ""),
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
      return `<button class="br-cell${blank ? " is-blank" : ""}${dim}" data-i="${it._i}" style="grid-row:${rowOf(it.row)};grid-column:${it.col};background:${bg}" aria-label="${blank ? "Tile " + (it._i + 1) : esc(it.name)}">${blank ? "" : `<small>${esc(val(G.tile.corner, it))}</small>${esc(val(G.tile.big, it))}`}</button>`;
    });
    (M.placeholders || []).forEach(p => cells.push(`<div class="br-cell is-ph" style="grid-row:${rowOf(p.row)};grid-column:${p.col}">${esc(p.label)}</div>`));
    if (gap != null) cells.push(`<div class="br-gaprow" style="grid-row:${gap + 1}"></div>`);
    return `<div class="br-mapwrap"><div class="br-map" style="grid-template-columns:repeat(${M.cols},minmax(0,1fr))">${cells.join("")}</div></div>`;
  }
  function revealCell(cell, it, ok) {
    cell.classList.remove("is-blank"); cell.classList.add(ok ? "is-ok" : "is-no");
    cell.style.background = catBg(it); cell.innerHTML = `<small>${esc(val(G.tile.corner, it))}</small>${esc(val(G.tile.big, it))}`;
  }

  /* ---------- format: Find It ---------- */
  BGX.formats.findit = {
    scored: true,
    makeRound: m => BGX.shuffle(pool()).slice(0, ROUND).map(item => ({ item })),
    prompt: (m, q) => `<div class="q">${esc(m.prompt)}</div><div class="big">${esc(q.item.name)} <span style="color:var(--muted)">(${esc(val(G.tile.big, q.item))})</span></div>`,
    body: () => mapHTML({ blank: true }) + (G.map.tip ? `<p class="br-tip">${esc(G.map.tip)}</p>` : ""),
    bind: (m, q, answer) => view.querySelectorAll(".br-cell[data-i]").forEach(c => c.onclick = () => { S.picked = +c.dataset.i; answer(S.picked === q.item._i, c); }),
    reveal: (m, q, correct, el) => {
      revealCell(view.querySelector(`.br-cell[data-i="${q.item._i}"]`), q.item, true);
      if (!correct) revealCell(el, G.items[S.picked], false);
    }
  };

  /* ---------- format: Card Explorer ---------- */
  BGX.formats.explorer = {
    open: m => {
      view.classList.remove("menu-in");
      const dim = G.sets && S.set < G.items.length ? S.set : 0;
      view.innerHTML = `<div class="br-top"><button class="br-quit" id="br-quit">✕ Menu</button><span class="br-label" style="margin:0">Tap any ${esc(G.itemNoun || "card")}</span></div>`
        + (G.map ? mapHTML({ dimBeyond: dim }) : `<div class="br-cardlist">${pool().map(it => `<button class="br-cell" data-i="${it._i}" style="background:${catBg(it)}"><small>${esc(val(G.tile.corner, it))}</small>${esc(val(G.tile.big, it))}</button>`).join("")}</div>`)
        + `<div class="br-legend">${G.categories.map(c => `<span><i style="background:var(--${c.color})"></i>${esc(c.name)}</span>`).join("")}</div><div id="br-detail"></div>`;
      $("#br-quit").onclick = menu;
      view.querySelectorAll(".br-cell[data-i]").forEach(c => c.onclick = () => { BGX.sfx.tap(); detail(G.items[+c.dataset.i]); if (innerWidth < 700) $("#br-detail").scrollIntoView({ behavior: "smooth", block: "nearest" }); });
      const st = G.explore && G.explore.start != null ? G.items.find(x => x.num === G.explore.start) : null;
      detail(st || G.items[0]);
    }
  };
  function detail(it) {
    const pics = (G.explore && G.explore.pictures) || [], I = BGX.illus;
    const figs = pics.map(p => {
      if (p === "sample") { const k = I.lookOf(it)[0]; return `<figure>${I.sample(it)}<figcaption>${it.syn || k === "r" ? "Too rare or short-lived to see" : "What it looks like"}</figcaption></figure>`; }
      if (p === "object") return `<figure>${I.object(it)}<figcaption>Where you meet it: ${esc(I.objOf(it)[1])}</figcaption></figure>`;
      if (p === "shells") return `<figure>${I.shells(it)}<figcaption>Electron shells: ${I.shellCounts(it).join(" · ")}</figcaption></figure>`;
      return "";
    }).join("");
    $("#br-detail").innerHTML = `<div class="br-detail br-pop">
      ${tileHTML(it, "is-md")}
      <div style="min-width:0"><h3>${esc(it.name)}</h3>
        <dl>${(G.detail || []).map(d => `<dt>${esc(d.label)}</dt><dd>${d.format === "config" ? confHTML(val(d.field, it)) : esc(val(d.field, it))}</dd>`).join("")}</dl></div></div>
      ${figs ? `<div class="br-pics br-pop">${figs}</div>` : ""}
      <div class="br-about br-pop">
        <div class="sum"><p class="br-label">Quick summary</p><p>${esc(it.summary || "")}</p>
          ${it.discovered || it.nameFrom ? `<dl>${it.discovered ? `<dt>Discovered</dt><dd>${esc(it.discovered)}</dd>` : ""}${it.nameFrom ? `<dt>Name comes from</dt><dd>${esc(it.nameFrom)}</dd>` : ""}</dl>` : ""}</div>
        ${it.life ? `<div class="life"><p class="br-label">In everyday life</p><p>${esc(it.life)}</p></div>` : ""}
        ${it.link ? `<a class="more" href="${esc(it.link)}" target="_blank" rel="noopener">Read more on Wikipedia ↗</a>` : ""}
      </div>`;
  }

  /* ---------- format: Match Pairs ---------- */
  BGX.formats.matchpairs = {
    scored: true,
    open: m => {
      const n = m.pairs || 8, items = BGX.shuffle(pool().filter(it => it[m.clue])).slice(0, n);
      const cards = BGX.shuffle(items.flatMap(it => [{ it, kind: "item" }, { it, kind: "clue" }]));
      S = Object.assign(S, { screen: "game", mode: m, i: 0, score: 0, wrong: [], tries: 0, misses: 0, seen: new Set(), open: [], lock: false, found: 0, qs: items });
      view.innerHTML = topBar(n).replace(`<b>${S.score}</b> / ${S.i}`, `<b>0</b> / ${n}`) +
        `<div class="br-prompt"><div class="q">${esc(m.prompt || "Flip two cards to make a pair")}</div></div>
        <div class="br-mgrid">${cards.map((c, k) => `<button class="br-mc is-down" data-k="${k}" aria-label="Face-down card"><span class="q">?</span></button>`).join("")}</div>
        <div class="br-feedback" id="br-fb" aria-live="polite"></div>`;
      $("#br-quit").onclick = menu;
      const face = (btn, c) => {
        btn.classList.remove("is-down");
        if (c.kind === "item") { btn.className = "br-mc item"; btn.style.background = catBg(c.it); btn.innerHTML = `<small>${esc(val(G.tile.corner, c.it))}</small><b>${esc(val(G.tile.big, c.it))}</b><em>${esc(val(G.tile.label, c.it))}</em>`; }
        else { btn.className = "br-mc clue"; btn.style.background = ""; btn.innerHTML = `<small>${esc(m.clueLabel || "Clue")}</small><span class="t">${esc(c.it[m.clue])}</span>`; }
        btn.setAttribute("aria-label", c.kind === "item" ? c.it.name : c.it[m.clue]);
      };
      const down = btn => { btn.className = "br-mc is-down"; btn.style.background = ""; btn.innerHTML = '<span class="q">?</span>'; btn.setAttribute("aria-label", "Face-down card"); };
      view.querySelectorAll(".br-mc").forEach(btn => btn.onclick = () => {
        const k = +btn.dataset.k, c = cards[k];
        if (S.lock || c.done || S.open.some(o => o.k === k)) return;
        BGX.sfx.tap(); face(btn, c); S.open.push({ k, c, btn });
        if (S.open.length < 2) return;
        const [a, b] = S.open; S.tries++;
        const ok = a.c.it === b.c.it && a.c.kind !== b.c.kind;
        const known = S.seen.has(a.k) || S.seen.has(b.k);   // a miss only counts if you'd already seen one of the cards
        S.seen.add(a.k); S.seen.add(b.k);
        [a, b].forEach(o => { o.btn.classList.add(ok ? "is-ok" : "is-no"); o.btn.insertAdjacentHTML("beforeend", `<i class="bd${ok ? "" : " no"}">${ok ? "✓" : "✕"}</i>`); });
        if (ok || known) BGX.reward(ok, b.btn, { flash: view, milestoneTile }); else BGX.sfx.no();
        const it = a.c.kind === "item" ? a.c.it : b.c.it;
        if (ok) {
          S.found++; S.score++; a.c.done = b.c.done = true;
          $("#br-fb").innerHTML = `<span class="ok">Pair!</span> <b>${esc(it.name)}</b> · ${esc(it[m.clue])}`;
          const bar = view.querySelector(".br-bar i"); bar.style.width = (S.found / n * 100) + "%";
          view.querySelector(".br-count b").textContent = S.found;
          S.open = []; S.lock = true;
          setTimeout(() => { [a, b].forEach(o => { o.btn.classList.remove("is-ok"); o.btn.classList.add("is-done"); o.btn.style.background = ""; }); S.lock = false;
            if (S.found === n) { S.score = Math.max(0, n - S.misses); finish({ total: n, note: `${n} pairs found in ${S.tries} tries. Only misses on cards you had already seen count against you.` }); } }, 800);
        } else {
          if (known) { S.misses++; if (S.wrong.indexOf(it) < 0) S.wrong.push(it); }
          $("#br-fb").innerHTML = a.c.kind === b.c.kind
            ? `<span class="no">Not quite.</span> Pair each ${esc(G.itemNoun || "card")} with its ${esc((m.clueLabel || "clue").toLowerCase())} card.`
            : `<span class="no">Not quite.</span> <b>${esc(it.name)}</b> doesn't go with that card.`;
          S.lock = true;
          setTimeout(() => { [a, b].forEach(o => down(o.btn)); S.open = []; S.lock = false; }, 1200);
        }
      });
    }
  };

  /* ---------- formats planned in the platform plan (not built yet) ---------- */
  ["sequence", "cases", "truemyth", "buildit", "calculator"].forEach(f => BGX.formats[f] = { soon: true });
})();
