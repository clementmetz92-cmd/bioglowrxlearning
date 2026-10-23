/* Bug vs Drug — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "bug-vs-drug",
"title": "Bug vs Drug",
"subject": "pharmacology",
"subjectName": "Pharmacology",
"chapter": "3",
"tagline": "Antibiotics, antifungals and antivirals: how each one attacks",
"itemNoun": "drug group",
"categories": [
{
"id": "wall",
"name": "Antibiotic: breaks the cell wall",
"color": "cat-coral",
"icon": "shield"
},
{
"id": "protein",
"name": "Antibiotic: stops protein building",
"color": "cat-amber",
"icon": "factory"
},
{
"id": "dna",
"name": "Antibiotic: blocks DNA or folate",
"color": "cat-lemon",
"icon": "dna"
},
{
"id": "fungus",
"name": "Antifungal",
"color": "cat-sage",
"icon": "leaf"
},
{
"id": "virus",
"name": "Antiviral",
"color": "cat-lilac",
"icon": "bug"
}
],
"categoryLabel": "How it attacks",
"hint": "Learn each group of antimicrobial drugs, a common example and how it fights the germ.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"e.g. {example}",
"{category}"
],
"detail": [
{
"label": "Example",
"field": "{example}"
},
{
"label": "How it attacks",
"field": "{category}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the drugs",
"desc": "Tap a drug group for an example and how it works.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "example",
"format": "quiz",
"title": "Name the group",
"desc": "See an example drug, pick its group.",
"icon": "?",
"color": "cat-sky",
"prompt": "Which group does this drug belong to?",
"show": "example",
"showAs": "big",
"answer": "name",
"answerAs": "small"
},
{
"id": "how",
"format": "sortit",
"title": "How does it attack?",
"desc": "Sort each group by how it fights the germ.",
"icon": "⌖",
"color": "cat-coral",
"prompt": "How does this drug group attack the germ?",
"choices": 5
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each group with an example drug.",
"icon": "⇄",
"color": "cat-mint",
"clue": "example",
"clueLabel": "Example"
}
],
"items": [
{
"name": "Penicillins",
"cat": "wall",
"example": "Amoxicillin",
"life": "Penicillin was the first antibiotic found in nature to become a medicine; penicillin allergy is the most commonly reported drug allergy.",
"icon": "shield",
"num": 1
},
{
"name": "Cephalosporins",
"cat": "wall",
"example": "Cefalexin",
"life": "Close cousins of penicillins, used for skin and urinary infections.",
"icon": "shield",
"num": 2
},
{
"name": "Carbapenems",
"cat": "wall",
"example": "Meropenem",
"life": "Powerful hospital antibiotics kept for resistant infections.",
"icon": "shield",
"num": 3
},
{
"name": "Glycopeptides",
"cat": "wall",
"example": "Vancomycin",
"life": "A key treatment for MRSA; blood levels are monitored.",
"icon": "shield",
"num": 4
},
{
"name": "Macrolides",
"cat": "protein",
"example": "Azithromycin",
"life": "Often used for chest infections, and for people allergic to penicillin.",
"icon": "factory",
"num": 5
},
{
"name": "Tetracyclines",
"cat": "protein",
"example": "Doxycycline",
"life": "Usually avoided in young children and pregnancy because they can stain growing teeth.",
"icon": "factory",
"num": 6
},
{
"name": "Aminoglycosides",
"cat": "protein",
"example": "Gentamicin",
"life": "Given by injection; levels are checked because it can harm the kidneys and hearing.",
"icon": "factory",
"num": 7
},
{
"name": "Fluoroquinolones",
"cat": "dna",
"example": "Ciprofloxacin",
"life": "Carries a warning about tendon damage.",
"icon": "dna",
"num": 8
},
{
"name": "Folate blockers",
"cat": "dna",
"example": "Trimethoprim",
"life": "A common tablet for urinary tract infections; it blocks the germ's folate.",
"icon": "dna",
"num": 9
},
{
"name": "Nitroimidazoles",
"cat": "dna",
"example": "Metronidazole",
"life": "Patients are told to avoid alcohol while taking it.",
"icon": "dna",
"num": 10
},
{
"name": "Azole antifungals",
"cat": "fungus",
"example": "Fluconazole",
"life": "A single tablet is a common treatment for vaginal thrush.",
"icon": "leaf",
"num": 11
},
{
"name": "Neuraminidase inhibitors",
"cat": "virus",
"example": "Oseltamivir",
"life": "Known as Tamiflu; it stops new flu viruses escaping from infected cells.",
"icon": "bug",
"num": 12
},
{
"name": "Herpes antivirals",
"cat": "virus",
"example": "Aciclovir",
"life": "Used for cold sores, chickenpox and shingles.",
"icon": "bug",
"num": 13
}
],
"note": "For learning only. Not medical advice: antibiotics only work on bacteria and need a prescription."
});
