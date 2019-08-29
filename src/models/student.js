'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ra: {
        type: Number,
        trim: true,
        required: true,
        index: true
    },
    name: {
        type: String,
        trim: false,
        required: true
    },
    course: {
        type: String,
        trim: false,
        required: true
    },
    email: {
        type: String,
        trim: false,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});


module.exports = mongoose.model('Student', schema);