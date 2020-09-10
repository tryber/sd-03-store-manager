const express = require('express');
const rescue = require('express-rescue');
const saleService = require('../services/saleService');
const { json } = require('body-parser');

const app = express();

const createSale = app.post(
  '/sales',
  rescue(async (req, res) => {
    const sale = await saleService.createSale(req.body);

    if (sale.err) {
      const { code } = sale.err;
      return code === 'stock_problem' ? res.status(404).json(sale) : res.status(422).json(sale);
    }
    return res.status(200).json(sale);
  }),
);

const findSaleById = app.get(
  'sales/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const saleId = await saleService.findSaleById(id);
    if (saleId.err) return res.status(404).json(saleId);
    return res.status(200).json(saleId);
  }),
);

const findAllSale = app.get(
  '/sales',
  rescue(async (req, res) => {
    const sales = await saleService.findAllSales();
    return res.status(200).json({ sales: sales });
  }),
);

const updateSale = app.put(
  '/sales/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];
    const updateSale = await saleService.updateSale(id, productId, quantity);

    if (updateSale.err) return res.status(422).json(updateSale);
    res.status(200).json(updateSale);
  }),
);

const deleteSale = app.delete(
  '/sales/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const deleteSale = saleService.deleteSale(id);
    if (deleteSale.err) return res.status(422).json(deleteSale);
    return res.status(200).json(deleteSale);
  }),
);

module.exports = { createSale, findAllSale, findSaleById, updateSale, deleteSale };
