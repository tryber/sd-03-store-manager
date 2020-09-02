const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const createSale = rescue(async (req, res) => {
  const products = req.body;
  const createdSales = await salesService.createSale(products);
  if (createdSales.err) {
    return res.status(422).json(createdSales);
  }
  return res.status(200).json(createdSales);
});

const getAllSales = rescue(async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(200).json(sales);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  return res.status(200).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const products = req.body;
  const { id } = req.params;
  const updatedSale = await salesService.updateSale(id, products);
  if (updatedSale.err) {
    return res.status(422).json(updatedSale);
  }
  return res.status(200).json(updatedSale);
});

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};
