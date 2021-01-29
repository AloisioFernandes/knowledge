
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.timestamp('deletedAt') // adiciona coluna deletedAt na tabela users
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('deletedAt')
  })
};
