const productsModel = require('../models/productsModel');

const validateData = (name, quantity) => {
  if (name && name.length < 5) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }

  if (quantity <= 0) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }

  return true;
};

const validateID = (id) => {
  if (id.length < 24) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return true;
};

const createProduct = async (name, quantity) => {
  const isValid = validateData(name, quantity);

  if (typeof isValid === 'object') return isValid;

  const existProduct = await productsModel.getProductByName(name);

  if (existProduct) {
    return {
      err: { code: 'invalid_data', message: 'Product already exists' },
    };
  }

  const createdProduct = await productsModel.createProduct(name, quantity);

  return createdProduct;
};

const getAllProducts = async () => productsModel.getAllProducts();

const getProductById = async (id) => {
  const isIdValid = validateID(id);

  if (typeof isIdValid === 'object') return isIdValid;

  const product = productsModel.getProductById(id);

  if (!product) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const isDataValid = validateData(name, quantity);

  if (typeof isDataValid === 'object') return isDataValid;

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const isIdValid = validateID(id);

  if (typeof isIdValid === 'object') return isIdValid;

  const product = productsModel.getProductById(id);

  if (!product) {
    return {
      err: { code: 'invalid_data', message: 'Wrong id format' },
    };
  }

  await productsModel.deleteProduct(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
