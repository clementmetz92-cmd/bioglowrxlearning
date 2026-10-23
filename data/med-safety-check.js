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
}
],
"items": [
{
"name": "Right patient",
"cat": "rights",
"check": "Check two identifiers, such as name and date of birth",
"summary": "Confirm the medicine is for the person in front of you.",
"life": "Hospital wristbands exist for this check.",
"icon": "check",
"num": 1
},
{
"name": "Right drug",
"cat": "rights",
"check": "Compare the label with the order",
"summary": "Make sure the medicine is exactly the one prescribed.",
"life": "Look-alike packaging is a common cause of mix-ups.",
"icon": "pill",
"num": 2
},
{
"name": "Right dose",
"cat": "rights",
"check": "Check the amount, and recalculate if unsure",
"summary": "Confirm the amount and strength match the order.",
"life": "A misplaced decimal point can mean a tenfold error.",
"icon": "scale",
"num": 3
},
{
"name": "Right route",
"cat": "rights",
"check": "Give it by the way ordered: mouth, injection, IV…",
"summary": "The same drug can act very differently by another route.",
"life": "A tablet meant to be swallowed should not be crushed into a feeding tube without checking.",
"icon": "steps",
"num": 4
},
{
"name": "Right time",
"cat": "rights",
"check": "Give it at the scheduled time and frequency",
"summary": "Timing keeps drug levels steady and safe.",
"life": "Some antibiotics must be spaced evenly through the day.",
"icon": "timer",
"num": 5
},
{
"name": "Right documentation",
"cat": "rights",
"check": "Record it after giving it, never before",
"summary": "The record tells the next nurse what has been given.",
"life": "Charting before giving risks a missed or double dose.",
"icon": "clipboard",
"num": 6
},
{
"name": "Right reason",
"cat": "rights",
"check": "Know why the patient is getting it",
"summary": "Checking the reason catches orders that do not fit the patient.",
"life": "If a blood pressure tablet is due but the pressure is low, you check first.",
"icon": "question",
"num": 7
},
{
"name": "Right response",
"cat": "rights",
"check": "Watch for the expected effect and side effects",
"summary": "Check that the medicine worked and caused no harm.",
"life": "Re-checking pain score after giving pain relief.",
"icon": "eye",
"num": 8
},
{
"name": "Right to refuse",
"cat": "rights",
"check": "Respect the patient's choice, then report and record it",
"summary": "Patients can say no to a medicine.",
"life": "A refused dose is documented and the prescriber is informed.",
"icon": "chat",
"num": 9
},
{
"name": "U for units",
"cat": "abbr",
"check": "Write 'units' in full",
"summary": "A handwritten U can look like a 0 or a 4.",
"life": "'10U' of insulin misread as 100 units is a classic, dangerous error.",
"icon": "ban",
"num": 10
},
{
"name": "IU for international units",
"cat": "abbr",
"check": "Write 'international units' in full",
"summary": "IU can be misread as IV or the number 10.",
"life": "Vitamin D doses are written as 'international units'.",
"icon": "ban",
"num": 11
},
{
"name": "QD and QOD",
"cat": "abbr",
"check": "Write 'daily' or 'every other day'",
"summary": "QD and QOD are easily confused with each other.",
"life": "Writing words removes the risk of a dose given twice as often.",
"icon": "ban",
"num": 12
},
{
"name": "Trailing zero (5.0 mg)",
"cat": "abbr",
"check": "Write 5 mg, never 5.0 mg",
"summary": "If the decimal point is missed, 5.0 reads as 50.",
"life": "Trailing zeros are banned on prescriptions and labels.",
"icon": "ban",
"num": 13
},
{
"name": "No leading zero (.5 mg)",
"cat": "abbr",
"check": "Write 0.5 mg, never .5 mg",
"summary": "If the decimal point is missed, .5 reads as 5.",
"life": "Always put a zero before a decimal point.",
"icon": "ban",
"num": 14
},
{
"name": "MS, MSO4 and MgSO4",
"cat": "abbr",
"check": "Write morphine sulfate or magnesium sulfate in full",
"summary": "These abbreviations are easily confused with each other.",
"life": "Mixing up morphine and magnesium can be fatal.",
"icon": "ban",
"num": 15
}
],
"note": "For learning only. Always follow your own training and local policy."
});
