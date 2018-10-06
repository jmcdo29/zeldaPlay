import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';

describe('Skill Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SkillController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: SkillController = module.get<SkillController>(
      SkillController
    );
    expect(controller).toBeDefined();
  });
});
