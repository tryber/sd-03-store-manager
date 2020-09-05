const { Router } = require('express');
const productController = require('../controllers/productController');

const product = Router();

product.get('/', productController.getAllProducts);
product.post('/', productController.createProduct);
product.get('/:id', productController.getProductById)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct);

module.exports = product;
