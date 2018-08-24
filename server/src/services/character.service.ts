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
export async function getAll(): Promise<Array<Partial<Character>>> {
  const characters = await Character.query()
    .select('id', 'name', 'race')
    .whereNull('user_id');
  if (characters.length === 0) {
    throw new DatabaseError('No characters found!', 'NO_CHAR');
  }
  return characters;
}

/**
 * function to retrieve on character and all of that characters skills, weapons, spells, saving throws, and notes.
 * @param {string} id  takes in the id of the character to retrieve
 * @returns {Promise<Character>} returns a promise of the character object with all fields
 * @throws {DatabaseError}
 */
export async function getOne(id: string): Promise<Character> {
  const character = await Character.query().findById(id);
  if (!character) {
    throw new DatabaseError('No character found', 'NO_CHAR');
  }
  character.skills = await character.$relatedQuery('skills').orderBy('name');
  character.weapons = await character
    .$relatedQuery('weapons')
    .eager('element')
    .orderBy('name');
  character.spells = await character.$relatedQuery('spells').orderBy('diety');
  character.saves = await character.$relatedQuery('saves').orderBy('name');
  character.notes = await character.$relatedQuery('notes').orderBy('time');
  return character;
}

/**
 * Function to either insert or update (upsert) a character from the client.
 * Function does about 70 or 80 queries when skills are present, more when there are weapons and spells in the character body
 * @param id {string} the id of the current user. NOT the character id.
 * @param body The json of the character to be updated
 * @returns {Promise<Character>}
 * @throws {DatabaseError}
 */
export async function updateOne(
  id: string,
  body: ICharacter
): Promise<Character> {
  const character = new Character(id, body);
  const charId = await Character.upsert(character);
  const chId = charId.id;
  const skills: Skill[] = [];
  const weapons: Weapon[] = [];
  const notes: Note[] = [];
  const spells: Spell[] = [];
  const saves: Save[] = [];
  // Skill.query().upsertGraph(body.skills);
  for (const skill of body.skills) {
    skills.push(new Skill(id, chId, skill, 'skill'));
  }
  for (const wSkill of body.weaponSkills) {
    skills.push(new Skill(id, chId, wSkill, 'weapon'));
  }
  for (const mSkill of body.magicSkills) {
    skills.push(new Skill(id, chId, mSkill, 'magic'));
  }
  for (const weapon of body.weapons) {
    weapons.push(new Weapon(id, chId, weapon));
  }
  for (const spell of body.spells) {
    spells.push(new Spell(id, chId, spell));
  }
  for (const note of body.notes) {
    notes.push(new Note(id, chId, note));
  }
  for (const note of body.importantNotes) {
    notes.push(new Note(id, chId, note));
  }
  for (const save of body.savingThrows) {
    saves.push(new Save(id, chId, save));
  }
  charId.skills = await Skill.query().upsertGraphAndFetch(skills, {
    insertMissing: true
  });
  charId.weapons = await Weapon.query().upsertGraphAndFetch(weapons, {
    insertMissing: true
  });
  charId.spells = await Spell.query().upsertGraphAndFetch(spells, {
    insertMissing: true
  });
  charId.saves = await Save.query().upsertGraphAndFetch(saves, {
    insertMissing: true
  });
  charId.notes = await Note.query().upsertGraphAndFetch(notes, {
    insertMissing: true
  });
  return charId;
}

/**
 * Function to get all the Character's names, ids, and races belonging to a single user.
 * @param {string} userId the user id necessary to know which characters to query for.
 * @returns {Promise<Array<Partial<Character>>>} returns a promise of an array of partial characters
 * @throws {DatabaseError}
 */
export async function getUserCharacters(
  userId: string
): Promise<Array<Partial<Character>>> {
  if (!userId.startsWith('00U') || userId.length !== 12) {
    throw new DatabaseError('Bad user id.', 'BAD_USER');
  }
  return Character.query()
    .select('id', 'race', 'name')
    .where({ user_id: userId });
}

export function newWeapon(charId, weapon) {}
