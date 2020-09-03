const { listAllProducts, listProductsById, createCollectionProducts } = require('../models/products');

const createProducts = async (name, quantity) => {
  if (!name.length > 5 && typeof (!name === 'string')) {
    return { error: { message: '"name" length must be at least 5 characters long', code: 'invalid_data' } };
  }

  if (!Number.isInteger(quantity) > 0) {
    return { error: { message: '"quantity" must be larger than or equal to 1', code: 'invalid_data' } };
  }

  const register = await createCollectionProducts(name, quantity);
  return register;
};

const getAllProducts = async () => {
  const products = await listAllProducts();
  return products;
};

const getAllProductsById = async (id) => {
  const productsId = await listProductsById(id);
  return productsId;
};

module.exports = { getAllProducts, createProducts, getAllProductsById };
