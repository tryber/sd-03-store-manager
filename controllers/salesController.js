const rescue = require('express-rescue');
const { salesService } = require('../services');

const createSale = rescue(async (req, res) => {
  const products = req.body;

  const createdSale = await salesService.createSale(products);

  if (createdSale.err && createdSale.err.code === 'stock_problem') {
    return res.status(404).json(createdSale);
  }

  if (createdSale.err) {
    return res.status(422).json(createdSale);
  }

  return res.status(200).json(createdSale);
});

const getAllSales = rescue(async (_req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(200).json(sales);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getSaleById(id);

  if (sale.err) {
    return res.status(404).json(sale);
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

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await salesService.deleteSale(id);

  if (deletedSale && deletedSale.err) {
    return res.status(422).json(deletedSale);
  }

  return res.status(200).json(deletedSale);
});

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
