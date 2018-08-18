import * as Knex from 'knex';
import { Model } from 'objection';
import { Save } from '../../../src/db/models/save_schema';
import { conn } from '../../dbConnection';

describe('#SaveSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Save', () => {
    return Save.query()
      .insert({})
      .then((save) => {
        return save.$query().delete();
      })
      .then(() => {
        return;
      })
      .catch((err) => console.error(err));
  });
});
