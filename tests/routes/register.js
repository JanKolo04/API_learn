const { User, validate } = require('../models/register');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } 
    else {
        //insert the new user if they do not exist yet
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        //hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        //send data of new user into db
        await user.save();
        res.send(user);
    }
});

module.exports = router;
 
