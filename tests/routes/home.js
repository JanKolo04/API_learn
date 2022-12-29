const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser'); 
const { User, validate } = require('../models/user');
const crypto = require('crypto');
const path = require('path'); 
const router = express.Router();

router.get('/', (req, res) => {
    if(!res.locals.token) {
        console.log(res.locals.token);
        return res.send('You are not authorizated');
    }
    else {
        return res.send("HI "+res.locals.user.name);
    }

    return res.render(path.join(__dirname, '../page/home.ejs'));
});


module.exports = router;