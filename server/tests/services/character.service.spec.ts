import { readFileSync } from 'fs';
import * as Knex from 'knex';
import { Model } from 'objection';
import { Character } from '../../src/db/models/character_schema';
import {
  getAll,
  getOne,
  getUserCharacters,
  updateOne
} from '../../src/services/character.service';
import { conn } from '../dbConnection';

describe('#CharacterServerService', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });

  afterAll(() => {
    Model.knex().destroy();
  });

  test('getAll will getAll without user_id', async () => {
    try {
      expect.assertions(2);
      const characters = await getAll();
      expect(characters).toBeTruthy();
      expect(characters[0]).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });

  test('getOne should return a single character', async () => {
    try {
      expect.assertions(8);
      const characters = await getAll();
      const character = await getOne(characters[0].id);
      expect(character).toBeTruthy();
      expect(character.skills).toBeDefined();
      expect(character.spells).toBeDefined();
      expect(character.strength).toBeTruthy();
      expect(character.strength).not.toBeNaN();
      expect(character.weapons).toBeDefined();
      expect(character.notes).toBeDefined();
      expect(character.saves).toBeDefined();
    } catch (err) {
      console.error(err);
    }
  });

  test('getOne should fail with badId', async () => {
    try {
      expect.assertions(1);
      await getOne('00Cpq34lksdjf');
      console.log('somehow got a character');
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });

  test('getUserCharacters should fail with bad id', async () => {
    try {
      expect.assertions(1);
      await getUserCharacters('00Cjfueywn31');
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });

  test('getUserCharacters should fail with bad id', async () => {
    try {
      expect.assertions(1);
      await getUserCharacters('00Ujfueywn3');
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });

  test('getUserCharacters should pass with correct user id', async () => {
    try {
      expect.assertions(1);
      const characters = await getUserCharacters('00Ujfueywn31');
      expect(characters).toBeDefined();
      expect(characters.length === 0);
    } catch (err) {
      console.error(err);
    }
  });

  test('updateOne should fail with bad json', async () => {
    try {
      expect.assertions(1);
      await updateOne('00Ulkjdf', {} as any);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });

  describe('#FullASynDatabaseStuff', () => {
    afterAll(async () => {
      try {
        const character = await Character.query()
          .select('id')
          .where('name', 'MockChar')
          .orWhere('name', null)
          .first();
        await character.$query().delete();
      } catch (err) {
        console.error('error deleting mockCharacter');
        console.error(err);
      }
    });

    test(
      'updateOne should pass with valid json',
      async () => {
        try {
          expect.assertions(1);
          const mockChar = JSON.parse(
            readFileSync('server/tests/mocks/mockCharacter.json').toString()
          );
          const character = await updateOne('00U4732mM0N2', mockChar);
          expect(character).toBeTruthy();
        } catch (err) {
          console.error(err);
        }
      },
      10000
    );
  });
});
