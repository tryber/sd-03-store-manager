const Products = require('../models/produtos');
const Validation = require('../services/validations');

async function func(res, cb, req, status, status2) {
  try {
    const product = await cb(req);
    res.status(status).send(product);
  } catch (error) {
    res.status(status2).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
}

async function func2(req, res, cb, cb2) {
  let id;
  if (req.params) {
    id = req.params.id;
  }
  const { name, quantity } = req.body;
  const { message } = await cb(name, quantity);
  if (message) {
    throw new Error(message);
  }
  if (id) {
    const product = await cb2(id, { name, quantity });
    res.status(200).send(product);
  } else {
    const product = await cb2({ name, quantity });
    res.status(201).send(product);
  }
}

async function productController(req, res) {
  try {
    await func2(req, res, Validation.validadeNewProduct, Products.createProduct);
    // const { name, quantity } = req.body;
    // const { message } = await Validation.validadeNewProduct(name, quantity);
    // if (message) {
    //   throw new Error(message);
    // }
    // const product = await Products.createProduct({ name, quantity });
    // res.status(201).send(product);
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
  // try {
  await func(res, Products.getProductById, req.params.id, 201, 422);
  // } catch (error) {
  // res.status(422).send({
  //   err: {
  //     code: 'invalid_data',
  //     message: 'Wrong id format',
  //   },
  // });
  // }
}

async function updateProduct(req, res) {
  try {
    await func2(req, res, Validation.validadeUpdateProduct, Products.updateProduct);
    // const { id } = req.params;
    // const { name, quantity } = req.body;
    // const { message } = await Validation.validadeUpdateProduct(name, quantity);
    // if (message) {
    //   throw new Error(message);
    // }
    // const product = await Products.updateProduct(id, { name, quantity });
    // res.status(200).send(product);
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
  // try {
  await func(res, Products.deleteProduct, req.params.id, 200, 422);
  // } catch (error) {
  // res.status(422).send({
  //   err: {
  //     code: 'invalid_data',
  //     message: 'Wrong id format',
  //   },
  // });
  // }
}
module.exports = { productController, deleteProduct, listProducts, getProduct, updateProduct };
