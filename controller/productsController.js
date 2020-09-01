const Products = require('../models/produtos');
const Validation = require('../services/validations');

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

module.exports = { productController };
