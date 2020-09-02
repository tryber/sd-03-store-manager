const storeModel = require('../model/storeModel');

const validate = async (name, quantity) => {
  if (name.length < 5) return { err: { code: 'invalid_data', message: '\"name\" length must be at least 5 characters long' } };
  if (await storeModel.findByName(name)) return { err: { code: 'invalid_data', message: 'Product already exists' } };
  if (quantity < 1) return { err: { code: 'invalid_data', message: '\"quantity\" must be larger than or equal to 1' } };
  if (typeof (quantity) !== 'number') return { err: { code: 'invalid_data', message: '\"quantity\" must be a number' } };
  return true;
};

const validateSale = async (soldItems) => {
  const quantityCheck = soldItems.some(({ quantity }) => quantity < 1);
  const stringCheck = soldItems.some(({ quantity }) => typeof (quantity) !== 'number');
  const getPromise = soldItems
    .map(async ({ productId }) => await storeModel.getProductById(productId) !== null);
  const arr = await Promise.all(getPromise).then((data) => data);
  const idCheck = arr.some((e) => !e);

  if (quantityCheck || idCheck || stringCheck) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  return true;
};

const validateUpdate = async (name, quantity) => {
  if (name.length < 5) return { err: { code: 'invalid_data', message: '\"name\" length must be at least 5 characters long' } };
  if (quantity < 1) return { err: { code: 'invalid_data', message: '\"quantity\" must be larger than or equal to 1' } };
  if (typeof (quantity) !== 'number') return { err: { code: 'invalid_data', message: '\"quantity\" must be a number' } };
  return true;
};

const validateSalesUpdate = async (soldItems) => {
  const quantityCheck = soldItems.some(({ quantity }) => quantity < 1);
  const stringCheck = soldItems.some(({ quantity }) => typeof (quantity) !== 'number');

  if (quantityCheck || stringCheck) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  return true;
};

const getAllProducts = () => storeModel.getAllProducts();

const createProduct = async ({ name, quantity }) => {
  const product = await validate(name, quantity);
  if (product.err) return product;
  return storeModel.createProduct(name, quantity);
};

const getProductById = async (id) => {
  const product = await storeModel.getProductById(id);
  if (!product) return { err: { code: 'invalid_data', message: 'wrong id format' } };
  return product;
};

const updateProduct = async (id, { name, quantity }) => {
  const product = await validateUpdate(name, quantity);
  if (product.err) return product;
  return storeModel.updateProduct(id, { name, quantity });
};

const deleteProduct = async (id) => {
  const product = await storeModel.getProductById(id);
  if (!product) return { err: { code: 'invalid_data', message: 'wrong id format' } };
  await storeModel.deleteProduct(id);
  return product;
};

const createSale = async (soldItems) => {
  const sale = await validateSale(soldItems);
  if (sale.err) return sale;
  return storeModel.createSale(soldItems);
};

const getAllSales = async () => storeModel.getAllSales();

const getSaleById = async (id) => {
  const sale = await storeModel.getSaleById(id);
  if (!sale) return { err: { code: 'invalid_data', message: 'wrong id format' } };
  return sale;
};

const updateSale = async (id, soldItens) => {
  const sale = await validateSalesUpdate(soldItens);
  if (sale.err) return sale;
  return storeModel.updateSale(id, soldItens);
};

const deleteSale = async (id) => {
  const sale = await storeModel.getSaleById(id);
  if (!sale) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  await storeModel.deleteSale(id);
  return sale;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
