exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('error', (table) => {
      table.string('stack');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('error', (table) => {
      table.dropColumn('stack');
    })
  ]);
};
