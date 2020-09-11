const { Router } = require('express');

const salesController = require('../controller/salesControler');

const sales = Router();

sales.get('/', salesController.getAllSales);
sales.get('/:id', salesController.getSaleById);
sales.put('/:id', salesController.updateSale);
sales.delete('/:id', salesController.eraseSale);
sales.post('/', salesController.insertSale);

module.exports = sales;
