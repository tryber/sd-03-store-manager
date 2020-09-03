const { Router } = require('express');
const middlewares = require('../middlewares');

const products = Router();

products
  .route('/')
  .post(middlewares.registerProduct)
  .get(middlewares.listProducts);

products
  .route('/:id')
  .get(middlewares.deleteReadProduct())
  .put(middlewares.updateProduct)
  .delete(middlewares.deleteReadProduct('delete'));

module.exports = products;
