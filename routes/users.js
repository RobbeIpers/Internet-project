var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');
var passport= require('passport');
var bcrypt= require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//login form
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Log In'});
});
//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local',{
            successRedirect:'/',
            faillureRedirect: '/users/login',
            faillureFlash:true
        })(req,res,next);
});

//register form  
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});
router.post('/register', user_controller.user_create_post);


module.exports = router;
