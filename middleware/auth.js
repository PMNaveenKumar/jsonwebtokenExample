const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKEY  = fs.readFileSync('./config/public.key', 'utf8');
const privateKEY  = fs.readFileSync('./config/private.key', 'utf8');

module.exports = function(req, res, next) {
	console.log("this is auth header --> " + req.headers['x-access-token']);
    if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('x-access-token') ) {
        try {
			var userDecoded = jwt.verify(req.headers['x-access-token'], privateKEY);
			console.log("this is verified and user --> " + JSON.stringify(userDecoded));
			next();
			
        } catch(err) {
            return res.status(401).send({
                error: {
                    msg: 'Failed to authenticate token!'
                }
            });
        }
    } else {
        return res.status(401).send({
            error: {
                msg: 'No token!'
            }
        });
    }
    //next();
    return;
};