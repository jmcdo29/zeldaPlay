import { Note } from '#Models/note';

test('should create a note', () => {
  const myNote = new Note(
    '00Najsdf',
    'message',
    new Date(Date.now()).toTimeString(),
    false
  );
  expect(myNote).toBeTruthy();
  expect(myNote.id).toBe('00Najsdf');
  expect(myNote.important).toBe(false);
  expect(myNote.msg).toBe('message');

  // getters and setters

  myNote.id = 'noteId';
  expect(myNote.id).toBe('noteId');
  myNote.important = true;
  expect(myNote.important);
  myNote.msg = 'new message';
  expect(myNote.msg).toBe('new message');
  myNote.time = 'my time';
  expect(myNote.time).toBe('my time');
});
