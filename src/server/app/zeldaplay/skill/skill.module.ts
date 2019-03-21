import { Module } from '@nestjs/common';

import { SharedServerModule } from '@Shared/shared.module';
import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';
import { DbSkillService } from './db-skill/db-skill.service';

@Module({
  imports: [SharedServerModule],
  controllers: [SkillController],
  providers: [SkillService, DbSkillService]
})
export class SkillServerModule {}
