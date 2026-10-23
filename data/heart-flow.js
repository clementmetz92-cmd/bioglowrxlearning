/* Heart Flow — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "heart-flow",
"title": "Heart Flow",
"subject": "anatomy",
"subjectName": "Anatomy & Physiology",
"chapter": "18–20",
"tagline": "Follow the blood through the heart, valve by valve",
"itemNoun": "heart part",
"categories": [
{
"id": "chamber",
"name": "Chambers",
"color": "cat-coral",
"icon": "heart"
},
{
"id": "valve",
"name": "Valves",
"color": "cat-amber",
"icon": "drop"
},
{
"id": "vessel",
"name": "Big vessels",
"color": "cat-sky",
"icon": "wave"
},
{
"id": "electric",
"name": "Electrical system",
"color": "cat-lemon",
"icon": "zap"
}
],
"categoryLabel": "Type",
"hint": "Learn the parts first, then put blood flow and the heartbeat in order.",
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
"label": "Type",
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
"title": "Explore the heart",
"desc": "Tap any part to see what it does.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "flow",
"format": "sequence",
"title": "Put it in order",
"desc": "Order blood flow, the heartbeat and the heart's wiring.",
"icon": "1→",
"color": "cat-coral",
"prompt": "Put these steps in order"
},
{
"id": "job",
"format": "quiz",
"title": "Who does this job?",
"desc": "Read the job, pick the heart part.",
"icon": "?",
"color": "cat-sky",
"prompt": "Which part of the heart does this?",
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
"color": "cat-mint",
"clue": "job",
"clueLabel": "Job",
"pairs": 6
}
],
"items": [
{
"name": "Right atrium",
"cat": "chamber",
"job": "Upper right chamber: collects oxygen-poor blood arriving from the body",
"life": "It fills mainly from the two venae cavae, the body's largest veins.",
"num": 1
},
{
"name": "Right ventricle",
"cat": "chamber",
"job": "Lower right chamber: pumps blood to the lungs",
"life": "Its wall is thinner than the left's because pumping to the nearby lungs needs far less pressure.",
"num": 2
},
{
"name": "Left atrium",
"cat": "chamber",
"job": "Upper left chamber: collects oxygen-rich blood arriving from the lungs",
"life": "It fills from the pulmonary veins.",
"num": 3
},
{
"name": "Left ventricle",
"cat": "chamber",
"job": "Lower left chamber: pumps blood out to the whole body",
"life": "It has the thickest wall of the heart; it does the hardest work.",
"num": 4
},
{
"name": "Tricuspid valve",
"cat": "valve",
"job": "Stops blood flowing back from the right ventricle to the right atrium",
"life": "Its closing is part of the 'lub' you hear through a stethoscope.",
"num": 5
},
{
"name": "Pulmonary valve",
"cat": "valve",
"job": "Stops blood flowing back from the lungs' artery into the right ventricle",
"life": "It closes with the 'dub' of the heartbeat.",
"num": 6
},
{
"name": "Mitral valve",
"cat": "valve",
"job": "Stops blood flowing back from the left ventricle to the left atrium",
"life": "Also called the bicuspid valve because it has two flaps.",
"num": 7
},
{
"name": "Aortic valve",
"cat": "valve",
"job": "Stops blood flowing back from the aorta into the left ventricle",
"life": "A narrowed aortic valve is a common heart problem in older age.",
"num": 8
},
{
"name": "Venae cavae",
"cat": "vessel",
"job": "Two large veins that empty the body's oxygen-poor blood into the heart",
"life": "The superior one drains the head and arms; the inferior one drains the lower body.",
"num": 9
},
{
"name": "Pulmonary artery",
"cat": "vessel",
"job": "Vessel that carries oxygen-poor blood from the heart to the lungs",
"life": "After birth, it is the only artery that carries oxygen-poor blood.",
"num": 10
},
{
"name": "Pulmonary veins",
"cat": "vessel",
"job": "Veins that carry oxygen-rich blood from the lungs to the heart",
"life": "After birth, they are the only veins that carry oxygen-rich blood.",
"num": 11
},
{
"name": "Aorta",
"cat": "vessel",
"job": "Large artery that carries oxygen-rich blood from the heart to the body",
"life": "The body's largest artery, about as wide as a garden hose.",
"num": 12
},
{
"name": "Coronary arteries",
"cat": "vessel",
"job": "Supply the heart muscle itself with blood",
"life": "A blockage here causes a heart attack.",
"num": 13
},
{
"name": "SA node",
"cat": "electric",
"job": "Starts each heartbeat: the natural pacemaker",
"life": "An artificial pacemaker can take over when the heart's own wiring stops working properly.",
"num": 14
},
{
"name": "AV node",
"cat": "electric",
"job": "Briefly delays the signal so the ventricles can fill",
"life": "This short delay is why the atria contract just before the ventricles.",
"num": 15
},
{
"name": "Purkinje fibres",
"cat": "electric",
"job": "Spread the signal through the ventricle walls",
"life": "They make the ventricles squeeze from the bottom up, like squeezing toothpaste.",
"num": 16
}
],
"sequences": [
{
"id": "right",
"title": "Oxygen-poor blood: from the body to the lungs",
"icon": "heart",
"steps": [
"Venae cavae",
"Right atrium",
"Tricuspid valve",
"Right ventricle",
"Pulmonary valve",
"Pulmonary artery",
"Lungs"
],
"note": "The right side of the heart pumps blood only to the lungs; it comes back to the left side."
},
{
"id": "left",
"title": "Oxygen-rich blood: from the lungs to the body",
"icon": "heart",
"steps": [
"Lungs",
"Pulmonary veins",
"Left atrium",
"Mitral valve",
"Left ventricle",
"Aortic valve",
"Aorta",
"Body"
],
"note": "The left ventricle pumps the hardest because it supplies the whole body."
},
{
"id": "wiring",
"title": "The electrical signal of one heartbeat",
"icon": "zap",
"steps": [
"SA node fires",
"Signal spreads across both atria",
"AV node delays the signal while the atria contract",
"Bundle of His",
"Bundle branches",
"Purkinje fibres",
"Ventricles contract"
],
"note": "An ECG trace records this electrical journey."
},
{
"id": "vessels",
"title": "Blood vessels, leaving the heart and coming back",
"icon": "wave",
"steps": [
"Aorta",
"Arteries",
"Arterioles",
"Capillaries",
"Venules",
"Veins",
"Venae cavae"
],
"note": "Gas and nutrient exchange happens in the capillaries, whose walls are one cell thick."
},
{
"id": "beat",
"title": "One heartbeat, step by step",
"icon": "heart",
"steps": [
"Atria contract and top up the ventricles",
"Ventricles squeeze and the tricuspid and mitral valves close (the 'lub')",
"Pulmonary and aortic valves open and blood is pumped out",
"Ventricles relax and the pulmonary and aortic valves close (the 'dub')",
"Tricuspid and mitral valves open and the ventricles refill for the next beat"
],
"note": "'Lub-dub' is the sound of the two sets of valves closing."
}
]
});
