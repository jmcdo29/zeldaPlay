import { Module } from '@nestjs/common';
import { AbilityScoreResolver } from './ability-score.resolver';
import { AbilityScoreService } from './ability-score.service';

@Module({
  providers: [AbilityScoreResolver, AbilityScoreService]
})
export class AbilityScoreModule {}
