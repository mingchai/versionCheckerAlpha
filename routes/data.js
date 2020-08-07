const express = require("express");
const router = express.Router();
const { log, error } = console;
const knex = require("../db/client");
const { psFetcher, ipsFetcher, tronFetcher, txsFetcher, icsFetcher } = require("../experiments");

router.get("/all", function (req, res, next) {
  knex
    .select("*")
    .from("versionTracker")
    .orderBy("grouping", "ASC")
    .orderBy("createdAt", "DESC")
    .then((versionInfo) => {
      res.send(versionInfo);
    });
});

module.exports = router;
