import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AbilityScore,
  AbilityScoreId,
  AbilityScoreInput,
  AbilityScoreUpdate,
  CharacterId,
  ofAbilityScore,
  returnAbilityScore,
  returnAbilityScores
} from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { GqlAuthGuard } from '../guards/gql-auth-guard.guard';
import { AbilityScoreService } from './ability-score.service';

@Resolver(ofAbilityScore)
export class AbilityScoreResolver {
  constructor(private readonly abilityScoreService: AbilityScoreService) {}

  @Query(returnAbilityScores, { name: 'characterAbilities' })
  getAbilityScoresByCharacterId(
    @Args('characterId') charId: CharacterId
  ): Observable<AbilityScore[]> {
    return this.abilityScoreService.getAbilityScoresByCharId(charId);
  }

  @Query(returnAbilityScore, { name: 'getAbilityScore' })
  getAbilityScoreById(
    @Args('abilityId') abilityId: AbilityScoreId
  ): Observable<AbilityScore> {
    return this.abilityScoreService.getAbilityScoreById(abilityId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnAbilityScore, { name: 'newAbilityScore' })
  insertOneAbilityScore(
    @Args('abilityScore') abilityScore: AbilityScoreInput
  ): Observable<AbilityScore> {
    return this.abilityScoreService.insertOneAbilityScore(abilityScore);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnAbilityScores, { name: 'newAbilityScores' })
  insertManyAbilityScores(
    @Args('abilityScores') abilities: AbilityScoreInput[]
  ): Observable<AbilityScore[]> {
    return this.abilityScoreService.insertManyAbilityScores(abilities);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnAbilityScore, { name: 'updateAbilityScore' })
  updateOneAbilityScore(
    @Args('abilityUpdate') abilityUpdate: AbilityScoreUpdate,
    @Args('abilityId') abilityId: AbilityScoreId
  ): Observable<AbilityScore> {
    return this.abilityScoreService.updateOneAbilityScore(
      abilityUpdate,
      abilityId
    );
  }
}
