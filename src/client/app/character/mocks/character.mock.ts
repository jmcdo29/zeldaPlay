import { Note } from '../characterModels/note';
import { Goron } from '../characterModels/Races';
import { Spell } from '../characterModels/spells';
import { Weapon } from '../characterModels/weapons/weapon';

const testCharacter = new Goron();
testCharacter.setName('Test Goron');
testCharacter.setSubRace('Soft Belly');
testCharacter.addWeapon(
  new Weapon(
    undefined,
    'test Sword',
    4,
    1,
    [20],
    3,
    'Short Sword',
    'Strength',
    0
  )
);
testCharacter.addWeapon(
  new Weapon(undefined, 'test Rod', 4, 1, [19, 20], 3, 'Fire Rod', 'Wisdom', 0)
);
testCharacter.addSpell(
  new Spell(
    undefined,
    'Test blast',
    'Some spell thing',
    4,
    1,
    0,
    'Din',
    false,
    'Intelligence'
  )
);
testCharacter.addSpell(
  new Spell(
    undefined,
    'Test cone',
    'Some spell thingy',
    4,
    1,
    0,
    'Farore',
    false,
    'Charisma'
  )
);
testCharacter.addNote(
  new Note(undefined, 'Test message 1', 'some time string', false)
);
testCharacter.addNote(
  new Note(undefined, 'Test message 2', 'some time', false)
);
testCharacter.addImportantNote(
  new Note(undefined, 'Test important message 1', 'some time field', true)
);
testCharacter.addImportantNote(
  new Note(undefined, 'Test important message 2', 'some time field', true)
);

export const myChar = testCharacter;
