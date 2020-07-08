const knexfile = require("../knexfile.js");
const knexConnector = require("knex");
const knex = knexConnector(knexfile.development);

module.exports = knex;