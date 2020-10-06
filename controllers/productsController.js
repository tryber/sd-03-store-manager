const { Router } = require('express');
const routes = require('../routes');
const products = Router();
// Hebert fez uma estrutura tão organizada aqui que tive desfazer o que fiz para fazer no estilo dele
products
  .route('/')
  .post(routes.registerProduct)
  .get(routes.listProducts);

products
  .route('/:id')
  .get(routes.deleteReadProduct())
  .put(routes.updateProduct)
  .delete(routes.deleteReadProduct('delete'));

module.exports = products;
