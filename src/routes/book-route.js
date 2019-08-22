'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/book-controller');

router.get('/', controller.getAll);

router.get('/:code', controller.getByCode);

router.get('/admin/:id', controller.getById);

router.get('/tags/:tag', controller.getByTag);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router;