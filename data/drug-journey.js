/* Drug Journey — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "drug-journey",
"title": "Drug Journey",
"subject": "pharmacology",
"subjectName": "Pharmacology",
"chapter": "1",
"tagline": "What the body does to a drug, and what the drug does to the body",
"itemNoun": "term",
"categories": [
{
"id": "pk",
"name": "The journey: getting in, around and out",
"color": "cat-sky",
"icon": "steps"
},
{
"id": "pd",
"name": "Pharmacodynamics (the effect)",
"color": "cat-lilac",
"icon": "zap"
},
{
"id": "dose",
"name": "Dosing and levels",
"color": "cat-amber",
"icon": "chart"
}
],
"categoryLabel": "Topic",
"hint": "Pharmacokinetics is the drug's journey through the body; pharmacodynamics is how it acts. Learn the key terms, then put the journey in order. Dosing terms like half-life are also part of pharmacokinetics, but have their own group here.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{meaning}"
],
"detail": [
{
"label": "Topic",
"field": "{category}"
},
{
"label": "Meaning",
"field": "{meaning}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the terms",
"desc": "Tap a term for its meaning and an example.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "order",
"format": "sequence",
"title": "Put it in order",
"desc": "Order a tablet's journey and how doses build up.",
"icon": "1→",
"color": "cat-sky"
},
{
"id": "meaning",
"format": "quiz",
"title": "What's the term?",
"desc": "Read the meaning, pick the term.",
"icon": "?",
"color": "cat-lilac",
"prompt": "Which term matches this?",
"show": "meaning",
"showAs": "text",
"answer": "name"
},
{
"id": "topic",
"format": "sortit",
"title": "Journey or effect?",
"desc": "Sort each term into its topic.",
"icon": "⌖",
"color": "cat-amber",
"prompt": "Which topic does this term belong to?",
"choices": 3
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each term with its meaning.",
"icon": "⇄",
"color": "cat-mint",
"clue": "meaning",
"clueLabel": "Meaning",
"pairs": 6
}
],
"items": [
{
"name": "Absorption",
"cat": "pk",
"meaning": "The drug moving from where it was given into the blood",
"life": "A tablet is mostly absorbed through the wall of the small intestine.",
"num": 1
},
{
"name": "Distribution",
"cat": "pk",
"meaning": "The drug spreading from the blood to the body's tissues",
"life": "Some drugs struggle to cross into the brain because of the blood-brain barrier.",
"num": 2
},
{
"name": "Metabolism",
"cat": "pk",
"meaning": "The body chemically changing the drug, mostly in the liver",
"life": "Grapefruit juice can slow the metabolism of some drugs and raise their levels.",
"num": 3
},
{
"name": "Excretion",
"cat": "pk",
"meaning": "The body getting rid of the drug, mostly through the kidneys",
"life": "Doses are often lowered for people with weak kidney function.",
"num": 4
},
{
"name": "First-pass effect",
"cat": "pk",
"meaning": "Part of a swallowed drug is broken down by the gut and liver before it reaches the general circulation",
"life": "This is why some drugs are given under the tongue or by injection instead.",
"num": 5
},
{
"name": "Bioavailability",
"cat": "pk",
"meaning": "The share of a dose that reaches the general circulation unchanged",
"life": "An IV injection has 100% bioavailability by definition.",
"num": 6
},
{
"name": "Agonist",
"cat": "pd",
"meaning": "A drug that switches a receptor on",
"life": "Morphine is an agonist at opioid receptors.",
"num": 7
},
{
"name": "Antagonist",
"cat": "pd",
"meaning": "A drug that sits in a receptor without switching it on, blocking others",
"life": "Naloxone reverses an opioid overdose by blocking opioid receptors.",
"num": 8
},
{
"name": "Side effect",
"cat": "pd",
"meaning": "An effect that is not the one the drug is given for",
"life": "Drowsiness from older hay fever tablets is a classic side effect.",
"num": 9
},
{
"name": "Half-life",
"cat": "dose",
"meaning": "The time it takes for the drug level in the blood to halve",
"life": "A short half-life usually means the drug is taken several times a day.",
"num": 10
},
{
"name": "Steady state",
"cat": "dose",
"meaning": "When the amount going in equals the amount going out, so levels stop building up",
"life": "It is usually reached after about four to five half-lives.",
"num": 11
},
{
"name": "Therapeutic range",
"cat": "dose",
"meaning": "The drug level that works without causing toxicity",
"life": "Drugs with a narrow range, like digoxin, need blood tests to check levels.",
"num": 12
},
{
"name": "Peak level",
"cat": "dose",
"meaning": "The highest drug level after a dose",
"life": "Some antibiotics are checked at their peak to make sure the dose is high enough.",
"num": 13
},
{
"name": "Trough level",
"cat": "dose",
"meaning": "The lowest drug level, just before the next dose",
"life": "Trough levels help check a drug isn't building up too much.",
"num": 14
},
{
"name": "Loading dose",
"cat": "dose",
"meaning": "A bigger first dose to reach a working level quickly",
"life": "Used when waiting for steady state would take too long.",
"num": 15
}
],
"sequences": [
{
"id": "adme",
"title": "The four stages of the drug journey (ADME)",
"icon": "steps",
"steps": [
"Absorption",
"Distribution",
"Metabolism",
"Excretion"
],
"note": "ADME is the order pharmacokinetics is usually taught in."
},
{
"id": "tablet",
"title": "A tablet's journey, from swallow to exit",
"icon": "pill",
"steps": [
"Swallowed",
"Dissolves in the stomach",
"Absorbed in the small intestine",
"Passes through the liver (first pass)",
"Enters the general circulation",
"Reaches its target tissue",
"Broken down by the liver on later trips round the body",
"Removed by the kidneys in urine"
],
"note": "Not every drug follows this exact path, but most tablets do."
},
{
"id": "levels",
"title": "Regular doses building up to a steady level",
"icon": "chart",
"steps": [
"First dose is taken",
"Blood level rises to a peak",
"Level falls towards a trough",
"Next dose is taken before it runs out",
"Peaks and troughs climb with each dose",
"After about 4–5 half-lives, peaks and troughs stop rising"
],
"note": "This is why some medicines take days to reach their full effect."
}
],
"note": "For learning only. Not medical advice."
});
