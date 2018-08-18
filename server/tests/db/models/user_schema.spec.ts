import * as Knex from 'knex';
import { Model } from 'objection';
import { User } from '../../../src/db/models/user_schema';
import { conn } from '../../dbConnection';

describe('#UserSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a user', () => {
    return User.query()
      .insert({})
      .then((user) => {
        return user.$query().patchAndFetch({ id: '123456789abc' });
      })
      .then((user) => {
        return user.$query().delete();
      })
      .then(() => {
        console.log('done');
      })
      .catch((err) => console.error(err));
  });
});
