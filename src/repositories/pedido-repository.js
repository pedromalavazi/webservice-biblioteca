'use strict';
const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.getAll = async(data) => {
    var res = await Pedido
        .find({}, 'numero status aluno livros dataInicio dataFinal')
        .populate('aluno', 'nome')
        .populate('livros.livro', 'titulo');
    return res;
}

exports.create = async(data) => {
    var pedido = new Pedido(data);
    await pedido.save();
}

exports.update = async(id, data) => {
    await Pedido
        .findByIdAndUpdate(id, { 
            $set: {
                dataFinal: data
        }});
}