import { SkillModule } from './skill.module';

describe('SkillModule', () => {
  let skillModule: SkillModule;

  beforeEach(() => {
    skillModule = new SkillModule();
  });

  it('should create an instance', () => {
    expect(skillModule).toBeTruthy();
  });
});
