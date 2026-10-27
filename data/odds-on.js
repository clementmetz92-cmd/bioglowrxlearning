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
const VT = ["Qualitative (categorical)", "Quantitative discrete", "Quantitative continuous", "A constant (same for everyone)"];
const vt = (q, a, why) => ({ q, options: VT, answer: a, why });

/* Risk and screening helpers: every generator loops until the asked-for answer comes out clean (illustrative numbers) */
const clean = (x, dp) => Math.abs(x * Math.pow(10, dp) - Math.round(x * Math.pow(10, dp))) < 1e-7;
const whole = x => Math.abs(x - Math.round(x)) < 1e-9;
const SCREEN = [
  { test: "rapid strep throat test", dis: "strep throat", n1: [40, 50, 60, 75, 80, 100, 120], n0: [150, 200, 250, 300, 400], se: [0.80, 0.84, 0.85, 0.86, 0.88, 0.90], sp: [0.90, 0.92, 0.94, 0.95, 0.96] },
  { test: "depression screening questionnaire", dis: "depression", n1: [40, 50, 60, 80, 100], n0: [400, 500, 600, 800, 900], se: [0.80, 0.85, 0.88, 0.90], sp: [0.80, 0.85, 0.88, 0.90] },
  { test: "rapid antigen test", dis: "COVID-19", n1: [50, 80, 100, 120, 150, 200], n0: [500, 800, 1000, 1200, 1500, 2000], se: [0.70, 0.75, 0.80, 0.85], sp: [0.97, 0.98, 0.99] },
  { test: "screening mammogram", dis: "breast cancer", n1: [20, 25, 40, 50], n0: [2000, 2500, 4000, 5000], se: [0.80, 0.85, 0.88, 0.90], sp: [0.90, 0.92, 0.94, 0.95] }];
const screen = need => {
  let v = null;
  for (let t = 0; t < 4000; t++) {
    const S = pick(SCREEN), n1 = pick(S.n1), n0 = pick(S.n0), tp = n1 * pick(S.se), tn = n0 * pick(S.sp);
    if (!whole(tp) || !whole(tn)) continue;
    v = { test: S.test, dis: S.dis, n1, n0, n: n1 + n0, tp: Math.round(tp), fn: n1 - Math.round(tp), tn: Math.round(tn), fp: n0 - Math.round(tn) };
    v.pos = v.tp + v.fp; v.neg = v.tn + v.fn;
    v.sens = 100 * v.tp / n1; v.spec = 100 * v.tn / n0; v.ppv = 100 * v.tp / v.pos; v.npv = 100 * v.tn / v.neg;
    if (v.fp > 0 && v.fn > 0 && v.fp !== v.fn && clean(v[need], 1) && ["sens", "spec", "ppv", "npv"].every(k => k === need || Math.abs(v[k] - v[need]) >= 0.5)) return v;
  }
  return v;
};
const COHORT = [
  { exp: "smokers", unexp: "non-smokers", out: "developed COPD", time: "over 20 years", re: [0.10, 0.12, 0.15, 0.18, 0.20, 0.24], ru: [0.02, 0.03, 0.04, 0.05, 0.06] },
  { exp: "adults with obesity", unexp: "adults of a healthy weight", out: "developed type 2 diabetes", time: "over 10 years", re: [0.10, 0.12, 0.15, 0.18, 0.20], ru: [0.03, 0.04, 0.05, 0.06] },
  { exp: "adults who walked at least 30 minutes a day", unexp: "adults who walked less", out: "had a heart attack", time: "over 10 years", re: [0.02, 0.03, 0.04, 0.05], ru: [0.06, 0.08, 0.10] },
  { exp: "vaccinated care-home residents", unexp: "unvaccinated residents", out: "were admitted to hospital with flu", time: "over one winter", re: [0.02, 0.03, 0.04, 0.05], ru: [0.06, 0.08, 0.10, 0.12] }];
const CASECON = [
  { cases: "adults with a hip fracture", controls: "adults of the same age without one", exp: "had taken steroid tablets for a long time", short: "long-term steroid use", nca: [100, 150, 200], nco: [200, 300, 400] },
  { cases: "wedding guests with food poisoning", controls: "guests who stayed well", exp: "ate the chicken salad", short: "eating the chicken salad", nca: [40, 50, 60], nco: [80, 100, 120] },
  { cases: "people with lung cancer", controls: "similar people without lung cancer", exp: "had worked with asbestos", short: "asbestos exposure", nca: [200, 250, 300], nco: [300, 400, 500] }];
const TRIAL = [
  { drug: "a statin", out: "a heart attack or stroke", time: "over 5 years", cer: [6, 8, 10, 12], eer: [4, 5, 6, 8, 9] },
  { drug: "a blood-thinning drug", out: "a stroke", time: "over 2 years", cer: [4, 5, 6, 8], eer: [2, 3, 4] },
  { drug: "an antibiotic before surgery", out: "a wound infection", time: "within 30 days", cer: [8, 10, 12, 15], eer: [3, 4, 5, 6] },
  { drug: "a new asthma inhaler", out: "an attack needing hospital care", time: "over a year", cer: [10, 12, 15, 20], eer: [5, 6, 8, 10] }];
