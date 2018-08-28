import { Note } from './note';

test('should create a note', () => {
  const myNote = new Note();
  myNote.time = new Date(Date.now()).toISOString();
  myNote.msg = 'the message of the note';
  myNote.important = false;
  myNote.id = '00Najsdf';
  expect(myNote).toBeTruthy();
});
