"""Browser smoke test: opens every page on a phone and a laptop screen, plays one round of the first
scored activity in every game, and reports script errors, sideways scrolling and rounds that never end.
Needs Playwright (pip install playwright; playwright install chromium) and the site served locally:
  python3 -m http.server 8765      (from this folder)
  python3 tools-smoke.py"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).parent
BASE = "http://localhost:8765/"
PAGES = sorted(p.relative_to(ROOT).as_posix()[:-len("index.html")] for p in ROOT.rglob("index.html"))
LABS = {p.parent.name for p in (ROOT / "games").glob("*/index.html") if "lab-kit.js" in p.read_text()}
SOLVE = r"""() => {
 const S = BGX.testState(), v = document.getElementById('br-view');
 if (v.querySelector('.br-end')) return 'end';
 const nx = v.querySelector('#br-next'); if (S.answered && nx) { nx.click(); return 'next'; }
 const f = S.mode && S.mode.format, q = S.qs && S.qs[S.i], c = s => { const e = v.querySelector(s); if (!e) return 'miss'; e.click(); return 'ok'; };
 if (f === 'quiz') return c(`.br-ans[data-i="${q.item._i}"]`);
 if (f === 'sortit') return c(`.br-ans[data-c="${q.item.cat}"]`);
 if (f === 'findit') return c(`.br-cell[data-i="${q.item._i}"]`);
 if (f === 'truemyth') return c(`.br-ans[data-v="${q.item.verdict ? 1 : 0}"]`);
 if (f === 'cases') return c(`.br-ans[data-k="${q.st.answer}"]`);
 if (f === 'sequence') { for (let k = 0; k < q.steps.length; k++) { const j = q.steps.findIndex(s => s.i === k); v.querySelector(`.br-step[data-j="${j}"]`).click(); } return c('#br-check'); }
 if (f === 'buildit') { v.querySelectorAll('.br-stepper').forEach((s, i) => { const p = q.parts[i], w = p.value != null ? +p.value : +q.item[p.field]; let n = w - q.vals[i]; while (n > 0) { s.querySelector('.plus').click(); n--; } while (n < 0) { s.querySelector('.minus').click(); n++; } }); return c('#br-check'); }
 if (f === 'exam') { if (Array.isArray(q.x.answer)) { q.x.answer.forEach(k => v.querySelector(`.br-chk[data-k="${k}"]`).click()); return c('#br-check'); } return c(`.br-ans[data-k="${q.x.answer}"]`); }
 if (f === 'calculator') { const i = v.querySelector('#br-num'); i.value = String(BGX.calc.roundTo(q.v.answer, q.p.dp || 0)); i.dispatchEvent(new Event('input')); return c('#br-check'); }
 return 'skip';
}"""

async def main():
    problems = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, vp in (("phone", {"width": 390, "height": 844}), ("laptop", {"width": 1280, "height": 800})):
            ctx = await b.new_context(viewport=vp); pg = await ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            for path in PAGES:
                errs.clear(); await pg.goto(BASE + path); await pg.wait_for_timeout(250)
                if await pg.evaluate("document.documentElement.scrollWidth > innerWidth + 1"): problems.append(f"{name} {path}: sideways scroll")
                if errs: problems.append(f"{name} {path}: {errs[0][:160]}")
                if path.startswith("games/") and path.split("/")[1] not in LABS:
                    mode = await pg.evaluate("(() => { const m = (BGX.game.modes || []).find(m => m._ready && BGX.formats[m.format].scored && m.format !== 'matchpairs'); return m ? m.id : null })()")
                    if not mode: continue
                    await pg.evaluate(f"BGX.startMode({mode!r})"); await pg.wait_for_timeout(150)
                    for _ in range(80):
                        await pg.evaluate("document.querySelectorAll('.br-milestone [data-close]').forEach(b => b.click())")
                        r = await pg.evaluate(SOLVE)
                        if r in ("end", "skip"): break
                        await pg.wait_for_timeout(40)
                    if r != "end": problems.append(f"{name} {path}?mode={mode}: round did not finish ({r})")
                    if errs: problems.append(f"{name} {path}?mode={mode}: {errs[0][:160]}")
            await ctx.close()
        await b.close()
    for x in problems: print("PROBLEM ·", x)
    print(f"smoke: {len(PAGES)} pages × 2 screens, {len(problems)} problem(s)")
    sys.exit(1 if problems else 0)

asyncio.run(main())
