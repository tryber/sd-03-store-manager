const { salesModel, productsModel } = require('../models');
const { validateId, validateSaleData, getErrorObject } = require('./helpers');
const { invalidData, wrongFormatOrQuantity, wrondFormatSaleId } = require('./errorLibrary');

const createSale = (products) => {
  const isDataValid = validateSaleData(products);

  if (isDataValid) {
    products.forEach(({ productId }) => {
      const product = productsModel.getProductById(productId);

      if (!product) getErrorObject(invalidData, wrongFormatOrQuantity);
    });
  }

  if (!isDataValid) return getErrorObject(invalidData, wrongFormatOrQuantity);

  const sale = salesModel.createSale(products);

  return sale;
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  const isIdValid = validateId(id);

  if (typeof isIdValid === 'object') return isIdValid;

  const sale = await salesModel.getSaleById(id);

  if (!sale) return getErrorObject('not_found', 'Sale not found');

  return sale;
};

const updateSale = async (id, products) => {
  const isDataValid = validateSaleData(products);

  if (!isDataValid) return getErrorObject(invalidData, wrongFormatOrQuantity);

  const updatedSale = await salesModel.updateSale(id, products);

  return updatedSale;
};

const deleteSale = async (id) => {
  const isIdValid = validateId(id, wrondFormatSaleId);

  if (typeof isIdValid === 'object') return isIdValid;

  const sale = await salesModel.getSaleById(id);

  if (!sale) return getErrorObject(invalidData, wrondFormatSaleId);

  await salesModel.deleteSale(id);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
