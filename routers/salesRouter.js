const { Router } = require('express');
const rescue = require('express-rescue');

const { salesController } = require('../controllers');

const sales = Router();

sales.get('/', rescue(salesController.getAllSales));

sales.post('/', rescue(salesController.createSale));

sales.get('/:id', rescue(salesController.getSaleById));

sales.put('/:id', rescue(salesController.updateSale));

sales.delete('/:id', rescue(salesController.deleteSale));

module.exports = sales;
