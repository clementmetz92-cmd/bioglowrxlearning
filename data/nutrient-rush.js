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
"num": 1
},
{
"name": "Vitamin D",
"code": "D",
"cat": "fat",
"job": "Absorbing calcium for strong bones",
"foods": "Sunlight on skin, oily fish, eggs, fortified foods",
"lack": "Rickets in children, osteomalacia (soft, aching bones) in adults",
"life": "Your skin makes vitamin D in sunlight, so levels often dip in winter.",
"num": 2
},
{
"name": "Vitamin E",
"code": "E",
"cat": "fat",
"job": "Antioxidant that protects cells",
"foods": "Vegetable oils, sunflower seeds, almonds",
"lack": "Nerve and muscle problems (rare)",
"life": "A handful of almonds is a good source of vitamin E.",
"num": 3
},
{
"name": "Vitamin K",
"code": "K1",
"cat": "fat",
"job": "Blood clotting",
"foods": "Leafy greens like kale, spinach and broccoli",
"lack": "Easy bleeding and bruising",
"life": "Newborn babies get a vitamin K injection to prevent bleeding.",
"num": 4
},
{
"name": "Vitamin C",
"code": "C",
"cat": "water",
"job": "Making collagen and healing wounds",
"foods": "Citrus fruit, peppers, kiwi, strawberries",
"lack": "Scurvy: bleeding gums, slow healing",
"life": "Sailors once got scurvy on long voyages until they carried citrus fruit.",
"num": 5
},
{
"name": "Thiamine (B1)",
"code": "B1",
"cat": "water",
"job": "Turning carbohydrates into energy",
"foods": "Whole grains, pork, beans",
"lack": "Beriberi: nerve and heart problems",
"life": "Heavy alcohol use is a common cause of low thiamine.",
"num": 6
},
{
"name": "Riboflavin (B2)",
"code": "B2",
"cat": "water",
"job": "Releasing energy from food",
"foods": "Eggs, mushrooms, lean meat, yeast extract",
"lack": "Cracks at the corners of the mouth",
"life": "Riboflavin turns urine bright yellow after taking a B-vitamin supplement.",
"num": 7
},
{
"name": "Niacin (B3)",
"code": "B3",
"cat": "water",
"job": "Energy release and healthy skin",
"foods": "Chicken, tuna, peanuts, whole grains",
"lack": "Pellagra: rash, diarrhoea, confusion",
"life": "Pellagra was once common where diets relied heavily on untreated maize.",
"num": 8
},
{
"name": "Folate (B9)",
"code": "B9",
"cat": "water",
"job": "Making DNA and new cells",
"foods": "Asparagus, Brussels sprouts, chickpeas, oranges, fortified bread",
"lack": "Anaemia, and birth defects in pregnancy",
"life": "Folic acid is advised before and in early pregnancy to protect the baby's spine.",
"num": 9
},
{
"name": "Vitamin B12",
"code": "B12",
"cat": "water",
"job": "Red blood cells and healthy nerves",
"foods": "Meat, fish, eggs, dairy, fortified plant foods",
"lack": "Anaemia and nerve damage",
"life": "Vegans need B12 from fortified foods or supplements because plants don't provide it.",
"num": 10
},
{
"name": "Calcium",
"code": "Ca",
"cat": "major",
"job": "Building bones and teeth, muscle contraction",
"foods": "Dairy, fortified plant milks, tofu, sardines",
"lack": "Weak bones over time (osteoporosis)",
"life": "Your bones are a calcium bank the body draws on when intake is low.",
"num": 11
},
{
"name": "Potassium",
"code": "K",
"cat": "major",
"job": "Nerve signals, heartbeat and blood pressure",
"foods": "Bananas, potatoes, beans, avocado",
"lack": "Weak muscles and an irregular heartbeat",
"life": "Eating more potassium-rich foods can help lower blood pressure.",
"num": 12
},
{
"name": "Magnesium",
"code": "Mg",
"cat": "major",
"job": "Muscles, nerves and energy",
"foods": "Pumpkin seeds, whole grains, beans, dark chocolate",
"lack": "Muscle twitches, tremor and tiredness",
"life": "Dark chocolate and pumpkin seeds are surprisingly rich in magnesium.",
"num": 13
},
{
"name": "Sodium",
"code": "Na",
"cat": "major",
"job": "Fluid balance and nerve signals",
"foods": "Table salt, processed and ready-made foods",
"lack": "Rarely too little; too much raises blood pressure",
"life": "Most salt in modern diets comes from bread, sauces and ready meals, not the salt shaker.",
"num": 14
},
{
"name": "Iron",
"code": "Fe",
"cat": "trace",
"job": "Carrying oxygen in the blood",
"foods": "Red meat, liver, lentils, tofu, fortified cereal",
"lack": "Iron-deficiency anaemia: tiredness, pale skin",
"life": "Vitamin C in the same meal helps you absorb iron from plant foods.",
"num": 15
},
{
"name": "Iodine",
"code": "I",
"cat": "trace",
"job": "Making thyroid hormones",
"foods": "Iodised salt, fish, seaweed, dairy",
"lack": "Goitre (swollen thyroid)",
"life": "Iodised salt was introduced to prevent goitre.",
"num": 16
},
{
"name": "Zinc",
"code": "Zn",
"cat": "trace",
"job": "Immunity and wound healing",
"foods": "Meat, shellfish, seeds, beans",
"lack": "Slow wound healing and loss of taste",
"life": "Oysters are the richest food source of zinc.",
"num": 17
}
],
"note": "For learning only. Not medical or dietary advice."
});
