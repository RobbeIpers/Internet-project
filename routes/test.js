var express = require('express');
var router = express.Router();
var liedje_controller = require('../controllers/liedjeController');
router.get('/top_10', liedje_controller.liedje_list);
router.get('/', function(req, res, next) {
  res.render('liedje_form',{title:'Liedje'});
});
router.get('/create', liedje_controller.liedje_create_get);

// POST request for creating Liedje.
router.post('/', liedje_controller.liedje_create_post);

/* GET home page. */
module.exports = router;
