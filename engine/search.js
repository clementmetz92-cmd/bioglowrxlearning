/* BioglowRX — site search. BGX.searchMount(el, opts) turns el into a search box over every game, lab,
   practice topic and card. The index (data/search-index.js, built by tools-search-index.py) loads on first use. */
(function () {
  "use strict";
  const BGX = window.BGX = window.BGX || {}, esc = BGX.esc || (s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]));
  const SUB = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "⁺": "+", "⁻": "-" };
  /* one spelling for UK and US words on both sides (fibre/fiber, haemoglobin/hemoglobin, ionisation/ionization, colour/color) */
  const spell = w => w.replace(/isation/g, "ization").replace(/is(e|ed|es|ing)$/, "iz$1").replace(/yse$/, "yze").replace(/([bt])re(s?)$/, "$1er$2")
    .replace(/our(s?)$/, "or$1").replace(/ae/g, "e").replace(/oe/g, "e").replace(/sulph/g, "sulf").replace(/aluminium/g, "aluminum");
  const norm = s => String(s || "").replace(/[₀-₉⁺⁻]/g, c => SUB[c]).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[a-z]+/g, w => w.length > 3 ? spell(w) : w);
  /* everyday, UK and US names for the same thing: any one finds the others */
  const SYN = [["paracetamol", "acetaminophen"], ["adrenaline", "epinephrine"], ["noradrenaline", "norepinephrine"], ["salbutamol", "albuterol"],
    ["glyceryl trinitrate", "nitroglycerin", "gtn"], ["frusemide", "furosemide"], ["pethidine", "meperidine"], ["water tablet", "diuretic"],
    ["heart attack", "myocardial infarction"], ["bp", "blood pressure"], ["blood sugar", "glucose"], ["stroke", "cerebrovascular"],
    ["painkiller", "analgesic"], ["antibiotic", "antimicrobial"], ["periodic table", "element"], ["vitamin c", "ascorbic"], ["kidney", "renal"],
    ["poo", "stool", "faeces"], ["wee", "urine"], ["tummy", "stomach", "abdomen"], ["bone", "skeleton"], ["nerve", "neuron"]].map(g => g.map(x => norm(x)));
  const STOP = new Set("how many much what which who why when where is are was the a an of do does did to for in on with about can i my me tell show".split(" "));
  const TYPE = { topic: 16, game: 14, lab: 14, card: 0 };
  const LABEL = { topic: "Practice topic", game: "Chapter", lab: "Hands-on lab", card: "Card" };
  let idx = null, loading = null;

  function load() {
    if (idx) return Promise.resolve(idx);
    if (loading) return loading;
    loading = new Promise((ok, bad) => {
      const s = document.createElement("script");
      const v = (document.querySelector('script[src*="engine/search.js"]') || {}).src || "";
      s.src = (BGX.root || "") + "data/search-index.js" + ((v.match(/\?v=\d+/) || [""])[0]);
      s.onload = () => {
        const D = window.BGX_SEARCH;
        const U = BGX.u || (t => t);   // US or UK side of {{us:…|uk:…}} marks (the keywords hold both sides)
        idx = D.items.map(([type, name, subj, detail, url, kw, body]) => { name = U(name); detail = U(detail); return { type, name, subj, detail, url, n: norm(name), d: norm(detail), k: norm(kw), b: norm(body || "") }; });
        idx.subjects = D.subjects; ok(idx);
      };
      s.onerror = () => { loading = null; bad(new Error("index")); };
      document.head.appendChild(s);
    });
    return loading;
  }

  /* a query part is a list of alternatives (a word plus its synonyms); the best-matching alternative counts */
  function score(e, parts) {
    let total = TYPE[e.type];
    for (const alts of parts) {
      let best = 0;
      for (const t of alts) { const v = one(e, t); if (v > best) best = v; }
      if (!best) return 0;
      total += best;
    }
    return total;
  }
  function one(e, t) {
    {
      const wordStart = new RegExp("(^|[^a-z0-9])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      let s = 0;
      const exactWord = new RegExp("(^|[^a-z0-9])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-z0-9])");
      const stem = t.length >= 6 ? t.slice(0, -2) : null;
      if (e.n === t) s = 100;
      else if (t.length <= 3 && exactWord.test(e.k)) s = 80;     // element symbols, short codes: "Fe", "K", "pH"
      else if (e.n.startsWith(t)) s = 70;
      else if (wordStart.test(e.n)) s = 50;
      else if (t.length >= 3 && e.n.includes(t)) s = 30;
      else if (wordStart.test(e.k)) s = 14;
      else if (wordStart.test(e.d)) s = 10;
      else if (t.length >= 4 && (e.k.includes(t) || e.d.includes(t))) s = 6;
      else if (stem && e.n.includes(stem)) s = 24;             // mitochondria → Mitochondrion
      else if (t.length >= 4 && wordStart.test(e.b)) s = 5;      // words inside the card's own text
      else if (t.indexOf(" ") > 0 && (e.d.includes(t) || e.k.includes(t) || e.b.includes(t))) s = 8;   // a two-word name
      return s;
    }
  }

  function search(q, boost) {
    let text = " " + norm(q).replace(/[^a-z0-9+\-]+/g, " ") + " ";
    const parts = [];
    /* pull out known multi-word names first ("heart attack", "blood pressure") */
    SYN.forEach(g => g.forEach(x => { if (x.indexOf(" ") > 0 && text.indexOf(" " + x + " ") >= 0) { text = text.replace(" " + x + " ", " "); parts.push(g); } }));
    text.trim().split(/\s+/).filter(t => t && !STOP.has(t)).forEach(t => {
      const t1 = t.length > 4 && /s$/.test(t) && !/ss$/.test(t) ? t.slice(0, -1) : t;   // plurals: bones → bone
      const g = SYN.find(gr => gr.indexOf(t) >= 0 || gr.indexOf(t1) >= 0);
      parts.push(g ? Array.from(new Set([t, t1].concat(g))) : (t1 !== t ? [t, t1] : [t]));
    });
    if (!parts.length || !idx) return [];
    const res = [];
    for (const e of idx) { const s = score(e, parts); if (s) res.push([s + (boost && e.subj === boost ? 25 : 0), e]); }
    res.sort((a, b) => b[0] - a[0] || a[1].name.length - b[1].name.length);
    return res.map(r => r[1]);
  }

  const mark = (text, q) => {
    let h = esc(text);
    norm(q).split(/[^a-z0-9]+/).filter(t => t.length > 1).forEach(t => {
      const i = norm(text).indexOf(t);
      if (i >= 0 && norm(text).length === text.length) {
        const a = esc(text.slice(0, i)), b = esc(text.slice(i, i + t.length)), c = esc(text.slice(i + t.length));
        h = `${a}<mark>${b}</mark>${c}`;
      }
    });
    return h;
  };

  BGX.searchMount = (el, opts = {}) => {
    if (!el) return;
    const ph = (matchMedia("(max-width: 560px)").matches ? opts.short : opts.placeholder) || (matchMedia("(max-width: 560px)").matches ? "Search: try femur, pH or dose" : "Search chapters, topics and cards: try femur, pH, dose or cranial");
    el.classList.add("br-search");
    el.innerHTML = `<label class="br-searchbox"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg></span>
      <input type="search" placeholder="${esc(ph)}" aria-label="Search all chapters, topics and cards" autocomplete="off" spellcheck="false" enterkeyhint="search" role="combobox" aria-expanded="false" aria-controls="br-sres" aria-autocomplete="list">
      <button type="button" class="clr" aria-label="Clear search" hidden>✕</button></label>
      <div class="br-sres" id="br-sres" role="listbox" hidden></div>`;
    const inp = el.querySelector("input"), box = el.querySelector(".br-sres"), clr = el.querySelector(".clr");
    let act = -1, list = [], tmr = 0;
    const R = BGX.root || "";
    const subj = id => (idx && idx.subjects[id]) || ["", "cat-mint"];
    const render = () => {
      const q = inp.value.trim();
      clr.hidden = !q;
      if (!q) { box.hidden = true; inp.setAttribute("aria-expanded", "false"); return; }
      if (!idx) { box.hidden = false; box.innerHTML = `<p class="none">Loading…</p>`; return; }
      const all = search(q, opts.subject), top = all.slice(0, 10);
      list = top; act = top.length ? 0 : -1;
      if (!top.length) { box.innerHTML = `<p class="none">No match for “${esc(q)}”. Try a shorter word, or <a href="${R}practice/index.html">browse the practice topics</a>.</p>`; box.hidden = false; return; }
      box.innerHTML = top.map((e, i) => {
        const [sn, col] = subj(e.subj);
        const where = e.type === "card" ? `${esc(sn)} · in ${esc(e.url.match(/games\/([^/]+)/) ? gameName(e) : "")}` : `${esc(sn)} · ${LABEL[e.type]}`;
        return `<a class="br-sr${i === act ? " is-act" : ""}" role="option" id="br-sr${i}" href="${R}${esc(e.url)}" data-i="${i}">
          <span class="dot" style="background:var(--${col})" aria-hidden="true">${e.type === "card" ? "◆" : e.type === "lab" ? "⚗" : e.type === "topic" ? "★" : "▶"}</span>
          <span class="t"><b>${mark(e.name, q)}</b>${e.detail ? `<em>${esc(e.detail)}</em>` : ""}<small>${where}</small></span></a>`;
      }).join("") + (all.length > top.length ? `<p class="more">${all.length - top.length} more: add another word to narrow it down</p>` : "");
      box.hidden = false; inp.setAttribute("aria-expanded", "true");
      inp.setAttribute("aria-activedescendant", act >= 0 ? "br-sr" + act : "");
    };
    const games = {};
    function gameName(e) {
      const id = (e.url.match(/games\/([^/]+)/) || [])[1];
      if (!games.ready && idx) { idx.forEach(x => { if (x.type === "game" || x.type === "lab") games[(x.url.match(/games\/([^/]+)/) || [])[1]] = x.name; }); games.ready = 1; }
      return games[id] || "";
    }
    const go = () => {
      const e = list[act >= 0 ? act : 0]; if (!e) return;
      if (BGX.track) BGX.track("search_open", { q: inp.value.trim().slice(0, 60), type: e.type, name: e.name });
      location.href = R + e.url;
    };
    const paintAct = () => box.querySelectorAll(".br-sr").forEach((a, i) => { a.classList.toggle("is-act", i === act); if (i === act) a.scrollIntoView({ block: "nearest" }); });
    inp.addEventListener("focus", () => { load().then(render).catch(() => {}); });
    inp.addEventListener("input", () => { clearTimeout(tmr); tmr = setTimeout(() => load().then(render).catch(() => { box.hidden = false; box.innerHTML = `<p class="none">Search could not load. Check your connection.</p>`; }), 80); });
    inp.addEventListener("keydown", ev => {
      if (ev.key === "ArrowDown" && list.length) { ev.preventDefault(); act = (act + 1) % list.length; paintAct(); }
      else if (ev.key === "ArrowUp" && list.length) { ev.preventDefault(); act = (act - 1 + list.length) % list.length; paintAct(); }
      else if (ev.key === "Enter") { ev.preventDefault(); go(); }
      else if (ev.key === "Escape") { inp.value = ""; render(); }
    });
    box.addEventListener("click", ev => { const a = ev.target.closest(".br-sr"); if (!a) return; act = +a.dataset.i; if (BGX.track) BGX.track("search_open", { q: inp.value.trim().slice(0, 60), type: list[act].type, name: list[act].name }); });
    clr.onclick = () => { inp.value = ""; render(); inp.focus(); };
    document.addEventListener("click", ev => { if (!el.contains(ev.target)) box.hidden = true; });
    inp.addEventListener("focus", () => { if (inp.value.trim()) box.hidden = false; });
  };
  BGX.searchTest = q => load().then(() => search(q).slice(0, 10).map(e => e.type + ":" + e.name));   // test hook
})();
