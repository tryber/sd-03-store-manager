const salesModel = require('../models/sales');

const getAllSales = async () => {
  const list = await salesModel.getAllSales();
  return list;
};

const validateSale = async (itensSold) => {
  const testQuantity = itensSold.some((elem) => elem.quantity < 1);
  if (testQuantity) {
    return {
      error: true,
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const testQuantityNumber = itensSold.some((elem) => typeof elem.quantity !== 'number');
  if (testQuantityNumber) {
    return {
      error: true,
      message: 'Wrong product ID or invalid quantity',
    };
  }
  return { error: false };
};

const createSale = async (itensSold) => {
  const validation = await validateSale(itensSold);

  if (validation.error) return validation;

  return salesModel.createSale(itensSold);
};

const updateSale = async (id, itensSold) => {
  const validation = await validateSale(itensSold);

  if (validation.error) return validation;

  return salesModel.updateSale(id, itensSold);
};

const getSaleById = async (id) => {
  let sale = null;

  if (id.length !== 24) {
    return {
      error:true,
      message: 'Wrong sale ID format',
    };
  }

  sale = await salesModel.getSaleById(id);

  if (sale === null) {
    return {
      error: true,
      message: 'Sale not found',
    };
  }

  return sale;
};

const deleteSale = async (id) => {
  const testId = await getSaleById(id);

  if (testId.error) return testId;

  return salesModel.deleteSale(id);
};

module.exports = {
  getAllSales,
  createSale,
  updateSale,
  getSaleById,
  deleteSale,
};
