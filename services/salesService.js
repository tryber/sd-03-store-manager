const { registerSales } = require('../models/sales');
const { validateParams } = require('./libValidation');

const registeringSales = async (productId, quantity) => {
  const validate = await validateParams(productId, quantity);

  if (!validate.err) return registerSales(productId, quantity);
  return validate;
};

module.exports = {
  registeringSales,
};
