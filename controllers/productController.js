const rescue = require('express-rescue');
const { Router } = require('express');
const { productValidate, idValidate } = require('../middlewares/productValidate');
const productServices = require('../services/productServices');

const product = Router();

product
  .post('/', productValidate, rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const response = await productServices.handleCreateProduct(name, quantity);

    if (response.error) {
      return res.status(422).json(response.message);
    }
    return res.status(201).json(response);
  }))
  .get('/', rescue(async (_req, res) => {
    const response = await productServices.handleGetAllProducts();
    return res.status(200).json({ products: response });
  }));

product
  .get('/:id', idValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const productById = await productServices.handleGetProductById(id);
    if (productById.error) {
      return res.status(422).json(productById.message);
    }
    return res.status(200).json(productById);
  }))
  .put('/:id', idValidate, productValidate, rescue(async (req, res) => {
    const productData = req.body;
    const { id } = req.params;
    const updatedProduct = await productServices.handleUpdateProduct(id, productData);
    if (updatedProduct.error) {
      return res.status(502).json(updatedProduct.message);
    }
    return res.status(200).json(updatedProduct);
  }))
  .delete('/:id', idValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productServices.handleDeleteProduct(id);
    if (deletedProduct.error) {
      return res.status(422).json(deletedProduct.message);
    }
    return res.status(200).json(deletedProduct);
  }));

module.exports = product;
