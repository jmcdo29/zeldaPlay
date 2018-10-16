import { Gerudo } from './gerudo';

test('should create a Gerudo', () => {
  const myGerudo = new Gerudo();
  expect(myGerudo).toBeTruthy();
  expect(myGerudo.getRace()).toBe('Gerudo');
  expect(myGerudo.getAttributes()[0].getValue()).toBe(10);
  expect(myGerudo.getAttributes()[2].getValue()).toBe(9);
});
