const { Router } = require('express');
const rescue = require('express-rescue');
const { errorHandler, verifyId } = require('../controllers/errorHandler');
const productsService = require('./productsService');

const productsRouter = Router();

const listProducts = rescue(async (_req, res) => {
  const products = await productsService.getAllProducts();
  res.status(200).json(products);
});

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.getProductById(id);
    return res.status(200).json(result);
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

const updateProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await productsService.updateProduct(id, name, quantity);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

productsRouter
  .route('/')
  .get(listProducts)
  .post(productsService.validateProduct, newProduct, errorHandler);

productsRouter
  .route('/:id')
  .get(verifyId, getProductById, errorHandler)
  .put(verifyId, productsService.validateProduct, updateProduct, errorHandler)
  .delete(verifyId, deleteProduct, errorHandler);

module.exports = productsRouter;
