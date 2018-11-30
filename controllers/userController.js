var User = require('../models/user');
var async =require('async');
var bcrypt= require('bcryptjs');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Register User
exports.user_create_post=[
	
    //sanitize
    sanitizeBody('name').trim().escape(),
    sanitizeBody('email').trim().escape(),
    (req,res,next)=>{  
    req.checkBody('email', 'Vul email in').isLength({ min: 1 }).trim(),
	req.checkBody('email', 'Een correcte email aub').isEmail(),
	req.checkBody('password', 'Vul een wachtwoord in').isLength({min: 1}),    
    req.checkBody('name', 'Vul het naam vak in').notEmpty();
    req.checkBody('password2','wachtwoorden zijn verschillend').equals(req.body.password);  
	var errors = req.validationErrors();
	if(errors){
        req.flash('error', 'test');
        res.render('register',{title: 'Registreer', errors: errors});
        return;
    }
	else {
		//checking if email is already taken
        User.findOne({ email: req.body.email})
            .exec( function(err, mail) {
                if(err){return next(err);}
				if (mail) {
					res.render('register', {
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password
					});
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(newUser.password, salt, function(err, hash){
                            if(err){
                                res.render('register',{title: 'Registreer', errors: errors.array()});
                            }
                            newUser.password=hash;
                            newUser.save(function(err){
                                if(err){
                                    res.render('register',{title: 'Registreer', errors: errors.array()});
                                    return;
                                }
                                else{
                                    res.redirect('/users/login')
                                }
                            });
                        });
                    });	
				}
			});
	}
}

];


module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else res.redirect('/users/login');
}


