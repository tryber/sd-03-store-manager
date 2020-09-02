const products = require('../models/productsModel');

const isProductValid = (name, quantity) => {
  if (typeof name === 'string'
    && typeof quantity === 'number'
    && Number.isInteger(quantity)
    && name.length > 5
    && quantity > 0) return true;
};

const getAll = async () => {
  const result = await products.getAllProducts();
  return result;
};

const add = async (data) => {
  const { name, quantity } = data;

  const validation = isProductValid(name, quantity);

  if (!validation) return { error: { code: 'invalid_data', message: 'dados do produto inválidos' } };

  const product = await products.add(name, quantity);

  return product;
};

const getProductByName = async (name) => {
  const product = await products.getProductByName(name);

  return product;
};

module.exports = { add, getProductByName, getAll };
