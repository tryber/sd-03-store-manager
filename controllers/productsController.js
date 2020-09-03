const { Router } = require('express');
const rescue = require('express-rescue');
const { getAllProducts, createProducts, getAllProductsById } = require('../services/productsService');

const products = Router();

products.post('/products', rescue(async (req, res) => {
  const { name, quantity } = req.query;
  const registerProducts = await createProducts(name, quantity);
  console.log(registerProducts.error.message)
  // if (registerProducts.error) {
  //   return res.status(422).send(registerProducts.error);
  // }
  return res.status(200).json(registerProducts);
}));

products.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  return res.status(200).json(allProducts);
});

products.get('/products/:id', async (req, res) => {
  const { id } = req.query;
  const productsId = await getAllProductsById(id);
  return res.status(200).json(productsId);
});

module.exports = { products };
