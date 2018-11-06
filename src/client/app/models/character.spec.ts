import { characterDB } from '#Mocks/characterDB.mock';
import { characterJSON } from '#Mocks/characterJSON.mock';
import { Character } from '#Models/character';

test('new character', () => {
  const myChar = new Character();
  expect(myChar).toBeTruthy();
  expect(myChar.level).toBe(1);
  myChar.gainExp(100000);
  myChar.levelUp();
  myChar.gainExp(1);

  // getters and setters
  expect(myChar.ac).toBe(null);
  myChar.ac = 0;
  expect(myChar.ac).toBe(0);
  myChar.ac = 10;
  expect(myChar.ac).toBe(10);
  expect(myChar.craftOne).toBe('');
  myChar.craftOne = 'a craft';
  expect(myChar.craftOne).toBe('a craft');
  expect(myChar.craftTwo).toBe('');
  myChar.craftTwo = 'craftTwo';
  expect(myChar.craftTwo).toBe('craftTwo');
  myChar.exp = 0;
  expect(myChar.exp).toBe(0);
  myChar.exp = 5;
  expect(myChar.exp).toBe(5);
  expect(myChar.flatFooted).toBe(null);
  myChar.flatFooted = 0;
  expect(myChar.flatFooted).toBe(0);
  myChar.flatFooted = 5;
  expect(myChar.flatFooted).toBe(5);
  myChar.health = null;
  expect(myChar.health).toBe(null);
  myChar.health = 0;
  expect(myChar.health).toBe(0);
  myChar.health = 5;
  expect(myChar.health).toBe(5);
  expect(myChar.id).toBe('');
  myChar.id = 'characterId';
  expect(myChar.id).toBe('characterId');
  myChar.level = 1;
  expect(myChar.level).toBe(1);
  myChar.magic = null;
  expect(myChar.magic).toBe(null);
  myChar.magic = 0;
  expect(myChar.magic).toBe(0);
  myChar.magic = 5;
  expect(myChar.magic).toBe(5);
  myChar.maxHealth = null;
  expect(myChar.maxHealth).toBe(null);
  myChar.maxHealth = 0;
  expect(myChar.maxHealth).toBe(0);
  myChar.maxHealth = 10;
  expect(myChar.maxHealth).toBe(10);
  myChar.maxMagic = null;
  expect(myChar.maxMagic).toBe(null);
  myChar.maxMagic = 0;
  expect(myChar.maxMagic).toBe(0);
  myChar.maxMagic = 10;
  expect(myChar.maxMagic).toBe(10);
  expect(myChar.name).toBe('');
  myChar.name = 'character name';
  expect(myChar.name).toBe('character name');
  expect(myChar.performCust).toBe('');
  myChar.performCust = 'perf';
  expect(myChar.performCust).toBe('perf');
  expect(myChar.profession).toBe('');
  myChar.profession = 'prof';
  expect(myChar.profession).toBe('prof');
  expect(myChar.race).toBe('');
  myChar.race = 'none';
  expect(myChar.race).toBe('none');
  expect(myChar.size).toBe('M');
  myChar.size = 'tiny';
  expect(myChar.size).toBe('tiny');
  expect(myChar.subRace).toBe('');
  myChar.subRace = 'double none';
  expect(myChar.subRace).toBe('double none');
  expect(myChar.touch).toBe(null);
  myChar.touch = 0;
  expect(myChar.touch).toBe(0);
  myChar.touch = 5;
  expect(myChar.touch).toBe(5);
  expect(myChar.attributes).toBeTruthy();
  while (myChar.attributes.length > 0) {
    myChar.attributes.pop();
  }
  expect(myChar.attributes).toEqual([]);
  expect(myChar.skills).toBeTruthy();
  while (myChar.skills.length > 0) {
    myChar.skills.pop();
  }
  expect(myChar.skills).toEqual([]);
  expect(myChar.weaponSkills).toBeTruthy();
  while (myChar.weaponSkills.length > 0) {
    myChar.weaponSkills.pop();
  }
  expect(myChar.weaponSkills).toEqual([]);
  expect(myChar.magicSkills).toBeTruthy();
  while (myChar.magicSkills.length > 0) {
    myChar.magicSkills.pop();
  }
  expect(myChar.magicSkills).toEqual([]);
  while (myChar.weapons.length > 0) {
    myChar.weapons.pop();
  }
  expect(myChar.weapons).toEqual([]);
  while (myChar.spells.length > 0) {
    myChar.spells.pop();
  }
  expect(myChar.spells).toEqual([]);
  while (myChar.notes.length > 0) {
    myChar.notes.pop();
  }
  expect(myChar.notes).toEqual([]);
  while (myChar.importantNotes.length > 0) {
    myChar.importantNotes.pop();
  }
  expect(myChar.importantNotes).toEqual([]);
  expect(myChar.savingThrows).toBeTruthy();
  while (myChar.savingThrows.length > 0) {
    myChar.savingThrows.pop();
  }
  expect(myChar.savingThrows).toEqual([]);
  expect(myChar.inventory).toEqual([]);
});
// TODO: do better tests here!
test('new character from db', () => {
  const newChar = new Character(null, characterDB);
  expect(newChar).toBeTruthy();
  expect(newChar.name).toBe('Bryte');
});

test('new character from db', () => {
  const newChar = new Character(characterJSON);
  expect(newChar).toBeTruthy();
  expect(newChar.name).toBe('Bryte');
});
