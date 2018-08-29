import { Gerudo } from './gerudo';

test('should create a Gerudo', () => {
  const myGerudo = new Gerudo();
  expect(myGerudo).toBeTruthy();
  expect(myGerudo.race).toBe('Gerudo');
  expect(myGerudo.attributes[0].value).toBe(10);
  expect(myGerudo.attributes[2].value).toBe(9);
});
