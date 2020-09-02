const { Router } = require('express');
const { createSale, listSales } = require('../services/salesServices');
const dataMiddleware = require('../middlewares/dataMiddleware');
const { generateError } = require('./utils');

const sales = Router();

sales
  .route('/')
  .post(dataMiddleware(createSale))
  .get(async (_req, res, next) => {
    try {
      const saleslist = await listSales();

      return res.status(200).json({ sales: saleslist });
    } catch (error) {
      const err = generateError(422, error, 'invalid_data');
      return next(err);
    }
  });

module.exports = sales;
