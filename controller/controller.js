const rescue = require('express-rescue');
const services = require('../services/services');

const createProduct = rescue(async (req, res) => {
  const product = await services.createProduct(req.body);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(201).json(product);
});

const getAllProducts = rescue(async (_req, res) => {
  const products = await services.getAllProducts();
  return res.status(200).json({ products });
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await services.getProductById(id);
  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(201).json(product);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await services.updateProduct(id, req.body);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(200).json(product);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await services.deleteProduct(id);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(200).json(product);
});

const createSale = async (req, res) => {
  const sale = await services.createSale(req.body);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  return res.status(200).json(sale);
};

const getAllSales = rescue(async (_req, res) => {
  const sales = await services.getAllSales();
  return res.status(200).json({ sales });
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await services.getSaleById(id);
  if (sale.err) {
    return res.status(422).json(sale);
  }

  return res.status(201).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await services.updateSale(id, req.body);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  return res.status(200).json(sale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await services.deleteSale(id);
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
