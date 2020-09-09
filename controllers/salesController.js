const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const error422 = (res, result) => res.status(422).json({ err: { code: 'invalid_data', message: result.message } });

const addSale = rescue(async (req, res) => {
  const products = req.body;
  const result = await salesService.add(products);

  if (result.error) return error422(res, result);

  res.status(200).json(result);
});

const listAllSales = rescue(async (req, res) => {
  const result = await salesService.getAll();

  res.status(200).json(result);
});

const findSale = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getById(id);

  if (result.error) return res.status(422).json({ err: { code: 'invalid_data', message: result.message } });
  if (result.error2) return res.status(404).json({ err: { code: 'not_found', message: result.message } });

  res.status(200).json(result);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const products = req.body;

  const result = await salesService.updateSale({ id, products });

  if (result.error) return error422(res, result);

  res.status(200).json(result);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await salesService.deleteSale(id);

  if (result.error) return error422(res, result);

  res.status(200).json(result);
});

module.exports = {
  addSale,
  listAllSales,
  findSale,
  updateSale,
  deleteSale,
};
