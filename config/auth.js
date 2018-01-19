const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
    let token = req.body.token || req.query.token || req.get('Authorization')
    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, SECRET, function(err, decoded) {
            if (!err) {
                req.user = decoded.user;
                next();
            }
        });
    } else {
        next();
    }
}