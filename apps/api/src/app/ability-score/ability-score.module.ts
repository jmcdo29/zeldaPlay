import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AbilityScoreResolver } from './ability-score.resolver';
import { AbilityScoreService } from './ability-score.service';

@Module({
  imports: [DatabaseModule.forFeature({ tableName: 'ability_scores' })],
  providers: [AbilityScoreResolver, AbilityScoreService],
})
export class AbilityScoreModule {}
