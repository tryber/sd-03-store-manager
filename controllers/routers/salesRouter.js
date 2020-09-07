const express = require('express');
const controllers = require('../index');

const salesRouter = express.Router();

salesRouter
  .post('/', controllers.salesController.insertSale)
  .get('/:id', controllers.salesController.getSalesById)
  .get('/', controllers.salesController.getAllSales)
  .put('/:id', controllers.salesController.updateSale)
  .delete('/:id', controllers.salesController.deleteSale);

module.exports = {
  salesRouter,
};
