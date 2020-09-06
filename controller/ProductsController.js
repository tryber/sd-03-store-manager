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
    if (createdProduct.err) {
      return res.status(422).json(createdProduct);
    }
    return res.status(201).json(createdProduct);
  }),
);

products.get(
  '/:id',
  resc(async (req, res) => {
    const { id } = req.params;
    const Product = await ProductsService.ProductById(id);

    if (Product.err) {
      return res.status(422).json(Product);
    }
    return res.status(200).json(Product);
  }),
);
products.put(
  '/:id',
  resc(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const Product = await ProductsService.ProductUpdate(id, name, quantity);

    if (Product.err) {
      return res.status(422).json(Product);
    }

    return res.status(200).json(Product);
  }),
);

module.exports = products;
