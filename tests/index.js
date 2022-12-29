const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser'); 
const { User, validate } = require('./models/user');
const crypto = require('crypto');
const path = require('path'); 
const { nextTick } = require('process');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

//routes
const login = require('./routes/login');
const home = require('./routes/home');


mongoose.connect('mongodb://localhost/api')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


//set session options
app.use(session({
    secret: "user-data",
    saveUninitialized: false,
    resave: false,
    cookie: {secure: true, sameSite: true}
}));

app.set('view engine', 'ejs');


//json parser
//const jsonParser = bodyParser.json();


app.get('/', (req, res) => {
    req.session.userId = "admin";
    return res.render(path.join(__dirname, './page/login.ejs'));
});

//parser from form
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.post('/login', urlencodedParser, (req, res, next) => {
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
    
                    req.session.userID = user.name;
                    console.log(req.session.userID);

                    return res.redirect('/home');
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

app.use((req, res, next) => {
    const { userID } = req.session;
    if(userID) {
        res.locals.user = User.find(user => user._id == userID);
        next();
    }
    next();
});

app.get('/home', (req, res) => {
    if(!req.session.userId) {
        return res.send('You are not authorizated');
    }
    else {
        return res.send("HI "+res.locals.user.name);
    }

    return res.render(path.join(__dirname, '../page/home.ejs'));
});



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));