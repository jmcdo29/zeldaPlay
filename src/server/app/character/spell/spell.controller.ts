import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { Spell } from '@Entity/spell.entity';

import { AuthGuard } from '@Auth/auth.guard';
import { SpellDTO } from '@Character/spell/interfaces/spell.dto';
import { SpellPipe } from '@Character/spell/spell.pipe';
import { SpellService } from '@Character/spell/spell.service';

@ApiUseTags('spell')
@Controller('character/spell')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Character Spells',
    description: 'Get all of the spells for the specified character.'
  })
  @ApiOkResponse({ type: Spell, isArray: true })
  async getSpells(@Param('charId') charId: string): Promise<Spell[]> {
    return this.spellService.getSpells(charId);
  }

  @Post('new/:charId')
  @ApiOperation({
    title: 'Create a new spell',
    description: 'Create a new spell to be saved to the character.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiImplicitBody({ name: 'spell', type: SpellDTO })
  @ApiOkResponse({ type: Spell })
  async newSpell(
    @Body('spell', SpellPipe) inSpell: Spell,
    @Param('charId') charId: string
  ): Promise<Spell> {
    return this.spellService.newSpell(inSpell, charId);
  }

  @Post('update/:spellId')
  @ApiOperation({
    title: 'Update Spell',
    description: 'Update an existing spell based on its id.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Spell })
  @ApiImplicitParam({ name: 'spellId', required: true, type: 'string' })
  @ApiImplicitBody({ name: 'spell', type: SpellDTO })
  async updateSpell(@Body('spell', SpellPipe) inSpell: Spell): Promise<Spell> {
    return this.spellService.updateSpell(inSpell);
  }
}
