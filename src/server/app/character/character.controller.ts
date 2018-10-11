import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Character } from '../entities/character.entity';

import { CharacterPipe } from './character.pipe';
import { CharacterService } from './character.service';

@ApiUseTags('character')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiOperation({
    title: 'Get All Unassigned Characters',
    description:
      // tslint:disable-next-line:max-line-length
      'Get all of the characters who do not belong to a user. These are returned and shown as an example for the user to get an idea of how the app works.'
  })
  async getAll(): Promise<Character[]> {
    return this.characterService.getAll();
  }

  @Post(':userId')
  @ApiOperation({
    title: 'New Character',
    description:
      'Using the User id, create and assign a new character based on the incoming body'
  })
  @UsePipes(CharacterPipe)
  newChar(
    @Param('userId') userId: string,
    @Body() character: Character
  ): Promise<Character> {
    return this.characterService.newChar(character, userId);
  }

  @Get('user/:userId')
  @ApiOperation({
    title: 'User Characters',
    description: 'Get all the characters belonging to the specified user.'
  })
  getUser(@Param('userId') userId: string): Promise<Character[]> {
    return this.characterService.getUserChars(userId);
  }

  @Get(':characterId')
  @ApiOperation({
    title: 'Get Character',
    description:
      'Return all the information pertaining to the specified character.'
  })
  getOne(@Param('characterId') charId: string): Promise<Character> {
    return this.characterService.getOne(charId);
  }

  @Post(':charId')
  @ApiOperation({
    title: 'Update Character',
    description: 'Update the incoming character. Found based on the passed id.'
  })
  @UsePipes(CharacterPipe)
  updateOne(@Body() inChar: Character): Promise<Character> {
    return this.characterService.updateChar(inChar);
  }
}
