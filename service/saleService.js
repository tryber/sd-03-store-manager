const salesModel = require('../model/salesModel');
const productModel = require('../model/productModel');

const genericError = { err: {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
} };

const invalidSaleError = { err: {
  code: 'invalid_data',
  message: 'Wrong sale ID format',
} };

// Necessário para os testes. Verifica se o parâmetro passado é um hexadecimal de 24 dígitos.
const standarizedId = /^[0-9a-fA-F]{24}$/;

// Como usar for...in não é uma boa prática segundo o CC, foi necessário usar o promise.all
// para resolver promises (busca se o produto existe pelo ID) em paralelo
// Referência: https://flaviocopes.com/javascript-async-await-array-map
// Após verificar que cada id existe na collection de produtos, verifica a quantidade.
const validateSaleData = async (toBeInserted) => {
  let isValidId = false;
  let isValidQuant = false;

  if (toBeInserted.some((item) => !standarizedId.test(item.productId))) { return false; }
  const getProducts = async () =>
    Promise.all(toBeInserted.map((item) => productModel.selectById(item.productId)));

  await getProducts().then((products) => { isValidId = (products.every((p) => p)); });
  isValidQuant = toBeInserted.every((p) => p.quantity > 0);

  return isValidId && isValidQuant;
};

const addSales = async (soldItems) => {
  const isValid = await validateSaleData(soldItems);

  return isValid ?
  salesModel.insert(soldItems) :
  genericError;
};

const selectOne = async (id) => {
  let result = '';
  if (standarizedId.test(id)) { result = await salesModel.listOne(id); }
  return result || genericError;
};

const deleteOne = async (id) => {
  let result = '';
  if (standarizedId.test(id)) { result = await salesModel.erase(id); }
  return result || invalidSaleError;
};

const updateSale = async (id, soldItems) => {
  const isValid = await validateSaleData(soldItems);

  return isValid ?
  salesModel.updateOne(id, soldItems) :
  genericError;
};

const selectAll = async () => salesModel.listAll();

module.exports = {
  addSales,
  selectAll,
  selectOne,
  updateSale,
  deleteOne,
};
