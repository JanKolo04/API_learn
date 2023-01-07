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

router.get('/', auth, async (req, res) => {
    const articles = await Articles.find();
    //object length
    const len_object = Object.keys(articles).length;
    return res.render(path.join(__dirname, '../page/article.ejs'), {article: articles, len_obj: len_object});

});

//find article by id
async function find_article_id(id_article) {
    //search article by _id
    const article = await Articles.findById({ _id: id_article });

    return article;
}

router.get('/:id', auth, async (req, res) => {
    // get id param
    const { id } = req.params;

    //if coudn't find article by id back into article page
    try {
        const article = await find_article_id(id);
        //return page with data
        return res.render(path.join(__dirname, '../page/single_article.ejs'), {article: article});
    }
    catch(error) {
        return res.redirect(302, '/article');
    }

});

module.exports = router;