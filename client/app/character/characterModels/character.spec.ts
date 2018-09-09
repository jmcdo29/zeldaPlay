import { characterDB } from '../mocks/characterDB.mock';
import { characterJSON } from '../mocks/characterJSON.mock';
import { Character } from './character';

test('new character', () => {
  const myChar = new Character();
  expect(myChar).toBeTruthy();
  myChar.gainExp(100000);
  myChar.levelUp();
  myChar.gainExp(1);

  // getters and setters
  myChar.setAC(10);
  expect(myChar.getAC()).toBe(10);
  myChar.setCraftOne('a craft');
  expect(myChar.getCraftOne()).toBe('a craft');
  myChar.setCraftTwo('craftTwo');
  expect(myChar.getCraftTwo()).toBe('craftTwo');
  myChar.setExp(5);
  expect(myChar.getExp()).toBe(5);
  myChar.setFlatFooted(5);
  expect(myChar.getFlatFooted()).toBe(5);
  myChar.setHealth(5);
  expect(myChar.getHealth()).toBe(5);
  myChar.setId('characterId');
  expect(myChar.getId()).toBe('characterId');
  myChar.setLevel(1);
  expect(myChar.getLevel()).toBe(1);
  myChar.setMagic(5);
  expect(myChar.getMagic()).toBe(5);
  myChar.setMaxHealth(10);
  expect(myChar.getMaxHealth()).toBe(10);
  myChar.setMaxMagic(10);
  expect(myChar.getMaxMagic()).toBe(10);
  myChar.setName('character name');
  expect(myChar.getName()).toBe('character name');
  myChar.setPerformCust('perf');
  expect(myChar.getPerformCust()).toBe('perf');
  myChar.setProfession('prof');
  expect(myChar.getProfession()).toBe('prof');
  myChar.setRace('none');
  expect(myChar.getRace()).toBe('none');
  myChar.setSize('tiny');
  expect(myChar.getSize()).toBe('tiny');
  myChar.setSubRace('double none');
  expect(myChar.getSubRace()).toBe('double none');
  myChar.setTouch(5);
  expect(myChar.getTouch()).toBe(5);
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
