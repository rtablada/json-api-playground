exports.up = knex => knex.schema.createTable('lists', (table) => {
  table.increments('id');
  table.string('name');
  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('lists');
