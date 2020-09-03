const {
  createCollectionProducts,
  listAllProducts,
  listProductsById,
  updateProductsByIdBank,
  deleteProductsByIdBank,
} = require('../models/products');

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
  return false;
};

const createProducts = async (name, quantity) => {
  const validation = await validateProduct(name, quantity);
  // console.log(validation.error, 'vali');
  if (validation.err) return validation;

  return createCollectionProducts(name, quantity);
};

const getAllProducts = async () => {
  const products = await listAllProducts();
  return products;
};

const getAllProductsById = async (id) => {
  const productsId = await listProductsById(id);
  return productsId;
};

const updateProductsById = async (id, name, quantity) => {
  const update = await updateProductsByIdBank(id, name, quantity);
  return update;
};

const deleteProductsById = async (id) => {
  const deleting = await deleteProductsByIdBank(id);
  return deleting;
};

module.exports = {
  createProducts,
  getAllProducts,
  getAllProductsById,
  updateProductsById,
  deleteProductsById,
};
