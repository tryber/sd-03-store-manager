const {
  registerSales,
  getSales,
  getSalesById,
  updateSalesInBank,
} = require('../models/sales');

const { validateParams } = require('./libValidation');

const registeringSales = async (products) => {
  const result = await registerSales(products);
  return result;
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
  return validate;
};

module.exports = {
  registeringSales,
  listSales,
  listSalesById,
  updateSales,
};
