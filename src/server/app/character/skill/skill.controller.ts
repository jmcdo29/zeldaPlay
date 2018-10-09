import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Skill } from '../../entities/skill.entity';
import { SkillService } from './skill.service';

@ApiUseTags('skill')
@Controller('characters/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get(':charId')
  async getSkills(@Param('charId') charId: string): Promise<Skill[]> {
    return this.skillService.getCharacterSkills(charId);
  }
}
