'use strict';
const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.getAll = async (data) => {
    var res = await Pedido
        .find({}, 'dataFinal livro')
    return res;
}

exports.create = async (data) => {
    var pedido = new Pedido(data);
    await pedido.save();
}

exports.update = async (id, dataDevolucao, livro) => {
    await Pedido
        .findByIdAndUpdate(id, {
            $set: {
                dataFinal: dataDevolucao,
                livro: livro
            }
        });
}