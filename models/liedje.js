var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var LiedjeSchema = new Schema(
        {
            artiestenNaam: {type: String, required: true, max: 100},
            titel: {type: String, required: true, max: 100},
            aantStemmen: {type: number, required: true}
        }
    );

// Virtual for artietenNaam
LiedjeSchema
    .virtual('artiestenNaam')
    .get(function () {
        return this.artiesstenNaam;
    });

// Virtual for titel
LiedjeSchema
    .virtual('titel')
    .get(function () {
        return this.titel;
    });

// Virtual for aantStemmen
LiedjeSchema
    .virtual('aantStemmen')
    .get(function () {
        return this.aantStemmen;
    });


// Virtual for author's URL
LiedjeSchema
    .virtual('url')
    .get(function () {
        return '/liedje/' + this._id;
    });

//Export model
module.exports = mongoose.model('Liedje', LiedjeSchema);