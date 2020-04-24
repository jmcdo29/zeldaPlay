import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AbilityScoresController } from './ability-score.controller';
import { AbilityScoreService } from './ability-score.service';

@Module({
  imports: [DatabaseModule.forFeature({ tableName: 'ability_scores' })],
  controllers: [AbilityScoresController],
  providers: [AbilityScoreService],
})
export class AbilityScoreModule {}
