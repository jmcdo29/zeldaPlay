import { Test, TestingModule } from '@nestjs/testing';
import { DbNoteService } from './db-note.service';
import { DbService } from '@Db/db.service';

describe('DbNoteService', () => {
  let service: DbNoteService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbNoteService,
        {
          provide: DbService,
          useValue: {}
        }
      ]
    }).compile();
    service = module.get<DbNoteService>(DbNoteService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
