const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", (req, res) => {
  console.log(req.body.urlInput);
  res.redirect('/')
})

module.exports = router;
