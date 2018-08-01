
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('error', table => {
      table.string('message');
      table.string('id').primary();
      table.string('code');
      table.timestamp('error_time').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('error')
  ]);
};
