const rescue = require('express-rescue');
const productsService = require('../services/productsService');
const productsModel = require('../models/productsModel');

const errorKey = 'err';

const addProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.add(name, quantity);

  if (newProduct.code) {
    return res.status(422).json({ [errorKey]: newProduct });
  }
 
  return res.status(201).json(newProduct);
});

const listProducts = rescue(async (_req, res) => {
  const list = await productsModel.listAll();
  return res.status(200).json(list);
});

const findProductById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.listById(id);

  if (product.code) return res.status(422).json({ [errorKey]: product });

  return res.status(200).json(product);
});

const updateProductById = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const newProduct = await productsService.updateProduct(id, name, quantity);

  if (newProduct.code) {
    return res.status(422).json({ [errorKey]: newProduct });
  }

  return res.status(200).json(newProduct);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteById(id);

  if (result) {
    return res.status(422).json({[errorKey]: result})
  }

  return res.status(200).end();
});

module.exports = {
  addProduct,
  listProducts,
  findProductById,
  updateProductById,
  deleteProduct,
};
