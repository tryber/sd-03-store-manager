const { Router } = require('express');
const middlewares = require('../middlewares');

const sales = Router();

sales
  .route('/')
  .post(middlewares.registerSale)
  .get(middlewares.listSales);

sales
  .route('/:id')
  .get(middlewares.deleteReadSale())
  .put(middlewares.updateSale)
  .delete(middlewares.deleteReadSale('delete', 'invalid_data', 422));

module.exports = sales;
