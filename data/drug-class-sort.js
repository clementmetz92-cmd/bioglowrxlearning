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
"alsoOk": ["High blood pressure and angina", "High blood pressure and heart failure", "Mild high blood pressure, often added to other tablets"],
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
"alsoOk": ["High blood pressure and heart failure", "High blood pressure, often when ACE inhibitors cause a cough"],
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
"cat": "cardio",
"cls": "Anticoagulant",
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
"Current asthma guidelines (GINA) advise against a reliever on its own: everyone with asthma also needs an inhaled steroid, and many adults now use one steroid-formoterol inhaler as both."
],
"summary": "A fast-acting reliever inhaler that relaxes tight airways."
},
{
"name": "Fluticasone",
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
"alsoOk": ["Depression and anxiety", "Epilepsy"],
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
"alsoOk": ["Anxiety and seizures"],
"cat": "cns",
"cls": "Antiseizure medicine",
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
"about": "These medicines lower blood pressure, control heart rate, remove extra fluid, lower cholesterol or prevent clots. Blood pressure can be lowered in several ways: blocking the angiotensin hormone system (ACE inhibitors and ARBs), relaxing artery walls (calcium channel blockers), slowing the heart (beta blockers) or making the kidneys pass more water (diuretics). Statins work on cholesterol, not pressure. Anticoagulants such as warfarin stop clots forming; they do not dissolve clots that are already there. The name ending is the fastest way to tell the classes apart.",
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
"about": "Asthma medicines are split into relievers and preventers. A reliever (short-acting bronchodilator such as albuterol) opens tight airways within minutes during an attack. A preventer (inhaled corticosteroid such as fluticasone) is used every day to calm the swelling and inflammation that make attacks likely, and does not help an attack already happening. Current guidelines (GINA, since 2019) no longer recommend a short-acting reliever on its own: everyone with asthma should also have an inhaled steroid, and many adults now use a single steroid-formoterol inhaler as both reliever and preventer. Montelukast is a tablet add-on that blocks leukotrienes, inflammatory messengers that narrow airways. Antihistamines such as cetirizine block histamine, the chemical behind sneezing, itching and hives.",
"points": [
"Reliever = quick, used when needed; preventer = slow, used daily; a reliever alone is no longer advised.",
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
"about": "These medicines change brain chemistry to treat mood, anxiety, seizures or memory loss. SSRIs such as sertraline raise serotonin by stopping its reuptake, and take a few weeks to work fully. Benzodiazepines (-azepam, -azolam) boost GABA, the brain's calming messenger, so they act fast for anxiety and seizures but can cause dependence. Antiseizure medicines such as levetiracetam are taken daily to prevent epileptic seizures. Cholinesterase inhibitors such as donepezil stop acetylcholine being broken down, which supports memory in Alzheimer's disease for a time.",
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
"about": "Hormone medicines either replace a hormone the body lacks or copy one to get a strong effect. Metformin (a biguanide) is often the first tablet for type 2 diabetes (people with heart or kidney disease may start an SGLT2 or GLP-1 medicine first); it lowers the sugar released by the liver and rarely causes low blood sugar on its own. Insulin glargine is a long-acting, once-daily background insulin injection used when the body needs insulin. Levothyroxine replaces thyroxine (T4) in an underactive thyroid. Prednisone is an oral corticosteroid that copies cortisol to damp down inflammation and the immune system.",
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
