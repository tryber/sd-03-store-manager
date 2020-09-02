const productModel = require('../models/productModel');

const registerProduct = async (name, quantity) => {
  // Criar as validações de regra de negócio aqui e enviar a requisição para o MongoDB.

  const product = await productModel.createProduct(name, quantity);

  return product;
};

module.exports = {
  registerProduct,
};
