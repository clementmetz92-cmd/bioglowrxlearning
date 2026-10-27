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
},
{
"id": "mechanics",
"name": "Ventilation and lung volumes",
"color": "cat-amber",
"icon": "lungs"
},
{
"id": "transport",
"name": "Gas exchange and transport",
"color": "cat-lilac",
"icon": "drop"
},
{
"id": "control",
"name": "Control of breathing",
"color": "cat-sage",
"icon": "brain"
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
"color": "cat-sky", "only": ["air", "in", "out", "o2"] },
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
"answer": "name", "only": ["upper", "lower", "muscle"] },
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each part with its job.",
"icon": "⇄",
"color": "cat-amber",
"clue": "job",
"clueLabel": "Job",
"pairs": 6, "only": ["upper", "lower", "muscle"] },
{
"id": "cases",
"format": "cases",
"title": "Clinic cases",
"desc": "COPD, carbon monoxide, an asthma attack and thin mountain air.",
"icon": "✚",
"color": "cat-coral",
"rounds": 3,
"extra": true
},
{ "id": "physio", "format": "quiz", "title": "Breathing physiology", "desc": "Volumes, gas transport and the control of breathing.", "icon": "O₂", "color": "cat-sky", "prompt": "Which term matches this?", "show": "job", "showAs": "text", "answer": "name", "only": ["mechanics", "transport", "control"], "extra": true },
{ "id": "physio-order", "format": "sequence", "title": "Physiology in order", "desc": "The CO₂ feedback loop and a CO₂ molecule's journey.", "icon": "1→", "color": "cat-mint", "only": ["co2loop", "co2"], "extra": true }
],
"items": [
{
"name": "Nasal cavity",
"icon": "anat1-nasal-cavity",
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
"icon": "anat1-pharynx",
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
"icon": "anat1-epiglottis",
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
"icon": "anat1-larynx",
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
"icon": "anat1-trachea",
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
"icon": "anat1-bronchi",
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
"icon": "anat1-bronchioles",
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
"icon": "anat1-alveoli",
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
"icon": "anat1-diaphragm",
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
"icon": "anat1-intercostal",
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
"icon": "anat1-pleura",
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
},
{
"name": "Boyle's law",
"icon": "gauge",
"cat": "mechanics",
"job": "Rule that gas pressure falls as its volume rises",
"life": "Pulling back the plunger of a sealed syringe lowers the pressure inside it, just as your chest does when it expands.",
"num": 12,
"spot": ["diaphragm", "intercostal"],
"spotCaption": "The breathing muscles change the chest's volume",
"facts": [
"At a steady temperature, pressure and volume change in opposite directions: double the volume and the pressure halves.",
"Breathing in, the chest gets bigger, so pressure in the lungs drops a little below the air outside and air flows in.",
"Breathing out, the chest gets smaller, so lung pressure rises above the air outside and air flows out."
],
"summary": "The gas law behind every breath: air flows because the chest changes its volume, and so the pressure in the lungs."
},
{
"name": "Tidal volume",
"icon": "wave",
"cat": "mechanics",
"job": "Air moved in or out in one quiet breath, about 500 mL",
"life": "On a spirometer trace at a lung clinic, quiet breathing shows up as small, regular waves: each one is a tidal volume.",
"num": 13,
"facts": [
"About 500 mL in a young adult at rest.",
"Tidal volume × breaths per minute = minute ventilation, about 6 L per minute at rest.",
"In exercise it grows by using the reserve volumes above it (inspiratory reserve) and below it (expiratory reserve)."
],
"summary": "The amount of air you breathe in or out in one normal, relaxed breath."
},
{
"name": "Vital capacity",
"icon": "lungs",
"cat": "mechanics",
"job": "Most air you can breathe out after the deepest breath in",
"life": "Taking the deepest breath you can and then blowing out fully into a spirometer measures it.",
"num": 14,
"facts": [
"Vital capacity = inspiratory reserve volume + tidal volume + expiratory reserve volume.",
"About 4.7 L in a young adult man; usually smaller in women, and it falls with age.",
"It is reduced in restrictive diseases such as lung fibrosis, where the lungs cannot expand fully."
],
"summary": "The biggest single breath you can move: tidal volume plus both reserve volumes."
},
{
"name": "Residual volume",
"icon": "ring",
"cat": "mechanics",
"job": "Air left in the lungs after the hardest breath out",
"life": "Even after you blow out every candle on a cake, over a litre of air is still in your lungs.",
"num": 15,
"facts": [
"About 1.2–1.3 L in a young adult. Vital capacity + residual volume = total lung capacity, about 6 L.",
"It keeps the alveoli partly open, so gas exchange carries on between breaths.",
"A spirometer cannot measure it. It rises in emphysema, where air gets trapped in the lungs."
],
"summary": "The air that stays in the lungs even after you breathe out as hard as you can."
},
{
"name": "Anatomical dead space",
"icon": "ban",
"cat": "mechanics",
"job": "Air in the conducting airways that never reaches the alveoli",
"life": "A snorkel adds extra dead space, which is why snorkel tubes are kept short.",
"num": 16,
"spot": ["trachea", "bronchi"],
"spotCaption": "The conducting airways hold the dead space",
"facts": [
"About 150 mL in an adult, so only about 350 mL of a 500 mL breath reaches the alveoli.",
"Alveolar ventilation = (tidal volume − dead space) × breaths per minute.",
"Slow, deep breaths refresh the alveoli better than fast, shallow breaths with the same minute ventilation."
],
"summary": "The air that fills the airways from the nose to the smallest bronchioles, where no gas exchange happens."
},
{
"name": "Partial pressure",
"icon": "scale",
"cat": "transport",
"job": "One gas's share of the total pressure; gases diffuse from high to low",
"life": "Oxygen is still 21% of the air on a mountain, but the lower total pressure means a lower PO2, so each breath delivers less.",
"num": 17,
"spot": "alveoli",
"spotCaption": "Gases swap across the alveolar wall",
"facts": [
"Dalton's law: total air pressure is the sum of each gas's partial pressure. At sea level oxygen gives about 159 of the 760 mmHg.",
"Alveolar air has a PO2 of about 104 mmHg and a PCO2 of about 40. Blood arriving at the lungs has a PO2 of about 40 and a PCO2 of about 46.",
"So oxygen diffuses into the blood and CO2 out of it. In the body's tissues the gradients run the other way."
],
"summary": "The part of the total pressure of a gas mixture that comes from one gas. Each gas diffuses down its own partial pressure gradient."
},
{
"name": "Haemoglobin",
"icon": "anat1-blood",
"cat": "transport",
"job": "Iron-containing protein in red blood cells that carries most oxygen",
"life": "Blood rich in oxygen is bright red; blood low in oxygen is a darker red, not blue.",
"num": 18,
"facts": [
"Each molecule has four haem groups, each with an iron atom that binds one O2, so it can carry four O2 molecules.",
"About 98.5% of the oxygen in blood rides on haemoglobin; only about 1.5% is dissolved in plasma.",
"It also carries a small share of the CO2 (as carbaminohaemoglobin) and buffers hydrogen ions."
],
"summary": "The red protein packed into red blood cells that picks up oxygen in the lungs and drops it off in the tissues."
},
{
"name": "O2–Hb dissociation curve",
"icon": "chart",
"cat": "transport",
"job": "S-shaped graph of how saturated haemoglobin is at each PO2",
"life": "A pulse oximeter on your finger reads haemoglobin saturation; a normal reading is about 95–100%.",
"num": 19,
"facts": [
"At the lungs (PO2 about 100 mmHg) haemoglobin is about 97% saturated. The flat top means a small fall in PO2 barely changes loading.",
"In resting tissues (PO2 about 40 mmHg) it is still about 75% saturated, leaving a big reserve for exercise.",
"On the steep middle part, a small drop in PO2 releases a lot of oxygen, as happens in working muscle."
],
"summary": "A graph of haemoglobin saturation against PO2. Its S shape lets haemoglobin load fully in the lungs and unload where tissues need oxygen."
},
{
"name": "Bohr effect",
"icon": "flame",
"cat": "transport",
"job": "More CO2 and acid make haemoglobin release more oxygen",
"life": "Hard-working muscles are warm, acidic and full of CO2, so they get extra oxygen from the same blood flow.",
"num": 20,
"facts": [
"Rising CO2 and hydrogen ions (lower pH) loosen haemoglobin's grip on oxygen and shift the curve to the right.",
"Higher temperature and more BPG (2,3-bisphosphoglycerate) also shift the curve to the right.",
"A left shift (cooler, less acidic blood, or carbon monoxide) makes haemoglobin hold on to oxygen more tightly."
],
"summary": "Haemoglobin lets go of oxygen more easily where CO2 and acid are high, in the tissues that need it most."
},
{
"name": "Bicarbonate",
"icon": "anat2-bicarb",
"cat": "transport",
"job": "The form most carbon dioxide takes to travel in the blood",
"life": "The same bicarbonate is the blood's main buffer, which is why breathing affects the body's acid–base balance.",
"num": 21,
"facts": [
"In red blood cells the enzyme carbonic anhydrase speeds up CO2 + H2O → H2CO3 → H+ + HCO3−.",
"Bicarbonate moves out into the plasma in exchange for chloride (the chloride shift), and haemoglobin mops up the H+.",
"In the lungs the reaction runs backwards and CO2 is breathed out. Smaller shares of CO2 travel dissolved or bound to haemoglobin."
],
"summary": "Most CO2 from the tissues travels to the lungs as bicarbonate ions dissolved in the plasma."
},
{
"name": "Medullary respiratory centres",
"icon": "anat2-medulla",
"cat": "control",
"job": "Brainstem neurons that set the basic rhythm of breathing",
"life": "Opioid overdose is dangerous because these drugs depress the medulla, so breathing slows and can stop.",
"num": 22,
"facts": [
"The ventral respiratory group generates the rhythm, about 12 breaths a minute at rest.",
"Its signals travel down the spinal cord to the phrenic nerves (diaphragm) and intercostal nerves (rib muscles).",
"The dorsal respiratory group gathers input from chemoreceptors and stretch receptors and adjusts the rate and depth."
],
"summary": "Groups of neurons in the medulla oblongata that fire in a rhythm to drive the breathing muscles."
},
{
"name": "Pontine respiratory group",
"icon": "anat2-pons",
"cat": "control",
"job": "Neurons in the pons that smooth the switch between breathing in and out",
"life": "Speaking and singing need your breathing to fit around the words; the pons helps adjust the rhythm.",
"num": 23,
"facts": [
"Sits in the pons, just above the medulla.",
"Adjusts how long each breath in lasts and smooths the change to breathing out.",
"It fine-tunes the rhythm during sleep, exercise and speech; the medulla generates the rhythm."
],
"summary": "A group of neurons in the pons that modifies the rhythm set by the medulla."
},
{
"name": "Central chemoreceptors",
"icon": "anat2-csf",
"cat": "control",
"job": "Medulla sensors that react to CO2 through the pH of brain fluid",
"life": "The urge that ends a breath-hold comes mainly from rising CO2, not from running out of oxygen.",
"num": 24,
"facts": [
"CO2 crosses the blood–brain barrier easily and reacts with water in the cerebrospinal fluid, releasing H+.",
"The falling pH stimulates them, and the respiratory centres make breathing deeper and faster.",
"They respond to CO2 (through H+), not to low oxygen. CO2 is the main everyday drive to breathe."
],
"summary": "Sensors near the surface of the medulla that detect rising CO2, the strongest everyday stimulus to breathe."
},
{
"name": "Peripheral chemoreceptors",
"icon": "anat2-chemorec",
"cat": "control",
"job": "Carotid and aortic bodies that sense low O2, high CO2 and acid",
"life": "At high altitude these sensors make you breathe faster within minutes of arriving.",
"num": 25,
"facts": [
"The carotid bodies report through the glossopharyngeal nerve, the aortic bodies through the vagus nerve.",
"They are the only sensors that respond to low oxygen, but strongly only once arterial PO2 falls below about 60 mmHg.",
"They also respond to rising CO2 and H+, for example the acid of diabetic ketoacidosis."
],
"summary": "Small sensors in the carotid arteries and the aortic arch that check the arterial blood."
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
},
{
"id": "co2loop",
"title": "Negative feedback: too much CO2",
"icon": "brain",
"steps": [
"CO2 builds up in the blood",
"More H+ forms in the brain's fluid",
"Central chemoreceptors are stimulated",
"The medulla sends faster, stronger signals",
"Breathing gets deeper and faster",
"Extra CO2 is breathed out and pH returns to normal"
],
"note": "The response removes the stimulus that started it, which is what makes this negative feedback."
},
{
"id": "co2",
"title": "A carbon dioxide molecule's journey",
"icon": "lungs",
"steps": [
"Made by a working body cell",
"Diffuses into a tissue capillary",
"Enters a red blood cell",
"Joins water to form carbonic acid, then bicarbonate",
"Travels in the plasma to the lungs",
"Re-enters a red blood cell in a lung capillary and turns back into CO2",
"Diffuses into an alveolus and is breathed out"
],
"note": "Carbonic anhydrase in red blood cells speeds up the reaction in both directions."
}
],
"cases": [
{
"id": "b1",
"cat": "mechanics",
"icon": "lungs",
"spot": "alveoli",
"title": "Forty years of smoking",
"who": "Frank, 68, retired builder",
"story": "Frank smoked for forty years. He gets breathless on the stairs, his chest looks barrel-shaped and he breathes out through pursed lips. Spirometry and an arterial blood test are done in clinic.",
"data": [["FEV1/FVC", "0.55 (low)"], ["Arterial PCO2", "58 mmHg (normal 35–45)"], ["pH", "7.37"], ["Bicarbonate", "High"]],
"steps": [
{ "q": "His FEV1/FVC ratio is low. What does that mean?", "options": ["Air cannot get out of his lungs fast enough", "His lungs are too stiff to fill up properly", "His alveoli cannot pass oxygen to the blood", "His breathing muscles are too weak to work"], "answer": 0, "why": "A low FEV1/FVC means he blows out a smaller share of his breath in the first second than normal (normally at least 0.7; his is 0.55): an obstructive pattern, typical of COPD." },
{ "q": "His residual volume is much higher than normal. Why?", "options": ["Air is trapped behind narrowed, floppy airways", "His diaphragm pushes extra air into the lungs", "His surfactant stops the alveoli from emptying", "His ribs have become fixed in the breath-out position"], "answer": 0, "why": "In COPD the small airways narrow and collapse on breathing out, trapping air. Residual volume rises and the chest over-inflates." },
{ "q": "His PCO2 is high but his pH is almost normal. Why?", "options": ["His kidneys have kept extra bicarbonate to buffer the acid", "His lungs have made extra bicarbonate to buffer the acid", "High CO2 makes the blood alkaline, which cancels it out", "His chemoreceptors have removed the extra acid from blood"], "answer": 0, "why": "Retained CO2 makes carbonic acid (respiratory acidosis). Over days the kidneys keep more bicarbonate, which brings the pH back near normal." }
],
"takeaway": "COPD traps air and can retain CO2. In hospital, oxygen is given to a target saturation of 88–92% rather than as high as possible, because too much can push his CO2 higher still. Oxygen is never withheld from a patient whose saturation is low."
},
{
"id": "b2",
"cat": "transport",
"icon": "flame",
"spot": "alveoli",
"title": "Headaches in winter",
"who": "Ana, 35, and her family",
"story": "Since they started using an old gas heater, Ana and her two children wake up with headaches and feel sick and dizzy. The symptoms ease when they are out of the house. Her finger pulse oximeter reads normal.",
"data": [["Pulse oximeter", "99%"], ["Carboxyhaemoglobin", "25% (normal under 3%)"], ["Arterial PO2", "Normal"]],
"steps": [
{ "q": "Why is carbon monoxide so dangerous?", "options": ["It binds haemoglobin far more tightly than oxygen", "It blocks the alveoli so that air cannot reach them", "It stops the diaphragm from contracting properly", "It turns haemoglobin into bicarbonate in the blood"], "answer": 0, "why": "CO binds the same iron sites as oxygen, over 200 times more tightly, so less haemoglobin is free to carry oxygen." },
{ "q": "Her arterial PO2 is normal. Why do her tissues still lack oxygen?", "options": ["Less haemoglobin is free to carry oxygen", "Oxygen cannot dissolve in plasma with CO", "Her lungs breathe the oxygen out too fast", "Her red blood cells have burst open"], "answer": 0, "why": "PO2 reflects dissolved oxygen, which is normal. Oxygen content is low because CO occupies haemoglobin. Standard oximeters also misread CO-haemoglobin as oxygenated." },
{ "q": "CO also shifts the O2–Hb dissociation curve to the left. What does this do?", "options": ["Haemoglobin holds on to its oxygen and gives less to tissues", "Haemoglobin gives up its oxygen more easily to the tissues", "Haemoglobin picks up much less oxygen in the lungs", "Haemoglobin carries carbon dioxide instead of oxygen"], "answer": 0, "why": "A left shift means a higher affinity: the oxygen haemoglobin does carry is released less readily in the tissues, worsening the shortage." }
],
"takeaway": "CO poisoning: a normal PO2 and a normal oximeter reading can hide it. Everyone leaves the house, the heater is switched off and emergency help is called. Treatment is high-flow oxygen, which speeds CO's removal from haemoglobin."
},
{
"id": "b3",
"cat": "lower",
"icon": "lungs",
"spot": "bronchioles",
"title": "Too breathless to talk",
"who": "Leo, 19, student",
"story": "Leo has asthma. After a cold he becomes wheezy and short of breath, and can only speak a few words at a time. He is using his neck muscles to breathe.",
"data": [["Breathing rate", "28 a minute"], ["Peak flow", "45% of his best"], ["SpO2", "94%"], ["Arterial PCO2", "32 mmHg (low)"]],
"steps": [
{ "q": "Which part of the airway is narrowing?", "options": ["Bronchioles, as their smooth muscle tightens", "Trachea, as its cartilage rings collapse", "Alveoli, as they fill up with fluid", "Larynx, as the vocal cords close tightly"], "answer": 0, "why": "Asthma narrows the bronchioles: the smooth muscle contracts, the lining swells and extra mucus forms." },
{ "q": "His PCO2 is low. Why?", "options": ["He is breathing fast and blowing off extra CO2", "His cells are making less CO2 than usual", "CO2 is being stored as extra bicarbonate", "His alveoli are trapping CO2 in the lungs"], "answer": 0, "why": "Early in an attack, fast breathing removes CO2 faster than it is made. A normal or rising PCO2 in a severe attack is a danger sign that he is tiring." },
{ "q": "A {{us:albuterol (salbutamol)|uk:salbutamol (albuterol)}} inhaler relaxes the airway muscle. Why does this help so much?", "options": ["Wider airways have much less resistance to airflow", "It makes the alveoli produce more surfactant", "It makes the diaphragm contract more strongly", "It raises haemoglobin's affinity for oxygen"], "answer": 0, "why": "Resistance depends steeply on airway radius, so even a small widening of the bronchioles greatly improves airflow." }
],
"takeaway": "Asthma is bronchiole narrowing. Being unable to finish a sentence is a sign of a severe attack that needs emergency care. A low PCO2 is expected early on; a normal or high one in a severe attack means he is tiring."
},
{
"id": "b4",
"cat": "control",
"icon": "lungs",
"spot": "alveoli",
"title": "Thin mountain air",
"who": "Maya, 27, hiker",
"story": "Maya flies from the coast to a city at 3,800 m. Within hours she is breathing faster and feels breathless on the stairs. Her finger oximeter reads lower than at home.",
"data": [["Altitude", "3,800 m"], ["SpO2", "88%"], ["Breathing rate", "Raised"]],
"steps": [
{ "q": "Why is her blood oxygen lower up here?", "options": ["The air's partial pressure of oxygen is lower", "The air contains a smaller percentage of oxygen", "Cold air cannot carry oxygen into the alveoli", "Her haemoglobin has stopped binding oxygen"], "answer": 0, "why": "Air is still about 21% oxygen, but the total pressure is lower, so PO2 is lower and less oxygen diffuses into the blood." },
{ "q": "Which sensors detect the low oxygen and make her breathe faster?", "options": ["Peripheral chemoreceptors in the carotid and aortic bodies", "Central chemoreceptors on the surface of the medulla", "Stretch receptors in the walls of the bronchioles", "Baroreceptors in the walls of the aorta and carotids"], "answer": 0, "why": "Only the peripheral chemoreceptors respond to low arterial PO2. The central ones respond to CO2 through pH." },
{ "q": "After a few weeks her red blood cell count has risen. Which hormone caused this?", "options": ["Erythropoietin (EPO) from the kidneys", "Aldosterone from the adrenal glands", "Thyroxine from the thyroid gland", "Insulin from the pancreas"], "answer": 0, "why": "Low oxygen makes the kidneys release EPO, which tells the red bone marrow to make more red blood cells." }
],
"takeaway": "At altitude, the lower PO2 is sensed by the peripheral chemoreceptors. Faster breathing helps at once; more red blood cells take weeks."
}
],
"diagram": "respiratory",
"diagramCaption": "Where it is",
"notes": {
"intro": "Breathing has one goal: bring oxygen into the blood and get carbon dioxide out. Air travels down a branching tree of tubes, the upper airway (nose to larynx) then the lower airway (trachea to the tiny bronchioles), until it reaches millions of air sacs called alveoli, where gas exchange happens. The air moves because muscles change the size of the chest: a bigger chest lowers the pressure inside the lungs, so air flows in, and a smaller chest pushes it out. Learn each part's job, then the orders: the path of air, breathing in, breathing out and an oxygen molecule's journey. The physiology cards then cover how much air moves (lung volumes), how oxygen and carbon dioxide travel in the blood, and how the brainstem keeps CO2 steady by negative feedback.",
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
},
{
"cat": "mechanics",
"title": "Ventilation and lung volumes",
"about": "Ventilation is the movement of air in and out, and it rests on Boyle's law: at a steady temperature, the pressure of a gas falls as its volume rises. When the breathing muscles enlarge the chest, the pressure in the lungs drops a little below the air outside and air flows in; when the chest gets smaller, the pressure rises and air flows out. A spirometer measures how much air moves. Tidal volume is one quiet breath (about 500 mL). Vital capacity is the most you can breathe out after the deepest breath in (tidal volume plus the inspiratory and expiratory reserve volumes, about 4.7 L in a young man). Residual volume is the air that always stays in the lungs (about 1.2–1.3 L); a spirometer cannot measure it. About 150 mL of each breath fills the conducting airways, the anatomical dead space, and never reaches the alveoli.",
"points": [
"Boyle's law: chest volume up → lung pressure down → air flows in.",
"Vital capacity = inspiratory reserve + tidal volume + expiratory reserve. Total lung capacity = vital capacity + residual volume.",
"Alveolar ventilation = (tidal volume − dead space) × breaths per minute.",
"Obstructive disease (asthma, COPD): air cannot get out quickly, low FEV1/FVC, residual volume rises. Restrictive disease (fibrosis): lungs cannot fill, vital capacity falls."
],
"tip": "Vital capacity is the most you can move in one breath; residual volume is the air that always stays behind."
},
{
"cat": "transport",
"title": "Gas exchange and transport",
"about": "Each gas in a mixture has its own partial pressure, and it diffuses from where its partial pressure is higher to where it is lower. Alveolar air has a PO2 of about 104 mmHg, while blood arriving at the lungs has about 40, so oxygen moves into the blood; CO2 moves the other way (about 46 in the blood to 40 in the alveoli). In the tissues the gradients reverse. About 98.5% of oxygen is carried bound to haemoglobin, up to four O2 per molecule. The oxygen–haemoglobin dissociation curve is S-shaped: haemoglobin is about 97% saturated in the lungs and still about 75% in resting tissues, a reserve for exercise. Higher CO2, more acid (lower pH), higher temperature and more BPG shift the curve to the right, so more oxygen is released where it is needed; the CO2 and acid part is the Bohr effect. Most CO2 travels as bicarbonate: carbonic anhydrase in red blood cells turns CO2 and water into carbonic acid, which splits into H+ and bicarbonate, and in the lungs the reaction runs backwards.",
"points": [
"Gases diffuse down their own partial pressure gradient: O2 from alveoli to blood, CO2 from blood to alveoli.",
"O2: about 98.5% on haemoglobin, about 1.5% dissolved.",
"Right shift (more CO2, acid, heat, BPG) = haemoglobin releases more O2. Left shift (cooler, less acid, carbon monoxide) = it holds on.",
"CO2: mostly as bicarbonate in plasma; smaller shares dissolved or bound to haemoglobin."
],
"tip": "Right shift = Release. Busy tissues are hot, acidic and full of CO2, and that is exactly where haemoglobin lets go."
},
{
"cat": "control",
"title": "Control of breathing",
"about": "Breathing is automatic. In the medulla oblongata, the ventral respiratory group generates the basic rhythm and sends signals down the spinal cord to the phrenic and intercostal nerves; the dorsal respiratory group takes in sensory information and adjusts the rate and depth. The pontine respiratory group in the pons smooths the switch between breathing in and out. The main everyday drive is carbon dioxide. CO2 crosses into the cerebrospinal fluid, where it forms H+, and the central chemoreceptors in the medulla respond to that fall in pH. The peripheral chemoreceptors, in the carotid and aortic bodies, respond to low oxygen (strongly only when arterial PO2 falls below about 60 mmHg) as well as to high CO2 and acid. This is negative feedback: more CO2 leads to more breathing, which removes CO2.",
"points": [
"Medulla sets the rhythm; pons fine-tunes it.",
"Central chemoreceptors: CO2, through the pH of brain fluid. The strongest everyday drive.",
"Peripheral chemoreceptors (carotid and aortic bodies): low O2, plus high CO2 and H+.",
"CO2 loop: CO2 rises → more H+ in brain fluid → central chemoreceptors → medulla → deeper, faster breathing → CO2 falls."
],
"tip": "Central = CO2, in the Centre of the brain. Peripheral = the only ones that notice low oxygen."
}
],
"outro": "For the sequence games, remember that air flows from high pressure to low pressure, and everything else (muscles, chest size) is just how the body creates that difference."
}
});
