const rescue = require('express-rescue');
// Necessário para que a request seja respondida

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
  const request = await saleService.selectOne(req.params.id);

  return request.itensSold ?
  res.status(200).json(request) :
  res.status(422).json(request);
});

const updateSale = rescue(async (req, res) => {
  const result = await saleService.updateSale(req.params.id, req.body);

  return result.err ?
  res.status(422).json(result) :
  res.status(200).json(result);
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
