var express = require('express');
var router = express.Router();
var liedje_controller = require('../controllers/liedjeController');
router.get('/', liedje_controller.liedje_list);
/* GET home page. */
module.exports = router;
