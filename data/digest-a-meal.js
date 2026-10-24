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
"icon": "anat1-mouth",
"num": 1,
"spot": "mouth",
"facts": [
"Teeth and tongue break food up mechanically and shape it into a soft ball (bolus).",
"Salivary amylase begins chemical digestion of starch here.",
"First stop in the meal's journey, before the pharynx."
],
"summary": "The start of the tract, where food is chewed and mixed with saliva."
},
{
"name": "Oesophagus",
"cat": "tract",
"job": "Squeezes food down to the stomach",
"life": "Waves of muscle push food down, so you could even swallow upside down.",
"icon": "anat1-oesophagus",
"num": 2,
"spot": "oesophagus",
"facts": [
"Moves food by peristalsis but does no digesting or absorbing.",
"Lies behind the trachea and passes through the diaphragm.",
"Ends at the lower oesophageal sphincter, the valve into the stomach."
],
"summary": "The muscular tube that carries swallowed food from the pharynx to the stomach."
},
{
"name": "Stomach",
"cat": "tract",
"job": "Churns food with acid and starts digesting protein",
"life": "An empty stomach can stretch to hold a large meal of a litre or more.",
"icon": "stomach",
"num": 3,
"spot": "stomach",
"facts": [
"Its glands release hydrochloric acid and pepsin, which starts protein digestion.",
"The acid kills many swallowed microbes and stops saliva's starch digestion.",
"Turns food into a soupy mix called chyme, released slowly to the duodenum."
],
"summary": "A J-shaped muscular bag that stores, churns and partly digests food."
},
{
"name": "Duodenum",
"cat": "tract",
"job": "First part of the small intestine, where bile and enzymes arrive",
"life": "Ulcers are actually more common here than in the stomach itself.",
"icon": "anat1-duodenum",
"num": 4,
"spot": "duodenum",
"facts": [
"Receives chyme from the stomach, bile from the gallbladder and juice from the pancreas.",
"Bicarbonate from the pancreas neutralises stomach acid here.",
"First of the three parts: duodenum, then jejunum, then ileum."
],
"summary": "The short, C-shaped first part of the small intestine, about 25 cm long."
},
{
"name": "Jejunum",
"cat": "tract",
"job": "Middle part of the small intestine: absorbs most nutrients",
"life": "Its lining is covered in millions of tiny finger-like villi that boost absorption.",
"icon": "anat1-jejunum",
"num": 5,
"spot": "jejunum",
"facts": [
"Main site of nutrient absorption: sugars, amino acids and fats.",
"Its lining folds, villi and microvilli give it a huge surface area.",
"Comes before the ileum; its walls are thicker and redder than the ileum's."
],
"summary": "The middle part of the small intestine, between the duodenum and ileum."
},
{
"name": "Ileum",
"cat": "tract",
"job": "Last part of the small intestine: absorbs vitamin B12 and bile salts",
"life": "Surgery that removes the ileum can lead to B12 deficiency.",
"icon": "anat1-ileum",
"num": 6,
"spot": "ileum",
"facts": [
"Absorbs vitamin B12 and bile salts, which return to the liver for reuse.",
"Joins the large intestine at the ileocaecal valve.",
"Last of the three small-intestine parts, after the jejunum."
],
"summary": "The last and longest part of the small intestine, ending at the large intestine."
},
{
"name": "Large intestine",
"cat": "tract",
"job": "Absorbs water and forms stool",
"life": "It is home to trillions of gut bacteria that help digest fibre.",
"icon": "anat1-large-intestine",
"num": 7,
"spot": "colon",
"facts": [
"Absorbs water and salts, turning liquid leftovers into solid stool.",
"Its bacteria ferment fibre and make some vitamins, such as vitamin K.",
"Comes after the small intestine and before the rectum in the meal's journey."
],
"summary": "The wider final section of the tract, including the caecum, colon and rectum."
},
{
"name": "Rectum",
"cat": "tract",
"job": "Stores stool until you go to the toilet",
"life": "Stretching of the rectum is what gives you the urge to go.",
"icon": "anat1-rectum",
"num": 8,
"spot": "rectum",
"facts": [
"Stores stool until it is convenient to pass it.",
"Stretch of its wall triggers the defecation reflex, felt as the urge to go.",
"The anus, with its sphincter muscles, is the final exit after the rectum."
],
"summary": "The last straight part of the large intestine, just before the anus."
},
{
"name": "Salivary glands",
"cat": "helper",
"job": "Make saliva to moisten food and digest starch",
"life": "Your mouth waters at the smell of food because these glands switch on.",
"icon": "anat1-salivary",
"num": 9,
"spot": "salivary",
"facts": [
"Make about 1 to 1.5 litres of saliva a day.",
"Saliva contains amylase for starch and lingual lipase that starts fat digestion.",
"Helper organs: they send saliva into the mouth through ducts; food never enters them."
],
"summary": "Three pairs of glands around the mouth (parotid, submandibular and sublingual) that make saliva."
},
{
"name": "Liver",
"cat": "helper",
"job": "Makes bile and processes absorbed nutrients",
"life": "Most nutrients from the gut travel to the liver first, through the portal vein.",
"icon": "anat1-liver",
"num": 10,
"spot": "liver",
"facts": [
"Makes bile, which is then stored in the gallbladder.",
"Receives nutrient-rich blood from the gut through the hepatic portal vein.",
"Stores glucose as glycogen and breaks down many drugs and toxins."
],
"summary": "The largest internal organ, in the upper right abdomen, with hundreds of jobs."
},
{
"name": "Gallbladder",
"cat": "helper",
"job": "Stores bile and squeezes it out after fatty meals",
"life": "Gallstones form here and can cause pain after a fatty meal.",
"icon": "anat1-gallbladder",
"num": 11,
"spot": "gallbladder",
"facts": [
"Stores bile but does not make it; the liver does.",
"A hormone (CCK) released when fat reaches the duodenum makes it contract.",
"Its bile emulsifies fat into tiny droplets; it does not digest fat chemically."
],
"summary": "A small pear-shaped sac under the liver that stores and concentrates bile."
},
{
"name": "Pancreas",
"cat": "helper",
"job": "Sends digestive enzymes into the small intestine",
"life": "The same organ also makes insulin.",
"icon": "anat1-pancreas",
"num": 12,
"spot": "pancreas",
"facts": [
"Its juice digests all three nutrients: amylase for starch, proteases for protein, lipase for fat.",
"Adds bicarbonate to neutralise stomach acid in the duodenum.",
"Its islets make insulin and glucagon, released into the blood, not the gut."
],
"summary": "A long gland behind the stomach with both digestive and hormone roles."
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
"note": "Together they are about 3 to 4.5 metres long in a living person."
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
],
"diagram": "digestive",
"diagramCaption": "Where it is",
"notes": {
"intro": "Digestion breaks food into molecules small enough to cross the gut lining into the blood: starch into glucose, protein into amino acids, fat into fatty acids. The digestive tract is one long tube from mouth to anus that food actually passes through. The glandular helper organs (salivary glands, liver, gallbladder, pancreas) never touch the food directly; instead they make and deliver juices such as saliva, bile and pancreatic enzymes into the tube. Chewing and churning break food up mechanically, enzymes break it down chemically, and most absorption happens in the small intestine.",
"sections": [
{
"cat": "tract",
"title": "Digestive tract",
"about": "Food travels mouth → pharynx → oesophagus → stomach → small intestine → large intestine → rectum → anus. Waves of muscle contraction called peristalsis push it along. Each stop has its own main task: the mouth chews and starts starch digestion, the oesophagus only transports, the stomach churns with acid and starts protein digestion, the small intestine finishes digestion and absorbs nutrients, and the large intestine absorbs water. The small intestine has three parts in order: duodenum (receives bile and pancreatic juice), jejunum (absorbs most nutrients) and ileum (absorbs vitamin B12 and bile salts).",
"points": [
"Meal's journey: mouth → pharynx → oesophagus → stomach → small intestine → large intestine → rectum → anus.",
"Small intestine order: duodenum → jejunum → ileum ('Dow Jones Industrial').",
"Swallowing: tongue pushes food back → soft palate rises to close off the nose → epiglottis covers the windpipe → oesophagus muscles squeeze food down → food passes through the valve into the stomach."
],
"tip": "Digestion's DJI: Duodenum, Jejunum, Ileum, like the Dow Jones Industrial stock index."
},
{
"cat": "helper",
"title": "Helper organs",
"about": "Helper organs sit outside the tube and pour their products in through ducts. The salivary glands make saliva, which wets food and contains amylase to start breaking down starch. The liver makes bile, and also receives most absorbed nutrients first through the hepatic portal vein, to process and store them. The gallbladder does not make bile; it stores and concentrates it, then squeezes it into the duodenum after a fatty meal. The pancreas sends enzymes for all three nutrient types (starch, protein and fat) plus bicarbonate to neutralise stomach acid, into the duodenum.",
"points": [
"Liver MAKES bile; gallbladder STORES bile. A classic mix-up.",
"Fat digestion: fatty food reaches the duodenum → gallbladder releases bile → bile breaks fat into tiny droplets (emulsifies it) → pancreatic enzymes break the fat down → the small intestine absorbs it.",
"Starch to blood sugar: saliva starts → stomach acid pauses it → pancreatic enzymes continue in the small intestine → gut lining enzymes finish, making glucose → glucose absorbed into blood → blood takes it to the liver first."
],
"tip": "If food passes through it, it's tract; if it only sends juices in, it's a helper. Bile is washing-up liquid: it doesn't digest fat, it breaks it into droplets so enzymes can."
}
],
"outro": "For the sort game ask: does food go through it? For the sequence games, follow the food down the tube and note where each helper's juice joins."
}
});
