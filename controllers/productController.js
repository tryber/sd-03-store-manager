const rescue = require('express-rescue');
const { Router } = require('express');
const { productValidate, idValidate } = require('../middlewares/productValidate');
const productServices = require('../services/productServices');

const product = Router();

const response = async ({ err, ok }, data, res) =>
  (data.error ? res.status(err).json(data.message) : res.status(ok).json(data));

product
  .post('/', productValidate, rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const createdProduct = await productServices.handleCreateProduct(name, quantity);
    // return createdProduct.error
    //   ? res.status(422).json(createdProduct.message) : res.status(201).json(createdProduct);
    return response({ err: 422, ok: 201 }, createdProduct, res);
  }))
  .get('/', rescue(async (_req, res) => {
    const products = await productServices.handleGetAllProducts();
    return res.status(200).json({ products });
  }))
  .get('/:id', idValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const productById = await productServices.handleGetProductById(id);
    // return productById.error
    //   ? res.status(422).json(productById.message) : res.status(200).json(productById);
    return response({ err: 422, ok: 200 }, productById, res);
  }))
  .put('/:id', idValidate, productValidate, rescue(async (req, res) => {
    const productData = req.body;
    const { id } = req.params;
    const updatedProduct = await productServices.handleUpdateProduct(id, productData);
    // return updatedProduct.error
    //   ? res.status(502).json(updatedProduct.message) : res.status(200).json(updatedProduct);
    return response({ err: 502, ok: 200 }, updatedProduct, res);
  }))
  .delete('/:id', idValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productServices.handleDeleteProduct(id);
    // return deletedProduct.error
    //   ? res.status(422).json(deletedProduct.message) : res.status(200).json(deletedProduct);
    return response({ err: 422, ok: 200 }, deletedProduct, res);
  }));

module.exports = product;
