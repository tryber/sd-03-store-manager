const { Router } = require('express');
const routes = require('../routes');

const sales = Router();

sales
  .route('/')
  .post(routes.registerSale)
  .get(routes.listSales);

sales
  .route('/:id')
  .get(routes.deleteReadSale('read'))
  .put(routes.updateSale)
  .delete(routes.deleteReadSale('delete', 'invalid_data', 422));

module.exports = sales;
