var mongoose = require('mongoose');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
//Define a schema
var Schema = mongoose.Schema;

var Liedje = new Schema({
    titel          : {
        type: String,
        required: true
    },
    artiestNaam    : {
        type: String, required: true
    },
    aantStemmen    : {
        type: Number,
        default: 1
    }
});

Liedje
.virtual('url')
.get(function () {
  return '/homepage/liedje/' + this._id;
});

module.exports = mongoose.model('Liedje', Liedje );