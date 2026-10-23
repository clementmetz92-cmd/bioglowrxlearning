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

  const art = id => BGX.ART && BGX.ART[id] ? BGX.ART[id]() : "";
  BGX.shell();

  /* ---------- hub ---------- */
  function hub() {
    const last = BGX.lastPlay(), f = C.featured;
    const lastSubj = last && C.subjects.find(s => s.id === last.subject);
    view.innerHTML = `
      <section class="br-hubhero"><h1>Learn it, then play it.</h1><p>Free science games built from real course books. No login, works on your phone.</p></section>
      <section class="br-subjects" aria-label="Subjects">${C.subjects.map((s, i) => {
        const live = liveCount(s);
        return `<a class="br-subj" href="${R}subjects/${s.id}/index.html" style="background:var(--${s.color})">
          <span class="no">0${i + 1}</span><span class="br-chip${live ? " is-live" : ""}">${live ? live + " live" : "Soon"}</span>
          ${art(s.id) ? `<span class="art" aria-hidden="true">${art(s.id)}</span>` : `<span class="icon">${BGX.icon(s.icon)}</span>`}
          <span><span class="nm">${esc(s.name)}</span><span class="ct">${esc(s.count || s.chapters.length + " chapters")}</span></span></a>`;
      }).join("")}</section>
      <section class="br-featured">
        <div><p class="eyebrow">${esc(f.eyebrow)}</p><h2>${esc(f.title)}</h2><p>${esc(f.text)}</p>
          <div class="btns"><a class="go" href="${R}${f.url}">Play ${esc(f.title)}</a>${f.explore ? `<a class="alt" href="${R}${f.explore}">See all games</a>` : ""}</div></div>
        ${f.game && art(f.game) ? `<div class="art" aria-hidden="true">${art(f.game)}</div>` : `<div class="tiles" aria-hidden="true">${f.tiles.map(t => tile(t)).join("")}</div>`}
      </section>
      ${last ? `<a class="br-continue" href="${R}${esc(last.url)}">
          <div class="br-tile is-sm" style="background:var(--${lastSubj ? lastSubj.color : "cat-mint"})"><b>${lastSubj ? BGX.icon(lastSubj.icon) : "▶"}</b></div>
          <div class="t"><p class="br-label" style="margin:0">Continue where you left off</p><h3>${esc(last.title)}</h3><p>${esc(lastSubj ? lastSubj.name : "")}${last.tagline ? " · " + esc(last.tagline) : ""}</p></div>
          <span class="br-next">Play</span></a>`
        : `<div class="br-continue" style="cursor:default"><div class="t"><p class="br-label" style="margin:0">Continue where you left off</p><h3>Your last game will show here</h3><p>Start with ${esc(f.title)} above; your progress is saved on this device.</p></div></div>`}`;
    view.querySelectorAll(".br-continue .br-tile b svg").forEach(s => { s.setAttribute("width", "30"); s.setAttribute("height", "30"); });
  }

  /* ---------- subject page ---------- */
  function subject(id) {
    const s = C.subjects.find(x => x.id === id);
    if (!s) { view.innerHTML = `<p class="br-empty">This subject doesn't exist yet. <a href="${R}index.html">Back to all subjects</a></p>`; return; }
    document.title = s.name + " · BioglowRX Sciences Learning";
    let filter = "all";
    const draw = () => {
      const list = s.chapters.filter(c => filter === "all" || c.status === filter);
      view.innerHTML = `
        <a class="br-crumb" href="${R}index.html">← All subjects</a>
        <section class="br-subhero" style="margin-top:12px">
          <div class="ic${art(s.id) ? " has-art" : ""}" style="background:var(--${s.color})"><small>${String(C.subjects.indexOf(s) + 1).padStart(2, "0")}</small>${art(s.id) || BGX.icon(s.icon)}</div>
          <div><p class="br-label" style="margin:0">${esc(s.count || "")} · ${liveCount(s)} live · ${nextCount(s)} up next</p><h1>${esc(s.name)}</h1><p>${esc(s.blurb)}</p></div>
        </section>
        ${s.labs && s.labs.length ? `<p class="br-label" style="margin:10px 0 0">Hands-on lab</p><div class="br-labs">${s.labs.map(labCard).join("")}</div>` : ""}
        <p class="br-label" style="margin:10px 0 0">Chapters</p>
        <div class="br-seg" role="group" aria-label="Filter chapters" style="margin-top:-8px">
          ${[["all", "All chapters"], ["live", "Live"], ["next", "Up next"]].map(([k, l]) => `<button data-f="${k}" aria-pressed="${filter === k}">${l}</button>`).join("")}
        </div>
        <div class="br-chaps">${list.length ? list.map(card).join("") : `<p class="br-empty">Nothing here yet. The first games are on their way.</p>`}</div>
        <p class="br-hint" style="margin-top:18px">Built from ${esc(s.source)}. Every game is written in our own words.</p>`;
      view.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { BGX.sfx.tap(); filter = b.dataset.f; draw(); });
    };
    const labCard = l => {
      const live = l.status === "live", next = l.status === "next";
      const inner = `${art(l.id) ? `<div class="labart" aria-hidden="true">${art(l.id)}</div>` : ""}<div class="top"><span class="ic" style="background:var(--${s.color})"><small>Lab</small>${BGX.icon(l.icon)}</span>
          <span><span class="ch">Ch. ${esc(l.ch)}${next ? ' <span class="br-star">★</span>' : ""}</span><h3>${esc(l.title)}</h3></span></div>
        <p class="plan">${esc(l.text)}</p>
        <div class="game"><span class="br-fmt">Lab mini game</span>${live ? '<span class="br-chip is-live lab-tag">Live</span>' : `<span class="br-chip lab-tag">${next ? "Up next" : "Soon"}</span>`}</div>`;
      return live ? `<a class="br-chap is-lab" href="${R}${l.url}">${inner}</a>` : `<div class="br-chap is-lab is-soon">${inner}</div>`;
    };
    const card = c => {
      const fm = c.formats.map(x => `<span class="br-fmt">${esc(x)}</span>`).join("");
      if (c.status === "live") return `<a class="br-chap is-live" href="${R}${c.url}">
          <div class="mini" aria-hidden="true">${(c.tiles || []).map(t => tile(t, "is-sm")).join("")}</div>
          <div class="body"><div style="display:flex;gap:10px;align-items:center"><span class="ch">Ch. ${esc(c.ch)}</span><span class="br-chip is-live">Live</span></div>
            <h3>${esc(c.title)}</h3><div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center"><b>${esc(c.game)}</b>${fm}</div></div>
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
