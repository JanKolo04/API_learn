const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require("../models/register");
const express = require('express');
const session = require("express-session");
const { send, nextTick } = require('process');
const { appendFile } = require("fs");

const router = express.Router();

router.post('/', async (req, res) => {
    //check exixsting of token cookie
    if(!req.cookies['token'] || req.cookies['token'] == "") {
        return res.send("You are not autorizated!");
    }
    else if(!req.cookies['group'] || req.cookies['group'] != "admin") {
        return res.send("You are not in admin group!");
    }
 
    //find all users
    const users = await User.find({});

    //append every user into array
    let users_map = {};
    (await users).forEach(function(user) {
        users_map[user._id] = user;
    });

    //send array with users
    res.send(users_map);

});

router.get('/:id', async (req, res) => {
    //check exixsting of token cookie
    if(!req.cookies['token']) {
        return res.send("You are not autorizated!");
    }

    //get parameters from url
    const params = req.params;
    //find all users
    const user_one = await User.findOne({_id: params.id});

    res.send(user_one);

});

module.exports = router;
 
