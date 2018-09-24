import * as Knex from 'knex';

exports.up = (knex: Knex): Promise<any> => {
  return Promise.all([
    knex.schema.table('user', (table) => {
      table.enum('role', ['Admin', 'Game-Master', 'Player']);
    })
  ]);
};

exports.down = (knex: Knex): Promise<any> => {
  return Promise.all([
    knex.schema.table('user', (table) => {
      table.dropColumn('role');
    })
  ]);
};
