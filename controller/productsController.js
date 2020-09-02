const Products = require('../models/produtos');
const Validation = require('../services/validations');

async function func(res, cb, req, status) {
  const product = await cb(req);
  res.status(status).send(product);
}

async function productController(req, res) {
  try {
    const { name, quantity } = req.body;
    const { message } = await Validation.validadeNewProduct(name, quantity);
    if (message) {
      throw new Error(message);
    }
    const product = await Products.createProduct({ name, quantity });
    console.log(product);
    res.status(201).send(product);
  } catch (error) {
    const err = {
      err: {
        code: 'invalid_data', message: error.message,
      },
    };
    res.status(422).send(err);
  }
}

async function listProducts(req, res) {
  try {
    const products = await Products.listProducts();
    res.status(200).send({ products });
  } catch (error) {
    res.status(404).send([]);
  }
}

async function getProduct(req, res) {
  try {
    await func(res, Products.getProductById, req.params.id, 201);
    // const product = await Products.getProductById(req.params.id);
    // res.status(201).send(product);
  } catch (error) {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { message } = await Validation.validadeUpdateProduct(name, quantity);
    if (message) {
      throw new Error(message);
    }
    const product = await Products.updateProduct(id, { name, quantity });
    console.log(product);
    res.status(200).send(product);
  } catch (error) {
    const err = {
      err: {
        code: 'invalid_data', message: error.message,
      },
    };
    res.status(422).send(err);
  }
}

async function deleteProduct(req, res) {
  try {
    await func(res, Products.deleteProduct, req.params.id, 200);
    // const product = await Products.deleteProduct(req.params.id);
    // res.status(200).send(product);
  } catch (error) {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
}
module.exports = { productController, deleteProduct, listProducts, getProduct, updateProduct };
