const { salesModel, productsModel } = require('../models');
const { validateId, validateSaleData, getErrorObject } = require('./helpers');
const { invalidData, wrongFormatOrQuantity, wrondFormatSaleId } = require('./errorLibrary');

const createSale = async (products) => {
  const isDataValid = validateSaleData(products);

  if (!isDataValid) return getErrorObject(invalidData, wrongFormatOrQuantity);

  if (isDataValid) {
    await products.forEach(async ({ productId, quantity }) => {
      const product = await productsModel.getProductById(productId);
      const limit = product.quantity;

      if (!product) return getErrorObject(invalidData, wrongFormatOrQuantity);

      if (quantity > limit) {
        return getErrorObject('stock_problem', 'Such amount is not permitted to sell');
      }
    });
  }

  const sale = salesModel.createSale(products);

  await products.forEach(async ({ productId, quantity }) => {
    await productsModel.updateQuantity(productId, -quantity);
  });

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

  const sale = await salesModel.deleteSale(id);

  if (!sale) return getErrorObject(invalidData, wrondFormatSaleId);

  await sale.itensSold.forEach(async ({ productId, quantity }) => {
    await productsModel.updateQuantity(productId, quantity);
  });

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
