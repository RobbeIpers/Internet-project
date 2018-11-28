var express = require('express');
var router = express.Router();

// Require controller modules.
var liedje_controller = require('../controllers/liedjeController');

// GET catalog home page.
router.get('/', liedje_controller.index);
// GET request for creating a Liedje. NOTE This must come before routes that display Liedje (uses id).
module.exports = router;
