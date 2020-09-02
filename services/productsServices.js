const productsModel = require('../models/productsModel');
const { productSchema } = require('./validation');

const errorResponses = {
  invalid_data: { message: 'Product already exists' },
  invalid_name: { message: '\'name\' length must be at least 5 characters long' },
  invalid_quantity: { message: '\'quantity\' must be larger than or equal 1' },
};

const createProduct = async (name, quantity) => {
  try {
    const validation = productSchema(name, quantity);
    const key = validation && validation.details[0].context.key;

    if (key && key === 'name') {
      return errorResponses.invalid_name;
    }

    if (key && key === 'quantity') {
      return errorResponses.invalid_quantity;
    }

    const nameCheck = await productsModel.getProductByName(name);

    if (nameCheck) {
      return errorResponses.invalid_data;
    }

    const newProduct = await productsModel.createProducts(name, quantity);

    return { ...newProduct };
  } catch (error) {
    throw new Error(error.message);
  }
};

const listProducts = async () => {
  try {
    const products = await productsModel.getAllProducts();
    return [...products];
  } catch (error) {
    throw new Error(error.message);
  }
};

const listProductById = async (id) => {
  try {
    const product = await productsModel.getProductById(id);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createProduct,
  listProducts,
  listProductById,
};
