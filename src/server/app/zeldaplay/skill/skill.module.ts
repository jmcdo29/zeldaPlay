import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Skill } from '@Entity/skill.entity';

import { SkillController } from '@Skill/skill.controller';
import { SkillService } from '@Skill/skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillController],
  providers: [SkillService]
})
export class SkillModule {}
