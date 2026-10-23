/* pH Patrol — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "ph-patrol",
"title": "pH Patrol",
"subject": "chemistry",
"subjectName": "Chemistry",
"chapter": "16–17",
"tagline": "Acid, neutral or base? Put everyday things on the pH scale",
"itemNoun": "substance",
"categories": [
{
"id": "vacid",
"name": "Very acidic (below pH 4)",
"color": "cat-coral",
"icon": "flame"
},
{
"id": "macid",
"name": "Mildly acidic (pH 4 to 7)",
"color": "cat-amber",
"icon": "drop"
},
{
"id": "neutral",
"name": "Neutral (pH 7)",
"color": "cat-sage",
"icon": "drop"
},
{
"id": "mbase",
"name": "Mildly basic (pH 7 to 10)",
"color": "cat-sky",
"icon": "drop"
},
{
"id": "vbase",
"name": "Very basic (above pH 10)",
"color": "cat-lilac",
"icon": "flame"
}
],
"categoryLabel": "pH zone",
"hint": "The pH scale runs from 0 (very acidic) to 14 (very basic), with 7 as neutral. Each step is ten times stronger. Values here are typical, rounded figures.",
"tile": {
"big": "ph",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"pH {ph}",
"{category}"
],
"detail": [
{
"label": "Typical pH",
"field": "about {ph}"
},
{
"label": "Zone",
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
"title": "Explore the pH scale",
"desc": "Tap any substance to see its pH and why it matters.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "zone",
"format": "sortit",
"title": "Acid or base?",
"desc": "Sort each substance into its pH zone.",
"icon": "⌖",
"color": "cat-amber",
"prompt": "Where does this sit on the pH scale?",
"choices": 5
},
{
"id": "value",
"format": "quiz",
"title": "Guess the pH",
"desc": "See the substance, pick its typical pH.",
"icon": "7",
"color": "cat-sky",
"prompt": "What is the typical pH of",
"show": "name",
"showAs": "big",
"answer": "ph",
"answerAs": "symbol"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each substance with its pH.",
"icon": "⇄",
"color": "cat-mint",
"clue": "phLabel",
"clueLabel": "pH"
}
],
"items": [
{
"name": "Battery acid",
"ph": "0",
"cat": "vacid",
"summary": "Sulfuric acid strong enough to burn skin and eat through metal.",
"life": "Battery acid burns skin, so a cracked or leaking car battery needs careful handling.",
"num": 1,
"phLabel": "pH 0"
},
{
"name": "Stomach acid",
"ph": "1.5",
"cat": "vacid",
"summary": "Hydrochloric acid that kills germs and helps digest protein.",
"life": "Heartburn is stomach acid escaping up into the food pipe.",
"num": 2,
"phLabel": "pH 1.5"
},
{
"name": "Lemon juice",
"ph": "2",
"cat": "vacid",
"summary": "Citric acid gives lemons their sharp, sour taste.",
"life": "A squeeze of lemon stops cut apples and avocados going brown.",
"num": 3,
"phLabel": "pH 2"
},
{
"name": "Cola",
"ph": "2.5",
"cat": "vacid",
"summary": "Phosphoric acid and dissolved carbon dioxide make cola acidic.",
"life": "Dentists warn that frequent fizzy drinks soften tooth enamel.",
"num": 4,
"phLabel": "pH 2.5"
},
{
"name": "Vinegar",
"ph": "3",
"cat": "vacid",
"summary": "About 5% acetic acid in water.",
"life": "Vinegar dissolves kettle limescale because acid reacts with chalk.",
"num": 5,
"phLabel": "pH 3"
},
{
"name": "Orange juice",
"ph": "3.5",
"cat": "vacid",
"summary": "Citric and ascorbic (vitamin C) acids make it acidic.",
"life": "Brushing straight after orange juice can wear enamel; waiting a while is gentler.",
"num": 6,
"phLabel": "pH 3.5"
},
{
"name": "Tomato juice",
"ph": "4",
"cat": "macid",
"summary": "Tomatoes contain citric and malic acids.",
"life": "Tomato sauce cooked in some metal pans can taste metallic because of its acid.",
"num": 7,
"phLabel": "pH 4"
},
{
"name": "Black coffee",
"ph": "5",
"cat": "macid",
"summary": "Coffee contains several natural acids.",
"life": "Some people with reflux find coffee makes it worse.",
"num": 8,
"phLabel": "pH 5"
},
{
"name": "Normal rain",
"ph": "5.6",
"cat": "macid",
"summary": "Rain dissolves carbon dioxide from the air, forming a weak acid.",
"life": "Acid rain from pollution is lower than this and damages stone buildings.",
"num": 9,
"phLabel": "pH 5.6"
},
{
"name": "Milk",
"ph": "6.5",
"cat": "macid",
"summary": "Very slightly acidic, close to neutral.",
"life": "Milk turning sour is bacteria making lactic acid and lowering its pH.",
"num": 10,
"phLabel": "pH 6.5"
},
{
"name": "Pure water",
"ph": "7",
"cat": "neutral",
"summary": "Exactly neutral: neither acidic nor basic.",
"life": "Freshly distilled water is pH 7, but it slowly absorbs CO₂ from the air and turns slightly acidic.",
"num": 11,
"phLabel": "pH 7"
},
{
"name": "Blood",
"ph": "7.4",
"cat": "mbase",
"summary": "Kept in a tight, slightly basic range of about 7.35–7.45.",
"life": "Your lungs and kidneys work all day to hold your blood's pH steady.",
"num": 12,
"phLabel": "pH 7.4"
},
{
"name": "Sea water",
"ph": "8",
"cat": "mbase",
"summary": "Slightly basic because of dissolved minerals.",
"life": "As oceans absorb CO₂, their pH falls, which harms coral.",
"num": 13,
"phLabel": "pH 8"
},
{
"name": "Baking soda solution",
"ph": "8.5",
"cat": "mbase",
"summary": "Sodium bicarbonate dissolved in water is mildly basic.",
"life": "A spoon of baking soda in water is an old heartburn remedy because it neutralises acid.",
"num": 14,
"phLabel": "pH 8.5"
},
{
"name": "Milk of magnesia",
"ph": "10.5",
"cat": "vbase",
"summary": "A suspension of magnesium hydroxide, a mild base.",
"life": "Used as an antacid and a laxative.",
"num": 15,
"phLabel": "pH 10.5"
},
{
"name": "Household ammonia",
"ph": "11.5",
"cat": "vbase",
"summary": "Ammonia in water: a strong-smelling base.",
"life": "Never mix ammonia cleaners with bleach: they release toxic gas.",
"num": 16,
"phLabel": "pH 11.5"
},
{
"name": "Bleach",
"ph": "12.5",
"cat": "vbase",
"summary": "Sodium hypochlorite solution, kept strongly basic, that disinfects.",
"life": "Bleach whitens laundry and kills germs on surfaces.",
"num": 17,
"phLabel": "pH 12.5"
},
{
"name": "Drain cleaner",
"ph": "14",
"cat": "vbase",
"summary": "Concentrated sodium hydroxide, the most basic thing in the home.",
"life": "It dissolves hair and grease in pipes; gloves are essential.",
"num": 18,
"phLabel": "pH 14"
}
]
});
