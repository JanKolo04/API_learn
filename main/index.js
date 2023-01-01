const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path'); 

//routes
const login = require('./routes/login');
const home = require('./routes/home');
const register = require('./routes/register');

mongoose.connect('mongodb://localhost/api')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


app.set('view engine', 'ejs');

//json parser
//const jsonParser = bodyParser.json();

app.use(cookieParser());
//set session options
app.use(session({
    secret: "user-data",
    saveUninitialized: true,
    resave: true
}));


app.get('/', (req, res) => {
    return res.render(path.join(__dirname, './page/login.ejs'));
});


app.use('/login', login);
app.use('/home', home);
app.use('/register', register);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));