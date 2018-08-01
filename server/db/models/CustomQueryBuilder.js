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
    } else {
      return this.insert(model).returning('id');
    }
  }

  upsertMany(models) {
    return new Promise((resolve, reject) => {
      const queries = [];
      models.forEach(model => {
        if (model.id) {
          queries.push(updateMaker(this, model));
        } else {
          queries.push(this.insert(model).returning('id'));
        }
      });
      resolve(queries);
    })
    .then(queries => {
      return queries;
    })
    .catch(err => {
      throw err;
    })
  }
}

function updateMaker(context, model) {
  return new Promise((resolve, reject) => {
    resolve(context.modelClass().query().findById(model.id));
  })
  .then(instanceModel => {
    return instanceModel.$query().update(model).returning('id');
  })
  .catch(err => {
    throw err;
  })
}

module.exports = MyQueryBuilder;