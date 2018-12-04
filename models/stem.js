var mongoose = require('mongoose');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
//Define a schema
var Schema = mongoose.Schema;

var Stem = new Schema({
    titel          : {
        type: String,
        required: true
    },
    artiestNaam    : {
        type: String, required: true
    },
    email    : {
        type: String,
        default: 1
    }
});

Stem
.virtual('url')
.get(function () {
  return '/homepage/stem/' + this._id;
});

module.exports = mongoose.model('Stem', Stem );