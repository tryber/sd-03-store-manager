const { productsModel } = require('../models');
const { productValidation } = require('../utils');

const getAllProducts = async () => productsModel.getAllProducts();

const createProduct = async (name, quantity) => {
  const isValid = await productValidation(name, quantity);

  if (isValid.err) return isValid;

  return productsModel.createProduct(name, quantity);
};

const getProductById = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    }
  };

  const productId = await productsModel.getProductById(id);

  if (productId.length === 0) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };

  return productId;
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};
