const productsModel = require('../models/productsModel');
// const products = require('../controllers/productsController');

const validateProductData = (name, quantity) => {
  if (!name || name.length < 5) return {
    error: true, code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  };
  if (quantity <= 0) return {
    error: true, code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  };
  return { error: false };
};

const getAllProducts = async () => productsModel.getAllProducts();

const createProduct = async (name, quantity) => {
  const validation = validateProductData(name, quantity);

  if (validation.error) return validation;

  const product = await productsModel.createProduct(name, quantity);

  return product;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) throw new Error(`product with id ${id} was not found`);

  return product;
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
};

const updateProduct = async (id, { name, quantity }) => {
  const validation = validateProductData(name, quantity);
  if (validation.error) return validation;

  const product = await getProductById(id);

  if (product.error) return product;

  return productsModel.updateProduct(id, { name, quantity });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
