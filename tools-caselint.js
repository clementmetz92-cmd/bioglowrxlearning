/* Lists case-file steps that a test-wise student could answer without knowing the content:
   the right option much longer than every other option (more than 30% longer).
   node tools-caselint.js [file.js ...]   (no arguments: every data file) */
const fs = require("fs"), path = require("path"), D = path.join(__dirname, "data");
const skip = ["catalog.js", "search-index.js", "progress-map.js", "votes.js"];
const files = process.argv.slice(2).length ? process.argv.slice(2).map(f => path.basename(f)) : fs.readdirSync(D).filter(f => f.endsWith(".js") && !skip.includes(f));
let tot = 0, bad = 0;
for (const f of files) {
  let G = null; global.BGX = { registerGame: g => G = g };
  try { eval(fs.readFileSync(path.join(D, f), "utf8")); } catch (e) { console.log(f + ": LOAD " + e.message); continue; }
  (G && G.cases || []).forEach(c => c.steps.forEach((s, i) => {
    tot++; const L = s.options.map(o => o.length), a = L[s.answer], oth = L.filter((x, k) => k !== s.answer);
    if (a > Math.max(...oth) * 1.3) { bad++; console.log(`${f}: case ${c.id} step ${i + 1}: right option ${a} chars, longest other ${Math.max(...oth)}`); }
  }));
}
console.log(`${bad} of ${tot} case steps have a right option more than 30% longer than every other option`);
