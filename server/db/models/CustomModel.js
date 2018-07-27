const Model = require('objection').Model;
const CustomQB = require('./CustomQueryBuilder');

class CustomModel extends Model {
  static get QueryBuilder() {
    return CustomQB;
  } 
}

module.exports = CustomModel;