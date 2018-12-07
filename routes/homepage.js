var express = require('express');
var router = express.Router();

// Require controller modules.
var liedje_controller = require('../controllers/liedjeController');

// GET catalog home page.
router.get('/', liedje_controller.index);

module.exports = router;
