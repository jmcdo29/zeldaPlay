
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('character', table => {
      table.integer('level');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('character', table => {
      table.dropColumn('level');
    })
  ]);
};
