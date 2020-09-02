const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const { validateId, validateSaleData } = require('./helpers');

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
  }

  if (!isDataValid) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  const sale = salesModel.createSale(products);

  return sale;
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  const isIdValid = validateId(id);

  if (typeof isIdValid === 'object') return isIdValid;

  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    return { err: { code: 'not_found', message: 'Sale not found' } };
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

const deleteSale = async (id) => {
  const isIdValid = validateId(id, 'Wrong sale ID format');

  if (typeof isIdValid === 'object') return isIdValid;

  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    return {
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    };
  }

  await salesModel.deleteSale(id);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
