import { Test, TestingModule } from '@nestjs/testing';

import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';
import { DbSkillService } from './db-skill/db-skill.service';
import { DbSkill } from '@DbModel/index';

const mockRepo = {
  getSkills: jest
    .fn()
    .mockReturnValue([new DbSkill(), new DbSkill(), new DbSkill()])
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
  it('should return three skills from getSkills()', async () => {
    const skills = await service.getCharacterSkills('00Ctest12345');
    expect(mockRepo.getSkills).toBeCalledTimes(1);
    expect(mockRepo.getSkills).toBeCalledWith('00Ctest12345');
    expect(skills).toEqual([new DbSkill(), new DbSkill(), new DbSkill()]);
  });
});
