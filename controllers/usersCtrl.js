let User = require('../models/user');
let jwt = require('jsonwebtoken');
let SECRET = process.env.SECRET;

function signup(req, res) {
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.json({token: createJWT(user)});
    })
}

function login(req, res) {
    User.findOne({email: req.body.email}).exec().then(user => {
        if (!user) return res.status(401).json({err: "bad credentials"})
        user.comparePassword(req.body.pw, (err, isMatch) => {
            if (isMatch) {
                let token = createJWT(user);
                res.json({token: createJWT(user)})
            } else {
                return res.status(401).json({err: "bad credentials"})
            }
        });
    }).catch(err => res.status(401).json(err));
}

function createJWT(user) {
    return jwt.sign(
        {user},
        SECRET,
        {expiresIn: '24'}
    );
}

module.exports = {
    signup,
    login
}