/* Source Detective — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "source-detective",
"title": "Source Detective",
"subject": "wellness",
"subjectName": "Health & Wellness",
"chapter": "HS305",
"tagline": "Spot a trustworthy health website, and the red flags",
"itemNoun": "clue",
"categories": [
{
"id": "authority",
"name": "Authority: who is behind it?",
"color": "cat-sky",
"icon": "shield"
},
{
"id": "accuracy",
"name": "Accuracy: is it backed by evidence?",
"color": "cat-sage",
"icon": "search"
},
{
"id": "currency",
"name": "Currency: is it up to date?",
"color": "cat-amber",
"icon": "timer"
},
{
"id": "objectivity",
"name": "Objectivity: is it balanced or selling?",
"color": "cat-lilac",
"icon": "scale"
}
],
"categoryLabel": "Test",
"hint": "Judge a health website on four tests: authority (who wrote it), accuracy (is it backed by evidence), currency (is it up to date) and objectivity (is it selling something).",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"verdictLabel",
"{category}"
],
"detail": [
{
"label": "Verdict",
"field": "{verdictLabel}"
},
{
"label": "Test",
"field": "{category}"
},
{
"label": "Clue",
"field": "{claim}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "play",
"format": "truemyth",
"title": "Trust signal or red flag?",
"desc": "Read the website clue and judge it.",
"icon": "✓✕",
"color": "cat-sky",
"prompt": "Is this a trust signal or a red flag?",
"labels": [
"Trust signal",
"Red flag"
]
},
{
"id": "test",
"format": "sortit",
"title": "Which test?",
"desc": "Sort each clue by the test it relates to.",
"icon": "⌖",
"color": "cat-amber",
"prompt": "Which test does this clue relate to?",
"showAs": "text",
"choices": 4
},
{
"id": "explore",
"format": "explorer",
"title": "Learn the clues",
"desc": "Browse every clue with an explanation.",
"icon": "◎",
"color": "cat-peach"
}
],
"items": [
{
"name": "Government or university site",
"cat": "authority",
"claim": "The website belongs to a government health agency or a university.",
"verdict": true,
"life": "They have medical experts and no product to sell.",
"num": 1,
"verdictLabel": "Trust signal"
},
{
"name": "Qualified, named authors",
"cat": "authority",
"claim": "Articles name their authors and their medical qualifications.",
"verdict": true,
"life": "You can check who wrote it and whether they are qualified.",
"num": 2,
"verdictLabel": "Trust signal"
},
{
"name": "No author, no 'About us'",
"cat": "authority",
"claim": "There is no author, no organisation name and no 'About us' page.",
"verdict": false,
"life": "If you can't tell who is behind a site, you can't judge its expertise.",
"num": 3,
"verdictLabel": "Red flag"
},
{
"name": "Links to studies",
"cat": "accuracy",
"claim": "Claims link to published studies you can check.",
"verdict": true,
"life": "Good sites show their evidence instead of asking you to trust them.",
"num": 4,
"verdictLabel": "Trust signal"
},
{
"name": "Agrees with major health bodies",
"cat": "accuracy",
"claim": "The advice matches what major health organisations say.",
"verdict": true,
"life": "If a site disagrees with every expert body, be very cautious.",
"num": 5,
"verdictLabel": "Trust signal"
},
{
"name": "Testimonials only",
"cat": "accuracy",
"claim": "The only evidence is personal stories and five-star testimonials.",
"verdict": false,
"life": "Stories can be real but they aren't evidence that something works.",
"num": 6,
"verdictLabel": "Red flag"
},
{
"name": "One small study as proof",
"cat": "accuracy",
"claim": "It presents one small study as final proof.",
"verdict": false,
"life": "Science builds on many studies; one small result can easily be wrong.",
"num": 7,
"verdictLabel": "Red flag"
},
{
"name": "'Miracle cure' claims",
"cat": "accuracy",
"claim": "It promises a miracle cure but shows no research to back it up.",
"verdict": false,
"life": "Real breakthroughs are published and shared, not hidden.",
"num": 8,
"verdictLabel": "Red flag"
},
{
"name": "Review date shown",
"cat": "currency",
"claim": "Each page shows when it was last reviewed or updated.",
"verdict": true,
"life": "Health advice changes; a clear date lets you check the page is still current.",
"num": 9,
"verdictLabel": "Trust signal"
},
{
"name": "Last updated years ago",
"cat": "currency",
"claim": "The page was last updated many years ago.",
"verdict": false,
"life": "Guidance on medicines and screening may have changed since.",
"num": 10,
"verdictLabel": "Red flag"
},
{
"name": "Ads clearly separated",
"cat": "objectivity",
"claim": "Adverts are clearly marked and kept apart from the health information.",
"verdict": true,
"life": "You can tell what is information and what is marketing.",
"num": 11,
"verdictLabel": "Trust signal"
},
{
"name": "Selling what it praises",
"cat": "objectivity",
"claim": "The page mainly sells the product it is praising.",
"verdict": false,
"life": "A seller has a reason to make the product sound better than it is.",
"num": 12,
"verdictLabel": "Red flag"
},
{
"name": "Risks and limits explained",
"cat": "objectivity",
"claim": "It explains the risks and limits as well as the benefits.",
"verdict": true,
"life": "Balanced information helps you make your own decision.",
"num": 13,
"verdictLabel": "Trust signal"
},
{
"name": "Guaranteed results",
"cat": "accuracy",
"claim": "It promises guaranteed results for everyone, with no evidence to back it up.",
"verdict": false,
"life": "No treatment works the same way for everyone, and no evidence can guarantee results.",
"num": 14,
"verdictLabel": "Red flag"
},
{
"name": "Pressure to buy now",
"cat": "objectivity",
"claim": "It uses countdown timers and 'buy now' pressure.",
"verdict": false,
"life": "Urgency is a sales tactic, not a sign of quality.",
"num": 15,
"verdictLabel": "Red flag"
},
{
"name": "Says to stop your medicine",
"cat": "accuracy",
"claim": "It tells you to stop taking your prescribed medicine.",
"verdict": false,
"life": "Never stop a prescribed medicine because of a website; talk to your doctor.",
"num": 16,
"verdictLabel": "Red flag"
}
]
});
