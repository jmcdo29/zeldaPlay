import { Test, TestingModule } from '@nestjs/testing';

import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';
import { DbSkill } from '@Db/models/db_skill.model';

const SkillServiceStub = {
  getCharacterSkills: jest
    .fn()
    .mockReturnValue([new DbSkill(), new DbSkill(), new DbSkill()])
};

describe('Skill Controller', () => {
  let controller: SkillController;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [{ useValue: SkillServiceStub, provide: SkillService }]
    }).compile();
    controller = module.get<SkillController>(SkillController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should work for getSkiklls()', async () => {
    const skills = await controller.getSkills({ charId: '00Ctest12345' });
    expect(SkillServiceStub.getCharacterSkills).toBeCalledTimes(1);
    expect(SkillServiceStub.getCharacterSkills).toBeCalledWith('00Ctest12345');
    expect(skills).toEqual([new DbSkill(), new DbSkill(), new DbSkill()]);
  });
});
