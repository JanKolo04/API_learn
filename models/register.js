const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024
    },
    group: {
        type: String,
        required: true,
        default: "user"
    }
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(255).required().email(),
        password: Joi.string().min(1).max(255).required()
    };
    return schema;
}

exports.User = User;
exports.validate = validateUser;
