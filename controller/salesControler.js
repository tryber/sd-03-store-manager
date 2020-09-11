const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const invalidSaleError = { err: {
  code: 'invalid_data',
  message: 'Wrong sale ID format',
} };

const saleService = require('../service/saleService');

const insertSale = rescue(async (req, res) => {
  const insertedSales = await saleService.checkSales(req.body);
  insertedSales.error
  ? res.status(422).json({ message: insertedSales.message })
  : res.status(201).json(insertedSales);
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
  const { productId, quantity } = req.body;
  const result = await saleService.upsertSale(id, { productId, quantity });

  result.err ?
  res.status(422).json({ message: result.err }) :
  res.status(200).json(result);
});

const eraseSale = rescue(async (req, res) => {
  const delSale = await saleService.deleteOne(req.params.id);
  delSale
  ? res.status(200).json(delSale)
  : res.status(422).json({ invalidSaleError });
});

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  updateSale,
  eraseSale,
};
