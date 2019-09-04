'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    },
    numero: {
        type: String,
        required: true
    },
    dataInicio: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataFinal: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['emprestado', 'devolvido'],
        default: 'emprestado'
    },
    livros: [{
        livro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Livro'
        }
    }],
});

module.exports = mongoose.model('Pedido', schema);