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
    return Skill.upsert(new Skill())
      .then((skill) => {
        skill.name = 'skill name';
        return Skill.upsert(skill);
      })
      .then((skill) => {
        return skill.$query().patchAndFetch({ id: '123456789abc' });
      })
      .then((skill) => {
        return skill.$query().delete();
      })
      .then(() => {})
      .catch((err) => console.error(err));
  });
});
