var express = require('express');
var router = express.Router();
//var liedjeController = require('..controllers/liedjeController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CHIRO FUIF' });
});
// GET catalog home page.
router.get('/', liedje_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/liedje/create', liedje_controller.liedje_create_get);

// POST request for creating Book.
router.post('/liedje/create', liedje_controller.liedje_create_post);

// GET request to delete Book.
router.get('/liedje/:id/delete', liedje_controller.liedje_delete_get);

// POST request to delete Book.
router.post('/liedje/:id/delete', liedje_controller.liedje_delete_post);

// GET request to update Book.
router.get('/liedje/:id/update', liedje_controller.liedje_update_get);

// POST request to update Book.
router.post('/liedje/:id/update', liedje_controller.liedje_update_post);

// GET request for one Book.
router.get('/liedje/:id', liedje_controller.liedje_detail);

// GET request for list of all Book items.
router.get('/liedjes', liedje_controller.liedje_list);


module.exports = router;

