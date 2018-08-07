import { Model, QueryBuilder } from 'objection';
import { makeId, checkNull } from '../../utils/utils';

export class Spell extends Model {
  static tableName = 'spell';

  id: string;
  last_modified: string;
  name: string;
  effect: string;
  mp_use: number;
  damage: number;
  number_of_hit: number;
  modifier: string;
  diety: string;
  use_diety = false;
  last_modified_by: string;
  character_id: string;

  static upsert(model: Spell): QueryBuilder<Spell, Spell, Spell> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insert(model);
    }
  }

  constructor(id?, chId?, values?) {
    super();
    if (id && chId && values) {
      this.id = checkNull(values.id).toString();
      this.name = values.name;
      this.effect = values.effect;
      this.mp_use = values.mpUse;
      this.modifier = checkNull(values.modifier).toString();
      this.diety = values.diety;
      this.use_diety = values.useDiety;
      this.damage = values.damage;
      this.number_of_hit = values.multiplier;
      this.character_id = chId;
      this.last_modified_by = id;
    }
  }

  $beforeInsert() {
    this.id = '0Sp' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
