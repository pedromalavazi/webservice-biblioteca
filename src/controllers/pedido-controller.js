'use strict'

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/pedido-repository');
const guid = require('guid');

var moment = require('moment');
moment.locale('pt-BR');

exports.getAll = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            aluno: req.body.aluno,
            numero: guid.raw().substring(0, 6),
            dataInicio: moment(),
            dataFinal: moment().add(7, 'd'),
            livros: req.body.livros
        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};