const QueryBuilder = require('objection').QueryBuilder;

class MyQueryBuilder extends QueryBuilder {

  upsert(model) {
    if (model.id && model.id !== null) {
      return new Promise((resolve, reject) => {
        resolve(this.findById(model.id));
      })
      .then(modelInstance => {
        if (!modelInstance) {
          throw new Error('No model found for ' + model.id);
        }
        return modelInstance.$query().patchAndFetch(model);
      })
      .catch(err => {
        return err;
      })
    } else {
      return this.insert(model);
    }
  }
}

module.exports = MyQueryBuilder;