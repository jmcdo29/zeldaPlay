import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { CharacterIdDTO } from '../character/models';
import { GqlAuthGuard } from '../guards/gql-auth-guard.guard';
import { AbilityScoreService } from './ability-score.service';
import {
  AbilityScoreDTO,
  AbilityScoreIdDTO,
  AbilityScoreInputDTO,
  AbilityScoreUpdateDTO,
  ofAbilityScore,
  returnAbilityScore,
  returnAbilityScores,
  typeAbilityScoreInputs,
  typeAbilityScoreUpdates,
} from './models';

@Resolver(ofAbilityScore)
export class AbilityScoreResolver {
  constructor(private readonly abilityScoreService: AbilityScoreService) {}

  @Query(returnAbilityScores, { name: 'characterAbilities' })
  getAbilityScoresByCharacterId(
    @Args('characterId') charId: CharacterIdDTO,
  ): Observable<AbilityScoreDTO[]> {
    return this.abilityScoreService.getAbilityScoresByCharId(charId);
  }

  @Query(returnAbilityScore, { name: 'getAbilityScore' })
  getAbilityScoreById(
    @Args('abilityId') abilityId: AbilityScoreIdDTO,
  ): Observable<AbilityScoreDTO> {
    return this.abilityScoreService.getAbilityScoreById(abilityId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnAbilityScore, { name: 'newAbilityScore' })
  insertOneAbilityScore(
    @Args('abilityScore') abilityScore: AbilityScoreInputDTO,
  ): Observable<AbilityScoreDTO> {
    return this.abilityScoreService.insertOneAbilityScore(abilityScore);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnAbilityScores, { name: 'newAbilityScores' })
  insertManyAbilityScores(
    @Args({ name: 'abilityScores', type: typeAbilityScoreInputs })
    abilities: AbilityScoreInputDTO[],
  ): Observable<AbilityScoreDTO[]> {
    return this.abilityScoreService.insertManyAbilityScores(abilities);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnAbilityScore, { name: 'updateAbilityScore' })
  updateOneAbilityScore(
    @Args('abilityUpdate') abilityUpdate: AbilityScoreUpdateDTO,
  ): Observable<AbilityScoreDTO> {
    return this.abilityScoreService.updateOneAbilityScore(abilityUpdate);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnAbilityScores, { name: 'updateAbilityScores' })
  updateManyAbilityScores(
    @Args({ name: 'abilityScores', type: typeAbilityScoreUpdates })
    abilities: AbilityScoreUpdateDTO[],
  ): Observable<AbilityScoreDTO[]> {
    return this.abilityScoreService.updateManyAbilityScores(abilities);
  }
}
