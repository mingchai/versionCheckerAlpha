const express = require('express');
const router = express.Router();
const experiments = require('../experiments');
const psFetcher = experiments.psFetcher;
const {log, error} = console;
const knex = require('../db/client');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Version Checker' });
  knex.select("*").from("versionTracker").orderBy("createdAt", "DESC").then(versionInfo =>{
    res.render("./index", {versionInfo, title: 'Version Checker'});
})
});

router.post("/", (req, res) => {
  try {
      async function fetcher(){
        let requestedURL = req.body.urlInput;
        let specifiedGrouping = req.body.grouping;
        let fetchedVersion = await psFetcher(requestedURL);
        log(requestedURL, specifiedGrouping)
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
  }
})

module.exports = router;
