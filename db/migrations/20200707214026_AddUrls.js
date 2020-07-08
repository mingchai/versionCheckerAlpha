
exports.up = function(knex) {
  return knex.schema.createTable('versionTracker', table => {
    table.increments('id');
    table.string('url');
    table.string('grouping');
    table.string('version');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("versionTracker");
};
