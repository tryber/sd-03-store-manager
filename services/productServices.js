const productModel = require('../models/productModel');

const {
  PRODUCT_ALREADY_EXISTS,
  WRONG_ID,
  errMessage,
} = require('./errorsServices');

const handleCreateProduct = async (name, quantity) => {
  const product = await productModel.findProductByName(name);

  if (product) return { error: true, message: errMessage('invalid_data', PRODUCT_ALREADY_EXISTS) };
  return productModel.createProduct(name, quantity);
};

const handleGetProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) return { error: true, message: errMessage('invalid_data', WRONG_ID) };
  return product;
};

const handleGetAllProducts = async () => productModel.getAllProducts();

module.exports = {
  handleCreateProduct,
  handleGetProductById,
  handleGetAllProducts,
};
