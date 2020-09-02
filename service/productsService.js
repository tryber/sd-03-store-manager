const { getProductByName, insertProduct } = require('../models/productsModel');

const productNameIsValid = async (name) => {
  if (typeof name !== 'string' || name.length <= 5) return false;
  if (await getProductByName(name)) return false;
  return true;
};

const productQuantityIsValid = (quantity) => {
  const validation = quantity <= 0;
  if (typeof quantity !== 'number' || validation) return false;
  return true;
};

const shouldCreateProduct = async (name, quantity) => {
  if (await productNameIsValid(name) && productQuantityIsValid(quantity)) {
    const response = await insertProduct(name, quantity);
    return response;
  }
  const err = new Error('Nome ou quantidade inválidos');
  err.obj = 'lll';
  throw err;
};

module.exports = {
  productNameIsValid,
  productQuantityIsValid,
  shouldCreateProduct,
};
