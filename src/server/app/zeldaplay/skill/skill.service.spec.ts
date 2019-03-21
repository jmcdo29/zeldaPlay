import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbSkill } from '@DbModel/index';
import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';
import { DbSkillService } from './db-skill/db-skill.service';

const mockRepo = {
  getSkills: jest
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
          provide: DbSkillService,
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
      expect(mockRepo.getSkills).toBeCalledTimes(1);
      expect(mockRepo.getSkills).toBeCalledWith('00Ctest12345');
      expect(skills).toEqual([new DbSkill(), new DbSkill(), new DbSkill()]);
    });
  });
});
