var User = require('../models/user');
var async =require('async');
var bcrypt= require('bcryptjs');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Register User
exports.user_create_post=[
    (req,res,next)=>{ 
	// Validation
	body('name', 'Name is required').isLength({ min: 1 }).trim(),
	body('email', 'Email is required').isLength({ min: 1 }).trim(),
	body('email', 'Email is not valid').isEmail(),
	body('password', 'Password is required').isLength({min: 1}),
	body('password2', 'Passwords do not match').equals(req.body.password),
    //sanitize
    sanitizeBody('name').trim().escape(),
    sanitizeBody('email').trim().escape();
    
       
	const errors = validationResult(req);
    console.log('name');
	if(!errors.isEmpty()){
        res.render('register',{title: 'Registreer', errors: errors.array()});
        return;
    }
	else {
		//checking for email and username are already taken
        function (err, user) {
			User.findOne({ email: {email}});
        function (err, mail) {
				if (mail) {
					res.render('register', {
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: name,
						email: email,
						password: password
					});
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(newUser.password,salt, function(err, hash){
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
                                    res.redirect('/user/login')}
                            })
                            }
                        });
                    });
                    
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
					res.redirect('/users/login');
				}
			});
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

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}