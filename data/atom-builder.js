/* Atom Builder — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "atom-builder",
"title": "Atom Builder",
"subject": "chemistry",
"subjectName": "Chemistry",
"chapter": "6",
"tagline": "Build atoms from protons, neutrons and electrons",
"itemNoun": "atom",
"categories": [
{
"id": "am",
"name": "Alkali metal",
"color": "cat-coral",
"icon": "atom"
},
{
"id": "ae",
"name": "Alkaline earth metal",
"color": "cat-amber",
"icon": "atom"
},
{
"id": "tm",
"name": "Transition metal",
"color": "cat-lemon",
"icon": "atom"
},
{
"id": "pt",
"name": "Post-transition metal",
"color": "cat-sage",
"icon": "atom"
},
{
"id": "md",
"name": "Metalloid",
"color": "cat-mint",
"icon": "atom"
},
{
"id": "nm",
"name": "Reactive nonmetal",
"color": "cat-sky",
"icon": "atom"
},
{
"id": "ha",
"name": "Halogen",
"color": "cat-lilac",
"icon": "atom"
},
{
"id": "ng",
"name": "Noble gas",
"color": "cat-orchid",
"icon": "atom"
},
{
"id": "la",
"name": "Lanthanide",
"color": "cat-peach",
"icon": "atom"
},
{
"id": "ac",
"name": "Actinide",
"color": "cat-sand",
"icon": "atom"
}
],
"categoryLabel": "Family",
"hint": "Protons = the atomic number. Electrons = protons in a neutral atom. Neutrons = mass number minus protons.",
"tile": {
"big": "symbol",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{protons} protons · {neutrons} neutrons · {electrons} electrons"
],
"detail": [
{
"label": "Protons",
"field": "{protons}"
},
{
"label": "Neutrons",
"field": "{neutrons}"
},
{
"label": "Electrons",
"field": "{electrons}"
},
{
"label": "Mass number",
"field": "{massNum}"
},
{
"label": "Shells",
"field": "{shellText}"
}
],
"explore": {
"pictures": [
"sample",
"object",
"shells"
],
"start": 6
},
"modes": [
{
"id": "build",
"format": "buildit",
"title": "Build the atom",
"desc": "Add the right protons, neutrons and electrons.",
"icon": "+",
"color": "cat-sky",
"prompt": "Build a neutral atom of",
"sub": "{symbol} · atomic number {num} · mass number {massNum}",
"draw": "atom",
"parts": [
{
"field": "protons",
"label": "Protons",
"max": 20
},
{
"field": "neutrons",
"label": "Neutrons",
"max": 24
},
{
"field": "electrons",
"label": "Electrons",
"max": 20
}
]
},
{
"id": "neutrons",
"format": "quiz",
"title": "Count the neutrons",
"desc": "Work out the neutrons from the mass number.",
"icon": "n",
"color": "cat-amber",
"prompt": "How many neutrons in",
"show": "name",
"showAs": "big",
"sub": "atomic number {num} · mass number {massNum}",
"answer": "neutrons",
"answerAs": "symbol"
},
{
"id": "shells",
"format": "quiz",
"title": "Fill the shells",
"desc": "Pick the right electron arrangement.",
"icon": "2·8",
"color": "cat-mint",
"prompt": "How are the electrons arranged in",
"show": "name",
"showAs": "big",
"answer": "shellText",
"answerAs": "symbol"
},
{
"id": "explore",
"format": "explorer",
"title": "Explore the atoms",
"desc": "Tap an atom to see what it's made of.",
"icon": "◎",
"color": "cat-peach"
}
],
"items": [
{
"name": "Hydrogen",
"symbol": "H",
"cat": "nm",
"conf": "1s1",
"summary": "The lightest and most common element in the universe. It is an invisible gas that fuels the Sun and every star.",
"life": "Every drop of water you drink is two hydrogen atoms joined to one oxygen atom: H₂O.",
"discovered": "1766, Henry Cavendish",
"nameFrom": "Greek for 'water-maker', because it burns to make water",
"link": "https://en.wikipedia.org/wiki/Hydrogen",
"look": [
"g",
"#C9A2FF"
],
"obj": [
"glass",
"A glass of water"
],
"protons": 1,
"electrons": 1,
"massNum": 1,
"neutrons": 0,
"shellText": "1",
"num": 1,
"facts": [
"Atomic number 1, mass number 1: 1 proton, 1 − 1 = 0 neutrons, 1 electron.",
"The only common atom with no neutrons at all.",
"Its single electron sits alone in the first shell: pattern 1.",
"Has one outer electron like alkali metals, but is a nonmetal gas."
]
},
{
"name": "Helium",
"symbol": "He",
"cat": "ng",
"conf": "1s2",
"summary": "A light, colourless gas that almost never reacts with anything. It is the second most common element in the universe.",
"life": "It makes party balloons float, and divers breathe it mixed with oxygen on very deep dives.",
"discovered": "1868, Pierre Janssen and Norman Lockyer, seen in sunlight before it was found on Earth",
"nameFrom": "Greek 'helios', the Sun",
"link": "https://en.wikipedia.org/wiki/Helium",
"look": [
"g",
"#FFB48F"
],
"obj": [
"balloon",
"Party balloons"
],
"protons": 2,
"electrons": 2,
"massNum": 4,
"neutrons": 2,
"shellText": "2",
"num": 2,
"facts": [
"Atomic number 2, mass number 4: 2 protons, 4 − 2 = 2 neutrons, 2 electrons.",
"Its 2 electrons completely fill the first shell, so it is unreactive.",
"A noble gas with a shell pattern of just 2, not 2·8."
]
},
{
"name": "Lithium",
"symbol": "Li",
"cat": "am",
"conf": "[He] 2s1",
"summary": "The lightest metal, so soft you can cut it with a knife. It reacts with water, so it is never found pure in nature.",
"life": "The rechargeable battery in your iPhone and Mac is a lithium-ion battery.",
"discovered": "1817, Johan August Arfwedson",
"nameFrom": "Greek 'lithos', stone",
"link": "https://en.wikipedia.org/wiki/Lithium",
"obj": [
"phone",
"Phone battery"
],
"protons": 3,
"electrons": 3,
"massNum": 7,
"neutrons": 4,
"shellText": "2 · 1",
"num": 3,
"facts": [
"Atomic number 3, mass number 7: 3 protons, 7 − 3 = 4 neutrons, 3 electrons.",
"Shells: 2 fill the first shell, 1 starts the second: 2·1.",
"The first alkali metal: one outer electron, easily lost."
]
},
{
"name": "Beryllium",
"symbol": "Be",
"cat": "ae",
"conf": "[He] 2s2",
"summary": "A light, very stiff grey metal. Its dust is toxic, so it is handled with care.",
"life": "The giant mirrors of the James Webb Space Telescope are made of beryllium coated in gold.",
"discovered": "1798, Louis-Nicolas Vauquelin",
"nameFrom": "The gemstone beryl (emerald is a type of beryl)",
"link": "https://en.wikipedia.org/wiki/Beryllium",
"obj": [
"mirror",
"Space telescope mirror"
],
"protons": 4,
"electrons": 4,
"massNum": 9,
"neutrons": 5,
"shellText": "2 · 2",
"num": 4,
"facts": [
"Atomic number 4, mass number 9: 4 protons, 9 − 4 = 5 neutrons, 4 electrons.",
"Shells: 2·2, so two outer electrons, like magnesium and calcium.",
"One more neutron than protons: watch for this when building it."
]
},
{
"name": "Boron",
"symbol": "B",
"cat": "md",
"conf": "[He] 2s2 2p1",
"summary": "A hard, dark element that sits between metals and non-metals. Plants need a tiny amount to grow.",
"life": "Borosilicate glass, used in lab beakers and some oven dishes, contains boron, which helps it survive sudden temperature changes.",
"discovered": "1808, Gay-Lussac and Thénard, and Humphry Davy",
"nameFrom": "Borax, the mineral it comes from",
"link": "https://en.wikipedia.org/wiki/Boron",
"look": [
"c",
"#5A4A3E"
],
"obj": [
"dish",
"Oven-safe glass dish"
],
"protons": 5,
"electrons": 5,
"massNum": 11,
"neutrons": 6,
"shellText": "2 · 3",
"num": 5,
"facts": [
"Atomic number 5, mass number 11: 5 protons, 11 − 5 = 6 neutrons, 5 electrons.",
"Shells: 2·3, with three outer electrons.",
"A metalloid, unlike its neighbour carbon, which is a nonmetal."
]
},
{
"name": "Carbon",
"symbol": "C",
"cat": "nm",
"conf": "[He] 2s2 2p2",
"summary": "The element of life: every living thing is built around carbon atoms. Pure carbon can be soft graphite or hard diamond.",
"life": "Your pencil 'lead' is graphite, and a diamond ring is the same element arranged differently.",
"discovered": "Known since prehistoric times as charcoal and soot",
"nameFrom": "Latin 'carbo', charcoal",
"link": "https://en.wikipedia.org/wiki/Carbon",
"look": [
"c",
"#33343A"
],
"obj": [
"pencil",
"Pencil and diamond"
],
"protons": 6,
"electrons": 6,
"massNum": 12,
"neutrons": 6,
"shellText": "2 · 4",
"num": 6,
"facts": [
"Atomic number 6, mass number 12: 6 protons, 12 − 6 = 6 neutrons, 6 electrons.",
"Shells: 2·4. Four outer electrons let it form four bonds.",
"Carbon-14, a rarer isotope with 8 neutrons, is used for radiocarbon dating."
]
},
{
"name": "Nitrogen",
"symbol": "N",
"cat": "nm",
"conf": "[He] 2s2 2p3",
"summary": "A colourless gas that makes up about 78% of the air we breathe. Our bodies need it to build proteins and DNA.",
"life": "Fertilisers are full of nitrogen, and liquid nitrogen is used to freeze off warts.",
"discovered": "1772, Daniel Rutherford",
"nameFrom": "Greek for 'saltpetre-maker'",
"link": "https://en.wikipedia.org/wiki/Nitrogen",
"look": [
"g",
"#B48CFF"
],
"obj": [
"plant",
"Fertilised plants"
],
"protons": 7,
"electrons": 7,
"massNum": 14,
"neutrons": 7,
"shellText": "2 · 5",
"num": 7,
"facts": [
"Atomic number 7, mass number 14: 7 protons, 14 − 7 = 7 neutrons, 7 electrons.",
"Shells: 2·5, so five outer electrons, the same as phosphorus.",
"Usually forms three bonds, as in ammonia, NH₃."
]
},
{
"name": "Oxygen",
"symbol": "O",
"cat": "nm",
"conf": "[He] 2s2 2p4",
"summary": "A colourless gas making up about 21% of air. Animals need it to turn food into energy, and fires need it to burn.",
"life": "Every breath you take brings oxygen into your lungs; hospitals give extra oxygen to patients who need it.",
"discovered": "1771–1774, Carl Scheele and Joseph Priestley",
"nameFrom": "Greek for 'acid-maker'",
"link": "https://en.wikipedia.org/wiki/Oxygen",
"look": [
"g",
"#8FC8FF"
],
"obj": [
"tank",
"Oxygen cylinder"
],
"protons": 8,
"electrons": 8,
"massNum": 16,
"neutrons": 8,
"shellText": "2 · 6",
"num": 8,
"facts": [
"Atomic number 8, mass number 16: 8 protons, 16 − 8 = 8 neutrons, 8 electrons.",
"Shells: 2·6. It gains 2 electrons to form the oxide ion, O²⁻.",
"Six outer electrons, the same as sulfur directly below it."
]
},
{
"name": "Fluorine",
"symbol": "F",
"cat": "ha",
"conf": "[He] 2s2 2p5",
"summary": "A pale yellow gas, the most reactive of all elements. It grabs onto almost anything it touches.",
"life": "Toothpaste contains fluoride, a form of fluorine that strengthens tooth enamel.",
"discovered": "1886, Henri Moissan, who won a Nobel Prize for it",
"nameFrom": "Latin 'fluere', to flow (fluorite helps metals melt)",
"link": "https://en.wikipedia.org/wiki/Fluorine",
"look": [
"g",
"#E6E27A"
],
"obj": [
"toothpaste",
"Fluoride toothpaste"
],
"protons": 9,
"electrons": 9,
"massNum": 19,
"neutrons": 10,
"shellText": "2 · 7",
"num": 9,
"facts": [
"Atomic number 9, mass number 19: 9 protons, 19 − 9 = 10 neutrons, 9 electrons.",
"Shells: 2·7, one short of a full second shell.",
"Gains 1 electron to become fluoride, F⁻, with the same arrangement as neon."
]
},
{
"name": "Neon",
"symbol": "Ne",
"cat": "ng",
"conf": "[He] 2s2 2p6",
"summary": "A colourless gas that does not react with anything. It glows bright orange-red when electricity passes through it.",
"life": "The classic glowing red-orange signs in shop windows are neon tubes.",
"discovered": "1898, William Ramsay and Morris Travers",
"nameFrom": "Greek 'neos', new",
"link": "https://en.wikipedia.org/wiki/Neon",
"look": [
"g",
"#FF5A2A"
],
"obj": [
"neon",
"Neon sign"
],
"protons": 10,
"electrons": 10,
"massNum": 20,
"neutrons": 10,
"shellText": "2 · 8",
"num": 10,
"facts": [
"Atomic number 10, mass number 20: 10 protons, 20 − 10 = 10 neutrons, 10 electrons.",
"Shells: 2·8. Both shells are full, so it does not react.",
"Comes right after fluorine (2·7) and right before sodium (2·8·1)."
]
},
{
"name": "Sodium",
"symbol": "Na",
"cat": "am",
"conf": "[Ne] 3s1",
"summary": "A soft, silvery metal that fizzes violently in water. Our nerves use it to send signals.",
"life": "Table salt is sodium chloride; the orange glow of old street lamps comes from sodium.",
"discovered": "1807, Humphry Davy, using electricity",
"nameFrom": "'Soda'; the symbol Na comes from Latin 'natrium'",
"link": "https://en.wikipedia.org/wiki/Sodium",
"obj": [
"salt",
"Table salt"
],
"protons": 11,
"electrons": 11,
"massNum": 23,
"neutrons": 12,
"shellText": "2 · 8 · 1",
"num": 11,
"facts": [
"Atomic number 11, mass number 23: 11 protons, 23 − 11 = 12 neutrons, 11 electrons.",
"Shells: 2·8·1. The 11th electron must start the third shell.",
"Loses that one outer electron to form Na⁺, with neon's arrangement."
]
},
{
"name": "Magnesium",
"symbol": "Mg",
"cat": "ae",
"conf": "[Ne] 3s2",
"summary": "A light, shiny metal that burns with a dazzling white flame. Plants need it at the centre of chlorophyll, the green pigment that captures sunlight.",
"life": "Magnesium is in green vegetables and nuts, and in the white sparks of fireworks.",
"discovered": "1808, Humphry Davy",
"nameFrom": "Magnesia, a region of ancient Greece",
"link": "https://en.wikipedia.org/wiki/Magnesium",
"look": [
"m",
"#C4C8CC"
],
"obj": [
"leaf",
"Leafy greens"
],
"protons": 12,
"electrons": 12,
"massNum": 24,
"neutrons": 12,
"shellText": "2 · 8 · 2",
"num": 12,
"facts": [
"Atomic number 12, mass number 24: 12 protons, 24 − 12 = 12 neutrons, 12 electrons.",
"Shells: 2·8·2, two outer electrons.",
"Loses both outer electrons to form Mg²⁺."
]
},
{
"name": "Aluminium",
"symbol": "Al",
"cat": "pt",
"conf": "[Ne] 3s2 3p1",
"summary": "A light, silvery metal that does not rust. It is the most common metal in the Earth's crust.",
"life": "Drink cans, kitchen foil and the body of your MacBook are made of aluminium.",
"discovered": "1825, Hans Christian Ørsted; first made pure by Friedrich Wöhler in 1827",
"nameFrom": "Latin 'alumen', alum (a salt used since antiquity)",
"link": "https://en.wikipedia.org/wiki/Aluminium",
"look": [
"m",
"#C9CED5"
],
"obj": [
"can",
"Drink can"
],
"protons": 13,
"electrons": 13,
"massNum": 27,
"neutrons": 14,
"shellText": "2 · 8 · 3",
"num": 13,
"facts": [
"Atomic number 13, mass number 27: 13 protons, 27 − 13 = 14 neutrons, 13 electrons.",
"Shells: 2·8·3, three outer electrons.",
"Loses all three to form Al³⁺; a thin oxide layer stops it corroding."
]
},
{
"name": "Silicon",
"symbol": "Si",
"cat": "md",
"conf": "[Ne] 3s2 3p2",
"summary": "A hard, shiny grey element that is a semiconductor: it can switch electricity on and off. Sand is mostly silicon and oxygen.",
"life": "The chip inside every phone and computer is built on a thin slice of silicon.",
"discovered": "1824, Jöns Jacob Berzelius",
"nameFrom": "Latin 'silex', flint",
"link": "https://en.wikipedia.org/wiki/Silicon",
"look": [
"c",
"#6F7C8D"
],
"obj": [
"chip",
"Computer chip"
],
"protons": 14,
"electrons": 14,
"massNum": 28,
"neutrons": 14,
"shellText": "2 · 8 · 4",
"num": 14,
"facts": [
"Atomic number 14, mass number 28: 14 protons, 28 − 14 = 14 neutrons, 14 electrons.",
"Shells: 2·8·4, four outer electrons, just like carbon above it.",
"A metalloid, while carbon in the same column is a nonmetal."
]
},
{
"name": "Phosphorus",
"symbol": "P",
"cat": "nm",
"conf": "[Ne] 3s2 3p3",
"summary": "A non-metal that comes in white, red and black forms. White phosphorus glows in the dark and catches fire in air.",
"life": "The striking strip on a matchbox contains red phosphorus; your bones and DNA contain phosphorus too.",
"discovered": "1669, Hennig Brand, by boiling down urine",
"nameFrom": "Greek for 'light-bearer', because it glows",
"link": "https://en.wikipedia.org/wiki/Phosphorus",
"look": [
"p",
"#B4302A"
],
"obj": [
"match",
"Matches"
],
"protons": 15,
"electrons": 15,
"massNum": 31,
"neutrons": 16,
"shellText": "2 · 8 · 5",
"num": 15,
"facts": [
"Atomic number 15, mass number 31: 15 protons, 31 − 15 = 16 neutrons, 15 electrons.",
"Shells: 2·8·5, five outer electrons, like nitrogen.",
"Part of phosphate groups in DNA, bones and the energy molecule ATP."
]
},
{
"name": "Sulfur",
"symbol": "S",
"cat": "nm",
"conf": "[Ne] 3s2 3p4",
"summary": "A bright yellow, brittle non-metal. Many of its compounds smell strongly.",
"life": "The smell of rotten eggs and of cooked garlic and onions comes from sulfur compounds.",
"discovered": "Known since ancient times; the 'brimstone' of the Bible",
"nameFrom": "Latin 'sulphur'",
"link": "https://en.wikipedia.org/wiki/Sulfur",
"look": [
"c",
"#F2D338"
],
"obj": [
"egg",
"Eggs and garlic"
],
"protons": 16,
"electrons": 16,
"massNum": 32,
"neutrons": 16,
"shellText": "2 · 8 · 6",
"num": 16,
"facts": [
"Atomic number 16, mass number 32: 16 protons, 32 − 16 = 16 neutrons, 16 electrons.",
"Shells: 2·8·6, six outer electrons, like oxygen.",
"Found in some amino acids, such as cysteine and methionine."
]
},
{
"name": "Chlorine",
"symbol": "Cl",
"cat": "ha",
"conf": "[Ne] 3s2 3p5",
"summary": "A greenish-yellow, poisonous gas. In small amounts it kills germs.",
"life": "Swimming pools and tap water are kept clean with chlorine; it is also half of table salt.",
"discovered": "1774, Carl Scheele",
"nameFrom": "Greek 'chloros', pale green",
"link": "https://en.wikipedia.org/wiki/Chlorine",
"look": [
"g",
"#C2D84E"
],
"obj": [
"pool",
"Swimming pool"
],
"protons": 17,
"electrons": 17,
"massNum": 35,
"neutrons": 18,
"shellText": "2 · 8 · 7",
"num": 17,
"facts": [
"Atomic number 17, mass number 35: 17 protons, 35 − 17 = 18 neutrons, 17 electrons.",
"Shells: 2·8·7, one short of a full third shell, like fluorine.",
"Gains 1 electron to form chloride, Cl⁻, the main negative ion in fluid outside cells."
]
},
{
"name": "Argon",
"symbol": "Ar",
"cat": "ng",
"conf": "[Ne] 3s2 3p6",
"summary": "A colourless gas that makes up about 1% of air. It does not react, so it protects things from oxygen.",
"life": "Double-glazed windows are often filled with argon to keep heat in.",
"discovered": "1894, Lord Rayleigh and William Ramsay",
"nameFrom": "Greek 'argos', lazy, because it reacts with nothing",
"link": "https://en.wikipedia.org/wiki/Argon",
"look": [
"g",
"#B57CFF"
],
"obj": [
"window",
"Double glazing"
],
"protons": 18,
"electrons": 18,
"massNum": 40,
"neutrons": 22,
"shellText": "2 · 8 · 8",
"num": 18,
"facts": [
"Atomic number 18, mass number 40: 18 protons, 40 − 18 = 22 neutrons, 18 electrons.",
"Shells: 2·8·8, a full outer shell.",
"Has 4 more neutrons than protons, the biggest gap in this game."
]
},
{
"name": "Potassium",
"symbol": "K",
"cat": "am",
"conf": "[Ar] 4s1",
"summary": "A soft metal that reacts so strongly with water it catches fire. Our hearts and muscles need it to work.",
"life": "Bananas, potatoes and avocados are rich in potassium.",
"discovered": "1807, Humphry Davy",
"nameFrom": "'Potash'; the symbol K comes from Latin 'kalium'",
"link": "https://en.wikipedia.org/wiki/Potassium",
"obj": [
"banana",
"Bananas"
],
"protons": 19,
"electrons": 19,
"massNum": 39,
"neutrons": 20,
"shellText": "2 · 8 · 8 · 1",
"num": 19,
"facts": [
"Atomic number 19, mass number 39: 19 protons, 39 − 19 = 20 neutrons, 19 electrons.",
"Shells: 2·8·8·1. The 19th electron starts the fourth shell.",
"Forms K⁺, the main positive ion inside body cells."
]
},
{
"name": "Calcium",
"symbol": "Ca",
"cat": "ae",
"conf": "[Ar] 4s2",
"summary": "A soft, silvery metal that is the most common mineral in our body. It builds bones and teeth.",
"life": "Milk, cheese and the chalk on a blackboard all contain calcium.",
"discovered": "1808, Humphry Davy",
"nameFrom": "Latin 'calx', lime",
"link": "https://en.wikipedia.org/wiki/Calcium",
"obj": [
"milk",
"Milk and cheese"
],
"protons": 20,
"electrons": 20,
"massNum": 40,
"neutrons": 20,
"shellText": "2 · 8 · 8 · 2",
"num": 20,
"facts": [
"Atomic number 20, mass number 40: 20 protons, 40 − 20 = 20 neutrons, 20 electrons.",
"Shells: 2·8·8·2, two outer electrons, like magnesium.",
"Same mass number as argon (40), but argon has 18 protons and 22 neutrons.",
"Forms Ca²⁺, needed for bones, muscle contraction and blood clotting."
]
}
],
"notes": {
"intro": "Every atom has a tiny nucleus of protons (positive) and neutrons (no charge), with electrons (negative) moving in shells around it. To build any atom you need two numbers. The atomic number is the number of protons, and it alone decides which element the atom is; in a neutral atom the electrons equal the protons, so the charges cancel. The mass number is protons plus neutrons, so neutrons = mass number minus atomic number. Electrons then fill shells from the inside out: the first shell holds up to 2, the second up to 8, and for the first 20 elements the third holds 8 before the fourth shell starts.",
"sections": [
{
"cat": "am",
"title": "Alkali metals (group 1)",
"about": "Alkali metals sit in the first column of the periodic table. Every one has a single electron in its outer shell, which it gives away very easily to form a +1 ion. That makes them soft, shiny and extremely reactive, especially with water, and they get more reactive going down the group. They are never found pure in nature. In this game lithium, sodium and potassium are alkali metals; hydrogen also has one outer electron but is a nonmetal gas.",
"points": [
"Shell pattern ends in 1: Li 2·1, Na 2·8·1, K 2·8·8·1.",
"Lose one electron to form ions such as Na⁺ and K⁺.",
"Reactivity with water: Li fizzes, Na fizzes fast, K catches fire."
],
"tip": "One lonely outer electron, desperate to leave."
},
{
"cat": "ae",
"title": "Alkaline earth metals (group 2)",
"about": "Alkaline earth metals form the second column. They have two electrons in their outer shell and lose both to form +2 ions. They are reactive metals, but less so than the alkali metal beside them in the same row. Beryllium, magnesium and calcium are the members in this game. Magnesium and calcium are vital minerals in the body.",
"points": [
"Shell pattern ends in 2: Be 2·2, Mg 2·8·2, Ca 2·8·8·2.",
"Form 2+ ions such as Mg²⁺ and Ca²⁺.",
"Helium also has 2 electrons but is a noble gas, because its only shell is full."
],
"tip": "Group 2 = two to give away."
},
{
"cat": "pt",
"title": "Post-transition metals",
"about": "Post-transition metals sit to the right of the transition metals and to the left of the metalloids. They are softer and have lower melting points than most transition metals. Aluminium is the only one among the first 20 elements. With three outer electrons, it tends to lose all three to form Al³⁺ ions.",
"points": [
"Aluminium: 2·8·3, forms Al³⁺.",
"Others include tin and lead."
],
"tip": "Aluminium: the light metal just before the staircase line."
},
{
"cat": "md",
"title": "Metalloids",
"about": "Metalloids sit along the staircase line that separates metals from nonmetals, and they have properties of both. They look somewhat metallic but are brittle, and many are semiconductors, conducting electricity only partly or under certain conditions. Boron and silicon are the metalloids in this game. Silicon's semiconductor behaviour is the basis of computer chips.",
"points": [
"Boron 2·3; silicon 2·8·4.",
"Semiconductor: conducts electricity better than a nonmetal but worse than a metal."
],
"tip": "Metalloids sit on the fence (the staircase) between metals and nonmetals."
},
{
"cat": "nm",
"title": "Reactive nonmetals",
"about": "Reactive nonmetals are on the right side of the periodic table, apart from hydrogen at the top left. They tend to gain or share electrons rather than lose them, forming covalent bonds with each other and negative ions with metals. They are poor conductors of heat and electricity. In this game hydrogen, carbon, nitrogen, oxygen, phosphorus and sulfur are reactive nonmetals; they are also the main elements of living things.",
"points": [
"H 1; C 2·4; N 2·5; O 2·6; P 2·8·5; S 2·8·6.",
"Same column = same outer electrons: N and P both have 5; O and S both have 6.",
"CHNOPS are the six key elements of life."
],
"tip": "CHNOPS: the elements that build you."
},
{
"cat": "ha",
"title": "Halogens (group 17)",
"about": "Halogens are one electron short of a full outer shell, with 7 outer electrons. They grab one electron to form a -1 ion (fluoride, chloride), which makes them very reactive nonmetals; reactivity falls going down the group, so fluorine is the most reactive of all. They often pair up with alkali metals to make salts, such as sodium chloride. Fluorine and chlorine are the halogens in this game.",
"points": [
"Shell pattern ends in 7: F 2·7, Cl 2·8·7.",
"Form 1− ions: F⁻ (fluoride), Cl⁻ (chloride).",
"Exist as pairs of atoms: F₂, Cl₂."
],
"tip": "Halogens are seven, one short of heaven (a full shell)."
},
{
"cat": "ng",
"title": "Noble gases (group 18)",
"about": "Noble gases already have a full outer shell, so they have no need to gain, lose or share electrons. That makes them almost completely unreactive, colourless gases that exist as single atoms. Helium has a full first shell of 2; neon and argon have a full outer shell of 8. Other atoms often react in ways that give them the same electron arrangement as a noble gas.",
"points": [
"He 2; Ne 2·8; Ar 2·8·8.",
"Full outer shell = stable and unreactive."
],
"tip": "Noble gases are 'full up' and need nobody."
}
],
"outro": "To build an atom: protons = atomic number; electrons = protons; neutrons = mass number − atomic number. Then fill shells 2, 8, 8, then the 4th; the last number in the pattern tells you the family."
}
});
