var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Log In'});
});
//register form  
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});
router.post('/register', user_controller.user_create_post);



module.exports = router;
