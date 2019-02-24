import { SpellPipe } from './spell.pipe';
import { SpellDTO } from '@Models/bodies/spell/spell.dto';
import { Modifier } from '@Db/models/enums/modifiers.enum';

describe('#SpellPipe', () => {
  it('should trnasform the spellDTO to a DbSpell', () => {
    const pipe = new SpellPipe();
    const inSpell: SpellDTO = {
      id: '0sPtest12345',
      name: 'Test Spell',
      modifier: 'Wisdom',
      effect: 'Does a thing',
      mpUse: 5,
      multiplier: 2,
      damage: 4,
      diety: 'Nayru',
      useDiety: false
    };
    const transformed = pipe.transform(inSpell, { type: 'body' } as any);
    expect(transformed.spModifier).toBe(Modifier['Wisdom']);
    expect(transformed.spId).toBe('0sPtest12345');
  });
});
