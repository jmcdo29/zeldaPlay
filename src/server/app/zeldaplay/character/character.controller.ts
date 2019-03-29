import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { AuthGuard } from '@Auth/auth.guard';
import { CharacterDTO } from '@Body/index';
import { CharacterPipe } from '@Character/character.pipe';
import { CharacterService } from '@Character/character.service';
import { DbCharacter, DbCharacterShort } from '@DbModel/index';
import { CharacterIdParam, UserIdParam } from '@Parameter/index';

@ApiUseTags('Character')
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
  @ApiOkResponse({ type: DbCharacterShort, isArray: true })
  getAll(): Observable<DbCharacterShort[]> {
    return this.characterService.getAll();
  }

  @Post('new/:userId')
  @ApiOperation({
    title: 'New Character',
    description:
      'Using the User id, create and assign a new character based on the incoming body'
  })
  @ApiImplicitBody({ name: 'character', type: CharacterDTO })
  @ApiImplicitParam({ name: 'userId', type: 'string', required: true })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DbCharacter })
  newChar(
    @Param() params: UserIdParam,
    @Body('character', CharacterPipe) character: DbCharacter
  ): Observable<DbCharacter> {
    return this.characterService.newChar(character, params.userId);
  }

  @Get('user/:userId')
  @ApiOperation({
    title: 'User Characters',
    description: 'Get all the characters belonging to the specified user.'
  })
  @ApiImplicitParam({ name: 'userId', type: 'string', required: true })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DbCharacter, isArray: true })
  getUser(@Param() params: UserIdParam): Observable<DbCharacter[]> {
    return this.characterService.getUserChars(params.userId);
  }

  @Get(':charId')
  @ApiOperation({
    title: 'Get Character',
    description:
      'Return all the information pertaining to the specified character.'
  })
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiOkResponse({ type: DbCharacter })
  getOne(@Param() params: CharacterIdParam): Observable<DbCharacter> {
    return this.characterService.getOne(params.charId);
  }

  @Patch('update/:charId')
  @ApiOperation({
    title: 'Update Character',
    description: 'Update the incoming character. Found based on the passed id.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiImplicitBody({ name: 'character', type: CharacterDTO })
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiOkResponse({ type: DbCharacter })
  updateOne(
    @Param() params: CharacterIdParam,
    @Body('character', CharacterPipe) inChar: DbCharacter
  ): Observable<DbCharacter> {
    return this.characterService.updateChar(inChar);
  }
}
