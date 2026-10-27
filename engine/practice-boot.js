/* practice pages: draw the header and footer, and the search box on the practice index (kept out of the HTML so the site can use a strict Content-Security-Policy) */
(function () {
  if (window.BGX && BGX.shell) BGX.shell();
  var s = document.getElementById("br-search");
  if (s && window.BGX && BGX.searchMount) BGX.searchMount(s, { placeholder: "Search every topic, chapter and card: try femur, pH or dose" });
})();
