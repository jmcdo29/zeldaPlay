import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbNote } from '@DbModel/index';
import { NoteService } from '@Note/note.service';

const mockRepo = {
  query: jest.fn()
};
const charId = '00Ctest12345';
let queryCalls = 0;

describe('NoteService', () => {
  let service: NoteService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: DbService,
          useValue: mockRepo
        }
      ]
    }).compile();
    service = module.get<NoteService>(NoteService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should work for getNotes()', () => {
    mockRepo.query.mockReturnValueOnce(
      of([new DbNote(), new DbNote(), new DbNote()])
    );
    service.getNotes(charId).subscribe((notes) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(notes).toEqual([new DbNote(), new DbNote(), new DbNote()]);
    });
  });
  it('should work for saveNote()', () => {
    mockRepo.query.mockReturnValue(of([new DbNote()]));
    service.saveNote(new DbNote(), charId).subscribe((savedNote) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(savedNote).toEqual(new DbNote());
    });
  });
});
