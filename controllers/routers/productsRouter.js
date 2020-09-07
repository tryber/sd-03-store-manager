const express = require('express');
const controllers = require('../index');

const productsRouter = express.Router();

productsRouter
  .post('/', controllers.productsController.productsRegister)
  .get('/:id', controllers.productsController.listProductById)
  .get('/', controllers.productsController.listProducts)
  .put('/:id', controllers.productsController.updateProductsById)
  .delete('/:id', controllers.productsController.deleteProductsById);

module.exports = {
  productsRouter,
};
