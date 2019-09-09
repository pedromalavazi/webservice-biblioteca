'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conecta no banco
mongoose.connect('mongodb+srv://pedro:pedro123@ndstr-cyplu.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true} );
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Carrega os Models
const livro = require('./models/livro');
const aluno = require('./models/aluno');
const pedido = require('./models/pedido');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const livroRoute = require('./routes/livro-route');
const alunoRoute = require('./routes/aluno-route');
const pedidoRoute = require('./routes/pedido-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/livro', livroRoute);
app.use('/aluno', alunoRoute);
app.use('/pedido', pedidoRoute);

module.exports = app;
