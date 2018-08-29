import { Skill } from './skill';

test('should make a regular skill', () => {
  const mySkill = new Skill();
  mySkill.trained = true;
  mySkill.skillName = 'Climb';
  mySkill.ranks = 5;
  mySkill.modifier = 'Strength';
  mySkill.item = 0;
  mySkill.misc = 0;
  mySkill.racial = 0;
  mySkill.id = '00Slkajsdf';
  expect(mySkill).toBeTruthy();
});
test('should make a weaponSkill', () => {
  const myWeaponSkill = new Skill();
  myWeaponSkill.trained = true;
  myWeaponSkill.ranks = 10;
  myWeaponSkill.skillName = 'Bow';
  myWeaponSkill.racial = 3;
  expect(myWeaponSkill).toBeTruthy();
});
test('should make a magicSkill', () => {
  const myMagicSkill = new Skill();
  myMagicSkill.skillName = 'Din';
  myMagicSkill.modifier = 'Intelligence';
  myMagicSkill.ranks = 15;
  expect(myMagicSkill).toBeTruthy();
});
