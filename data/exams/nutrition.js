/* Pre-exam simulator: Nutrition question bank. Schema: data/README.md › "Pre-exam simulator".
   Test the current guidance (Mifflin–St Jeor, MyPlate, 2016+ label, sodium DV 2,300 mg…); tag new items with "asOf". */
BGX.registerExamBank({
"subject": "nutrition",
"title": "Nutrition",
"topics": [
  { "id": "assess", "label": "Assessment (ABCD)", "game": "clinic-basics", "ch": "1–2" },
  { "id": "energy", "label": "Energy balance and obesity", "game": "energy-balance", "ch": "3" },
  { "id": "life", "label": "Life stages", "game": "life-stage-plates", "ch": "4–6" },
  { "id": "diet", "label": "Heart, diabetes and GI diets", "game": "diet-doctor", "ch": "7–10" },
  { "id": "micro", "label": "Vitamins and minerals", "game": "nutrient-rush", "ch": "11–12" },
  { "id": "supp", "label": "Supplements and CAM", "game": "supplement-myths", "ch": "13–14" },
  { "id": "coach", "label": "Behaviour change, access and culture", "game": "coach-talk", "ch": "15–17" },
  { "id": "mixed", "label": "Cross-topic", "game": "exam-prep", "ch": "Review" }
],
"sources": [
  { "game": "clinic-basics", "use": "problems", "topic": "assess" }, { "game": "clinic-basics", "use": "cases", "topic": "assess" }, { "game": "clinic-basics", "use": "quiz", "mode": "tells", "topic": "assess" },
  { "game": "energy-balance", "use": "problems", "topic": "energy" }, { "game": "energy-balance", "use": "quiz", "mode": "which", "topic": "energy" }, { "game": "energy-balance", "use": "truemyth", "topic": "energy" },
  { "game": "life-stage-plates", "use": "cases", "topic": "life" }, { "game": "life-stage-plates", "use": "quiz", "mode": "key", "topic": "life" },
  { "game": "diet-doctor", "use": "cases", "topic": "diet" }, { "game": "diet-doctor", "use": "quiz", "mode": "helps", "topic": "diet" },
  { "game": "nutrient-rush", "use": "exam", "topic": "micro" }, { "game": "nutrient-rush", "use": "quiz", "mode": "lack", "topic": "micro" }, { "game": "nutrient-rush", "use": "pairs", "topic": "micro" },
  { "game": "supplement-myths", "use": "truemyth", "topic": "supp" },
  { "game": "coach-talk", "use": "cases", "topic": "coach" }, { "game": "coach-talk", "use": "sequences", "topic": "coach" }, { "game": "coach-talk", "use": "quiz", "mode": "stage", "topic": "coach" },
  { "game": "exam-prep", "use": "cases", "topic": { "assess": "assess", "energy": "energy", "life": "life", "diet": "diet", "vit": "micro", "supp": "supp", "coach": "coach", "mixed": "mixed" } },
  { "game": "exam-prep", "use": "quiz", "mode": "quick", "topic": { "assess": "assess", "energy": "energy", "life": "life", "diet": "diet", "vit": "micro", "supp": "supp", "coach": "coach", "mixed": "mixed" } }
],
"items": [
  { "id": "nu-en-1", "topic": "energy", "kind": "single", "difficulty": 2, "src": "3",
    "stem": "Maria, 40, female, 70 kg, 165 cm. What is her resting energy expenditure by Mifflin–St Jeor?",
    "options": ["1,370 kcal/day", "1,536 kcal/day", "2,124 kcal/day", "1,570 kcal/day"], "answer": 0,
    "whyOpt": ["Correct: 10(70) + 6.25(165) − 5(40) − 161 = 1,370.", "Uses the male constant (+5 instead of −161).", "This is TDEE (× 1.55). The question asked for resting needs.", "Leaves out the age term (−5 × age)."],
    "why": "Mifflin–St Jeor for women: 10 × kg + 6.25 × cm − 5 × age − 161." },
  { "id": "nu-label-1", "topic": "assess", "kind": "sata", "difficulty": 2, "src": "1–2",
    "stem": "One serving is 1 cup, 240 kcal, 9 g total fat, 460 mg sodium (20% DV), 12 g added sugars (24% DV). There are 2 servings per container. Select all that apply.",
    "options": ["Fat supplies about 34% of the calories.", "The whole container provides 480 kcal.", "20% DV for sodium means the food is low in sodium.", "Added sugars supply 48 kcal per serving.", "The %DV for sodium is based on 1,500 mg."], "answer": [0, 1, 3],
    "whyOpt": ["Correct: 9 g × 9 = 81 kcal; 81 ÷ 240 = 34%.", "Correct: the label figures are per serving.", "Wrong: 5% or less is low and 20% or more is high.", "Correct: 12 g × 4 = 48 kcal.", "Wrong: the label DV is 2,300 mg."],
    "why": "Label figures are per serving; fat gives 9 kcal/g and sugar 4 kcal/g; 5% DV or less is low, 20% or more is high." },
  { "id": "nu-life-1", "topic": "life", "kind": "single", "difficulty": 2, "src": "4",
    "stem": "Lena, 28, is planning a pregnancy. Her last pregnancy was affected by a neural tube defect. What is the best advice?",
    "options": ["Folic acid 4 mg daily, starting at least 1 month before conception, under prescription", "400 mcg folic acid daily", "Start folic acid once pregnancy is confirmed", "Rely on folate-rich foods"], "answer": 0,
    "whyOpt": ["Correct: this is the high-dose recommendation after a previous NTD.", "This is the dose for all women who could become pregnant, not for her higher risk.", "Too late: the neural tube closes by about day 28.", "Food alone does not reliably reach a protective intake."],
    "why": "After a previous neural tube defect the folic acid dose is raised tenfold and started before conception." }
],
"formats": [
  { "id": "unit", "label": "Unit quiz", "desc": "One topic, 15 questions.", "n": 15, "minutes": 20, "pass": 70, "choose": "topic", "calculator": "basic",
    "blueprint": { "kinds": { "single": 9, "sata": 3, "case": 2, "numeric": 1 } } },
  { "id": "midterm", "label": "Midterm", "desc": "Chapters 1–10.", "n": 40, "minutes": 75, "pass": 70, "topics": ["assess", "energy", "life", "diet"], "calculator": "basic",
    "blueprint": { "topics": { "assess": 10, "energy": 10, "life": 10, "diet": 10 }, "kinds": { "single": 20, "sata": 6, "case": 6, "numeric": 8 } } },
  { "id": "final", "label": "Final", "desc": "All 17 chapters, cumulative.", "n": 60, "minutes": 120, "pass": 70, "calculator": "basic",
    "blueprint": { "topics": { "assess": 15, "energy": 15, "life": 15, "diet": 20, "micro": 15, "supp": 5, "coach": 10, "mixed": 5 }, "kinds": { "single": 30, "sata": 9, "case": 12, "numeric": 9 } } }
]
});
