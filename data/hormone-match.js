/* Hormone Match — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "hormone-match",
"title": "Hormone Match",
"subject": "anatomy",
"subjectName": "Anatomy & Physiology",
"chapter": "17",
"tagline": "Which gland sends which message",
"itemNoun": "hormone",
"categories": [
{
"id": "pituitary",
"name": "Pituitary gland",
"color": "cat-coral",
"icon": "brain"
},
{
"id": "thyroid",
"name": "Thyroid and parathyroid",
"color": "cat-amber",
"icon": "gland"
},
{
"id": "adrenal",
"name": "Adrenal glands",
"color": "cat-lemon",
"icon": "kidney"
},
{
"id": "pancreas",
"name": "Pancreas",
"color": "cat-sage",
"icon": "stomach"
},
{
"id": "gonads",
"name": "Ovaries and testes",
"color": "cat-mint",
"icon": "baby"
},
{
"id": "other",
"name": "Other organs",
"color": "cat-sky",
"icon": "heart"
}
],
"categoryLabel": "Gland",
"hint": "Hormones are chemical messages carried in the blood. Learn who sends each one and what it tells the body to do.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{gland}",
"{job}"
],
"detail": [
{
"label": "Made by",
"field": "{gland}"
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
"title": "Explore hormones",
"desc": "Tap a hormone to see where it comes from and what it does.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "job",
"format": "quiz",
"title": "What does it do?",
"desc": "See the hormone, pick its job.",
"icon": "?",
"color": "cat-sky",
"prompt": "What does this hormone do?",
"show": "name",
"showAs": "big",
"answer": "job",
"answerAs": "small"
},
{
"id": "gland",
"format": "sortit",
"title": "Which gland?",
"desc": "Name the gland that makes it.",
"icon": "⌖",
"color": "cat-lemon",
"prompt": "Which gland makes this hormone?"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each hormone with its job.",
"icon": "⇄",
"color": "cat-mint",
"clue": "job",
"clueLabel": "Job"
}
],
"items": [
{
"name": "Growth hormone",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Drives growth and repair",
"summary": "Released by the pituitary, mostly during deep sleep, to build bone and muscle.",
"life": "Children grow most during sleep, when growth hormone peaks.",
"icon": "brain",
"num": 1,
"spot": "pituitary",
"facts": [
"Made by the anterior pituitary, not the posterior.",
"Stimulates growth of bone and muscle, largely by triggering the liver to make IGF-1.",
"Too much in childhood causes gigantism; too little causes short stature."
]
},
{
"name": "TSH",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Tells the thyroid to release its hormones",
"summary": "Thyroid-stimulating hormone: the pituitary's 'on' switch for the thyroid.",
"life": "A routine blood test for thyroid problems usually starts with TSH.",
"icon": "brain",
"num": 2,
"spot": "pituitary",
"facts": [
"Thyroid-stimulating hormone, from the anterior pituitary.",
"Its only target is the thyroid; it does not set metabolism directly, T4 does.",
"High TSH usually means the thyroid is underactive and the pituitary is pushing harder."
]
},
{
"name": "Prolactin",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Starts milk production",
"summary": "Signals the breasts to make milk after birth.",
"life": "Prolactin levels rise during breastfeeding.",
"icon": "brain",
"num": 3,
"spot": "pituitary",
"facts": [
"From the anterior pituitary.",
"Makes the breasts produce milk; oxytocin is what makes the milk flow out.",
"Suckling by the baby keeps prolactin release going."
]
},
{
"name": "ADH",
"cat": "pituitary",
"gland": "Hypothalamus (released by the posterior pituitary)",
"job": "Makes the kidneys hold on to water",
"summary": "Antidiuretic hormone, released when the body is short of water.",
"life": "Alcohol holds back ADH release, which is why drinking makes you pee more.",
"icon": "brain",
"num": 4,
"spot": "pituitary",
"facts": [
"Antidiuretic hormone, also called vasopressin; made in the hypothalamus.",
"Stored in and released from the posterior pituitary.",
"Makes kidney tubules reabsorb water, so urine becomes smaller in volume and more concentrated."
],
"spotCaption": "Released from the pituitary (made in the hypothalamus)"
},
{
"name": "Oxytocin",
"cat": "pituitary",
"gland": "Hypothalamus (released by the posterior pituitary)",
"job": "Triggers labour contractions and milk let-down",
"summary": "Released in childbirth and breastfeeding; also linked to bonding.",
"life": "Hospitals can give oxytocin through a drip to start or speed up labour.",
"icon": "brain",
"num": 5,
"spot": "pituitary",
"facts": [
"Made in the hypothalamus, released by the posterior pituitary, like ADH.",
"Makes the uterus contract in labour and the breast push milk out (let-down).",
"A positive-feedback hormone: contractions trigger more oxytocin until birth."
],
"spotCaption": "Released from the pituitary (made in the hypothalamus)"
},
{
"name": "Thyroxine (T4)",
"cat": "thyroid",
"gland": "Thyroid gland",
"job": "Sets the body's metabolic rate",
"summary": "The main thyroid hormone, made using iodine; it speeds up metabolism.",
"life": "Too little causes tiredness and weight gain; tablets replace it.",
"icon": "gland",
"num": 6,
"spot": "thyroid",
"facts": [
"Made by the thyroid gland's follicles; each molecule holds four iodine atoms.",
"Raises metabolic rate and heat production in most body cells.",
"Released when TSH from the pituitary stimulates the thyroid."
]
},
{
"name": "Calcitonin",
"cat": "thyroid",
"gland": "Thyroid gland",
"job": "Lowers blood calcium",
"summary": "Moves calcium out of the blood and into bone.",
"life": "It works in the opposite direction to parathyroid hormone.",
"icon": "gland",
"num": 7,
"spot": "thyroid",
"facts": [
"Made by the thyroid's C cells, not the parathyroids.",
"Lowers blood calcium by slowing bone breakdown, so calcium stays in bone.",
"Opposes parathyroid hormone; most important in children."
]
},
{
"name": "Parathyroid hormone",
"cat": "thyroid",
"gland": "Parathyroid glands",
"job": "Raises blood calcium",
"summary": "Made by four tiny glands behind the thyroid; it pulls calcium from bone.",
"life": "It keeps calcium steady so your nerves and muscles work properly.",
"icon": "gland",
"num": 8,
"spot": "parathyroid",
"facts": [
"Made by the parathyroid glands, usually four, on the back of the thyroid.",
"Raises blood calcium: frees calcium from bone and reduces its loss in urine.",
"Also helps activate vitamin D, which boosts calcium absorption from food."
]
},
{
"name": "Cortisol",
"cat": "adrenal",
"gland": "Adrenal cortex",
"job": "Helps the body cope with long-term stress",
"summary": "A steroid hormone that helps the body cope with stress and lowers inflammation.",
"life": "Cortisol is naturally highest in the morning to help you wake up.",
"icon": "kidney",
"num": 9,
"spot": "adrenals",
"facts": [
"Steroid hormone of the adrenal cortex, released under ACTH from the pituitary.",
"Raises blood sugar and suppresses inflammation and immune activity.",
"Long-term stress hormone, unlike adrenaline, which acts in seconds."
]
},
{
"name": "Aldosterone",
"cat": "adrenal",
"gland": "Adrenal cortex",
"job": "Makes the kidneys keep sodium and raises blood pressure",
"summary": "Controls salt and water balance and so blood pressure.",
"life": "Some blood pressure tablets work by blocking aldosterone's effect.",
"icon": "kidney",
"num": 10,
"spot": "adrenals",
"facts": [
"Steroid hormone from the adrenal cortex.",
"Makes the kidneys keep sodium and lose potassium; water follows sodium, raising blood volume.",
"Triggered by the renin-angiotensin system when blood pressure falls."
]
},
{
"name": "Adrenaline",
"cat": "adrenal",
"gland": "Adrenal medulla",
"job": "Triggers fight or flight",
"summary": "Also called epinephrine: a fast-acting hormone for sudden danger or excitement.",
"life": "The racing heart before an exam or a roller coaster is adrenaline; EpiPens contain it.",
"icon": "zap",
"num": 11,
"spot": "adrenals",
"facts": [
"From the adrenal medulla (inner part), not the cortex; also called epinephrine.",
"Raises heart rate, widens airways and frees glucose for instant energy.",
"Released on direct nerve signals, so it acts within seconds."
]
},
{
"name": "Insulin",
"cat": "pancreas",
"gland": "Pancreas (beta cells)",
"job": "Lowers blood sugar",
"summary": "Lets cells take in glucose from the blood after a meal.",
"life": "People with type 1 diabetes inject insulin because their pancreas cannot make it.",
"icon": "stomach",
"num": 12,
"spot": "pancreas",
"facts": [
"Made by the beta cells of the pancreatic islets.",
"Released when blood glucose rises after a meal; helps cells take up glucose.",
"Makes the liver store glucose as glycogen; opposes glucagon."
]
},
{
"name": "Glucagon",
"cat": "pancreas",
"gland": "Pancreas (alpha cells)",
"job": "Raises blood sugar between meals",
"summary": "Tells the liver to release stored glucose between meals.",
"life": "Emergency glucagon kits treat very low blood sugar.",
"icon": "stomach",
"num": 13,
"spot": "pancreas",
"facts": [
"Made by the alpha cells of the pancreatic islets.",
"Released when blood glucose falls, e.g. between meals.",
"Makes the liver break down glycogen and release glucose; opposes insulin."
]
},
{
"name": "Estrogen",
"cat": "gonads",
"gland": "Ovaries",
"job": "Female development and the menstrual cycle",
"summary": "The main female sex hormone; it also helps keep bones strong.",
"life": "Falling estrogen at menopause is why bone loss speeds up.",
"icon": "baby",
"num": 14,
"spot": "ovaries",
"facts": [
"Main ovarian hormone; a steroid made from cholesterol.",
"Causes breast development and builds up the uterine lining each cycle.",
"Helps maintain bone density, so falling levels at menopause speed bone loss."
]
},
{
"name": "Testosterone",
"cat": "gonads",
"gland": "Testes",
"job": "Male development, muscle and sperm production",
"summary": "The main male sex hormone; women make small amounts too.",
"life": "Deeper voices and facial hair at puberty come from testosterone.",
"icon": "baby",
"num": 15,
"spot": "testes",
"facts": [
"Made mainly by the interstitial cells of the testes.",
"Needed for sperm production, muscle growth and male puberty changes.",
"Women make small amounts from the ovaries and adrenal glands."
]
},
{
"name": "Melatonin",
"cat": "other",
"gland": "Pineal gland",
"job": "Makes you sleepy at night",
"summary": "Released in darkness to set the body clock.",
"life": "Bright phone screens at night delay melatonin and make it harder to fall asleep.",
"icon": "moon",
"num": 16,
"spot": "pineal",
"facts": [
"Made by the pineal gland, deep in the brain.",
"Rises in darkness and falls in light, helping set the day-night (circadian) rhythm.",
"Light reaching the eyes in the evening suppresses its release."
]
},
{
"name": "EPO",
"cat": "other",
"gland": "Kidneys",
"job": "Increases red blood cell production",
"summary": "Erythropoietin, released when oxygen in the blood is low.",
"life": "EPO is a well-known banned doping drug in endurance sport.",
"icon": "kidney",
"num": 17,
"spot": "kidneys",
"facts": [
"Erythropoietin, made mainly by the kidneys.",
"Released when blood oxygen falls, e.g. at high altitude or in anaemia.",
"Tells red bone marrow to make more red blood cells; kidney failure often causes anaemia."
]
},
{
"name": "Leptin",
"cat": "other",
"gland": "Fat tissue",
"job": "Signals that the body has enough energy stored",
"summary": "A 'fullness' hormone from fat cells that reduces appetite.",
"life": "Leptin is one reason appetite and body weight are hard to change quickly.",
"icon": "scale",
"num": 18,
"spot": "fat",
"facts": [
"Made by fat (adipose) tissue, in proportion to how much fat is stored.",
"Acts on the hypothalamus to reduce appetite and signal adequate energy reserves.",
"Not to be confused with insulin: leptin is about long-term stores, not blood sugar."
]
}
],
"diagram": "body",
"diagramCaption": "Where it is made",
"notes": {
"intro": "Hormones are chemical messengers: a gland releases them into the blood, and they act only on target cells that carry the right receptor. In this game you learn two things for each hormone: which gland makes it and what job it does. Many hormones work in opposing pairs (one raises a level, the other lowers it), which is how the body keeps things like blood sugar and calcium steady; this balancing is called homeostasis. The pituitary, under orders from the hypothalamus in the brain, sits at the top of the system and controls several other glands.",
"sections": [
{
"cat": "pituitary",
"title": "Pituitary gland",
"about": "The pituitary is a pea-sized gland hanging under the brain, with two different halves. The anterior (front) pituitary makes its own hormones, including growth hormone, TSH and prolactin. The posterior (back) pituitary makes nothing itself: it stores and releases ADH and oxytocin, which are made by nerve cells in the hypothalamus. That is why the game lists those two as made by the hypothalamus but released by the posterior pituitary. TSH is a 'tropic' hormone, meaning its target is another gland (the thyroid).",
"points": [
"Anterior pituitary: growth hormone, TSH, prolactin.",
"Hypothalamus → posterior pituitary: ADH and oxytocin.",
"Prolactin makes milk; oxytocin lets milk flow out (let-down). Don't mix them up."
],
"tip": "Posterior pituitary = 'post office' for the hypothalamus: it only delivers ADH and oxytocin, it doesn't make them."
},
{
"cat": "thyroid",
"title": "Thyroid and parathyroid",
"about": "The thyroid is a butterfly-shaped gland in front of the windpipe. Its follicles make thyroxine (T4), which needs iodine and sets the body's metabolic rate, meaning how fast cells burn fuel and make heat. Separate cells in the thyroid (C cells) make calcitonin, which lowers blood calcium by moving it into bone. The parathyroid glands, usually four small glands on the back of the thyroid, make parathyroid hormone (PTH), which raises blood calcium. Calcitonin and PTH are an opposing pair.",
"points": [
"T4 = metabolic rate (needs iodine). Its more active form is T3.",
"Calcitonin lowers calcium; PTH raises it.",
"Thyroid gland makes T4 and calcitonin; parathyroid glands make PTH."
],
"tip": "calciTONin TONes down calcium; PTH Pulls calcium out of bone, so blood calcium goes up."
},
{
"cat": "adrenal",
"title": "Adrenal glands",
"about": "An adrenal gland sits on top of each kidney and has two layers that act like separate glands. The outer adrenal cortex makes steroid hormones: cortisol (long-term stress, raises blood sugar, dampens inflammation) and aldosterone (makes the kidneys keep sodium, so water follows and blood pressure rises). The inner adrenal medulla is part of the nervous system's fight-or-flight response and releases adrenaline (epinephrine) within seconds. The quickest way to tell them apart is speed: adrenaline is instant and short; cortisol works over hours to days.",
"points": [
"Cortex (outside): cortisol and aldosterone, both steroids.",
"Medulla (inside): adrenaline, released on nerve signals.",
"Aldosterone = salt (sodium) and blood pressure; cortisol = stress and sugar."
],
"tip": "Salt, sugar, sex, from outer to inner layers of the cortex (aldosterone, cortisol, small amounts of sex hormones); the medulla in the middle is the panic button."
},
{
"cat": "pancreas",
"title": "Pancreas",
"about": "Besides making digestive enzymes, the pancreas has small clusters of hormone cells called pancreatic islets (islets of Langerhans). Beta cells release insulin after a meal, when blood glucose is high; insulin helps cells take up glucose and the liver store it as glycogen, lowering blood sugar. Alpha cells release glucagon between meals, when glucose is low; glucagon tells the liver to break glycogen down and release glucose, raising blood sugar. They are the classic opposing pair.",
"points": [
"Beta → insulin → blood sugar down.",
"Alpha → glucagon → blood sugar up.",
"Type 1 diabetes: beta cells destroyed, so no insulin."
],
"tip": "Glucagon: 'glucose is gone', so bring some back. Insulin puts sugar 'in' cells."
},
{
"cat": "gonads",
"title": "Ovaries and testes",
"about": "The gonads make the sex steroid hormones. The ovaries make estrogen, which drives female puberty changes, builds up the uterine lining in the menstrual cycle and helps protect bone. The testes make testosterone, which drives male puberty changes, sperm production and muscle growth. Both sexes make some of each hormone; the difference is in the amounts.",
"points": [
"Ovaries → estrogen (and progesterone). Testes → testosterone.",
"Both are steroids made from cholesterol.",
"Estrogen loss at menopause speeds up bone loss."
],
"tip": "Estrogen and Egg both start with E, so it comes from the ovaries; TESTosterone comes from the TESTes."
},
{
"cat": "other",
"title": "Other organs",
"about": "Some hormones come from organs that are not classic glands, or from small glands outside the main chain. The pineal gland, deep in the brain, releases melatonin in darkness to set the body's day-night clock. The kidneys release erythropoietin (EPO) when blood oxygen is low, telling the red bone marrow to make more red blood cells. Fat tissue releases leptin in proportion to how much fat is stored, telling the brain that energy reserves are adequate and reducing appetite.",
"points": [
"Pineal → melatonin → sleep timing.",
"Kidneys → EPO → more red blood cells.",
"Fat tissue → leptin → 'enough stored', less hunger."
],
"tip": "Leptin from the Greek leptos, 'thin': it signals there is enough stored, so you need not eat more."
}
],
"outro": "In the sort game, think of the gland first; in the job quiz, think of what the hormone raises or lowers. Learning the opposing pairs together halves the work."
}
});
