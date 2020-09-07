const { Router } = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const sale = Router();

sale.post(
  '/',
  rescue(async (req, res) => {
    const products = req.body;
    const createdSales = await salesService.createSale(products);
    if (createdSales.err && createdSales.err.code === 'invalid_data') {
      return res.status(422).json(createdSales);
    }
    if (createdSales.err) {
      return res.status(404).json(createdSales);
    }
    return res.status(200).json(createdSales);
  }),
);

sale.get(
  '/',
  rescue(async (_req, res) => {
    const returnedSales = await salesService.getAllSales();
    return res.status(200).json(returnedSales);
  }),
);

sale.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const Returnedsale = await salesService.getSaleById(id);

    if (Returnedsale && Returnedsale.err) {
      return res.status(404).json(Returnedsale);
    }
    return res.status(200).json(Returnedsale);
  }),
);

sale.put(
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

sale.delete(
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

module.exports = sale;
