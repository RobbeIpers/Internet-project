var express=require('express');
var router = express.Router();
var Liedje = require('../models/liedje');
var async =require('async')

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res) {
    res.render('homepage', {title:'CHIRO'});
};
// Display list of top 10 Liedjes.
exports.liedje_list = function(req, res, next) {
  Liedje.find()
    .sort([['aantStemmen', 'descending']])
    .exec(function (err, list_liedjes) {
      if (err) { return next(err); }
      var top10=[];
      //Successful, so render
      if(list_liedjes.length>=10){
        for(i=0;i<10;i++){
            top10[i]=list_liedjes[i];
        }
    }
      else{top10=list_liedjes;}
      res.render('top_10', { title: 'top 10', liedje_list: top10});
    });

};

// Display detail page for a specific Liedje.
exports.liedje_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje detail: ' + req.params.id);
};

// Handle Liedje create on POST.
exports.liedje_create_post =[
    
    
    //sanitize
    (req,res,next)=>{
        sanitizeBody('titel').trim().escape(),
        sanitizeBody('artiestNaam').trim().escape(),
        req.checkBody('titel', 'Titel required').isLength({ min: 1 }).trim();
        req.checkBody('artiestNaam', 'Artiesten naam required').isLength({ min: 1 }).trim();
        
    //Kijken of liedje al in database zit zoja, aantal stemmen verhogen, anders, toevoegen aan database
 
    req.getValidationResult()
        .then(function(result) {
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    req.flash('error', error.msg);
                })
                res.redirect('/liedje');
            }
            else{
                Liedje.findOne({ titel: req.body.titel, artiestNaam: req.body.artiestNaam})
                    .exec( function(err, found_liedje) {
                        if (err) { return next(err); }
                        if (found_liedje) {
                            found_liedje.aantStemmen = found_liedje.aantStemmen + 1;
                            found_liedje.save(function (err) {
                                if (err) {
                                    req.flash('error', 'There was a problem with saving you song');
                                    res.redirect('/liedje');
                                    
                                    //return handleError(err);
                                } // saved!
                            });
                           res.redirect('/liedje/top_10')
                        }

                       else {
                            var liedje=new Liedje({
                            titel: req.body.titel,
                            artiestNaam: req.body.artiestNaam
                            });
                            liedje.save(function (err) {
                                if (err) {
                                    req.flash('error', 'There was a problem with saving you song');
                                    res.redirect('/liedje');
                                    //return handleError(err);
                                } // saved!
                             });
                            res.redirect('/liedje/top_10')
                        }
                    });
            }
        });
}
];

// Display Liedje delete form on GET.
exports.liedje_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje delete GET');
};

// Handle Liedje delete on POST.
exports.liedje_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje delete POST');
};

// Display Liedje update form on GET.
exports.liedje_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje update GET');
};

// Handle Liedje update on POST.
exports.liedje_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje update POST');
};