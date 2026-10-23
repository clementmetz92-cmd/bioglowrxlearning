/* Digest-a-Meal — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "digest-a-meal",
"title": "Digest-a-Meal",
"subject": "anatomy",
"subjectName": "Anatomy & Physiology",
"chapter": "25–26",
"tagline": "Follow a meal through the digestive system",
"itemNoun": "organ",
"categories": [
{
"id": "tract",
"name": "Digestive tract",
"color": "cat-amber",
"icon": "stomach"
},
{
"id": "helper",
"name": "Helper organs",
"color": "cat-sage",
"icon": "gland"
}
],
"categoryLabel": "Group",
"hint": "Learn the organs and helpers, then put each stage of digestion in order.",
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
"label": "Group",
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
"title": "Explore digestion",
"desc": "Tap any organ to see its job.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "order",
"format": "sequence",
"title": "Put it in order",
"desc": "Order a meal's journey and how food is broken down.",
"icon": "1→",
"color": "cat-amber"
},
{
"id": "job",
"format": "quiz",
"title": "Who does this job?",
"desc": "Read the job, pick the organ.",
"icon": "?",
"color": "cat-sky",
"prompt": "Which organ does this?",
"show": "job",
"showAs": "text",
"answer": "name"
},
{
"id": "group",
"format": "sortit",
"title": "Tract or helper?",
"desc": "Does food pass through it, or does it help from outside?",
"icon": "⌖",
"color": "cat-sage",
"prompt": "Does food pass through this organ?",
"choices": 2
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each organ with its job.",
"icon": "⇄",
"color": "cat-mint",
"clue": "job",
"clueLabel": "Job",
"pairs": 6
}
],
"items": [
{
"name": "Mouth",
"cat": "tract",
"job": "Chews food and starts digesting starch",
"life": "Bread starts to taste sweet if you chew it long enough, as saliva breaks starch into sugar.",
"icon": "stomach",
"num": 1
},
{
"name": "Oesophagus",
"cat": "tract",
"job": "Squeezes food down to the stomach",
"life": "Waves of muscle push food down, so you could even swallow upside down.",
"icon": "stomach",
"num": 2
},
{
"name": "Stomach",
"cat": "tract",
"job": "Churns food with acid and starts digesting protein",
"life": "An empty stomach can stretch to hold a large meal of a litre or more.",
"icon": "stomach",
"num": 3
},
{
"name": "Duodenum",
"cat": "tract",
"job": "First part of the small intestine, where bile and enzymes arrive",
"life": "Ulcers are actually more common here than in the stomach itself.",
"icon": "stomach",
"num": 4
},
{
"name": "Jejunum",
"cat": "tract",
"job": "Middle part of the small intestine: absorbs most nutrients",
"life": "Its lining is covered in millions of tiny finger-like villi that boost absorption.",
"icon": "stomach",
"num": 5
},
{
"name": "Ileum",
"cat": "tract",
"job": "Last part of the small intestine: absorbs vitamin B12 and bile salts",
"life": "Surgery that removes the ileum can lead to B12 deficiency.",
"icon": "stomach",
"num": 6
},
{
"name": "Large intestine",
"cat": "tract",
"job": "Absorbs water and forms stool",
"life": "It is home to trillions of gut bacteria that help digest fibre.",
"icon": "stomach",
"num": 7
},
{
"name": "Rectum",
"cat": "tract",
"job": "Stores stool until you go to the toilet",
"life": "Stretching of the rectum is what gives you the urge to go.",
"icon": "stomach",
"num": 8
},
{
"name": "Salivary glands",
"cat": "helper",
"job": "Make saliva to moisten food and digest starch",
"life": "Your mouth waters at the smell of food because these glands switch on.",
"icon": "drop",
"num": 9
},
{
"name": "Liver",
"cat": "helper",
"job": "Makes bile and processes absorbed nutrients",
"life": "Most nutrients from the gut travel to the liver first, through the portal vein.",
"icon": "gland",
"num": 10
},
{
"name": "Gallbladder",
"cat": "helper",
"job": "Stores bile and squeezes it out after fatty meals",
"life": "Gallstones form here and can cause pain after a fatty meal.",
"icon": "gland",
"num": 11
},
{
"name": "Pancreas",
"cat": "helper",
"job": "Sends digestive enzymes into the small intestine",
"life": "The same organ also makes insulin.",
"icon": "gland",
"num": 12
}
],
"sequences": [
{
"id": "path",
"title": "A meal's journey through the body",
"icon": "stomach",
"steps": [
"Mouth",
"Pharynx",
"Oesophagus",
"Stomach",
"Small intestine",
"Large intestine",
"Rectum",
"Anus"
],
"note": "The whole trip usually takes from one to three days."
},
{
"id": "small",
"title": "The three parts of the small intestine",
"icon": "stomach",
"steps": [
"Duodenum",
"Jejunum",
"Ileum"
],
"note": "Together they are about 6 metres long."
},
{
"id": "swallow",
"title": "Swallowing",
"icon": "stomach",
"steps": [
"The tongue pushes food to the back of the mouth",
"The soft palate rises to close off the nose",
"The epiglottis covers the windpipe",
"Oesophagus muscles squeeze the food down",
"Food passes through the valve into the stomach"
],
"note": "Swallowing starts on purpose but finishes automatically."
},
{
"id": "fat",
"title": "Digesting fat",
"icon": "drop",
"steps": [
"Fatty food reaches the duodenum",
"The gallbladder releases bile",
"Bile breaks fat into tiny droplets",
"Pancreatic enzymes break the fat down",
"The small intestine absorbs it"
],
"note": "Bile works like washing-up liquid on grease."
},
{
"id": "starch",
"title": "From starch to blood sugar",
"icon": "leaf",
"steps": [
"Saliva starts breaking down starch",
"Stomach acid pauses starch digestion",
"Pancreatic enzymes continue in the small intestine",
"The gut lining finishes the job, making glucose",
"Glucose is absorbed into the blood",
"The blood takes it to the liver first"
],
"note": "This is why starchy foods raise blood sugar."
}
]
});
