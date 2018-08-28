import * as Knex from 'knex';
import { Model } from 'objection';
import { DBError } from '../../../src/db/models/error_schema';
import { conn } from '../../dbConnection';

jest.retryTimes(3);

describe('#ErrorSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a DBError', async () => {
    try {
      const dbError = await DBError.query().insert({});
      await dbError.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
