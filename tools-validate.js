/* Content checks for every data/<game>.js: answers present, case answer indices valid, calculators give finite answers, no unknown categories. Run by tools-check.py. */
const fs=require('fs'),vm=require('vm');const D=require('path').join(__dirname,'data')+'/';
const out=[];let totalItems=0;
for(const f of fs.readdirSync(D).filter(f=>f.endsWith('.js')&&!['catalog.js','search-index.js','progress-map.js','votes.js'].includes(f))){
 let G=null;const ctx={BGX:{registerGame:g=>G=g},pick:a=>a[Math.floor(Math.random()*a.length)],Math,console};
 try{vm.runInNewContext(fs.readFileSync(D+f,'utf8'),ctx);}catch(e){out.push(f+': LOAD '+e.message);continue}
 if(!G){out.push(f+': no registerGame');continue}
 const it=G.items||[];totalItems+=it.length;const cats=new Set((G.categories||[]).map(c=>c.id));
 const names={};it.forEach(x=>{names[x.name]=(names[x.name]||0)+1; if(x.cat&&!cats.has(x.cat))out.push(`${f}: item ${x.name} unknown cat ${x.cat}`)});
 Object.entries(names).filter(([k,v])=>v>1).forEach(([k])=>out.push(`${f}: duplicate item name "${k}"`));
 const ids=new Set();(G.modes||[]).forEach(m=>{ if(ids.has(m.id))out.push(`${f}: duplicate mode id ${m.id}`);ids.add(m.id);
  const pool=it.filter(x=>!m.only||m.only.includes(x.cat));
  if(m.format==='quiz'){const miss=pool.filter(x=>x[m.answer]==null||x[m.answer]==='').length; if(miss)out.push(`${f}: mode ${m.id} ${miss}/${pool.length} items lack answer field "${m.answer}"`);
    const vals=pool.map(x=>String(x[m.answer]));const dup=vals.length-new Set(vals).size; if(dup)out.push(`${f}: mode ${m.id} ${dup} items share an identical answer "${m.answer}" (ambiguous options possible)`);
    if(new Set(vals).size<4)out.push(`${f}: mode ${m.id} fewer than 4 distinct answers`);}
  if(m.format==='matchpairs'){const vals=pool.filter(x=>x[m.clue]).map(x=>String(x[m.clue]));if(vals.length-new Set(vals).size)out.push(`${f}: pairs ${m.id} ${vals.length-new Set(vals).size} duplicate clues`);}
  if(m.format==='truemyth'){const bad=pool.filter(x=>!x.claim||typeof x.verdict!=='boolean').length;if(bad)out.push(`${f}: truemyth ${m.id} ${bad} items missing claim/boolean verdict`);}
 });
 (G.cases||[]).forEach(c=>{(c.steps||[]).forEach((s,i)=>{if(!(s.answer>=0&&s.answer<s.options.length))out.push(`${f}: case ${c.id} step ${i} bad answer idx`); if(new Set(s.options).size!==s.options.length)out.push(`${f}: case ${c.id} step ${i} duplicate options`)}); });
 const sl=new Set((G.cases||[]).map(c=>c.steps.length));if(sl.size>1)out.push(`${f}: cases have unequal step counts ${[...sl]}`);
 (G.problems||[]).forEach(p=>{let bad=0;for(let t=0;t<200;t++){try{const v=p.make?p.make():{};Object.keys(p.vars||{}).forEach(k=>{const d=p.vars[k];v[k]=Array.isArray(d)?d[Math.floor(Math.random()*d.length)]:d.min});Object.assign(v,p.derive?p.derive(v):{});const a=p.answer(v);if(!isFinite(a))bad++;
   const txt=[p.text,...(p.steps||[]),p.tip||''].join(' ').replace(/\{(\w+)\}/g,(m,k)=>v[k]==null&&k!=='answer'?'@@'+k:'');if(txt.includes('@@'))out.push(`${f}: problem ${p.id} text placeholder unresolved ${txt.match(/@@\w+/)[0]}`)}catch(e){bad++}} if(bad)out.push(`${f}: problem ${p.id} ${bad}/200 non-finite or throwing`)});
 const xid=new Set();(G.exam||[]).forEach(x=>{ if(xid.has(x.id))out.push(`${f}: exam duplicate id ${x.id}`);xid.add(x.id);
   if(!x.q||!Array.isArray(x.options))return out.push(`${f}: exam ${x.id} missing q/options`);
   if(new Set(x.options).size!==x.options.length)out.push(`${f}: exam ${x.id} duplicate options`);
   if(x.cat&&!cats.has(x.cat))out.push(`${f}: exam ${x.id} unknown cat ${x.cat}`);
   const A=Array.isArray(x.answer)?x.answer:[x.answer];
   if(!A.every(k=>Number.isInteger(k)&&k>=0&&k<x.options.length)||new Set(A).size!==A.length)out.push(`${f}: exam ${x.id} bad answer idx`);
   if(x.kind==="sata"&&(!Array.isArray(x.answer)||A.length<2))out.push(`${f}: exam ${x.id} sata needs 2+ right options`);
   if(x.kind==="first"&&(Array.isArray(x.answer)||x.options.length!==4))out.push(`${f}: exam ${x.id} first needs 4 options and one answer`); });
 (G.sequences||[]).forEach(s=>{if(new Set(s.steps).size!==s.steps.length)out.push(`${f}: sequence ${s.id} duplicate step text`)});
}
console.log([...new Set(out)].join('\n'));console.log('TOTAL items',totalItems);

