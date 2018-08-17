import { config } from 'dotenv';
import { readFileSync } from 'fs';
import * as Knex from 'knex';
import { Model } from 'objection';
import * as pg from 'pg';
import { Character } from '../../src/db/models/character_schema';
import { Note } from '../../src/db/models/note_schema';
import { Save } from '../../src/db/models/save_schema';
import { Skill } from '../../src/db/models/skill_schema';
import { Spell } from '../../src/db/models/spell_schema';
import { Weapon } from '../../src/db/models/weapon_schema';
import {
  getAll,
  getOne,
  getUserCharacters,
  updateOne
} from '../../src/services/character.service';

describe('#CharacterServerService', () => {
  beforeAll(() => {
    config();
    pg.defaults.ssl = true;
    Model.knex(Knex({ client: 'pg', connection: process.env.DATABASE_URL }));
  });

  afterAll(() => {
    return Model.knex()
      .destroy()
      .then(() => {
        console.log('finished destroying connection.');
      });
  });

  test('getAll will getAll without user_id', () => {
    expect.assertions(2);
    return getAll()
      .then((characters) => {
        expect(characters).toBeTruthy();
        expect(characters[0]).toBeTruthy();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  test('getOne should return a single character', () => {
    expect.assertions(8);
    return getAll()
      .then((characters) => {
        return getOne(characters[0].id);
      })
      .then((character) => {
        expect(character).toBeTruthy();
        expect(character.skills).toBeDefined();
        expect(character.spells).toBeDefined();
        expect(character.strength).toBeTruthy();
        expect(character.strength).not.toBeNaN();
        expect(character.weapons).toBeDefined();
        expect(character.notes).toBeDefined();
        expect(character.saves).toBeDefined();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  test('getOne should fail with badId', () => {
    expect.assertions(1);
    return getOne('00Cpq34lksdjf')
      .then((character) => {
        console.log('somehow got a character');
      })
      .catch((err) => {
        expect(err).toBeTruthy();
      });
  });

  test('getUserCharacters should fail with bad id', () => {
    expect.assertions(1);
    return getUserCharacters('00Cjfueywn31').catch((err) => {
      expect(err).toBeTruthy();
    });
  });

  test('getUserCharacters should fail with bad id', () => {
    expect.assertions(1);
    return getUserCharacters('00Ujfueywn3').catch((err) => {
      expect(err).toBeTruthy();
    });
  });

  test('getUserCharacters should pass with correct user id', () => {
    expect.assertions(1);
    return getUserCharacters('00Ujfueywn31')
      .then((characters) => {
        expect(characters).toBeDefined();
        expect(characters.length === 0);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  test('updateOne should fail with bad json', () => {
    expect.assertions(1);
    return updateOne('00Ulkjdf', {} as any).catch((err) => {
      expect(err).toBeTruthy();
    });
  });

  describe('#FullASynDatabaseStuff', () => {
    afterAll(() => {
      return Character.query()
        .select('id')
        .where('name', 'MockChar')
        .orWhere('name', null)
        .first()
        .then((character) => {
          return Promise.all([
            Skill.query()
              .delete()
              .where('character_id', character.id),
            Save.query()
              .delete()
              .where('character_id', character.id),
            Weapon.query()
              .delete()
              .where('character_id', character.id),
            Spell.query()
              .delete()
              .where('character_id', character.id),
            Note.query()
              .delete()
              .where('character_id', character.id),
            Promise.resolve(character.id)
          ]);
        })
        .then((results) => {
          return Character.query()
            .delete()
            .where('id', results[results.length - 1]);
        })
        .then(() => {
          console.log('Finished deleting mock character!');
        })
        .catch((err) => {
          console.error('error deleting mockCharacter');
          console.error(err);
        });
    });

    test(
      'updateOne should pass with valid json',
      () => {
        expect.assertions(1);
        const mockChar = JSON.parse(
          readFileSync('server/tests/mocks/mockCharacter.json').toString()
        );
        return updateOne('00U4732mM0N2', mockChar)
          .then((character) => {
            expect(character).toBeTruthy();
          })
          .catch((err) => {
            console.error(err);
          });
      },
      10000
    );
  });
});
