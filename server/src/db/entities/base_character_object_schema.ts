import { JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './base_schema';
import { Character } from './character_schema';

export abstract class BaseCharacterObject extends Base {
  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
