const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const invaliDataError = { err: {
  code: 'invalid_data',
  message: 'Wrong id format',
} };

const productService = require('../service/productService');

const getAllProducts = rescue(async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json({ products });
});

const getById = rescue(async (req, res) => {
  const product = await productService.getById(req.params.id);
  console.log(product);
  return product ?
  res.status(200).json(product) :
  res.status(422).json(invaliDataError);
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

  if (updProd.code) return res.status(422).json( { err: updProd });
  return res.status(200).json(updProd);
});

const eraseProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const delProd = await productService.deleteOne(id);
  console.log(delProd);
  return delProd ?
  res.status(200).json(delProd) :
  res.status(422).json(invaliDataError);
});

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  eraseProduct,
};
