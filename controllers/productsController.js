const services = require('../services');

const validadeProduct = (name, quantity, sameProduct) => {
  let response;

  if (typeof name !== 'string' || name.length < 5) {
    response = { err: { message: '"name" length must be at least 5 characters long', code: 'invalid_data' } };
  } else if (sameProduct) {
    response = { err: { message: 'Product already exists', code: 'invalid_data' } };
  } else if (quantity <= 0) {
    response = { err: { message: '"quantity" must be larger than or equal to 1', code: 'invalid_data' } };
  } else if (typeof quantity !== 'number') {
    response = { err: { message: '"quantity" must be a number', code: 'invalid_data' } };
  }
  return response;
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const sameProduct = await services.productService.sameProduct(name);
  // validações
  const response = validadeProduct(name, quantity, sameProduct);
  if (response) {
    return res.status(422).send(response);
  }

  const result = await services.productService.createProduct(name, quantity);
  return res.status(201).send(result);
};

const showAllProducts = async (_req, res) => {
  const result = await services.productService.showAllProducts();
  return res.status(200).send({ products: result });
};

const getProductById = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result = await services.productService.getProductById(id);
  let message = 'No message';

  if (!result) {
    message = 'No product found';
  } else if (result.message) {
    message = 'Wrong id format';
  }

  if (message !== 'No message') {
    const response = { err: { message, code: 'invalid_data' } };
    return res.status(422).send(response);
  }
  return res.status(200).send(result);
};

module.exports = {
  createProduct,
  showAllProducts,
  getProductById,
};
