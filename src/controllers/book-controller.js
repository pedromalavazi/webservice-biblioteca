'use strict'

const mongoose = require('mongoose');
const Book = mongoose.model('Book');

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
    const id = req.params.id;
    res.status(200).send({
        id: id, 
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};