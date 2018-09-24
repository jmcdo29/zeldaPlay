import * as Knex from 'knex';
import { Model } from 'objection';

import { User } from '../../../src/db/models/user_schema';
import { conn } from '../../dbConnection';

describe('#UserSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a user', async () => {
    try {
      const user = await User.query().insert({});
      user.email = 'test@email.com';
      await User.query().upsertGraphAndFetch(user);
      await user.$query().patchAndFetch({ id: '123456789abc' });
      await user.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
