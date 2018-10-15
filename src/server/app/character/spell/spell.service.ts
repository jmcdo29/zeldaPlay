import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Spell } from '@Entity/spell.entity';

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

  async newSpell(newSpell: Spell, charId: string): Promise<Spell> {
    newSpell.character.id = charId;
    return this.spellRepo.save(newSpell);
  }

  async updateSpell(newSpell: Spell): Promise<Spell> {
    return this.spellRepo.save(newSpell);
  }
}
