import { Model } from 'objection';

import { ISpell } from '../../interfaces/spellInterface';
import { checkNull, makeId } from '../../utils/utils';

/**
 * @extends Model
 * @prop {string} tableName - spell
 * @prop {string} id
 * @prop {string} last_modified - time string of the last modification
 * @prop {string} name - name of the spell
 * @prop {string} effect - what the spell does
 * @prop {number} mp_use - how much mp the spell costs
 * @prop {number} damage - definition of which dice to use
 * @prop {number} number_of_hit - how many times to roll the damage dice
 * @prop {string} modifer - which modifier to add to the spell
 * @prop {string} diety - which diety power the spell draws from, Nayru, Farore, or Din
 * @prop {boolean} use_diety - if the spell should fully draw from diety power or use modifier too
 * @prop {string} last_modified_by - the id of the user who last modified the spell
 * @prop {string} character_id - id of the character the spell belongs to
 */
export class Spell extends Model {
  static tableName = 'spell';

  id: string;
  last_modified: string;
  name: string;
  effect: string;
  mp_use: number;
  damage: number;
  number_of_hit: number;
  modifier?: string;
  diety: string;
  use_diety = false;
  last_modified_by: string;
  character_id: string;

  /**
   * Inserts or updates the Spell, depending on if an id exists or not
   * @static
   * @param {Spell} model
   * @returns {QueryBuilder<Spell, Spell, Spell>} QueryBuilder to execute
   * @memberof Spell
   */
  /* static upsert(model: Spell): QueryBuilder<Spell, Spell, Spell> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insertAndFetch(model);
    }
  } */

  /**
   * Creates an instance of Spell.
   * @param {string} [id] - Id of the user who made or modified the spell
   * @param {string} [chId] - Id of the character the spell belongs to
   * @param {ISpell} [values] - The Spell's values from the client
   * @memberof Spell
   */
  constructor(id?: string, chId?: string, values?: ISpell) {
    super();
    if (id && chId && values) {
      this.id = checkNull(values.id, 'string') as string;
      this.name = values.name;
      this.effect = values.effect;
      this.mp_use = values.mpUse;
      this.modifier = checkNull(values.modifier, 'string') as string;
      this.diety = values.diety;
      this.use_diety = values.useDiety;
      this.damage = values.damage;
      this.number_of_hit = values.multiplier;
      this.character_id = chId;
      this.last_modified_by = id;
    }
  }

  /**
   * creates the spell id
   * @memberof Spell
   */
  $beforeInsert() {
    this.id = '0Sp' + makeId(9);
  }

  /**
   * Checks the spell's old id against the new to ensure it is the same. Sets the lat modified by timestamp
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Spell
   */
  $beforeUpdate(opt: any, queryContext: any) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
