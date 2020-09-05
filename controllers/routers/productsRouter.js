const express = require('express');
const controllers = require('../index');

const productsRouter = express.Router();

productsRouter
  .post('/', controllers.productsController.productsRegister)
  .get('/', controllers.productsController.listProducts)
  .get('/:id', controllers.productsController.listProductById)
  .put('/:id', controllers.productsController.updateProductsById)
  .delete('/:id', controllers.productsController.deleteProductsById);

module.exports = {
  productsRouter,
};
