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
},
{
"id": "blood",
"name": "Blood cells and plasma",
"color": "cat-sage",
"icon": "cell"
},
{
"id": "clot",
"name": "Clotting and blood groups",
"color": "cat-lilac",
"icon": "anat1-blood"
},
{
"id": "output",
"name": "Output and pressure",
"color": "cat-orchid",
"icon": "gauge"
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
"desc": "Read the job, pick the heart part or ECG wave.",
"icon": "?",
"color": "cat-sky",
"prompt": "Which heart part or ECG wave is this?",
"show": "job",
"showAs": "text",
"answer": "name", "only": ["chamber", "valve", "vessel", "electric"] },
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each part with its job.",
"icon": "⇄",
"color": "cat-mint",
"clue": "job",
"clueLabel": "Job",
"pairs": 6, "only": ["chamber", "valve", "vessel", "electric"] },
{
"id": "blood-quiz",
"format": "quiz",
"title": "Blood, output and pressure",
"desc": "Read the job, pick the blood part or pressure term.",
"icon": "?",
"color": "cat-sage",
"prompt": "Which blood part or term is this?",
"show": "job",
"showAs": "text",
"answer": "name",
"only": [
"blood",
"clot",
"output"
],
"extra": true
},
{
"id": "blood-pairs",
"format": "matchpairs",
"title": "Blood and pressure pairs",
"desc": "Pair each blood part or pressure term with its job.",
"icon": "⇄",
"color": "cat-lilac",
"clue": "job",
"clueLabel": "Job",
"pairs": 6,
"only": [
"blood",
"clot",
"output"
],
"extra": true
},
{
"id": "cases",
"format": "cases",
"title": "Clinic cases",
"desc": "Anaemia, a transfusion check, a nosebleed on warfarin, high blood pressure and a slow pulse.",
"icon": "✚",
"color": "cat-coral",
"rounds": 3,
"extra": true
}
],
"items": [
{
"name": "Right atrium",
"icon": "anat1-ra",
"cat": "chamber",
"job": "Upper right chamber: collects oxygen-poor blood arriving from the body",
"life": "It fills mainly from the two venae cavae, the body's largest veins.",
"num": 1,
"spot": "ra",
"facts": [
"Receives blood from the superior and inferior venae cavae.",
"Passes blood through the tricuspid valve into the right ventricle.",
"Its wall holds the SA node, the heart's pacemaker."
],
"summary": "The upper right chamber, which receives oxygen-poor blood returning from the body."
},
{
"name": "Right ventricle",
"icon": "anat1-rv",
"cat": "chamber",
"job": "Lower right chamber: pumps blood to the lungs",
"life": "Its wall is thinner than the left's because pumping to the nearby lungs needs far less pressure.",
"num": 2,
"spot": "rv",
"facts": [
"Fills from the right atrium through the tricuspid valve.",
"Pumps out through the pulmonary valve into the pulmonary artery.",
"Thinner-walled than the left ventricle because the lungs need low pressure."
],
"summary": "The lower right chamber, which pumps oxygen-poor blood to the lungs."
},
{
"name": "Left atrium",
"icon": "anat1-la",
"cat": "chamber",
"job": "Upper left chamber: collects oxygen-rich blood arriving from the lungs",
"life": "It fills from the pulmonary veins.",
"num": 3,
"spot": "la",
"facts": [
"Receives blood from the pulmonary veins, usually four of them.",
"Passes blood through the mitral valve into the left ventricle.",
"Not to be confused with the right atrium, which receives blood from the body."
],
"summary": "The upper left chamber, which receives oxygen-rich blood back from the lungs."
},
{
"name": "Left ventricle",
"icon": "anat1-lv",
"cat": "chamber",
"job": "Lower left chamber: pumps blood out to the whole body",
"life": "It has the thickest wall of the heart; it does the hardest work.",
"num": 4,
"spot": "lv",
"facts": [
"Fills from the left atrium through the mitral valve.",
"Pumps out through the aortic valve into the aorta.",
"Its wall is about three times thicker than the right ventricle's."
],
"summary": "The lower left chamber, the strongest pump, sending oxygen-rich blood to the whole body."
},
{
"name": "Tricuspid valve",
"icon": "anat1-tricuspid",
"cat": "valve",
"job": "Stops blood flowing back from the right ventricle to the right atrium",
"life": "Its closing is part of the 'lub' you hear through a stethoscope.",
"num": 5,
"spot": "tricuspid",
"facts": [
"Right atrioventricular (AV) valve: three cusps, hence 'tri'.",
"Closes as the right ventricle starts to contract, part of the 'lub'.",
"Tough cords (chordae tendineae) stop its flaps flipping back into the atrium."
],
"summary": "The three-flapped valve between the right atrium and right ventricle."
},
{
"name": "Pulmonary valve",
"icon": "anat1-pulm-valve",
"cat": "valve",
"job": "Stops blood flowing back from the lungs' artery into the right ventricle",
"life": "It closes with the 'dub' of the heartbeat.",
"num": 6,
"spot": "pulmonary-valve",
"facts": [
"Sits between the right ventricle and the pulmonary artery.",
"Opens when the right ventricle pumps; closes as it relaxes, part of the 'dub'.",
"Right-side outlet valve; the aortic valve is the left-side one."
],
"summary": "The semilunar valve at the exit of the right ventricle, guarding the way to the lungs."
},
{
"name": "Mitral valve",
"icon": "anat1-mitral",
"cat": "valve",
"job": "Stops blood flowing back from the left ventricle to the left atrium",
"life": "Also called the bicuspid valve because it has two flaps.",
"num": 7,
"spot": "mitral",
"facts": [
"Left atrioventricular (AV) valve, also called bicuspid; two cusps.",
"Closes as the left ventricle starts to contract, part of the 'lub'.",
"Named for its likeness to a bishop's mitre (hat)."
],
"summary": "The two-flapped valve between the left atrium and left ventricle."
},
{
"name": "Aortic valve",
"icon": "anat1-aortic-valve",
"cat": "valve",
"job": "Stops blood flowing back from the aorta into the left ventricle",
"life": "A narrowed aortic valve is a common heart problem in older age.",
"num": 8,
"spot": "aortic-valve",
"facts": [
"Sits between the left ventricle and the aorta.",
"Opens as the left ventricle pumps; closes as it relaxes, part of the 'dub'.",
"The coronary arteries branch off just above it."
],
"summary": "The semilunar valve at the exit of the left ventricle, opening into the aorta."
},
{
"name": "Venae cavae",
"icon": "anat1-venae-cavae",
"cat": "vessel",
"job": "Two large veins that empty the body's oxygen-poor blood into the heart",
"life": "The superior one drains the head and arms; the inferior one drains the lower body.",
"num": 9,
"spot": "venae-cavae",
"facts": [
"Superior vena cava drains the head, neck and arms.",
"Inferior vena cava drains the trunk and legs.",
"Final step of the vessel loop: veins → venae cavae → right atrium."
],
"summary": "The two largest veins, which return oxygen-poor blood from the body to the right atrium."
},
{
"name": "Pulmonary artery",
"icon": "anat1-pulm-artery",
"cat": "vessel",
"job": "Vessel that carries oxygen-poor blood from the heart to the lungs",
"life": "After birth, it is the only artery that carries oxygen-poor blood.",
"num": 10,
"spot": "pulmonary-artery",
"facts": [
"Starts as the pulmonary trunk, then splits into left and right pulmonary arteries.",
"An artery because it carries blood away from the heart, despite low oxygen.",
"Leaves the right ventricle through the pulmonary valve."
],
"summary": "The vessel that takes oxygen-poor blood from the right ventricle to the lungs."
},
{
"name": "Pulmonary veins",
"icon": "anat1-pulm-veins",
"cat": "vessel",
"job": "Veins that carry oxygen-rich blood from the lungs to the heart",
"life": "After birth, they are the only veins that carry oxygen-rich blood.",
"num": 11,
"spot": "pulmonary-veins",
"facts": [
"Usually four, two from each lung.",
"Veins because they carry blood towards the heart, despite being oxygen-rich.",
"Empty into the left atrium, not the right."
],
"summary": "The veins that return oxygen-rich blood from the lungs to the left atrium."
},
{
"name": "Aorta",
"icon": "anat1-aorta",
"cat": "vessel",
"job": "Large artery that carries oxygen-rich blood from the heart to the body",
"life": "The body's largest artery, about as wide as a garden hose.",
"num": 12,
"spot": "aorta",
"facts": [
"Leaves the left ventricle through the aortic valve.",
"Arches over the heart, then runs down through the chest and abdomen.",
"First step of the vessel loop, before smaller arteries and arterioles."
],
"summary": "The body's largest artery, carrying oxygen-rich blood from the left ventricle to the body."
},
{
"name": "Coronary arteries",
"icon": "anat1-coronary",
"cat": "vessel",
"job": "Supply the heart muscle itself with blood",
"life": "A blockage here causes a heart attack.",
"num": 13,
"spot": "coronary",
"facts": [
"Left and right coronary arteries branch from the aorta just above the aortic valve.",
"The heart cannot use the blood inside its chambers; it relies on these vessels.",
"A clot blocking one causes a heart attack (myocardial infarction)."
],
"summary": "The arteries that supply the heart muscle itself with oxygen-rich blood."
},
{
"name": "SA node",
"icon": "anat1-sa-node",
"cat": "electric",
"job": "Starts each heartbeat: the natural pacemaker",
"life": "An artificial pacemaker can take over when the heart's own wiring stops working properly.",
"num": 14,
"spot": "sa-node",
"facts": [
"Sits in the wall of the right atrium, near the superior vena cava.",
"Fires on its own, usually 60–100 times a minute at rest.",
"First step of the electrical sequence; the AV node comes after the atria."
],
"summary": "The sinoatrial node, a patch of pacemaker cells that starts each heartbeat."
},
{
"name": "AV node",
"icon": "anat1-av-node",
"cat": "electric",
"job": "Briefly delays the signal so the ventricles can fill",
"life": "This short delay is why the atria contract just before the ventricles.",
"num": 15,
"spot": "av-node",
"facts": [
"Sits low in the right atrium, near the septum.",
"Its delay of about 0.1 second lets the atria finish emptying into the ventricles.",
"The only normal electrical route from atria to ventricles; it leads into the bundle of His."
],
"summary": "The atrioventricular node, which passes the signal from the atria to the ventricles after a short pause."
},
{
"name": "Purkinje fibres",
"icon": "anat1-purkinje",
"cat": "electric",
"job": "Spread the signal through the ventricle walls",
"life": "They make the ventricles squeeze from the bottom up, like squeezing toothpaste.",
"num": 16,
"spot": "purkinje",
"facts": [
"Last part of the wiring: SA node → atria → AV node → bundle of His → branches → Purkinje.",
"Spread from the heart's tip (apex) upwards through the ventricle walls.",
"Make the ventricles contract from the bottom up, pushing blood towards the exits."
],
"summary": "Fast-conducting fibres that carry the signal through the walls of both ventricles."
}
,
{
"name": "Plasma",
"icon": "drop",
"cat": "blood",
"job": "Straw-coloured liquid part of blood that carries dissolved proteins, nutrients, hormones and wastes",
"life": "Donated plasma is given to people with severe burns or bleeding problems, because it carries proteins and clotting factors.",
"num": 17,
"facts": [
"About 92% water; the rest is proteins, salts, nutrients, gases, hormones and wastes.",
"Albumin, the main plasma protein, is made by the liver and holds water in the blood by osmosis.",
"Serum is plasma with the clotting proteins removed."
],
"summary": "The liquid part of blood, about 55% of its volume: mostly water with dissolved proteins, salts, nutrients, gases and wastes."
},
{
"name": "Red blood cells",
"icon": "chem-rbc",
"cat": "blood",
"job": "Disc-shaped cells with no nucleus that carry oxygen from the lungs to the tissues",
"life": "After a blood donation, the body replaces the lost red cells over the following weeks.",
"num": 18,
"facts": [
"Mature red cells have no nucleus or mitochondria, leaving more room for haemoglobin.",
"The biconcave shape gives a large surface for gas exchange and lets them fold through narrow capillaries.",
"They live about 120 days. When oxygen is low, the kidneys release erythropoietin (EPO), which tells red bone marrow to make more."
],
"summary": "Erythrocytes: biconcave discs packed with haemoglobin, by far the most numerous cells in blood."
},
{
"name": "Haemoglobin",
"icon": "nutr-rbc",
"cat": "blood",
"job": "Iron-containing protein inside red cells that picks up oxygen in the lungs and releases it in the tissues",
"life": "A blood test for anaemia usually checks haemoglobin first; a low level often points to a lack of iron.",
"num": 19,
"facts": [
"Each haem group has one iron atom, so one molecule can carry up to four oxygen molecules.",
"It also carries some carbon dioxide, bound to its protein chains.",
"Typical adult levels are about 13–18 g/dL in men and 12–16 g/dL in women."
],
"summary": "The red protein that fills red blood cells. Each molecule has four protein chains, each holding an iron-containing haem group."
},
{
"name": "Haematocrit",
"icon": "chem-testtube",
"cat": "blood",
"job": "Percentage of blood volume taken up by red cells, about 37–52% in adults",
"life": "It can rise with dehydration, because plasma water is lost while the red cells stay.",
"num": 20,
"facts": [
"In a spun tube, red cells sink to the bottom, white cells and platelets form a thin buffy coat, and plasma sits on top.",
"Typical values are about 42–52% in men and 37–48% in women.",
"Low in anaemia; high in dehydration, at high altitude, or with EPO misuse."
],
"summary": "The packed cell volume: the share of a spun blood sample that is red cells."
},
{
"name": "Neutrophils",
"icon": "anat1-neutrophil",
"cat": "blood",
"job": "Most common white cells, first to arrive at an infection and eat bacteria",
"life": "Pus is mostly dead neutrophils, bacteria and broken-down tissue.",
"num": 21,
"facts": [
"Their numbers rise sharply in bacterial infections.",
"They kill bacteria by phagocytosis and by a burst of toxic chemicals.",
"They are granulocytes, like the rarer eosinophils and basophils."
],
"summary": "Granular white cells with a nucleus of three to five lobes, making up about 60–70% of white cells."
},
{
"name": "Lymphocytes",
"icon": "anat1-b-cell",
"cat": "blood",
"job": "White cells (B and T cells) that recognise particular invaders and remember them",
"life": "Vaccines work by training lymphocytes to recognise a germ before you ever meet it.",
"num": 22,
"facts": [
"B cells turn into plasma cells that make antibodies.",
"T cells attack infected cells and direct other immune cells.",
"Natural killer (NK) cells are lymphocytes too; they destroy infected and cancer cells."
],
"summary": "Small white cells with a large round nucleus, about 25–33% of white cells, behind specific (adaptive) immunity."
},
{
"name": "Monocytes",
"icon": "anat1-macrophage",
"cat": "blood",
"job": "Largest white cells, which leave the blood and turn into macrophages",
"life": "Their numbers tend to rise in long-lasting (chronic) infections and inflammation.",
"num": 23,
"facts": [
"They move out of the blood into the tissues, where they become macrophages.",
"Macrophages eat germs, dead cells and debris.",
"Macrophages show pieces of germs (antigens) to T cells, starting a specific immune response."
],
"summary": "Large white cells with a kidney- or horseshoe-shaped nucleus, about 3–8% of white cells."
},
{
"name": "Platelets",
"icon": "anat1-blood",
"cat": "clot",
"job": "Cell fragments that stick to a damaged vessel wall and pile up into a plug",
"life": "Aspirin makes platelets less sticky, which helps prevent heart attacks but makes bruising easier.",
"num": 24,
"facts": [
"They have no nucleus; a normal count is about 150,000–400,000 per microlitre of blood (some textbooks start the range at 130,000).",
"At a cut they stick to exposed collagen, swell, and grow spiky arms.",
"They release chemicals such as serotonin and thromboxane, which narrow the vessel, and ADP, which calls in more platelets."
],
"summary": "Thrombocytes: small fragments pinched off giant bone marrow cells called megakaryocytes. They start the seal on any leak."
},
{
"name": "Fibrin",
"icon": "pharm-bandage",
"cat": "clot",
"job": "Protein threads that knit a platelet plug into a firm, lasting clot",
"life": "Warfarin blocks vitamin K, so the liver makes fewer working clotting factors, less fibrin forms and bleeding lasts longer.",
"num": 25,
"facts": [
"Haemostasis has three stages: vascular spasm, platelet plug, then coagulation.",
"A chain of clotting factors ends when the enzyme thrombin turns soluble fibrinogen into fibrin.",
"Calcium and vitamin K are needed; the liver makes most clotting factors."
],
"summary": "Insoluble threads made from the plasma protein fibrinogen at the end of the clotting cascade. They trap blood cells to form a solid clot."
},
{
"name": "ABO blood groups",
"icon": "well-st-blood-types",
"cat": "clot",
"job": "Antigens A and B on red cells that decide which blood a person can safely receive",
"life": "Before a transfusion, the patient's blood is cross-matched with the donor's so that the donor cells will not be attacked.",
"num": 26,
"facts": [
"Plasma holds antibodies against whichever ABO antigen the cells lack: group A has anti-B, group B has anti-A, group O has both.",
"Mismatched cells are clumped (agglutinated) and burst (haemolysed) by these antibodies.",
"Group O negative red cells carry no A, B or D antigen, so they are the emergency 'universal donor' cells; group AB positive is the 'universal recipient'."
],
"summary": "A system that types blood by whether red cells carry antigen A, antigen B, both (group AB) or neither (group O)."
},
{
"name": "Rh factor",
"icon": "chem-ivbag",
"cat": "clot",
"job": "Red cell antigen (D) that makes blood 'positive' when present and 'negative' when absent",
"life": "Rh-negative mothers are given anti-D injections in pregnancy to protect a later Rh-positive baby.",
"num": 27,
"facts": [
"Unlike anti-A and anti-B, anti-D is not present from early life; it forms only after exposure.",
"Exposure can come from a mismatched transfusion or from a baby's blood mixing with the mother's at birth.",
"In a later pregnancy, the mother's anti-D can cross the placenta and destroy the baby's red cells (haemolytic disease of the newborn)."
],
"summary": "The Rh (D) antigen. Rh-negative people make anti-D antibodies only after their blood meets Rh-positive cells."
},
{
"name": "Cardiac output",
"icon": "heart",
"cat": "output",
"job": "Volume of blood each ventricle pumps per minute: heart rate × stroke volume",
"life": "During hard exercise it can rise four- to fivefold as both heart rate and stroke volume go up.",
"num": 28,
"spot": "lv",
"facts": [
"Cardiac output = heart rate × stroke volume, for example 70 beats/min × 70 mL ≈ 4.9 L/min.",
"Sympathetic nerves and adrenaline raise the heart rate and the force of contraction; the vagus nerve slows the rate.",
"Factors that change heart rate are called chronotropic; factors that change contraction strength are called inotropic."
],
"summary": "The amount of blood one ventricle pumps in a minute, about 5 litres at rest in an adult."
},
{
"name": "Stroke volume",
"icon": "chem-cylinder",
"cat": "output",
"job": "Volume of blood one ventricle pushes out in a single beat, about 70 mL at rest",
"life": "Endurance training lets each beat move more blood, which is why trained athletes often have a slow resting pulse.",
"num": 29,
"spot": "lv",
"facts": [
"Stroke volume = end-diastolic volume (about 130 mL) − end-systolic volume (about 60 mL).",
"Raised by more filling (preload) and by stronger contraction (contractility).",
"Lowered by higher pressure in the arteries (afterload)."
],
"summary": "End-diastolic volume minus end-systolic volume: the blood each squeeze sends out."
},
{
"name": "Frank–Starling law",
"icon": "anat1-cardiac",
"cat": "output",
"job": "Rule that a ventricle stretched by more filling contracts more strongly",
"life": "It keeps the two sides in step: if the right side pumps a little more, the left fills more and pumps more too.",
"num": 30,
"spot": "lv",
"facts": [
"Stretching cardiac muscle fibres brings their filaments to a better overlap, so they pull with more force.",
"It matches output to venous return, the blood flowing back into the heart.",
"It works without nerves or hormones; it is built into the muscle itself."
],
"summary": "The heart's built-in rule that stroke volume rises when more blood fills the ventricles, so the heart pumps out what comes back to it."
},
{
"name": "Preload",
"icon": "pharm-vessel-wide",
"cat": "output",
"job": "Stretch on the ventricle walls just before they contract, set by how much blood has filled them",
"life": "Lying down with the legs raised sends more blood back to the heart, which raises preload.",
"num": 31,
"spot": "lv",
"facts": [
"Mainly set by venous return, the blood coming back to the heart.",
"More preload means more stretch and, by the Frank–Starling law, a bigger stroke volume.",
"Blood loss and dehydration lower preload."
],
"summary": "The amount of stretch in the ventricle muscle at the end of filling, closely linked to end-diastolic volume."
},
{
"name": "Afterload",
"icon": "chem-piston",
"cat": "output",
"job": "Resistance a ventricle must overcome to push blood out through its outlet valve",
"life": "Long-term high blood pressure raises afterload, so the left ventricle wall thickens from the extra work.",
"num": 32,
"spot": "aortic-valve",
"facts": [
"A ventricle cannot eject until its pressure is higher than the pressure beyond its semilunar valve.",
"Higher afterload lowers stroke volume.",
"Raised by high blood pressure or a narrowed aortic valve; lung disease raises it for the right ventricle."
],
"summary": "The resistance the ventricles push against to eject blood, mainly the pressure in the aorta and the pulmonary artery."
},
{
"name": "Blood pressure",
"icon": "pharm-bp-gauge",
"cat": "output",
"job": "Force of blood on artery walls, written as systolic over diastolic, such as 120/80 mmHg",
"life": "A cuff on the upper arm measures it in millimetres of mercury (mmHg).",
"num": 33,
"spot": "aorta",
"facts": [
"Systolic pressure is the peak, reached as the ventricles eject blood.",
"Diastolic pressure is the lowest point, while the ventricles relax and refill.",
"Pulse pressure is the difference between the two, about 40 mmHg at 120/80."
],
"summary": "The pressure in the large arteries: highest when the ventricles squeeze (systolic) and lowest while they relax (diastolic)."
},
{
"name": "Mean arterial pressure",
"icon": "gauge",
"cat": "output",
"job": "Average arterial pressure over a whole beat: diastolic plus one third of the pulse pressure",
"life": "Staff watch it closely in very ill patients, because organs such as the kidneys need enough of it to keep their blood supply.",
"num": 34,
"spot": "aorta",
"facts": [
"MAP ≈ diastolic + (systolic − diastolic) ÷ 3.",
"It sits closer to diastolic than systolic, because each beat spends longer relaxing than ejecting.",
"It depends on cardiac output and on resistance in the small arteries (peripheral resistance)."
],
"summary": "The average pressure that drives blood into the tissues, about 93 mmHg for a reading of 120/80."
},
{
"name": "Baroreceptor reflex",
"icon": "nerve",
"cat": "output",
"job": "Fast nerve reflex in which stretch sensors in the aortic arch and carotid arteries correct sudden changes in blood pressure",
"life": "Standing up quickly drops pressure in the head for a moment; this reflex speeds the heart within seconds, so the dizziness usually passes.",
"num": 35,
"spot": "aorta",
"facts": [
"The sensors sit in the carotid sinuses and the aortic arch.",
"Their signals go to the cardiovascular centre in the medulla oblongata.",
"High pressure brings more vagus (parasympathetic) and less sympathetic output: slower heart, wider vessels. Low pressure brings the reverse."
],
"summary": "A negative feedback loop: when pressure rises, stretch sensors signal the brainstem to slow the heart and widen vessels; when pressure falls, the opposite happens."
},
{
"name": "Renin–angiotensin–aldosterone system",
"icon": "kidney",
"cat": "output",
"job": "Hormone chain started by the kidneys that raises low blood pressure by narrowing vessels and keeping salt and water",
"life": "ACE inhibitors such as lisinopril lower blood pressure by blocking one step in this chain.",
"num": 36,
"facts": [
"Renin from the kidneys turns angiotensinogen, a plasma protein made by the liver, into angiotensin I.",
"Angiotensin-converting enzyme (ACE), mostly in the lungs, makes angiotensin II, which narrows arterioles and triggers thirst and ADH release.",
"Angiotensin II also makes the adrenal cortex release aldosterone, so the kidneys keep more sodium, and water follows."
],
"summary": "When blood pressure or blood flow to the kidneys falls, they release renin. This leads to angiotensin II and aldosterone, which raise pressure."
},
{
"name": "P wave",
"icon": "anat2-depol",
"cat": "electric",
"job": "ECG wave made as the atria depolarise, just before they contract",
"life": "Missing P waves with an irregular pulse suggest atrial fibrillation, a common rhythm problem in older adults.",
"num": 37,
"spot": [
"ra",
"la"
],
"facts": [
"The atria contract a moment after the P wave.",
"The PR interval, from the start of P to the start of QRS, mostly reflects the AV node delay; it is normally about 0.12–0.20 seconds.",
"An ECG records electrical activity, not the squeeze of the muscle itself."
],
"summary": "The small first bump of each beat on an ECG, showing the signal from the SA node spreading across both atria."
},
{
"name": "QRS complex",
"icon": "zap",
"cat": "electric",
"job": "Tall, sharp ECG spike made as the ventricles depolarise",
"life": "A widened QRS can mean a bundle branch is blocked, so one ventricle is activated late.",
"num": 38,
"spot": [
"rv",
"lv"
],
"facts": [
"The ventricles start to contract just after it.",
"It is tall because the ventricles have far more muscle than the atria.",
"The atria repolarise at the same time, but the QRS hides their signal."
],
"summary": "The largest part of each beat on an ECG, showing the signal racing through the bundle branches and Purkinje fibres into the ventricles."
},
{
"name": "T wave",
"icon": "anat2-repol",
"cat": "electric",
"job": "Rounded ECG wave made as the ventricles repolarise, just before they relax",
"life": "Changes in the T wave can be an early sign of a blood potassium problem or of poor blood supply to the heart muscle.",
"num": 39,
"spot": [
"rv",
"lv"
],
"facts": [
"The ventricles relax (diastole) as the T wave ends.",
"The ST segment, between the QRS and T, is when the ventricles are fully depolarised and ejecting blood; it shifts during a heart attack.",
"Normal order on every beat: P wave, QRS complex, T wave."
],
"summary": "The last wave of each beat on an ECG, showing the ventricles recovering electrically before the next beat."
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
],
"cases": [
{
"id": "hf-c1",
"cat": "blood",
"icon": "nutr-rbc",
"title": "Always tired",
"who": "Maria, 29, teacher",
"story": "Maria has felt tired for months and gets breathless climbing the stairs at school. She looks pale and says her periods have become very heavy.",
"data": [
[
"Haemoglobin",
"9.1 g/dL"
],
[
"Haematocrit",
"30%"
],
[
"Red cells",
"Small and pale"
]
],
"steps": [
{
"q": "Which result best shows that her blood carries less oxygen than normal?",
"options": [
"Low haemoglobin",
"Low platelet count",
"High white cell count",
"Low plasma albumin"
],
"answer": 0,
"why": "Haemoglobin is the protein that carries oxygen, and 9.1 g/dL is below the usual female range of about 12–16. Platelets, white cells and albumin do not carry oxygen."
},
{
"q": "Her red cells are small and pale. What is the most likely cause?",
"options": [
"Iron lost through heavy periods",
"Too much EPO from her kidneys",
"A shortage of clotting factors",
"A lack of plasma proteins"
],
"answer": 0,
"why": "Each haem group needs an iron atom. Repeated blood loss drains iron stores, so the marrow makes small, pale cells with too little haemoglobin. Extra EPO would raise red cell numbers, and clotting factors and plasma proteins do not set red cell size."
},
{
"q": "Why does she get breathless on the stairs?",
"options": [
"Less haemoglobin means less oxygen reaches her muscles",
"Her lungs cannot take in enough air with each breath",
"Her blood has become too thick to flow through her muscles",
"Her platelets are blocking the small vessels in her legs"
],
"answer": 0,
"why": "Her lungs work normally, but her blood cannot carry enough oxygen, so her breathing and heart rate rise to make up for it. Thick blood is the opposite problem, seen with too many red cells."
}
],
"takeaway": "Anaemia means too little haemoglobin to carry enough oxygen; iron lost through bleeding is a common cause."
},
{
"id": "hf-c2",
"cat": "clot",
"icon": "chem-ivbag",
"title": "Which blood can he have?",
"who": "James, 45, delivery driver",
"story": "James has lost a lot of blood in a road accident and needs red cells. His blood group is A positive. The blood bank has several groups on the shelf.",
"data": [
[
"Blood group",
"A positive"
],
[
"Haemoglobin",
"7.2 g/dL"
]
],
"steps": [
{
"q": "Which ABO antibodies are in James's plasma?",
"options": [
"Anti-B only",
"Anti-A only",
"Both anti-A and anti-B",
"Neither anti-A nor anti-B"
],
"answer": 0,
"why": "Plasma carries antibodies against the ABO antigen the person's own cells lack. Group A cells carry antigen A, so his plasma holds anti-B. Group O has both antibodies and group AB has neither."
},
{
"q": "Which red cell unit would cause a reaction if given to him?",
"options": [
"AB positive",
"A positive",
"O negative",
"A negative"
],
"answer": 0,
"why": "AB cells carry antigen B, which his anti-B would attack. A positive and A negative cells carry only antigen A, and O negative cells carry no A, B or D antigen. Rh-negative cells are safe for an Rh-positive person."
},
{
"q": "If he were given the wrong group, what would his anti-B do?",
"options": [
"Clump the donor cells and make them burst",
"Turn his own red cells into group B",
"Stop his marrow making new red cells",
"Raise his haemoglobin to a safe level"
],
"answer": 0,
"why": "The antibodies bind the donor cells, clump them (agglutination) and make them burst (haemolysis). This can cause fever, a drop in blood pressure and kidney damage. Antibodies do not change a person's own group or stop the marrow."
}
],
"takeaway": "Plasma holds antibodies to the ABO antigens a person lacks, so donor red cells must not carry those antigens."
},
{
"id": "hf-c3",
"cat": "clot",
"icon": "pharm-bandage",
"title": "A nosebleed that won't stop",
"who": "Doreen, 72, retired nurse",
"story": "Doreen takes warfarin to prevent clots because of atrial fibrillation. Her nose has been bleeding for 40 minutes and will not stop.",
"data": [
[
"INR",
"5.2 (target 2–3)"
],
[
"Platelets",
"250,000 per µL"
]
],
"steps": [
{
"q": "Which stage of haemostasis does warfarin weaken?",
"options": [
"Coagulation, the fibrin clot",
"Vascular spasm of the vessel",
"Platelet plug formation",
"Breakdown of the finished clot"
],
"answer": 0,
"why": "Warfarin blocks vitamin K, so the liver makes fewer working clotting factors and less fibrin forms. Spasm and the platelet plug still happen, and her platelet count is normal, but the plug is not firmed up. Breaking down a finished clot (fibrinolysis) is a separate process that warfarin does not affect."
},
{
"q": "Why does pinching the soft part of her nose help?",
"options": [
"Pressure holds the vessels shut while a clot forms",
"It makes her liver release more clotting factors",
"It turns her fibrin back into fibrinogen",
"It speeds her heart rate to move blood away"
],
"answer": 0,
"why": "Steady pressure squeezes the small vessels closed, giving the platelet plug and the slow fibrin clot time to form. It does not change the liver's output or the heart rate."
},
{
"q": "Her INR is well above target. Which vitamin reverses warfarin's effect?",
"options": [
"Vitamin K",
"Vitamin C",
"Vitamin D",
"Vitamin B12"
],
"answer": 0,
"why": "The liver needs vitamin K to make clotting factors II, VII, IX and X in working form. Giving vitamin K lets it make them again, but this takes hours, so her warfarin is held and, if the bleeding is serious, ready-made clotting factors (prothrombin complex concentrate) are given as well. The other vitamins do not affect these factors."
}
],
"takeaway": "Warfarin blocks vitamin K-dependent clotting factors, so bleeding lasts longer; vitamin K reverses it over several hours. A bleed that will not stop on warfarin needs urgent medical care."
},
{
"id": "hf-c4",
"cat": "output",
"icon": "pharm-bp-gauge",
"title": "Pressure creeping up",
"who": "Robert, 58, office manager",
"spot": "lv",
"story": "Robert's blood pressure has been high at three separate visits. He eats a lot of salty takeaway food and feels well.",
"data": [
[
"Blood pressure",
"152/96 mmHg"
],
[
"Pulse",
"76/min"
]
],
"steps": [
{
"q": "Roughly what is his mean arterial pressure?",
"options": [
"About 115 mmHg",
"About 124 mmHg",
"About 96 mmHg",
"About 152 mmHg"
],
"answer": 0,
"why": "MAP ≈ diastolic + one third of pulse pressure = 96 + (152 − 96) ÷ 3 ≈ 96 + 19 = 115 mmHg. 124 is the simple average of the two numbers, which overestimates MAP because more of each beat is spent in diastole."
},
{
"q": "Over years, what does this pressure do to his left ventricle?",
"options": [
"Its wall thickens from pushing against a high afterload",
"Its wall thins because it fills with less blood",
"It stops responding to signals from the SA node",
"Its valves narrow to hold back the higher pressure"
],
"answer": 0,
"why": "High arterial pressure raises afterload, the pressure the left ventricle must beat to open the aortic valve. Like any muscle doing extra work, its wall thickens, which in time can stiffen it and lead to heart failure."
},
{
"q": "His doctor starts an ACE inhibitor. How does it lower his pressure?",
"options": [
"Less angiotensin II, so vessels widen and less salt is kept",
"It blocks the baroreceptors so the brain senses less pressure",
"It speeds the heart so each beat pushes out less blood",
"It blocks beta receptors so the heart beats more slowly"
],
"answer": 0,
"why": "ACE makes angiotensin II, which narrows arterioles and triggers aldosterone release. Blocking it widens the vessels and lets the kidneys lose more sodium and water. It does not act on the baroreceptors or speed the heart, and slowing the heart by blocking beta receptors is how beta blockers work."
}
],
"takeaway": "MAP is diastolic plus a third of the pulse pressure; long-term high pressure raises afterload and thickens the left ventricle."
},
{
"id": "hf-c5",
"cat": "electric",
"icon": "pharm-heart-slow",
"title": "Dizzy and slow",
"who": "Ahmed, 67, retired engineer",
"spot": "av-node",
"story": "Ahmed has had dizzy spells and fainted once in the garden. His pulse is very slow. His ECG shows P waves at a normal rate, but many are not followed by a QRS complex.",
"data": [
[
"Pulse",
"38/min"
],
[
"Blood pressure",
"94/58 mmHg"
]
],
"steps": [
{
"q": "What does a P wave with no QRS complex after it mean?",
"options": [
"The atria fired but the signal did not reach the ventricles",
"The ventricles fired but the atria stayed electrically silent",
"The SA node stopped firing and no beat started at all",
"The ventricles repolarised before they had depolarised"
],
"answer": 0,
"why": "A P wave shows the atria depolarising, so the SA node and atria are working. A missing QRS means the ventricles did not depolarise, so the signal was stopped on its way down."
},
{
"q": "Which part of the wiring is most likely failing?",
"options": [
"The AV node",
"The SA node",
"One bundle branch only",
"The muscle of the atria"
],
"answer": 0,
"why": "The AV node, with the bundle of His just below it, is the only normal route from the atria to the ventricles, so a block here leaves P waves without QRS complexes (heart block). A failing SA node would remove the P waves, normal P waves show the atrial muscle is working, and a single bundle branch block widens the QRS rather than removing it."
},
{
"q": "Why does a heart rate of 38 make him dizzy?",
"options": [
"Cardiac output falls, so less blood reaches his brain",
"His stroke volume falls to almost nothing",
"His blood pressure rises too high for his brain",
"His red cells lose their ability to carry oxygen"
],
"answer": 0,
"why": "Cardiac output = heart rate × stroke volume. Each slow beat fills a little more, but not enough to make up, so output and blood pressure fall and the brain gets less blood. A pacemaker can restore the rate."
}
],
"takeaway": "A P wave without a QRS means the signal is blocked at the AV node; too slow a rate lowers cardiac output."
}
],
"diagram": "heart",
"diagramCaption": "Where it is in the heart",
"notes": {
"intro": "The heart is two pumps side by side. The right side receives oxygen-poor blood from the body and sends it to the lungs (the pulmonary circuit); the left side receives oxygen-rich blood from the lungs and sends it to the whole body (the systemic circuit). Each side has an upper receiving chamber (atrium) and a lower pumping chamber (ventricle), with one-way valves keeping blood moving forwards. An electrical system built into the heart muscle times every beat so the atria squeeze first and the ventricles a moment later. Learn the parts, then the orders, because the sequence game tests each journey step by step.",
"sections": [
{
"cat": "chamber",
"title": "Chambers",
"about": "There are four chambers: two atria on top, two ventricles below. Atria are thin-walled collecting rooms that receive blood from veins; ventricles are thick-walled pumps that push blood into arteries. Right chambers handle oxygen-poor blood, left chambers oxygen-rich blood, and a muscular wall (the septum) keeps the two sides apart. The left ventricle's wall is about three times thicker than the right's, because it must push blood around the whole body rather than just to the nearby lungs.",
"points": [
"Right side, body to lungs: venae cavae → right atrium → tricuspid valve → right ventricle → pulmonary valve → pulmonary artery → lungs.",
"Left side, lungs to body: lungs → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → body.",
"Atria receive; ventricles pump out."
],
"tip": "A comes before V in the alphabet and in the blood's path: atrium first, then ventricle, on each side."
},
{
"cat": "valve",
"title": "Valves",
"about": "Four one-way valves stop blood flowing backwards. The two atrioventricular (AV) valves sit between each atrium and its ventricle: the tricuspid on the right (three flaps) and the mitral, or bicuspid, on the left (two flaps). The two semilunar valves sit where blood leaves each ventricle: the pulmonary valve into the pulmonary artery and the aortic valve into the aorta. Valves open and close passively, pushed by pressure differences. The AV valves close as the ventricles start to squeeze (the 'lub'), and the semilunar valves close as the ventricles relax (the 'dub').",
"points": [
"One heartbeat: atria contract and top up the ventricles → ventricles squeeze, tricuspid and mitral close ('lub') → pulmonary and aortic valves open, blood pumped out → ventricles relax, pulmonary and aortic close ('dub') → tricuspid and mitral open, ventricles refill.",
"Each side has an inlet valve (AV) then an outlet valve (semilunar).",
"Right: tricuspid then pulmonary. Left: mitral then aortic."
],
"tip": "'Try before you buy': TRIcuspid on the right before BIcuspid (mitral) on the left. And 'lub' = inlets shut, 'dub' = outlets shut."
},
{
"cat": "vessel",
"title": "Big vessels",
"about": "Arteries carry blood away from the heart and veins carry it back towards the heart, whatever its oxygen level. That is why the pulmonary artery carries oxygen-poor blood and the pulmonary veins carry oxygen-rich blood, the reverse of the usual pattern. The venae cavae bring the body's blood into the right atrium, and the aorta takes blood out of the left ventricle to the body. The coronary arteries branch off the very start of the aorta and feed the heart muscle itself.",
"points": [
"Out from the heart and back: aorta → arteries → arterioles → capillaries → venules → veins → venae cavae.",
"Exchange of gases and nutrients happens only in the capillaries, whose walls are one cell thick.",
"Artery = Away from the heart; vein = back in."
],
"tip": "A for Artery, A for Away. The name follows direction, not oxygen."
},
{
"cat": "electric",
"title": "Electrical system",
"about": "Heart muscle beats on its own because of specialised cells that generate and conduct electrical signals. The sinoatrial (SA) node in the wall of the right atrium fires first and sets the rate, so it is the natural pacemaker. The signal spreads through both atria, then reaches the atrioventricular (AV) node, which holds it back for about a tenth of a second so the ventricles can finish filling. The signal then runs down the bundle of His and its left and right bundle branches in the septum, and finally through the Purkinje fibres in the ventricle walls, which make the ventricles squeeze from the tip upwards.",
"points": [
"Order: SA node fires → signal spreads across both atria → AV node delays it while atria contract → bundle of His → bundle branches → Purkinje fibres → ventricles contract.",
"SA node = starts the beat; AV node = delays; Purkinje fibres = spread through ventricles.",
"An ECG records this electrical sequence.",
"ECG waves: P wave = atria depolarise (then contract); QRS complex = ventricles depolarise (then contract), hiding atrial repolarisation; T wave = ventricles repolarise (then relax)."
],
"tip": "S before A before V... the signal travels Sinoatrial → Atria → AV node → Ventricles, top to bottom."
},
{
"cat": "blood",
"title": "Blood cells and plasma",
"about": "Blood is a connective tissue: cells and cell fragments (the formed elements) floating in a liquid called plasma. Plasma is about 55% of blood volume and is mostly water, carrying proteins such as albumin, nutrients, hormones, gases and wastes. Red blood cells (erythrocytes) are biconcave discs with no nucleus, packed with haemoglobin, an iron-containing protein that carries oxygen. The haematocrit is the percentage of blood volume made up of red cells. White blood cells (leukocytes) defend the body. Neutrophils are the most common and eat bacteria; lymphocytes (B and T cells) give specific, remembered immunity; monocytes leave the blood and become macrophages. Two rarer types are eosinophils, which fight parasites and dampen allergic reactions, and basophils, which release histamine and heparin.",
"points": [
"Plasma: liquid part, about 55% of blood, mostly water; albumin holds water in the blood.",
"Red cells: no nucleus, live about 120 days, made in red bone marrow when the kidneys release EPO.",
"Haemoglobin: four haem groups, each with one iron atom, so up to four oxygen molecules per molecule.",
"Haematocrit: about 42–52% in men and 37–48% in women; low in anaemia, high in dehydration.",
"White cells, most to least common: neutrophils, lymphocytes, monocytes, eosinophils, basophils.",
"Neutrophils eat bacteria; lymphocytes recognise and remember; monocytes become macrophages."
],
"tip": "'Never Let Monkeys Eat Bananas' gives the white cells from most to least common: Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils."
},
{
"cat": "clot",
"title": "Clotting and blood groups",
"about": "Haemostasis is how bleeding stops, in three stages. First, the damaged vessel narrows (vascular spasm). Second, platelets, small cell fragments from marrow cells called megakaryocytes, stick to the exposed wall and to each other, forming a platelet plug. Third, coagulation: a chain of clotting factors, most made by the liver with the help of vitamin K and needing calcium, ends with thrombin turning fibrinogen into fibrin threads that turn the plug into a firm clot. Blood groups come from antigens on red cells. In the ABO system, cells carry A, B, both or neither, and plasma holds antibodies against the antigen the cells lack. The Rh (D) antigen makes blood positive or negative; an Rh-negative person makes anti-D only after meeting Rh-positive cells.",
"points": [
"Haemostasis order: vascular spasm → platelet plug → coagulation (fibrin clot).",
"Thrombin turns soluble fibrinogen into insoluble fibrin; vitamin K and calcium are needed.",
"Group A has anti-B, group B has anti-A, group AB has neither, group O has both.",
"O negative red cells: emergency 'universal donor'. AB positive: 'universal recipient'.",
"A wrong transfusion makes donor cells clump (agglutinate) and burst (haemolyse).",
"Anti-D forms only after exposure; it can harm a later Rh-positive baby, so Rh-negative mothers get anti-D injections."
],
"tip": "Your plasma holds antibodies to the letters you do not have: A has anti-B, B has anti-A, O has both, AB has none."
},
{
"cat": "output",
"title": "Output and pressure",
"about": "Cardiac output is the blood one ventricle pumps each minute: heart rate × stroke volume, about 5 litres at rest. Stroke volume is end-diastolic volume minus end-systolic volume, about 70 mL. Three things set it. Preload is the stretch on the ventricle walls at the end of filling; by the Frank–Starling law, more stretch gives a stronger beat, so the heart pumps out what returns to it. Contractility is the strength of contraction at a given stretch, raised by sympathetic nerves and adrenaline. Afterload is the arterial pressure the ventricle must beat to open its outlet valve; more afterload means a smaller stroke volume. Blood pressure is written systolic (peak, during ejection) over diastolic (lowest, during relaxation). Mean arterial pressure is the average driving pressure. Two systems keep it steady: the fast baroreceptor reflex, through nerves, and the slower renin–angiotensin–aldosterone system, through hormones and the kidneys.",
"points": [
"Cardiac output = heart rate × stroke volume (70 × 70 mL ≈ 5 L/min).",
"Stroke volume = end-diastolic volume − end-systolic volume (130 − 60 = 70 mL).",
"More preload or contractility raises stroke volume; more afterload lowers it.",
"MAP ≈ diastolic + (systolic − diastolic) ÷ 3; at 120/80 that is about 93 mmHg.",
"Baroreceptors in the carotid sinuses and aortic arch signal the medulla: high pressure → slower heart and wider vessels; low pressure → the reverse.",
"Low pressure at the kidneys → renin → angiotensin I → (ACE) angiotensin II → narrower arterioles and aldosterone → more sodium and water kept."
],
"tip": "Preload is the filling before the squeeze; afterload is the pressure after the valve that the squeeze must beat."
}
],
"outro": "For the sequence game, trace one drop of blood: body, right side, lungs, left side, body. Each side always goes vein, atrium, inlet valve, ventricle, outlet valve, artery."
}
});
