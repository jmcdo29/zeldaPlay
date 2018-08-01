exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('error', table => {
      table.string('stack');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('error', table => {
      table.dropColumn('stack');
    })
  ])
};