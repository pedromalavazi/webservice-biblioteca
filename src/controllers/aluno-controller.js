'use strict'

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/aluno.repository');

exports.post = async(req, res, next) => {

    //validação do request
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.ra, 8, 'RA deve ter pelo menos 8 caracteres');
    contract.hasMinLen(req.body.nome, 5, 'Nome deve ter pelo menos 5 caracteres');
    contract.hasMinLen(req.body.curso, 5, 'Curso deve ter pelo menos 5 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Aluno registrado com sucesso.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao registrar o aluno.'
        });
    }
};


