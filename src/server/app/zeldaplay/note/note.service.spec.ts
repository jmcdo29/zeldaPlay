import { Test, TestingModule } from '@nestjs/testing';

import { DbNote } from '@DbModel/index';
import { NoteService } from '@Note/note.service';
import { DbNoteService } from './db-note/db-note.service';

const mockRepo = {
  getNotes: jest
    .fn()
    .mockReturnValue([new DbNote(), new DbNote(), new DbNote()]),
  saveNote: jest.fn().mockReturnValue(new DbNote())
};
const charId = '00Ctest12345';

describe('NoteService', () => {
  let service: NoteService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: DbNoteService,
          useValue: mockRepo
        }
      ]
    }).compile();
    service = module.get<NoteService>(NoteService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should work for getNotes()', async () => {
    const notes = await service.getNotes(charId);
    expect(mockRepo.getNotes).toBeCalledWith(charId);
    expect(mockRepo.getNotes).toBeCalledTimes(1);
    expect(notes).toEqual([new DbNote(), new DbNote(), new DbNote()]);
  });
  it('should work for saveNote()', async () => {
    const savedNote = await service.saveNote(new DbNote(), charId);
    expect(mockRepo.saveNote).toBeCalledWith(new DbNote(), charId);
    expect(mockRepo.saveNote).toBeCalledTimes(1);
    expect(savedNote).toEqual(new DbNote());
  });
});
