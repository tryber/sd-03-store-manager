const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const validateSaleData = async (productId, quantity) => {
  const productExists = await productModel.getProductById(productId);
  if (!productExists || quantity < 1 || !Number.isInteger(quantity)) {
    return { error: true, message: 'Wrong product ID or invalid quantity' };
  }
  return { error: false };
};

const createSale = async (productId, quantity) => {
  const validation = await validateSaleData(productId, quantity);
  if (validation.error) return validation;
  const sale = await salesModel.createSale(productId, quantity);
  return sale;
};

const getAllSales = async () => ({ sales: await salesModel.getAllSales() });

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) return { error: true, message: 'Wrong id format' };
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
