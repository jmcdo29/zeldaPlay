import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { GqlAuthGuard } from '../guards/gql-auth-guard.guard';
import { UserIdDTO } from '../user/models';
import { CharacterService } from './character.service';
import {
  CharacterDTO,
  CharacterIdDTO,
  CharacterInsertDataDTO,
  CharacterUpdateDataDTO,
  ofCharacter,
  returnCharacter,
  returnCharacterArray,
} from './models';

@Resolver(ofCharacter)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(returnCharacter, { name: 'character' })
  getCharacter(@Args('charId') id: CharacterIdDTO): Observable<CharacterDTO> {
    return this.characterService.getCharacterById(id);
  }

  @Query(returnCharacterArray, { name: 'userCharacters' })
  getUserCharacters(
    @Args('userId') userId: UserIdDTO,
  ): Observable<CharacterDTO[]> {
    return this.characterService.getCharactersByUserId(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnCharacter, { name: 'newCharacter' })
  insertCharacter(
    @Args('characterData') characterInsert: CharacterInsertDataDTO,
  ): Observable<CharacterDTO> {
    return this.characterService.insertNewCharacter(characterInsert);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returnCharacter, { name: 'updateCharacter' })
  updateCharacter(
    @Args('characterData') characterUpdate: CharacterUpdateDataDTO,
  ): Observable<CharacterDTO> {
    return this.characterService.updateCharacter(characterUpdate);
  }
}
