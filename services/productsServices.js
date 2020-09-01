const productsModel = require('../models/productsModel');
const { productSchema } = require('./validation');

const errorResponses = {
  invalid_data: { message: 'Product already exists' },
  invalid_name: { message: "'name' length must be at least 5 characters long" },
  invalid_quantity: { message: "'quantity' must be larger than or equal 1" },
};

const createProduct = async (name, quantity) => {
  const productCheck = await productSchema(name, quantity);
  const { error } = productCheck;
  const { details } = error;
  const { context: { key } } = details[0];

  if (key && key === 'name') {
    return errorResponses.invalid_name;
  }

  if (key && key === 'quantity') {
    return errorResponses.invalid_quantity;
  }

  const nameCheck = await productsModel.getProductByName(name);

  if (nameCheck.name) {
    return errorResponses.invalid_data;
  }

  const newProduct = await productsModel.createProducts(name, quantity);

  return { ...newProduct };
};

module.exports = {
  createProduct,
};
