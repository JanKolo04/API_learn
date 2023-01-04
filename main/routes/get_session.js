const session = require('express-session');
const express = require('express');
const { Articles } = require('../models/article');
const path = require('path'); 
const MongoStore = require('connect-mongodb-session')(session);
const router = express.Router();

const sessionStore = new MongoStore({url: "mongodb://localhost/api'"});


//middleware to check user auth
//
//move this into extension file, to auth.js
const auth = function(req, res, next) {
    if(!req.session.token) {
        return res.redirect(302, '/');
    }
    next();
};

router.get('/', auth, (req, res) => {
    /*
    sessionStore.get(req.sessionID, (err, sessions) => {
        if(err) {
            return console.log('error');
        }
        else {
            console.log(sessions);
        }
    });
    */  

    const sessionIds = [];

    // Iterate over all the sessions in the session store
    sessionStore.forEach((sessionId, sessionData, callback) => {
      // Add the session ID to the array
      sessionIds.push(sessionId);
      callback();
    }, () => {
      // Send the array of session IDs back to the client
      console.log(sessionIds);
    });

    return res.render(path.join(__dirname, '../page/sessions.ejs'));
});

module.exports = router;