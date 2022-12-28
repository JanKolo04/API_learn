const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser'); 
const { User, validate } = require('../models/user');
const crypto = require('crypto');
const path = require('path'); 
const router = express.Router();


//parser from form
const urlencodedParser = bodyParser.urlencoded({ extended: false });


router.post('/', urlencodedParser, (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    (async() => {
        const user = await User.findOne({ email: req.body.email });
        if(user) {
            //check passwowrd
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result == true) {
                    //generate token
                    const token = crypto.randomBytes(28).toString('hex');
    
                    req.session.token = token;
                    req.session.name = user.name;
                    req.session.save();
    
                    return res.redirect(301, '/home');
                }
                else {
                    return res.send('Whats is wrong');
                }
            });
        }
        else {
            return res.send("User deosnt exist");
        }
    })();
});

module.exports = router;