const productModel = require('../models/productModel');

const {
  PRODUCT_ALREADY_EXISTS,
  WRONG_ID,
  UNKNOW_PRODUCT,
  errMessage,
} = require('./errorsServices');

const handleCreateProduct = async (name, quantity) => {
  const product = await productModel.findProductByName(name);

  if (product) return { error: true, message: errMessage('invalid_data', PRODUCT_ALREADY_EXISTS) };
  return productModel.createProduct(name, quantity);
};

const handleUpdateProduct = async (id, productData) => {
  const updatedProduct = await productModel.updateProductById(id, productData);
  if (!updatedProduct) return { error: true, message: errMessage('invalid_data', UNKNOW_PRODUCT) };

  return updatedProduct;
};

const handleGetAllProducts = async () => productModel.getAllProducts();

const handleGetProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) return { error: true, message: errMessage('invalid_data', WRONG_ID) };
  return product;
};

const handleDeleteProduct = async (id) => {
  const product = productModel.getProductById(id);
  if (!product) return { error: true, message: errMessage('invalid_data', UNKNOW_PRODUCT) };
  await productModel.deleteProductById(id);
  return product;
};

module.exports = {
  handleCreateProduct,
  handleGetProductById,
  handleGetAllProducts,
  handleUpdateProduct,
  handleDeleteProduct,
};
