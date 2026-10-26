/* BioglowRX — site settings for the Founding Testers beta.
   Leave a value empty to keep that feature switched off.
   - posthogKey: PostHog project API key (EU cloud). When set, anonymous visits and in-game
     events (ratings, votes, mistake reports, invites) are sent to PostHog, cookie-free.
     Feedback buttons only appear when this is set, so nobody is asked for feedback that goes nowhere.
   - tallySurvey: Tally form id for the 5-question beta survey (Founding Tester badge).
   - productionHost: analytics only run on this address, so local tests never reach the real data.
   - cookieless: set true once "Cookieless tracking" is switched on in PostHog (Settings > Project > Web analytics):
     PostHog then counts daily unique visitors with a server-side hash, still with no cookies or storage. */
window.BGX_CONFIG = {
  siteUrl: "https://bioglowrx.netlify.app/",
  posthogKey: "phc_wN6DQQibEgRqon2YzrJaLhf2FotaCVtbBhtnDnWb634P",
  posthogHost: "https://eu.i.posthog.com",
  tallySurvey: "rDDyKo",
  productionHost: "bioglowrx.netlify.app",
  cookieless: false,
  contactEmail: "clementmetz92@gmail.com"
};

/* The site moved from GitHub Pages to Netlify: send old links to the same page on the new address. */
(function () {
  if (location.hostname.slice(-10) === ".github.io") {
    var path = location.pathname.replace(/^\/bioglowrxlearning/, "") || "/";
    location.replace(window.BGX_CONFIG.siteUrl.replace(/\/$/, "") + path + location.search + location.hash);
  }
})();
