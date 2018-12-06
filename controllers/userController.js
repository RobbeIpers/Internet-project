var express=require('express');
var router = express.Router();
var User = require('../models/user');
var Stem = require('../models/stem');
var Liedje = require('../models/liedje');

var async =require('async');
var bcrypt= require('bcryptjs');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.liedje_delete_post = function(req, res) {
    console.log("in delete");
    Stem.findByIdAndRemove(req.body.stemid, function deleteStem(err) {
        if (err) { 
            return next(err); }
        });   
    console.log("succes");// Success 
    Liedje.findOne({ titel: req.body.titel})
        .exec(function(err, found_liedje) {
            if (err) {
                return next(err);
            }
        
        if (found_liedje) {
            found_liedje.aantStemmen = found_liedje.aantStemmen - 1;
            found_liedje.save(function (err) {
                if (err) {
                    req.flash('error', 'Er was een probleem met je liedje te verwijderen, probeer opnieuw');
                    res.redirect('/users/account');
                }
                console.log("succes");
            });
        }
    req.user.aantStemmen=req.user.aantStemmen + 1;
    req.user.save(function (err) {
                                if (err) {
                                    req.flash('error', 'Er was een probleem met je liedje te verwijderen, probeer opnieuw');
                                    res.redirect('/account');
                                } // saved!
                            });
         
         // saved!
    res.redirect('/users/account');
    });            
    return;
};
    

// Register User
exports.user_create_post=[
	
    //sanitize
    (req,res,next)=>{ 
        sanitizeBody('name').trim().escape(),
        sanitizeBody('email').trim().escape(),
        req.checkBody('email', 'Vul email in').isLength({ min: 1 }).trim();
        req.checkBody('email', 'Een correcte email aub').isEmail();
        req.checkBody('password', 'Vul een wachtwoord in').isLength({min: 1});
        req.checkBody('name', 'Vul het naam vak in').notEmpty();
        req.checkBody('password2','wachtwoorden zijn verschillend').equals(req.body.password);
        req.getValidationResult()
            .then(function(result) {
                if (result.isEmpty() === false) {
                    result.array().forEach((error) => {
                        req.flash('error', error.msg);
                    })
                    res.redirect('/users/register');
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
                                req.flash('error', 'Er was een probleem bij het registreren, probeer opnieuw');
                                res.render('register',{title: 'Registreer', //errors: errors.array()
                                });
                            }
                            newUser.password=hash;
                            newUser.save(function(err){
                                if(err){
                                    if (err.message.indexOf('duplicate key error') > -1) {
                                        req.flash('error', 'Email is al in gebruik');
                                    }
                                    else {
                                        req.flash('error', 'Er was een probleem bij het registreren, probeer opnieuw');
                                    }
                                    res.redirect('/users/register');
                                    console.log('There was an error saving the user.', err);
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

];

module.exports.stem_list = function(req, res, next) {
  Stem.find({email: req.user.email})
    .exec(function (err, list_stemmen) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('account', { title: req.user.naam, stemmen: list_stemmen});
    });

};




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


