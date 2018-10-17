import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SkillController } from '@Character/skill/skill.controller';
import { SkillService } from '@Character/skill/skill.service';
import { Skill } from '@Entity/skill.entity';

const mockRepo = {};

describe('SkillService', () => {
  let service: SkillService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: getRepositoryToken(Skill),
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
