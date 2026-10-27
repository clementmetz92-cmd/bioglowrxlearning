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
},
{
"id": "hypothalamus",
"name": "Hypothalamus",
"color": "cat-lilac",
"icon": "brain"
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
"desc": "Name the gland that releases it.",
"icon": "⌖",
"color": "cat-lemon",
"prompt": "Which gland releases this hormone into the blood?"
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
},
{
"id": "cases",
"format": "cases",
"title": "Clinic cases",
"desc": "An underactive thyroid, steroid tablets, Addison's disease and a labour that stalls.",
"icon": "✚",
"color": "cat-coral",
"rounds": 3,
"extra": true
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
"icon": "anat1-growth",
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
"icon": "anat1-tsh",
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
"icon": "anat1-prolactin",
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
"icon": "anat1-adh",
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
"icon": "anat1-oxytocin",
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
"icon": "anat1-thyroxine",
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
"icon": "anat1-calcitonin",
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
"icon": "anat1-pth",
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
"icon": "anat1-cortisol",
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
"icon": "anat1-aldosterone",
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
"icon": "anat1-adrenaline",
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
"icon": "anat1-insulin",
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
"icon": "anat1-glucagon",
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
"icon": "anat1-estrogen",
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
"icon": "anat1-testosterone",
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
"icon": "anat1-epo",
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
"icon": "anat1-leptin",
"num": 18,
"spot": "fat",
"facts": [
"Made by fat (adipose) tissue, in proportion to how much fat is stored.",
"Acts on the hypothalamus to reduce appetite and signal adequate energy reserves.",
"Not to be confused with insulin: leptin is about long-term stores, not blood sugar."
]
},
{
"name": "ACTH",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Tells the adrenal cortex to release cortisol",
"summary": "Adrenocorticotropic hormone: the pituitary's signal to the adrenal cortex.",
"life": "ACTH peaks in the early morning, which is why cortisol is highest around the time you wake up.",
"icon": "anat1-endocrine",
"num": 19,
"spot": "pituitary",
"facts": [
"Released by the anterior pituitary when CRH arrives from the hypothalamus.",
"Makes the adrenal cortex release cortisol. Aldosterone is mainly controlled by the renin-angiotensin system instead.",
"Cortisol feeds back on the hypothalamus and pituitary to cut CRH and ACTH: negative feedback."
]
},
{
"name": "FSH",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Makes egg follicles grow and supports sperm production",
"summary": "Follicle-stimulating hormone, one of the two gonadotropins that act on the ovaries and testes.",
"life": "Fertility clinics measure FSH; a high level can mean the ovaries are responding poorly and the pituitary is pushing harder.",
"icon": "anat2-fsh",
"num": 20,
"spot": "pituitary",
"facts": [
"Released by the anterior pituitary in response to GnRH from the hypothalamus.",
"In women it makes ovarian follicles grow and make estrogen; in men it acts on Sertoli cells to support sperm production.",
"Inhibin from the ovaries and testes holds FSH back, with little effect on LH."
]
},
{
"name": "LH",
"cat": "pituitary",
"gland": "Anterior pituitary",
"job": "Triggers ovulation and makes the testes release testosterone",
"summary": "Luteinising hormone, the second gonadotropin.",
"life": "Home ovulation tests detect the LH surge in urine, a day or so before ovulation.",
"icon": "anat2-lh",
"num": 21,
"spot": "pituitary",
"facts": [
"Released by the anterior pituitary in response to GnRH from the hypothalamus.",
"A mid-cycle LH surge triggers ovulation and turns the empty follicle into the corpus luteum.",
"In men it makes the interstitial (Leydig) cells of the testes produce testosterone."
]
},
{
"name": "Triiodothyronine (T3)",
"cat": "thyroid",
"gland": "Thyroid gland (and made from T4 in body tissues)",
"job": "The more active thyroid hormone, mostly made from T4 in the tissues",
"summary": "The thyroid hormone that does most of the work inside target cells.",
"life": "Thyroid blood tests usually start with TSH and T4; T3 is often added when an overactive thyroid is suspected.",
"icon": "flame",
"num": 22,
"spot": "thyroid",
"alsoOk": ["Sets the body's metabolic rate"],
"facts": [
"Holds three iodine atoms; T4 holds four.",
"The thyroid releases mostly T4. Body cells remove one iodine to make T3, which binds the receptors far more strongly.",
"T3 and T4 feed back on the hypothalamus and pituitary to reduce TRH and TSH."
]
},
{
"name": "TRH",
"cat": "hypothalamus",
"gland": "Hypothalamus",
"job": "Tells the pituitary to release TSH",
"summary": "Thyrotropin-releasing hormone, the top of the thyroid axis.",
"life": "TRH travels only a few millimetres, in tiny portal vessels, so it is not measured in routine blood tests.",
"icon": "anat2-hypothal",
"num": 23,
"spot": "brain",
"spotCaption": "Made in the hypothalamus, at the base of the brain",
"facts": [
"Made by the hypothalamus and carried in portal blood vessels to the anterior pituitary.",
"Makes the pituitary release TSH; it can also raise prolactin.",
"Thyroid axis: TRH → TSH → T4 and T3. High T4 and T3 switch TRH and TSH down."
]
},
{
"name": "CRH",
"cat": "hypothalamus",
"gland": "Hypothalamus",
"job": "Tells the pituitary to release ACTH",
"summary": "Corticotropin-releasing hormone, the top of the stress-hormone axis.",
"life": "Physical or emotional stress raises CRH within minutes, so cortisol starts to climb soon after.",
"icon": "brain",
"num": 24,
"spot": "brain",
"spotCaption": "Made in the hypothalamus, at the base of the brain",
"facts": [
"Released by the hypothalamus in response to stress, low blood sugar and the daily body clock.",
"Travels in portal vessels to the anterior pituitary, which then releases ACTH.",
"Stress axis: CRH → ACTH → cortisol. Cortisol switches CRH and ACTH down."
]
},
{
"name": "GnRH",
"cat": "hypothalamus",
"gland": "Hypothalamus",
"job": "Tells the pituitary to release FSH and LH",
"summary": "Gonadotropin-releasing hormone, the top of the reproductive axis.",
"life": "Some prostate cancer treatments give a steady GnRH-like drug; without the normal pulses, the pituitary stops responding and testosterone falls.",
"icon": "anat2-gnrh",
"num": 25,
"spot": "brain",
"spotCaption": "Made in the hypothalamus, at the base of the brain",
"facts": [
"Released in pulses by the hypothalamus; the pulse pattern is needed for normal FSH and LH release.",
"Its rise at puberty starts the hormone changes of puberty.",
"Reproductive axis: GnRH → FSH and LH → sex hormones, which mostly feed back to hold it down. Mid-cycle, high estrogen briefly does the opposite."
]
},
{
"name": "GHRH",
"cat": "hypothalamus",
"gland": "Hypothalamus",
"job": "Tells the pituitary to release growth hormone",
"summary": "Growth hormone-releasing hormone, from the hypothalamus.",
"life": "The biggest bursts of growth hormone come in deep sleep, one reason sleep matters for growing children.",
"icon": "sprout",
"num": 26,
"spot": "brain",
"spotCaption": "Made in the hypothalamus, at the base of the brain",
"facts": [
"Made by the hypothalamus and carried to the anterior pituitary in portal blood.",
"Makes the pituitary release growth hormone in bursts.",
"Its opposite, somatostatin (growth hormone-inhibiting hormone), holds growth hormone back."
]
},
{
"name": "Dopamine (PIH)",
"cat": "hypothalamus",
"gland": "Hypothalamus",
"job": "Holds back prolactin release from the pituitary",
"summary": "Prolactin-inhibiting hormone: the hypothalamus keeps prolactin low with a steady supply of dopamine.",
"life": "Some medicines that block dopamine, such as certain antipsychotics, can raise prolactin and cause milk production.",
"icon": "nerve",
"num": 27,
"spot": "brain",
"spotCaption": "Made in the hypothalamus, at the base of the brain",
"facts": [
"Unlike the other anterior pituitary hormones, prolactin is mainly held back, not switched on, by the hypothalamus.",
"Suckling reduces dopamine release, so prolactin rises and milk is made.",
"Damage to the pituitary stalk lowers most pituitary hormones but raises prolactin."
]
},
{
"name": "Progesterone",
"cat": "gonads",
"gland": "Ovaries (corpus luteum)",
"job": "Keeps the uterine lining ready for pregnancy after ovulation",
"summary": "A steroid made by the corpus luteum after ovulation, and later by the placenta, that prepares the uterus for pregnancy.",
"life": "Its name means 'for gestation'. In pregnancy the placenta takes over making it.",
"icon": "anat2-progesterone",
"num": 28,
"spot": "ovaries",
"alsoOk": ["Female development and the menstrual cycle"],
"facts": [
"Made by the corpus luteum, the follicle left behind after ovulation, under the influence of LH.",
"Readies the uterine lining for an embryo and keeps it in place; when progesterone falls, the lining is shed as a period.",
"With estrogen, it feeds back to hold down GnRH, FSH and LH. Combined contraceptive pills use this to stop ovulation."
]
},
{
"name": "Inhibin",
"cat": "gonads",
"gland": "Ovaries and testes",
"job": "Holds back FSH release from the pituitary, with little effect on LH",
"summary": "A hormone from the gonads that tells the pituitary to cut back FSH.",
"life": "Inhibin A is one of the markers in a blood screening test offered in pregnancy.",
"icon": "anat2-inhibin",
"num": 29,
"spot": ["ovaries", "testes"],
"facts": [
"Made by Sertoli cells in the testes and by follicle (granulosa) cells in the ovaries.",
"Lowers FSH with little effect on LH.",
"Negative feedback: the cells that FSH stimulates send back a signal that slows FSH."
]
}
],
"cases": [
{
"id": "h1",
"cat": "thyroid",
"icon": "gland",
"spot": "thyroid",
"title": "Always cold, always tired",
"who": "Margaret, 52, teacher",
"story": "Over a year Margaret has become tired, slow and constipated. She feels cold when others are warm, has gained weight and her skin is dry. Her pulse is slow. Blood tests show thyroid antibodies (Hashimoto's thyroiditis).",
"data": [["TSH", "High"], ["Free T4", "Low"], ["Pulse", "54 a minute"]],
"steps": [
{ "q": "Where is the main problem in her hormone axis?", "options": ["The thyroid gland itself", "The anterior pituitary", "The hypothalamus", "The adrenal cortex"], "answer": 0, "why": "Low T4 with high TSH means the pituitary is pushing hard but the thyroid cannot respond: primary hypothyroidism." },
{ "q": "Why is her TSH high?", "options": ["Low T4 has removed the negative feedback on the pituitary", "A tumour in her pituitary is making extra TSH", "Her body is clearing TSH from the blood more slowly", "Her pituitary raises TSH to slow her metabolism down"], "answer": 0, "why": "Normally T4 and T3 hold TRH and TSH down. With little T4, that brake is off, so TSH rises." },
{ "q": "She starts levothyroxine (T4) tablets. What should happen to her TSH?", "options": ["It falls back towards normal as her T4 rises", "It rises further as her thyroid recovers", "It stays high whatever dose she takes", "It drops to zero and stays there for good"], "answer": 0, "why": "Restoring T4 restores the negative feedback, so TSH falls. Doctors adjust the dose until TSH is back in the normal range." }
],
"takeaway": "Primary hypothyroidism: low T4, high TSH. Lost negative feedback is why TSH is the best test of how the thyroid is doing."
},
{
"id": "h2",
"cat": "adrenal",
"icon": "pill",
"spot": "adrenals",
"title": "A moon-shaped face",
"who": "Carol, 61, retired nurse",
"story": "Carol has taken prednisolone, a steroid tablet, for 18 months for an inflammatory lung disease. Her face has become rounded, she has put on weight around her middle, her skin bruises easily and she has purple stretch marks.",
"data": [["Prednisolone", "20 mg a day for 18 months"], ["Blood glucose", "Raised"], ["ACTH", "Low"]],
"steps": [
{ "q": "What is causing her Cushing's features?", "options": ["Long-term high doses of a cortisol-like drug", "A tumour in her pituitary making extra ACTH", "A tumour in her adrenal making extra aldosterone", "Too little cortisol from her damaged adrenals"], "answer": 0, "why": "Prednisolone acts like cortisol. Months of high doses cause the same effects as too much cortisol: Cushing's syndrome." },
{ "q": "Why is her ACTH low?", "options": ["The drug feeds back on her hypothalamus and pituitary", "The drug destroys the pituitary cells that make ACTH", "Her adrenal glands are using up all of her ACTH", "Her kidneys are clearing ACTH faster than normal"], "answer": 0, "why": "Like cortisol, the drug switches off CRH and ACTH by negative feedback. Without ACTH, her own adrenal cortex shrinks." },
{ "q": "Why must the tablets be reduced slowly, not stopped at once?", "options": ["Her shrunken adrenals cannot make enough cortisol yet", "Her blood sugar would rise sharply if she stopped", "Her pituitary would release a dangerous ACTH surge", "Stopping at once makes the drug stay in her body longer"], "answer": 0, "why": "Her axis has been switched off for months. Stopping suddenly can cause an adrenal crisis; a slow taper lets ACTH and the adrenals recover." }
],
"takeaway": "Steroid tablets switch off CRH and ACTH by negative feedback, so the adrenals shrink. Never stop long-term steroids suddenly."
},
{
"id": "h3",
"cat": "adrenal",
"icon": "kidney",
"spot": "adrenals",
"title": "Salt cravings and dizzy spells",
"who": "Priya, 34, accountant",
"story": "For months Priya has felt exhausted and lost weight. She feels faint when she stands up and craves salty food. Her skin has darkened, especially in the creases of her palms and inside her mouth. Tests show her adrenal cortex has been destroyed by her own immune system.",
"data": [["Blood pressure", "92/58, falls on standing"], ["Sodium", "Low"], ["Potassium", "High"], ["ACTH", "High"]],
"steps": [
{ "q": "Which hormones is she short of?", "options": ["Cortisol and aldosterone", "Adrenaline and noradrenaline", "Thyroxine and T3", "Insulin and glucagon"], "answer": 0, "why": "Addison's disease is failure of the adrenal cortex, the source of cortisol and aldosterone. The medulla's adrenaline is mostly spared." },
{ "q": "Why are her sodium low and her potassium high?", "options": ["Without aldosterone her kidneys lose sodium and keep potassium", "Without cortisol her kidneys keep sodium and lose potassium", "She is drinking too much water because of her salt cravings", "Extra insulin is moving potassium out of her body cells"], "answer": 0, "why": "Aldosterone normally makes the kidneys keep sodium and get rid of potassium. Without it, sodium and water are lost, so blood pressure falls too." },
{ "q": "Why has her skin darkened?", "options": ["High ACTH also stimulates the skin's pigment cells", "Low cortisol lets the skin make extra vitamin D", "High aldosterone thickens the outer skin layer", "Low blood pressure leaves blood pooling in the skin"], "answer": 0, "why": "With no cortisol to feed back, the pituitary makes lots of ACTH. ACTH and related molecules also act on melanocytes." }
],
"takeaway": "Addison's disease: the adrenal cortex fails, cortisol and aldosterone fall, and lost negative feedback drives ACTH high."
},
{
"id": "h4",
"cat": "pituitary",
"icon": "baby",
"spot": "pituitary",
"title": "A labour that stalls",
"who": "Hannah, 30, first baby",
"story": "Hannah is in labour at 40 weeks. After a good start, her contractions have become weaker and further apart, and her cervix has stopped opening. The obstetrician suggests a hormone drip to strengthen the contractions.",
"data": [["Pregnancy", "40 weeks"], ["Contractions", "Weak, every 6 minutes"], ["Cervix", "No change in 3 hours"]],
"steps": [
{ "q": "Which hormone is in the drip?", "options": ["Oxytocin", "Prolactin", "Progesterone", "ADH"], "answer": 0, "why": "Synthetic oxytocin makes the uterine muscle contract more strongly and more often. The drip is started low and increased slowly, with the baby's heart rate monitored throughout, because contractions that are too strong or too frequent can starve the baby of oxygen." },
{ "q": "In normal labour, why does each contraction lead to a stronger one?", "options": ["Stretching of the cervix triggers more oxytocin release", "Each contraction lowers oxytocin, so the brain makes more", "The baby's movements signal the pituitary to release more", "Contractions raise blood calcium, which stimulates the uterus"], "answer": 0, "why": "Stretch of the cervix sends nerve signals to the hypothalamus, which releases more oxytocin from the posterior pituitary. The response increases the stimulus: positive feedback." },
{ "q": "What ends this loop?", "options": ["Birth of the baby, which ends the stretch of the cervix", "Rising cortisol, which switches off the posterior pituitary", "Running out of oxytocin stored in the pituitary", "Prolactin, which blocks oxytocin receptors in the uterus"], "answer": 0, "why": "Positive feedback needs an outside event to stop it. Once the baby is born, the cervix is no longer stretched and the loop ends." }
],
"takeaway": "Labour is positive feedback: the response (stronger contractions) increases the stimulus (stretch) until birth breaks the loop."
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
"Anterior pituitary: growth hormone, TSH, ACTH, FSH, LH, prolactin.",
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
"Estrogen loss at menopause speeds up bone loss.",
"Progesterone (corpus luteum) keeps the uterine lining ready after ovulation; inhibin from both gonads holds back FSH."
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
},
{
"cat": "hypothalamus",
"title": "Hypothalamus and feedback",
"about": "The hypothalamus, at the base of the brain, controls the anterior pituitary with releasing and inhibiting hormones carried a short distance in tiny portal blood vessels. Each releasing hormone switches on its own pituitary hormone (GnRH switches on two, FSH and LH), which in turn switches on a target gland: this chain is called an axis. Thyroid axis: TRH → TSH → T4 and T3. Stress axis: CRH → ACTH → cortisol. Reproductive axis: GnRH → FSH and LH → estrogen, progesterone or testosterone. GHRH switches on growth hormone, while dopamine (prolactin-inhibiting hormone) keeps prolactin held back. Most axes are kept steady by negative feedback: the final hormone travels back to the hypothalamus and pituitary and turns down the hormones above it, so a rise in the output reduces the drive. Inhibin from the gonads is another brake, on FSH alone. Positive feedback is rarer: the response makes the stimulus bigger until an outside event stops it. In labour, stretch of the cervix triggers oxytocin, which strengthens contractions, which stretch the cervix more, until the baby is born.",
"points": [
"TRH → TSH → T4/T3; CRH → ACTH → cortisol; GnRH → FSH and LH → sex hormones.",
"Negative feedback: the end hormone switches off the ones above it. Too little end hormone → the pituitary hormone rises (high TSH in an underactive thyroid).",
"Steroid tablets act like cortisol, so they switch off CRH and ACTH and the adrenals shrink.",
"Positive feedback: oxytocin in labour (and the LH surge before ovulation). The loop ends with an outside event such as birth."
],
"tip": "Read a pituitary hormone like a thermostat: if the end hormone is low and the pituitary hormone is high, the target gland is the problem."
}
],
"outro": "In the sort game, think of the gland first; in the job quiz, think of what the hormone raises or lowers. Learning the opposing pairs together halves the work."
}
});
