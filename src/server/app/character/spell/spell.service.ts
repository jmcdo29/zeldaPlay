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
    spell.character.id = charId;
    return this.spellRepo.save(spell);
  }
}
