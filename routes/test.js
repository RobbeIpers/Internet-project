var express = require('express');
var router = express.Router();
var liedje_controller = require('../controllers/liedjeController');
var user_controller = require('../controllers/userController');
router.get('/top_10', liedje_controller.liedje_list);


router.get('/zoek', liedje_controller.liedje_zoek);

//GET request 
router.get('/',user_controller.isAuthenticated, function(req, res, next) {
    var flashMessages = res.locals.getMessages();
    console.log('flash', flashMessages);
    
    if(flashMessages.error){
        res.render('liedje_form', {
            showErrors: true,
            errors: flashMessages.error
        });
    }
    else{
        res.render('liedje_form', {title: 'Liedje'});
    }
});


// POST request for creating Liedje.
router.post('/', liedje_controller.liedje_create_post);
router.get('/stem',function(req,res,next){
    res.render('homepage');
    console.log(req.body.titel);
});
router.post('/stem',liedje_controller.stem);
/* GET home page. */
module.exports = router;

