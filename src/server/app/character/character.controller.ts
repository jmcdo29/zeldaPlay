import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { Character } from '@Entity/character.entity';

import { AuthGuard } from '@Auth/auth.guard';
import { CharacterPipe } from '@Character/character.pipe';
import { CharacterService } from '@Character/character.service';
import { CharacterDTO } from '@Character/interfaces/character.dto';

@ApiUseTags('character')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiOperation({
    title: 'Get All Unassigned Characters',
    description:
      'Get all of the characters who do not belong to a user. ' +
      'These are returned and shown as an example for the user to get an idea of how the app works.'
  })
  @ApiOkResponse({ type: Character, isArray: true })
  async getAll(): Promise<Character[]> {
    return this.characterService.getAll();
  }

  @Post('new/:userId')
  @ApiOperation({
    title: 'New Character',
    description:
      'Using the User id, create and assign a new character based on the incoming body'
  })
  @ApiImplicitBody({ name: 'character', type: CharacterDTO })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Character })
  newChar(
    @Param('userId') userId: string,
    @Body('character', CharacterPipe) character: Character
  ): Promise<Character> {
    return this.characterService.newChar(character, userId);
  }

  @Get('user/:userId')
  @ApiOperation({
    title: 'User Characters',
    description: 'Get all the characters belonging to the specified user.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Character, isArray: true })
  getUser(@Param('userId') userId: string): Promise<Character[]> {
    return this.characterService.getUserChars(userId);
  }

  @Get(':characterId')
  @ApiOperation({
    title: 'Get Character',
    description:
      'Return all the information pertaining to the specified character.'
  })
  @ApiOkResponse({ type: Character })
  getOne(@Param('characterId') charId: string): Promise<Character> {
    return this.characterService.getOne(charId);
  }

  @Post('update/:charId')
  @ApiOperation({
    title: 'Update Character',
    description: 'Update the incoming character. Found based on the passed id.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiImplicitBody({ name: 'character', type: CharacterDTO })
  @ApiOkResponse({ type: Character })
  updateOne(
    @Body('character', CharacterPipe) inChar: Character
  ): Promise<Character> {
    return this.characterService.updateChar(inChar);
  }
}
