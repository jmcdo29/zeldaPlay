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
});
