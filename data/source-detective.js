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
"icon": "pharm-columns",
"name": "Government or university site",
"cat": "authority",
"claim": "The website belongs to a government health agency or a university.",
"verdict": true,
"life": "They have medical experts and no product to sell.",
"num": 1,
"verdictLabel": "Trust signal",
"spot": "url",
"facts": [
"Authority trust signal: run by public bodies with medical experts.",
"Usually has no product to sell, which also helps objectivity.",
"Check the address: .gov, .nhs.uk, .edu or .ac.uk are typical."
]
},
{
"icon": "pharm-id-badge",
"name": "Qualified, named authors",
"cat": "authority",
"claim": "Articles name their authors and their medical qualifications.",
"verdict": true,
"life": "You can check who wrote it and whether they are qualified.",
"num": 2,
"verdictLabel": "Trust signal",
"spot": "author",
"facts": [
"Authority trust signal: you can check who wrote it and their credentials.",
"Qualifications should match the topic, e.g. a dietitian writing on nutrition.",
"Opposite of the red flag 'No author, no About us'."
]
},
{
"icon": "pharm-anon",
"name": "No author, no 'About us'",
"cat": "authority",
"claim": "There is no author, no organisation name and no 'About us' page.",
"verdict": false,
"life": "If you can't tell who is behind a site, you can't judge its expertise.",
"num": 3,
"verdictLabel": "Red flag",
"spot": [
"author",
"about"
],
"facts": [
"Authority red flag: you can't tell who is responsible for the content.",
"Without knowing the source, you can't judge expertise or motives.",
"Trustworthy sites usually give an organisation name and contact details."
]
},
{
"icon": "pharm-link",
"name": "Links to studies",
"cat": "accuracy",
"claim": "Claims link to published studies you can check.",
"verdict": true,
"life": "Good sites show their evidence instead of asking you to trust them.",
"num": 4,
"verdictLabel": "Trust signal",
"spot": "refs",
"facts": [
"Accuracy trust signal: you can check the evidence yourself.",
"Better still if the studies are in peer-reviewed journals, checked by other experts.",
"Check the study actually supports the claim, not just mentions the topic."
]
},
{
"icon": "pharm-people",
"name": "Agrees with major health bodies",
"cat": "accuracy",
"claim": "The advice matches what major health organisations say.",
"verdict": true,
"life": "If a site disagrees with every expert body, be very cautious.",
"num": 5,
"verdictLabel": "Trust signal",
"spot": "body",
"facts": [
"Accuracy trust signal: matches the consensus of expert organisations.",
"Expert bodies weigh all the evidence, not one study.",
"A site that rejects every expert body deserves extra caution."
]
},
{
"icon": "pharm-stars",
"name": "Testimonials only",
"cat": "accuracy",
"claim": "The only evidence is personal stories and five-star testimonials.",
"verdict": false,
"life": "Stories can be real but they aren't evidence that something works.",
"num": 6,
"verdictLabel": "Red flag",
"spot": "stars",
"facts": [
"Accuracy red flag: personal stories aren't controlled evidence.",
"People may improve for other reasons, such as natural recovery or placebo.",
"Reviews can be selected, paid for or fake."
]
},
{
"icon": "pharm-doc-one",
"name": "One small study as proof",
"cat": "accuracy",
"claim": "It presents one small study as final proof.",
"verdict": false,
"life": "Science builds on many studies; one small result can easily be wrong.",
"num": 7,
"verdictLabel": "Red flag",
"spot": "refs",
"facts": [
"Accuracy red flag: small studies are easily distorted by chance.",
"Results need repeating in larger, well-designed studies before they are trusted.",
"Look for systematic reviews, which combine many studies."
]
},
{
"icon": "pharm-wand",
"name": "'Miracle cure' claims",
"cat": "accuracy",
"claim": "It promises a miracle cure but shows no research to back it up.",
"verdict": false,
"life": "Real breakthroughs are published and shared, not hidden.",
"num": 8,
"verdictLabel": "Red flag",
"spot": "headline",
"facts": [
"Accuracy red flag: big claims with no published research behind them.",
"Phrases like 'secret', 'doctors don't want you to know' are warning signs.",
"Genuine breakthroughs are published and checked by other scientists."
]
},
{
"icon": "pharm-calendar-check",
"name": "Review date shown",
"cat": "currency",
"claim": "Each page shows when it was last reviewed or updated.",
"verdict": true,
"life": "Health advice changes; a clear date lets you check the page is still current.",
"num": 9,
"verdictLabel": "Trust signal",
"spot": "date",
"facts": [
"Currency trust signal: shows when the content was last checked.",
"Lets you judge whether newer guidance might exist.",
"Reputable health sites review pages on a regular schedule."
]
},
{
"icon": "pharm-hourglass",
"name": "Last updated years ago",
"cat": "currency",
"claim": "The page was last updated many years ago.",
"verdict": false,
"life": "Guidance on medicines and screening may have changed since.",
"num": 10,
"verdictLabel": "Red flag",
"spot": "date",
"facts": [
"Currency red flag: guidance on medicines, vaccines or screening may have changed.",
"Not automatically wrong, but check it against a current source.",
"Opposite of the trust signal 'Review date shown'."
]
},
{
"icon": "pharm-ad-box",
"name": "Ads clearly separated",
"cat": "objectivity",
"claim": "Adverts are clearly marked and kept apart from the health information.",
"verdict": true,
"life": "You can tell what is information and what is marketing.",
"num": 11,
"verdictLabel": "Trust signal",
"spot": "ad",
"facts": [
"Objectivity trust signal: you can tell information from marketing.",
"Watch for 'sponsored' content made to look like an article.",
"Funding sources should be declared openly."
]
},
{
"icon": "pharm-cart",
"name": "Selling what it praises",
"cat": "objectivity",
"claim": "The page mainly sells the product it is praising.",
"verdict": false,
"life": "A seller has a reason to make the product sound better than it is.",
"num": 12,
"verdictLabel": "Red flag",
"spot": "buy",
"facts": [
"Objectivity red flag: a conflict of interest, since the seller profits if you believe it.",
"Information may highlight benefits and hide risks.",
"Look for an independent source with nothing to sell."
]
},
{
"icon": "scale",
"name": "Risks and limits explained",
"cat": "objectivity",
"claim": "It explains the risks and limits as well as the benefits.",
"verdict": true,
"life": "Balanced information helps you make your own decision.",
"num": 13,
"verdictLabel": "Trust signal",
"spot": "risks",
"facts": [
"Objectivity trust signal: balanced sources give side effects as well as benefits.",
"Also says who a treatment may not suit and what is still uncertain.",
"Helps you make an informed decision rather than being persuaded."
]
},
{
"icon": "pharm-seal",
"name": "Guaranteed results",
"cat": "accuracy",
"claim": "It promises guaranteed results for everyone, with no evidence to back it up.",
"verdict": false,
"life": "No treatment works the same way for everyone, and no evidence can guarantee results.",
"num": 14,
"verdictLabel": "Red flag",
"spot": "headline",
"facts": [
"Accuracy red flag here: no evidence can guarantee results for everyone.",
"People respond differently to treatments because of genes, health and lifestyle.",
"Sounds like a sales tactic too, but this game files it under accuracy."
]
},
{
"icon": "pharm-alarm",
"name": "Pressure to buy now",
"cat": "objectivity",
"claim": "It uses countdown timers and 'buy now' pressure.",
"verdict": false,
"life": "Urgency is a sales tactic, not a sign of quality.",
"num": 15,
"verdictLabel": "Red flag",
"spot": "timer",
"facts": [
"Objectivity red flag: countdown timers and limited offers push quick decisions.",
"Urgency stops you checking the evidence or asking a professional.",
"Trustworthy health information never needs you to hurry."
]
},
{
"icon": "pharm-pill-ban",
"name": "Says to stop your medicine",
"cat": "accuracy",
"claim": "It tells you to stop taking your prescribed medicine.",
"verdict": false,
"life": "Never stop a prescribed medicine because of a website; talk to your doctor.",
"num": 16,
"verdictLabel": "Red flag",
"spot": "body",
"facts": [
"Accuracy red flag: contradicts medical guidance and can be dangerous.",
"Stopping some medicines suddenly can cause serious withdrawal or relapse.",
"Always discuss medicine changes with a doctor or pharmacist."
]
}
],
"diagram": "webpage",
"diagramCaption": "Where to look on the page",
"diagramPerItem": true,
"notes": {
"intro": "Health information online ranges from expert guidance to sales pitches dressed up as advice. A quick way to judge any source is to run four tests: authority (who is behind it?), accuracy (is it backed by evidence?), currency (is it up to date?) and objectivity (is it balanced, or selling something?). Each clue on a website is either a trust signal or a red flag for one of these tests. No single clue settles it; a trustworthy source passes all four.",
"sections": [
{
"cat": "authority",
"title": "Authority: who is behind it?",
"about": "Authority asks whether you can identify who created the information and whether they have relevant expertise. Government health agencies, universities and professional medical bodies are strong signals because they employ experts and usually have nothing to sell. Named authors with stated qualifications let you check who wrote the content. The biggest red flag is anonymity: no author, no organisation name and no 'About us' or contact page. Clues in this group are about the person or organisation, not about the content itself.",
"points": [
"Look for: named author, credentials, organisation, 'About us', contact details",
"Web addresses like .gov or .ac.uk / .edu suggest a government or university source",
"Ask: is the author an expert in this specific topic?"
],
"tip": "Authority = 'Who?' If you can't answer who wrote it, stop there."
},
{
"cat": "accuracy",
"title": "Accuracy: is it backed by evidence?",
"about": "Accuracy asks whether the claims are supported by good evidence and fit with expert consensus. Trust signals are links to published studies you can check and advice that matches major health organisations. Red flags are claims supported only by personal stories, a single small study presented as final proof, 'miracle cure' or guaranteed-results promises without research, and advice to stop prescribed medicine. In this game, clues about what a source claims and how it proves it belong to accuracy, even when they also sound like selling.",
"points": [
"Testimonials are anecdotes, not evidence: they can't show cause and effect",
"Good science rests on many studies; one small study can easily be wrong",
"Advice to stop a prescribed medicine is a serious red flag"
],
"tip": "Accuracy = 'Show me the proof.' Evidence you can check beats stories and promises."
},
{
"cat": "currency",
"title": "Currency: is it up to date?",
"about": "Currency asks whether the information is recent enough to reflect current guidance. Health advice changes as new research appears, for example on medicines, vaccines and screening. A trust signal is a clear date showing when a page was last reviewed or updated; a red flag is a page that hasn't been updated in many years or shows no date at all. Older pages aren't automatically wrong, but you should check them against current guidance.",
"points": [
"Look for 'last reviewed' or 'last updated' dates",
"Many health bodies review pages every few years",
"Broken links can be a hint a site is no longer maintained"
],
"tip": "Currency = 'When?' Like milk, health advice has a use-by date."
},
{
"cat": "objectivity",
"title": "Objectivity: is it balanced or selling?",
"about": "Objectivity asks whether the source presents information fairly or is trying to persuade or sell. Trust signals are adverts clearly marked and kept separate from content, and an honest account of risks and limits as well as benefits. Red flags are pages that mainly sell the product they praise, and pressure tactics such as countdown timers and 'buy now' offers. A conflict of interest, a reason to want you to believe something, doesn't prove information is false, but it means you should look for an independent source.",
"points": [
"Ask: does anyone make money if I believe this?",
"Balanced sources mention side effects and who a treatment isn't suitable for",
"Urgency and scarcity are sales tactics, not quality signals"
],
"tip": "Objectivity = 'Why?' Why was this page made: to inform you or to sell to you?"
}
],
"outro": "In 'Which test?', match the clue to its question: Who (authority), Proof (accuracy), When (currency), Why (objectivity)."
}
});
