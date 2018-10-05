import { characterDB } from '../mocks/characterDB.mock';
import { characterJSON } from '../mocks/characterJSON.mock';
import { Character } from './character';

test('new character', () => {
  const myChar = new Character();
  expect(myChar).toBeTruthy();
  expect(myChar.getLevel()).toBe(1);
  myChar.gainExp(100000);
  myChar.levelUp();
  myChar.gainExp(1);

  // getters and setters
  expect(myChar.getAC()).toBe(null);
  myChar.setAC(0);
  expect(myChar.getAC()).toBe(0);
  myChar.setAC(10);
  expect(myChar.getAC()).toBe(10);
  expect(myChar.getCraftOne()).toBe('');
  myChar.setCraftOne('a craft');
  expect(myChar.getCraftOne()).toBe('a craft');
  expect(myChar.getCraftTwo()).toBe('');
  myChar.setCraftTwo('craftTwo');
  expect(myChar.getCraftTwo()).toBe('craftTwo');
  myChar.setExp(0);
  expect(myChar.getExp()).toBe(0);
  myChar.setExp(5);
  expect(myChar.getExp()).toBe(5);
  expect(myChar.getFlatFooted()).toBe(null);
  myChar.setFlatFooted(0);
  expect(myChar.getFlatFooted()).toBe(0);
  myChar.setFlatFooted(5);
  expect(myChar.getFlatFooted()).toBe(5);
  myChar.setHealth(null);
  expect(myChar.getHealth()).toBe(null);
  myChar.setHealth(0);
  expect(myChar.getHealth()).toBe(0);
  myChar.setHealth(5);
  expect(myChar.getHealth()).toBe(5);
  expect(myChar.getId()).toBe('');
  myChar.setId('characterId');
  expect(myChar.getId()).toBe('characterId');
  myChar.setLevel(1);
  expect(myChar.getLevel()).toBe(1);
  myChar.setMagic(null);
  expect(myChar.getMagic()).toBe(null);
  myChar.setMagic(0);
  expect(myChar.getMagic()).toBe(0);
  myChar.setMagic(5);
  expect(myChar.getMagic()).toBe(5);
  myChar.setMaxHealth(null);
  expect(myChar.getMaxHealth()).toBe(null);
  myChar.setMaxHealth(0);
  expect(myChar.getMaxHealth()).toBe(0);
  myChar.setMaxHealth(10);
  expect(myChar.getMaxHealth()).toBe(10);
  myChar.setMaxMagic(null);
  expect(myChar.getMaxMagic()).toBe(null);
  myChar.setMaxMagic(0);
  expect(myChar.getMaxMagic()).toBe(0);
  myChar.setMaxMagic(10);
  expect(myChar.getMaxMagic()).toBe(10);
  expect(myChar.getName()).toBe('');
  myChar.setName('character name');
  expect(myChar.getName()).toBe('character name');
  expect(myChar.getPerformCust()).toBe('');
  myChar.setPerformCust('perf');
  expect(myChar.getPerformCust()).toBe('perf');
  expect(myChar.getProfession()).toBe('');
  myChar.setProfession('prof');
  expect(myChar.getProfession()).toBe('prof');
  expect(myChar.getRace()).toBe('');
  myChar.setRace('none');
  expect(myChar.getRace()).toBe('none');
  expect(myChar.getSize()).toBe('M');
  myChar.setSize('tiny');
  expect(myChar.getSize()).toBe('tiny');
  expect(myChar.getSubRace()).toBe('');
  myChar.setSubRace('double none');
  expect(myChar.getSubRace()).toBe('double none');
  expect(myChar.getTouch()).toBe(null);
  myChar.setTouch(0);
  expect(myChar.getTouch()).toBe(0);
  myChar.setTouch(5);
  expect(myChar.getTouch()).toBe(5);
  expect(myChar.getAttributes()).toBeTruthy();
  while (myChar.getAttributes().length > 0) {
    myChar.getAttributes().pop();
  }
  expect(myChar.getAttributes()).toEqual([]);
  expect(myChar.getSkills()).toBeTruthy();
  while (myChar.getSkills().length > 0) {
    myChar.getSkills().pop();
  }
  expect(myChar.getSkills()).toEqual([]);
  expect(myChar.getWeaponSkills()).toBeTruthy();
  while (myChar.getWeaponSkills().length > 0) {
    myChar.getWeaponSkills().pop();
  }
  expect(myChar.getWeaponSkills()).toEqual([]);
  expect(myChar.getMagicSkills()).toBeTruthy();
  while (myChar.getMagicSkills().length > 0) {
    myChar.getMagicSkills().pop();
  }
  expect(myChar.getMagicSkills()).toEqual([]);
  while (myChar.getWeapons().length > 0) {
    myChar.getWeapons().pop();
  }
  expect(myChar.getWeapons()).toEqual([]);
  while (myChar.getSpells().length > 0) {
    myChar.getSpells().pop();
  }
  expect(myChar.getSpells()).toEqual([]);
  while (myChar.getNotes().length > 0) {
    myChar.getNotes().pop();
  }
  expect(myChar.getNotes()).toEqual([]);
  while (myChar.getImportantNotes().length > 0) {
    myChar.getImportantNotes().pop();
  }
  expect(myChar.getImportantNotes()).toEqual([]);
  expect(myChar.getSavingThrows()).toBeTruthy();
  while (myChar.getSavingThrows().length > 0) {
    myChar.getSavingThrows().pop();
  }
  expect(myChar.getSavingThrows()).toEqual([]);
  expect(myChar.getInventory()).toEqual([]);
});
// TODO: do better tests here!
test('new character from db', () => {
  const newChar = new Character(null, characterDB);
  expect(newChar).toBeTruthy();
  expect(newChar.getName()).toBe('Bryte');
});

test('new character from db', () => {
  const newChar = new Character(characterJSON);
  expect(newChar).toBeTruthy();
  expect(newChar.getName()).toBe('Bryte');
});
