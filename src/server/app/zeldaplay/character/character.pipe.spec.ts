import { CharacterPipe } from './character.pipe';

import { Modifier } from '@Db/models/enums/modifiers.enum';
import { CharacterDTO } from '@Models/bodies/character/character.dto';

describe('#CharacterPipe', () => {
  let pipe: CharacterPipe;
  let inChar: CharacterDTO;

  beforeAll(() => {
    pipe = new CharacterPipe();
  });
  beforeEach(() => {
    inChar = {
      attributes: [
        {
          value: 12,
          name: 'Strength',
          modifier: 1
        },
        {
          name: 'Dexterity',
          modifier: 3,
          value: 16
        },
        {
          name: 'Consitution',
          modifier: 1,
          value: 13
        },
        {
          name: 'Intelligence',
          modifier: 2,
          value: 15
        },
        {
          name: 'Wisdom',
          modifier: 4,
          value: 18
        },
        {
          name: 'Charisma',
          modifier: 3,
          value: 17
        }
      ],
      craftOne: 'Fairy Made Armor',
      craftTwo: 'Magic Potions',
      exp: 35100,
      health: 166,
      id: '00Ctest12345',
      level: 6,
      magic: 77,
      maxHealth: 166,
      maxMagic: 77,
      name: 'TestChar',
      profession: 'Armor Smith',
      performCust: null,
      race: 'Fairy',
      subRace: 'Nayru',
      magicSkills: [
        {
          skillName: 'Din',
          item: 0,
          misc: 0,
          modifier: Modifier['Intelligence'],
          racial: 0,
          type: 'magic',
          ranks: 1,
          id: '00Stest12345',
          trained: true
        },
        {
          skillName: 'Nayru',
          item: 0,
          misc: 0,
          modifier: Modifier['Wisdom'],
          racial: 0,
          type: 'magic',
          ranks: 10,
          id: '00Stest23456'
        } as any
      ],
      weaponSkills: [
        {
          skillName: 'Tornado Rod',
          trained: false,
          item: 0,
          misc: 0,
          modifier: Modifier['Wisdom'],
          id: '00Stest34567',
          racial: 0,
          ranks: 8,
          type: 'weapon'
        }
      ],
      skills: [
        {
          skillName: 'Knowledge (History)',
          trained: true,
          item: 0,
          misc: 0,
          modifier: Modifier['Intelligence'],
          type: 'skill',
          racial: 0,
          ranks: 3
        }
      ],
      savingThrows: [
        {
          modifier: Modifier['Dexterity'],
          name: 'Reflex',
          racial: 0,
          id: '0Sttest12345'
        }
      ]
    };
  });
  it('should transform the inChar', () => {
    const character = pipe.transform(inChar, { type: 'body' });
    expect(character.chCharisma).toBe(17);
    expect(character.chHealth).toBeLessThanOrEqual(character.chHealthMax);
    expect(character.chMagic).toBeLessThanOrEqual(character.chMagicMax);
    expect(character.skills.length).toBe(4);
    expect(character.saves.length).toBe(1);
  });
});
