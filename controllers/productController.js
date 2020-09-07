const rescue = require('express-rescue');
const productService = require('../services/productService');

const addProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.addProduct({ name, quantity });

  if (result.error) return res.status(422).json({ err: { code: 'invalid_data', message: result.message } });

  res.status(201).json(result);
});

module.exports = {
  addProduct,
};
