const QueryBuilder = require('objection').QueryBuilder;

class MyQueryBuilder extends QueryBuilder {

  upsert(model) {
    if (model.id && model.id !== null) {
      return new Promise((resolve, reject) => {
        resolve(this.findById(model.id));
      })
      .then(modelInstance => {
        return modelInstance.$query().update(model).returning('id');
      })
      .catch(err => {
        return err;
      })
      //return this.update(model).where({id: model.id}).returning('id');
    } else {
      return this.insert(model).returning('id');
    }
  }
}

module.exports = MyQueryBuilder;