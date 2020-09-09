const productsModel = require('../models/Products');
const salesModel = require('../models/Sales');

const invalid = 'invalid_data';
let code;
let message;
const stockError = 'stock_problem';

const validateSaleCreate = ({ productId, quantity }) =>
  quantity >= 1 && typeof quantity === 'number' && productId.length === 24;

const saleCreate = async (products) => {
  let validation;
  await products.forEach((product) => { validation = validateSaleCreate(product); });
  if (!validation) {
    code = invalid;
    message = 'Wrong product ID or invalid quantity';
    return { err: { code, message } };
  }
  if (validation) {
    products.forEach(async ({ productId, quantity }) => {
      const productCreated = await productsModel.ProductById(productId);
      const stock = productCreated.quantity;
      if (!productCreated) {
        code = invalid;
        message = 'Wrong';
        return { err: { code, message } };
      }
      if (quantity > stock) {
        code = stockError;
        message = 'Such amount is not permitted to sell';
        return { err: { code, message } };
      }
    });
  }
  const sale = salesModel.saleCreate(products);
  return sale;
};

const SalesList = async () => salesModel.SaleList();

const SaleUpdate = async (id, products) => {
  let validation;
  await products.forEach((product) => { validation = validateSaleCreate(product); });
  if (!validation) {
    code = invalid;
    message = 'Wrong product ID or invalid quantity';
    return { err: { code, message } };
  }
  if (validation) {
    products.forEach(async ({ productId, quantity }) => {
      const productUpdated = await productsModel.ProductById(productId);
      const stock = productUpdated.quantity;
      if (quantity > stock) {
        code = stockError;
        message = 'Such amount is not permitted to sell';
        return { err: { code, message } };
      }
      if (!productUpdated) {
        code = invalid;
        message = 'Wrong';
        return { err: { code, message } };
      }      
    });
  }
  const saleUpdate = await salesModel.SaleUpdate(id, products);
  return saleUpdate;
};

module.exports = {
  saleCreate,
  SalesList,
  SaleUpdate,
};
