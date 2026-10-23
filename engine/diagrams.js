/* BioglowRX — diagram registry. Each engine/dg-<name>.js adds
     BGX.DIAGRAMS[name] = item => "<svg …>"   (item is null for the overview picture)
   and highlights item.spot (a region id, or an array of ids). Helpers below keep every
   diagram in the same look: square 160×160 picture, soft panel, one bright highlight colour. */
(function () {
  "use strict";
  const BGX = window.BGX;
  BGX.DIAGRAMS = BGX.DIAGRAMS || {};
  let n = 0;
  const dg = BGX.dg = {
    HL: "#FF3D7F",          // highlight fill
    HL_GLOW: "#FFD1E1",     // soft glow behind a highlight
    uid: () => "dg" + (++n) + "_",
    spots: it => it && it.spot != null ? [].concat(it.spot) : [],
    is: (it, id) => dg.spots(it).indexOf(id) >= 0,
    /* fill for a region: highlight colour when it is the item's spot, else the base colour */
    fill: (it, id, base) => dg.is(it, id) ? dg.HL : base,
    cls: (it, id) => dg.is(it, id) ? ' class="dg-hl"' : "",
    /* wrap the drawing in the standard frame. bg: panel colour pair [top, bottom] */
    frame: (inner, label, bg) => {
      const id = dg.uid(), b = bg || ["#F4F8FA", "#DDE8EE"];
      return `<svg viewBox="0 0 160 160" class="spec dg" role="img" aria-label="${BGX.esc(label || "Diagram")}">
        <defs><linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b[0]}"/><stop offset="1" stop-color="${b[1]}"/></linearGradient></defs>
        <rect width="160" height="160" rx="18" fill="url(#${id}bg)"/>${inner}</svg>`;
    },
    /* small text label pill (for diagrams that name the highlighted part) */
    tag: (x, y, text) => {
      const w = Math.max(28, text.length * 5.6 + 12);
      return `<g><rect x="${x - w / 2}" y="${y - 9}" width="${w}" height="16" rx="8" fill="#1B2430" opacity=".86"/><text x="${x}" y="${y + 2.5}" font-family="Chivo, sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">${BGX.esc(text)}</text></g>`;
    }
  };
})();
