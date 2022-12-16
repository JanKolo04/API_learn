const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { validate } = require('../models/login');
const { User } = require("../models/register");
const express = require('express');
const { send } = require('process');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        //check password correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword) {
            //create token
            const token = jwt.sign({_id: user._id}, config.get("PrivateKey"));
            //save token in header and send data
            return res.header("token", token).send(_.pick(user, ['_id', 'email']));
        }
        else {
            return res.send("Wrong password!");
        }
    } 
    else {
        return res.status(400).send('This email doesnt exist!');
    }
});

module.exports = router;
 
