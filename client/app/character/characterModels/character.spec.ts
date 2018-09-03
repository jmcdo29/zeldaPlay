import { characterDB } from '../mocks/characterDB.mock';
import { characterJSON } from '../mocks/characterJSON.mock';
import { Character } from './character';

test('new character', () => {
  const myChar = new Character();
  expect(myChar).toBeTruthy();
  myChar.gainExp(100000);
  myChar.levelUp();
  myChar.gainExp(1);
});
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
