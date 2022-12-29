const session = require('express-session');
const express = require('express');
const app = express();

//set session options
app.use(session({
    secret: "user-data",
    saveUninitialized: false,
    resave: false,
    cookie: {secure: true}
}));