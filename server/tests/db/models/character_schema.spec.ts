import * as Knex from 'knex';
import { Model } from 'objection';
import { Character } from '../../../src/db/models/character_schema';
import { conn } from '../../dbConnection';

describe('#CharacterSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Character', () => {
    return Character.query()
      .insert({})
      .then((character) => {
        return character.$query().delete();
      })
      .then(() => {
        return;
      })
      .catch((err) => console.error(err));
  });
});
