import { Test, TestingModule } from '@nestjs/testing';
import { DbSpellService } from './db-spell.service';
import { DbService } from '@Db/db.service';

describe('DbSpellService', () => {
  let service: DbSpellService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbSpellService,
        {
          provide: DbService,
          useValue: {}
        }
      ]
    }).compile();
    service = module.get<DbSpellService>(DbSpellService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
