const { Router } = require('express');
const middlewares = require('../middlewares');

const sales = Router();

sales
  .route('/')
  .post(middlewares.registerSale)
  .get(middlewares.listSales);

module.exports = sales;
