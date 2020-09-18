const { Router } = require('express');

const produController = require('../controller/produController');

const products = Router();

products.get('/', produController.getAllProducts);
products.get('/:id', produController.getById);
products.put('/:id', produController.updateProduct);
products.delete('/:id', produController.eraseProduct);
products.post('/', produController.createProduct);

module.exports = products;
