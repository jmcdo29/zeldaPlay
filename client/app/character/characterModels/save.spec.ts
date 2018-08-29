import { Save } from './save';

test('should make a save object', () => {
  const mySave = new Save();
  mySave.racial = 8;
  mySave.name = 'reflex';
  mySave.modifier = 'Dexterity';
  mySave.id = 'lkajsdf';
  expect(mySave).toBeTruthy();
});
