import { config } from 'dotenv';
import * as Knex from 'knex';
import { Model } from 'objection';
import * as pg from 'pg';
import { Character } from '../../src/db/models/character_schema';
import {
  getAll,
  getOne,
  getUserCharacters,
  updateOne
} from '../../src/services/character.service';

describe('#CharacterServerService', () => {
  beforeEach(() => {
    config();
    pg.defaults.ssl = true;
    Model.knex(Knex({ client: 'pg', connection: process.env.DATABASE_URL }));
  });

  test('getAll will getAll without user_id', () => {
    expect.assertions(2);
    return getAll()
      .then((characters) => {
        expect(characters).toBeTruthy();
        expect(characters[0]).toBeTruthy();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  test('getOne should return a single user', () => {
    expect.assertions(8);
    return getAll()
      .then((characters) => {
        return getOne(characters[0].id);
      })
      .then((character) => {
        expect(character).toBeTruthy();
        expect(character.skills).toBeDefined();
        expect(character.spells).toBeDefined();
        expect(character.strength).toBeTruthy();
        expect(character.strength).not.toBeNaN();
        expect(character.weapons).toBeDefined();
        expect(character.notes).toBeDefined();
        expect(character.saves).toBeDefined();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  test('getOne should fail with badId', () => {
    expect.assertions(1);
    return getOne('00Cpq34lksdjf')
      .then((character) => {
        console.log('somehow got a character');
      })
      .catch((err) => {
        expect(err).toBeTruthy();
      });
  });
});
