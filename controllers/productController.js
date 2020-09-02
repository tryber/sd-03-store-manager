const rescue = require('express-rescue');
const { Router } = require('express');
const { productValidate } = require('../middlewares/productValidate');
const productServices = require('../services/productServices');

const product = Router();

product.post('/', productValidate, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productServices.handleCreateProduct(name, quantity);

  if (response.error) {
    return res.status(422).json(response.message);
  }
  return res.status(201).json(response);
}));

product.get('/', rescue(async (_req, res) => {
  const response = await productServices.handleGetAllProducts();
  return res.status(200).json({ products: response });
}));

product.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const productById = await productServices.handleGetProductById(id);
  console.log('product', productById);

  if (productById.error) {
    return res.status(422).json(productById.message);
  }
  return res.status(200).json(productById);
}));

module.exports = product;
