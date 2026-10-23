/* Element Rush — game data. Edit the text freely; the engine reads everything from here.
   Schema: see data/README.md */
BGX.registerGame({
"id": "element-rush",
"title": "Element Rush",
"subject": "chemistry",
"subjectName": "Chemistry",
"chapter": "7",
"tagline": "Learn the periodic table, one element at a time",
"itemNoun": "element",
"categories": [
{
"id": "am",
"name": "Alkali metal",
"color": "cat-coral"
},
{
"id": "ae",
"name": "Alkaline earth metal",
"color": "cat-amber"
},
{
"id": "tm",
"name": "Transition metal",
"color": "cat-lemon"
},
{
"id": "pt",
"name": "Post-transition metal",
"color": "cat-sage"
},
{
"id": "md",
"name": "Metalloid",
"color": "cat-mint"
},
{
"id": "nm",
"name": "Reactive nonmetal",
"color": "cat-sky"
},
{
"id": "ha",
"name": "Halogen",
"color": "cat-lilac"
},
{
"id": "ng",
"name": "Noble gas",
"color": "cat-orchid"
},
{
"id": "la",
"name": "Lanthanide",
"color": "cat-peach"
},
{
"id": "ac",
"name": "Actinide",
"color": "cat-sand"
}
],
"categoryLabel": "Family",
"sets": [
{
"size": 20,
"label": "First 20"
},
{
"size": 36,
"label": "First 36"
},
{
"size": 54,
"label": "First 54"
},
{
"size": 118,
"label": "All 118"
}
],
"defaultSet": 36,
"hint": "Start with the first 20 and move up as they stick. Each round is 10 questions; your best score for each mode is saved on this device.",
"tile": {
"big": "symbol",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"symbol",
"No. {num}",
"{category}"
],
"map": {
"cols": 18,
"gapAfterRow": 7,
"tip": "Tiles keep their family colours as a clue. Turn your phone sideways for bigger tiles.",
"placeholders": [
{
"row": 5,
"col": 3,
"label": "57–71"
},
{
"row": 6,
"col": 3,
"label": "89–103"
}
]
},
"detail": [
{
"label": "Family",
"field": "{category}"
},
{
"label": "Atomic mass",
"field": "{mass} u"
},
{
"label": "At 20 °C",
"field": "{state}"
},
{
"label": "Electrons",
"field": "{conf}",
"format": "config"
}
],
"explore": {
"pictures": [
"sample",
"object",
"shells"
],
"start": 26
},
"milestone": {
"field": "num",
"text": "You unlocked element {num}, {name}: one for every correct answer."
},
"modes": [
{
"id": "sym",
"format": "quiz",
"title": "Name → Symbol",
"desc": "See the name, pick its symbol.",
"icon": "?",
"color": "cat-sky",
"prompt": "What is the symbol for",
"show": "name",
"showAs": "big",
"answer": "symbol",
"answerAs": "symbol"
},
{
"id": "name",
"format": "quiz",
"title": "Symbol → Name",
"desc": "See the symbol, pick the element.",
"icon": "Au",
"color": "cat-lemon",
"prompt": "Which element is this?",
"showAs": "tile",
"answer": "name"
},
{
"id": "find",
"format": "findit",
"title": "Find it on the table",
"desc": "Tap where the element lives.",
"icon": "⌖",
"color": "cat-mint",
"prompt": "Tap where this element sits"
},
{
"id": "num",
"format": "quiz",
"title": "Atomic number",
"desc": "Which element has this number?",
"icon": "79",
"color": "cat-amber",
"prompt": "Which element has atomic number",
"show": "num",
"showAs": "mono",
"answer": "name"
},
{
"id": "fam",
"format": "sortit",
"title": "Which family?",
"desc": "Name the element's group.",
"icon": "Ne",
"color": "cat-orchid",
"prompt": "Which family does this belong to?",
"sub": "{symbol} · atomic number {num}"
},
{
"id": "explore",
"format": "explorer",
"title": "Explore the table",
"desc": "Tap any tile to learn what it is and where you meet it.",
"icon": "118",
"color": "cat-peach"
}
],
"items": [
{
"num": 1,
"symbol": "H",
"name": "Hydrogen",
"cat": "nm",
"mass": "1.008",
"row": 0,
"col": 1,
"conf": "1s1",
"state": "Gas",
"summary": "The lightest and most common element in the universe. It is an invisible gas that fuels the Sun and every star.",
"life": "Every drop of water you drink is two hydrogen atoms joined to one oxygen atom: H₂O.",
"discovered": "1766, Henry Cavendish",
"nameFrom": "Greek for 'water-maker', because it burns to make water",
"look": [
"g",
"#C9A2FF"
],
"obj": [
"glass",
"A glass of water"
],
"link": "https://en.wikipedia.org/wiki/Hydrogen"
},
{
"num": 2,
"symbol": "He",
"name": "Helium",
"cat": "ng",
"mass": "4.0026",
"row": 0,
"col": 18,
"conf": "1s2",
"state": "Gas",
"summary": "A light, colourless gas that almost never reacts with anything. It is the second most common element in the universe.",
"life": "It makes party balloons float, and divers breathe it mixed with oxygen on very deep dives.",
"discovered": "1868, Pierre Janssen and Norman Lockyer, seen in sunlight before it was found on Earth",
"nameFrom": "Greek 'helios', the Sun",
"look": [
"g",
"#FFB48F"
],
"obj": [
"balloon",
"Party balloons"
],
"link": "https://en.wikipedia.org/wiki/Helium"
},
{
"num": 3,
"symbol": "Li",
"name": "Lithium",
"cat": "am",
"mass": "6.94",
"row": 1,
"col": 1,
"conf": "[He] 2s1",
"state": "Solid",
"summary": "The lightest metal, so soft you can cut it with a knife. It reacts with water, so it is never found pure in nature.",
"life": "The rechargeable battery in your iPhone and Mac is a lithium-ion battery.",
"discovered": "1817, Johan August Arfwedson",
"nameFrom": "Greek 'lithos', stone",
"obj": [
"phone",
"Phone battery"
],
"link": "https://en.wikipedia.org/wiki/Lithium"
},
{
"num": 4,
"symbol": "Be",
"name": "Beryllium",
"cat": "ae",
"mass": "9.0122",
"row": 1,
"col": 2,
"conf": "[He] 2s2",
"state": "Solid",
"summary": "A light, very stiff grey metal. Its dust is toxic, so it is handled with care.",
"life": "The giant mirrors of the James Webb Space Telescope are made of beryllium coated in gold.",
"discovered": "1798, Louis-Nicolas Vauquelin",
"nameFrom": "The gemstone beryl (emerald is a type of beryl)",
"obj": [
"mirror",
"Space telescope mirror"
],
"link": "https://en.wikipedia.org/wiki/Beryllium"
},
{
"num": 5,
"symbol": "B",
"name": "Boron",
"cat": "md",
"mass": "10.81",
"row": 1,
"col": 13,
"conf": "[He] 2s2 2p1",
"state": "Solid",
"summary": "A hard, dark element that sits between metals and non-metals. Plants need a tiny amount to grow.",
"life": "Borosilicate glass, used in lab beakers and some oven dishes, contains boron, which helps it survive sudden temperature changes.",
"discovered": "1808, Gay-Lussac and Thénard, and Humphry Davy",
"nameFrom": "Borax, the mineral it comes from",
"look": [
"c",
"#5A4A3E"
],
"obj": [
"dish",
"Oven-safe glass dish"
],
"link": "https://en.wikipedia.org/wiki/Boron"
},
{
"num": 6,
"symbol": "C",
"name": "Carbon",
"cat": "nm",
"mass": "12.011",
"row": 1,
"col": 14,
"conf": "[He] 2s2 2p2",
"state": "Solid",
"summary": "The element of life: every living thing is built around carbon atoms. Pure carbon can be soft graphite or hard diamond.",
"life": "Your pencil 'lead' is graphite, and a diamond ring is the same element arranged differently.",
"discovered": "Known since prehistoric times as charcoal and soot",
"nameFrom": "Latin 'carbo', charcoal",
"look": [
"c",
"#33343A"
],
"obj": [
"pencil",
"Pencil and diamond"
],
"link": "https://en.wikipedia.org/wiki/Carbon"
},
{
"num": 7,
"symbol": "N",
"name": "Nitrogen",
"cat": "nm",
"mass": "14.007",
"row": 1,
"col": 15,
"conf": "[He] 2s2 2p3",
"state": "Gas",
"summary": "A colourless gas that makes up about 78% of the air we breathe. Our bodies need it to build proteins and DNA.",
"life": "Fertilisers are full of nitrogen, and liquid nitrogen is used to freeze off warts.",
"discovered": "1772, Daniel Rutherford",
"nameFrom": "Greek for 'saltpetre-maker'",
"look": [
"g",
"#B48CFF"
],
"obj": [
"plant",
"Fertilised plants"
],
"link": "https://en.wikipedia.org/wiki/Nitrogen"
},
{
"num": 8,
"symbol": "O",
"name": "Oxygen",
"cat": "nm",
"mass": "15.999",
"row": 1,
"col": 16,
"conf": "[He] 2s2 2p4",
"state": "Gas",
"summary": "A colourless gas making up about 21% of air. Animals need it to turn food into energy, and fires need it to burn.",
"life": "Every breath you take brings oxygen into your lungs; hospitals give extra oxygen to patients who need it.",
"discovered": "1771–1774, Carl Scheele and Joseph Priestley",
"nameFrom": "Greek for 'acid-maker'",
"look": [
"g",
"#8FC8FF"
],
"obj": [
"tank",
"Oxygen cylinder"
],
"link": "https://en.wikipedia.org/wiki/Oxygen"
},
{
"num": 9,
"symbol": "F",
"name": "Fluorine",
"cat": "ha",
"mass": "18.998",
"row": 1,
"col": 17,
"conf": "[He] 2s2 2p5",
"state": "Gas",
"summary": "A pale yellow gas, the most reactive of all elements. It grabs onto almost anything it touches.",
"life": "Toothpaste contains fluoride, a form of fluorine that strengthens tooth enamel.",
"discovered": "1886, Henri Moissan, who won a Nobel Prize for it",
"nameFrom": "Latin 'fluere', to flow (fluorite helps metals melt)",
"look": [
"g",
"#E6E27A"
],
"obj": [
"toothpaste",
"Fluoride toothpaste"
],
"link": "https://en.wikipedia.org/wiki/Fluorine"
},
{
"num": 10,
"symbol": "Ne",
"name": "Neon",
"cat": "ng",
"mass": "20.180",
"row": 1,
"col": 18,
"conf": "[He] 2s2 2p6",
"state": "Gas",
"summary": "A colourless gas that does not react with anything. It glows bright orange-red when electricity passes through it.",
"life": "The classic glowing red-orange signs in shop windows are neon tubes.",
"discovered": "1898, William Ramsay and Morris Travers",
"nameFrom": "Greek 'neos', new",
"look": [
"g",
"#FF5A2A"
],
"obj": [
"neon",
"Neon sign"
],
"link": "https://en.wikipedia.org/wiki/Neon"
},
{
"num": 11,
"symbol": "Na",
"name": "Sodium",
"cat": "am",
"mass": "22.990",
"row": 2,
"col": 1,
"conf": "[Ne] 3s1",
"state": "Solid",
"summary": "A soft, silvery metal that fizzes violently in water. Our nerves use it to send signals.",
"life": "Table salt is sodium chloride; the orange glow of old street lamps comes from sodium.",
"discovered": "1807, Humphry Davy, using electricity",
"nameFrom": "'Soda'; the symbol Na comes from Latin 'natrium'",
"obj": [
"salt",
"Table salt"
],
"link": "https://en.wikipedia.org/wiki/Sodium"
},
{
"num": 12,
"symbol": "Mg",
"name": "Magnesium",
"cat": "ae",
"mass": "24.305",
"row": 2,
"col": 2,
"conf": "[Ne] 3s2",
"state": "Solid",
"summary": "A light, shiny metal that burns with a dazzling white flame. Plants need it at the centre of chlorophyll, the green pigment that captures sunlight.",
"life": "Magnesium is in green vegetables and nuts, and in the white sparks of fireworks.",
"discovered": "1808, Humphry Davy",
"nameFrom": "Magnesia, a region of ancient Greece",
"look": [
"m",
"#C4C8CC"
],
"obj": [
"leaf",
"Leafy greens"
],
"link": "https://en.wikipedia.org/wiki/Magnesium"
},
{
"num": 13,
"symbol": "Al",
"name": "Aluminium",
"cat": "pt",
"mass": "26.982",
"row": 2,
"col": 13,
"conf": "[Ne] 3s2 3p1",
"state": "Solid",
"summary": "A light, silvery metal that does not rust. It is the most common metal in the Earth's crust.",
"life": "Drink cans, kitchen foil and the body of your MacBook are made of aluminium.",
"discovered": "1825, Hans Christian Ørsted; first made pure by Friedrich Wöhler in 1827",
"nameFrom": "Latin 'alumen', alum (a salt used since antiquity)",
"look": [
"m",
"#C9CED5"
],
"obj": [
"can",
"Drink can"
],
"link": "https://en.wikipedia.org/wiki/Aluminium"
},
{
"num": 14,
"symbol": "Si",
"name": "Silicon",
"cat": "md",
"mass": "28.085",
"row": 2,
"col": 14,
"conf": "[Ne] 3s2 3p2",
"state": "Solid",
"summary": "A hard, shiny grey element that is a semiconductor: it can switch electricity on and off. Sand is mostly silicon and oxygen.",
"life": "The chip inside every phone and computer is built on a thin slice of silicon.",
"discovered": "1824, Jöns Jacob Berzelius",
"nameFrom": "Latin 'silex', flint",
"look": [
"c",
"#6F7C8D"
],
"obj": [
"chip",
"Computer chip"
],
"link": "https://en.wikipedia.org/wiki/Silicon"
},
{
"num": 15,
"symbol": "P",
"name": "Phosphorus",
"cat": "nm",
"mass": "30.974",
"row": 2,
"col": 15,
"conf": "[Ne] 3s2 3p3",
"state": "Solid",
"summary": "A non-metal that comes in white, red and black forms. White phosphorus glows in the dark and catches fire in air.",
"life": "The striking strip on a matchbox contains red phosphorus; your bones and DNA contain phosphorus too.",
"discovered": "1669, Hennig Brand, by boiling down urine",
"nameFrom": "Greek for 'light-bearer', because it glows",
"look": [
"p",
"#B4302A"
],
"obj": [
"match",
"Matches"
],
"link": "https://en.wikipedia.org/wiki/Phosphorus"
},
{
"num": 16,
"symbol": "S",
"name": "Sulfur",
"cat": "nm",
"mass": "32.06",
"row": 2,
"col": 16,
"conf": "[Ne] 3s2 3p4",
"state": "Solid",
"summary": "A bright yellow, brittle non-metal. Many of its compounds smell strongly.",
"life": "The smell of rotten eggs and of cooked garlic and onions comes from sulfur compounds.",
"discovered": "Known since ancient times; the 'brimstone' of the Bible",
"nameFrom": "Latin 'sulphur'",
"look": [
"c",
"#F2D338"
],
"obj": [
"egg",
"Eggs and garlic"
],
"link": "https://en.wikipedia.org/wiki/Sulfur"
},
{
"num": 17,
"symbol": "Cl",
"name": "Chlorine",
"cat": "ha",
"mass": "35.45",
"row": 2,
"col": 17,
"conf": "[Ne] 3s2 3p5",
"state": "Gas",
"summary": "A greenish-yellow, poisonous gas. In small amounts it kills germs.",
"life": "Swimming pools and tap water are kept clean with chlorine; it is also half of table salt.",
"discovered": "1774, Carl Scheele",
"nameFrom": "Greek 'chloros', pale green",
"look": [
"g",
"#C2D84E"
],
"obj": [
"pool",
"Swimming pool"
],
"link": "https://en.wikipedia.org/wiki/Chlorine"
},
{
"num": 18,
"symbol": "Ar",
"name": "Argon",
"cat": "ng",
"mass": "39.95",
"row": 2,
"col": 18,
"conf": "[Ne] 3s2 3p6",
"state": "Gas",
"summary": "A colourless gas that makes up about 1% of air. It does not react, so it protects things from oxygen.",
"life": "Double-glazed windows are often filled with argon to keep heat in.",
"discovered": "1894, Lord Rayleigh and William Ramsay",
"nameFrom": "Greek 'argos', lazy, because it reacts with nothing",
"look": [
"g",
"#B57CFF"
],
"obj": [
"window",
"Double glazing"
],
"link": "https://en.wikipedia.org/wiki/Argon"
},
{
"num": 19,
"symbol": "K",
"name": "Potassium",
"cat": "am",
"mass": "39.098",
"row": 3,
"col": 1,
"conf": "[Ar] 4s1",
"state": "Solid",
"summary": "A soft metal that reacts so strongly with water it catches fire. Our hearts and muscles need it to work.",
"life": "Bananas, potatoes and avocados are rich in potassium.",
"discovered": "1807, Humphry Davy",
"nameFrom": "'Potash'; the symbol K comes from Latin 'kalium'",
"obj": [
"banana",
"Bananas"
],
"link": "https://en.wikipedia.org/wiki/Potassium"
},
{
"num": 20,
"symbol": "Ca",
"name": "Calcium",
"cat": "ae",
"mass": "40.078",
"row": 3,
"col": 2,
"conf": "[Ar] 4s2",
"state": "Solid",
"summary": "A soft, silvery metal that is the most common mineral in our body. It builds bones and teeth.",
"life": "Milk, cheese and the chalk on a blackboard all contain calcium.",
"discovered": "1808, Humphry Davy",
"nameFrom": "Latin 'calx', lime",
"obj": [
"milk",
"Milk and cheese"
],
"link": "https://en.wikipedia.org/wiki/Calcium"
},
{
"num": 21,
"symbol": "Sc",
"name": "Scandium",
"cat": "tm",
"mass": "44.956",
"row": 3,
"col": 3,
"conf": "[Ar] 3d1 4s2",
"state": "Solid",
"summary": "A light, silvery metal that is fairly rare. Adding a little to aluminium makes it much stronger.",
"life": "Some high-end bicycle frames and baseball bats use aluminium-scandium alloys.",
"discovered": "1879, Lars Fredrik Nilson",
"nameFrom": "Scandinavia",
"obj": [
"bike",
"Bike frame"
],
"link": "https://en.wikipedia.org/wiki/Scandium"
},
{
"num": 22,
"symbol": "Ti",
"name": "Titanium",
"cat": "tm",
"mass": "47.867",
"row": 3,
"col": 4,
"conf": "[Ar] 3d2 4s2",
"state": "Solid",
"summary": "A strong, light metal that does not corrode and that the body accepts well.",
"life": "Hip replacements, dental implants and some watch cases are titanium; white paint gets its colour from titanium dioxide.",
"discovered": "1791, William Gregor, a Cornish vicar",
"nameFrom": "The Titans of Greek mythology",
"look": [
"m",
"#A2A8AF"
],
"obj": [
"implant",
"Dental implant"
],
"link": "https://en.wikipedia.org/wiki/Titanium"
},
{
"num": 23,
"symbol": "V",
"name": "Vanadium",
"cat": "tm",
"mass": "50.942",
"row": 3,
"col": 5,
"conf": "[Ar] 3d3 4s2",
"state": "Solid",
"summary": "A hard, silvery-grey metal mostly used to make steel tougher.",
"life": "Good spanners and wrenches are often stamped 'chrome vanadium' steel.",
"discovered": "1801, Andrés Manuel del Río; rediscovered 1830 by Nils Sefström",
"nameFrom": "Vanadís, a Norse goddess of beauty, for its colourful compounds",
"obj": [
"wrench",
"Chrome-vanadium spanner"
],
"link": "https://en.wikipedia.org/wiki/Vanadium"
},
{
"num": 24,
"symbol": "Cr",
"name": "Chromium",
"cat": "tm",
"mass": "51.996",
"row": 3,
"col": 6,
"conf": "[Ar] 3d5 4s1",
"state": "Solid",
"summary": "A hard, shiny metal that resists rust and can be polished to a mirror finish.",
"life": "Stainless steel cutlery and shiny chrome taps contain chromium.",
"discovered": "1797, Louis-Nicolas Vauquelin",
"nameFrom": "Greek 'chroma', colour, for its colourful compounds",
"look": [
"m",
"#BFC6CF"
],
"obj": [
"cutlery",
"Stainless cutlery"
],
"link": "https://en.wikipedia.org/wiki/Chromium"
},
{
"num": 25,
"symbol": "Mn",
"name": "Manganese",
"cat": "tm",
"mass": "54.938",
"row": 3,
"col": 7,
"conf": "[Ar] 3d5 4s2",
"state": "Solid",
"summary": "A hard, brittle grey metal. It is essential for making strong steel.",
"life": "Ordinary alkaline batteries (AA, AAA) contain manganese dioxide.",
"discovered": "1774, Johan Gottlieb Gahn",
"nameFrom": "Magnesia, the same Greek region as magnesium",
"obj": [
"aa",
"AA battery"
],
"link": "https://en.wikipedia.org/wiki/Manganese"
},
{
"num": 26,
"symbol": "Fe",
"name": "Iron",
"cat": "tm",
"mass": "55.845",
"row": 3,
"col": 8,
"conf": "[Ar] 3d6 4s2",
"state": "Solid",
"summary": "A strong grey metal and the most used metal on Earth. Our blood uses it to carry oxygen.",
"life": "Steel is mostly iron, and red meat and spinach provide the iron your blood needs.",
"discovered": "Used since about 3000 BC; the Iron Age began around 1200 BC",
"nameFrom": "Old English 'iren'; the symbol Fe comes from Latin 'ferrum'",
"look": [
"m",
"#8F969F"
],
"obj": [
"pan",
"Cast-iron pan"
],
"link": "https://en.wikipedia.org/wiki/Iron"
},
{
"num": 27,
"symbol": "Co",
"name": "Cobalt",
"cat": "tm",
"mass": "58.933",
"row": 3,
"col": 9,
"conf": "[Ar] 3d7 4s2",
"state": "Solid",
"summary": "A hard, silvery-blue metal. Its compounds give a deep blue colour.",
"life": "Vitamin B12 contains cobalt, and 'cobalt blue' has coloured pottery and glass for centuries.",
"discovered": "1735, Georg Brandt",
"nameFrom": "German 'Kobold', a mischievous goblin of the mines",
"look": [
"m",
"#9FA8B8"
],
"obj": [
"pill",
"Vitamin B12"
],
"link": "https://en.wikipedia.org/wiki/Cobalt"
},
{
"num": 28,
"symbol": "Ni",
"name": "Nickel",
"cat": "tm",
"mass": "58.693",
"row": 3,
"col": 10,
"conf": "[Ar] 3d8 4s2",
"state": "Solid",
"summary": "A silvery metal that resists corrosion and is often mixed with other metals.",
"life": "Many coins, including the euro coins, contain nickel.",
"discovered": "1751, Axel Fredrik Cronstedt",
"nameFrom": "German 'Kupfernickel', 'devil's copper'",
"look": [
"m",
"#BFB8A8"
],
"obj": [
"coin",
"Euro coins"
],
"link": "https://en.wikipedia.org/wiki/Nickel"
},
{
"num": 29,
"symbol": "Cu",
"name": "Copper",
"cat": "tm",
"mass": "63.546",
"row": 3,
"col": 11,
"conf": "[Ar] 3d10 4s1",
"state": "Solid",
"summary": "A reddish-orange metal that carries electricity and heat very well.",
"life": "The wires inside your walls and charging cables are copper; old pennies were made of it.",
"discovered": "Used for about 10,000 years; one of the first metals people worked",
"nameFrom": "Latin 'cuprum', from the island of Cyprus",
"look": [
"m",
"#C8774A"
],
"obj": [
"cable",
"Copper wire"
],
"link": "https://en.wikipedia.org/wiki/Copper"
},
{
"num": 30,
"symbol": "Zn",
"name": "Zinc",
"cat": "tm",
"mass": "65.38",
"row": 3,
"col": 12,
"conf": "[Ar] 3d10 4s2",
"state": "Solid",
"summary": "A bluish-silver metal that protects iron from rusting. The body needs it for healing and the immune system.",
"life": "Galvanised buckets and fences are coated with zinc; zinc cream is used for nappy rash and sunscreen.",
"discovered": "Used in India for centuries; isolated in Europe in 1746 by Andreas Marggraf",
"nameFrom": "German 'Zink', possibly from 'Zinke', a prong",
"look": [
"m",
"#B2BCC8"
],
"obj": [
"bucket",
"Galvanised bucket"
],
"link": "https://en.wikipedia.org/wiki/Zinc"
},
{
"num": 31,
"symbol": "Ga",
"name": "Gallium",
"cat": "pt",
"mass": "69.723",
"row": 3,
"col": 13,
"conf": "[Ar] 3d10 4s2 4p1",
"state": "Solid",
"summary": "A soft, silvery metal that melts in your hand, at just under 30 °C.",
"life": "Blue and white LEDs, like the ones in TV screens, use gallium compounds.",
"discovered": "1875, Paul-Émile Lecoq de Boisbaudran",
"nameFrom": "Gallia, Latin for France",
"obj": [
"led",
"LED lights"
],
"link": "https://en.wikipedia.org/wiki/Gallium"
},
{
"num": 32,
"symbol": "Ge",
"name": "Germanium",
"cat": "md",
"mass": "72.630",
"row": 3,
"col": 14,
"conf": "[Ar] 3d10 4s2 4p2",
"state": "Solid",
"summary": "A shiny, grey-white metalloid that behaves as a semiconductor, like silicon.",
"life": "The glass fibre-optic cables that bring fast internet to homes contain germanium.",
"discovered": "1886, Clemens Winkler",
"nameFrom": "Germany",
"look": [
"c",
"#8A919A"
],
"obj": [
"fiber",
"Fibre-optic cable"
],
"link": "https://en.wikipedia.org/wiki/Germanium"
},
{
"num": 33,
"symbol": "As",
"name": "Arsenic",
"cat": "md",
"mass": "74.922",
"row": 3,
"col": 15,
"conf": "[Ar] 3d10 4s2 4p3",
"state": "Solid",
"summary": "A grey metalloid famous as a poison. Tiny traces exist in nature, even in some rice.",
"life": "Historically used in rat poison and Victorian green wallpaper; today it is used in some electronic chips.",
"discovered": "Known since antiquity; isolated around 1250 by Albertus Magnus",
"nameFrom": "Greek 'arsenikon', a yellow pigment",
"look": [
"c",
"#7D828A"
],
"obj": [
"poison",
"Old rat poison"
],
"link": "https://en.wikipedia.org/wiki/Arsenic"
},
{
"num": 34,
"symbol": "Se",
"name": "Selenium",
"cat": "nm",
"mass": "78.971",
"row": 3,
"col": 16,
"conf": "[Ar] 3d10 4s2 4p4",
"state": "Solid",
"summary": "A non-metal that the body needs in very small amounts.",
"life": "Two Brazil nuts give you about a day's worth of selenium; it is also in many dandruff shampoos.",
"discovered": "1817, Jöns Jacob Berzelius",
"nameFrom": "Greek 'selene', the Moon",
"look": [
"c",
"#56585F"
],
"obj": [
"nut",
"Brazil nuts"
],
"link": "https://en.wikipedia.org/wiki/Selenium"
},
{
"num": 35,
"symbol": "Br",
"name": "Bromine",
"cat": "ha",
"mass": "79.904",
"row": 3,
"col": 17,
"conf": "[Ar] 3d10 4s2 4p5",
"state": "Liquid",
"summary": "One of only two elements that are liquid at room temperature: a heavy, red-brown liquid with a strong smell.",
"life": "Bromine compounds are used to clean hot tubs and to make fabrics and furniture fire-resistant.",
"discovered": "1826, Antoine Balard",
"nameFrom": "Greek 'bromos', stench",
"look": [
"l",
"#8B2A16"
],
"obj": [
"pool",
"Hot tub cleaner"
],
"link": "https://en.wikipedia.org/wiki/Bromine"
},
{
"num": 36,
"symbol": "Kr",
"name": "Krypton",
"cat": "ng",
"mass": "83.798",
"row": 3,
"col": 18,
"conf": "[Ar] 3d10 4s2 4p6",
"state": "Gas",
"summary": "A colourless gas that does not react. It glows whitish when electrified.",
"life": "Some energy-efficient light bulbs and camera flashes use krypton. (Superman's kryptonite is fiction.)",
"discovered": "1898, William Ramsay and Morris Travers",
"nameFrom": "Greek 'kryptos', hidden",
"look": [
"g",
"#D8E3FF"
],
"obj": [
"bulb",
"Light bulb"
],
"link": "https://en.wikipedia.org/wiki/Krypton"
},
{
"num": 37,
"symbol": "Rb",
"name": "Rubidium",
"cat": "am",
"mass": "85.468",
"row": 4,
"col": 1,
"conf": "[Kr] 5s1",
"state": "Solid",
"summary": "A soft metal that bursts into flame in air and water.",
"life": "Rubidium atoms are used in very precise atomic clocks, including some inside GPS satellites.",
"discovered": "1861, Robert Bunsen and Gustav Kirchhoff",
"nameFrom": "Latin 'rubidus', deep red, for its red spectral lines",
"obj": [
"clock",
"Atomic clock"
],
"link": "https://en.wikipedia.org/wiki/Rubidium"
},
{
"num": 38,
"symbol": "Sr",
"name": "Strontium",
"cat": "ae",
"mass": "87.62",
"row": 4,
"col": 2,
"conf": "[Kr] 5s2",
"state": "Solid",
"summary": "A soft metal that burns with a brilliant red flame.",
"life": "The bright red colour in fireworks and road flares comes from strontium.",
"discovered": "1790, Adair Crawford; isolated 1808 by Humphry Davy",
"nameFrom": "Strontian, a village in Scotland",
"obj": [
"firework",
"Red fireworks"
],
"link": "https://en.wikipedia.org/wiki/Strontium"
},
{
"num": 39,
"symbol": "Y",
"name": "Yttrium",
"cat": "tm",
"mass": "88.906",
"row": 4,
"col": 3,
"conf": "[Kr] 4d1 5s2",
"state": "Solid",
"summary": "A silvery metal that is used in small amounts in many modern gadgets.",
"life": "Older TV screens used yttrium to make the colour red, and it is used in some lasers.",
"discovered": "1794, Johan Gadolin",
"nameFrom": "Ytterby, a village in Sweden",
"obj": [
"screen",
"Screen colours"
],
"link": "https://en.wikipedia.org/wiki/Yttrium"
},
{
"num": 40,
"symbol": "Zr",
"name": "Zirconium",
"cat": "tm",
"mass": "91.224",
"row": 4,
"col": 4,
"conf": "[Kr] 4d2 5s2",
"state": "Solid",
"summary": "A strong metal that resists heat and corrosion.",
"life": "Ceramic kitchen knives and white dental crowns are made of zirconium oxide (zirconia).",
"discovered": "1789, Martin Heinrich Klaproth",
"nameFrom": "The gem zircon, from Persian 'zargun', gold-coloured",
"obj": [
"knife",
"Ceramic knife"
],
"link": "https://en.wikipedia.org/wiki/Zirconium"
},
{
"num": 41,
"symbol": "Nb",
"name": "Niobium",
"cat": "tm",
"mass": "92.906",
"row": 4,
"col": 5,
"conf": "[Kr] 4d4 5s1",
"state": "Solid",
"summary": "A soft, grey metal that becomes a superconductor when very cold.",
"life": "MRI scanners in hospitals use niobium wires to create their powerful magnetic field.",
"discovered": "1801, Charles Hatchett",
"nameFrom": "Niobe, daughter of Tantalus in Greek mythology",
"obj": [
"scanner",
"MRI scanner"
],
"link": "https://en.wikipedia.org/wiki/Niobium"
},
{
"num": 42,
"symbol": "Mo",
"name": "Molybdenum",
"cat": "tm",
"mass": "95.95",
"row": 4,
"col": 6,
"conf": "[Kr] 4d5 5s1",
"state": "Solid",
"summary": "A metal with a very high melting point, used to harden steel. Our bodies need a trace of it.",
"life": "High-strength tools and engine parts use molybdenum steel; lentils and beans provide dietary molybdenum.",
"discovered": "1778, Carl Scheele",
"nameFrom": "Greek 'molybdos', lead, as its ore was confused with lead",
"obj": [
"wrench",
"Tool steel"
],
"link": "https://en.wikipedia.org/wiki/Molybdenum"
},
{
"num": 43,
"symbol": "Tc",
"name": "Technetium",
"cat": "tm",
"mass": "[98]",
"row": 4,
"col": 7,
"conf": "[Kr] 4d5 5s2",
"state": "Synthetic",
"summary": "The lightest element with no stable form: all of it is radioactive and made by humans.",
"life": "Hospitals inject tiny amounts of technetium to take scans of the heart and bones.",
"discovered": "1937, Carlo Perrier and Emilio Segrè: the first element made artificially",
"nameFrom": "Greek 'technetos', artificial",
"syn": 1,
"obj": [
"scanner",
"Hospital scan"
],
"link": "https://en.wikipedia.org/wiki/Technetium"
},
{
"num": 44,
"symbol": "Ru",
"name": "Ruthenium",
"cat": "tm",
"mass": "101.07",
"row": 4,
"col": 8,
"conf": "[Kr] 4d7 5s1",
"state": "Solid",
"summary": "A hard, rare, silvery metal from the platinum family.",
"life": "Used as a thin coating on electrical contacts and in some computer hard drives.",
"discovered": "1844, Karl Ernst Claus",
"nameFrom": "Ruthenia, Latin for Russia",
"obj": [
"chip",
"Electrical contacts"
],
"link": "https://en.wikipedia.org/wiki/Ruthenium"
},
{
"num": 45,
"symbol": "Rh",
"name": "Rhodium",
"cat": "tm",
"mass": "102.91",
"row": 4,
"col": 9,
"conf": "[Kr] 4d8 5s1",
"state": "Solid",
"summary": "One of the rarest and most expensive metals, very shiny and resistant to corrosion.",
"life": "Catalytic converters in cars use rhodium to clean exhaust fumes; it also coats some jewellery for extra shine.",
"discovered": "1803, William Hyde Wollaston",
"nameFrom": "Greek 'rhodon', rose, for its pink salts",
"obj": [
"car",
"Catalytic converter"
],
"link": "https://en.wikipedia.org/wiki/Rhodium"
},
{
"num": 46,
"symbol": "Pd",
"name": "Palladium",
"cat": "tm",
"mass": "106.42",
"row": 4,
"col": 10,
"conf": "[Kr] 4d10",
"state": "Solid",
"summary": "A silvery-white, precious metal related to platinum.",
"life": "Most catalytic converters use palladium, and it is in some wedding rings and dental fillings.",
"discovered": "1803, William Hyde Wollaston",
"nameFrom": "The asteroid Pallas",
"obj": [
"car",
"Catalytic converter"
],
"link": "https://en.wikipedia.org/wiki/Palladium"
},
{
"num": 47,
"symbol": "Ag",
"name": "Silver",
"cat": "tm",
"mass": "107.87",
"row": 4,
"col": 11,
"conf": "[Kr] 4d10 5s1",
"state": "Solid",
"summary": "A shiny white precious metal that conducts electricity better than any other.",
"life": "Jewellery, cutlery and old photographic film use silver; it also kills bacteria in some wound dressings.",
"discovered": "Known since ancient times",
"nameFrom": "Old English 'seolfor'; the symbol Ag comes from Latin 'argentum'",
"look": [
"m",
"#D8DCE1"
],
"obj": [
"cutlery",
"Silver cutlery"
],
"link": "https://en.wikipedia.org/wiki/Silver"
},
{
"num": 48,
"symbol": "Cd",
"name": "Cadmium",
"cat": "tm",
"mass": "112.41",
"row": 4,
"col": 12,
"conf": "[Kr] 4d10 5s2",
"state": "Solid",
"summary": "A soft, bluish metal that is toxic to the body.",
"life": "It was used in rechargeable Ni-Cd batteries and in bright yellow 'cadmium yellow' paint.",
"discovered": "1817, Friedrich Stromeyer",
"nameFrom": "Latin 'cadmia', an old name for zinc ore",
"obj": [
"aa",
"Rechargeable battery"
],
"link": "https://en.wikipedia.org/wiki/Cadmium"
},
{
"num": 49,
"symbol": "In",
"name": "Indium",
"cat": "pt",
"mass": "114.82",
"row": 4,
"col": 13,
"conf": "[Kr] 4d10 5s2 5p1",
"state": "Solid",
"summary": "A very soft metal that leaves a mark on paper, like a pencil.",
"life": "Every touchscreen, including the one on your iPhone, has a clear coating of indium tin oxide.",
"discovered": "1863, Ferdinand Reich and Theodor Richter",
"nameFrom": "The indigo-blue line in its light spectrum",
"obj": [
"phone",
"Touchscreen"
],
"link": "https://en.wikipedia.org/wiki/Indium"
},
{
"num": 50,
"symbol": "Sn",
"name": "Tin",
"cat": "pt",
"mass": "118.71",
"row": 4,
"col": 14,
"conf": "[Kr] 4d10 5s2 5p2",
"state": "Solid",
"summary": "A soft, silvery metal that does not rust easily.",
"life": "'Tin cans' are steel coated with tin; bronze is copper mixed with tin.",
"discovered": "Known since ancient times; it made the Bronze Age possible",
"nameFrom": "Old English 'tin'; the symbol Sn comes from Latin 'stannum'",
"obj": [
"tincan",
"Tin can"
],
"link": "https://en.wikipedia.org/wiki/Tin"
},
{
"num": 51,
"symbol": "Sb",
"name": "Antimony",
"cat": "md",
"mass": "121.76",
"row": 4,
"col": 15,
"conf": "[Kr] 4d10 5s2 5p3",
"state": "Solid",
"summary": "A brittle, silvery metalloid used since ancient times.",
"life": "Ancient Egyptians used antimony as black eyeliner (kohl); today it makes fabrics fire-resistant.",
"discovered": "Known since ancient times",
"nameFrom": "Uncertain; the symbol Sb comes from Latin 'stibium'",
"look": [
"c",
"#A4A9B0"
],
"obj": [
"eyeliner",
"Kohl eyeliner"
],
"link": "https://en.wikipedia.org/wiki/Antimony"
},
{
"num": 52,
"symbol": "Te",
"name": "Tellurium",
"cat": "md",
"mass": "127.60",
"row": 4,
"col": 16,
"conf": "[Kr] 4d10 5s2 5p4",
"state": "Solid",
"summary": "A rare, brittle, silvery-white metalloid.",
"life": "Used in some solar panels and in rewritable DVDs.",
"discovered": "1782, Franz-Joseph Müller von Reichenstein",
"nameFrom": "Latin 'tellus', Earth",
"look": [
"c",
"#9CA2A8"
],
"obj": [
"solar",
"Solar panel"
],
"link": "https://en.wikipedia.org/wiki/Tellurium"
},
{
"num": 53,
"symbol": "I",
"name": "Iodine",
"cat": "ha",
"mass": "126.90",
"row": 4,
"col": 17,
"conf": "[Kr] 4d10 5s2 5p5",
"state": "Solid",
"summary": "A shiny, dark purple-black solid that turns into violet vapour. The body needs it to make thyroid hormones.",
"life": "Iodised table salt prevents goitre; brown iodine solution is used to disinfect cuts before surgery.",
"discovered": "1811, Bernard Courtois, from seaweed ash",
"nameFrom": "Greek 'iodes', violet, for its purple vapour",
"look": [
"c",
"#3B2A4A"
],
"obj": [
"iodine",
"Iodine antiseptic"
],
"link": "https://en.wikipedia.org/wiki/Iodine"
},
{
"num": 54,
"symbol": "Xe",
"name": "Xenon",
"cat": "ng",
"mass": "131.29",
"row": 4,
"col": 18,
"conf": "[Kr] 4d10 5s2 5p6",
"state": "Gas",
"summary": "A heavy, colourless gas that glows blue when electrified.",
"life": "Bright bluish-white car headlights and cinema projectors use xenon lamps; it can also be used as an anaesthetic.",
"discovered": "1898, William Ramsay and Morris Travers",
"nameFrom": "Greek 'xenos', stranger",
"look": [
"g",
"#6E9BFF"
],
"obj": [
"car",
"Xenon headlights"
],
"link": "https://en.wikipedia.org/wiki/Xenon"
},
{
"num": 55,
"symbol": "Cs",
"name": "Caesium",
"cat": "am",
"mass": "132.91",
"row": 5,
"col": 1,
"conf": "[Xe] 6s1",
"state": "Solid",
"summary": "A very soft, gold-coloured metal that explodes on contact with water.",
"life": "The official definition of one second is based on the vibration of caesium atoms in atomic clocks.",
"discovered": "1860, Robert Bunsen and Gustav Kirchhoff",
"nameFrom": "Latin 'caesius', sky blue, for its blue spectral lines",
"look": [
"m",
"#E0C27A"
],
"obj": [
"clock",
"Atomic clock"
],
"link": "https://en.wikipedia.org/wiki/Caesium"
},
{
"num": 56,
"symbol": "Ba",
"name": "Barium",
"cat": "ae",
"mass": "137.33",
"row": 5,
"col": 2,
"conf": "[Xe] 6s2",
"state": "Solid",
"summary": "A soft, silvery metal. Its compounds are heavy and block X-rays.",
"life": "Patients drink a 'barium meal' so their stomach shows up on X-rays; it gives fireworks a green colour.",
"discovered": "1774, Carl Scheele; isolated 1808 by Humphry Davy",
"nameFrom": "Greek 'barys', heavy",
"obj": [
"scanner",
"X-ray (barium meal)"
],
"link": "https://en.wikipedia.org/wiki/Barium"
},
{
"num": 57,
"symbol": "La",
"name": "Lanthanum",
"cat": "la",
"mass": "138.91",
"row": 7,
"col": 3,
"conf": "[Xe] 5d1 6s2",
"state": "Solid",
"summary": "A soft, silvery metal that starts the lanthanide row.",
"life": "Hybrid car batteries and high-quality camera lenses use lanthanum.",
"discovered": "1839, Carl Gustaf Mosander",
"nameFrom": "Greek 'lanthanein', to lie hidden",
"obj": [
"car",
"Hybrid car battery"
],
"link": "https://en.wikipedia.org/wiki/Lanthanum"
},
{
"num": 58,
"symbol": "Ce",
"name": "Cerium",
"cat": "la",
"mass": "140.12",
"row": 7,
"col": 4,
"conf": "[Xe] 4f1 5d1 6s2",
"state": "Solid",
"summary": "The most common of the 'rare earth' metals. It sparks when scraped.",
"life": "The 'flint' in a cigarette lighter is mostly cerium; it is also used to polish glass.",
"discovered": "1803, Jöns Jacob Berzelius and Wilhelm Hisinger",
"nameFrom": "The dwarf planet Ceres",
"obj": [
"lighter",
"Lighter flint"
],
"link": "https://en.wikipedia.org/wiki/Cerium"
},
{
"num": 59,
"symbol": "Pr",
"name": "Praseodymium",
"cat": "la",
"mass": "140.91",
"row": 7,
"col": 5,
"conf": "[Xe] 4f3 6s2",
"state": "Solid",
"summary": "A soft, silvery metal that gives glass a yellow-green colour.",
"life": "Welders' and glassblowers' goggles use praseodymium glass to protect their eyes.",
"discovered": "1885, Carl Auer von Welsbach",
"nameFrom": "Greek for 'green twin'",
"obj": [
"goggles",
"Welding goggles"
],
"link": "https://en.wikipedia.org/wiki/Praseodymium"
},
{
"num": 60,
"symbol": "Nd",
"name": "Neodymium",
"cat": "la",
"mass": "144.24",
"row": 7,
"col": 6,
"conf": "[Xe] 4f4 6s2",
"state": "Solid",
"summary": "A silvery metal used to make the strongest permanent magnets known.",
"life": "The tiny speakers in your AirPods and the magnets on your fridge often use neodymium.",
"discovered": "1885, Carl Auer von Welsbach",
"nameFrom": "Greek for 'new twin'",
"obj": [
"earbuds",
"Earbud magnets"
],
"link": "https://en.wikipedia.org/wiki/Neodymium"
},
{
"num": 61,
"symbol": "Pm",
"name": "Promethium",
"cat": "la",
"mass": "[145]",
"row": 7,
"col": 7,
"conf": "[Xe] 4f5 6s2",
"state": "Synthetic",
"summary": "A radioactive metal that is extremely rare in nature.",
"life": "It was once used in glow-in-the-dark watch dials and in tiny long-life batteries.",
"discovered": "1945, Jacob Marinsky, Lawrence Glendenin and Charles Coryell",
"nameFrom": "Prometheus, who stole fire from the gods",
"syn": 1,
"obj": [
"watch",
"Glowing watch dial"
],
"link": "https://en.wikipedia.org/wiki/Promethium"
},
{
"num": 62,
"symbol": "Sm",
"name": "Samarium",
"cat": "la",
"mass": "150.36",
"row": 7,
"col": 8,
"conf": "[Xe] 4f6 6s2",
"state": "Solid",
"summary": "A silvery metal that forms strong magnets which work at high temperatures.",
"life": "Samarium-cobalt magnets are used in electric guitars and headphones; it is also used to treat bone cancer pain.",
"discovered": "1879, Paul-Émile Lecoq de Boisbaudran",
"nameFrom": "The mineral samarskite, named after a Russian mining engineer",
"obj": [
"earbuds",
"Headphone magnets"
],
"link": "https://en.wikipedia.org/wiki/Samarium"
},
{
"num": 63,
"symbol": "Eu",
"name": "Europium",
"cat": "la",
"mass": "151.96",
"row": 7,
"col": 9,
"conf": "[Xe] 4f7 6s2",
"state": "Solid",
"summary": "A soft metal that glows red under ultraviolet light.",
"life": "Euro banknotes have security marks containing europium that glow under UV light.",
"discovered": "1901, Eugène-Anatole Demarçay",
"nameFrom": "Europe",
"obj": [
"banknote",
"Euro banknote"
],
"link": "https://en.wikipedia.org/wiki/Europium"
},
{
"num": 64,
"symbol": "Gd",
"name": "Gadolinium",
"cat": "la",
"mass": "157.25",
"row": 7,
"col": 10,
"conf": "[Xe] 4f7 5d1 6s2",
"state": "Solid",
"summary": "A silvery metal that is strongly attracted to magnets.",
"life": "Patients are injected with a gadolinium dye before some MRI scans to make images clearer.",
"discovered": "1880, Jean Charles Galissard de Marignac",
"nameFrom": "Johan Gadolin, a Finnish chemist",
"obj": [
"scanner",
"MRI contrast dye"
],
"link": "https://en.wikipedia.org/wiki/Gadolinium"
},
{
"num": 65,
"symbol": "Tb",
"name": "Terbium",
"cat": "la",
"mass": "158.93",
"row": 7,
"col": 11,
"conf": "[Xe] 4f9 6s2",
"state": "Solid",
"summary": "A soft, silvery metal that glows green under the right light.",
"life": "Green colours on some screens and fluorescent lamps come from terbium.",
"discovered": "1843, Carl Gustaf Mosander",
"nameFrom": "Ytterby, the Swedish village",
"obj": [
"screen",
"Green screen colour"
],
"link": "https://en.wikipedia.org/wiki/Terbium"
},
{
"num": 66,
"symbol": "Dy",
"name": "Dysprosium",
"cat": "la",
"mass": "162.50",
"row": 7,
"col": 12,
"conf": "[Xe] 4f10 6s2",
"state": "Solid",
"summary": "A bright, silvery metal that keeps magnets strong when hot.",
"life": "Electric car motors and wind turbines use dysprosium in their magnets.",
"discovered": "1886, Paul-Émile Lecoq de Boisbaudran",
"nameFrom": "Greek 'dysprositos', hard to get",
"obj": [
"turbine",
"Wind turbine"
],
"link": "https://en.wikipedia.org/wiki/Dysprosium"
},
{
"num": 67,
"symbol": "Ho",
"name": "Holmium",
"cat": "la",
"mass": "164.93",
"row": 7,
"col": 13,
"conf": "[Xe] 4f11 6s2",
"state": "Solid",
"summary": "A soft, silvery metal with the strongest magnetic properties of any element.",
"life": "Holmium lasers are used by doctors to break up kidney stones.",
"discovered": "1878, Per Teodor Cleve and others",
"nameFrom": "Holmia, Latin for Stockholm",
"obj": [
"scanner",
"Medical laser"
],
"link": "https://en.wikipedia.org/wiki/Holmium"
},
{
"num": 68,
"symbol": "Er",
"name": "Erbium",
"cat": "la",
"mass": "167.26",
"row": 7,
"col": 14,
"conf": "[Xe] 4f12 6s2",
"state": "Solid",
"summary": "A silvery metal that gives glass a pink colour.",
"life": "The fibre-optic cables carrying internet across oceans use erbium to boost the light signal.",
"discovered": "1843, Carl Gustaf Mosander",
"nameFrom": "Ytterby, the Swedish village",
"obj": [
"fiber",
"Undersea internet cable"
],
"link": "https://en.wikipedia.org/wiki/Erbium"
},
{
"num": 69,
"symbol": "Tm",
"name": "Thulium",
"cat": "la",
"mass": "168.93",
"row": 7,
"col": 15,
"conf": "[Xe] 4f13 6s2",
"state": "Solid",
"summary": "One of the rarest of the rare earth metals.",
"life": "Portable X-ray machines can use thulium; it is also in some medical lasers.",
"discovered": "1879, Per Teodor Cleve",
"nameFrom": "Thule, a mythical land in the far north",
"obj": [
"scanner",
"Portable X-ray"
],
"link": "https://en.wikipedia.org/wiki/Thulium"
},
{
"num": 70,
"symbol": "Yb",
"name": "Ytterbium",
"cat": "la",
"mass": "173.05",
"row": 7,
"col": 16,
"conf": "[Xe] 4f14 6s2",
"state": "Solid",
"summary": "A soft, silvery metal used in extremely precise clocks.",
"life": "Ytterbium atomic clocks are among the most accurate clocks ever built.",
"discovered": "1878, Jean Charles Galissard de Marignac",
"nameFrom": "Ytterby, the Swedish village",
"obj": [
"clock",
"Ultra-precise clock"
],
"link": "https://en.wikipedia.org/wiki/Ytterbium"
},
{
"num": 71,
"symbol": "Lu",
"name": "Lutetium",
"cat": "la",
"mass": "174.97",
"row": 7,
"col": 17,
"conf": "[Xe] 4f14 5d1 6s2",
"state": "Solid",
"summary": "The last and densest of the lanthanides; a hard silvery metal.",
"life": "Used in PET scanners in hospitals and in a targeted cancer treatment.",
"discovered": "1907, Georges Urbain",
"nameFrom": "Lutetia, the Latin name for Paris",
"obj": [
"scanner",
"PET scanner"
],
"link": "https://en.wikipedia.org/wiki/Lutetium"
},
{
"num": 72,
"symbol": "Hf",
"name": "Hafnium",
"cat": "tm",
"mass": "178.49",
"row": 5,
"col": 4,
"conf": "[Xe] 4f14 5d2 6s2",
"state": "Solid",
"summary": "A shiny, silvery metal that handles extreme heat.",
"life": "Hafnium is in the chips of modern computers and in control rods of nuclear reactors.",
"discovered": "1923, Dirk Coster and George de Hevesy",
"nameFrom": "Hafnia, Latin for Copenhagen",
"obj": [
"chip",
"Computer chip"
],
"link": "https://en.wikipedia.org/wiki/Hafnium"
},
{
"num": 73,
"symbol": "Ta",
"name": "Tantalum",
"cat": "tm",
"mass": "180.95",
"row": 5,
"col": 5,
"conf": "[Xe] 4f14 5d3 6s2",
"state": "Solid",
"summary": "A hard, blue-grey metal that resists corrosion and is safe in the body.",
"life": "Almost every phone and laptop contains tiny tantalum capacitors.",
"discovered": "1802, Anders Gustaf Ekeberg",
"nameFrom": "Tantalus of Greek mythology",
"obj": [
"phone",
"Phone capacitors"
],
"link": "https://en.wikipedia.org/wiki/Tantalum"
},
{
"num": 74,
"symbol": "W",
"name": "Tungsten",
"cat": "tm",
"mass": "183.84",
"row": 5,
"col": 6,
"conf": "[Xe] 4f14 5d4 6s2",
"state": "Solid",
"summary": "The metal with the highest melting point of all, at about 3,400 °C.",
"life": "The thin glowing wire in old-style light bulbs is tungsten; it is also used in heavy wedding rings.",
"discovered": "1783, the brothers Juan José and Fausto Elhuyar",
"nameFrom": "Swedish 'tung sten', heavy stone; the symbol W comes from 'wolfram'",
"obj": [
"bulb",
"Bulb filament"
],
"link": "https://en.wikipedia.org/wiki/Tungsten"
},
{
"num": 75,
"symbol": "Re",
"name": "Rhenium",
"cat": "tm",
"mass": "186.21",
"row": 5,
"col": 7,
"conf": "[Xe] 4f14 5d5 6s2",
"state": "Solid",
"summary": "One of the rarest metals in the Earth's crust, with a very high melting point.",
"life": "Jet engine parts in aircraft use rhenium alloys to survive the heat.",
"discovered": "1925, Walter Noddack, Ida Tacke and Otto Berg",
"nameFrom": "The river Rhine",
"obj": [
"jet",
"Jet engine"
],
"link": "https://en.wikipedia.org/wiki/Rhenium"
},
{
"num": 76,
"symbol": "Os",
"name": "Osmium",
"cat": "tm",
"mass": "190.23",
"row": 5,
"col": 8,
"conf": "[Xe] 4f14 5d6 6s2",
"state": "Solid",
"summary": "The densest natural element: a fist-sized lump weighs as much as a bowling ball.",
"life": "Used in fountain pen tips and electrical contacts because it is extremely hard-wearing.",
"discovered": "1803, Smithson Tennant",
"nameFrom": "Greek 'osme', smell, for its pungent oxide",
"look": [
"m",
"#9AA6C4"
],
"obj": [
"pen",
"Fountain pen nib"
],
"link": "https://en.wikipedia.org/wiki/Osmium"
},
{
"num": 77,
"symbol": "Ir",
"name": "Iridium",
"cat": "tm",
"mass": "192.22",
"row": 5,
"col": 9,
"conf": "[Xe] 4f14 5d7 6s2",
"state": "Solid",
"summary": "A very hard, rare metal that is the most corrosion-resistant of all.",
"life": "The tips of premium car spark plugs are made of iridium.",
"discovered": "1803, Smithson Tennant",
"nameFrom": "Iris, goddess of the rainbow, for its colourful salts",
"obj": [
"spark",
"Spark plug"
],
"link": "https://en.wikipedia.org/wiki/Iridium"
},
{
"num": 78,
"symbol": "Pt",
"name": "Platinum",
"cat": "tm",
"mass": "195.08",
"row": 5,
"col": 10,
"conf": "[Xe] 4f14 5d9 6s1",
"state": "Solid",
"summary": "A precious, silvery-white metal that does not tarnish.",
"life": "Platinum is used in jewellery, car catalytic converters and in the cancer drug cisplatin.",
"discovered": "Used by South American peoples before Columbus; described in Europe in 1748",
"nameFrom": "Spanish 'platina', little silver",
"look": [
"m",
"#CDD2D8"
],
"obj": [
"ring",
"Platinum ring",
"silver"
],
"link": "https://en.wikipedia.org/wiki/Platinum"
},
{
"num": 79,
"symbol": "Au",
"name": "Gold",
"cat": "tm",
"mass": "196.97",
"row": 5,
"col": 11,
"conf": "[Xe] 4f14 5d10 6s1",
"state": "Solid",
"summary": "A soft, yellow precious metal that never rusts or tarnishes.",
"life": "Jewellery and coins are gold, and a very thin layer of gold coats the connectors inside phones.",
"discovered": "Known since ancient times; the oldest gold jewellery is over 6,000 years old",
"nameFrom": "Old English 'gold'; the symbol Au comes from Latin 'aurum'",
"look": [
"m",
"#E2B946"
],
"obj": [
"ring",
"Gold ring"
],
"link": "https://en.wikipedia.org/wiki/Gold"
},
{
"num": 80,
"symbol": "Hg",
"name": "Mercury",
"cat": "tm",
"mass": "200.59",
"row": 5,
"col": 12,
"conf": "[Xe] 4f14 5d10 6s2",
"state": "Liquid",
"summary": "The only metal that is liquid at room temperature: a heavy, shiny, silvery liquid. It is toxic.",
"life": "Old thermometers used mercury; some fish like tuna contain small amounts of it.",
"discovered": "Known since ancient times; found in Egyptian tombs",
"nameFrom": "The planet Mercury; the symbol Hg comes from Greek for 'liquid silver'",
"look": [
"l",
"#C3C8CE",
"metal"
],
"obj": [
"thermo",
"Old thermometer"
],
"link": "https://en.wikipedia.org/wiki/Mercury_%28element%29"
},
{
"num": 81,
"symbol": "Tl",
"name": "Thallium",
"cat": "pt",
"mass": "204.38",
"row": 5,
"col": 13,
"conf": "[Xe] 4f14 5d10 6s2 6p1",
"state": "Solid",
"summary": "A soft, toxic metal that was once used as a poison.",
"life": "Tiny amounts are used in heart scans, which show how well blood reaches the heart.",
"discovered": "1861, William Crookes",
"nameFrom": "Greek 'thallos', green shoot, for its green spectral line",
"obj": [
"scanner",
"Heart scan"
],
"link": "https://en.wikipedia.org/wiki/Thallium"
},
{
"num": 82,
"symbol": "Pb",
"name": "Lead",
"cat": "pt",
"mass": "207.2",
"row": 5,
"col": 14,
"conf": "[Xe] 4f14 5d10 6s2 6p2",
"state": "Solid",
"summary": "A heavy, soft, grey metal that is toxic, especially to children.",
"life": "Car batteries contain lead, and X-ray rooms use lead aprons to block radiation.",
"discovered": "Known since ancient times; the Romans made water pipes from it",
"nameFrom": "Old English 'lead'; the symbol Pb comes from Latin 'plumbum', origin of 'plumber'",
"look": [
"m",
"#8A909A"
],
"obj": [
"carbattery",
"Car battery"
],
"link": "https://en.wikipedia.org/wiki/Lead"
},
{
"num": 83,
"symbol": "Bi",
"name": "Bismuth",
"cat": "pt",
"mass": "208.98",
"row": 5,
"col": 15,
"conf": "[Xe] 4f14 5d10 6s2 6p3",
"state": "Solid",
"summary": "A heavy metal that forms colourful rainbow crystals.",
"life": "The pink stomach remedy Pepto-Bismol contains bismuth.",
"discovered": "Known since the 1400s; recognised as a separate element in 1753",
"nameFrom": "Probably German 'weisse Masse', white mass",
"look": [
"c",
"bi"
],
"obj": [
"medicine",
"Stomach remedy"
],
"link": "https://en.wikipedia.org/wiki/Bismuth"
},
{
"num": 84,
"symbol": "Po",
"name": "Polonium",
"cat": "pt",
"mass": "[209]",
"row": 5,
"col": 16,
"conf": "[Xe] 4f14 5d10 6s2 6p4",
"state": "Solid",
"summary": "A rare and very radioactive metal discovered by Marie Curie, named after her homeland, Poland.",
"life": "It is used in anti-static brushes that remove dust from camera lenses and records.",
"discovered": "1898, Marie and Pierre Curie",
"nameFrom": "Poland, Marie Curie's homeland",
"obj": [
"record",
"Anti-static brush"
],
"link": "https://en.wikipedia.org/wiki/Polonium"
},
{
"num": 85,
"symbol": "At",
"name": "Astatine",
"cat": "ha",
"mass": "[210]",
"row": 5,
"col": 17,
"conf": "[Xe] 4f14 5d10 6s2 6p5",
"state": "Solid",
"summary": "One of the rarest natural elements: less than 30 grams exists in the Earth's crust at any time.",
"life": "Too rare for daily life; scientists are testing it for targeted cancer treatment.",
"discovered": "1940, Dale Corson, Kenneth MacKenzie and Emilio Segrè",
"nameFrom": "Greek 'astatos', unstable",
"look": [
"r",
"#C7B8EC"
],
"obj": [
"lab",
"Research laboratory"
],
"link": "https://en.wikipedia.org/wiki/Astatine"
},
{
"num": 86,
"symbol": "Rn",
"name": "Radon",
"cat": "ng",
"mass": "[222]",
"row": 5,
"col": 18,
"conf": "[Xe] 4f14 5d10 6s2 6p6",
"state": "Gas",
"summary": "A radioactive, invisible and odourless gas that can seep up from the ground.",
"life": "People test the air in basements for radon, as long exposure increases lung cancer risk.",
"discovered": "1899–1900, Ernest Rutherford, Robert Owens and Friedrich Ernst Dorn",
"nameFrom": "Radium, which gives it off as it decays",
"look": [
"g",
"#F0A3C8"
],
"obj": [
"house",
"Home radon test"
],
"link": "https://en.wikipedia.org/wiki/Radon"
},
{
"num": 87,
"symbol": "Fr",
"name": "Francium",
"cat": "am",
"mass": "[223]",
"row": 6,
"col": 1,
"conf": "[Rn] 7s1",
"state": "Solid",
"summary": "An extremely rare and radioactive metal that lasts only minutes.",
"life": "It has no everyday use; only a few atoms have ever been made at a time.",
"discovered": "1939, Marguerite Perey",
"nameFrom": "France",
"look": [
"r",
"#F7A8A0"
],
"obj": [
"lab",
"Research laboratory"
],
"link": "https://en.wikipedia.org/wiki/Francium"
},
{
"num": 88,
"symbol": "Ra",
"name": "Radium",
"cat": "ae",
"mass": "[226]",
"row": 6,
"col": 2,
"conf": "[Rn] 7s2",
"state": "Solid",
"summary": "A radioactive metal discovered by Marie and Pierre Curie. It glows faintly in the dark.",
"life": "It was once painted on clock dials to make them glow; today it is used to treat some cancers.",
"discovered": "1898, Marie and Pierre Curie",
"nameFrom": "Latin 'radius', ray",
"obj": [
"watch",
"Old glowing clock dial"
],
"link": "https://en.wikipedia.org/wiki/Radium"
},
{
"num": 89,
"symbol": "Ac",
"name": "Actinium",
"cat": "ac",
"mass": "[227]",
"row": 8,
"col": 3,
"conf": "[Rn] 6d1 7s2",
"state": "Solid",
"summary": "A radioactive metal that glows pale blue in the dark.",
"life": "Used in experimental cancer treatments that deliver radiation straight to tumours.",
"discovered": "1899, André-Louis Debierne",
"nameFrom": "Greek 'aktis', ray",
"obj": [
"scanner",
"Cancer treatment"
],
"link": "https://en.wikipedia.org/wiki/Actinium"
},
{
"num": 90,
"symbol": "Th",
"name": "Thorium",
"cat": "ac",
"mass": "232.04",
"row": 8,
"col": 4,
"conf": "[Rn] 6d2 7s2",
"state": "Solid",
"summary": "A slightly radioactive, silvery metal that is more common than tin.",
"life": "Old camping-lantern mantles glowed brightly thanks to thorium; it may fuel future nuclear reactors.",
"discovered": "1829, Jöns Jacob Berzelius",
"nameFrom": "Thor, Norse god of thunder",
"obj": [
"nuclear",
"Nuclear fuel research"
],
"link": "https://en.wikipedia.org/wiki/Thorium"
},
{
"num": 91,
"symbol": "Pa",
"name": "Protactinium",
"cat": "ac",
"mass": "231.04",
"row": 8,
"col": 5,
"conf": "[Rn] 5f2 6d1 7s2",
"state": "Solid",
"summary": "A rare, radioactive and toxic metal.",
"life": "No everyday use; scientists use it to date ocean sediments.",
"discovered": "1913, Kasimir Fajans and Oswald Göhring; studied further by Otto Hahn and Lise Meitner",
"nameFrom": "Greek for 'first', as it decays into actinium",
"obj": [
"lab",
"Research laboratory"
],
"link": "https://en.wikipedia.org/wiki/Protactinium"
},
{
"num": 92,
"symbol": "U",
"name": "Uranium",
"cat": "ac",
"mass": "238.03",
"row": 8,
"col": 6,
"conf": "[Rn] 5f3 6d1 7s2",
"state": "Solid",
"summary": "A heavy, radioactive metal that powers nuclear energy.",
"life": "Nuclear power plants use uranium fuel to make electricity; in France, most electricity comes from it.",
"discovered": "1789, Martin Heinrich Klaproth",
"nameFrom": "The planet Uranus",
"obj": [
"nuclear",
"Nuclear power"
],
"link": "https://en.wikipedia.org/wiki/Uranium"
},
{
"num": 93,
"symbol": "Np",
"name": "Neptunium",
"cat": "ac",
"mass": "[237]",
"row": 8,
"col": 7,
"conf": "[Rn] 5f4 6d1 7s2",
"state": "Solid",
"summary": "The first element heavier than uranium; it is radioactive and made in nuclear reactors.",
"life": "Used to make plutonium for space batteries; no everyday use.",
"discovered": "1940, Edwin McMillan and Philip Abelson",
"nameFrom": "The planet Neptune",
"obj": [
"probe",
"Space batteries"
],
"link": "https://en.wikipedia.org/wiki/Neptunium"
},
{
"num": 94,
"symbol": "Pu",
"name": "Plutonium",
"cat": "ac",
"mass": "[244]",
"row": 8,
"col": 8,
"conf": "[Rn] 5f6 7s2",
"state": "Solid",
"summary": "A radioactive metal made in reactors, known for nuclear weapons and energy.",
"life": "Plutonium batteries power space probes like the Voyager probes and the Mars rover Curiosity.",
"discovered": "1940, Glenn Seaborg and colleagues",
"nameFrom": "The dwarf planet Pluto",
"obj": [
"probe",
"Voyager space probe"
],
"link": "https://en.wikipedia.org/wiki/Plutonium"
},
{
"num": 95,
"symbol": "Am",
"name": "Americium",
"cat": "ac",
"mass": "[243]",
"row": 8,
"col": 9,
"conf": "[Rn] 5f7 7s2",
"state": "Synthetic",
"summary": "A synthetic radioactive metal made in nuclear reactors.",
"life": "A tiny speck of americium is inside most household smoke detectors.",
"discovered": "1944, Glenn Seaborg and colleagues",
"nameFrom": "The Americas",
"syn": 1,
"obj": [
"smoke",
"Smoke detector"
],
"link": "https://en.wikipedia.org/wiki/Americium"
},
{
"num": 96,
"symbol": "Cm",
"name": "Curium",
"cat": "ac",
"mass": "[247]",
"row": 8,
"col": 10,
"conf": "[Rn] 5f7 6d1 7s2",
"state": "Synthetic",
"summary": "A synthetic radioactive metal named after Marie and Pierre Curie.",
"life": "Used as a power source on space missions to analyse rocks on Mars.",
"discovered": "1944, Glenn Seaborg, Ralph James and Albert Ghiorso",
"nameFrom": "Marie and Pierre Curie",
"syn": 1,
"obj": [
"rover",
"Mars rover"
],
"link": "https://en.wikipedia.org/wiki/Curium"
},
{
"num": 97,
"symbol": "Bk",
"name": "Berkelium",
"cat": "ac",
"mass": "[247]",
"row": 8,
"col": 11,
"conf": "[Rn] 5f9 7s2",
"state": "Synthetic",
"summary": "A synthetic radioactive metal named after Berkeley, California.",
"life": "Only made in tiny amounts, mainly to create even heavier elements.",
"discovered": "1949, Stanley Thompson, Albert Ghiorso and Glenn Seaborg",
"nameFrom": "Berkeley, California",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Berkelium"
},
{
"num": 98,
"symbol": "Cf",
"name": "Californium",
"cat": "ac",
"mass": "[251]",
"row": 8,
"col": 12,
"conf": "[Rn] 5f10 7s2",
"state": "Synthetic",
"summary": "A synthetic radioactive metal that gives off neutrons.",
"life": "Used to start up nuclear reactors and to find gold and oil deposits underground.",
"discovered": "1950, a team at the University of California, Berkeley",
"nameFrom": "California",
"syn": 1,
"obj": [
"nuclear",
"Reactor start-up"
],
"link": "https://en.wikipedia.org/wiki/Californium"
},
{
"num": 99,
"symbol": "Es",
"name": "Einsteinium",
"cat": "ac",
"mass": "[252]",
"row": 8,
"col": 13,
"conf": "[Rn] 5f11 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Albert Einstein, first found in debris from a hydrogen bomb test.",
"life": "Only used in research; it is too rare and radioactive for daily life.",
"discovered": "1952, found in debris from the first hydrogen bomb test",
"nameFrom": "Albert Einstein",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Einsteinium"
},
{
"num": 100,
"symbol": "Fm",
"name": "Fermium",
"cat": "ac",
"mass": "[257]",
"row": 8,
"col": 14,
"conf": "[Rn] 5f12 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after physicist Enrico Fermi.",
"life": "Only made in laboratories for research.",
"discovered": "1952, found in debris from the first hydrogen bomb test",
"nameFrom": "Enrico Fermi",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Fermium"
},
{
"num": 101,
"symbol": "Md",
"name": "Mendelevium",
"cat": "ac",
"mass": "[258]",
"row": 8,
"col": 15,
"conf": "[Rn] 5f13 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Dmitri Mendeleev, who created the periodic table.",
"life": "Only made a few atoms at a time, for research.",
"discovered": "1955, Albert Ghiorso and colleagues",
"nameFrom": "Dmitri Mendeleev, creator of the periodic table",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Mendelevium"
},
{
"num": 102,
"symbol": "No",
"name": "Nobelium",
"cat": "ac",
"mass": "[259]",
"row": 8,
"col": 16,
"conf": "[Rn] 5f14 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Alfred Nobel, founder of the Nobel Prizes.",
"life": "Only exists for seconds in research laboratories.",
"discovered": "1958–1966, teams in Dubna (Russia) and Berkeley",
"nameFrom": "Alfred Nobel",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Nobelium"
},
{
"num": 103,
"symbol": "Lr",
"name": "Lawrencium",
"cat": "ac",
"mass": "[262]",
"row": 8,
"col": 17,
"conf": "[Rn] 5f14 7s2 7p1",
"state": "Synthetic",
"summary": "A synthetic element named after Ernest Lawrence, inventor of the cyclotron particle accelerator.",
"life": "Only made in laboratories for research.",
"discovered": "1961, Albert Ghiorso and colleagues",
"nameFrom": "Ernest Lawrence, inventor of the cyclotron",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Lawrencium"
},
{
"num": 104,
"symbol": "Rf",
"name": "Rutherfordium",
"cat": "tm",
"mass": "[267]",
"row": 6,
"col": 4,
"conf": "[Rn] 5f14 6d2 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Ernest Rutherford, who discovered the atomic nucleus.",
"life": "Only a few atoms have ever been made; no practical use.",
"discovered": "1964–1969, teams in Dubna and Berkeley",
"nameFrom": "Ernest Rutherford",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Rutherfordium"
},
{
"num": 105,
"symbol": "Db",
"name": "Dubnium",
"cat": "tm",
"mass": "[268]",
"row": 6,
"col": 5,
"conf": "[Rn] 5f14 6d3 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Dubna, a Russian science town.",
"life": "Exists only briefly in research laboratories.",
"discovered": "1968–1970, teams in Dubna and Berkeley",
"nameFrom": "Dubna, Russia",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Dubnium"
},
{
"num": 106,
"symbol": "Sg",
"name": "Seaborgium",
"cat": "tm",
"mass": "[269]",
"row": 6,
"col": 6,
"conf": "[Rn] 5f14 6d4 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after chemist Glenn Seaborg, who was alive when it was named.",
"life": "Only a handful of atoms have ever been made.",
"discovered": "1974, Albert Ghiorso and colleagues",
"nameFrom": "Glenn Seaborg",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Seaborgium"
},
{
"num": 107,
"symbol": "Bh",
"name": "Bohrium",
"cat": "tm",
"mass": "[270]",
"row": 6,
"col": 7,
"conf": "[Rn] 5f14 6d5 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Niels Bohr, who explained how electrons orbit atoms.",
"life": "Lasts seconds; used only for research.",
"discovered": "1981, GSI laboratory, Darmstadt, Germany",
"nameFrom": "Niels Bohr",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Bohrium"
},
{
"num": 108,
"symbol": "Hs",
"name": "Hassium",
"cat": "tm",
"mass": "[269]",
"row": 6,
"col": 8,
"conf": "[Rn] 5f14 6d6 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after the German state of Hesse, where it was first made.",
"life": "Only a few atoms have ever been created.",
"discovered": "1984, GSI laboratory, Darmstadt",
"nameFrom": "Hesse, the German state",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Hassium"
},
{
"num": 109,
"symbol": "Mt",
"name": "Meitnerium",
"cat": "tm",
"mass": "[278]",
"row": 6,
"col": 9,
"conf": "[Rn] 5f14 6d7 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after physicist Lise Meitner, who helped discover nuclear fission.",
"life": "Exists only for a fraction of a second.",
"discovered": "1982, GSI laboratory, Darmstadt",
"nameFrom": "Lise Meitner",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Meitnerium"
},
{
"num": 110,
"symbol": "Ds",
"name": "Darmstadtium",
"cat": "tm",
"mass": "[281]",
"row": 6,
"col": 10,
"conf": "[Rn] 5f14 6d8 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Darmstadt, the German city where it was made.",
"life": "Only research use; it decays almost instantly.",
"discovered": "1994, GSI laboratory, Darmstadt",
"nameFrom": "Darmstadt, Germany",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Darmstadtium"
},
{
"num": 111,
"symbol": "Rg",
"name": "Roentgenium",
"cat": "tm",
"mass": "[282]",
"row": 6,
"col": 11,
"conf": "[Rn] 5f14 6d9 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after Wilhelm Röntgen, who discovered X-rays.",
"life": "No practical use, but X-rays, named after his discovery, are used in every hospital.",
"discovered": "1994, GSI laboratory, Darmstadt",
"nameFrom": "Wilhelm Röntgen, discoverer of X-rays",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Roentgenium"
},
{
"num": 112,
"symbol": "Cn",
"name": "Copernicium",
"cat": "tm",
"mass": "[285]",
"row": 6,
"col": 12,
"conf": "[Rn] 5f14 6d10 7s2",
"state": "Synthetic",
"summary": "A synthetic element named after astronomer Nicolaus Copernicus.",
"life": "Only a few atoms have ever existed.",
"discovered": "1996, GSI laboratory, Darmstadt",
"nameFrom": "Nicolaus Copernicus",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Copernicium"
},
{
"num": 113,
"symbol": "Nh",
"name": "Nihonium",
"cat": "pt",
"mass": "[286]",
"row": 6,
"col": 13,
"conf": "[Rn] 5f14 6d10 7s2 7p1",
"state": "Synthetic",
"summary": "A synthetic element, the first discovered in Asia; its name comes from 'Nihon', Japanese for Japan.",
"life": "Only research use.",
"discovered": "2004, RIKEN laboratory, Japan",
"nameFrom": "'Nihon', Japanese for Japan",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Nihonium"
},
{
"num": 114,
"symbol": "Fl",
"name": "Flerovium",
"cat": "pt",
"mass": "[289]",
"row": 6,
"col": 14,
"conf": "[Rn] 5f14 6d10 7s2 7p2",
"state": "Synthetic",
"summary": "A synthetic element named after Georgy Flerov, a Russian physicist.",
"life": "Exists only for seconds in laboratories.",
"discovered": "1998, Dubna, Russia",
"nameFrom": "The Flerov Laboratory, named after Georgy Flerov",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Flerovium"
},
{
"num": 115,
"symbol": "Mc",
"name": "Moscovium",
"cat": "pt",
"mass": "[290]",
"row": 6,
"col": 15,
"conf": "[Rn] 5f14 6d10 7s2 7p3",
"state": "Synthetic",
"summary": "A synthetic element named after the Moscow region.",
"life": "Only research use.",
"discovered": "2003, Dubna and Livermore teams",
"nameFrom": "The Moscow region",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Moscovium"
},
{
"num": 116,
"symbol": "Lv",
"name": "Livermorium",
"cat": "pt",
"mass": "[293]",
"row": 6,
"col": 16,
"conf": "[Rn] 5f14 6d10 7s2 7p4",
"state": "Synthetic",
"summary": "A synthetic element named after the Livermore laboratory in California.",
"life": "Exists for milliseconds; no practical use.",
"discovered": "2000, Dubna and Livermore teams",
"nameFrom": "Lawrence Livermore National Laboratory",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Livermorium"
},
{
"num": 117,
"symbol": "Ts",
"name": "Tennessine",
"cat": "ha",
"mass": "[294]",
"row": 6,
"col": 17,
"conf": "[Rn] 5f14 6d10 7s2 7p5",
"state": "Synthetic",
"summary": "A synthetic element named after the US state of Tennessee.",
"life": "Only a few atoms have ever been made.",
"discovered": "2010, Dubna, Oak Ridge and Vanderbilt teams",
"nameFrom": "Tennessee, USA",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Tennessine"
},
{
"num": 118,
"symbol": "Og",
"name": "Oganesson",
"cat": "ng",
"mass": "[294]",
"row": 6,
"col": 18,
"conf": "[Rn] 5f14 6d10 7s2 7p6",
"state": "Synthetic",
"summary": "The heaviest element ever made, named after physicist Yuri Oganessian. Only a handful of atoms have existed.",
"life": "No practical use; it completes the seventh row of the periodic table.",
"discovered": "2002, Dubna and Livermore teams",
"nameFrom": "Yuri Oganessian, a living physicist",
"syn": 1,
"link": "https://en.wikipedia.org/wiki/Oganesson"
}
]
});
