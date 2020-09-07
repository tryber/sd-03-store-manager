const { Router } = require('express');

const service = require('../services/product');

const productsRouter = Router();

const listProducts = async (_req, res) => {
  const products = await service.getAll();
  res.status(200).json(products);
};

const newProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await service.addProduct(name, quantity);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

productsRouter
  .route('/')
  .get(listProducts)
  .post(newProduct);

module.exports = productsRouter;
