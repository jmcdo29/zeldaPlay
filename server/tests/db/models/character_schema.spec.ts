import { config } from 'dotenv';
config();
import * as Knex from 'knex';
import * as connection from '../../../src/db/knexfile';
import { Character } from '../../../src/db/models/character_schema';

describe('#CharacterSchema', () => {
  beforeAll(() => {
    Character.knex(Knex(connection));
  });

  afterAll(() => {
    Character.knex().destroy();
  });

  test('should be able to insert a Character', () => {
    return Character.query()
      .insert({})
      .then((character) => {
        return character.$query().delete();
      })
      .then(() => {
        console.log('finished character.');
      })
      .catch((err) => console.error(err));
  });
});
