/* Pre-exam simulator: Pharmacology question bank. Schema: data/README.md › "Pre-exam simulator".
   Practice only, not medical advice. Dosage rules shown on every calculation: round only at the end, leading zero, no trailing zero. */
BGX.registerExamBank({
"subject": "pharmacology",
"title": "Pharmacology",
"rules": "Dosage calculations: round only at the end, to the place the question gives. Write a leading zero (0.5) and no trailing zero (5, not 5.0). 1 kg = 2.2 lb.",
"topics": [
  { "id": "pkpd", "label": "Pharmacokinetics and pharmacodynamics", "game": "drug-journey", "ch": "1" },
  { "id": "safety", "label": "Medication safety", "game": "med-safety-check", "ch": "2" },
  { "id": "antimicro", "label": "Antimicrobials", "game": "bug-vs-drug", "ch": "3" },
  { "id": "autonomic", "label": "Autonomic drugs", "game": "fight-or-rest", "ch": "4" },
  { "id": "cardio", "label": "Cardiovascular drugs", "game": "drug-class-sort", "mode": "class", "ch": "5–9", "group": "systems" },
  { "id": "resp", "label": "Respiratory drugs", "game": "drug-class-sort", "ch": "5–9", "group": "systems" },
  { "id": "gi", "label": "GI drugs", "game": "drug-class-sort", "ch": "5–9", "group": "systems" },
  { "id": "cns", "label": "CNS drugs", "game": "drug-class-sort", "ch": "5–9", "group": "systems" },
  { "id": "endo", "label": "Endocrine drugs", "game": "drug-class-sort", "ch": "5–9", "group": "systems" },
  { "id": "pain", "label": "Pain, muscle and gout drugs", "game": "pain-ladder", "ch": "10" },
  { "id": "calc-oral", "label": "Dose calc: tablets, liquids and conversions", "game": "dose-calc", "mode": "oral", "ch": "All", "group": "calc" },
  { "id": "calc-weight", "label": "Dose calc: weight-based and safe range", "game": "dose-calc", "mode": "weight", "ch": "All", "group": "calc" },
  { "id": "calc-iv", "label": "Dose calc: IV and drip rates", "game": "dose-calc", "mode": "iv", "ch": "All", "group": "calc" },
  { "id": "calc-adv", "label": "Dose calc: insulin, heparin and titration", "game": "dose-calc", "mode": "advanced", "ch": "All", "group": "calc" }
],
"groups": { "systems": "Ch 5–9 · Drugs by body system", "calc": "Dosage calculations" },
"sources": [
  { "game": "drug-journey", "use": "exam", "topic": "pkpd" }, { "game": "drug-journey", "use": "sequences", "topic": "pkpd" }, { "game": "drug-journey", "use": "quiz", "mode": "meaning", "topic": "pkpd" }, { "game": "drug-journey", "use": "pairs", "topic": "pkpd" },
  { "game": "med-safety-check", "use": "exam", "topic": "safety" }, { "game": "med-safety-check", "use": "quiz", "mode": "check", "topic": "safety" }, { "game": "med-safety-check", "use": "pairs", "topic": "safety" },
  { "game": "bug-vs-drug", "use": "exam", "topic": "antimicro" }, { "game": "bug-vs-drug", "use": "quiz", "mode": "example", "topic": "antimicro" }, { "game": "bug-vs-drug", "use": "sortit", "topic": "antimicro" },
  { "game": "fight-or-rest", "use": "exam", "topic": "autonomic" }, { "game": "fight-or-rest", "use": "sortit", "topic": "autonomic" }, { "game": "fight-or-rest", "use": "pairs", "topic": "autonomic" },
  { "game": "drug-class-sort", "use": "exam", "topic": { "cardio": "cardio", "resp": "resp", "gi": "gi", "cns": "cns", "endo": "endo" } },
  { "game": "drug-class-sort", "use": "quiz", "mode": "class", "topic": { "cardio": "cardio", "resp": "resp", "gi": "gi", "cns": "cns", "endo": "endo" } },
  { "game": "drug-class-sort", "use": "quiz", "mode": "use", "topic": { "cardio": "cardio", "resp": "resp", "gi": "gi", "cns": "cns", "endo": "endo" } },
  { "game": "pain-ladder", "use": "exam", "topic": "pain" }, { "game": "pain-ladder", "use": "cases", "topic": "pain" }, { "game": "pain-ladder", "use": "sequences", "topic": "pain" }, { "game": "pain-ladder", "use": "quiz", "mode": "watch", "topic": "pain" },
  { "game": "dose-calc", "use": "problems", "topic": { "tablets": "calc-oral", "liquids": "calc-oral", "convert": "calc-oral", "weight": "calc-weight", "safe": "calc-weight", "ivrate": "calc-iv", "drip": "calc-iv", "insulin": "calc-adv", "titrate": "calc-adv", "recon": "calc-adv" } }
],
"items": [
  { "id": "ph-cv-1", "topic": "cardio", "kind": "single", "difficulty": 2, "src": "6",
    "stem": "A patient started lisinopril 2 weeks ago and reports a dry, tickly cough with clear lungs. What is the most likely cause?",
    "options": ["Bradykinin build-up from ACE inhibition", "Fluid overload from worsening heart failure", "Hyperkalemia", "An anaphylactic reaction needing epinephrine"], "answer": 0,
    "whyOpt": ["Correct: a dry cough is a known class effect, and switching to an ARB is typical.", "This would bring crackles, dyspnea or edema, and the lungs are clear.", "A real ACE-inhibitor risk, but it causes weakness and dysrhythmias, not a cough.", "The emergency is angioedema of the lips or tongue, not an isolated cough."],
    "why": "ACE also breaks down bradykinin; blocking it lets bradykinin build up in the airways, which causes the typical dry cough." },
  { "id": "ph-calc-1", "topic": "calc-weight", "kind": "numeric", "difficulty": 2, "src": "All",
    "stem": "Order: vancomycin 15 mg/kg IV every 12 hours. The patient weighs 154 lb. How many mg per dose? (Round to the nearest whole number.)",
    "answer": 1050, "unit": "mg", "dp": 0, "noTrail": true,
    "steps": ["154 lb ÷ 2.2 = 70 kg", "70 kg × 15 mg/kg = 1050 mg"],
    "traps": [{ "value": 2310, "why": "lb used as kg: convert lb to kg first." }, { "value": 2100, "why": "That is the daily total: the question asks per dose." }],
    "why": "Convert pounds to kilograms first, then multiply by the dose per kilogram." },
  { "id": "ph-match-1", "topic": "safety", "kind": "match", "difficulty": 2, "src": "2", "allOrNothing": true,
    "stem": "Match each drug to its reversal agent.",
    "pairs": [["heparin", "protamine sulfate"], ["warfarin", "vitamin K (phytonadione)"], ["morphine", "naloxone"], ["lorazepam", "flumazenil"], ["{{us:acetaminophen|uk:paracetamol}}", "acetylcysteine"]],
    "whyPair": ["Protamine binds heparin. (Vitamin K is the distractor; it reverses warfarin.)", "Vitamin K restores clotting-factor synthesis.", "Naloxone is an opioid-receptor antagonist. (Flumazenil does not reverse opioids.)", "Flumazenil is a benzodiazepine-receptor antagonist.", "Acetylcysteine replenishes glutathione to protect the liver."],
    "why": "Score 1 point only if all 5 are right; the review shows which pairs you had." }
],
"formats": [
  { "id": "unit", "label": "Unit test", "desc": "One chapter (5–9 counts as one), 25 questions.", "n": 25, "minutes": 45, "pass": 75, "choose": "unit", "calculator": "basic", "sheet": ["dosecalc"], "recallMax": 0.2,
    "units": [{ "id": "pkpd", "label": "Ch 1 · PK and PD", "topics": ["pkpd", "calc-oral", "calc-weight"] }, { "id": "safety", "label": "Ch 2 · Medication safety", "topics": ["safety", "calc-oral", "calc-weight"] },
      { "id": "antimicro", "label": "Ch 3 · Antimicrobials", "topics": ["antimicro"] }, { "id": "autonomic", "label": "Ch 4 · Autonomic drugs", "topics": ["autonomic"] },
      { "id": "systems", "label": "Ch 5–9 · Body systems", "topics": ["cardio", "resp", "gi", "cns", "endo", "calc-iv", "calc-adv"] }, { "id": "pain", "label": "Ch 10 · Pain, muscle, gout", "topics": ["pain"] }],
    "blueprint": { "kinds": { "single": 13, "sata": 5, "first": 3, "numeric": 2, "match": 2 } } },
  { "id": "calc", "label": "Dosage-calc competency", "desc": "20 calculations, new numbers every attempt.", "n": 20, "minutes": 60, "pass": 90, "kinds": ["numeric"], "topics": ["calc"], "calculator": "basic", "sheet": ["dosecalc"],
    "blueprint": { "topics": { "calc-oral": 9, "calc-weight": 4, "calc-iv": 4, "calc-adv": 3 } } },
  { "id": "final", "label": "Final (comprehensive)", "desc": "All 10 chapters plus dosage calculations.", "n": 75, "minutes": 120, "pass": 75, "calculator": "basic", "sheet": ["dosecalc"], "recallMax": 0.2,
    "blueprint": { "topics": { "pkpd": 8, "safety": 8, "antimicro": 9, "autonomic": 8, "cardio": 8, "resp": 4, "gi": 4, "cns": 6, "endo": 4, "pain": 8, "calc": 8 },
      "kinds": { "single": 37, "sata": 15, "first": 8, "numeric": 10, "match": 5 } } }
]
});
