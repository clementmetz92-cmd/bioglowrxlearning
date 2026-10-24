/* Odds On — game data. Schema in data/README.md (Calculator Challenge: "problems"; Case Files: "cases").
   Introductory statistics for health sciences (variables, levels of measurement, sampling and study design,
   centre, spread, the normal curve and basic probability), written in our own words following a standard intro-statistics
   syllabus (as in OpenStax Introductory Statistics). Example numbers are realistic but illustrative. */
(function () {
const pick = a => a[Math.floor(Math.random() * a.length)];
const r = (x, dp) => Math.round(x * Math.pow(10, dp) + 1e-9) / Math.pow(10, dp);
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const ints = (lo, hi, n, distinct) => { const out = []; while (out.length < n) { const x = lo + Math.floor(Math.random() * (hi - lo + 1)); if (!distinct || out.indexOf(x) < 0) out.push(x); } return out; };
const asc = a => a.slice().sort((x, y) => x - y);
const list = a => a.join(", ");
const neg = x => (x < 0 ? "−" : "") + Math.abs(r(x, 4));

/* Case Files helpers: the same four choices for every level-of-measurement step, and for every variable-type step */
const LV = ["Nominal", "Ordinal", "Interval", "Ratio"];
const lv = (q, a, why) => ({ q, options: LV, answer: LV.indexOf(a), why });
const VT = ["Qualitative (categorical)", "Quantitative discrete", "Quantitative continuous", "Not a variable: it is the same for everyone"];
const vt = (q, a, why) => ({ q, options: VT, answer: a, why });

BGX.registerGame({
"id": "odds-on",
"title": "Odds On",
"subject": "wellness",
"subjectName": "Health & Wellness",
"chapter": "Stats",
"tagline": "Variables, samples, averages, spread and probability for health science",
"itemNoun": "idea",
"categories": [
  { "id": "vars", "name": "Types of variables", "color": "cat-coral", "icon": "clipboard" },
  { "id": "levels", "name": "Levels of measurement", "color": "cat-amber", "icon": "steps" },
  { "id": "study", "name": "Sampling and study design", "color": "cat-sage", "icon": "search" },
  { "id": "centre", "name": "Measures of centre", "color": "cat-sky", "icon": "scale" },
  { "id": "spread", "name": "Spread and the normal curve", "color": "cat-lilac", "icon": "chart" },
  { "id": "prob", "name": "Probability", "color": "cat-peach", "icon": "question" }
],
"categoryLabel": "Topic",
"hint": "Start with the study notes: what kind of data you have decides which average, spread and graph you can use. Then classify real health data, judge study designs and work out the numbers.",
"tile": { "big": "@icon", "corner": "num", "label": "name" },
"factLine": ["name", "{key}"],
"notesFields": ["key"],
"detail": [
  { "label": "Topic", "field": "{category}" },
  { "label": "Key idea", "field": "{key}" },
  { "label": "Example", "field": "{eg}" }
],
"explore": { "pictures": [] },
"diagram": "stats",
"diagramPerItem": true,
"diagramCaption": "What it looks like",
"modes": [
  { "id": "explore", "format": "explorer", "title": "Explore the ideas", "desc": "Every key idea of the course, with a picture and a health example.", "icon": "◎", "color": "cat-peach" },
  { "id": "idea", "format": "quiz", "title": "Name the idea", "desc": "Read the key idea, pick the statistics term.", "icon": "?", "color": "cat-sky", "prompt": "Which idea is this?", "show": "key", "showAs": "text", "answer": "name", "answerAs": "small" },
  { "id": "example", "format": "quiz", "title": "Spot it in action", "desc": "A sample, a study, an average or a chance: name what is going on.", "icon": "?", "color": "cat-sage", "prompt": "Which idea does this example show?", "show": "eg", "showAs": "text", "answer": "name", "answerAs": "small", "only": ["study", "centre", "spread", "prob"] },
  { "id": "classify", "format": "cases", "title": "Classify the data", "desc": "Real health data sets: nominal, ordinal, interval or ratio? Discrete or continuous? Which variable is which?", "icon": "⌖", "color": "cat-amber", "rounds": 3, "only": ["levels", "vars"] },
  { "id": "sort", "format": "sortit", "title": "Which topic?", "desc": "Variables, levels, sampling, centre, spread or probability?", "icon": "⌖", "color": "cat-lilac", "prompt": "Which topic does this belong to?", "choices": 4 },
  { "id": "myth", "format": "truemyth", "title": "True or myth?", "desc": "Correlation and cause, the gambler's fallacy, medians and more.", "icon": "✓✕", "color": "cat-coral", "prompt": "True or myth?" },
  { "id": "pairs", "format": "matchpairs", "title": "Match Pairs", "desc": "Pair each term with its key idea.", "icon": "⇄", "color": "cat-lemon", "clue": "key", "clueLabel": "Key idea", "pairs": 6 },
  { "id": "clinic", "format": "cases", "title": "Study clinic", "desc": "Pick the sample, the design, the average or the chance for a health study.", "icon": "✚", "color": "cat-mint", "rounds": 3, "only": ["study", "centre", "spread", "prob"] },
  { "id": "lab", "format": "calculator", "title": "Number lab", "desc": "Mean, median, mode, range, IQR, SD, z-scores and probability, with the formula and a helper.", "icon": "÷", "color": "cat-sand", "rounds": 8, "help": true, "formula": true },
  { "id": "challenge", "format": "calculator", "title": "Challenge round", "desc": "10 mixed calculations, no formula, no helper.", "icon": "★", "color": "cat-orchid", "rounds": 10 }
],
"items": [
  /* ---------- types of variables ---------- */
  { "name": "Qualitative (categorical) variable", "cat": "vars", "icon": "well-st-tags", "spot": "qual",
    "key": "Sorts people into named groups", "eg": "Diagnosis: asthma, COPD or flu",
    "summary": "A variable whose values are categories or labels rather than measured amounts.",
    "facts": ["Values are words or codes: blood type, sex, diagnosis, smoker yes/no.", "Arithmetic makes no sense: you count how many fall in each group and give percentages.", "Shown with a bar chart or pie chart; the mode is its only average.", "Numbers used only as labels (a ZIP code, a patient ID number) are still qualitative."],
    "life": "Blood type and ZIP code are both qualitative: a ZIP code is a number used only as a label.",
    "claim": "A ZIP code is a quantitative variable because it is written as a number.", "verdict": false },
  { "name": "Discrete variable", "cat": "vars", "icon": "well-st-tally", "spot": "discrete",
    "key": "Counted: jumps in whole steps", "eg": "Number of ER visits this year",
    "summary": "A quantitative variable that comes from counting, so it can only take separate values such as 0, 1, 2, 3.",
    "facts": ["Quantitative: the numbers are real amounts, so you can average them.", "Counts jump in steps with nothing in between: you can't have 2.5 hospital admissions.", "Examples: number of children, missed doses, asthma attacks, cigarettes a day.", "Shown with a bar chart or dot plot with gaps between the values."],
    "life": "Number of asthma attacks last month: 0, 1, 2… nobody has 1.7 attacks.",
    "claim": "The number of children in a family is a discrete variable.", "verdict": true },
  { "name": "Continuous variable", "cat": "vars", "icon": "well-st-ruler", "spot": "continuous",
    "key": "Measured: any value in a range", "eg": "Fasting blood glucose in mmol/L",
    "summary": "A quantitative variable that comes from measuring, so it can take any value within a range.",
    "facts": ["Only the precision of the instrument limits the decimals: 5.4, 5.43, 5.432…", "Examples: height, weight, blood glucose, temperature, time to recover.", "Shown with a histogram (bars touching) or a box plot.", "Rounding a measurement (age in whole years, weight in whole kg) does not make it discrete."],
    "life": "Weight stays continuous even when the scale rounds to 72 kg: the true value might be 72.38 kg.",
    "claim": "Weight recorded to the nearest kilogram becomes a discrete variable.", "verdict": false },
  { "name": "Independent (explanatory) variable", "cat": "vars", "icon": "well-st-dial", "spot": "iv",
    "key": "The possible cause you set or compare", "eg": "The dose each group is given",
    "summary": "The variable a researcher changes, or uses to explain differences, to see whether it affects an outcome.",
    "facts": ["Also called the explanatory or predictor variable.", "In an experiment the researcher sets it: the dose, the diet, the exercise plan.", "Plotted on the x-axis (horizontal) of a graph.", "Ask: which one comes first, the possible cause? That is the independent variable."],
    "life": "In a trial of 0, 5 or 10 mg of a blood-pressure drug, the dose is the independent variable.",
    "claim": "In a drug trial, the dose the researchers choose is the independent variable.", "verdict": true },
  { "name": "Dependent (response) variable", "cat": "vars", "icon": "well-st-target", "spot": "dv",
    "key": "The outcome you measure", "eg": "Blood pressure measured after 8 weeks",
    "summary": "The outcome a researcher measures to see whether the independent variable had an effect.",
    "facts": ["Also called the response or outcome variable.", "It 'depends on' the independent variable: researchers measure it, they don't set it.", "Plotted on the y-axis (vertical) of a graph.", "Ask: what is measured to see whether the treatment worked?"],
    "life": "In the same trial, the change in systolic blood pressure is the dependent variable.",
    "claim": "The dependent variable is the one the researcher sets at the start of a study.", "verdict": false },

  /* ---------- levels of measurement ---------- */
  { "name": "Nominal level", "cat": "levels", "icon": "well-st-blood-types", "spot": "nominal",
    "key": "Names only: no order", "eg": "Blood type: A, B, AB or O",
    "summary": "The lowest level of measurement: the data are names or labels with no natural order.",
    "facts": ["You can only count and check 'same or different'.", "Order makes no sense: type O is not 'more' than type A.", "Only the mode is a sensible average.", "Examples: blood type, eye colour, diagnosis, hospital ward, yes/no answers."],
    "life": "Ward names or blood types can be counted, but there is no 'average' blood type: use the mode.",
    "claim": "You can work out the mean blood type of a group of patients.", "verdict": false },
  { "name": "Ordinal level", "cat": "levels", "icon": "well-st-podium", "spot": "ordinal",
    "key": "Ordered, but gaps not equal", "eg": "Pain: none, mild, moderate, severe",
    "summary": "Categories that can be put in a meaningful order, but the distances between them are unknown or unequal.",
    "facts": ["The median and mode make sense; the mean is not strictly meaningful.", "Examples: pain rated mild/moderate/severe, cancer stage I–IV, Likert scales (strongly disagree → strongly agree), education level.", "The step from 'mild' to 'moderate' need not equal the step from 'moderate' to 'severe'.", "Ranks (1st, 2nd, 3rd) are ordinal too."],
    "life": "Satisfaction surveys that ask patients to tick 'poor, fair, good or excellent' collect ordinal data.",
    "claim": "Cancer stage I to IV is ordinal data.", "verdict": true },
  { "name": "Interval level", "cat": "levels", "icon": "well-st-thermometer", "spot": "interval",
    "key": "Equal gaps, but no true zero", "eg": "Body temperature in °C or °F",
    "summary": "Numbers with equal, meaningful gaps between them, but where zero is an arbitrary point rather than 'none'.",
    "facts": ["Differences are meaningful: 30 °C to 35 °C is the same gap as 10 °C to 15 °C.", "Zero does not mean 'no temperature': 0 °C is just the freezing point of water.", "So ratios fail: 20 °C is not twice as hot as 10 °C.", "Examples: temperature in °C or °F, calendar years, IQ scores."],
    "life": "40 °C is 3 °C above a normal 37 °C, but it is not twice as hot as 20 °C: 0 °C is not 'no heat'.",
    "claim": "20 °C is twice as hot as 10 °C.", "verdict": false },
  { "name": "Ratio level", "cat": "levels", "icon": "well-st-weights", "spot": "ratio",
    "key": "Equal gaps and a true zero", "eg": "Heart rate in beats per minute",
    "summary": "The highest level: equal gaps plus a true zero that means 'none of it', so ratios make sense.",
    "facts": ["80 kg is twice 40 kg; a heart rate of 120 bpm is double 60 bpm.", "Examples: weight, height, age, blood pressure in mmHg, heart rate, time, counts, temperature in kelvin.", "Every statistic can be used: mean, standard deviation, ratios.", "Kelvin is ratio because 0 K means no heat energy at all; °C and °F are only interval."],
    "life": "A 4 kg baby weighs twice as much as a 2 kg premature baby: weight is ratio data.",
    "claim": "Temperature in kelvin is ratio data because 0 K means no heat at all.", "verdict": true },

  /* ---------- sampling and study design ---------- */
  { "name": "Simple random sample", "cat": "study", "icon": "well-st-lottery", "spot": "srs",
    "key": "Every group equally likely to be picked", "eg": "A computer picks 100 record numbers at random",
    "summary": "Every member of the population, and every possible group of that size, has the same chance of being chosen.",
    "facts": ["Needs a full list of the population (a sampling frame) and a chance method: random numbers or a lottery draw.", "The basic way to avoid bias in who gets chosen.", "Two random samples give slightly different results: this is sampling variability."],
    "life": "A hospital audit picks 100 patient records by computer at random, not whoever is around.",
    "claim": "A random sample means asking whoever happens to be around.", "verdict": false },
  { "name": "Stratified sample", "cat": "study", "icon": "well-st-strata", "spot": "strat",
    "key": "Random picks from every subgroup", "eg": "50 nurses, 30 doctors, 20 therapists, each picked at random",
    "summary": "The population is split into groups that share a feature (strata), then a random sample is taken from every group.",
    "facts": ["Strata: age bands, sex, profession, ward.", "Guarantees each group is represented, often in proportion to its size.", "Stratified = a few from every group. Cluster = everyone from a few groups."],
    "life": "A staff survey randomly picks 50 nurses, 30 doctors and 20 therapists so every profession is heard.",
    "claim": "A stratified sample includes people from every subgroup.", "verdict": true },
  { "name": "Cluster sample", "cat": "study", "icon": "well-st-houses", "spot": "cluster",
    "key": "Pick whole groups at random", "eg": "Every household in 10 randomly chosen villages",
    "summary": "The population is divided into clusters (often places), some clusters are chosen at random, and everyone in them is included.",
    "facts": ["Clusters: clinics, schools, villages, city blocks.", "Cheap and practical when people are spread out.", "Weaker if the chosen clusters differ from the rest.", "Cluster = all of a few groups; stratified = a few from all groups."],
    "life": "A vaccination survey picks 10 villages at random and visits every household in them.",
    "claim": "In cluster sampling you take a few people from every group.", "verdict": false },
  { "name": "Systematic sample", "cat": "study", "icon": "well-st-every-kth", "spot": "system",
    "key": "Every kth person from a list", "eg": "Every 20th prescription after a random start",
    "summary": "Pick a random starting point on a list, then take every kth member after it.",
    "facts": ["k = population size ÷ sample size: 2,000 files and a sample of 100 gives every 20th.", "Quick with an ordered list or a queue of patients.", "Risky if the list has a repeating pattern that lines up with k (e.g. every 7th day is a Sunday)."],
    "life": "Starting at a random number from 1 to 20, a pharmacist audits every 20th prescription.",
    "claim": "Choosing every 20th file after a random start is a systematic sample.", "verdict": true },
  { "name": "Convenience sample", "cat": "study", "icon": "well-st-coffee", "spot": "conv",
    "key": "Whoever is easiest to reach", "eg": "Asking whoever is in the hospital café",
    "summary": "A sample made of people who are easy to reach: volunteers, passers-by, your own patients or an online poll.",
    "facts": ["Fast and cheap, but usually biased.", "The sample may not represent the population, so results can't safely be generalised.", "A bigger convenience sample is still biased: size does not fix who was left out."],
    "life": "A huge online poll on a fitness website still over-represents keen exercisers: size doesn't fix bias.",
    "claim": "A large convenience sample is always representative of the population.", "verdict": false },
  { "name": "Observational study", "cat": "study", "icon": "well-st-binoculars", "spot": "obs",
    "key": "Watches only: shows links, not cause", "eg": "Comparing records of coffee drinkers and non-drinkers",
    "summary": "Researchers observe and measure people without assigning any treatment.",
    "facts": ["Includes surveys, cohort studies and case–control studies.", "Can show an association (correlation) but cannot prove cause and effect.", "A lurking (confounding) variable linked to both things may explain the link.", "Used when an experiment would be unethical or impossible, such as making people smoke."],
    "life": "Coffee drinkers live longer in some studies, but they may also differ in income or diet: correlation does not prove causation.",
    "claim": "If two things are correlated, one must cause the other.", "verdict": false },
  { "name": "Randomised controlled trial", "cat": "study", "icon": "well-st-split", "spot": "rct",
    "key": "Assigns treatments at random", "eg": "Patients randomly given a new inhaler or the usual one",
    "summary": "An experiment: researchers give a treatment to some participants, chosen at random, and compare them with a control group.",
    "facts": ["Random assignment makes the groups alike in every way except the treatment.", "The control group gets no treatment, usual care or a placebo, for comparison.", "Well-run experiments are the only design that can show cause and effect.", "Participants in an experiment are called subjects (or experimental units)."],
    "life": "Patients are randomly assigned a new asthma inhaler or the usual one, and symptoms are compared after 12 weeks.",
    "claim": "A randomised controlled trial can show that a treatment causes an effect.", "verdict": true },
  { "name": "Blinding and placebo", "cat": "study", "icon": "well-st-blindfold", "spot": "blind",
    "key": "Hides who got which treatment", "eg": "Nobody on the ward knows which pills are dummies",
    "summary": "A placebo is a dummy treatment that looks like the real one; blinding keeps people from knowing who received which.",
    "facts": ["Placebo: a sugar pill or saline injection with no active ingredient.", "Single-blind: participants don't know their group. Double-blind: neither participants nor the researchers measuring them know.", "Blinding stops expectations (the placebo effect) and researcher bias from changing the results."],
    "life": "In a double-blind pain trial, the nurses scoring pain don't know which patients had the active drug.",
    "claim": "In a double-blind trial, the researchers measuring outcomes also don't know who had the placebo.", "verdict": true },

  /* ---------- measures of centre ---------- */
  { "name": "Mean", "cat": "centre", "icon": "well-st-seesaw", "spot": "mean",
    "key": "Sum of values ÷ how many", "eg": "(68 + 72 + 76) ÷ 3 = 72 bpm",
    "summary": "The arithmetic average: add all the values and divide by how many there are.",
    "facts": ["Symbols: x̄ (x-bar) for a sample, μ (mu) for a population.", "Uses every value, so one outlier can pull it a long way.", "Best for roughly symmetric quantitative data without outliers.", "It is the balance point of the data."],
    "life": "Stays of 2, 3, 3, 4 and 38 days have a mean of 10 days: one long stay drags it far from a typical stay.",
    "claim": "One extreme value can change the mean a lot.", "verdict": true },
  { "name": "Median", "cat": "centre", "icon": "well-st-middle", "spot": "median",
    "key": "Middle value once data are in order", "eg": "2, 3, 3, 4, 38 days → 3 days",
    "summary": "The middle value when the data are put in order: half the values are below it and half above.",
    "facts": ["Order the data first. Odd number of values: the middle one. Even number: the mean of the middle two.", "Its position in the ordered list is (n + 1) ÷ 2.", "Resistant to outliers, so it is the best average for skewed data such as income or length of stay.", "Also works for ordinal data."],
    "life": "For stays of 2, 3, 3, 4 and 38 days the median is 3 days, nowhere near the middle of the range (20 days).",
    "claim": "The median is always halfway between the smallest and largest values.", "verdict": false },
  { "name": "Mode", "cat": "centre", "icon": "well-st-crown", "spot": "mode",
    "key": "Most frequent value", "eg": "Blood types O, A, O, B, O → O",
    "summary": "The value or category that appears most often.",
    "facts": ["The only average that works for nominal data, such as the most common diagnosis.", "A data set can have no mode, one mode, two modes (bimodal) or more.", "On a histogram it is the tallest bar (the peak)."],
    "life": "A blood bank uses the mode to know which blood type is most often needed.",
    "claim": "A data set can have more than one mode.", "verdict": true },
  { "name": "Skew and outliers", "cat": "centre", "icon": "well-st-tail", "spot": "skew",
    "key": "A long tail drags the mean with it", "eg": "Most stays 2–5 days, a few over 40",
    "summary": "Skewed data have a long tail on one side; outliers are values far from the rest. Both pull the mean towards the tail.",
    "facts": ["Right (positive) skew: tail to the right, usually mean > median > mode. Example: length of stay, hospital bills.", "Left (negative) skew: tail to the left, usually mean < median.", "Symmetric (bell-shaped) data: mean ≈ median ≈ mode.", "With skew or outliers, report the median and IQR rather than the mean and SD."],
    "life": "Hospital bills are right-skewed: a few huge bills pull the mean well above the median.",
    "claim": "In right-skewed data the mean is usually smaller than the median.", "verdict": false },

  /* ---------- spread and the normal curve ---------- */
  { "name": "Range", "cat": "spread", "icon": "well-st-span", "spot": "range",
    "key": "Largest value minus smallest", "eg": "Lowest BP 110, highest 150 → 40 mmHg",
    "summary": "The simplest measure of spread: the maximum minus the minimum.",
    "facts": ["Range = maximum − minimum, given as one number (40), not the two end values.", "Quick to work out, but it uses only the two most extreme values.", "So a single outlier can change it a lot."],
    "life": "Readings from 110 to 150 mmHg give a range of 40 mmHg; one faulty reading of 210 would make it 100.",
    "claim": "The range is resistant to outliers.", "verdict": false },
  { "name": "Interquartile range (IQR)", "cat": "spread", "icon": "well-st-boxplot", "spot": "iqr",
    "key": "Spread of the middle 50%: Q3 − Q1", "eg": "Q1 = 20 min, Q3 = 40 min → 20 min",
    "summary": "The spread of the middle half of the data, from the first quartile (Q1) to the third quartile (Q3).",
    "facts": ["25% of the data lie below Q1 and 75% below Q3; the median is Q2.", "IQR = Q3 − Q1: the length of the box in a box plot.", "Resistant to outliers, so it goes with the median for skewed data.", "Outlier rule: below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR."],
    "life": "If clinic waits have Q1 = 20 min and Q3 = 40 min, the IQR is 20 min and any wait over 70 min counts as an outlier.",
    "claim": "The IQR covers the middle half of the data.", "verdict": true },
  { "name": "Standard deviation and variance", "cat": "spread", "icon": "well-st-sigma", "spot": "sd",
    "key": "Typical distance from the mean", "eg": "√(sum of squared deviations ÷ (n − 1))",
    "summary": "The variance is the average squared distance from the mean; the standard deviation (SD) is its square root, in the data's own units.",
    "facts": ["Sample variance s² = sum of (x − x̄)² ÷ (n − 1); sample SD s = √s². For a population: σ² and σ, dividing by N.", "Bigger SD = more spread out. SD = 0 only when every value is the same; it is never negative.", "Variance is in squared units (mmHg²), so the SD is easier to read.", "Like the mean, it is pulled by outliers: use it for roughly symmetric data."],
    "life": "SD is a distance, so never negative: two clinics average a 30-minute wait, but the one with SD 5 min is far more predictable than SD 20 min.",
    "claim": "A standard deviation can be negative.", "verdict": false },
  { "name": "68–95–99.7 rule", "cat": "spread", "icon": "well-st-bell", "spot": "normal",
    "key": "68% within 1 SD, 95% within 2", "eg": "Heights: 95% between 152 and 188 cm",
    "summary": "For bell-shaped (normal) data, fixed percentages lie within 1, 2 and 3 standard deviations of the mean.",
    "facts": ["About 68% lie within 1 SD of the mean, 95% within 2 SD and 99.7% within 3 SD.", "The curve is symmetric: 34% lie between the mean and +1 SD, and 13.5% between +1 and +2 SD.", "Only about 2.5% lie above +2 SD (and 2.5% below −2 SD); about 16% lie above +1 SD.", "Also called the empirical rule; it only applies to roughly normal data."],
    "life": "Many lab reference ranges are the mean ± 2 SD of healthy people, so about 5% of healthy people fall outside them.",
    "claim": "About 95% of normally distributed values lie within 2 standard deviations of the mean.", "verdict": true },
  { "name": "z-score", "cat": "spread", "icon": "well-st-z", "spot": "z",
    "key": "How many SDs above or below the mean", "eg": "BP 150, mean 120, SD 15 → z = 2",
    "summary": "A z-score says how many standard deviations a value lies from the mean: z = (x − μ) ÷ σ.",
    "facts": ["Positive z: above the mean. Negative z: below. z = 0: exactly the mean.", "Lets you compare values measured on different scales.", "Beyond ±2 is unusual; beyond ±3 is very unusual.", "Example: x = 150, μ = 120, σ = 15 gives z = 30 ÷ 15 = 2."],
    "life": "Bone density scans give a T-score, an SD-based score like a z-score: −2.5 or lower means osteoporosis.",
    "claim": "A negative z-score means the value is below the mean.", "verdict": true },

  /* ---------- probability ---------- */
  { "name": "Probability (0 to 1)", "cat": "prob", "icon": "well-st-dice", "spot": "scale",
    "key": "From 0 (impossible) to 1 (certain)", "eg": "30 side effects in 200 patients → 0.15",
    "summary": "Probability measures how likely an event is, from 0 (impossible) to 1 (certain): favourable outcomes ÷ all equally likely outcomes.",
    "facts": ["Written as a decimal (0.25), a percentage (25%) or a fraction (1/4).", "From data, it is the relative frequency: 30 cases in 200 patients gives 30 ÷ 200 = 0.15.", "Odds are different: odds = chance it happens ÷ chance it doesn't, so P = 0.25 gives odds of 1 to 3.", "A probability can never be negative or bigger than 1."],
    "life": "If 15 in every 100 patients get a headache from a drug, P(headache) = 0.15. Nothing is below 0 or above 1.",
    "claim": "A probability of 1.2 means an event is extra certain.", "verdict": false },
  { "name": "Complement rule", "cat": "prob", "icon": "well-st-complement", "spot": "comp",
    "key": "P(not A) = 1 − P(A)", "eg": "20% get nausea, so 80% don't",
    "summary": "The complement of an event is everything where it does not happen; the two probabilities always add up to 1.",
    "facts": ["Written A′, Aᶜ or 'not A'.", "P(A) + P(not A) = 1, so P(not A) = 1 − P(A).", "Shortcut for 'at least one' questions: P(at least one) = 1 − P(none)."],
    "life": "If 0.3 of patients get a side effect, 1 − 0.3 = 0.7 of them don't.",
    "claim": "If 30% of patients have a side effect, 70% do not.", "verdict": true },
  { "name": "Addition rule (mutually exclusive)", "cat": "prob", "icon": "well-st-two-circles", "spot": "add",
    "key": "Can't happen together: add", "eg": "P(type A or type B) = 0.40 + 0.11",
    "summary": "Mutually exclusive events cannot happen at the same time; for them, P(A or B) = P(A) + P(B).",
    "facts": ["A person has only one blood type, so blood types are mutually exclusive.", "If events can overlap, subtract the overlap: P(A or B) = P(A) + P(B) − P(A and B).", "On a Venn diagram, mutually exclusive circles do not touch."],
    "life": "About 40% of US donors are type A and 11% type B, so 51% are A or B. For overlapping events (smoker or diabetic) subtract the overlap.",
    "claim": "For any two events, P(A or B) = P(A) + P(B).", "verdict": false },
  { "name": "Multiplication rule (independent)", "cat": "prob", "icon": "well-st-coins", "spot": "mult",
    "key": "Don't affect each other: multiply", "eg": "Two tosses both heads: 0.5 × 0.5 = 0.25",
    "summary": "Independent events don't change each other's chances; for them, P(A and B) = P(A) × P(B).",
    "facts": ["Coin tosses, dice rolls and unrelated patients are independent.", "P(A and B) = P(A) × P(B): two unrelated patients each with a 0.2 chance gives 0.2 × 0.2 = 0.04.", "Past results don't change the next one: expecting a result to be 'due' is the gambler's fallacy."],
    "life": "Each toss is independent: after five heads the next toss is still 50:50. Thinking tails is 'due' is the gambler's fallacy.",
    "claim": "After five heads in a row, tails is more likely on the next toss.", "verdict": false }
],

"cases": [
  /* ---------- classify the data: levels of measurement ---------- */
  { "id": "l1", "cat": "levels", "icon": "heart", "spot": "nominal", "title": "Blood pressure clinic",
    "who": "Intake form, hypertension clinic",
    "story": "A nurse fills in the same form for every new patient at a blood pressure clinic. Decide the level of measurement of each item.",
    "data": [["Blood type", "A, B, AB or O"], ["Systolic BP", "e.g. 142 mmHg"], ["Headaches", "none / mild / moderate / severe"]],
    "steps": [
      lv("Blood type (A, B, AB or O) is measured at which level?", "Nominal", "Blood types are names with no order: you can count them but not rank them."),
      lv("Systolic blood pressure in mmHg is measured at which level?", "Ratio", "Equal gaps and a true zero (0 mmHg = no pressure), so 160 mmHg really is twice 80 mmHg."),
      lv("Headaches rated none, mild, moderate or severe are measured at which level?", "Ordinal", "The ratings have an order, but the gap from mild to moderate isn't a fixed, equal amount.")],
    "takeaway": "Labels = nominal, ranked labels = ordinal, measured amounts with a true zero = ratio." },
  { "id": "l2", "cat": "levels", "icon": "well-st-thermometer", "spot": "interval", "title": "The fever ward",
    "who": "Temperature records, children's ward",
    "story": "A children's ward tracks fevers. A research lab later converts the same temperatures into kelvin for a physics model.",
    "data": [["Temperature", "e.g. 38.6 °C"], ["Days with fever", "0, 1, 2, 3…"], ["Lab copy", "e.g. 311.75 K"]],
    "steps": [
      lv("Temperature in °C is measured at which level?", "Interval", "Equal gaps, but 0 °C is not 'no heat', so 40 °C is not twice as hot as 20 °C."),
      lv("Number of days with a fever is measured at which level?", "Ratio", "A count has a true zero (no days) and 4 days is twice 2 days."),
      lv("The same temperatures in kelvin are measured at which level?", "Ratio", "0 K means no heat energy at all: a true zero, so kelvin is ratio.")],
    "takeaway": "Celsius and Fahrenheit are interval; kelvin and counts are ratio." },
  { "id": "l3", "cat": "levels", "icon": "chat", "spot": "ordinal", "title": "Patient satisfaction survey",
    "who": "Discharge questionnaire",
    "story": "Patients leaving hospital fill in a short survey about their stay.",
    "data": [["Ward", "cardiology, oncology, maternity…"], ["'Staff explained my care'", "strongly disagree → strongly agree"], ["Time waited", "minutes"]],
    "steps": [
      lv("The ward the patient stayed on is measured at which level?", "Nominal", "Ward names are labels with no natural order."),
      lv("A Likert answer from 'strongly disagree' to 'strongly agree' is measured at which level?", "Ordinal", "The answers can be ranked, but the steps between them are not equal measured amounts."),
      lv("Time waited in the emergency department, in minutes, is measured at which level?", "Ratio", "Time has a true zero, and 60 minutes is twice 30 minutes.")],
    "takeaway": "Likert scales are the classic ordinal example in health surveys." },
  { "id": "l4", "cat": "levels", "icon": "clipboard", "spot": "ordinal", "title": "Cancer registry",
    "who": "Regional cancer registry",
    "story": "A cancer registry stores a few details about every new diagnosis.",
    "data": [["Stage", "I, II, III or IV"], ["ZIP code", "e.g. 46201"], ["Age at diagnosis", "years"]],
    "steps": [
      lv("Tumour stage I to IV is measured at which level?", "Ordinal", "Stage IV is more advanced than stage II, but it isn't 'twice' stage II: ordered, unequal gaps."),
      lv("The patient's ZIP code is measured at which level?", "Nominal", "A ZIP code is a number used as a label: it has no meaningful order or arithmetic."),
      lv("Age at diagnosis in years is measured at which level?", "Ratio", "Age has a true zero (birth) and 60 years is twice 30 years.")],
    "takeaway": "Numbers used as labels are still nominal; ranked stages are ordinal." },
  { "id": "l5", "cat": "levels", "icon": "baby", "spot": "ratio", "title": "Birth records",
    "who": "Maternity unit database",
    "story": "A maternity unit records details about each baby born.",
    "data": [["Year of birth", "e.g. 2024"], ["Birth weight", "kg"], ["Birth order", "1st, 2nd, 3rd child…"]],
    "steps": [
      lv("Calendar year of birth is measured at which level?", "Interval", "Years have equal gaps, but year 0 is not the start of time, so year 2000 isn't 'twice' year 1000."),
      lv("Birth weight in kilograms is measured at which level?", "Ratio", "Weight has a true zero, and a 4 kg baby weighs twice a 2 kg baby."),
      lv("Birth order (first, second, third child) is measured at which level?", "Ordinal", "A rank: the order matters, but the gaps between children are not a measured amount.")],
    "takeaway": "Calendar years are interval; weight is ratio; ranks are ordinal." },

  /* ---------- classify the data: variables ---------- */
  { "id": "v1", "cat": "vars", "icon": "run", "spot": "iv", "title": "Walking and blood pressure",
    "who": "8-week exercise trial, 60 adults",
    "story": "Researchers randomly assign 60 adults with high blood pressure to walk 0, 15 or 30 minutes a day. After 8 weeks they measure everyone's systolic blood pressure and count how many walks each person actually did.",
    "data": [["Groups", "0, 15 or 30 min a day"], ["Length", "8 weeks for everyone"], ["Measured", "systolic BP, walks completed"]],
    "steps": [
      { "q": "Which is the independent (explanatory) variable?", "options": ["Minutes of walking a day", "Systolic blood pressure after 8 weeks", "The 60 adults", "The 8-week length of the trial"], "answer": 0, "why": "The researchers set the walking time: it is the possible cause being tested." },
      { "q": "Which is the dependent (response) variable?", "options": ["Systolic blood pressure after 8 weeks", "Minutes of walking a day", "The random assignment", "The number of groups"], "answer": 0, "why": "Blood pressure is the outcome measured to see whether walking had an effect." },
      vt("The number of walks each person actually completed is…", 1, "It is a count (0, 1, 2…), so it is quantitative and discrete.")],
    "takeaway": "Set it = independent (x-axis); measure it = dependent (y-axis)." },
  { "id": "v2", "cat": "vars", "icon": "drop", "spot": "continuous", "title": "Diabetes clinic data",
    "who": "Annual review, diabetes clinic",
    "story": "At each annual review the clinic records a fasting blood glucose, whether the patient uses insulin, and how many low-sugar (hypo) episodes they had last month. Every patient in this clinic has type 2 diabetes.",
    "data": [["Fasting glucose", "e.g. 7.4 mmol/L"], ["Uses insulin", "yes / no"], ["Hypos last month", "0, 1, 2…"]],
    "steps": [
      vt("Fasting blood glucose in mmol/L is…", 2, "It is measured and can take any value in a range (7.4, 7.43…): quantitative continuous."),
      vt("Whether the patient uses insulin (yes or no) is…", 0, "Yes/no answers are categories, not amounts: qualitative."),
      vt("The type of diabetes in this clinic is…", 3, "Every patient has type 2, so it doesn't vary: it is a constant here, not a variable.")],
    "takeaway": "Measured = continuous, counted = discrete, categories = qualitative; something that never varies isn't a variable." },
  { "id": "v3", "cat": "vars", "icon": "timer", "spot": "dv", "title": "Caffeine and reaction time",
    "who": "Lab experiment, 45 students",
    "story": "Students are randomly given a drink with 0, 100 or 200 mg of caffeine. Thirty minutes later a computer measures their reaction time in milliseconds. Their number of cups of coffee on a normal day is also recorded.",
    "data": [["Caffeine", "0, 100 or 200 mg"], ["Reaction time", "e.g. 284.6 ms"], ["Usual coffee", "cups a day"]],
    "steps": [
      { "q": "Which is the independent variable?", "options": ["Caffeine dose", "Reaction time", "Number of students", "The 30-minute wait"], "answer": 0, "why": "The caffeine dose is set by the researchers and is the possible cause." },
      { "q": "Which is the dependent variable?", "options": ["Reaction time", "Caffeine dose", "The drink's flavour", "The computer"], "answer": 0, "why": "Reaction time is the outcome they measure." },
      vt("Usual number of cups of coffee a day is…", 1, "Cups are counted in whole numbers, so it is quantitative discrete.")],
    "takeaway": "Times and weights are continuous; numbers of cups, visits or attacks are discrete." },

  /* ---------- study clinic: sampling and design ---------- */
  { "id": "s1", "cat": "study", "icon": "well-st-strata", "spot": "strat", "title": "Staff survey",
    "who": "Hospital with 2,000 staff",
    "story": "A hospital wants 100 staff to answer a survey about a new shift pattern. It has a full staff list, sorted by surname, showing each person's profession.",
    "data": [["Population", "2,000 staff"], ["Sample", "100 staff"], ["Professions", "nurses, doctors, therapists, admin"]],
    "steps": [
      { "q": "They pick a random name among the first 20, then every 20th name after it. Which method is this?", "options": ["Systematic sample", "Stratified sample", "Cluster sample", "Convenience sample"], "answer": 0, "why": "A random start, then every kth person (k = 2,000 ÷ 100 = 20) is systematic sampling." },
      { "q": "Instead they randomly pick staff within each profession, in proportion to its size. Which method is this?", "options": ["Stratified sample", "Cluster sample", "Systematic sample", "Simple random sample"], "answer": 0, "why": "Splitting into groups (strata) and sampling randomly from every group is stratified sampling." },
      { "q": "A manager suggests just asking staff in the canteen at lunchtime. What is the main problem?", "options": ["It is a convenience sample and may miss groups such as night staff", "It is too random", "It needs a full staff list", "It is a cluster sample, so everyone must be asked"], "answer": 0, "why": "People who are easy to reach may differ from the rest (night shift, staff too busy to eat): the sample is likely biased." }],
    "takeaway": "Every kth = systematic; some from every group = stratified; whoever is handy = convenience (biased)." },
  { "id": "s2", "cat": "study", "icon": "well-st-blindfold", "spot": "blind", "title": "Does the new drug work?",
    "who": "Drug company, 400 volunteers",
    "story": "A company wants to know whether its new tablet lowers blood pressure. It has 400 volunteers with high blood pressure.",
    "data": [["Volunteers", "400"], ["Outcome", "systolic BP after 12 weeks"]],
    "steps": [
      { "q": "Which design can show whether the tablet causes a fall in blood pressure?", "options": ["Randomised controlled trial", "Observational study of people already taking it", "Convenience survey of patients", "Asking doctors for their opinion"], "answer": 0, "why": "Only an experiment with random assignment makes the groups alike apart from the treatment, so it can show cause and effect." },
      { "q": "Why does the control group get an identical-looking dummy tablet (placebo)?", "options": ["So both groups expect treatment and only the active drug differs", "To save money on real tablets", "So the control group gets better too", "Because it is the law to give everyone tablets"], "answer": 0, "why": "Expecting to get better can itself lower readings (the placebo effect); a placebo balances that out." },
      { "q": "Neither the volunteers nor the nurses measuring blood pressure know who got the real tablet. This is…", "options": ["A double-blind trial", "A single-blind trial", "An observational study", "A cluster sample"], "answer": 0, "why": "When both participants and the people measuring outcomes are kept unaware, the trial is double-blind." }],
    "takeaway": "Random assignment + control group + placebo + double-blinding = the strongest test of a treatment." },
  { "id": "s3", "cat": "study", "icon": "well-st-binoculars", "spot": "obs", "title": "The coffee headline",
    "who": "News story about a 10-year study",
    "story": "A newspaper says 'Coffee prevents heart attacks!'. The study followed 20,000 adults for 10 years, simply recording how much coffee they chose to drink and whether they had a heart attack.",
    "data": [["Participants", "20,000 adults"], ["Coffee", "chosen by the participants"], ["Finding", "coffee drinkers had fewer heart attacks"]],
    "steps": [
      { "q": "What kind of study is this?", "options": ["Observational study", "Randomised controlled trial", "Double-blind experiment", "Systematic experiment"], "answer": 0, "why": "Nobody was assigned to drink coffee; researchers only recorded what people did." },
      { "q": "What can the study honestly conclude?", "options": ["Coffee drinking is linked with fewer heart attacks, but may not be the cause", "Coffee prevents heart attacks", "Coffee causes heart attacks", "Nothing at all, because the sample was too big"], "answer": 0, "why": "An observational study shows an association (correlation), not cause and effect." },
      { "q": "Which of these could be a lurking (confounding) variable?", "options": ["The coffee drinkers also exercised more", "The study lasted 10 years", "The heart attacks were recorded by doctors", "Coffee is a drink"], "answer": 0, "why": "Something linked to both coffee drinking and heart health, like exercise or income, could explain the link." }],
    "takeaway": "Correlation is not causation: observational studies can't rule out lurking variables." },

  /* ---------- study clinic: centre ---------- */
  { "id": "c1", "cat": "centre", "icon": "well-st-tail", "spot": "skew", "title": "Length of stay",
    "who": "Hospital quality report",
    "story": "Most patients on a surgical ward stay 2 to 5 days, but a few with complications stay more than 40 days. The manager wants one number for a 'typical stay'.",
    "data": [["Most stays", "2–5 days"], ["A few stays", "40+ days"]],
    "steps": [
      { "q": "What shape is this distribution?", "options": ["Skewed right (long tail of high values)", "Skewed left (long tail of low values)", "Symmetric and bell-shaped", "Uniform (all values equally common)"], "answer": 0, "why": "A few very long stays make a long tail on the right (high) side." },
      { "q": "Which average best describes a typical stay?", "options": ["The median", "The mean", "The range", "The standard deviation"], "answer": 0, "why": "The median ignores how extreme the long stays are, so it stays close to a typical stay." },
      { "q": "How will the mean compare with the median?", "options": ["The mean will be larger", "The mean will be smaller", "They will be exactly equal", "The mean can't be calculated"], "answer": 0, "why": "The long stays pull the mean towards the right tail, above the median." }],
    "takeaway": "Skewed data: use the median; the mean is pulled towards the tail." },
  { "id": "c2", "cat": "centre", "icon": "well-st-blood-types", "spot": "mode", "title": "Blood bank report",
    "who": "Regional blood service",
    "story": "A blood service lists the blood type of 1,000 donors and wants to summarise it for a poster.",
    "data": [["O", "450"], ["A", "400"], ["B", "110"], ["AB", "40"]],
    "steps": [
      { "q": "Which average can describe these data?", "options": ["The mode", "The mean", "The median", "The standard deviation"], "answer": 0, "why": "Blood type is nominal: the only sensible 'average' is the most common category, type O." },
      { "q": "Which graph suits these data best?", "options": ["Bar chart (or pie chart)", "Histogram", "Box plot", "Scatter plot"], "answer": 0, "why": "Separate categories go in a bar chart with gaps, or a pie chart; histograms and box plots are for numbers." },
      { "q": "Why can't you find a median blood type?", "options": ["Blood types have no order to line them up in", "There are too many donors", "Type O is too common", "The numbers don't add up to 1,000"], "answer": 0, "why": "A median needs data that can be put in order; nominal labels have no order." }],
    "takeaway": "Nominal data: mode and bar chart, never mean or median." },

  /* ---------- study clinic: spread ---------- */
  { "id": "p1", "cat": "spread", "icon": "well-st-bell", "spot": "normal", "title": "Cholesterol screening",
    "who": "Workplace screening, 5,000 adults",
    "story": "In a large screening programme, total cholesterol is roughly bell-shaped with a mean of 200 mg/dL and a standard deviation of 40 mg/dL (illustrative numbers).",
    "data": [["Mean", "200 mg/dL"], ["SD", "40 mg/dL"], ["Shape", "roughly normal"]],
    "steps": [
      { "q": "About what percentage of adults are between 160 and 240 mg/dL?", "options": ["About 68%", "About 95%", "About 50%", "About 99.7%"], "answer": 0, "why": "160 and 240 are 1 SD either side of the mean: about 68% by the 68–95–99.7 rule." },
      { "q": "What is the z-score of a reading of 280 mg/dL?", "options": ["+2", "+80", "+1", "−2"], "answer": 0, "why": "z = (280 − 200) ÷ 40 = 80 ÷ 40 = 2: two SDs above the mean." },
      { "q": "About what percentage of adults are above 280 mg/dL?", "options": ["About 2.5%", "About 5%", "About 16%", "About 32%"], "answer": 0, "why": "95% are within 2 SD, so 5% are outside, half above and half below: 2.5%." }],
    "takeaway": "Mean ± 1 SD ≈ 68%, ± 2 SD ≈ 95%; above +2 SD ≈ 2.5%." },
  { "id": "p2", "cat": "spread", "icon": "timer", "spot": "iqr", "title": "Two clinics, same average",
    "who": "Health board comparing waits",
    "story": "Clinic A and clinic B both have a mean waiting time of 30 minutes. Clinic A's standard deviation is 5 minutes; clinic B's is 20 minutes.",
    "data": [["Clinic A", "mean 30 min, SD 5"], ["Clinic B", "mean 30 min, SD 20"]],
    "steps": [
      { "q": "Which clinic's waiting times are more predictable?", "options": ["Clinic A: smaller SD, less spread", "Clinic B: bigger SD", "Both the same, because the means are equal", "Impossible to tell"], "answer": 0, "why": "The SD measures typical distance from the mean: a smaller SD means waits cluster close to 30 minutes." },
      { "q": "Clinic B has a few 2-hour waits that skew the data. Which measure of spread should the report use?", "options": ["Interquartile range (IQR)", "Range", "Standard deviation", "Mean"], "answer": 0, "why": "The IQR uses the middle 50% only, so a few extreme waits don't distort it." },
      { "q": "For clinic B, Q1 = 20 min and Q3 = 40 min. Above what wait is a time flagged as an outlier?", "options": ["70 minutes", "60 minutes", "50 minutes", "80 minutes"], "answer": 0, "why": "IQR = 40 − 20 = 20; upper fence = Q3 + 1.5 × IQR = 40 + 30 = 70 minutes." }],
    "takeaway": "Same mean, different spread: SD for symmetric data, IQR when there are outliers." },

  /* ---------- study clinic: probability ---------- */
  { "id": "q1", "cat": "prob", "icon": "well-st-coins", "spot": "mult", "title": "Nausea odds",
    "who": "Pharmacist counselling patients",
    "story": "A new antibiotic causes nausea in 20% of patients (a probability of 0.2). Whether one patient feels sick doesn't affect another.",
    "data": [["P(nausea)", "0.2"], ["Patients", "independent of each other"]],
    "steps": [
      { "q": "What is the probability that a patient does NOT get nausea?", "options": ["0.8", "0.2", "0.4", "1.2"], "answer": 0, "why": "Complement rule: 1 − 0.2 = 0.8." },
      { "q": "Two unrelated patients take it. What is the probability that both get nausea?", "options": ["0.04", "0.4", "0.2", "0.64"], "answer": 0, "why": "Independent events multiply: 0.2 × 0.2 = 0.04." },
      { "q": "The last four patients had no nausea. What is the chance that the fifth patient gets it?", "options": ["Still 0.2", "Higher than 0.2, because it's 'due'", "Lower than 0.2, because of the streak", "Exactly 1"], "answer": 0, "why": "Each patient is independent: past patients don't change the next one. Thinking it is 'due' is the gambler's fallacy." }],
    "takeaway": "Not = 1 − P; independent 'and' = multiply; streaks don't change the next chance." }
],

"problems": [
  /* ---------- centre ---------- */
  { "id": "mean", "cat": "centre", "title": "Find the mean", "spot": "mean", "unit": "", "dp": 1, "formula": "x̄ = sum of values ÷ n",
    "make": () => { const m = pick([{ what: "resting heart rates", u: "bpm", lo: 58, hi: 92 }, { what: "systolic blood pressures", u: "mmHg", lo: 108, hi: 146 }, { what: "BMI values", u: "kg/m²", lo: 19, hi: 34 }, { what: "hours of sleep", u: "hours", lo: 5, hi: 9 }]);
      const n = 5, x = ints(m.lo, m.hi, n), sum = x.reduce((a, b) => a + b, 0);
      return { what: m.what, u: m.u, xs: list(x), plus: x.join(" + "), sum, n, med: asc(x)[2] }; },
    "text": "Five patients have these {what} ({u}): {xs}. What is the mean?",
    "answer": v => v.sum / v.n,
    "steps": ["x̄ = sum of values ÷ n", "= ({plus}) ÷ {n} = {sum} ÷ {n}", "= {answer}"],
    "hint": (v, x) => Math.abs(x - v.med) < 0.05 && v.med !== v.sum / v.n ? "That is the median. For the mean, add all the values, then divide by how many there are." : Math.abs(x - v.sum) < 0.05 ? "That is the total: now divide by the number of values." : "" },
  { "id": "medodd", "cat": "centre", "title": "Median of an odd list", "spot": "median", "unit": "", "dp": 0, "formula": "median = value at position (n + 1) ÷ 2",
    "make": () => { const m = pick([{ what: "days in hospital", lo: 1, hi: 14 }, { what: "minutes waited", lo: 5, hi: 60 }, { what: "fasting glucose readings (mg/dL)", lo: 78, hi: 130 }, { what: "pain-free days last month", lo: 2, hi: 28 }]);
      const x = ints(m.lo, m.hi, 7, true), s = asc(x);
      return { what: m.what, xs: list(x), sorted: list(s), mid: s[3], raw: x[3] }; },
    "text": "Seven patients report these {what}: {xs}. What is the median?",
    "answer": v => v.mid,
    "steps": ["Put the values in order: {sorted}", "n = 7, so the median is at position (7 + 1) ÷ 2 = 4th", "= {answer}"],
    "hint": (v, x) => x === v.raw && v.raw !== v.mid ? "You took the middle of the list as written: put the values in order first." : "" },
  { "id": "medeven", "cat": "centre", "title": "Median of an even list", "spot": "median", "unit": "", "dp": 1, "formula": "median = mean of the two middle values",
    "make": () => { const m = pick([{ what: "systolic blood pressures (mmHg)", lo: 104, hi: 150 }, { what: "resting heart rates (bpm)", lo: 56, hi: 96 }, { what: "ages (years)", lo: 22, hi: 80 }, { what: "cholesterol readings (mg/dL)", lo: 150, hi: 260 }]);
      const x = ints(m.lo, m.hi, 6, true), s = asc(x);
      return { what: m.what, xs: list(x), sorted: list(s), a: s[2], b: s[3] }; },
    "text": "Six patients have these {what}: {xs}. What is the median?",
    "answer": v => (v.a + v.b) / 2,
    "steps": ["Put the values in order: {sorted}", "n = 6 is even, so take the 3rd and 4th values: {a} and {b}", "Median = ({a} + {b}) ÷ 2 = {answer}"],
    "hint": (v, x) => x === v.a || x === v.b ? "With an even number of values there are two middle values: find their mean." : "" },
  { "id": "mode", "cat": "centre", "title": "Find the mode", "spot": "mode", "unit": "", "dp": 0, "formula": "mode = most frequent value",
    "make": () => { const m = pick([{ what: "number of daily medicines", lo: 1, hi: 9 }, { what: "number of GP visits last year", lo: 1, hi: 10 }, { what: "number of fruit and vegetable portions eaten yesterday", lo: 1, hi: 8 }]);
      const all = ints(m.lo, m.hi, 6, true), mo = all[0], others = all.slice(1), x = shuf([mo, mo, mo].concat(others, [others[0]]));
      return { what: m.what, xs: list(x), mo, others: list(asc(others)), two: others[0] }; },
    "text": "Nine patients give their {what}: {xs}. What is the mode?",
    "answer": v => v.mo,
    "steps": ["Count how often each value appears", "{mo} appears 3 times; {two} appears twice; every other value once", "Mode = {answer}"],
    "hint": (v, x) => x === v.two ? "That value appears twice: another value appears three times." : "Look for the value that appears most often, not the middle or the average." },

  /* ---------- spread ---------- */
  { "id": "range", "cat": "spread", "title": "Find the range", "spot": "range", "unit": "", "dp": 0, "formula": "range = maximum − minimum",
    "make": () => { const m = pick([{ what: "systolic blood pressures", u: "mmHg", lo: 102, hi: 168 }, { what: "heart rates", u: "bpm", lo: 52, hi: 110 }, { what: "weights", u: "kg", lo: 48, hi: 115 }, { what: "waiting times", u: "min", lo: 4, hi: 75 }]);
      const x = ints(m.lo, m.hi, 6, true), s = asc(x);
      return { what: m.what, u: m.u, xs: list(x), max: s[5], min: s[0] }; },
    "text": "A nurse records these {what} ({u}): {xs}. What is the range?",
    "answer": v => v.max - v.min,
    "steps": ["Range = maximum − minimum", "= {max} − {min}", "= {answer}"],
    "hint": (v, x) => x === v.max ? "That is the maximum: subtract the minimum from it." : "" },
  { "id": "iqr", "cat": "spread", "title": "Interquartile range", "spot": "iqr", "unit": "", "dp": 0, "formula": "IQR = Q3 − Q1",
    "make": () => { const m = pick([{ what: "waiting times (minutes)", lo: 5, hi: 70 }, { what: "lengths of stay (days)", lo: 1, hi: 30 }, { what: "systolic blood pressures (mmHg)", lo: 100, hi: 170 }]);
      for (let t = 0; t < 200; t++) {
        const s = asc(ints(m.lo, m.hi, 6, true));     // a1 < a2 < a3 < a4 < a5 < a6, then repeat a2 and a5
        const d = [s[0], s[1], s[1], s[2], s[3], s[4], s[4], s[5]];
        if (s[4] - s[1] < 4) continue;
        return { what: m.what, xs: list(shuf(d)), sorted: list(d), lo: list(d.slice(0, 4)), hi: list(d.slice(4)), q1: d[1], q3: d[5], x2: d[1], x3: d[2], x6: d[5], x7: d[6] };
      } },
    "text": "Eight patients have these {what}: {xs}. What is the interquartile range?",
    "answer": v => v.q3 - v.q1,
    "steps": ["Order: {sorted}", "Lower half {lo}: Q1 = ({x2} + {x3}) ÷ 2 = {q1}", "Upper half {hi}: Q3 = ({x6} + {x7}) ÷ 2 = {q3}", "IQR = Q3 − Q1 = {q3} − {q1} = {answer}"],
    "tip": "Split the ordered list into a lower and an upper half; Q1 and Q3 are the medians of those halves.",
    "hint": (v, x) => "Order the values, find the median of each half (Q1 and Q3), then subtract: Q3 − Q1." },
  { "id": "sd", "cat": "spread", "title": "Sample standard deviation", "spot": "sd", "unit": "", "dp": 1, "formula": "s = √( Σ(x − x̄)² ÷ (n − 1) )",
    "make": () => {
      const P = [[[-3, -1, 1, 1, 2], 2], [[-2, -1, -1, 1, 3], 2], [[-3, -1, -1, 0, 5], 3], [[-5, 0, 1, 1, 3], 3], [[-6, -2, 2, 2, 4], 4], [[-5, -2, -1, 3, 5], 4], [[-7, -1, 0, 1, 7], 5], [[-7, -3, 1, 4, 5], 5]];
      const m = pick([{ what: "resting heart rates", u: "bpm", c: [66, 70, 72, 75] }, { what: "systolic blood pressures", u: "mmHg", c: [118, 122, 125, 130] }, { what: "fasting glucose readings", u: "mg/dL", c: [88, 92, 95, 100] }]);
      const [dev, s] = pick(P), mean = pick(m.c), sign = pick([1, -1]), d = dev.map(e => e * sign), x = d.map(e => mean + e), ss = d.reduce((a, e) => a + e * e, 0);
      return { what: m.what, u: m.u, xs: list(shuf(x)), sum: x.reduce((a, b) => a + b, 0), mean, devs: list(asc(d).map(neg)), sq: list(asc(d).map(e => e * e)), ss, v: ss / 4, s, pop: Math.sqrt(ss / 5) }; },
    "text": "Five patients have these {what} ({u}): {xs}. What is the sample standard deviation?",
    "answer": v => v.s,
    "steps": ["Mean x̄ = {sum} ÷ 5 = {mean}", "Deviations x − x̄: {devs}; squared: {sq}", "Sum of squares = {ss}; s² = {ss} ÷ (5 − 1) = {v}", "s = √{v} = {answer}"],
    "hint": (v, x) => Math.abs(x - v.pop) < 0.06 ? "You divided by n: for a sample, divide the sum of squares by n − 1." : Math.abs(x - v.v) < 0.06 ? "That is the variance: take its square root to get the standard deviation." : "" },
  { "id": "z", "cat": "spread", "title": "z-score", "spot": "z", "unit": "", "dp": 1, "signed": true, "formula": "z = (x − μ) ÷ σ",
    "make": () => { const m = pick([{ what: "Systolic blood pressure", u: "mmHg", mu: 120, sd: [10, 12, 15, 20], dp: 0 }, { what: "Total cholesterol", u: "mg/dL", mu: 190, sd: [20, 30, 40], dp: 0 },
        { what: "Birth weight", u: "kg", mu: 3.4, sd: [0.4, 0.5], dp: 1 }, { what: "Adult height", u: "cm", mu: 170, sd: [8, 10], dp: 0 }]);
      const sd = pick(m.sd), z = pick([-2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3]), x = r(m.mu + z * sd, 2);
      return { what: m.what, u: m.u, mu: m.mu, sd, x, diff: neg(r(x - m.mu, 2)), z }; },
    "text": "{what} in a population has mean μ = {mu} {u} and standard deviation σ = {sd} {u}. What is the z-score of a value of {x} {u}?",
    "answer": v => r((v.x - v.mu) / v.sd, 6),
    "steps": ["z = (x − μ) ÷ σ", "= ({x} − {mu}) ÷ {sd} = {diff} ÷ {sd}", "= {answer}"],
    "tip": "Below the mean gives a negative z-score: type the minus sign.",
    "hint": (v, x) => Math.abs(x - (v.x - v.mu)) < 0.06 ? "That is the difference from the mean: divide it by the standard deviation." : "" },
  { "id": "emp", "cat": "spread", "title": "68–95–99.7 rule", "spot": "normal", "unit": "%", "dp": 1, "formula": "68% within 1 SD · 95% within 2 SD · 99.7% within 3 SD",
    "make": () => {
      const m = pick([{ what: "resting heart rate", u: "bpm", mu: 72, sd: 8 }, { what: "systolic blood pressure", u: "mmHg", mu: 120, sd: 12 }, { what: "adult women's height", u: "cm", mu: 163, sd: 7 }, { what: "newborn weight", u: "kg", mu: 3.4, sd: 0.5 }]);
      const B = pick([[-1, 1, 68, "68% lie within 1 SD of the mean"], [-2, 2, 95, "95% lie within 2 SD of the mean"], [-3, 3, 99.7, "99.7% lie within 3 SD of the mean"],
        [1, 9, 16, "68% lie within 1 SD, so 32% lie outside, half of them above: 32 ÷ 2"], [-9, -1, 16, "68% lie within 1 SD, so 32% lie outside, half of them below: 32 ÷ 2"],
        [2, 9, 2.5, "95% lie within 2 SD, so 5% lie outside, half of them above: 5 ÷ 2"], [-9, -2, 2.5, "95% lie within 2 SD, so 5% lie outside, half of them below: 5 ÷ 2"],
        [0, 1, 34, "Half of the 68% band lies on each side of the mean: 68 ÷ 2"], [0, 2, 47.5, "Half of the 95% band lies on each side of the mean: 95 ÷ 2"],
        [-1, 2, 81.5, "Half of 68% (below the mean) plus half of 95% (above it): 34 + 47.5"], [-2, 1, 81.5, "Half of 95% (below the mean) plus half of 68% (above it): 47.5 + 34"],
        [1, 2, 13.5, "Half of 95% minus half of 68%: 47.5 − 34"], [0, 9, 50, "The normal curve is symmetric: half lie above the mean"]]);
      const val = k => r(m.mu + k * m.sd, 2), sdw = k => Math.abs(k) + " SD " + (k < 0 ? "below" : "above") + " the mean";
      let q, s1;
      if (B[1] === 9) { q = B[0] === 0 ? `above ${val(0)} ${m.u}` : `above ${val(B[0])} ${m.u}`; s1 = B[0] === 0 ? `${val(0)} ${m.u} is the mean` : `${val(B[0])} ${m.u} is ${sdw(B[0])}`; }
      else if (B[0] === -9) { q = `below ${val(B[1])} ${m.u}`; s1 = `${val(B[1])} ${m.u} is ${sdw(B[1])}`; }
      else { q = `between ${val(B[0])} and ${val(B[1])} ${m.u}`; s1 = `${val(B[0])} ${m.u} is ${B[0] === 0 ? "the mean" : sdw(B[0])}; ${val(B[1])} ${m.u} is ${sdw(B[1])}`; }
      return { what: m.what, u: m.u, mu: m.mu, sd: m.sd, q, s1, s2: B[3], ans: B[2] }; },
    "text": "In a large group, {what} is roughly normal with mean {mu} {u} and SD {sd} {u}. About what percentage of people are {q}?",
    "answer": v => v.ans,
    "steps": ["Change to SDs: {s1}", "{s2}", "= {answer}"],
    "tip": "Sketch the bell: 34% | 13.5% | 2.35% on each side of the mean, then add up the bands you need." },

  /* ---------- probability ---------- */
  { "id": "prob", "cat": "prob", "title": "Probability from data", "spot": "scale", "unit": "", "dp": 2, "formula": "P(A) = number with A ÷ total",
    "make": () => { const n = pick([20, 40, 50, 80, 100, 200, 250, 400, 500]), k = 1 + Math.floor(Math.random() * Math.floor(n * 0.6)), what = pick(["reported a headache", "had a positive flu test", "missed at least one dose", "had a skin rash", "were current smokers"]);
      return { n, k, what }; },
    "ok": (v, a) => Math.abs(a * 100 - Math.round(a * 100)) < 1e-9,
    "text": "In a study of {n} patients, {k} {what}. What is the probability (as a decimal) that a randomly chosen patient {what}?",
    "answer": v => v.k / v.n,
    "steps": ["P = number with the outcome ÷ total", "= {k} ÷ {n}", "= {answer}"],
    "hint": (v, x) => Math.abs(x - v.n / v.k) < 0.01 ? "You divided the wrong way round: the probability can't be more than 1. It is the number with the outcome ÷ the total." : "" },
  { "id": "comp", "cat": "prob", "title": "Complement", "spot": "comp", "unit": "%", "dp": 0, "formula": "P(not A) = 1 − P(A), or 100% − P(A)",
    "make": () => ({ p: pick([4, 8, 12, 15, 18, 23, 27, 31, 36, 42, 55, 64, 72]), what: pick(["of adults in a survey smoke", "of patients get a sore arm after a vaccine", "of people tested carry the gene", "of babies are born before 37 weeks", "of patients miss their follow-up appointment"]) }),
    "text": "About {p}% {what}. What percentage do NOT?",
    "answer": v => 100 - v.p,
    "steps": ["P(not A) = 100% − P(A)", "= 100% − {p}%", "= {answer}"] },
  { "id": "and", "cat": "prob", "title": "Independent events: and", "spot": "mult", "unit": "", "dp": 3, "formula": "P(A and B) = P(A) × P(B)",
    "make": () => pick([
      { story: "The chance that a booked patient misses an appointment is {pa}. Two unrelated patients are booked. What is the probability that both miss?", pa: pick([0.1, 0.2, 0.3, 0.4]), same: true },
      { story: "About {pa} of adults are left-handed and, independently, about {pb} have blood type O. What is the probability that a random adult is both left-handed and type O?", pa: 0.1, pb: 0.45 },
      { story: "A fair coin is tossed and, separately, a patient is picked from a ward where {pb} of patients are diabetic. What is the probability of heads and a diabetic patient?", pa: 0.5, pb: pick([0.2, 0.3, 0.4, 0.6]) },
      { story: "Each of two unrelated patients has a {pa} chance of a side effect from a vaccine. What is the probability that both get it?", pa: pick([0.05, 0.1, 0.2, 0.3]), same: true }]),
    "derive": v => { const pb = v.same ? v.pa : v.pb; return { pb, story: v.story.replace("{pa}", v.pa).replace("{pb}", pb) }; },
    "ok": (v, a) => Math.abs(a * 1000 - Math.round(a * 1000)) < 1e-6,
    "text": "{story}",
    "answer": v => v.pa * v.pb,
    "steps": ["Independent events: multiply", "P(A and B) = {pa} × {pb}", "= {answer}"],
    "hint": (v, x) => Math.abs(x - (v.pa + v.pb)) < 0.001 ? "You added: for 'and' with independent events, multiply the probabilities." : "" },
  { "id": "or", "cat": "prob", "title": "Mutually exclusive: or", "spot": "add", "unit": "", "dp": 2, "formula": "P(A or B) = P(A) + P(B)",
    "make": () => { const u = pick([2, 3, 4]), h = pick([30, 32, 34, 36, 38, 40]), o = pick([30, 32, 34, 35]), b = 100 - u - h - o;
      const C = [["underweight", u], ["a healthy weight", h], ["overweight", o], ["obese", b]], i = pick([[2, 3], [1, 2], [0, 1], [0, 3], [1, 3]]);
      return { u, h, o, b, an: C[i[0]][0], bn: C[i[1]][0], pa: C[i[0]][1] / 100, pb: C[i[1]][1] / 100 }; },
    "text": "In a clinic's records, {u}% of adults are underweight, {h}% a healthy weight, {o}% overweight and {b}% obese (each adult is in exactly one group). What is the probability (as a decimal) that a random adult is {an} or {bn}?",
    "answer": v => v.pa + v.pb,
    "steps": ["The BMI groups can't overlap: mutually exclusive, so add", "P(A or B) = {pa} + {pb}", "= {answer}"],
    "hint": (v, x) => Math.abs(x - v.pa * v.pb) < 0.006 ? "You multiplied: for 'or' with events that can't happen together, add the probabilities." : Math.abs(x - (v.pa + v.pb) * 100) < 0.6 ? "Give the answer as a decimal between 0 and 1." : "" }
],

"notes": {
  "intro": "Statistics turns health measurements into evidence. First decide what kind of data you have (the type of variable and its level of measurement), because that decides which average, spread and graph make sense. Then ask where the data came from: how the sample was chosen and whether the study was an experiment. Describe the data with a centre (mean, median, mode) and a spread (range, IQR, standard deviation), use the normal curve and z-scores to judge how unusual a value is, and use probability to describe chance, from 0 (impossible) to 1 (certain).",
  "sections": [
    { "cat": "vars", "about": "A variable is a characteristic that changes from person to person. Qualitative (categorical) variables put people into groups: blood type, diagnosis, smoker yes/no. Quantitative variables are numbers you can do arithmetic with: discrete ones are counted (number of visits) and continuous ones are measured (weight, glucose). In a study, the independent (explanatory) variable is the possible cause you set or compare, and the dependent (response) variable is the outcome you measure.",
      "points": ["Counted = discrete; measured = continuous (even if rounded).", "Numbers used as labels (ZIP code, patient ID) are qualitative.", "Independent goes on the x-axis, dependent on the y-axis.", "Something that is the same for everyone in the study is a constant, not a variable."],
      "tip": "Independent = what I change; Dependent = what I Detect." },
    { "cat": "levels", "about": "Data are measured at one of four levels, each adding a property. Nominal: names only (blood type). Ordinal: names in an order, but unequal gaps (pain mild/moderate/severe, cancer stage, Likert scales). Interval: equal gaps but no true zero (temperature in °C or °F, calendar years). Ratio: equal gaps and a true zero, so ratios make sense (weight, height, age, heart rate, blood pressure, time, counts, temperature in kelvin).",
      "points": ["Tie-breaker: does zero mean 'none of it'? Yes → ratio. No → interval.", "0 °C is not 'no heat', so 20 °C is not twice 10 °C: interval. 0 K is no heat at all: ratio.", "Nominal: mode only. Ordinal: median and mode. Interval and ratio: mean, SD and everything else."],
      "tip": "NOIR: Nominal, Ordinal, Interval, Ratio, from lowest to highest." },
    { "cat": "study", "about": "A sample is the part of the population you actually study. Simple random: everyone has the same chance. Stratified: split into groups (strata) and take a random sample from every group. Cluster: randomly pick whole groups (clinics, villages) and include everyone in them. Systematic: random start, then every kth person. Convenience: whoever is easy to reach, which is usually biased. An observational study only watches, so it shows links, not causes. An experiment (randomised controlled trial) assigns treatments at random and compares with a control group; a placebo and double-blinding stop expectations from biasing the results.",
      "points": ["Stratified = some from every group; cluster = all from some groups.", "Correlation does not prove causation: watch for lurking variables.", "Double-blind: neither participants nor the people measuring know who got what."],
      "tip": "Random SAMPLING picks who is studied; random ASSIGNMENT picks who gets the treatment." },
    { "cat": "centre", "about": "The mean (x̄) adds every value and divides by how many; it uses all the data but is pulled by outliers. The median is the middle value of the ordered data (for an even number of values, the mean of the middle two); it resists outliers. The mode is the most common value and the only average for nominal data. In right-skewed data (a long tail of high values, such as length of stay) the mean is pulled above the median.",
      "points": ["Symmetric data: mean ≈ median ≈ mode, so use the mean.", "Skewed data or outliers: use the median.", "Right skew: mean > median. Left skew: mean < median.", "The median is the middle value, not the middle of the range."],
      "tip": "The mean follows the tail." },
    { "cat": "spread", "about": "Spread says how much values vary. Range = maximum − minimum (sensitive to outliers). IQR = Q3 − Q1, the spread of the middle 50%, shown as the box of a box plot; values beyond 1.5 × IQR from the box are outliers. Variance is the average squared distance from the mean (divide by n − 1 for a sample) and the standard deviation is its square root. For bell-shaped data about 68% lie within 1 SD of the mean, 95% within 2 SD and 99.7% within 3 SD. A z-score, (x − μ) ÷ σ, says how many SDs a value is from the mean.",
      "points": ["Median goes with IQR; mean goes with SD.", "SD is never negative; SD = 0 means every value is the same.", "Above +1 SD ≈ 16%; above +2 SD ≈ 2.5%.", "|z| above 2 is unusual; above 3 is very unusual."],
      "tip": "68–95–99.7: one, two, three SDs, like a bigger and bigger net." },
    { "cat": "prob", "about": "A probability runs from 0 (impossible) to 1 (certain) and can be written as a decimal, a percentage or a fraction. From data, P = number with the outcome ÷ total. The complement rule: P(not A) = 1 − P(A). For mutually exclusive events (they can't happen together), P(A or B) = P(A) + P(B). For independent events (one doesn't affect the other), P(A and B) = P(A) × P(B). Odds compare 'happens' with 'doesn't happen', so they are not the same as probability.",
      "points": ["'Or' with no overlap: add. 'And' with independent events: multiply.", "If events can overlap, subtract the overlap: P(A) + P(B) − P(A and B).", "Gambler's fallacy: past independent results don't change the next one."],
      "tip": "OR adds, AND multiplies (when the rules' conditions hold)." }
  ]
}
});
})();
