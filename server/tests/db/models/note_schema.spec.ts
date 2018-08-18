import * as Knex from 'knex';
import { Model } from 'objection';
import { Note } from '../../../src/db/models/note_schema';
import { conn } from '../../dbConnection';

describe('#NoteSchema', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  afterAll(() => {
    Model.knex().destroy();
  });

  test('should be able to insert a Note', () => {
    return Note.query()
      .insert({})
      .then((note) => {
        return note.$query().delete();
      })
      .then(() => {
        return;
      })
      .catch((err) => console.error(err));
  });
});
