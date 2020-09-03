const products = require('../models/productsModel');

const isNameValid = async (name) => {
  let output;
  const alreadyExists = await products.getProductByName(name);
  if (typeof name !== 'string') {
    output = {
      err: { code: 'invalid_data', message: '"name" must be a string' },
    };
  } else if (name.length < 5) {
    output = {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  } else if (alreadyExists !== null) {
    output = {
      err: { code: 'invalid_data', message: 'Product already exists' },
    };
  } else output = true;
  return output;
};

const isQuantityValid = async (quantity) => {
  let output;

  if (typeof quantity !== 'number') {
    output = {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  } else if (quantity <= 0) {
    output = {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  } else if (!Number.isInteger(quantity)) {
    output = {
      err: { code: 'invalid_data', message: '"quantity" must be an integer' },
    };
  } else output = true;
  return output;
};

const isProductValid = (nameValidation, quantityValidation) => {
  let output;

  if (nameValidation.err) {
    output = nameValidation;
  } else if (quantityValidation.err) {
    output = quantityValidation;
  } else output = true;
  return output;
};

const addProduct = async (data) => {
  const { name, quantity } = data;

  const nameValidation = await isNameValid(name);

  const quantityValidation = await isQuantityValid(quantity);

  const productValidation = await isProductValid(nameValidation, quantityValidation);

  if (typeof productValidation === 'object') return productValidation;

  const product = await products.addProduct(name, quantity);

  return product;
};

const getAll = async () => {
  const result = await products.getAllProducts();
  return result;
};

const getProductByName = async (name) => {
  const product = await products.getProductByName(name);

  return product;
};

module.exports = { addProduct, getProductByName, getAll };
