var User = require('../models/models');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKEY  = fs.readFileSync('./config/private.key', 'utf8');
const publicKEY  = fs.readFileSync('./config/public.key', 'utf8');
var auth = require('../middleware/auth.js');

exports.user_create = function(req, res, next) {
	var user = new User({
		name: req.body.name,
        password: req.body.password
	});
	
	user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully');
    });
}

exports.user_login = function(req, res, next) {
	var user = {
		name: req.body.name,
        password: req.body.password
	};
	User.find(user, function(err, user) 
	{
		if (err)
		{
			res.send(err);
		}
		console.log(user[0]._id);
		var token = jwt.sign({userId: user[0]._id}, privateKEY);
		var responJson = {username: user[0].name, password: user[0].password, authToken: token}
		res.json(responJson);
	});
}

exports.authenticate = function(req, res, next) {
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	
	jwt.verify(token, privateKEY, function(err, decoded) {
	  if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
	  
	  res.status(200).send(decoded);
	});
}

exports.show_users = function(req, res) {
	User.find({}, function(err, users){
		var userMap = {};

		users.forEach(function(user) {
			userMap[user._id] = user;
		});

		res.status(200).send(users);
		
	})
};