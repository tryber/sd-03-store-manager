const joi = require('joi');

const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const nameCheck = await productsModel.getProductByName(name);

  if (nameCheck.name) {
    return { err: { message: 'Product already exists', code: 'invalid_data' } };
  }
};
