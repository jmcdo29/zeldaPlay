import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { DbSkill } from '@DbModel/index';
import { CharacterIdParam } from '@Models/parameters/charId.param';
import { SkillService } from '@Skill/skill.service';

@ApiUseTags('skill')
@Controller('character/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'get character skills',
    description: 'Get all the skills of the specified character.'
  })
  @ApiOkResponse({ type: DbSkill, isArray: true })
  async getSkills(@Param() params: CharacterIdParam): Promise<DbSkill[]> {
    return this.skillService.getCharacterSkills(params.charId);
  }
}
