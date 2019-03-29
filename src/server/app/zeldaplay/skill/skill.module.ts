import { Module } from '@nestjs/common';

import { SharedServerModule } from '@Shared/shared.module';
import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';

@Module({
  imports: [SharedServerModule],
  controllers: [SkillController],
  providers: [SkillService]
})
export class SkillServerModule {}
