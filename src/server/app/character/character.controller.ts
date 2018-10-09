import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Character } from '../entities/character.entity';
import { CharacterService } from './character.service';
import { CharacterDTO } from './interfaces/character.dto';

@ApiUseTags('character')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/')
  async getAll(): Promise<Array<Partial<Character>>> {
    return this.characterService.getAll();
  }

  @Post(':userId')
  newChar(@Param('userId') userId: string, @Body() body) {
    return this.characterService.newChar(userId, body.character);
  }

  @Get('/user/:userId')
  getUser(@Param('userId') userId: string) {
    return this.characterService.getUserChars(userId);
  }

  @Get(':characterId')
  getOne(@Param('characterId') charId: string) {
    return this.characterService.getOne(charId);
  }

  @Post(':charId')
  updateOne(@Param('charId') charId: string, @Body() inChar: CharacterDTO) {
    return this.characterService.updateChar(charId, inChar);
  }
}
