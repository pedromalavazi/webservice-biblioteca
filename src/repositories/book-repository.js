'use strict'

const mongoose = require('mongoose');
const Book = mongoose.model('Book');

exports.getAll = async() => {
    const res = await Book.find(
        { 
            active: true 
        }, 
        'code title author session gender tags'
    );    

    return res;
}

exports.getByCode = async(code) => {
    const res = await Book.findOne(
        { 
            code: code,
            active: true 
        },
        'code title author session gender tags'
    );

    return res;
}

exports.getById = async(id) => {
    const res = await Book.findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Book.find(
        { 
            tags: tag,
            active: true
        }, 
        'code title author session gender tags'
    );

    return res;
}

exports.create = async(data) => {
    var book = new Book(data);
    await book.save();
}

exports.update = async(id, book) => {
    await Book
        .findByIdAndUpdate(id, { 
            $set: {
                title: book.title,
                author: book.author,
                gender: book.gender,
                session: book.session,
                tags: book.tags
        }});
}

exports.delete = async(id) => {
    await Book.findByIdAndRemove(id);
}