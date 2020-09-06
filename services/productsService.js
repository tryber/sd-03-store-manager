const products = require('../models/productsModel');

const isNameValid = (name) => {
  let output = true;
  if (typeof name !== 'string') {
    output = {
      err: { code: 'invalid_data', message: '"name" must be a string' },
    };
  }
  if (name.length < 5) {
    output = {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }
  return output;
};

const isQuantityValid = (quantity) => {
  let output = true;
  if (!Number.isInteger(quantity)) {
    output = {
      err: { code: 'invalid_data', message: '"quantity" must be an integer' },
    };
  }
  if (typeof quantity !== 'number') {
    output = {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }
  if (quantity <= 0) {
    output = {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }
  return output;
};

const isProductUnique = async (name) => {
  let output = true;
  const alreadyExists = await products.getProductByName(name);
  if (alreadyExists !== null) {
    output = {
      err: { code: 'invalid_data', message: 'Product already exists' },
    };
  }
  return output;
};

const addProduct = async (data) => {
  const { name, quantity } = data;

  const nameValidation = isNameValid(name);

  if (nameValidation.err) return nameValidation;

  const quantityValidation = isQuantityValid(quantity);

  if (quantityValidation.err) return quantityValidation;

  const uniquenessValidation = await isProductUnique(name);

  if (uniquenessValidation.err) return uniquenessValidation;

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

const getProductById = async (id) => {
  if (id.length < 24) return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  const product = await products.getProductById(id);

  if (product === null) return { err: { code: 'invalid_data', message: 'Product not Found' } };

  return product;
};

const updateProduct = async (_id, name, quantity) => {
  const nameValidation = isNameValid(name);
  if (nameValidation.err) return nameValidation;

  const quantityValidation = isQuantityValid(quantity);
  if (quantityValidation.err) return quantityValidation;

  return products.updateProduct(_id, name, quantity);
};

module.exports = { addProduct, getProductByName, getAll, getProductById, updateProduct };
