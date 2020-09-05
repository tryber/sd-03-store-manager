const {
  insertSales,
  getCollectionDb,
} = require('../models/salesModel');

const salesQuantityIsValid = (quantity) => {
  const validation = quantity <= 0;
  if (typeof quantity !== 'number' || validation) return 'Wrong product ID or invalid quantity';
  return false;
};

const addSale = async (sales) => {
  const response = await insertSales(sales);
  return response;
};

const collectionExists = async (name) => {
  const collection = await getCollectionDb(name);
  return collection;
};

module.exports = {
  salesQuantityIsValid,
  addSale,
  collectionExists,
};
