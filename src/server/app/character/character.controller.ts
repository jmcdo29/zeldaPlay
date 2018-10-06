import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Character } from '../entities/character_schema';
import { CharacterService } from './character.service';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/')
  async getAll(): Promise<Array<Partial<Character>>> {
    return this.characterService.getAll();
  }

  @Post(':userId')
  upsertOne(@Param('userId') userId: string, @Body() body) {
    return this.characterService.upsertChar(userId, body.character);
  }

  @Get('/user/:userId')
  getUser(@Param('userId') userId: string) {
    return this.characterService.getUserChars(userId);
  }

  @Get(':characterId')
  getOne(@Param('characterId') charId: string) {
    return this.characterService.getOne(charId);
  }
}
