import { Save } from '#Models/save';

test('should make a save object', () => {
  const mySave = new Save(undefined, 'Reflex', 'Dexterity', 8);
  expect(mySave).toBeTruthy();

  // getters and setters
  mySave.id = 'saveId';
  expect(mySave.id).toBe('saveId');
  mySave.modifier = 'Strength';
  expect(mySave.modifier).toBe('Strength');
  mySave.name = 'saveName';
  expect(mySave.name).toBe('saveName');
  mySave.racial = 2;
  expect(mySave.racial).toBe(2);
});
