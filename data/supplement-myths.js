/* True or Myth: Supplements — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "supplement-myths",
"title": "True or Myth: Supplements",
"subject": "nutrition",
"subjectName": "Nutrition",
"chapter": "13–14",
"tagline": "Separate the evidence from the marketing",
"itemNoun": "claim",
"categories": [
{
"id": "vit",
"name": "Vitamins and minerals",
"color": "cat-amber",
"icon": "drop"
},
{
"id": "other",
"name": "Other supplements",
"color": "cat-sage",
"icon": "leaf"
},
{
"id": "claim",
"name": "Big promises",
"color": "cat-lilac",
"icon": "question"
}
],
"categoryLabel": "Topic",
"hint": "Read each claim, decide if it's true or a myth, then see the evidence in plain words.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"verdictLabel"
],
"detail": [
{
"label": "Verdict",
"field": "{verdictLabel}"
},
{
"label": "Claim",
"field": "{claim}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "play",
"format": "truemyth",
"title": "True or myth?",
"desc": "Read the claim and decide.",
"icon": "✓✕",
"color": "cat-amber",
"prompt": "True or myth?"
},
{
"id": "explore",
"format": "explorer",
"title": "Learn the facts",
"desc": "Browse every claim with the evidence.",
"icon": "◎",
"color": "cat-peach"
}
],
"items": [
{
"name": "Vitamin C and colds",
"cat": "vit",
"claim": "Taking vitamin C every day stops you catching colds.",
"verdict": false,
"life": "For most people it doesn't prevent colds; at best it may shorten them slightly.",
"num": 1,
"verdictLabel": "Myth"
},
{
"name": "Too much vitamin A",
"cat": "vit",
"claim": "You can take too much vitamin A.",
"verdict": true,
"life": "It is fat-soluble and builds up in the body; high doses can be toxic and harm an unborn baby.",
"num": 2,
"verdictLabel": "True"
},
{
"name": "Water-soluble means safe",
"cat": "vit",
"claim": "Water-soluble vitamins can never harm you, however much you take.",
"verdict": false,
"life": "Very high doses of vitamin B6 over time, for example, can damage nerves.",
"num": 3,
"verdictLabel": "Myth"
},
{
"name": "Folic acid and pregnancy",
"cat": "vit",
"claim": "Folic acid before and in early pregnancy lowers the risk of spine and brain defects such as spina bifida.",
"verdict": true,
"life": "This is one of the best-proven supplement benefits.",
"num": 4,
"verdictLabel": "True"
},
{
"name": "Vitamin D in winter",
"cat": "vit",
"claim": "Vitamin D supplements are often advised in autumn and winter in northern countries.",
"verdict": true,
"life": "With little strong sunlight, the skin makes less vitamin D in those months.",
"num": 5,
"verdictLabel": "True"
},
{
"name": "B12 for vegans",
"cat": "vit",
"claim": "People on a vegan diet need a B12 source such as fortified foods or a supplement.",
"verdict": true,
"life": "Plants don't provide reliable B12, and a lack can damage nerves.",
"num": 6,
"verdictLabel": "True"
},
{
"name": "Iron for energy",
"cat": "vit",
"claim": "Everyone should take iron to boost their energy.",
"verdict": false,
"life": "Iron only helps if you are low in it; too much iron is harmful.",
"num": 7,
"verdictLabel": "Myth"
},
{
"name": "Calcium and constipation",
"cat": "vit",
"claim": "Calcium supplements can cause constipation.",
"verdict": true,
"life": "It's one of their most common side effects.",
"num": 8,
"verdictLabel": "True"
},
{
"name": "Multivitamins vs diet",
"cat": "claim",
"claim": "A daily multivitamin can replace a healthy diet.",
"verdict": false,
"life": "Food provides fibre and many protective substances that a pill doesn't.",
"num": 9,
"verdictLabel": "Myth"
},
{
"name": "Natural means safe",
"cat": "claim",
"claim": "If a product is 'natural', it is safe.",
"verdict": false,
"life": "Many natural substances are powerful drugs or poisons; natural doesn't mean harmless.",
"num": 10,
"verdictLabel": "Myth"
},
{
"name": "Detox teas",
"cat": "claim",
"claim": "Detox teas cleanse your liver and kidneys.",
"verdict": false,
"life": "Your liver and kidneys already do this; there is no good evidence these teas help.",
"num": 11,
"verdictLabel": "Myth"
},
{
"name": "Tested like medicines",
"cat": "claim",
"claim": "Supplements are tested for safety and benefit in the same way as medicines.",
"verdict": false,
"life": "In most countries they can go on sale without the safety and benefit trials that medicines need.",
"num": 12,
"verdictLabel": "Myth"
},
{
"name": "Hidden drugs",
"cat": "claim",
"claim": "Some supplements sold online have been found to contain hidden prescription drugs.",
"verdict": true,
"life": "Health regulators regularly warn about weight-loss and 'performance' products with hidden drugs.",
"num": 13,
"verdictLabel": "True"
},
{
"name": "Protein powder",
"cat": "claim",
"claim": "You need protein powder to build muscle.",
"verdict": false,
"life": "Most people get enough protein from food; powders are just convenient.",
"num": 14,
"verdictLabel": "Myth"
},
{
"name": "St John's wort",
"cat": "other",
"claim": "St John's wort can interfere with prescription medicines.",
"verdict": true,
"life": "It can make some medicines, including the contraceptive pill, work less well.",
"num": 15,
"verdictLabel": "True"
},
{
"name": "Fish oil and the heart",
"cat": "other",
"claim": "Fish oil capsules prevent heart attacks in most healthy people.",
"verdict": false,
"life": "Large studies show little benefit for healthy people; eating oily fish is still recommended.",
"num": 16,
"verdictLabel": "Myth"
},
{
"name": "Vitamin K and warfarin",
"cat": "vit",
"claim": "Vitamin K supplements can change how warfarin works.",
"verdict": true,
"life": "Vitamin K helps blood clot, which works against warfarin.",
"num": 17,
"verdictLabel": "True"
},
{
"name": "Biotin and blood tests",
"cat": "vit",
"claim": "High-dose biotin supplements can make some blood test results wrong.",
"verdict": true,
"life": "Tell the lab or your doctor if you take biotin, often sold for hair and nails.",
"num": 18,
"verdictLabel": "True"
}
],
"note": "For learning only. Not medical or dietary advice: check supplements with a doctor or pharmacist."
});
