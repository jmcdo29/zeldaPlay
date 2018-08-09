// TODO: Add JSDoc documentation for file.
import { Model, QueryBuilder } from 'objection';
import { ISave } from '../../interfaces/saveInterface';
import { checkNull, makeId  } from '../../utils/utils';

/**
 * @extends {Model}
 * @prop {string} id
 * @prop {string} last_modified - string containing the last modified datetime
 * @prop {string} character_id - the character id of the character the save belongs to
 * @prop {string} racial_bonus - the possible bonus to the roll due to the character's race.
 * @prop {string} name - the name of the saving throw - will be Fortitude, Reflex, or Will
 * @prop {string} modifier - the name of the modifier to use - will be Dexterity, Constitution, or Wisdom
 * @prop {string} last_modified_by - the id of the user who last modified the Save
 */
export class Save extends Model {
  static tableName = 'saving_throw';

  id: string;
  last_modified: string;
  character_id: string;
  racial_bonus: number;
  name: string;
  modifier: string;
  last_modified_by: string;

  static upsert(model: Save): QueryBuilder<Save, Save, Save> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insert(model);
    }
  }

  constructor(id: string, chId: string, values: ISave) {
    super();
    if (id && chId && values) {
      this.id = checkNull(values.id) as string;
      this.character_id = chId;
      this.last_modified_by = id;
      this.name = values.name;
      this.racial_bonus = values.racial;
      this.modifier = values.modifier;
    }
  }

  $beforeInsert() {
    this.id = '0St' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
