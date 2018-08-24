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

  test('should be able to insert a Note', async () => {
    try {
      const note = await Note.query().upsertGraphAndFetch(new Note());
      note.message = 'some message';
      await Note.query().upsertGraphAndFetch(note);
      await note.$query().patchAndFetch({ id: '123456789abc' });
      await note.$query().delete();
    } catch (err) {
      console.error(err);
    }
  });
});
