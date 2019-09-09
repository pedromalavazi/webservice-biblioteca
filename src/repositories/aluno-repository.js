'use strict'

const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');

exports.create = async(data) => {
    var aluno = new Aluno(data);
    await aluno.save();
}

exports.delete = async(id) => {
    await Aluno.findByIdAndRemove(id);
}