const trial = (test) => {
  let v = null;
  for (let t = 0; t < 4000; t++) {
    const T = pick(TRIAL), cerp = pick(T.cer), eerp = pick(T.eer), nc = pick([200, 250, 400, 500, 800, 1000]), nt = pick([200, 250, 400, 500, 800, 1000]);
    if (eerp >= cerp || !whole(nc * cerp / 100) || !whole(nt * eerp / 100)) continue;
    v = { drug: T.drug, out: T.out, time: T.time, cerp, eerp, nc, nt, ec: nc * cerp / 100, et: nt * eerp / 100, arrp: cerp - eerp };
    v.arr = r(v.arrp / 100, 4); v.rrr = 100 * v.arrp / cerp;
    if (test(v)) return v;
  }
  return v;
};

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
  { "id": "prob", "name": "Probability", "color": "cat-peach", "icon": "question" },
  { "id": "test", "name": "Testing ideas", "color": "cat-mint", "icon": "lab" },
  { "id": "risk", "name": "Risk and screening", "color": "cat-orchid", "icon": "shield" }
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
  { "id": "sort", "format": "sortit", "title": "Which topic?", "desc": "Variables, levels, sampling, centre, spread, probability, testing ideas or risk?", "icon": "⌖", "color": "cat-lilac", "prompt": "Which topic does this belong to?", "choices": 4 },
  { "id": "myth", "format": "truemyth", "title": "True or myth?", "desc": "Correlation and cause, the gambler's fallacy, medians and more.", "icon": "✓✕", "color": "cat-coral", "prompt": "True or myth?" },
  { "id": "pairs", "format": "matchpairs", "title": "Match Pairs", "desc": "Pair each term with its key idea.", "icon": "⇄", "color": "cat-lemon", "clue": "key", "clueLabel": "Key idea", "pairs": 6 },
  { "id": "clinic", "format": "cases", "title": "Study clinic", "desc": "Pick the sample, the design, the average or the chance for a health study.", "icon": "✚", "color": "cat-mint", "rounds": 3, "only": ["study", "centre", "spread", "prob"] },
  { "id": "lab", "format": "calculator", "title": "Number lab", "desc": "Mean, median, mode, range, IQR, SD, z-scores and probability, with the formula and a helper.", "icon": "÷", "color": "cat-sand", "rounds": 8, "help": true, "formula": true, "only": ["centre", "spread", "prob"] },
  { "id": "challenge", "format": "calculator", "title": "Challenge round", "desc": "10 mixed calculations, no formula, no helper.", "icon": "★", "color": "cat-orchid", "rounds": 10, "only": ["centre", "spread", "prob"] },
  { "id": "evidence", "format": "cases", "title": "Reading the evidence", "desc": "A trial's p-value and confidence interval, a screening test, a cohort study and a risky headline.", "icon": "✚", "color": "cat-mint", "rounds": 3, "only": ["test", "risk"], "extra": true },
  { "id": "risklab", "format": "calculator", "title": "Risk and screening lab", "desc": "Sensitivity, specificity, PPV, NPV, relative risk, odds ratio, ARR, RRR and NNT, with the formula and a helper.", "icon": "÷", "color": "cat-orchid", "rounds": 8, "help": true, "formula": true, "only": ["risk"], "extra": true }
],
"items": [
  /* ---------- types of variables ---------- */
  { "name": "Qualitative (categorical) variable", "cat": "vars", "icon": "well-st-tags", "spot": "qual",
    "key": "Sorts people into named groups", "eg": "Diagnosis: asthma, COPD or flu",
    "summary": "A variable whose values are categories or labels rather than measured amounts.",
    "facts": ["Values are words or codes: blood type, sex, diagnosis, smoker yes/no.", "Arithmetic makes no sense: you count how many fall in each group and give percentages.", "Shown with a bar chart or pie chart; the mode is the only average for unordered categories (ordered ones, like pain ratings, also have a median).", "Numbers used only as labels (a ZIP code, a patient ID number) are still qualitative."],
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
    "facts": ["Differences are meaningful: 30 °C to 35 °C is the same gap as 10 °C to 15 °C.", "Zero does not mean 'no temperature': 0 °C is just the freezing point of water.", "So ratios fail: 20 °C is not twice as hot as 10 °C.", "Examples: temperature in °C or °F, calendar years (IQ scores are usually treated as interval too)."],
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
    "key": "Everyone equally likely to be picked", "eg": "A computer picks 100 record numbers at random",
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
    "facts": ["Random assignment makes the groups alike, on average, in every way except the treatment.", "The control group gets no treatment, usual care or a placebo, for comparison.", "Well-run experiments are the only design that can show cause and effect.", "Participants in an experiment are called subjects (or experimental units)."],
    "life": "Patients are randomly assigned a new asthma inhaler or the usual one, and symptoms are compared after 12 weeks.",
    "claim": "A randomised controlled trial can show that a treatment causes an effect.", "verdict": true },
  { "name": "Blinding and placebo", "cat": "study", "icon": "well-st-blindfold", "spot": "blind",
    "key": "Hides who got which treatment", "eg": "Nobody on the ward knows which pills are dummies",
    "summary": "A placebo is a dummy treatment that looks like the real one; blinding keeps people from knowing who received which.",
    "facts": ["Placebo: a sugar pill or saline injection with no active ingredient.", "Single-blind: participants don't know their group. Double-blind: neither participants nor the researchers measuring them know.", "Blinding keeps expectations (the placebo effect) and researcher bias from creating a false difference between the groups."],
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
    "key": "Middle value once data are in order", "eg": "2, 3, 4, 6, 38 days → 4 days",
    "summary": "The middle value when the data are put in order: half the values are below it and half above.",
    "facts": ["Order the data first. Odd number of values: the middle one. Even number: the mean of the middle two.", "Its position in the ordered list is (n + 1) ÷ 2.", "Resistant to outliers, so it is the best average for skewed data such as income or length of stay.", "Also works for ordinal data."],
    "life": "For stays of 2, 3, 4, 6 and 38 days the median is 4 days, nowhere near the middle of the range (20 days).",
    "claim": "The median is always halfway between the smallest and largest values.", "verdict": false },
  { "name": "Mode", "cat": "centre", "icon": "well-st-crown", "spot": "mode",
    "key": "Most frequent value", "eg": "Blood types O, A, O, B, O → O",
    "summary": "The value or category that appears most often.",
    "facts": ["The only average that works for nominal data, such as the most common diagnosis.", "A data set can have no mode, one mode, two modes (bimodal) or more.", "On a histogram the tallest bar (the peak) is the modal class."],
    "life": "A blood bank uses the mode to know which blood type is most often needed.",
    "claim": "A data set can have more than one mode.", "verdict": true },
  { "name": "Skew: mean vs median", "cat": "centre", "icon": "well-st-tail", "spot": "skew",
    "key": "A long tail drags the mean with it", "eg": "Most stays 2–5 days, a few over 40",
    "summary": "Skewed data have a long tail on one side. The tail pulls the mean towards it, away from the median.",
    "facts": ["Right (positive) skew: tail to the right, usually mean > median > mode. Example: length of stay, hospital bills.", "Left (negative) skew: tail to the left, usually mean < median.", "Symmetric (bell-shaped) data: mean ≈ median ≈ mode.", "With skewed data, report the median and IQR rather than the mean and SD."],
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
    "facts": ["About 25% of the data lie below Q1 and 75% below Q3; the median is Q2.", "IQR = Q3 − Q1: the length of the box in a box plot.", "Resistant to outliers, so it goes with the median for skewed data.", "Outlier rule: values below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR are potential outliers."],
    "life": "If clinic waits have Q1 = 20 min and Q3 = 40 min, the IQR is 20 min and any wait over 70 min is flagged as a potential outlier.",
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
    "claim": "After five heads in a row, tails is more likely on the next toss.", "verdict": false },

  /* ---------- testing ideas (hypothesis tests, p-values, errors, confidence intervals, correlation) ---------- */
  { "name": "Null and alternative hypotheses", "cat": "test", "icon": "pharm-signpost",
    "key": "'No effect' claim vs the effect you look for", "eg": "H₀: the drug doesn't change BP; H₁: it does",
    "summary": "A hypothesis test starts with two competing claims about the population. The null hypothesis (H₀) says there is no effect or no difference; the alternative hypothesis (H₁ or Hₐ) says there is one.",
    "facts": ["H₀ is the 'nothing is going on' claim: no difference between the groups, no link between the variables.", "H₁ is what the researchers suspect: the groups differ, or the treatment has an effect.", "The test asks whether the data give enough evidence to reject H₀.", "If they don't, we 'fail to reject' H₀. That is not proof that H₀ is true: the study may just be too small."],
    "life": "A painkiller trial sets H₀: pain scores are the same on the drug and on placebo. H₁: the pain scores differ.",
    "claim": "Failing to reject the null hypothesis proves that there is no effect.", "verdict": false },
  { "name": "p-value", "cat": "test", "icon": "chem-percent",
    "key": "Chance of a result at least this extreme if H₀ were true", "eg": "A 5 mmHg difference in BP with p = 0.02",
    "summary": "The p-value is the probability of getting a result at least as extreme as the one observed, assuming the null hypothesis is true.",
    "facts": ["A small p-value means data like these would be unusual if there were no effect, so it counts as evidence against H₀.", "It is NOT the probability that H₀ is true, and 1 − p is not the chance that the treatment works.", "It says nothing about how big or how important the effect is.", "Very large studies can give tiny p-values for tiny effects."],
    "life": "p = 0.02 means: if the drug truly did nothing, a difference this big or bigger would turn up in only about 2% of similar trials.",
    "claim": "A p-value of 0.03 means there is a 3% chance that the null hypothesis is true.", "verdict": false },
  { "name": "Significance level (α = 0.05)", "cat": "test", "icon": "pharm-barrier",
    "key": "The cut-off: reject H₀ if p falls below it", "eg": "p = 0.01 is below 0.05, so the result is significant",
    "summary": "The significance level, alpha (α), is chosen before the study. If the p-value is below α, the result is called statistically significant and H₀ is rejected.",
    "facts": ["0.05 is a convention, not a law of nature: some studies use 0.01 or stricter.", "α is also the type I error rate the researchers accept: the chance of rejecting H₀ when it is really true.", "p = 0.049 and p = 0.051 carry almost the same evidence, so treat the cut-off as a guide, not a cliff edge.", "At α = 0.05, p < 0.05 goes with a 95% confidence interval that leaves out the 'no effect' value."],
    "life": "A study reporting p = 0.04 is significant at the 0.05 level, but would not be at the stricter 0.01 level.",
    "claim": "A result with p = 0.04 is statistically significant at the 0.05 level.", "verdict": true },
  { "name": "Type I error", "cat": "test", "icon": "pharm-alarm",
    "key": "Rejecting a true H₀: a false alarm", "eg": "Concluding that a useless drug works",
    "summary": "A type I error happens when the null hypothesis is really true but the test rejects it: you 'find' an effect that isn't there.",
    "facts": ["When H₀ is true, the chance of a type I error is α, usually 0.05.", "It is a false positive in research, like a smoke alarm going off with no fire.", "Running many tests raises the chance that at least one gives a false alarm.", "Lowering α (say to 0.01) makes type I errors rarer but type II errors more likely."],
    "life": "Test 20 useless supplements at α = 0.05 and, on average, one of them will look 'significant' just by luck.",
    "claim": "A type I error means concluding there is an effect when there really is none.", "verdict": true },
  { "name": "Type II error and power", "cat": "test", "icon": "nutr-eye-closed",
    "key": "Missing a real effect: a false negative", "eg": "A small trial misses a drug that really works",
    "summary": "A type II error happens when there really is an effect but the test fails to reject the null hypothesis. Power is the chance of avoiding this.",
    "facts": ["The chance of a type II error is called beta (β).", "Power = 1 − β: the chance of detecting a real effect of a given size.", "Small samples, noisy measurements and small effects all raise the risk of a type II error.", "Trials plan their sample size to reach a power of about 80% or 90%."],
    "life": "A trial of 30 patients may 'find no effect' of a drug that helps, simply because it was too small to detect it.",
    "claim": "A bigger sample makes a type II error less likely.", "verdict": true },
  { "name": "Confidence interval (CI)", "cat": "test", "icon": "pharm-range",
    "key": "A range of plausible values for the true effect", "eg": "Mean fall 8 mmHg, 95% CI 5 to 11 mmHg",
    "summary": "A confidence interval is a range of plausible values for the true population value, worked out from the sample. A 95% CI comes from a method that captures the true value in about 95% of samples.",
    "facts": ["A narrow CI means a precise estimate; bigger samples give narrower intervals.", "For a difference, the 'no effect' value is 0. For a ratio (RR or OR) it is 1. A 95% CI that includes it means not significant at 0.05.", "It is not the range that holds 95% of the patients' values.", "It shows the size of the effect as well as the uncertainty, so it tells you more than a p-value."],
    "life": "A drug lowers BP by 8 mmHg on average (95% CI 5 to 11): the true average fall is plausibly anywhere from 5 to 11 mmHg.",
    "claim": "A 95% confidence interval contains 95% of the individual patients' values.", "verdict": false },
  { "name": "Statistical vs clinical significance", "cat": "test", "icon": "chem-balance",
    "key": "A real effect, but is it big enough to matter?", "eg": "BP 1 mmHg lower, p < 0.001, in 50,000 people",
    "summary": "Statistical significance says an effect is unlikely to be zero. Clinical significance asks whether it is big enough to make a real difference to patients.",
    "facts": ["Huge studies can make tiny, unimportant effects statistically significant.", "Small studies can miss effects that would matter (a type II error).", "Judge clinical importance from the size of the effect and its CI, along with side effects, cost and what patients value.", "Researchers often name a minimal clinically important difference before the study starts."],
    "life": "A diet that lowers weight by 0.3 kg on average could be 'significant' in a huge trial yet make no real difference to patients.",
    "claim": "A statistically significant result is always clinically important.", "verdict": false },
  { "name": "Correlation coefficient (r)", "cat": "test", "icon": "nutr-trend-down",
    "key": "Strength and direction of a straight-line link: −1 to +1", "eg": "r = −0.6 for weekly exercise and resting heart rate",
    "summary": "Pearson's correlation coefficient, r, measures how closely two quantitative variables follow a straight line, from −1 to +1.",
    "facts": ["r near +1: a strong positive link (both rise together). Near −1: a strong negative link. Near 0: no straight-line link.", "The sign gives the direction; the size (ignoring the sign) gives the strength, so r = −0.9 is stronger than r = +0.3.", "It only measures straight-line links: a curved pattern can have r near 0.", "Even a strong r does not show that one variable causes the other: a lurking variable may drive both."],
    "life": "Exercise and resting heart rate might have r = −0.6: more exercise goes with a lower heart rate, but r alone can't prove that one causes the other.",
    "claim": "An r of −0.9 shows a weaker link than an r of +0.3.", "verdict": false },

  /* ---------- risk and screening ---------- */
  { "name": "Relative risk (RR)", "cat": "risk", "icon": "chem-ratio", "spot": "obs",
    "key": "Risk in the exposed ÷ risk in the unexposed", "eg": "COPD in 12% of smokers vs 3% of non-smokers: RR = 4",
    "summary": "Relative risk compares the risk of an outcome in an exposed group with the risk in an unexposed group. Risk = number with the outcome ÷ number in the group.",
    "facts": ["RR = 1: no difference. RR > 1: higher risk in the exposed group. RR < 1: lower risk (a protective factor).", "Used in cohort studies and trials, which follow groups forward and count new cases.", "An RR of 0.75 means 25% lower risk; an RR of 2 means double the risk.", "RR says nothing about how common the outcome is: RR = 2 can mean 2 in a million vs 1 in a million."],
    "life": "If 12% of smokers and 3% of non-smokers in a cohort develop COPD, the smokers have 4 times the risk: RR = 0.12 ÷ 0.03 = 4.",
    "claim": "A relative risk of 1 means the exposure doubles the risk.", "verdict": false },
  { "name": "Odds ratio (OR)", "cat": "risk", "icon": "pharm-columns", "spot": "obs",
    "key": "Odds in one group ÷ odds in the other", "eg": "Hip fracture cases vs controls: who took steroids?",
    "summary": "The odds ratio compares the odds of an outcome (or of an exposure) in one group with the odds in another. Odds = number with it ÷ number without it.",
    "facts": ["From a 2×2 table with cells a, b (cases exposed, unexposed) and c, d (controls exposed, unexposed): OR = (a × d) ÷ (b × c).", "OR = 1: no link. OR > 1: exposure linked with higher odds. OR < 1: linked with lower odds.", "The usual measure in case–control studies, where the researchers pick how many cases and controls, so the true risk can't be worked out.", "When the outcome is rare (under about 10%), the OR is close to the RR."],
    "life": "A case–control study compares people with and without a hip fracture and reports an odds ratio for long-term steroid use, not a risk.",
    "claim": "When an outcome is rare, the odds ratio is close to the relative risk.", "verdict": true },
  { "name": "Absolute vs relative risk reduction", "cat": "risk", "icon": "pharm-ad-box", "spot": "rct",
    "key": "ARR = risk difference; RRR = that difference ÷ control risk", "eg": "Risk 2% → 1%: ARR 1 point, RRR 50%",
    "summary": "The absolute risk reduction (ARR) is how much a treatment lowers the risk, in percentage points. The relative risk reduction (RRR) gives that drop as a share of the risk without treatment.",
    "facts": ["ARR = control risk − treatment risk (often written CER − EER).", "RRR = ARR ÷ control risk, which is the same as 1 − RR.", "The same RRR can mean a big or a tiny ARR, depending on how high the risk was to start with.", "Headlines like the RRR because it sounds bigger: always ask for the absolute risks."],
    "life": "'Halves your risk!' may mean 2 in 100 down to 1 in 100: an RRR of 50% but an ARR of just 1 percentage point.",
    "claim": "A 50% relative risk reduction always means a large benefit for each patient.", "verdict": false },
  { "name": "Number needed to treat (NNT)", "cat": "risk", "icon": "pharm-people", "spot": "rct",
    "key": "Patients treated for one extra to benefit: 1 ÷ ARR", "eg": "ARR 0.05 (5 points) → NNT = 20",
    "summary": "The NNT is how many patients need the treatment, for the length of time studied, for one extra patient to avoid the bad outcome compared with control.",
    "facts": ["NNT = 1 ÷ ARR, with the ARR as a decimal (5% = 0.05), or 100 ÷ ARR when the ARR is in percentage points.", "If it isn't a whole number, round up to the next whole patient.", "Smaller NNT = more effective treatment. An NNT of 1 would mean every treated patient benefits.", "Always give the time period: 'NNT 50 over 5 years'. The same idea for harms is the number needed to harm (NNH)."],
    "life": "If a statin lowers 5-year heart attack risk from 4% to 2%, the ARR is 0.02, so the NNT is 1 ÷ 0.02 = 50 people for 5 years.",
    "claim": "A smaller number needed to treat means a more effective treatment.", "verdict": true },
  { "name": "Sensitivity", "cat": "risk", "icon": "chem-scanner", "spot": "scale",
    "key": "Share of people with the disease who test positive", "eg": "90 of the 100 people who have it test positive: 90%",
    "summary": "Sensitivity is the true positive rate: of everyone who really has the condition, the proportion the test correctly picks up.",
    "facts": ["Sensitivity = TP ÷ (TP + FN): true positives ÷ everyone with the disease.", "A highly sensitive test rarely misses the disease, so it gives few false negatives.", "So a negative result on a very sensitive test helps rule the disease out (SnNout).", "It describes the test itself: it doesn't depend on how common the disease is."],
    "life": "Screening tests aim for high sensitivity so that few people with the disease are missed.",
    "claim": "A test with high sensitivity rarely misses people who have the disease.", "verdict": true },
  { "name": "Specificity", "cat": "risk", "icon": "shield", "spot": "scale",
    "key": "Share of people without the disease who test negative", "eg": "950 of 1,000 people without it test negative: 95%",
    "summary": "Specificity is the true negative rate: of everyone who does not have the condition, the proportion the test correctly clears.",
    "facts": ["Specificity = TN ÷ (TN + FP): true negatives ÷ everyone without the disease.", "A highly specific test gives few false positives.", "So a positive result on a very specific test helps rule the disease in (SpPin).", "1 − specificity is the false positive rate: 95% specificity means 5% of healthy people test positive."],
    "life": "A follow-up test after a positive screen needs high specificity so that healthy people are not wrongly diagnosed.",
    "claim": "Specificity is the share of people with the disease who test positive.", "verdict": false },
  { "name": "Positive predictive value (PPV)", "cat": "risk", "icon": "check", "spot": "scale",
    "key": "Chance that a positive result is a true positive", "eg": "90 true positives out of 585 positives: PPV ≈ 15%",
    "summary": "The PPV answers the patient's question after a positive test: how likely is it that I really have the condition?",
    "facts": ["PPV = TP ÷ (TP + FP): true positives ÷ everyone who tested positive.", "It depends on prevalence: the rarer the condition, the lower the PPV, even with a good test.", "That is why screening a low-risk group produces many false alarms.", "Read it across the 'test positive' row of the 2×2 table, not down the 'has the disease' column."],
    "life": "When 1 in 100 people has a condition, a test with 90% sensitivity and 95% specificity has a PPV of only about 15%.",
    "claim": "The positive predictive value of a test stays the same whether a disease is rare or common.", "verdict": false },
  { "name": "Negative predictive value (NPV)", "cat": "risk", "icon": "pharm-seal", "spot": "scale",
    "key": "Chance that a negative result is a true negative", "eg": "9,405 true negatives out of 9,415 negatives: NPV ≈ 99.9%",
    "summary": "The NPV answers the question after a negative test: how likely is it that I really am free of the condition?",
    "facts": ["NPV = TN ÷ (TN + FN): true negatives ÷ everyone who tested negative.", "It also depends on prevalence: NPV is high when the condition is rare and falls as it becomes more common.", "A high NPV makes a negative result reassuring.", "PPV and NPV describe results in a particular population; sensitivity and specificity describe the test."],
    "life": "In a low-risk group, a negative result from a sensitive test is very reassuring: the NPV is close to 100%.",
    "claim": "When a disease becomes more common, the NPV of a test tends to fall.", "verdict": true },
  { "name": "Incidence", "cat": "risk", "icon": "pharm-calendar", "spot": "scale",
    "key": "New cases over a set time ÷ people at risk", "eg": "8 new cases of diabetes per 1,000 adults in a year",
    "summary": "Incidence measures how often new cases of a condition appear in a population at risk over a stated length of time.",
    "facts": ["Incidence (risk) = new cases during the period ÷ people at risk at the start.", "It always needs a time period: 'per year', 'over 5 years'.", "People who already have the condition are not at risk of getting it, so they are left out.", "Used to study causes and to track outbreaks: is the disease spreading?"],
    "life": "During a flu outbreak, public health teams watch the incidence (new cases each week) to see whether it is spreading.",
    "claim": "Incidence counts everyone who has a condition at a given moment.", "verdict": false },
  { "name": "Prevalence", "cat": "risk", "icon": "pharm-pie", "spot": "scale",
    "key": "All current cases ÷ whole population at one time", "eg": "About 1 in 10 adults living with diabetes today",
    "summary": "Prevalence is the proportion of a population who have a condition at a particular time, whether their case is new or long-standing.",
    "facts": ["Point prevalence = people with the condition now ÷ everyone in the population now.", "Long-lasting conditions build up: when things are steady and the condition is fairly rare, prevalence ≈ incidence × average duration.", "A treatment that keeps people alive longer without curing them raises prevalence, even if incidence stays the same.", "Used to plan services, and it drives a test's PPV and NPV."],
    "life": "Diabetes has a high prevalence partly because people live with it for decades, so cases build up over time.",
    "claim": "A treatment that keeps people alive longer, without curing them, can raise prevalence.", "verdict": true }
],

