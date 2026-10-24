/* Bone Rush — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "bone-rush",
"title": "Bone Rush",
"subject": "anatomy",
"subjectName": "Anatomy & Physiology",
"chapter": "7–8",
"tagline": "Learn the skeleton, one bone at a time",
"itemNoun": "bone",
"categories": [
{
"id": "skull",
"name": "Skull and face",
"color": "cat-coral",
"icon": "skull"
},
{
"id": "spine",
"name": "Spine",
"color": "cat-amber",
"icon": "spine"
},
{
"id": "chest",
"name": "Chest",
"color": "cat-lemon",
"icon": "ribs"
},
{
"id": "arm",
"name": "Shoulder and arm",
"color": "cat-sage",
"icon": "arm"
},
{
"id": "hand",
"name": "Wrist and hand",
"color": "cat-mint",
"icon": "hand"
},
{
"id": "pelvis",
"name": "Pelvis",
"color": "cat-sky",
"icon": "pelvis"
},
{
"id": "leg",
"name": "Leg",
"color": "cat-lilac",
"icon": "leg"
},
{
"id": "foot",
"name": "Ankle and foot",
"color": "cat-orchid",
"icon": "foot"
}
],
"categoryLabel": "Region",
"hint": "Start with Explore, then test yourself. Each round is 10 questions; your best scores are saved on this device.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{where}",
"{category}"
],
"detail": [
{
"label": "Region",
"field": "{category}"
},
{
"label": "Where",
"field": "{where}"
},
{
"label": "How many",
"field": "{count}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the skeleton",
"desc": "Tap any bone to learn where it is and what it does.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "where",
"format": "quiz",
"title": "Where is it?",
"desc": "See the bone, pick where it sits.",
"icon": "?",
"color": "cat-sky",
"prompt": "Where in the body is the",
"show": "name",
"showAs": "big",
"answer": "where",
"answerAs": "small"
},
{
"id": "which",
"format": "quiz",
"title": "Which bone?",
"desc": "See the place, name the bone.",
"icon": "Fm",
"color": "cat-lemon",
"prompt": "Which bone is found here?",
"show": "where",
"showAs": "text",
"answer": "name"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each bone with where it sits.",
"icon": "⇄",
"color": "cat-mint",
"clue": "where",
"clueLabel": "Where"
},
{
"id": "region",
"format": "sortit",
"title": "Which region?",
"desc": "Sort each bone into its body region.",
"icon": "⌖",
"color": "cat-orchid",
"prompt": "Which part of the skeleton is this in?"
}
],
"items": [
{
"name": "Frontal bone",
"icon": "anat1-frontal",
"cat": "skull",
"where": "Forehead",
"count": "1",
"summary": "The broad, curved bone that forms your forehead and the roof of your eye sockets.",
"life": "When you rest your forehead in your hand, you are touching your frontal bone.",
"num": 1,
"spot": "frontal",
"facts": [
"A single midline bone; it was two halves at birth that usually fuse in early childhood.",
"Forms the forehead and the upper rims and roofs of both eye sockets.",
"Contains the frontal sinuses, air spaces just above the eyebrows.",
"Meets the parietal bones at the coronal suture across the top of the head."
]
},
{
"name": "Parietal bones",
"icon": "anat1-parietal",
"cat": "skull",
"where": "Top and sides of the skull",
"count": "2",
"summary": "A pair of large plates that make most of the roof and sides of the skull.",
"life": "A baby's soft spot sits where the parietal and frontal bones have not yet joined.",
"num": 2,
"spot": "parietal",
"facts": [
"Paired: left and right parietal bones meet along the top midline at the sagittal suture.",
"Form most of the roof and upper side walls of the brain case.",
"Sit behind the frontal bone and in front of the occipital bone.",
"Not to be confused with temporal bones, which lie lower down, around the ears."
]
},
{
"name": "Occipital bone",
"icon": "anat1-occipital",
"cat": "skull",
"where": "Back of the skull",
"count": "1",
"summary": "The bone at the back and base of the skull, with the large hole the spinal cord passes through.",
"life": "The bump you feel at the back of your head when you lie on a pillow is your occipital bone.",
"num": 3,
"spot": "occipital",
"facts": [
"A single bone at the back and base of the skull.",
"Its large opening, the foramen magnum, lets the spinal cord join the brain.",
"Its two knobs (condyles) rest on the first neck vertebra, letting you nod."
]
},
{
"name": "Temporal bones",
"icon": "anat1-temporal",
"cat": "skull",
"where": "Sides of the head, around the ears",
"count": "2",
"summary": "Bones on each side of the skull that hold the ear canal and the tiny hearing bones.",
"life": "The hard bump behind each ear (the mastoid) is part of the temporal bone.",
"num": 4,
"spot": "temporal",
"facts": [
"Paired, low on each side of the skull, under the parietal bones.",
"House the middle and inner ear, including the ear canal and hearing ossicles.",
"The mandible hinges against them at the jaw joint (temporomandibular joint).",
"The mastoid process behind the ear is part of this bone."
]
},
{
"name": "Mandible",
"icon": "anat1-mandible",
"cat": "skull",
"where": "Lower jaw",
"count": "1",
"summary": "The lower jaw: the only skull bone with a movable joint, hinging every time you talk or chew.",
"life": "Every bite of food and every word you say moves your mandible.",
"num": 5,
"spot": "mandible",
"facts": [
"The only freely movable skull bone, hinging at the temporomandibular joint.",
"Holds the lower teeth; the maxilla holds the upper teeth.",
"Single bone in adults: its two halves fuse at the chin in infancy."
]
},
{
"name": "Maxilla",
"icon": "anat1-maxilla",
"cat": "skull",
"where": "Upper jaw",
"count": "2 (fused into one upper jaw)",
"summary": "The upper jaw, which holds the top teeth and forms part of the nose and eye sockets.",
"life": "Your top teeth are anchored in the maxilla.",
"num": 6,
"spot": "maxilla",
"facts": [
"Upper jaw; fixed in place, unlike the mandible below it.",
"Two maxillae fuse in the midline, which is why the count is '2 (fused)'.",
"Forms the front of the hard palate, the floor of the eye sockets and walls of the nose.",
"Contains the maxillary sinuses, the largest sinuses."
]
},
{
"name": "Zygomatic bones",
"icon": "anat1-zygomatic",
"cat": "skull",
"where": "Cheekbones",
"count": "2",
"summary": "The cheekbones, which shape the face below each eye.",
"life": "High cheekbones in a portrait are the zygomatic bones.",
"num": 7,
"spot": "zygomatic",
"facts": [
"Paired cheekbones, forming the outer side and floor of each eye socket.",
"Join the temporal bone to form the zygomatic arch, felt in front of the ear.",
"Do not confuse with maxilla: zygomatic is the cheek, maxilla is the upper jaw."
]
},
{
"name": "Nasal bones",
"icon": "anat1-nasal",
"cat": "skull",
"where": "Bridge of the nose",
"count": "2",
"summary": "Two small bones forming the bridge of the nose; the rest of the nose is cartilage.",
"life": "Glasses rest on your nasal bones.",
"num": 8,
"spot": "nasal",
"facts": [
"Two small, thin bones side by side forming the upper bridge of the nose.",
"The lower, flexible part of the nose is cartilage, not bone.",
"Their small size and exposed spot make them the most often broken facial bones."
]
},
{
"name": "Cervical vertebrae",
"icon": "anat1-cervical",
"cat": "spine",
"where": "Neck",
"count": "7",
"summary": "The seven small vertebrae of the neck, built for turning and nodding the head.",
"life": "Nodding yes and shaking your head no both happen in your cervical vertebrae.",
"num": 9,
"spot": "cervical",
"facts": [
"Seven in the neck (C1–C7), the smallest and most mobile vertebrae.",
"C1 (atlas) holds up the skull for nodding; C2 (axis) lets the head turn side to side.",
"Only cervical vertebrae have holes in their side processes for arteries to the brain."
]
},
{
"name": "Thoracic vertebrae",
"icon": "anat1-thoracic",
"cat": "spine",
"where": "Upper and middle back",
"count": "12",
"summary": "Twelve vertebrae of the upper back; each one connects to a pair of ribs.",
"life": "The bony bumps you can feel down the middle of your upper back are thoracic vertebrae.",
"num": 10,
"spot": "thoracic",
"facts": [
"Twelve vertebrae (T1–T12) in the upper and middle back.",
"The only vertebrae with joints for ribs, which is how you recognise them.",
"Their long downward-pointing spines are the bumps felt along the upper back."
]
},
{
"name": "Lumbar vertebrae",
"icon": "anat1-lumbar",
"cat": "spine",
"where": "Lower back",
"count": "5",
"summary": "Five large, strong vertebrae that carry most of the upper body's weight.",
"life": "Lower back pain from lifting badly usually involves the lumbar vertebrae.",
"num": 11,
"spot": "lumbar",
"facts": [
"Five vertebrae (L1–L5) in the lower back, the largest movable vertebrae.",
"Thick bodies because they carry the weight of the whole upper body.",
"Sit between the last thoracic vertebra and the sacrum; they have no rib joints."
]
},
{
"name": "Sacrum",
"icon": "anat1-sacrum",
"cat": "spine",
"where": "Base of the spine, between the hips",
"count": "1",
"summary": "A triangle-shaped bone made of five fused vertebrae that links the spine to the pelvis.",
"life": "When you sit back in a chair, the flat area at the base of your spine is the sacrum.",
"num": 12,
"spot": "sacrum",
"facts": [
"Five vertebrae fused into one triangle, counted as a single bone.",
"Wedged between the two hip bones at the sacroiliac joints, closing the pelvis at the back.",
"Sits below the lumbar vertebrae and above the coccyx."
]
},
{
"name": "Coccyx",
"icon": "anat1-coccyx",
"cat": "spine",
"where": "Tailbone",
"count": "1",
"summary": "The tailbone: a few tiny fused vertebrae at the very bottom of the spine.",
"life": "Falling hard onto your bottom can bruise or break the coccyx.",
"num": 13,
"spot": "coccyx",
"facts": [
"Usually four tiny fused vertebrae, the lowest end of the spine.",
"Hangs below the sacrum; don't confuse it with the sacrum, which is larger and joins the hips.",
"Anchors some muscles and ligaments of the pelvic floor."
]
},
{
"name": "Sternum",
"icon": "anat1-sternum",
"cat": "chest",
"where": "Breastbone, centre of the chest",
"count": "1",
"summary": "The flat breastbone in the middle of the chest, where most ribs attach at the front.",
"life": "In CPR, the chest compressions push down on the sternum.",
"num": 14,
"spot": "sternum",
"facts": [
"A single flat midline bone: manubrium on top, body in the middle, xiphoid tip below.",
"Ribs 1–7 join it directly through their own costal cartilages.",
"The clavicles meet its top part, the manubrium."
]
},
{
"name": "Ribs",
"icon": "ribs",
"cat": "chest",
"where": "Around the chest",
"count": "24 (12 pairs)",
"summary": "Curved bones that form a protective cage around the heart and lungs.",
"life": "Your ribs lift and spread every time you take a deep breath.",
"num": 15,
"spot": "ribs",
"facts": [
"Twelve pairs; every rib joins a thoracic vertebra at the back.",
"Pairs 1–7 are true ribs, 8–12 false ribs; 11 and 12 float with no front attachment.",
"Joined to the sternum by flexible costal cartilage, letting the chest expand."
]
},
{
"name": "Clavicle",
"icon": "anat1-clavicle",
"cat": "arm",
"where": "Collarbone",
"count": "2",
"summary": "The collarbone: an S-shaped bone that holds the shoulder out to the side.",
"life": "It is one of the most commonly broken bones, often from falling onto an outstretched arm.",
"num": 16,
"spot": "clavicle",
"facts": [
"Paired S-shaped collarbone, running from the sternum to the scapula.",
"The only bony link between the arm and the trunk; acts like a strut.",
"Lies at the front of the shoulder; the scapula is at the back."
]
},
{
"name": "Scapula",
"icon": "anat1-scapula",
"cat": "arm",
"where": "Shoulder blade",
"count": "2",
"summary": "The flat, triangular shoulder blade on the upper back.",
"life": "You can feel your scapula move when you shrug or reach behind you.",
"num": 17,
"spot": "scapula",
"facts": [
"Paired flat triangular bone lying over the back of the upper ribs.",
"Its shallow socket (glenoid cavity) holds the head of the humerus.",
"Its tip, the acromion, joins the clavicle at the top of the shoulder."
]
},
{
"name": "Humerus",
"icon": "anat1-humerus",
"cat": "arm",
"where": "Upper arm",
"count": "2",
"summary": "The long bone of the upper arm, from shoulder to elbow.",
"life": "The 'funny bone' tingle is a nerve passing over the lower end of the humerus at the elbow.",
"num": 18,
"spot": "humerus",
"facts": [
"The single long bone of each upper arm, paired overall.",
"Its round head fits the scapula's socket; its lower end joins the radius and ulna at the elbow.",
"The arm's equivalent of the femur in the leg."
]
},
{
"name": "Radius",
"icon": "anat1-radius",
"cat": "arm",
"where": "Forearm, thumb side",
"count": "2",
"summary": "The forearm bone on the thumb side; it rotates to turn the palm up or down.",
"life": "Turning a door handle or a key uses your radius rolling over the ulna.",
"num": 19,
"spot": "radius",
"facts": [
"Lies on the thumb side of the forearm, the lateral side in anatomical position.",
"Its head spins against the ulna to turn the palm up (supination) or down (pronation).",
"Forms most of the wrist joint; a fall on the hand often breaks its lower end."
]
},
{
"name": "Ulna",
"icon": "anat1-ulna",
"cat": "arm",
"where": "Forearm, little-finger side",
"count": "2",
"summary": "The forearm bone on the little-finger side, forming the point of the elbow.",
"life": "Leaning on your elbow puts your weight on the end of the ulna.",
"num": 20,
"spot": "ulna",
"facts": [
"Lies on the little-finger side of the forearm, the medial side.",
"Its hook-shaped top, the olecranon, is the bony point of the elbow.",
"Forms the main hinge of the elbow with the humerus; the radius rotates around it."
]
},
{
"name": "Carpals",
"icon": "anat1-carpals",
"cat": "hand",
"where": "Wrist",
"count": "16 (8 per wrist)",
"summary": "Eight small bones in each wrist, arranged in two rows.",
"life": "Typing and phone scrolling all move the carpal bones; carpal tunnel syndrome is named after them.",
"num": 21,
"spot": "carpals",
"facts": [
"Eight per wrist in two rows of four, so 16 in total.",
"Lie between the forearm bones and the metacarpals.",
"The scaphoid, on the thumb side, is the carpal most often broken."
]
},
{
"name": "Metacarpals",
"icon": "anat1-metacarpals",
"cat": "hand",
"where": "Palm of the hand",
"count": "10 (5 per hand)",
"summary": "Five long bones in each palm, one leading to each finger.",
"life": "Your knuckles are the ends of the metacarpals.",
"num": 22,
"spot": "metacarpals",
"facts": [
"Five per hand, numbered I (thumb) to V (little finger).",
"Lie between the carpals and the finger phalanges, forming the palm.",
"'Meta' means beyond: these bones lie beyond the carpals."
]
},
{
"name": "Phalanges of the hand",
"icon": "anat1-phal-hand",
"cat": "hand",
"where": "Fingers",
"count": "28 (14 per hand)",
"summary": "The finger bones: three in each finger and two in the thumb.",
"life": "Every tap on a phone screen moves the phalanges of your fingers.",
"num": 23,
"spot": "phalanges-hand",
"facts": [
"Fourteen per hand: three per finger, two in the thumb.",
"Named proximal, middle and distal; the thumb lacks a middle phalanx.",
"Same name and pattern as the toe bones, but in the hand."
]
},
{
"name": "Ilium",
"icon": "anat1-ilium",
"cat": "pelvis",
"where": "Upper hip, where you rest your hands",
"count": "2",
"summary": "The large, wing-shaped top part of each hip bone.",
"life": "When you put your hands on your hips, they rest on the ilium.",
"num": 24,
"spot": "ilium",
"facts": [
"The largest, uppermost part of each hip bone, shaped like a wing.",
"Its top edge, the iliac crest, is where your hands rest on your hips.",
"Joins the sacrum at the back at the sacroiliac joint."
]
},
{
"name": "Ischium",
"icon": "anat1-ischium",
"cat": "pelvis",
"where": "Sitting bones",
"count": "2",
"summary": "The lower, back part of each hip bone, which takes your weight when you sit.",
"life": "On a hard bench you can feel your ischium: the 'sit bones'.",
"num": 25,
"spot": "ischium",
"facts": [
"The lower, back part of each hip bone.",
"Its thick ischial tuberosities are the 'sit bones' that bear weight when seated.",
"Fuses with the ilium and pubis at the hip socket (acetabulum)."
]
},
{
"name": "Pubis",
"icon": "anat1-pubis",
"cat": "pelvis",
"where": "Front of the pelvis",
"count": "2",
"summary": "The front part of each hip bone; the two meet in the middle at a joint of cartilage.",
"life": "The bony front of the pelvis, just below the belly, is the pubis.",
"num": 26,
"spot": "pubis",
"facts": [
"The front part of each hip bone, below the belly.",
"Left and right pubic bones meet at the pubic symphysis, a cartilage joint.",
"Front = pubis; bottom-back = ischium; top = ilium."
]
},
{
"name": "Femur",
"icon": "anat1-femur",
"cat": "leg",
"where": "Thigh",
"count": "2",
"summary": "The thigh bone: the longest and strongest bone in the body.",
"life": "Every step, squat and stair you climb is carried by your femur.",
"num": 27,
"spot": "femur",
"facts": [
"Longest, heaviest and strongest bone in the body, one per thigh.",
"Its ball-shaped head fits into the hip socket of the pelvis.",
"Its lower end meets the tibia at the knee, with the patella in front."
]
},
{
"name": "Patella",
"icon": "anat1-patella",
"cat": "leg",
"where": "Kneecap",
"count": "2",
"summary": "The kneecap: a small bone inside the tendon at the front of the knee.",
"life": "Kneeling on the floor puts pressure on your patella.",
"num": 28,
"spot": "patella",
"facts": [
"A sesamoid bone: it forms inside the quadriceps tendon.",
"Protects the front of the knee and improves the leverage of the thigh muscles.",
"Sits in front of the knee joint, over the lower end of the femur."
]
},
{
"name": "Tibia",
"icon": "anat1-tibia",
"cat": "leg",
"where": "Shin",
"count": "2",
"summary": "The shin bone: the larger, weight-bearing bone of the lower leg.",
"life": "Bumping your shin on a coffee table hurts because the tibia sits just under the skin.",
"num": 29,
"spot": "tibia",
"facts": [
"The larger, inner (big-toe side) bone of the lower leg.",
"The only lower-leg bone that carries body weight from the femur.",
"Its lower end is the bump on the inside of the ankle (medial malleolus)."
]
},
{
"name": "Fibula",
"icon": "anat1-fibula",
"cat": "leg",
"where": "Outer side of the lower leg",
"count": "2",
"summary": "The thin bone running beside the tibia on the outer side of the lower leg.",
"life": "The bump on the outside of your ankle is the lower end of the fibula.",
"num": 30,
"spot": "fibula",
"facts": [
"Thin bone on the outer side of the lower leg, beside the tibia.",
"Carries little weight; it mainly anchors muscles and steadies the ankle.",
"Does not reach the knee joint; the tibia alone meets the femur."
]
},
{
"name": "Calcaneus",
"icon": "anat1-calcaneus",
"cat": "foot",
"where": "Heel",
"count": "2",
"summary": "The heel bone: the largest bone of the foot.",
"life": "Your heel strikes the ground first with every walking step.",
"num": 31,
"spot": "calcaneus",
"facts": [
"Largest tarsal bone, forming the heel.",
"The Achilles tendon attaches to its back.",
"Sits below and behind the talus; do not confuse the two."
]
},
{
"name": "Talus",
"icon": "anat1-talus",
"cat": "foot",
"where": "Ankle, between the shin and the heel",
"count": "2",
"summary": "The ankle bone that sits on top of the heel bone and passes the leg's weight into the foot.",
"life": "When you point and flex your foot, your shin bones rock over the talus.",
"num": 32,
"spot": "talus",
"facts": [
"A tarsal bone that forms the ankle joint with the tibia and fibula.",
"Sits on top of the calcaneus and passes body weight from the leg to the foot.",
"Second largest tarsal, after the calcaneus."
]
},
{
"name": "Metatarsals",
"icon": "anat1-metatarsals",
"cat": "foot",
"where": "Middle of the foot",
"count": "10 (5 per foot)",
"summary": "Five long bones in each foot, one leading to each toe.",
"life": "The ball of your foot, where high heels press, is the front ends of the metatarsals.",
"num": 33,
"spot": "metatarsals",
"facts": [
"Five per foot, numbered I (big toe) to V (little toe).",
"Lie between the tarsals and the toe phalanges, forming the middle of the foot.",
"The foot's version of the metacarpals in the hand."
]
},
{
"name": "Phalanges of the foot",
"icon": "anat1-phal-foot",
"cat": "foot",
"where": "Toes",
"count": "28 (14 per foot)",
"summary": "The toe bones: three in each toe and two in the big toe.",
"life": "Stubbing your toe on a door frame hits the phalanges of the foot.",
"num": 34,
"spot": "phalanges-foot",
"facts": [
"Fourteen per foot: three per toe, two in the big toe.",
"The big toe (hallux) lacks a middle phalanx, like the thumb.",
"Shorter than finger phalanges, because toes mainly help balance and push-off."
]
}
],
"milestone": {
"text": "That's {num} bones in a row: one more for your skeleton."
},
"diagram": "skeleton",
"diagramCaption": "Where it is in the skeleton",
"notes": {
"intro": "The adult skeleton has about 206 bones, and this game covers the main ones you need to name and place. Saladin splits them into the axial skeleton (skull, spine, ribs and sternum: the body's central axis) and the appendicular skeleton (the limbs plus the girdles that attach them). Learn each bone by region first: once you know which region a bone belongs to, its exact position and count are much easier to remember. Many limb bones come in left-right pairs, which is why so many counts are '2'.",
"sections": [
{
"cat": "skull",
"title": "Skull and face",
"about": "The skull has cranial bones, which box in the brain, and facial bones, which shape the face and hold the teeth. Frontal, parietal, occipital and temporal bones form the brain case: frontal at the front, parietal on top, occipital at the back, temporal at the sides around the ears. The facial bones here are the mandible, maxilla, zygomatic and nasal bones. Single bones sit on the midline (frontal, occipital, mandible), while paired bones come as left and right copies (parietal, temporal, zygomatic, nasal). Skull bones are locked together by immovable joints called sutures; the mandible is the one exception, moving at the jaw joint.",
"points": [
"Single: frontal, occipital, mandible. Paired: parietal, temporal, zygomatic, nasal, maxilla (fused in the midline).",
"Mandible = lower jaw (moves). Maxilla = upper jaw (fixed).",
"Brain case order front to back: frontal, then parietal on top, then occipital."
],
"tip": "Front-al is at the front; occipital is at the back, where you'd lean against a wall. Temporal is by your temples and ears."
},
{
"cat": "spine",
"title": "Spine (vertebral column)",
"about": "The vertebral column runs from the skull to the tailbone in five regions: cervical, thoracic, lumbar, sacral and coccygeal. The first three are made of separate, movable vertebrae; the sacrum and coccyx are fused. Vertebrae get bigger as you go down, because each one carries more of the body's weight above it. Thoracic vertebrae are the ones that join the ribs. Quizzes often test the counts, so learn 7, 12 and 5.",
"points": [
"Top to bottom: cervical (7), thoracic (12), lumbar (5), sacrum (5 fused), coccyx (about 4 fused).",
"Cervical = neck, thoracic = upper and middle back, lumbar = lower back.",
"Sacrum sits between the hip bones; the coccyx hangs below it as the tailbone."
],
"tip": "Breakfast at 7, lunch at 12, dinner at 5: 7 cervical, 12 thoracic, 5 lumbar."
},
{
"cat": "chest",
"title": "Chest (thoracic cage)",
"about": "The thoracic cage is made of the sternum in front, 12 pairs of ribs at the sides and the 12 thoracic vertebrae behind. It protects the heart and lungs and moves with every breath. The sternum is a single flat bone in the midline, while the ribs come as 24 curved bones. Ribs are linked to the sternum by strips of costal cartilage, which lets the cage flex.",
"points": [
"Ribs 1–7 are true ribs (own cartilage to the sternum); 8–12 are false ribs, and 11–12 are floating ribs.",
"Every rib joins a thoracic vertebra at the back.",
"Sternum has three parts: manubrium (top), body, and xiphoid process (tip)."
],
"tip": "Think of a birdcage: the sternum is the front bar, the ribs are the curved wires, the spine is the back post."
},
{
"cat": "arm",
"title": "Shoulder and arm",
"about": "The shoulder girdle (clavicle and scapula) attaches the arm to the trunk; then come the humerus in the upper arm and the radius and ulna in the forearm. The clavicle is the only bony link between the arm and the trunk, joining the sternum. The scapula lies on the back of the ribcage and holds the socket for the humerus. In the forearm, the radius is on the thumb side and the ulna on the little-finger side. The radius rotates around the ulna to turn the palm up and down.",
"points": [
"Order from trunk outwards: clavicle → scapula → humerus → radius and ulna.",
"Radius = thumb side; ulna = little-finger side and forms the point of the elbow.",
"All bones of this region are paired: count 2 each."
],
"tip": "'Thumbs up for the radius': the radius always follows your thumb."
},
{
"cat": "hand",
"title": "Wrist and hand",
"about": "Each hand has 27 bones in three groups: carpals in the wrist, metacarpals in the palm, phalanges in the fingers. There are 8 carpals in two rows of four, 5 metacarpals (one per digit) and 14 phalanges. Each finger has three phalanges (proximal, middle, distal), but the thumb has only two. The prefix 'meta' means 'beyond', so metacarpals lie beyond the carpals.",
"points": [
"Per hand: 8 carpals + 5 metacarpals + 14 phalanges = 27.",
"Both hands: 16 carpals, 10 metacarpals, 28 phalanges.",
"Knuckles are the heads (ends) of the metacarpals."
],
"tip": "Carpal = car-park at the wrist where the arm parks; meta-carpal is the road beyond; phalanges are the fingers' little soldiers in a row."
},
{
"cat": "pelvis",
"title": "Pelvis (hip bone)",
"about": "Each hip bone (os coxae) starts as three separate bones, the ilium, ischium and pubis, which fuse during the teenage years. All three meet at the hip socket (acetabulum), where the femur fits. The ilium is the large upper wing, the ischium is the lower back part you sit on, and the pubis is the front part. The two pubic bones meet at the front at the pubic symphysis, a cartilage joint. The sacrum closes the pelvic ring at the back.",
"points": [
"Ilium = top (hands on hips). Ischium = bottom-back (sit bones). Pubis = front.",
"All three meet at the acetabulum, the hip socket.",
"Each is paired: one on the left hip bone, one on the right."
],
"tip": "'I sit on my ISchium'; the Ilium is the hIgh part; the Pubis is at the front."
},
{
"cat": "leg",
"title": "Leg",
"about": "The leg mirrors the arm: one bone in the thigh (femur) and two in the lower leg (tibia and fibula), plus the kneecap (patella). The femur is the body's longest and strongest bone. The tibia is the thick, weight-bearing shin bone on the inner (big-toe) side; the fibula is the thin bone on the outer side that mainly anchors muscles. The patella is a sesamoid bone, meaning it grows inside a tendon.",
"points": [
"Femur ≈ humerus; tibia and fibula ≈ radius and ulna.",
"Tibia = inner and weight-bearing; fibula = outer and thin.",
"Inner ankle bump = tibia; outer ankle bump = fibula."
],
"tip": "The fibula is the 'fib': a little lie of a bone, thin and not taking the real weight."
},
{
"cat": "foot",
"title": "Ankle and foot",
"about": "The foot copies the hand's pattern: tarsals (ankle and back of the foot), metatarsals (middle of the foot) and phalanges (toes). There are 7 tarsals per foot, and the two biggest are the talus and calcaneus. The talus sits on top and forms the ankle joint with the tibia and fibula; the calcaneus is below and behind it, forming the heel. Like the thumb, the big toe has only two phalanges, while the other toes have three.",
"points": [
"Per foot: 7 tarsals + 5 metatarsals + 14 phalanges = 26.",
"Talus = ankle joint (on top); calcaneus = heel (underneath, largest).",
"Hand vs foot: carpals/tarsals, metacarpals/metatarsals, phalanges in both."
],
"tip": "Talus is Top of the foot's stack; Calcaneus is the Contact point with the ground."
}
],
"outro": "For the quizzes, link each bone to its region and to the body spot you can touch. For counts, remember which bones are single (midline) and which come in pairs."
}
});
