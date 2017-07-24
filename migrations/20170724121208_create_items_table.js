
exports.up = knex => knex.schema.createTable('items', (table) => {
  table.increments('id');
  table.string('created_by');
  table.string('name');
  table.string('completed_at');
  table.integer('list_id')
    .references('lists.id')
    .onDelete('CASCADE');
  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('items');
