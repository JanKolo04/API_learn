const Joi = require('joi');
const mongoose = require('mongoose');

function validateUser(user) {
    const schema = {
        email: Joi.string().min(1).max(255).required().email(),
        password: Joi.string().min(1).max(255).required()
    };
    return schema;
}

exports.validate = validateUser;
