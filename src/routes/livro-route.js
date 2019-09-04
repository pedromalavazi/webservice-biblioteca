'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/livro-controller');

router.get('/', controller.getAll);

router.get('/:codigo', controller.getByCodigo);

router.get('/admin/:id', controller.getById);

router.get('/tags/:tag', controller.getByTag);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router;