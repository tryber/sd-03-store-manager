const { Router } = require('express');
const middleware = require('../middlewares');

const sales = Router();

sales
  .route('/')
  .post(middleware.registerSale)
  .get(middleware.listSales);

sales
  .route('/:id')
  .get(middleware.deleteReadSale())
  .put(middleware.updateSale)
  .delete(middleware.deleteReadSale('delete', 'invalid_data', 422));

module.exports = sales;
