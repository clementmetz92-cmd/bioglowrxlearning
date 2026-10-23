/* Formula Forge — game data. Edit the text freely; schema in data/README.md */
BGX.registerGame({
"id": "formula-forge",
"title": "Formula Forge",
"subject": "chemistry",
"subjectName": "Chemistry",
"chapter": "2",
"tagline": "Everyday substances and their chemical formulas",
"itemNoun": "compound",
"categories": [
{
"id": "element",
"name": "Element (one kind of atom)",
"color": "cat-sky",
"icon": "atom"
},
{
"id": "molecule",
"name": "Simple inorganic molecule",
"color": "cat-mint",
"icon": "molecule"
},
{
"id": "ionic",
"name": "Salt",
"color": "cat-coral",
"icon": "cube"
},
{
"id": "acid",
"name": "Acid",
"color": "cat-amber",
"icon": "flame"
},
{
"id": "base",
"name": "Base",
"color": "cat-lilac",
"icon": "drop"
},
{
"id": "organic",
"name": "Organic compound",
"color": "cat-sage",
"icon": "hexagon"
}
],
"categoryLabel": "Type",
"hint": "A formula tells you which atoms are in a substance and how many. H₂O means two hydrogen atoms and one oxygen atom.",
"tile": {
"big": "formula",
"corner": "num",
"label": "name"
},
"factLine": [
"name",
"{formula}",
"{category}"
],
"detail": [
{
"label": "Formula",
"field": "{formula}"
},
{
"label": "Type",
"field": "{category}"
},
{
"label": "Atoms",
"field": "{atoms}"
}
],
"explore": {
"pictures": []
},
"modes": [
{
"id": "explore",
"format": "explorer",
"title": "Explore compounds",
"desc": "Tap any formula to see what it is and where you meet it.",
"icon": "◎",
"color": "cat-peach"
},
{
"id": "formula",
"format": "quiz",
"title": "Name → Formula",
"desc": "See the name, pick its formula.",
"icon": "?",
"color": "cat-sky",
"prompt": "What is the formula for",
"show": "name",
"showAs": "big",
"answer": "formula",
"answerAs": "symbol"
},
{
"id": "name",
"format": "quiz",
"title": "Formula → Name",
"desc": "See the formula, name the substance.",
"icon": "H₂O",
"color": "cat-lemon",
"prompt": "Which substance is this?",
"showAs": "tile",
"answer": "name"
},
{
"id": "pairs",
"format": "matchpairs",
"title": "Match Pairs",
"desc": "Pair each formula with its everyday name.",
"icon": "⇄",
"color": "cat-mint",
"clue": "name",
"clueLabel": "Name"
},
{
"id": "type",
"format": "sortit",
"title": "What type is it?",
"desc": "Element, molecule, salt, acid, base or organic?",
"icon": "⌖",
"color": "cat-orchid",
"prompt": "What type of substance is this?",
"sub": "{formula}"
}
],
"items": [
{
"name": "Water",
"formula": "H₂O",
"cat": "molecule",
"atoms": "2 hydrogen, 1 oxygen",
"summary": "The most common liquid on Earth, and about 60% of your body.",
"life": "Every glass of water, cup of tea and raindrop.",
"num": 1,
"facts": [
"The 2 after H is a subscript: two hydrogens; the O has no number, so one oxygen.",
"A simple molecule of two non-metals; it starts with H but is neutral, not an acid.",
"One oxygen fewer than hydrogen peroxide, H₂O₂."
]
},
{
"name": "Carbon dioxide",
"formula": "CO₂",
"cat": "molecule",
"atoms": "1 carbon, 2 oxygen",
"summary": "A gas you breathe out; plants take it in to make sugar.",
"life": "The bubbles in fizzy drinks are carbon dioxide.",
"num": 2,
"facts": [
"'Di' means two: two oxygen atoms on one carbon.",
"Inorganic despite containing carbon, because it has no carbon-hydrogen bonds.",
"One more oxygen than carbon monoxide (CO); CO₂ is far less toxic.",
"Dissolves in water to form weak carbonic acid."
]
},
{
"name": "Carbon monoxide",
"formula": "CO",
"cat": "molecule",
"atoms": "1 carbon, 1 oxygen",
"summary": "A poisonous, odourless gas from fuel that burns without enough air.",
"life": "Home CO alarms warn you about faulty boilers and heaters.",
"num": 3,
"facts": [
"'Mono' means one: one oxygen atom on one carbon.",
"Poisonous because it binds haemoglobin much more tightly than oxygen does.",
"Inorganic simple molecule, like CO₂, despite the carbon."
]
},
{
"name": "Ammonia",
"formula": "NH₃",
"cat": "molecule",
"atoms": "1 nitrogen, 3 hydrogen",
"summary": "A sharp-smelling gas used to make fertilisers and cleaners.",
"life": "The strong smell of some glass and floor cleaners is ammonia.",
"num": 4,
"facts": [
"NH₃: N for nitrogen, with three hydrogens.",
"Dissolved in water it acts as a weak base, but here it is classed as a simple molecule.",
"Not to be confused with ammonium, NH₄⁺, an ion found in salts."
]
},
{
"name": "Hydrogen peroxide",
"formula": "H₂O₂",
"cat": "molecule",
"atoms": "2 hydrogen, 2 oxygen",
"summary": "A liquid that releases oxygen and bleaches and disinfects.",
"life": "Used in hair bleach, teeth-whitening gels and wound cleaning.",
"num": 5,
"facts": [
"Two hydrogens and two oxygens: one more oxygen than water.",
"Breaks down into water and oxygen gas, which is why it fizzes on a wound.",
"Starts with H but is not classed as an acid."
]
},
{
"name": "Oxygen gas",
"formula": "O₂",
"cat": "element",
"atoms": "2 oxygen",
"summary": "The form of oxygen in the air: two oxygen atoms bonded together.",
"life": "Every breath you take brings O₂ into your lungs.",
"num": 6,
"facts": [
"An element: only one symbol, O, in the formula.",
"Diatomic: oxygen atoms pair up as O₂ in the air.",
"Same element as ozone (O₃) but with two atoms instead of three."
]
},
{
"name": "Nitrogen gas",
"formula": "N₂",
"cat": "element",
"atoms": "2 nitrogen",
"summary": "About 78% of the air; it is very unreactive.",
"life": "Crisp packets are filled with nitrogen to keep the crisps fresh.",
"num": 7,
"facts": [
"An element: N₂ contains only nitrogen atoms.",
"The two atoms are held by a very strong triple bond, which makes it unreactive.",
"Do not confuse with ammonia (NH₃), which also contains hydrogen."
]
},
{
"name": "Ozone",
"formula": "O₃",
"cat": "element",
"atoms": "3 oxygen",
"summary": "A form of oxygen with three atoms; high up it blocks UV light.",
"life": "The ozone layer protects you from sunburn-causing UV rays.",
"num": 8,
"facts": [
"Three oxygen atoms: O₃. Still an element because only oxygen is present.",
"An allotrope of oxygen: same element, different arrangement.",
"High up it protects from UV; at ground level it is an irritating pollutant."
]
},
{
"name": "Sodium chloride",
"formula": "NaCl",
"cat": "ionic",
"atoms": "1 sodium, 1 chlorine",
"summary": "Table salt: a crystal of sodium and chloride ions.",
"life": "The salt you sprinkle on food and the salt in sea water.",
"num": 9,
"facts": [
"A salt of sodium ions (Na⁺) and chloride ions (Cl⁻), one of each.",
"Metal symbol first, then the non-metal: the classic salt pattern.",
"Made when hydrochloric acid neutralises sodium hydroxide."
]
},
{
"name": "Sodium bicarbonate",
"formula": "NaHCO₃",
"cat": "ionic",
"atoms": "1 sodium, 1 hydrogen, 1 carbon, 3 oxygen",
"summary": "Baking soda: it releases carbon dioxide when heated or mixed with acid.",
"life": "It makes cakes rise and can neutralise stomach acid.",
"num": 10,
"facts": [
"Also called sodium hydrogen carbonate; the HCO₃ group is bicarbonate.",
"A salt: sodium (metal) first, then the bicarbonate group.",
"Reacts with acid to release CO₂ gas: the fizz in baking.",
"Has carbon but no C–H bond, so it is not organic."
]
},
{
"name": "Calcium carbonate",
"formula": "CaCO₃",
"cat": "ionic",
"atoms": "1 calcium, 1 carbon, 3 oxygen",
"summary": "The main mineral in chalk, limestone, eggshells and seashells.",
"life": "Many antacid tablets and calcium supplements are calcium carbonate.",
"num": 11,
"facts": [
"A salt of calcium (Ca²⁺) and carbonate (CO₃²⁻).",
"Reacts with acid to give CO₂; that is how vinegar dissolves limescale.",
"Contains carbon but is inorganic.",
"Differs from sodium bicarbonate: calcium instead of sodium, and no hydrogen."
]
},
{
"name": "Hydrochloric acid",
"formula": "HCl",
"cat": "acid",
"atoms": "1 hydrogen, 1 chlorine",
"summary": "A strong acid; your stomach makes it to digest food.",
"life": "Stomach acid is a dilute solution of hydrochloric acid.",
"num": 12,
"facts": [
"H + Cl: hydrogen with chlorine, the simplest common acid formula.",
"A strong acid: it splits almost completely into H⁺ and Cl⁻ in water.",
"Its salts are chlorides, like sodium chloride."
]
},
{
"name": "Sulfuric acid",
"formula": "H₂SO₄",
"cat": "acid",
"atoms": "2 hydrogen, 1 sulfur, 4 oxygen",
"summary": "A strong, very corrosive acid and one of the most produced industrial chemicals.",
"life": "The acid inside a car battery is sulfuric acid.",
"num": 13,
"facts": [
"Two hydrogens attached to a sulfate (SO₄) group.",
"A strong acid that also pulls water out of materials, causing severe burns.",
"Its salts are sulfates, like magnesium sulfate.",
"Compare nitric acid, HNO₃: one hydrogen and a nitrate group instead."
]
},
{
"name": "Nitric acid",
"formula": "HNO₃",
"cat": "acid",
"atoms": "1 hydrogen, 1 nitrogen, 3 oxygen",
"summary": "A strong, corrosive acid used to make fertilisers.",
"life": "Most nitrogen fertiliser on farms starts out as nitric acid.",
"num": 14,
"facts": [
"One hydrogen attached to a nitrate (NO₃) group.",
"Its salts are nitrates, such as ammonium nitrate fertiliser.",
"Do not mix up NO₃ (nitric acid) with NH₃ (ammonia)."
]
},
{
"name": "Sodium hydroxide",
"formula": "NaOH",
"cat": "base",
"atoms": "1 sodium, 1 oxygen, 1 hydrogen",
"summary": "Caustic soda (lye): a strong, corrosive base.",
"life": "Drain and oven cleaners often contain sodium hydroxide.",
"num": 15,
"facts": [
"Metal (Na) plus hydroxide (OH): the pattern for a base.",
"A strong base: it releases lots of OH⁻ ions in water.",
"Reacts with fats to make soap.",
"Do not confuse with sodium chloride (NaCl), a neutral salt."
]
},
{
"name": "Methane",
"formula": "CH₄",
"cat": "organic",
"atoms": "1 carbon, 4 hydrogen",
"summary": "The simplest hydrocarbon and the main part of natural gas.",
"life": "The blue flame on a gas hob is burning methane.",
"num": 16,
"facts": [
"One carbon with four hydrogens: the simplest hydrocarbon.",
"Organic because it has carbon-hydrogen bonds.",
"Burns in oxygen to make carbon dioxide and water.",
"A greenhouse gas also released by cattle and wetlands."
]
},
{
"name": "Ethanol",
"formula": "C₂H₅OH",
"cat": "organic",
"atoms": "2 carbon, 6 hydrogen, 1 oxygen",
"summary": "The alcohol in drinks, also used as a fuel and disinfectant.",
"life": "Hand sanitiser gel is mostly ethanol.",
"num": 17,
"facts": [
"Written C₂H₅OH to show the OH group that makes it an alcohol.",
"Total atoms: 2 carbon, 6 hydrogen, 1 oxygen.",
"Its OH is bonded to carbon, so it is an alcohol, not a base like NaOH."
]
},
{
"name": "Glucose",
"formula": "C₆H₁₂O₆",
"cat": "organic",
"atoms": "6 carbon, 12 hydrogen, 6 oxygen",
"summary": "A simple sugar and the body's main fuel.",
"life": "A blood sugar test measures glucose.",
"num": 18,
"facts": [
"Six carbons, twelve hydrogens and six oxygens: C₆H₁₂O₆.",
"Hydrogen is double carbon and oxygen, the pattern of many sugars.",
"Plants make it from carbon dioxide and water in photosynthesis.",
"Cells break it down in respiration to release energy."
]
}
],
"diagram": "molecule",
"diagramCaption": "Ball-and-stick model",
"diagramPerItem": true,
"notes": {
"intro": "A chemical formula is a recipe for a substance: element symbols say which atoms are present, and the small subscript numbers say how many of each. No subscript means one atom, so CO₂ is one carbon and two oxygen atoms. To sort substances into types, look at what the formula is made of: one kind of atom only, a metal joined to non-metals, hydrogen in front of a non-metal group, a hydroxide (OH) on a metal, or a carbon skeleton with hydrogen. The games ask you to go from name to formula, formula to name, and formula to type.",
"sections": [
{
"cat": "element",
"title": "Elements (one kind of atom)",
"about": "An element contains only one kind of atom, even if those atoms are bonded together. Several gases exist as pairs of atoms (diatomic molecules), such as O₂ and N₂, but they are still elements because only one symbol appears in the formula. Ozone, O₃, is another form of the same element oxygen, with three atoms instead of two. Different forms of one element are called allotropes.",
"points": [
"Test: only one element symbol in the formula = element.",
"Diatomic elements: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂.",
"O₂ (the oxygen we breathe) and O₃ (ozone) are allotropes of oxygen."
],
"tip": "One symbol, any number: still one element."
},
{
"cat": "molecule",
"title": "Simple inorganic molecules",
"about": "These are small molecules made of two or more different non-metal elements sharing electrons (covalent bonds). They are not acids, bases or salts, and they are not organic even when they contain carbon. CO and CO₂ contain carbon but no carbon-hydrogen bonds, so chemists class them as inorganic. Watch the subscripts closely: H₂O and H₂O₂ differ by one oxygen and behave completely differently, and so do CO and CO₂.",
"points": [
"Different non-metals joined together, no metal.",
"CO (1 oxygen, poisonous) vs CO₂ (2 oxygen, breathed out).",
"H₂O (water) vs H₂O₂ (hydrogen peroxide, a bleach and disinfectant).",
"NH₃ is ammonia: one nitrogen, three hydrogen."
],
"tip": "Count the oxygens: H₂O vs H₂O₂ and CO₂ vs CO are completely different substances."
},
{
"cat": "ionic",
"title": "Salts",
"about": "A salt is an ionic compound: a metal ion (positive) held to a non-metal or a group of non-metals (negative) by the attraction of opposite charges. In a formula, the metal is written first, such as Na or Ca. Salts form solid crystals and many dissolve in water. Some salts contain a carbonate (CO₃) or hydrogen carbonate (HCO₃) group; they react with acids to give off carbon dioxide, which is why they work as antacids and raising agents.",
"points": [
"Test: starts with a metal and has no OH group at the end = salt.",
"NaCl = sodium chloride; NaHCO₃ = sodium bicarbonate; CaCO₃ = calcium carbonate.",
"Carbonates contain carbon but are not organic."
],
"tip": "Metal first, then the rest: that is a salt."
},
{
"cat": "acid",
"title": "Acids",
"about": "An acid releases hydrogen ions (H⁺) when it dissolves in water, giving a pH below 7. Inorganic acids are usually written with H first, followed by a non-metal or a non-metal group: HCl, H₂SO₄, HNO₃. The group after the H names the acid: chloride gives hydrochloric acid, sulfate gives sulfuric acid, nitrate gives nitric acid. All three here are strong acids, meaning they split up almost completely in water. Water and hydrogen peroxide also start with H but are not acids.",
"points": [
"HCl = hydrochloric (stomach acid); H₂SO₄ = sulfuric (car batteries); HNO₃ = nitric (fertilisers).",
"SO₄ = sulfate, NO₃ = nitrate, Cl = chloride.",
"Acid + base gives a salt and water (neutralisation)."
],
"tip": "H at the front, non-metal at the back: probably an acid."
},
{
"cat": "base",
"title": "Bases",
"about": "A base neutralises acids; bases that dissolve in water are called alkalis and give a pH above 7. Many common bases are metal hydroxides: a metal followed by OH. The OH⁻ (hydroxide) ion reacts with H⁺ from an acid to make water. Sodium hydroxide is a strong, corrosive base used in drain and oven cleaners. Do not confuse the OH in a metal hydroxide with the OH in ethanol: ethanol is organic and not a base.",
"points": [
"Test: metal + OH = hydroxide base, such as NaOH.",
"NaOH + HCl gives NaCl (salt) + H₂O (water).",
"Strong bases burn skin just as strong acids do."
],
"tip": "OH on a metal = base. OH on a carbon chain = alcohol."
},
{
"cat": "organic",
"title": "Organic compounds",
"about": "Organic compounds are built on a skeleton of carbon atoms bonded to hydrogen, often with oxygen or other elements. They are the chemistry of living things and of fuels. Organic formulas usually start with C, then H: CH₄, C₂H₅OH, C₆H₁₂O₆. Methane is the simplest hydrocarbon (only carbon and hydrogen), ethanol is an alcohol, and glucose is a sugar. CO, CO₂ and carbonates contain carbon but no C–H bonds, so they do not count as organic.",
"points": [
"Test: carbon bonded to hydrogen (formula starts C, then H) = organic.",
"CH₄ = methane; C₂H₅OH = ethanol; C₆H₁₂O₆ = glucose.",
"Ethanol has 6 hydrogens in total: 5 in C₂H₅ plus 1 in OH."
],
"tip": "C then H = carbon life chemistry."
}
],
"outro": "For any formula, read it left to right: one symbol only (element), metal first (salt or base), H first (acid), C with H (organic), otherwise a simple molecule."
}
});
