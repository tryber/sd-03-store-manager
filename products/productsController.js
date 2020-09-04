const { Router } = require('express');
const rescue = require('express-rescue');
const { errorHandler } = require('./errorService');
const productsService = require('./productsService');

const productsRouter = Router();

const listProducts = rescue(async (_req, res) => {
  const cats = await productsService.getAllProducts();
  res.status(200).json(cats);
});

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await productsService.getProductById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const newProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsService.addProduct(name, quantity);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

productsRouter
  .route('/')
  .get(listProducts)
  .post(productsService.validateProduct, newProduct, errorHandler);

productsRouter.route('/:id').get(getProductById);

module.exports = {
  productsRouter,
  listProducts,
  newProduct,
};
