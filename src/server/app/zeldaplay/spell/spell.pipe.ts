import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Spell } from '@Entity/spell.entity';

import { SpellDTO } from '@Spell/interfaces/spell.dto';

@Injectable()
export class SpellPipe implements PipeTransform<SpellDTO, Spell> {
  transform(value: SpellDTO, metadata: ArgumentMetadata): Spell {
    const spell = new Spell();
    spell.id = value.id;
    spell.name = value.name;
    spell.modifier = value.modifier;
    spell.damage = value.damage;
    spell.diety = value.diety;
    spell.effect = value.effect;
    spell.mp_use = value.mpUse;
    spell.number_of_hit = value.multiplier;
    spell.use_diety = value.useDiety;
    return spell;
  }
}
