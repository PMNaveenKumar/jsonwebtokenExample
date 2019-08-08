var express = require('express');
var controller = require('../controller/controller.js')
var router = express.Router();
var auth = require('../middleware/auth.js');

/* GET users listing. */
router.post('/register', controller.user_create);

router.post('/login', controller.user_login);

router.get('/users', auth, controller.show_users);

router.get('/authUser', controller.authenticate);

module.exports = router;
