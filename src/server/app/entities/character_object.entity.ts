import { JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './base.entity';
import { Character } from './character.entity';

export abstract class BaseCharacterObject extends Base {
  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
