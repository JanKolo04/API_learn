const jwt = require("jsonwebtoken");
const config = require('config');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); 
const { User, validate } = require('../test/models/user');
const crypto = require('crypto');
const ejs = require('ejs');
const path = require('path'); 
const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost/api')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


app.set('view engine', 'ejs');

//json parser
const jsonParser = bodyParser.json();
//parser from form
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//set session options
app.use(session({
    secret: "user-data",
    saveUninitialized: true,
    resave: false,
    cookie: {secure: true}
}));

app.get('/', (req, res) => {
    return res.render(path.join(__dirname, 'login.ejs'));
});


app.post('/login', urlencodedParser, (req, res) => {
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

app.get('/home', (req, res) => {
    return res.render(path.join(__dirname, 'home.ejs'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));