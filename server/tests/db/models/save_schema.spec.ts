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
    return Save.upsert(new Save())
      .then((save) => {
        save.name = 'some name';
        return Save.upsert(save);
      })
      .then((save) => {
        return save.$query().patchAndFetch({ id: '123456789abc' });
      })
      .then((save) => {
        return save.$query().delete();
      })
      .then(() => {})
      .catch((err) => console.error(err));
  });
});
