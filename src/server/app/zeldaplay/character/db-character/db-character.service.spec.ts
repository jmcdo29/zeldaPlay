import { Test, TestingModule } from '@nestjs/testing';
import { DbCharacterService } from './db-character.service';
import { DbService } from '@Db/db.service';

describe('DbCharacterService', () => {
  let service: DbCharacterService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbCharacterService,
      {
        provide: DbService,
        useValue: {
          query: (text: string, params: any[]) => {
            return {text, params}
          }
        }
      }
    ],
    }).compile();
    service = module.get<DbCharacterService>(DbCharacterService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
