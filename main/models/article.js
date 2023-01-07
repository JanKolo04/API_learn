const Joi = require('joi');
const mongoose = require('mongoose');

const Articles = mongoose.model('articles', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024,
    },
    category: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    date: {
        type: Date,
        default: new Date
    }
}));

exports.Articles = Articles;