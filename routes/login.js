const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { validate } = require('../models/login');
const { User } = require("../models/register");
const express = require('express');
const { send } = require('process');
const cookieParser = require("cookie-parser");
const router = express.Router();
const app = express();

app.use(cookieParser());

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
            //save token in cookie
            res.cookie("token", token);
            return res.send("You are in!");
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
 
