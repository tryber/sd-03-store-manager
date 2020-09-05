const products = require('../models/products');

const invaliddataError = (message) => ({ error: true, code: 'invalid_data', status: 422, message });

const isNumber = ({ quantity }) => /^[0-9]+$/.test(quantity);
const checkForHexRegExp = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const testProduct = async (product) => {
  if (!isNumber(product)) {
    return invaliddataError('"quantity" must be a number');
  }
  return products.createProduct(product);
};

const createProduct = async (product) => {
  if (product.name.length < 5) {
    return invaliddataError('"name" length must be at least 5 characters long');
  }
  const equalName = await products.validateEqualName(product);
  if (equalName !== null) {
    return invaliddataError('Product already exists');
  }
  if (product.quantity <= 0) {
    return invaliddataError('"quantity" must be larger than or equal to 1');
  }
  return testProduct(product);
};

const getAllProducts = async () => products.getAllProducts();
const getProductById = async (id) => {
  if (!checkForHexRegExp(id)) {
    return invaliddataError('Wrong id format');
  }

  const product = await products.getProductById(id);
  if (!product) {
    return invaliddataError('Wrong id format');
  }
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
