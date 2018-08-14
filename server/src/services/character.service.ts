import { Character } from '../db/models/character_schema';
import { Note } from '../db/models/note_schema';
import { Save } from '../db/models/save_schema';
import { Skill } from '../db/models/skill_schema';
import { Spell } from '../db/models/spell_schema';
import { Weapon } from '../db/models/weapon_schema';
import { ICharacter } from '../interfaces/characterInterface';
import { DatabaseError } from '../utils/errors/DatabaseError';

/**
 * standard function to get all characters not belonging to a user
 * @returns {Promise<Array<Partial<Character>>>} Promise object that resolves to an array of Character objects
 *  with id, name, and race properties
 * @throws {DatabaseError} - Throws a database error to indicate something was wrong with the query
 */
export function getAll(): Promise<Array<Partial<Character>>> {
  return Character.query()
    .select('id', 'name', 'race')
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
 * @throws {DatabaseError}
 */
export function getOne(id: string): Promise<Character> {
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

/**
 * Function to either insert or update (upsert) a character from the client.
 * Function does about 70 or 80 queries when skills are present, more when there are weapons and spells in the character body
 * @param id {string} the id of the current user. NOT the character id.
 * @param body The json of the character to be updated
 * @returns {Promise<Character>}
 * @throws {DatabaseError}
 */
export function updateOne(id: string, body: ICharacter): Promise<Character> {
  const character = new Character(id, body);
  return character
    .upsert()
    .then((charId) => {
      const chId = charId.id;
      const promises: Array<Promise<any>> = [];
      promises.push(Promise.resolve(charId));
      body.skills.forEach((skill) => {
        promises.push(new Skill(id, chId, skill, 'skill').upsert());
      });
      body.weaponSkills.forEach((wSkill) => {
        promises.push(new Skill(id, chId, wSkill, 'weapon').upsert());
      });
      body.magicSkills.forEach((mSkill) => {
        promises.push(new Skill(id, chId, mSkill, 'magic').upsert());
      });
      body.weapons.forEach((weapon) => {
        promises.push(new Weapon(id, chId, weapon).upsert());
      });
      body.spells.forEach((spell) => {
        promises.push(new Spell(id, chId, spell).upsert());
      });
      body.notes.forEach((note) => {
        promises.push(new Note(id, chId, note).upsert());
      });
      body.savingThrows.forEach((save) => {
        promises.push(new Save(id, chId, save).upsert());
      });
      return Promise.all(promises);
    })
    .then((results) => {
      return results[0];
    })
    .catch((err: Error) => {
      if (!(err instanceof DatabaseError)) {
        const newErr = new DatabaseError(err.message, 'DB_ERROR');
        newErr.stack = err.stack;
        err = newErr;
      }
      throw err;
    });
}

/**
 * Function to get all the Character's names, ids, and races belonging to a single user.
 * @param {string} userId the user id necessary to know which characters to query for.
 * @returns {Promise<Array<Partial<Character>>>} returns a promise of an array of partial characters
 * @throws {DatabaseError}
 */
export function getUserCharacters(
  userId: string
): Promise<Array<Partial<Character>>> {
  if (!userId.startsWith('00U') && userId.length !== 12) {
    throw new DatabaseError('Bad user id.', 'BAD_USER');
  }
  return Character.query()
    .select('id', 'race', 'name')
    .where({ user_id: userId })
    .catch((err: Error) => {
      if (!(err instanceof DatabaseError)) {
        const newErr = new DatabaseError(err.message, 'DB_ERROR');
        newErr.stack = err.stack;
        err = newErr;
      }
      throw err;
    });
}

export function newWeapon(charId, weapon) {}
