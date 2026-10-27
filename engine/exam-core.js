/* BioglowRX — Pre-Exam Simulator, core (no page drawing).
   Question banks (data/exams/<subject>.js) call BGX.registerExamBank({...}); game data files loaded on the
   same page call BGX.registerGame({...}) and are kept here so a bank can reuse their content through `sources`.
   This file builds the pool of questions, makes a paper for a format, and scores answers. It also runs in Node
   (tools-validate.js), so it never touches the page. Schema: data/README.md › "Pre-exam simulator". */
(function (root) {
  "use strict";
  const BGX = root.BGX = root.BGX || {};
  const X = BGX.exam = BGX.exam || {};
  X.banks = X.banks || {}; X.games = X.games || {};
  const U = t => (BGX.u ? BGX.u(t) : t);
  BGX.registerExamBank = b => { if (BGX.uDeep) BGX.uDeep(b); X.banks[b.subject] = b; };
  /* on exam pages engine/game.js is not loaded: a game's data file only hands its content over */
  if (!BGX.registerGame) BGX.registerGame = g => { if (BGX.uDeep) BGX.uDeep(g); (g.items || []).forEach((it, i) => { if (it.num == null) it.num = i + 1; it._i = i; }); X.games[g.id] = g; };

  const KINDS = ["single", "sata", "numeric", "match", "order", "first", "case", "diagram"];
  const KIND_LABEL = { single: "Single best answer", sata: "Select all that apply", numeric: "Calculation", match: "Matching", order: "Ordering", first: "Priority (what first)", case: "Case questions", diagram: "Diagram ID" };
  X.KINDS = KINDS; X.KIND_LABEL = KIND_LABEL;

  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.random() * a.length | 0];
  X.shuffle = shuffle;

  /* ---------- numbers ---------- */
  const roundTo = (x, dp) => Math.round(x * Math.pow(10, dp) + 1e-9 * Math.sign(x || 1)) / Math.pow(10, dp);
  /* "1,050", "1050.0", "0,5", "2.19e-3", "−4" are all read as numbers */
  const parseNum = s => { s = String(s == null ? "" : s).trim().replace(/\s/g, "").replace(/^[−–]/, "-").replace(/[×x]10\^?(-?\d+)$/i, "e$1");
    if (/^-?[1-9]\d{0,2}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, ""); else s = s.replace(",", ".");
    return s === "" || isNaN(+s) ? NaN : +s; };
  const nf = (x, dp) => typeof x === "number" ? (+x.toFixed(dp == null ? 4 : dp)).toLocaleString("en-US", { maximumFractionDigits: dp == null ? 4 : dp }) : x;
  const nfd = (x, dp, noTrail) => (+(+x).toFixed(dp || 0)).toLocaleString("en-US", { minimumFractionDigits: noTrail ? 0 : dp || 0, maximumFractionDigits: dp || 0 }).replace(/^-/, "−");
  X.num = { roundTo, parseNum, nf, nfd };

  function makeVars(p) {
    for (let t = 0; t < 80; t++) {
      const v = p.make ? p.make() : {};
      Object.keys(p.vars || {}).forEach(k => { const d = p.vars[k];
        if (Array.isArray(d)) v[k] = pick(d); else { const n = Math.round((d.max - d.min) / (d.step || 1)); v[k] = roundTo(d.min + Math.floor(Math.random() * (n + 1)) * (d.step || 1), 6); } });
      Object.assign(v, p.derive ? p.derive(v) : {});
      const a = p.answer(v);
      if (isFinite(a) && (a > 0 || (p.signed && a !== 0)) && (!p.ok || p.ok(v, a))) { v.answer = a; return v; }
    }
    throw new Error("exam: no valid numbers for problem " + p.id);
  }
  /* plain-text fill of a problem's text or step with its numbers */
  const ptext = (tpl, v, p, noTrail) => U(String(tpl)).replace(/\{(\w+)\}/g, (m, k) => k === "answer" ? nfd(roundTo(v.answer, p.dp || 0), p.dp, noTrail) + (p.unit ? " " + p.unit : "") : v[k] == null ? m : U(String(nf(v[k]))));

  /* ---------- game helpers ---------- */
  const catName = (G, c) => ((G.categories || []).find(x => x.id === c) || {}).name || "";
  const gfill = (G, tpl, it) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => k === "category" ? catName(G, it.cat) : (it[k] == null ? "" : it[k]));
  const gval = (G, f, it) => f == null ? "" : String(f).indexOf("{") >= 0 ? gfill(G, f, it) : f === "category" ? catName(G, it.cat) : it[f];
  const topicFor = (src, cat) => typeof src.topic === "string" ? src.topic : (src.topic && src.topic[cat]) || src.topicDefault || null;
  const gameOf = id => X.games[id];
  const modeOf = (G, id) => (G.modes || []).find(m => m.id === id);

  /* ---------- the pool: every question a bank can use (its own items + content reused from games) ---------- */
  /* entry: { id, topic, kind, slots, recall, difficulty, src, from, make() → slot states, resolve(slot) → question } */
  function bankEntry(b, it) {
    const parts = it.kind === "case" ? it.parts || [] : null;
    return { id: it.id, topic: it.topic, kind: it.kind, slots: parts ? parts.length : 1, recall: !!it.recall, difficulty: it.difficulty || 2, src: it.src, from: "bank", def: it,
      /* an ordering question never starts in the right order */
      make: () => { const st = d => d.kind === "order" && Array.isArray(d.steps) ? { start: shuffleNot(d.steps.map((t, i) => i)) } : {};
        return parts ? parts.map((p, i) => Object.assign({ e: it.id, part: i }, st(p))) : [Object.assign({ e: it.id }, st(it))]; },
      resolve: s => fromDef(parts ? Object.assign({}, parts[s.part], { _case: it, _part: s.part }) : it, s, it) };
  }
  /* an authored definition (or a case part) → a question */
  function fromDef(d, s, top) {
    const q = { kind: d.kind || "single", stem: d.stem || d.q || "", why: d.why || "", whyOpt: d.whyOpt || null, data: d.data || null, lead: d.lead || "", src: top.src, difficulty: top.difficulty || 2 };
    if (d._case) { q.caseOf = { id: top.id, title: top.title || "", who: top.who || "", stem: top.stem || "", data: top.data || null, part: d._part, n: top.parts.length }; q.data = d.data || null; }
    if (q.kind === "numeric") {
      if (d.problem) { const G = gameOf(d.problem.game), p = G && (G.problems || []).find(x => x.id === d.problem.id); if (p) return Object.assign(problemQ(G, p, s), { stem: d.stem ? ptext(d.stem, s.vars, p) : problemQ(G, p, s).stem, why: d.why || problemQ(G, p, s).why, traps: d.traps || null }); }
      Object.assign(q, { answer: +d.answer, unit: d.unit || "", dp: d.dp || 0, tol: d.tol || null, steps: d.steps || null, traps: d.traps || null, noTrail: !!d.noTrail });
    } else if (q.kind === "match") {
      q.left = d.pairs.map(p => p[0]); q.right = d.pairs.map(p => p[1]).concat(d.extra || []); q.answer = d.pairs.map((p, i) => i); q.allOrNothing = !!d.allOrNothing;
      q.rightOrder = s.rorder || null; q.whyPair = d.whyPair || null;
    } else if (q.kind === "order") { q.steps = d.steps.slice(); q.start = s.start || null; }
    else {
      if (q.kind === "diagram") { q.diagram = d.diagram; q.spot = d.spot; q.dgItem = { spot: d.spot, name: "", row: d.row, col: d.col }; }
      q.options = d.options.slice(); q.answer = d.answer; q.order = s.order || null; q.fixedOrder = !!d.fixedOrder;
    }
    return q;
  }
  function problemQ(G, p, s) {
    const v = s.vars, noTrail = G.subject === "pharmacology";
    return { kind: "numeric", stem: ptext(p.text, v, p), answer: v.answer, unit: p.unit || "", dp: p.dp || 0, tol: p.tol != null ? { abs: p.tol } : null, signed: !!p.signed, noTrail,
      steps: (p.steps || []).map(t => ptext(t, v, p, noTrail)), why: p.formula ? "Formula: " + U(p.formula) + (p.tip ? ". " + U(p.tip) : "") : U(p.tip || ""),
      hint: p.hint ? (x => { try { return U(p.hint(v, x) || ""); } catch (e) { return ""; } }) : null, thousand: p.thousand || G.thousand || "" };
  }
  /* sources: { game, use: problems|sequences|cases|pairs|exam|diagram|quiz|sortit|truemyth, topic: id | {cat: id}, topicDefault, only: [cats or ids], mode, ids: [...], pairs: 5, recall } */
  const ADAPT = {
    problems: (G, src) => (G.problems || []).filter(p => (!src.only || src.only.indexOf(p.cat) >= 0) && (!src.ids || src.ids.indexOf(p.id) >= 0)).map(p => ({
      id: `${G.id}:p:${p.id}`, topic: topicFor(src, p.cat), kind: "numeric", slots: 1, difficulty: src.difficulty || 2, gen: true,
      make: () => { const v = makeVars(p), keep = {}; Object.keys(v).forEach(k => { if (typeof v[k] !== "function") keep[k] = v[k]; }); return [{ e: `${G.id}:p:${p.id}`, vars: keep }]; },
      resolve: s => problemQ(G, p, s) })),
    sequences: (G, src) => (G.sequences || []).filter(q => !src.only || src.only.indexOf(q.id) >= 0).map(q => { const id = `${G.id}:s:${q.id || q.title}`; return {
      id, topic: topicFor(src, q.cat || (G.categories[0] || {}).id), kind: "order", slots: 1, difficulty: 2,
      make: () => [{ e: id, start: shuffleNot(q.steps.map((t, i) => i)) }],
      resolve: s => ({ kind: "order", stem: "Put these in order: " + q.title, steps: q.steps.slice(), start: s.start, why: q.note || "" }) }; }),
    cases: (G, src) => (G.cases || []).filter(c => !src.only || src.only.indexOf(c.cat) >= 0).map(c => { const id = `${G.id}:c:${c.id || c.title}`; return {
      id, topic: topicFor(src, c.cat), kind: "case", slots: c.steps.length, difficulty: 2,
      make: () => c.steps.map((st, i) => ({ e: id, part: i })),
      resolve: s => { const st = c.steps[s.part]; return { kind: "single", stem: st.q, options: st.options.slice(), answer: st.answer, why: st.why || "", order: s.order || null,
        caseOf: { id, title: c.title, who: c.who || "", stem: c.story, data: c.data || null, part: s.part, n: c.steps.length } }; } }; }),
    pairs: (G, src) => { const m = modeOf(G, src.mode) || (G.modes || []).find(x => x.format === "matchpairs"); if (!m) return [];
      const pool = G.items.filter(it => it[m.clue] && (!(src.only || m.only) || (src.only || m.only).indexOf(it.cat) >= 0)), seen = new Set(), names = new Set();
      const ok = pool.filter(it => { const c = String(it[m.clue]); if (seen.has(c) || names.has(it.name)) return false; seen.add(c); names.add(it.name); return true; });
      const n = Math.min(src.pairs || 5, ok.length); if (n < 3) return [];
      const id = `${G.id}:m:${m.id}`;
      return [{ id, topic: topicFor(src, (m.only || [])[0] || ok[0].cat), kind: "match", slots: 1, difficulty: 2,
        make: () => [{ e: id, pick: shuffle(ok.map((x, i) => i)).slice(0, n) }],
        resolve: s => { const its = s.pick.map(k => ok[k]).filter(Boolean);
          return { kind: "match", stem: `Match each ${G.itemNoun || "term"} to its ${String(m.clueLabel || "clue").toLowerCase()}.`, left: its.map(x => x.name), right: its.map(x => String(x[m.clue])),
            answer: its.map((x, i) => i), rightOrder: s.rorder, why: "", whyPair: its.map(x => x.life || x.summary || "") }; } }]; },
    exam: (G, src) => (G.exam || []).filter(x => (!src.only || src.only.indexOf(x.cat) >= 0) && (!src.kind || x.kind === src.kind)).map(x => { const id = `${G.id}:x:${x.id}`; return {
      id, topic: topicFor(src, x.cat), kind: Array.isArray(x.answer) ? "sata" : "first", slots: 1, difficulty: x.difficulty || 2,
      make: () => [{ e: id }], resolve: s => ({ kind: Array.isArray(x.answer) ? "sata" : "first", lead: x.stem || "", stem: x.q, options: x.options.slice(), answer: x.answer, why: x.why || "", whyOpt: x.whyOpt || null, order: s.order || null }) }; }),
    diagram: (G, src) => {
      if (!G.diagram) return [];
      const withSpot = G.items.filter(it => it.spot != null && (!src.only || src.only.indexOf(it.cat) >= 0));
      const spotKey = it => [].concat(it.spot).join("+"), bySpot = {};
      withSpot.forEach(it => { (bySpot[spotKey(it)] = bySpot[spotKey(it)] || new Set()).add(it.name); });
      const all = G.items.filter(it => it.spot != null);
      return withSpot.filter(it => bySpot[spotKey(it)].size === 1 && !leaks(G.diagram, it)).map(it => { const id = `${G.id}:d:${it.num}`; return {
        id, topic: topicFor(src, it.cat), kind: "diagram", slots: 1, difficulty: 2,
        make: () => { const others = shuffle(all.filter(x => x.name !== it.name && spotKey(x) !== spotKey(it))); const near = others.filter(x => x.cat === it.cat).concat(others.filter(x => x.cat !== it.cat));
          const opts = [it.name]; near.forEach(x => { if (opts.length < 4 && opts.indexOf(x.name) < 0) opts.push(x.name); }); return [{ e: id, opts }]; },
        resolve: s => ({ kind: "diagram", stem: src.prompt || "Name the highlighted structure.", diagram: G.diagram, dgItem: Object.assign({}, it), options: s.opts.slice(), answer: 0, order: s.order || null,
          why: `${it.name}${it.summary ? ": " + it.summary : it.job ? ": " + it.job : ""}` }) }; }); },
    quiz: (G, src) => { const m = modeOf(G, src.mode); if (!m || m.format !== "quiz" || !m.show || m.showAs === "tile") return [];
      const pool = G.items.filter(it => (!m.only || m.only.indexOf(it.cat) >= 0) && (!src.only || src.only.indexOf(it.cat) >= 0));
      const ansOf = it => gval(G, m.answer, it), showOf = it => gval(G, m.show, it);
      const dup = {}; pool.forEach(it => { const a = String(ansOf(it)); dup[a] = (dup[a] || 0) + 1; });
      return pool.filter(it => ansOf(it) != null && ansOf(it) !== "" && dup[String(ansOf(it))] === 1 && showOf(it)).map(it => { const id = `${G.id}:q:${m.id}:${it.num}`; return {
        id, topic: topicFor(src, it.cat), kind: "single", slots: 1, recall: src.recall !== false, difficulty: 1,
        make: () => { const ok = new Set((it.alsoOk || []).map(String)), right = String(ansOf(it)), opts = [right];
          const P = shuffle(pool.filter(x => x !== it)), near = P.filter(x => x.cat === it.cat).concat(P.filter(x => x.cat !== it.cat));
          near.forEach(x => { const a = String(ansOf(x)); if (opts.length < 4 && a && opts.indexOf(a) < 0 && !ok.has(a)) opts.push(a); });
          return [{ e: id, opts }]; },
        resolve: s => ({ kind: "single", stem: gfill(G, m.prompt || "", it).replace(/[:\s]+$/, ""), big: String(showOf(it)), options: s.opts.slice(), answer: 0, order: s.order || null,
          why: [it.name, it.life || it.summary || ""].filter(Boolean).join(": ") }) }; }); },
    sortit: (G, src) => { const m = modeOf(G, src.mode) || (G.modes || []).find(x => x.format === "sortit"); if (!m) return [];
      const cats = (G.categories || []).filter(c => !m.only || m.only.indexOf(c.id) >= 0); if (cats.length < 2) return [];
      return G.items.filter(it => cats.some(c => c.id === it.cat) && (!src.only || src.only.indexOf(it.cat) >= 0)).map(it => { const id = `${G.id}:o:${m.id}:${it.num}`; return {
        id, topic: topicFor(src, it.cat), kind: "single", slots: 1, recall: true, difficulty: 1,
        make: () => [{ e: id, opts: [catName(G, it.cat)].concat(shuffle(cats.filter(c => c.id !== it.cat)).slice(0, (m.choices || 4) - 1).map(c => c.name)) }],
        resolve: s => ({ kind: "single", stem: m.prompt || "Which group does this belong to?", big: it.name, options: s.opts.slice(), answer: 0, order: s.order || null, why: [it.name, it.life || it.summary || ""].filter(Boolean).join(": ") }) }; }); },
    truemyth: (G, src) => { const m = modeOf(G, src.mode) || (G.modes || []).find(x => x.format === "truemyth"); if (!m) return [];
      const L = m.labels || ["True", "Myth"];
      return G.items.filter(it => it.claim && typeof it.verdict === "boolean" && (!m.only || m.only.indexOf(it.cat) >= 0)).map(it => { const id = `${G.id}:t:${m.id}:${it.num}`; return {
        id, topic: topicFor(src, it.cat), kind: "single", slots: 1, recall: true, difficulty: 1,
        make: () => [{ e: id }],
        resolve: s => ({ kind: "single", stem: m.prompt || "True or myth?", big: it.claim, options: L.slice(), answer: it.verdict ? 0 : 1, fixedOrder: true, order: [0, 1], why: it.why || it.life || "" }) }; }); }
  };
  const shuffleNot = a => { if (a.length < 2) return a; let s; do s = shuffle(a); while (s.every((x, i) => x === a[i])); return s; };
  /* a diagram question must not give its own answer away: the label is hidden (BGX.dg.quiet) and the drawing's text is checked */
  function leaks(name, it) {
    const D = BGX.DIAGRAMS && BGX.DIAGRAMS[name]; if (!D) return false;
    try { const svg = X.quietSVG(name, it); if (!svg) return true; const txt = svg.replace(/<[^>]+>/g, " ").toLowerCase();
      const nm = String(it.name).toLowerCase(); return txt.indexOf(nm) >= 0 || nm.split(/[\s(),]+/).filter(w => w.length > 5).some(w => txt.indexOf(w) >= 0); } catch (e) { return true; }
  }
  X.quietSVG = (name, it) => { const D = BGX.DIAGRAMS && BGX.DIAGRAMS[name]; if (!D) return ""; const dg = BGX.dg || {}; const was = dg.quiet; dg.quiet = true;
    try { return (D(it) || "").replace(/<title>[\s\S]*?<\/title>/g, "").replace(/aria-label="[^"]*"/, 'aria-label="Diagram with one part highlighted"'); } finally { dg.quiet = was; } };

  const pools = {};
  X.pool = subject => {
    if (pools[subject]) return pools[subject];
    const b = X.banks[subject]; if (!b) return null;
    const out = [], byId = {}, problems = [];
    const add = e => { if (!e || !e.topic || byId[e.id]) { if (e && !e.topic) problems.push(`${e.id}: no topic`); return; } byId[e.id] = e; out.push(e); };
    (b.items || []).forEach(it => add(bankEntry(b, it)));
    (b.sources || []).forEach(src => { const G = gameOf(src.game); if (!G) { problems.push(`source ${src.game}: game data not loaded`); return; }
      const f = ADAPT[src.use]; if (!f) { problems.push(`source ${src.game}: unknown use "${src.use}"`); return; }
      try { f(G, src).forEach(add); } catch (e) { problems.push(`source ${src.game}/${src.use}: ${e.message}`); } });
    const topics = {}; (b.topics || []).forEach(t => topics[t.id] = t);
    const P = { bank: b, entries: out.filter(e => topics[e.topic]), byId, topics, problems };
    out.filter(e => !topics[e.topic]).forEach(e => problems.push(`${e.id}: unknown topic ${e.topic}`));
    return (pools[subject] = P);
  };
  X.reset = () => Object.keys(pools).forEach(k => delete pools[k]);

  /* ---------- formats and papers ---------- */
  /* which topics a format (and the student's choice, for "choose a unit" formats) covers */
  X.scopeTopics = (P, fmt, choice) => {
    const T = P.bank.topics || [], inList = (t, list) => list.indexOf(t.id) >= 0 || (t.group != null && list.indexOf(t.group) >= 0);
    let ts = fmt.topics ? T.filter(t => inList(t, fmt.topics)) : T.slice();
    const unit = fmt.units && choice ? fmt.units.find(u => u.id === choice) : null;
    if (unit) ts = ts.filter(t => unit.topics.indexOf(t.id) >= 0 || unit.topics.indexOf(t.group) >= 0);
    else if (fmt.choose && choice) ts = ts.filter(t => inList(t, [choice]));
    return ts.map(t => t.id);
  };
  X.choices = (P, fmt) => { if (!fmt.choose) return [];
    if (fmt.units) return fmt.units.map(u => ({ id: u.id, label: u.label }));
    const T = (P.bank.topics || []).filter(t => !fmt.topics || fmt.topics.indexOf(t.id) >= 0 || fmt.topics.indexOf(t.group) >= 0);
    if (fmt.choose === "group") { const g = []; T.forEach(t => { if (t.group != null && !g.some(x => x.id === t.group)) g.push({ id: t.group, label: (P.bank.groups || {})[t.group] || "Unit " + t.group }); }); return g; }
    return T.map(t => ({ id: t.id, label: t.label })); };
  X.eligible = (P, fmt, choice) => { const ts = X.scopeTopics(P, fmt, choice);
    return P.entries.filter(e => ts.indexOf(e.topic) >= 0 && (!fmt.kinds || fmt.kinds.indexOf(e.kind) >= 0) && (fmt.recallMax !== 0 || !e.recall)); };
  const slotsOf = list => list.reduce((n, e) => n + e.slots, 0);
  /* largest-remainder split of n by weights */
  const split = (n, w) => { const keys = Object.keys(w).filter(k => w[k] > 0), sum = keys.reduce((s, k) => s + w[k], 0) || 1, out = {};
    const raw = keys.map(k => ({ k, v: n * w[k] / sum })); raw.forEach(r => out[r.k] = Math.floor(r.v));
    let left = n - raw.reduce((s, r) => s + out[r.k], 0); raw.sort((a, b) => (b.v % 1) - (a.v % 1)).forEach(r => { if (left > 0) { out[r.k]++; left--; } }); return out; };
  /* opts: { only: [entry ids] (retake what I missed), avoid: Set of entry ids (last paper) } → { entries, slots, target } */
  X.plan = (P, fmt, choice, opts = {}) => {
    let pool = X.eligible(P, fmt, choice);
    if (opts.only) { const s = new Set(opts.only); pool = P.entries.filter(e => s.has(e.id)); return { entries: shuffle(pool), target: slotsOf(pool), short: false }; }
    const n = fmt.n, bp = fmt.blueprint || {}, T = P.topics;
    const keyOf = e => { if (!bp.topics) return "all"; if (bp.topics[e.topic] != null) return e.topic; const g = T[e.topic] && T[e.topic].group; return g != null && bp.topics[g] != null ? String(g) : null; };
    const quota = bp.topics ? split(n, bp.topics) : { all: n };
    let recallCap = fmt.recallMax == null ? n : Math.floor(fmt.recallMax * n);
    let recall = 0; const chosen = [], used = new Set(), avoid = opts.avoid || new Set();
    /* fill up to `room` slots from cands: questions not on the last paper first, then at random */
    const take = (cands, room) => {
      const order = shuffle(cands).sort((x, y) => (avoid.has(x.id) ? 1 : 0) - (avoid.has(y.id) ? 1 : 0));
      for (const e of order) { if (room <= 0) break;
        if (used.has(e.id) || e.slots > room || (e.recall && recall + e.slots > recallCap)) continue;
        used.add(e.id); chosen.push(e); if (e.recall) recall += e.slots; room -= e.slots; }
      return room;
    };
    /* kinds first (rarest in the pool first), each question taken from the topic with the most of its share left; then each topic's remaining share */
    const tq = Object.assign({}, quota), ok = e => !used.has(e.id) && (!e.recall || recall + e.slots <= recallCap) && (!avoid.has(e.id));
    const use = e => { used.add(e.id); chosen.push(e); if (e.recall) recall += e.slots; const k = keyOf(e); if (k != null && tq[k] != null) tq[k] -= e.slots; };
    if (bp.kinds) {
      const kq = split(n, bp.kinds), avail = kd => pool.filter(e => e.kind === kd).length;
      Object.keys(kq).sort((x, y) => avail(x) - avail(y)).forEach(kd => {
        for (let pass = 0; pass < 2; pass++) while (kq[kd] > 0) {
          const c = pool.filter(e => e.kind === kd && e.slots <= kq[kd] + (kd === "case" ? 2 : 0) && (pass ? !used.has(e.id) && (!e.recall || recall + e.slots <= recallCap) : ok(e)) && (tq[keyOf(e)] || 0) >= e.slots);
          if (!c.length) break;
          const best = Math.max(...c.map(e => tq[keyOf(e)] / (quota[keyOf(e)] || 1))), pickFrom = c.filter(e => tq[keyOf(e)] / (quota[keyOf(e)] || 1) === best);
          const e = pick(pickFrom); use(e); kq[kd] -= e.slots;
        }
      });
    }
    Object.keys(tq).sort((x, y) => tq[y] - tq[x]).forEach(k => { if (tq[k] > 0) tq[k] = take(pool.filter(e => keyOf(e) === k && (!bp.kinds || bp.kinds[e.kind] != null)), tq[k]); });
    Object.keys(tq).forEach(k => { if (tq[k] > 0) tq[k] = take(pool.filter(e => keyOf(e) === k), tq[k]); });
    const have = slotsOf(chosen); if (have < n) take(pool.filter(e => !bp.topics || keyOf(e) != null), n - have);
    /* recallMax is a soft cap: when a thin topic can't fill the paper without them, recall questions top it up */
    if (slotsOf(chosen) < n && recallCap < n) { recallCap = n; take(pool.filter(e => !bp.topics || keyOf(e) != null), n - slotsOf(chosen)); }
    const got = slotsOf(chosen);
    return { entries: shuffle(chosen), target: n, short: got < n, got };
  };
  /* a paper: the slot states to save; numbers and option orders are fixed for the attempt */
  X.makePaper = (P, plan) => {
    const slots = [];
    plan.entries.forEach(e => { e.make().forEach(s => { const q = e.resolve(s); if (q.options && !s.order) s.order = optionOrder(q); if (q.kind === "match" && !s.rorder) s.rorder = shuffle(q.right.map((x, i) => i)); slots.push(s); }); });
    return slots;
  };
  function optionOrder(q) {
    const idx = q.options.map((o, i) => i);
    if (q.fixedOrder) return idx;
    const lead = o => parseNum(String(o).replace(/^([−–-]?[\d.,]+).*$/, "$1"));
    if (q.options.every(o => /^[−–-]?\d/.test(String(o)) && isFinite(lead(o)))) return idx.sort((a, b) => lead(q.options[a]) - lead(q.options[b]));   // number options: ascending
    return shuffle(idx);
  }
  X.question = (P, s) => { const e = P.byId[s.e]; if (!e) return null; const q = e.resolve(s); q.id = s.e; q.topic = e.topic; q.entryKind = e.kind; q.recall = !!e.recall;
    if (q.options && !q.order) q.order = s.order || q.options.map((o, i) => i); if (q.kind === "match") q.rightOrder = s.rorder || q.right.map((x, i) => i);
    if (q.kind === "order" && !q.start) q.start = s.start || q.steps.map((x, i) => i); return q; };

  /* ---------- answers and scoring ---------- */
  X.points = q => q.kind === "match" && !q.allOrNothing ? q.left.length : 1;
  X.isAnswered = (q, a) => {
    if (a == null) return false;
    if (q.kind === "sata") return Array.isArray(a) && a.length > 0;
    if (q.kind === "numeric") return isFinite(parseNum(a));
    if (q.kind === "match") return Array.isArray(a) && a.length === q.left.length && a.every(x => x != null && x !== "");
    if (q.kind === "order") return Array.isArray(a) && a.length === q.steps.length;
    return Number.isInteger(a);
  };
  X.numOk = (q, x) => {
    if (!isFinite(x)) return false; const a = q.answer;
    if (q.tol && q.tol.abs != null && Math.abs(x - a) <= q.tol.abs + 1e-9) return true;
    if (q.tol && q.tol.pct != null && Math.abs(x - a) <= Math.abs(a) * q.tol.pct / 100 + 1e-9) return true;
    return roundTo(x, q.dp || 0) === roundTo(a, q.dp || 0);
  };
  /* → { pts, max, ok (full marks), state: "right" | "wrong" | "partial" | "blank", detail } */
  X.score = (q, a) => {
    const max = X.points(q);
    if (!X.isAnswered(q, a) && !(q.kind === "match" && Array.isArray(a) && a.some(x => x != null && x !== ""))) return { pts: 0, max, ok: false, state: "blank" };
    let pts = 0, detail = null;
    if (q.kind === "sata") { const want = new Set(q.answer), got = new Set(a); const right = [...got].filter(k => want.has(k)).length, extra = got.size - right;
      pts = right === want.size && !extra ? 1 : 0; detail = { right, of: want.size, extra }; }
    else if (q.kind === "numeric") { const x = parseNum(a); pts = X.numOk(q, x) ? 1 : 0; detail = { given: x }; }
    else if (q.kind === "match") { const r = q.answer.filter((k, i) => a[i] != null && a[i] !== "" && +a[i] === k).length; detail = { right: r, of: q.left.length };
      pts = q.allOrNothing ? (r === q.left.length ? 1 : 0) : r; }
    else if (q.kind === "order") { pts = a.every((k, i) => k === i) ? 1 : 0; detail = { inPlace: a.filter((k, i) => k === i).length }; }
    else pts = a === q.answer ? 1 : 0;
    return { pts, max, ok: pts === max, state: pts === max ? "right" : pts > 0 ? "partial" : "wrong", detail };
  };
  /* review notes for a wrong number: out by 1,000, a power of ten, the sign, or a known trap value */
  X.numNote = (q, x) => {
    if (!isFinite(x) || X.numOk(q, x)) return "";
    const a = q.answer, near = r => Math.abs(x - a * r) <= Math.max(Math.abs(a * r) * 0.01, 0.5 * Math.pow(10, -(q.dp || 0)));
    const trap = (q.traps || []).find(t => Math.abs(x - t.value) <= Math.max(Math.abs(t.value) * 0.005, 0.5 * Math.pow(10, -(q.dp || 0))));
    if (trap) return trap.why;
    if (near(1000) || near(0.001)) return "Out by 1,000: check the unit conversion" + (q.thousand ? " (" + q.thousand + ")" : "") + ".";
    if (near(-1)) return "Right size, wrong sign.";
    if (near(10) || near(0.1) || near(100) || near(0.01)) return "Off by a power of ten: check the decimal point.";
    if (q.hint) return q.hint(x) || "";
    return "";
  };

  /* ---------- calculator: a small expression reader (the site's security policy forbids eval) ---------- */
  X.calc = expr => {
    const s = String(expr).replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/π/g, "(pi)").replace(/\s+/g, "");
    let i = 0;
    const peek = () => s[i], eat = c => { if (s[i] === c) { i++; return true; } return false; };
    const FN = { sqrt: Math.sqrt, log: Math.log10, ln: Math.log, exp: Math.exp, tenx: x => Math.pow(10, x), sq: x => x * x };
    function prim() {
      if (eat("(")) { const v = add(); if (!eat(")")) throw new Error("bracket"); return v; }
      if (eat("-")) return -pow();
      if (eat("+")) return pow();
      const m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i));
      if (m) { i += m[0].length; return parseFloat(m[0]); }
      const f = /^(sqrt|log|ln|exp|tenx|sq|pi|e(?![\d]))/.exec(s.slice(i));
      if (f) { i += f[0].length; if (f[0] === "pi") return Math.PI; if (f[0] === "e") return Math.E; if (!eat("(")) throw new Error("fn"); const v = add(); if (!eat(")")) throw new Error("bracket"); return FN[f[0]](v); }
      throw new Error("syntax");
    }
    function post() { let v = prim(); while (eat("²")) v = v * v; while (eat("!")) { let r = 1; for (let k = 2; k <= v; k++) r *= k; v = r; } return v; }
    function pow() { const b = post(); return eat("^") ? Math.pow(b, pow()) : b; }
    function mul() { let v = pow(); for (;;) { if (eat("*")) v *= pow(); else if (eat("/")) v /= pow(); else if (peek() === "(" || (peek() && /[a-z]/.test(peek()))) v *= pow(); else return v; } }
    function add() { let v = mul(); for (;;) { if (eat("+")) v += mul(); else if (eat("-")) v -= mul(); else return v; } }
    const v = add(); if (i < s.length) throw new Error("syntax"); return v;
  };
})(typeof window !== "undefined" ? window : globalThis);
