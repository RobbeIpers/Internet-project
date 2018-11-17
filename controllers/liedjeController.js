var Liedje = require('../models/liedje');
var async =require('async')


exports.index = function(req, res) {
    res.render('homepage',{title:'CHIRO'});
};
// Display list of top 10 Liedjes.
exports.liedje_list = function(req, res, next) {
  Liedje.find()
    .sort([['aantStemmen', 'ascending']])
    .exec(function (err, list_liedjes) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('liedje_form', { title: 'top 10', liedje_list: list_liedjes });
    });

};
// Display detail page for a specific Liedje.
exports.liedje_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje detail: ' + req.params.id);
};

// Display Liedje create form on GET.
exports.liedje_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje create GET');
};

// Handle Liedje create on POST.
exports.liedje_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Liedje create POST');
};

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