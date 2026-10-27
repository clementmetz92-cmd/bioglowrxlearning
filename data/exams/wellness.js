/* Pre-exam simulator: Health & Wellness question bank (HW315 behaviour models, HS305 health information, statistics).
   Schema: data/README.md › "Pre-exam simulator". */
BGX.registerExamBank({
"subject": "wellness",
"title": "Health & Wellness",
"groups": { "models": "Behaviour models (HW315)", "sources": "Health information (HS305)", "stats": "Statistics" },
"topics": [
  { "id": "ttm", "label": "Stages of Change (TTM)", "game": "model-match", "ch": "HW315", "group": "models" },
  { "id": "hbm", "label": "Health Belief Model", "game": "model-match", "ch": "HW315", "group": "models" },
  { "id": "sct", "label": "Social Cognitive Theory", "game": "model-match", "ch": "HW315", "group": "models" },
  { "id": "sources", "label": "Judging health information", "game": "source-detective", "ch": "HS305", "group": "sources" },
  { "id": "data", "label": "Variables and levels of measurement", "game": "odds-on", "mode": "classify", "ch": "Stats", "group": "stats" },
  { "id": "design", "label": "Sampling and study design", "game": "odds-on", "mode": "clinic", "ch": "Stats", "group": "stats" },
  { "id": "describe", "label": "Centre, spread and the normal curve", "game": "odds-on", "mode": "lab", "ch": "Stats", "group": "stats" },
  { "id": "prob", "label": "Probability", "game": "odds-on", "mode": "lab", "ch": "Stats", "group": "stats" },
  { "id": "infer", "label": "Testing ideas, risk and screening", "game": "odds-on", "mode": "risklab", "ch": "Stats", "group": "stats" }
],
"sources": [
  { "game": "model-match", "use": "quiz", "mode": "meaning", "topic": { "ttm": "ttm", "hbm": "hbm", "sct": "sct" } },
  { "game": "model-match", "use": "sortit", "topic": { "ttm": "ttm", "hbm": "hbm", "sct": "sct" } },
  { "game": "model-match", "use": "sequences", "topic": "ttm" },
  { "game": "model-match", "use": "pairs", "topic": "hbm", "pairs": 5 },
  { "game": "source-detective", "use": "truemyth", "topic": "sources" }, { "game": "source-detective", "use": "sortit", "topic": "sources" },
  { "game": "odds-on", "use": "cases", "topic": { "levels": "data", "vars": "data", "study": "design", "centre": "describe", "spread": "describe", "prob": "prob", "test": "infer", "risk": "infer" } },
  { "game": "odds-on", "use": "problems", "topic": { "centre": "describe", "spread": "describe", "prob": "prob", "risk": "infer" } },
  { "game": "odds-on", "use": "quiz", "mode": "idea", "topic": { "levels": "data", "vars": "data", "study": "design", "centre": "describe", "spread": "describe", "prob": "prob", "test": "infer", "risk": "infer" } }
],
"items": [
  { "id": "hw-ttm-1", "topic": "ttm", "kind": "single", "difficulty": 1, "src": "HW315",
    "stem": "Marcus was told his blood pressure was high. Four months ago he started walking 30 minutes daily and has kept it up. Which stage is he in?",
    "options": ["Preparation", "Action", "Maintenance", "Contemplation"], "answer": 1,
    "whyOpt": ["No: he has already changed, not just planning.", "Correct: the change is real and under six months old.", "Needs more than six months of sustained change.", "He is beyond thinking about it."],
    "why": "Action = a real change kept up for less than six months; Maintenance starts after six months." },
  { "id": "hw-hbm-1", "topic": "hbm", "kind": "single", "difficulty": 1, "src": "HW315",
    "stem": "A clinic texts patients: \"Flu season starts next week: book your free flu shot.\" Which construct is the text mainly targeting?",
    "options": ["Perceived susceptibility", "Cues to action", "Self-efficacy", "Perceived severity"], "answer": 1,
    "whyOpt": ["The message doesn't argue the patient is at personal risk.", "Correct: it is a prompt/trigger to act now.", "It doesn't build confidence in ability to do it.", "Nothing describes how bad flu would be."],
    "why": "A reminder or prompt that triggers the behaviour is a cue to action." },
  { "id": "hw-ppv-1", "topic": "infer", "kind": "single", "difficulty": 2, "src": "Stats",
    "stem": "1,000 people are screened. Of 200 with the disease, 170 test positive; of 800 without, 40 test positive. What is the positive predictive value?",
    "options": ["85.0%", "95.0%", "81.0%", "21.0%"], "answer": 2,
    "whyOpt": ["Sensitivity (170/200): wrong denominator.", "Specificity (760/800).", "Correct: TP/(TP+FP) = 170/210.", "The share testing positive (210/1,000), not predictive value."],
    "why": "PPV = true positives ÷ everyone who tested positive." }
],
"formats": [
  { "id": "quick", "label": "Quick check", "desc": "15 questions across all three units.", "n": 15, "minutes": 20, "pass": 70, "calculator": "basic", "sheet": ["stats"],
    "blueprint": { "topics": { "models": 6, "sources": 3, "stats": 6 }, "kinds": { "single": 11, "match": 1, "numeric": 3 } } },
  { "id": "unit", "label": "Unit mock", "desc": "Choose a unit: models, sources or stats.", "n": 25, "minutes": 45, "pass": 70, "choose": "group", "calculator": "basic", "sheet": ["stats"],
    "blueprint": { "kinds": { "single": 18, "case": 3, "match": 1, "numeric": 3 } } },
  { "id": "full", "label": "Full mock", "desc": "40 questions: behaviour models, health information and statistics.", "n": 40, "minutes": 75, "pass": 70, "calculator": "basic", "sheet": ["stats"],
    "blueprint": { "topics": { "models": 12, "sources": 8, "stats": 20 }, "kinds": { "single": 26, "case": 3, "match": 2, "numeric": 8, "sata": 1 } } }
]
});
