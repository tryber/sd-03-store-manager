const {
  insertSales,
  getCollectionDb,
  getSpecificSale,
  updateSale,
  deleteSale,
} = require('../models/salesModel');
const { getProductById } = require('../models/productsModel');

const salesQuantityIsValid = (quantity) => {
  const validation = quantity <= 0;
  if (typeof quantity !== 'number' || validation) return 'Wrong product ID or invalid quantity';
  return false;
};

const stockVerification = async (productId, soldQuantity) => {
  const { quantity } = await getProductById(productId);

  if (soldQuantity > quantity) return 'Such amount is not permitted to sell';
  return false;
};

const addSale = async (sales) => {
  const response = await insertSales(sales);
  return response;
};

const allDatacollection = async (name) => {
  const collection = await getCollectionDb(name);
  return collection;
};

const getSaleWithId = async (id) => {
  const sale = await getSpecificSale(id);
  return sale;
};

const updateSaleById = async (id, newSale) => {
  const saleUpdated = await updateSale(id, newSale);
  return saleUpdated;
};

const validateId = (id) => {
  const hexadecimalRegex = /^(0x|0X)?[a-fA-F0-9]+$/;
  if (id.length < 16 || !hexadecimalRegex.test(id)) return 'Wrong sale ID format';
  return false;
};

const deleteSaleById = async (id) => {
  const sale = await deleteSale(id);
  return sale;
};

module.exports = {
  salesQuantityIsValid,
  addSale,
  allDatacollection,
  getSaleWithId,
  updateSaleById,
  validateId,
  deleteSaleById,
  stockVerification,
};
