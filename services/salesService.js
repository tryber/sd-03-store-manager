const { registerSales } = require('../models/sales');
const { validateParams } = require('./libValidation');

const registeringSales = async (productId, quantity) => {
  const validate = await validateParams(productId, quantity);

  if (validate.err) return validate;
  return registerSales(productId, quantity);
};

module.exports = {
  registeringSales,
};
