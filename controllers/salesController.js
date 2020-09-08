const { Router } = require('express');
const rescue = require('express-rescue');
const { salesService } = require('../services');

const sales = Router();

sales.get(
  '/',
  rescue(async (_req, res) => {
    const returnedSales = await salesService.getAllSales();

    return res.status(200).json(returnedSales);
  }),
);

sales.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const returnedSale = await salesService.getSaleById(id);

    if (returnedSale.err) {
      return res.status(404).json(returnedSale);
    }

    return res.status(200).json(returnedSale);
  }),
);

sales.post(
  '/',
  rescue(async (req, res) => {
    const products = req.body;

    const createdSale = await salesService.createSale(products);

    if (createdSale.err && createdSale.err.code === 'stock_problem') {
      return res.status(404).json(createdSale);
    }

    if (createdSale.err) {
      return res.status(422).json(createdSale);
    }

    return res.status(200).json(createdSale);
  }),
);

sales.put(
  '/:id',
  rescue(async (req, res) => {
    const products = req.body;
    const { id } = req.params;

    const updatedSale = await salesService.updateSale(id, products);

    if (updatedSale.err) {
      return res.status(422).json(updatedSale);
    }

    return res.status(200).json(updatedSale);
  }),
);

sales.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const deletedSale = await salesService.deleteSale(id);

    if (deletedSale && deletedSale.err) {
      return res.status(422).json(deletedSale);
    }

    return res.status(200).json(deletedSale);
  }),
);

module.exports = sales;
