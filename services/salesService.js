const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const validateSaleData = async (itensSold) => {
  const productExists = itensSold.every((item) =>
    ObjectId.isValid(item.productId) && productModel.getProductById(item.productId));

  const QuantityIsValid = itensSold.every((item) =>
    Number.isInteger(item.quantity) && item.quantity >= 1);

  if (!productExists || !QuantityIsValid) {
    return { error: true, message: 'Wrong product ID or invalid quantity' };
  }
  return { error: false };
};

const createSale = async (itensSold) => {
  const validation = await validateSaleData(itensSold);
  if (validation.error) return validation;

  await itensSold.every(async ({ productId, quantity }) => {
    await productModel.incrementQuantity(productId, -quantity);
  });

  const sale = await salesModel.createSale(itensSold);
  return sale;
};

const getAllSales = async () => ({ sales: await salesModel.getAllSales() });

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return { error: true, message: 'Wrong sale ID format' };
  const sale = await salesModel.getSaleById(id);
  if (!sale) return { err: true, message: 'Sale not found' };
  return sale;
};

const updateSale = async (id, itensSold) => {
  const originalSale = await getSaleById(id);
  if (originalSale.error) return originalSale;
  const validation = await validateSaleData(itensSold);
  if (validation.error) return validation;

  await originalSale.itensSold.every(async ({ productId, quantity }) => {
    await productModel.incrementQuantity(productId, quantity);
  });

  await itensSold.every(async ({ productId, quantity }) => {
    await productModel.incrementQuantity(productId, -quantity);
  });

  return salesModel.updateSale(id, itensSold);
};

const deleteSale = async (id) => {
  const originalSale = await getSaleById(id);
  await originalSale.itensSold.every(async ({ productId, quantity }) => {
    await productModel.incrementQuantity(productId, quantity);
  });

  await salesModel.deleteSale(id);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
