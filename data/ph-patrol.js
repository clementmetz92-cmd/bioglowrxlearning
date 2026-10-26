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
"clue": "phLabel", "cardBig": "@icon:beaker", "cardCorner": "",
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
"phLabel": "pH 0",
"facts": [
"About pH 0: the most acidic item in the game.",
"It is sulfuric acid, H₂SO₄, a strong acid.",
"Ten times more acidic than pH 1 and a hundred times more than pH 2 (lemon)."
]
},
{
"name": "Stomach acid",
"ph": "1.5",
"cat": "vacid",
"summary": "Hydrochloric acid that kills germs and helps digest protein.",
"life": "Heartburn is stomach acid escaping up into the food pipe.",
"num": 2,
"phLabel": "pH 1.5",
"facts": [
"About pH 1.5, made of hydrochloric acid (HCl).",
"Released by parietal cells in the stomach lining.",
"A mucus layer protects the stomach wall from its own acid.",
"More acidic than lemon juice (pH 2), but less than battery acid (pH 0)."
]
},
{
"name": "Lemon juice",
"ph": "2",
"cat": "vacid",
"summary": "Citric acid gives lemons their sharp, sour taste.",
"life": "A squeeze of lemon stops cut apples and avocados going brown.",
"num": 3,
"phLabel": "pH 2",
"facts": [
"About pH 2, from citric acid.",
"More acidic than orange juice (3.5) and vinegar (3).",
"The most acidic common food in the game."
]
},
{
"name": "Cola",
"ph": "2.5",
"cat": "vacid",
"summary": "Phosphoric acid and dissolved carbon dioxide make cola acidic.",
"life": "Dentists warn that frequent fizzy drinks soften tooth enamel.",
"num": 4,
"phLabel": "pH 2.5",
"facts": [
"About pH 2.5, between lemon (2) and vinegar (3).",
"Its acidity comes mainly from phosphoric acid plus carbonic acid from the bubbles.",
"Low pH plus sugar makes it hard on tooth enamel."
]
},
{
"name": "Vinegar",
"ph": "3",
"cat": "vacid",
"summary": "About 5% acetic acid in water.",
"life": "Vinegar dissolves kettle limescale because acid reacts with chalk.",
"num": 5,
"phLabel": "pH 3",
"facts": [
"About pH 3, from acetic acid (ethanoic acid).",
"Acetic acid is a weak acid: it only partly splits up in water.",
"Less acidic than lemon juice (2), more than orange juice (3.5)."
]
},
{
"name": "Orange juice",
"ph": "3.5",
"cat": "vacid",
"summary": "Citric and ascorbic (vitamin C) acids make it acidic.",
"life": "Brushing straight after orange juice can wear enamel; waiting a while is gentler.",
"num": 6,
"phLabel": "pH 3.5",
"facts": [
"About pH 3.5, the least acidic item in the very acidic zone.",
"Less acidic than lemon juice (2) because oranges contain less citric acid.",
"Still below 4, so it is 'very acidic', unlike tomato juice at 4."
]
},
{
"name": "Tomato juice",
"ph": "4",
"cat": "macid",
"summary": "Tomatoes contain citric and malic acids.",
"life": "Tomato sauce cooked in some metal pans can taste metallic because of its acid.",
"num": 7,
"phLabel": "pH 4",
"facts": [
"About pH 4, exactly on the boundary, so it counts as mildly acidic.",
"Less acidic than orange juice (3.5), more acidic than coffee (5).",
"Ten times less acidic than vinegar (pH 3)."
]
},
{
"name": "Black coffee",
"ph": "5",
"cat": "macid",
"summary": "Coffee contains several natural acids.",
"life": "Some people with reflux find coffee makes it worse.",
"num": 8,
"phLabel": "pH 5",
"facts": [
"About pH 5, in the middle of the mildly acidic zone.",
"Ten times less acidic than tomato juice (4).",
"Adding milk raises the pH a little."
]
},
{
"name": "Normal rain",
"ph": "5.6",
"cat": "macid",
"summary": "Rain dissolves carbon dioxide from the air, forming a weak acid.",
"life": "Acid rain from pollution is lower than this and damages stone buildings.",
"num": 9,
"phLabel": "pH 5.6",
"facts": [
"About pH 5.6, because CO₂ dissolves to form weak carbonic acid.",
"Rain is never naturally neutral; 5.6 is normal.",
"Acid rain has a pH below about 5.6, caused by sulfur and nitrogen oxides."
]
},
{
"name": "Milk",
"ph": "6.5",
"cat": "macid",
"summary": "Very slightly acidic, close to neutral.",
"life": "Milk turning sour is bacteria making lactic acid and lowering its pH.",
"num": 10,
"phLabel": "pH 6.5",
"facts": [
"About pH 6.5: slightly acidic, close to neutral.",
"The most nearly neutral item on the acidic side.",
"As milk sours, lactic acid lowers the pH and the proteins curdle."
]
},
{
"name": "Pure water",
"ph": "7",
"cat": "neutral",
"summary": "Exactly neutral: neither acidic nor basic.",
"life": "Freshly distilled water is pH 7, but it slowly absorbs CO₂ from the air and turns slightly acidic.",
"num": 11,
"phLabel": "pH 7",
"facts": [
"Exactly pH 7: equal amounts of H⁺ and OH⁻.",
"The only item in the neutral zone.",
"Tap and bottled water vary a little because of dissolved minerals and gases."
]
},
{
"name": "Blood",
"ph": "7.4",
"cat": "mbase",
"summary": "Kept in a tight, slightly basic range of about 7.35–7.45.",
"life": "Your lungs and kidneys work all day to hold your blood's pH steady.",
"num": 12,
"phLabel": "pH 7.4",
"facts": [
"About pH 7.4, kept between 7.35 and 7.45.",
"Slightly basic, so it sits in the mildly basic zone, not neutral.",
"Bicarbonate buffers, breathing rate and the kidneys hold it steady.",
"Below 7.35 is acidosis; above 7.45 is alkalosis."
]
},
{
"name": "Sea water",
"ph": "8",
"cat": "mbase",
"summary": "Slightly basic because of dissolved minerals.",
"life": "As oceans absorb CO₂, their pH falls, which harms coral.",
"num": 13,
"phLabel": "pH 8",
"facts": [
"About pH 8, slightly basic.",
"Dissolved carbonate and bicarbonate minerals keep it basic.",
"More basic than blood (7.4), less than baking soda solution (8.5)."
]
},
{
"name": "Baking soda solution",
"ph": "8.5",
"cat": "mbase",
"summary": "Sodium bicarbonate dissolved in water is mildly basic.",
"life": "A spoon of baking soda in water is an old heartburn remedy because it neutralises acid.",
"num": 14,
"phLabel": "pH 8.5",
"facts": [
"About pH 8.5: sodium bicarbonate (NaHCO₃) in water.",
"A weak base that neutralises acid and releases CO₂ bubbles.",
"Less basic than milk of magnesia (10.5)."
]
},
{
"name": "Milk of magnesia",
"ph": "10.5",
"cat": "vbase",
"summary": "A suspension of magnesium hydroxide, a mild base.",
"life": "Used as an antacid and a laxative.",
"num": 15,
"phLabel": "pH 10.5",
"facts": [
"About pH 10.5: magnesium hydroxide, Mg(OH)₂, in water.",
"Just above 10, so it is the mildest item in the very basic zone.",
"Safe to swallow because little of it dissolves at once.",
"More basic than baking soda solution (8.5), less than ammonia (11.5)."
]
},
{
"name": "Household ammonia",
"ph": "11.5",
"cat": "vbase",
"summary": "Ammonia in water: a strong-smelling base.",
"life": "Never mix ammonia cleaners with bleach: they release toxic gas.",
"num": 16,
"phLabel": "pH 11.5",
"facts": [
"About pH 11.5: ammonia (NH₃) dissolved in water.",
"Ammonia takes H⁺ from water, leaving OH⁻ ions that make it basic.",
"Between milk of magnesia (10.5) and bleach (12.5)."
]
},
{
"name": "Bleach",
"ph": "12.5",
"cat": "vbase",
"summary": "Sodium hypochlorite solution, kept strongly basic, that disinfects.",
"life": "Bleach whitens laundry and kills germs on surfaces.",
"num": 17,
"phLabel": "pH 12.5",
"facts": [
"About pH 12.5: sodium hypochlorite (NaOCl) solution.",
"Kept basic so it stays stable; acids make it release chlorine gas.",
"More basic than ammonia (11.5), less than drain cleaner (14)."
]
},
{
"name": "Drain cleaner",
"ph": "14",
"cat": "vbase",
"summary": "Concentrated sodium hydroxide, the most basic thing in the home.",
"life": "It dissolves hair and grease in pipes; gloves are essential.",
"num": 18,
"phLabel": "pH 14",
"facts": [
"About pH 14, the top of the scale.",
"Concentrated sodium hydroxide (NaOH), a strong base.",
"The opposite end of the scale from battery acid at pH 0."
]
}
],
"diagram": "phscale",
"diagramCaption": "On the pH scale",
"diagramPerItem": true,
"notes": {
"intro": "pH measures how acidic or basic a watery solution is, on a scale from 0 to 14. Acids release hydrogen ions (H⁺); the more H⁺, the lower the pH. Bases mop up H⁺ or release hydroxide ions (OH⁻), pushing the pH above 7. Pure water at 7 is neutral. The scale is logarithmic: each whole step is ten times stronger, so pH 2 is ten times more acidic than pH 3 and a hundred times more than pH 4. The games ask you to place each substance in its zone and to pick its typical pH.",
"sections": [
{
"cat": "vacid",
"title": "Very acidic (below pH 4)",
"about": "These substances are strongly sour or corrosive. At the bottom are strong mineral acids: battery acid (sulfuric acid) near 0 and stomach acid (hydrochloric acid) around 1.5. Above them come foods and drinks whose sharp taste comes from weaker acids: lemon juice (citric acid) at 2, cola (phosphoric acid and CO₂) at 2.5, vinegar (acetic acid) at 3 and orange juice at 3.5. Lemon is more acidic than orange, and stomach acid is more acidic than any food.",
"points": [
"Order: battery acid 0, stomach acid 1.5, lemon 2, cola 2.5, vinegar 3, orange juice 3.5.",
"Below pH 5.5 or so, tooth enamel starts to dissolve.",
"Lemon (2) is ten times more acidic than vinegar (3)."
],
"tip": "Big Strong Lemons Can Vanquish Oranges: battery, stomach, lemon, cola, vinegar, orange, from most to least acidic."
},
{
"cat": "macid",
"title": "Mildly acidic (pH 4 to 7)",
"about": "These are only slightly acidic and many taste mild rather than sour. Tomato juice sits right on the boundary at 4, so it counts as mildly acidic here. Black coffee is about 5. Normal, unpolluted rain is about 5.6 because it dissolves carbon dioxide and forms weak carbonic acid. Milk is about 6.5, just below neutral. Anything from 4 up to just under 7 belongs in this zone.",
"points": [
"Order: tomato juice 4, black coffee 5, normal rain 5.6, milk 6.5.",
"Acid rain is rain with a pH below about 5.6.",
"Milk is acidic, not basic, even though it soothes heartburn for a short time."
],
"tip": "Tomato, Coffee, Rain, Milk: 4, 5, 5.6, 6.5. Breakfast, then a walk in the rain."
},
{
"cat": "neutral",
"title": "Neutral (pH 7)",
"about": "At pH 7 the amounts of H⁺ and OH⁻ are equal, so the solution is neither acidic nor basic. Pure water is the reference point for neutral. In practice, water left open to the air dissolves carbon dioxide and slowly drifts below 7. Neutral is the dividing line: everything below is acidic, everything above is basic.",
"points": [
"pH 7 = H⁺ equals OH⁻.",
"Acid + base in the right amounts gives a neutral salt solution and water."
],
"tip": "Seven is the middle of 0 to 14: the balance point."
},
{
"cat": "mbase",
"title": "Mildly basic (pH 7 to 10)",
"about": "These are slightly basic (alkaline). Blood is kept at about 7.4, within a tight range of 7.35 to 7.45, by buffers such as bicarbonate along with the lungs and kidneys. Below that range is acidosis and above it alkalosis, even though 7.3 is technically above neutral. Sea water is about 8 thanks to dissolved minerals. Baking soda in water is about 8.5, which is why it neutralises stomach acid.",
"points": [
"Order: blood 7.4, sea water 8, baking soda solution 8.5.",
"Blood below 7.35 = acidosis; above 7.45 = alkalosis.",
"Mild bases often feel slippery and taste bitter."
],
"tip": "Blood, Sea, Soda: 7.4, 8, 8.5. Your blood is a little bit like the sea."
},
{
"cat": "vbase",
"title": "Very basic (above pH 10)",
"about": "These are strong bases, mostly household cleaners and antacids. Milk of magnesia (magnesium hydroxide) is about 10.5, gentle enough to swallow because it dissolves only a little. Household ammonia is about 11.5 and bleach about 12.5. Drain cleaner, concentrated sodium hydroxide, reaches 14, the top of the scale. Strong bases are just as dangerous as strong acids: they dissolve fats and proteins, including skin.",
"points": [
"Order: milk of magnesia 10.5, ammonia 11.5, bleach 12.5, drain cleaner 14.",
"Never mix bleach with ammonia or with acids: both make toxic gases.",
"Drain cleaner (14) is the opposite end of the scale from battery acid (0)."
],
"tip": "Magnesia, Ammonia, Bleach, Drain: each about one step stronger, ending at 14."
}
],
"outro": "To guess a pH, first decide the zone, then place it in that zone's order. Remember each step is ten times stronger."
}
});
