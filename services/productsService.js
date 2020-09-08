const {
  createCollectionProducts,
  verifyNameExit,
  listAllProducts,
  listProductsById,
  updateProductsByIdBank,
  deleteProductsByIdBank,
} = require('../models/products');

const checkNameValidation = async (name) => {
  const checkName = await verifyNameExit(name);
  if (checkName) return { err: { code: 'invalid_data', message: 'Product already exists' } };
  return true;
};

const validateProduct = async (name, quantity) => {
  if (name.length < 5 && typeof (name !== 'string')) {
    return {
      err:
        { message: '"name" length must be at least 5 characters long', code: 'invalid_data' },
    };
  }
  if (quantity < 1) {
    return {
      err: { message: '"quantity" must be larger than or equal to 1', code: 'invalid_data' },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err: { message: '"quantity" must be a number', code: 'invalid_data' },
    };
  }
  return checkNameValidation(name);
};

const createProducts = async (name, quantity) => {
  const validation = await validateProduct(name, quantity);

  if (validation.err) return validation;
  return createCollectionProducts(name, quantity);
};

const getAllProducts = async () => {
  const products = await listAllProducts();
  return products;
};

const getAllProductsById = async (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (!regex.test(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  const productsId = await listProductsById(id);
  return productsId;
};

const updateProductsById = async (id, name, quantity) => {
  const validate = await validateProduct(name, quantity);
  if (validate.err) return validate;

  const update = await updateProductsByIdBank(id, name, quantity);
  return update;
};

const deleteProductsById = async (id, name, quantity) => {
  const deleting = await deleteProductsByIdBank(id, name, quantity);
  return deleting;
};

module.exports = {
  createProducts,
  getAllProducts,
  getAllProductsById,
  updateProductsById,
  deleteProductsById,
};
