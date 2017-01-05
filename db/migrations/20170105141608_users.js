exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('userid').notNullable().unique();
    table.string('pic').notNullable();
    table.string('phonenumber').notNullable();
    table.integer('friendrank').notNullable();
    table.integer('lettuceleaves').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
