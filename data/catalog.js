/* BioglowRX Sciences Learning — catalog of subjects, chapter groups and games.
   This one file drives the hub and every subject page.
   status: "live" (playable) · "next" (up next, shown with ★) · "soon"
   To launch a game: set its status to "live" and add  url: "games/<game-id>/index.html". */
window.BGX_CATALOG = {
  featured: {
    game: "dose-calc", eyebrow: "New · Calculator and Case Files games", title: "Dose Calc",
    text: "Tablets, liquids, weight-based doses and IV rates, with new numbers every round and a \"Show me how\" helper. Also new: Diet Doctor patient cases and Immune Defence.",
    url: "games/dose-calc/index.html", explore: "subjects/pharmacology/index.html",
    tiles: [
      { corner: "D÷H", icon: "pill", label: "Tablets", color: "cat-lilac" },
      { corner: "kg", icon: "scale", label: "Weight", color: "cat-sage" },
      { corner: "mL/h", icon: "timer", label: "Pumps", color: "cat-coral" }
    ]
  },
  /* Home-page carousel: switches every 6 seconds (pauses on hover, focus or the pause button). Order = order shown. */
  featuredList: [
    { game: "last-chapters", demo: { id: "pain-ladder", p: [71.0, 65.4], l: [28.8, 46.5] }, eyebrow: "New · Pharmacology complete + Statistics", title: "Pain Ladder & Odds On",
      text: "The last chapters are in: pain relief, opioid safety, muscle and gout drugs in Pain Ladder, and averages, spread and probability with a calculator in Odds On.",
      url: "games/pain-ladder/index.html", explore: "games/odds-on/index.html", exploreLabel: "Play Odds On", play: "Play Pain Ladder",
      tiles: [{ corner: "10", icon: "capsule", label: "Opioids", color: "cat-coral" }, { corner: "UA", icon: "foot", label: "Gout", color: "cat-amber" }, { corner: "x̄", icon: "chart", label: "Stats", color: "cat-lilac" }] },
    { game: "nutrition-pack", demo: { id: "exam-prep", p: [50.0, 91.9], l: [50.0, 80.6] }, eyebrow: "New · Nutrition, complete", title: "Every Nutrition chapter",
      text: "Five new games finish the course: nutrition assessment, energy balance, eating at every life stage, coaching behaviour change, and a full mock exam.",
      url: "games/exam-prep/index.html", explore: "subjects/nutrition/index.html", exploreLabel: "All Nutrition games", play: "Try the mock exam",
      tiles: [{ corner: "BMI", icon: "scale", label: "Assess", color: "cat-sky" }, { corner: "kcal", icon: "apple", label: "Energy", color: "cat-amber" }, { corner: "Q", icon: "book", label: "Exam", color: "cat-lilac" }] },
    { game: "anatomy-pack", demo: { id: "neuron-relay", p: [73.1, 52.0], l: [71.2, 52.2] }, eyebrow: "New · Anatomy & Physiology, complete", title: "Every body system",
      text: "Eleven new games finish the book: body map, biomolecules, tissues, skin, joints, muscles, nerves and brain, senses, kidneys and acid–base, reproduction, development.",
      url: "games/neuron-relay/index.html", explore: "subjects/anatomy/index.html", exploreLabel: "All Anatomy games", play: "Start with Neuron Relay",
      tiles: [{ corner: "12", icon: "brain", label: "Nerves", color: "cat-lilac" }, { corner: "10", icon: "muscle", label: "Muscles", color: "cat-coral" }, { corner: "23", icon: "kidney", label: "Kidneys", color: "cat-sand" }] },
    { game: "kidney-quest", demo: { id: "kidney-quest", p: [50.0, 74.3], l: [50.0, 85.6] }, eyebrow: "New · A&P ch. 23–24", title: "Kidney Quest",
      text: "Follow filtrate through the nephron, then read real blood gases: acidosis or alkalosis, respiratory or metabolic?",
      url: "games/kidney-quest/index.html", explore: "subjects/anatomy/index.html", exploreLabel: "All Anatomy games",
      tiles: [{ corner: "1", icon: "kidney", label: "Nephron", color: "cat-sand" }, { corner: "pH", icon: "drop", label: "Blood gas", color: "cat-sky" }, { corner: "ADH", icon: "gland", label: "Hormones", color: "cat-amber" }] },
    { game: "chemistry-pack", demo: { id: "balance-it", p: [28.5, 55.7], l: [71.2, 59.1] }, eyebrow: "New · All 24 chapters of Chemistry", title: "Chemistry, complete",
      text: "Thirteen new games cover every chapter for the exam: balancing equations, solubility, gas laws, bonding shapes, rates, ΔG, batteries, half-lives and functional groups.",
      url: "games/balance-it/index.html", explore: "subjects/chemistry/index.html", exploreLabel: "All Chemistry games", play: "Start with Balance It",
      tiles: [{ corner: "3", icon: "molecule", label: "Balance", color: "cat-sage" }, { corner: "10", icon: "lungs", label: "Gases", color: "cat-sky" }, { corner: "20", icon: "radiation", label: "Nuclear", color: "cat-coral" }] },
    { game: "states-of-matter", demo: { id: "states-of-matter", p: [71.6, 66.3], l: [57.2, 72.2] }, eyebrow: "New · Chemistry ch. 10–12", title: "States of Matter",
      text: "Particles, phase changes and intermolecular forces, then gas-law problems from oxygen cylinders to breathing.",
      url: "games/states-of-matter/index.html", explore: "subjects/chemistry/index.html", exploreLabel: "All Chemistry games",
      tiles: [{ corner: "s", icon: "cube", label: "Solid", color: "cat-sky" }, { corner: "l", icon: "drop", label: "Liquid", color: "cat-mint" }, { corner: "g", icon: "wave", label: "Gas", color: "cat-amber" }] },
    { game: "half-life-hunt", demo: { id: "half-life-hunt", p: [71.5, 51.8], l: [28.8, 55.8] }, eyebrow: "New · Chemistry ch. 20", title: "Half-Life Hunt",
      text: "Alpha, beta and gamma, nuclear equations you build yourself, and half-life sums with real medical isotopes.",
      url: "games/half-life-hunt/index.html", explore: "subjects/chemistry/index.html", exploreLabel: "All Chemistry games",
      tiles: [{ corner: "α", icon: "radiation", label: "Decay", color: "cat-coral" }, { corner: "½", icon: "timer", label: "Half-life", color: "cat-amber" }, { corner: "Tc", icon: "atom", label: "Isotopes", color: "cat-sky" }] },
    { game: "dose-calc", demo: { id: "dose-calc", p: [71.6, 66.2], l: [57.2, 67.9] }, eyebrow: "New · Calculator game", title: "Dose Calc",
      text: "Tablets, liquids, weight-based doses and IV rates, with new numbers every round and a \"Show me how\" helper.",
      url: "games/dose-calc/index.html", explore: "subjects/pharmacology/index.html", exploreLabel: "All Pharmacology",
      tiles: [{ corner: "D÷H", icon: "pill", label: "Tablets", color: "cat-lilac" }, { corner: "kg", icon: "scale", label: "Weight", color: "cat-sage" }, { corner: "mL/h", icon: "timer", label: "Pumps", color: "cat-coral" }] },
    { game: "microscope-lab", eyebrow: "Hands-on lab", title: "Microscope Lab",
      text: "Clip the slide, focus from 4× to 40× and name the tissue. One hands-on lab for every subject.",
      url: "games/microscope-lab/index.html", explore: "subjects/anatomy/index.html", exploreLabel: "All Anatomy" },
    { game: "titration-lab", eyebrow: "Hands-on lab · Chemistry", title: "Titration Lab",
      text: "Pour, swirl and stop at the first lasting pale pink, then read the titration curve.",
      url: "games/titration-lab/index.html", explore: "subjects/chemistry/index.html", exploreLabel: "All Chemistry" }
  ],
  subjects: [
    {
      id: "chemistry", count: "24 chapters", name: "Chemistry", color: "cat-sky", icon: "flask", source: "Averill, Chemistry",
      blurb: "Atoms, elements, reactions and the chemistry behind everyday things.",
      labs: [
        { id: "titration-lab", ch: "16–17", title: "Titration Lab", icon: "flask", text: "Hold to pour from the burette, swirl the flask and stop at the exact pink endpoint. Level 3 adds the concentration calculation.", status: "live", url: "games/titration-lab/index.html" }
      ],
      chapters: [
        { ch: "1", title: "What chemistry is: units and lab safety", icon: "beaker", game: "Lab Basics", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Calculator"], status: "live", url: "games/lab-basics/index.html",
          tiles: [{corner: "1", icon: "beaker", color: "cat-sky"}, {corner: "6", icon: "shield", color: "cat-coral"}, {corner: "16", icon: "scale", color: "cat-amber"}] },
        { ch: "2", title: "Molecules, ions and formulas", icon: "molecule", game: "Formula Forge", formats: ["Explore", "Quick Quiz", "Match Pairs", "Sort It"], status: "live", url: "games/formula-forge/index.html",
          tiles: [{corner: "1", big: "H₂O", color: "cat-mint"}, {corner: "9", big: "NaCl", color: "cat-coral"}, {corner: "18", big: "C₆H₁₂O₆", color: "cat-sage"}] },
        { ch: "3", title: "Chemical reactions", icon: "flame", game: "Balance It", formats: ["Build It", "Sort It", "Quick Quiz", "Match Pairs", "Calculator"], status: "live", url: "games/balance-it/index.html",
          tiles: [{corner: "1", icon: "molecule", color: "cat-sage"}, {corner: "6", icon: "recycle", color: "cat-amber"}, {corner: "17", icon: "flame", color: "cat-coral"}] },
        { ch: "4", title: "Reactions in water", icon: "drop", game: "Will It Dissolve?", formats: ["True or Myth", "Quick Quiz", "Sort It", "Match Pairs", "Case Files", "Calculator"], status: "live", url: "games/will-it-dissolve/index.html",
          tiles: [{corner: "1", icon: "drop", color: "cat-sky"}, {corner: "8", icon: "brick", color: "cat-sand"}, {corner: "15", icon: "bolt", color: "cat-lemon"}] },
        { ch: "5", title: "Energy in reactions", icon: "flame", game: "Hot or Cold?", formats: ["True or Myth", "Quick Quiz", "Match Pairs", "Calculator"], status: "live", url: "games/hot-or-cold/index.html",
          tiles: [{corner: "1", icon: "flame", color: "cat-coral"}, {corner: "8", icon: "drop", color: "cat-sky"}, {corner: "14", icon: "book", color: "cat-lilac"}] },
        { ch: "6", title: "Inside the atom", icon: "atom", game: "Atom Builder", formats: ["Build It", "Quick Quiz", "Explore"], status: "live", url: "games/atom-builder/index.html",
          tiles: [{corner: "6", big: "C", color: "cat-sky"}, {corner: "8", big: "O", color: "cat-sky"}, {corner: "11", big: "Na", color: "cat-coral"}] },
        { ch: "7", title: "The periodic table", icon: "grid", game: "Element Rush", formats: ["Explore", "Quick Quiz", "Find It", "Sort It"], status: "live", url: "games/element-rush/index.html",
          tiles: [{ corner: "26", big: "Fe", color: "cat-lemon" }, { corner: "8", big: "O", color: "cat-sky" }, { corner: "10", big: "Ne", color: "cat-orchid" }] },
        { ch: "8–9", title: "How atoms bond, and molecule shapes", icon: "molecule", game: "Bond Match", formats: ["Explore", "Quick Quiz", "Sort It", "True or Myth", "Match Pairs"], status: "live", url: "games/bond-match/index.html",
          tiles: [{corner: "1", icon: "bolt", color: "cat-coral"}, {corner: "5", icon: "drop", color: "cat-amber"}, {corner: "14", icon: "molecule", color: "cat-sky"}] },
        { ch: "10–12", title: "Gases, liquids and solids", icon: "cube", game: "States of Matter", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Calculator", "Match Pairs"], status: "live", url: "games/states-of-matter/index.html",
          tiles: [{corner: "1", icon: "drop", color: "cat-sky"}, {corner: "10", icon: "molecule", color: "cat-orchid"}, {corner: "14", icon: "lungs", color: "cat-amber"}] },
        { ch: "13", title: "Solutions and concentration", icon: "beaker", game: "Mix Master", formats: ["Calculator", "Case Files", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/mix-master/index.html",
          tiles: [{corner: "1", icon: "beaker", color: "cat-sky"}, {corner: "8", icon: "scale", color: "cat-amber"}, {corner: "20", icon: "drop", color: "cat-lilac"}] },
        { ch: "14–15", title: "Reaction speed and balance", icon: "timer", game: "Faster or Slower?", formats: ["True or Myth", "Sort It", "Quick Quiz", "Sequence", "Match Pairs"], status: "live", url: "games/faster-or-slower/index.html",
          tiles: [{corner: "1", icon: "zap", color: "cat-coral"}, {corner: "6", icon: "timer", color: "cat-sky"}, {corner: "11", icon: "recycle", color: "cat-sage"}] },
        { ch: "16–17", title: "Acids, bases and the pH scale", icon: "ph", game: "pH Patrol", formats: ["Explore", "Sort It", "Quick Quiz", "Match Pairs"], status: "live", url: "games/ph-patrol/index.html",
          tiles: [{corner: "3", big: "2", color: "cat-coral"}, {corner: "11", big: "7", color: "cat-sage"}, {corner: "17", big: "12.5", color: "cat-lilac"}] },
        { ch: "18", title: "Will a reaction happen?", icon: "gauge", game: "Will It Happen?", formats: ["True or Myth", "Sort It", "Quick Quiz", "Match Pairs", "Calculator"], status: "live", url: "games/will-it-happen/index.html",
          tiles: [{corner: "1", icon: "atom", color: "cat-sky"}, {corner: "13", icon: "check", color: "cat-sage"}, {corner: "15", icon: "ban", color: "cat-coral"}] },
        { ch: "19", title: "Electricity from chemistry", icon: "battery", game: "Battery Lab", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Calculator", "Match Pairs"], status: "live", url: "games/battery-lab/index.html",
          tiles: [{corner: "1", icon: "bolt", color: "cat-coral"}, {corner: "8", icon: "battery", color: "cat-lemon"}, {corner: "20", icon: "shield", color: "cat-sky"}] },
        { ch: "20", title: "Nuclear chemistry", icon: "radiation", game: "Half-Life Hunt", formats: ["Explore", "Quick Quiz", "Build It", "Calculator", "Match Pairs"], status: "live", url: "games/half-life-hunt/index.html",
          tiles: [{corner: "α", icon: "radiation", color: "cat-coral"}, {corner: "½", icon: "timer", color: "cat-amber"}, {corner: "Tc", icon: "atom", color: "cat-sky"}] },
        { ch: "21–23", title: "The element blocks up close", icon: "grid", game: "Block Party", formats: ["Find It", "Sort It", "Quick Quiz", "True or Myth", "Match Pairs"], status: "live", url: "games/block-party/index.html",
          tiles: [{corner: "Na", icon: "atom", color: "cat-coral"}, {corner: "Cl", icon: "molecule", color: "cat-sky"}, {corner: "Fe", icon: "grid", color: "cat-lemon"}] },
        { ch: "24", title: "Carbon compounds", icon: "hexagon", game: "Functional Group Hunt", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Match Pairs"], status: "live", url: "games/functional-group-hunt/index.html",
          tiles: [{corner: "1", icon: "hexagon", color: "cat-sand"}, {corner: "6", icon: "drop", color: "cat-coral"}, {corner: "11", icon: "molecule", color: "cat-sky"}] }
      ]
    },
    {
      id: "anatomy", count: "29 chapters", name: "Anatomy & Physiology", color: "cat-peach", icon: "body", source: "Saladin, Anatomy & Physiology",
      blurb: "How the human body is built and how each system keeps you alive.",
      labs: [
        { id: "microscope-lab", ch: "3–5", title: "Microscope Lab", icon: "search", text: "Focus the microscope, then identify the cells and tissues you see.", status: "live", url: "games/microscope-lab/index.html" }
      ],
      chapters: [
        { ch: "1 + Atlas A", title: "Finding your way around the body", icon: "body", game: "Body Map", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Sequence", "Case Files"], status: "live", url: "games/body-map/index.html",
          tiles: [{corner: "1", icon: "steps", color: "cat-coral"}, {corner: "8", icon: "layers", color: "cat-amber"}, {corner: "15", icon: "body", color: "cat-sky"}] },
        { ch: "2", title: "The chemistry of life", icon: "molecule", game: "Biomolecule Sort", formats: ["Explore", "Sort It", "Quick Quiz", "Match Pairs", "True or Myth", "Sequence"], status: "live", url: "games/biomolecule-sort/index.html",
          tiles: [{corner: "1", icon: "apple", color: "cat-amber"}, {corner: "10", icon: "drop", color: "cat-lemon"}, {corner: "20", icon: "molecule", color: "cat-coral"}] },
        { ch: "3–4", title: "Cells and genes", icon: "cell", game: "Cell City", formats: ["Explore", "Quick Quiz", "Match Pairs", "Sort It"], status: "live", url: "games/cell-city/index.html",
          tiles: [{corner: "1", icon: "dna", color: "cat-coral"}, {corner: "12", icon: "mito", color: "cat-sage"}, {corner: "7", icon: "factory", color: "cat-lemon"}] },
        { ch: "5", title: "Tissues", icon: "layers", game: "Tissue Detective", formats: ["Explore", "Sort It", "Quick Quiz", "Match Pairs", "True or Myth", "Case Files"], status: "live", url: "games/tissue-detective/index.html",
          tiles: [{corner: "1", icon: "skin", color: "cat-coral"}, {corner: "9", icon: "bone", color: "cat-amber"}, {corner: "19", icon: "muscle", color: "cat-orchid"}] },
        { ch: "6", title: "Skin", icon: "skin", game: "Skin Deep", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Case Files", "Match Pairs"], status: "live", url: "games/skin-deep/index.html",
          tiles: [{corner: "1", icon: "layers", color: "cat-peach"}, {corner: "8", icon: "skin", color: "cat-coral"}, {corner: "15", icon: "gland", color: "cat-sage"}] },
        { ch: "7–8", title: "Bones and the skeleton", icon: "bone", game: "Bone Rush", formats: ["Explore", "Quick Quiz", "Match Pairs", "Sort It"], status: "live", url: "games/bone-rush/index.html",
          tiles: [{corner: "1", icon: "skull", color: "cat-coral"}, {corner: "27", icon: "leg", color: "cat-lilac"}, {corner: "23", icon: "hand", color: "cat-mint"}] },
        { ch: "9", title: "Joints", icon: "joint", game: "Joint Venture", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Case Files"], status: "live", url: "games/joint-venture/index.html",
          tiles: [{corner: "1", icon: "skull", color: "cat-sand"}, {corner: "6", icon: "joint", color: "cat-coral"}, {corner: "14", icon: "run", color: "cat-sky"}] },
        { ch: "10–11 + Atlas B", title: "Muscles", icon: "muscle", game: "Muscle Map", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Match Pairs", "Case Files"], status: "live", url: "games/muscle-map/index.html",
          tiles: [{corner: "1", icon: "skull", color: "cat-peach"}, {corner: "9", icon: "arm", color: "cat-sage"}, {corner: "21", icon: "muscle", color: "cat-coral"}] },
        { ch: "12–15", title: "Nerves, spinal cord and brain", icon: "brain", game: "Neuron Relay", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Match Pairs", "Case Files"], status: "live", url: "games/neuron-relay/index.html",
          tiles: [{corner: "1", icon: "nerve", color: "cat-coral"}, {corner: "10", icon: "bolt", color: "cat-lemon"}, {corner: "30", icon: "brain", color: "cat-lilac"}] },
        { ch: "16", title: "The senses", icon: "eye", game: "Sense Quest", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Match Pairs", "Case Files"], status: "live", url: "games/sense-quest/index.html",
          tiles: [{corner: "1", icon: "bolt", color: "cat-amber"}, {corner: "7", icon: "eye", color: "cat-sky"}, {corner: "20", icon: "wave", color: "cat-lilac"}] },
        { ch: "17", title: "Hormones", icon: "gland", game: "Hormone Match", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/hormone-match/index.html",
          tiles: [{corner: "1", icon: "brain", color: "cat-coral"}, {corner: "12", icon: "stomach", color: "cat-sage"}, {corner: "11", icon: "zap", color: "cat-lemon"}] },
        { ch: "18–20", title: "Blood, heart and vessels", icon: "heart", game: "Heart Flow", formats: ["Explore", "Sequence", "Quick Quiz", "Match Pairs"], status: "live", url: "games/heart-flow/index.html",
          tiles: [{corner: "4", icon: "heart", color: "cat-coral"}, {corner: "7", icon: "drop", color: "cat-amber"}, {corner: "14", icon: "zap", color: "cat-lemon"}] },
        { ch: "21", title: "Immune defences", icon: "shield", game: "Immune Defence", formats: ["Explore", "Sequence", "Case Files", "Sort It", "Match Pairs"], status: "live", url: "games/immune-defence/index.html",
          tiles: [{corner: "1", icon: "shield", color: "cat-sand"}, {corner: "10", icon: "cell", color: "cat-coral"}, {corner: "21", icon: "dna", color: "cat-lilac"}] },
        { ch: "22", title: "Breathing", icon: "lungs", game: "Breath Path", formats: ["Explore", "Sequence", "Quick Quiz", "Match Pairs"], status: "live", url: "games/breath-path/index.html",
          tiles: [{corner: "1", icon: "lungs", color: "cat-sky"}, {corner: "8", icon: "lungs", color: "cat-mint"}, {corner: "9", icon: "muscle", color: "cat-coral"}] },
        { ch: "23–24", title: "Kidneys, fluids and acid-base", icon: "kidney", game: "Kidney Quest", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Match Pairs", "Case Files"], status: "live", url: "games/kidney-quest/index.html",
          tiles: [{corner: "1", icon: "kidney", color: "cat-sand"}, {corner: "8", icon: "steps", color: "cat-coral"}, {corner: "24", icon: "drop", color: "cat-sky"}] },
        { ch: "25–26", title: "Digestion and metabolism", icon: "stomach", game: "Digest-a-Meal", formats: ["Explore", "Sequence", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/digest-a-meal/index.html",
          tiles: [{corner: "3", icon: "stomach", color: "cat-amber"}, {corner: "10", icon: "gland", color: "cat-sage"}, {corner: "9", icon: "drop", color: "cat-sage"}] },
        { ch: "27–28", title: "Reproductive systems", icon: "body", game: "Anatomy ID", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Sequence", "Case Files"], status: "live", url: "games/anatomy-id/index.html",
          tiles: [{corner: "1", icon: "body", color: "cat-sky"}, {corner: "13", icon: "body", color: "cat-orchid"}, {corner: "21", icon: "gland", color: "cat-amber"}] },
        { ch: "29", title: "Growing up and ageing", icon: "baby", game: "Life Stages", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Sequence", "Case Files"], status: "live", url: "games/life-stages/index.html",
          tiles: [{corner: "1", icon: "cell", color: "cat-orchid"}, {corner: "10", icon: "baby", color: "cat-coral"}, {corner: "25", icon: "shield", color: "cat-peach"}] }
      ]
    },
    {
      id: "pharmacology", count: "10 chapters", name: "Pharmacology", color: "cat-lilac", icon: "capsule", source: "Open RN, Nursing Pharmacology (CC BY 4.0)",
      blurb: "How medicines work, how they are given safely, and the main drug families.",
      labs: [
        { id: "syringe-prep", ch: "2 + All", title: "Syringe Prep", icon: "pill", text: "Work out the dose, then draw it up to the exact line on the syringe.", status: "live", url: "games/syringe-prep/index.html" }
      ],
      chapters: [
        { ch: "1", title: "How a drug travels through the body", icon: "steps", game: "Drug Journey", formats: ["Explore", "Sequence", "Quick Quiz", "Sort It", "Match Pairs", "Exam style"], status: "live", url: "games/drug-journey/index.html",
          tiles: [{corner: "1", icon: "steps", color: "cat-sky"}, {corner: "7", icon: "zap", color: "cat-lilac"}, {corner: "10", icon: "chart", color: "cat-amber"}] },
        { ch: "2", title: "Giving medicines safely", icon: "shield", game: "Med Safety Check", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Exam style"], status: "live", url: "games/med-safety-check/index.html",
          tiles: [{corner: "1", icon: "check", color: "cat-sage"}, {corner: "3", icon: "scale", color: "cat-sage"}, {corner: "10", icon: "ban", color: "cat-coral"}] },
        { ch: "3", title: "Antibiotics and other antimicrobials", icon: "bug", game: "Bug vs Drug", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Exam style"], status: "live", url: "games/bug-vs-drug/index.html",
          tiles: [{corner: "1", icon: "shield", color: "cat-coral"}, {corner: "5", icon: "factory", color: "cat-amber"}, {corner: "12", icon: "bug", color: "cat-lilac"}] },
        { ch: "4", title: "Fight or rest: the autonomic system", icon: "nerve", game: "Fight or Rest", formats: ["Explore", "Sort It", "Match Pairs", "Exam style"], status: "live", url: "games/fight-or-rest/index.html",
          tiles: [{corner: "1", icon: "eye", color: "cat-coral"}, {corner: "4", icon: "heart", color: "cat-sage"}, {corner: "5", icon: "lungs", color: "cat-coral"}] },
        { ch: "5–9", title: "Drug families by body system", icon: "pill", game: "Drug Class Sort", formats: ["Explore", "Sort It", "Quick Quiz", "Match Pairs", "Exam style"], status: "live", url: "games/drug-class-sort/index.html",
          tiles: [{corner: "1", icon: "heart", color: "cat-coral"}, {corner: "9", icon: "lungs", color: "cat-sky"}, {corner: "18", icon: "brain", color: "cat-lilac"}] },
        { ch: "10", title: "Pain relief and muscle drugs", icon: "steps", game: "Pain Ladder", formats: ["Explore", "Quick Quiz", "Sort It", "Sequence", "Match Pairs", "True or Myth", "Case Files", "Exam style"], status: "live", url: "games/pain-ladder/index.html",
          tiles: [{corner: "1", icon: "gauge", color: "cat-sky"}, {corner: "3", icon: "capsule", color: "cat-coral"}, {corner: "6", icon: "foot", color: "cat-amber"}] },
        { ch: "All", label: "All chapters", title: "Dose calculations", icon: "scale", game: "Dose Calc", formats: ["Calculator", "Explore", "Quick Quiz", "Match Pairs"], status: "live", url: "games/dose-calc/index.html",
          tiles: [{corner: "D÷H", icon: "pill", color: "cat-lilac"}, {corner: "kg", icon: "scale", color: "cat-sage"}, {corner: "mL/h", icon: "timer", color: "cat-coral"}] }
      ]
    },
    {
      id: "nutrition", count: "17 chapters", name: "Nutrition", color: "cat-sage", icon: "apple", source: "Deen & Hark, The Complete Guide to Nutrition in Primary Care",
      blurb: "What we eat, what the body needs at each age, and how diet helps prevent and manage disease.",
      labs: [
        { id: "food-test-lab", ch: "11–12", title: "Food Test Lab", icon: "beaker", text: "Use iodine, Benedict's and biuret tests to find starch, sugar and protein in foods.", status: "live", url: "games/food-test-lab/index.html" }
      ],
      chapters: [
        { ch: "1–2", title: "Nutrition at the doctor's office", icon: "chat", game: "Clinic Basics", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Case Files", "Calculator"], status: "live", url: "games/clinic-basics/index.html",
          tiles: [{corner: "A", icon: "scale", color: "cat-sky"}, {corner: "B", icon: "drop", color: "cat-coral"}, {corner: "D", icon: "clipboard", color: "cat-sage"}] },
        { ch: "3", title: "Weight and energy balance", icon: "scale", game: "Energy Balance", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "True or Myth", "Calculator"], status: "live", url: "games/energy-balance/index.html",
          tiles: [{corner: "in", icon: "apple", color: "cat-amber"}, {corner: "out", icon: "run", color: "cat-mint"}, {corner: "kcal", icon: "scale", color: "cat-coral"}] },
        { ch: "4–6", title: "Eating well at every age", icon: "baby", game: "Life-Stage Plates", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "True or Myth", "Case Files"], status: "live", url: "games/life-stage-plates/index.html",
          tiles: [{corner: "1", icon: "baby", color: "cat-peach"}, {corner: "2", icon: "plate", color: "cat-sage"}, {corner: "3", icon: "heart", color: "cat-lilac"}] },
        { ch: "7–10", title: "Diet for heart, blood sugar and gut health", icon: "heart", game: "Diet Doctor", formats: ["Case Files", "Explore", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/diet-doctor/index.html",
          tiles: [{corner: "1", icon: "heart", color: "cat-coral"}, {corner: "12", icon: "drop", color: "cat-amber"}, {corner: "16", icon: "stomach", color: "cat-sage"}] },
        { ch: "11–12", title: "Vitamins and minerals", icon: "apple", game: "Nutrient Rush", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/nutrient-rush/index.html",
          tiles: [{corner: "5", big: "C", color: "cat-sky"}, {corner: "15", big: "Fe", color: "cat-lilac"}, {corner: "2", big: "D", color: "cat-amber"}] },
        { ch: "13–14", title: "Supplements and alternatives", icon: "question", game: "True or Myth: Supplements", formats: ["True or Myth", "Explore"], status: "live", url: "games/supplement-myths/index.html",
          tiles: [{corner: "1", icon: "drop", color: "cat-amber"}, {corner: "15", icon: "leaf", color: "cat-sage"}, {corner: "9", icon: "question", color: "cat-lilac"}] },
        { ch: "15–17", title: "Changing habits, community and culture", icon: "chat", game: "Coach Talk", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Sequence", "Case Files"], status: "live", url: "games/coach-talk/index.html",
          tiles: [{corner: "1", icon: "steps", color: "cat-mint"}, {corner: "2", icon: "chat", color: "cat-sky"}, {corner: "3", icon: "check", color: "cat-amber"}] },
        { ch: "Review", label: "Review", title: "Exam practice", icon: "book", game: "Exam Prep", formats: ["Explore", "Quick Quiz", "Sort It", "True or Myth", "Match Pairs", "Case Files"], status: "live", url: "games/exam-prep/index.html",
          tiles: [{corner: "Q", icon: "book", color: "cat-lilac"}, {corner: "✓", icon: "check", color: "cat-sage"}, {corner: "?", icon: "question", color: "cat-amber"}] }
      ]
    },
    {
      id: "wellness", count: "Coursework", name: "Health & Wellness", color: "cat-mint", icon: "sprout", source: "Coursework: HW315, HS305, statistics",
      blurb: "Health behaviour models, spotting reliable health information, and the statistics behind studies.",
      labs: [
        { id: "pulse-lab", ch: "Stats", label: "Statistics unit", title: "Pulse Lab", icon: "heart", text: "Measure a pulse at rest and after exercise, then calculate beats per minute.", status: "live", url: "games/pulse-lab/index.html" }
      ],
      chapters: [
        { ch: "HW315", label: "Health behaviour unit", title: "Models of health behaviour", icon: "steps", game: "Model Match", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Sequence"], status: "live", url: "games/model-match/index.html",
          tiles: [{corner: "1", icon: "steps", color: "cat-mint"}, {corner: "6", icon: "question", color: "cat-sky"}, {corner: "12", icon: "chat", color: "cat-amber"}] },
        { ch: "HS305", label: "Health information unit", title: "Spotting reliable health websites", icon: "search", game: "Source Detective", formats: ["True or Myth", "Sort It", "Explore"], status: "live", url: "games/source-detective/index.html",
          tiles: [{corner: "1", icon: "shield", color: "cat-sky"}, {corner: "4", icon: "search", color: "cat-sage"}, {corner: "12", icon: "scale", color: "cat-lilac"}] },
        { ch: "Stats", label: "Statistics unit", title: "Probability and averages", icon: "chart", game: "Odds On", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "True or Myth", "Case Files", "Calculator"], status: "live", url: "games/odds-on/index.html",
          tiles: [{corner: "1", icon: "steps", color: "cat-amber"}, {corner: "4", icon: "scale", color: "cat-sky"}, {corner: "6", icon: "question", color: "cat-peach"}] },
        { ch: "Next", title: "Her next course", icon: "book", game: "To be planned", formats: [], status: "soon" }
      ]
    }
  ]
};
