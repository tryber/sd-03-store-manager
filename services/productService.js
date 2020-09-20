const productModel = require('../models/productModel');

const validateProductData = (name, quantity) => {
  if (name.length <= 5 || typeof name !== 'string') {
    return { error: true, code: 'invalid_data', message: 'Nome inválido' };
  }
  if (quantity <= 0) {
    return { error: true, code: 'invalid_data', message: 'Quantidade deve ser maior que 0' };
  }
  return { error: false };
};

const createProduct = async (name, quantity) => {
  const validation = validateProductData(name, quantity);
  if (validation.error) return validation;
  const product = await productModel.createProduct(name, quantity);
  return product;
};

module.exports = {
  createProduct,
};
