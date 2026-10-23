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
"num": 1
},
{
"name": "TSH",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Tells the thyroid to release its hormones",
"summary": "Thyroid-stimulating hormone: the pituitary's 'on' switch for the thyroid.",
"life": "A routine blood test for thyroid problems usually starts with TSH.",
"icon": "brain",
"num": 2
},
{
"name": "Prolactin",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Starts milk production",
"summary": "Signals the breasts to make milk after birth.",
"life": "Prolactin levels rise during breastfeeding.",
"icon": "brain",
"num": 3
},
{
"name": "ADH",
"cat": "pituitary",
"gland": "Hypothalamus (released by the posterior pituitary)",
"job": "Makes the kidneys hold on to water",
"summary": "Antidiuretic hormone, released when the body is short of water.",
"life": "Alcohol holds back ADH release, which is why drinking makes you pee more.",
"icon": "brain",
"num": 4
},
{
"name": "Oxytocin",
"cat": "pituitary",
"gland": "Hypothalamus (released by the posterior pituitary)",
"job": "Triggers labour contractions and milk let-down",
"summary": "Released in childbirth and breastfeeding; also linked to bonding.",
"life": "Hospitals can give oxytocin through a drip to start or speed up labour.",
"icon": "brain",
"num": 5
},
{
"name": "Thyroxine (T4)",
"cat": "thyroid",
"gland": "Thyroid gland",
"job": "Sets the body's metabolic rate",
"summary": "The main thyroid hormone, made using iodine; it speeds up metabolism.",
"life": "Too little causes tiredness and weight gain; tablets replace it.",
"icon": "gland",
"num": 6
},
{
"name": "Calcitonin",
"cat": "thyroid",
"gland": "Thyroid gland",
"job": "Lowers blood calcium",
"summary": "Moves calcium out of the blood and into bone.",
"life": "It works in the opposite direction to parathyroid hormone.",
"icon": "gland",
"num": 7
},
{
"name": "Parathyroid hormone",
"cat": "thyroid",
"gland": "Parathyroid glands",
"job": "Raises blood calcium",
"summary": "Made by four tiny glands behind the thyroid; it pulls calcium from bone.",
"life": "It keeps calcium steady so your nerves and muscles work properly.",
"icon": "gland",
"num": 8
},
{
"name": "Cortisol",
"cat": "adrenal",
"gland": "Adrenal cortex",
"job": "Helps the body cope with long-term stress",
"summary": "A steroid hormone that helps the body cope with stress and lowers inflammation.",
"life": "Cortisol is naturally highest in the morning to help you wake up.",
"icon": "kidney",
"num": 9
},
{
"name": "Aldosterone",
"cat": "adrenal",
"gland": "Adrenal cortex",
"job": "Makes the kidneys keep sodium and raises blood pressure",
"summary": "Controls salt and water balance and so blood pressure.",
"life": "Some blood pressure tablets work by blocking aldosterone's effect.",
"icon": "kidney",
"num": 10
},
{
"name": "Adrenaline",
"cat": "adrenal",
"gland": "Adrenal medulla",
"job": "Triggers fight or flight",
"summary": "Also called epinephrine: a fast-acting hormone for sudden danger or excitement.",
"life": "The racing heart before an exam or a roller coaster is adrenaline; EpiPens contain it.",
"icon": "zap",
"num": 11
},
{
"name": "Insulin",
"cat": "pancreas",
"gland": "Pancreas (beta cells)",
"job": "Lowers blood sugar",
"summary": "Lets cells take in glucose from the blood after a meal.",
"life": "People with type 1 diabetes inject insulin because their pancreas cannot make it.",
"icon": "stomach",
"num": 12
},
{
"name": "Glucagon",
"cat": "pancreas",
"gland": "Pancreas (alpha cells)",
"job": "Raises blood sugar between meals",
"summary": "Tells the liver to release stored glucose between meals.",
"life": "Emergency glucagon kits treat very low blood sugar.",
"icon": "stomach",
"num": 13
},
{
"name": "Estrogen",
"cat": "gonads",
"gland": "Ovaries",
"job": "Female development and the menstrual cycle",
"summary": "The main female sex hormone; it also helps keep bones strong.",
"life": "Falling estrogen at menopause is why bone loss speeds up.",
"icon": "baby",
"num": 14
},
{
"name": "Testosterone",
"cat": "gonads",
"gland": "Testes",
"job": "Male development, muscle and sperm production",
"summary": "The main male sex hormone; women make small amounts too.",
"life": "Deeper voices and facial hair at puberty come from testosterone.",
"icon": "baby",
"num": 15
},
{
"name": "Melatonin",
"cat": "other",
"gland": "Pineal gland",
"job": "Makes you sleepy at night",
"summary": "Released in darkness to set the body clock.",
"life": "Bright phone screens at night delay melatonin and make it harder to fall asleep.",
"icon": "moon",
"num": 16
},
{
"name": "EPO",
"cat": "other",
"gland": "Kidneys",
"job": "Increases red blood cell production",
"summary": "Erythropoietin, released when oxygen in the blood is low.",
"life": "EPO is a well-known banned doping drug in endurance sport.",
"icon": "kidney",
"num": 17
},
{
"name": "Leptin",
"cat": "other",
"gland": "Fat tissue",
"job": "Signals that the body has enough energy stored",
"summary": "A 'fullness' hormone from fat cells that reduces appetite.",
"life": "Leptin is one reason appetite and body weight are hard to change quickly.",
"icon": "scale",
"num": 18
}
]
});
