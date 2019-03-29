import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbSkill } from '@DbModel/index';
import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';

const mockRepo = {
  query: jest
    .fn()
    .mockReturnValue(of([new DbSkill(), new DbSkill(), new DbSkill()]))
};

describe('SkillService', () => {
  let service: SkillService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: DbService,
          useValue: mockRepo
        }
      ],
      controllers: [SkillController]
    }).compile();
    service = module.get<SkillService>(SkillService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return three skills from getSkills()', () => {
    service.getCharacterSkills('00Ctest12345').subscribe((skills) => {
      expect(mockRepo.query).toBeCalledTimes(1);
      expect(skills).toEqual([new DbSkill(), new DbSkill(), new DbSkill()]);
    });
  });
});
