exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('character', (table) => {
      table.integer('level');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('character', (table) => {
      table.dropColumn('level');
    })
  ]);
};