/* ---------- Pre-exam simulator banks (data/exams/<subject>.js): see data/README.md › "Pre-exam simulator" ---------- */
(() => {
 const path = require('path'), E = path.join(__dirname, 'data', 'exams');
 if (!fs.existsSync(E)) return;
 const xout = [], esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
 const ctx = { console, Math, setTimeout }; ctx.window = ctx;
 ctx.BGX = { esc, RM: true, shade: (hex, amt) => { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = n >> 8 & 255, b = n & 255; const t = amt < 0 ? 0 : 255, p = Math.abs(amt); r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b); return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); } };
 vm.createContext(ctx);
 const run = f => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
 const EN = path.join(__dirname, 'engine');
 try { run(path.join(EN, 'exam-core.js')); run(path.join(EN, 'diagrams.js')); fs.readdirSync(EN).filter(f => /^dg-.*\.js$/.test(f)).forEach(f => run(path.join(EN, f))); }
 catch (e) { console.log('exam: engine LOAD ' + e.message); return; }
 fs.readdirSync(D).filter(f => f.endsWith('.js') && !['catalog.js', 'search-index.js', 'progress-map.js', 'votes.js'].includes(f)).forEach(f => { try { run(D + f); } catch (e) {} });
 const X = ctx.BGX.exam, KINDS = X.KINDS, SHEETS = ['ptable', 'constants', 'dosecalc', 'stats'], USES = ['problems', 'sequences', 'cases', 'pairs', 'exam', 'diagram', 'quiz', 'sortit', 'truemyth'];
 const gameExists = id => fs.existsSync(path.join(D, id + '.js')) && fs.existsSync(path.join(__dirname, 'games', id, 'index.html'));
 for (const f of fs.readdirSync(E).filter(f => f.endsWith('.js'))) {
  const F = 'exams/' + f, subj = f.replace(/\.js$/, '');
  try { run(path.join(E, f)); } catch (e) { xout.push(`${F}: LOAD ${e.message}`); continue; }
  const B = X.banks[subj]; if (!B) { xout.push(`${F}: no registerExamBank with subject "${subj}"`); continue; }
  const T = {}, groups = new Set(); (B.topics || []).forEach(t => { if (T[t.id]) xout.push(`${F}: duplicate topic id ${t.id}`); T[t.id] = t; if (t.group != null) groups.add(String(t.group));
   if (!t.label) xout.push(`${F}: topic ${t.id} has no label`);
   if (!t.game || !gameExists(t.game)) xout.push(`${F}: topic ${t.id} needs a game for "Practise in…" (games/<id>/ and data/<id>.js): got "${t.game}"`);
   else if (t.mode && !(X.games[t.game] && (X.games[t.game].modes || []).some(m => m.id === t.mode))) xout.push(`${F}: topic ${t.id} mode "${t.mode}" not found in ${t.game}`); });
  const ids = new Set();
  const opts = (where, x, n) => { if (!Array.isArray(x.options) || x.options.length < 2) return xout.push(`${where}: needs options`);
   if (new Set(x.options.map(String)).size !== x.options.length) xout.push(`${where}: duplicate options`);
   if (x.options.some(o => o == null || String(o).trim() === '')) xout.push(`${where}: empty option`);
   if (n && (x.options.length < n[0] || x.options.length > n[1])) xout.push(`${where}: ${x.kind} needs ${n[0]}–${n[1]} options (has ${x.options.length})`);
   if (x.whyOpt && (!Array.isArray(x.whyOpt) || x.whyOpt.length !== x.options.length)) xout.push(`${where}: whyOpt has ${x.whyOpt.length} entries for ${x.options.length} options`);
   if (x.options.some(o => /^(all|none) of the above/i.test(String(o)))) xout.push(`${where}: avoid "all/none of the above"`); };
  const checkQ = (where, x, top) => {
   const k = x.kind || 'single';
   if (!KINDS.includes(k) || k === 'case') return xout.push(`${where}: unknown kind "${k}"`);
   if (!(x.stem || x.q)) xout.push(`${where}: no stem`);
   if (!x.why && !(top && top.why)) xout.push(`${where}: no "why" rationale`);
   if (k === 'single' || k === 'first' || k === 'diagram') { opts(where, x, k === 'first' ? [4, 4] : k === 'single' ? [3, 5] : [3, 6]);
    if (!(Number.isInteger(x.answer) && x.answer >= 0 && x.answer < (x.options || []).length)) xout.push(`${where}: answer must be an option index`); }
   if (k === 'sata') { opts(where, x, [4, 7]); const A = x.answer;
    if (!Array.isArray(A) || A.length < 2 || A.length >= (x.options || []).length || new Set(A).size !== A.length || !A.every(i => Number.isInteger(i) && i >= 0 && i < x.options.length)) xout.push(`${where}: sata answer must list 2+ (not all) valid option indices`); }
   if (k === 'diagram') { if (!x.diagram || !(ctx.BGX.DIAGRAMS || {})[x.diagram]) xout.push(`${where}: unknown diagram "${x.diagram}"`); else if (x.spot == null) xout.push(`${where}: diagram needs a spot`);
    else { const svg = X.quietSVG(x.diagram, { spot: x.spot, name: '', row: x.row, col: x.col }).replace(/<[^>]+>/g, ' ').toLowerCase(); const right = String((x.options || [])[x.answer] || '').toLowerCase(); if (right && svg.includes(right)) xout.push(`${where}: the diagram shows the answer "${right}" as text`); } }
   if (k === 'numeric') {
    if (x.problem) { const G = X.games[x.problem.game]; if (!G || !(G.problems || []).some(p => p.id === x.problem.id)) xout.push(`${where}: problem ${JSON.stringify(x.problem)} not found`); }
    else { if (typeof x.answer !== 'number' || !isFinite(x.answer)) xout.push(`${where}: numeric answer must be a finite number`);
     if (x.dp != null && !(Number.isInteger(x.dp) && x.dp >= 0 && x.dp <= 6)) xout.push(`${where}: dp must be 0–6`);
     if (typeof x.answer === 'number' && x.dp != null && Math.abs(X.num.roundTo(x.answer, x.dp) - x.answer) > 1e-9 && !x.tol) xout.push(`${where}: answer ${x.answer} has more decimals than dp ${x.dp}`);
     if (x.tol != null && !(typeof x.tol === 'object' && ((x.tol.abs != null && x.tol.abs >= 0 && isFinite(x.tol.abs)) || (x.tol.pct != null && x.tol.pct > 0 && x.tol.pct <= 20)))) xout.push(`${where}: tol must be {abs: n} or {pct: n}`);
     if (x.steps && (!Array.isArray(x.steps) || !x.steps.length)) xout.push(`${where}: steps must be a list`);
     (x.traps || []).forEach(t => { if (!isFinite(t.value) || !t.why) xout.push(`${where}: each trap needs a value and a why`); else if (X.numOk({ answer: x.answer, dp: x.dp || 0, tol: x.tol }, t.value)) xout.push(`${where}: trap ${t.value} would be marked correct`); }); } }
   if (k === 'match') { const P = x.pairs; if (!Array.isArray(P) || P.length < 3 || !P.every(p => Array.isArray(p) && p.length === 2 && p[0] && p[1])) xout.push(`${where}: match needs 3+ [left, right] pairs`);
    else { if (new Set(P.map(p => p[0])).size !== P.length) xout.push(`${where}: duplicate left items`); const R = P.map(p => p[1]).concat(x.extra || []); if (new Set(R).size !== R.length) xout.push(`${where}: duplicate right items`);
     if (x.whyPair && x.whyPair.length !== P.length) xout.push(`${where}: whyPair length must match pairs`); } }
   if (k === 'order') { if (!Array.isArray(x.steps) || x.steps.length < 3) xout.push(`${where}: order needs 3+ steps`); else if (new Set(x.steps).size !== x.steps.length) xout.push(`${where}: duplicate steps`); }
  };
  for (let i = 0; i < (B.items || []).length; i++) if (!B.items[i] || typeof B.items[i] !== 'object') xout.push(`${F}: item #${i + 1} is empty (stray comma in the items list?)`);
  (B.items || []).forEach((x, i) => { const where = `${F}: item ${x.id || '#' + i}`;
   if (!x.id || typeof x.id !== 'string') xout.push(`${where}: needs a stable string id`); else if (ids.has(x.id)) xout.push(`${where}: duplicate id`); else ids.add(x.id);
   if (!T[x.topic]) xout.push(`${where}: unknown topic "${x.topic}"`);
   if (!(x.difficulty >= 1 && x.difficulty <= 3)) xout.push(`${where}: difficulty must be 1, 2 or 3`);
   if (x.kind === 'case') { if (!x.stem) xout.push(`${where}: case needs a shared stem`); if (!Array.isArray(x.parts) || x.parts.length < 2 || x.parts.length > 4) xout.push(`${where}: case needs 2–4 parts`);
    else x.parts.forEach((p, j) => { if (p.kind === 'case') xout.push(`${where} part ${j + 1}: a case can't hold a case`); else checkQ(`${where} part ${j + 1}`, p, x); }); }
   else checkQ(where, x); });
  (B.sources || []).forEach((s, i) => { const where = `${F}: source ${i + 1} (${s.game}/${s.use})`;
   if (!gameExists(s.game) || !X.games[s.game]) xout.push(`${where}: unknown game`);
   if (!USES.includes(s.use)) xout.push(`${where}: use must be one of ${USES.join(', ')}`);
   const tl = typeof s.topic === 'string' ? [s.topic] : Object.values(s.topic || {}).concat(s.topicDefault ? [s.topicDefault] : []);
   if (!tl.length) xout.push(`${where}: needs a topic`); tl.forEach(t => { if (!T[t]) xout.push(`${where}: unknown topic "${t}"`); });
   if (s.mode && X.games[s.game] && !(X.games[s.game].modes || []).some(m => m.id === s.mode)) xout.push(`${where}: mode "${s.mode}" not found`); });
  const P = X.pool(subj); P.problems.forEach(p => xout.push(`${F}: ${p}`));
  (B.sources || []).forEach((s, i) => { if (!P.entries.some(e => e.id.indexOf(s.game + ':') === 0)) xout.push(`${F}: source ${i + 1} (${s.game}/${s.use}) gives no questions`); });
  const fids = new Set();
  (B.formats || []).forEach(fm => { const where = `${F}: format ${fm.id}`;
   if (!fm.id || fids.has(fm.id)) xout.push(`${where}: missing or duplicate id`); fids.add(fm.id);
   if (!fm.label) xout.push(`${where}: no label`);
   if (!(fm.n > 0)) xout.push(`${where}: n must be > 0`);
   if (!(fm.minutes > 0) && !(fm.secondsEach > 0)) xout.push(`${where}: needs minutes or secondsEach`);
   if (!(fm.pass > 0 && fm.pass <= 100)) xout.push(`${where}: pass must be 1–100`);
   const okT = t => T[t] || groups.has(String(t));
   (fm.topics || []).forEach(t => { if (!okT(t)) xout.push(`${where}: unknown topic or group "${t}"`); });
   (fm.kinds || []).forEach(k => { if (!KINDS.includes(k)) xout.push(`${where}: unknown kind "${k}"`); });
   const bp = fm.blueprint || {};
   Object.keys(bp.topics || {}).forEach(t => { if (!okT(t)) xout.push(`${where}: blueprint topic "${t}" unknown`); });
   Object.keys(bp.kinds || {}).forEach(k => { if (!KINDS.includes(k)) xout.push(`${where}: blueprint kind "${k}" unknown`); });
   [].concat(fm.sheet || []).forEach(sh => { if (!SHEETS.includes(sh) && !(B.sheets && B.sheets[sh])) xout.push(`${where}: unknown sheet "${sh}" (add it to the bank's sheets)`); });
   if (fm.calculator && !['basic', 'scientific'].includes(fm.calculator)) xout.push(`${where}: calculator must be "basic" or "scientific"`);
   if (fm.choose && !['topic', 'group', 'unit'].includes(fm.choose)) xout.push(`${where}: choose must be topic, group or unit`);
   (fm.units || []).forEach(u => u.topics.forEach(t => { if (!okT(t)) xout.push(`${where}: unit ${u.id} topic "${t}" unknown`); }));
   /* make a paper for every choice and check every question resolves and scores */
   const ch = X.choices(P, fm), cs = ch.length ? ch.map(c => c.id) : [null];
   cs.forEach(c => { try { const plan = X.plan(P, fm, c), paper = X.makePaper(P, plan);
     if (!paper.length) xout.push(`${where}${c ? ' [' + c + ']' : ''}: no questions at all`);
     paper.forEach(s => { const q = X.question(P, s); if (!q) return xout.push(`${where}: ${s.e} does not resolve`);
      if (q.kind === 'numeric' && !isFinite(q.answer)) xout.push(`${where}: ${s.e} numeric answer not finite`);
      if (q.options && new Set(q.options.map(String)).size !== q.options.length) xout.push(`${where}: ${s.e} duplicate options`);
      const sc = X.score(q, q.kind === 'numeric' ? String(q.answer) : q.kind === 'match' ? q.answer.slice() : q.kind === 'order' ? q.steps.map((x, k) => k) : q.answer);
      if (!sc.ok) xout.push(`${where}: ${s.e} the key does not score as correct`); });
   } catch (e) { xout.push(`${where}${c ? ' [' + c + ']' : ''}: paper build failed: ${e.message}`); } });
  });
 }
 if (xout.length) console.log([...new Set(xout)].join('\n'));
})();
