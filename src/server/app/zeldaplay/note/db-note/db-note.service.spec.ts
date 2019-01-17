import { Test, TestingModule } from '@nestjs/testing';
import { DbNoteService } from './db-note.service';

describe('DbNoteService', () => {
  let service: DbNoteService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbNoteService],
    }).compile();
    service = module.get<DbNoteService>(DbNoteService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
