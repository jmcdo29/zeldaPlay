INSERT INTO races
(name, edition) VALUES
("dwarf", "dd5")
,("elf", "dd5")
,("halfling", "dd5")
,("human", "dd5")
,("dragonborn", "dd5")
,("gnome", "dd5")
,("half-elf", "dd5")
,("half-orc", "dd5")
,("tiefling", "dd5");


INSERT INTO classes
(name, edition) VALUES
("barbarian", "dd5")
,("bard", "dd5")
,("cleric", "dd5")
,("druid", "dd5")
,("fighter", "dd5")
,("monk", "dd5")
,("paladin", "dd5")
,("ranger", "dd5")
,("rogue", "dd5")
,("sorcerer", "dd5")
,("warlock", "dd5")
,("wizard", "dd5");

INSERT INTO subraces
(name, race, edition) VALUES
("hill", "dwarf", "dd5")
,("mountain", "dwarf", "dd5")
,("high", "elf", "dd5")
,("dark", "elf", "dd5")
,("lightfoot", "halfling", "dd5")
,("stout", "halfling", "dd5")
,("rock", "gnome", "dd5")
,("forest", "gnome", "dd5");

INSERT INTO backgrounds(name, proficiencies, languages, equipment, "personalityTraits", ideals, bonds, flaws)
VALUES
('acolyte', '{"insight", "religion"}', null, 'A holy symbol (a gift to you when you entered priesthood), a prayer book or prayer wheel, 5 sticks of incense, vestments, a set of common clothes, and a belt pouch containing 15gp.', '{"I idolize a particular hero of my faith, and constantly refer to that person''s deeds and examples", "I can find common ground between the fiercest enemies, empathizing with them and always work towards peace.", "I see omens in every event and actions. The gods try to speak to us, we just need to listen.", "Nothing can shake my optimistic attitude.", "I quote (or misquote) sacred texts and proverbs in almost every situation.", "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.", "I''ve enjoyed fine food, drink, and high society among my temple''s elite. Rough living grates on me.", "I''ve spent so long in the temple that I have little practical experience dealing with people in the outside world."}', '{"Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)", "Charity. I always try to help those in need, no matter the personal cost. (Good)", "Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)", "Power. I hope to one day rise to the top of my faith''s religious hierarchy. (Lawful)", "Faith. I trust that my diety will guide my actions. I have faith that if I work hard, things will go well. (Lawful)", "Aspiration. I seek to prove myself worthy of my god''s favor by matching my actions against his or her teachings. (Any)"}', '{"I would die to recover an ancient relic of my faith that was lost long ago.", "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic", "I owe my life to the priest who took me in when my parents died.", "Everything I do is for the common people.", "I will do anything to protect the temple where I served.", "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."}', '{"I judge others harshly, and myself even more severely.", "I put too much trust into those who wield power within my temple''s hierarchy.", "My piety sometimes leads me to blindly trust those that profess faith in my god.", "I am inflexible in my thinking.", "I am suspicious of strangers and expect the worst of them.", "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."}');
