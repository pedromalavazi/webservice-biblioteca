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
    nome: {
        type: String,
        trim: false,
        required: true
    },
    curso: {
        type: String,
        trim: false,
        required: true
    },
    email: {
        type: String,
        trim: false,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});


module.exports = mongoose.model('Aluno', schema);