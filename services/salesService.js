const {
  registerSales,
  getSales,
  getSalesById,
  updateSalesInBank,
  deleteSaleBank,
} = require('../models/sales');

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

const updateSales = async (id, productsId, quantity) => {
  const result = await updateSalesInBank(id, productsId, quantity);
  return result;
};

const deleteSales = async (id) => {
  const deleteIn = await deleteSaleBank(id);
  return deleteIn;
};

module.exports = {
  registeringSales,
  listSales,
  listSalesById,
  updateSales,
  deleteSales,
};
