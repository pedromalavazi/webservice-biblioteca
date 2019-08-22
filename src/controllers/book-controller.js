'use strict'

const mongoose = require('mongoose');
const Book = mongoose.model('Book');


exports.getAll = (req, res, next) => {
    Book.find({ active: true }, 'code title author session gender tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByCode = (req, res, next) => {
    Book.findOne({ 
        code: req.params.code,
        active: true
    }, 'code title author session gender tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
    Book.findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) => {
    Book.find({ 
        tags: req.params.tag,
        active: true
    }, 'code title author session gender tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
    var book = new Book(req.body);
    book.save()
        .then(res => {
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
    const id = req.params.id;
    res.status(200).send({
        id: id, 
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};