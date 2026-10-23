/* BioglowRX Sciences Learning — catalog of subjects, chapter groups and games.
   This one file drives the hub and every subject page.
   status: "live" (playable) · "next" (up next, shown with ★) · "soon"
   To launch a game: set its status to "live" and add  url: "games/<game-id>/index.html". */
window.BGX_CATALOG = {
  featured: {
    game: "element-rush", eyebrow: "Featured · Live in Chemistry", title: "Element Rush",
    text: "Learn all 118 elements: symbols, families, where they sit on the table and where you meet them in everyday life.",
    url: "games/element-rush/index.html", explore: "subjects/chemistry/index.html",
    tiles: [
      { corner: "26", big: "Fe", label: "Iron", color: "cat-lemon" },
      { corner: "8", big: "O", label: "Oxygen", color: "cat-sky" },
      { corner: "79", big: "Au", label: "Gold", color: "cat-lemon" },
      { corner: "10", big: "Ne", label: "Neon", color: "cat-orchid" },
      { corner: "11", big: "Na", label: "Sodium", color: "cat-coral" },
      { corner: "?", big: "?", label: "", ghost: true }
    ]
  },
  subjects: [
    {
      id: "chemistry", count: "24 chapters", name: "Chemistry", color: "cat-sky", icon: "flask", source: "Averill, Chemistry",
      blurb: "Atoms, elements, reactions and the chemistry behind everyday things.",
      chapters: [
        { ch: "1", title: "What chemistry is: units and lab safety", icon: "beaker", game: "Lab Basics", formats: ["Quick Quiz", "Match Pairs"], status: "soon" },
        { ch: "2", title: "Molecules, ions and formulas", icon: "molecule", game: "Formula Forge", formats: ["Build It"], status: "soon" },
        { ch: "3", title: "Chemical reactions", icon: "flame", game: "Balance It", formats: ["Build It"], status: "soon" },
        { ch: "4", title: "Reactions in water", icon: "drop", game: "Will It Dissolve?", formats: ["Sort It"], status: "soon" },
        { ch: "5", title: "Energy in reactions", icon: "flame", game: "Hot or Cold?", formats: ["Sort It", "Quick Quiz"], status: "soon" },
        { ch: "6", title: "Inside the atom", icon: "atom", game: "Atom Builder", formats: ["Build It"], status: "soon" },
        { ch: "7", title: "The periodic table", icon: "grid", game: "Element Rush", formats: ["Explore", "Quick Quiz", "Find It", "Sort It"], status: "live", url: "games/element-rush/index.html",
          tiles: [{ corner: "26", big: "Fe", color: "cat-lemon" }, { corner: "8", big: "O", color: "cat-sky" }, { corner: "10", big: "Ne", color: "cat-orchid" }] },
        { ch: "8–9", title: "How atoms bond, and molecule shapes", icon: "molecule", game: "Bond Match", formats: ["Match Pairs", "Sort It"], status: "soon" },
        { ch: "10–12", title: "Gases, liquids and solids", icon: "cube", game: "States of Matter", formats: ["Sort It", "Calculator"], status: "soon" },
        { ch: "13", title: "Solutions and concentration", icon: "beaker", game: "Mix Master", formats: ["Calculator"], status: "soon" },
        { ch: "14–15", title: "Reaction speed and balance", icon: "timer", game: "Faster or Slower?", formats: ["Quick Quiz"], status: "soon" },
        { ch: "16–17", title: "Acids, bases and the pH scale", icon: "ph", game: "pH Patrol", formats: ["Find It", "Sort It"], status: "next" },
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
      chapters: [
        { ch: "1 + Atlas A", title: "Finding your way around the body", icon: "body", game: "Body Map", formats: ["Find It"], status: "soon" },
        { ch: "2", title: "The chemistry of life", icon: "molecule", game: "Biomolecule Sort", formats: ["Sort It"], status: "soon" },
        { ch: "3–4", title: "Cells and genes", icon: "cell", game: "Cell City", formats: ["Find It", "Match Pairs"], status: "soon" },
        { ch: "5", title: "Tissues", icon: "layers", game: "Tissue Detective", formats: ["Sort It"], status: "soon" },
        { ch: "6", title: "Skin", icon: "skin", game: "Skin Deep", formats: ["Find It"], status: "soon" },
        { ch: "7–8", title: "Bones and the skeleton", icon: "bone", game: "Bone Rush", formats: ["Explore", "Match Pairs", "Find It"], status: "next" },
        { ch: "9", title: "Joints", icon: "joint", game: "Joint Venture", formats: ["Sort It", "Match Pairs"], status: "soon" },
        { ch: "10–11 + Atlas B", title: "Muscles", icon: "muscle", game: "Muscle Map", formats: ["Find It", "Match Pairs"], status: "soon" },
        { ch: "12–15", title: "Nerves, spinal cord and brain", icon: "brain", game: "Neuron Relay", formats: ["Sequence", "Find It"], status: "soon" },
        { ch: "16", title: "The senses", icon: "eye", game: "Sense Quest", formats: ["Find It"], status: "soon" },
        { ch: "17", title: "Hormones", icon: "gland", game: "Hormone Match", formats: ["Match Pairs", "Case Files"], status: "soon" },
        { ch: "18–20", title: "Blood, heart and vessels", icon: "heart", game: "Heart Flow", formats: ["Sequence", "Find It"], status: "soon" },
        { ch: "21", title: "Immune defences", icon: "shield", game: "Immune Defence", formats: ["Sequence", "Sort It"], status: "soon" },
        { ch: "22", title: "Breathing", icon: "lungs", game: "Breath Path", formats: ["Sequence"], status: "soon" },
        { ch: "23–24", title: "Kidneys, fluids and acid-base", icon: "kidney", game: "Kidney Quest", formats: ["Sequence", "Case Files"], status: "soon" },
        { ch: "25–26", title: "Digestion and metabolism", icon: "stomach", game: "Digest-a-Meal", formats: ["Sequence"], status: "soon" },
        { ch: "27–28", title: "Reproductive systems", icon: "body", game: "Anatomy ID", formats: ["Find It", "Quick Quiz"], status: "soon" },
        { ch: "29", title: "Growing up and ageing", icon: "baby", game: "Life Stages", formats: ["Sequence"], status: "soon" }
      ]
    },
    {
      id: "pharmacology", count: "10 chapters", name: "Pharmacology", color: "cat-lilac", icon: "capsule", source: "Open RN, Nursing Pharmacology (CC BY 4.0)",
      blurb: "How medicines work, how they are given safely, and the main drug families.",
      chapters: [
        { ch: "1", title: "How a drug travels through the body", icon: "steps", game: "Drug Journey", formats: ["Sequence"], status: "soon" },
        { ch: "2", title: "Giving medicines safely", icon: "shield", game: "Med Safety Check", formats: ["Case Files"], status: "soon" },
        { ch: "3", title: "Antibiotics and other antimicrobials", icon: "bug", game: "Bug vs Drug", formats: ["Match Pairs"], status: "soon" },
        { ch: "4", title: "Fight or rest: the autonomic system", icon: "nerve", game: "Fight or Rest", formats: ["Sort It"], status: "soon" },
        { ch: "5–9", title: "Drug families by body system", icon: "pill", game: "Drug Class Sort", formats: ["Sort It", "Match Pairs"], status: "next" },
        { ch: "10", title: "Pain relief and muscle drugs", icon: "steps", game: "Pain Ladder", formats: ["Sequence", "Case Files"], status: "soon" },
        { ch: "All", title: "Dose calculations", icon: "scale", game: "Dose Calc", formats: ["Calculator"], status: "soon" }
      ]
    },
    {
      id: "nutrition", count: "17 chapters", name: "Nutrition", color: "cat-sage", icon: "apple", source: "Deen & Hark, The Complete Guide to Nutrition in Primary Care",
      blurb: "What we eat, what the body needs at each age, and how diet helps prevent and manage disease.",
      chapters: [
        { ch: "1–2", title: "Nutrition at the doctor's office", icon: "chat", game: "Clinic Basics", formats: ["Quick Quiz"], status: "soon" },
        { ch: "3", title: "Weight and energy balance", icon: "scale", game: "Energy Balance", formats: ["Calculator"], status: "soon" },
        { ch: "4–6", title: "Eating well at every age", icon: "baby", game: "Life-Stage Plates", formats: ["Sort It", "Case Files"], status: "soon" },
        { ch: "7–10", title: "Diet for heart, blood sugar and gut health", icon: "heart", game: "Diet Doctor", formats: ["Case Files"], status: "soon" },
        { ch: "11–12", title: "Vitamins and minerals", icon: "apple", game: "Nutrient Rush", formats: ["Explore", "Match Pairs", "Quick Quiz"], status: "next" },
        { ch: "13–14", title: "Supplements and alternatives", icon: "question", game: "True or Myth: Supplements", formats: ["True or Myth"], status: "soon" },
        { ch: "15–17", title: "Changing habits, community and culture", icon: "chat", game: "Coach Talk", formats: ["Case Files"], status: "soon" },
        { ch: "Review", title: "Exam practice", icon: "book", game: "Exam Prep", formats: ["Quick Quiz"], status: "soon" }
      ]
    },
    {
      id: "wellness", count: "Coursework", name: "Health & Wellness", color: "cat-mint", icon: "sprout", source: "Coursework: HW315, HS305, statistics",
      blurb: "Health behaviour models, spotting reliable health information, and the statistics behind studies.",
      chapters: [
        { ch: "HW315", title: "Models of health behaviour", icon: "steps", game: "Model Match", formats: ["Match Pairs", "Sequence"], status: "soon" },
        { ch: "HS305", title: "Spotting reliable health websites", icon: "search", game: "Source Detective", formats: ["True or Myth"], status: "soon" },
        { ch: "Stats", title: "Probability and averages", icon: "chart", game: "Odds On", formats: ["Calculator", "Sort It"], status: "soon" },
        { ch: "Next", title: "Her next course", icon: "book", game: "To be planned", formats: [], status: "soon" }
      ]
    }
  ]
};
