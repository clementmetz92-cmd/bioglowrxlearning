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
   const txt=String(p.text).replace(/\{(\w+)\}/g,(m,k)=>v[k]==null?'@@'+k:'');if(txt.includes('@@'))out.push(`${f}: problem ${p.id} text placeholder unresolved ${txt.match(/@@\w+/)[0]}`)}catch(e){bad++}} if(bad)out.push(`${f}: problem ${p.id} ${bad}/200 non-finite or throwing`)});
 (G.sequences||[]).forEach(s=>{if(new Set(s.steps).size!==s.steps.length)out.push(`${f}: sequence ${s.id} duplicate step text`)});
}
console.log([...new Set(out)].join('\n'));console.log('TOTAL items',totalItems);
