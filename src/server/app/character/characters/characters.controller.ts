import { Controller, Get, Post } from '@nestjs/common';

import { Character } from '../../entities/character_schema';
import { CharactersService } from '../characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @Get('/')
  async getAll(): Promise<Array<Partial<Character>>> {
    const characters = await this.characterService.getAll();
    return characters;
  }

  @Post(':userId')
  upsertOne() {
    return this.characterService.upsertChar();
  }

  @Get('/user/:userId')
  getUser() {
    return this.characterService.getUserChars();
  }

  @Get(':characterId')
  getOne() {
    return this.characterService.getOne();
  }
}
