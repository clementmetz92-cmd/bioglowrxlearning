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
"cat": "skull",
"where": "Forehead",
"count": "1",
"summary": "The broad, curved bone that forms your forehead and the roof of your eye sockets.",
"life": "When you rest your forehead in your hand, you are touching your frontal bone.",
"num": 1
},
{
"name": "Parietal bones",
"cat": "skull",
"where": "Top and sides of the skull",
"count": "2",
"summary": "A pair of large plates that make most of the roof and sides of the skull.",
"life": "A baby's soft spot sits where the parietal and frontal bones have not yet joined.",
"num": 2
},
{
"name": "Occipital bone",
"cat": "skull",
"where": "Back of the skull",
"count": "1",
"summary": "The bone at the back and base of the skull, with the large hole the spinal cord passes through.",
"life": "The bump you feel at the back of your head when you lie on a pillow is your occipital bone.",
"num": 3
},
{
"name": "Temporal bones",
"cat": "skull",
"where": "Sides of the head, around the ears",
"count": "2",
"summary": "Bones on each side of the skull that hold the ear canal and the tiny hearing bones.",
"life": "The hard bump behind each ear (the mastoid) is part of the temporal bone.",
"num": 4
},
{
"name": "Mandible",
"cat": "skull",
"where": "Lower jaw",
"count": "1",
"summary": "The lower jaw: the only skull bone with a movable joint, hinging every time you talk or chew.",
"life": "Every bite of food and every word you say moves your mandible.",
"num": 5
},
{
"name": "Maxilla",
"cat": "skull",
"where": "Upper jaw",
"count": "2 (fused into one upper jaw)",
"summary": "The upper jaw, which holds the top teeth and forms part of the nose and eye sockets.",
"life": "Your top teeth are anchored in the maxilla.",
"num": 6
},
{
"name": "Zygomatic bones",
"cat": "skull",
"where": "Cheekbones",
"count": "2",
"summary": "The cheekbones, which shape the face below each eye.",
"life": "High cheekbones in a portrait are the zygomatic bones.",
"num": 7
},
{
"name": "Nasal bones",
"cat": "skull",
"where": "Bridge of the nose",
"count": "2",
"summary": "Two small bones forming the bridge of the nose; the rest of the nose is cartilage.",
"life": "Glasses rest on your nasal bones.",
"num": 8
},
{
"name": "Cervical vertebrae",
"cat": "spine",
"where": "Neck",
"count": "7",
"summary": "The seven small vertebrae of the neck, built for turning and nodding the head.",
"life": "Nodding yes and shaking your head no both happen in your cervical vertebrae.",
"num": 9
},
{
"name": "Thoracic vertebrae",
"cat": "spine",
"where": "Upper and middle back",
"count": "12",
"summary": "Twelve vertebrae of the upper back; each one connects to a pair of ribs.",
"life": "The bony bumps you can feel down the middle of your upper back are thoracic vertebrae.",
"num": 10
},
{
"name": "Lumbar vertebrae",
"cat": "spine",
"where": "Lower back",
"count": "5",
"summary": "Five large, strong vertebrae that carry most of the upper body's weight.",
"life": "Lower back pain from lifting badly usually involves the lumbar vertebrae.",
"num": 11
},
{
"name": "Sacrum",
"cat": "spine",
"where": "Base of the spine, between the hips",
"count": "1",
"summary": "A triangle-shaped bone made of five fused vertebrae that links the spine to the pelvis.",
"life": "When you sit back in a chair, the flat area at the base of your spine is the sacrum.",
"num": 12
},
{
"name": "Coccyx",
"cat": "spine",
"where": "Tailbone",
"count": "1",
"summary": "The tailbone: a few tiny fused vertebrae at the very bottom of the spine.",
"life": "Falling hard onto your bottom can bruise or break the coccyx.",
"num": 13
},
{
"name": "Sternum",
"cat": "chest",
"where": "Breastbone, centre of the chest",
"count": "1",
"summary": "The flat breastbone in the middle of the chest, where most ribs attach at the front.",
"life": "In CPR, the chest compressions push down on the sternum.",
"num": 14
},
{
"name": "Ribs",
"cat": "chest",
"where": "Around the chest",
"count": "24 (12 pairs)",
"summary": "Curved bones that form a protective cage around the heart and lungs.",
"life": "Your ribs lift and spread every time you take a deep breath.",
"num": 15
},
{
"name": "Clavicle",
"cat": "arm",
"where": "Collarbone",
"count": "2",
"summary": "The collarbone: an S-shaped bone that holds the shoulder out to the side.",
"life": "It is one of the most commonly broken bones, often from falling onto an outstretched arm.",
"num": 16
},
{
"name": "Scapula",
"cat": "arm",
"where": "Shoulder blade",
"count": "2",
"summary": "The flat, triangular shoulder blade on the upper back.",
"life": "You can feel your scapula move when you shrug or reach behind you.",
"num": 17
},
{
"name": "Humerus",
"cat": "arm",
"where": "Upper arm",
"count": "2",
"summary": "The long bone of the upper arm, from shoulder to elbow.",
"life": "The 'funny bone' tingle is a nerve passing over the lower end of the humerus at the elbow.",
"num": 18
},
{
"name": "Radius",
"cat": "arm",
"where": "Forearm, thumb side",
"count": "2",
"summary": "The forearm bone on the thumb side; it rotates to turn the palm up or down.",
"life": "Turning a door handle or a key uses your radius rolling over the ulna.",
"num": 19
},
{
"name": "Ulna",
"cat": "arm",
"where": "Forearm, little-finger side",
"count": "2",
"summary": "The forearm bone on the little-finger side, forming the point of the elbow.",
"life": "Leaning on your elbow puts your weight on the end of the ulna.",
"num": 20
},
{
"name": "Carpals",
"cat": "hand",
"where": "Wrist",
"count": "16 (8 per wrist)",
"summary": "Eight small bones in each wrist, arranged in two rows.",
"life": "Typing and phone scrolling all move the carpal bones; carpal tunnel syndrome is named after them.",
"num": 21
},
{
"name": "Metacarpals",
"cat": "hand",
"where": "Palm of the hand",
"count": "10 (5 per hand)",
"summary": "Five long bones in each palm, one leading to each finger.",
"life": "Your knuckles are the ends of the metacarpals.",
"num": 22
},
{
"name": "Phalanges of the hand",
"cat": "hand",
"where": "Fingers",
"count": "28 (14 per hand)",
"summary": "The finger bones: three in each finger and two in the thumb.",
"life": "Every tap on a phone screen moves the phalanges of your fingers.",
"num": 23
},
{
"name": "Ilium",
"cat": "pelvis",
"where": "Upper hip, where you rest your hands",
"count": "2",
"summary": "The large, wing-shaped top part of each hip bone.",
"life": "When you put your hands on your hips, they rest on the ilium.",
"num": 24
},
{
"name": "Ischium",
"cat": "pelvis",
"where": "Sitting bones",
"count": "2",
"summary": "The lower, back part of each hip bone, which takes your weight when you sit.",
"life": "On a hard bench you can feel your ischium: the 'sit bones'.",
"num": 25
},
{
"name": "Pubis",
"cat": "pelvis",
"where": "Front of the pelvis",
"count": "2",
"summary": "The front part of each hip bone; the two meet in the middle at a joint of cartilage.",
"life": "The bony front of the pelvis, just below the belly, is the pubis.",
"num": 26
},
{
"name": "Femur",
"cat": "leg",
"where": "Thigh",
"count": "2",
"summary": "The thigh bone: the longest and strongest bone in the body.",
"life": "Every step, squat and stair you climb is carried by your femur.",
"num": 27
},
{
"name": "Patella",
"cat": "leg",
"where": "Kneecap",
"count": "2",
"summary": "The kneecap: a small bone inside the tendon at the front of the knee.",
"life": "Kneeling on the floor puts pressure on your patella.",
"num": 28
},
{
"name": "Tibia",
"cat": "leg",
"where": "Shin",
"count": "2",
"summary": "The shin bone: the larger, weight-bearing bone of the lower leg.",
"life": "Bumping your shin on a coffee table hurts because the tibia sits just under the skin.",
"num": 29
},
{
"name": "Fibula",
"cat": "leg",
"where": "Outer side of the lower leg",
"count": "2",
"summary": "The thin bone running beside the tibia on the outer side of the lower leg.",
"life": "The bump on the outside of your ankle is the lower end of the fibula.",
"num": 30
},
{
"name": "Calcaneus",
"cat": "foot",
"where": "Heel",
"count": "2",
"summary": "The heel bone: the largest bone of the foot.",
"life": "Your heel strikes the ground first with every walking step.",
"num": 31
},
{
"name": "Talus",
"cat": "foot",
"where": "Ankle, between the shin and the heel",
"count": "2",
"summary": "The ankle bone that sits on top of the heel bone and passes the leg's weight into the foot.",
"life": "When you point and flex your foot, your shin bones rock over the talus.",
"num": 32
},
{
"name": "Metatarsals",
"cat": "foot",
"where": "Middle of the foot",
"count": "10 (5 per foot)",
"summary": "Five long bones in each foot, one leading to each toe.",
"life": "The ball of your foot, where high heels press, is the front ends of the metatarsals.",
"num": 33
},
{
"name": "Phalanges of the foot",
"cat": "foot",
"where": "Toes",
"count": "28 (14 per foot)",
"summary": "The toe bones: three in each toe and two in the big toe.",
"life": "Stubbing your toe on a door frame hits the phalanges of the foot.",
"num": 34
}
],
"milestone": {
"text": "That's {num} bones in a row: one more for your skeleton."
}
});
