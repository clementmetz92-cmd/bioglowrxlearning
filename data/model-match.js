/* Model Match — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "model-match",
"title": "Model Match",
"subject": "wellness",
"subjectName": "Health & Wellness",
"chapter": "HW315",
"tagline": "Health behaviour models: why people change, or don't",
"itemNoun": "idea",
"categories": [
{
"id": "ttm",
"name": "Stages of Change (Transtheoretical Model)",
"color": "cat-mint",
"icon": "steps"
},
{
"id": "hbm",
"name": "Health Belief Model",
"color": "cat-sky",
"icon": "question"
},
{
"id": "sct",
"name": "Social Cognitive Theory",
"color": "cat-amber",
"icon": "chat"
}
],
"categoryLabel": "Model",
"hint": "Three classic models explain health behaviour. Match each idea to its meaning and to a real-life example.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{meaning}"
],
"detail": [
{
"label": "Model",
"field": "{category}"
},
{
"label": "Meaning",
"field": "{meaning}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the models",
"desc": "Tap an idea to see what it means, with an example.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "meaning",
"format": "quiz",
"title": "What does it mean?",
"desc": "Read the meaning, pick the idea.",
"icon": "?",
"color": "cat-sky",
"prompt": "Which idea does this describe?",
"show": "meaning",
"showAs": "text",
"answer": "name"
},
{
"id": "model",
"format": "sortit",
"title": "Which model?",
"desc": "Sort each idea into its model.",
"icon": "⌖",
"color": "cat-mint",
"prompt": "Which model does this idea come from?",
"choices": 3
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each idea with its meaning.",
"icon": "⇄",
"color": "cat-lemon",
"clue": "meaning",
"clueLabel": "Means"
},
{
"id": "stages",
"format": "sequence",
"title": "Stages in order",
"desc": "Put the Stages of Change in the right order.",
"icon": "1→",
"color": "cat-sage"
}
],
"items": [
{
"icon": "pharm-sofa",
"name": "Precontemplation",
"cat": "ttm",
"meaning": "Not thinking about changing in the next six months",
"life": "Sam knows smoking is harmful but has no plans to quit.",
"num": 1,
"spot": "pre",
"facts": [
"First stage: no intention to change in the next six months.",
"People may be unaware of the risk or discouraged by past failed attempts.",
"Best approach: raise awareness gently rather than push action."
]
},
{
"icon": "pharm-thought",
"name": "Contemplation",
"cat": "ttm",
"meaning": "Thinking about changing within the next six months",
"life": "Sam keeps saying he should quit 'one day soon'.",
"num": 2,
"spot": "con",
"facts": [
"Second stage: intends to change within six months but hasn't made a plan.",
"Typically ambivalent, weighing pros and cons; can stay stuck here for a long time.",
"Differs from preparation: no concrete steps yet."
]
},
{
"icon": "pharm-calendar-date",
"name": "Preparation",
"cat": "ttm",
"meaning": "Planning to act within the next month and taking small steps",
"life": "Sam sets a quit date and buys nicotine patches.",
"num": 3,
"spot": "prep",
"facts": [
"Third stage: plans to act within the next month.",
"Shows concrete steps such as setting a date, buying aids or booking a class.",
"Differs from contemplation by having a plan, and from action by not yet changing."
]
},
{
"icon": "run",
"name": "Action",
"cat": "ttm",
"meaning": "Has changed the behaviour within the last six months",
"life": "Sam has not smoked for two months.",
"num": 4,
"spot": "act",
"facts": [
"Fourth stage: has actually changed the behaviour within the last six months.",
"Risk of relapse is highest here, so support and coping plans matter.",
"Becomes maintenance once the change lasts beyond six months."
]
},
{
"icon": "pharm-trophy",
"name": "Maintenance",
"cat": "ttm",
"meaning": "Has kept the change going for more than six months",
"life": "Sam has been smoke-free for a year and avoids old triggers.",
"num": 5,
"spot": "maint",
"facts": [
"Fifth stage: has kept the change for more than six months.",
"Focus is on preventing relapse, e.g. avoiding old triggers.",
"Relapse can still happen and sends a person back to an earlier stage."
]
},
{
"icon": "pharm-target",
"name": "Perceived susceptibility",
"cat": "hbm",
"meaning": "How likely I think I am to get the condition",
"life": "Ana thinks she could get diabetes because it runs in her family.",
"num": 6,
"spot": "susc",
"facts": [
"Health Belief Model: belief about my personal chance of getting the condition.",
"Family history often raises perceived susceptibility.",
"Differs from severity: susceptibility is 'how likely', severity is 'how bad'."
]
},
{
"icon": "pharm-warning",
"name": "Perceived severity",
"cat": "hbm",
"meaning": "How serious I think the condition would be",
"life": "Ana fears diabetes could affect her eyesight.",
"num": 7,
"spot": "sev",
"facts": [
"Health Belief Model: belief about how serious the condition and its effects would be.",
"Includes medical effects (blindness, pain) and social ones (job loss, family impact).",
"Together with susceptibility, it makes up the perceived threat."
]
},
{
"icon": "pharm-thumbsup",
"name": "Perceived benefits",
"cat": "hbm",
"meaning": "How much I believe acting would lower my risk",
"life": "Ana believes walking daily will lower her blood sugar.",
"num": 8,
"spot": "ben",
"facts": [
"Health Belief Model: belief that the action will reduce the risk or seriousness.",
"Weighed against perceived barriers when deciding whether to act.",
"Differs from SCT outcome expectations, which concern results of any behaviour, not a health threat."
]
},
{
"icon": "pharm-barrier",
"name": "Perceived barriers",
"cat": "hbm",
"meaning": "What I think stands in the way of acting",
"life": "Ana worries she has no time to exercise.",
"num": 9,
"spot": "bar",
"facts": [
"Health Belief Model: beliefs about costs and obstacles, like time, money, pain or fear.",
"Often the strongest predictor of whether people act.",
"Health workers try to reduce barriers, e.g. free or convenient screening."
]
},
{
"icon": "pharm-bell",
"name": "Cues to action",
"cat": "hbm",
"meaning": "A trigger that prompts me to act",
"life": "A reminder text from her clinic makes Ana book a check-up.",
"num": 10,
"spot": "cue",
"facts": [
"Health Belief Model: an internal or external trigger that prompts action.",
"Internal cues: symptoms; external cues: reminders, media campaigns, advice from others.",
"It doesn't start with 'perceived', unlike the four core HBM beliefs."
]
},
{
"icon": "muscle",
"name": "Self-efficacy",
"cat": "sct",
"meaning": "My confidence that I can do the behaviour",
"life": "Leo feels sure he can cook a healthy meal on a busy weeknight. (Bandura's idea, later added to the Health Belief Model too.)",
"num": 11,
"spot": "person",
"facts": [
"Social Cognitive Theory: confidence in my ability to carry out the behaviour.",
"Built by past success, watching similar others succeed, encouragement and managing stress.",
"Different from outcome expectations: 'I can do it' vs 'it will work'.",
"Later added to the Health Belief Model, but it originates in SCT."
]
},
{
"icon": "eye",
"name": "Observational learning",
"cat": "sct",
"meaning": "Learning a behaviour by watching others",
"life": "Leo starts cooking healthy meals after watching his sister.",
"num": 12,
"spot": [
"env",
"be"
],
"facts": [
"Social Cognitive Theory: learning by watching others and the results they get.",
"Also called modelling; role models similar to the learner work best.",
"Seeing someone else rewarded makes copying the behaviour more likely."
]
},
{
"icon": "pharm-flag",
"name": "Outcome expectations",
"cat": "sct",
"meaning": "The results, good or bad, I expect from doing the behaviour",
"life": "Leo expects to have more energy if he sleeps eight hours.",
"num": 13,
"spot": "person",
"facts": [
"Social Cognitive Theory: what I predict will happen if I do the behaviour.",
"Can be physical (more energy), social (approval) or self-evaluative (feeling proud).",
"They are expectations before acting; reinforcement is what happens after."
]
},
{
"icon": "pharm-medal",
"name": "Reinforcement",
"cat": "sct",
"meaning": "Rewards or consequences that make a behaviour more or less likely",
"life": "Leo's running app gives badges that keep him going.",
"num": 14,
"spot": [
"env",
"be"
],
"facts": [
"Social Cognitive Theory: rewards or consequences that make a behaviour more or less likely to repeat.",
"Can come from outside (badges, praise) or within (feeling good).",
"Differs from cues to action, which trigger a behaviour rather than reward it."
]
},
{
"icon": "pharm-triad",
"name": "Reciprocal determinism",
"cat": "sct",
"meaning": "Person, behaviour and environment all influence each other",
"life": "Leo's gym friends make exercise easier; as he gets fitter and more confident, he brings more friends along.",
"num": 15,
"spot": [
"pb",
"pe",
"be"
],
"facts": [
"Social Cognitive Theory: person, behaviour and environment influence each other both ways.",
"Changing any one of the three can change the other two.",
"Key difference from simple cause-and-effect: the environment shapes us, and we shape it."
]
}
],
"sequences": [
{
"id": "ttm",
"title": "The Stages of Change, from first to last",
"icon": "steps",
"cat": "ttm",
"steps": [
"Precontemplation",
"Contemplation",
"Preparation",
"Action",
"Maintenance"
],
"note": "People often move back a stage or two before a change sticks; relapse is part of the model."
},
{
"id": "sam",
"title": "Sam's journey to quitting smoking",
"icon": "steps",
"cat": "ttm",
"steps": [
"Knows smoking is harmful but has no plans to quit",
"Keeps saying he should quit 'one day soon'",
"Sets a quit date and buys nicotine patches",
"Has not smoked for two months",
"Has been smoke-free for over a year"
],
"note": "Each step matches one stage: precontemplation, contemplation, preparation, action, maintenance."
}
],
"diagram": "models",
"diagramCaption": "Where it fits in the model",
"diagramPerItem": true,
"notes": {
"intro": "Health behaviour change models explain why people do, or don't, change habits like smoking, diet or exercise. The Transtheoretical Model (Stages of Change) describes WHEN: the stages a person passes through on the way to lasting change. The Health Belief Model explains WHETHER someone will act, based on what they believe about a health threat and about taking action. Social Cognitive Theory explains HOW behaviour is learned and kept up, through confidence, watching others, expected results, rewards and the environment. Knowing which model an idea belongs to tells you what question it answers.",
"sections": [
{
"cat": "ttm",
"title": "Stages of Change (Transtheoretical Model)",
"about": "Developed by Prochaska and DiClemente, this model says change happens in stages over time, not in one jump. The stages are told apart mainly by time frames: not intending to change in the next six months (precontemplation), intending to within six months (contemplation), planning to within the next month and taking small steps (preparation), having changed within the last six months (action), and keeping it up for more than six months (maintenance). People often slip back a stage or more before the change sticks, and relapse is seen as a normal part of the cycle rather than failure. Health workers match their approach to the stage: raising awareness for precontemplators, helping weigh pros and cons for contemplators, and building a plan for those in preparation.",
"points": [
"Order: Precontemplation → Contemplation → Preparation → Action → Maintenance",
"Key numbers: 6 months (thinking, acting, maintaining) and 1 month (preparation)",
"Action vs maintenance: under six months of the new behaviour vs over six months",
"Contemplation vs preparation: 'some day' intentions vs concrete steps like setting a date"
],
"tip": "'Please Come Prepared And Motivated': Pre-contemplation, Contemplation, Preparation, Action, Maintenance."
},
{
"cat": "hbm",
"title": "Health Belief Model",
"about": "Developed in the 1950s by US public health researchers, this model says people act on health when they believe a threat is real and that acting is worth it. The threat side has two beliefs: perceived susceptibility (how likely I am to get it) and perceived severity (how bad it would be). The action side weighs perceived benefits (how much acting would help) against perceived barriers (cost, time, fear, inconvenience). A cue to action, such as a symptom, a reminder or a campaign, is the trigger that tips a person into doing it. Self-efficacy was added later, borrowed from Social Cognitive Theory. Every core idea starts with 'perceived' because the model is about beliefs, not real risk.",
"points": [
"Susceptibility = chance of getting it; severity = how serious it would be",
"Benefits vs barriers: the pros and cons of acting",
"Cue to action = the trigger (reminder letter, symptom, friend's diagnosis)"
],
"tip": "Think 'Am I at risk? Is it bad? Will acting help? What stops me? What nudges me?' in that order."
},
{
"cat": "sct",
"title": "Social Cognitive Theory",
"about": "Albert Bandura's Social Cognitive Theory says behaviour is learned in a social setting and shaped by thinking, not only by rewards. Self-efficacy, confidence in your own ability to do a behaviour, is its best-known idea and a strong predictor of change. People learn by observing others (observational learning or modelling), form outcome expectations about what will happen if they act, and are encouraged or discouraged by reinforcement such as rewards and consequences. Reciprocal determinism ties it together: the person, their behaviour and their environment all influence each other in a loop. Unlike the Health Belief Model, which focuses on beliefs about a disease, SCT focuses on skills, confidence and surroundings.",
"points": [
"Self-efficacy = 'I can do it' (confidence), not 'it will work' (outcome expectation)",
"Outcome expectations = predicted results; reinforcement = actual rewards or consequences after acting",
"Reciprocal determinism = three-way loop of person, behaviour and environment"
],
"tip": "SCT = See (observational learning), Confidence (self-efficacy), Triangle (person-behaviour-environment loop)."
}
],
"outro": "For 'Which model?', ask what the idea is about: a stage in time (TTM), a belief about a health threat (HBM), or learning, confidence and environment (SCT)."
}
});
