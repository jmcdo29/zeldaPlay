import { Goron } from '../characterModels/Races';

const testCharacter = new Goron();
testCharacter.name = 'Test Goron';
testCharacter.subRace = 'Soft Belly';
testCharacter.weapons = [
  {
    name: 'test Sword',
    type: 'Short Sword',
    critDamage: 3,
    numberOfAttacks: 1,
    range: 0,
    attack: 4,
    critRange: [20],
    modifier: 'Strength',
    id: ''
  },
  {
    name: 'test Rod',
    type: 'Fire Rod',
    critDamage: 3,
    numberOfAttacks: 1,
    range: 0,
    attack: 4,
    critRange: [19, 20],
    modifier: 'Wisdom',
    id: ''
  }
];
testCharacter.spells = [
  {
    name: 'Test blast',
    effect: 'Some spell thing',
    diety: 'Din',
    damage: 4,
    multiplier: 1,
    mpUse: 0,
    useDiety: false,
    id: ''
  },
  {
    name: 'Test cone',
    effect: 'Some spell thing',
    diety: 'Din',
    damage: 4,
    multiplier: 1,
    mpUse: 0,
    useDiety: false,
    id: ''
  }
];
testCharacter.notes = [
  {
    msg: 'Test message 1',
    time: 'some time',
    important: false,
    id: ''
  },
  {
    msg: 'Test message 2',
    time: 'some time',
    important: false,
    id: ''
  }
];
testCharacter.importantNotes = [
  {
    msg: 'Test important message 1',
    time: 'some time field',
    important: true,
    id: ''
  },
  {
    msg: 'Test important message 2',
    time: 'some time field',
    important: true,
    id: ''
  }
];

export const myChar = testCharacter;
