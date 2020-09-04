const salesModel = require('../models/salesModel');
const productServices = require('./productServices');
const {
  STOCK_ERROR_QUANTITY,
  SALE_NOT_FOUND, WRONG_SALE_ID,
  errMessage } = require('./errorsServices');

const createSales = async (sales) => {
  const { productId, quantity } = sales[0];
  const product = await productServices.handleGetProductById(productId);
  if (quantity > product.quantity) {
    return { error: true, message: errMessage('stock_problem', STOCK_ERROR_QUANTITY) };
  }
  await productServices.handleUpdateProduct(productId, {
    name: product.name, quantity: product.quantity - quantity,
  });
  return salesModel.registerSales(sales);
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) return { error: true, message: errMessage('not_found', SALE_NOT_FOUND) };
  return sale;
};

const updateSale = async (id, newSaleData) =>
  salesModel.updateSale(id, newSaleData);

const deleteSaleById = async (id) => {
  const reqSale = await getSaleById(id);
  if (!reqSale) return { error: true, message: errMessage('invalid_data', WRONG_SALE_ID) };
  const { productId, quantity } = reqSale.itensSold[0];
  const product = await productServices.handleGetProductById(productId);
  await productServices.handleUpdateProduct(productId, {
    name: product.name, quantity: product.quantity + quantity,
  });
  await salesModel.deleteSale(id);
  return reqSale;
};
module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSaleById,
};
