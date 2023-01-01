const bcrypt = require('bcrypt');
const express = require('express');
const { User, validateRegister } = require('../models/user');
const _ = require('lodash');
const path = require('path'); 
const bodyParser = require('body-parser'); 
const router = express.Router();

//parser from form
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
    return res.render(path.join(__dirname, '../page/register.ejs'));
});

router.post('/', urlencodedParser, (req, res) => {
    const { error } = validateRegister(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    (async() => {
        //check if user exist in db
        const user = await User.findOne({ email: req.body.email });
        //if user deosn't exist do....
        if(!user) {
            //check password corectly
            if(req.body.password == req.body.repeat_password) {
                //create new object with user
                const new_user = new User(_.pick(req.body, ['name', 'email', 'password']));
                //hash password
                new_user.password = await bcrypt.hash(req.body.password, 10);
                //save user into db
                await new_user.save();

                return res.send('User was created');
            }
            else {
                return res.send('Passwords is not same');
            }
        }
        else {
            return res.send('User exist with this email');
        }
    })();
});

module.exports = router;