import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { SpellDTO } from './interfaces/spell.dto';
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
  async getSpells(@Param('charId') charId: string) {
    return this.spellService.getSpells(charId);
  }

  @Post('/new/:charId')
  @ApiOperation({
    title: 'Create a new spell',
    description: 'Create a new spell to be saved to the character.'
  })
  async newSpell(@Body() inSpell: SpellDTO, @Param('charId') charId: string) {
    return this.spellService.newSpell(inSpell, charId);
  }

  @Post('/update/:spellId')
  @ApiOperation({
    title: 'Update Spell',
    description: 'Update an existing spell based on its id.'
  })
  async updateSpell(
    @Body() inSpell: SpellDTO,
    @Param('spellId') spellId: string
  ) {
    return this.spellService.updateSpell(inSpell, spellId);
  }
}
