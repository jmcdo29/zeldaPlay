import { config } from 'dotenv';
config();
import * as Knex from 'knex';
import * as connection from '../../../src/db/knexfile';
import { User } from '../../../src/db/models/user_schema';

describe('#UserSchema', () => {
  beforeAll(() => {
    User.knex(Knex(connection));
  });

  afterAll(() => {
    User.knex().destroy();
  });

  test('should be able to insert a user', () => {
    return User.query()
      .insert({})
      .then((user) => {
        return user.$query().delete();
      })
      .then(() => {
        console.log('finished user.');
      })
      .catch((err) => console.error(err));
  });
});
