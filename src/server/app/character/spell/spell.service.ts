import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Spell } from '../../entities/spell.entity';
import { SpellDTO } from './interfaces/spell.dto';

@Injectable()
export class SpellService {
  constructor(
    @InjectRepository(Spell) private readonly spellRepo: Repository<Spell>
  ) {}

  async getSpells(charId: string): Promise<Spell[]> {
    return this.spellRepo.find({
      where: {
        characterId: charId
      }
    });
  }

  async newSpell(newSpell: SpellDTO, charId: string): Promise<Spell> {
    const spell = this.spellRepo.create(newSpell);
    spell.mp_use = newSpell.mpUse;
    spell.number_of_hit = newSpell.multiplier;
    spell.use_diety = newSpell.useDiety;
    spell.character.id = charId;
    return this.spellRepo.save(spell);
  }

  async updateSpell(newSpell: SpellDTO, spellId: string): Promise<Spell> {
    const spell = await this.spellRepo.create(newSpell);
    spell.mp_use = newSpell.mpUse;
    spell.number_of_hit = newSpell.multiplier;
    spell.use_diety = newSpell.useDiety;
    return this.spellRepo.save(spell);
  }
}
