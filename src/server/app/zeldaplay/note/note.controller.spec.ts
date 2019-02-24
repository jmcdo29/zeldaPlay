import { NoteController } from '@Note/note.controller';
import { DbNote } from '@Db/models/db_note.model';

const NoteServiceStub = {
  getNotes: jest
    .fn()
    .mockReturnValue([new DbNote(), new DbNote(), new DbNote()]),
  saveNote: jest.fn().mockReturnValue(new DbNote())
};
const charId = '00Ctest12345';

describe('Note Controller', () => {
  let noteController: NoteController;
  beforeAll(async () => {
    noteController = new NoteController(NoteServiceStub as any);
  });
  it('should be defined', () => {
    expect(noteController).toBeDefined();
  });
  it('should work for getNotes', async () => {
    const notes = await noteController.getNotes({ charId });
    expect(NoteServiceStub.getNotes).toBeCalledTimes(1);
    expect(NoteServiceStub.getNotes).toBeCalledWith(charId);
    expect(notes).toEqual([new DbNote(), new DbNote(), new DbNote()]);
  });
  it('should work for newNote', async () => {
    const saveNote = await noteController.newNote(new DbNote(), { charId });
    expect(NoteServiceStub.saveNote).toBeCalledTimes(1);
    expect(NoteServiceStub.saveNote).toBeCalledWith(new DbNote(), charId);
    expect(saveNote).toEqual(new DbNote());
  });
});
