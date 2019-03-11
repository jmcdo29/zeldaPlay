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

import { AuthGuard } from '@Auth/auth.guard';
import { SpellDTO } from '@Body/index';
import { DbSpell } from '@DbModel/index';
import { CharacterIdParam, SpellIdParam } from '@Parameter/index';
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

  @Patch('update/:spellId')
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
