import * as Knex from 'knex';
import { Model } from 'objection';

import { Question } from '../../../src/db/models/question_schema';
import { conn } from '../../dbConnection';

describe('#QuestionSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Question', async () => {
    try {
      const question = await Question.query().upsertGraphAndFetch(
        new Question()
      );
      await Question.query().upsertGraphAndFetch(question);
      await question.$query().patchAndFetch({ id: '123456789abc' });
      await question.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
