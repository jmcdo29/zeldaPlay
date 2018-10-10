import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Character } from 'entities/character.entity';

import { CharacterService } from './character.service';
import { CharacterDTO } from './interfaces/character.dto';

@ApiUseTags('character')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/')
  @ApiOperation({
    title: 'Get All Unassigned Characters',
    description:
      // tslint:disable-next-line:max-line-length
      'Get all of the characters who do not belong to a user. These are returned and shown as an example for the user to get an idea of how the app works.'
  })
  async getAll(): Promise<Array<Partial<Character>>> {
    return this.characterService.getAll();
  }

  @Post(':userId')
  @ApiOperation({
    title: 'New Character',
    description:
      'Using the User id, create and assign a new character based on the incoming body'
  })
  newChar(@Param('userId') userId: string, @Body() body) {
    return this.characterService.newChar(userId, body.character);
  }

  @Get('/user/:userId')
  @ApiOperation({
    title: 'User Characters',
    description: 'Get all the characters belonging to the specified user.'
  })
  getUser(@Param('userId') userId: string) {
    return this.characterService.getUserChars(userId);
  }

  @Get(':characterId')
  @ApiOperation({
    title: 'Get Character',
    description:
      'Return all the information pertaining to the specified character.'
  })
  getOne(@Param('characterId') charId: string) {
    return this.characterService.getOne(charId);
  }

  @Post(':charId')
  @ApiOperation({
    title: 'Update Character',
    description: 'Update the incoming character. Found based on the passed id.'
  })
  updateOne(@Param('charId') charId: string, @Body() inChar: CharacterDTO) {
    return this.characterService.updateChar(charId, inChar);
  }
}
