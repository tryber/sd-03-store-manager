const productsModel = require('../models/Products');

const createProduct = async (name, quantity) => {
  const createdProduct = await productsModel.ProductCreate(name, quantity);
  return createdProduct;
};

const ProductAll = async () => {
  const createdProduct = await productsModel.ProductAll();
  return createdProduct;
};

module.exports = {
  createProduct,
  ProductAll,
};
