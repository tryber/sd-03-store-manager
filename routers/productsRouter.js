const { Router } = require('express');
const rescue = require('express-rescue');

const { productsController } = require('../controllers');

const products = Router();

products.get('/', rescue(productsController.getAll));

products.post('/', rescue(productsController.createProduct));

products.get('/:id', rescue(productsController.getProductById));

products.put('/:id', rescue(productsController.updateProduct));

module.exports = products;
