import { Model, QueryBuilder, RelationMappings } from 'objection' ;
import { makeId, checkNull } from '../../utils/utils';
import { Element } from './element_schema';

export class Weapon extends Model {

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
  range: number | string;
  ammo: number | string;
  last_modified_by: string;

  static upsert(model: Weapon): QueryBuilder<Weapon, Weapon, Weapon> {
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
      this.damage = values.attack;
      this.number_of_hits = values.numberOfAttacks;
      this.crit_range = parseArray(values.critRange);
      this.ammo = checkNull(values.ammo);
      this.range = checkNull(values.range);
      this.modifier = values.modifier;
      this.character_id = chId;
      this.last_modified_by = id;
      this.type = values.type;
      this.modifier = values.modifier;
      this.crit_multiplier = values.critDamage;
    }
  }

  $beforeInsert() {
    this.id = '00W' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}

function parseArray(array: string[]): string {
  if (array.length === 1) {
    return array[0];
  } else {
    return array[0] + ' - ' + array[array.length - 1];
  }
}
