const products = require('../models/products');

const invaliddataError = (message) => ({ error: true, code: 'invalid_data', status: 422, message });

const validateproductName = ({ name }) => /^[a-z]+$/i.test(name);
const isNumber = ({ quantity }) => /^[0-9]+$/.test(quantity);

const createProduct = async (product) => {
  if (!validateproductName(product) || product.name.length < 5) {
    return (invaliddataError('"name" length must be at least 5 characters long'));
  }
  const equalName = await products.validateEqualName(product);
  if (equalName !== null) {
    return (invaliddataError('Product already exists'));
  }
  if (product.quantity <= 0) {
    return (invaliddataError('"quantity" must be larger than or equal to 1'));
  }
  if (!isNumber(product)) {
    return (invaliddataError('"quantity" must be a number'));
  }
  return products.createProduct(product);
};

module.exports = {
  createProduct,
};
