'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    codigo: {
        type: String,
        trim: true,
        index: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    autor: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});


module.exports = mongoose.model('Livro', schema);