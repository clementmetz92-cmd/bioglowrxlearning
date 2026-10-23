/* Formula Forge — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "formula-forge",
"title": "Formula Forge",
"subject": "chemistry",
"subjectName": "Chemistry",
"chapter": "2",
"tagline": "Everyday substances and their chemical formulas",
"itemNoun": "compound",
"categories": [
{
"id": "element",
"name": "Element (one kind of atom)",
"color": "cat-sky",
"icon": "atom"
},
{
"id": "molecule",
"name": "Simple inorganic molecule",
"color": "cat-mint",
"icon": "molecule"
},
{
"id": "ionic",
"name": "Salt",
"color": "cat-coral",
"icon": "cube"
},
{
"id": "acid",
"name": "Acid",
"color": "cat-amber",
"icon": "flame"
},
{
"id": "base",
"name": "Base",
"color": "cat-lilac",
"icon": "drop"
},
{
"id": "organic",
"name": "Organic compound",
"color": "cat-sage",
"icon": "hexagon"
}
],
"categoryLabel": "Type",
"hint": "A formula tells you which atoms are in a substance and how many. H₂O means two hydrogen atoms and one oxygen atom.",
"tile": {
"big": "formula",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{formula}",
"{category}"
],
"detail": [
{
"label": "Formula",
"field": "{formula}"
},
{
"label": "Type",
"field": "{category}"
},
{
"label": "Atoms",
"field": "{atoms}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore compounds",
"desc": "Tap any formula to see what it is and where you meet it.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "formula",
"format": "quiz",
"title": "Name → Formula",
"desc": "See the name, pick its formula.",
"icon": "?",
"color": "cat-sky",
"prompt": "What is the formula for",
"show": "name",
"showAs": "big",
"answer": "formula",
"answerAs": "symbol"
},
{
"id": "name",
"format": "quiz",
"title": "Formula → Name",
"desc": "See the formula, name the substance.",
"icon": "H₂O",
"color": "cat-lemon",
"prompt": "Which substance is this?",
"showAs": "tile",
"answer": "name"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each formula with its everyday name.",
"icon": "⇄",
"color": "cat-mint",
"clue": "name",
"clueLabel": "Name"
},
{
"id": "type",
"format": "sortit",
"title": "What type is it?",
"desc": "Element, molecule, salt, acid, base or organic?",
"icon": "⌖",
"color": "cat-orchid",
"prompt": "What type of substance is this?",
"sub": "{formula}"
}
],
"items": [
{
"name": "Water",
"formula": "H₂O",
"cat": "molecule",
"atoms": "2 hydrogen, 1 oxygen",
"summary": "The most common liquid on Earth, and about 60% of your body.",
"life": "Every glass of water, cup of tea and raindrop.",
"num": 1
},
{
"name": "Carbon dioxide",
"formula": "CO₂",
"cat": "molecule",
"atoms": "1 carbon, 2 oxygen",
"summary": "A gas you breathe out; plants take it in to make sugar.",
"life": "The bubbles in fizzy drinks are carbon dioxide.",
"num": 2
},
{
"name": "Carbon monoxide",
"formula": "CO",
"cat": "molecule",
"atoms": "1 carbon, 1 oxygen",
"summary": "A poisonous, odourless gas from fuel that burns without enough air.",
"life": "Home CO alarms warn you about faulty boilers and heaters.",
"num": 3
},
{
"name": "Ammonia",
"formula": "NH₃",
"cat": "molecule",
"atoms": "1 nitrogen, 3 hydrogen",
"summary": "A sharp-smelling gas used to make fertilisers and cleaners.",
"life": "The strong smell of some glass and floor cleaners is ammonia.",
"num": 4
},
{
"name": "Hydrogen peroxide",
"formula": "H₂O₂",
"cat": "molecule",
"atoms": "2 hydrogen, 2 oxygen",
"summary": "A liquid that releases oxygen and bleaches and disinfects.",
"life": "Used in hair bleach, teeth-whitening gels and wound cleaning.",
"num": 5
},
{
"name": "Oxygen gas",
"formula": "O₂",
"cat": "element",
"atoms": "2 oxygen",
"summary": "The form of oxygen in the air: two oxygen atoms bonded together.",
"life": "Every breath you take brings O₂ into your lungs.",
"num": 6
},
{
"name": "Nitrogen gas",
"formula": "N₂",
"cat": "element",
"atoms": "2 nitrogen",
"summary": "About 78% of the air; it is very unreactive.",
"life": "Crisp packets are filled with nitrogen to keep the crisps fresh.",
"num": 7
},
{
"name": "Ozone",
"formula": "O₃",
"cat": "element",
"atoms": "3 oxygen",
"summary": "A form of oxygen with three atoms; high up it blocks UV light.",
"life": "The ozone layer protects you from sunburn-causing UV rays.",
"num": 8
},
{
"name": "Sodium chloride",
"formula": "NaCl",
"cat": "ionic",
"atoms": "1 sodium, 1 chlorine",
"summary": "Table salt: a crystal of sodium and chloride ions.",
"life": "The salt you sprinkle on food and the salt in sea water.",
"num": 9
},
{
"name": "Sodium bicarbonate",
"formula": "NaHCO₃",
"cat": "ionic",
"atoms": "1 sodium, 1 hydrogen, 1 carbon, 3 oxygen",
"summary": "Baking soda: it releases carbon dioxide when heated or mixed with acid.",
"life": "It makes cakes rise and can neutralise stomach acid.",
"num": 10
},
{
"name": "Calcium carbonate",
"formula": "CaCO₃",
"cat": "ionic",
"atoms": "1 calcium, 1 carbon, 3 oxygen",
"summary": "The main mineral in chalk, limestone, eggshells and seashells.",
"life": "Many antacid tablets and calcium supplements are calcium carbonate.",
"num": 11
},
{
"name": "Hydrochloric acid",
"formula": "HCl",
"cat": "acid",
"atoms": "1 hydrogen, 1 chlorine",
"summary": "A strong acid; your stomach makes it to digest food.",
"life": "Stomach acid is a dilute solution of hydrochloric acid.",
"num": 12
},
{
"name": "Sulfuric acid",
"formula": "H₂SO₄",
"cat": "acid",
"atoms": "2 hydrogen, 1 sulfur, 4 oxygen",
"summary": "A strong, very corrosive acid and one of the most produced industrial chemicals.",
"life": "The acid inside a car battery is sulfuric acid.",
"num": 13
},
{
"name": "Nitric acid",
"formula": "HNO₃",
"cat": "acid",
"atoms": "1 hydrogen, 1 nitrogen, 3 oxygen",
"summary": "A strong, corrosive acid used to make fertilisers.",
"life": "Most nitrogen fertiliser on farms starts out as nitric acid.",
"num": 14
},
{
"name": "Sodium hydroxide",
"formula": "NaOH",
"cat": "base",
"atoms": "1 sodium, 1 oxygen, 1 hydrogen",
"summary": "Caustic soda (lye): a strong, corrosive base.",
"life": "Drain and oven cleaners often contain sodium hydroxide.",
"num": 15
},
{
"name": "Methane",
"formula": "CH₄",
"cat": "organic",
"atoms": "1 carbon, 4 hydrogen",
"summary": "The simplest hydrocarbon and the main part of natural gas.",
"life": "The blue flame on a gas hob is burning methane.",
"num": 16
},
{
"name": "Ethanol",
"formula": "C₂H₅OH",
"cat": "organic",
"atoms": "2 carbon, 6 hydrogen, 1 oxygen",
"summary": "The alcohol in drinks, also used as a fuel and disinfectant.",
"life": "Hand sanitiser gel is mostly ethanol.",
"num": 17
},
{
"name": "Glucose",
"formula": "C₆H₁₂O₆",
"cat": "organic",
"atoms": "6 carbon, 12 hydrogen, 6 oxygen",
"summary": "A simple sugar and the body's main fuel.",
"life": "A blood sugar test measures glucose.",
"num": 18
}
]
});
