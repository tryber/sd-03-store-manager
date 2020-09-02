const { Router } = require('express');
const productsServices = require('../services/productsServices');

const products = Router();

products.post('/', async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    console.log(name);
    const product = await productsServices.createProduct(name, quantity);

    if (product.message) throw new Error(product.message);

    return res.status(201).json(product);
  } catch (error) {
    const err = {
      status: 422,
      payload: { err: { code: 'invalid_data', message: error.message } },
    };
    return next(err);
  }
});

module.exports = products;
