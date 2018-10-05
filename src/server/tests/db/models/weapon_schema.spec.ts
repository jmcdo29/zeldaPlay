import * as Knex from 'knex';
import { Model } from 'objection';

import { Weapon } from '../../../src/db/models/weapon_schema';
import { conn } from '../../dbConnection';

describe('#WeaponSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Weapon', async () => {
    try {
      const weapon = await Weapon.query().upsertGraphAndFetch(new Weapon());
      await Weapon.query().upsertGraphAndFetch(weapon);
      await weapon.$query().patchAndFetch({ id: '123456789abc' });
      await weapon.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
