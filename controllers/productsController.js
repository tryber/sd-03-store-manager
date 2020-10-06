const { Router } = require('express');
const middleware = require('../middlewares');

const products = Router();

// Hebert fez uma estrutura tão organizada aqui que tive desfazer o que fiz
products
  .route('/')
  .post(middleware.registerProduct)
  .get(middleware.listProducts);

products
  .route('/:id')
  .get(middleware.deleteReadProduct())
  .put(middleware.updateProduct)
  .delete(middleware.deleteReadProduct('delete'));

module.exports = products;
