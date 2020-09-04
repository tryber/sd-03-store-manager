const rescue = require('express-rescue');
const productsService = require('./productsService');

const listProducts = rescue(async (_req, res) => {
  const cats = await productsService.getAll();

  res.status(200).json(cats);
});

const newProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productsService.addProduct({ name, quantity });

  if (result.error) return res.status(422).json({ message: result.error.message });

  res.status(201).end();
});

module.exports = {
  listProducts,
  newProduct,
};
