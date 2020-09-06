const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const isQuantityValid = (quantity) => {
  let output = true;
  if (!Number.isInteger(quantity)) {
    output = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  if (typeof quantity !== 'number') {
    output = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  if (quantity <= 0) {
    output = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  return output;
};

const addSale = async (soldItensArray) => {
  const { productId, quantity } = soldItensArray[0];

  const quantityValidation = isQuantityValid(quantity);

  if (quantityValidation.err) return quantityValidation;

  const product = await productsService.getProductById(productId);

  if (quantity > product.quantity) {
    return {
      err:
        { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  return salesModel.addSale(soldItensArray);
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  if (id.length < 24) return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  const sale = await salesModel.getSaleById(id);

  if (sale === null) return { err: { code: 'invalid_data', message: 'Sale not Found' } };

  return sale;
};

const deleteSale = async (id) => {
  if (id.length < 24) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  const deletedSale = await salesModel.deleteSale(id);

  return deletedSale;
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  deleteSale,
};
