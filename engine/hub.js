/* BioglowRX — hub home page and subject pages, drawn from data/catalog.js.
   <body data-page="hub"> or <body data-page="subject" data-subject="anatomy"> */
(function () {
  "use strict";
  const BGX = window.BGX, C = window.BGX_CATALOG, esc = BGX.esc, R = BGX.root;
  const view = document.getElementById("br-view"), page = document.body.dataset.page;
  const liveCount = s => s.chapters.filter(c => c.status === "live").length + (s.labs || []).filter(l => l.status === "live").length;
  const nextCount = s => s.chapters.filter(c => c.status === "next").length;
  const tile = (t, cls = "") => t.ghost ? `<div class="br-tile ${cls} ghost-tile"><small>?</small><b>?</b></div>`
    : `<div class="br-tile ${cls}${t.icon ? " is-icon" : ""}" style="background:var(--${t.color})"><small>${esc(t.corner)}</small><b>${t.icon ? BGX.icon(t.icon) : esc(t.big)}</b>${t.label ? `<em>${esc(t.label)}</em>` : ""}</div>`;

  const PG = BGX.progress;
  const art = id => BGX.ART && BGX.ART[id] ? BGX.ART[id]() : "";
  BGX.shell();

  /* ---------- level card (XP and levels live in core.js) ---------- */
  function levelCard() {
    if (!BGX.xp) return "";
    const lv = BGX.xp.level();
    return `<button class="br-levelcard" id="br-levelcard" type="button">${BGX.levelBadge(lv, "is-mid")}
      <span class="t"><span class="br-label" style="margin:0">Your level · ${esc(lv.tier)}</span><b>Lv ${lv.n} · ${esc(lv.name)}</b><span class="line">${esc(lv.line)}</span>
        <i class="bar"><i style="width:${lv.pct.toFixed(1)}%"></i></i>
        <small>${BGX.xp.total.toLocaleString("en-US")} XP${lv.next ? ` · ${(lv.next.xp - BGX.xp.total).toLocaleString("en-US")} XP to ${esc(lv.next.name)}` : " · top level"}</small></span>
      <span class="go">All 20 levels →</span></button>`;
  }

  /* ---------- featured: a carousel of several games (catalog featuredList), or one slab (catalog featured) ---------- */
  /* a game being played on a laptop and a phone: before/after screens, a tap, on a loop (static with reduced motion) */
  const demoHTML = (d, i) => {
    const img = (dev, k) => `<img class="${k}" src="${R}assets/featured/${d.id}-${dev}-${k}.webp" alt="" loading="${i ? "lazy" : "eager"}">`;
    const scr = (dev, t) => `<div class="scr">${img(dev, "a")}${img(dev, "b")}<i class="tap" style="left:${t[0]}%;top:${t[1]}%"></i></div>`;
    return `<div class="dev" aria-hidden="true"><div class="laptop">${scr("laptop", d.l)}<span class="base"></span></div><div class="phone">${scr("phone", d.p)}</div></div>`;
  };
  const slideHTML = (f, i, n) => `<div class="br-slide${i === 0 ? " is-on" : ""}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}: ${esc(f.title)}"${i ? ' aria-hidden="true"' : ""}>
      <div><p class="eyebrow">${esc(f.eyebrow)}</p><h2>${esc(f.title)}</h2><p>${esc(f.text)}</p>
        <div class="btns"><a class="go" href="${R}${f.url}"${i ? ' tabindex="-1"' : ""}>${esc(f.play || "Play " + f.title)}</a>${f.explore ? `<a class="alt" href="${R}${f.explore}"${i ? ' tabindex="-1"' : ""}>${esc(f.exploreLabel || "See all games")}</a>` : ""}</div></div>
      ${f.demo ? demoHTML(f.demo, i) : f.game && art(f.game) ? `<div class="art" aria-hidden="true">${art(f.game)}</div>` : `<div class="tiles" aria-hidden="true">${(f.tiles || []).map(t => tile(t)).join("")}</div>`}
    </div>`;
  function featuredHTML() {
    const L = C.featuredList && C.featuredList.length ? C.featuredList : [C.featured], n = L.length;
    if (n === 1) return `<section class="br-featured br-carousel">${slideHTML(L[0], 0, 1)}</section>`;
    return `<section class="br-featured br-carousel" aria-roledescription="carousel" aria-label="Featured games" id="br-car">
      <div class="br-slides" aria-live="off">${L.map((f, i) => slideHTML(f, i, n)).join("")}</div>
      <div class="br-carnav">
        <button class="br-carbtn" data-car="prev" aria-label="Previous featured game">‹</button>
        <div class="br-dots" role="group" aria-label="Choose a featured game">${L.map((f, i) => `<button class="br-dot" data-car="${i}" aria-label="Show ${esc(f.title)}" aria-current="${i === 0}"></button>`).join("")}</div>
        <button class="br-carbtn" data-car="next" aria-label="Next featured game">›</button>
        <button class="br-carbtn br-carpause" data-car="pause" aria-label="Pause the slideshow">❚❚</button>
      </div></section>`;
  }
  let carTimer = 0;
  function startCarousel() {
    const box = document.getElementById("br-car"); if (!box) return;
    const slides = [...box.querySelectorAll(".br-slide")], dots = [...box.querySelectorAll(".br-dot")], pauseBtn = box.querySelector(".br-carpause");
    let cur = 0, paused = BGX.RM, hold = false;          // reduced motion: never auto-advance
    const DELAY = 6000;
    const show = (k, user) => {
      cur = (k + slides.length) % slides.length;
      slides.forEach((s, i) => { const on = i === cur; s.classList.toggle("is-on", on); s.setAttribute("aria-hidden", on ? "false" : "true");
        s.querySelectorAll("a").forEach(a => on ? a.removeAttribute("tabindex") : a.setAttribute("tabindex", "-1")); });
      dots.forEach((d, i) => d.setAttribute("aria-current", i === cur));
      if (user) restart();
    };
    const paint = () => { pauseBtn.textContent = paused ? "▶" : "❚❚"; pauseBtn.setAttribute("aria-label", paused ? "Play the slideshow" : "Pause the slideshow"); box.classList.toggle("is-paused", paused); };
    const restart = () => { clearInterval(carTimer); if (!paused) carTimer = setInterval(() => { if (!hold && !document.hidden) show(cur + 1); }, DELAY); };
    box.querySelectorAll("[data-car]").forEach(b => b.onclick = () => {
      const v = b.dataset.car;
      if (v === "pause") { paused = !paused; paint(); restart(); return; }
      show(v === "prev" ? cur - 1 : v === "next" ? cur + 1 : +v, true);
    });
    box.addEventListener("mouseenter", () => hold = true); box.addEventListener("mouseleave", () => hold = false);
    box.addEventListener("focusin", () => hold = true); box.addEventListener("focusout", () => hold = false);
    let x0 = null;
    box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; hold = true; }, { passive: true });
    box.addEventListener("touchend", e => { hold = false; if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1), true); }, { passive: true });
    box.addEventListener("keydown", e => { if (e.key === "ArrowRight") show(cur + 1, true); if (e.key === "ArrowLeft") show(cur - 1, true); });
    paint(); restart();
    BGX.carousel = { show, get cur() { return cur; }, get paused() { return paused; } };   // test hook
  }

  /* ---------- hub ---------- */
  function hub() {
    const last = BGX.lastPlay(), f = C.featured;
    const lastSubj = last && C.subjects.find(s => s.id === last.subject);
    view.innerHTML = `
      <section class="br-hubhero"><h1>Textbooks, but fun.</h1><div class="br-herosub"><p>Free science games built from real course books. No login, works on your phone.</p><button class="br-tourbtn" id="br-tour" type="button"><span class="pl" aria-hidden="true">▶</span> Watch the 90-second tour</button></div></section>
      <div id="br-search"></div>
      <section class="br-subjects" aria-label="Subjects">${C.subjects.map((s, i) => {
        const live = liveCount(s);
        return `<a class="br-subj" href="${R}subjects/${s.id}/index.html" style="background:var(--${s.color})">
          <span class="no">0${i + 1}</span><span class="br-chip${live ? " is-live" : ""}">${live ? live + " live" : "Soon"}</span>
          ${art(s.id) ? `<span class="art" aria-hidden="true">${art(s.id)}</span>` : `<span class="icon">${BGX.icon(s.icon)}</span>`}
          <span><span class="nm">${esc(s.name)}</span><span class="ct">${esc(s.count || s.chapters.length + " chapters")}</span></span>${PG ? PG.subjectTile(s) : ""}</a>`;
      }).join("")}</section>
      ${featuredHTML()}
      ${BGX.community ? BGX.community.hubCard() : ""}
      ${last ? `<a class="br-continue" href="${R}${esc(last.url)}">
          <div class="br-tile is-sm" style="background:var(--${lastSubj ? lastSubj.color : "cat-mint"})"><b>${lastSubj ? BGX.icon(lastSubj.icon) : "▶"}</b></div>
          <div class="t"><p class="br-label" style="margin:0">Continue where you left off</p><h3>${esc(last.title)}</h3><p>${esc(lastSubj ? lastSubj.name : "")}${last.tagline ? " · " + esc(last.tagline) : ""}</p></div>
          <span class="br-next">Play</span></a>`
        : `<div class="br-continue" style="cursor:default"><div class="t"><p class="br-label" style="margin:0">Continue where you left off</p><h3>Your last game will show here</h3><p>Pick a featured game above to start; your progress is saved on this device.</p></div></div>`}
      ${levelCard()}
      ${PG ? PG.hubCard() : ""}`;
    startCarousel();
    if (BGX.searchMount) BGX.searchMount(document.getElementById("br-search"));
    const tour = document.getElementById("br-tour");
    if (tour) tour.onclick = () => {
      if (BGX.sfx) BGX.sfx.tap(); if (BGX.track) BGX.track("tour_open", {});
      BGX.sheet({ label: "BioglowRX in 90 seconds", title: "BioglowRX in 90 seconds", wide: true,
        html: `<div class="br-video"><iframe src="https://www.youtube-nocookie.com/embed/-ojR20KdI8g?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="BioglowRX in 90 seconds" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>
          <p class="br-hint" style="margin:12px 0 0">Prefer YouTube? <a href="https://www.youtube.com/watch?v=-ojR20KdI8g" target="_blank" rel="noopener">Watch it there</a>.</p>` });
    };
    const lc = document.getElementById("br-levelcard"); if (lc) lc.onclick = () => { BGX.sfx.tap(); BGX.showLevels(); };
    view.querySelectorAll(".br-continue .br-tile b svg").forEach(s => { s.setAttribute("width", "30"); s.setAttribute("height", "30"); });
  }

  /* ---------- subject page ---------- */
  function subject(id) {
    const s = C.subjects.find(x => x.id === id);
    if (!s) { view.innerHTML = `<p class="br-empty">This subject doesn't exist yet. <a href="${R}index.html">Back to all subjects</a></p>`; return; }
    document.title = s.name + " · BioglowRX Sciences Learning";
    let filter = "all";
    const isDone = c => PG && c.status === "live" && PG.chapterState(s, c).done;
    const FILTERS = PG ? [["all", "All chapters"], ["todo", "To do"], ["done", "Completed"]] : [["all", "All chapters"], ["live", "Live"], ["next", "Up next"]];
    const draw = () => {
      const list = s.chapters.filter(c => filter === "all" || (filter === "todo" ? !isDone(c) : filter === "done" ? isDone(c) : c.status === filter));
      view.innerHTML = `
        <nav class="br-backrow" aria-label="Back"><a class="br-crumb" href="${R}index.html"><span aria-hidden="true">←</span> All subjects</a></nav>
        <section class="br-subhero" style="margin-top:12px">
          <div class="ic${art(s.id) ? " has-art" : ""}" style="background:var(--${s.color})"><small>${String(C.subjects.indexOf(s) + 1).padStart(2, "0")}</small>${art(s.id) || BGX.icon(s.icon)}</div>
          <div><p class="br-label" style="margin:0">${esc(s.count || "")} · ${liveCount(s)} live · ${nextCount(s)} up next</p><h1>${esc(s.name)}</h1><p>${esc(s.blurb)}</p></div>
        </section>
        <div id="br-search"></div>
        ${PG ? PG.subjectPanel(s) : ""}
        ${s.labs && s.labs.length ? `<div class="br-labs">${s.labs.map(labCard).join("")}</div>` : ""}
        <p class="br-label" style="margin:10px 0 0">Chapters</p>
        <div class="br-seg" role="group" aria-label="Filter chapters" style="margin-top:-8px">
          ${FILTERS.map(([k, l]) => `<button data-f="${k}" aria-pressed="${filter === k}">${l}</button>`).join("")}
        </div>
        <div class="br-chaps">${list.length ? list.map(card).join("") : `<p class="br-empty">${filter === "done" ? "No chapters completed yet. Pass every game in a chapter with 70% or more to complete it." : filter === "todo" ? "Every chapter is complete. Well done!" : "Nothing here yet. The first games are on their way."}</p>`}</div>
        <p class="br-hint" style="margin-top:18px">Built from ${esc(s.source)}. Every game is written in our own words.</p>`;
      view.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { BGX.sfx.tap(); filter = b.dataset.f; draw(); });
      if (BGX.searchMount) BGX.searchMount(document.getElementById("br-search"), { subject: s.id, placeholder: "Search " + s.name + ": a topic, a game or a card" });
    };
    /* hands-on lab: a compact, high-contrast strip so the chapters show straight underneath */
    const labCard = l => {
      const live = l.status === "live", next = l.status === "next";
      const inner = `<span class="lab-thumb" aria-hidden="true">${art(l.id) || BGX.icon(l.icon)}</span>
        <span class="lab-txt"><span class="eyebrow">Hands-on lab · Ch. ${esc(l.ch)}${next ? " ★" : ""}</span><b>${esc(l.title)}</b><span class="lab-line">${esc(l.text)}</span></span>
        <span class="lab-go">${live ? "Play" : next ? "Up next" : "Soon"}</span>`;
      return live ? `<a class="br-labstrip" href="${R}${l.url}">${inner}</a>` : `<div class="br-labstrip is-soon">${inner}</div>`;
    };
    const card = c => {
      const fm = c.formats.map(x => `<span class="br-fmt">${esc(x)}</span>`).join("");
      if (c.status === "live") return `<a class="br-chap is-live${isDone(c) ? " is-done" : ""}" href="${R}${c.url}">
          <div class="mini" aria-hidden="true">${(c.tiles || []).map(t => tile(t, "is-sm")).join("")}</div>
          <div class="body"><div style="display:flex;gap:10px;align-items:center"><span class="ch">Ch. ${esc(c.ch)}</span><span class="br-chip is-live">Live</span></div>
            <h3>${esc(c.title)}</h3><div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center"><b>${esc(c.game)}</b>${fm}</div>${PG ? PG.chapterRow(s, c) : ""}</div>
          <span class="br-next">Play</span></a>`;
      const next = c.status === "next";
      return `<div class="br-chap is-soon" role="group" aria-label="${esc(c.title)}">
          <div class="top"><span class="ic" style="background:var(--${s.color})"><small>${esc(c.ch.split(" ")[0])}</small>${BGX.icon(c.icon)}</span>
            <span><span class="ch">Ch. ${esc(c.ch)}${next ? ' <span class="br-star">★</span>' : ""}</span><h3>${esc(c.title)}</h3></span></div>
          <div class="game"><b>${esc(c.game)}</b>${fm}<span class="br-chip">${next ? "Up next" : "Soon"}</span></div></div>`;
    };
    draw();
  }

  if (page === "subject") subject(document.body.dataset.subject); else hub();
})();
