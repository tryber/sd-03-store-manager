const productsModel = require('../models/Products');

const invalid = 'invalid_data';
let code;
let message;

const validateProductCreate = async (name, quantity) => {
  if (name && name.length < 5) {
    message = '"name" length must be at least 5 characters long';
    code = invalid;
    return { err: { code, message } };
  }

  if (quantity <= 0) {
    message = '"quantity" must be larger than or equal to 1';
    code = invalid;
    return { err: { code, message } };
  }

  if (typeof quantity !== 'number') {
    message = '"quantity" must be a number';
    code = invalid;
    return { err: { code, message } };
  }

  const checkProductExist = await productsModel.ProductByName(name);

  if (checkProductExist) {
    message = 'Product already exists';
    code = invalid;
    return { err: { code, message } };
  }
};

const createProduct = async (name, quantity) => {
  const validation = await validateProductCreate(name, quantity);

  if (validation) {
    return validation;
  }
  const createdProduct = await productsModel.ProductCreate(name, quantity);
  return createdProduct;
};

const ProductAll = async () => {
  const createdProduct = await productsModel.ProductAll();
  return createdProduct;
};

const ProductById = async (id) => {
  if (id.length < 24) {
    message = 'Wrong id format';
    code = invalid;
    return { err: { code, message } };
  }
  const Product = await productsModel.ProductById(id);
  return Product;
};

const ProductUpdate = async (id, name, quantity) => {
  const validation = await validateProductCreate(name, quantity);

  if (validation) {
    return validation;
  }

  const Product = await productsModel.ProductUpdate(id, name, quantity);

  return Product;
};

const ProductDelete = async (id) => {
  if (id.length === 24) {
    const checkProductExist = await productsModel.ProductById(id);
    if (!checkProductExist) {
      code = invalid;
      message = 'Wrong id format';
      return { err: { code, message } };
    }

    const Product = await productsModel.ProductDelete(id);
    return Product;
  }
  code = invalid;
  message = 'Wrong id format';
  return { err: { code, message } };
};
module.exports = {
  createProduct,
  ProductAll,
  ProductById,
  ProductUpdate,
  ProductDelete,
};
