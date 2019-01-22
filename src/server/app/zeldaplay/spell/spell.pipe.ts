import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { DbSpell } from '@DbModel/db_spell.table';
import { Modifier } from '@DbModel/enums/modifiers.enum';
import { SpellDTO } from '@Spell/interfaces/spell.dto';

@Injectable()
export class SpellPipe implements PipeTransform<SpellDTO, DbSpell> {
  transform(value: SpellDTO, metadata: ArgumentMetadata): DbSpell {
    const spell = new DbSpell();
    spell.spId = value.id;
    spell.spName = value.name;
    spell.spModifier = value.modifier as Modifier;
    spell.spDamage = value.damage;
    spell.spDiety = value.diety as 'Din' | 'Farore' | 'Nayru';
    spell.spEffect = value.effect;
    spell.spMpUse = value.mpUse;
    spell.spNumberOfHits = value.multiplier;
    spell.spUseDiety = value.useDiety;
    return spell;
  }
}
