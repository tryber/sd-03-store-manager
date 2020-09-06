const Boom = require('@hapi/boom');
const { Router } = require('express');
const salesService = require('./salesService');
const { errorHandler, verifyId, verifySaleId } = require('../controllers/errorHandler');

const salesRouter = Router();

const listSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json(sales);
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
    if (!salesService.arrayIsValid(req.body)) {
      return next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    }
    const result = await salesService.addSales(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateSales = async (req, res, next) => {
  try {
    if (!salesService.arrayIsValid(req.body)) {
      next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    } else {
      const { id } = req.params;
      const result = await salesService.updateSales(id, req.body);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const deleteSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSales(id);
    console.log(result);
    if (!result) return next(Boom.notFound('ID not found', 'not_found'));
    res.status(200).json(result);
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
