const { Router } = require('express');
const rescue = require('express-rescue');
const { salesService } = require('../services');

const sales = Router();

sales.get(
  '/',
  rescue(async (_req, res) => {
    const sales = await salesService.getAllSales();

    return res.status(200).json(sales);
  }),
);

sales.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getSaleById(id);

    if (sale.err) {
      return res.status(404).json(sale);
    }

    return res.status(200).json(sale);
  }),
);

sales.post(
  '/',
  rescue(async (req, res) => {
    const products = req.body;

    const createdSale = await salesService.createSale(products);

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

    return res.status(200).end();
  }),
);

module.exports = sales;
