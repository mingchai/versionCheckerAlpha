exports.up = function (knex) {
  return knex.schema.table("versionTracker", (table) => {
    table.string("appName");
  });
};

exports.down = function (knex) {
  return knex.schema.table("versionTracker", (table) => {
    table.dropColumn("appName");
  });
};