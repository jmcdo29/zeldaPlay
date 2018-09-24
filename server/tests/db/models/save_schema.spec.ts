import * as Knex from 'knex';
import { Model } from 'objection';

import { Save } from '../../../src/db/models/save_schema';
import { conn } from '../../dbConnection';

describe('#SaveSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Save', async () => {
    try {
      const save = await Save.query().upsertGraphAndFetch(new Save());
      save.name = 'some name';
      await Save.query().upsertGraphAndFetch(save);
      await save.$query().patchAndFetch({ id: '123456789abc' });
      await save.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
