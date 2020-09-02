const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const { validateID, validateSaleData } = require('./helpers');

const createSale = (products) => {
  const isDataValid = validateSaleData(products);

  if (isDataValid) {
    products.forEach(({ productId }) => {
      const product = productsModel.getProductById(productId);
      if (!product) {
        return {
          err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
        };
      }
    });
  } else if (!isDataValid) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  const sale = salesModel.createSale(products);

  return sale;
};

const getAllSales = async () => salesModel.getAllSales();

const getSalesById = async (id) => {
  const isIdValid = validateID(id);

  if (typeof isIdValid === 'object') return isIdValid;

  const sale = salesModel.getSaleById(id);

  if (!sale) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return sale;
};

const updateSale = async (id, products) => {
  const isDataValid = validateSaleData(products);
  if (!isDataValid) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  const updatedSale = await salesModel.updateSale(id, products);
  return updatedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
  updateSale,
};
