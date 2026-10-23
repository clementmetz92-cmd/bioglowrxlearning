/* BioglowRX Sciences Learning — catalog of subjects, chapter groups and games.
   This one file drives the hub and every subject page.
   status: "live" (playable) · "next" (up next, shown with ★) · "soon"
   To launch a game: set its status to "live" and add  url: "games/<game-id>/index.html". */
window.BGX_CATALOG = {
  featured: {
    game: "microscope-lab", eyebrow: "New · 5 hands-on labs, one per subject", title: "Microscope Lab",
    text: "Clip the slide, focus from 4× to 40× and name the tissue. Also new: Syringe Prep, Food Test Lab and Pulse Lab, plus a clearer Titration Lab with hints. Every game now has study notes and pictures.",
    url: "games/microscope-lab/index.html", explore: "subjects/anatomy/index.html",
    tiles: [
      { corner: "1", icon: "search", label: "Focus", color: "cat-peach" },
      { corner: "2", icon: "cell", label: "Tissue", color: "cat-lilac" },
      { corner: "3", icon: "lab", label: "Lab", color: "cat-sky" }
    ]
  },
  subjects: [
    {
      id: "chemistry", count: "24 chapters", name: "Chemistry", color: "cat-sky", icon: "flask", source: "Averill, Chemistry",
      blurb: "Atoms, elements, reactions and the chemistry behind everyday things.",
      labs: [
        { id: "titration-lab", ch: "16–17", title: "Titration Lab", icon: "flask", text: "Hold to pour from the burette, swirl the flask and stop at the exact pink endpoint. Level 3 adds the concentration calculation.", status: "live", url: "games/titration-lab/index.html" }
      ],
      chapters: [
        { ch: "1", title: "What chemistry is: units and lab safety", icon: "beaker", game: "Lab Basics", formats: ["Quick Quiz", "Match Pairs"], status: "soon" },
        { ch: "2", title: "Molecules, ions and formulas", icon: "molecule", game: "Formula Forge", formats: ["Explore", "Quick Quiz", "Match Pairs", "Sort It"], status: "live", url: "games/formula-forge/index.html",
          tiles: [{corner: "1", big: "H₂O", color: "cat-mint"}, {corner: "9", big: "NaCl", color: "cat-coral"}, {corner: "18", big: "C₆H₁₂O₆", color: "cat-sage"}] },
        { ch: "3", title: "Chemical reactions", icon: "flame", game: "Balance It", formats: ["Build It"], status: "soon" },
        { ch: "4", title: "Reactions in water", icon: "drop", game: "Will It Dissolve?", formats: ["Sort It"], status: "soon" },
        { ch: "5", title: "Energy in reactions", icon: "flame", game: "Hot or Cold?", formats: ["Sort It", "Quick Quiz"], status: "soon" },
        { ch: "6", title: "Inside the atom", icon: "atom", game: "Atom Builder", formats: ["Build It", "Quick Quiz", "Explore"], status: "live", url: "games/atom-builder/index.html",
          tiles: [{corner: "6", big: "C", color: "cat-sky"}, {corner: "8", big: "O", color: "cat-sky"}, {corner: "11", big: "Na", color: "cat-coral"}] },
        { ch: "7", title: "The periodic table", icon: "grid", game: "Element Rush", formats: ["Explore", "Quick Quiz", "Find It", "Sort It"], status: "live", url: "games/element-rush/index.html",
          tiles: [{ corner: "26", big: "Fe", color: "cat-lemon" }, { corner: "8", big: "O", color: "cat-sky" }, { corner: "10", big: "Ne", color: "cat-orchid" }] },
        { ch: "8–9", title: "How atoms bond, and molecule shapes", icon: "molecule", game: "Bond Match", formats: ["Match Pairs", "Sort It"], status: "soon" },
        { ch: "10–12", title: "Gases, liquids and solids", icon: "cube", game: "States of Matter", formats: ["Sort It", "Calculator"], status: "next" },
        { ch: "13", title: "Solutions and concentration", icon: "beaker", game: "Mix Master", formats: ["Calculator"], status: "soon" },
        { ch: "14–15", title: "Reaction speed and balance", icon: "timer", game: "Faster or Slower?", formats: ["Quick Quiz"], status: "soon" },
        { ch: "16–17", title: "Acids, bases and the pH scale", icon: "ph", game: "pH Patrol", formats: ["Explore", "Sort It", "Quick Quiz", "Match Pairs"], status: "live", url: "games/ph-patrol/index.html",
          tiles: [{corner: "3", big: "2", color: "cat-coral"}, {corner: "11", big: "7", color: "cat-sage"}, {corner: "17", big: "12.5", color: "cat-lilac"}] },
        { ch: "18", title: "Will a reaction happen?", icon: "gauge", game: "Will It Happen?", formats: ["Quick Quiz"], status: "soon" },
        { ch: "19", title: "Electricity from chemistry", icon: "battery", game: "Battery Lab", formats: ["Sequence"], status: "soon" },
        { ch: "20", title: "Nuclear chemistry", icon: "radiation", game: "Half-Life Hunt", formats: ["Calculator"], status: "soon" },
        { ch: "21–23", title: "The element blocks up close", icon: "grid", game: "Element Rush decks", formats: ["Explore"], status: "soon" },
        { ch: "24", title: "Carbon compounds", icon: "hexagon", game: "Functional Group Hunt", formats: ["Match Pairs", "Find It"], status: "soon" }
      ]
    },
    {
      id: "anatomy", count: "29 chapters", name: "Anatomy & Physiology", color: "cat-peach", icon: "body", source: "Saladin, Anatomy & Physiology",
      blurb: "How the human body is built and how each system keeps you alive.",
      labs: [
        { id: "microscope-lab", ch: "3–5", title: "Microscope Lab", icon: "search", text: "Focus the microscope, then identify the cells and tissues you see.", status: "live", url: "games/microscope-lab/index.html" }
      ],
      chapters: [
        { ch: "1 + Atlas A", title: "Finding your way around the body", icon: "body", game: "Body Map", formats: ["Find It"], status: "soon" },
        { ch: "2", title: "The chemistry of life", icon: "molecule", game: "Biomolecule Sort", formats: ["Sort It"], status: "soon" },
        { ch: "3–4", title: "Cells and genes", icon: "cell", game: "Cell City", formats: ["Explore", "Quick Quiz", "Match Pairs", "Sort It"], status: "live", url: "games/cell-city/index.html",
          tiles: [{corner: "1", icon: "dna", color: "cat-coral"}, {corner: "12", icon: "mito", color: "cat-sage"}, {corner: "7", icon: "factory", color: "cat-lemon"}] },
        { ch: "5", title: "Tissues", icon: "layers", game: "Tissue Detective", formats: ["Sort It"], status: "soon" },
        { ch: "6", title: "Skin", icon: "skin", game: "Skin Deep", formats: ["Find It"], status: "soon" },
        { ch: "7–8", title: "Bones and the skeleton", icon: "bone", game: "Bone Rush", formats: ["Explore", "Quick Quiz", "Match Pairs", "Sort It"], status: "live", url: "games/bone-rush/index.html",
          tiles: [{corner: "1", icon: "skull", color: "cat-coral"}, {corner: "27", icon: "leg", color: "cat-lilac"}, {corner: "23", icon: "hand", color: "cat-mint"}] },
        { ch: "9", title: "Joints", icon: "joint", game: "Joint Venture", formats: ["Sort It", "Match Pairs"], status: "soon" },
        { ch: "10–11 + Atlas B", title: "Muscles", icon: "muscle", game: "Muscle Map", formats: ["Find It", "Match Pairs"], status: "soon" },
        { ch: "12–15", title: "Nerves, spinal cord and brain", icon: "brain", game: "Neuron Relay", formats: ["Sequence", "Find It"], status: "soon" },
        { ch: "16", title: "The senses", icon: "eye", game: "Sense Quest", formats: ["Find It"], status: "soon" },
        { ch: "17", title: "Hormones", icon: "gland", game: "Hormone Match", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/hormone-match/index.html",
          tiles: [{corner: "1", icon: "brain", color: "cat-coral"}, {corner: "12", icon: "stomach", color: "cat-sage"}, {corner: "11", icon: "zap", color: "cat-lemon"}] },
        { ch: "18–20", title: "Blood, heart and vessels", icon: "heart", game: "Heart Flow", formats: ["Explore", "Sequence", "Quick Quiz", "Match Pairs"], status: "live", url: "games/heart-flow/index.html",
          tiles: [{corner: "4", icon: "heart", color: "cat-coral"}, {corner: "7", icon: "drop", color: "cat-amber"}, {corner: "14", icon: "zap", color: "cat-lemon"}] },
        { ch: "21", title: "Immune defences", icon: "shield", game: "Immune Defence", formats: ["Sequence", "Sort It"], status: "next" },
        { ch: "22", title: "Breathing", icon: "lungs", game: "Breath Path", formats: ["Explore", "Sequence", "Quick Quiz", "Match Pairs"], status: "live", url: "games/breath-path/index.html",
          tiles: [{corner: "1", icon: "lungs", color: "cat-sky"}, {corner: "8", icon: "lungs", color: "cat-mint"}, {corner: "9", icon: "muscle", color: "cat-coral"}] },
        { ch: "23–24", title: "Kidneys, fluids and acid-base", icon: "kidney", game: "Kidney Quest", formats: ["Sequence", "Case Files"], status: "soon" },
        { ch: "25–26", title: "Digestion and metabolism", icon: "stomach", game: "Digest-a-Meal", formats: ["Explore", "Sequence", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/digest-a-meal/index.html",
          tiles: [{corner: "3", icon: "stomach", color: "cat-amber"}, {corner: "10", icon: "gland", color: "cat-sage"}, {corner: "9", icon: "drop", color: "cat-sage"}] },
        { ch: "27–28", title: "Reproductive systems", icon: "body", game: "Anatomy ID", formats: ["Find It", "Quick Quiz"], status: "soon" },
        { ch: "29", title: "Growing up and ageing", icon: "baby", game: "Life Stages", formats: ["Sequence"], status: "next" }
      ]
    },
    {
      id: "pharmacology", count: "10 chapters", name: "Pharmacology", color: "cat-lilac", icon: "capsule", source: "Open RN, Nursing Pharmacology (CC BY 4.0)",
      blurb: "How medicines work, how they are given safely, and the main drug families.",
      labs: [
        { id: "syringe-prep", ch: "2 + All", title: "Syringe Prep", icon: "pill", text: "Work out the dose, then draw it up to the exact line on the syringe.", status: "live", url: "games/syringe-prep/index.html" }
      ],
      chapters: [
        { ch: "1", title: "How a drug travels through the body", icon: "steps", game: "Drug Journey", formats: ["Explore", "Sequence", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/drug-journey/index.html",
          tiles: [{corner: "1", icon: "steps", color: "cat-sky"}, {corner: "7", icon: "zap", color: "cat-lilac"}, {corner: "10", icon: "chart", color: "cat-amber"}] },
        { ch: "2", title: "Giving medicines safely", icon: "shield", game: "Med Safety Check", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/med-safety-check/index.html",
          tiles: [{corner: "1", icon: "check", color: "cat-sage"}, {corner: "3", icon: "scale", color: "cat-sage"}, {corner: "10", icon: "ban", color: "cat-coral"}] },
        { ch: "3", title: "Antibiotics and other antimicrobials", icon: "bug", game: "Bug vs Drug", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/bug-vs-drug/index.html",
          tiles: [{corner: "1", icon: "shield", color: "cat-coral"}, {corner: "5", icon: "factory", color: "cat-amber"}, {corner: "12", icon: "bug", color: "cat-lilac"}] },
        { ch: "4", title: "Fight or rest: the autonomic system", icon: "nerve", game: "Fight or Rest", formats: ["Explore", "Sort It", "Match Pairs"], status: "live", url: "games/fight-or-rest/index.html",
          tiles: [{corner: "1", icon: "eye", color: "cat-coral"}, {corner: "4", icon: "heart", color: "cat-sage"}, {corner: "5", icon: "lungs", color: "cat-coral"}] },
        { ch: "5–9", title: "Drug families by body system", icon: "pill", game: "Drug Class Sort", formats: ["Explore", "Sort It", "Quick Quiz", "Match Pairs"], status: "live", url: "games/drug-class-sort/index.html",
          tiles: [{corner: "1", icon: "heart", color: "cat-coral"}, {corner: "9", icon: "lungs", color: "cat-sky"}, {corner: "18", icon: "brain", color: "cat-lilac"}] },
        { ch: "10", title: "Pain relief and muscle drugs", icon: "steps", game: "Pain Ladder", formats: ["Sequence", "Case Files"], status: "soon" },
        { ch: "All", title: "Dose calculations", icon: "scale", game: "Dose Calc", formats: ["Calculator"], status: "next" }
      ]
    },
    {
      id: "nutrition", count: "17 chapters", name: "Nutrition", color: "cat-sage", icon: "apple", source: "Deen & Hark, The Complete Guide to Nutrition in Primary Care",
      blurb: "What we eat, what the body needs at each age, and how diet helps prevent and manage disease.",
      labs: [
        { id: "food-test-lab", ch: "11–12", title: "Food Test Lab", icon: "beaker", text: "Use iodine, Benedict's and biuret tests to find starch, sugar and protein in foods.", status: "live", url: "games/food-test-lab/index.html" }
      ],
      chapters: [
        { ch: "1–2", title: "Nutrition at the doctor's office", icon: "chat", game: "Clinic Basics", formats: ["Quick Quiz"], status: "soon" },
        { ch: "3", title: "Weight and energy balance", icon: "scale", game: "Energy Balance", formats: ["Calculator"], status: "soon" },
        { ch: "4–6", title: "Eating well at every age", icon: "baby", game: "Life-Stage Plates", formats: ["Sort It", "Case Files"], status: "soon" },
        { ch: "7–10", title: "Diet for heart, blood sugar and gut health", icon: "heart", game: "Diet Doctor", formats: ["Case Files"], status: "next" },
        { ch: "11–12", title: "Vitamins and minerals", icon: "apple", game: "Nutrient Rush", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs"], status: "live", url: "games/nutrient-rush/index.html",
          tiles: [{corner: "5", big: "C", color: "cat-sky"}, {corner: "15", big: "Fe", color: "cat-lilac"}, {corner: "2", big: "D", color: "cat-amber"}] },
        { ch: "13–14", title: "Supplements and alternatives", icon: "question", game: "True or Myth: Supplements", formats: ["True or Myth", "Explore"], status: "live", url: "games/supplement-myths/index.html",
          tiles: [{corner: "1", icon: "drop", color: "cat-amber"}, {corner: "15", icon: "leaf", color: "cat-sage"}, {corner: "9", icon: "question", color: "cat-lilac"}] },
        { ch: "15–17", title: "Changing habits, community and culture", icon: "chat", game: "Coach Talk", formats: ["Case Files"], status: "soon" },
        { ch: "Review", title: "Exam practice", icon: "book", game: "Exam Prep", formats: ["Quick Quiz"], status: "soon" }
      ]
    },
    {
      id: "wellness", count: "Coursework", name: "Health & Wellness", color: "cat-mint", icon: "sprout", source: "Coursework: HW315, HS305, statistics",
      blurb: "Health behaviour models, spotting reliable health information, and the statistics behind studies.",
      labs: [
        { id: "pulse-lab", ch: "Stats", title: "Pulse Lab", icon: "heart", text: "Measure a pulse at rest and after exercise, then calculate beats per minute.", status: "live", url: "games/pulse-lab/index.html" }
      ],
      chapters: [
        { ch: "HW315", title: "Models of health behaviour", icon: "steps", game: "Model Match", formats: ["Explore", "Quick Quiz", "Sort It", "Match Pairs", "Sequence"], status: "live", url: "games/model-match/index.html",
          tiles: [{corner: "1", icon: "steps", color: "cat-mint"}, {corner: "6", icon: "question", color: "cat-sky"}, {corner: "12", icon: "chat", color: "cat-amber"}] },
        { ch: "HS305", title: "Spotting reliable health websites", icon: "search", game: "Source Detective", formats: ["True or Myth", "Sort It", "Explore"], status: "live", url: "games/source-detective/index.html",
          tiles: [{corner: "1", icon: "shield", color: "cat-sky"}, {corner: "4", icon: "search", color: "cat-sage"}, {corner: "12", icon: "scale", color: "cat-lilac"}] },
        { ch: "Stats", title: "Probability and averages", icon: "chart", game: "Odds On", formats: ["Calculator", "Sort It"], status: "soon" },
        { ch: "Next", title: "Her next course", icon: "book", game: "To be planned", formats: [], status: "soon" }
      ]
    }
  ]
};
