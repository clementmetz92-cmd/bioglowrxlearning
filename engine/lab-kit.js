/* BioglowRX — shared pieces for the hands-on labs (engine/lab-*.js).
   Every lab has: a menu with "What you're doing", numbered "How to do it" steps, three levels,
   a step tracker during the run, a Hint button, and a 3-star result.
   Hint rule: level 1 hints are free; on levels 2–3, using any hint caps that run at 2 stars. */
(function () {
  "use strict";
  const BGX = window.BGX, esc = BGX.esc;
  BGX.labKit = function (cfg) {
    const view = document.getElementById("br-view");
    const $ = s => view.querySelector(s);
    const stars = BGX.store.get("lab_" + cfg.id, {});
    const K = { view, $, stars, level: null, hintsUsed: 0 };
    BGX.shell();
    BGX.recordPlay({ id: cfg.id, title: cfg.title, subject: cfg.subject, url: "games/" + cfg.id + "/index.html", tagline: cfg.tagline });
    document.title = cfg.title + " · BioglowRX Sciences Learning";

    K.starText = n => n ? "★".repeat(n) + "☆".repeat(3 - n) + " best" : "Not tried yet";
    K.save = n => { if (n > (stars[K.level.n] || 0)) { stars[K.level.n] = n; BGX.store.set("lab_" + cfg.id, stars); } };

    /* menu: o = { hero, introHTML, lifeHTML, steps: [..], controls, safety, levels, onStart } */
    K.menu = o => {
      const art = BGX.ART && BGX.ART[cfg.id] ? `<div class="br-heroart" aria-hidden="true">${BGX.ART[cfg.id]()}</div>` : "";
      view.innerHTML = `
        <div class="br-hero${art ? " has-art" : ""}"><div><h2>${esc(cfg.title)}</h2><p>${esc(o.hero || cfg.tagline)}</p></div>${art}</div>
        <div class="lab-intro">
          <div><p class="br-label">What you're doing</p>${o.introHTML}</div>
          <div class="life"><p class="br-label">In real life</p>${o.lifeHTML}</div>
        </div>
        <div class="lab-how"><p class="br-label">How to do it</p>${K.stepsHTML(o.steps)}</div>
        <p class="br-label" style="margin-top:22px">Choose a level</p>
        <div class="br-modes">${o.levels.map(l => `<button class="br-mode" data-l="${l.n}">
          <span class="ic" style="background:var(--cat-${l.n === 1 ? "sky" : l.n === 2 ? "orchid" : "amber"})">${l.n}</span>
          <span><h3>${esc(l.title)}</h3><p>${esc(l.desc)}</p><span class="best">${K.starText(stars[l.n] || 0)}</span></span></button>`).join("")}</div>
        <p class="br-hint" style="margin-top:16px"><b>Stuck?</b> Every level has a <b>Hint</b> button. Hints are free on level 1; on levels 2 and 3 a hint caps that try at 2 stars.</p>
        ${o.controls ? `<p class="br-hint"><b>Controls:</b> ${o.controls}</p>` : ""}
        ${o.safety ? `<p class="br-hint">${o.safety}</p>` : ""}
        <p class="br-hint"><a class="br-crumb" href="${BGX.root}subjects/${cfg.subject}/index.html">← ${esc(cfg.subjectName)}</a></p>`;
      view.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { BGX.sfx.tap(); o.onStart(o.levels[+b.dataset.l - 1]); });
    };

    K.stepsHTML = steps => `<ol class="lab-steps">${steps.map((s, i) => `<li data-s="${i}"><span class="n">${i + 1}</span><span>${s}</span></li>`).join("")}</ol>`;
    /* highlight the current step; earlier ones show a tick */
    K.setStep = i => {
      if (K._step === i) return; K._step = i;
      view.querySelectorAll(".lab-steps li").forEach((li, j) => { li.classList.toggle("is-now", j === i); li.classList.toggle("is-done", j < i); });
    };

    K.topHTML = l => `<div class="br-top"><button class="br-quit" id="lab-quit">✕ Levels</button><span class="br-label" style="margin:0;flex:1">Level ${l.n} · ${esc(l.title)}</span><span class="br-count">${K.starText(stars[l.n] || 0)}</span></div>`;

    /* a run starts: resets hint state. hints = array of strings or functions returning HTML */
    K.begin = (l, hints) => { K.level = l; K.hintsUsed = 0; K._hints = hints || []; K._step = -1; };
    K.hintHTML = () => `<div class="lab-hintbar"><button class="br-ghost lab-hintbtn" id="lab-hintbtn" type="button">💡 Hint${K.level.n === 1 ? "" : " (max 2★)"}</button><div class="lab-hintbox" id="lab-hintbox" aria-live="polite"></div></div>`;
    K.bindHints = onReveal => {
      const b = $("#lab-hintbtn"); if (!b) return;
      const upd = () => { b.disabled = K.hintsUsed >= K._hints.length; b.textContent = K.hintsUsed >= K._hints.length ? "No more hints" : `💡 ${K.hintsUsed ? "Another hint" : "Hint"}${K.level.n === 1 ? "" : " (max 2★)"}`; };
      b.onclick = () => {
        if (K.hintsUsed >= K._hints.length) return;
        const h = K._hints[K.hintsUsed++]; BGX.sfx.tap();
        $("#lab-hintbox").insertAdjacentHTML("beforeend", `<p class="br-pop"><b>Hint ${K.hintsUsed}</b> ${typeof h === "function" ? h() : h}</p>`);
        if (onReveal) onReveal(K.hintsUsed); upd();
      };
      upd();
    };
    K.capStars = n => (K.level.n > 1 && K.hintsUsed > 0) ? Math.min(n, 2) : n;
    K.capNote = n0 => (K.level.n > 1 && K.hintsUsed > 0 && n0 > 2) ? " (Capped at 2 stars because a hint was used: try it without one for 3.)" : "";

    /* result block; o = { n, verdict, why, extraHTML, levels, onAgain, onLevel, onMenu, append } */
    K.result = o => {
      const n = o.n; K.save(n);
      if (n === 3) { BGX.sfx.big(); BGX.rain(160); } else if (n > 0) BGX.sfx.win();
      const hasNext = K.level.n < o.levels.length && n > 0;
      const html = `<div class="lab-result"><div class="lab-stars" aria-label="${n} of 3 stars">${"★".repeat(n)}<span>${"☆".repeat(3 - n)}</span></div>
        <p><span class="${n ? "ok" : "no"}">${esc(o.verdict)}</span> ${o.why}</p>${o.extraHTML || ""}
        <div class="br-btns"><button class="br-next" id="lab-again">Try again</button>${hasNext ? `<button class="br-ghost" id="lab-next">Next level</button>` : ""}<button class="br-ghost" id="lab-menu">All levels</button></div></div>`;
      const fb = $("#lab-fb"); fb.innerHTML = o.append ? fb.innerHTML + html : html;
      $("#lab-again").onclick = () => o.onLevel(K.level); $("#lab-menu").onclick = o.onMenu;
      const nx = $("#lab-next"); if (nx) nx.onclick = () => o.onLevel(o.levels[K.level.n]);
      fb.scrollIntoView({ behavior: BGX.RM ? "auto" : "smooth", block: "nearest" });
    };
    return K;
  };
})();
