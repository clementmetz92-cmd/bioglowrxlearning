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
"icon": "pharm-eye-big",
"num": 1,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands",
"spot": "eyes",
"facts": [
"The medical word is dilation (mydriasis); a radial muscle in the iris pulls the pupil open.",
"More light reaches the retina, helping you see threats.",
"Opposite of 'Pupils narrow', which is the rest and digest effect on the same eyes."
]
},
{
"name": "Pupils narrow",
"cat": "rest",
"organ": "Eyes",
"summary": "Smaller pupils for close, relaxed focus.",
"life": "Pupils shrink when you read calmly in good light.",
"icon": "pharm-eye-small",
"num": 2,
"messenger": "Acetylcholine",
"spot": "eyes",
"facts": [
"The medical word is constriction (miosis); a ring muscle in the iris tightens.",
"Helps focus on close objects, such as reading.",
"Controlled by acetylcholine; opposite of 'Pupils widen' (fight or flight)."
]
},
{
"name": "Heart beats faster and harder",
"cat": "fight",
"organ": "Heart",
"summary": "More blood reaches the muscles for action.",
"life": "Your heart pounds before a speech or a race.",
"icon": "pharm-heart-fast",
"num": 3,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands",
"spot": "heart",
"facts": [
"Norepinephrine acts on beta-1 receptors in the heart to raise rate and force.",
"Pumps more blood to muscles and brain for action.",
"Beta blockers such as metoprolol block this effect.",
"Opposite of 'Heart rate slows', which is the parasympathetic effect."
]
},
{
"name": "Heart rate slows",
"cat": "rest",
"organ": "Heart",
"summary": "The heart saves energy when you are calm.",
"life": "Your heart rate drops as you fall asleep.",
"icon": "pharm-heart-slow",
"num": 4,
"messenger": "Acetylcholine",
"spot": "heart",
"facts": [
"The vagus nerve releases acetylcholine onto the heart's pacemaker, slowing it down.",
"Saves energy when the body is at rest or asleep.",
"Opposite of 'Heart beats faster and harder' (fight or flight)."
]
},
{
"name": "Airways widen",
"cat": "fight",
"organ": "Lungs",
"summary": "Wider airways let in more oxygen.",
"life": "Asthma relievers copy this effect to open the airways.",
"icon": "pharm-bronchus-open",
"num": 5,
"messenger": "Adrenaline (epinephrine) from the adrenal glands, acting on beta-2 receptors",
"spot": [
"lungs",
"airways"
],
"facts": [
"Adrenaline acts on beta-2 receptors, relaxing smooth muscle in the airways.",
"The medical word is bronchodilation; it lets more oxygen in for effort.",
"Albuterol (salbutamol) inhalers copy this beta-2 effect.",
"Opposite of 'Airways narrow' (rest and digest)."
]
},
{
"name": "Airways narrow",
"cat": "rest",
"organ": "Lungs",
"summary": "At rest the body needs less airflow.",
"life": "This may be one reason some asthma is worse at night.",
"icon": "pharm-bronchus-narrow",
"num": 6,
"messenger": "Acetylcholine",
"spot": [
"lungs",
"airways"
],
"facts": [
"Acetylcholine tightens airway smooth muscle (bronchoconstriction).",
"At rest the body needs less air, so wide airways are not needed.",
"Opposite of 'Airways widen', which is the fight or flight effect."
]
},
{
"name": "Digestion slows",
"cat": "fight",
"organ": "Stomach and gut",
"summary": "Blood is moved away from the gut to the muscles.",
"life": "Butterflies or a lost appetite when you are nervous.",
"icon": "pharm-snail",
"num": 7,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands",
"spot": [
"stomach",
"intestines"
],
"facts": [
"Blood is diverted away from the gut towards skeletal muscles.",
"Gut movement and digestive juices drop, so appetite falls.",
"Opposite of 'Digestion speeds up' (rest and digest)."
]
},
{
"name": "Digestion speeds up",
"cat": "rest",
"organ": "Stomach and gut",
"summary": "More gut movement and digestive juices after a meal.",
"life": "A relaxed meal is easier to digest than one eaten in a rush.",
"icon": "pharm-intestine",
"num": 8,
"messenger": "Acetylcholine",
"spot": [
"stomach",
"intestines"
],
"facts": [
"Acetylcholine increases gut muscle movement (peristalsis) and digestive secretions.",
"The vagus nerve carries most of these signals to the stomach and intestines.",
"Opposite of 'Digestion slows', which is fight or flight."
]
},
{
"name": "Less saliva, dry mouth",
"cat": "fight",
"organ": "Salivary glands",
"summary": "Saliva production drops when the body is under stress.",
"life": "A dry mouth before an exam or interview.",
"icon": "pharm-nodrop",
"num": 9,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands",
"spot": "salivary",
"facts": [
"Saliva becomes scant and thick under stress.",
"Eating is not a priority during danger, so saliva is turned down.",
"Opposite of 'More watery saliva' (rest and digest)."
]
},
{
"name": "More watery saliva",
"cat": "rest",
"organ": "Salivary glands",
"summary": "Saliva flows to start digestion.",
"life": "Your mouth waters when you smell a favourite meal.",
"icon": "pharm-drool",
"num": 10,
"messenger": "Acetylcholine",
"spot": "salivary",
"facts": [
"Acetylcholine makes salivary glands release lots of thin, watery saliva.",
"Saliva starts digesting starch and makes food easier to swallow.",
"The S in the SLUDD rest and digest mnemonic stands for salivation."
]
},
{
"name": "Liver releases glucose",
"cat": "fight",
"organ": "Liver",
"summary": "Extra sugar in the blood fuels the muscles.",
"life": "The energy surge in a sudden emergency.",
"icon": "pharm-liver",
"num": 11,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands",
"spot": "liver",
"facts": [
"The liver breaks down stored glycogen into glucose (glycogenolysis).",
"Extra blood sugar fuels muscles and the brain in an emergency.",
"Only sympathetic in this game: there is no rest and digest partner card."
]
},
{
"name": "Sweating increases",
"cat": "fight",
"organ": "Skin",
"summary": "Sweat cools the body during effort.",
"life": "Sweaty palms when you are nervous.",
"icon": "pharm-sweat",
"num": 12,
"messenger": "Acetylcholine (sweat glands are the sympathetic exception)",
"spot": "skin",
"facts": [
"Sweat glands are controlled only by the sympathetic side.",
"Unusually, these sympathetic nerves release acetylcholine, not norepinephrine.",
"Sweating cools the body during effort; it is fight or flight despite the acetylcholine."
]
},
{
"name": "Bladder holds urine",
"cat": "fight",
"organ": "Bladder",
"summary": "Emptying the bladder is put on hold during action.",
"life": "You rarely need the toilet in the middle of a sprint.",
"icon": "pharm-bladder-hold",
"num": 13,
"messenger": "Norepinephrine (noradrenaline), plus adrenaline from the adrenal glands",
"spot": "bladder",
"facts": [
"The bladder wall muscle (detrusor) relaxes and the internal sphincter tightens.",
"Emptying is postponed until the danger is over.",
"Opposite of 'Bladder empties' (rest and digest)."
]
},
{
"name": "Bladder empties",
"cat": "rest",
"organ": "Bladder",
"summary": "The bladder muscle contracts when you are relaxed.",
"life": "It is easier to go to the toilet when you are calm.",
"icon": "pharm-bladder-empty",
"num": 14,
"messenger": "Acetylcholine",
"spot": "bladder",
"facts": [
"Acetylcholine makes the detrusor muscle contract and the internal sphincter relax.",
"The U in the SLUDD mnemonic stands for urination.",
"Opposite of 'Bladder holds urine', which is fight or flight."
]
}
],
"diagram": "body",
"diagramCaption": "Organ affected",
"notes": {
"intro": "The autonomic nervous system runs the body's automatic jobs, such as heart rate, breathing, digestion and pupil size, without you thinking about them. It has two sides that usually pull in opposite directions on the same organ. The sympathetic side prepares you for danger or effort (fight or flight). The parasympathetic side calms you down and looks after digestion, rest and repair (rest and digest). Most organs appear twice in the game, once for each side, so ask yourself: would this help me run from a bear, or help me relax after dinner?",
"sections": [
{
"cat": "fight",
"title": "Fight or flight (sympathetic)",
"about": "The sympathetic side gets the body ready for action. It sends more blood and oxygen to the muscles, raises blood sugar for fuel, and widens the pupils and airways. Anything not urgent, like digesting food, making saliva or emptying the bladder, is put on hold. Its nerve endings mostly release norepinephrine (noradrenaline), and the adrenal glands add adrenaline (epinephrine) to the blood, which spreads the effect across the whole body. Sweat glands are the exception: they are sympathetic but use acetylcholine.",
"points": [
"Speeds up: heart, breathing, glucose release, sweating.",
"Widens: pupils, airways.",
"Slows or holds: digestion, saliva, bladder emptying.",
"Messenger: norepinephrine plus adrenaline; sweat glands use acetylcholine."
],
"tip": "Picture running from a bear: big eyes, pounding heart, dry mouth, no time to eat or wee."
},
{
"cat": "rest",
"title": "Rest and digest (parasympathetic)",
"about": "The parasympathetic side takes over when you are safe and relaxed. It slows the heart, narrows the pupils for close focus and narrows the airways because less air is needed. It switches digestion on: more saliva, more gut movement and more digestive juices. It also lets the bladder empty. Its main messenger is acetylcholine, carried largely by the vagus nerve. Each of these effects is the mirror image of a fight or flight effect on the same organ.",
"points": [
"Slows: heart rate.",
"Narrows: pupils, airways.",
"Switches on: saliva, digestion, bladder emptying.",
"Messenger: acetylcholine, mostly via the vagus nerve."
],
"tip": "Rest and digest = SLUDD: Salivation, Lacrimation (tears), Urination, Digestion, Defecation."
}
],
"outro": "In Match Pairs, remember most organs appear on both sides; only the liver glucose release and sweating have no parasympathetic partner here."
}
});
