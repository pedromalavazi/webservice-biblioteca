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
const Book = require('./models/book');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const bookRoute = require('./routes/book-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoute);
app.use('/books', bookRoute);

module.exports = app;
