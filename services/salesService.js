const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const { validateID, validateSaleData } = require('./helpers');

const createSale = async (products) => {
  const isDataValid = validateSaleData(products);

  if (isDataValid) {
    await products.forEach(async ({ productId }, index) => {
      const product = await productsModel.getProductById(productId);
      if (product && products[index].quantity > product.quantity) {
        return {
          err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
        };
      }
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

  await products.forEach(async ({ productId, quantity }) => {
    await productsModel.updateQuantity(productId, -quantity);
  });

  return sale;
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  const isIdValid = validateID(id);

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
  const isIdValid = validateID(id, 'sale ID');

  if (typeof isIdValid === 'object') return isIdValid;

  const sale = await salesModel.deleteSale(id);

  if (!sale) {
    return {
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    };
  }

  sale.itensSold.forEach(async ({ productId, quantity }) => {
    await productsModel.updateQuantity(productId, quantity);
  });
  // await salesModel.deleteSale(id);
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
