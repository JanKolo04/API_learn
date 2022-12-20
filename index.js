const config = require("config");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const session = require("express-session");
const app = express();

//all pages
const register = require('./routes/register');
const login = require('./routes/login');
const users = require("./routes/users");

if(!config.get("PrivateKey")) {
    console.error("PrivateKey is not defined");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/testy')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


app.use(express.json());
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/users', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
 
 
