#! /usr/bin/env node

console.log('This script populates some liedjes to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')

var Liedje = require('./models/liedje')
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
var mongoose = require('mongoose');
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
var liedjes=[];

function Liedjecreate(titel, artiestNaam, cb) {
  var liedje = new Liedje({ titel: titel,artiestNaam:artiestNaam });
  liedje.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Liedje: ' + titel  );
    liedjes.push(Liedje)
  }   );
}
function createLiedje(cb){
    async.parallel([
        function(callback){
            Liedjecreate("baby","justin bieber",callback);
        },
        
        function(callback){
            Liedjecreate("Wie heeft er suiker bij de erwtensoep gedaan","Louis Bandy",callback);
        },
    ],
    cb);   
}
async.series([
    createLiedje
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+bookinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

