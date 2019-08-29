'use strict'

const mongoose = require('mongoose');
const Book = mongoose.model('Book');

exports.getAll = () => {
    return Book
        .find({ active: true },
        'code title author session gender tags'); 
}

exports.getByCode = (code) => {
    return Book.findOne({ 
        code: code,
        active: true
    }, 'code title author session gender tags');
}

exports.getById = (id) => {
    return Book.findById(id);
}

exports.getByTag = (tag) => {
    return Book.find({ 
        tags: tag,
        active: true
    }, 'code title author session gender tags');
}

exports.create = (data) => {
    var book = new Book(data);
    return book.save();
}

exports.update = (id, book) => {
    return Book
        .findByIdAndUpdate(id, {
            $set: {
                title: book.title,
                author: book.author,
                gender: book.gender,
                session: book.session,
                tags: book.tags
            }});    
}

exports.delete = (id) => {
    return Book.findByIdAndRemove(id);
}