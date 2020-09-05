const { Router } = require('express');
const productController = require('../controllers/productController');

const product = Router();

product.post('/', productController.createProduct);

module.exports = product;
