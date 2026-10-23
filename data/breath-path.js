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
"num": 1,
"spot": "nasal",
"facts": [
"Hairs and sticky mucus trap dust; cilia sweep the mucus back to the throat.",
"A rich blood supply in its lining warms the incoming air.",
"Bony shelves (conchae) swirl the air so more of it touches the lining."
],
"summary": "The air space behind the nose, the first stop for incoming air."
},
{
"name": "Pharynx",
"cat": "upper",
"job": "Throat: shared passage for air and food",
"life": "It is the part a doctor looks at when they ask you to say 'aah'.",
"num": 2,
"spot": "pharynx",
"facts": [
"Comes after the nasal cavity and before the larynx in the path of air.",
"Shared with the digestive system; food continues from it into the oesophagus.",
"Pharynx is the shared throat; the larynx below it is the air-only voice box."
],
"summary": "The throat: a muscular tube behind the nose and mouth, used by both air and food."
},
{
"name": "Epiglottis",
"cat": "upper",
"job": "Flap that covers the windpipe when you swallow",
"life": "Food 'going down the wrong way' means it slipped past the epiglottis into the windpipe.",
"num": 3,
"spot": "epiglottis",
"facts": [
"Tips down over the entrance of the larynx during swallowing.",
"Guides food into the oesophagus instead of the windpipe.",
"It is a protector, not a passage; air does not 'pass through' it."
],
"summary": "A leaf-shaped flap of cartilage at the top of the larynx."
},
{
"name": "Larynx",
"cat": "upper",
"job": "Voice box: holds the vocal cords",
"life": "The Adam's apple is the front of the larynx.",
"num": 4,
"spot": "larynx",
"facts": [
"Contains the vocal cords, which vibrate as air passes to make sound.",
"Its largest cartilage, the thyroid cartilage, forms the Adam's apple.",
"Air only goes through it; food is kept out by the epiglottis."
],
"summary": "The voice box, a cartilage box between the pharynx and the trachea."
},
{
"name": "Trachea",
"cat": "lower",
"job": "Windpipe: carries air to the chest",
"life": "C-shaped rings of cartilage keep it open; you can feel them at the front of your neck.",
"num": 5,
"spot": "trachea",
"facts": [
"About 16–20 C-shaped cartilage rings keep it from collapsing.",
"The open part of each 'C' faces backwards, against the oesophagus.",
"Splits into the two main bronchi behind the sternum."
],
"summary": "The windpipe, a tube from the larynx down into the chest."
},
{
"name": "Bronchi",
"cat": "lower",
"job": "Two main tubes, one taking air into each lung",
"life": "Bronchitis is inflammation of these tubes.",
"num": 6,
"spot": "bronchi",
"facts": [
"The right main bronchus is wider and more vertical, so inhaled objects lodge there more often.",
"They keep cartilage in their walls, unlike bronchioles.",
"Divide into smaller bronchi for each lung lobe before becoming bronchioles."
],
"summary": "The two main airways that branch from the trachea, one into each lung."
},
{
"name": "Bronchioles",
"cat": "lower",
"job": "Tiny branching airways inside the lungs",
"life": "In an asthma attack, the muscle around the bronchioles tightens.",
"num": 7,
"spot": "bronchioles",
"facts": [
"Less than about 1 mm across and have no cartilage.",
"Smooth muscle in their walls can narrow them, as in asthma.",
"Lead into the alveoli, the last step in the path of air."
],
"summary": "The smallest airway tubes, branching from the bronchi deep inside the lungs."
},
{
"name": "Alveoli",
"cat": "lower",
"job": "Tiny air sacs where oxygen and carbon dioxide swap",
"life": "Spread out flat, your alveoli would cover roughly a third of a tennis court (about 70 square metres).",
"num": 8,
"spot": "alveoli",
"facts": [
"About 300–500 million in the two lungs, each wrapped in capillaries.",
"Oxygen diffuses into the blood and carbon dioxide out, across a very thin barrier.",
"A fluid called surfactant stops them collapsing between breaths."
],
"summary": "Tiny, thin-walled air sacs at the end of the airways where gases are exchanged."
},
{
"name": "Diaphragm",
"cat": "muscle",
"job": "Main breathing muscle: flattens to pull air in",
"life": "Hiccups are sudden, involuntary spasms of the diaphragm.",
"num": 9,
"spot": "diaphragm",
"facts": [
"The main muscle of quiet breathing.",
"Contracts and flattens to enlarge the chest when breathing in.",
"Relaxes and domes back up when breathing out; it is controlled by the phrenic nerves."
],
"summary": "A dome-shaped sheet of muscle separating the chest from the abdomen."
},
{
"name": "Intercostal muscles",
"cat": "muscle",
"job": "Muscles between the ribs that lift the ribcage",
"life": "You feel them working when you breathe hard after running.",
"num": 10,
"spot": "intercostal",
"facts": [
"External intercostals lift the ribs up and out when breathing in.",
"Internal intercostals pull the ribs down in forced breathing out.",
"They help the diaphragm; the diaphragm does most of the work at rest."
],
"summary": "Layers of muscle between the ribs that move the ribcage."
},
{
"name": "Pleura",
"cat": "lower",
"job": "Thin, slippery layers that let the lungs glide",
"life": "Pleurisy, inflammation of these layers, makes deep breaths painful.",
"num": 11,
"spot": "pleura",
"facts": [
"The inner layer covers the lung; the outer layer lines the chest wall.",
"The fluid between them lets the lungs glide and keeps them stuck to the chest wall.",
"Air leaking between the layers (pneumothorax) can make a lung collapse."
],
"summary": "A double membrane surrounding each lung, with a thin film of fluid between its layers."
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
"note": "Each red blood cell carries about 280 million haemoglobin molecules."
}
],
"diagram": "respiratory",
"diagramCaption": "Where it is",
"notes": {
"intro": "Breathing has one goal: bring oxygen into the blood and get carbon dioxide out. Air travels down a branching tree of tubes, the upper airway (nose to larynx) then the lower airway (trachea to the tiny bronchioles), until it reaches millions of air sacs called alveoli, where gas exchange happens. The air moves because muscles change the size of the chest: a bigger chest lowers the pressure inside the lungs, so air flows in, and a smaller chest pushes it out. Learn each part's job, then the orders: the path of air, breathing in, breathing out and an oxygen molecule's journey.",
"sections": [
{
"cat": "upper",
"title": "Upper airway",
"about": "The upper airway is everything from the nostrils down to the larynx. The nasal cavity conditions the air: it warms it, moistens it and filters it with hairs and sticky mucus. The pharynx (throat) is a shared passage for air and food, so the body needs a way to keep food out of the airway: that is the epiglottis, a flap of cartilage that tips down over the entrance of the larynx when you swallow. The larynx (voice box) lies below the pharynx and contains the vocal cords, which vibrate to make sound.",
"points": [
"Path of air: nasal cavity → pharynx → larynx → trachea → bronchi → bronchioles → alveoli.",
"Pharynx = shared with food; larynx = air only, holds the vocal cords.",
"Epiglottis = the lid that protects the larynx during swallowing."
],
"tip": "The Pharynx is the Passage for both air and food; the Larynx is for Language (voice). Air meets the pharynx first, then the larynx."
},
{
"cat": "lower",
"title": "Lower airway and lungs",
"about": "Below the larynx, the trachea (windpipe) runs down the neck into the chest, held open by C-shaped rings of cartilage. It splits into two main bronchi, one for each lung, which keep dividing inside the lungs into smaller and smaller tubes; once they are narrower than about 1 mm and have no cartilage, they are called bronchioles. Bronchioles have smooth muscle in their walls, which is why they can tighten in asthma. At the very end are the alveoli, thin-walled air sacs wrapped in capillaries, where oxygen enters the blood and carbon dioxide leaves it. The pleura is a double membrane around each lung with a thin film of fluid between its layers, letting the lungs slide smoothly against the chest wall.",
"points": [
"Size order, largest to smallest: trachea → bronchi → bronchioles → alveoli.",
"Cartilage: trachea and bronchi have it; bronchioles don't (they have smooth muscle instead).",
"Oxygen's journey: into an alveolus → across into a lung capillary → binds haemoglobin in a red blood cell → pulmonary veins to the heart → out through the aorta → released to a body cell."
],
"tip": "Picture an upside-down tree: trachea is the trunk, bronchi the big branches, bronchioles the twigs, alveoli the leaves where the real work happens."
},
{
"cat": "muscle",
"title": "Breathing muscles",
"about": "Lungs have no muscle of their own to suck air in; the chest does the work. The diaphragm is a dome-shaped sheet of muscle under the lungs: when it contracts it flattens and pulls downwards, lengthening the chest. The external intercostal muscles between the ribs contract to lift the ribs up and out, widening the chest. A bigger chest means lower pressure in the lungs than in the outside air, so air flows in (Boyle's law: volume up, pressure down). At rest, breathing out is passive: the muscles relax, the elastic lungs recoil and air is pushed out.",
"points": [
"Breathing in: diaphragm and rib muscles contract → diaphragm flattens, ribs lift up and out → chest gets bigger → lung pressure drops below outside air → air rushes in.",
"Breathing out at rest: muscles relax → diaphragm domes up, ribs move down and in → chest gets smaller → lung pressure rises above outside air → air is pushed out.",
"Forced breathing out adds abdominal and internal intercostal muscles."
],
"tip": "Contract to get bigger, relax to get smaller: inhaling is the work, exhaling at rest is the rest."
}
],
"outro": "For the sequence games, remember that air flows from high pressure to low pressure, and everything else (muscles, chest size) is just how the body creates that difference."
}
});
