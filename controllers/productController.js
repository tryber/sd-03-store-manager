const rescue = require('express-rescue');
const productService = require('../services/productService');

const error422 = (res, result) => res.status(422).json({ err: { code: 'invalid_data', message: result.message } });

const listAllProducts = rescue(async (_req, res) => {
  const result = await productService.getAll();

  if (result.error) return error422(res, result);

  res.status(200).json(result);
});

const findProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await productService.getById(id);

  if (result.error) return error422(res, result);

  res.status(200).json(result);
});

const addProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.addProduct({ name, quantity });

  if (result.error) return error422(res, result);

  res.status(201).json(result);
});

module.exports = {
  addProduct,
  listAllProducts,
  findProduct,
};
