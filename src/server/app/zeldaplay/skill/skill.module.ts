import { Module } from '@nestjs/common';

import { SharedModule } from '@Shared/shared.module';
import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';
import { DbSkillService } from './db-skill/db-skill.service';



@Module({
  imports: [SharedModule],
  controllers: [SkillController],
  providers: [SkillService, DbSkillService]
})
export class SkillModule {}
