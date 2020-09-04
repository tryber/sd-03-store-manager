const { Router } = require('express');
const rescue = require('express-rescue');
const productsService = require('./productsService');

const productsRouter = Router();

const listProducts = rescue(async (_req, res) => {
  const cats = await productsService.getAll();

  res.status(200).json(cats);
});

const newProduct = rescue(async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    console.log(req.body);
    const result = await productsService.addProduct(name, quantity);
    if (result.error) return res.status(422).json({ message: result.error.message });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

productsRouter
  .route('/')
  .get(listProducts)
  .post(
    productsService.validateProduct,
    rescue(newProduct),
  );

module.exports = {
  productsRouter,
  listProducts,
  newProduct,
};
