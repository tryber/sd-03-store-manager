const productsModel = require('../models/products');

const getAllProducts = async () => {
  const list = await productsModel.getAllProducts();
  return list;
};

const validateProducts = async (name, quantity) => {
  if (name.length < 5) {
    return {
      error: true,
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity < 1) {
    return {
      error: true,
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (typeof quantity !== 'number') {
    return {
      error: true,
      message: '"quantity" must be a number',
    };
  }
  return { error: false };
};

const createProduct = async (name, quantity) => {
  const testName = await getAllProducts()
    .then((res) => res.some((elem) => elem.name === name));

  if (testName) {
    return {
      error: true,
      message: 'Product already exists',
    };
  }
  const validation = await validateProducts(name, quantity);

  if (validation.error) return validation;

  return productsModel.createProduct(name, quantity);
};

const getProductById = async (id) => {
  let product = null;

  if (id.length === 24) {
    product = await productsModel.getProductById(id);
  }

  if (!product) {
    return {
      error: true,
      message: 'Wrong id format',
    };
  }

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const validation = await validateProducts(name, quantity);

  if (validation.error) return validation;

  return productsModel.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  const testId = await getProductById(id);

  if (testId.error) return testId;

  return productsModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
