import * as Knex from 'knex';
import { Model } from 'objection';
import { Weapon } from '../../../src/db/models/weapon_schema';
import { conn } from '../../dbConnection';

describe('#WeaponSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Weapon', () => {
    return Weapon.query()
      .insert({})
      .then((weapon) => {
        return weapon.$query().delete();
      })
      .then(() => {
        return;
      })
      .catch((err) => console.error(err));
  });
});
