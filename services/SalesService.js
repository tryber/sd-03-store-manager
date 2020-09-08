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
  await products.forEach((product) => {
    validation = validateSaleCreate(product);
  });
  if (!validation) {
    code = invalid;
    message = 'Wrong product ID or invalid quantity';
    return { err: { code, message } };
  }
  if (validation) {
    products.forEach(async ({ productId, quantity }) => {
      const productCreated = await productsModel.ProductById(productId);
      let stock = productCreated.quantity;
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

module.exports = {
  saleCreate,
};
