const salesModel = require('../model/salesModel');
const productModel = require('../model/productModel');

const genericError = { err: {
  id: 422,
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
} };

const invalidSaleError = { err: {
  id: 422,
  code: 'invalid_data',
  message: 'Wrong sale ID format',
} };

const notFoundError = { err: {
  id: 404,
  code: 'not_found',
  message: 'Sale not found',
} };

const invalidStockError = { err: {
  id: 404,
  code: 'stock_problem',
  message: 'Such amount is not permitted to sell',
} };

// Verifica se o parâmetro passado é um hexadecimal de 24 dígitos
const standarizedId = /^[0-9a-fA-F]{24}$/;

// Como usar for...in não é uma boa prática segundo o CC, foi necessário usar o promise.all
// para resolver promises (busca se o produto existe pelo ID) em paralelo
// Referência: https://flaviocopes.com/javascript-async-await-array-map
// Uma outra sugestão foi dada pelo @roziscoding via code review, mas ela não se aplica ao caso
// em que uma verificação de cada quantidade é necessária. Envolvia usar
// Após verificar que cada id existe na collection de produtos, verifica a quantidade.
const validateSaleData = async (toBeInserted) => {
  let isValidQuant = false;
  let isValidStock = true;
  // As variáveis acima se referem, respectivamente, à validade da quantidade a ser lançada
  // e a quantidade presente no estoque correspondente a cada produto

  const getProducts = async () =>
    Promise.all(toBeInserted.map((item) => productModel.selectById(item.productId)));

  await getProducts().then((products) =>
    products.forEach((product, i) => {
      if (product.quantity < toBeInserted[i].quantity) isValidStock = false;
    }),
  );

  isValidQuant = toBeInserted.every((p) => p.quantity > 0);

  if (isValidStock && isValidQuant) return;
  else if (isValidQuant === true) return invalidStockError;
  return genericError;
};

const addSales = async (soldItems) => {
  const hasError = await validateSaleData(soldItems);

  return hasError || salesModel.insert(soldItems);
};

const selectOne = async (id) => {
  let result = '';
  if (standarizedId.test(id)) { result = await salesModel.listOne(id); }
  if (result === '') return invalidSaleError;
  return result || notFoundError;
};

const deleteOne = async (id) => {
  let result = '';
  if (standarizedId.test(id)) { result = await salesModel.erase(id); }
  return result || invalidSaleError;
};

const updateSale = async (id, soldItems) => {
  const hasError = await validateSaleData(soldItems);

  return hasError ?
  genericError :
  salesModel.updateOne(id, soldItems);
};

const selectAll = async () => salesModel.listAll();

module.exports = {
  addSales,
  selectAll,
  selectOne,
  updateSale,
  deleteOne,
};
