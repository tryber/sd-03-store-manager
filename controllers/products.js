const { Router } = require('express');

const service = require('../services/product');

const productsRouter = Router();

const listProducts = async (_req, res) => {
  const products = await service.listProducts();
  res.status(200).json(products);
};

const newProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await service.addProduct(name, quantity);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const findProductById = async (res, req) => {
  try {
    const { id } = req.params;
    const result = await service.findProduct(id);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const editProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await service.updateProduct(req.params.id, name, quantity);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
const removeProduct = async (req, res) => {
  try {
    const result = await service.deleteProduct(req.params.id);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

productsRouter
  .route('/')
  .get(listProducts)
  .post(newProduct);

productsRouter
  .route('/:id')
  .get(findProductById)
  .put(editProduct)
  .delete(removeProduct);

module.exports = productsRouter;
