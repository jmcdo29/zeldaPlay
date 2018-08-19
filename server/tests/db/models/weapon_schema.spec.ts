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
    return Weapon.upsert(new Weapon())
      .then((weapon) => {
        weapon.name = 'weapon name';
        return Weapon.upsert(weapon);
      })
      .then((weapon) => {
        return weapon.$query().patchAndFetch({ id: '123456789abc' });
      })
      .then((weapon) => {
        return weapon.$query().delete();
      })
      .then(() => {})
      .catch((err) => console.error(err));
  });
});
