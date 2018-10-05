import { consoleLogger as scribe } from 'mc-scribe';
import { getRepository } from 'typeorm';

import { Character } from '../db/entities/character_schema';
import { Note } from '../db/entities/note_schema';
import { Save } from '../db/entities/save_schema';
import { Skill } from '../db/entities/skill_schema';
import { Spell } from '../db/entities/spell_schema';
import { User } from '../db/entities/user_schema';
import { Weapon } from '../db/entities/weapon_schema';
import { ICharacter } from '../interfaces/characterInterface';
import { DatabaseError } from '../utils/errors/DatabaseError';

export async function getAll(): Promise<Array<Partial<Character>>> {
  scribe('INFO', 'Getting all unassigned characters.');
  const characters = await getRepository(Character)
    .createQueryBuilder()
    .select(['id', 'race', 'name'])
    .where({ user: 'dummyUser' })
    .getMany();
  if (characters.length === 0) {
    throw new DatabaseError('No characters found!', 'NO_CHAR');
  }
  scribe('INFO', 'Returning unassigned characters.');
  return characters;
}

export async function getOne(id: string): Promise<Character> {
  scribe('INFO', 'Getting single character.', 'Id:', id);
  const charRepo = await getRepository(Character);
  const character = await charRepo
    .createQueryBuilder('character')
    .select()
    .leftJoinAndSelect('character.skills', 'skill')
    .leftJoinAndSelect('character.spells', 'spell')
    .leftJoinAndSelect('character.weapons', 'weapon')
    .leftJoinAndSelect('character.saves', 'save')
    .leftJoinAndSelect('character.notes', 'note')
    .where('character.id = :id', { id })
    .printSql()
    .getOne();
  scribe('INFO', character);
  if (!character) {
    throw new DatabaseError('No character found', 'NO_CHAR');
  }
  scribe('DEBUG', character.id);
  scribe('DEBUG', 'Getting the character  skills.');
  scribe('DEBUG', character);
  return character;
}

export async function updateOne(id: string, body: ICharacter): Promise<any> {
  scribe('INFO', 'Updating single character.');
  const charRepo = await getRepository(Character);
  let newChar = new Character();
  newChar.notes = [];
  newChar.saves = [];
  newChar.skills = [];
  newChar.spells = [];
  newChar.weapons = [];
  newChar.ac = body.ac;
  newChar.charisma = body.attributes[5].value;
  newChar.constitution = body.attributes[2].value;
  newChar.craft_one = body.craftOne;
  newChar.craft_two = body.craftTwo;
  newChar.dexterity = body.attributes[1].value;
  newChar.experience = body.exp;
  newChar.flat_footed = body.flat_footed;
  newChar.health = body.health;
  newChar.id = body.id;
  newChar.intelligence = body.attributes[3].value;
  newChar.level = body.level;
  newChar.magic = body.magic;
  newChar.max_health = body.maxHealth;
  newChar.max_magic = body.maxMagic;
  newChar.name = body.name;
  body.notes.forEach((note) => {
    const myNote = new Note();
    myNote.id = note.id;
    myNote.important = false;
    myNote.message = note.msg;
    myNote.time = note.time;
    newChar.notes.push(myNote);
  });
  body.importantNotes.forEach((note) => {
    const myNote = new Note();
    myNote.id = note.id;
    myNote.important = true;
    myNote.message = note.msg;
    myNote.time = note.time;
    newChar.notes.push(myNote);
  });
  newChar.performance = body.performCust;
  newChar.profession = body.profession;
  newChar.race = body.race;
  body.savingThrows.forEach((save) => {
    const mySave = new Save();
    mySave.id = save.id;
    mySave.modifier = save.modifier;
    mySave.name = save.name;
    mySave.racial_bonus = save.racial;
  });
  newChar.size = body.size;
  body.skills.forEach((skill) => {
    const mySkill = new Skill();
    mySkill.id = skill.id;
    mySkill.item_modifier = skill.item;
    mySkill.misc_modifier = skill.misc;
    mySkill.modifier = skill.modifier;
    mySkill.name = skill.skillName;
    mySkill.racial_modifier = skill.racial;
    mySkill.ranks = skill.ranks;
    mySkill.trained = skill.trained ? skill.trained : false;
    mySkill.skill_type = 'skill';
    newChar.skills.push(mySkill);
  });
  body.magicSkills.forEach((skill) => {
    const mySkill = new Skill();
    mySkill.id = skill.id;
    mySkill.item_modifier = skill.item;
    mySkill.misc_modifier = skill.misc;
    mySkill.modifier = skill.modifier;
    mySkill.name = skill.skillName;
    mySkill.racial_modifier = skill.racial;
    mySkill.ranks = skill.ranks;
    mySkill.trained = skill.trained ? skill.trained : false;
    mySkill.skill_type = 'magic';
    newChar.skills.push(mySkill);
  });
  body.weaponSkills.forEach((skill) => {
    const mySkill = new Skill();
    mySkill.id = skill.id;
    mySkill.item_modifier = skill.item;
    mySkill.misc_modifier = skill.misc;
    mySkill.modifier = skill.modifier;
    mySkill.name = skill.skillName;
    mySkill.racial_modifier = skill.racial;
    mySkill.ranks = skill.ranks;
    mySkill.trained = skill.trained ? skill.trained : false;
    mySkill.skill_type = 'weapon';
    newChar.skills.push(mySkill);
  });
  body.spells.forEach((spell) => {
    const mySpell = new Spell();
    mySpell.damage = spell.damage;
    mySpell.diety = spell.diety;
    mySpell.effect = spell.effect;
    mySpell.id = spell.id;
    mySpell.modifier = spell.modifier;
    mySpell.mp_use = spell.mpUse;
    mySpell.name = spell.name;
    mySpell.number_of_hit = spell.multiplier;
    mySpell.use_diety = spell.useDiety;
    newChar.spells.push(mySpell);
  });
  newChar.strength = body.attributes[0].value;
  newChar.subrace = body.subrace;
  newChar.touch = body.touch;
  newChar.user = await getRepository(User).findOne(id);
  body.weapons.forEach((weapon) => {
    const myWeap = new Weapon();
    myWeap.ammo = weapon.ammo;
    myWeap.crit_multiplier = weapon.critDamage;
    myWeap.crit_range = parseArray(weapon.critRange);
    myWeap.damage = weapon.attack;
    myWeap.modifier = weapon.modifier;
    myWeap.name = weapon.name;
    myWeap.number_of_hits = weapon.numberOfAttacks;
    myWeap.range = weapon.range;
    myWeap.type = weapon.type;
    newChar.weapons.push(myWeap);
  });
  newChar.wisdom = body.attributes[4].value;
  newChar = await charRepo.save(newChar);
  return newChar.id;
}

export async function getUserCharacters(
  userId: string
): Promise<Array<Partial<Character>>> {
  scribe('Getting user characters.');
  if (!userId.startsWith('00U') || userId.length !== 12) {
    throw new DatabaseError('Bad user id.', 'BAD_USER');
  }
  scribe('Returning the user characters.');
  return getRepository(Character)
    .createQueryBuilder()
    .select(['id', 'race', 'name'])
    .where({ user_id: userId })
    .getMany();
}

export function newWeapon(charId, weapon) {}

function parseArray(array: string[]): string {
  if (array.length === 1) {
    return array[0];
  } else {
    return array[0] + ' - ' + array[array.length - 1];
  }
}
