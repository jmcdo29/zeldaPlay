import { Model, QueryBuilder } from 'objection';

/**
 * Custom abstract class to implement an upsert method across all models.
 * @export
 * @abstract
 * @class CustomModel
 * @extends {Model}
 * @property {string} id
 */
export abstract class CustomModel extends Model {
  id: string;

  /**
   * Custom upsert method to determine whether to insert or update
   *
   * @template T Any extension of the custom model
   * @returns QueryBuilder<this, this, this>
   * @memberof CustomModel
   */
  upsert<T>(): QueryBuilder<this, this, this> {
    if (this.id && this.id !== null) {
      return this.$query().patchAndFetch(this);
    } else {
      return this.$query().insert(this);
    }
  }
}
