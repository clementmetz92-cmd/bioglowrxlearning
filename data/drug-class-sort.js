/* Drug Class Sort — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "drug-class-sort",
"title": "Drug Class Sort",
"subject": "pharmacology",
"subjectName": "Pharmacology",
"chapter": "5–9",
"tagline": "Common medicines, their drug families and what they treat",
"itemNoun": "medicine",
"categories": [
{
"id": "cardio",
"name": "Heart and blood vessels",
"color": "cat-coral",
"icon": "heart"
},
{
"id": "resp",
"name": "Breathing and allergy",
"color": "cat-sky",
"icon": "lungs"
},
{
"id": "gi",
"name": "Digestion",
"color": "cat-amber",
"icon": "stomach"
},
{
"id": "cns",
"name": "Brain and nerves",
"color": "cat-lilac",
"icon": "brain"
},
{
"id": "endo",
"name": "Hormones and diabetes",
"color": "cat-sage",
"icon": "gland"
}
],
"categoryLabel": "Body system",
"hint": "Medicines in the same class work in a similar way. Generic names often share an ending, like -pril, -olol or -statin.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{cls}",
"{use}"
],
"detail": [
{
"label": "Drug class",
"field": "{cls}"
},
{
"label": "Used for",
"field": "{use}"
},
{
"label": "Body system",
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
"title": "Explore medicines",
"desc": "Tap a medicine to see its class and what it treats.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "system",
"format": "sortit",
"title": "Which body system?",
"desc": "Sort each medicine by the system it treats.",
"icon": "⌖",
"color": "cat-coral",
"prompt": "Which body system is this medicine mainly for?",
"choices": 5
},
{
"id": "class",
"format": "quiz",
"title": "Name the class",
"desc": "See the medicine, pick its drug class.",
"icon": "?",
"color": "cat-lilac",
"prompt": "Which drug class is",
"show": "name",
"showAs": "big",
"answer": "cls",
"answerAs": "small"
},
{
"id": "use",
"format": "quiz",
"title": "What is it for?",
"desc": "See the medicine, pick what it treats.",
"icon": "℞",
"color": "cat-sky",
"prompt": "What is this medicine mainly used for?",
"show": "name",
"showAs": "big",
"answer": "use",
"answerAs": "small"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each medicine with its class.",
"icon": "⇄",
"color": "cat-mint",
"clue": "cls",
"clueLabel": "Class"
}
],
"items": [
{
"name": "Lisinopril",
"cat": "cardio",
"cls": "ACE inhibitor",
"use": "High blood pressure and heart failure",
"life": "Names ending in -pril are ACE inhibitors; a dry cough is a well-known side effect.",
"icon": "heart",
"num": 1
},
{
"name": "Losartan",
"cat": "cardio",
"cls": "ARB (angiotensin receptor blocker)",
"use": "High blood pressure, often when ACE inhibitors cause a cough",
"life": "Names ending in -sartan are ARBs, often used when an ACE inhibitor causes a cough.",
"icon": "heart",
"num": 2
},
{
"name": "Amlodipine",
"cat": "cardio",
"cls": "Calcium channel blocker",
"use": "High blood pressure and angina",
"life": "It relaxes artery walls; swollen ankles are a common side effect.",
"icon": "heart",
"num": 3
},
{
"name": "Metoprolol",
"cat": "cardio",
"cls": "Beta blocker",
"use": "Fast heart rate and high blood pressure",
"life": "Names ending in -olol are beta blockers; they slow the heart.",
"icon": "heart",
"num": 4
},
{
"name": "Atorvastatin",
"cat": "cardio",
"cls": "Statin",
"use": "High cholesterol",
"life": "Statins (-statin) lower LDL 'bad' cholesterol made by the liver.",
"icon": "heart",
"num": 5
},
{
"name": "Furosemide",
"cat": "cardio",
"cls": "Loop diuretic",
"use": "Fluid build-up and heart failure",
"life": "A strong 'water tablet' that makes you pass more urine.",
"icon": "drop",
"num": 6
},
{
"name": "Hydrochlorothiazide",
"cat": "cardio",
"cls": "Thiazide diuretic",
"use": "Mild high blood pressure, often added to other tablets",
"life": "A milder water tablet often combined with other blood pressure medicines.",
"icon": "drop",
"num": 7
},
{
"name": "Warfarin",
"cat": "cardio",
"cls": "Anticoagulant",
"use": "Preventing blood clots",
"life": "People on warfarin have regular blood tests (INR) and watch their vitamin K intake.",
"icon": "heart",
"num": 8
},
{
"name": "Albuterol (salbutamol)",
"cat": "resp",
"cls": "Short-acting bronchodilator",
"use": "Quick relief of asthma attacks",
"life": "The blue 'reliever' inhaler opens the airways within minutes.",
"icon": "lungs",
"num": 9
},
{
"name": "Fluticasone",
"cat": "resp",
"cls": "Inhaled corticosteroid",
"use": "Preventing asthma attacks (inhaled preventer)",
"life": "A 'preventer' inhaler used every day to calm airway inflammation.",
"icon": "lungs",
"num": 10
},
{
"name": "Montelukast",
"cat": "resp",
"cls": "Leukotriene receptor antagonist",
"use": "Asthma, as a daily add-on tablet",
"life": "A tablet that reduces airway swelling caused by leukotrienes.",
"icon": "lungs",
"num": 11
},
{
"name": "Cetirizine",
"cat": "resp",
"cls": "Antihistamine",
"use": "Hay fever, hives and itchy allergies",
"life": "A common over-the-counter hay fever tablet.",
"icon": "leaf",
"num": 12
},
{
"name": "Omeprazole",
"cat": "gi",
"cls": "Proton pump inhibitor",
"use": "Stomach ulcers and severe reflux",
"life": "Names ending in -prazole cut stomach acid production.",
"icon": "stomach",
"num": 13
},
{
"name": "Famotidine",
"cat": "gi",
"cls": "H2 blocker",
"use": "Occasional heartburn and indigestion",
"life": "Names ending in -tidine reduce acid by blocking histamine in the stomach.",
"icon": "stomach",
"num": 14
},
{
"name": "Ondansetron",
"cat": "gi",
"cls": "Antiemetic",
"use": "Nausea and vomiting",
"life": "Often given to stop sickness after surgery or chemotherapy.",
"icon": "stomach",
"num": 15
},
{
"name": "Loperamide",
"cat": "gi",
"cls": "Antidiarrhoeal",
"use": "Diarrhoea",
"life": "It slows the gut down; a common travel first-aid tablet.",
"icon": "stomach",
"num": 16
},
{
"name": "Senna",
"cat": "gi",
"cls": "Stimulant laxative",
"use": "Constipation",
"life": "A plant-based laxative that makes the bowel muscles push.",
"icon": "leaf",
"num": 17
},
{
"name": "Sertraline",
"cat": "cns",
"cls": "SSRI antidepressant",
"use": "Depression and anxiety",
"life": "SSRIs raise serotonin levels; they take a few weeks to work fully.",
"icon": "brain",
"num": 18
},
{
"name": "Lorazepam",
"cat": "cns",
"cls": "Benzodiazepine",
"use": "Anxiety and seizures",
"life": "Names ending in -azepam calm the nervous system; they can be habit-forming.",
"icon": "brain",
"num": 19
},
{
"name": "Levetiracetam",
"cat": "cns",
"cls": "Antiseizure medicine",
"use": "Epilepsy",
"life": "Taken every day to prevent seizures.",
"icon": "brain",
"num": 20
},
{
"name": "Donepezil",
"cat": "cns",
"cls": "Cholinesterase inhibitor",
"use": "Alzheimer's disease",
"life": "It boosts acetylcholine to support memory for a while.",
"icon": "brain",
"num": 21
},
{
"name": "Metformin",
"cat": "endo",
"cls": "Biguanide",
"use": "Type 2 diabetes",
"life": "Usually the first tablet for type 2 diabetes; it lowers sugar made by the liver.",
"icon": "gland",
"num": 22
},
{
"name": "Insulin glargine",
"cat": "endo",
"cls": "Long-acting insulin",
"use": "Diabetes that needs insulin (type 1 or type 2)",
"life": "A once-a-day 'background' insulin injection.",
"icon": "gland",
"num": 23
},
{
"name": "Levothyroxine",
"cat": "endo",
"cls": "Thyroid hormone replacement",
"use": "Underactive thyroid",
"life": "A daily tablet that replaces missing thyroxine (T4).",
"icon": "gland",
"num": 24
},
{
"name": "Prednisone",
"cat": "endo",
"cls": "Oral corticosteroid",
"use": "Inflammation and immune conditions",
"life": "A steroid tablet that copies cortisol; doses are reduced slowly, not stopped suddenly.",
"icon": "gland",
"num": 25
}
],
"note": "For learning only. Not medical advice: always follow your doctor or pharmacist."
});
