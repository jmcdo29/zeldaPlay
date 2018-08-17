import { config } from 'dotenv';
config();
import * as Knex from 'knex';
import * as connection from '../../../src/db/knexfile';
import { Skill } from '../../../src/db/models/skill_schema';

describe('#SkillSchema', () => {
  beforeAll(() => {
    Skill.knex(Knex(connection));
  });

  afterAll(() => {
    Skill.knex().destroy();
  });

  test('should be able to insert a Skill', () => {
    return Skill.query()
      .insert({})
      .then((skill) => {
        return skill.$query().delete();
      })
      .then(() => {
        console.log('finished skill.');
      })
      .catch((err) => console.error(err));
  });
});
