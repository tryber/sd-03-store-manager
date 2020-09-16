const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const productService = require('../service/productService');

const getAllProducts = rescue(async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json({ products });
});

const getById = rescue(async (req, res) => {
  const searchResult = await productService.getById(req.params.id);

  return searchResult.err ?
  res.status(422).json(searchResult) :
  res.status(200).json(searchResult);
});

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProd = await productService.insertOne(name, quantity);
  console.log(newProd);

  return newProd.code ?
  res.status(422).json({ err: newProd }) :
  res.status(201).json(newProd);
});

const updateProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const updProd = await productService.upsertOne(id, name, quantity);

  if (updProd.code) return res.status(422).json({ err: updProd });
  return res.status(200).json(updProd);
});

const eraseProduct = rescue(async (req, res) => {
  const delProd = await productService.deleteOne(req.params.id);

  return delProd.err ?
  res.status(422).json(delProd) :
  res.status(200).json(delProd);
});

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  eraseProduct,
};
