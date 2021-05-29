const mongoose = require('mongoose');
const bcrypt = require ('bcrypt')
const { Schema } = mongoose;

const User = new Schema({
    profilePhotoURL: {type: String},
    firstName: { type: String, required: true},
    surname1: { type: String, required: true},
    surname2: { type: String },  
    email: { 
        type: String,
        unique: true,
        trim: true,
        required: true 
    },
    password: { 
        type: String,
        trim: true,
        required: true
    },
    tel: { type: Number },
    address: {
        street: { type: String },
        doorNumber: { type: String },
        city: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    bikesForSell: [],
    bikesInterested: [],
    UserDateCreated: { type: Date, default: Date.now}
});

User.pre("save", function (next) {
    if (!this.isNew || !this.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;

            next();
        });
    });
});

module.exports = mongoose.model("Usuario", User);