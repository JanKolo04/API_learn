const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require("../models/register");
const express = require('express');
const { send } = require('process');
const router = express.Router();

router.post('/:id', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    else if(!req.session.token) {
        return res.send("You are not authorizated!");
    }
    else if(!req.session.group || req.session.group != "admin") {
        return res.send("You are not in admin group!");
    }

    //get params
    const params = req.params;

    //hash password
    const salt = await bcrypt.genSalt(10);
    let password_hash = await bcrypt.hash(req.body.password, salt);

    //find user and set new data
    const user = User.findOneAndUpdate({ _id: params.id }, {$set: {name: req.body.name, email: req.body.email, password: password_hash}},
        {new: true}, (err, data) => {
            if(data == null) {
                return res.send("User doesn't exist with this _id");
            }
            else {
                return res.send(data);
            }
        }
    );

});

module.exports = router;
 
