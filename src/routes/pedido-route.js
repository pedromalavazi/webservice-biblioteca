'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedido-controller');

router.get('/', controller.getAll);

router.post('/', controller.post);

module.exports = router;