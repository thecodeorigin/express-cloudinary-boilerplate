exports.up = function(knex) {
  return knex.schema.createTable('images', function (table) {
    table.increments().primary();
    table.string('url');
    table.string('secure_url');
    table.string('public_id');
    table.string('width');
    table.string('height');
    table.size('size');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
