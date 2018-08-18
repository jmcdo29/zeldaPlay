import * as Knex from 'knex';
import { Model } from 'objection';
import { Skill } from '../../../src/db/models/skill_schema';
import { conn } from '../../dbConnection';

describe('#SkillSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Skill', () => {
    return Skill.query()
      .insert({})
      .then((skill) => {
        return skill.$query().delete();
      })
      .then(() => {
        return;
      })
      .catch((err) => console.error(err));
  });
});
