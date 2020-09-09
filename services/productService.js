const productModel = require('../models/productModel');

const validateAll = (name, quantity) => {
  if (name.length < 5) {
    return ({ error: true, message: '"name" length must be at least 5 characters long' });
  }

  if (quantity <= 0) {
    return ({ error: true, message: '"quantity" must be larger than or equal to 1' });
  }

  if (typeof quantity !== 'number') {
    return ({ error: true, message: '"quantity" must be a number' });
  }
};

const validateProduct = async (name, quantity) => {
  const validate = validateAll(name, quantity);
  if (validate) {
    return validate;
  }

  const exists = await productModel.getProductByName(name);
  if (exists) {
    return ({ error: true, message: 'Product already exists' });
  }
};

const addProduct = async ({ name, quantity }) => {
  const validate = await validateProduct(name, quantity);

  if (validate) {
    return validate;
  }

  const result = await productModel.add(name, quantity);
  return result;
};

const getAll = async () => {
  const result = await productModel.getAll();
  return ({ products: result });
};

const getById = async (id) => {
  const errorMessage = { error: true, message: 'Wrong id format' };

  if (id.length < 24) {
    return errorMessage;
  }

  const result = await productModel.getProductById(id);

  if (!result) {
    return errorMessage;
  }

  return result;
};

const updateProduct = async ({ id, name, quantity }) => {
  const errorMessage = { error: true, message: 'Wrong id format' };

  if (id.length < 24) {
    return errorMessage;
  }

  const validate = await validateAll(name, quantity);

  if (validate) {
    return validate;
  }

  const result = await productModel.update(id, name, quantity);
  return result;
};

const deleteProduct = async (id) => {
  const errorMessage = { error: true, message: 'Wrong id format' };

  if (id.length < 24) {
    return errorMessage;
  }

  const product = await productModel.getProductById(id);

  if (!product) {
    return errorMessage;
  }

  await productModel.deleteById(id);
  return product;
};

module.exports = {
  addProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
