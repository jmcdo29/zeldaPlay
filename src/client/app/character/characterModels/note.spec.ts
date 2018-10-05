import { Note } from './note';

test('should create a note', () => {
  const myNote = new Note(
    '00Najsdf',
    'message',
    new Date(Date.now()).toTimeString(),
    false
  );
  expect(myNote).toBeTruthy();
  expect(myNote.getId()).toBe('00Najsdf');
  expect(myNote.getImportant()).toBe(false);
  expect(myNote.getMsg()).toBe('message');

  // getters and setters

  myNote.setId('noteId');
  expect(myNote.getId()).toBe('noteId');
  myNote.setImportant(true);
  expect(myNote.getImportant());
  myNote.setMsg('new message');
  expect(myNote.getMsg()).toBe('new message');
  myNote.setTime('my time');
  expect(myNote.getTime()).toBe('my time');
});
