/* Med Safety Check — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "med-safety-check",
"title": "Med Safety Check",
"subject": "pharmacology",
"subjectName": "Pharmacology",
"chapter": "2",
"tagline": "The rights of medication administration and the do-not-use abbreviations",
"itemNoun": "safety rule",
"categories": [
{
"id": "rights",
"name": "The rights of medication administration",
"color": "cat-sage",
"icon": "check"
},
{
"id": "abbr",
"name": "Do-not-use abbreviations",
"color": "cat-coral",
"icon": "ban"
}
],
"categoryLabel": "Group",
"hint": "Nurses check every medicine against the 'rights' before giving it, and avoid abbreviations that are easy to misread.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{check}"
],
"detail": [
{
"label": "Group",
"field": "{category}"
},
{
"label": "What to do",
"field": "{check}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the rules",
"desc": "Tap a rule to see what to check and why.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "check",
"format": "quiz",
"title": "What do you check?",
"desc": "See the rule, pick the right action.",
"icon": "?",
"color": "cat-sky",
"prompt": "What does this rule ask you to do?",
"show": "name",
"showAs": "big",
"answer": "check",
"answerAs": "small"
},
{
"id": "group",
"format": "sortit",
"title": "Right or risky?",
"desc": "Is it a safety right or a banned abbreviation?",
"icon": "⌖",
"color": "cat-coral",
"prompt": "Which group does this belong to?",
"choices": 2
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each rule with what to do.",
"icon": "⇄",
"color": "cat-mint",
"clue": "check",
"clueLabel": "Do this"
},
{"id":"exam","format":"exam","title":"Exam-style questions","desc":"Select all that apply, and what to do first.","icon":"✓✓","color":"cat-sand","rounds":8,"extra":true}
],
"exam": [
 {
  "id": "ms-x1",
  "cat": "rights",
  "kind": "sata",
  "q": "Which are acceptable ways to confirm a patient's identity before giving a medicine? Select all that apply.",
  "options": [
   "Ask the patient to state their full name",
   "Check the date of birth against the wristband",
   "Scan the wristband and compare it with the MAR",
   "Check the room and bed number",
   "Ask \"Are you Mr Lee?\" and wait for a yes"
  ],
  "answer": [
   0,
   1,
   2
  ],
  "why": "Use two identifiers, such as full name and date of birth, checked against the wristband and the medication record. Room and bed numbers change and are never identifiers. A yes-or-no question invites a confused or hard-of-hearing patient to agree with the wrong name."
 },
 {
  "id": "ms-x2",
  "cat": "abbr",
  "kind": "sata",
  "q": "Which orders contain an abbreviation or number style on the do-not-use list? Select all that apply.",
  "options": [
   "Insulin lispro 6 U subcut before meals",
   "Digoxin .125 mg by mouth daily",
   "Warfarin 5.0 mg by mouth daily",
   "Metoprolol 25 mg by mouth twice daily",
   "Heparin 5,000 units subcut every 12 hours",
   "MSO4 2 mg IV every 4 hours as needed"
  ],
  "answer": [
   0,
   1,
   2,
   5
  ],
  "why": "U can be read as 0 or 4, .125 without a leading zero can be read as 125, 5.0 with a trailing zero can be read as 50, and MSO4 can be confused with magnesium sulfate. Metoprolol and heparin are written correctly, with units in full."
 },
 {
  "id": "ms-x3",
  "cat": "rights",
  "kind": "sata",
  "stem": "A nurse is preparing a continuous IV heparin infusion.",
  "q": "Which actions help prevent an error? Select all that apply.",
  "options": [
   "Ask a second nurse for an independent double-check",
   "Use the smart pump's drug library",
   "Check the latest aPTT or anti-Xa result",
   "Use the bag strength that matches the last bag",
   "Override pump alerts when the rate looks right"
  ],
  "answer": [
   0,
   1,
   2
  ],
  "why": "Heparin is a high-alert medicine: independent double-checks, smart pump libraries and checking the lab result that guides the rate all catch errors. The strength must be checked against the current order, not the last bag, and pump alerts should be investigated, not overridden."
 },
 {
  "id": "ms-x4",
  "cat": "rights",
  "kind": "sata",
  "q": "Which medicines are on the ISMP list of high-alert medicines in hospitals? Select all that apply.",
  "options": [
   "Insulin",
   "IV heparin",
   "Concentrated IV potassium chloride",
   "IV hydromorphone",
   "Oral amoxicillin",
   "Oral ondansetron"
  ],
  "answer": [
   0,
   1,
   2,
   3
  ],
  "why": "High-alert medicines cause serious harm when an error happens: insulin, anticoagulants such as heparin, concentrated electrolytes such as potassium chloride, and opioids are on the list. Errors with amoxicillin or ondansetron matter too, but they are not usually as dangerous."
 },
 {
  "id": "ms-x5",
  "cat": "rights",
  "kind": "sata",
  "stem": "A patient refuses her 09:00 enoxaparin injection.",
  "q": "Which actions are appropriate? Select all that apply.",
  "options": [
   "Ask about her reason for refusing",
   "Explain the risk of not having it",
   "Tell the prescriber about the refusal",
   "Record the refusal and the reason given",
   "Give it anyway, as it is a high-alert drug",
   "Ask her husband to consent for her instead"
  ],
  "answer": [
   0,
   1,
   2,
   3
  ],
  "why": "A patient with capacity may refuse any medicine. The nurse explores the reason, explains the risk, informs the prescriber and documents it. Giving it anyway would be treatment without consent, and a relative cannot consent for an adult who has capacity."
 },
 {
  "id": "ms-x6",
  "cat": "rights",
  "kind": "sata",
  "stem": "A patient with a feeding tube has several tablets due, including an extended-release one.",
  "q": "Which actions are correct? Select all that apply.",
  "options": [
   "Check whether each tablet may be crushed",
   "Ask pharmacy about another form of the ER tablet",
   "Crush the extended-release tablet finely",
   "Give each drug separately and flush between",
   "Mix all the crushed drugs to save time"
  ],
  "answer": [
   0,
   1,
   3
  ],
  "why": "Crushing an extended-release tablet can release the whole dose at once, so the nurse checks and asks pharmacy or the prescriber for a liquid or other form. Drugs are given one at a time with flushes to prevent interactions and tube blockage."
 },
 {
  "id": "ms-x7",
  "cat": "rights",
  "kind": "first",
  "stem": "A nurse realises she has just given metoprolol 50 mg instead of the ordered 25 mg.",
  "q": "What should the nurse do first?",
  "options": [
   "Notify the prescriber",
   "Check the patient's pulse and blood pressure",
   "Complete an incident report",
   "Inform the charge nurse"
  ],
  "answer": 1,
  "why": "Patient safety comes first: assess the patient for the effects of the extra dose (slow pulse, low blood pressure). The nurse then tells the prescriber with these findings, informs the charge nurse and completes an incident report."
 },
 {
  "id": "ms-x8",
  "cat": "rights",
  "kind": "first",
  "stem": "At the bedside, a patient says, \"That pill looks different from the one I take at home.\"",
  "q": "What should the nurse do first?",
  "options": [
   "Explain that generic pills can look different",
   "Hold the pill and recheck it against the order",
   "Call the pharmacist about the tablet",
   "Document the patient's concern"
  ],
  "answer": 1,
  "why": "Safety first: a patient's concern is a warning sign of a possible error. Stop and recheck the label against the order before anything else. Calling the pharmacist may follow, and an explanation is given only once the drug is confirmed correct."
 },
 {
  "id": "ms-x9",
  "cat": "rights",
  "kind": "first",
  "q": "Which patient should the nurse see first?",
  "options": [
   "On insulin, sweaty and shaky, glucose {{us:58 mg/dL|uk:3.2 mmol/L}}",
   "Due for metoprolol at 09:00, pulse 72 at 08:30",
   "Wants to talk about stopping her statin",
   "Asking for {{us:acetaminophen|uk:paracetamol}}, headache 3/10"
  ],
  "answer": 0,
  "why": "Unstable over stable: symptomatic low blood sugar can quickly lead to confusion and seizures, and needs treatment now. The scheduled dose, the conversation and the mild headache can wait a few minutes."
 },
 {
  "id": "ms-x10",
  "cat": "abbr",
  "kind": "first",
  "stem": "A patient with pre-eclampsia has a new order: \"MSO4 4 g IV over 30 minutes.\"",
  "q": "What should the nurse do first?",
  "options": [
   "Prepare the infusion on a smart pump",
   "Ask a second nurse to double-check the dose",
   "Clarify the drug name with the prescriber",
   "Teach the patient about the infusion"
  ],
  "answer": 2,
  "why": "MSO4 can mean morphine or magnesium sulfate, so the order is unsafe until clarified. Preparing, double-checking and teaching all depend on knowing which drug is meant, and the prescriber should rewrite it with the full drug name."
 }
],
"items": [
{
"name": "Right patient",
"cat": "rights",
"check": "Check two identifiers, such as name and date of birth",
"summary": "Confirm the medicine is for the person in front of you.",
"life": "Hospital wristbands exist for this check.",
"icon": "pharm-wristband",
"num": 1,
"spot": "patient",
"facts": [
"Use two identifiers, such as full name and date of birth, never the room number.",
"Ask the patient to state their name rather than asking 'Are you Mr Smith?'.",
"Compare the identifiers with the wristband and the medication record."
]
},
{
"name": "Right drug",
"cat": "rights",
"check": "Compare the label with the order",
"summary": "Make sure the medicine is exactly the one prescribed.",
"life": "Look-alike packaging is a common cause of mix-ups.",
"icon": "pharm-bottle",
"num": 2,
"spot": "drug",
"facts": [
"Check the label against the order at least three times while preparing.",
"Watch for look-alike, sound-alike names, such as hydroxyzine and hydralazine.",
"Also check the patient's allergies before giving a new drug."
]
},
{
"name": "Right dose",
"cat": "rights",
"check": "Check the amount, and recalculate if unsure",
"summary": "Confirm the amount and strength match the order.",
"life": "A misplaced decimal point can mean a tenfold error.",
"icon": "scale",
"num": 3,
"spot": "dose",
"facts": [
"Confirm the strength on the label matches the ordered amount.",
"High-alert drugs such as insulin and heparin are often double-checked by a second nurse.",
"Recalculating catches decimal slips that cause tenfold errors."
]
},
{
"name": "Right route",
"cat": "rights",
"check": "Give it by the way ordered: mouth, injection, IV…",
"summary": "The same drug can act very differently by another route.",
"life": "A tablet meant to be swallowed should not be crushed into a feeding tube without checking.",
"icon": "pharm-signpost",
"num": 4,
"spot": "route",
"facts": [
"Common routes: by mouth, under the tongue, injection, IV, inhaled, on the skin.",
"Enteric-coated or slow-release tablets should not be crushed.",
"If the route is missing or unclear, ask the prescriber before giving."
]
},
{
"name": "Right time",
"cat": "rights",
"check": "Give it at the scheduled time and frequency",
"summary": "Timing keeps drug levels steady and safe.",
"life": "Some antibiotics must be spaced evenly through the day.",
"icon": "timer",
"num": 5,
"spot": "time",
"facts": [
"Check the scheduled time and how often the dose is due.",
"Many hospitals allow a short window around the scheduled time.",
"Check when the last dose was given to avoid doubling up."
]
},
{
"name": "Right documentation",
"cat": "rights",
"check": "Record it after giving it, never before",
"summary": "The record tells the next nurse what has been given.",
"life": "Charting before giving risks a missed or double dose.",
"icon": "clipboard",
"num": 6,
"spot": "doc",
"facts": [
"Record the drug, dose, route, time and your name straight after giving it.",
"Never chart a medicine before it has actually been given.",
"Also record refusals, held doses and any reaction."
]
},
{
"name": "Right reason",
"cat": "rights",
"check": "Know why the patient is getting it",
"summary": "Checking the reason catches orders that do not fit the patient.",
"life": "If a blood pressure tablet is due but the pressure is low, you check first.",
"icon": "question",
"num": 7,
"spot": "reason",
"facts": [
"Check the medicine fits the patient's condition or history.",
"Check related vital signs or lab results first, such as pulse before a beta blocker.",
"Question any order that does not seem to fit, before giving it."
]
},
{
"name": "Right response",
"cat": "rights",
"check": "Watch for the expected effect and side effects",
"summary": "Check that the medicine worked and caused no harm.",
"life": "Re-checking pain score after giving pain relief.",
"icon": "eye",
"num": 8,
"spot": "response",
"facts": [
"Checked after giving: did the medicine work, and were there side effects?",
"Examples: re-check pain score after pain relief or blood sugar after insulin.",
"Report and record any unexpected or harmful reaction."
]
},
{
"name": "Right to refuse",
"cat": "rights",
"check": "Respect the patient's choice, then report and record it",
"summary": "Patients can say no to a medicine.",
"life": "A refused dose is documented and the prescriber is informed.",
"icon": "hand",
"num": 9,
"spot": "refuse",
"facts": [
"A patient with capacity may refuse any medicine.",
"Explain the risks of refusing, but never force or hide a medicine.",
"Tell the prescriber and record the refusal and the reason given."
]
},
{
"name": "U for units",
"cat": "abbr",
"check": "Write 'units' in full",
"summary": "A handwritten U can look like a 0 or a 4.",
"life": "'10U' of insulin misread as 100 units is a classic, dangerous error.",
"icon": "pharm-abbr-u",
"num": 10,
"spot": "dose",
"facts": [
"A handwritten U can be read as 0, 4 or cc.",
"Most dangerous with insulin and heparin, which are dosed in units.",
"Fix: always write the word 'units' in full."
]
},
{
"name": "IU for international units",
"cat": "abbr",
"check": "Write 'international units' in full",
"summary": "IU can be misread as IV or the number 10.",
"life": "Vitamin D doses are written as 'international units'.",
"icon": "pharm-abbr-iu",
"num": 11,
"spot": "dose",
"facts": [
"IU can be misread as IV (intravenous) or the number 10.",
"Fix: write 'international units' in full.",
"Different from 'U': IU is international units, U is units."
]
},
{
"name": "QD and QOD",
"cat": "abbr",
"check": "Write 'daily' or 'every other day'",
"summary": "QD and QOD are easily confused with each other.",
"life": "Writing words removes the risk of a dose given twice as often.",
"icon": "pharm-calendar",
"num": 12,
"spot": "time",
"facts": [
"QD meant daily and QOD meant every other day; the O can be missed or look like a period.",
"QD has also been misread as QID (four times a day).",
"Fix: write 'daily' or 'every other day' in words."
]
},
{
"name": "Trailing zero (5.0 mg)",
"cat": "abbr",
"check": "Write 5 mg, never 5.0 mg",
"summary": "If the decimal point is missed, 5.0 reads as 50.",
"life": "Trailing zeros are banned on prescriptions and labels.",
"icon": "pharm-zero-trailing",
"num": 13,
"spot": "dose",
"facts": [
"A trailing zero is a zero after the decimal point.",
"If the point is missed, 5.0 becomes 50: a tenfold overdose.",
"Fix: write 5 mg. Opposite rule to the leading zero."
]
},
{
"name": "No leading zero (.5 mg)",
"cat": "abbr",
"check": "Write 0.5 mg, never .5 mg",
"summary": "If the decimal point is missed, .5 reads as 5.",
"life": "Always put a zero before a decimal point.",
"icon": "pharm-zero-leading",
"num": 14,
"spot": "dose",
"facts": [
"A leading zero is a zero before the decimal point.",
"Without it, .5 can be read as 5: a tenfold overdose.",
"Fix: write 0.5 mg. Zeros go in front of the point, never after it."
]
},
{
"name": "MS, MSO4 and MgSO4",
"cat": "abbr",
"check": "Write morphine sulfate or magnesium sulfate in full",
"summary": "These abbreviations are easily confused with each other.",
"life": "Mixing up morphine and magnesium can be fatal.",
"icon": "pharm-abbr-ms",
"num": 15,
"spot": "drug",
"facts": [
"MS and MSO4 can mean morphine sulfate; MgSO4 means magnesium sulfate.",
"Morphine is a strong opioid; magnesium sulfate is a mineral given for low magnesium or eclampsia.",
"Fix: write the full drug name every time."
]
}
],
"note": "For learning only. Always follow your own training and local policy.",
"diagram": "medlabel",
"diagramCaption": "On the label",
"notes": {
"intro": "Medication errors are one of the most common causes of preventable harm in healthcare, so nurses use two safety habits every time. First, they check the 'rights' of medication administration before, during and after giving a medicine. Second, they avoid abbreviations and number styles that are easy to misread, because a tiny slip on paper can become a tenfold dose error. The games ask you to match each rule with what it tells you to do, and to tell a 'right' from a banned abbreviation.",
"sections": [
{
"cat": "rights",
"title": "The rights of medication administration",
"about": "The rights are a checklist that walks a medicine from the order to the patient and beyond. The classic five are right patient, drug, dose, route and time. Later lists added right documentation, reason, response and the patient's right to refuse. Some rights are checked before giving (patient, drug, dose, route, time, reason), one is about recording (documentation) and one is checked afterwards (response). Each right has one specific action, and that action is what the quiz asks for.",
"points": [
"Before: patient (two identifiers), drug (label vs order), dose (amount, recalculate), route (way ordered), time (schedule), reason (why).",
"After: documentation (record after giving) and response (watch for effect and side effects).",
"Refusal: respect it, then report to the prescriber and record it.",
"Two identifiers means name plus date of birth or hospital number, never the room or bed number."
],
"tip": "Classic five in order: Patient, Drug, Dose, Route, Time. 'People Do Drive Real Trucks.'"
},
{
"cat": "abbr",
"title": "Do-not-use abbreviations",
"about": "The Joint Commission keeps an official do-not-use list of abbreviations and number styles that have caused real harm. Each one can be misread as a different letter, number or drug. The fix is always the same idea: write the word in full, or write the number so the decimal point cannot be missed. Watch the two zero rules: never add a zero after a decimal point (trailing zero), and always add a zero before it (leading zero).",
"points": [
"U and IU: write 'units' and 'international units' in full.",
"QD and QOD: write 'daily' and 'every other day'.",
"5 mg, not 5.0 mg (no trailing zero); 0.5 mg, not .5 mg (always a leading zero).",
"MS, MSO4, MgSO4: write 'morphine sulfate' or 'magnesium sulfate'."
],
"tip": "Zero rule: a zero goes in front of the point, never behind it."
}
],
"outro": "In 'Right or risky?', anything named 'Right ...' is a right; everything else is a banned abbreviation. For learning only; always follow local policy."
}
});
