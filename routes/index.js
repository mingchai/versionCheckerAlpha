const express = require('express');
const router = express.Router();
const experiments = require('../experiments');
const psFetcher = experiments.psFetcher;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", (req, res) => {
  console.log(req.body.urlInput);
  let requestedURL = req.body.urlInput;
  psFetcher(requestedURL);
  res.redirect('/')
})

module.exports = router;
