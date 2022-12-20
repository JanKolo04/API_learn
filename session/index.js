const session = require("express-session");

//create session
exports.session_var = (session({
    secret: "user-data",
    saveUninitialized: false,
    resave: true,
    cookie: {secure: true}
}));