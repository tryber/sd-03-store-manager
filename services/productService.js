const productModel = require('../models/productModel');

const validateProduct = async (name, quantity) => {
  if (name.length < 5) {
    return ({ error: true, message: '"name" length must be at least 5 characters long' });
  }

  const exists = await productModel.getProductByName(name);
  if (exists) {
    return ({ error: true, message: 'Product already exists' });
  }

  if (quantity <= 0) {
    return ({ error: true, message: '"quantity" must be larger than or equal to 1' });
  }

  if (typeof quantity !== 'number') {
    return ({ error: true, message: '"quantity" must be a number' });
  }
};

const addProduct = async ({ name, quantity }) => {
  const validate = await validateProduct(name, quantity);

  if (validate) {
    return validate;
  }

  const result = await productModel.add(name, quantity);
  return ({ _id: result.insertedId, name, quantity });
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

module.exports = {
  addProduct,
  getAll,
  getById,
};
