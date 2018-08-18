import * as Knex from 'knex';
import { Model } from 'objection';
import { DBError } from '../../../src/db/models/error_schema';
import { conn } from '../../dbConnection';

describe('#ErrorSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a DBError', () => {
    return DBError.query()
      .insert({})
      .then((dbError) => {
        return dbError.$query().delete();
      })
      .then(() => {
        return;
      })
      .catch((err) => console.error(err));
  });
});
