const products = require('../models/productsModel');

const add = async (data) => {
  const { name, quantity } = data;

  const isProductValid = name.length > 5;

  if (!isProductValid) return { error: { code: 'invalid_data', message: 'dados do produto inválidos' } };

  const product = await products.add(name, quantity);

  return product;
};

module.exports = { add };
