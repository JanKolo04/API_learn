const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser'); 
const { User, validate } = require('../models/user');
const crypto = require('crypto');
const path = require('path'); 
const sizeof = require('object-sizeof');
const router = express.Router();

//middleware to check user auth
//
//move this into extension file, to auth.js
const auth = function(req, res, next) {
    if(!req.session.token) {
        return res.redirect(302, '/');
    }
    next();
};

router.get('/', auth, (req, res) => {
    const user = {
        "name": req.session.name, 
        "token": req.session.token
    };
    //object length
    const len_object = Object.keys(user).length;
    return res.render(path.join(__dirname, '../page/home.ejs'), {user: user, len_obj: len_object});
});

module.exports = router;