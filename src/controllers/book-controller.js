'use strict'

const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const ValidationContract = require('../validators/validator');
const repository = require('../repositories/book-repository')

exports.getAll = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Failed to process your request.'
        });
    }
    
}

exports.getByCode = async(req, res, next) => {
    try {
        var data = await repository.getByCode(req.params.code);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Failed to process your request.'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Failed to process your request.'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message:'Failed to process your request.'
        });
    }
}

exports.post = async(req, res, next) => {
    
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


    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Book registered.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Failed to register the book.'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Book updated.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Failed to update the book.'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Book removed.'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Failed to remove the book.'
        });
    }
};