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
"An ECG records this electrical sequence."
],
"tip": "S before A before V... the signal travels Sinoatrial → Atria → AV node → Ventricles, top to bottom."
}
],
"outro": "For the sequence game, trace one drop of blood: body, right side, lungs, left side, body. Each side always goes vein, atrium, inlet valve, ventricle, outlet valve, artery."
}
});
