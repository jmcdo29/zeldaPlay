import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CharacterIdDTO } from '../character/models';
import { AbilityScoreService } from './ability-score.service';
import {
  AbilityScoreDTO,
  AbilityScoreIdDTO,
  AbilityScoreInputDTO,
  AbilityScoreUpdateDTO,
} from './models';

@Controller('ability')
export class AbilityScoresController {
  constructor(private readonly abilityScoresService: AbilityScoreService) {}

  @Get('char/:id')
  getAbilityScoresByCharacterId(
    @Param() charId: CharacterIdDTO,
  ): Observable<AbilityScoreDTO[]> {
    return this.abilityScoresService.getAbilityScoresByCharId(charId);
  }

  @Get(':id')
  getAbilityScoreById(
    @Param() abilityId: AbilityScoreIdDTO,
  ): Observable<AbilityScoreDTO> {
    return this.abilityScoresService.getAbilityScoreById(abilityId);
  }

  @Post('new')
  insertOneAbilityScore(
    @Body() abilityScore: AbilityScoreInputDTO,
  ): Observable<AbilityScoreDTO> {
    return this.abilityScoresService.insertOneAbilityScore(abilityScore);
  }

  @Post('new/mass')
  insertManyAbilityScores(
    @Body() abilities: AbilityScoreInputDTO[],
  ): Observable<AbilityScoreDTO[]> {
    return this.abilityScoresService.insertManyAbilityScores(abilities);
  }

  @Patch('update')
  updateOneAbilityScore(
    @Body() abilityUpdate: AbilityScoreUpdateDTO,
  ): Observable<AbilityScoreDTO> {
    return this.abilityScoresService.updateOneAbilityScore(abilityUpdate);
  }

  @Patch('update/mass')
  updateManyAbilityScores(
    @Body() abilities: AbilityScoreUpdateDTO[],
  ): Observable<AbilityScoreDTO[]> {
    return this.abilityScoresService.updateManyAbilityScores(abilities);
  }
}
