var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {type: String, required: true, max: 100},
    password: {type: Number, required: true},
});

module.exports = mongoose.model('User', userSchema);