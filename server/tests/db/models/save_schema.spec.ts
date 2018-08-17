import { config } from 'dotenv';
config();
import * as Knex from 'knex';
import * as connection from '../../../src/db/knexfile';
import { Save } from '../../../src/db/models/save_schema';

describe('#SaveSchema', () => {
  beforeAll(() => {
    Save.knex(Knex(connection));
  });

  afterAll(() => {
    Save.knex().destroy();
  });

  test('should be able to insert a Save', () => {
    return Save.query()
      .insert({})
      .then((save) => {
        return save.$query().delete();
      })
      .then(() => {
        console.log('finished save.');
      })
      .catch((err) => console.error(err));
  });
});
