const rescue = require('express-rescue');
const { Router } = require('express');
const { productValidate } = require('../middlewares/productValidate');
const productServices = require('../services/productServices');

const product = Router();

product.post('/', productValidate, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const response = await productServices.handleCreateProduct(name, quantity);

  console.log(response);
  if (response.error) {
    return res.status(303).json({ error: true, code: 'conflict', message: response.message });
  }
  return res.status(201).json(response);
}));

module.exports = product;
