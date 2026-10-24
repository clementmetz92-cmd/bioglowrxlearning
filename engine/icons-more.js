/* BioglowRX — extra line icons, in packs by subject (engine/icons-<pack>.js), loaded right after icons.js.
   Every pack adds path strings to BGX.icons with Object.assign; names are unique across packs (prefixed by pack). */
(function () {
  var packs = ["chem", "anat1", "anat2", "pharm", "nutr"];
  var root = (window.BGX && BGX.root) || document.documentElement.getAttribute("data-root") || "./";
  var v = (document.currentScript && /\?v=(\d+)/.exec(document.currentScript.src) || [])[1];
  packs.forEach(function (p) { document.write('<script src="' + root + "engine/icons-" + p + ".js" + (v ? "?v=" + v : "") + '"><\/script>'); });
})();
