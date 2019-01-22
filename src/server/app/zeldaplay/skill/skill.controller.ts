import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { DbSkill } from '@Db/models/db_skill.model';
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
  async getSkills(@Param('charId') charId: string): Promise<DbSkill[]> {
    return this.skillService.getCharacterSkills(charId);
  }
}
