const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require("../models/register");
const express = require('express');
const { send } = require('process');
const session = require("express-session");
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The Request
    /*
    if(!session.token) {
        return res.send("You are not authorized!");
    }
    else if(!session.group || session.group != "admin") {
        return res.send("You are not in admin group");
    }
    */

    
});

module.exports = router;
 
