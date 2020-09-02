const { Router } = require('express');
const { createSale, listSales } = require('../services/salesServices');
const dataMiddleware = require('../middlewares/dataMiddleware');

const sales = Router();

sales
  .route('/')
  .post(dataMiddleware(createSale))
  .get(dataMiddleware(listSales, false));

module.exports = sales;
