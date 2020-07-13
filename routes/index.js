const express = require("express");
const router = express.Router();
const experiments = require("../experiments");
const psFetcher = experiments.psFetcher;

const { log, error } = console;
const knex = require("../db/client");
const { ipsFetcher } = require("../experiments");

router.get("/", function (req, res, next) {
  knex
    .select("*")
    .from("versionTracker")
    .orderBy("grouping", "ASC")
    .orderBy("createdAt", "DESC")
    .then((versionInfo) => {
      res.render("./index", { versionInfo, title: "Version Checker" });
    });
});

router.post("/", (req, res) => {
  let application = req.body.apps;
  let requestedURL = req.body.urlInput;
  let specifiedGrouping = req.body.grouping;

  if (application == "PS/IPS") {
    try {
      async function fetcher() {
        const [psVersion, psAppName] = await psFetcher(requestedURL);
        const [ipsVersion, ipsAppName] = await ipsFetcher(requestedURL);

        log(`URL submitted: ${requestedURL}, Grouping: ${specifiedGrouping}`);

        const newPsEntry = {
          url: requestedURL,
          grouping: specifiedGrouping,
          version: psVersion,
          appName: psAppName
        };

        const newIpsEntry = {
          url: requestedURL,
          grouping: specifiedGrouping,
          version: ipsVersion,
          appName: ipsAppName
        };

        log("redirecting...");
        knex
          .insert([newPsEntry, newIpsEntry])
          .into("versionTracker")
          .returning("*")
          .then(() => {
            res.redirect("/");
          });
      }

      fetcher();
    } catch (err) {
      error(err);
      res.render("./index", { err });
    }
  } else if(application == "Tron/TXS"){
    // TODO: add fetch for other applications
  }
});

module.exports = router;
