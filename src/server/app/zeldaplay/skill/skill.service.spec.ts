import { Test, TestingModule } from '@nestjs/testing';

import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';
import { DbSkillService } from './db-skill/db-skill.service';

const mockRepo = {};

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
});
