'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    dataFinal: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['emprestado', 'devolvido'],
        default: 'emprestado'
    },
    livro: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Pedido', schema);