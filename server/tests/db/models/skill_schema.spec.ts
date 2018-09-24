import * as Knex from 'knex';
import { Model } from 'objection';

import { Skill } from '../../../src/db/models/skill_schema';
import { conn } from '../../dbConnection';

describe('#SkillSchema', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Skill', async () => {
    try {
      const skill = await Skill.query().upsertGraphAndFetch(new Skill());
      skill.name = 'skill name';
      await Skill.query().upsertGraphAndFetch(skill);
      await skill.$query().patchAndFetch({ id: '123456789abc' });
      await skill.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
