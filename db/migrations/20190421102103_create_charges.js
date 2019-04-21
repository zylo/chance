exports.up = knex => knex.schema
  .createTable('charges', (table) => {
    table.increments('id').notNullable().primary();
    table.decimal('amount').notNullable();
    table.string('name', 128).notNullable();
    table.string('description', 256);
    table.string('type', 64);
    table.timestamp('date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('charges');
