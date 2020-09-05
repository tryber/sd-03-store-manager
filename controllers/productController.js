const rescue = require('express-rescue');
const productService = require('../services/productService');

const createProduct = rescue(async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  if (product.error === true) {
    return next(product);
  }
  return res.status(201).json(product);
});

module.exports = {
  createProduct,
};
