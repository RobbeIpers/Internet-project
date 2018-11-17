var express = require('express');
var router = express.Router();

// Require controller modules.
var liedje_controller = require('../controllers/liedjeController');

// GET catalog home page.
router.get('/', liedje_controller.index);
// GET request for creating a Liedje. NOTE This must come before routes that display Liedje (uses id).
router.get('/liedje/create', liedje_controller.liedje_create_get);

// POST request for creating Liedje.
router.post('/liedje/create', liedje_controller.liedje_create_post);

// GET request to delete Liedje.
router.get('/liedje/:id/delete', liedje_controller.liedje_delete_get);

// POST request to delete Liedje.
router.post('/liedje/:id/delete', liedje_controller.liedje_delete_post);

// GET request to update Liedje.
router.get('/liedje/:id/update', liedje_controller.liedje_update_get);

// POST request to update Liedje.
router.post('/liedje/:id/update', liedje_controller.liedje_update_post);

// GET request for one Liedje.
router.get('/liedje/:id', liedje_controller.liedje_detail);

// GET request for list of all Liedje items.
router.get('/liedjes', liedje_controller.liedje_list);

module.exports = router;
