const { Router } = require('express');
const resc = require('express-rescue');
const ProductsService = require('../services/ProductsService');

const products = Router();

products.get(
  '/',
  resc(async (_req, res) => {
    const returnedProducts = await ProductsService.ProductAll();

    return res.status(200).json(returnedProducts);
  }),
);

products.post(
    '/',
    resc(async (req, res) => {
      const { name, quantity } = req.body;
  
      const createdProduct = await ProductsService.createProduct(name, quantity);
  
      return res.status(201).json(createdProduct);
    }),
  );


  module.exports = products;