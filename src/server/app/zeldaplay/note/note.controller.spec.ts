import { Test } from '@nestjs/testing';
import { of } from 'rxjs';

import { AuthService } from '@Auth/auth.service';
import { DbNote } from '@DbModel/index';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

const NoteServiceStub = {
  getNotes: jest
    .fn()
    .mockReturnValue(of([new DbNote(), new DbNote(), new DbNote()])),
  saveNote: jest.fn().mockReturnValue(of(new DbNote()))
};
const charId = '00Ctest12345';

describe('Note Controller', () => {
  let noteController: NoteController;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        { useValue: NoteServiceStub, provide: NoteService },
        { provide: AuthService, useValue: {} }
      ]
    }).compile();
    noteController = module.get<NoteController>(NoteController);
  });
  it('should be defined', () => {
    expect(noteController).toBeDefined();
  });
  it('should work for getNotes', () => {
    noteController.getNotes({ charId }).subscribe((notes) => {
      expect(NoteServiceStub.getNotes).toBeCalledTimes(1);
      expect(NoteServiceStub.getNotes).toBeCalledWith(charId);
      expect(notes).toEqual([new DbNote(), new DbNote(), new DbNote()]);
    });
  });
  it('should work for newNote', () => {
    noteController.newNote(new DbNote(), { charId }).subscribe((savedNote) => {
      expect(NoteServiceStub.saveNote).toBeCalledTimes(1);
      expect(NoteServiceStub.saveNote).toBeCalledWith(new DbNote(), charId);
      expect(savedNote).toEqual(new DbNote());
    });
  });
});
