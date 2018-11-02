var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('liedje_form', { title: 'CHIRO FUIF' });
});

module.exports = router;
