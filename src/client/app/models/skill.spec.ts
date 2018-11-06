import { Skill } from '#Models/skill';

test('should make a regular skill', () => {
  const mySkill = new Skill(
    '00Slkajsdf',
    'Climb',
    5,
    true,
    'Strength',
    0,
    0,
    0
  );
  expect(mySkill).toBeTruthy();
  expect(mySkill.skillName).toBe('Climb');
  expect(mySkill.ranks).toBe(5);
  expect(mySkill.trained);

  // getters and setters
  mySkill.id = 'a new id';
  expect(mySkill.id).toBe('a new id');
  mySkill.item = 1;
  expect(mySkill.item).toBe(1);
  mySkill.misc = 1;
  expect(mySkill.misc).toBe(1);
  mySkill.modifier = 'Dexterity';
  expect(mySkill.modifier).toBe('Dexterity');
  mySkill.racial = 1;
  expect(mySkill.racial).toBe(1);
  mySkill.ranks = 1;
  expect(mySkill.ranks).toBe(1);
  mySkill.skillName = 'test skill';
  expect(mySkill.skillName).toBe('test skill');
  mySkill.trained = false;
  expect(!mySkill.trained);
});
test('should make a weaponSkill', () => {
  const myWeaponSkill = new Skill(
    'some id',
    'Bow',
    10,
    true,
    undefined,
    undefined,
    3,
    undefined
  );
  expect(myWeaponSkill).toBeTruthy();
});
test('should make a magicSkill', () => {
  const myMagicSkill = new Skill(
    undefined,
    'Din',
    15,
    undefined,
    'Intelligence'
  );
  expect(myMagicSkill).toBeTruthy();
});
