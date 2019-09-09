'use strict'

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/livro-repository');

exports.getAll = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Falha ao processar sua requisição.'
        });
    }
    
}

exports.getAllKeyValue = async(req, res, next) => {
    try {
        var data = await repository.getAllKeyValue();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Falha ao processar sua requisição.'
        });
    }
    
}

exports.getByCodigo = async(req, res, next) => {
    try {
        var data = await repository.getByCodigo(req.params.codigo);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Falha ao processar sua requisição.'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Falha ao processar sua requisição.'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Falha ao processar sua requisição.'
        });
    }
}

exports.post = async(req, res, next) => {
    
    //validação do request
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.titulo, 3, 'Título deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.autor, 5, 'Autor deve ter pelo menos 5 caracteres');
    contract.hasMinLen(req.body.genero, 3, 'Gênero deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.sessao, 1, 'Sessão deve ter pelo menos 1 caracteres');
    
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Livro registrado com sucesso.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao registrar o livro.'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Livro alterado com sucesso.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao alterar o livro.'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Livro removido com sucesso.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao remover o livro.'
        });
    }
};