const services = require('../services');

const validateId = (id) => {
  const regex = new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);
  const result = regex.test(id);
  if (!result) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  return null;
};

const validateEntries = (name, quantity) => {
  let response;

  if (typeof name !== 'string' || name.length < 5) {
    response = { err: { message: '"name" length must be at least 5 characters long', code: 'invalid_data' } };
  } else if (quantity <= 0) {
    response = { err: { message: '"quantity" must be larger than or equal to 1', code: 'invalid_data' } };
  } else if (typeof quantity !== 'number') {
    response = { err: { message: '"quantity" must be a number', code: 'invalid_data' } };
  }
  return response;
};

const validadeProduct = (name, quantity, sameProduct) => {
  let response = validateEntries(name, quantity);

  if (sameProduct && sameProduct.name === name) {
    response = { err: { message: 'Product already exists', code: 'invalid_data' } };
  }
  return response;
};

const updateValidadeProduct = (name, quantity, receivedProduct) => {
  let response = validateEntries(name, quantity);

  if (!receivedProduct) {
    response = { err: { message: 'Wrong id format', code: 'invalid_data' } };
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
  const validation = validateId(id);

  if (validation) {
    return res.status(422).send(validation);
  }

  const result = await services.productService.getProductById(id);
  return res.status(200).send(result);
};

const updateProductById = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const { name, quantity } = req.body;
  const validation = validateId(id);

  if (validation) {
    return res.status(422).send(validation);
  }

  const productExists = await services.productService.getProductById(id);
  // validações
  const response = updateValidadeProduct(name, quantity, productExists);
  if (response) {
    return res.status(422).send(response);
  }

  const result = await services.productService.updateProductById(id, name, quantity);
  return res.status(201).send(result);
};

const deleteProductById = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const response = validateId(id);

  if (response) {
    return res.status(422).send(response);
  }

  const productExists = await services.productService.getProductById(id);
  // validações
  if (!productExists) {
    const response = { err: { message: 'Wrong id format', code: 'invalid_data' } };
    return res.status(422).send(response);
  }
  const { _id, name, quantity } = productExists;

  const result = await services.productService.deleteProductById(_id, name, quantity);
  return res.status(200).send(result);
};

module.exports = {
  createProduct,
  showAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
