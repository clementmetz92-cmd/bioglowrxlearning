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
},
{
"id": "exam",
"format": "exam",
"title": "Exam-style questions",
"desc": "Select all that apply, and what to do first.",
"icon": "✓✓",
"color": "cat-sand",
"rounds": 8,
"extra": true
}
],
"exam": [
{
"id": "nr-x1",
"cat": "trace",
"kind": "sata",
"stem": "An older man brings a bag of supplements to a clinic visit and asks which ones could harm him if he takes too much.",
"q": "Which nutrients have a UL that the nurse should compare his total daily dose against? Select all that apply.",
"options": ["Vitamin D", "Vitamin B6", "Selenium", "Iron", "Vitamin B12", "Pantothenic acid (B5)"],
"answer": [0, 1, 2, 3],
"why": "Adult ULs: vitamin D 100 mcg (4,000 IU), vitamin B6 100 mg, selenium 400 mcg and iron 45 mg a day, so supplement doses can push intake into the harmful range. Vitamin B12 and pantothenic acid have no UL because no harm has been shown from high intakes. No UL means no proven harm, not a licence for any dose."
},
{
"id": "nr-x2",
"cat": "water",
"kind": "sata",
"q": "A student is reviewing the Dietary Reference Intakes. Which statements are correct? Select all that apply.",
"options": [
"The RDA meets the needs of 97 to 98% of healthy people in a group.",
"The EAR meets the needs of about half of healthy people in a group.",
"An AI is used when there is not enough evidence to set an RDA.",
"The UL is the daily amount everyone should aim to reach.",
"The DRIs are designed to treat people who already have a deficiency."
],
"answer": [0, 1, 2],
"why": "The EAR covers half of healthy people, and the RDA is set higher to cover nearly all (97 to 98%). An AI is used when the evidence is too thin to set an EAR and RDA. The UL is a ceiling, not a target, and the DRIs are for planning diets for healthy people, not for treating deficiency disease."
},
{
"id": "nr-x3",
"cat": "major",
"kind": "sata",
"stem": "An adult's diet record shows the share of daily energy from carbohydrate, protein and fat.",
"q": "Which intakes fall within the adult AMDRs? Select all that apply.",
"options": ["Carbohydrate at 55% of energy", "Protein at 20% of energy", "Fat at 30% of energy", "Fat at 45% of energy", "Carbohydrate at 35% of energy", "Protein at 5% of energy"],
"answer": [0, 1, 2],
"why": "Adult AMDRs are carbohydrate 45 to 65%, protein 10 to 35% and fat 20 to 35% of daily energy. So 55% carbohydrate, 20% protein and 30% fat are all inside the ranges. Fat at 45% is above its range, carbohydrate at 35% is below its range and protein at 5% is below its range."
},
{
"id": "nr-x4",
"cat": "trace",
"kind": "sata",
"stem": "A man eats a large handful of Brazil nuts every day and also takes a selenium supplement.",
"q": "Which findings would suggest selenium toxicity? Select all that apply.",
"options": ["Garlic smell on the breath", "Brittle nails and hair loss", "A metallic taste in the mouth", "Night blindness", "Bleeding gums"],
"answer": [0, 1, 2],
"why": "Too much selenium (selenosis) gives garlic-smelling breath, a metallic taste, brittle nails and hair loss, often with stomach upset. One Brazil nut can hold more than the 55 mcg RDA, and the UL is 400 mcg a day. Night blindness points to low vitamin A, and bleeding gums to low vitamin C."
},
{
"id": "nr-x5",
"cat": "trace",
"kind": "sata",
"stem": "A primary care nurse sees a 2-year-old at a well-child visit. The family's home uses private well water that is not fluoridated.",
"q": "Which measures support the child's dental health? Select all that apply.",
"options": [
"Apply fluoride varnish to the child's teeth",
"Brush twice a day with a smear of fluoride toothpaste",
"Refer the child to a dentist for regular care",
"Start daily fluoride tablets at home straight away",
"Avoid all fluoride products until the child is 6"
],
"answer": [0, 1, 2],
"why": "The USPSTF advises fluoride varnish in primary care from the first tooth to age 5, and a rice-grain smear of fluoride toothpaste is advised from the first tooth. A dental home helps judge the child's risk of decay. Fluoride tablets are not started straight away: the well water's fluoride level has to be tested first, and in October 2025 the FDA said prescription fluoride tablets and drops should not be used in children under 3. Avoiding fluoride altogether raises the risk of tooth decay."
},
{
"id": "nr-x6",
"cat": "water",
"kind": "sata",
"stem": "A woman has taken 200 mg of vitamin B6 a day for several months for premenstrual symptoms. She now has numbness and tingling in her feet.",
"q": "Which statements by the nurse are accurate? Select all that apply.",
"options": [
"This dose is above the adult upper limit of 100 mg a day.",
"High doses of B6 over time can damage sensory nerves.",
"The numbness often improves after the supplement is stopped.",
"Water-soluble vitamins are flushed out, so this dose is safe.",
"Your symptoms mean your body needs a higher dose of B6."
],
"answer": [0, 1, 2],
"why": "The adult UL for vitamin B6 is 100 mg a day, and long-term high doses cause sensory nerve damage, which usually improves once the supplement is stopped. Being water-soluble does not make every dose safe. Raising the dose would make the nerve damage worse, not better."
},
{
"id": "nr-x7",
"cat": "major",
"kind": "first",
"stem": "A 19-year-old with anorexia nervosa started tube feeding yesterday. This morning her phosphate level is very low and she says she feels weak and short of breath.",
"q": "What should the nurse do first?",
"options": [
"Report the low phosphate level to the provider",
"Assess her breathing and oxygen saturation",
"Check the feeding rate against the order",
"Teach her about foods rich in phosphorus"
],
"answer": 1,
"why": "Airway and breathing come first, and assessment comes before action: very low phosphate in refeeding syndrome can weaken the breathing muscles and the heart. Reporting the result and checking the feed rate follow straight after. Teaching about food sources can wait until she is stable."
},
{
"id": "nr-x8",
"cat": "water",
"kind": "first",
"stem": "A 45-year-old woman comes to the emergency department with chest pain. She mentions taking high-dose biotin (10,000 mcg a day) for her hair.",
"q": "What should the nurse do first?",
"options": [
"Obtain a 12-lead ECG as ordered",
"Tell the provider about the high-dose biotin",
"Ask when she took her last biotin dose",
"Explain that biotin can affect some blood tests"
],
"answer": 0,
"why": "Chest pain may be a heart attack, so the acute, possibly unstable problem comes first and the ECG is the fastest assessment. High-dose biotin can make some troponin tests falsely low, so the provider must hear about it soon, and the time of the last dose helps them read the result. Teaching can come once she is stable."
},
{
"id": "nr-x9",
"cat": "trace",
"kind": "first",
"stem": "A mother phones the clinic. Her 2-year-old swallowed several of her iron tablets about 30 minutes ago and has now vomited twice.",
"q": "What should the nurse do first?",
"options": [
"Tell her to get the child emergency care now",
"Ask how many tablets are missing and their strength",
"Ask whether there is any blood in the vomit",
"Advise her to keep supplements locked away"
],
"answer": 0,
"why": "Iron overdose can kill young children, and vomiting soon after the dose is a sign of real toxicity, so safety comes first: urgent emergency care. The number and strength of tablets matter, but the emergency team or Poison Control (1-800-222-1222) can gather them. Teaching about safe storage comes later."
},
{
"id": "nr-x10",
"cat": "major",
"kind": "sata",
"q": "Which pairings of a mineral and its main job are correct? Select all that apply.",
"options": [
"Copper: helps the body use iron to make red blood cells",
"Chloride: used to make stomach acid",
"Phosphorus: part of bone and the energy molecule ATP",
"Fluoride: used to make thyroid hormones",
"Selenium: carries oxygen in red blood cells"
],
"answer": [0, 1, 2],
"why": "Copper helps move iron into red blood cells, chloride is used to make hydrochloric acid in the stomach, and phosphorus is part of bone and ATP. Iodine, not fluoride, is used to make thyroid hormones; selenium helps activate them. Iron, not selenium, carries oxygen in haemoglobin."
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
"alsoOk": ["Biotin (B7)"],
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
"alsoOk": ["Rare: poor appetite, weakness and bone pain"],
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
"alsoOk": ["Copper", "Very rare: burning, numb feet"],
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
"alsoOk": ["Pantothenic acid (B5)", "Very rare: burning, numb feet"],
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
"alsoOk": ["Pantothenic acid (B5)", "Biotin (B7)", "Hair thinning and a scaly rash around the eyes and mouth"],
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
"alsoOk": ["Vitamin B6", "Selenium", "Pantothenic acid (B5)"],
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
"alsoOk": ["Vitamin B6"],
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
"alsoOk": ["Phosphorus", "Biotin (B7)"],
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
"alsoOk": ["Phosphorus"],
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
"alsoOk": ["Vitamin B6", "Rare: low levels after long bouts of vomiting"],
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
"alsoOk": ["Copper", "Phosphorus"],
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
"alsoOk": ["Chloride", "Rare: low levels after long bouts of vomiting"],
"facts": [
"The main mineral outside cells; controls fluid balance and nerve signals.",
"Diets rarely lack it; the common problem is too much, raising blood pressure.",
"Most comes from processed foods, bread, sauces and ready meals.",
"Table salt is sodium chloride; symbol Na comes from Latin natrium."
]
},
{
"name": "Iron",
"alsoOk": ["Small-cell anaemia, depression and, in babies, seizures"],
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
"alsoOk": ["Sodium", "Chloride", "Selenium"],
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
"alsoOk": ["Selenium", "Copper", "Hair thinning and a scaly rash around the eyes and mouth"],
"facts": [
"Needed by immune cells, for wound healing and for the sense of taste.",
"Lack causes slow healing, frequent infections and loss of taste.",
"Oysters, meat, shellfish, seeds and beans are good sources.",
"Wound healing links zinc with vitamin C; zinc also affects taste, vitamin C doesn't."
]
},
{
"name": "Vitamin B6",
"code": "B6",
"cat": "water",
"job": "Protein metabolism and making brain messengers",
"foods": "Chickpeas, salmon, poultry, potatoes, fortified cereal",
"lack": "Small-cell anaemia, depression and, in babies, seizures",
"life": "Chickpeas are one of the richest plant sources of vitamin B6.",
"num": 18,
"alsoOk": ["Anaemia and nerve damage", "Cracks at the corners of the mouth", "Anaemia that iron does not fix, often from too much zinc", "Nerve and muscle problems (rare)", "Very rare: burning, numb feet", "Folate (B9)", "Niacin (B3)", "Potassium", "Vitamin B12"],
"facts": [
"Helps enzymes use protein and make haemoglobin and the brain's chemical messengers.",
"Lack can cause a small-cell anaemia, depression, confusion and a sore mouth; babies may have seizures.",
"One of the few water-soluble vitamins with a UL (100 mg a day for adults): long-term high doses can damage sensory nerves.",
"The TB drug isoniazid lowers B6, so a B6 supplement is often given alongside it."
]
},
{
"name": "Pantothenic acid (B5)",
"code": "B5",
"cat": "water",
"job": "Part of coenzyme A, used to release energy from food",
"foods": "Almost all foods, especially liver, chicken, mushrooms and whole grains",
"lack": "Very rare: burning, numb feet",
"life": "Its name comes from the Greek for 'from everywhere', because almost every food contains some.",
"num": 19,
"alsoOk": ["Riboflavin (B2)", "Niacin (B3)", "Thiamine (B1)", "Biotin (B7)", "Nerve and muscle problems (rare)"],
"facts": [
"Part of coenzyme A, which the body uses to release energy from fat, carbohydrate and protein.",
"So widespread in food that deficiency is almost never seen except in severe starvation.",
"Lack has caused 'burning feet': numbness and burning pain in the feet.",
"Has an AI (5 mg a day for adults) rather than an RDA, and no UL has been set."
]
},
{
"name": "Biotin (B7)",
"code": "B7",
"cat": "water",
"job": "Helps enzymes build fats and glucose",
"foods": "Cooked eggs, liver, salmon, nuts and seeds",
"lack": "Hair thinning and a scaly rash around the eyes and mouth",
"life": "High-dose biotin in hair and nail supplements can make some blood test results falsely high or low.",
"num": 20,
"alsoOk": ["Vitamin A", "Vitamin D", "Vitamin E", "Vitamin B12", "Pantothenic acid (B5)", "Riboflavin (B2)", "Niacin (B3)", "Selenium", "Copper", "Phosphorus"],
"facts": [
"Helps enzymes that make fats and glucose and break down some amino acids.",
"Lack is rare; signs are thinning hair and a red, scaly rash around the eyes, nose and mouth.",
"Eating a lot of raw egg white can cause lack: a protein in it (avidin) locks up biotin. Cooking destroys avidin.",
"Has an AI (30 mcg a day for adults) and no UL, but high doses can upset lab tests such as troponin and thyroid tests."
]
},
{
"name": "Phosphorus",
"code": "P",
"cat": "major",
"job": "Bones and teeth, and the cell's energy molecule (ATP)",
"foods": "Meat, fish, dairy, nuts and cola drinks",
"lack": "Rare: poor appetite, weakness and bone pain",
"life": "Cola drinks contain phosphoric acid, one reason many people eat more phosphorus than they need.",
"num": 21,
"alsoOk": ["Calcium", "Vitamin B12", "Zinc", "Selenium", "Rickets in children, osteomalacia (soft, aching bones) in adults", "Weak muscles and an irregular heartbeat"],
"facts": [
"The second most abundant mineral in the body; about 85% sits in bones and teeth with calcium.",
"Part of ATP (the cell's energy carrier), DNA and cell membranes.",
"Diets rarely lack it, but blood levels can fall dangerously when a starved person is fed again (refeeding syndrome).",
"People with kidney disease often need to limit phosphorus, because their kidneys cannot remove the extra."
]
},
{
"name": "Chloride",
"code": "Cl",
"cat": "major",
"job": "Fluid balance and making stomach acid",
"foods": "Table salt, olives, tomatoes, celery, rye bread",
"lack": "Rare: low levels after long bouts of vomiting",
"life": "Table salt is sodium chloride, so most of the chloride you eat comes in with salt.",
"num": 22,
"alsoOk": ["Sodium", "Rarely too little; too much raises blood pressure"],
"facts": [
"The main negative ion outside cells; works with sodium to keep fluid balance.",
"Used to make hydrochloric acid in the stomach.",
"Diets rarely lack it; levels can fall after heavy vomiting, diarrhoea or some diuretics.",
"Most chloride comes from salt, so cutting down on salt also cuts chloride."
]
},
{
"name": "Selenium",
"code": "Se",
"cat": "trace",
"job": "Antioxidant enzymes and activating thyroid hormone",
"foods": "Brazil nuts, tuna, shellfish, meat, whole grains",
"lack": "Keshan disease (weak heart muscle)",
"life": "A single Brazil nut can hold more than a day's selenium, so eating handfuls every day can be too much.",
"num": 23,
"alsoOk": ["Zinc", "Niacin (B3)", "Vitamin B12", "Copper", "Iron", "Phosphorus", "Iodine"],
"facts": [
"Part of antioxidant enzymes and of the enzymes that switch thyroid hormone into its active form.",
"Lack is rare in the US; Keshan disease, a heart muscle disease, was seen where soil was very low in selenium.",
"The adult RDA is 55 mcg a day and the UL is 400 mcg a day.",
"Too much (selenosis) causes garlic-smelling breath, a metallic taste, brittle nails and hair loss."
]
},
{
"name": "Copper",
"code": "Cu",
"cat": "trace",
"job": "Using iron to make red blood cells, and healthy nerves",
"foods": "Liver, shellfish, nuts, seeds, cocoa",
"lack": "Anaemia that iron does not fix, often from too much zinc",
"life": "Taking high-dose zinc supplements for months can block copper absorption and cause copper lack.",
"num": 24,
"alsoOk": ["Zinc", "Magnesium", "Vitamin E", "Anaemia and nerve damage", "Small-cell anaemia, depression and, in babies, seizures", "Selenium", "Iron", "Vitamin B12", "Biotin (B7)"],
"facts": [
"Helps enzymes move iron into red blood cells and build connective tissue and the coating around nerves.",
"Lack causes anaemia and low white cell counts, and can damage the spinal cord in a way that looks like B12 lack.",
"Common causes are high zinc intake and gut surgery such as gastric bypass.",
"The adult RDA is 900 mcg and the UL is 10 mg a day; in Wilson disease copper builds up in the liver and brain."
]
},
{
"name": "Fluoride",
"code": "F",
"cat": "trace",
"job": "Hardening tooth enamel against decay",
"foods": "Fluoridated tap water, brewed tea, foods cooked in fluoridated water",
"lack": "Tooth decay",
"life": "Many US towns add a small amount of fluoride (0.7 mg per litre) to tap water to protect teeth.",
"num": 25,
"facts": [
"Built into tooth enamel and bone, making teeth more resistant to the acid made by mouth bacteria.",
"Main sources are fluoridated water, tea and fluoride toothpaste (which is meant to be spat out, not swallowed).",
"Too much while teeth are forming causes dental fluorosis: white streaks or brown mottling on the teeth.",
"In US primary care, fluoride varnish is painted on young children's teeth from the first tooth up to age 5."
]
}
],
"note": "For learning only. Not medical or dietary advice.",
"diagram": "foods",
"diagramCaption": "Good food sources",
"diagramPerItem": true,
"notes": {
"intro": "Micronutrients are vitamins and minerals: you need only small amounts, but each has a job no other nutrient can do. Vitamins are organic compounds made by living things; minerals are elements that come from soil and water and cannot be destroyed by cooking. Vitamins split into fat-soluble (A, D, E, K) and water-soluble (C and the B group); minerals split into major minerals (needed in larger amounts) and trace minerals (needed in tiny amounts). For every nutrient, learn three things together: its main job, the foods that supply it, and the classic sign of not getting enough, because the deficiency sign usually follows from the job. How much is enough, and how much is too much, is set by the Dietary Reference Intakes, explained in the last topic.",
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
"B12 is found naturally only in animal foods, so vegans need fortified foods or supplements",
"Vitamin B6 helps use protein and make brain messengers; lack gives small-cell anaemia and depression, and its UL (100 mg) matters because high-dose supplements damage nerves",
"Pantothenic acid (B5) and biotin (B7) are in so many foods that lack is very rare; large amounts of raw egg white can cause biotin lack",
"High-dose biotin supplements can give false results on some blood tests, including troponin and thyroid tests"
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
"Don't confuse symbols: K is potassium (mineral) but 'vitamin K' is a vitamin",
"Phosphorus partners calcium in bone and is part of ATP; levels can crash in refeeding syndrome, and people with kidney disease often limit it",
"Chloride travels with sodium in salt, keeps fluid balance and is used to make stomach acid; low levels follow heavy vomiting"
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
"Oysters are the richest food source of zinc",
"Selenium = antioxidant enzymes and thyroid hormone; lack gives Keshan disease, too much gives garlic breath, brittle nails and hair loss",
"Copper helps the body use iron, so lack gives anaemia that iron does not fix; high-dose zinc is a common cause",
"Fluoride hardens enamel: too little means tooth decay, too much while teeth form means fluorosis"
],
"tip": "Iron Is for oxygen, Iodine Is for the thyroid, Zinc Zips wounds closed."
},
{
"title": "Dietary Reference Intakes (DRIs)",
"about": "The Dietary Reference Intakes are the US and Canadian reference values used to plan and check the diets of healthy people. They are not doses for treating a deficiency. The Estimated Average Requirement (EAR) is the daily intake that meets the needs of half of the healthy people in an age and sex group. The Recommended Dietary Allowance (RDA) is set higher, so it meets the needs of nearly all (97 to 98%) healthy people in that group. When there is not enough evidence to set an EAR, and so an RDA, an Adequate Intake (AI) is used instead: an amount based on what healthy people eat, which is assumed to be enough. The Tolerable Upper Intake Level (UL) is the highest daily intake that is unlikely to cause harm for almost everyone; above it, the risk of harm rises. For carbohydrate, protein and fat, the Acceptable Macronutrient Distribution Ranges (AMDRs) give healthy ranges as a share of daily energy.",
"points": [
"EAR = covers about half of healthy people; RDA = covers nearly all (97 to 98%)",
"AI = used when the evidence is too thin for an RDA, for example biotin, pantothenic acid, vitamin K, potassium and fluoride",
"UL = a ceiling, not a goal; supplements are the usual way people go over it, especially vitamins A, D and B6, iron, zinc and selenium",
"Some ULs count only supplements and fortified foods: magnesium, folic acid, niacin and vitamin E. The vitamin A UL counts ready-made vitamin A, not beta-carotene",
"No UL has been set for some nutrients, such as vitamin B12, thiamine, riboflavin, biotin and pantothenic acid: no harm has been shown, which is not proof that any dose is safe",
"Adult AMDRs: carbohydrate 45 to 65%, protein 10 to 35% and fat 20 to 35% of daily energy",
"Sodium has a Chronic Disease Risk Reduction intake (CDRR) of 2,300 mg a day for adults: cutting intake that is above this level lowers the risk of high blood pressure and heart disease"
],
"tip": "Picture a staircase: the EAR is the middle step (half covered), the RDA is near the top (almost everyone covered), and the UL is the ceiling you should not push through."
}
],
"outro": "In the quizzes you'll see a nutrient and pick its deficiency, or see a list of foods and name the nutrient: learn the job first and the rest follows. For learning only, not dietary advice."
}
});
