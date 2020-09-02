const {
  createProducts,
  updateProductById,
  getAllProducts,
  getProductByName,
  getProductById,
} = require('../models/productsModel');
const { productSchema } = require('./validation');

const errorResponses = {
  invalid_data: { message: 'Product already exists' },
  invalid_name: { message: '\'name\' length must be at least 5 characters long' },
  invalid_quantity: { message: '\'quantity\' must be larger than or equal 1' },
};
const productRegistryValidation = async (name, quantity) => {
  const validation = productSchema(name, quantity);
  const key = validation && validation.details[0].context.key;
  if (key && key === 'name') {
    return errorResponses.invalid_name;
  }

  if (key && key === 'quantity') {
    return errorResponses.invalid_quantity;
  }

  const nameCheck = await getProductByName(name);

  if (nameCheck) {
    return errorResponses.invalid_data;
  }

  return false;
};

const createProduct = async (name, quantity) => {
  try {
    const bodyValidation = await productRegistryValidation(name, quantity);
    const newProduct = !bodyValidation && (await createProducts(name, quantity));

    return bodyValidation || { ...newProduct };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (id, name, quantity) => {
  try {
    const bodyValidation = await productRegistryValidation(name, quantity);
    const updatedProduct = !bodyValidation && (await updateProductById(id, name, quantity));

    return bodyValidation || { ...updatedProduct };
  } catch (error) {
    throw new Error(error.message);
  }
};

const listProducts = async () => {
  try {
    const products = await getAllProducts();
    return [...products];
  } catch (error) {
    throw new Error(error.message);
  }
};

const listProductById = async (id) => {
  try {
    const product = await getProductById(id);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  listProducts,
  listProductById,
};
