import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { SpellDTO } from './interfaces/spell.dto';
import { SpellService } from './spell.service';

@ApiUseTags('character', 'spell')
@Controller('character/spell')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Get(':charId')
  async getSpells(@Param('charId') charId: string) {
    return this.spellService.getSpells(charId);
  }

  @Post(':charId')
  async newSpell(@Body() inSpell: SpellDTO, @Param('charId') charId: string) {
    return this.spellService.newSpell(inSpell, charId);
  }
}
