const rescue = require('express-rescue');
const productServices = require('../services/productServices');
const salesServices = require('../services/salesServices');

const createProduct = rescue(async (req, res) => {
  const product = await productServices.serviceCreateProduct(req.body);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(201).json(product);
});

const getAll = async (callback, res, okstatus, type) => {
  const result = await callback();
  return res.status(okstatus).json({ [type]: result });
};

const getAllProducts = rescue(async (_req, res) => {
  getAll(productServices.serviceGetAllProducts, res, 200, 'products');
});

const middleWare = async ({ id }, callback, res, okStatus, notOkStatus, message) => {
  const re = /^[0-9A-F]+$/;
  if ((id.match(re)) || id.length !== 24) {
    return res.status(notOkStatus).json({ err: { code: 'invalid_data', message } });
  }
  const product = await callback(id);
  // console.log(callback, product)
  if (product.err) {
    return res.status(notOkStatus).json(product);
  }

  return res.status(okStatus).json(product);
};

const getProductById = rescue((req, res) => {
  middleWare(req.params, productServices.serviceGetProductById, res, 200, 422, 'Wrong id format');
});

const update = async ({ id }, callback, body, res, okstatus, notokstatus) => {
  const result = await callback(id, body);
  if (result.err) {
    return res.status(notokstatus).json(result);
  }
  return res.status(okstatus).json(result);
};

const updateProduct = rescue(async (req, res) => {
  update(req.params, productServices.serviceUpdateProduct, req.body, res, 200, 422);
});

const deleteProduct = rescue(async (req, res) => {
  middleWare(req.params, productServices.serviceDeleteProduct, res, 200, 422, 'Wrong id format');
});

const createSale = async (req, res) => {
  const sale = await salesServices.serviceCreateSale(req.body);
  if (sale.err) {
    return (sale.err.code === 'stock_problem')
      ? res.status(404).json(sale)
      : res.status(422).json(sale);
  }
  return res.status(200).json(sale);
};

const getAllSales = rescue(async (_req, res) => {
  getAll(salesServices.serviceGetAllSales, res, 200, 'sales');
});

const getSaleById = rescue(async (req, res) => {
  middleWare(req.params, salesServices.serviceGetSaleById, res, 201, 404);
});

const updateSale = rescue(async (req, res) => {
  update(req.params, salesServices.serviceUpdateSale, req.body, res, 200, 422);
});

const deleteSale = rescue(async (req, res) => {
  middleWare(req.params, salesServices.serviceDeleteSale, res, 200, 422, 'Wrong sale ID format');
});

module.exports = {
  createProduct,
  deleteSale,
  getProductById,
  deleteProduct,
  getAllProducts,
  getAllSales,
  updateSale,
  createSale,
  updateProduct,
  getSaleById,
};
