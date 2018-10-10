import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Spell } from 'entities/spell.entity';

import { SpellPipe } from './spell.pipe';
import { SpellService } from './spell.service';

@ApiUseTags('spell')
@Controller('character/spell')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Character Spells',
    description: 'Get all of the spells for the specified character.'
  })
  async getSpells(@Param('charId') charId: string): Promise<Spell[]> {
    return this.spellService.getSpells(charId);
  }

  @Post('/new/:charId')
  @ApiOperation({
    title: 'Create a new spell',
    description: 'Create a new spell to be saved to the character.'
  })
  @UsePipes(SpellPipe)
  async newSpell(
    @Body() inSpell: Spell,
    @Param('charId') charId: string
  ): Promise<Spell> {
    return this.spellService.newSpell(inSpell, charId);
  }

  @Post('/update/:spellId')
  @ApiOperation({
    title: 'Update Spell',
    description: 'Update an existing spell based on its id.'
  })
  @UsePipes(SpellPipe)
  async updateSpell(@Body() inSpell: Spell): Promise<Spell> {
    return this.spellService.updateSpell(inSpell);
  }
}
