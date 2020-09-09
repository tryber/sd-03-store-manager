const { Router } = require('express');
const resc = require('express-rescue');
const salesService = require('../services/SalesService');

const sales = Router();

sales.get(
  '/',
  resc(async (_req, res) => {
    const listedSales = await salesService.SalesList();
    return res.status(200).json(listedSales);
  }),
);

sales.post(
  '/',
  resc(async (req, res) => {
    const products = req.body;
    const sale = await salesService.saleCreate(products);
    if (sale.err && sale.err.code === 'stock_problem') {
      return res.status(404).json(sale);
    }
    if (sale.err) {
      return res.status(422).json(sale);
    }

    return res.status(200).json(sale);
  }),
);

sales.put(
  '/:id',
  resc(async (req, res) => {
    const products = req.body;
    const { id } = req.params;

    const SaleUpdate = await salesService.SaleUpdate(id, products);

    if (SaleUpdate.err) {
      return res.status(422).json(SaleUpdate);
    }

    return res.status(200).json(SaleUpdate);
  }),
);

module.exports = sales;
