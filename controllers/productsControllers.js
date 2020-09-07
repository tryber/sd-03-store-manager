const { Router } = require('express');
const rescue = require('express-rescue');

const productsService = require('../service/productService');

const products = Router();

const xablau = 'err';

products.get('/', rescue(async (_, res) => {
  const product = await productsService.getAllProducts();

  return res.status(200).json({
    'products': product
  });
}));

products.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productsService.createProduct(name, quantity);

  if(product.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: product.message,
      },
    });
  }

  return res.status(201).json(product)
}));

products.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: product.message,
      },
    });
  }

  return res.status(200).json(product);
}));

products.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const newProduct = await productsService.updateProduct(id, name, quantity);

  if (newProduct.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: newProduct.message,
      }
    })
  }

  return res.status(200).json(newProduct);
}));

products.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const deleted = await productsService.deleteProduct(id);

  if (deleted.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: deleted.message,
      }
    })
  }

  return res.status(200).json(deleted);
}));

module.exports = products;
