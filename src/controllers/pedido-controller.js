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
            aluno: req.body.aluno,
            numero: guid.raw().substring(0, 6),
            dataInicio: moment(),
            dataFinal: moment(req.body.dataFinal, "DD/MM/YYYY"),
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

exports.put = async(req, res, next) => {
    //validação do request
    let contract = new ValidationContract();
    contract.isRequired(req.body.dataFinal, 'Data de devolução deve ser informada.');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        let dataFinal = moment(req.body.dataFinal, "DD/MM/YYYY");

        await repository.update(req.params.id, dataFinal);
        res.status(200).send({
            message: 'Livro alterado com sucesso.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao alterar o livro.'
        });
    }
};