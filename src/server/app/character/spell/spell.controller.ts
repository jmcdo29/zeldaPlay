import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Spell } from '@Entity/spell.entity';

import { SpellDTO } from './interfaces/spell.dto';
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

  @Post('new/:charId')
  @ApiOperation({
    title: 'Create a new spell',
    description: 'Create a new spell to be saved to the character.'
  })
  @ApiImplicitBody({ name: 'spell', type: SpellDTO })
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
  @ApiImplicitBody({ name: 'spell', type: SpellDTO })
  async updateSpell(@Body('spell', SpellPipe) inSpell: Spell): Promise<Spell> {
    return this.spellService.updateSpell(inSpell);
  }
}
