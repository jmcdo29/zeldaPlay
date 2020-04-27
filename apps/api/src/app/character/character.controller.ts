import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CharacterService } from './character.service';
import {
  CharacterDTO,
  CharacterIdDTO,
  CharacterInsertDataDTO,
  CharacterUpdateDataDTO,
} from './models';
import { UserIdDTO } from '../auth/user/models';
import { IsLoggedInGuard } from '../guards/is-logged-in.guard';

@Controller('character')
export class CharactersController {
  constructor(private readonly charactersService: CharacterService) {}

  @Get(':charId')
  getCharacter(@Param() charParams: CharacterIdDTO): Observable<CharacterDTO> {
    return this.charactersService.getCharacterById(charParams);
  }

  @Get('user/:userId')
  getUserCharacters(
    @Param() userParams: UserIdDTO,
  ): Observable<CharacterDTO[]> {
    return this.charactersService.getCharactersByUserId(userParams);
  }

  @UseGuards(IsLoggedInGuard)
  @Post('new')
  insertCharacter(
    @Body() characterInsert: CharacterInsertDataDTO,
  ): Observable<CharacterDTO> {
    return this.charactersService.insertNewCharacter(characterInsert);
  }

  @UseGuards(IsLoggedInGuard)
  @Patch('update')
  updateCharacter(
    @Body() characterUpdate: CharacterUpdateDataDTO,
  ): Observable<CharacterDTO> {
    return this.charactersService.updateCharacter(characterUpdate);
  }
}
