const { Router } = require('express');
const productController = require('../controllers/productController');

const product = Router();

product.get('/', productController.getAllProducts);
product.post('/', productController.createProduct);
product.get('/:id', productController.getProductById);

module.exports = product;
