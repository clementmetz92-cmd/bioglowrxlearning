/* Drug Class Sort — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "drug-class-sort",
"title": "Drug Class Sort",
"subject": "pharmacology",
"subjectName": "Pharmacology",
"chapter": "5–9",
"tagline": "Common medicines, their drug families and what they treat",
"itemNoun": "medicine",
"categories": [
{
"id": "cardio",
"name": "Heart and blood vessels",
"color": "cat-coral",
"icon": "heart"
},
{
"id": "resp",
"name": "Breathing and allergy",
"color": "cat-sky",
"icon": "lungs"
},
{
"id": "gi",
"name": "Digestion",
"color": "cat-amber",
"icon": "stomach"
},
{
"id": "cns",
"name": "Brain and nerves",
"color": "cat-lilac",
"icon": "brain"
},
{
"id": "endo",
"name": "Hormones and diabetes",
"color": "cat-sage",
"icon": "gland"
}
],
"categoryLabel": "Body system",
"hint": "Medicines in the same class work in a similar way. Generic names often share an ending, like -pril, -olol or -statin.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{cls}",
"{use}"
],
"detail": [
{
"label": "Drug class",
"field": "{cls}"
},
{
"label": "Used for",
"field": "{use}"
},
{
"label": "Body system",
"field": "{category}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore medicines",
"desc": "Tap a medicine to see its class and what it treats.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "system",
"format": "sortit",
"title": "Which body system?",
"desc": "Sort each medicine by the system it treats.",
"icon": "⌖",
"color": "cat-coral",
"prompt": "Which body system is this medicine mainly for?",
"choices": 5
},
{
"id": "class",
"format": "quiz",
"title": "Name the class",
"desc": "See the medicine, pick its drug class.",
"icon": "?",
"color": "cat-lilac",
"prompt": "Which drug class is",
"show": "name",
"showAs": "big",
"answer": "cls",
"answerAs": "small"
},
{
"id": "use",
"format": "quiz",
"title": "What is it for?",
"desc": "See the medicine, pick what it treats.",
"icon": "℞",
"color": "cat-sky",
"prompt": "What is this medicine mainly used for?",
"show": "name",
"showAs": "big",
"answer": "use",
"answerAs": "small"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each medicine with its class.",
"icon": "⇄",
"color": "cat-mint",
"clue": "cls",
"clueLabel": "Class"
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
"items": [
{
"name": "Lisinopril",
"alsoOk": ["Mild high blood pressure, often added to other tablets", "Fluid build-up and heart failure", "High blood pressure, often when ACE inhibitors cause a cough"],
"cat": "cardio",
"cls": "ACE inhibitor",
"use": "High blood pressure and heart failure",
"life": "Names ending in -pril are ACE inhibitors; a dry cough is a well-known side effect.",
"icon": "pharm-bp-gauge",
"num": 1,
"spot": [
"heart",
"vessels"
],
"facts": [
"ACE inhibitors stop the body making angiotensin II, a hormone that squeezes blood vessels.",
"The dry cough comes from a build-up of bradykinin; switching to an ARB (-sartan) usually fixes it.",
"Used for both high blood pressure and heart failure, so it sits in the heart and vessels group.",
"A rare but serious side effect is angioedema: swelling of the lips, tongue or face."
],
"summary": "An ACE inhibitor that relaxes blood vessels by blocking the angiotensin hormone system."
},
{
"name": "Losartan",
"alsoOk": ["High blood pressure and heart failure", "Mild high blood pressure, often added to other tablets"],
"cat": "cardio",
"cls": "ARB (angiotensin receptor blocker)",
"use": "High blood pressure, often when ACE inhibitors cause a cough",
"life": "Names ending in -sartan are ARBs, often used when an ACE inhibitor causes a cough.",
"icon": "pharm-heart-tablet",
"num": 2,
"spot": [
"heart",
"vessels"
],
"facts": [
"ARBs block the receptor for angiotensin II instead of stopping it being made.",
"Because they do not raise bradykinin, ARBs rarely cause the ACE inhibitor cough.",
"Tell -sartan (ARB) from -pril (ACE inhibitor): both lower blood pressure via angiotensin."
],
"summary": "An ARB that blocks angiotensin's receptor, lowering blood pressure without the ACE inhibitor cough."
},
{
"name": "Amlodipine",
"alsoOk": ["Mild high blood pressure, often added to other tablets"],
"cat": "cardio",
"cls": "Calcium channel blocker",
"use": "High blood pressure and angina",
"life": "It relaxes artery walls; swollen ankles are a common side effect.",
"icon": "pharm-vessel-wide",
"num": 3,
"spot": [
"heart",
"vessels"
],
"facts": [
"Blocks calcium entering the muscle of artery walls, so arteries relax and widen.",
"Names ending in -dipine are calcium channel blockers.",
"Relieves angina by widening vessels and easing the heart's workload.",
"Ankle swelling is from fluid leaking out of widened small vessels, not fluid overload."
],
"summary": "A calcium channel blocker that relaxes and widens arteries."
},
{
"name": "Metoprolol",
"alsoOk": ["High blood pressure and angina", "High blood pressure and heart failure", "Mild high blood pressure, often added to other tablets", "Heart failure and atrial fibrillation rate control", "Irregular heart rhythms such as atrial fibrillation"],
"cat": "cardio",
"cls": "Beta blocker",
"use": "Fast heart rate and high blood pressure",
"life": "Names ending in -olol are beta blockers; they slow the heart.",
"icon": "pharm-heart-slow",
"num": 4,
"spot": [
"heart",
"vessels"
],
"facts": [
"Blocks beta-1 receptors in the heart, slowing the rate and reducing the force of each beat.",
"Nurses usually check pulse and blood pressure before giving it.",
"Not stopped suddenly, because the heart rate can rebound.",
"Do not confuse with metformin, a diabetes tablet: -olol means beta blocker."
],
"summary": "A beta blocker that slows the heart and lowers its workload."
},
{
"name": "Atorvastatin",
"cat": "cardio",
"cls": "Statin",
"use": "High cholesterol",
"life": "Statins (-statin) lower LDL 'bad' cholesterol made by the liver.",
"icon": "pharm-plaque",
"num": 5,
"spot": [
"liver",
"vessels"
],
"facts": [
"Statins block HMG-CoA reductase, the liver enzyme that makes cholesterol.",
"They lower LDL cholesterol, which reduces the risk of heart attack and stroke.",
"Muscle aches are a side effect to report.",
"A statin treats cholesterol, not blood pressure, even though it is a heart medicine."
],
"summary": "A statin that cuts the liver's cholesterol production."
},
{
"name": "Furosemide",
"alsoOk": ["High blood pressure and heart failure"],
"cat": "cardio",
"cls": "Loop diuretic",
"use": "Fluid build-up and heart failure",
"life": "A strong 'water tablet' that makes you pass more urine.",
"icon": "pharm-loop",
"num": 6,
"spot": [
"kidneys",
"vessels"
],
"facts": [
"Works on the loop of Henle in the kidney, which is why it is called a loop diuretic.",
"The strongest common diuretic: used to clear fluid from lungs and legs in heart failure.",
"Can lower blood potassium, so potassium levels are checked.",
"Stronger than hydrochlorothiazide, which is a milder thiazide used for blood pressure."
],
"summary": "A strong loop diuretic that removes extra fluid through the kidneys."
},
{
"name": "Hydrochlorothiazide",
"alsoOk": ["High blood pressure and heart failure", "High blood pressure, often when ACE inhibitors cause a cough", "Fluid build-up and heart failure"],
"cat": "cardio",
"cls": "Thiazide diuretic",
"use": "Mild high blood pressure, often added to other tablets",
"life": "A milder water tablet often combined with other blood pressure medicines.",
"icon": "pharm-tablet-drop",
"num": 7,
"spot": [
"kidneys",
"vessels"
],
"facts": [
"A thiazide diuretic that acts on the distal tubule of the kidney.",
"Milder than furosemide, so it suits long-term blood pressure control rather than fluid emergencies.",
"Like loop diuretics, it can lower potassium."
],
"summary": "A mild thiazide diuretic used mainly to lower blood pressure."
},
{
"name": "Warfarin",
"alsoOk": ["Preventing stroke in atrial fibrillation", "Treating clots, and during heart surgery and dialysis", "Preventing DVT after surgery"],
"cat": "cardio",
"cls": "Vitamin K antagonist (anticoagulant)",
"use": "Preventing blood clots",
"life": "People on warfarin have regular blood tests (INR) and watch their vitamin K intake.",
"icon": "pharm-drop-thin",
"num": 8,
"spot": [
"heart",
"vessels"
],
"facts": [
"Blocks the liver's use of vitamin K to make clotting factors.",
"The INR blood test shows how long blood takes to clot; doses are adjusted to it.",
"The main risk is bleeding; vitamin K is its antidote.",
"Prevents clots in conditions such as atrial fibrillation and deep vein thrombosis."
],
"summary": "An anticoagulant that slows clotting by blocking vitamin K."
},
{
"name": "Apixaban",
"alsoOk": ["Preventing blood clots", "Treating clots, and during heart surgery and dialysis", "Preventing DVT after surgery"],
"cat": "cardio",
"cls": "Factor Xa inhibitor (DOAC)",
"use": "Preventing stroke in atrial fibrillation",
"life": "A twice-daily blood thinner tablet that needs no routine INR blood tests, unlike warfarin.",
"icon": "pharm-tablets",
"num": 26,
"spot": [
"heart",
"vessels"
],
"facts": [
"Blocks clotting factor Xa directly, so doses are fixed and no routine INR checks are needed.",
"Missed doses or stopping suddenly raise the risk of stroke and clots, so teach patients to take it every day.",
"Bleeding is the main risk. Andexanet alfa was withdrawn in the US in December 2025, so serious bleeding is now treated with prothrombin complex concentrate (PCC).",
"Rivaroxaban (-xaban) works the same way; its higher doses are taken with food."
],
"summary": "A direct oral anticoagulant (DOAC) that blocks clotting factor Xa."
},
{
"name": "Heparin",
"alsoOk": ["Preventing blood clots", "Preventing stroke in atrial fibrillation", "Preventing DVT after surgery"],
"cat": "cardio",
"cls": "Unfractionated heparin",
"use": "Treating clots, and during heart surgery and dialysis",
"life": "A fast-acting hospital blood thinner, given as an IV drip or an injection under the skin.",
"icon": "pharm-ivbag",
"num": 27,
"spot": [
"heart",
"vessels"
],
"facts": [
"Boosts antithrombin, the body's own clot blocker, so it works within minutes when given IV.",
"IV doses are adjusted to aPTT (or anti-Xa) blood tests by protocol.",
"Watch the platelet count: a sudden drop can mean heparin-induced thrombocytopenia (HIT).",
"Bleeding is the main risk; protamine sulfate is its antidote."
],
"summary": "An injected anticoagulant that acts fast and is adjusted to aPTT results."
},
{
"name": "Enoxaparin",
"alsoOk": ["Preventing blood clots", "Preventing stroke in atrial fibrillation", "Treating clots, and during heart surgery and dialysis"],
"cat": "cardio",
"cls": "Low molecular weight heparin",
"use": "Preventing DVT after surgery",
"life": "A once- or twice-daily injection under the skin of the belly to prevent clots after surgery.",
"icon": "pharm-syringe-im",
"num": 28,
"spot": [
"heart",
"vessels"
],
"facts": [
"A smaller form of heparin that mainly blocks factor Xa and lasts longer, so it can be given once or twice a day by injection under the skin.",
"Inject into the abdomen without expelling the air bubble in the prefilled syringe, and do not rub the site.",
"Routine clotting tests are not needed; anti-Xa levels may be checked in kidney disease, pregnancy or very high or low body weight.",
"Bleeding is the main risk, including a spinal haematoma after a spinal or epidural; protamine only partly reverses it."
],
"summary": "A low molecular weight heparin injected under the skin, mainly to prevent clots."
},
{
"name": "Digoxin",
"alsoOk": ["Irregular heart rhythms such as atrial fibrillation", "Fast heart rate and high blood pressure"],
"cat": "cardio",
"cls": "Cardiac glycoside",
"use": "Heart failure and atrial fibrillation rate control",
"life": "Nurses count the apical pulse for a full minute before every dose.",
"icon": "pharm-heart-alert",
"num": 29,
"spot": [
"heart",
"vessels"
],
"facts": [
"Makes each heartbeat stronger and slows the heart rate.",
"Count the apical pulse for one full minute and hold the dose if it is under 60 in an adult, then report it.",
"Toxicity is more likely with low potassium; signs include nausea, yellow-green halos around lights and new rhythm problems.",
"Digoxin immune fab is the antidote for serious toxicity."
],
"summary": "A cardiac glycoside that strengthens and slows the heartbeat."
},
{
"name": "Nitroglycerin",
"alsoOk": ["High blood pressure and angina"],
"cat": "cardio",
"cls": "Nitrate vasodilator",
"use": "Quick relief of angina chest pain",
"life": "A tablet or spray under the tongue that eases angina within minutes.",
"icon": "heart",
"num": 30,
"spot": [
"heart",
"vessels"
],
"facts": [
"Releases nitric oxide, which widens veins and arteries and cuts the heart's oxygen demand.",
"For chest pain: one dose under the tongue every 5 minutes, up to 3 doses; call 911 if the pain is not better 5 minutes after the first.",
"Check blood pressure; headache and dizziness are common, so the patient should sit or lie down.",
"Never used with sildenafil or tadalafil (PDE-5 inhibitors), as blood pressure can fall dangerously."
],
"summary": "A nitrate that widens blood vessels to relieve angina fast."
},
{
"name": "Amiodarone",
"alsoOk": ["Heart failure and atrial fibrillation rate control", "Fast heart rate and high blood pressure"],
"cat": "cardio",
"cls": "Class III antiarrhythmic",
"use": "Irregular heart rhythms such as atrial fibrillation",
"life": "A strong rhythm medicine; people on it long term have regular lung, thyroid, liver and eye checks.",
"icon": "pharm-heart-fast",
"num": 31,
"spot": [
"heart",
"vessels"
],
"facts": [
"Blocks potassium channels so heart cells take longer to reset, calming fast or irregular rhythms.",
"Monitor the ECG for a slow heart rate or a long QT interval, and check blood pressure.",
"Boxed warning: it can harm the lungs and liver and can cause new rhythm problems, so it is kept for serious or life-threatening rhythms. Long-term use can also affect the thyroid and eyes; teach patients to report a new cough or breathlessness.",
"Skin burns easily in the sun, so sunscreen and covered skin help. It raises warfarin and digoxin levels, so their doses are often lowered."
],
"summary": "A class III antiarrhythmic for serious fast or irregular heart rhythms."
},
{
"name": "Albuterol (salbutamol)",
"cat": "resp",
"cls": "Short-acting bronchodilator",
"use": "Quick relief of asthma attacks",
"life": "The blue 'reliever' inhaler opens the airways within minutes.",
"icon": "pharm-inhaler",
"num": 9,
"spot": [
"lungs",
"airways"
],
"facts": [
"A beta-2 agonist: it switches on receptors that relax airway muscle.",
"Albuterol is the US name; salbutamol is the UK name for the same drug.",
"Shaky hands and a fast heartbeat are common short-lived side effects.",
"Current asthma guidelines (GINA) advise against a short-acting reliever such as albuterol on its own: adults, teenagers and children aged 6 and over also need an inhaled steroid, and many adults now use one steroid-formoterol inhaler as their reliever."
],
"summary": "A fast-acting reliever inhaler that relaxes tight airways."
},
{
"name": "Fluticasone",
"alsoOk": ["Daily COPD maintenance"],
"cat": "resp",
"cls": "Inhaled corticosteroid",
"use": "Preventing asthma attacks (inhaled preventer)",
"life": "A 'preventer' inhaler used every day to calm airway inflammation.",
"icon": "pharm-diskus",
"num": 10,
"spot": [
"lungs",
"airways"
],
"facts": [
"A corticosteroid breathed straight into the lungs, so little reaches the rest of the body.",
"Works over days to weeks; it will not stop an attack in progress.",
"Rinsing the mouth afterwards helps prevent oral thrush and a hoarse voice."
],
"summary": "An inhaled steroid preventer that calms airway inflammation when used daily."
},
{
"name": "Montelukast",
"cat": "resp",
"cls": "Leukotriene receptor antagonist",
"use": "Asthma, as a daily add-on tablet",
"life": "A tablet that reduces airway swelling caused by leukotrienes.",
"icon": "lungs",
"num": 11,
"spot": [
"lungs",
"airways"
],
"facts": [
"Leukotrienes are inflammatory chemicals that tighten airways and add mucus.",
"Taken as a tablet, unlike most asthma medicines, which are inhaled.",
"Used as an add-on to a preventer, not as a reliever for attacks.",
"Boxed warning (FDA, 2020): report mood changes, agitation, vivid dreams or suicidal thoughts straight away."
],
"summary": "A daily asthma tablet that blocks leukotrienes."
},
{
"name": "Cetirizine",
"cat": "resp",
"cls": "Antihistamine",
"use": "Hay fever, hives and itchy allergies",
"life": "A common over-the-counter hay fever tablet.",
"icon": "pharm-flower",
"num": 12,
"spot": [
"lungs",
"airways"
],
"facts": [
"Blocks H1 histamine receptors, stopping sneezing, itching, runny nose and hives.",
"A newer antihistamine, so it causes less drowsiness than older ones like diphenhydramine.",
"Grouped with breathing and allergy medicines, not with digestion despite also blocking histamine.",
"Famotidine blocks H2 receptors in the stomach; cetirizine blocks H1 receptors elsewhere."
],
"summary": "An antihistamine that blocks histamine to ease allergy symptoms."
},
{
"name": "Tiotropium",
"alsoOk": ["Preventing asthma attacks (inhaled preventer)"],
"cat": "resp",
"cls": "Long-acting anticholinergic bronchodilator",
"use": "Daily COPD maintenance",
"life": "A once-a-day inhaler that keeps airways open in COPD.",
"icon": "pharm-bronchus-open",
"num": 32,
"spot": [
"lungs",
"airways"
],
"facts": [
"Blocks acetylcholine (muscarinic) receptors in the airways, so the muscles stay relaxed for about 24 hours.",
"Used once a day for COPD; it is not a rescue inhaler for sudden breathlessness.",
"Dry mouth is common; report eye pain, blurred vision or trouble passing urine (take care in glaucoma and an enlarged prostate).",
"With the capsule device, the capsule is pierced inside the inhaler and never swallowed."
],
"summary": "A long-acting anticholinergic inhaler for daily COPD control."
},
{
"name": "Omeprazole",
"alsoOk": ["Occasional heartburn and indigestion"],
"cat": "gi",
"cls": "Proton pump inhibitor",
"use": "Stomach ulcers and severe reflux",
"life": "Names ending in -prazole cut stomach acid production.",
"icon": "stomach",
"num": 13,
"spot": "stomach",
"facts": [
"Blocks the proton pump, the last step in making stomach acid, so it is very strong.",
"Usually taken before breakfast, as it works best before a meal.",
"Used for ulcers, severe reflux, and to protect the stomach alongside some other drugs.",
"Stronger than famotidine (-tidine), which is an H2 blocker."
],
"summary": "A proton pump inhibitor, the strongest common type of acid reducer."
},
{
"name": "Famotidine",
"alsoOk": ["Stomach ulcers and severe reflux"],
"cat": "gi",
"cls": "H2 blocker",
"use": "Occasional heartburn and indigestion",
"life": "Names ending in -tidine reduce acid by blocking histamine in the stomach.",
"icon": "flame",
"num": 14,
"spot": "stomach",
"facts": [
"H2 blockers stop histamine telling stomach cells to release acid.",
"Milder and shorter-acting than proton pump inhibitors.",
"Suits occasional heartburn rather than healing severe ulcers."
],
"summary": "An H2 blocker, a milder acid reducer for occasional heartburn."
},
{
"name": "Ondansetron",
"cat": "gi",
"cls": "Antiemetic",
"use": "Nausea and vomiting",
"life": "Often given to stop sickness after surgery or chemotherapy.",
"icon": "pharm-nausea",
"num": 15,
"spot": [
"stomach",
"intestines"
],
"facts": [
"Blocks serotonin (5-HT3) receptors in the gut and brain that trigger vomiting.",
"Commonly given for nausea after surgery and during chemotherapy.",
"Constipation and headache are common side effects."
],
"summary": "An antiemetic that blocks the signals that trigger vomiting."
},
{
"name": "Loperamide",
"cat": "gi",
"cls": "Antidiarrhoeal",
"use": "Diarrhoea",
"life": "It slows the gut down; a common travel first-aid tablet.",
"icon": "pharm-snail",
"num": 16,
"spot": "intestines",
"facts": [
"Acts on opioid receptors in the gut wall but does not reach the brain at normal doses.",
"Slows gut movement, giving more time to absorb water, so stools firm up.",
"Opposite of senna: loperamide slows the bowel, senna speeds it up."
],
"summary": "An antidiarrhoeal that slows the gut."
},
{
"name": "Senna",
"cat": "gi",
"cls": "Stimulant laxative",
"use": "Constipation",
"life": "A plant-based laxative that makes the bowel muscles push.",
"icon": "leaf",
"num": 17,
"spot": "intestines",
"facts": [
"Irritates the bowel lining to make its muscles contract and move stool along.",
"Usually taken at night and works in about 6 to 12 hours.",
"Plant-based; its active parts are called sennosides."
],
"summary": "A stimulant laxative that makes the bowel push."
},
{
"name": "Sertraline",
"alsoOk": ["Anxiety and seizures"],
"cat": "cns",
"cls": "SSRI antidepressant",
"use": "Depression and anxiety",
"life": "SSRIs raise serotonin levels; they take a few weeks to work fully.",
"icon": "brain",
"num": 18,
"spot": "brain",
"facts": [
"SSRI = selective serotonin reuptake inhibitor: it stops nerve cells taking serotonin back up.",
"Full benefit usually takes several weeks; early side effects include nausea.",
"Taken daily for depression and anxiety, unlike lorazepam, which is fast and short-term."
],
"summary": "An SSRI antidepressant that keeps more serotonin available between nerve cells."
},
{
"name": "Lorazepam",
"alsoOk": ["Depression and anxiety", "Epilepsy", "Broad-spectrum antiseizure medicine", "Tonic-clonic and focal seizures"],
"cat": "cns",
"cls": "Benzodiazepine",
"use": "Anxiety and seizures",
"life": "Names ending in -azepam calm the nervous system; they can be habit-forming.",
"icon": "moon",
"num": 19,
"spot": "brain",
"facts": [
"Benzodiazepines boost GABA, the brain's main calming messenger.",
"Works fast, so it is used for acute anxiety and to stop prolonged seizures.",
"Drowsiness and slowed breathing are risks, especially with alcohol or opioids.",
"Can cause dependence, so it is usually used short-term."
],
"summary": "A fast-acting benzodiazepine that calms the brain by boosting GABA."
},
{
"name": "Levetiracetam",
"alsoOk": ["Anxiety and seizures", "Tonic-clonic and focal seizures"],
"cat": "cns",
"cls": "Broad-spectrum antiseizure medicine",
"use": "Epilepsy",
"life": "Taken every day to prevent seizures.",
"icon": "bolt",
"num": 20,
"spot": "brain",
"facts": [
"Calms overactive nerve signalling so seizures are less likely.",
"Taken every day to prevent seizures, not only when one happens.",
"Not stopped suddenly, as this can trigger seizures.",
"An antiseizure medicine; lorazepam is used to stop a seizure that is already happening."
],
"summary": "A daily antiseizure medicine for epilepsy."
},
{
"name": "Donepezil",
"cat": "cns",
"cls": "Cholinesterase inhibitor",
"use": "Alzheimer's disease",
"life": "It boosts acetylcholine to support memory for a while.",
"icon": "pharm-thought",
"num": 21,
"spot": "brain",
"facts": [
"Blocks acetylcholinesterase, the enzyme that breaks down acetylcholine.",
"More acetylcholine helps memory and thinking in Alzheimer's disease.",
"Slows symptoms for a time; it does not stop the disease.",
"Nausea and a slow heart rate are possible side effects."
],
"summary": "A cholinesterase inhibitor that raises acetylcholine to ease Alzheimer's symptoms."
},
{
"name": "Haloperidol",
"alsoOk": ["Schizophrenia and bipolar disorder", "Bipolar disorder"],
"cat": "cns",
"cls": "First-generation antipsychotic",
"use": "Schizophrenia and severe agitation",
"life": "An older antipsychotic, used as tablets or injections for psychosis and severe agitation.",
"icon": "pharm-antagonist",
"num": 33,
"spot": "brain",
"facts": [
"Blocks dopamine (D2) receptors in the brain, easing hallucinations and agitation.",
"Watch for movement side effects: muscle spasms, restlessness, stiffness and, with long use, tardive dyskinesia.",
"High fever, rigid muscles and confusion may be neuroleptic malignant syndrome: hold the drug and report at once.",
"Can lengthen the QT interval, especially when given IV, so the ECG may be monitored."
],
"summary": "A first-generation antipsychotic that blocks dopamine."
},
{
"name": "Quetiapine",
"alsoOk": ["Schizophrenia and severe agitation", "Bipolar disorder"],
"cat": "cns",
"cls": "Second-generation antipsychotic",
"use": "Schizophrenia and bipolar disorder",
"life": "A newer antipsychotic, often taken at night because it makes people sleepy.",
"icon": "pharm-sleepy-face",
"num": 34,
"spot": "brain",
"facts": [
"Blocks dopamine and serotonin receptors; it causes fewer movement side effects than haloperidol.",
"Sleepiness and dizziness on standing up (orthostatic hypotension) are common, especially at first.",
"Can raise weight, blood sugar and cholesterol, so these are checked regularly.",
"Boxed warnings: a higher risk of death in older adults with dementia-related psychosis, and of suicidal thoughts in children and young adults."
],
"summary": "A second-generation antipsychotic for schizophrenia and bipolar disorder."
},
{
"name": "Lithium",
"cat": "cns",
"cls": "Mood stabiliser",
"use": "Bipolar disorder",
"life": "People on lithium have regular blood tests and keep their fluid and salt intake steady.",
"icon": "pharm-range",
"num": 35,
"spot": "brain",
"facts": [
"Steadies mood in bipolar disorder and lowers the risk of suicide; exactly how it works is not fully known.",
"Narrow therapeutic range of about 0.6 to 1.2 mEq/L; levels are drawn about 12 hours after the last dose.",
"Toxicity signs: vomiting, diarrhoea, a coarse tremor, unsteadiness and confusion. There is no antidote; severe cases need dialysis.",
"Dehydration, a low-salt diet, NSAIDs, ACE inhibitors and thiazide diuretics raise levels; kidney and thyroid tests are checked."
],
"summary": "A mood stabiliser for bipolar disorder with a narrow safe range."
},
{
"name": "Phenytoin",
"alsoOk": ["Epilepsy"],
"cat": "cns",
"cls": "Hydantoin antiseizure medicine",
"use": "Tonic-clonic and focal seizures",
"life": "An older seizure medicine with a narrow safe range, checked by blood levels.",
"icon": "pharm-head-bolt",
"num": 36,
"spot": "brain",
"facts": [
"Blocks sodium channels so nerve cells cannot fire in rapid bursts.",
"Narrow range (total level about 10 to 20 mcg/mL); jerky eye movements (nystagmus), unsteadiness and slurred speech suggest the level is too high.",
"Can cause gum overgrowth, so good mouth care and dental visits matter.",
"IV: give slowly (no faster than 50 mg a minute), with normal saline only, while watching the ECG and blood pressure."
],
"summary": "A hydantoin antiseizure medicine with a narrow therapeutic range."
},
{
"name": "Morphine",
"cat": "cns",
"cls": "Opioid agonist analgesic",
"use": "Severe pain",
"life": "A strong pain medicine; nurses check breathing and sleepiness before and after each dose.",
"icon": "pharm-poppy-pod",
"num": 37,
"spot": "brain",
"facts": [
"Switches on mu opioid receptors in the brain and spinal cord to block pain signals.",
"Check breathing rate and sedation level before and after doses; hold and report if breathing is under 12 a minute.",
"Sleepiness usually comes before slowed breathing, so a patient who is hard to wake is a warning sign.",
"Constipation is expected, so a laxative is usually given with it; naloxone reverses an overdose."
],
"summary": "An opioid agonist for severe pain that can slow breathing."
},
{
"name": "Naloxone",
"cat": "cns",
"cls": "Opioid antagonist",
"use": "Reversing an opioid overdose",
"life": "A nasal spray anyone can carry and use to reverse an opioid overdose.",
"icon": "pharm-nasal-spray",
"num": 38,
"spot": "brain",
"facts": [
"Pushes opioids off their receptors, quickly reversing slowed breathing and sleepiness.",
"Given as a nasal spray or by IV, IM or subcutaneous injection; repeat every 2 to 3 minutes if needed.",
"Its effect can wear off before the opioid's, so keep watching breathing after the person wakes.",
"Can cause sudden opioid withdrawal: pain, agitation, sweating and vomiting."
],
"summary": "An opioid antagonist that reverses an opioid overdose."
},
{
"name": "Buprenorphine",
"alsoOk": ["Severe pain", "Opioid agonist analgesic"],
"cat": "cns",
"cls": "Partial opioid agonist",
"use": "Opioid use disorder",
"life": "A film or tablet under the tongue, often combined with naloxone, to treat opioid addiction.",
"icon": "pharm-agonist",
"num": 39,
"spot": "brain",
"facts": [
"Partly switches on opioid receptors: it eases cravings and withdrawal, with a ceiling on how much it slows breathing.",
"Started only once withdrawal symptoms have begun (often scored with COWS), or it can trigger sudden withdrawal.",
"The film or tablet dissolves under the tongue; it is not chewed or swallowed.",
"Often combined with naloxone to discourage injecting; since 2023, US prescribers no longer need a special waiver."
],
"summary": "A partial opioid agonist used to treat opioid use disorder."
},
{
"name": "Metformin",
"alsoOk": ["Diabetes that needs insulin (type 1 or type 2)"],
"cat": "endo",
"cls": "Biguanide",
"use": "Type 2 diabetes",
"life": "Often the first tablet for type 2 diabetes; it lowers sugar made by the liver.",
"icon": "pharm-glucometer",
"num": 22,
"spot": "liver",
"spotCaption": "Acts mainly on the liver",
"facts": [
"Reduces glucose made by the liver and helps the body respond better to insulin.",
"Rarely causes low blood sugar when used alone.",
"Stomach upset is common; taking it with food helps.",
"Do not confuse with metoprolol: metformin is for diabetes, metoprolol is a beta blocker."
],
"summary": "A biguanide tablet, often the first choice for type 2 diabetes."
},
{
"name": "Insulin glargine",
"alsoOk": ["Type 2 diabetes"],
"cat": "endo",
"cls": "Long-acting insulin",
"use": "Diabetes that needs insulin (type 1 or type 2)",
"life": "A once-a-day 'background' insulin injection.",
"icon": "pharm-insulin-pen",
"num": 23,
"spot": "pancreas",
"spotCaption": "Replaces insulin from the pancreas",
"facts": [
"Releases slowly over about 24 hours, giving a steady background level of insulin.",
"Usually given once a day by injection under the skin.",
"Often combined with a rapid-acting insulin at mealtimes.",
"The main risk with any insulin is low blood sugar (hypoglycaemia)."
],
"summary": "A long-acting background insulin injected once a day."
},
{
"name": "Levothyroxine",
"cat": "endo",
"cls": "Thyroid hormone replacement",
"use": "Underactive thyroid",
"life": "A daily tablet that replaces missing thyroxine (T4).",
"icon": "pharm-thyroid",
"num": 24,
"spot": "thyroid",
"spotCaption": "Replaces the thyroid hormone T4",
"facts": [
"A man-made copy of thyroxine (T4), the hormone an underactive thyroid lacks.",
"Usually taken in the morning on an empty stomach for steady absorption.",
"Doses are adjusted using TSH blood tests.",
"Too much causes signs of an overactive thyroid, such as a fast heart and weight loss."
],
"summary": "Replacement thyroid hormone (T4) for an underactive thyroid."
},
{
"name": "Prednisone",
"cat": "endo",
"cls": "Oral corticosteroid",
"use": "Inflammation and immune conditions",
"life": "A steroid tablet that copies cortisol; doses are reduced slowly, not stopped suddenly.",
"icon": "pharm-taper",
"num": 25,
"spot": "adrenals",
"spotCaption": "Copies cortisol from the adrenal glands",
"facts": [
"Copies cortisol, the body's own steroid hormone, to reduce inflammation and immune activity.",
"Used for asthma flares, arthritis, allergic reactions and autoimmune conditions.",
"Long courses can raise blood sugar, thin bones and increase infection risk.",
"Swallowed tablet, unlike fluticasone, which is an inhaled corticosteroid."
],
"summary": "An oral corticosteroid that copies cortisol to reduce inflammation."
},
{
"name": "Insulin lispro",
"alsoOk": ["Diabetes that needs insulin (type 1 or type 2)", "Type 2 diabetes"],
"cat": "endo",
"cls": "Rapid-acting insulin",
"use": "Mealtime blood sugar control",
"life": "A mealtime insulin injected just before eating.",
"icon": "pharm-vial",
"num": 40,
"spot": "pancreas",
"spotCaption": "Replaces mealtime insulin from the pancreas",
"facts": [
"Starts working in about 15 minutes, so it is given within 15 minutes before a meal (or just after).",
"Check blood sugar first and make sure the meal is there before giving it.",
"Low blood sugar (hypoglycaemia) is the main risk: shakiness, sweating and confusion.",
"Usually paired with a long-acting background insulin such as glargine."
],
"summary": "A rapid-acting insulin that covers the rise in blood sugar after meals."
},
{
"name": "Glipizide",
"alsoOk": ["Type 2 diabetes"],
"cat": "endo",
"cls": "Sulfonylurea",
"use": "Type 2 diabetes, by boosting insulin release",
"life": "A diabetes tablet taken before breakfast; skipping meals can cause low blood sugar.",
"icon": "pill",
"num": 41,
"spot": "pancreas",
"spotCaption": "Makes the pancreas release more insulin",
"facts": [
"Makes beta cells in the pancreas release more insulin, so it only works if the pancreas still makes some.",
"Taken about 30 minutes before breakfast; meals should not be skipped.",
"Low blood sugar is the main risk, especially in older adults or with alcohol.",
"Not used for type 1 diabetes."
],
"summary": "A sulfonylurea tablet that pushes the pancreas to release insulin."
},
{
"name": "Empagliflozin",
"alsoOk": ["Type 2 diabetes", "Diabetes that needs insulin (type 1 or type 2)"],
"cat": "endo",
"cls": "SGLT2 inhibitor",
"use": "Type 2 diabetes, heart failure and kidney disease",
"life": "A daily tablet that lowers blood sugar by passing extra sugar out in the urine.",
"icon": "pharm-kidney-out",
"num": 42,
"spot": "kidneys",
"spotCaption": "Passes extra sugar out through the kidneys",
"facts": [
"Stops the kidneys taking glucose back into the blood, so extra sugar leaves in the urine (-gliflozin).",
"Also lowers the risk of heart failure admissions and slows kidney disease, even in people without diabetes.",
"Genital yeast infections, urinary tract infections and dehydration are common side effects.",
"Rarely causes ketoacidosis with near-normal blood sugar; it is paused during illness with vomiting and about 3 days before planned surgery."
],
"summary": "An SGLT2 inhibitor that removes sugar through the kidneys and protects the heart and kidneys."
},
{
"name": "Semaglutide",
"alsoOk": ["Type 2 diabetes", "Type 2 diabetes, by boosting insulin release", "Type 2 diabetes, heart failure and kidney disease", "Diabetes that needs insulin (type 1 or type 2)"],
"cat": "endo",
"cls": "GLP-1 receptor agonist",
"use": "Type 2 diabetes and obesity",
"life": "A once-a-week injection for diabetes or weight loss that reduces appetite.",
"icon": "pharm-weight",
"num": 43,
"spot": "pancreas",
"spotCaption": "Boosts insulin from the pancreas after meals",
"facts": [
"Copies GLP-1, a gut hormone: it boosts insulin after meals, slows stomach emptying and reduces appetite (-glutide).",
"Injected once a week; there is also a daily tablet form.",
"Nausea, vomiting and diarrhoea are common, especially when the dose goes up; report severe stomach pain (possible pancreatitis).",
"Boxed warning: thyroid C-cell tumours were seen in rodents, so it is not used with a personal or family history of medullary thyroid cancer or MEN 2; teach patients to report a neck lump, hoarseness or trouble swallowing."
],
"summary": "A GLP-1 receptor agonist for type 2 diabetes and weight loss."
}
],
"exam": [
{
"id": "dcs-x1",
"cat": "cardio",
"kind": "sata",
"stem": "A patient with a new deep vein thrombosis is started on a continuous IV heparin infusion.",
"q": "Which actions should the nurse take? Select all that apply.",
"options": [
"Adjust the rate by protocol using aPTT or anti-Xa results",
"Watch the platelet count for a sudden drop",
"Teach the patient to report bleeding gums or dark stools",
"Use the INR result to decide the infusion rate",
"Give vitamin K if the aPTT is above the target range"
],
"answer": [0, 1, 2],
"why": "Heparin infusions are adjusted to aPTT or anti-Xa results by protocol, and a sudden fall in platelets can mean heparin-induced thrombocytopenia (HIT). Patients should report any signs of bleeding. The INR guides warfarin, and vitamin K reverses warfarin; protamine sulfate is the antidote for heparin."
},
{
"id": "dcs-x2",
"cat": "cardio",
"kind": "sata",
"stem": "A patient with heart failure takes digoxin and furosemide. The apical pulse is 64 a minute, potassium is 3.1 mEq/L, and the patient reports nausea and yellow halos around lights.",
"q": "Which actions should the nurse take? Select all that apply.",
"options": [
"Hold the digoxin and notify the provider",
"Expect an order for a serum digoxin level",
"Report the low potassium level to the provider",
"Give the digoxin, as the apical pulse is above 60",
"Give the digoxin with an antiemetic for the nausea"
],
"answer": [0, 1, 2],
"why": "Nausea and yellow-green halos are classic signs of digoxin toxicity, and low potassium (here likely from furosemide) makes toxicity more likely, so the dose is held, a level is checked and the provider is told. A pulse above 60 does not make the dose safe when toxicity signs are present, and treating only the nausea misses the cause. Digoxin immune fab is the antidote for severe toxicity."
},
{
"id": "dcs-x3",
"cat": "cns",
"kind": "sata",
"stem": "A patient with bipolar disorder is starting lithium.",
"q": "Which points should the nurse include in the teaching? Select all that apply.",
"options": [
"Drink about 2 to 3 L of fluid a day and keep salt intake steady",
"Have blood levels checked about 12 hours after a dose",
"Report vomiting, diarrhoea, a coarse tremor or confusion",
"Check with the provider before starting a new water tablet",
"Ibuprofen is a good choice for headaches while on lithium",
"Cut down on salt to lower the risk of side effects"
],
"answer": [0, 1, 2, 3],
"why": "Lithium has a narrow range (about 0.6 to 1.2 mEq/L), so levels are drawn about 12 hours after a dose and early signs of toxicity are reported. Dehydration and a low salt intake make the kidneys hold on to lithium, so fluid and salt stay steady. Thiazide water tablets and NSAIDs such as ibuprofen raise lithium levels."
},
{
"id": "dcs-x4",
"cat": "endo",
"kind": "sata",
"stem": "A patient with type 2 diabetes and heart failure is starting empagliflozin.",
"q": "Which points should the nurse include in the teaching? Select all that apply.",
"options": [
"Keep the genital area clean and report itching or discharge",
"Report burning or pain when passing urine",
"Ask about pausing it if you are ill and cannot eat or drink",
"Tell the surgical team about it before a planned operation",
"Expect your weight to go up in the first few weeks",
"Eat a carbohydrate snack with each dose to prevent lows"
],
"answer": [0, 1, 2, 3],
"why": "Sugar in the urine raises the risk of genital yeast infections and urinary tract infections. Empagliflozin can rarely cause ketoacidosis with near-normal blood sugar, so it is paused during illness with poor intake and about 3 days before planned surgery. On its own it rarely causes low blood sugar, and it usually causes mild weight loss, not gain."
},
{
"id": "dcs-x5",
"cat": "cns",
"kind": "sata",
"stem": "A patient taking haloperidol develops a temperature of 39.8 °C (103.6 °F), rigid muscles, heavy sweating, a fast heart rate and new confusion.",
"q": "Which actions should the nurse take? Select all that apply.",
"options": [
"Hold the next dose of haloperidol",
"Notify the provider straight away",
"Start cooling measures and check vital signs often",
"Give a PRN dose of haloperidol for the confusion",
"Give acetaminophen and recheck the temperature in 4 hours"
],
"answer": [0, 1, 2],
"why": "Fever, rigid muscles, sweating, a fast pulse and confusion suggest neuroleptic malignant syndrome, a medical emergency. The antipsychotic is stopped, the provider is told at once, and the patient is cooled and closely monitored. More haloperidol would make it worse, and waiting 4 hours delays urgent care."
},
{
"id": "dcs-x6",
"cat": "cns",
"kind": "first",
"stem": "A patient using a morphine PCA after surgery is hard to wake. Respirations are 6 a minute and shallow, SpO2 is 84% and the pupils are pinpoint. The nurse has stopped the PCA and called for help. Naloxone is ordered as needed.",
"q": "What should the nurse do first?",
"options": [
"Open the airway and give breaths with a bag-valve mask",
"Give naloxone IV as ordered and watch the response",
"Notify the surgeon of the change in condition",
"Check the PCA history for the doses given"
],
"answer": 0,
"why": "Airway and breathing come first: with breathing at 6 a minute and low oxygen, the nurse opens the airway and gives breaths with a bag-valve mask and oxygen straight away, as resuscitation guidelines advise for an opioid overdose. Naloxone does not replace breathing support and takes time to draw up and work, so it is given next, often in small repeated IV doses after surgery. Then the surgeon is told and the PCA record is reviewed."
},
{
"id": "dcs-x7",
"cat": "cardio",
"kind": "first",
"stem": "The nurse receives report on four patients who take anticoagulants.",
"q": "Which patient should the nurse see first?",
"options": [
"A patient on apixaban with a sudden severe headache and slurred speech",
"A patient on enoxaparin with a small bruise at the injection site",
"A patient on warfarin for atrial fibrillation with an INR of 2.6",
"A patient on a heparin infusion whose aPTT needs a rate change"
],
"answer": 0,
"why": "Unstable over stable: a sudden severe headache and slurred speech in a patient on an anticoagulant may mean bleeding in the brain, an emergency. A small bruise at an enoxaparin site is expected, an INR of 2.6 is within the usual 2 to 3 target, and a protocol rate change for heparin can follow straight after."
},
{
"id": "dcs-x8",
"cat": "endo",
"kind": "first",
"stem": "A patient with type 1 diabetes is due insulin lispro with lunch. Blood glucose is 62 mg/dL (3.4 mmol/L). The patient is alert, shaky and sweaty, and the lunch tray is 20 minutes away.",
"q": "What should the nurse do first?",
"options": [
"Give 15 g of fast-acting carbohydrate, such as juice",
"Hold the lispro dose and inform the provider",
"Recheck the blood glucose in 15 minutes",
"Record the reading and the symptoms"
],
"answer": 0,
"why": "Treat the immediate danger first: the patient is alert and can swallow, so the rule of 15 starts with 15 g of fast-acting carbohydrate. The glucose is rechecked 15 minutes later, the lispro dose is held and discussed with the provider, and the event is documented."
}
],
"note": "For learning only. Not medical advice: always follow your doctor or pharmacist.",
"diagram": "body",
"diagramCaption": "Where it acts",
"notes": {
"intro": "Every medicine has a generic name, a drug class and a main job. Medicines in the same class work in the same way, so if you know the class you can usually guess what the drug treats and its classic side effects. Many generic names carry a family ending (-pril, -sartan, -olol, -statin, -prazole, -tidine, -azepam) that gives the class away. The games ask three things about each medicine: its class, what it is mainly used for, and which body system it treats.",
"sections": [
{
"cat": "cardio",
"title": "Heart and blood vessels",
"about": "These medicines lower blood pressure, control heart rate, remove extra fluid, lower cholesterol or prevent clots. Blood pressure can be lowered in several ways: blocking the angiotensin hormone system (ACE inhibitors and ARBs), relaxing artery walls (calcium channel blockers), slowing the heart (beta blockers) or making the kidneys pass more water (diuretics). Statins work on cholesterol, not pressure. Anticoagulants such as warfarin stop clots forming; they do not dissolve clots that are already there. Heparin and enoxaparin are injected anticoagulants (heparin is adjusted to aPTT and reversed with protamine), and apixaban (-xaban) is a tablet that blocks factor Xa without routine blood tests. Digoxin strengthens and slows the heartbeat (count the apical pulse first), amiodarone calms irregular rhythms, and nitroglycerin widens vessels to ease angina within minutes. The name ending is the fastest way to tell the classes apart.",
"points": [
"-pril = ACE inhibitor; -sartan = ARB; -olol = beta blocker; -dipine = calcium channel blocker; -statin = statin.",
"Loop diuretic (furosemide) is strong and used for fluid overload; thiazide (hydrochlorothiazide) is milder and used for blood pressure.",
"ACE inhibitor cough is the classic reason to switch to an ARB.",
"Warfarin is monitored with the INR blood test; vitamin K reverses its effect."
],
"tip": "Pril, sartan, olol, dipine: four routes to the same goal of a lower blood pressure."
},
{
"cat": "resp",
"title": "Breathing and allergy",
"about": "Asthma medicines are split into relievers and preventers. A reliever (short-acting bronchodilator such as albuterol) opens tight airways within minutes during an attack. A preventer (inhaled corticosteroid such as fluticasone) is used every day to calm the swelling and inflammation that make attacks likely, and does not help an attack already happening. Current guidelines (GINA, since 2019) no longer recommend a short-acting reliever on its own: adults, teenagers and children aged 6 and over should also have an inhaled steroid, and many adults now use a single steroid-formoterol inhaler as both reliever and preventer. Montelukast is a tablet add-on that blocks leukotrienes, inflammatory messengers that narrow airways. Antihistamines such as cetirizine block histamine, the chemical behind sneezing, itching and hives. Tiotropium is a long-acting anticholinergic inhaler used once a day in COPD; like a preventer, it does not rescue a sudden attack.",
"points": [
"Reliever = quick, used when needed; preventer = slow, used daily; a short-acting reliever alone is no longer advised.",
"Rinse the mouth after an inhaled steroid to reduce the risk of oral thrush.",
"Newer antihistamines like cetirizine cause much less drowsiness than older ones."
],
"tip": "Blue reliever = rescue now; preventer = protection every day."
},
{
"cat": "gi",
"title": "Digestion",
"about": "Digestion medicines either reduce stomach acid, stop sickness, or change how fast the bowel moves. Proton pump inhibitors (-prazole) block the final pump that makes acid, so they are the strongest acid reducers and are used for ulcers and severe reflux. H2 blockers (-tidine) block histamine's signal to acid cells; they are milder and suit occasional heartburn. Ondansetron stops nausea and vomiting. Loperamide slows the gut for diarrhoea, while senna speeds it up for constipation, so they are opposites.",
"points": [
"-prazole (PPI) is stronger than -tidine (H2 blocker); both lower acid.",
"Loperamide = slows the gut; senna = makes the gut push. Opposite jobs.",
"Ondansetron blocks serotonin (5-HT3) signals that trigger vomiting."
],
"tip": "Prazole pumps the brakes on acid; tidine just turns the tap down."
},
{
"cat": "cns",
"title": "Brain and nerves",
"about": "These medicines change brain chemistry to treat mood, anxiety, psychosis, seizures, memory loss or pain. SSRIs such as sertraline raise serotonin by stopping its reuptake, and take a few weeks to work fully. Benzodiazepines (-azepam, -azolam) boost GABA, the brain's calming messenger, so they act fast for anxiety and seizures but can cause dependence. Antiseizure medicines such as levetiracetam are taken daily to prevent epileptic seizures. Cholinesterase inhibitors such as donepezil stop acetylcholine being broken down, which supports memory in Alzheimer's disease for a time. Antipsychotics block dopamine: older ones such as haloperidol cause more movement side effects, and newer ones such as quetiapine cause more weight gain and raised blood sugar. Lithium (range about 0.6 to 1.2 mEq/L) and phenytoin (about 10 to 20 mcg/mL) both have a narrow safe range, so their blood levels are checked. Opioids such as morphine relieve severe pain but can slow breathing; naloxone reverses an overdose, and buprenorphine, a partial agonist, treats opioid use disorder.",
"points": [
"SSRI = slow, long-term mood treatment; benzodiazepine = fast, short-term calming.",
"Benzodiazepines are not stopped suddenly after regular use because of withdrawal risk.",
"Donepezil does not cure Alzheimer's; it eases symptoms for a while."
],
"tip": "SSRI = Serotonin Stays Around; benzo = brakes on the brain."
},
{
"cat": "endo",
"title": "Hormones and diabetes",
"about": "Hormone medicines either replace a hormone the body lacks or copy one to get a strong effect. Metformin (a biguanide) is often the first tablet for type 2 diabetes (people with heart or kidney disease may start an SGLT2 or GLP-1 medicine first); it lowers the sugar released by the liver and rarely causes low blood sugar on its own. Insulin glargine is a long-acting, once-daily background insulin injection used when the body needs insulin, and insulin lispro is a rapid-acting mealtime insulin. Glipizide (a sulfonylurea) makes the pancreas release more insulin and can cause low blood sugar; empagliflozin (an SGLT2 inhibitor, -gliflozin) passes sugar out in the urine, and semaglutide (a GLP-1 receptor agonist, -glutide) is a weekly injection that also reduces appetite. Levothyroxine replaces thyroxine (T4) in an underactive thyroid. Prednisone is an oral corticosteroid that copies cortisol to damp down inflammation and the immune system.",
"points": [
"Type 1 diabetes always needs insulin; type 2 usually starts with metformin.",
"Levothyroxine is taken on an empty stomach, usually in the morning.",
"Long-term prednisone is tapered slowly because the body's own cortisol production is switched off."
],
"tip": "Replace (levothyroxine, insulin) or copy (prednisone copies cortisol)."
}
],
"outro": "In the games, look first at the name ending, then think which body system that class works on. For learning only, not medical advice."
}
});
