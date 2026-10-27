/* Bug vs Drug — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "bug-vs-drug",
"title": "Bug vs Drug",
"subject": "pharmacology",
"subjectName": "Pharmacology",
"chapter": "3",
"tagline": "Antibiotics, antifungals and antivirals: how each one attacks",
"itemNoun": "drug group",
"categories": [
{
"id": "wall",
"name": "Antibiotic: breaks the cell wall",
"color": "cat-coral",
"icon": "shield"
},
{
"id": "protein",
"name": "Antibiotic: stops protein building",
"color": "cat-amber",
"icon": "factory"
},
{
"id": "dna",
"name": "Antibiotic: blocks DNA or folate",
"color": "cat-lemon",
"icon": "dna"
},
{
"id": "fungus",
"name": "Antifungal",
"color": "cat-sage",
"icon": "leaf"
},
{
"id": "virus",
"name": "Antiviral",
"color": "cat-lilac",
"icon": "bug"
}
],
"categoryLabel": "How it attacks",
"hint": "Learn each group of antimicrobial drugs, a common example and how it fights the germ.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"e.g. {example}",
"{category}"
],
"detail": [
{
"label": "Example",
"field": "{example}"
},
{
"label": "How it attacks",
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
"title": "Explore the drugs",
"desc": "Tap a drug group for an example and how it works.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "example",
"format": "quiz",
"title": "Name the group",
"desc": "See an example drug, pick its group.",
"icon": "?",
"color": "cat-sky",
"prompt": "Which group does this drug belong to?",
"show": "example",
"showAs": "big",
"answer": "name",
"answerAs": "small"
},
{
"id": "how",
"format": "sortit",
"title": "How does it attack?",
"desc": "Sort each group by how it fights the germ.",
"icon": "⌖",
"color": "cat-coral",
"prompt": "How does this drug group attack the germ?",
"choices": 5
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each group with an example drug.",
"icon": "⇄",
"color": "cat-mint",
"clue": "example",
"clueLabel": "Example"
},
{"id":"exam","format":"exam","title":"Exam-style questions","desc":"Select all that apply, and what to do first.","icon":"✓✓","color":"cat-sand","rounds":8,"extra":true}
],
"exam": [
 {
  "id": "bd-x1",
  "cat": "wall",
  "kind": "sata",
  "stem": "A patient with cellulitis is due for the first dose of IV cefazolin.",
  "q": "Which actions should the nurse take? Select all that apply.",
  "options": [
   "Ask about drug allergies and the type of reaction",
   "Make sure any ordered cultures are taken first",
   "Watch for hives, wheeze or low blood pressure",
   "Delay the dose until culture results are back",
   "Give diphenhydramine first to prevent a reaction"
  ],
  "answer": [
   0,
   1,
   2
  ],
  "why": "Check allergies (some people allergic to penicillin also react to cephalosporins), take cultures before the first dose so the antibiotic does not spoil them, and monitor for anaphylaxis, which is most likely with the first dose. Treatment should not wait days for results, and routine premedication can hide an early reaction."
 },
 {
  "id": "bd-x2",
  "cat": "protein",
  "kind": "sata",
  "stem": "A patient has had IV gentamicin for 6 days.",
  "q": "Which findings should the nurse report? Select all that apply.",
  "options": [
   "Ringing in the ears",
   "Rising serum creatinine",
   "Dizziness and an unsteady walk",
   "Trough level above the target range",
   "Urine output of 60 mL an hour",
   "Peak level within the target range"
  ],
  "answer": [
   0,
   1,
   2,
   3
  ],
  "why": "Aminoglycosides damage the ears (hearing and balance) and the kidneys. A high trough means the drug is building up, raising the risk of both. A urine output of 60 mL an hour is normal, and a peak within range shows the dose is reaching an effective level."
 },
 {
  "id": "bd-x3",
  "cat": "protein",
  "kind": "sata",
  "stem": "A patient is starting oral doxycycline.",
  "q": "Which teaching is appropriate? Select all that apply.",
  "options": [
   "Use sunscreen and cover up outdoors",
   "Take it apart from antacids and iron tablets",
   "Take it with a full glass of water and stay upright",
   "It is a good choice during pregnancy",
   "Stop taking it as soon as you feel better"
  ],
  "answer": [
   0,
   1,
   2
  ],
  "why": "Tetracyclines make the skin burn easily, and antacids (calcium, magnesium, aluminium) and iron reduce their absorption. A full glass of water and staying upright prevent the tablet irritating the oesophagus. They are avoided in pregnancy and young children because they stain growing teeth, and the course is taken as prescribed."
 },
 {
  "id": "bd-x4",
  "cat": "dna",
  "kind": "sata",
  "stem": "A 76-year-old is taking ciprofloxacin for a complicated urinary infection.",
  "q": "Which findings should the nurse report promptly? Select all that apply.",
  "options": [
   "Sudden pain and swelling at the back of the heel",
   "Tingling or burning in the hands and feet",
   "New confusion or agitation",
   "Mild nausea after doses",
   "Mild headache that eases with rest"
  ],
  "answer": [
   0,
   1,
   2
  ],
  "why": "Fluoroquinolone boxed warnings cover tendon rupture (older adults are most at risk), peripheral nerve damage, and mood and thinking changes such as new confusion. Mild nausea, which food can ease, and a mild headache that settles are common, minor effects that do not need urgent reporting."
 },
 {
  "id": "bd-x5",
  "cat": "wall",
  "kind": "sata",
  "stem": "On day 5 of IV ceftriaxone, a patient has had 4 watery stools today with cramping.",
  "q": "Which actions should the nurse take? Select all that apply.",
  "options": [
   "Place the patient on contact precautions",
   "Wash hands with soap and water after care",
   "Collect a stool sample for C. diff testing",
   "Give loperamide to slow the diarrhoea",
   "Use alcohol hand gel to kill the spores",
   "Monitor fluid balance and electrolytes"
  ],
  "answer": [
   0,
   1,
   2,
   5
  ],
  "why": "Antibiotics can let C. difficile overgrow. Use contact precautions, test the stool as ordered and watch for dehydration. Alcohol gel does not kill C. diff spores, so soap and water is used. Antidiarrhoeal drugs can keep the toxin in the bowel and are avoided unless prescribed."
 },
 {
  "id": "bd-x6",
  "cat": "virus",
  "kind": "sata",
  "q": "Which statements about antiviral and antifungal drugs are correct? Select all that apply.",
  "options": [
   "Oseltamivir works best within 48 hours of flu symptoms",
   "Aciclovir (acyclovir) removes herpes virus from the body",
   "Fluconazole can raise the levels of other drugs",
   "Oseltamivir is used to treat the common cold",
   "A course of antibiotics can trigger thrush",
   "Metronidazole is an azole antifungal"
  ],
  "answer": [
   0,
   2,
   4
  ],
  "why": "Oseltamivir works on influenza and should start early. Azole antifungals slow the liver's breakdown of many drugs, raising their levels. Antibiotics can kill helpful bacteria and let Candida grow. Aciclovir calms outbreaks but the virus stays in the body, and metronidazole is an antibiotic despite its name."
 },
 {
  "id": "bd-x7",
  "cat": "wall",
  "kind": "first",
  "stem": "Ten minutes into a first IV dose of piperacillin-tazobactam, a patient says her throat feels tight. She has hives and a wheeze.",
  "q": "What should the nurse do first?",
  "options": [
   "Call the rapid response team",
   "Stop the antibiotic infusion",
   "Prepare IM epinephrine as ordered",
   "Check blood pressure and SpO₂"
  ],
  "answer": 1,
  "why": "Safety first: stopping the infusion takes seconds and stops more allergen entering the blood. The nurse then calls for help, gives epinephrine as ordered and monitors vital signs. Each of those is needed, but none should happen while the drug keeps running."
 },
 {
  "id": "bd-x8",
  "cat": "wall",
  "kind": "first",
  "stem": "A patient with suspected sepsis has new orders: blood cultures, a first dose of IV antibiotic, a chest X-ray and a temperature check in 1 hour.",
  "q": "What should the nurse do first?",
  "options": [
   "Hang the IV antibiotic",
   "Draw the blood cultures",
   "Send the patient for the chest X-ray",
   "Recheck the temperature"
  ],
  "answer": 1,
  "why": "Cultures are taken before the first antibiotic dose, because the antibiotic can stop the germ growing in the sample. They are drawn quickly so the antibiotic can follow without delay. The X-ray and temperature check come after."
 },
 {
  "id": "bd-x9",
  "cat": "wall",
  "kind": "first",
  "stem": "During an IV vancomycin infusion, a patient's face, neck and upper chest turn red and itchy. Blood pressure is stable.",
  "q": "What should the nurse do first?",
  "options": [
   "Notify the prescriber",
   "Give an antihistamine as ordered",
   "Stop the infusion",
   "Restart it at a slower rate as ordered"
  ],
  "answer": 2,
  "why": "This is a vancomycin infusion reaction, usually caused by infusing too fast. Stop the infusion first, then notify the prescriber, who may order an antihistamine and a slower rate. Restarting comes last."
 },
 {
  "id": "bd-x10",
  "cat": "wall",
  "kind": "first",
  "q": "Which patient should the nurse see first?",
  "options": [
   "IV ceftriaxone, new wheeze and swollen lips",
   "Gentamicin, trough level due in an hour",
   "Ciprofloxacin, asking if it can be taken with milk",
   "Oseltamivir, mild nausea after the first dose"
  ],
  "answer": 0,
  "why": "Airway first: wheeze and lip swelling suggest anaphylaxis, which can block the airway within minutes. The trough is a scheduled task, and the question and mild nausea are stable."
 }
],
"items": [
{
"name": "Penicillins",
"cat": "wall",
"example": "Amoxicillin",
"life": "Penicillin was the first antibiotic found in nature to become a medicine; penicillin allergy is the most commonly reported drug allergy.",
"icon": "pharm-petri",
"num": 1,
"spot": "wall",
"facts": [
"Beta-lactam antibiotics that block the enzymes building the bacterial cell wall.",
"Names usually end in -cillin, such as amoxicillin.",
"Allergy can range from rash to life-threatening anaphylaxis.",
"Many bacteria resist them by making beta-lactamase, an enzyme that breaks the ring."
],
"summary": "Beta-lactam antibiotics that stop bacteria building their cell wall."
},
{
"name": "Cephalosporins",
"cat": "wall",
"example": "Cefalexin",
"life": "Close cousins of penicillins, used for skin and urinary infections.",
"icon": "pharm-rod-crack",
"num": 2,
"spot": "wall",
"facts": [
"Also beta-lactams, with a structure related to penicillins.",
"Names usually start with cef- or ceph-, such as cefalexin.",
"Grouped in 'generations'; later ones cover more gram-negative bacteria."
],
"summary": "Beta-lactam antibiotics related to penicillins that break the cell wall."
},
{
"name": "Carbapenems",
"cat": "wall",
"example": "Meropenem",
"life": "Powerful hospital antibiotics kept for resistant infections.",
"icon": "shield",
"num": 3,
"spot": "wall",
"facts": [
"Beta-lactams with a very broad range of bacteria covered.",
"Names end in -penem, such as meropenem.",
"Given by IV and saved for serious or resistant hospital infections."
],
"summary": "Very broad beta-lactam antibiotics kept for serious, resistant infections."
},
{
"name": "Glycopeptides",
"cat": "wall",
"example": "Vancomycin",
"life": "A key treatment for MRSA; blood levels are monitored.",
"icon": "pharm-staph",
"num": 4,
"spot": "wall",
"facts": [
"Block cell wall building, but are not beta-lactams.",
"Vancomycin works on gram-positive bacteria, including MRSA.",
"Given by IV for serious infections; blood levels are monitored, now usually as the total exposure over 24 hours (AUC) rather than trough levels alone.",
"Infusing too fast can cause flushing and a rash on the upper body."
],
"summary": "Cell wall blockers, such as vancomycin, used against MRSA."
},
{
"name": "Macrolides",
"cat": "protein",
"example": "Azithromycin",
"life": "Often used for chest infections, and for people allergic to penicillin.",
"icon": "pharm-ribosome",
"num": 5,
"spot": "ribosome",
"facts": [
"Bind the bacterial ribosome and stop protein building.",
"Names end in -thromycin, such as azithromycin and clarithromycin.",
"A common choice when someone is allergic to penicillin.",
"Do not confuse with aminoglycosides: macrolides are mostly tablets, gentamicin is injected."
],
"summary": "Antibiotics that jam the bacterial ribosome, often used for chest infections."
},
{
"name": "Tetracyclines",
"cat": "protein",
"example": "Doxycycline",
"life": "Usually avoided in young children and pregnancy because they can stain growing teeth.",
"icon": "pharm-tooth",
"num": 6,
"spot": "ribosome",
"facts": [
"Block the bacterial ribosome, stopping protein building.",
"Names end in -cycline, such as doxycycline.",
"Can make skin burn easily in the sun.",
"Milk and antacids reduce absorption, so they are taken apart from them."
],
"summary": "Antibiotics that block bacterial protein building."
},
{
"name": "Aminoglycosides",
"cat": "protein",
"example": "Gentamicin",
"life": "Given by injection; levels are checked because it can harm the kidneys and hearing.",
"icon": "pharm-ear",
"num": 7,
"spot": "ribosome",
"facts": [
"Bind the bacterial ribosome, stopping protein building.",
"Examples include gentamicin, tobramycin and amikacin.",
"Poorly absorbed from the gut, so usually given by injection or IV.",
"Toxic to kidneys (nephrotoxic) and ears (ototoxic); levels are monitored."
],
"summary": "Injected antibiotics that block bacterial protein building; levels are monitored."
},
{
"name": "Fluoroquinolones",
"cat": "dna",
"example": "Ciprofloxacin",
"life": "Carries boxed warnings, best known for tendon damage.",
"icon": "dna",
"num": 8,
"spot": "dna",
"facts": [
"Block DNA gyrase, an enzyme bacteria need to unwind and copy DNA.",
"Names end in -floxacin, such as ciprofloxacin.",
"Can cause tendon inflammation or rupture, especially in older adults.",
"The boxed warnings also cover nerve damage, mood and thinking changes and worse myasthenia gravis; a separate warning covers rare aortic aneurysm. For sinusitis, bronchitis and simple bladder infections, they are kept for when other antibiotics can't be used.",
"Antacids and calcium reduce their absorption."
],
"summary": "Antibiotics that stop bacteria copying their DNA."
},
{
"name": "Folate blockers",
"cat": "dna",
"example": "Trimethoprim",
"life": "A common tablet for urinary tract infections; it blocks the germ's folate.",
"icon": "pharm-folate-block",
"num": 9,
"spot": "folate",
"facts": [
"Stop bacteria making folate, which they need to build DNA.",
"Trimethoprim targets an enzyme humans also have, but it binds the bacterial version thousands of times more tightly.",
"Trimethoprim is often combined with sulfamethoxazole as co-trimoxazole.",
"A common treatment for urinary tract infections."
],
"summary": "Antibiotics that stop bacteria making folate, which they need for DNA."
},
{
"name": "Nitroimidazoles",
"cat": "dna",
"example": "Metronidazole",
"life": "Patients are told to avoid alcohol while taking it.",
"icon": "pharm-no-alcohol",
"num": 10,
"spot": "dna",
"facts": [
"Metronidazole damages the DNA of germs that live without oxygen (anaerobes).",
"Also treats some parasites, such as Giardia and Trichomonas.",
"Alcohol with it can cause flushing, nausea and vomiting.",
"Can leave a metallic taste in the mouth."
],
"summary": "Drugs that damage the DNA of oxygen-free bacteria and some parasites."
},
{
"name": "Azole antifungals",
"cat": "fungus",
"example": "Fluconazole",
"life": "A single tablet is a common treatment for vaginal thrush.",
"icon": "pharm-mushroom",
"num": 11,
"spot": "ergosterol",
"facts": [
"Block the making of ergosterol, the key building block of fungal membranes.",
"Names end in -azole, such as fluconazole, clotrimazole and miconazole; but not every -azole is an antifungal (metronidazole is an antibiotic, omeprazole an acid reducer).",
"Used for thrush and other Candida yeast infections.",
"Many interact with other drugs by slowing their breakdown in the liver."
],
"summary": "Antifungals that block ergosterol, a key part of the fungal membrane."
},
{
"name": "Neuraminidase inhibitors",
"cat": "virus",
"example": "Oseltamivir",
"life": "Known as Tamiflu; it stops new flu viruses escaping from infected cells.",
"icon": "pharm-virus",
"num": 12,
"spot": "na",
"facts": [
"Neuraminidase is a flu virus enzyme that frees new viruses from the infected cell.",
"Oseltamivir works on influenza A and B, not on colds or COVID-19.",
"Works best when started within 48 hours of symptoms."
],
"summary": "Flu antivirals that stop new viruses leaving infected cells."
},
{
"name": "Herpes antivirals",
"cat": "virus",
"example": "Aciclovir",
"life": "Used for cold sores, chickenpox and shingles.",
"icon": "pharm-capsid",
"num": 13,
"spot": "vdna",
"facts": [
"Aciclovir (acyclovir in the US) blocks the virus copying its DNA.",
"A viral enzyme activates it, so it acts mainly in infected cells.",
"Treats herpes simplex (cold sores) and varicella-zoster (chickenpox and shingles).",
"Calms outbreaks but does not remove the virus from the body."
],
"summary": "Antivirals that stop herpes viruses copying their DNA."
}
],
"note": "For learning only. Not medical advice: antibiotics only work on bacteria and need a prescription.",
"diagram": "microbe",
"diagramCaption": "Where the drug strikes",
"notes": {
"intro": "Antimicrobial drugs work by hitting something the germ needs but our own cells do not have, or have in a different form. Bacteria have a cell wall, their own ribosomes for building proteins, and their own enzymes for copying DNA and making folate, so antibiotics target one of these. Fungi have a different membrane chemical (ergosterol), and viruses hijack our cells, so antifungals and antivirals need different tricks. Antibiotics do nothing against viruses. In the games you see an example drug and must name its group, then sort groups by how they attack.",
"sections": [
{
"cat": "wall",
"title": "Antibiotics that break the cell wall",
"about": "Bacteria are wrapped in a tough cell wall made of peptidoglycan; human cells have no such wall, so these drugs are fairly safe for us. Penicillins, cephalosporins and carbapenems share a ring called the beta-lactam ring, which blocks the enzymes that build the wall. Without a sound wall, the bacterium bursts. Glycopeptides such as vancomycin also stop wall building but in a different way, and they work against MRSA, which resists the beta-lactams.",
"points": [
"Beta-lactams: penicillins (-cillin), cephalosporins (cef-/ceph-), carbapenems (-penem).",
"Vancomycin is a glycopeptide, not a beta-lactam; it is the classic MRSA drug.",
"Some people allergic to penicillin also react to cephalosporins or carbapenems."
],
"tip": "Wall breakers: -cillin, cef-, -penem, vanco. Knock down the wall and the bug pops."
},
{
"cat": "protein",
"title": "Antibiotics that stop protein building",
"about": "Bacteria build proteins on ribosomes that are a different size and shape from ours (70S versus our 80S). These drugs jam the bacterial ribosome so the germ cannot make the proteins it needs to grow. Macrolides (-thromycin) are often used for chest infections and as a penicillin alternative. Tetracyclines (-cycline) can stain growing teeth. Aminoglycosides such as gentamicin are given by injection and can damage the kidneys and hearing, so their blood levels are checked.",
"points": [
"-thromycin = macrolide; -cycline = tetracycline; gentamicin (injected, levels checked) = aminoglycoside.",
"Aminoglycoside risks: kidneys and ears.",
"Tetracyclines are avoided in pregnancy and young children."
],
"tip": "Picture a jammed protein factory: the bug's workers have no tools."
},
{
"cat": "dna",
"title": "Antibiotics that block DNA or folate",
"about": "These drugs stop bacteria copying their DNA or making folate, a vitamin they need to build DNA. Fluoroquinolones (-floxacin) block the enzymes that unwind and copy bacterial DNA. Folate blockers such as trimethoprim block the bacterial enzyme that turns folate into its working form; our own version of that enzyme binds the drug far less tightly, so we are much less affected. Nitroimidazoles such as metronidazole damage the DNA of germs that live without oxygen (anaerobes) and some parasites.",
"points": [
"-floxacin = fluoroquinolone (boxed warnings: tendons, nerves, mood).",
"Trimethoprim is often paired with sulfamethoxazole as co-trimoxazole.",
"Metronidazole: anaerobic germs; avoid alcohol."
],
"tip": "No blueprint, no new bugs: these drugs tear up or starve the DNA."
},
{
"cat": "fungus",
"title": "Antifungals",
"about": "Fungi have their own cells with a membrane built from ergosterol, where human membranes use cholesterol. Azole antifungals (-azole) block the enzyme that makes ergosterol, so the fungal membrane becomes leaky and the fungus stops growing. Fluconazole is a common tablet for thrush (Candida yeast) infections. Antibiotics do not treat fungal infections and can even trigger thrush by killing helpful bacteria.",
"points": [
"Antifungal azoles: -conazole and -azole names such as clotrimazole; metronidazole (antibiotic) and -prazole acid reducers are not antifungals.",
"Target: ergosterol in the fungal membrane."
],
"tip": "Azoles attack ergosterol: A for azole, E for ergosterol, both in the fungus."
},
{
"cat": "virus",
"title": "Antivirals",
"about": "Viruses live and copy themselves inside our cells, so they are harder to target without harming us. Antivirals block a step that only the virus uses. Neuraminidase inhibitors such as oseltamivir stop new flu viruses cutting themselves free from the infected cell, so the infection cannot spread as fast. Herpes antivirals such as aciclovir are switched on by a viral enzyme and then stop the virus copying its DNA. Antivirals work best when started early.",
"points": [
"-vir ending usually means antiviral.",
"Oseltamivir = influenza; aciclovir = herpes viruses (cold sores, chickenpox, shingles).",
"Best started within about 48 hours of flu symptoms."
],
"tip": "Oseltamivir locks the exit; aciclovir jams the copier."
}
],
"outro": "Learn the example drug's ending first; it usually points straight to the group and therefore to how it attacks. For learning only, not medical advice."
}
});
