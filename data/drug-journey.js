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
"icon": "pharm-absorb",
"name": "Absorption",
"cat": "pk",
"meaning": "The drug moving from where it was given into the blood",
"life": "A tablet is mostly absorbed through the wall of the small intestine.",
"num": 1,
"spot": "gut",
"facts": [
"Stage 1 of ADME.",
"The small intestine absorbs most tablets because of its huge surface area.",
"IV drugs skip absorption because they go straight into the blood.",
"Food, gut speed and the drug's form can change how fast it is absorbed."
],
"summary": "The first stage of the journey: the drug moves from where it was given into the bloodstream."
},
{
"icon": "pharm-distribute",
"name": "Distribution",
"cat": "pk",
"meaning": "The drug spreading from the blood to the body's tissues",
"life": "Some drugs struggle to cross into the brain because of the blood-brain barrier.",
"num": 2,
"spot": [
"blood",
"tissue"
],
"facts": [
"Stage 2 of ADME, after absorption and before metabolism.",
"Organs with a big blood supply, like heart, liver and kidneys, receive drug first.",
"Drug bound to blood proteins such as albumin cannot leave the blood or act.",
"The blood-brain barrier keeps many drugs out of the brain."
],
"summary": "The second stage: the blood carries the drug out to the body's tissues."
},
{
"icon": "pharm-liver",
"name": "Metabolism",
"cat": "pk",
"meaning": "The body chemically changing the drug, mostly in the liver",
"life": "Grapefruit juice can slow the metabolism of some drugs and raise their levels.",
"num": 3,
"spot": "liver",
"facts": [
"Stage 3 of ADME; also called biotransformation.",
"Liver enzymes (the cytochrome P450 family) do most of the work.",
"Usually makes a drug easier to excrete; some prodrugs only become active after metabolism.",
"Liver disease or interacting drugs can slow metabolism and raise drug levels."
],
"summary": "The third stage: the body chemically changes the drug, mostly in the liver."
},
{
"icon": "kidney",
"name": "Excretion",
"cat": "pk",
"meaning": "The body getting rid of the drug, mostly through the kidneys",
"life": "Doses are often lowered for people with weak kidney function.",
"num": 4,
"spot": "kidneys",
"facts": [
"Stage 4, the last step of ADME.",
"Kidneys are the main route; bile, faeces, breath, sweat and breast milk are minor routes.",
"Kidney function is often checked by creatinine levels before dosing.",
"Do not confuse with metabolism: metabolism changes the drug, excretion removes it."
],
"summary": "The final stage: the body removes the drug, mostly in urine via the kidneys."
},
{
"icon": "pharm-firstpass",
"name": "First-pass effect",
"cat": "pk",
"meaning": "Part of a swallowed drug is broken down by the gut and liver before it reaches the general circulation",
"life": "This is why some drugs are given under the tongue or by injection instead.",
"num": 5,
"spot": [
"gut",
"portal",
"liver"
],
"facts": [
"Blood from the gut goes to the liver first, through the hepatic portal vein.",
"Routes like under the tongue, skin patches and IV bypass the first pass.",
"Glyceryl trinitrate is given under the tongue because first pass would destroy most of it.",
"A big first-pass effect means low oral bioavailability."
],
"summary": "Some of a swallowed drug is broken down by the gut wall and liver before it reaches the rest of the body."
},
{
"icon": "pharm-pie",
"name": "Bioavailability",
"cat": "pk",
"meaning": "The share of a dose that reaches the general circulation unchanged",
"life": "An IV injection has 100% bioavailability by definition.",
"num": 6,
"spot": "blood",
"facts": [
"IV = 100% by definition, because the whole dose enters the blood.",
"Oral bioavailability is lowered by poor absorption and the first-pass effect.",
"Explains why oral and IV doses of the same drug can differ."
],
"summary": "The percentage of a dose that reaches the general circulation unchanged and can act."
},
{
"icon": "pharm-agonist",
"name": "Agonist",
"cat": "pd",
"meaning": "A drug that switches a receptor on",
"life": "Morphine is an agonist at opioid receptors.",
"num": 7,
"spot": "agonist",
"facts": [
"Binds the receptor and produces a response.",
"Albuterol is an agonist at beta-2 receptors, opening the airways.",
"Opposite of an antagonist, which binds but does not activate."
],
"summary": "A drug that binds a receptor and activates it, copying the body's own messenger."
},
{
"icon": "pharm-antagonist",
"name": "Antagonist",
"cat": "pd",
"meaning": "A drug that sits in a receptor without switching it on, blocking others",
"life": "Naloxone reverses an opioid overdose by blocking opioid receptors.",
"num": 8,
"spot": "antagonist",
"facts": [
"Also called a blocker: beta blockers are antagonists at beta receptors.",
"Naloxone pushes opioids off their receptors, reversing overdose.",
"Has no effect of its own; its effect comes from what it stops."
],
"summary": "A drug that binds a receptor without activating it, blocking the body's messenger or other drugs."
},
{
"icon": "pharm-warning",
"name": "Side effect",
"cat": "pd",
"meaning": "An effect that is not the one the drug is given for",
"life": "Drowsiness from older hay fever tablets is a classic side effect.",
"num": 9,
"spot": "offtarget",
"facts": [
"Can be mild (dry mouth), common but expected, or serious.",
"An adverse effect is the term for an unwanted, harmful one.",
"An allergy is a separate immune reaction, not just a side effect.",
"Sometimes useful: drowsy antihistamines are used to aid sleep."
],
"summary": "Any effect of a drug other than the one it is given for."
},
{
"icon": "pharm-halflife",
"name": "Half-life",
"cat": "dose",
"meaning": "The time it takes for the drug level in the blood to halve",
"life": "A short half-life usually means the drug is taken several times a day.",
"num": 10,
"spot": "halflife",
"facts": [
"Short half-life: doses are given more often; long half-life: less often.",
"About 4 to 5 half-lives to reach steady state, and also to clear a drug.",
"Liver or kidney problems can lengthen half-life."
],
"summary": "The time for the amount of drug in the blood to fall by half."
},
{
"icon": "pharm-steady",
"name": "Steady state",
"cat": "dose",
"meaning": "When the amount going in equals the amount going out, so levels stop building up",
"life": "It is usually reached after about four to five half-lives.",
"num": 11,
"spot": "steady",
"facts": [
"Reached after about 4 to 5 half-lives of regular dosing.",
"Levels still rise and fall between doses, but peaks and troughs stop climbing.",
"Explains why some medicines take days to reach full effect.",
"A loading dose is a shortcut to reach a working level sooner."
],
"summary": "The point where the drug going in equals the drug going out, so levels stop rising."
},
{
"icon": "pharm-range",
"name": "Therapeutic range",
"cat": "dose",
"meaning": "The drug level that works without causing toxicity",
"life": "Drugs with a narrow range, like digoxin, need blood tests to check levels.",
"num": 12,
"spot": "range",
"facts": [
"Below the range the drug does not work; above it, toxicity is likely.",
"A narrow range means a small gap between helpful and harmful doses.",
"Narrow-range drugs include digoxin, lithium, warfarin and gentamicin."
],
"summary": "The band of blood levels where a drug works without being toxic."
},
{
"icon": "pharm-peak",
"name": "Peak level",
"cat": "dose",
"meaning": "The highest drug level after a dose",
"life": "Some antibiotics are checked at their peak to make sure the dose is high enough.",
"num": 13,
"spot": "peak",
"facts": [
"Comes after absorption, before the level starts falling.",
"Too high a peak risks toxicity.",
"Opposite of trough level, the lowest point before the next dose."
],
"summary": "The highest blood level reached after a dose."
},
{
"icon": "pharm-trough",
"name": "Trough level",
"cat": "dose",
"meaning": "The lowest drug level, just before the next dose",
"life": "Trough levels help check a drug isn't building up too much.",
"num": 14,
"spot": "trough",
"facts": [
"Blood is drawn shortly before the next dose to measure it.",
"High troughs suggest the drug is building up; vancomycin troughs are often checked.",
"Opposite of peak level, the highest point after a dose."
],
"summary": "The lowest blood level, measured just before the next dose is due."
},
{
"icon": "pharm-loading",
"name": "Loading dose",
"cat": "dose",
"meaning": "A bigger first dose to reach a working level quickly",
"life": "Used when waiting for steady state would take too long.",
"num": 15,
"spot": "loading",
"facts": [
"Followed by smaller regular maintenance doses to keep the level there.",
"Useful for drugs with long half-lives, where steady state would take days.",
"Do not confuse with steady state: a loading dose is a shortcut to it."
],
"summary": "A larger first dose that quickly brings levels up to the working range."
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
"note": "For learning only. Not medical advice.",
"diagram": "drug-path",
"diagramCaption": "In the body",
"notes": {
"intro": "Pharmacology has two halves. Pharmacokinetics is what the body does to a drug: how it gets in, spreads around, is changed and is removed (ADME). Pharmacodynamics is what the drug does to the body: how it acts on receptors and which effects, wanted or not, it causes. Dosing terms such as half-life and steady state come from pharmacokinetics too, but they describe drug levels in the blood over time, so they have their own group here. The games ask you to match each term with its meaning, sort it into its topic, and put three journeys in order.",
"sections": [
{
"cat": "pk",
"title": "The journey: getting in, around and out",
"about": "These terms follow the drug from the moment it is given until it leaves the body. Absorption moves it into the blood, distribution carries it to the tissues, metabolism changes it chemically (mostly in the liver), and excretion removes it (mostly through the kidneys). A swallowed drug travels from the gut straight to the liver before reaching the rest of the body, and some of it is broken down on that first trip: the first-pass effect. Bioavailability is the share of the dose that survives to reach the general circulation unchanged, so a big first-pass effect means low oral bioavailability.",
"points": [
"ADME order: Absorption, Distribution, Metabolism, Excretion.",
"Tablet order: swallowed, dissolves in stomach, absorbed in small intestine, liver (first pass), general circulation, target tissue, liver breakdown, kidneys.",
"IV drugs skip absorption and first pass: bioavailability 100%.",
"Liver disease slows metabolism; kidney disease slows excretion. Both can raise drug levels."
],
"tip": "ADME: A Drug Must Exit. In, around, changed, out."
},
{
"cat": "pd",
"title": "Pharmacodynamics (the effect)",
"about": "Most drugs act by binding to receptors, protein switches on or in cells. An agonist fits the receptor and switches it on, copying the body's own messenger. An antagonist fits the receptor but does not switch it on; it simply blocks the site so the body's messenger or another drug cannot act. Any effect other than the one the drug is given for is a side effect; side effects can be harmless, annoying or dangerous.",
"points": [
"Agonist = key that turns the lock; antagonist = key that fits but jams the lock.",
"Morphine (agonist) and naloxone (antagonist) act on the same opioid receptor.",
"A side effect is any unintended effect, not only harmful ones."
],
"tip": "Agonist = Activates; Antagonist = Against (it blocks)."
},
{
"cat": "dose",
"title": "Dosing and levels",
"about": "After each dose, the blood level rises to a peak and then falls to a trough just before the next dose. Half-life is the time for the level to fall by half; it decides how often a drug is given. With regular doses the level climbs until intake equals removal, called steady state, reached after about four to five half-lives. The aim is to keep levels inside the therapeutic range, high enough to work but low enough to avoid toxicity. A loading dose is a bigger first dose that reaches a working level quickly instead of waiting for steady state.",
"points": [
"Levels order: first dose, rise to peak, fall to trough, next dose before it runs out, peaks and troughs climb, steady after 4 to 5 half-lives.",
"Peak = highest level after a dose; trough = lowest level, just before the next dose.",
"Narrow therapeutic range (digoxin, vancomycin, gentamicin) means blood level checks.",
"After 1 half-life 50% remains, after 2 25%, after 3 12.5%."
],
"tip": "Peak = mountain top after the dose; trough = valley floor before the next."
}
],
"outro": "If a term describes movement or processing of the drug, it is the journey; if it describes the drug acting on the body, it is the effect; if it is about levels over time, it is dosing. For learning only, not medical advice."
}
});
