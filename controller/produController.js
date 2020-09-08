const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const productService = require('../service/productService');

const getAllProducts = rescue(async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json({ products });
});

const getById = rescue(async (req, res) => {
  const product = await productService.getById(req.params.id);
  if (!product.length) { return res.status(422).json({ err: {
    code: 'invalid_data',
    message: 'Wrong id format' }
  })}
  res.status(200).json(product);
});

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProd = await productService.insertOne(name, quantity)

  if(newProd.error) { return res.status(422).json({ message: newProd.message }); }

  return res.status(201).json(newProd);
});

const updateProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const updProd = await productService.upsertOne(id, name, quantity)

  if(updProd.error) { return res.status(422).json({ message: updProd.message }); }

  return res.status(200).json(updProd);
});

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
};
