const { Router } = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const sales = Router();

sales.post('/', rescue(async (req, res, _next) => {
  const [{ productId, quantity }] = req.body;
  const postSale = await salesService.createSale(productId, quantity);
  if (postSale.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: postSale.message } });
  }
  return res.status(200).json(postSale);
}));

sales.get('/', async (_, res) => {
  const sale = await salesService.getAllSales();
  res.status(200).json(sale);
});

sales.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getSale = await salesService.getSaleById(id);
  if (getSale.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: getSale.message } });
  }
  return res.status(200).json(getSale);
});

module.exports = sales;
