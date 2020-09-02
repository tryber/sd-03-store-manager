const { Router } = require('express');
const {createProduct, listProducts, listProductById} = require('../services/productsServices');

const products = Router();

products.post('/', async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const product = await createProduct(name, quantity);

    if (product.message) throw new Error(product.message);

    return res.status(201).json(product);
  } catch (error) {
    const err = {
      status: 422,
      payload: { err: { code: 'invalid_data', message: error.message } },
    };
    return next(err);
  }
});

products.get('/', async (_req, res, next) => {
  try {
    const productslist = await listProducts();

    return res.status(200).json({ products: productslist });
  } catch (error) {
    const err = {
      status: 422,
      payload: { err: { code: 'invalid_data', message: error.message } },
    };
    return next(err);
  }
});
products.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const productById = await listProductById(id);

    return res.status(200).json(productById);
  } catch (error) {
    const err = {
      status: 422,
      payload: { err: { code: 'invalid_data', message: error.message } },
    };
    return next(err);
  }
});

module.exports = products;
