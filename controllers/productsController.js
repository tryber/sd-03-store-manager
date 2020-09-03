const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.addProduct({ name, quantity });
  if (product.err) return res.status(422).json(product);
  return res.status(201).json(product);
});

const getAllProducts = rescue(async (req, res) => {
  try {
    const productList = await productsService.getAll();
    return res.status(200).json(productList);
  } catch (err) {
    return res.status(500).send(err.body);
  }
});

const getProductById = rescue(async (req, res) => {
  const { name } = req.body;
  try {
    const product = await productsService.getProductByName(name);
    if (product === null) res.status(404).send('produto nao encontrado');
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = { createProduct, getAllProducts, getProductById };
