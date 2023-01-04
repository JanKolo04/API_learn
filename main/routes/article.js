const session = require('express-session');
const express = require('express');
const { Articles } = require('../models/article');
const path = require('path'); 
const router = express.Router();

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
    (async() => {
        const aritcles = await Articles.find();
        //object length
        const len_object = Object.keys(aritcles).length;
        return res.render(path.join(__dirname, '../page/article.ejs'), {article: aritcles, len_obj: len_object});
    })();

});

module.exports = router;