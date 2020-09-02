const { Router } = require('express');
const { createSale } = require('../services/salesServices');
const { generateError } = require('./utils');

const sales = Router();

sales.route('/').post(async (req, res, next) => {
  try {
    const product = await createSale(req.body);

    if (product[0].message) throw new Error(product[0].message);

    return res.status(200).json(product);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
});

module.exports = sales;
