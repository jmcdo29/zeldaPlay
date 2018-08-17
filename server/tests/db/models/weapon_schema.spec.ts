import { config } from 'dotenv';
config();
import * as Knex from 'knex';
import * as connection from '../../../src/db/knexfile';
import { Weapon } from '../../../src/db/models/weapon_schema';

describe('#WeaponSchema', () => {
  beforeAll(() => {
    Weapon.knex(Knex(connection));
  });

  afterAll(() => {
    Weapon.knex().destroy();
  });

  test('should be able to insert a Weapon', () => {
    return Weapon.query()
      .insert({})
      .then((weapon) => {
        return weapon.$query().delete();
      })
      .then(() => {
        console.log('finished weapon.');
      })
      .catch((err) => console.error(err));
  });
});
