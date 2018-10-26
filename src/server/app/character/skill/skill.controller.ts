import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Skill } from '@Entity/skill.entity';

import { SkillService } from '@Character/skill/skill.service';

@ApiUseTags('skill')
@Controller('character/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'get character skills',
    description: 'Get all the skills of the specified character.'
  })
  @ApiOkResponse({ type: Skill, isArray: true })
  async getSkills(@Param('charId') charId: string): Promise<Skill[]> {
    return this.skillService.getCharacterSkills(charId);
  }
}
