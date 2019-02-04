import { Test, TestingModule } from '@nestjs/testing';
import { DbNoteService } from './db-note.service';
import { DbService } from '@Db/db.service';
import { DbNote } from '@Db/models/db_note.model';

const mockDb = {
  query: jest.fn()
};

const charId = '00Ctest12345';
let queryCalls = 0;

describe('DbNoteService', () => {
  let service: DbNoteService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbNoteService,
        {
          provide: DbService,
          useValue: mockDb
        }
      ]
    }).compile();
    service = module.get<DbNoteService>(DbNoteService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should work for getNotes', async () => {
    mockDb.query.mockReturnValueOnce([
      new DbNote(),
      new DbNote(),
      new DbNote()
    ]);
    const notes = await service.getNotes(charId);
    expect(mockDb.query.mock.calls[queryCalls][1][0]).toBe(charId);
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(notes).toEqual([new DbNote(), new DbNote(), new DbNote()]);
  });
  it('should work for saveNote', async () => {
    mockDb.query.mockReturnValueOnce([new DbNote()]);
    const savedNote = await service.saveNote(new DbNote(), charId);
    expect(
      mockDb.query.mock.calls[queryCalls][1][
        mockDb.query.mock.calls[queryCalls][1].length - 1
      ]
    ).toBe(charId);
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(savedNote).toEqual(new DbNote());
  });
});
