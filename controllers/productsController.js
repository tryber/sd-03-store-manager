const { Router } = require('express');
const { createProduct } = require('../services/productsServices');

const products = Router();

products.route('/')
.post(
  async (req, res, next) => {
    try {
      const product = await createProduct(req.body);
      if (product.message) throw new Error(product.message);
      return res.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  },
).get('/');
