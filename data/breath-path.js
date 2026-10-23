/* Breath Path — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "breath-path",
"title": "Breath Path",
"subject": "anatomy",
"subjectName": "Anatomy & Physiology",
"chapter": "22",
"tagline": "Follow every breath from your nose to the blood",
"itemNoun": "airway part",
"categories": [
{
"id": "upper",
"name": "Upper airway",
"color": "cat-sky",
"icon": "lungs"
},
{
"id": "lower",
"name": "Lower airway and lungs",
"color": "cat-mint",
"icon": "lungs"
},
{
"id": "muscle",
"name": "Breathing muscles",
"color": "cat-coral",
"icon": "muscle"
}
],
"categoryLabel": "Region",
"hint": "Learn the airway parts, then put the path of air and the steps of breathing in order.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{job}"
],
"detail": [
{
"label": "Region",
"field": "{category}"
},
{
"label": "Job",
"field": "{job}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the airways",
"desc": "Tap any part to see what it does.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "order",
"format": "sequence",
"title": "Put it in order",
"desc": "Order the path of air and the steps of breathing.",
"icon": "1→",
"color": "cat-sky"
},
{
"id": "job",
"format": "quiz",
"title": "Who does this job?",
"desc": "Read the job, pick the airway part.",
"icon": "?",
"color": "cat-mint",
"prompt": "Which part does this?",
"show": "job",
"showAs": "text",
"answer": "name"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each part with its job.",
"icon": "⇄",
"color": "cat-amber",
"clue": "job",
"clueLabel": "Job",
"pairs": 6
}
],
"items": [
{
"name": "Nasal cavity",
"cat": "upper",
"job": "Warms, moistens and filters the air",
"life": "Breathing through your nose is gentler on your airways than mouth breathing in cold air.",
"num": 1
},
{
"name": "Pharynx",
"cat": "upper",
"job": "Throat: shared passage for air and food",
"life": "It is the part a doctor looks at when they ask you to say 'aah'.",
"num": 2
},
{
"name": "Epiglottis",
"cat": "upper",
"job": "Flap that covers the windpipe when you swallow",
"life": "Food 'going down the wrong way' means it slipped past the epiglottis into the windpipe.",
"num": 3
},
{
"name": "Larynx",
"cat": "upper",
"job": "Voice box: holds the vocal cords",
"life": "The Adam's apple is the front of the larynx.",
"num": 4
},
{
"name": "Trachea",
"cat": "lower",
"job": "Windpipe: carries air to the chest",
"life": "C-shaped rings of cartilage keep it open; you can feel them at the front of your neck.",
"num": 5
},
{
"name": "Bronchi",
"cat": "lower",
"job": "Two main tubes, one taking air into each lung",
"life": "Bronchitis is inflammation of these tubes.",
"num": 6
},
{
"name": "Bronchioles",
"cat": "lower",
"job": "Tiny branching airways inside the lungs",
"life": "In an asthma attack, the muscle around the bronchioles tightens.",
"num": 7
},
{
"name": "Alveoli",
"cat": "lower",
"job": "Tiny air sacs where oxygen and carbon dioxide swap",
"life": "Spread out flat, your alveoli would cover roughly half a tennis court.",
"num": 8
},
{
"name": "Diaphragm",
"cat": "muscle",
"job": "Main breathing muscle: flattens to pull air in",
"life": "Hiccups are sudden, involuntary spasms of the diaphragm.",
"num": 9
},
{
"name": "Intercostal muscles",
"cat": "muscle",
"job": "Muscles between the ribs that lift the ribcage",
"life": "You feel them working when you breathe hard after running.",
"num": 10
},
{
"name": "Pleura",
"cat": "lower",
"job": "Thin, slippery layers that let the lungs glide",
"life": "Pleurisy, inflammation of these layers, makes deep breaths painful.",
"num": 11
}
],
"sequences": [
{
"id": "air",
"title": "The path of air into the lungs",
"icon": "lungs",
"steps": [
"Nasal cavity",
"Pharynx",
"Larynx",
"Trachea",
"Bronchi",
"Bronchioles",
"Alveoli"
],
"note": "The airways branch over 20 times between the trachea and the alveoli."
},
{
"id": "in",
"title": "Breathing in",
"icon": "lungs",
"steps": [
"The diaphragm and rib muscles contract",
"The diaphragm flattens and the ribs lift up and out",
"The chest gets bigger",
"Pressure in the lungs drops below the air outside",
"Air rushes in"
],
"note": "Breathing in takes effort; quiet breathing out is mostly passive."
},
{
"id": "out",
"title": "Breathing out, at rest",
"icon": "lungs",
"steps": [
"The diaphragm and rib muscles relax",
"The diaphragm domes up and the ribs move down and in",
"The chest gets smaller",
"Pressure in the lungs rises above the air outside",
"Air is pushed out"
],
"note": "Blowing out candles adds the stomach muscles to push harder."
},
{
"id": "o2",
"title": "An oxygen molecule's journey",
"icon": "heart",
"steps": [
"Breathed into an alveolus",
"Crosses into a lung capillary",
"Binds to haemoglobin in a red blood cell",
"Travels in the pulmonary veins to the heart",
"Pumped out through the aorta",
"Released to a body cell"
],
"note": "Each red blood cell carries about 270 million haemoglobin molecules."
}
]
});
