const { Router } = require('express');
const rescue = require('express-rescue');
const {
  createProducts,
  getAllProducts,
  getAllProductsById,
  updateProductsById,
  deleteProductsById,
} = require('../services/productsService');

const products = Router();

products.post('/products', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  // const { name, quantity } = req.query;
  const registerProducts = await createProducts(name, quantity);

  if (registerProducts.err) {
    return res.status(422).json(registerProducts);
  }
  return res.status(201).json(registerProducts);
}));

products.get('/products', rescue(async (req, res) => {
  const allProducts = {
    products: await getAllProducts(),
  };
  return res.status(200).json(allProducts);
}));

products.get('/products/:id', async (req, res) => {
  const productsId = await getAllProductsById(req.params.id);
  const { _id: idMongo } = productsId;
  if (productsId.err) return res.status(422).json(productsId);
  if (idMongo) return res.status(200).json(productsId);
});

products.put('/products/:id', async (req, res) => {
  const { id } = req.user;
  const updateProducts = await updateProductsById(id);

  if (updateProducts.err) {
    return res.status(422).json(updateProducts);
  }
  return res.status(200).json(updateProducts);
});

products.delete('/products/:id', async (req, res) => {
  const { id } = req.user;
  const { name, quantity } = req.body;
  const deleteProducsts = await deleteProductsById(id, name, quantity);

  if (deleteProducsts.err) {
    return res.status(422).json(deleteProducsts);
  }
  return res.status(200).json(deleteProducsts);
});

module.exports = { products };
