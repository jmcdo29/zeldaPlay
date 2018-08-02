const Model = require('objection').Model;
const CustomQB = require('./CustomQueryBuilder');

class CustomModel extends Model {

  static get QueryBuilder() {
    return CustomQB;
  } 

  static get modelClass() {
    return this;
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if(opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}

module.exports = CustomModel;