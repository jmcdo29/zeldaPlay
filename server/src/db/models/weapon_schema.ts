import { Model, RelationMappings } from 'objection';
import { IWeapon } from '../../interfaces/weaponInterface';
import { checkNull, makeId } from '../../utils/utils';
import { CustomModel } from './customModel';
import { Element } from './element_schema';

/**
 * @extends {CustomModel}
 * @prop {string} tableName weapon
 * @prop {RelationMappings} relationMappings
 * @prop {string} id
 * @prop {string} last_modified - timestamp of last modification
 * @prop {string} name - weapon's name
 * @prop {string} character_id - id of the character owning the weapon
 * @prop {number} damage - the dX to roll
 * @prop {number} number_of_hits - how many times to roll that dice
 * @prop {string} crit_range - range for critical hit
 * @prop {number} crit_multiplier - multiplication of critical damage
 * @prop {string} type - weapon's type (short sword, bow, boomerang, etc.)
 * @prop {string} modifier - the modifier to use with the weapon (Strength, Dexterity, Wisdom)
 * @prop {number} range - how far a ranged weapon can fire
 * @prop {number} ammo - how much ammo a ranged weapon has
 * @prop {string} last_modified_by - the id of the last user to modify the weapon
 */
export class Weapon extends CustomModel {
  static tableName = 'weapon';

  static relationMappings: RelationMappings = {
    element: {
      relation: Model.HasOneRelation,
      modelClass: Element,
      join: {
        from: `${Weapon.tableName}.id`,
        to: `${Element.tableName}.weapon_id`
      }
    }
  };

  id: string;
  last_modified: string;
  name: string;
  character_id: string;
  damage: number;
  number_of_hits: number;
  crit_range: string;
  crit_multiplier: number;
  type: string;
  modifier: string;
  range: number;
  ammo: number;
  last_modified_by: string;

  /**
   * Creates an instance of Weapon.
   * @param {string} [id] - user who created/updated the weapon
   * @param {string} [chId] - id of the character the weapon belongs to
   * @param {IWeapon} [values] - weapon's values
   * @memberof Weapon
   */
  constructor(id?: string, chId?: string, values?: IWeapon) {
    super();
    if (id && chId && values) {
      this.id = checkNull(values.id, 'string') as string;
      this.name = values.name;
      this.damage = values.attack;
      this.number_of_hits = values.numberOfAttacks;
      this.crit_range = parseArray(values.critRange);
      this.ammo = checkNull(values.ammo, 'number') as number;
      this.range = checkNull(values.range, 'number') as number;
      this.modifier = values.modifier;
      this.character_id = chId;
      this.last_modified_by = id;
      this.type = values.type;
      this.modifier = values.modifier;
      this.crit_multiplier = values.critDamage;
    }
  }

  /**
   * creates weapon id
   * @memberof Weapon
   */
  $beforeInsert() {
    this.id = '00W' + makeId(9);
  }

  /**
   * checks that the id has not changed and sets modification timestamp
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Weapon
   */
  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
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
