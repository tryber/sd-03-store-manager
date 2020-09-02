const rescue = require('express-rescue');
const services = require('../services/services');

const createProduct = rescue(async (req, res) => {
  const product = await services.serviceCreateProduct(req.body);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(201).json(product);
});

const getAllProducts = rescue(async (_req, res) => {
  const products = await services.serviceGetAllProducts();
  return res.status(200).json({ products });
});

const middleWare = async ({ id }, callback, res, okStatus, notOkStatus) => {
  const product = await callback(id);
  if (product.err) {
    return res.status(notOkStatus).json(product);
  }

  return res.status(okStatus).json(product);
};

const getProductById = rescue((req, res) => {
  middleWare(req.params, services.serviceGetProductById, res, 200, 422);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await services.serviceUpdateProduct(id, req.body);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(200).json(product);
});

const deleteProduct = rescue(async (req, res) => {
  middleWare(req.params, services.serviceDeleteProduct, res, 200, 422);
});

const createSale = async (req, res) => {
  const sale = await services.serviceCreateSale(req.body);
  if (sale.err) {
    return (sale.err.code === 'stock_problem')
      ? res.status(404).json(sale)
      : res.status(422).json(sale);
  }
  return res.status(200).json(sale);
};

const getAllSales = rescue(async (_req, res) => {
  const sales = await services.serviceGetAllSales();
  return res.status(200).json({ sales });
});

const getSaleById = rescue(async (req, res) => {
  middleWare(req.params, services.serviceGetSaleById, res, 201, 404);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await services.serviceUpdateSale(id, req.body);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  return res.status(200).json(sale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await services.serviceDeleteSale(id);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  return res.status(200).json(sale);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
