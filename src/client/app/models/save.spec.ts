import { Save } from '#Models/save';

test('should make a save object', () => {
  const mySave = new Save(undefined, 'Reflex', 'Dexterity', 8);
  expect(mySave).toBeTruthy();

  // getters and setters
  mySave.setId('saveId');
  expect(mySave.getId()).toBe('saveId');
  mySave.setModifier('Strength');
  expect(mySave.getModifier()).toBe('Strength');
  mySave.setName('saveName');
  expect(mySave.getName()).toBe('saveName');
  mySave.setRacial(2);
  expect(mySave.getRacial()).toBe(2);
});
