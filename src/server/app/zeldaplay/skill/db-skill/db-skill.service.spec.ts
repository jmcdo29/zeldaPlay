import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbSkill } from '@DbModel/index';
import { DbSkillService } from './db-skill.service';

const mockDb = {
  query: jest
    .fn()
    .mockReturnValue(of([new DbSkill(), new DbSkill(), new DbSkill()]))
};

describe('DbSkillService', () => {
  let service: DbSkillService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbSkillService,
        {
          provide: DbService,
          useValue: mockDb
        }
      ]
    }).compile();
    service = module.get<DbSkillService>(DbSkillService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should work for the get query', () => {
    service.getSkills('00Ctest12345').subscribe((skills) => {
      expect(mockDb.query.mock.calls[0][1][0]).toBe('00Ctest12345');
      expect(mockDb.query).toBeCalledTimes(1);
      expect(skills).toEqual([new DbSkill(), new DbSkill(), new DbSkill()]);
    });
  });
});
