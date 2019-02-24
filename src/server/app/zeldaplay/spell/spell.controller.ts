import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { AuthGuard } from '@Auth/auth.guard';
import { DbSpell } from '@DbModel/db_spell.table';
import { SpellDTO } from '@Models/bodies/spell/spell.dto';
import { CharacterIdParam } from '@Models/parameters/charId.param';
import { SpellIdParam } from '@Models/parameters/spellId.param';
import { SpellPipe } from '@Spell/spell.pipe';
import { SpellService } from '@Spell/spell.service';

@ApiUseTags('spell')
@Controller('character/spell')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Character Spells',
    description: 'Get all of the spells for the specified character.'
  })
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiOkResponse({ type: DbSpell, isArray: true })
  async getSpells(@Param() params: CharacterIdParam): Promise<DbSpell[]> {
    return this.spellService.getSpells(params.charId);
  }

  @Post('new/:charId')
  @ApiOperation({
    title: 'Create a new spell',
    description: 'Create a new spell to be saved to the character.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiImplicitBody({ name: 'spell', type: SpellDTO })
  @ApiOkResponse({ type: DbSpell })
  async newSpell(
    @Body('spell', SpellPipe) inSpell: DbSpell,
    @Param() params: CharacterIdParam
  ): Promise<DbSpell> {
    return this.spellService.newSpell(inSpell, params.charId);
  }

  @Post('update/:spellId')
  @ApiOperation({
    title: 'Update Spell',
    description: 'Update an existing spell based on its id.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DbSpell })
  @ApiImplicitParam({ name: 'spellId', required: true, type: 'string' })
  @ApiImplicitBody({ name: 'spell', type: SpellDTO })
  async updateSpell(
    @Body('spell', SpellPipe) inSpell: DbSpell,
    @Param() params: SpellIdParam
  ): Promise<DbSpell> {
    return this.spellService.updateSpell(inSpell);
  }
}
