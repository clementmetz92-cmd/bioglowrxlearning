/* Cell City — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "cell-city",
"title": "Cell City",
"subject": "anatomy",
"subjectName": "Anatomy & Physiology",
"chapter": "3–4",
"tagline": "Every cell is a busy city: learn who does what",
"itemNoun": "cell part",
"categories": [
{
"id": "control",
"name": "Control centre",
"color": "cat-coral",
"icon": "dna"
},
{
"id": "border",
"name": "Borders and gates",
"color": "cat-amber",
"icon": "shield"
},
{
"id": "factory",
"name": "Factories and post",
"color": "cat-lemon",
"icon": "factory"
},
{
"id": "power",
"name": "Power",
"color": "cat-sage",
"icon": "mito"
},
{
"id": "cleanup",
"name": "Clean-up crew",
"color": "cat-mint",
"icon": "recycle"
},
{
"id": "frame",
"name": "Framework and movement",
"color": "cat-sky",
"icon": "brick"
}
],
"categoryLabel": "City role",
"hint": "Each part of the cell has a job, like a building in a city. Explore first, then play.",
"tile": {
"big": "@icon",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{job}"
],
"detail": [
{
"label": "City role",
"field": "{category}"
},
{
"label": "Job",
"field": "{job}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore the cell",
"desc": "Tap any part to see its job and its city twin.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "job",
"format": "quiz",
"title": "Who does this job?",
"desc": "Read the job, pick the cell part.",
"icon": "?",
"color": "cat-sky",
"prompt": "Which part of the cell does this?",
"show": "job",
"showAs": "text",
"answer": "name"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each part with its job.",
"icon": "⇄",
"color": "cat-mint",
"clue": "job",
"clueLabel": "Job"
},
{
"id": "role",
"format": "sortit",
"title": "City roles",
"desc": "Sort each part into its role in the city.",
"icon": "⌖",
"color": "cat-lemon",
"prompt": "What is its role in the cell city?"
}
],
"items": [
{
"name": "Nucleus",
"cat": "control",
"job": "Holds the DNA and controls the cell",
"summary": "The cell's control centre, wrapped in a double membrane, holding the DNA instructions.",
"life": "City hall: it keeps the plans and decides what gets built.",
"icon": "anat1-nucleus",
"num": 1,
"spot": "nucleus",
"facts": [
"Wrapped in a double membrane, the nuclear envelope, with pores for RNA to exit.",
"Contains the chromatin (DNA) and one or more nucleoli.",
"Usually one per cell; skeletal muscle cells have many, mature red blood cells none."
]
},
{
"name": "Nucleolus",
"cat": "control",
"job": "Makes the parts of ribosomes",
"summary": "A dense spot inside the nucleus where ribosome parts are made.",
"life": "The city's machine shop, building the machines that build everything else.",
"icon": "anat1-nucleolus",
"num": 2,
"spot": "nucleolus",
"facts": [
"Sits inside the nucleus and has no membrane of its own.",
"Makes ribosomal RNA and assembles ribosome subunits, which then leave through nuclear pores.",
"Not the nucleus itself: it is a small dense spot within it."
]
},
{
"name": "Chromatin",
"cat": "control",
"job": "Packs DNA so it fits inside the nucleus",
"summary": "DNA packed around proteins; it coils into chromosomes when a cell divides.",
"life": "The city archive: every blueprint, filed and folded away.",
"icon": "anat1-chromatin",
"num": 3,
"spot": "chromatin",
"facts": [
"DNA wound around proteins called histones, like thread on spools.",
"Loose most of the time so genes can be read; coils into chromosomes when the cell divides.",
"It is the material inside the nucleus, not a separate organelle."
]
},
{
"name": "Plasma membrane",
"cat": "border",
"job": "Controls what enters and leaves the cell",
"summary": "A thin, flexible double layer of fats and proteins around the whole cell.",
"life": "The city wall with guarded gates: some things pass freely, others need a pass.",
"icon": "anat1-plasma-membrane",
"num": 4,
"spot": "membrane",
"facts": [
"A phospholipid bilayer with proteins and cholesterol embedded in it.",
"Selectively permeable: small fat-soluble molecules pass freely; ions need channels or pumps.",
"Forms the outer boundary of the whole cell, not just one organelle."
]
},
{
"name": "Microvilli",
"cat": "border",
"job": "Increase surface area for absorption",
"summary": "Tiny finger-like folds of the membrane on cells that absorb, such as in the gut.",
"life": "Extra loading docks along the wall so more deliveries come in at once.",
"icon": "anat1-microvilli",
"num": 5,
"spot": "microvilli",
"facts": [
"Finger-like extensions of the plasma membrane on absorbing cells, such as gut and kidney lining.",
"They multiply surface area for absorption but do not move on their own.",
"Do not confuse with cilia: cilia are longer and beat; microvilli are short and still."
]
},
{
"name": "Cilia",
"cat": "frame",
"job": "Beat together to sweep things along the surface",
"summary": "Short hair-like structures that wave in rhythm, like in the airways.",
"life": "Street sweepers that push mucus and dust out of the city.",
"icon": "anat1-cilia",
"num": 6,
"spot": "cilia",
"facts": [
"Hair-like projections supported by microtubules that beat in coordinated waves.",
"In the airways they sweep mucus and trapped dust up towards the throat.",
"Cilia move things; microvilli absorb. Sperm use a single long flagellum instead."
]
},
{
"name": "Ribosome",
"cat": "factory",
"job": "Builds proteins",
"summary": "Tiny machines, free or on the rough ER, that read instructions and link amino acids into proteins.",
"life": "Workers on the factory floor, assembling products from a recipe.",
"icon": "anat1-ribosome",
"num": 7,
"spot": "ribosome",
"facts": [
"Made of RNA and protein, in two subunits; not wrapped in a membrane.",
"Reads messenger RNA and joins amino acids into a protein chain.",
"Free ribosomes make proteins for the cytosol; those on rough ER make proteins for export."
]
},
{
"name": "Rough ER",
"cat": "factory",
"job": "Makes proteins for export and membranes",
"summary": "Folded membranes studded with ribosomes, making proteins to send out or build membranes.",
"life": "The main factory hall, with workers lined up along the conveyor.",
"icon": "anat1-rough-er",
"num": 8,
"spot": "rough-er",
"facts": [
"A network of flattened membrane sacs continuous with the nuclear envelope.",
"Called 'rough' because ribosomes stud its surface.",
"Folds new proteins and sends them on to the Golgi in vesicles."
]
},
{
"name": "Smooth ER",
"cat": "factory",
"job": "Makes lipids and detoxifies",
"summary": "Folded membranes without ribosomes that make fats and break down some drugs and toxins.",
"life": "The chemical plant: it makes oils and treats waste water.",
"icon": "anat1-smooth-er",
"num": 9,
"spot": "smooth-er",
"facts": [
"Membrane tubes with no ribosomes, so it does not make proteins.",
"Makes lipids such as phospholipids and steroid hormones.",
"Detoxifies drugs and alcohol; stores calcium in muscle cells."
]
},
{
"name": "Golgi apparatus",
"cat": "factory",
"job": "Sorts, modifies and packages proteins",
"summary": "Stacks of flattened sacs that sort, label and package proteins into vesicles.",
"life": "The post office: it wraps, labels and sends parcels out.",
"icon": "anat1-golgi",
"num": 10,
"spot": "golgi",
"facts": [
"A stack of flattened sacs, usually near the nucleus.",
"Receives proteins from the rough ER, modifies them (e.g. adds sugars) and sorts them.",
"Packages products into vesicles; it modifies proteins but does not build them."
]
},
{
"name": "Vesicles",
"cat": "factory",
"job": "Carry materials around and out of the cell",
"summary": "Small membrane bubbles that carry cargo inside the cell or release it outside.",
"life": "Delivery vans driving parcels across the city.",
"icon": "anat1-vesicles",
"num": 11,
"spot": "vesicles",
"facts": [
"Small membrane bubbles that bud off the ER or Golgi.",
"Release cargo outside by fusing with the plasma membrane (exocytosis).",
"Lysosomes form from a special type of Golgi vesicle."
]
},
{
"name": "Mitochondrion",
"cat": "power",
"job": "Makes ATP, the cell's energy",
"summary": "A bean-shaped organelle with folded inner membranes that turns food into usable energy (ATP).",
"life": "The power station: it burns fuel and keeps the lights on.",
"icon": "mito",
"num": 12,
"spot": "mitochondrion",
"facts": [
"Double membrane; the folded inner membrane (cristae) holds the ATP-making enzymes.",
"Uses oxygen in aerobic respiration to make most of the cell's ATP.",
"Has its own DNA, passed down from the mother."
]
},
{
"name": "Lysosome",
"cat": "cleanup",
"job": "Breaks down waste and worn-out parts",
"summary": "A small sac of digestive enzymes that breaks down waste, germs and old organelles.",
"life": "The recycling centre: it breaks old things down so the parts can be reused.",
"icon": "anat1-lysosome",
"num": 13,
"spot": "lysosome",
"facts": [
"A membrane sac of digestive enzymes that work best in acid.",
"Digests bacteria, debris and worn-out organelles (autophagy) so parts can be reused.",
"General recycler; the peroxisome handles fatty acids and hydrogen peroxide instead."
]
},
{
"name": "Peroxisome",
"cat": "cleanup",
"job": "Breaks down fatty acids and hydrogen peroxide",
"summary": "A small sac of enzymes that neutralises toxins, including hydrogen peroxide.",
"life": "The hazardous waste team, making dangerous chemicals safe.",
"icon": "anat1-peroxisome",
"num": 14,
"spot": "peroxisome",
"facts": [
"Membrane sac of oxidising enzymes; especially common in liver and kidney cells.",
"Breaks down fatty acids and toxins like alcohol, producing hydrogen peroxide.",
"Its enzyme catalase splits hydrogen peroxide into water and oxygen."
]
},
{
"name": "Cytoskeleton",
"cat": "frame",
"job": "Gives the cell its shape and moves things inside",
"summary": "A network of protein fibres and tubes that supports the cell and acts as tracks.",
"life": "The city's roads and steel frames: buildings stand on it and traffic moves along it.",
"icon": "anat1-cytoskeleton",
"num": 15,
"spot": "cytoskeleton",
"facts": [
"Made of three fibre types: microfilaments, intermediate filaments and microtubules.",
"Supports cell shape and anchors organelles.",
"Microtubules act as tracks along which vesicles and organelles are moved."
]
},
{
"name": "Centrioles",
"cat": "frame",
"job": "Organise the fibres that pull chromosomes apart",
"summary": "A pair of tube bundles that help organise cell division.",
"life": "The site managers who set up the cranes when the city splits in two.",
"icon": "anat1-centrioles",
"num": 16,
"spot": "centrioles",
"facts": [
"A pair of short cylinders of microtubules, set at right angles near the nucleus.",
"Organise the spindle fibres that pull chromosomes apart during division.",
"Also form the bases of cilia and flagella."
]
},
{
"name": "Cytoplasm",
"cat": "frame",
"job": "Jelly-like fluid where the organelles sit",
"summary": "The fluid (cytosol) and everything suspended in it between the membrane and nucleus.",
"life": "The air and streets of the city: everything happens inside it.",
"icon": "anat1-cytoplasm",
"num": 17,
"spot": "cytoplasm",
"facts": [
"Everything between the plasma membrane and the nuclear envelope.",
"Its fluid part is the cytosol: water with dissolved salts, sugars and proteins.",
"Many reactions, including the first stage of glucose breakdown (glycolysis), happen here."
]
}
],
"diagram": "cell",
"diagramCaption": "Where it is in the cell",
"notes": {
"intro": "A human cell is like a small city: a border controls traffic, a control centre holds the plans, factories make products, a post office ships them, power stations supply energy and a clean-up crew deals with waste. Each organelle (a 'little organ' inside the cell) has one main job, and the quizzes ask you to match the job to the part. Many parts work as a production line: DNA in the nucleus gives the recipe, ribosomes build the protein, the rough ER folds it, the Golgi packs it and vesicles deliver it. If you know that line, most of the factory questions answer themselves.",
"sections": [
{
"cat": "control",
"title": "Control centre",
"about": "The nucleus is the largest organelle and holds almost all the cell's DNA, wrapped in a double membrane called the nuclear envelope with pores that let messages out. Inside it, DNA is not loose: it is wound around proteins as chromatin, which tightens into visible chromosomes only when the cell divides. The nucleolus is a dark, dense spot inside the nucleus with no membrane of its own, where the pieces of ribosomes are made. So the three differ in scale: nucleus = the whole control centre, chromatin = the packed DNA itself, nucleolus = the ribosome workshop within.",
"points": [
"Nucleus = holds DNA and runs the cell. Chromatin = DNA packed with proteins. Nucleolus = makes ribosome parts.",
"Chromatin coils into chromosomes during cell division.",
"Mature red blood cells have no nucleus."
],
"tip": "Nucleolus sounds like 'nucleus-little': a little spot inside the nucleus that builds the little ribosomes."
},
{
"cat": "border",
"title": "Borders and gates",
"about": "The plasma membrane is a phospholipid bilayer (two layers of fat molecules) with proteins floating in it, and it is selectively permeable: it lets some substances through freely and makes others use protein channels, carriers or pumps. Microvilli are tiny finger-like extensions of this membrane that greatly increase surface area, so they are found on absorbing cells such as those lining the small intestine and kidney tubules. Microvilli do not move on their own, which is the key difference from cilia.",
"points": [
"Plasma membrane = controls entry and exit (selectively permeable).",
"Microvilli = more surface for absorption; they do not beat.",
"Microvilli form the 'brush border' of gut and kidney cells."
],
"tip": "Microvilli are like the folds in a towel: more surface to soak things up, but they don't wave."
},
{
"cat": "factory",
"title": "Factories and post",
"about": "This group makes and ships products. Ribosomes are the actual protein builders, reading messenger RNA and linking amino acids; they float free in the cytoplasm or stick to the rough ER. Rough ER is rough because it is covered in ribosomes, and it makes proteins for export or for membranes. Smooth ER has no ribosomes and makes lipids (fats and steroids) and detoxifies drugs and alcohol. The Golgi apparatus receives proteins from the ER, modifies, sorts and packages them, and vesicles are the membrane bubbles that carry cargo between them and out of the cell.",
"points": [
"Production line: ribosome builds → rough ER folds → vesicle carries → Golgi modifies and packages → vesicle releases.",
"Rough ER = proteins (has ribosomes). Smooth ER = lipids and detox (no ribosomes).",
"Liver cells are packed with smooth ER because they detoxify drugs and alcohol."
],
"tip": "Rough has ribosomes, Smooth makes Steroids and Strips toxins; the Golgi is the post office that labels the parcels."
},
{
"cat": "power",
"title": "Power",
"about": "Mitochondria carry out aerobic respiration, using oxygen to turn the energy in glucose and fat into ATP, the molecule cells spend for energy. Each has a smooth outer membrane and a folded inner membrane; the folds (cristae) give more surface for ATP-making enzymes. Mitochondria have their own small loop of DNA, inherited from the mother. Busy cells such as muscle and liver cells have many of them.",
"points": [
"ATP = adenosine triphosphate, the cell's energy currency.",
"Folded inner membrane = cristae.",
"Mitochondrial DNA comes from the mother only."
],
"tip": "Mighty-chondria: the power station that turns food plus oxygen into ATP."
},
{
"cat": "cleanup",
"title": "Clean-up crew",
"about": "Both members are small membrane sacs full of enzymes, so they look alike, but their targets differ. Lysosomes hold digestive enzymes that break down large molecules, bacteria taken in by the cell and worn-out organelles (self-digestion called autophagy). Peroxisomes break down fatty acids and neutralise toxins such as alcohol, producing hydrogen peroxide, which their enzyme catalase then splits into water and oxygen. Remember: lysosome = general digestion and recycling, peroxisome = fatty acids and hydrogen peroxide.",
"points": [
"Lysosome: digests waste, germs, old parts.",
"Peroxisome: oxidises fatty acids and breaks down hydrogen peroxide with catalase.",
"Both are abundant in liver and kidney cells."
],
"tip": "PEROXisome deals with PEROXide; LYSosome LYSes (splits apart) everything else."
},
{
"cat": "frame",
"title": "Framework and movement",
"about": "The cytoskeleton is a network of protein filaments (microfilaments, intermediate filaments and microtubules) that gives the cell its shape and acts as tracks for moving vesicles and organelles. Centrioles are a pair of short cylinders made of microtubules, near the nucleus, that organise the spindle fibres that pull chromosomes apart during division. Cilia are hair-like projections built on microtubules that beat in waves to move fluid or mucus across a surface, as in the airways. The cytoplasm is everything between the plasma membrane and the nucleus: the jelly-like cytosol plus the organelles in it.",
"points": [
"Cilia beat; microvilli don't. Cilia move things along; microvilli absorb.",
"Centrioles = cell division; cytoskeleton = shape and internal transport.",
"Cytosol is the fluid only; cytoplasm is the fluid plus the organelles."
],
"tip": "Cytoskeleton = scaffolding and roads; centrioles = the crane crew at division time; cilia = street sweepers; cytoplasm = the city's air."
}
],
"outro": "When a quiz gives you a job, ask: is it about control, borders, making things, energy, cleaning or structure? That narrows it to one group, then pick the member."
}
});
