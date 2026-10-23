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
}
],
"items": [
{
"name": "Precontemplation",
"cat": "ttm",
"meaning": "Not thinking about changing in the next six months",
"life": "Sam knows smoking is harmful but has no plans to quit.",
"num": 1
},
{
"name": "Contemplation",
"cat": "ttm",
"meaning": "Thinking about changing within the next six months",
"life": "Sam keeps saying he should quit 'one day soon'.",
"num": 2
},
{
"name": "Preparation",
"cat": "ttm",
"meaning": "Planning to act within the next month and taking small steps",
"life": "Sam sets a quit date and buys nicotine patches.",
"num": 3
},
{
"name": "Action",
"cat": "ttm",
"meaning": "Has changed the behaviour within the last six months",
"life": "Sam has not smoked for two months.",
"num": 4
},
{
"name": "Maintenance",
"cat": "ttm",
"meaning": "Has kept the change going for more than six months",
"life": "Sam has been smoke-free for a year and avoids old triggers.",
"num": 5
},
{
"name": "Perceived susceptibility",
"cat": "hbm",
"meaning": "How likely I think I am to get the condition",
"life": "Ana thinks she could get diabetes because it runs in her family.",
"num": 6
},
{
"name": "Perceived severity",
"cat": "hbm",
"meaning": "How serious I think the condition would be",
"life": "Ana fears diabetes could affect her eyesight.",
"num": 7
},
{
"name": "Perceived benefits",
"cat": "hbm",
"meaning": "How much I believe acting would lower my risk",
"life": "Ana believes walking daily will lower her blood sugar.",
"num": 8
},
{
"name": "Perceived barriers",
"cat": "hbm",
"meaning": "What I think stands in the way of acting",
"life": "Ana worries she has no time to exercise.",
"num": 9
},
{
"name": "Cues to action",
"cat": "hbm",
"meaning": "A trigger that prompts me to act",
"life": "A reminder text from her clinic makes Ana book a check-up.",
"num": 10
},
{
"name": "Self-efficacy",
"cat": "sct",
"meaning": "My confidence that I can do the behaviour",
"life": "Leo feels sure he can cook a healthy meal even on a busy weeknight.",
"num": 11
},
{
"name": "Observational learning",
"cat": "sct",
"meaning": "Learning a behaviour by watching others",
"life": "Leo starts cooking healthy meals after watching his sister.",
"num": 12
},
{
"name": "Outcome expectations",
"cat": "sct",
"meaning": "The results, good or bad, I expect from doing the behaviour",
"life": "Leo expects to have more energy if he sleeps eight hours.",
"num": 13
},
{
"name": "Reinforcement",
"cat": "sct",
"meaning": "Rewards or consequences that make a behaviour more or less likely",
"life": "Leo's running app gives badges that keep him going.",
"num": 14
},
{
"name": "Reciprocal determinism",
"cat": "sct",
"meaning": "Person, behaviour and environment all influence each other",
"life": "Leo's gym friends make exercise easier; as he gets fitter and more confident, he brings more friends along.",
"num": 15
}
]
});
