'use strict'

const mongoose = require('mongoose');
const Livro = mongoose.model('Livro');

exports.getAll = async() => {
    const res = await Livro.find(
        { 
            ativo: true 
        }, 
        'codigo titulo autor sessao genero'
    );    

    return res;
}

exports.getAllKeyValue = async() => {
    const res = await Livro.find(
        { 
            ativo: true 
        }, 
        'titulo'
    );    

    return res;
}

exports.getByCodigo = async(codigo) => {
    const res = await Livro.findOne(
        { 
            codigo: codigo,
            ativo: true
        },
        'codigo titulo autor sessao genero tags'
    );

    return res;
}

exports.getById = async(id) => {
    const res = await Livro.findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Livro.find(
        { 
            tags: tag,
            ativo: true
        }, 
        'codigo titulo autor sessao genero tags'
    );

    return res;
}

exports.create = async(data) => {
    var livro = new Livro(data);
    await livro.save();
}

exports.update = async(id, livro) => {
    await Livro
        .findByIdAndUpdate(id, { 
            $set: {
                titulo: livro.titulo,
                autor: livro.autor,
                genero: livro.genero,
                sessao: livro.sessao,
                tags: livro.tags
        }});
}

exports.delete = async(id) => {
    await Livro.findByIdAndRemove(id);
}