import { Test, TestingModule } from '@nestjs/testing';

import { NoteService } from '@Note/note.service';
import { DbNoteService } from './db-note/db-note.service';

describe('NoteService', () => {
  let service: NoteService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          useValue: {},
          provide: DbNoteService
        }
      ]
    }).compile();
    service = module.get<NoteService>(NoteService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
