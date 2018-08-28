import { ISave } from './save';

test('should make a save object', () => {
  const mySave: ISave = {
    racial: 8,
    name: 'reflex',
    modifier: 'Dexterity',
    id: ';lkajsdf'
  };
  expect(mySave).toBeTruthy();
});
