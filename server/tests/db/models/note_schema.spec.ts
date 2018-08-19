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
    return Note.upsert(new Note())
      .then((note) => {
        note.message = 'some message';
        return Note.upsert(note);
      })
      .then((note) => {
        return note.$query().patchAndFetch({ id: '123456789abc' });
      })
      .then((note) => {
        return note.$query().delete();
      })
      .then(() => {})
      .catch((err) => console.error(err));
  });
});
