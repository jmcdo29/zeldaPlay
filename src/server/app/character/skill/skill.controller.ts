import { Controller, Get, Param } from '@nestjs/common';

import { Skill } from '../../entities/skill_schema';
import { SkillService } from './skill.service';

@Controller('characters/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get(':charId')
  async getSkills(@Param('charId') charId: string): Promise<Skill[]> {
    return this.skillService.getCharacterSkills(charId);
  }
}
