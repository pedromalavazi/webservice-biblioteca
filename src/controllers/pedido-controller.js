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

    //validação do request
    let contract = new ValidationContract();
    contract.isRequired(req.body.dataFinal, 'Data de devolução deve ser informada.');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            dataFinal: req.body.dataFinal,
            livro: req.body.livro
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

exports.put = async(req, res, next) => {
    //validação do request
    let contract = new ValidationContract();
    contract.isRequired(req.body.dataFinal, 'Data de devolução deve ser informada.');

    if(!contract.isValid()) {
        res.status(400).send(req.body).end();
        return;
    }

    try {
        await repository.update(req.body.id, req.body.dataFinal, req.body.livro);
        res.status(200).send({
            message: 'Livro alterado com sucesso.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao alterar o livro.'
        });
    }
};