'use strict'

const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const ValidationContract = require('../validators/validator');
const repository = require('../repositories/book-repository')

exports.getAll = (req, res, next) => {
    repository
        .getAll()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByCode = (req, res, next) => {
    repository
        .getByCode(req.params.code)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
    
    //validação do request
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'Title must be at least 3 characters');
    contract.hasMinLen(req.body.author, 5, 'Author must be at least 5 characters');
    contract.hasMinLen(req.body.gender, 3, 'Gender must be at least 3 characters');
    contract.hasMinLen(req.body.session, 1, 'Session must be at least 1 character');
    
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({
                message: 'Book registered.'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Failed to register the book.',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                message: 'Book updated.'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Failed to update the book.',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Book removed.'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Failed to remove the book.',
                data: e
            });
        });
};