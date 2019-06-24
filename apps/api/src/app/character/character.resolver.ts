import { Args, Query, Resolver } from '@nestjs/graphql';
import { Character } from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { CharacterService } from './character.service';

@Resolver((of) => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query((returns) => Character, { name: 'character' })
  getCharacter(
    @Args({ name: 'id', type: () => String }) id: string
  ): Observable<Character> {
    return this.characterService.getCharacterById(id);
  }
}
