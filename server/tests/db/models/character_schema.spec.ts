import * as Knex from 'knex';
import { Model } from 'objection';
import { Character } from '../../../src/db/models/character_schema';
import { conn } from '../../dbConnection';

jest.retryTimes(3);

describe('#CharacterSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);

    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Character', async () => {
    try {
      const character = await Character.upsert(new Character());
      character.name = 'Test';
      await Character.upsert(character);
      await character.$query().patchAndFetch({ id: '123456789abc' });
      await Character.query()
        .delete()
        .where('name', 'like', '%Test%')
        .orWhere('name', 'like', '%test%');
    } catch (err) {
      console.error(err);
      await Character.query()
        .delete()
        .where('name', 'like', '%Test%')
        .orWhere('name', 'like', '%test%');
    }
  });
  test('should get the tableNmae "character"', () => {
    expect(new Character().tableName()).toBe('character');
  });
});
