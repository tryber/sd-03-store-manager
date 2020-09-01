const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  if (name.length < 5) {
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
  if (id.length < 12) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const product = productsModel.getProductById(id);

  if (!product) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return product;
};

const updateProduct = async (id, name, quantity) => {
  if (name.length < 5) {
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

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);
  return updatedProduct;
};

const deleteProduct = async (id) => {
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
