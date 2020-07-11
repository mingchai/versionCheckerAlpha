const express = require('express');
const router = express.Router();
const experiments = require('../experiments');
const psFetcher = experiments.psFetcher;
const {log, error} = console;
const knex = require('../db/client');

router.get('/', function(req, res, next) {
  knex.select("*").from("versionTracker").orderBy("grouping", "ASC").orderBy("createdAt", "DESC").then(versionInfo =>{
    res.render("./index", {versionInfo, title: 'Version Checker'});
})
});

router.post("/", (req, res) => {
  try {
      async function fetcher(){
        let requestedURL = req.body.urlInput;
        let specifiedGrouping = req.body.grouping;
        let fetchedVersion = await psFetcher(requestedURL);
        log(`URL submitted: ${requestedURL}, Grouping: ${specifiedGrouping}`);
        
        const newEntry = {
          url: requestedURL,
          grouping: specifiedGrouping,
          version: fetchedVersion
        }

        log("redirecting...")
        knex.insert(newEntry)
          .into("versionTracker")
          .returning('*')
          .then( ()=>{
            res.redirect("/");
          })
        }
      
      fetcher();
  } catch(err) {
    error(err);
    res.render("./index", {err})
  }
})

module.exports = router;
