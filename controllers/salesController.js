const boom = require('@hapi/boom');
const { Router } = require('express');
const rescue = require('express-rescue');

const salesService = require('../services/salesService');

const sales = Router();

sales.get('/', rescue(async (_, res) => {
  const sale = await salesService.getAllSales();

  res.status(200).json(sale);
}));

sales.post('/', rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const sale = await salesService.createSale(name, quantity);

  if (sale.error) {
    return next(boom.badData(sale.message));
  }

  return res.status(201).json(sale);
}));

sales.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.getsaleById(id);

  if (sale.error) {
    return next(boom.notFound(sale.message));
  }

  return res.status(200).json(sale);
}));

sales.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  await salesService.deletesale(id);

  return res.status(204).end();
}));

sales.put('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const newsale = await salesService.updatesale(id, { name, quantity });

  if (newsale.error) {
    const error = newsale.code === 'not_found'
      ? boom.notFound(newsale.message)
      : boom.badData(newsale.message);

    return next(error);
  }

  return res.status(200).json(newsale);
}));

module.exports = sales;
