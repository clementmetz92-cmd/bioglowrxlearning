/* BioglowRX — site settings for the Founding Testers beta.
   Leave a value empty to keep that feature switched off.
   - posthogKey: PostHog project API key (EU cloud). When set, anonymous visits and in-game
     events (ratings, votes, mistake reports, invites) are sent to PostHog, cookie-free.
     Feedback buttons only appear when this is set, so nobody is asked for feedback that goes nowhere.
   - tallySurvey: Tally form id for the 5-question beta survey (Founding Tester badge). */
window.BGX_CONFIG = {
  siteUrl: "https://clementmetz92-cmd.github.io/bioglowrxlearning/",
  posthogKey: "",
  posthogHost: "https://eu.i.posthog.com",
  tallySurvey: "",
  contactEmail: "clementmetz92@gmail.com"
};
