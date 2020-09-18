const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const saleService = require('../service/saleService');

const insertSale = rescue(async (req, res) => {
  const insertedSales = await saleService.addSales(req.body);

  return insertedSales.err ?
  res.status(insertedSales.err.id).json(insertedSales) :
  res.status(200).json(insertedSales);
});

const getAllSales = rescue(async (_req, res) => {
  const sales = await saleService.selectAll();
  res.status(200).json({ sales });
});

const getSaleById = rescue(async (req, res) => {
  const request = await saleService.selectOne(req.params.id);

  return request.err ?
  res.status(request.err.id).json(request) :
  res.status(200).json(request);
});

const updateSale = rescue(async (req, res) => {
  const updatedSales = await saleService.updateSale(req.params.id, req.body);

  return updatedSales.err ?
  res.status(updatedSales.err.id).json(updatedSales) :
  res.status(200).json(updatedSales);
});

const eraseSale = rescue(async (req, res) => {
  const delSale = await saleService.deleteOne(req.params.id);

  return delSale.err ?
  res.status(422).json(delSale) :
  res.status(200).json(delSale);
});

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  updateSale,
  eraseSale,
};
