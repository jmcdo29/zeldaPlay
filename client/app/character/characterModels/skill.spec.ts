import { ISkill } from './skill';

test('should make a regular skill', () => {
  const mySkill: ISkill = {
    trained: true,
    skillName: 'Climb',
    ranks: 5,
    modifier: 'Strength',
    item: 0,
    misc: 0,
    racial: 0,
    id: '00Slkajsdf'
  };
  expect(mySkill).toBeTruthy();
});
test('should make a weaponSkill', () => {
  const myWeaponSkill: ISkill = {
    trained: true,
    ranks: 10,
    skillName: 'Bow',
    racial: 3
  };
  expect(myWeaponSkill).toBeTruthy();
});
test('should make a magicSkill', () => {
  const myMagicSkill: ISkill = {
    skillName: 'Din',
    modifier: 'Intelligence',
    ranks: 15
  };
  expect(myMagicSkill).toBeTruthy();
});
