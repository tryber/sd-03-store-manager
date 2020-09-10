const { Router } = require('express');

const salesController = require('../controller/salesControler');

const sales = Router();

sales.post('/', salesController.insertSale);

module.exports = sales;
