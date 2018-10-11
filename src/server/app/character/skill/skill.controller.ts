import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Skill } from '../../entities/skill.entity';

import { SkillService } from './skill.service';

@ApiUseTags('skill')
@Controller('characters/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'get character skills',
    description: 'Get all the skills of the specified character.'
  })
  async getSkills(@Param('charId') charId: string): Promise<Skill[]> {
    return this.skillService.getCharacterSkills(charId);
  }
}
