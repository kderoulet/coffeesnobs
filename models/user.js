const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

let userSchema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true, unique: true},
    password: String
})

userSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    }
})

userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
})

userSchema.methods.comparePassword = function(tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
        cb(null, isMatch);
    })
}

module.exports = mongoose.model("User", userSchema)