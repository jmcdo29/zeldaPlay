import * as Knex from 'knex';
import { Model } from 'objection';
import { Element } from '../../../src/db/models/element_schema';
import { conn } from '../../dbConnection';

describe('#ElementSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Element', async () => {
    try {
      const element = await Element.query().upsertGraphAndFetch(new Element());
      await Element.query().upsertGraphAndFetch(element);
      await element.$query().patchAndFetch({ id: '123456789abc' });
      await element.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