"cases": [
  /* ---------- classify the data: levels of measurement ---------- */
  { "id": "l1", "cat": "levels", "icon": "heart", "spot": "nominal", "title": "Blood pressure clinic",
    "who": "Intake form, hypertension clinic",
    "story": "A nurse fills in the same form for every new patient at a blood pressure clinic. Decide the level of measurement of each item.",
    "data": [["Blood type", "A, B, AB or O"], ["Systolic BP", "e.g. 142 mmHg"], ["Headaches", "none / mild / moderate / severe"]],
    "steps": [
      lv("Blood type (A, B, AB or O) is measured at which level?", "Nominal", "Blood types are names with no order: you can count them but not rank them."),
      lv("Systolic blood pressure in mmHg is measured at which level?", "Ratio", "Equal gaps and a true zero (0 mmHg = no pressure above the surrounding air), so 160 mmHg really is twice 80 mmHg."),
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
      lv("Calendar year of birth is measured at which level?", "Interval", "Years have equal gaps, but the calendar's starting point is arbitrary, not the start of time, so year 2000 isn't 'twice' year 1000."),
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
      { "q": "Which is the dependent (response) variable?", "options": ["Systolic blood pressure after 8 weeks", "Minutes of walking a day", "Blood pressure before the trial began", "The 8-week length of the trial"], "answer": 0, "why": "Blood pressure is the outcome measured to see whether walking had an effect." },
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
    "story": "Students are randomly given a drink with 0, 100 or 200 mg of caffeine. Thirty minutes later a computer measures their reaction time in milliseconds. The number of cups of coffee each student drank yesterday is also recorded.",
    "data": [["Caffeine", "0, 100 or 200 mg"], ["Reaction time", "e.g. 284.6 ms"], ["Coffee yesterday", "cups: 0, 1, 2…"]],
    "steps": [
      { "q": "Which is the independent variable?", "options": ["Caffeine dose", "Reaction time", "Number of students", "The 30-minute wait"], "answer": 0, "why": "The caffeine dose is set by the researchers and is the possible cause." },
      { "q": "Which is the dependent variable?", "options": ["Reaction time", "Caffeine dose", "The drink's flavour", "The computer"], "answer": 0, "why": "Reaction time is the outcome they measure." },
      vt("Number of cups of coffee drunk yesterday is…", 1, "Cups are counted (0, 1, 2…), so it is quantitative discrete.")],
    "takeaway": "Times and weights are continuous; numbers of cups, visits or attacks are discrete." },

  /* ---------- study clinic: sampling and design ---------- */
  { "id": "s1", "cat": "study", "icon": "well-st-strata", "spot": "strat", "title": "Staff survey",
    "who": "Hospital with 2,000 staff",
    "story": "A hospital wants 100 staff to answer a survey about a new shift pattern. It has a full staff list, sorted by surname, showing each person's profession.",
    "data": [["Population", "2,000 staff"], ["Sample", "100 staff"], ["Professions", "nurses, doctors, therapists, admin"]],
    "steps": [
      { "q": "They pick a random name among the first 20, then every 20th name after it. Which method is this?", "options": ["Systematic sample", "Stratified sample", "Cluster sample", "Convenience sample"], "answer": 0, "why": "A random start, then every kth person (k = 2,000 ÷ 100 = 20) is systematic sampling." },
      { "q": "Instead they randomly pick staff within each profession, in proportion to its size. Which method is this?", "options": ["Stratified sample", "Cluster sample", "Systematic sample", "Simple random sample"], "answer": 0, "why": "Splitting into groups (strata) and sampling randomly from every group is stratified sampling." },
      { "q": "A manager suggests just asking staff in the canteen at lunchtime. What is the main problem?", "options": ["A convenience sample: it may miss groups like night staff", "It is a random sample, so results will vary too much", "It needs a full staff list, which takes too long", "It is a cluster sample, so everyone must be asked"], "answer": 0, "why": "People who are easy to reach may differ from the rest (night shift, staff too busy to eat): the sample is likely biased." }],
    "takeaway": "Every kth = systematic; some from every group = stratified; whoever is handy = convenience (biased)." },
  { "id": "s2", "cat": "study", "icon": "well-st-blindfold", "spot": "blind", "title": "Does the new drug work?",
    "who": "Drug company, 400 volunteers",
    "story": "A company wants to know whether its new tablet lowers blood pressure. It has 400 volunteers with high blood pressure.",
    "data": [["Volunteers", "400"], ["Outcome", "systolic BP after 12 weeks"]],
    "steps": [
      { "q": "Which design can show whether the tablet causes a fall in blood pressure?", "options": ["Randomised controlled trial", "Observational study of people already taking it", "Convenience survey of patients", "Asking doctors for their opinion"], "answer": 0, "why": "Only an experiment with random assignment makes the groups alike apart from the treatment, so it can show cause and effect." },
      { "q": "Why does the control group get an identical-looking dummy tablet (placebo)?", "options": ["So both groups expect treatment; only the drug differs", "So the researchers can tell the two groups apart", "So the control group's blood pressure falls as well", "Because it is the law to give everyone tablets"], "answer": 0, "why": "Expecting to get better can itself lower readings (the placebo effect); a placebo balances that out." },
      { "q": "Neither the volunteers nor the nurses measuring blood pressure know who got the real tablet. This is…", "options": ["A double-blind trial", "A single-blind trial", "An observational study", "A cluster sample"], "answer": 0, "why": "When both participants and the people measuring outcomes are kept unaware, the trial is double-blind." }],
    "takeaway": "Random assignment + control group + placebo + double-blinding = the strongest test of a treatment." },
  { "id": "s3", "cat": "study", "icon": "well-st-binoculars", "spot": "obs", "title": "The coffee headline",
    "who": "News story about a 10-year study",
    "story": "A newspaper says 'Coffee prevents heart attacks!'. The study followed 20,000 adults for 10 years, simply recording how much coffee they chose to drink and whether they had a heart attack.",
    "data": [["Participants", "20,000 adults"], ["Coffee", "chosen by the participants"], ["Finding", "coffee drinkers had fewer heart attacks"]],
    "steps": [
      { "q": "What kind of study is this?", "options": ["Observational study", "Randomised controlled trial", "Double-blind experiment", "Systematic experiment"], "answer": 0, "why": "Nobody was assigned to drink coffee; researchers only recorded what people did." },
      { "q": "What can the study honestly conclude?", "options": ["Coffee is linked with fewer heart attacks; cause is unproven", "Coffee prevents heart attacks, as the sample was so large", "Coffee prevents heart attacks, because it lasted 10 years", "Nothing, because people chose their own coffee intake"], "answer": 0, "why": "An observational study shows an association (correlation), not cause and effect." },
      { "q": "Which of these could be a lurking (confounding) variable?", "options": ["The coffee drinkers also exercised more", "The study lasted 10 years", "The heart attacks were recorded by doctors", "The study included 20,000 adults"], "answer": 0, "why": "Something linked to both coffee drinking and heart health, like exercise or income, could explain the link." }],
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
      { "q": "Which graph suits these data best?", "options": ["Bar chart (or pie chart)", "Histogram of the counts", "Box plot of the counts", "Line graph of the counts"], "answer": 0, "why": "Separate categories go in a bar chart with gaps, or a pie chart; histograms and box plots are for numbers." },
      { "q": "Why can't you find a median blood type?", "options": ["Blood types have no order to line them up in", "There are too many donors to line up in order", "Type O is so common that it hides the middle", "Only numbers with a true zero have a median"], "answer": 0, "why": "A median needs data that can be put in order; nominal labels have no order." }],
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
      { "q": "Clinic B has a few 2-hour waits that skew the data. Which measure of spread should the report use?", "options": ["Interquartile range (IQR)", "Range (max − min)", "Standard deviation (SD)", "Variance (SD squared)"], "answer": 0, "why": "The IQR uses the middle 50% only, so a few extreme waits don't distort it." },
      { "q": "For clinic B, Q1 = 20 min and Q3 = 40 min. Above what wait is a time flagged as an outlier?", "options": ["70 minutes", "60 minutes", "50 minutes", "80 minutes"], "answer": 0, "why": "IQR = 40 − 20 = 20; upper fence = Q3 + 1.5 × IQR = 40 + 30 = 70 minutes." }],
    "takeaway": "Same mean, different spread: SD for symmetric data, IQR when there are outliers." },

  /* ---------- study clinic: probability ---------- */
  { "id": "q1", "cat": "prob", "icon": "well-st-coins", "spot": "mult", "title": "Nausea chances",
    "who": "Pharmacist counselling patients",
    "story": "A new antibiotic causes nausea in 20% of patients (a probability of 0.2). Whether one patient feels sick doesn't affect another.",
    "data": [["P(nausea)", "0.2"], ["Patients", "independent of each other"]],
    "steps": [
      { "q": "What is the probability that a patient does NOT get nausea?", "options": ["0.8", "0.2", "0.4", "1.2"], "answer": 0, "why": "Complement rule: 1 − 0.2 = 0.8." },
      { "q": "Two unrelated patients take it. What is the probability that both get nausea?", "options": ["0.04", "0.4", "0.2", "0.64"], "answer": 0, "why": "Independent events multiply: 0.2 × 0.2 = 0.04." },
      { "q": "The last four patients had no nausea. What is the chance that the fifth patient gets it?", "options": ["Still 0.2", "Higher than 0.2, because it's 'due'", "Lower than 0.2, because of the streak", "About 0.0003 (0.2 multiplied five times)"], "answer": 0, "why": "Each patient is independent: past patients don't change the next one. Thinking it is 'due' is the gambler's fallacy." }],
    "takeaway": "Not = 1 − P; independent 'and' = multiply; streaks don't change the next chance." },

  /* ---------- reading the evidence (extra mode): testing ideas, risk and screening ---------- */
  { "id": "t1", "cat": "test", "icon": "pharm-bp-gauge", "title": "Reading a trial result",
    "who": "Journal abstract, blood pressure trial",
    "story": "600 adults with high blood pressure were randomly given a new tablet or a placebo for 12 weeks. The abstract says systolic BP fell 6 mmHg more on the tablet than on placebo (95% CI 2 to 10 mmHg, p = 0.003).",
    "data": [["Difference", "6 mmHg more fall on the tablet"], ["95% CI", "2 to 10 mmHg"], ["p-value", "0.003"]],
    "steps": [
      { "q": "What does p = 0.003 tell you?", "options": ["If the tablet did nothing, a gap this big would be very rare", "There is a 0.3% chance that the tablet does nothing at all", "There is a 99.7% chance that the tablet lowers BP", "The tablet lowered BP in 99.7% of the patients"], "answer": 0, "why": "A p-value assumes H₀ is true (no effect) and asks how often data at least this extreme would turn up. It is not the chance that H₀ is true or that the drug works." },
      { "q": "What does the 95% CI of 2 to 10 mmHg tell you?", "options": ["The true extra fall is plausibly between 2 and 10 mmHg", "95% of patients had a fall of between 2 and 10 mmHg", "Every patient's BP fell by between 2 and 10 mmHg", "There is a 95% chance the trial was run correctly"], "answer": 0, "why": "A CI is a range of plausible values for the true average effect in the population, not the spread of individual patients' results." },
      { "q": "Is the result statistically significant at the 0.05 level?", "options": ["Yes: p is below 0.05 and the CI leaves out 0", "No: the CI is too wide for the result to count", "Yes: but only because 600 people took part", "No: p has to be below 0.001 to be significant"], "answer": 0, "why": "p = 0.003 is below α = 0.05, and the 95% CI for the difference does not include 0 (no effect): the two agree." }],
    "takeaway": "Significant, with a plausible effect of 2 to 10 mmHg; whether that matters to patients is the clinical question." },
  { "id": "r1", "cat": "risk", "icon": "chem-scanner", "spot": "scale", "title": "A new screening test",
    "who": "Screening programme, 10,000 adults",
    "story": "A new blood test is checked in 10,000 adults; 100 of them really have the condition (1%). Of those 100, 90 test positive. Of the 9,900 without it, 495 test positive. Maria, who has no symptoms, tests positive.",
    "data": [["Has it: test +", "90 (of 100)"], ["Doesn't: test +", "495 (of 9,900)"], ["All positives", "585"], ["All negatives", "9,415"]],
    "steps": [
      { "q": "What is the test's sensitivity?", "options": ["90%: 90 of the 100 who have it", "15%: 90 of the 585 positives", "95%: 9,405 of the 9,900 without it", "99.9%: 9,405 of the 9,415 negatives"], "answer": 0, "why": "Sensitivity = TP ÷ everyone with the condition = 90 ÷ 100 = 90%. (95% is the specificity; 15% and 99.9% are the PPV and NPV.)" },
      { "q": "About how likely is it that Maria really has the condition?", "options": ["About 15%: most positives are false alarms", "About 90%: the same as the test's sensitivity", "About 95%: the same as the test's specificity", "About 1%: a positive result changes nothing"], "answer": 0, "why": "This is the PPV: 90 true positives ÷ 585 positives ≈ 15%. Her chance has risen from 1% to about 15%, but most positives are false." },
      { "q": "Why is the positive predictive value so low?", "options": ["The condition is rare, so false positives outnumber true ones", "The test misses too many of the people who have the condition", "A sample of 10,000 people is too small to judge a new test", "A specificity of 95% means that 95% of the positives are wrong"], "answer": 0, "why": "5% of 9,900 healthy people (495) is far more than 90% of the 100 who are ill (90). The lower the prevalence, the lower the PPV." }],
    "takeaway": "Sensitivity and specificity describe the test; PPV and NPV also depend on how common the condition is." },
  { "id": "r2", "cat": "risk", "icon": "well-st-binoculars", "spot": "obs", "title": "Smokers and COPD",
    "who": "Cohort study, 3,000 adults followed for 20 years",
    "story": "Researchers recorded who smoked, then followed 1,000 smokers and 2,000 non-smokers for 20 years. 120 smokers and 60 non-smokers developed COPD (illustrative numbers).",
    "data": [["Smokers", "120 of 1,000 got COPD"], ["Non-smokers", "60 of 2,000 got COPD"], ["Design", "cohort (observational)"]],
    "steps": [
      { "q": "What was the risk of COPD in each group?", "options": ["12% for smokers, 3% for non-smokers", "12% for smokers, 6% for non-smokers", "67% for smokers, 33% for non-smokers", "1.2% for smokers, 0.3% for non-smokers"], "answer": 0, "why": "Risk = cases ÷ group size: 120 ÷ 1,000 = 0.12 (12%) and 60 ÷ 2,000 = 0.03 (3%)." },
      { "q": "What is the relative risk for smokers compared with non-smokers?", "options": ["4: smokers had four times the risk", "2: there were twice as many cases", "9: the two risks differ by 9 points", "0.25: smokers had a quarter of the risk"], "answer": 0, "why": "RR = 0.12 ÷ 0.03 = 4. Comparing raw counts (120 vs 60) ignores that the groups are different sizes; 9 points is the risk difference." },
      { "q": "On its own, does this one study prove that smoking causes COPD?", "options": ["No: it is observational, so confounding is possible", "Yes: any RR above 1 proves cause and effect", "Yes: a cohort that follows people forward proves it", "No: an RR can't be worked out from a cohort study"], "answer": 0, "why": "People chose whether to smoke, so smokers may differ in other ways. Cause is judged from many studies together: strength, consistency, dose–response and timing." }],
    "takeaway": "Cohort study: risk = cases ÷ group size, RR = risk exposed ÷ risk unexposed; a link, not proof on its own." },
  { "id": "r3", "cat": "risk", "icon": "pharm-ad-box", "spot": "rct", "title": "'Pill halves heart attacks!'",
    "who": "Newspaper headline about a 5-year trial",
    "story": "A headline says a new pill 'halves the risk of heart attack'. In the trial, 2 in every 100 people on placebo had a heart attack over 5 years, compared with 1 in every 100 people on the pill.",
    "data": [["Placebo", "2 in 100 (2%)"], ["Pill", "1 in 100 (1%)"], ["Time", "5 years"]],
    "steps": [
      { "q": "What is the relative risk reduction?", "options": ["50%", "1%", "2%", "99%"], "answer": 0, "why": "RRR = (2% − 1%) ÷ 2% = 0.5 = 50%. This is the 'halves the risk' in the headline." },
      { "q": "What is the absolute risk reduction?", "options": ["1 percentage point", "50 percentage points", "2 percentage points", "0.5 percentage points"], "answer": 0, "why": "ARR = control risk − treatment risk = 2% − 1% = 1 percentage point (0.01)." },
      { "q": "How many people need the pill for 5 years to prevent one heart attack?", "options": ["100", "50", "200", "2"], "answer": 0, "why": "NNT = 1 ÷ ARR = 1 ÷ 0.01 = 100 people for 5 years. For every 100 treated, one heart attack is prevented; the other 99 gain nothing from it but can still get side effects." }],
    "takeaway": "'Halves the risk' can mean 2 in 100 down to 1 in 100: always ask for the absolute risks and the NNT." }
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
    "make": () => pick([{ what: "of adults in a survey smoke", p: pick([8, 12, 15, 18, 23]) }, { what: "of patients get a sore arm after a vaccine", p: pick([15, 23, 27, 31, 36, 42, 55, 64, 72]) }, { what: "of people tested carry the gene", p: pick([4, 8, 12, 15, 18, 23, 27]) }, { what: "of babies are born before 37 weeks", p: pick([8, 10, 12]) }, { what: "of patients miss their follow-up appointment", p: pick([8, 12, 15, 18, 23, 27, 31]) }]),
    "text": "About {p}% {what}. What percentage do NOT?",
    "answer": v => 100 - v.p,
    "steps": ["P(not A) = 100% − P(A)", "= 100% − {p}%", "= {answer}"] },
  { "id": "and", "cat": "prob", "title": "Independent events: and", "spot": "mult", "unit": "", "dp": 3, "formula": "P(A and B) = P(A) × P(B)",
    "make": () => pick([
      { story: "The chance that a booked patient misses an appointment is {pa}. Two unrelated patients are booked. What is the probability that both miss?", pa: pick([0.1, 0.2, 0.3, 0.4]), same: true },
      { story: "The probability that an adult is left-handed is about {pa} and, independently, the probability that they have blood type O is about {pb}. What is the probability that a random adult is both left-handed and type O?", pa: 0.1, pb: 0.45 },
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
    "hint": (v, x) => Math.abs(x - v.pa * v.pb) < 0.006 ? "You multiplied: for 'or' with events that can't happen together, add the probabilities." : Math.abs(x - (v.pa + v.pb) * 100) < 0.6 ? "Give the answer as a decimal between 0 and 1." : "" },

  /* ---------- risk and screening (all numbers illustrative; each generator keeps only clean answers) ---------- */
  { "id": "sens", "cat": "risk", "title": "Sensitivity from a 2×2 table", "spot": "scale", "unit": "%", "dp": 1, "formula": "Sensitivity = TP ÷ (TP + FN)",
    "make": () => screen("sens"), "ok": v => clean(v.sens, 1),
    "text": "A {test} is checked against a reference test in {n} people. Of the {n1} who have {dis}, {tp} test positive and {fn} test negative. Of the {n0} who don't, {fp} test positive and {tn} test negative. What is the sensitivity?",
    "answer": v => v.sens,
    "steps": ["Sensitivity = TP ÷ everyone with the disease = TP ÷ (TP + FN)", "= {tp} ÷ ({tp} + {fn}) = {tp} ÷ {n1}, then × 100", "= {answer}"],
    "tip": "Sensitivity looks only at the people who HAVE the disease.",
    "hint": (v, x) => Math.abs(x - v.spec) < 0.06 ? "That is the specificity (people without the disease). Sensitivity uses the people who have it." : Math.abs(x - v.ppv) < 0.06 ? "You divided by everyone who tested positive: that is the PPV. Sensitivity divides by everyone who has the disease." : "" },
  { "id": "spec", "cat": "risk", "title": "Specificity from a 2×2 table", "spot": "scale", "unit": "%", "dp": 1, "formula": "Specificity = TN ÷ (TN + FP)",
    "make": () => screen("spec"), "ok": v => clean(v.spec, 1),
    "text": "A {test} is checked against a reference test in {n} people. Of the {n1} who have {dis}, {tp} test positive and {fn} test negative. Of the {n0} who don't, {fp} test positive and {tn} test negative. What is the specificity?",
    "answer": v => v.spec,
    "steps": ["Specificity = TN ÷ everyone without the disease = TN ÷ (TN + FP)", "= {tn} ÷ ({tn} + {fp}) = {tn} ÷ {n0}, then × 100", "= {answer}"],
    "tip": "Specificity looks only at the people who do NOT have the disease.",
    "hint": (v, x) => Math.abs(x - v.sens) < 0.06 ? "That is the sensitivity. Specificity uses the people without the disease: TN ÷ (TN + FP)." : Math.abs(x - v.npv) < 0.06 ? "You divided by everyone who tested negative: that is the NPV. Specificity divides by everyone without the disease." : Math.abs(x - (100 - v.spec)) < 0.06 ? "That is the false positive rate: specificity is the share who test NEGATIVE." : "" },
  { "id": "ppv", "cat": "risk", "title": "Positive predictive value", "spot": "scale", "unit": "%", "dp": 1, "formula": "PPV = TP ÷ (TP + FP)",
    "make": () => screen("ppv"), "ok": v => clean(v.ppv, 1),
    "text": "A {test} is checked against a reference test in {n} people. Of the {n1} who have {dis}, {tp} test positive and {fn} test negative. Of the {n0} who don't, {fp} test positive and {tn} test negative. What is the positive predictive value?",
    "answer": v => v.ppv,
    "steps": ["PPV = TP ÷ everyone who tested positive = TP ÷ (TP + FP)", "= {tp} ÷ ({tp} + {fp}) = {tp} ÷ {pos}, then × 100", "= {answer}"],
    "tip": "PPV answers: I tested positive, so how likely is it that I really have it?",
    "hint": (v, x) => Math.abs(x - v.sens) < 0.06 ? "That is the sensitivity. PPV divides by everyone who tested POSITIVE, true and false." : "" },
  { "id": "npv", "cat": "risk", "title": "Negative predictive value", "spot": "scale", "unit": "%", "dp": 1, "formula": "NPV = TN ÷ (TN + FN)",
    "make": () => screen("npv"), "ok": v => clean(v.npv, 1),
    "text": "A {test} is checked against a reference test in {n} people. Of the {n1} who have {dis}, {tp} test positive and {fn} test negative. Of the {n0} who don't, {fp} test positive and {tn} test negative. What is the negative predictive value?",
    "answer": v => v.npv,
    "steps": ["NPV = TN ÷ everyone who tested negative = TN ÷ (TN + FN)", "= {tn} ÷ ({tn} + {fn}) = {tn} ÷ {neg}, then × 100", "= {answer}"],
    "tip": "NPV answers: I tested negative, so how likely is it that I really am clear?",
    "hint": (v, x) => Math.abs(x - v.spec) < 0.06 ? "That is the specificity. NPV divides by everyone who tested NEGATIVE, true and false." : "" },
  { "id": "rr", "cat": "risk", "title": "Relative risk (cohort study)", "spot": "obs", "unit": "", "dp": 2, "formula": "RR = risk in exposed ÷ risk in unexposed",
    "make": () => { let v = null;
      for (let t = 0; t < 4000; t++) {
        const C = pick(COHORT), re = pick(C.re), ru = pick(C.ru), ne = pick([400, 500, 800, 1000, 1200, 2000]), nu = pick([400, 500, 800, 1000, 1500, 2000]);
        v = { exp: C.exp, unexp: C.unexp, out: C.out, time: C.time, re, ru, ne, nu, a: Math.round(ne * re), c: Math.round(nu * ru) };
        v.or = (v.a / (ne - v.a)) / (v.c / (nu - v.c));
        if (ne !== nu && clean(re / ru, 2) && Math.abs(re / ru - 1) > 0.1) return v;
      }
      return v; },
    "ok": (v, a) => clean(a, 2),
    "text": "A cohort study follows {ne} {exp} and {nu} {unexp} {time}. {a} of the {exp} and {c} of the {unexp} {out}. What is the relative risk for the {exp} compared with the {unexp}?",
    "answer": v => v.re / v.ru,
    "steps": ["Risk in the {exp} = {a} ÷ {ne} = {re}", "Risk in the {unexp} = {c} ÷ {nu} = {ru}", "RR = {re} ÷ {ru}", "= {answer}"],
    "tip": "RR above 1: higher risk in the exposed group. Below 1: lower risk (protective).",
    "hint": (v, x) => Math.abs(x - v.a / v.c) < 0.006 ? "You compared the counts, but the groups are different sizes. Work out each risk first (cases ÷ group size)." : Math.abs(x - v.ru / v.re) < 0.006 ? "Upside down: put the exposed group's risk on top." : Math.abs(x - v.or) < 0.006 ? "That is the odds ratio. For relative risk, divide the two risks (cases ÷ everyone in the group)." : "" },
  { "id": "oddsratio", "cat": "risk", "title": "Odds ratio (case–control study)", "spot": "obs", "unit": "", "dp": 1, "formula": "OR = (a × d) ÷ (b × c)",
    "make": () => { let v = null;
      for (let t = 0; t < 4000; t++) {
        const C = pick(CASECON), nca = pick(C.nca), nco = pick(C.nco), a = Math.round(nca * (0.2 + Math.random() * 0.6)), c = Math.round(nco * (0.05 + Math.random() * 0.35));
        v = { cases: C.cases, controls: C.controls, exp: C.exp, short: C.short, nca, nco, a, b: nca - a, c, d: nco - c };
        v.ad = v.a * v.d; v.bc = v.b * v.c; v.rr = (a / nca) / (c / nco);
        if (v.b > 0 && v.c > 0 && clean(v.ad / v.bc, 1) && v.ad / v.bc >= 1.5 && v.ad / v.bc <= 9) return v;
      }
      return v; },
    "ok": (v, a) => clean(a, 1) && a >= 1.5 && a <= 9,
    "text": "A case–control study compares {nca} {cases} with {nco} {controls}. {a} of the cases and {c} of the controls {exp}. What is the odds ratio for {short}?",
    "answer": v => v.ad / v.bc,
    "steps": ["Cases: {a} exposed, {b} not, so odds = {a} ÷ {b}", "Controls: {c} exposed, {d} not, so odds = {c} ÷ {d}", "OR = ({a} × {d}) ÷ ({b} × {c}) = {ad} ÷ {bc}", "= {answer}"],
    "tip": "Odds = exposed ÷ NOT exposed (not ÷ everyone). Cross-multiply: (a × d) ÷ (b × c).",
    "hint": (v, x) => Math.abs(x - v.rr) < 0.06 ? "You divided by everyone in each group (like a risk). Odds divide the exposed by the NOT exposed." : Math.abs(x - 1 / (v.ad / v.bc)) < 0.06 ? "Upside down: put the cases' odds on top." : "" },
  { "id": "arr", "cat": "risk", "title": "Absolute risk reduction", "spot": "rct", "unit": "percentage points", "dp": 0, "formula": "ARR = control risk − treatment risk",
    "make": () => trial(v => v.nc !== v.nt), "ok": (v, a) => whole(a),
    "text": "In a trial, {ec} of {nc} patients on placebo and {et} of {nt} patients on {drug} had {out} {time}. What is the absolute risk reduction, in percentage points?",
    "answer": v => v.arrp,
    "steps": ["Control risk = {ec} ÷ {nc} = {cerp}%", "Treatment risk = {et} ÷ {nt} = {eerp}%", "ARR = {cerp}% − {eerp}%", "= {answer}"],
    "tip": "Work out each group's risk first: the groups are different sizes.",
    "hint": (v, x) => Math.abs(x - v.rrr) < 0.6 && v.rrr !== v.arrp ? "That is the relative risk reduction. The ARR is just control risk − treatment risk." : Math.abs(x - (v.ec - v.et)) < 0.6 ? "You subtracted the counts: turn each into a risk (cases ÷ group size) first." : "" },
  { "id": "rrr", "cat": "risk", "title": "Relative risk reduction", "spot": "rct", "unit": "%", "dp": 0, "formula": "RRR = ARR ÷ control risk",
    "make": () => trial(v => whole(v.rrr) && v.nc !== v.nt), "ok": v => whole(v.rrr),
    "text": "In a trial, {ec} of {nc} patients on placebo and {et} of {nt} patients on {drug} had {out} {time}. What is the relative risk reduction?",
    "answer": v => v.rrr,
    "steps": ["Control risk = {ec} ÷ {nc} = {cerp}%; treatment risk = {et} ÷ {nt} = {eerp}%", "ARR = {cerp}% − {eerp}% = {arrp} percentage points", "RRR = {arrp} ÷ {cerp}, then × 100", "= {answer}"],
    "tip": "RRR is the drop as a share of the control risk; it always sounds bigger than the ARR.",
    "hint": (v, x) => Math.abs(x - v.arrp) < 0.6 ? "That is the absolute risk reduction. Now divide it by the control risk." : Math.abs(x - 100 * v.arrp / v.eerp) < 0.6 ? "Divide by the CONTROL (placebo) risk, not the treatment risk." : "" },
  { "id": "nnt", "cat": "risk", "title": "Number needed to treat", "spot": "rct", "unit": "patients", "dp": 0, "formula": "NNT = 1 ÷ ARR (ARR as a decimal)",
    "make": () => trial(v => [1, 2, 4, 5, 10].indexOf(v.arrp) >= 0), "ok": (v, a) => whole(a),
    "text": "In a trial, {cerp}% of patients on placebo and {eerp}% of patients on {drug} had {out} {time}. How many patients need to be treated with {drug} for one extra patient to avoid {out}?",
    "answer": v => 100 / v.arrp,
    "steps": ["ARR = {cerp}% − {eerp}% = {arrp}% = {arr}", "NNT = 1 ÷ ARR = 1 ÷ {arr}", "= {answer}"],
    "tip": "If the NNT is not a whole number, round up to the next whole patient.",
    "hint": (v, x) => Math.abs(x - v.arrp) < 0.6 ? "That is the ARR. The NNT is 1 ÷ ARR, with the ARR as a decimal." : Math.abs(x - 100 / v.cerp) < 0.6 || Math.abs(x - 100 / v.eerp) < 0.6 ? "Use the difference between the two risks (the ARR), not one risk on its own." : "" }
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
      "tip": "OR adds, AND multiplies (when the rules' conditions hold)." },
    { "cat": "test", "about": "A hypothesis test weighs the evidence against a 'no effect' claim. The null hypothesis (H₀) says there is no difference or no effect; the alternative (H₁) says there is. The p-value is the probability of a result at least as extreme as the one seen, if H₀ were true. If p is below the significance level chosen in advance (usually α = 0.05), the result is statistically significant and H₀ is rejected. Rejecting a true H₀ is a type I error (a false alarm, chance α); missing a real effect is a type II error (chance β, and power = 1 − β). A 95% confidence interval gives a range of plausible values for the true effect, and shows its size as well as the uncertainty. Statistical significance is not the same as clinical importance. The correlation coefficient r (from −1 to +1) measures the strength and direction of a straight-line link, and never proves cause on its own.",
      "points": ["The p-value is NOT the chance that H₀ is true, and 1 − p is not the chance the treatment works.", "Not significant ≠ no effect: the study may be too small (low power).", "CI for a difference includes 0, or CI for a ratio (RR, OR) includes 1: not significant at 0.05.", "A 95% CI is about the true average effect, not where 95% of patients' values lie.", "Big studies make tiny effects significant: ask whether the size of the effect matters to patients.", "r = −0.9 is a stronger link than r = +0.3; correlation is not causation."],
      "tip": "Type I: crying wolf when there is no wolf. Type II: missing the wolf that is really there." },
    { "cat": "risk", "about": "Risk is the number who get an outcome ÷ the number in the group. Relative risk (RR) divides the risk in the exposed group by the risk in the unexposed group; it comes from cohort studies and trials. The odds ratio (OR) divides odds (with ÷ without) and is used in case–control studies; for rare outcomes it is close to the RR. In a trial, the absolute risk reduction is ARR = control risk − treatment risk, the relative risk reduction is RRR = ARR ÷ control risk, and the number needed to treat is NNT = 1 ÷ ARR (rounded up). For a screening test, sensitivity = TP ÷ (TP + FN) and specificity = TN ÷ (TN + FP) describe the test; PPV = TP ÷ (TP + FP) and NPV = TN ÷ (TN + FN) describe what a result means, and they change with prevalence. Incidence counts new cases over a period among people at risk; prevalence counts all current cases at one time.",
      "points": ["RR or OR = 1: no difference; above 1: higher risk or odds; below 1: lower (protective).", "Headlines quote the RRR; patients need the ARR and the NNT, with the time period.", "Sensitivity and specificity: read down the columns (has it / doesn't). PPV and NPV: read across the rows (tested positive / negative).", "SnNout: a negative on a highly Sensitive test rules it out. SpPin: a positive on a highly Specific test rules it in.", "Rare condition: PPV falls (many false alarms) and NPV rises.", "Roughly, prevalence ≈ incidence × average duration: long-lasting conditions build up."],
      "tip": "Risk divides by everyone in the group; odds divide by those WITHOUT it." }
  ]
}
});
})();
