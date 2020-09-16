const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const invalidSaleError = { err: {
  code: 'invalid_data',
  message: 'Wrong sale ID format',
} };

const saleService = require('../service/saleService');

const insertSale = rescue(async (req, res) => {
  const insertedSales = await saleService.addSales(req.body);

  return insertedSales.err ?
  res.status(422).json(insertedSales) :
  res.status(200).json(insertedSales);
});

const getAllSales = rescue(async (_req, res) => {
  const sales = await saleService.selectAll();
  res.status(200).json({ sales });
});

const getSaleById = rescue(async (req, res) => {
  const sale = await saleService.selectOne(req.params.id);
  res.status(200).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await saleService.updateSale(id, req.body);
  return result.err ?
  res.status(422).json(result) :
  res.status(200).json(result);
});

const eraseSale = rescue(async (req, res) => {
  const delSale = await saleService.deleteOne(req.params.id);

  return delSale ?
  res.status(200).json(delSale) :
  res.status(422).json(invalidSaleError);
});

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  updateSale,
  eraseSale,
};
