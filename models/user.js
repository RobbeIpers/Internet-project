var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String,
		index:true,
        required:true
	},
	password: {
		type: String,
        required:true
	},
	email: {
		type: String,
        required:true
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

