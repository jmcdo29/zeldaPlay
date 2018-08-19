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
    return Character.upsert(new Character())
      .then((character) => {
        character.name = 'Test';
        return Character.upsert(character);
      })
      .then((character) => {
        return character.$query().patchAndFetch({ id: '123456789abc' });
      })
      .then((result) => {
        return Character.query()
          .delete()
          .where('name', 'like', '%Test%')
          .orWhere('name', 'like', '%test%');
      })
      .then(() => {})
      .catch((err) => {
        console.error(err);
        return Character.query()
          .delete()
          .where('name', 'like', '%Test%')
          .orWhere('name', 'like', '%test%');
      });
  });
  test('should get the tableNmae "character"', () => {
    expect(new Character().tableName()).toBe('character');
  });
});
