/* BioglowRX — the vote results page (votes/index.html), drawn from data/votes.js */
(function () {
  "use strict";
  const BGX = window.BGX, V = window.BGX_VOTES || {}, esc = BGX.esc, box = document.getElementById("br-voteres");
  BGX.shell();
  if (!box) return;
  const bars = (title, o) => {
    const rows = Object.keys(o || {}).map(k => [k, o[k] | 0]).sort((a, b) => b[1] - a[1]);
    if (!rows.length) return "";
    const max = rows[0][1] || 1;
    return `<h2>${esc(title)}</h2><ol class="br-votebars">${rows.map(([k, n]) => `<li><span class="nm">${esc(k)}</span><i class="bar"><i style="width:${(n / max * 100).toFixed(1)}%"></i></i><b>${n}</b></li>`).join("")}</ol>`;
  };
  const date = d => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  box.innerHTML = (V.updated && V.voters
    ? `<p class="br-label">Updated ${esc(date(V.updated))} · ${V.voters} tester${V.voters === 1 ? "" : "s"} voted</p>${bars("Next subjects", V.subjects)}${bars("Next features", V.features)}`
    : `<p class="br-hint"><b>The first results will appear here after the first week of voting.</b> Votes are anonymous; each tester's latest vote counts once.</p>`)
    + (V.built && V.built.length ? `<h2>Already built from your votes</h2><ul>${V.built.map(b => `<li><b>${esc(b.what)}</b>: ${esc(b.note)}</li>`).join("")}</ul>` : "");
})();
