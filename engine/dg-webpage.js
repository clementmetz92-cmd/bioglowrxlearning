/* BioglowRX diagram "webpage" — a browser-window mock of a health web page. Trust-signal items show a
   trustworthy page, red-flag items a dodgy one; the item's spot marks the part of the page the clue is about.
   spots: url, about, headline, author, date, body, ad, buy, timer, risks, stars, refs */
(function () {
  "use strict";
  const BGX = window.BGX, dg = BGX.dg;
  const T = (x, y, t, sz, col, w, anchor) => `<text x="${x}" y="${y}" text-anchor="${anchor || "start"}" font-family="Chivo, sans-serif" font-weight="${w || 600}" font-size="${sz}" fill="${col}">${BGX.esc(t)}</text>`;
  const lines = (x, y, ws, gap, col) => ws.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="2.6" rx="1.3" fill="${col || "#c9d1d8"}"/>`).join("");
  const R = {
    url: [29, 11, 123, 15], about: [114, 28.5, 37, 11], headline: [9, 41, 142, 18], author: [9, 60.5, 72, 10], date: [83, 60.5, 68, 10],
    body: [9, 72, 90, 33], ad: [101, 72, 50, 33], buy: [101, 72, 50, 23], timer: [101, 96, 50, 10], risks: [9, 108, 142, 17], stars: [9, 108, 142, 17], refs: [9, 128, 142, 23]
  };
  function hl(it) {
    return dg.spots(it).filter(s => R[s]).map(s => { const [x, y, w, h] = R[s]; return `<g${dg.cls(it, s)}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${dg.HL}" fill-opacity=".22" stroke="${dg.HL}" stroke-width="2.6"/></g>`; }).join("");
  }
  function page(good, u) {
    let g = `<filter id="${u}sh" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity=".2"/></filter>
      <rect x="5" y="5" width="150" height="150" rx="9" fill="#fff" filter="url(#${u}sh)"/>
      <path d="M5 14 Q5 5 14 5 H146 Q155 5 155 14 V27 H5Z" fill="#e3e8ee"/>
      <circle cx="12" cy="16" r="2.3" fill="#ff5f57"/><circle cx="18.5" cy="16" r="2.3" fill="#febc2e"/><circle cx="25" cy="16" r="2.3" fill="#28c840"/>
      <rect x="31" y="12" width="119" height="12" rx="6" fill="#fff"/>`;
    if (good) {
      g += `<path d="M37 17 v-1.6 a2.2 2.2 0 0 1 4.4 0 V17" stroke="#2e7d4a" stroke-width="1.1" fill="none"/><rect x="36" y="17" width="6.4" height="4.6" rx="1" fill="#2e7d4a"/>${T(46, 21, "healthinfo.gov", 7.5, "#1b2430", 700)}`;
      g += `<rect x="9" y="30" width="9" height="9" rx="2" fill="#2b7de0"/><path d="M13.5 32 v5 M11 34.5 h5" stroke="#fff" stroke-width="1.6"/>${T(21, 37.5, "Health Info", 7, "#1b2430", 800)}${T(148, 37.5, "About us", 6.5, "#2b7de0", 700, "end")}`;
      g += T(11, 53, "Managing high blood pressure", 8.6, "#1b2430", 800);
      g += T(11, 68, "By Dr A. Lee, MD", 6.2, "#3a4552", 700) + T(149, 68, "Reviewed 3 May 2026", 6, "#2e7d4a", 700, "end");
      g += lines(11, 75, [84, 80, 86, 70], 5.5) + T(11, 102, "Matches national guidelines", 6, "#2e7d4a", 700);
      g += `<rect x="103" y="74" width="46" height="29" rx="3" fill="#f4f6f8" stroke="#c9d1d8" stroke-dasharray="2 1.5"/>${T(106, 81, "ADVERT", 5.2, "#8a96a2", 800)}<rect x="108" y="84" width="36" height="14" rx="2" fill="#dfe5ea"/>`;
      g += `<rect x="11" y="110" width="138" height="13" rx="3" fill="#fff4e0"/><path d="M17 113 L21.5 121 H12.5Z" fill="#f2a900"/>${T(25, 119.5, "Risks and side effects", 7, "#7a4d00", 800)}${lines(104, 114.5, [40, 30], 4, "#e8c98a")}`;
      g += T(11, 135, "References", 7, "#1b2430", 800) + [0, 1, 2].map(i => `<text x="11" y="${142 + i * 5}" font-family="Chivo, sans-serif" font-size="4.6" fill="#2b7de0">[${i + 1}]</text><rect x="19" y="${139.6 + i * 5}" width="${[110, 96, 104][i]}" height="2.4" rx="1.2" fill="#9cc2f0"/>`).join("");
    } else {
      g += `<path d="M37 15 L42 23 H32Z" fill="#f2a900"/>${T(46, 21, "miracle-cures.shop", 7.5, "#1b2430", 700)}`;
      g += `<rect x="9" y="30" width="9" height="9" rx="2" fill="#e05a1a"/>${T(21, 37.5, "BestHealth", 7, "#1b2430", 800)}<rect x="116" y="30.5" width="33" height="7" rx="2" fill="none" stroke="#c9d1d8" stroke-dasharray="2 1.5"/>${T(132.5, 36.5, "?", 6.5, "#aab4be", 800, "middle")}`;
      g += `<rect x="9" y="42" width="142" height="16" rx="2" fill="#fff0f0"/>` + T(80, 54, "MIRACLE CURE! Guaranteed!", 9, "#d0182a", 900, "middle");
      g += T(11, 68, "No author listed", 6.2, "#aab4be", 600) + T(149, 68, "Updated 2009", 6, "#d0182a", 700, "end");
      g += lines(11, 75, [84, 80, 86, 62], 5.5) + T(11, 102, "Stop your medicine!", 6.4, "#d0182a", 800);
      g += `<rect x="103" y="73" width="46" height="21" rx="3" fill="#fff8e6"/><rect x="106" y="75.5" width="9" height="16" rx="2" fill="#e05a1a"/><rect x="106" y="80" width="9" height="5" fill="#fff"/><rect x="118" y="77" width="28" height="11" rx="3" fill="#28a745"/>${T(132, 84.8, "BUY NOW", 5.6, "#fff", 900, "middle")}`;
      g += `<rect x="103" y="97" width="46" height="8" rx="2" fill="#1b2430"/>${T(126, 103, "ENDS 00:09:59", 5.2, "#ffd23f", 800, "middle")}`;
      g += `<rect x="11" y="110" width="138" height="13" rx="3" fill="#fffbe6"/>${T(14, 119.5, "★★★★★", 8, "#f2a900", 900)}${T(54, 119.5, "“It changed my life!”", 6.4, "#5a4500", 700)}`;
      g += T(11, 135, "Source", 7, "#1b2430", 800) + T(11, 143, "1 study, 12 people", 6.2, "#3a4552", 600) + lines(11, 147, [60], 0, "#e3e8ee");
    }
    return g;
  }
  BGX.DIAGRAMS.webpage = item => {
    const u = dg.uid(), good = item ? item.verdict === true : false;
    return dg.frame(page(good, u) + (item ? hl(item) : ""), item ? (good ? "A trustworthy health web page: " : "A dodgy health web page: ") + item.name : "A health web page with red flags", ["#E8EEF5", "#C9D6E4"]);
  };
})();
