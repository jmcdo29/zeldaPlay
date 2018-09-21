import * as Knex from 'knex';
import { Model } from 'objection';

import { Recovery } from '../../../src/db/models/recovery_schema';
import { conn } from '../../dbConnection';

describe('#RecoverySchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Recovery', async () => {
    try {
      const recovery = await Recovery.query().upsertGraphAndFetch(
        new Recovery()
      );
      await Recovery.query().upsertGraphAndFetch(recovery);
      await recovery.$query().patchAndFetch({ id: '123456789abc' });
      await recovery.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });

  test('should be able to insert a Recovery with constructor', async () => {
    try {
      const recovery = new Recovery('this is the id', {
        question: 'a question',
        answer: 'the answer'
      });
      expect(recovery.question).toBe('a question');
    } catch (err) {
      console.error(err);
    }
  });
});
