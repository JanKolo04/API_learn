const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser'); 
const { User, validate } = require('../models/user');
const crypto = require('crypto');
const path = require('path'); 
const router = express.Router();

router.get('/', (req, res) => {
    return res.send("Name: "+req.session.name);
    return res.render(path.join(__dirname, '../page/home.ejs'));
});

module.exports = router;