const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const insertSales = rescue(async (req, res, next) => {
  const sales = await salesService.insertSales(req.body);
  if (sales.error) {
    return next(sales);
  }
  res.status(200).json(sales);
});

const getAllSales = rescue(async (_req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json({ sales });
});

const getSalesById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sales = await salesService.getSalesById(id);
  if (sales.error) {
    return next(sales);
  }
  res.status(200).json({ sales });
});

const updateSales = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sales = await salesService.updateSales(id, req.body);
  if (sales.error) {
    return next(sales);
  }
  const { _id, itensSold } = sales;
  res.status(200).json({ _id, itensSold });
});

const deleteSales = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sales = await salesService.deleteSales(id);
  if (sales.error) {
    return next(sales);
  }
  res.status(200).json(sales);
});

module.exports = {
  insertSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
};
