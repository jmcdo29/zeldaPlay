import { NoteController } from '@Character/note/note.controller';

const NoteServiceStub = {};

describe('Note Controller', () => {
  let noteController: NoteController;
  beforeAll(async () => {
    noteController = new NoteController(NoteServiceStub as any);
  });
  it('should be defined', () => {
    expect(noteController).toBeDefined();
  });
});
