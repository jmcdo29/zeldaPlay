import { Character } from '../db/models/character_schema';
import { Skill } from '../db/models/skill_schema';
import { Note } from '../db/models/note_schema';
import { Save } from '../db/models/save_schema';
import { Spell } from '../db/models/spell_schema';
import { Weapon } from '../db/models/weapon_schema';
import { DatabaseError } from '../utils/ErrorObjects';

/**
 * standard function to get all characters not belonging to a user
 * @returns {Promise<Character[]>} Promise object that resolves to an array of Character objects with id, name, and race properties
 * @throws {DatabaseError} - Throws a database error to indicate something was wrong with the query
 */
export function getAll() {
  return Character.query()
    .select(['id', 'name', 'race'])
    .whereNull('user_id')
    .then((characters) => {
      if (characters.length === 0) {
        throw new DatabaseError('No characters found!', 'NO_CHAR');
      }
      return characters;
    })
    .catch((err) => {
      if (!(err instanceof DatabaseError)) {
        err = new DatabaseError(err.message, 'DB_ERROR');
      }
      throw err;
    });
}

/**
 * function to retrieve on character and all of that characters skills, weapons, spells, saving throws, and notes.
 * @param {string} id  takes in the id of the character to retrieve
 * @returns {Promise<Character>} returns a promise of the character object with all fields
 * @throws DatabaseError
 */
export function getOne(id) {
  return Character.query()
    .findById(id)
    .then((character) => {
      if (!character) {
        throw new DatabaseError('No character found', 'NO_CHAR');
      }
      return Promise.all([
        Promise.resolve(character),
        character.$relatedQuery('skills').orderBy('name'),
        character
          .$relatedQuery('weapons')
          .eager('element')
          .orderBy('name'),
        character.$relatedQuery('spells').orderBy('diety'),
        character.$relatedQuery('saves').orderBy('name'),
        character.$relatedQuery('notes').orderBy('time')
      ]);
    })
    .then((character) => {
      return character[0];
    })
    .catch((err) => {
      if (!(err instanceof DatabaseError)) {
        err = new DatabaseError(err.message, 'DB_ERROR');
      }
      throw err;
    });
}

export function updateOne(id, body) {
  const character = new Character(id, body);
  return Character.upsert(character)
    .then((charId) => {
      console.log(charId);
      const chId = charId.id;
      const skills = [];
      const spells = [];
      const weapons = [];
      const notes = [];
      const saves = [];
      body.skills.forEach((skill) => {
        skills.push(new Skill(id, chId, skill, 'skill'));
      });
      body.weaponSkills.forEach((wSkill) => {
        skills.push(new Skill(id, chId, wSkill, 'weapon'));
      });
      body.magicSkills.forEach((mSkill) => {
        skills.push(new Skill(id, chId, mSkill, 'magic'));
      });
      body.weapons.forEach((weapon) => {
        weapons.push(new Weapon(id, chId, weapon));
      });
      body.spells.forEach((spell) => {
        spells.push(new Spell(id, chId, spell));
      });
      body.notes.forEach((note) => {
        notes.push(new Note(id, chId, note));
      });
      body.savingThrows.forEach((save) => {
        saves.push(new Save(id, chId, save));
      });
      const promises = [];
      promises.push(Promise.resolve(charId));
      skills.forEach((skill) => {
        promises.push(Skill.upsert(skill));
      });
      weapons.forEach((weapon) => {
        promises.push(Weapon.upsert(weapon));
      });
      saves.forEach((save) => {
        promises.push(Save.upsert(save));
      });
      spells.forEach((spell) => {
        promises.push(Spell.upsert(spell));
      });
      notes.forEach((note) => {
        promises.push(Note.upsert(note));
      });
      return Promise.all(promises);
    })
    .then((results) => {
      return results[0];
    })
    .catch((err) => {
      if (!(err instanceof DatabaseError)) {
        const newErr = new DatabaseError(err.message, 'DB_ERROR');
        newErr.stack = err.stack;
        err = newErr;
      }
      throw err;
    });
}

export function getUserCharacters(userId) {
  if (!userId.startsWith('00U') && userId.length !== 12) {
    throw new DatabaseError('Bad user id.', 'BAD_USER');
  }
  return Character.query()
    .where({ user_id: userId })
    .catch((err) => {
      if (!(err instanceof DatabaseError)) {
        err = new DatabaseError(err.message, 'DB_ERROR');
      }
      throw err;
    });
}

export function newWeapon(charId, weapon) {}
