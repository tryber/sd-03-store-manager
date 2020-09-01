const { Router } = require('express');
const rescue = require('express-rescue');
const productsServices = require('../services/productsServices');

const products = Router();

products.post(
  '/',
  rescue(async (req, res, next) => {
    const { name, quantity } = req.body;
    try {
      const product = await productsServices.createProduct(name, quantity);
      if (product.message) throw new Error({ message: product.message });
      return res.status(201).json(products);
    } catch (error) {
      const err = {
        status: 422,
        payload: { err: { code: 'invalid_data', message: error.message } },
      };
      return next(err);
    }
  }),
);

module.exports = products;
