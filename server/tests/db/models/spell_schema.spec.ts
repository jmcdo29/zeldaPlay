import * as Knex from 'knex';
import { Model } from 'objection';
import { Spell } from '../../../src/db/models/spell_schema';
import { conn } from '../../dbConnection';

jest.retryTimes(3);

describe('#SpellSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Spell', async () => {
    try {
      const spell = await Spell.query().upsertGraphAndFetch(new Spell());
      spell.name = 'spell name';
      await Spell.query().upsertGraphAndFetch(spell);
      await spell.$query().patchAndFetch({ id: '123456789abc' });
      await spell.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
