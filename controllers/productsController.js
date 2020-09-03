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
      const { code, message } = product;
      return res
        .status(422)
        .json({ err: { code, message } });
    }

    return res.status(201).json(product);
  }),
);

products.get('/', rescue(async (_, res) => {
  const allProducts = await productService.findAllProducts();

  return res.status(200).json(allProducts);
}));

products.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productService.findProductById(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
}));

products.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productService.updateProductById(id, name, quantity);

  if (product.error) {
    const { code, message } = product;
    return res
      .status(422)
      .json({ err: { code, message } });
  }

  return res.status(200).json(product);
}));

module.exports = {
  products,
};
