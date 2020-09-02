const { Router } = require('express');
const { createSale, listSales } = require('../services/salesServices');
const { generateError } = require('./utils');

const sales = Router();

sales
  .route('/')
  .post(async (req, res, next) => {
    try {
      const sale = await createSale(req.body);

      const errorMessage = sale.message || null;

      if (errorMessage) throw new Error(errorMessage);

      return res.status(200).json(sale);
    } catch (error) {
      const err = generateError(422, error, 'invalid_data');
      return next(err);
    }
  })
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
