import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './base_character_object_schema';

@Entity()
export class Weapon extends BaseCharacterObject {
  idStart: '00W';

  @Column()
  name: string;

  @Column('int')
  damage: number;

  @Column('int')
  number_of_hits: number;

  @Column()
  crit_range: string;

  @Column('int')
  crit_multiplier: number;

  @Column()
  type: string;

  @Column()
  modifier: string;

  @Column('int')
  range: number;

  @Column('int')
  ammo: number;
}

/**
 * function to take an array of strings (as numbers) and return a single string for the range (['18','19','20'] => '18 - 20')
 * @param {string[]} array - string array to parse through
 * @returns {string} - string built as a range (i.e. 18 - 20)
 */
function parseArray(array: string[]): string {
  if (array.length === 1) {
    return array[0];
  } else {
    return array[0] + ' - ' + array[array.length - 1];
  }
}
