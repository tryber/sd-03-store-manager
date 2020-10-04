const { Router } = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const sales = Router();

sales.post('/', rescue(async (req, res, _next) => {
  const [...itensSold] = req.body;
  const postSale = await salesService.createSale(itensSold);
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
  if (getSale.err) {
    return res.status(404).json({ err: { code: 'not_found', message: getSale.message } });
  }
  if (getSale.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: getSale.message } });
  }
  return res.status(200).json(getSale);
});

sales.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const [...itensSold] = req.body;
  const upSale = await salesService.updateSale(id, itensSold);
  if (upSale.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: upSale.message } });
  }
  return res.status(200).json(upSale);
}));

sales.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const getSale = await salesService.getSaleById(id);
  if (getSale.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: getSale.message } });
  }
  await salesService.deleteSale(id);
  return res.status(200).end();
}));

module.exports = sales;
