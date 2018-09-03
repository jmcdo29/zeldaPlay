import { Skill } from './skill';

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
  expect(mySkill.getSkillName()).toBe('Climb');
  expect(mySkill.getRanks()).toBe(5);
  expect(mySkill.getTrained());

  // getters and setters
  mySkill.setId('a new id');
  expect(mySkill.getId()).toBe('a new id');
  mySkill.setItem(1);
  expect(mySkill.getItem()).toBe(1);
  mySkill.setMisc(1);
  expect(mySkill.getMisc()).toBe(1);
  mySkill.setModifier('Dexterity');
  expect(mySkill.getModifier()).toBe('Dexterity');
  mySkill.setRacial(1);
  expect(mySkill.getRacial).toBe(1);
  mySkill.setRanks(1);
  expect(mySkill.getRanks()).toBe(1);
  mySkill.setSkillName('test skill');
  expect(mySkill.getSkillName()).toBe('test skill');
  mySkill.setTrained(false);
  expect(!mySkill.getTrained());
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
