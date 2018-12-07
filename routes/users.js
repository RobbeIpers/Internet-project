var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');
var passport= require('passport');
var bcrypt= require('bcryptjs');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});


router.get('/account', user_controller.stem_list);


//login form
router.get('/login', function(req, res, next) {
    var flashMessages = res.locals.getMessages();
    console.log('flash', flashMessages);
        if(flashMessages.error){
            res.render('login', {
                showErrors: true,
                errors: flashMessages.error
            });
        }
        else{
            res.render('login', {title: 'Log In'});
        }

});
router.post('/account',user_controller.liedje_delete_post);
//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local',{
            successRedirect:'/liedje',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req,res,next);
});

//register form  
router.get('/register', function(req, res, next) {
    var flashMessages = res.locals.getMessages();
    console.log('flash', flashMessages);
    
    if(flashMessages.error){
        res.render('register', {
            showErrors: true,
            errors: flashMessages.error
        });
    }
    else{
        res.render('register', {title: 'Register'});
    }
});

router.post('/register', user_controller.user_create_post);

router.get('/logout', function(req, res, next) {
  if (req.session) { 
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


module.exports = router;
