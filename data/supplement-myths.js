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
"verdictLabel": "Myth",
"facts": [
"Myth: regular vitamin C doesn't prevent colds in most people.",
"Studies suggest it may shorten colds slightly if taken regularly.",
"Starting it once a cold begins shows little benefit."
]
},
{
"name": "Too much vitamin A",
"cat": "vit",
"claim": "You can take too much vitamin A.",
"verdict": true,
"life": "It is fat-soluble and builds up in the body; high doses can be toxic and harm an unborn baby.",
"num": 2,
"verdictLabel": "True",
"facts": [
"True: vitamin A is fat-soluble and stored in the liver, so excess accumulates.",
"Too much can damage the liver and cause headaches and bone problems.",
"High doses in pregnancy can cause birth defects, so pregnancy supplements limit it.",
"Beta-carotene from plants is converted only as needed, so it rarely causes toxicity."
]
},
{
"name": "Water-soluble means safe",
"cat": "vit",
"claim": "Water-soluble vitamins can never harm you, however much you take.",
"verdict": false,
"life": "Very high doses of vitamin B6 over time, for example, can damage nerves.",
"num": 3,
"verdictLabel": "Myth",
"facts": [
"Myth: water-soluble vitamins are usually excreted, but megadoses can still harm.",
"Long-term high-dose vitamin B6 can damage nerves, causing numbness and tingling.",
"High-dose niacin (B3) can cause flushing and liver strain."
]
},
{
"name": "Folic acid and pregnancy",
"cat": "vit",
"claim": "Folic acid before and in early pregnancy lowers the risk of spine and brain defects such as spina bifida.",
"verdict": true,
"life": "This is one of the best-proven supplement benefits.",
"num": 4,
"verdictLabel": "True",
"facts": [
"True: one of the best-proven supplement benefits.",
"The neural tube (future spine and brain) closes very early, often before pregnancy is known.",
"That is why folic acid is advised before conception as well as in early pregnancy.",
"Spina bifida is a neural tube defect where the spine doesn't close fully."
]
},
{
"name": "Vitamin D in winter",
"cat": "vit",
"claim": "Vitamin D supplements are often advised in autumn and winter in northern countries.",
"verdict": true,
"life": "With little strong sunlight, the skin makes less vitamin D in those months.",
"num": 5,
"verdictLabel": "True",
"facts": [
"True: in northern countries, winter sunlight is too weak for skin to make much vitamin D.",
"Few foods are rich in it, so supplements are often advised from autumn to spring.",
"People who cover their skin or stay indoors may need it all year."
]
},
{
"name": "B12 for vegans",
"cat": "vit",
"claim": "People on a vegan diet need a B12 source such as fortified foods or a supplement.",
"verdict": true,
"life": "Plants don't provide reliable B12, and a lack can damage nerves.",
"num": 6,
"verdictLabel": "True",
"facts": [
"True: B12 occurs naturally only in animal foods.",
"Seaweed and similar plant products are not a reliable B12 source.",
"Lack causes anaemia and nerve damage that may become permanent.",
"Body stores last years, so deficiency can appear long after changing diet."
]
},
{
"name": "Iron for energy",
"cat": "vit",
"claim": "Everyone should take iron to boost their energy.",
"verdict": false,
"life": "Iron only helps if you are low in it; too much iron is harmful.",
"num": 7,
"verdictLabel": "Myth",
"facts": [
"Myth: iron only helps tiredness caused by iron deficiency.",
"Excess iron is not easily removed from the body and can damage organs.",
"Iron overdose is a known cause of poisoning in young children.",
"Tiredness has many causes; a blood test shows whether iron is low."
]
},
{
"name": "Calcium and constipation",
"cat": "vit",
"claim": "Calcium supplements can cause constipation.",
"verdict": true,
"life": "It's one of their most common side effects.",
"num": 8,
"verdictLabel": "True",
"facts": [
"True: constipation and bloating are among the most common side effects.",
"Calcium can also reduce absorption of some medicines if taken at the same time.",
"Food sources such as dairy and fortified plant milks are the first choice."
]
},
{
"name": "Multivitamins vs diet",
"cat": "claim",
"claim": "A daily multivitamin can replace a healthy diet.",
"verdict": false,
"life": "Food provides fibre and many protective substances that a pill doesn't.",
"num": 9,
"verdictLabel": "Myth",
"facts": [
"Myth: pills lack the fibre, energy, protein and plant compounds that whole foods provide.",
"Large studies show little benefit of multivitamins for well-nourished adults.",
"They may help people with specific gaps, such as restricted diets."
]
},
{
"name": "Natural means safe",
"cat": "claim",
"claim": "If a product is 'natural', it is safe.",
"verdict": false,
"life": "Many natural substances are powerful drugs or poisons; natural doesn't mean harmless.",
"num": 10,
"verdictLabel": "Myth",
"facts": [
"Myth: 'natural' is a marketing word, not a safety standard.",
"Many medicines and poisons, such as digoxin from foxglove, come from plants.",
"Herbal products can cause side effects, allergies and drug interactions."
]
},
{
"name": "Detox teas",
"cat": "claim",
"claim": "Detox teas cleanse your liver and kidneys.",
"verdict": false,
"life": "Your liver and kidneys already do this; there is no good evidence these teas help.",
"num": 11,
"verdictLabel": "Myth",
"facts": [
"Myth: the liver and kidneys clear waste continuously without special products.",
"Many detox teas contain laxatives or diuretics, causing fluid loss, not 'cleansing'.",
"Weight lost from them is mostly water and returns quickly."
]
},
{
"name": "Tested like medicines",
"cat": "claim",
"claim": "Supplements are tested for safety and benefit in the same way as medicines.",
"verdict": false,
"life": "In most countries they can go on sale without the safety and benefit trials that medicines need.",
"num": 12,
"verdictLabel": "Myth",
"facts": [
"Myth: medicines need trials proving safety and benefit before sale; most supplements don't.",
"Regulators usually act after problems appear, rather than approving products first.",
"Labels may not match contents exactly in strength or ingredients."
]
},
{
"name": "Hidden drugs",
"cat": "claim",
"claim": "Some supplements sold online have been found to contain hidden prescription drugs.",
"verdict": true,
"life": "Health regulators regularly warn about weight-loss and 'performance' products with hidden drugs.",
"num": 13,
"verdictLabel": "True",
"facts": [
"True: regulators have found undeclared prescription drugs in some products.",
"Weight-loss, sexual-performance and body-building products are the most common offenders.",
"Hidden drugs can cause dangerous side effects and interactions the buyer doesn't expect."
]
},
{
"name": "Protein powder",
"cat": "claim",
"claim": "You need protein powder to build muscle.",
"verdict": false,
"life": "Most people get enough protein from food; powders are just convenient.",
"num": 14,
"verdictLabel": "Myth",
"facts": [
"Myth: muscle grows from training plus enough total protein, which food usually supplies.",
"Milk, eggs, meat, fish, beans and lentils are all good protein sources.",
"Powders are a convenience, not a requirement."
]
},
{
"name": "St John's wort",
"cat": "other",
"claim": "St John's wort can interfere with prescription medicines.",
"verdict": true,
"life": "It can make some medicines, including the contraceptive pill, work less well.",
"num": 15,
"verdictLabel": "True",
"facts": [
"True: it speeds up the liver enzymes that break down many medicines.",
"This can make the contraceptive pill, some heart drugs and HIV drugs less effective.",
"It can also cause a dangerous reaction combined with some antidepressants."
]
},
{
"name": "Fish oil and the heart",
"cat": "other",
"claim": "Fish oil capsules prevent heart attacks in most healthy people.",
"verdict": false,
"life": "Large studies show little benefit for healthy people; eating oily fish is still recommended.",
"num": 16,
"verdictLabel": "Myth",
"facts": [
"Myth: large trials found little heart-attack prevention in most healthy people.",
"Eating oily fish regularly is still recommended as part of a healthy diet.",
"Contrast with folic acid: food-based advice doesn't always translate into a useful pill."
]
},
{
"name": "Vitamin K and warfarin",
"cat": "vit",
"claim": "Vitamin K supplements can change how warfarin works.",
"verdict": true,
"life": "Vitamin K helps blood clot, which works against warfarin.",
"num": 17,
"verdictLabel": "True",
"facts": [
"True: warfarin works by blocking vitamin K's role in clotting.",
"Extra vitamin K works against warfarin, so the blood may clot more easily.",
"People on warfarin are advised to keep vitamin K intake steady rather than avoid it."
]
},
{
"name": "Biotin and blood tests",
"cat": "vit",
"claim": "High-dose biotin supplements can make some blood test results wrong.",
"verdict": true,
"life": "Tell the lab or your doctor if you take biotin, often sold for hair and nails.",
"num": 18,
"verdictLabel": "True",
"facts": [
"True: high-dose biotin can interfere with lab tests that use biotin in the method.",
"Thyroid and heart (troponin) test results can be falsely high or low.",
"Biotin is vitamin B7, often marketed for hair, skin and nails."
]
}
],
"note": "For learning only. Not medical or dietary advice: check supplements with a doctor or pharmacist.",
"diagram": "supplement",
"diagramCaption": "What it looks like",
"diagramPerItem": true,
"notes": {
"intro": "Dietary supplements are products such as vitamins, minerals, herbs and protein powders taken in addition to food. Some have strong evidence for specific groups (folic acid around pregnancy, vitamin D in winter, B12 for vegans), but most healthy people eating a varied diet gain little from them. Supplements are not free of risk: some build up to toxic levels, some interact with medicines, and some are contaminated. The skill these cards train is to ask three questions of any claim: who is it for, what does the evidence show, and what could go wrong?",
"sections": [
{
"cat": "vit",
"title": "Vitamins and minerals",
"about": "The true claims here are about specific groups or specific risks, not 'everyone should take this'. Fat-soluble vitamins (A, D, E, K) are stored in the body, so excess builds up; water-soluble vitamins are usually flushed out, but very high doses of some (such as B6) can still cause harm. Proven benefits are targeted: folic acid before and in early pregnancy, vitamin D when sunlight is weak, B12 when the diet has no animal foods. Minerals help only when you are short of them; iron taken without need can be harmful. Some vitamins also interact with medicines or tests, such as vitamin K with warfarin and biotin with lab results.",
"points": [
"True pattern: a named group plus a clear reason (pregnancy, winter, vegan diet)",
"Myth pattern: 'everyone', 'never harmful', 'stops you catching'",
"Interactions: vitamin K opposes warfarin; biotin can distort some blood tests",
"Common side effect: calcium supplements can cause constipation"
],
"tip": "'Who and why?' If a vitamin claim names a specific group with a specific reason, it is more likely to be true."
},
{
"cat": "other",
"title": "Other supplements",
"about": "Herbal and other non-vitamin supplements can act like drugs, because many plant chemicals are biologically active. St John's wort, taken for low mood, speeds up how the liver breaks down several medicines, so those medicines (including the contraceptive pill) may work less well. Fish oil capsules contain omega-3 fats, but large trials found little heart protection for healthy people, even though eating oily fish as part of the diet is still advised. The general lesson: a food that is good for you does not automatically become a useful pill, and a herb can change how medicines work.",
"points": [
"St John's wort: true that it interacts with medicines",
"Fish oil capsules: myth that they prevent heart attacks in most healthy people",
"Always tell a pharmacist or doctor about herbal products"
],
"tip": "Herbs are 'hidden medicines': if it can change your body, it can change your other medicines too."
},
{
"cat": "claim",
"title": "Big promises",
"about": "These are broad marketing ideas rather than claims about one nutrient. Most are myths because they over-promise: a pill cannot replace the fibre and protective substances in food, 'natural' says nothing about safety, and the liver and kidneys already detoxify the body without special teas. Supplements in most countries can be sold without the safety and benefit trials that medicines must pass, which is also why some products sold online have been found to contain hidden prescription drugs. Most people get enough protein from ordinary food, so powders are a convenience, not a need.",
"points": [
"Myths: multivitamin replaces diet, natural = safe, detox teas cleanse organs, supplements tested like medicines, protein powder needed",
"Truths: some online products contain hidden drugs",
"Regulators often warn about weight-loss, sexual-performance and body-building products"
],
"tip": "The bigger and simpler the promise, the more likely it's a myth."
}
],
"outro": "In 'True or myth?', look for absolute words ('always', 'never', 'everyone') as myth clues. For learning only: check any supplement with a doctor or pharmacist."
}
});
