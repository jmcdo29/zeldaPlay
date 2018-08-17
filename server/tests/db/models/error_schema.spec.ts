import { config } from 'dotenv';
config();
import * as Knex from 'knex';
import * as connection from '../../../src/db/knexfile';
import { DBError } from '../../../src/db/models/error_schema';

describe('#ErrorSchema', () => {
  beforeAll(() => {
    DBError.knex(Knex(connection));
  });

  afterAll(() => {
    DBError.knex().destroy();
  });

  test('should be able to insert a DBError', () => {
    return DBError.query()
      .insert({})
      .then((dbError) => {
        return dbError.$query().delete();
      })
      .then(() => {
        console.log('finished dbError.');
      })
      .catch((err) => console.error(err));
  });
});
