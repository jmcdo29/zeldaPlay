import { NoteModule } from './note.module';

describe('NoteModule', () => {
  let noteModule: NoteModule;

  beforeEach(() => {
    noteModule = new NoteModule();
  });

  it('should create an instance', () => {
    expect(noteModule).toBeTruthy();
  });
});
