const QueryBuilder = require('objection').QueryBuilder;

class MyQueryBuilder extends QueryBuilder {

  upsert(model) {
    if (model.id && model.id !== null) {
      return this.update(model).where({id: model.id}).returning('id');
    } else {
      return this.insert(model).returning('id');
    }
  }
}

module.exports = MyQueryBuilder;