import { NotePipe } from './note.pipe';

import { NoteDTO } from '@Body/index';

describe('#NotePipe', () => {
  let pipe: NotePipe;
  let inReq: NoteDTO;
  beforeAll(() => {
    pipe = new NotePipe();
  });
  beforeEach(() => {
    inReq = {
      msg: 'note message',
      time: new Date(Date.now()).toISOString(),
      id: '00Ntest12345',
      important: false
    };
  });

  it('should transform the request', () => {
    const note = pipe.transform(inReq, { type: 'body' });
    expect(note).toBeTruthy();
    expect(note.nId).toBe('00Ntest12345');
    expect(!note.nImportant);
  });
});
