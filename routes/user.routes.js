const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { env: {JWT_SECRET }} = process
const checkToken = require("../middleware")

const User = require("../models/user.js")

router.get('/', async (req, res) => {
    const users = await User.find();
    console.log(users);
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(User);
});

router.post('/', async (req, res) => {
    const { profilePhotoURL, firstName, surname1, surname2 , email, password, tel, address, street, doornumber, city, postalCode, country, bikesForSell, bikesInterested } = req.body;
    
    if(!email || !password) {
        return res.status(403).send({
            succes: false,
            message: "Enter all credentials."
        })
    }

    const foundUser = await User.findOne({email});

    if(foundUser) {
        return res.status(403).send({
            succes: false,
            message: "This email is already in use."
        })
    }

    if (password.length < 6) {
        return res.status(403).send({
            succes: false,
            message: "Password too short (min. 6)."
        })
    }
    
    const user = new User({profilePhotoURL, firstName, surname1, surname2 , email, password, tel, address, street, doornumber, city, postalCode, country, bikesForSell, bikesInterested});
    await user.save();
    res.json({status: 'Usuario creado'});
})

router.put('/:id', checkToken, async (req, res) => {
    const { profilePhotoURL, firstName, surname1, surname2 , email, password, tel, address, street, doornumber, city, postalCode, country, bikesForSell, bikesInterested } = req.body;
    const user = {profilePhotoURL, firstName, surname1, surname2 , email, password, tel, address, street, doornumber, city, postalCode, country, bikesForSell, bikesInterested};
    await User.findByIdAndUpdate(req.params.id, user);
    res.json({status: 'Usuario actualizado'})
});

router.delete('/:id', checkToken, async (req, res) => {
    
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'Usuario eliminado'})
})

router.post ("/login", async (req, res) => {
    const { profilePhotoURL, firstName, surname1, surname2 , email, password, tel, address, street, doornumber, city, postalCode, country, bikesForSell, bikesInterested } = req.body;

    if(!email || !password) {
        return res.status(403).send({
            succes: false,
            message: "Enter all credentials."
        })
    }

    const foundUser = await User.findOne({email});

    if(!foundUser) {
        return res.status(404).send({
            succes: false,
            message: "Wrong credentials (email)."
        })
    }
    
    const match = await bcrypt.compare(password, foundUser.password);

    if(!match) {
        return res.status(403).send({
            succes: false,
            message: "Wrong credentials (pass)."
        })
    }

    const token = jwt.sign({id: foundUser._id}, JWT_SECRET, {expiresIn: "24h"})

    return res.send({
        success: true,
        token
    })
})

module.exports = router;