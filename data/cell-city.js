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
"icon": "dna",
"num": 1
},
{
"name": "Nucleolus",
"cat": "control",
"job": "Makes the parts of ribosomes",
"summary": "A dense spot inside the nucleus where ribosome parts are made.",
"life": "The city's machine shop, building the machines that build everything else.",
"icon": "dna",
"num": 2
},
{
"name": "Chromatin",
"cat": "control",
"job": "Packs DNA so it fits inside the nucleus",
"summary": "DNA packed around proteins; it coils into chromosomes when a cell divides.",
"life": "The city archive: every blueprint, filed and folded away.",
"icon": "dna",
"num": 3
},
{
"name": "Plasma membrane",
"cat": "border",
"job": "Controls what enters and leaves the cell",
"summary": "A thin, flexible double layer of fats and proteins around the whole cell.",
"life": "The city wall with guarded gates: some things pass freely, others need a pass.",
"icon": "shield",
"num": 4
},
{
"name": "Microvilli",
"cat": "border",
"job": "Increase surface area for absorption",
"summary": "Tiny finger-like folds of the membrane on cells that absorb, such as in the gut.",
"life": "Extra loading docks along the wall so more deliveries come in at once.",
"icon": "shield",
"num": 5
},
{
"name": "Cilia",
"cat": "frame",
"job": "Beat together to sweep things along the surface",
"summary": "Short hair-like structures that wave in rhythm, like in the airways.",
"life": "Street sweepers that push mucus and dust out of the city.",
"icon": "wave",
"num": 6
},
{
"name": "Ribosome",
"cat": "factory",
"job": "Builds proteins",
"summary": "Tiny machines, free or on the rough ER, that read instructions and link amino acids into proteins.",
"life": "Workers on the factory floor, assembling products from a recipe.",
"icon": "factory",
"num": 7
},
{
"name": "Rough ER",
"cat": "factory",
"job": "Makes proteins for export and membranes",
"summary": "Folded membranes studded with ribosomes, making proteins to send out or build membranes.",
"life": "The main factory hall, with workers lined up along the conveyor.",
"icon": "factory",
"num": 8
},
{
"name": "Smooth ER",
"cat": "factory",
"job": "Makes lipids and detoxifies",
"summary": "Folded membranes without ribosomes that make fats and break down some drugs and toxins.",
"life": "The chemical plant: it makes oils and treats waste water.",
"icon": "factory",
"num": 9
},
{
"name": "Golgi apparatus",
"cat": "factory",
"job": "Sorts, modifies and packages proteins",
"summary": "Stacks of flattened sacs that sort, label and package proteins into vesicles.",
"life": "The post office: it wraps, labels and sends parcels out.",
"icon": "factory",
"num": 10
},
{
"name": "Vesicles",
"cat": "factory",
"job": "Carry materials around and out of the cell",
"summary": "Small membrane bubbles that carry cargo inside the cell or release it outside.",
"life": "Delivery vans driving parcels across the city.",
"icon": "factory",
"num": 11
},
{
"name": "Mitochondrion",
"cat": "power",
"job": "Makes ATP, the cell's energy",
"summary": "A bean-shaped organelle with folded inner membranes that turns food into usable energy (ATP).",
"life": "The power station: it burns fuel and keeps the lights on.",
"icon": "mito",
"num": 12
},
{
"name": "Lysosome",
"cat": "cleanup",
"job": "Breaks down waste and worn-out parts",
"summary": "A small sac of digestive enzymes that breaks down waste, germs and old organelles.",
"life": "The recycling centre: it breaks old things down so the parts can be reused.",
"icon": "recycle",
"num": 13
},
{
"name": "Peroxisome",
"cat": "cleanup",
"job": "Breaks down fatty acids and hydrogen peroxide",
"summary": "A small sac of enzymes that neutralises toxins, including hydrogen peroxide.",
"life": "The hazardous waste team, making dangerous chemicals safe.",
"icon": "recycle",
"num": 14
},
{
"name": "Cytoskeleton",
"cat": "frame",
"job": "Gives the cell its shape and moves things inside",
"summary": "A network of protein fibres and tubes that supports the cell and acts as tracks.",
"life": "The city's roads and steel frames: buildings stand on it and traffic moves along it.",
"icon": "brick",
"num": 15
},
{
"name": "Centrioles",
"cat": "frame",
"job": "Organise the fibres that pull chromosomes apart",
"summary": "A pair of tube bundles that help organise cell division.",
"life": "The site managers who set up the cranes when the city splits in two.",
"icon": "brick",
"num": 16
},
{
"name": "Cytoplasm",
"cat": "frame",
"job": "Jelly-like fluid where the organelles sit",
"summary": "The fluid (cytosol) and everything suspended in it between the membrane and nucleus.",
"life": "The air and streets of the city: everything happens inside it.",
"icon": "drop",
"num": 17
}
]
});
