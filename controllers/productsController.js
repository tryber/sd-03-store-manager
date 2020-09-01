const { Router } = require('express');
const rescue = require('express-rescue');

const products = Router();

products.post('/products', rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
}));

module.exports = products;
