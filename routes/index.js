var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/second', function(req, res, next) {
  res.render('second',{});
});
router.get('/three', function(req, res, next) {
  res.render('three',{});
});

module.exports = router;
