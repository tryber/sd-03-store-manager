const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.addProduct({ name, quantity });
  if (result.err) return res.status(422).json(result);
  return res.status(201).json(result);
});

const getAllProducts = rescue(async (req, res) => {
  try {
    const results = await productsService.getAll();
    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).send(err.body);
  }
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await productsService.updateProduct(id, name, quantity);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteProduct(id);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
