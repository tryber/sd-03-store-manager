const {
  registerSales,
  getSales,
  getSalesById,
  updateSalesInBank,
} = require('../models/sales');

const { validateParams } = require('./libValidation');

const registeringSales = async (productId, quantity) => {
  console.log('aqui', quantity, 'then', productId);
  const validate = await validateParams(productId, quantity);

  if (validate.err) return validate;
  return registerSales(productId, quantity);
};

const listSales = async () => {
  const allSales = await getSales();
  return allSales;
};

const listSalesById = async (id) => {
  const salesById = await getSalesById(id);
  return salesById;
};

const updateSales = async (id, quantity) => {
  const validate = await validateParams(id, quantity);

  if (validate.err) return validate;
  return updateSalesInBank(id, quantity);
};

module.exports = {
  registeringSales,
  listSales,
  listSalesById,
  updateSales,
};
