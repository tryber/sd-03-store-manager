const { Router } = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const sales = Router();

sales.post('/', rescue(async (req, res, _next) => {
  const { productId, quantity } = req.body;
  const postSale = await salesService.createSale(productId, quantity);
  if (postSale.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: postSale.message } });
  }
  return res.status(201).json(postSale);
}));

module.exports = sales;
