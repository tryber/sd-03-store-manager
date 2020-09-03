const { Router } = require('express');
const rescue = require('express-rescue');

const productService = require('../services/productService');

const products = Router();

products.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const product = await productService.registerProduct(name, quantity);

    if (product.error) {
      console.log(product);
      const { code, message } = product;
      return res
        .status(422)
        .json({ err: { code, message } });
    }

    return res.status(201).json(product);
  }),
);

module.exports = {
  products,
};
