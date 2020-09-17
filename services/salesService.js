const { salesModel } = require('../models');
const { saleValidation } = require('../utils');

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const saleId = await salesModel.getSaleById(id);

  if (!saleId) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return saleId;
};

const createSale = async (sales) => {
  const sale = saleValidation(sales);

  if (sale.err) return sale;

  return salesModel.createSale(sales);
};

const updateSale = async (id, itensSale) => {
  const itensSaleValidation = saleValidation(itensSale);

  if (itensSaleValidation.err) return itensSaleValidation;

  return salesModel.updateSale(id, itensSale);
};

const deleteSale = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  await salesModel.deleteSale(id);
};

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
};
