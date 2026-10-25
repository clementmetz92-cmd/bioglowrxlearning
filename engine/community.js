/* BioglowRX — Founding Testers beta: invite & share (+100 XP once), challenge links,
   round ratings, mistake reports, "what next" votes, beta survey and the Founding Tester badge.
   Loads after core.js, icons.js and progress.js; settings come from engine/config.js.

   Feedback goes to PostHog as anonymous events (cookie-free: persistence in memory).
   With no PostHog key in config.js, feedback buttons stay hidden; invites still work. */
(function () {
  "use strict";
  const BGX = window.BGX, C = window.BGX_CONFIG || {}, esc = BGX.esc;
  const SITE = C.siteUrl || location.origin + "/";
  const INVITE_XP = 100;
  const on = { feedback: !!C.posthogKey, survey: !!C.tallySurvey };
  if (BGX.icons && !BGX.icons.gift) BGX.icons.gift = "M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-1.5-3-5-3.5-5-1.2C7 7 9 7 12 7zm0 0c1.5-3 5-3.5 5-1.2C17 7 15 7 12 7z";
  if (BGX.icons && !BGX.icons.vote) BGX.icons.vote = "M4 21h16M6 17h12l-1-6H7zM9 11V4h6v7M10.5 7.5l1.2 1.2 2.3-2.4";

  /* ---------- analytics (PostHog, EU, cookie-free) ---------- */
  /* PostHog's official loader stub: calls made before the library arrives are queued and replayed by it */
  function loadPosthog() {
    if (!C.posthogKey || (window.posthog && window.posthog.__SV)) return;
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify reset get_distinct_id set_config opt_in_capturing opt_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    try {
      window.posthog.init(C.posthogKey, {
        api_host: C.posthogHost || "https://eu.i.posthog.com",
        persistence: "memory",              // no cookies, no local storage: nothing to consent to
        autocapture: false, capture_pageview: true, capture_pageleave: false,
        disable_session_recording: true, disable_surveys: true, enable_heatmaps: false, capture_performance: false, capture_dead_clicks: false,
        person_profiles: "identified_only", ip: false
      });
    } catch (e) {}
  }
  const page = () => ({ page: location.pathname.replace(/.*bioglowrxlearning/, "") || "/", game: BGX.game ? BGX.game.id : null, level: BGX.xp ? BGX.xp.level().n : null });
  BGX.track = (event, props = {}) => {
    const p = Object.assign(page(), props);
    try { if (C.posthogKey && window.posthog && window.posthog.capture) window.posthog.capture(event, p); } catch (e) {}
  };

  /* ---------- invite & share ---------- */
  const withRef = (url, ref) => url + (url.indexOf("?") >= 0 ? "&" : "?") + "ref=" + ref;
  function reward(how) {
    const got = BGX.xp.once("invite", INVITE_XP);
    BGX.track("invite", { how, first: !!got });
    document.querySelectorAll(".br-toast").forEach(d => d.remove());
    if (got) { BGX.sfx.big(); BGX.rain(160); BGX.toast(`+${got} XP for inviting a friend. Thank you!`); }
    else BGX.toast("Thanks for sharing!");
  }
  function shareSheet(o) {
    const url = o.url, txt = o.text, enc = encodeURIComponent;
    const opts = [
      ["Copy link", "copy"], ["WhatsApp", `https://wa.me/?text=${enc(txt + " " + url)}`], ["Email", `mailto:?subject=${enc(o.title)}&body=${enc(txt + "\n\n" + url)}`],
      ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`], ["X", `https://x.com/intent/post?text=${enc(txt)}&url=${enc(url)}`], ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`]
    ];
    const first = !BGX.store.get("xponce", {}).invite;
    BGX.sheet({ label: o.title, title: o.title,
      html: `<p class="br-hint" style="margin:0 0 14px">${esc(o.lead || "")}${first ? ` <b>Your first invite earns +${INVITE_XP} XP.</b>` : ""}</p>
        <div class="br-sharelink"><input readonly value="${esc(url)}" aria-label="Link to share"><button class="br-next" type="button" data-share="copy">Copy link</button></div>
        <div class="br-shareopts">${opts.slice(1).map(([l, h]) => `<a class="br-ghost" href="${esc(h)}" target="_blank" rel="noopener" data-share="${l}">${l}</a>`).join("")}</div>`,
      onOpen: body => body.querySelectorAll("[data-share]").forEach(b => b.addEventListener("click", () => {
        if (b.dataset.share === "copy") {
          const inp = body.querySelector("input"); inp.select();
          (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).catch(() => { try { document.execCommand("copy"); } catch (e) {} });
          b.textContent = "Copied!";
        }
        reward(b.dataset.share);
      })) });
  }
  BGX.invite = (o = {}) => {
    const lv = BGX.xp.level();
    const d = Object.assign({ title: "Invite a friend", url: withRef(SITE, "invite"),
      text: `I'm revising science with free games on BioglowRX: chemistry, anatomy, pharmacology and nutrition. I'm Level ${lv.n} (${lv.name}). Come and play!`,
      lead: "Share BioglowRX with a classmate or your study group. It's free, with no login." }, o);
    BGX.sfx.tap();
    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      navigator.share({ title: "BioglowRX Sciences Learning", text: d.text, url: d.url }).then(() => reward("native")).catch(() => {});
    } else shareSheet(d);
  };
  /* challenge a friend after a round: the link opens the same game with a banner */
  BGX.challenge = (g, mode, score, total) => {
    const url = withRef(SITE + `games/${g.id}/index.html?c=${encodeURIComponent(mode.id)}&s=${score}&t=${total}`, "challenge");
    BGX.invite({ title: "Challenge a friend", url, text: `I scored ${score}/${total} in ${g.title} (${mode.title}) on BioglowRX. Can you beat me?`,
      lead: `They'll see your score of ${score}/${total} when they open the link.` });
  };
  function challengeBanner(g) {
    const q = new URLSearchParams(location.search), c = q.get("c"), s = +q.get("s"), t = +q.get("t");
    if (!c || !t || !g.modes) return "";
    const m = g.modes.find(x => x.id === c); if (!m) return "";
    if (!challengeBanner.seen) { challengeBanner.seen = 1; BGX.track("challenge_open", { mode: c, score: s, total: t }); }
    return `<div class="br-challenge"><span class="ic">${BGX.icon("trophy")}</span><span><b>A friend scored ${s}/${t} in ${esc(m.title)}.</b> Can you beat it?</span><button class="br-next" type="button" data-bgx-play="${esc(c)}">Take the challenge</button></div>`;
  }
  /* share a certificate or diploma as an image (phones: native share sheet; else download) */
  BGX.shareSvg = (svg, name) => {
    const img = new Image(), W = 2000, H = 1400;
    img.onload = () => {
      const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
      const cx = cv.getContext("2d"); cx.fillStyle = "#fff"; cx.fillRect(0, 0, W, H); cx.drawImage(img, 0, 0, W, H);
      cv.toBlob(blob => {
        const file = new File([blob], name + ".png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: "My BioglowRX award", text: "Earned on BioglowRX Sciences Learning: " + SITE }).then(() => reward("certificate")).catch(() => {});
        } else {
          const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name + ".png"; document.body.appendChild(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 4000); reward("certificate-download");
        }
      }, "image/png");
    };
    const src = svg.replace("<svg ", `<svg width="${W}" height="${H}" `);
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(src.indexOf("xmlns=") > 0 ? src : src.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '));
  };

  /* ---------- feedback: round rating, mistake report, vote, survey ---------- */
  const fbDone = () => BGX.store.get("fb", {});
  const fbSet = (k, v) => { const f = fbDone(); f[k] = v; BGX.store.set("fb", f); };
  function endCard(g, mode, score, total) {
    let html = `<div class="br-endshare"><button class="br-ghost" type="button" data-bgx-challenge>${BGX.icon("gift")} Challenge a friend${BGX.store.get("xponce", {}).invite ? "" : ` <em>+${INVITE_XP} XP</em>`}</button></div>`;
    if (!on.feedback) return html;
    const n = BGX.store.get("rounds", 0) + 1; BGX.store.set("rounds", n);
    if (n % 3 !== 1) return html;                                   // ask on the 1st, 4th, 7th… round only
    return html + `<div class="br-rate" data-game="${esc(g.id)}" data-mode="${esc(mode.id)}" data-score="${score}" data-total="${total}">
      <p>How was this game?</p>
      <div class="faces"><button type="button" data-rate="3" aria-label="Loved it">😀</button><button type="button" data-rate="2" aria-label="It was OK">🙂</button><button type="button" data-rate="1" aria-label="Not great">😕</button></div>
      <div class="more" hidden><textarea rows="2" maxlength="600" placeholder="Anything to improve? (optional)"></textarea><button class="br-next" type="button" data-rate-send>Send</button></div></div>`;
  }
  const reportBtn = () => on.feedback ? `<button class="br-report" type="button" data-bgx-report>Report a mistake</button>` : "";
  function openReport(info) {
    BGX.sheet({ label: "Report a mistake", title: "Report a mistake",
      html: `<p class="br-hint" style="margin:0 0 12px">Thank you: every report is checked and fixed. About: <b>${esc(info.item || "this question")}</b></p>
        <div class="br-choices">${["The marked answer is wrong", "The question is unclear", "Typo or wording", "Something else"].map((t, i) => `<label><input type="radio" name="why" value="${esc(t)}"${i ? "" : " checked"}> ${esc(t)}</label>`).join("")}</div>
        <textarea class="br-ta" rows="3" maxlength="800" placeholder="What should it say? (optional)"></textarea>
        <div class="br-btns" style="justify-content:flex-start;margin-top:12px"><button class="br-next" type="button" data-send>Send report</button></div>`,
      onOpen: body => { body.querySelector("[data-send]").onclick = () => {
        BGX.track("mistake_report", Object.assign({}, info, { reason: body.querySelector("input[name=why]:checked").value, comment: body.querySelector("textarea").value.trim().slice(0, 800) }));
        body.innerHTML = `<h2 class="br-sheettitle">Thank you!</h2><p>Your report has been sent. We check every one and fix mistakes quickly.</p>`;
      }; } });
  }
  const SUBJECTS = ["Biology", "Microbiology", "Physics", "Mathematics", "Data analytics & statistics", "Economics", "Law", "Psychology", "Computer science"];
  const FEATURES = ["Accounts that sync across devices", "Teacher dashboard for classes", "Spanish version", "French version", "Flashcards with spaced repetition", "Audio read-aloud", "More virtual labs", "Leaderboards with friends", "A phone app that works offline"];
  function openVote() {
    const prev = fbDone().vote;
    const box = (name, list) => list.map(t => `<label><input type="checkbox" name="${name}" value="${esc(t)}"${prev && (prev[name] || []).indexOf(t) >= 0 ? " checked" : ""}> ${esc(t)}</label>`).join("");
    BGX.sheet({ label: "What should we build next?", title: "What should we build next?", wide: true,
      html: `<p class="br-hint" style="margin:0 0 14px">Pick up to 3 subjects and up to 3 features. Results are shared with all testers.</p>
        <p class="br-label">Next subjects</p><div class="br-choices is-grid" data-max="3">${box("subjects", SUBJECTS)}</div>
        <p class="br-label" style="margin-top:16px">Next features</p><div class="br-choices is-grid" data-max="3">${box("features", FEATURES)}</div>
        <input class="br-ta" maxlength="160" placeholder="Something else? (optional)" value="${esc(prev && prev.other || "")}">
        <div class="br-btns" style="justify-content:flex-start;margin-top:14px"><button class="br-next" type="button" data-send>${prev ? "Update my vote" : "Send my vote"}</button></div>`,
      onOpen: body => {
        body.querySelectorAll(".br-choices[data-max]").forEach(g => g.addEventListener("change", e => {
          const ticked = g.querySelectorAll("input:checked"); if (ticked.length > 3) e.target.checked = false;
        }));
        body.querySelector("[data-send]").onclick = () => {
          const pick = n => [...body.querySelectorAll(`input[name=${n}]:checked`)].map(i => i.value);
          const v = { subjects: pick("subjects"), features: pick("features"), other: body.querySelector("input.br-ta").value.trim().slice(0, 160) };
          if (!v.subjects.length && !v.features.length && !v.other) { BGX.toast("Pick at least one option"); return; }
          BGX.track("vote", { subjects: v.subjects, features: v.features, other: v.other, revote: !!prev });
          fbSet("vote", v); BGX.sfx.win();
          body.innerHTML = `<h2 class="br-sheettitle">Thanks for voting!</h2><p>We'll share the results with every tester and build the winners first.</p>`;
          refreshHub();
        };
      } });
  }
  /* beta survey (Tally popup); completing it awards the Founding Tester badge */
  function openSurvey() {
    if (!on.survey) return;
    const go = () => window.Tally.openPopup(C.tallySurvey, { layout: "modal", width: 600, autoClose: 2500,
      hiddenFields: { level: BGX.xp.level().n, games: Object.keys(localStorage).filter(k => k.indexOf("bgx_prog_") === 0).length },
      onSubmit: () => { awardTester(); BGX.track("survey_done"); } });
    if (window.Tally) go(); else { const s = document.createElement("script"); s.src = "https://tally.so/widgets/embed.js"; s.onload = go; document.head.appendChild(s); }
    BGX.track("survey_open");
  }
  function awardTester() {
    if (fbDone().tester) return;
    fbSet("tester", new Date().toISOString().slice(0, 10));
    setTimeout(() => {
      BGX.sfx.big(); BGX.rain(260);
      BGX.popup("Founding Tester", `<div style="width:140px;margin:0 auto">${testerBadge(true)}</div><p class="br-label" style="margin:8px 0 0">Thank you</p><h2>Founding Tester!</h2>
        <p>You helped shape BioglowRX. Your badge is in the trophy cabinet.</p><div class="br-btns"><button class="br-next" data-close>Keep playing</button></div>`, { cls: "is-award" });
      refreshHub();
    }, 2800);
  }
  function testerBadge(won) {
    const c1 = won ? "#2fb67c" : "#c5ccd5", c2 = won ? "#0e6b66" : "#9aa3ae";
    return `<svg class="br-testerbadge" viewBox="0 0 120 120" aria-hidden="true"><path d="M60 6l14 10 17-1 6 16 14 9-5 16 5 16-14 9-6 16-17-1-14 10-14-10-17 1-6-16-14-9 5-16-5-16 14-9 6-16 17 1z" fill="${c1}"/><circle cx="60" cy="60" r="36" fill="${c2}"/><circle cx="60" cy="60" r="30" fill="none" stroke="#fff" stroke-opacity=".55" stroke-dasharray="2 3"/>
      <text x="60" y="52" text-anchor="middle" font-family="Chivo,sans-serif" font-weight="900" font-size="15" fill="#fff">FOUNDING</text><text x="60" y="70" text-anchor="middle" font-family="Chivo,sans-serif" font-weight="900" font-size="15" fill="#fff">TESTER</text><text x="60" y="84" text-anchor="middle" font-family="Chivo Mono,monospace" font-size="8" fill="#9bf5cf">BETA 2026</text></svg>`;
  }

  /* ---------- pieces for the hub, header, game end, cabinet ---------- */
  function hubCard() {
    const f = fbDone(), invited = !!BGX.store.get("xponce", {}).invite;
    return `<section class="br-testers" id="br-testers"><div class="t"><p class="br-label" style="margin:0">Founding Testers · free beta</p>
        <h3>Help us build BioglowRX</h3><p>Everything is free while we test. Invite friends, tell us what to fix and vote on what comes next.</p></div>
      <div class="acts">
        <button class="br-next" type="button" data-bgx-invite>${BGX.icon("gift")} Invite a friend${invited ? "" : ` <em>+${INVITE_XP} XP</em>`}</button>
        ${on.feedback ? `<button class="br-ghost" type="button" data-bgx-vote>${BGX.icon("vote")} ${f.vote ? "Change my vote" : "Vote: what's next?"}</button>` : ""}
        ${on.survey ? `<button class="br-ghost" type="button" data-bgx-survey>${f.tester ? "✓ Founding Tester" : "2-minute survey · get the badge"}</button>` : ""}
      </div></section>`;
  }
  function refreshHub() { const el = document.getElementById("br-testers"); if (el) el.outerHTML = hubCard(); }
  const headerButton = () => `<button class="br-cab br-invbtn" type="button" data-bgx-invite aria-label="Invite a friend">${BGX.icon("gift")}<span>Invite</span></button>`;
  function cabinetShelfItem() {
    if (!on.survey && !fbDone().tester) return "";
    const won = !!fbDone().tester;
    return `<div class="br-frame is-flask${won ? " is-won" : " is-locked"}" ${won ? "" : 'data-bgx-survey role="button" tabindex="0"'}>${testerBadge(won)}<span class="cap"><b>Founding Tester</b><small>${won ? "Beta 2026" : "Answer the 2-minute survey"}</small></span></div>`;
  }

  /* ---------- one click handler for everything ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-bgx-invite],[data-bgx-vote],[data-bgx-survey],[data-bgx-challenge],[data-bgx-report],[data-bgx-play],[data-rate],[data-rate-send]");
    if (!t) return;
    if (t.matches("[data-bgx-invite]")) BGX.invite();
    else if (t.matches("[data-bgx-vote]")) { BGX.sfx.tap(); openVote(); }
    else if (t.matches("[data-bgx-survey]")) openSurvey();
    else if (t.matches("[data-bgx-challenge]") && BGX.lastRound) BGX.challenge(BGX.game, BGX.lastRound.mode, BGX.lastRound.score, BGX.lastRound.total);
    else if (t.matches("[data-bgx-report]") && BGX.lastQuestion) openReport(BGX.lastQuestion);
    else if (t.matches("[data-bgx-play]") && BGX.startMode) BGX.startMode(t.dataset.bgxPlay);
    else if (t.matches("[data-rate]")) {
      const box = t.closest(".br-rate"); box.querySelectorAll("[data-rate]").forEach(b => b.classList.toggle("is-on", b === t));
      box.dataset.rating = t.dataset.rate; box.querySelector(".more").hidden = false;
      BGX.track("round_rating", { game: box.dataset.game, mode: box.dataset.mode, score: +box.dataset.score, total: +box.dataset.total, rating: +t.dataset.rate });
    } else if (t.matches("[data-rate-send]")) {
      const box = t.closest(".br-rate"), txt = box.querySelector("textarea").value.trim();
      if (txt) BGX.track("round_comment", { game: box.dataset.game, mode: box.dataset.mode, rating: +box.dataset.rating, comment: txt.slice(0, 600) });
      box.innerHTML = `<p>Thanks for the feedback!</p>`;
    }
  });
  document.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-bgx-survey][role=button]")) { e.preventDefault(); openSurvey(); } });

  // first visit from an invite or challenge link
  loadPosthog();
  const ref = new URLSearchParams(location.search).get("ref");
  if (ref) BGX.track("arrived", { ref });

  BGX.community = { on, endCard, reportBtn, challengeBanner, hubCard, headerButton, cabinetShelfItem, openVote, openSurvey, openReport, testerBadge, INVITE_XP };
})();
