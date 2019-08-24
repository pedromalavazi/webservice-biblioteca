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
    Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            gender: req.body.gender,
            session: req.body.session,
            tags: req.body.tags
        }}).then(x => {
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
    res.status(200).send(req.body);
};