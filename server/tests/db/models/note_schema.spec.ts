import { config } from 'dotenv';
config();
import * as Knex from 'knex';
import * as connection from '../../../src/db/knexfile';
import { Note } from '../../../src/db/models/note_schema';

describe('#NoteSchema', () => {
  beforeAll(() => {
    Note.knex(Knex(connection));
  });

  afterAll(() => {
    Note.knex().destroy();
  });

  test('should be able to insert a Note', () => {
    return Note.query()
      .insert({})
      .then((note) => {
        return note.$query().delete();
      })
      .then(() => {
        console.log('finished note.');
      })
      .catch((err) => console.error(err));
  });
});
