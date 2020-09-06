const Boom = require('@hapi/boom');
const { Router } = require('express');
const salesService = require('./salesService');
const productService = require('../products/productsService');
const { errorHandler, verifyId, verifySaleId } = require('../controllers/errorHandler');

const salesRouter = Router();

const listSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(200).json(sales);
};

const getSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.getSalesById(id);
    if (!result) return next(Boom.notFound('Sale not found', 'not_found'));
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const newSale = async (req, res, next) => {
  try {
    const products = await productService.getProductByIdArray(req.body);
    const { isValid, stockIsAvailable } = salesService.arrayIsValid(req.body, products.products);
    if (!isValid || !products.allIdsIsValid) {
      return next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    }
    if (!stockIsAvailable) {
      return next(Boom.notFound('Such amount is not permitted to sell', 'stock_problem'));
    }
    req.body.forEach(async (product, index) => {
      await productService.updateStock(
        product.productId,
        products.products[index].quantity - product.quantity,
      );
    });
    const result = await salesService.addSales(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateSales = async (req, res, next) => {
  try {
    const products = await productService.getProductByIdArray(req.body);
    const { isValid } = salesService.arrayIsValid(req.body, products.products);
    if (!isValid || !products.allIdsIsValid) {
      return next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    }
    const { id } = req.params;
    const result = await salesService.updateSales(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSales(id);
    if (!result) return next(Boom.notFound('ID not found', 'not_found'));
    const products = await productService.getProductByIdArray(result.itensSold);
    result.itensSold.forEach(async (product, index) => {
      await productService.updateStock(
        product.productId,
        products.products[index].quantity + product.quantity,
      );
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

salesRouter.route('/').get(listSales).post(newSale, errorHandler);

salesRouter
  .route('/:id')
  .get(verifyId, getSalesById, errorHandler)
  .put(verifyId, updateSales, errorHandler)
  .delete(verifySaleId, deleteSales, errorHandler);

module.exports = salesRouter;
