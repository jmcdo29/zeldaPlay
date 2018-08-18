import * as Knex from 'knex';
import { Model } from 'objection';
import { Spell } from '../../../src/db/models/spell_schema';
import { conn } from '../../dbConnection';

describe('#SpellSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Spell', () => {
    return Spell.upsert(new Spell())
      .then((spell) => {
        spell.name = 'spell name';
        return Spell.upsert(spell);
      })
      .then((spell) => {
        return spell.$query().patchAndFetch({ id: '123456789abc' });
      })
      .then((spell) => {
        return spell.$query().delete();
      })
      .then(() => {
        console.log('done');
      })
      .catch((err) => console.error(err));
  });
});
