const express = require('express');
const controllers = require('../index');

const salesRouter = express.Router();

salesRouter
  .post('/', controllers.salesController.insertSale)
  .get('/', controllers.salesController.getAllSales)
  .get('/:id', controllers.salesController.getSalesById);

module.exports = {
  salesRouter,
};
