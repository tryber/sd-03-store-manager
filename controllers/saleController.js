const rescue = require('express-rescue');
const saleService = require('../services/saleService');

const createSale = rescue(async (req, res) => {
  const sale = await saleService.createSale(req.body);

  if (sale.err) {
    const { code } = sale.err;
    return code === 'stock_problem' ? res.status(404).json(sale) : res.status(422).json(sale);
  }
  return res.status(200).json(sale);
});

const findSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const saleId = await saleService.findSaleById(id);
  if (!saleId) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  return res.status(200).json(saleId);
});

const findAllSale = rescue(async (req, res) => {
  const sales = await saleService.findAllSales();
  return res.status(200).json({ sales });
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const updateSales = await saleService.updateSale(id, productId, quantity);

  if (updateSales.err) return res.status(422).json(updateSales);
  res.status(200).json(updateSales);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const deleteSales = await saleService.deleteSale(id);
  if (deleteSales.err) return res.status(422).json(deleteSales);
  return res.status(200).json(deleteSales);
});

module.exports = { createSale, findAllSale, findSaleById, updateSale, deleteSale };
