/* Fight or Rest — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "fight-or-rest",
"title": "Fight or Rest",
"subject": "pharmacology",
"subjectName": "Pharmacology",
"chapter": "4",
"tagline": "Sympathetic or parasympathetic? Sort the body's automatic responses",
"itemNoun": "effect",
"categories": [
{
"id": "fight",
"name": "Fight or flight (sympathetic)",
"color": "cat-coral",
"icon": "zap"
},
{
"id": "rest",
"name": "Rest and digest (parasympathetic)",
"color": "cat-sage",
"icon": "bed"
}
],
"categoryLabel": "Side",
"hint": "The autonomic nervous system has two sides: fight or flight (sympathetic) gets you ready for action, rest and digest (parasympathetic) calms you down.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "organ"
},
"factLine": [
"name",
"{category}"
],
"detail": [
{
"label": "Organ",
"field": "{organ}"
},
{
"label": "Side",
"field": "{category}"
},
{
"label": "Main messenger",
"field": "{messenger}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the effects",
"desc": "Tap an effect to see which side causes it and why.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "sort",
"format": "sortit",
"title": "Fight or rest?",
"desc": "Decide which side of the nervous system causes it.",
"icon": "⇆",
"color": "cat-coral",
"prompt": "Which side causes this?",
"showAs": "text",
"choices": 2
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each effect with the organ it happens in.",
"icon": "⇄",
"color": "cat-mint",
"clue": "organ",
"clueLabel": "Organ",
"pairs": 6
}
],
"items": [
{
"name": "Pupils widen",
"cat": "fight",
"organ": "Eyes",
"summary": "Wider pupils let in more light to spot danger.",
"life": "Your pupils grow large in a scary film or a dark room.",
"icon": "eye",
"num": 1,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands"
},
{
"name": "Pupils narrow",
"cat": "rest",
"organ": "Eyes",
"summary": "Smaller pupils for close, relaxed focus.",
"life": "Pupils shrink when you read calmly in good light.",
"icon": "eye",
"num": 2,
"messenger": "Acetylcholine"
},
{
"name": "Heart beats faster and harder",
"cat": "fight",
"organ": "Heart",
"summary": "More blood reaches the muscles for action.",
"life": "Your heart pounds before a speech or a race.",
"icon": "heart",
"num": 3,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands"
},
{
"name": "Heart rate slows",
"cat": "rest",
"organ": "Heart",
"summary": "The heart saves energy when you are calm.",
"life": "Your heart rate drops as you fall asleep.",
"icon": "heart",
"num": 4,
"messenger": "Acetylcholine"
},
{
"name": "Airways widen",
"cat": "fight",
"organ": "Lungs",
"summary": "Wider airways let in more oxygen.",
"life": "Asthma relievers copy this effect to open the airways.",
"icon": "lungs",
"num": 5,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands"
},
{
"name": "Airways narrow",
"cat": "rest",
"organ": "Lungs",
"summary": "At rest the body needs less airflow.",
"life": "This is why some asthma is worse at night.",
"icon": "lungs",
"num": 6,
"messenger": "Acetylcholine"
},
{
"name": "Digestion slows",
"cat": "fight",
"organ": "Stomach and gut",
"summary": "Blood is moved away from the gut to the muscles.",
"life": "Butterflies or a lost appetite when you are nervous.",
"icon": "stomach",
"num": 7,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands"
},
{
"name": "Digestion speeds up",
"cat": "rest",
"organ": "Stomach and gut",
"summary": "More gut movement and digestive juices after a meal.",
"life": "A relaxed meal is easier to digest than one eaten in a rush.",
"icon": "stomach",
"num": 8,
"messenger": "Acetylcholine"
},
{
"name": "Less saliva, dry mouth",
"cat": "fight",
"organ": "Salivary glands",
"summary": "Saliva production drops when the body is under stress.",
"life": "A dry mouth before an exam or interview.",
"icon": "drop",
"num": 9,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands"
},
{
"name": "More watery saliva",
"cat": "rest",
"organ": "Salivary glands",
"summary": "Saliva flows to start digestion.",
"life": "Your mouth waters when you smell a favourite meal.",
"icon": "drop",
"num": 10,
"messenger": "Acetylcholine"
},
{
"name": "Liver releases glucose",
"cat": "fight",
"organ": "Liver",
"summary": "Extra sugar in the blood fuels the muscles.",
"life": "The energy surge in a sudden emergency.",
"icon": "zap",
"num": 11,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands"
},
{
"name": "Sweating increases",
"cat": "fight",
"organ": "Skin",
"summary": "Sweat cools the body during effort.",
"life": "Sweaty palms when you are nervous.",
"icon": "drop",
"num": 12,
"messenger": "Acetylcholine (sweat glands are the sympathetic exception)"
},
{
"name": "Bladder holds urine",
"cat": "fight",
"organ": "Bladder",
"summary": "Emptying the bladder is put on hold during action.",
"life": "You rarely need the toilet in the middle of a sprint.",
"icon": "kidney",
"num": 13,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands"
},
{
"name": "Bladder empties",
"cat": "rest",
"organ": "Bladder",
"summary": "The bladder muscle contracts when you are relaxed.",
"life": "It is easier to go to the toilet when you are calm.",
"icon": "kidney",
"num": 14,
"messenger": "Acetylcholine"
}
]
});
