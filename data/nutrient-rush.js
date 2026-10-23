/* Nutrient Rush — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "nutrient-rush",
"title": "Nutrient Rush",
"subject": "nutrition",
"subjectName": "Nutrition",
"chapter": "11–12",
"tagline": "Vitamins and minerals: what they do, where to find them, what happens without them",
"itemNoun": "nutrient",
"categories": [
{
"id": "fat",
"name": "Fat-soluble vitamin",
"color": "cat-amber",
"icon": "drop"
},
{
"id": "water",
"name": "Water-soluble vitamin",
"color": "cat-sky",
"icon": "drop"
},
{
"id": "major",
"name": "Major mineral",
"color": "cat-sage",
"icon": "cube"
},
{
"id": "trace",
"name": "Trace mineral",
"color": "cat-lilac",
"icon": "atom"
}
],
"categoryLabel": "Type",
"hint": "Learn each nutrient's job, its best food sources and the classic sign of not getting enough.",
"tile": {
"big": "code",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{job}"
],
"detail": [
{
"label": "Type",
"field": "{category}"
},
{
"label": "Main job",
"field": "{job}"
},
{
"label": "Good sources",
"field": "{foods}"
},
{
"label": "Too little causes",
"field": "{lack}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore nutrients",
"desc": "Tap a nutrient to see its job, foods and deficiency.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "lack",
"format": "quiz",
"title": "Not enough causes…",
"desc": "See the nutrient, pick its deficiency sign.",
"icon": "?",
"color": "cat-coral",
"prompt": "Not getting enough of this can cause",
"show": "name",
"showAs": "big",
"answer": "lack",
"answerAs": "small"
},
{
"id": "foods",
"format": "quiz",
"title": "Find it in food",
"desc": "See the foods, name the nutrient.",
"icon": "Fe",
"color": "cat-amber",
"prompt": "Which nutrient are these foods rich in?",
"show": "foods",
"showAs": "text",
"answer": "name"
},
{
"id": "type",
"format": "sortit",
"title": "Vitamin or mineral?",
"desc": "Sort each nutrient by type.",
"icon": "⌖",
"color": "cat-sky",
"prompt": "What type of nutrient is this?",
"choices": 4
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each nutrient with its deficiency.",
"icon": "⇄",
"color": "cat-mint",
"clue": "lack",
"clueLabel": "Lack of it"
}
],
"items": [
{
"name": "Vitamin A",
"code": "A",
"cat": "fat",
"job": "Vision in dim light, skin and immunity",
"foods": "Carrots, sweet potato, leafy greens, liver, eggs",
"lack": "Night blindness",
"life": "Carrots really do help: they provide what the body turns into vitamin A for night vision.",
"num": 1,
"facts": [
"Fat-soluble, stored in the liver, so high supplement doses can become toxic.",
"Orange plants (carrots, sweet potato) supply beta-carotene, which the body converts into vitamin A.",
"Animal sources such as liver and eggs give ready-made vitamin A.",
"Night blindness happens because the eye's dim-light pigment needs vitamin A."
]
},
{
"name": "Vitamin D",
"code": "D",
"cat": "fat",
"job": "Absorbing calcium for strong bones",
"foods": "Sunlight on skin, oily fish, eggs, fortified foods",
"lack": "Rickets in children, osteomalacia (soft, aching bones) in adults",
"life": "Your skin makes vitamin D in sunlight, so levels often dip in winter.",
"num": 2,
"facts": [
"Unusual because skin makes it in sunlight; few foods naturally contain much.",
"Its main job is helping the gut absorb calcium, so lack causes soft bones.",
"Rickets = soft, bent bones in children; osteomalacia = soft, aching bones in adults.",
"Different from osteoporosis, which is low bone density, often linked to calcium."
]
},
{
"name": "Vitamin E",
"code": "E",
"cat": "fat",
"job": "Antioxidant that protects cells",
"foods": "Vegetable oils, sunflower seeds, almonds",
"lack": "Nerve and muscle problems (rare)",
"life": "A handful of almonds is a good source of vitamin E.",
"num": 3,
"facts": [
"Acts as an antioxidant, protecting fats in cell membranes from damage.",
"Richest sources are plant oils, seeds and nuts such as sunflower seeds and almonds.",
"Deficiency is rare; when it occurs it harms nerves and muscles.",
"Don't confuse with vitamin K: E protects cells, K helps blood clot."
]
},
{
"name": "Vitamin K",
"code": "K1",
"cat": "fat",
"job": "Blood clotting",
"foods": "Leafy greens like kale, spinach and broccoli",
"lack": "Easy bleeding and bruising",
"life": "Newborn babies get a vitamin K injection to prevent bleeding.",
"num": 4,
"facts": [
"Needed by the liver to make clotting factors, so lack causes easy bleeding and bruising.",
"Green leafy vegetables (kale, spinach, broccoli) are the main food sources; gut bacteria make some too.",
"Newborns have little, so they are given a vitamin K injection at birth.",
"Not the same as K, the symbol for potassium."
]
},
{
"name": "Vitamin C",
"code": "C",
"cat": "water",
"job": "Making collagen and healing wounds",
"foods": "Citrus fruit, peppers, kiwi, strawberries",
"lack": "Scurvy: bleeding gums, slow healing",
"life": "Sailors once got scurvy on long voyages until they carried citrus fruit.",
"num": 5,
"facts": [
"Water-soluble and not stored much, so it must be eaten regularly.",
"Needed to make collagen, so lack weakens gums, skin and blood vessels.",
"Scurvy signs: bleeding gums, slow wound healing, easy bruising.",
"Also helps absorb iron from plant foods."
]
},
{
"name": "Thiamine (B1)",
"code": "B1",
"cat": "water",
"job": "Turning carbohydrates into energy",
"foods": "Whole grains, pork, beans",
"lack": "Beriberi: nerve and heart problems",
"life": "Heavy alcohol use is a common cause of low thiamine.",
"num": 6,
"facts": [
"Helps turn carbohydrate into energy, especially for nerves and heart.",
"Beriberi affects nerves (numbness, weakness) and the heart (heart failure).",
"Heavy alcohol use is the commonest cause of deficiency in rich countries.",
"Pork and whole grains are good sources; refined white rice lost it historically."
]
},
{
"name": "Riboflavin (B2)",
"code": "B2",
"cat": "water",
"job": "Releasing energy from food",
"foods": "Eggs, mushrooms, lean meat, yeast extract",
"lack": "Cracks at the corners of the mouth",
"life": "Riboflavin turns urine bright yellow after taking a B-vitamin supplement.",
"num": 7,
"facts": [
"Helps release energy from food as part of the body's energy enzymes.",
"Lack causes cracks at the mouth corners and a sore, red tongue.",
"Found in eggs, milk, mushrooms, lean meat and yeast extract.",
"Its yellow colour is why B supplements turn urine bright yellow."
]
},
{
"name": "Niacin (B3)",
"code": "B3",
"cat": "water",
"job": "Energy release and healthy skin",
"foods": "Chicken, tuna, peanuts, whole grains",
"lack": "Pellagra: rash, diarrhoea, confusion",
"life": "Pellagra was once common where diets relied heavily on untreated maize.",
"num": 8,
"facts": [
"Works in energy release and keeps skin, gut and nerves healthy.",
"Pellagra's three Ds: dermatitis, diarrhoea, dementia (confusion).",
"Good sources: chicken, tuna, peanuts, whole grains.",
"Untreated maize binds its niacin; traditional lime treatment releases it."
]
},
{
"name": "Folate (B9)",
"code": "B9",
"cat": "water",
"job": "Making DNA and new cells",
"foods": "Asparagus, Brussels sprouts, chickpeas, oranges, fortified bread",
"lack": "Anaemia, and birth defects in pregnancy",
"life": "Folic acid is advised before and in early pregnancy to protect the baby's spine.",
"num": 9,
"facts": [
"Needed to make DNA, so it matters most where cells divide fast: blood and the growing baby.",
"Lack causes anaemia with large red cells, like B12 lack, but without nerve damage.",
"Low folate in early pregnancy raises the risk of neural tube defects such as spina bifida.",
"Folic acid is the synthetic form used in supplements and fortified bread."
]
},
{
"name": "Vitamin B12",
"code": "B12",
"cat": "water",
"job": "Red blood cells and healthy nerves",
"foods": "Meat, fish, eggs, dairy, fortified plant foods",
"lack": "Anaemia and nerve damage",
"life": "Vegans need B12 from fortified foods or supplements because plants don't provide it.",
"num": 10,
"facts": [
"Only animal foods provide it naturally; vegans need fortified foods or supplements.",
"Lack causes anaemia and nerve damage (tingling, numbness, memory problems).",
"Absorption needs intrinsic factor from the stomach; pernicious anaemia is when this fails.",
"The liver stores years' worth, so deficiency develops slowly."
]
},
{
"name": "Calcium",
"code": "Ca",
"cat": "major",
"job": "Building bones and teeth, muscle contraction",
"foods": "Dairy, fortified plant milks, tofu, sardines",
"lack": "Weak bones over time (osteoporosis)",
"life": "Your bones are a calcium bank the body draws on when intake is low.",
"num": 11,
"facts": [
"The most abundant mineral in the body; about 99% is in bones and teeth.",
"Also needed for muscle contraction, nerve signals and blood clotting.",
"Needs vitamin D to be absorbed well from the gut.",
"Long-term low intake contributes to osteoporosis, fragile bones that break easily."
]
},
{
"name": "Potassium",
"code": "K",
"cat": "major",
"job": "Nerve signals, heartbeat and blood pressure",
"foods": "Bananas, potatoes, beans, avocado",
"lack": "Weak muscles and an irregular heartbeat",
"life": "Eating more potassium-rich foods can help lower blood pressure.",
"num": 12,
"facts": [
"The main mineral inside cells; works with sodium to control nerve and heart signals.",
"Low potassium causes muscle weakness and an irregular heartbeat.",
"Bananas, potatoes, beans and avocado are rich sources.",
"Symbol K (Latin kalium): don't confuse with vitamin K."
]
},
{
"name": "Magnesium",
"code": "Mg",
"cat": "major",
"job": "Muscles, nerves and energy",
"foods": "Pumpkin seeds, whole grains, beans, dark chocolate",
"lack": "Muscle twitches, tremor and tiredness",
"life": "Dark chocolate and pumpkin seeds are surprisingly rich in magnesium.",
"num": 13,
"facts": [
"Helps hundreds of enzymes, including those for energy, muscles and nerves.",
"Lack shows as muscle twitches, cramps, tremor and tiredness.",
"Seeds, nuts, whole grains, beans and dark chocolate are good sources.",
"Over half the body's magnesium is stored in bone."
]
},
{
"name": "Sodium",
"code": "Na",
"cat": "major",
"job": "Fluid balance and nerve signals",
"foods": "Table salt, processed and ready-made foods",
"lack": "Rarely too little; too much raises blood pressure",
"life": "Most salt in modern diets comes from bread, sauces and ready meals, not the salt shaker.",
"num": 14,
"facts": [
"The main mineral outside cells; controls fluid balance and nerve signals.",
"Diets rarely lack it; the common problem is too much, raising blood pressure.",
"Most comes from processed foods, bread, sauces and ready meals.",
"Table salt is sodium chloride; symbol Na comes from Latin natrium."
]
},
{
"name": "Iron",
"code": "Fe",
"cat": "trace",
"job": "Carrying oxygen in the blood",
"foods": "Red meat, liver, lentils, tofu, fortified cereal",
"lack": "Iron-deficiency anaemia: tiredness, pale skin",
"life": "Vitamin C in the same meal helps you absorb iron from plant foods.",
"num": 15,
"facts": [
"Part of haemoglobin, which carries oxygen in red blood cells.",
"Lack causes iron-deficiency anaemia: tiredness, breathlessness, pale skin.",
"Iron from meat (haem iron) is absorbed better than iron from plants.",
"Vitamin C with a meal boosts plant iron absorption; tea and coffee reduce it."
]
},
{
"name": "Iodine",
"code": "I",
"cat": "trace",
"job": "Making thyroid hormones",
"foods": "Iodised salt, fish, seaweed, dairy",
"lack": "Goitre (swollen thyroid)",
"life": "Iodised salt was introduced to prevent goitre.",
"num": 16,
"facts": [
"Built into thyroid hormones, which set the body's metabolic rate.",
"Lack makes the thyroid enlarge into a goitre, a swelling in the neck.",
"Iodised salt, fish, seaweed and dairy are the main sources.",
"In pregnancy, lack can harm the baby's brain development."
]
},
{
"name": "Zinc",
"code": "Zn",
"cat": "trace",
"job": "Immunity and wound healing",
"foods": "Meat, shellfish, seeds, beans",
"lack": "Slow wound healing and loss of taste",
"life": "Oysters are the richest food source of zinc.",
"num": 17,
"facts": [
"Needed by immune cells, for wound healing and for the sense of taste.",
"Lack causes slow healing, frequent infections and loss of taste.",
"Oysters, meat, shellfish, seeds and beans are good sources.",
"Wound healing links zinc with vitamin C; zinc also affects taste, vitamin C doesn't."
]
}
],
"note": "For learning only. Not medical or dietary advice.",
"diagram": "foods",
"diagramCaption": "Good food sources",
"diagramPerItem": true,
"notes": {
"intro": "Micronutrients are vitamins and minerals: you need only small amounts, but each has a job no other nutrient can do. Vitamins are organic compounds made by living things; minerals are elements that come from soil and water and cannot be destroyed by cooking. Vitamins split into fat-soluble (A, D, E, K) and water-soluble (C and the B group); minerals split into major minerals (needed in larger amounts) and trace minerals (needed in tiny amounts). For every nutrient, learn three things together: its main job, the foods that supply it, and the classic sign of not getting enough, because the deficiency sign usually follows from the job.",
"sections": [
{
"cat": "fat",
"title": "Fat-soluble vitamins: A, D, E, K",
"about": "These four vitamins dissolve in fat, so they are absorbed with dietary fat and stored in the liver and fatty tissue. Because they are stored, a deficiency develops slowly, and very high intakes from supplements can build up to toxic levels (especially A and D). Each has a distinct job: A for vision in dim light, skin and immunity; D for absorbing calcium into bone; E as an antioxidant protecting cell membranes; K for making blood-clotting proteins. The deficiency signs follow the jobs: night blindness (A), soft bones (D), nerve and muscle problems (E, rare), easy bleeding (K). Conditions that reduce fat absorption, such as some gut and liver diseases, can cause low levels of all four.",
"points": [
"Mnemonic for the group: 'ADEK' are stored in fat",
"A = eyes, D = bones, E = cell protection, K = clotting (K from German 'Koagulation')",
"Stored, so toxicity is possible; A and D are the main ones to overdo with supplements"
],
"tip": "Picture a fat droplet carrying four passengers: Eyes (A), Bones (D), a Shield (E) and a plaster to stop bleeding (K)."
},
{
"cat": "water",
"title": "Water-soluble vitamins: C and the B group",
"about": "These dissolve in water, so the body keeps only small stores (B12 is the big exception: the liver holds years of it) and extra amounts mostly leave in urine. That means they need to be eaten regularly, and they are easily lost into cooking water or destroyed by heat. Most B vitamins help release energy from food, so their deficiencies tend to hit high-energy tissues such as nerves, heart, skin and the lining of the mouth. Folate and B12 both work in making new cells, so a lack of either causes anaemia with large, immature red cells; B12 lack also damages nerves. Vitamin C is needed to make collagen, the protein 'glue' of skin, gums and blood vessels, which is why scurvy causes bleeding gums and poor healing.",
"points": [
"Classic named diseases: scurvy (C), beriberi (B1), pellagra (B3), cracked mouth corners (B2)",
"Pellagra's 'three Ds': dermatitis (rash), diarrhoea, dementia (confusion)",
"Folate and B12 both cause anaemia; only B12 lack typically causes nerve damage",
"B12 is found naturally only in animal foods, so vegans need fortified foods or supplements"
],
"tip": "B1 Beriberi starts with B; Pellagra's 3 Ds go with B3; Folate is for 'Foetus' and new cells; C for Collagen."
},
{
"cat": "major",
"title": "Major minerals",
"about": "Major (macro) minerals are needed in amounts of more than about 100 mg a day, and the body holds them in larger quantities. Calcium is the most abundant mineral in the body: almost all of it sits in bones and teeth, and the rest drives muscle contraction and nerve signals. Sodium and potassium work as a pair to control fluid balance and the electrical signals in nerves and the heart; sodium is mainly outside cells, potassium mainly inside. Magnesium helps hundreds of enzymes, including those for energy, muscles and nerves. In modern diets the usual problem with sodium is too much, raising blood pressure, while potassium and calcium intakes are often too low.",
"points": [
"Calcium lack over years gives osteoporosis (thin, fragile bones); vitamin D is needed to absorb it",
"Low potassium: weak muscles and an irregular heartbeat; potassium-rich foods help lower blood pressure",
"Most dietary sodium comes from processed foods, bread and sauces, not the salt shaker",
"Don't confuse symbols: K is potassium (mineral) but 'vitamin K' is a vitamin"
],
"tip": "Picture a cell as a ship at sea: salty sodium is the sea outside, potassium is the crew inside."
},
{
"cat": "trace",
"title": "Trace minerals",
"about": "Trace minerals are needed in very small amounts (less than about 100 mg a day), yet a shortage still causes clear disease. Iron is part of haemoglobin, which carries oxygen in red blood cells, so a lack gives iron-deficiency anaemia with tiredness and pale skin. Iodine is built into thyroid hormones; without it the thyroid enlarges into a goitre as it struggles to make hormone. Zinc supports immune cells, wound healing and the sense of taste. Iron from meat is absorbed more easily than iron from plants, and vitamin C eaten at the same meal improves absorption of plant iron.",
"points": [
"Iron = oxygen transport; iodine = thyroid; zinc = immunity, healing, taste",
"Iodised salt and dairy are major iodine sources; seaweed and fish are rich too",
"Oysters are the richest food source of zinc"
],
"tip": "Iron Is for oxygen, Iodine Is for the thyroid, Zinc Zips wounds closed."
}
],
"outro": "In the quizzes you'll see a nutrient and pick its deficiency, or see a list of foods and name the nutrient: learn the job first and the rest follows. For learning only, not dietary advice."
}
});
