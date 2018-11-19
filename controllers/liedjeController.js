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
    .sort([['aantStemmen', 'ascending']])
    .exec(function (err, list_liedjes) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('top_10', { title: 'top 10', liedje_list: list_liedjes });
    });

};

// Display detail page for a specific Liedje.
exports.liedje_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje detail: ' + req.params.id);
};

// Display Liedje create form on GET.
exports.liedje_create_get = function(req, res) {
    res.render('liedje_form', { title: 'STEMPLAATS' });
};

// Handle Liedje create on POST.
exports.liedje_create_post =[
body('titel', 'Titel required').isLength({ min: 1 }).trim(),
body('artiestNaam', 'Artiesten naam required').isLength({ min: 1 }).trim(),
sanitizeBody('titel').trim().escape(),
sanitizeBody('artiestNaam').trim().escape(),
(req,res,next)=>{
    const errors=validationResult(req);
    var liedje=new Liedje({
        titel: req.body.titel,
        artiestNaam: req.body.artiestNaam
    });
    if(!errors.isEmpty()){
        res.render('liedje_form',{title: 'STEMMINGSPLAATS',errors:errors.array()});
        return;
    }
    else
    {
           Liedje.findOne({ 'titel': req.body.titel })
                .exec( function(err, found_liedje) {
                     if (err) { return next(err); }

                     if (found_liedje) {
                         const test= found_liedje.aantStemmen+1;
                         found_liedje.update({$set:{aantStemmen: test}});
                            if(err){return next(err);}
                         res.redirect('/liedje/top_10')
                     }
                     else {

                         liedje.save(function (err) {
                           if (err) { return next(err); }
                           res.redirect('/liedje/top_10');
                         });

                     }

                 });
        }
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