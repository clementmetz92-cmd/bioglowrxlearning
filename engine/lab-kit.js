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
      view.innerHTML = `<nav class="br-backrow" aria-label="Back"><a class="br-crumb" href="${BGX.root}subjects/${cfg.subject}/index.html"><span aria-hidden="true">←</span> All ${esc(cfg.subjectName)} games</a></nav>
        <div class="br-hero${art ? " has-art" : ""}"><div><h2>${esc(cfg.title)}</h2><p>${esc(o.hero || cfg.tagline)}</p></div>${art}</div>
        <div class="lab-infobtns">
          <button class="lab-infobtn" type="button" data-info="what"><span class="ic" aria-hidden="true">📖</span><span><b>What you're doing</b><small>The science and where it's used in real life</small></span><span class="go" aria-hidden="true">›</span></button>
          <button class="lab-infobtn" type="button" data-info="how"><span class="ic" aria-hidden="true">📋</span><span><b>How to do it</b><small>${o.steps.length} steps${o.controls ? " · controls" : ""}</small></span><span class="go" aria-hidden="true">›</span></button>
        </div>
        <p class="br-label" style="margin-top:18px">Choose a level</p>
        <div class="br-modes">${o.levels.map(l => `<button class="br-mode" data-l="${l.n}">
          <span class="ic" style="background:var(--cat-${l.n === 1 ? "sky" : l.n === 2 ? "orchid" : "amber"})">${l.n}</span>
          <span><h3>${esc(l.title)}</h3><p>${esc(l.desc)}</p><span class="best">${K.starText(stars[l.n] || 0)}</span></span></button>`).join("")}</div>
        <p class="br-hint" style="margin-top:14px"><b>Stuck?</b> Every level has a <b>Hint</b> button: free on level 1; on levels 2 and 3 a hint caps that try at 2 stars.</p>
        <nav class="br-backrow is-bottom" aria-label="Back"><a class="br-crumb" href="${BGX.root}subjects/${cfg.subject}/index.html"><span aria-hidden="true">←</span> All ${esc(cfg.subjectName)} games</a></nav>`;
      const info = {
        what: () => ({ title: "What you're doing", html: `<div class="lab-sheet">${o.introHTML}<div class="life"><p class="br-label">In real life</p>${o.lifeHTML}</div></div>` }),
        how: () => ({ title: "How to do it", html: `<div class="lab-sheet">${K.stepsHTML(o.steps)}${o.controls ? `<p class="br-hint"><b>Controls:</b> ${o.controls}</p>` : ""}${o.safety ? `<p class="br-hint">${o.safety}</p>` : ""}</div>` })
      };
      const keys = ["what", "how"];
      view.querySelectorAll("[data-info]").forEach(b => b.onclick = () => {
        BGX.sfx.tap(); const k = keys.indexOf(b.dataset.info), r = info[keys[k]]();
        BGX.sheet({ label: r.title, title: r.title, html: r.html, nav: { count: 2, index: k, render: i => info[keys[i]]() } });
      });
      view.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { BGX.sfx.tap(); o.onStart(o.levels[+b.dataset.l - 1]); });
    };

    K.stepsHTML = steps => `<ol class="lab-steps">${steps.map((s, i) => `<li data-s="${i}"><span class="n">${i + 1}</span><span>${s}</span></li>`).join("")}</ol>`;
    /* highlight the current step; earlier ones show a tick */
    K.setStep = i => {
      if (K._step === i) return; K._step = i;
      view.querySelectorAll(".lab-steps li").forEach((li, j) => { li.classList.toggle("is-now", j === i); li.classList.toggle("is-done", j < i); });
      paintNow();
    };

    /* ----- during a run: the long "How to do it" list becomes a one-line "Step x of n" bar + a button that opens the steps in a pop-up ----- */
    function paintNow() {
      const bar = view.querySelector(".lab-nowbar .now"), lis = view.querySelectorAll("details.lab-howrun .lab-steps li");
      if (!bar || !lis.length) return;
      const i = Math.max(0, Math.min(lis.length - 1, K._step == null || K._step < 0 ? 0 : K._step));
      bar.innerHTML = `<span class="lab-nowlabel">Step ${i + 1} of ${lis.length}</span>${lis[i].querySelector("span:last-child").innerHTML}`;
    }
    function wireHowRun() {
      view.querySelectorAll("details.lab-howrun:not([data-wired])").forEach(d => {
        d.setAttribute("data-wired", "1"); d.hidden = true;
        const bar = document.createElement("div"); bar.className = "lab-nowbar";
        bar.innerHTML = `<span class="now"></span><button class="br-ghost lab-howbtn" type="button">📋 How to do it</button>`;
        d.parentNode.insertBefore(bar, d);
        bar.querySelector("button").onclick = () => {
          BGX.sfx.tap();
          const ol = d.querySelector(".lab-steps").cloneNode(true);
          BGX.sheet({ label: "How to do it", title: "How to do it", html: `<div class="lab-sheet">${ol.outerHTML}</div>` });
        };
        paintNow();
      });
    }

    /* ----- lab questions and results open in a panel docked at the bottom, so the bench stays in view and nothing scrolls away ----- */
    const DOCK_SEL = "#lab-fb, #mic-q, #ft-concl";
    let dock = null, moving = false;
    const interactive = el => !!el.querySelector("button, input, select, .lab-stars");
    function ensureDock() {
      if (dock && view.contains(dock)) return dock;
      dock = document.createElement("div"); dock.className = "lab-dock"; dock.setAttribute("role", "region"); dock.setAttribute("aria-label", "Lab task");
      dock.innerHTML = `<div class="lab-dockbar"><b class="t">Your task</b><button class="br-ghost lab-dockmin" type="button" aria-expanded="true">Hide ▾</button></div><div class="lab-dockbody"></div>`;
      dock.querySelector(".lab-dockmin").onclick = () => setMin(!dock.classList.contains("is-min"));
      view.appendChild(dock);
      return dock;
    }
    function setMin(min) {
      if (!dock) return; dock.classList.toggle("is-min", min);
      const b = dock.querySelector(".lab-dockmin"), txt = min ? "Show ▴" : "Hide ▾"; if (b.textContent !== txt) b.textContent = txt; b.setAttribute("aria-expanded", String(!min));
      padBody();
    }
    function padBody() {
      const open = dock && view.contains(dock) && dock.querySelector(".lab-dockbody").children.length;
      document.body.style.paddingBottom = open ? (dock.offsetHeight + 16) + "px" : "";
    }
    function syncDock() {
      if (moving) return; moving = true;
      try {
        // a docked panel whose original place was rebuilt by the lab is stale: drop it
        if (dock && view.contains(dock)) [...dock.querySelector(".lab-dockbody").children].forEach(el => { if (!el._ph || !el._ph.isConnected) el.remove(); });
        view.querySelectorAll(DOCK_SEL).forEach(el => {
          const inDock = !!el.closest(".lab-dock");
          if (interactive(el) && !inDock) {
            const d = ensureDock(), ph = document.createComment("dock:" + el.id);
            el.parentNode.insertBefore(ph, el); el._ph = ph;
            const body = d.querySelector(".lab-dockbody");
            const later = [...body.children].find(c => c.compareDocumentPosition(ph) & Node.DOCUMENT_POSITION_PRECEDING);
            body.insertBefore(el, later || null);
            setMin(false);
          } else if (!interactive(el) && inDock && el._ph && el._ph.parentNode) {
            el._ph.parentNode.insertBefore(el, el._ph); el._ph.remove(); el._ph = null;
          }
        });
        if (dock && view.contains(dock)) {
          const body = dock.querySelector(".lab-dockbody");
          const hid = !body.children.length; if (dock.hidden !== hid) dock.hidden = hid;
          const t = dock.querySelector(".t"), txt = body.querySelector(".lab-result, .lab-stars") ? "Result" : "Your task";
          if (t.textContent !== txt) t.textContent = txt;
        }
        padBody();
      } finally { moving = false; }
    }
    let lastLen = 0, queued = false;
    const tick = () => {
      queued = false;
      wireHowRun(); syncDock();
      if (dock && view.contains(dock)) {   // new content arriving in a hidden panel opens it again
        const len = dock.querySelector(".lab-dockbody").innerHTML.length;
        if (len !== lastLen) { lastLen = len; if (dock.classList.contains("is-min")) setMin(false); }
      } else document.body.style.paddingBottom = "";
    };
    const mo = new MutationObserver(recs => {
      if (moving || queued) return;
      if (recs.every(r => r.target.closest && r.target.closest(".lab-dockbar"))) return;   // our own label changes
      queued = true; requestAnimationFrame(tick);
    });
    mo.observe(view, { childList: true, subtree: true });
    K.dock = () => dock;   // test hook

    K.topHTML = l => `<div class="br-top"><button class="br-quit" id="lab-quit" aria-label="Back to the lab levels"><span aria-hidden="true">←</span> Levels</button><span class="br-label" style="margin:0;flex:1">Level ${l.n} · ${esc(l.title)}</span><span class="br-count">${K.starText(stars[l.n] || 0)}</span></div>`;

    /* a run starts: resets hint state. hints = array of strings or functions returning HTML */
    K.begin = (l, hints) => { K.level = l; K.hintsUsed = 0; K._hints = hints || []; K._step = -1; K.xpStart = BGX.xp.total; K.xpPaid = false; K.xpShown = false; };
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
      if (!K.xpPaid) { K.xpPaid = true; BGX.xp.add(BGX.xp.labBonus(n, K.level.n)); }   // once per run (some labs add a second result block)
      const earned = Math.max(0, BGX.xp.total - (K.xpStart == null ? BGX.xp.total : K.xpStart)), lv = BGX.xp.level();
      if (n === 3) { BGX.sfx.big(); BGX.rain(160); } else if (n > 0) BGX.sfx.win();
      const hasNext = K.level.n < o.levels.length && n > 0;
      const html = `<div class="lab-result"><div class="lab-stars" aria-label="${n} of 3 stars">${"★".repeat(n)}<span>${"☆".repeat(3 - n)}</span></div>
        <p><span class="${n ? "ok" : "no"}">${esc(o.verdict)}</span> ${o.why || ""}</p>${o.extraHTML || ""}
        ${earned && !K.xpShown && (K.xpShown = true) ? `<p class="lab-xp">${BGX.levelBadge(lv)}<span><b>+${earned.toLocaleString("en-US")} XP</b> this run · Lv ${lv.n} ${esc(lv.name)}</span></p>` : ""}
        <div class="br-btns"><button class="br-next" id="lab-again">Try again</button>${hasNext ? `<button class="br-ghost" id="lab-next">Next level</button>` : ""}<button class="br-ghost" id="lab-menu">All levels</button></div></div>`;
      const fb = $("#lab-fb"); fb.innerHTML = o.append ? fb.innerHTML + html : html;
      $("#lab-again").onclick = () => o.onLevel(K.level); $("#lab-menu").onclick = o.onMenu;
      const nx = $("#lab-next"); if (nx) nx.onclick = () => o.onLevel(o.levels[K.level.n]);
      if (fb.closest(".lab-dock")) fb.closest(".lab-dockbody").scrollTop = o.append ? 1e6 : 0;   // shown in the docked panel: no page scrolling
    };
    return K;
  };
})();
