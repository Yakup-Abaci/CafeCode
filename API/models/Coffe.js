const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const CoffeSchema = new Schema({
    coffeName: {
        type: String,
        required: true,
        trim: true
    },
    coffeMail: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    coffePassword: { 
        type: String,
        required: true
    },
    coffeCreated: {
        type: Date,
        default: Date.now
    }
});

CoffeSchema.pre('save', function(next) {
    const coffe = this;
    if (!coffe.isModified('coffePassword')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(coffe.coffePassword, salt, function(err, hash) {
            if (err) return next(err);
            coffe.coffePassword = hash;
            next();
        });
    });
  });

const Coffe = mongoose.model('Coffe', CoffeSchema);
module.exports = Coffe;